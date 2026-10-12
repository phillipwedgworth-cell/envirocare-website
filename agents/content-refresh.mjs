// agents/content-refresh.mjs — NeuronWriter-scored, plagiarism-checked page refresh.
//
// WHAT IT DOES, per page, in priority order (agents/content-refresh-targets.json,
// then everything in agents/neuronwriter-targets.json):
//   1. MEMORY   Reads content_refresh_ledger (Supabase). Skips any route touched
//               inside the cool-down (CONTENT_REFRESH_COOLDOWN_DAYS, default 28),
//               so two runs — or two agents — never rework the same page.
//   2. SCORE    Scores the page AS BUILT (.next/server/app/<route>.html — the
//               workflow builds first) with NeuronWriter evaluate-content. Never
//               the url= import: on 2026-10-12 it returned 16-21 for pages whose
//               real HTML scored 39-75. Reuses the newest READY query for the
//               keyword, so it spends ZERO NeuronWriter analyses.
//   3. DECIDE   >= 70 -> "in-band": no new copy (never chase 100); add the
//               curated image if the page has none. < 70 -> draft.
//   4. DRAFT    Claude writes ONE added section (heading, paragraphs, FAQs) using
//               the NeuronWriter terms and questions the page is missing, with
//               the compliance canon in the system prompt and lessons recalled
//               from agent_memory. Banned/not-offered terms are filtered out of
//               the NeuronWriter list before the model sees it.
//   5. GATES    (a) compliance: same rules as the repo guard (scanText);
//               (b) originality: 8-word-shingle containment vs every competitor
//                   page NeuronWriter analysed and every other EnviroCare page
//                   (agents/lib/originality.mjs) — this is the plagiarism check;
//               (c) NeuronWriter: page + section must score >= before+3, >= 65,
//                   and <= 85. One guided rewrite on failure, then park it.
//   6. IMAGE    Curated real photo from the targets file; or, only with
//               CONTENT_REFRESH_IMAGES=generate and OPENAI_API_KEY, an
//               illustration (no people, vehicles, logos or text — AGENTS.md §7)
//               saved as WebP under public/images/refresh/ and captioned
//               "Illustration".
//   7. WRITE    Entry into data/page-refresh.ts (rendered by
//               components/RefreshedContent.tsx), a ledger row, a lesson in
//               agent_memory, and agents/.content-refresh-manifest.json for the PR.
//
// It never publishes. The workflow commits to a branch and opens a PR; the
// `guards` check (incl. test:page-refresh) must pass and Phillip merges.
//
// Usage: node agents/content-refresh.mjs [--max 3] [--route /lake-martin] [--force] [--dry]
import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { supabase, logAgentRun } from './lib/supabase.mjs';
import { remember, recall } from './lib/memory.mjs';
import { createMessage } from './lib/llm-with-logging.mjs';
import { COMPLIANCE_SYSTEM } from './lib/compliance.mjs';
import { checkOriginality, normalise } from './lib/originality.mjs';
import { compileRules, scanText } from '../scripts/lib/compliance-rules.mjs';

const AGENT = 'content-refresh';
const ROOT = process.cwd();
const NW_BASE = 'https://app.neuronwriter.com/neuron-api/0.5/writer';
const PROJECT = process.env.NEURONWRITER_PROJECT || '9d0bec3a70f4743c';
const MODEL = process.env.CONTENT_REFRESH_MODEL || 'claude-sonnet-4-6';
const BAND_LOW = 70, BAND_CEIL = 85, MIN_GAIN = 3, MIN_AFTER = 65;
const COOLDOWN_DAYS = Number(process.env.CONTENT_REFRESH_COOLDOWN_DAYS || 28);
const STORE = path.join(ROOT, 'data/page-refresh.ts');
const MANIFEST = path.join(ROOT, 'agents/.content-refresh-manifest.json');
const BUILD = path.join(ROOT, '.next/server/app');

