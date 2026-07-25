// agents/neuronwriter-qa.mjs
// NeuronWriter content-quality QA agent for EnviroCare.
//
// Pattern: CONTEXT_READ → WORK (NeuronWriter API) → SYNTHESIS → CRITIC → WRITE → NOTIFY
//
// CLI:
//   node agents/neuronwriter-qa.mjs --page app/services/termite-control/page.tsx --keyword "termite control birmingham al"
//   node agents/neuronwriter-qa.mjs --all
//
// Orchestrator: imports run() — same as --all but returns { brief, results, failCount }
//
// NEVER edits pages. NEVER echoes NEURONWRITER_API_KEY to terminal.
// Exits 1 (CLI) or returns failCount > 0 when any page scores below 70.
// Target band: 70-80. Do not optimize toward 100.

import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import targetsData from './neuronwriter-targets.json' with { type: 'json' };
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { analyzePageContent } from './lib/neuronwriter.mjs';
import { stateGet, stateSet } from './lib/kv.mjs';
import { writeFinding, logAgentRun } from './lib/supabase.mjs';
import { createMessage } from './lib/llm-with-logging.mjs';
import { criticLoop, isExternallyBlocked } from './lib/critic.mjs';
import { appendWeeklyResult } from './lib/notion.mjs';

const AGENT_NAME = 'neuronwriter-qa';
const WORKER_MODEL = 'claude-haiku-4-5-20251001';
const SCORE_PASS = 70;
// Concurrency cap: 3 parallel NeuronWriter queries keeps total runtime ~2-3 min for 14 pages.
const CONCURRENCY = 3;

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  try {
    const mod = await import('@anthropic-ai/sdk');
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0 });
  } catch (e) {
    console.error(`[${AGENT_NAME}] failed to import @anthropic-ai/sdk: ${e.message}`);
  }
}

// ─── QUOTA GUARD ───────────────────────────────────────────────────────────
// The 2026-06-29 and 07-06 runs each threw ~15 "new-query 429: analysis
// exceeds monthly keyword analyses" errors — every page after the quota ran
// out burned an attempt and an error row. Now: the first 429 halts the run
// (one summary line, one finding), and the exhaustion is remembered in
// agent_state so later runs skip pre-flight until the quota month rolls over.

const QUOTA_STATE_KEY = 'neuronwriter:quota-exhausted';
const QUOTA_RE = /\b429\b|exceeds\s+(the\s+)?(number\s+of\s+|monthly\s+)?(keyword\s+)?analyses|quota/i;
const isQuotaError = msg => QUOTA_RE.test(String(msg ?? ''));

// The NeuronWriter subscription renews on the 10th of each month (Phillip's
// plan), not the 1st — the analysis quota refills then. Override with
// NEURONWRITER_RENEWAL_DAY if the billing date ever changes.
const RENEWAL_DAY = Math.min(28, Math.max(1, Number(process.env.NEURONWRITER_RENEWAL_DAY ?? 10) || 10));

// Most recent renewal instant (RENEWAL_DAY 00:00 UTC) at or before now.
function lastRenewalMs(now = Date.now()) {
  const d = new Date(now);
  const thisMonth = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), RENEWAL_DAY);
  return now >= thisMonth ? thisMonth : Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, RENEWAL_DAY);
}

function nextRenewalISO(now = Date.now()) {
  const d = new Date(now);
  const thisMonth = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), RENEWAL_DAY);
  return new Date(now < thisMonth ? thisMonth : Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, RENEWAL_DAY)).toISOString();
}

// ─── CONTEXT_READ ──────────────────────────────────────────────────────────

