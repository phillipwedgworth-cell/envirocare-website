/**
 * AEO-Watch — monitors AEO/SEO/schema/AI-search/pest-industry news and surfaces
 * what matters to EnviroCare. One agent, scheduled daily via GitHub Actions.
 *
 * Lifecycle (this is also the template for the queued shared agent-template.mjs):
 *
 *   1. CONTEXT_READ  — load sources, last-run timestamp, dedup state
 *   2. WORK          — fetch each source, parse, filter to candidates
 *   3. CRITIC        — for candidates passing keyword threshold, run 3-model panel
 *   4. WRITE         — persist findings + panel votes to Supabase
 *   5. NOTIFY        — push SHIP findings to Notion + email digest
 *
 * Run locally:   node agents/aeo-watch.mjs
 * Run scheduled: see .github/workflows/aeo-watch.yml
 */

import { readFile } from 'node:fs/promises';
import { panel } from './lib/llm-panel.mjs';
import {
  startRun,
  endRun,
  upsertFinding,
  recordPanel,
} from './lib/supabase-client.mjs';
import { pushToNotion, emailDigest } from './lib/notifier.mjs';

// ───── CONTEXT_READ ────────────────────────────────────────────────────────
async function loadConfig() {
  const raw = await readFile(new URL('./sources/aeo-sources.json', import.meta.url), 'utf8');
  return JSON.parse(raw);
}

// ───── WORK: fetch + parse ────────────────────────────────────────────────
async function fetchRss(url) {
  const r = await fetch(url, { headers: { 'user-agent': 'AEO-Watch/1.0 (EnviroCare)' } });
  if (!r.ok) throw new Error(`${r.status}`);
  const xml = await r.text();
  // Lightweight RSS parser — no deps. Pulls <item> blocks with title/link/description/pubDate.
  const items = [];
  const itemRe = /<item[\s>][\s\S]*?<\/item>/gi;
  const entryRe = /<entry[\s>][\s\S]*?<\/entry>/gi;  // Atom
  const blocks = (xml.match(itemRe) || []).concat(xml.match(entryRe) || []);
  for (const block of blocks.slice(0, 20)) {
    const title = strip(matchTag(block, 'title'));
    const link = strip(matchTag(block, 'link')) || hrefAttr(block);
    const desc = strip(matchTag(block, 'description') || matchTag(block, 'summary') || matchTag(block, 'content'));
    const date = strip(matchTag(block, 'pubDate') || matchTag(block, 'updated') || matchTag(block, 'published'));
    if (title && link) items.push({ title, link, summary: desc.slice(0, 600), date });
  }
  return items;
}

async function fetchGithubCommits(url) {
  const r = await fetch(url, { headers: { 'user-agent': 'AEO-Watch/1.0', accept: 'application/vnd.github+json' } });
  if (!r.ok) throw new Error(`${r.status}`);
  const arr = await r.json();
  return arr.slice(0, 10).map((c) => ({
    title: c.commit?.message?.split('\n')[0] || c.sha,
    link: c.html_url,
    summary: c.commit?.message || '',
    date: c.commit?.author?.date,
  }));
}

async function fetchScrape(url) {
  // Lightweight HTML scrape — pulls <a> tags. Good enough for changelog/news index pages.
  // Heavy parsing (article extraction) is intentionally NOT done here — the panel reads titles only.
  const r = await fetch(url, { headers: { 'user-agent': 'AEO-Watch/1.0' } });
  if (!r.ok) throw new Error(`${r.status}`);
  const html = await r.text();
  const items = [];
  const linkRe = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const seen = new Set();
  while ((m = linkRe.exec(html)) && items.length < 25) {
    const href = m[1];
    const text = strip(m[2]).slice(0, 200);
    if (!text || text.length < 8 || seen.has(href)) continue;
    seen.add(href);
    const absHref = href.startsWith('http') ? href : new URL(href, url).toString();
    items.push({ title: text, link: absHref, summary: '', date: null });
  }
  return items;
}

