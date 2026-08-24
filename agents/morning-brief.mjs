// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/morning-brief.mjs
// Commit: fix(cost): route morning-brief through createMessage()
// Push: main
// ─────────────────────────────────
// agents/morning-brief.mjs
// THE STRATEGIST BRIEF — fills the command center's "Morning Brief" panel (the
// morning_brief table). Reads the STRATEGY BRAIN (agents/knowledge/*.md — live
// scoreboard, standing decisions, autonomy rules) plus the proposer's ranked
// SHIP findings, and writes a decisive two-section brief: what agents will
// handle autonomously today vs. the few money/irreversible calls only Phillip
// can make. It never re-asks decisions the brain records as already made.
//
// Reads Supabase agent_findings (last ~30h), asks Claude for a prioritized brief,
// upserts one row per day into morning_brief (brief_date is unique).
//
// Env: SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY (already GitHub secrets).

import { logRunREST } from './lib/run-log.mjs';
import { knowledgeBlock } from './lib/knowledge.mjs';
import { createMessage } from './lib/llm-with-logging.mjs';

const PROJECT_REF = 'dyoujmyleihcpqgeifre';
const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;
const TZ = 'America/Chicago';
const MODEL = process.env.BRIEF_MODEL || 'claude-sonnet-4-6';

function sbHeaders(extra = {}) {
  return {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    'content-type': 'application/json',
    ...extra,
  };
}
const arr = (x) => (Array.isArray(x) ? x : []);
function briefDate() {
  // YYYY-MM-DD in Chicago time
  const d = new Date().toLocaleDateString('en-CA', { timeZone: TZ }); // en-CA => YYYY-MM-DD
  return d;
}
function niceDate() {
  return new Date().toLocaleDateString('en-US', { timeZone: TZ, dateStyle: 'full' });
}

