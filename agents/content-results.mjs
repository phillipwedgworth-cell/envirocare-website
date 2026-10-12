// agents/content-results.mjs — did the content work? Measure it, and send losers back.
//
// WHY (2026-10-12): content-refresh and blog-from-drafts write a ledger row when
// they PROPOSE a change, but nothing ever checked whether the change merged, or
// whether it moved Google at all. A page could be "done" forever while it sat at
// position 40. Phillip: "agent can monitor results and fix drafts … to improve".
//
// Runs first in the Tuesday content workflow (after the build):
//   1. PUBLISHED  For every route whose newest ledger row is 'proposed', look in
//                 the checked-out main: a page-refresh entry for the key, or a blog
//                 post with publishedAt/updatedAt on or after the proposal. Found →
//                 'published' row. Not found after 14 days → 'rejected' (the PR was
//                 closed or never merged), so the route can be tried again.
//   2. MEASURE    For every route whose newest row is 'published' and at least
//                 MEASURE_DAYS old (28; 56 for a brand-new post, which has no
//                 history), compare Search Console page metrics (gsc_pages, the
//                 daily 7-day snapshots) for the 14 days before publishing with the
//                 latest 7 snapshots, and re-score the BUILT page in NeuronWriter
//                 (free) when a key is present.
//   3. VERDICT    win     impressions +20% or more, or position 2+ better
//                 requeue impressions/position flat or worse, or a new post still
//                         under 20 weekly impressions (the NeuronWriter re-score
//                         is recorded for the trend but never triggers a rework)
//                 A 'measured' row stores the numbers. 'requeue' lifts the 28-day
//                 cool-down in content-refresh and the "already handled" block in
//                 blog-from-drafts, so next run they rework that page with the
//                 lesson attached. Lessons go to agent_memory for both writers.
//                 parked  requeued twice already and still flat: no third rewrite;
//                         the morning brief lists it for a human decision.
//
// Never writes site content itself. Read-only against GSC data and NeuronWriter.
// Usage: node agents/content-results.mjs [--dry]
import fs from 'node:fs';
import path from 'node:path';
import { supabase, logAgentRun } from './lib/supabase.mjs';
import { remember } from './lib/memory.mjs';
import { score } from './lib/nw-writer.mjs';

const AGENT = 'content-results';
const ROOT = process.cwd();
const SITE = 'https://www.envirocarellc.com';
const MEASURE_DAYS = 28, NEW_POST_DAYS = 56, STALE_PROPOSAL_DAYS = 14;
const DRY = process.argv.includes('--dry');
const day = 864e5;
const today = () => new Date().toISOString().slice(0, 10);

