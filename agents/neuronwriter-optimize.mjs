// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/neuronwriter-optimize.mjs
// Commit: feat(agents): NeuronWriter optimize agent — iterate until 70, PR-gated, no $1M guarantee
// Push: main
// ─────────────────────────────────────
//
// NeuronWriter OPTIMIZE agent for EnviroCare. Sibling to neuronwriter-qa.mjs.
// QA scores + reports; this agent FIXES by rewriting copy and LOOPING until the
// draft clears the 70 threshold (or MAX_PASSES is hit), then writes it for review.
//
// It DOES NOT edit page.tsx and DOES NOT push to main. The workflow opens a PR.
// Phillip reviews + merges. Next Monday's QA confirms the live score.
//
// Locked rules: target band 70-80 (never 100); never auto-deploy content; never
// invent pricing; NO dollar-amount damage guarantee in drafts; compliance below.

import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import targetsData from './neuronwriter-targets.json' with { type: 'json' };
import { analyzePageContent, scoreContent } from './lib/neuronwriter.mjs';
import { logAgentRun } from './lib/supabase.mjs';
import { remember, recall } from './lib/memory.mjs';

const AGENT = 'neuronwriter-optimize';
const MODEL = 'claude-sonnet-4-6';
const SCORE_PASS = 70;
const MAX_PASSES = 3;   // "whatever it takes" — capped so cost/time stay sane (~$0.05/page/pass)
const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://envirocare-web.vercel.app';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, 'reports', 'optimized');

function pageToUrl(page)  { return `${SITE_BASE}/${page.replace(/^app\//,'').replace(/\/page\.tsx$/,'')}`; }
function pageToSlug(page) { return page.replace(/^app\//,'').replace(/\/page\.tsx$/,'').replace(/\//g,'-'); }

// ─── COMPLIANCE (non-negotiable) ─────────────────────────────────────────────
const COMPLIANCE = `
You are rewriting copy for EnviroCare Pest & Termite Services, a fourth-generation
family-owned Alabama pest control company (Wedgworth family, founded 1958).
Rewrite naturally — like a person wrote it. NEVER keyword-stuff.

HARD RULES — breaking any one makes the output unusable:
- NEVER use: safe, pet-safe, kid-safe, child-safe, non-toxic, eco-safe, "safe for pets/kids".
  Say "EPA-registered products applied according to label directions" instead.
- NEVER promise same-day service, "there today", "available now", or a specific technician.
- NEVER name a competitor.
- NEVER state a review count (star ratings are fine; counts are not).
- NEVER use "guarantee" in mosquito copy. Never say "eliminate mosquitoes".
- NEVER say "100% satisfaction guarantee".
- NEVER flat-price termite work — termite is always "subject to a free WDO inspection".
- DO NOT include any dollar-amount damage guarantee. Omit "$1,000,000", "up to $1 million",
  "million-dollar guarantee" and any similar figure entirely. Describe coverage without a dollar amount.
- NEVER mention Tuscaloosa (not a service area).
- NEVER use "Bundle & Save" or frame bundling as a discount — bundling is convenience only.
- Always write "fourth-generation" / "four generations".
- Do NOT invent or change any price, phone number, or service area. Keep every number in the
  current copy exactly as-is. If a fact isn't in the current copy, omit it.
- Target a NeuronWriter score of 70-80. Do NOT over-optimize toward 100.
Return ONLY the rewritten page copy as clean Markdown. No preamble, no score talk.
`.trim();

async function fetchLiveText(url) {
  const resp = await fetch(url, { headers: { 'User-Agent': 'EnviroCare-NW-Optimize/1.0' } });
  if (!resp.ok) throw new Error(`fetch ${url} -> ${resp.status}`);
  const html = await resp.text();
  const text = html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ')
                    .replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  return { html, text };
}

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  const mod = await import('@anthropic-ai/sdk');
  const Anthropic = mod.default ?? mod;
  anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1 });
}

async function rewrite({ keyword, baseText, terms, pass, lastScore, priorTerms = [] }) {
  if (!anthropic) throw new Error('ANTHROPIC_API_KEY not set');
  const push = pass > 1
    ? `\nThis is rewrite pass ${pass}. The previous draft scored ${lastScore}, still below 70. Work in MORE of the target terms below — naturally, no stuffing — and add a relevant FAQ or detail paragraph if it helps coverage.`
    : '';
  const learned = priorTerms.length
    ? `\nTerms that helped a PRIOR winning version of this page clear 70 — prioritise weaving these in: ${priorTerms.join(', ')}`
    : '';
  const user = [
    `Target keyword: ${keyword}`,
    `Target terms to weave in naturally (fit what reads well): ${terms.join(', ')}`,
    learned,
    push,
    ``,
    `CURRENT PAGE COPY (rewrite this — keep every price, phone number and fact identical):`,
    baseText.slice(0, 9000),
  ].join('\n');
  const msg = await anthropic.messages.create({
    model: MODEL, max_tokens: 2800, system: COMPLIANCE,
    messages: [{ role: 'user', content: user }],
  });
  return msg.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
}

