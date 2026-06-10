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

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { analyzePageContent } from './lib/neuronwriter.mjs';
import { writeFinding, logAgentRun } from './lib/supabase.mjs';
import { createMessage } from './lib/llm-with-logging.mjs';
import { criticLoop } from './lib/critic.mjs';
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
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } catch (e) {
    console.error(`[${AGENT_NAME}] failed to import @anthropic-ai/sdk: ${e.message}`);
  }
}

// ─── CONTEXT_READ ──────────────────────────────────────────────────────────

function loadTargets() {
  const path = join(__dirname, 'neuronwriter-targets.json');
  return JSON.parse(readFileSync(path, 'utf8')).targets;
}

// Strips JSX/TSX structure to extract visible text content for NeuronWriter scoring.
function extractTextFromTsx(source) {
  return source
    .replace(/^import\s.+$/gm, '')                    // imports
    .replace(/\/\*[\s\S]*?\*\//g, '')                  // block comments
    .replace(/\/\/.*$/gm, '')                          // line comments
    .replace(/<[A-Z][A-Za-z]*[^>]*\/?>/g, ' ')       // PascalCase component tags
    .replace(/<\/[A-Z][A-Za-z]*>/g, ' ')
    .replace(/<[a-z][^>]*\/?>/g, ' ')                 // HTML tags
    .replace(/<\/[a-z]+>/g, ' ')
    .replace(/\{[^{}]+\}/g, ' ')                      // JS expressions
    .replace(/[a-zA-Z]+\s*=\s*"[^"]*"/g, ' ')        // JSX attribute values
    .replace(/[a-zA-Z]+\s*=\s*\{[^}]*\}/g, ' ')
    .replace(/[{}<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── WORK ──────────────────────────────────────────────────────────────────

async function analyzeOnePage({ page, keyword }) {
  const absPath = join(REPO_ROOT, page);
  if (!existsSync(absPath)) {
    console.warn(`[${AGENT_NAME}] skipping ${page} — file not found at ${absPath}`);
    return { page, keyword, score: null, error: 'file not found' };
  }

  let source;
  try {
    source = readFileSync(absPath, 'utf8');
  } catch (err) {
    return { page, keyword, score: null, error: `read error: ${err.message}` };
  }

  const content = extractTextFromTsx(source);
  if (content.length < 100) {
    return { page, keyword, score: null, error: 'extracted content too short (<100 chars)' };
  }

  console.log(`[${AGENT_NAME}] analyzing ${page} → "${keyword}"`);
  try {
    const result = await analyzePageContent(keyword, content);
    return { page, keyword, ...result };
  } catch (err) {
    console.error(`[${AGENT_NAME}] NeuronWriter error for ${page}: ${err.message}`);
    return { page, keyword, score: null, error: err.message };
  }
}

async function runAllTargets(targets) {
  const results = [];
  // Process in CONCURRENCY-sized batches so we don't hammer the NeuronWriter API.
  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const batch = targets.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(batch.map(analyzeOnePage));
    for (const r of settled) {
      results.push(r.status === 'fulfilled' ? r.value : { page: '?', keyword: '?', score: null, error: r.reason?.message ?? 'unknown' });
    }
  }
  return results;
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
  const dataBlock = results.map(r => {
    if (r.error) return `### ${r.page}\nERROR: ${r.error}`;
    const status = r.score < 70 ? 'BELOW THRESHOLD' : r.score > 80 ? 'ABOVE BAND' : 'IN BAND (70-80)';
    const missingList = (r.missing ?? []).slice(0, 10).join(', ') || 'none';
    const underusedList = (r.underused ?? []).slice(0, 5).map(u => `${u.term}(${u.count})`).join(', ') || 'none';
    const questionsList = (r.questions ?? []).slice(0, 3).join(' | ') || 'none';
    return `### ${r.page}\nKeyword: ${r.keyword}\nScore: ${r.score}/100 — ${status}\nMissing terms: ${missingList}\nUnderused: ${underusedList}\nSuggested questions: ${questionsList}`;
  }).join('\n\n');

  const prompt = feedback
    ? `Today: ${today}\n\nRevise the report addressing this critic feedback:\n${feedback}\n\nRAW DATA:\n${dataBlock}`
    : `Today: ${today}\n\nRAW DATA:\n${dataBlock}`;

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
  const reportDir = join(REPO_ROOT, 'agents', 'reports');
  mkdirSync(reportDir, { recursive: true });
  const reportPath = join(reportDir, `neuronwriter-${today}.md`);
  writeFileSync(reportPath, final, 'utf8');
  console.log(`[${AGENT_NAME}] report saved → agents/reports/neuronwriter-${today}.md`);

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

// ─── ENTRY POINT (orchestrator) ────────────────────────────────────────────

export async function run() {
  if (!process.env.NEURONWRITER_API_KEY) {
    console.log(`[${AGENT_NAME}] key not set — skipping`);
    return { skipped: true, reason: 'NEURONWRITER_API_KEY not set' };
  }

  console.log(`[${AGENT_NAME}] Starting batch run`);

  const targets = loadTargets();
  const results = await runAllTargets(targets);

  let draft;
  try {
    draft = await workerDraft(results);
  } catch (e) {
    console.error(`[${AGENT_NAME}] synthesis failed: ${e.message}`);
    await logAgentRun(AGENT_NAME, 'error', e.message).catch(() => {});
    throw e;
  }

  const final = await criticLoop({
    workerName: AGENT_NAME,
    task: 'NeuronWriter content quality QA report for 14 EnviroCare service and city pages',
    output: draft,
    rubric,
    revise: fb => workerDraft(results, fb),
    onEscalate: async out => {
      console.warn(`[${AGENT_NAME}] critic escalated — accepting best draft`);
      await logAgentRun(AGENT_NAME, 'escalated', out).catch(() => {});
    },
  });

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
    process.exit(result.failCount > 0 ? 1 : 0);

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