function repoState() {
  const refresh = fs.readFileSync(path.join(ROOT, 'data/page-refresh.ts'), 'utf8');
  const store = JSON.parse(refresh.match(/\/\* BEGIN PAGE_REFRESH_JSON \*\/\s*const PAGE_REFRESH_JSON = ([\s\S]*?) as const;\s*\/\* END/)[1]);
  const posts = {};
  for (const r of fs.readFileSync(path.join(ROOT, 'data/blog-posts.ts'), 'utf8').split(/\n  \{\n    slug: '/).slice(1)) {
    const slug = r.split("'")[0];
    posts[slug] = { published: (r.match(/\n    publishedAt: '([^']+)'/) || [])[1], updated: (r.match(/\n    updatedAt: '([^']+)'/) || [])[1] };
  }
  return { store, posts };
}

function isLive(route, sinceDate, { store, posts }) {
  if (route.startsWith('/blog/')) {
    const p = posts[route.slice(6)];
    if (!p) return false;
    return [p.published, p.updated].some((d) => d && d >= sinceDate);
  }
  const e = store[route];
  return !!e && String(e.updatedAt || '') >= sinceDate;
}

async function gsc(route) {
  const urls = [`${SITE}${route}`, `${SITE}${route}/`];
  const { data, error } = await supabase.from('gsc_pages').select('page,clicks,impressions,position,snapshot_date')
    .in('page', urls).order('snapshot_date', { ascending: false }).limit(400);
  if (error) throw new Error(`gsc_pages: ${error.message}`);
  // The /x and /x/ variants are the same page: add them up per snapshot
  // (position weighted by impressions), oldest first.
  const byDay = new Map();
  for (const r of data || []) {
    const d = byDay.get(r.snapshot_date) || { snapshot_date: r.snapshot_date, impressions: 0, clicks: 0, posW: 0 };
    const imp = Number(r.impressions) || 0;
    d.impressions += imp; d.clicks += Number(r.clicks) || 0; d.posW += (Number(r.position) || 0) * Math.max(imp, 1); d.w = (d.w || 0) + Math.max(imp, 1);
    byDay.set(r.snapshot_date, d);
  }
  return [...byDay.values()].map((d) => ({ ...d, position: d.posW / d.w })).sort((a, b) => String(a.snapshot_date).localeCompare(String(b.snapshot_date)));
}
const avg = (rows, k) => (rows.length ? rows.reduce((t, r) => t + (Number(r[k]) || 0), 0) / rows.length : null);
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);

function builtHtml(route) {
  const f = path.join(ROOT, '.next/server/app', route.replace(/^\//, '') + '.html');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
}
async function nwNow(route, queryId) {
  if (!queryId || !process.env.NEURONWRITER_API_KEY) return null;
  const page = route.split('#')[0];
  const html = builtHtml(page === '/' ? '/index' : page);
  if (!html) return null;
  const main = (html.match(/<main[\s\S]*<\/main>/) || [html])[0];
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  try { return await score(queryId, main, title, desc); } catch { return null; }
}

async function insert(row) {
  if (DRY) return;
  const { error } = await supabase.from('content_refresh_ledger').insert({ ...row, run_id: process.env.GITHUB_RUN_ID || null });
  if (error) console.warn(`[${AGENT}] ledger: ${error.message}`);
}

async function run() {
  if (!supabase) throw new Error('Supabase not configured');
  // Page through newest-first (Supabase caps a response at ~1000 rows), then put
  // the rows back in time order. Skip-only rows ('dup:' routes) are not content.
  const rows = [];
  for (let from = 0; from < 50000; from += 1000) {
    const { data, error } = await supabase.from('content_refresh_ledger')
      .select('route,keyword,query_id,status,score_before,score_after,reason,source,created_at')
      .order('created_at', { ascending: false }).range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  rows.reverse();

  // Newest row per route, plus the first 'published' row (the publish date).
  const latest = new Map(), firstPublished = new Map(), lastPublished = new Map(), firstProposed = new Map(), requeues = new Map();
  for (const r of rows) {
    if (String(r.route).startsWith('dup:')) continue;
    latest.set(r.route, r);
    if (r.status === 'published') { if (!firstPublished.has(r.route)) firstPublished.set(r.route, r); lastPublished.set(r.route, r); }
    if (r.status === 'proposed') firstProposed.set(r.route, r); // newest proposal wins
    if (r.status === 'measured' && /^requeue/.test(r.reason || '')) requeues.set(r.route, (requeues.get(r.route) || 0) + 1);
  }
  const repo = repoState();
  const out = { published: [], stale: [], win: [], requeue: [], parked: [], waiting: 0 };

  for (const [route, last] of latest) {
    const base = { route, keyword: last.keyword, query_id: last.query_id, source: last.source };
    const ageDays = (Date.now() - new Date(last.created_at)) / day;

    if (last.status === 'proposed') {
      // Posts carry the Chicago date, the ledger a UTC timestamp: allow one day of slack.
      const since = new Date(new Date(last.created_at) - day).toISOString().slice(0, 10);
      if (isLive(route, since, repo)) {
        await insert({ ...base, status: 'published', score_before: last.score_before, score_after: last.score_after, reason: `detected in main ${process.env.GITHUB_SHA?.slice(0, 7) || ''} on ${today()}`.trim() });
        out.published.push(route);
      } else if (ageDays > STALE_PROPOSAL_DAYS) {
        await insert({ ...base, status: 'rejected', reason: `proposal from ${since} never reached main (PR closed or unmerged) — eligible to retry` });
        out.stale.push(route);
      }
      continue;
    }

    if (last.status !== 'published') continue;
    // Measure the NEWEST publish (a rework restarts the clock); a page counts as
    // brand-new only if this is its first publish and it had no prior score.
    const pubRow = lastPublished.get(route) || last;
    const pubDate = new Date(pubRow.created_at);
    const wasNew = route.startsWith('/blog/') && pubRow === firstPublished.get(route) && pubRow.score_before == null;
    const needDays = wasNew ? NEW_POST_DAYS : MEASURE_DAYS;
    if ((Date.now() - pubDate) / day < needDays) { out.waiting++; continue; }

    const page = route.split('#')[0];
    const g = await gsc(page);
    const before = g.filter((x) => { const d = new Date(x.snapshot_date); return d < pubDate && d >= new Date(pubDate - 14 * day); });
    const after = g.slice(-7);
    const m = {
      impr_before: r1(avg(before, 'impressions')), impr_after: r1(avg(after, 'impressions')),
      pos_before: r1(avg(before, 'position')), pos_after: r1(avg(after, 'position')),
      clicks_before: r1(avg(before, 'clicks')), clicks_after: r1(avg(after, 'clicks')),
      nw_now: await nwNow(route, last.query_id || firstProposed.get(route)?.query_id),
    };
    let verdict, why;
    // nw_now is recorded for the trend only: it scores the whole rendered <main>
    // (nav, forms, related posts), not the basis the writers shipped on, so it is
    // not allowed to trigger a rework on its own.
    if (wasNew || m.impr_before == null) {
      if ((m.impr_after ?? 0) < 20) { verdict = 'requeue'; why = `new page still at ${m.impr_after ?? 0} impressions/week after ${needDays} days`; }
      else { verdict = 'win'; why = `new page earning ${m.impr_after} impressions/week`; }
    } else {
      const imprUp = m.impr_before > 0 ? (m.impr_after - m.impr_before) / m.impr_before : (m.impr_after > 0 ? 1 : 0);
      const posGain = (m.pos_before ?? 0) - (m.pos_after ?? 0); // positive = better
      if (imprUp >= 0.2 || posGain >= 2) { verdict = 'win'; why = `impressions ${m.impr_before}→${m.impr_after}, position ${m.pos_before}→${m.pos_after}`; }
      else { verdict = 'requeue'; why = `flat: impressions ${m.impr_before}→${m.impr_after}, position ${m.pos_before}→${m.pos_after}`; }
    }
    // Two reworks that did not move it: stop spending on it and say so.
    if (verdict === 'requeue' && (requeues.get(route) || 0) >= 2) { verdict = 'parked'; why += ' — reworked twice already; needs a human look (intent, title, or links), not more copy'; }
    await insert({ ...base, status: 'measured', score_before: last.score_after ?? null, score_after: m.nw_now, reason: `${verdict}: ${why} | ${JSON.stringify(m)}` });
    out[verdict].push(`${route} (${why})`);
    const writer = route.startsWith('/blog/') ? 'blog-from-drafts' : 'content-refresh';
    if (!DRY) await remember(writer, `${route} measured ${verdict} after ${needDays}d: ${why}.${verdict === 'parked' ? ' Do not rework again without a human decision.' : verdict === 'requeue' ? ' Rework it with a different angle: answer the questions searchers ask that the page still does not, and strengthen the title/H1 match to the keyword.' : ' Keep what this page did.'}`, { type: 'lesson', metadata: { route, date: today(), verdict } });
  }

  const summary = `published ${out.published.length} · stale ${out.stale.length} · wins ${out.win.length} · requeued ${out.requeue.length} · parked ${out.parked.length} · still waiting ${out.waiting}`;
  console.log(`[${AGENT}] ${summary}`);
  for (const k of ['published', 'stale', 'win', 'requeue', 'parked']) for (const x of out[k]) console.log(`[${AGENT}]   ${k}: ${x}`);
  fs.writeFileSync(path.join(ROOT, 'agents/.content-results-manifest.json'), JSON.stringify({ date: today(), ...out }, null, 2));
  await logAgentRun(AGENT, 'ok', out, summary);
}

run().catch(async (e) => { console.error(`[${AGENT}] ${e.message}`); try { await logAgentRun(AGENT, 'fail', { error: e.message }); } catch {} process.exit(1); });