function readScore(x) {
  const v = x?.content_score ?? x?.score ?? x?.contentScore;
  return typeof v === 'number' ? v : null;
}

async function run() {
  const targets = targetsData.targets;
  mkdirSync(OUT_DIR, { recursive: true });
  const summary = [];

  for (const t of targets) {
    const url = pageToUrl(t.page), slug = pageToSlug(t.page);
    try {
      const { html, text } = await fetchLiveText(url);
      const a = await analyzePageContent(t.keyword, { html, text });
      const baseScore = a?.score ?? null;
      const queryId = a?.queryId;
      const terms = [...new Set([...(a?.missing ?? []), ...(a?.underused ?? [])])].slice(0, 40);
      const mem = await recall('neuronwriter-optimize', { type: 'cleared-terms', like: t.keyword, limit: 1 });
      const priorTerms = mem[0]?.metadata?.terms ?? [];

      if (baseScore != null && baseScore >= SCORE_PASS) {
        summary.push({ slug, keyword: t.keyword, base: baseScore, final: baseScore, passes: 0, cleared: true, action: 'skip (already ≥70)' });
        process.stdout.write(`  ✓ ${slug}: ${baseScore} — already on target\n`);
        continue;
      }

      let draft = '', finalScore = baseScore, p = 0;
      for (p = 1; p <= MAX_PASSES; p++) {
        draft = await rewrite({ keyword: t.keyword, baseText: text, terms, pass: p, lastScore: finalScore, priorTerms });
        let s = baseScore;
        if (queryId) {
          try { s = readScore(await scoreContent(queryId, draft)) ?? s; } catch (e) { /* keep last */ }
        }
        finalScore = s;
        process.stdout.write(`    ${slug} pass ${p}: ${s ?? 'n/a'}\n`);
        if (s != null && s >= SCORE_PASS) break;
      }

      const cleared = finalScore != null && finalScore >= SCORE_PASS;
      if (cleared) await remember('neuronwriter-optimize', `cleared 70 for "${t.keyword}"`, { type: 'cleared-terms', metadata: { keyword: t.keyword, slug, terms, score: finalScore } });
      const header = [
        `<!-- NeuronWriter OPTIMIZE draft — REVIEW BEFORE PUBLISHING -->`,
        `<!-- page: ${t.page} | keyword: ${t.keyword} -->`,
        `<!-- base score: ${baseScore ?? 'n/a'} → draft score: ${finalScore ?? 'n/a'} after ${p} pass(es) | ${cleared ? 'CLEARED 70 ✅' : 'DID NOT clear 70 — review carefully ⚠️'} -->`,
        `<!-- terms targeted: ${terms.join(', ')} -->`,
        ``,
      ].join('\n');
      writeFileSync(join(OUT_DIR, `${slug}.md`), header + draft + '\n');
      summary.push({ slug, keyword: t.keyword, base: baseScore, final: finalScore, passes: p, cleared, action: cleared ? 'draft ≥70 — ready to review' : 'draft <70 after max passes' });
      process.stdout.write(`  ${cleared ? '↑' : '⚠'} ${slug}: ${baseScore ?? 'n/a'} → ${finalScore ?? 'n/a'} (${cleared ? 'cleared' : 'not cleared'})\n`);
    } catch (e) {
      summary.push({ slug, keyword: t.keyword, base: null, final: null, passes: 0, cleared: false, action: `error: ${e.message}` });
      process.stdout.write(`  ✗ ${slug}: ${e.message}\n`);
    }
  }

  const cleared = summary.filter(s => s.cleared && s.passes > 0).length;
  let md = `# NeuronWriter Optimize — ${new Date().toISOString().slice(0,10)}\n\n`;
  md += `Drafts that cleared 70: **${cleared}**. Target band 70–80. Review each before merging.\n\n`;
  md += `| Page | Keyword | Base | Draft | Passes | Status |\n|---|---|---|---|---|---|\n`;
  for (const s of summary)
    md += `| ${s.slug} | ${s.keyword} | ${s.base ?? '—'} | ${s.final ?? '—'} | ${s.passes} | ${s.action} |\n`;
  writeFileSync(join(OUT_DIR, '_SUMMARY.md'), md);
  console.log(`\n${cleared} draft(s) cleared 70 → agents/reports/optimized/`);
  await logAgentRun(AGENT, 'ok', { cleared, total: summary.length });
  return { cleared, summary };
}

run().catch(async e => {
  console.error(`[${AGENT}] ${e.message}`);
  try { await logAgentRun(AGENT, 'fail', { error: e.message }); } catch {}
  process.exit(1);
});