// Static JSON import so Next.js bundles the targets into the lambda
// (readFileSync + __dirname pointed at /vercel/path0/... which isn't traced).
// Sorted money-pages-first (priority 1 → 3) so a mid-run quota halt costs the
// long tail, never termite/pest-control/Birmingham/Huntsville.
function loadTargets() {
  return [...targetsData.targets].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

// Map a repo page path (app/services/termite-control/page.tsx) to its live URL.
// Scoring the LIVE rendered HTML is the only accurate option — most page.tsx
// files are thin wrappers around shared templates, so reading the source
// produced "<100 chars" for 13 of 16 targets.
const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.envirocarellc.com';

function pageToUrl(page) {
  const route = page.replace(/^app\//, '/').replace(/\/page\.tsx$/, '').replace(/^\/$/, '');
  return `${SITE_BASE}${route || '/'}`;
}

// Strip a rendered HTML document down to visible text.
function extractTextFromHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── WORK ──────────────────────────────────────────────────────────────────

async function analyzeOnePage({ page, keyword }) {
  const url = pageToUrl(page);
  let html;
  try {
    const resp = await fetch(url, { headers: { 'User-Agent': 'envirocare-neuronwriter-qa' } });
    if (!resp.ok) return { page, keyword, score: null, error: `live fetch ${resp.status} for ${url}` };
    html = await resp.text();
  } catch (err) {
    return { page, keyword, score: null, error: `live fetch failed: ${err.message}` };
  }

  const text = extractTextFromHtml(html);
  if (text.length < 100) {
    return { page, keyword, score: null, error: 'extracted content too short (<100 chars)' };
  }

  console.log(`[${AGENT_NAME}] analyzing ${page} → "${keyword}"`);
  try {
    // Full HTML to evaluate-content (better score fidelity); stripped text
    // for local term counting.
    const result = await analyzePageContent(keyword, { html, text });
    return { page, keyword, ...result };
  } catch (err) {
    console.error(`[${AGENT_NAME}] NeuronWriter error for ${page}: ${err.message}`);
    return { page, keyword, score: null, error: err.message };
  }
}

async function runAllTargets(targets) {
  const results = [];
  let quotaHit = false;
  // Process in CONCURRENCY-sized batches so we don't hammer the NeuronWriter API.
  // The first quota 429 halts the loop between batches — pages already in
  // flight finish, but no new batch launches once the quota is known dead.
  for (let i = 0; i < targets.length && !quotaHit; i += CONCURRENCY) {
    const batch = targets.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(batch.map(analyzeOnePage));
    for (const r of settled) {
      const val = r.status === 'fulfilled' ? r.value : { page: '?', keyword: '?', score: null, error: r.reason?.message ?? 'unknown' };
      results.push(val);
      if (val.error && isQuotaError(val.error)) quotaHit = true;
    }
  }
  return { results, quotaHit };
}

// ─── SYNTHESIS ─────────────────────────────────────────────────────────────

const WORKER_SYSTEM = `You are the content-quality analyst for EnviroCare Pest Control (Alabama pest control company).

You receive NeuronWriter content scores for multiple service and city pages.

YOUR JOB:
For each page, write one short actionable recommendation (max 2 sentences) that names specific missing/underused terms.

OUTPUT FORMAT — exact markdown:

# NeuronWriter QA Report — [date]

## Score Summary
[compact table: Page | Keyword | Score | Status]

## Per-Page Recommendations
### [page-name]
Score: [N]/100 — [✅ IN BAND | 🔴 BELOW THRESHOLD | 🟡 ABOVE BAND]
Recommendation: [specific action citing actual missing terms]
Top missing: [comma-separated list, max 5]

## Action Priority
[3 bullets: the 3 highest-value improvements, each naming a specific page and term]

RULES:
- Target band is 70-80. Flag below 70 as BELOW THRESHOLD, above 80 as above target band.
- Never suggest optimizing toward 100.
- Never recommend banned language: same-day, pet-safe, kid-safe, non-toxic, eco-safe, AVAILABLE NOW.
- Recommendations must name specific missing terms, not generic advice like "improve your content."
- Under 600 words total. No preamble, no sign-off.`;

async function workerDraft(results, feedback = null) {
  if (!anthropic) throw new Error('ANTHROPIC_API_KEY missing');

  const today = new Date().toISOString().slice(0, 10);
  const queriesUsed = results.filter(r => !r.error && r.queryId).length;
  const dataBlock = results.map(r => {
    if (r.error) return `### ${r.page}\nERROR: ${r.error}`;
    const status = r.score < 70 ? 'BELOW THRESHOLD' : r.score > 80 ? 'ABOVE BAND' : 'IN BAND (70-80)';
    const missingList = (r.missing ?? []).slice(0, 10).join(', ') || 'none';
    const underusedList = (r.underused ?? []).slice(0, 5).map(u => `${u.term}(${u.count})`).join(', ') || 'none';
    const questionsList = (r.questions ?? []).slice(0, 3).join(' | ') || 'none';
    return `### ${r.page}\nKeyword: ${r.keyword}\nScore: ${r.score}/100 — ${status}\nMissing terms: ${missingList}\nUnderused: ${underusedList}\nSuggested questions: ${questionsList}`;
  }).join('\n\n');

  const prompt = feedback
    ? `Today: ${today}\nQueries used this run: ${queriesUsed}\n\nRevise the report addressing this critic feedback:\n${feedback}\n\nRAW DATA:\n${dataBlock}`
    : `Today: ${today}\nQueries used this run: ${queriesUsed}\n\nRAW DATA:\n${dataBlock}`;

  const resp = await createMessage(anthropic, {
    model: WORKER_MODEL,
    max_tokens: 1800,
    system: WORKER_SYSTEM,
    messages: [{ role: 'user', content: prompt }],
  }, { agentName: AGENT_NAME, role: 'worker' });

  return resp.content.find(b => b.type === 'text')?.text?.trim() ?? '';
}

// ─── CRITIC ────────────────────────────────────────────────────────────────

const rubric = `
- Every page with a score lists the numeric value (e.g. "73/100")
- Pages with score < 70 explicitly marked BELOW THRESHOLD
- Each page has a recommendation naming at least one specific missing term (not generic advice)
- Target band 70-80 mentioned at least once
- No banned language: same-day, pet-safe, kid-safe, non-toxic, eco-safe, AVAILABLE NOW
- Action Priority section lists at least 2 specific page+term combinations
- Under 700 words, no preamble, no sign-off`;

// ─── WRITE ─────────────────────────────────────────────────────────────────

async function writeReport(final, results) {
  const today = new Date().toISOString().slice(0, 10);
  // Vercel's project filesystem (/vercel/path0/...) is READ-ONLY at runtime, so
  // mkdir under REPO_ROOT/agents/reports throws ENOENT/EROFS in production. The
  // only writable location in a Vercel lambda is the OS temp dir, so the .md
  // artifact lands there. The durable copy is the Supabase finding written below;
  // this file is just a convenience dump (overridable via NW_REPORT_DIR).
  const reportDir = process.env.NW_REPORT_DIR || join(tmpdir(), 'reports');
  try {
    mkdirSync(reportDir, { recursive: true });
    const reportPath = join(reportDir, `neuronwriter-${today}.md`);
    writeFileSync(reportPath, final, 'utf8');
    console.log(`[${AGENT_NAME}] report saved → ${reportPath}`);
  } catch (e) {
    // Never let a failed file dump abort the run — the Supabase finding is the
    // source of truth and is written regardless.
    console.error(`[${AGENT_NAME}] report file dump skipped: ${e.message}`);
  }

  const failures = results.filter(r => !r.error && r.score < SCORE_PASS);
  await writeFinding(
    AGENT_NAME,
    'seo',
    failures.length > 0 ? 'warning' : 'info',
    null,
    `NeuronWriter QA: ${results.filter(r => !r.error).length} pages scored, ${failures.length} below threshold`,
    {
      run_date: today,
      results: results.map(r => ({ page: r.page, keyword: r.keyword, score: r.score, error: r.error ?? null })),
      fail_count: failures.length,
    },
  );
}

// ─── RAW TABLE FALLBACK (no LLM required) ─────────────────────────────────

function rawTableReport(results) {
  const today = new Date().toISOString().slice(0, 10);
  const queriesUsed = results.filter(r => !r.error && r.queryId).length;
  const rows = results.map(r => {
    if (r.error) return `| ${r.page.replace('app/', '')} | ${r.keyword} | ERR | ⚠️ ${String(r.error).slice(0, 60)} |`;
    const band = r.score < 70 ? '🔴 BELOW' : r.score > 80 ? '🟡 ABOVE' : '✅ IN BAND';
    const top5 = (r.missing ?? []).slice(0, 5).join(', ') || '—';
    return `| ${r.page.replace('app/', '')} | ${r.keyword} | ${r.score}/100 ${band} | ${top5} |`;
  });
  return [
    `# NeuronWriter QA Report — ${today}`,
    `**Queries used this run: ${queriesUsed} of ~50 monthly**`,
    '',
    '| Page | Keyword | Score | Top 5 Missing Terms |',
    '|---|---|---|---|',
    ...rows,
    '',
    `Target band: 70–80. Pages below 70 flagged 🔴. Generated without LLM synthesis.`,
  ].join('\n');
}

// ─── ENTRY POINT (orchestrator) ────────────────────────────────────────────

export async function run() {
  // Weekly gate: each batch run consumes ~16 of 75 monthly NeuronWriter
  // analyses; the orchestrator cron fires DAILY. Mondays only in automation.
  const isMondayRun = new Date().getUTCDay() === 1;
  const viaCli = process.argv[1] && process.argv[1].includes('neuronwriter-qa');
  if (!isMondayRun && !viaCli && process.env.FORCE_NEURONWRITER !== '1') {
    console.log('[neuronwriter-qa] not Monday - skipping batch (FORCE_NEURONWRITER=1 to override)');
    return { skipped: true, reason: 'weekly agent — runs Mondays (quota protection)' };
  }
  if (!process.env.NEURONWRITER_API_KEY) {
    console.log(`[${AGENT_NAME}] key not set — skipping`);
    return { skipped: true, reason: 'NEURONWRITER_API_KEY not set' };
  }

  // Pre-flight quota check: if a prior run already hit the monthly cap, don't
  // burn a single analysis (or LLM token) until the quota month rolls over.
  // Self-heal: a block detected BEFORE the last renewal date is stale (the
  // quota refilled since) — clear it and proceed, even if the stored resets_at
  // was computed with the old first-of-month logic.
  let quotaState = await stateGet(QUOTA_STATE_KEY).catch(() => null);
  if (quotaState?.detected_at && new Date(quotaState.detected_at).getTime() < lastRenewalMs()) {
    console.log(`[${AGENT_NAME}] quota block from ${String(quotaState.detected_at).slice(0, 10)} predates the last renewal (day ${RENEWAL_DAY}) — clearing stale block and proceeding`);
    await stateSet(QUOTA_STATE_KEY, { cleared_at: new Date().toISOString() }).catch(() => {});
    quotaState = null;
  }
  if (quotaState?.resets_at && Date.now() < new Date(quotaState.resets_at).getTime()) {
    const msg = `NeuronWriter monthly analysis quota exhausted (detected ${String(quotaState.detected_at ?? '').slice(0, 10)}) — skipping until ${String(quotaState.resets_at).slice(0, 10)}`;
    console.warn(`[${AGENT_NAME}] ${msg}`);
    await logAgentRun(AGENT_NAME, 'blocked', msg).catch(() => {});
    return { skipped: true, blocked: true, reason: msg };
  }

  console.log(`[${AGENT_NAME}] Starting batch run`);

  const targets = loadTargets();
  const { results, quotaHit } = await runAllTargets(targets);

  // Quota died mid-run: ONE summary line + ONE finding, remember the
  // exhaustion for pre-flight, and skip synthesis/critic entirely (no LLM
  // burn, no per-page error rows — the old behavior logged ~15 of them).
  if (quotaHit) {
    const scored = results.filter(r => !r.error && r.score != null).length;
    const notAttempted = targets.length - results.length;
    const resetsAt = nextRenewalISO();
    await stateSet(QUOTA_STATE_KEY, { detected_at: new Date().toISOString(), resets_at: resetsAt }).catch(() => {});
    const msg = `NeuronWriter 429 (monthly analysis quota) — halted after ${scored} scored page(s); ${notAttempted} page(s) not attempted. Auto-resumes ${resetsAt.slice(0, 10)}.`;
    console.warn(`[${AGENT_NAME}] ${msg}`);
    await writeFinding(AGENT_NAME, 'seo', 'warning', null, msg,
      { blocked: true, quota: true, scored, not_attempted: notAttempted, resets_at: resetsAt }).catch(() => {});
    await logAgentRun(AGENT_NAME, 'blocked', msg).catch(() => {});
    return { blocked: true, reason: msg, brief: `blocked: ${msg}`, results, failCount: 0 };
  }

  let draft;
  try {
    draft = await workerDraft(results);
  } catch (e) {
    console.warn(`[${AGENT_NAME}] LLM synthesis unavailable (${e.message}) — using raw table`);
    draft = rawTableReport(results);
  }

  // Surface per-page tool failures (e.g. NeuronWriter 429 / quota) to the critic
  // so a blocked run short-circuits instead of burning all 3 revision loops.
  const toolErrors = results.filter(r => r.error).map(r => r.error);

  const critic = anthropic ? await criticLoop({
    workerName: AGENT_NAME,
    task: 'NeuronWriter content quality QA report for 16 EnviroCare service and city pages',
    output: draft,
    rubric,
    revise: fb => workerDraft(results, fb),
    toolErrors,
    onEscalate: async out => {
      console.warn(`[${AGENT_NAME}] critic escalated — accepting best draft`);
      await logAgentRun(AGENT_NAME, 'escalated', out).catch(() => {});
    },
  }) : draft;

  // External-dependency block (NeuronWriter quota/rate limit). Report it honestly
  // — a blocked run is NOT a failed QA report, so don't write/Notion-post filler.
  if (isExternallyBlocked(critic)) {
    const reason = `NeuronWriter quota/rate limit reached (${critic.reason}; resets monthly)`;
    console.warn(`[${AGENT_NAME}] blocked — ${reason}`);
    await writeFinding(AGENT_NAME, 'seo', 'warning', null, `Blocked: ${reason}`,
      { blocked: true, reason: critic.reason }).catch(() => {});
    await logAgentRun(AGENT_NAME, 'blocked', reason).catch(() => {});
    return { blocked: true, reason, brief: `blocked: ${reason}`, results, failCount: 0 };
  }

  const final = critic;
  await writeReport(final, results).catch(e => console.error(`[${AGENT_NAME}] writeReport error: ${e.message}`));
  await appendWeeklyResult(results).catch(e => console.error(`[${AGENT_NAME}] Notion post error: ${e.message}`));
  await logAgentRun(AGENT_NAME, 'ok', final).catch(() => {});

  const failCount = results.filter(r => !r.error && r.score < SCORE_PASS).length;
  console.log(`[${AGENT_NAME}] Done. ${failCount} page(s) below threshold.`);
  return { brief: final, results, failCount };
}

// ─── CLI ───────────────────────────────────────────────────────────────────

const isCli = process.argv[1] && (
  process.argv[1].endsWith('neuronwriter-qa.mjs') ||
  process.argv[1].endsWith('neuronwriter-qa')
);

if (isCli) {
  const args = process.argv.slice(2);
  const get = flag => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };
  const has = flag => args.includes(flag);

  if (!process.env.NEURONWRITER_API_KEY) {
    console.error(`[${AGENT_NAME}] NEURONWRITER_API_KEY not set in .env`);
    process.exit(1);
  }

  if (has('--all')) {
    const result = await run();
    if (result.skipped) { console.log('[neuronwriter-qa] skipped'); process.exit(0); }
    console.log('\n' + result.brief);
    // Report-only: a completed run is a SUCCESS even when pages score below 70.
    // Low scores are findings (see the report/Notion), not a pipeline failure.
    // A genuine break (missing key, bad import, API down) still exits non-zero
    // via the early guards / uncaught errors — so red = something actually broke.
    console.log(`[${AGENT_NAME}] ${result.failCount} page(s) below 70 — logged as findings, run OK.`);
    process.exit(0);

  } else {
    const page = get('--page');
    const keyword = get('--keyword');
    if (!page || !keyword) {
      console.error('Usage:');
      console.error('  node agents/neuronwriter-qa.mjs --page <path> --keyword "<keyword>"');
      console.error('  node agents/neuronwriter-qa.mjs --all');
      process.exit(1);
    }

    const r = await analyzeOnePage({ page, keyword });
    if (r.error) {
      console.error(`Error: ${r.error}`);
      process.exit(1);
    }

    const band = r.score < 70 ? '🔴 BELOW THRESHOLD' : r.score > 80 ? '🟡 ABOVE BAND (>80)' : '✅ IN BAND (70-80)';
    console.log(`\n── NeuronWriter QA ──────────────────────────────`);
    console.log(`Page:     ${r.page}`);
    console.log(`Keyword:  ${r.keyword}`);
    console.log(`Score:    ${r.score}/100  ${band}`);
    console.log(`Query ID: ${r.queryId}`);
    if (r.missing?.length)   console.log(`\nMissing terms (${r.missing.length}):\n  ${r.missing.slice(0, 12).join(', ')}`);
    if (r.underused?.length) console.log(`\nUnderused (${r.underused.length}):\n  ${r.underused.slice(0, 6).map(u => `${u.term} (found ${u.count}, rec ${u.recommended})`).join(', ')}`);
    if (r.questions?.length) console.log(`\nTop questions to answer:\n${r.questions.slice(0, 5).map(q => `  • ${q}`).join('\n')}`);
    console.log(`─────────────────────────────────────────────────\n`);

    // Log single-page result to Supabase + Notion
    await writeReport(`# NeuronWriter QA — ${page}\n\nScore: ${r.score}/100 ${band}`, [r]).catch(() => {});
    await appendWeeklyResult([r]).catch(() => {});
    await logAgentRun(AGENT_NAME, 'ok', `${r.page}: ${r.score}/100`).catch(() => {});

    process.exit(r.score < SCORE_PASS ? 1 : 0);
  }
}