function matchTag(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = block.match(re);
  return m ? m[1] : '';
}
function hrefAttr(block) {
  const m = block.match(/<link[^>]+href=["']([^"']+)["']/i);
  return m ? m[1] : '';
}
function strip(s) {
  return String(s || '')
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// ───── CRITIC: relevance scoring + multi-model panel ──────────────────────
function relevanceScore(item, keywords) {
  const hay = `${item.title} ${item.summary}`.toLowerCase();
  let score = 0;
  const hits = [];
  for (const kw of keywords) {
    if (hay.includes(kw.toLowerCase())) { score++; hits.push(kw); }
  }
  return { score, hits };
}

async function judge(item, sourceMeta) {
  const prompt = `You are evaluating whether a piece of industry news is worth surfacing to the owner of a third-generation Alabama pest control company (EnviroCare). The company cares specifically about: schema.org / AEO / AI search visibility (ChatGPT, Perplexity, Gemini, Google AI Overviews), Next.js + Vercel changes that affect their site, pest-industry product news (especially Sentricon and Corteva), Alabama Dept of Agriculture rule changes, and Google Ads / local-SEO platform changes (BrightLocal, Fieldster).

Item:
  Title: ${item.title}
  Source: ${sourceMeta.name}
  Summary: ${item.summary || '(none)'}
  URL: ${item.link}

Should the owner see this in their daily digest? Decide SHIP (yes, take action or read), SKIP (noise/irrelevant), or HOLD (unclear).`;
  return await panel(prompt);
}

// ───── Main ───────────────────────────────────────────────────────────────
async function main() {
  const config = await loadConfig();
  const runId = await startRun();
  const log = (msg) => console.log(`[aeo-watch] ${msg}`);

  let totalChecked = 0;
  let candidates = 0;
  let shipped = 0;
  const shipList = [];

  for (const src of config.sources) {
    log(`fetching ${src.id}`);
    let items = [];
    try {
      if (src.type === 'rss') items = await fetchRss(src.url);
      else if (src.type === 'github-commits') items = await fetchGithubCommits(src.url);
      else if (src.type === 'scrape') items = await fetchScrape(src.url);
    } catch (e) {
      log(`  ! fetch failed: ${e.message}`);
      continue;
    }

    // Source-level keyword filter (cheap, narrows before panel)
    if (src.keywordFilter?.length) {
      items = items.filter((it) =>
        src.keywordFilter.some((kw) => `${it.title} ${it.summary}`.toLowerCase().includes(kw.toLowerCase()))
      );
    }

    log(`  ${items.length} items`);
    totalChecked += items.length;

    for (const it of items) {
      const { score, hits } = relevanceScore(it, config.envirocare_keywords);
      // Two scoring lanes:
      //   - keyword match score >= 2  → panel (likely SHIP candidate)
      //   - high-priority source + keyword match >= 1 → panel
      //   - otherwise → log only, no panel call
      const goPanel = score >= 2 || (src.priority === 'high' && score >= 1);
      if (!goPanel) continue;
      candidates++;

      const dedupKey = `${src.id}::${it.link}`;
      let panelResult = null;
      try {
        panelResult = await judge(it, src);
      } catch (e) {
        log(`  ! panel failed for "${it.title.slice(0, 60)}": ${e.message}`);
        continue;
      }

      const finding = await upsertFinding({
        dedupKey,
        source: src.name,
        title: it.title,
        url: it.link,
        summary: it.summary || hits.join(', '),
        tags: src.tags,
        panelResult,
      });
      if (!finding.inserted) continue; // dup, already surfaced previously

      await recordPanel(finding.id, panelResult);

      if (panelResult.consensus === 'SHIP') {
        shipped++;
        shipList.push({
          title: it.title,
          source: src.name,
          summary: it.summary,
          url: it.link,
          tags: src.tags,
        });

        // Push every SHIP finding to Notion immediately (atomic per item)
        await pushToNotion({
          title: it.title,
          source: src.name,
          summary: it.summary || hits.join(', '),
          url: it.link,
          tags: src.tags,
          panelReasoning: panelResult.votes.map((v) => `${v.source}: ${v.reasoning}`).join(' | '),
        });
      }
    }
  }

  // ───── NOTIFY: one digest email per run if anything shipped ─────
  if (shipList.length) await emailDigest({ agent: 'aeo-watch', findings: shipList });

  await endRun(runId, {
    sourcesChecked: config.sources.length,
    totalItems: totalChecked,
    panelCalls: candidates,
    shipped,
    timestamp: new Date().toISOString(),
  });

  log(`done. ${totalChecked} items, ${candidates} panel calls, ${shipped} SHIP`);
}

main().catch((e) => {
  console.error('[aeo-watch] FATAL:', e);
  process.exit(1);
});