const args = process.argv.slice(2);
const argVal = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const MAX = Number(argVal('--max', process.env.CONTENT_REFRESH_MAX || 3));
const ONLY = argVal('--route', process.env.CONTENT_REFRESH_ROUTE || '') || null;
const FORCE = args.includes('--force') || process.env.CONTENT_REFRESH_FORCE === '1';
const DRY = args.includes('--dry');
const today = () => new Date().toISOString().slice(0, 10);

// NeuronWriter suggests what competitors say — including things EnviroCare must
// never say or does not sell. Strip them before the model ever sees the list.
const BANNED_TERM = /orkin|terminix|waynes|cook'?s|rollins|truly nolen|aptive|scout|dane|palisade|clear ?defense|a ?plus|mr\.? ?bugg|stark|prewett|safespray|s ?& ?s|rogue|bed ?bug|wildlife|removal|eliminat|eco|safe|non-?toxic|green|organic|fumigat|tent|same[- ]day|24|emergency|guarantee|warrant|contract|cheap|discount|coupon|lawn|crawl ?space (service|encapsulation)|tuscaloosa|competitor|reviews?\b|bbb|better business/i;

// ── NeuronWriter ────────────────────────────────────────────────────────────
async function nw(method, body) {
  const key = process.env.NEURONWRITER_API_KEY;
  if (!key) throw new Error('NEURONWRITER_API_KEY not set');
  const r = await fetch(`${NW_BASE}/${method}`, { method: 'POST', headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const t = await r.text();
  if (!r.ok) throw new Error(`NeuronWriter ${method} ${r.status}: ${t.slice(0, 200)}`);
  return JSON.parse(t);
}
let _queries;
async function queryFor(keyword) {
  if (!_queries) {
    const rows = await nw('list-queries', { project: PROJECT, status: 'ready' });
    _queries = {};
    for (const q of Array.isArray(rows) ? rows : []) {
      const k = String(q.keyword || '').trim().toLowerCase();
      if (k && (!_queries[k] || String(q.created) > String(_queries[k].created))) _queries[k] = q;
    }
  }
  const hit = _queries[String(keyword).trim().toLowerCase()];
  return hit ? (hit.query || hit.id) : null;
}
async function score(queryId, html, title, description) {
  const r = await nw('evaluate-content', { query: queryId, html, title, description });
  const s = r?.content_score;
  if (typeof s !== 'number') throw new Error(`evaluate-content returned no score: ${JSON.stringify(r).slice(0, 120)}`);
  return s;
}

// ── rendered page ───────────────────────────────────────────────────────────
function builtHtml(route) {
  const f = path.join(BUILD, (route === '/' ? 'index' : route.replace(/^\//, '')) + '.html');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
}
function meta(html, re) { const m = html.match(re); return m ? m[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'") : ''; }
// Page body reduced to the semantic tags NeuronWriter scores, minus site chrome,
// the lead form, and any existing refresh section (it is being replaced).
function scorableHtml(html) {
  let b = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) || [, html])[1];
  b = b.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<header[\s\S]*?<\/header>|<footer[\s\S]*?<\/footer>|<nav[\s\S]*?<\/nav>|<form[\s\S]*?<\/form>|<section data-page-refresh[\s\S]*?<\/section>/g, ' ');
  b = b.replace(/<(?!\/?(h1|h2|h3|p|li|ul)\b)[^>]+>/g, ' ').replace(/<(h1|h2|h3|p|li|ul)[^>]*>/g, '<$1>');
  return b.replace(/\s+/g, ' ').trim();
}
function sectionHtml(e) {
  return [e.heading && `<h2>${e.heading}</h2>`, e.figure && `<img src="${e.figure.src}" alt="${e.figure.alt}">`,
    ...(e.paragraphs || []).map((p) => `<p>${p}</p>`), ...(e.faqs || []).map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`)].filter(Boolean).join('');
}
// Insert where RefreshedContent renders: before the first FAQ-ish h2, else at the end.
function withSection(base, sec) {
  const i = base.search(/<h2>[^<]*(question|answers|faq)/i);
  return i > 0 ? base.slice(0, i) + sec + base.slice(i) : base + sec;
}
function allBuiltPages() {
  const out = [];
  if (!fs.existsSync(BUILD)) return out;
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.html')) out.push({ route: '/' + path.relative(BUILD, p).replace(/\.html$/, '').replace(/(^|\/)index$/, ''), text: scorableHtml(fs.readFileSync(p, 'utf8')) });
    }
  })(BUILD);
  return out;
}
// Only routes whose template renders <RefreshedContent> can show an entry.
function supportsRefresh(route) {
  const f = path.join(ROOT, 'app', route === '/' ? '' : route, 'page.tsx');
  if (!fs.existsSync(f)) return false;
  const s = fs.readFileSync(f, 'utf8');
  return /RefreshedContent|<CityPage\b|<ServicePage\b|<DeepCityPage\b|<NeighborhoodPage\b|ComboPage/.test(s);
}

// ── store ───────────────────────────────────────────────────────────────────
const BLOCK = /(\/\* BEGIN PAGE_REFRESH_JSON \*\/\s*const PAGE_REFRESH_JSON = )([\s\S]*?)( as const;\s*\/\* END PAGE_REFRESH_JSON \*\/)/;
function readStore() { return JSON.parse(fs.readFileSync(STORE, 'utf8').match(BLOCK)[2]); }
function writeStore(obj) {
  const s = fs.readFileSync(STORE, 'utf8').replace(BLOCK, (_, a, __, c) => a + JSON.stringify(obj, null, 2) + c);
  fs.writeFileSync(STORE, s);
}

// ── competitor pages (the plagiarism corpus) ────────────────────────────────
async function competitorTexts(queryId, q) {
  try { // the MCP server exposes this; the REST API may or may not — try it first
    const r = await nw('get-competitors-content', { query: queryId });
    const c = r?.competitors;
    if (c && typeof c === 'object') return Object.entries(c).map(([url, v]) => ({ url, text: v?.content || '' }));
  } catch { /* fall through */ }
  const urls = (q.competitors || []).map((c) => c.url).filter((u) => u && !/envirocarellc|yelp|facebook|reddit/.test(u)).slice(0, 15);
  const out = [];
  for (const url of urls) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { 'User-Agent': 'Mozilla/5.0 (EnviroCare originality check)' } });
      if (r.ok) out.push({ url, text: normalise(await r.text()) });
    } catch { /* unreachable competitor proves nothing either way */ }
  }
  return out;
}

// ── ledger (Supabase memory) ────────────────────────────────────────────────
async function lastTouch(route) {
  if (!supabase) return null;
  const { data } = await supabase.from('content_refresh_ledger').select('status,created_at,score_after,score_before,reason')
    .eq('route', route).order('created_at', { ascending: false }).limit(1);
  return data?.[0] || null;
}
async function ledger(row) {
  if (!supabase || DRY) return;
  const { error } = await supabase.from('content_refresh_ledger').insert({ ...row, run_id: process.env.GITHUB_RUN_ID || null });
  if (error) console.warn(`[ledger] ${error.message}`);
}

// ── drafting ────────────────────────────────────────────────────────────────
function missingTerms(q, text) {
  const t = ` ${normalise(text)} `;
  const out = [];
  for (const k of ['content_basic', 'content_extended']) {
    for (const x of q.terms?.[k] || []) {
      const term = String(x.t || '').toLowerCase();
      if (!term || BANNED_TERM.test(term)) continue;
      const n = t.split(` ${normalise(term)} `).length - 1;
      const [lo] = x.sugg_usage || [1];
      if (n < lo) out.push(`${term} (${n}/${lo})`);
    }
  }
  return out.slice(0, 40);
}
function openQuestions(q) {
  const qs = [...Object.keys(q.ideas?.topic_matrix || {}), ...(q.ideas?.people_also_ask || []).map((x) => x.q)];
  return [...new Set(qs)].filter((x) => !BANNED_TERM.test(x)).slice(0, 10);
}
async function draft(anthropic, { route, keyword, pageText, terms, questions, lessons, feedback }) {
  const office = pageText.match(/\(\d{3}\) \d{3}-\d{4}/)?.[0] || '';
  const user = `Write ONE new section to ADD to the existing EnviroCare page ${route} (target search: "${keyword}").

THE PAGE ALREADY SAYS (do not repeat any of it — add what is missing):
"""${pageText.slice(0, 9000)}"""

Questions searchers ask that the page does not answer well yet:
${questions.map((q) => `- ${q}`).join('\n') || '- (none supplied)'}

NeuronWriter terms the page under-uses (work in the ones that fit NATURALLY; skip the rest):
${terms.join('; ') || '(none)'}

Lessons from earlier runs:
${lessons.map((l) => `- ${l.content}`).join('\n') || '- (none yet)'}
${feedback ? `\nYOUR PREVIOUS DRAFT FAILED A GATE. Fix exactly this:\n${feedback}\n` : ''}
Rules: 300-600 words of new copy. Original sentences only — never reuse wording from competitor sites or from the page above. No prices, no new phone numbers${office ? ` (the only phone you may use is ${office})` : ''}, no review counts, no competitor names. Plain sentences, no markdown.
Return ONLY JSON: {"heading": "...", "paragraphs": ["..."], "faqs": [{"q": "...", "a": "..."}]} with 3-5 paragraphs and 1-4 FAQs.`;
  const res = await createMessage(anthropic, { model: MODEL, max_tokens: 3000, system: COMPLIANCE_SYSTEM, messages: [{ role: 'user', content: user }] }, { agentName: AGENT, role: 'writer' });
  const txt = res.content?.map((c) => c.text || '').join('') || '';
  const j = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
  if (!Array.isArray(j.paragraphs) || !j.paragraphs.length) throw new Error('draft had no paragraphs');
  return { heading: String(j.heading || ''), paragraphs: j.paragraphs.map(String), faqs: (j.faqs || []).map((f) => ({ q: String(f.q), a: String(f.a) })) };
}

// ── images ──────────────────────────────────────────────────────────────────
async function illustration(route, keyword) {
  if (process.env.CONTENT_REFRESH_IMAGES !== 'generate' || !process.env.OPENAI_API_KEY) return null;
  const slug = route.replace(/^\//, '').replace(/\//g, '-') || 'home';
  const prompt = `Warm editorial watercolor illustration for an Alabama pest control article about "${keyword}". A Southern home and yard in natural light with landscape details that fit the topic. Absolutely no people, no vehicles, no uniforms, no logos, no text or lettering, no insects in close-up. Soft emerald green and sunflower gold accents.`;
  const r = await fetch('https://api.openai.com/v1/images/generations', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '1536x1024' }) });
  if (!r.ok) { console.warn(`[image] ${r.status} ${(await r.text()).slice(0, 160)}`); return null; }
  const b64 = (await r.json())?.data?.[0]?.b64_json;
  if (!b64) return null;
  const { default: sharp } = await import('sharp');
  const rel = `/images/refresh/${slug}.webp`;
  fs.mkdirSync(path.join(ROOT, 'public/images/refresh'), { recursive: true });
  const info = await sharp(Buffer.from(b64, 'base64')).resize({ width: 1200 }).webp({ quality: 80 }).toFile(path.join(ROOT, 'public', rel));
  return { src: rel, alt: `Illustration of a Southern home and yard for a page about ${keyword}`, caption: 'Illustration.', width: info.width, height: info.height };
}

// ── main ────────────────────────────────────────────────────────────────────
function targets() {
  const first = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents/content-refresh-targets.json'), 'utf8')).first;
  const nwt = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents/neuronwriter-targets.json'), 'utf8')).targets
    .sort((a, b) => a.priority - b.priority)
    .map((t) => ({ route: '/' + t.page.replace(/^app\//, '').replace(/\/?page\.tsx$/, ''), keyword: t.keyword }));
  const seen = new Set(); const out = [];
  for (const t of [...first, ...nwt]) if (!seen.has(t.route)) { seen.add(t.route); out.push(t); }
  return ONLY ? out.filter((t) => t.route === ONLY).concat(out.some((t) => t.route === ONLY) ? [] : [{ route: ONLY, keyword: argVal('--keyword', '') }]) : out;
}

async function run() {
  if (!fs.existsSync(BUILD)) throw new Error('No .next build output. Run `npm run build` first — pages are scored as rendered.');
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const rules = compileRules();
  const store = readStore();
  const site = allBuiltPages();
  const lessons = await recall(AGENT, { type: 'lesson', limit: 8 });
  const report = [];
  let changed = 0;

  for (const t of targets()) {
    if (changed >= MAX) break;
    const r = { route: t.route, keyword: t.keyword };
    try {
      if (!supportsRefresh(t.route)) { r.outcome = 'skipped: template does not render RefreshedContent'; report.push(r); continue; }
      const last = await lastTouch(t.route);
      const ageDays = last ? (Date.now() - new Date(last.created_at)) / 864e5 : Infinity;
      if (!FORCE && ageDays < COOLDOWN_DAYS) { r.outcome = `skipped: ${last.status} ${Math.floor(ageDays)}d ago (cool-down ${COOLDOWN_DAYS}d)`; report.push(r); continue; }

      const html = builtHtml(t.route);
      if (!html) { r.outcome = 'skipped: no built HTML'; report.push(r); continue; }
      const queryId = await queryFor(t.keyword);
      if (!queryId) { r.outcome = 'skipped: no READY NeuronWriter query for this keyword (not spending an analysis)'; report.push(r); continue; }
      const title = meta(html, /<title>([^<]*)<\/title>/), desc = meta(html, /<meta name="description" content="([^"]*)"/);
      const base = scorableHtml(html);
      const existing = store[t.route];
      const before = await score(queryId, base, title, desc);
      Object.assign(r, { queryId, before });

      if (before >= BAND_LOW) {
        const figure = existing?.figure || t.figure || null;
        if (figure && !existing?.figure && !DRY) {
          store[t.route] = { ...(existing || {}), figure, neuron: { queryId, keyword: t.keyword, before, after: existing?.neuron?.after ?? null, checkedAt: today() }, source: 'content-refresh-agent', updatedAt: today() };
          writeStore(store); changed++;
          r.outcome = `in band (${before}) — image added, copy untouched`;
        } else r.outcome = `in band (${before}) — nothing to do`;
        await ledger({ route: t.route, keyword: t.keyword, query_id: queryId, status: 'in-band', score_before: before, image_src: figure?.src || null, reason: r.outcome });
        report.push(r); continue;
      }

      const q = await nw('get-query', { query: queryId });
      const pageText = base.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      const comps = await competitorTexts(queryId, q);
      let feedback = null, entry = null, after = null, orig = null;
      for (let attempt = 1; attempt <= 2; attempt++) {
        const d = await draft(anthropic, { route: t.route, keyword: t.keyword, pageText, terms: missingTerms(q, pageText), questions: openQuestions(q), lessons, feedback });
        const copy = [d.heading, ...d.paragraphs, ...d.faqs.flatMap((f) => [f.q, f.a])].join('\n');
        const comp = scanText(copy, rules);
        orig = checkOriginality(copy, { competitors: comps, sitePages: site.filter((p) => p.route !== t.route) });
        const figure = existing?.figure || t.figure || (attempt === 1 ? await illustration(t.route, t.keyword) : null);
        const candidate = { ...d, ...(figure ? { figure } : {}) };
        after = comp.clean && orig.pass ? await score(queryId, withSection(base, sectionHtml(candidate)), title, desc) : null;
        const problems = [];
        if (!comp.clean) problems.push(`Compliance: remove ${comp.blocking.map((b) => `"${b.match}" (${b.reason})`).join(', ')}.`);
        if (!orig.pass) problems.push(`Originality: ${Math.round(orig.maxCompetitorOverlap * 100)}% matches ${orig.worstCompetitor || 'a competitor'}, ${Math.round(orig.maxSiteOverlap * 100)}% matches ${orig.worstSitePage || 'another EnviroCare page'}. Rewrite these in your own words: ${orig.examples.join(' | ')}`);
        if (after !== null && (after < Math.max(before + MIN_GAIN, MIN_AFTER) || after > BAND_CEIL)) problems.push(`NeuronWriter scored the page ${after} (was ${before}); it needs ${Math.max(before + MIN_GAIN, MIN_AFTER)}-${BAND_CEIL}. ${after > BAND_CEIL ? 'Use the terms less.' : `Cover more of: ${missingTerms(q, pageText + ' ' + copy).slice(0, 15).join('; ')}`}`);
        if (!problems.length) { entry = candidate; break; }
        feedback = problems.join('\n');
        r[`attempt${attempt}`] = feedback;
      }
      Object.assign(r, { after, originality: orig && { competitor: orig.maxCompetitorOverlap, site: orig.maxSiteOverlap, checked: orig.competitorsChecked } });

      if (!entry) {
        r.outcome = 'rejected after 2 drafts — page left unchanged';
        await ledger({ route: t.route, keyword: t.keyword, query_id: queryId, status: 'rejected', score_before: before, score_after: after, competitor_overlap: orig?.maxCompetitorOverlap, site_overlap: orig?.maxSiteOverlap, competitors_checked: orig?.competitorsChecked, reason: feedback?.slice(0, 900) });
        await remember(AGENT, `${t.route} rejected: ${feedback?.slice(0, 400)}`, { type: 'lesson', metadata: { route: t.route, date: today() } });
        report.push(r); continue;
      }
      const words = [...entry.paragraphs, ...entry.faqs.flatMap((f) => [f.q, f.a])].join(' ').split(/\s+/).length;
      if (!DRY) {
        store[t.route] = { ...entry, neuron: { queryId, keyword: t.keyword, before, after, checkedAt: today() },
          originality: { maxCompetitorOverlap: orig.maxCompetitorOverlap, maxSiteOverlap: orig.maxSiteOverlap, competitorsChecked: orig.competitorsChecked, checkedAt: today() },
          source: 'content-refresh-agent', updatedAt: today() };
        writeStore(store);
      }
      changed++;
      r.outcome = `refreshed: NeuronWriter ${before} -> ${after}, +${words} words${entry.figure ? `, image ${entry.figure.src}` : ''}`;
      await ledger({ route: t.route, keyword: t.keyword, query_id: queryId, status: 'proposed', score_before: before, score_after: after, words_added: words, competitor_overlap: orig.maxCompetitorOverlap, site_overlap: orig.maxSiteOverlap, competitors_checked: orig.competitorsChecked, image_src: entry.figure?.src || null, reason: 'awaiting PR merge' });
      await remember(AGENT, `${t.route} ${before}->${after} with section "${entry.heading}" (${words} words).`, { type: 'lesson', metadata: { route: t.route, date: today() } });
    } catch (e) {
      r.outcome = `error: ${e.message}`;
      await ledger({ route: t.route, keyword: t.keyword, status: 'error', reason: e.message.slice(0, 900) });
    }
    report.push(r);
  }

  fs.writeFileSync(MANIFEST, JSON.stringify({ date: today(), changed, report }, null, 2));
  for (const r of report) console.log(`${r.route.padEnd(34)} ${r.outcome}`);
  await logAgentRun(AGENT, 'success', { changed, report }, `${changed} page(s) changed`);
}

run().catch(async (e) => { console.error(e); await logAgentRun(AGENT, 'error', { error: e.message }).catch(() => {}); process.exit(1); });