async function fetchFindings() {
  const since = new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString();
  const [findings, runs, actions, queue] = await Promise.all([
    fetch(`${BASE}/agent_findings?created_at=gte.${since}&order=created_at.desc`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    fetch(`${BASE}/agent_runs?started_at=gte.${since}&order=started_at.desc`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    // GROUND TRUTH for "was anything actually done". Verified 2026-08-24:
    // agent_actions has never contained a single executed row, while the brief
    // was opening every day with a "HANDLED (autonomous)" section listing site
    // changes as done. The model was inventing completion from findings alone.
    fetch(`${BASE}/agent_actions?created_at=gte.${since}&order=created_at.desc&select=agent_name,action,status`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    fetch(`${BASE}/approval_queue?status=eq.pending&order=created_at.asc&select=title,category,risk,compliance_clean,action_type,created_at`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
  ]);
  return { findings: arr(findings), runs: arr(runs), actions: arr(actions), queue: arr(queue) };
}

function buildContext(data) {
  const { findings, runs } = data;
  const ship = findings.filter((f) => f.panel_verdict === 'SHIP');
  const pool = (ship.length ? ship : findings).slice(0, 30);
  const lines = pool.map((f) => {
    const parts = [
      f.agent ? `[${f.agent}]` : '',
      f.severity ? `(${f.severity})` : '',
      f.category ? `${f.category}:` : '',
      f.title || f.finding || '',
      f.page_url ? `— ${f.page_url}` : '',
    ].filter(Boolean);
    return '- ' + parts.join(' ');
  });
  const agentsRan = [...new Set(runs.map((r) => r.agent).filter(Boolean))];
  return {
    shipCount: ship.length,
    totalFindings: findings.length,
    agentsRan,
    findingsBlock: lines.join('\n') || '(no findings in the last 30 hours)',
    executionBlock: buildExecutionBlock(data),
  };
}

// A literal, non-negotiable statement of what shipped. The model is told to
// treat this as the only evidence of completion that exists.
function buildExecutionBlock({ actions, queue }) {
  const done = arr(actions).filter((a) => ['executed', 'applied', 'completed', 'done'].includes(String(a.status || '').toLowerCase()));
  const stuck = arr(queue);
  const deadEnd = stuck.filter((q) => !q.action_type).length;
  const dirty = stuck.filter((q) => q.compliance_clean === false).length;
  const oldestDays = stuck.length
    ? Math.floor((Date.now() - new Date(stuck[0].created_at).getTime()) / 86400000)
    : 0;

  const doneLines = done.length
    ? done.map((a) => `- ${a.agent_name || 'agent'}: ${a.action}`).join('\n')
    : '(NONE — zero actions executed in this window)';

  return `EXECUTED ACTIONS (agent_actions, the only proof of completion):
${doneLines}

APPROVAL QUEUE: ${stuck.length} pending, oldest ${oldestDays} day(s).
  ${deadEnd} have no action_type and can never execute even if approved.
  ${dirty} failed the compliance scan.`;
}

const SYSTEM = `You are EnviroCare's marketing STRATEGIST — not a passive reporter. EnviroCare is a family-owned Alabama pest & termite company (since 1958, three offices: Birmingham/Alabaster, Lake Martin/Alex City, Huntsville). You write a concise daily MORNING BRIEF for the owner, Phillip, who is busy and wants to make decisions fast.

You are given the STRATEGY BRAIN (knowledge block in the user message): the live scoreboard, decisions Phillip has ALREADY made, ranked priorities, and autonomy rules. USE IT:
- Never re-ask or re-litigate a decision the brain records as already made.
- Tie every item to a brain priority (P1 reviews, P2 LSA, P3 Huntsville, P4 suburb organic, P5 AI visibility). Drop findings that serve no priority.
- Structure the brief in three sections:
  "SHIPPED (verified)" — ONLY items that appear in the EXECUTED ACTIONS block of the user message. If that block says NONE, this section must read exactly "Nothing shipped." and nothing else. You may not infer, assume, or describe any change as done, handled, or applied on the basis of a finding, a recommendation, or a previous brief. A finding is a suggestion; it is not work.
  "QUEUED (waiting on execution)" — items an agent has drafted or proposed but that have NOT run. Phrase these as pending, never as done. Call out the approval-queue backlog, anything that cannot execute for want of a publisher, and anything blocked by compliance.
  "YOUR CALL (money/irreversible)" — only items the rules reserve for Phillip, each with a one-line recommendation and a default ("if you do nothing, we hold").

ABSOLUTE RULE: never write that something was handled, fixed, shipped, or rewritten unless it is listed in EXECUTED ACTIONS. Reporting unfinished work as finished is the single worst failure this brief can have — Phillip has stopped checking things because the brief said they were done. When in doubt, put it in QUEUED.
- Lead with the 3-5 things that actually matter today, RANKED, most important first.
- Plain English. No jargon, no filler, no "as an AI". Operator tone.
- If it's a quiet day, say so in one line and list 1-2 things worth watching.
- Keep the whole brief under ~300 words. Short lines, not big paragraphs.`;

// Read-before-act (agents/BEST-PRACTICES.md, retrieve→act→distill): pull the
// most recent prior brief so today's brief reports DELTAS instead of
// re-announcing the same items every morning, and so a decision Phillip was
// asked for yesterday doesn't silently vanish from today's brief.
async function fetchPreviousBrief() {
  try {
    const rows = await fetch(
      `${BASE}/morning_brief?brief_date=lt.${briefDate()}&order=brief_date.desc&limit=1&select=brief_date,content`,
      { headers: sbHeaders() },
    ).then((r) => r.json());
    const prev = arr(rows)[0];
    return prev?.content ? { date: prev.brief_date, content: String(prev.content).slice(0, 2000) } : null;
  } catch {
    return null; // no prior brief is a normal cold-start, never a failure
  }
}

async function generateBrief(ctx, prevBrief) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY not set');
  const mod = await import('@anthropic-ai/sdk');
  const Anthropic = mod.default ?? mod;
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1 });

  const prevBlock = prevBrief
    ? `\nPREVIOUS BRIEF (${prevBrief.date}) — for delta context only:
${prevBrief.content}

Delta rules: do NOT re-announce items unchanged since the previous brief — one
"still open" line each at most. Lead with what is NEW or CHANGED. If the
previous brief asked Phillip for a decision that is still unanswered, keep it
in "YOUR CALL" and mark it (day 2, day 3, …).\n`
    : '';
  const user = `${knowledgeBlock()}
Date: ${niceDate()}
Agents that ran in the last 30h: ${ctx.agentsRan.join(', ') || 'none'}
SHIP-flagged items (need human decision): ${ctx.shipCount}
Total findings examined: ${ctx.totalFindings}
${prevBlock}
${ctx.executionBlock}

Findings / proposed changes (SUGGESTIONS ONLY — none of these are done):
${ctx.findingsBlock}

Write today's Morning Brief.`;

  // Routed through createMessage() so this call lands in agent_costs. Direct
  // anthropic.messages.create() calls are invisible to the spend ledger.
  const resp = await createMessage(anthropic, {
    model: MODEL,
    max_tokens: 900,
    system: SYSTEM,
    messages: [{ role: 'user', content: user }],
  }, { agentName: 'morning-brief', role: 'brief' });
  return (resp.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
}

async function upsertBrief(content) {
  const body = [{ brief_date: briefDate(), content }];
  const res = await fetch(`${BASE}/morning_brief`, {
    method: 'POST',
    headers: sbHeaders({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`morning_brief upsert failed: ${res.status} ${await res.text()}`);
}

async function main() {
  const [data, prevBrief] = await Promise.all([fetchFindings(), fetchPreviousBrief()]);
  const ctx = buildContext(data);
  const content = await generateBrief(ctx, prevBrief);
  if (!content) throw new Error('empty brief from model');
  await upsertBrief(content);
  const summary = `Morning Brief written for ${briefDate()} (${ctx.shipCount} SHIP / ${ctx.totalFindings} findings).`;
  console.log(summary);
  console.log('---\n' + content);
  return summary;
}

// Heartbeat both outcomes to agent_runs — this agent failed daily for weeks
// (missing morning_brief table) while the watchdog reported green, because it
// died before ever writing to the ledger the watchdog reads.
main()
  .then((summary) => logRunREST('morning-brief', 'ok', summary))
  .catch(async (e) => {
    console.error('Morning Brief failed:', e.message);
    await logRunREST('morning-brief', 'error', e.message).catch(() => {});
    process.exit(1);
  });
