// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/morning-brief.mjs
// Commit: feat(brief): GSC scoreboard, live PR state as ground truth, repeat-suppressed findings, owner+due on every call
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
// 2026-09-16 rewrite — three defects fixed, each verified against live data:
//   1. The Sep 16 brief listed PRs #161, #167 and #172 as "unmerged, Day 8".
//      All three were squash-merged days earlier (git log origin/main). The
//      brief had no source of truth for PR state and was inventing one from
//      stale findings. It now fetches OPEN pull requests from GitHub and is
//      told: a PR not in that list is merged or closed — never "waiting".
//   2. It never showed outcomes. gsc_daily / gsc_pages / leads / lf_visibility
//      all exist and nobody read them into the brief, so the owner could not
//      see whether the last 30 days of work moved a single number. There is
//      now a SCOREBOARD block (money pages, clicks, leads, SoLV) with deltas.
//   3. site-reviewer re-files the same "IMMEDIATE" item daily (mosquito
//      pricing wording appeared 6× in 5 days). Findings are now annotated
//      with how many distinct days the same text has appeared in the last 30,
//      and the model is told to collapse repeats to one line.
//   Every YOUR CALL item must carry an owner and a due date, or it is not a
//   call — it is noise.
//
// Env: SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY (already GitHub secrets),
//      GITHUB_TOKEN (workflow-provided; optional — brief degrades honestly).

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

// ── Ground truth #2: open pull requests. Without this the model guesses PR
// state from findings and gets it wrong (see header). GITHUB_TOKEN is the
// workflow token; if absent we say so and forbid any PR-state claim.
async function fetchOpenPRs() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { ok: false, prs: [] };
  try {
    const rows = await fetch('https://api.github.com/repos/phillipwedgworth-cell/envirocare-website/pulls?state=open&per_page=100', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'EnviroCare-Agent/1.0' },
    }).then((r) => (r.ok ? r.json() : []));
    return { ok: true, prs: arr(rows).map((p) => ({ number: p.number, title: p.title, draft: !!p.draft, days: Math.floor((Date.now() - new Date(p.created_at).getTime()) / 86400000) })) };
  } catch {
    return { ok: false, prs: [] };
  }
}

// ── Outcomes. The eight pages that carry the most non-brand impressions and
// sit on page 2-4 (Supabase gsc_pages, 2026-09-14 snapshot). If these move,
// the work is working; if they do not, it is not — regardless of how many
// findings were filed.
const MONEY_PAGES = [
  '/', '/huntsville', '/birmingham', '/services/commercial', '/services/pest-control',
  '/services/mosquito', '/pricing', '/hoover', '/best-pest-control-birmingham',
];
const stripHost = (u) => String(u || '').replace(/^https?:\/\/(www\.)?envirocarellc\.com/, '') || '/';
const num = (x) => (x == null || x === '' ? null : Number(x));
const fmtDelta = (a, b, digits = 0) => (a == null || b == null ? '' : ` (${a - b >= 0 ? '+' : ''}${(a - b).toFixed(digits)})`);

async function fetchScoreboard() {
  const since14 = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);
  const since7 = new Date(Date.now() - 7 * 86400000).toISOString();
  const [daily, pageRows, leads, lf] = await Promise.all([
    fetch(`${BASE}/gsc_daily?date=gte.${since14}&order=date.asc&select=date,clicks,impressions,position`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    fetch(`${BASE}/gsc_pages?order=snapshot_date.desc&limit=2000&select=page,clicks,impressions,position,snapshot_date`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    fetch(`${BASE}/leads?created_at=gte.${since7}&select=id,office,service_type`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    fetch(`${BASE}/lf_visibility?order=run_date.desc&limit=400&select=market,keyword,solv,run_date,campaign_name`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
  ]);

  // Clicks / impressions: last 7 days vs the 7 before.
  const d = arr(daily);
  const cut = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const sum = (rows, k) => rows.reduce((t, r) => t + (num(r[k]) || 0), 0);
  const last7 = d.filter((r) => r.date >= cut), prev7 = d.filter((r) => r.date < cut);
  const clicksLine = d.length
    ? `Organic clicks, last 7d: ${sum(last7, 'clicks')}${fmtDelta(sum(last7, 'clicks'), sum(prev7, 'clicks'))} · impressions ${sum(last7, 'impressions')}${fmtDelta(sum(last7, 'impressions'), sum(prev7, 'impressions'))} (gsc_daily; rows in window: ${d.length})`
    : 'Organic clicks: gsc_daily has no rows in the last 14 days — ingest may be down.';

  // Money pages: latest snapshot vs the one before it.
  const rows = arr(pageRows);
  const dates = [...new Set(rows.map((r) => r.snapshot_date))].sort().reverse();
  const [cur, prev] = [dates[0], dates[1]];
  const byPage = (date) => Object.fromEntries(rows.filter((r) => r.snapshot_date === date).map((r) => [stripHost(r.page), r]));
  const C = byPage(cur), P = byPage(prev);
  const pageLines = MONEY_PAGES.map((pg) => {
    const c = C[pg], p = P[pg];
    if (!c) return `  ${pg.padEnd(32)} — not in snapshot ${cur || '(none)'}`;
    return `  ${pg.padEnd(32)} pos ${Number(c.position).toFixed(1)}${fmtDelta(num(c.position), num(p?.position), 1).replace('(', '(moved ')} · ${c.clicks} clicks${fmtDelta(num(c.clicks), num(p?.clicks))} · ${c.impressions} impr`;
  });

  // Local Falcon: mean SoLV per market on the latest run for that market.
  const lfRows = arr(lf);
  const markets = {};
  for (const r of lfRows) {
    const m = r.market || r.campaign_name || '?';
    if (!markets[m]) markets[m] = { date: r.run_date, vals: [] };
    if (r.run_date === markets[m].date) markets[m].vals.push(num(r.solv) || 0);
  }
  const lfLines = Object.entries(markets).map(([m, v]) => `  ${m.padEnd(14)} SoLV ${(v.vals.reduce((a, b) => a + b, 0) / (v.vals.length || 1)).toFixed(1)}% across ${v.vals.length} keywords (run ${v.date})`);

  const leadRows = arr(leads);
  const leadLine = `Web-form leads, last 7d: ${leadRows.length}${leadRows.length ? ' — ' + Object.entries(leadRows.reduce((o, l) => ((o[l.office || '?'] = (o[l.office || '?'] || 0) + 1), o), {})).map(([k, v]) => `${k} ${v}`).join(', ') : ''} (leads table)`;

  return `SCOREBOARD (verbatim numbers — quote them, do not editorialize beyond the delta):
${clicksLine}
${leadLine}
Money pages (gsc_pages snapshot ${cur || 'none'} vs ${prev || 'none'}; "moved" is position change, minus = better):
${pageLines.join('\n')}
Map-pack visibility (lf_visibility, Google):
${lfLines.join('\n') || '  (no Local Falcon rows)'}`;
}

function buildPRBlock(pr) {
  if (!pr.ok) return 'OPEN PULL REQUESTS: UNAVAILABLE (no GITHUB_TOKEN or API error). You may NOT state that any PR is open, waiting, unmerged or stuck. Refer to code changes only as "a PR exists" if a finding says so.';
  if (!pr.prs.length) return 'OPEN PULL REQUESTS: none. Every PR is merged or closed. Do not describe any PR as waiting on merge.';
  return `OPEN PULL REQUESTS (GitHub, the only source of truth for PR state — a PR NOT listed here is merged or closed, never "waiting"):
${pr.prs.map((p) => `- #${p.number} (${p.days}d${p.draft ? ', draft' : ''}) ${p.title}`).join('\n')}`;
}

// How many distinct days the same finding text has appeared in the last 30.
// site-reviewer re-files the same item daily; the brief should say "seen 6
// days" once, not announce it six times.
async function fetchRepeatCounts() {
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  const rows = await fetch(`${BASE}/agent_findings?created_at=gte.${since}&select=finding,created_at&limit=5000`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []);
  const days = new Map();
  for (const r of arr(rows)) {
    const k = normKey(r.finding);
    if (!k) continue;
    if (!days.has(k)) days.set(k, new Set());
    days.get(k).add(String(r.created_at).slice(0, 10));
  }
  return (finding) => days.get(normKey(finding))?.size || 1;
}
const normKey = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 70);

function buildContext(data, repeatDays = () => 1) {
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
      (() => { const n = repeatDays(f.finding || f.title); return n > 1 ? `[seen ${n} of the last 30 days]` : ''; })(),
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

const SYSTEM = `You are EnviroCare's marketing STRATEGIST — not a passive reporter. EnviroCare is a family-owned Alabama pest & termite company (since 1958, four offices: Birmingham, Alabaster, Lake Martin/Alex City, Huntsville). You write a concise daily MORNING BRIEF for the owner, Phillip, who is busy and wants to make decisions fast.

You are given the STRATEGY BRAIN (knowledge block in the user message): the live scoreboard, decisions Phillip has ALREADY made, ranked priorities, and autonomy rules. USE IT:
- Never re-ask or re-litigate a decision the brain records as already made.
- Tie every item to a brain priority (P1 reviews, P2 LSA, P3 Huntsville, P4 suburb organic, P5 AI visibility). Drop findings that serve no priority.
- Structure the brief in FOUR sections, in this order:
  "SCOREBOARD" — copy the SCOREBOARD block's numbers faithfully: clicks/impressions with delta, leads, the money-page table (one line per page, position + move), and SoLV per market. One sentence of interpretation at most. If a number is missing, say "no data", never estimate.
  "SHIPPED (verified)" — ONLY items that appear in the EXECUTED ACTIONS block of the user message. If that block says NONE, this section must read exactly "Nothing shipped." and nothing else. You may not infer, assume, or describe any change as done, handled, or applied on the basis of a finding, a recommendation, or a previous brief. A finding is a suggestion; it is not work.
  "QUEUED (waiting on execution)" — items an agent has drafted or proposed but that have NOT run. Phrase these as pending, never as done. Call out the approval-queue backlog, anything that cannot execute for want of a publisher, and anything blocked by compliance.
  "YOUR CALL (money/irreversible)" — only items the rules reserve for Phillip, each with a one-line recommendation and a default ("if you do nothing, we hold").

- Every "YOUR CALL" item ends with a line "Owner: <Phillip|Kevin|Claude Code|agent name> · Due: <weekday or date>". An item you cannot give an owner and a date does not belong in the brief.
- A finding marked [seen N of the last 30 days] is a REPEAT. Mention it once, as "still open (N days)", never as news, and never more than one line.
- PR STATE: the OPEN PULL REQUESTS block is the only truth. A PR not listed there is merged or closed. Never write "unmerged", "waiting on merge", "Day N" or similar about a PR that is not in that block. If the block says UNAVAILABLE, make no PR-state claim at all.

ABSOLUTE RULE: never write that something was handled, fixed, shipped, or rewritten unless it is listed in EXECUTED ACTIONS. Reporting unfinished work as finished is the single worst failure this brief can have — Phillip has stopped checking things because the brief said they were done. When in doubt, put it in QUEUED.
- Lead with the 3-5 things that actually matter today, RANKED, most important first.
- Plain English. No jargon, no filler, no "as an AI". Operator tone.
- If it's a quiet day, say so in one line and list 1-2 things worth watching.
- Keep the whole brief under ~400 words including the scoreboard. Short lines, not big paragraphs.`;

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

async function generateBrief(ctx, prevBrief, scoreboard, prBlock) {
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
${scoreboard}

${prBlock}

${ctx.executionBlock}

Findings / proposed changes (SUGGESTIONS ONLY — none of these are done):
${ctx.findingsBlock}

Write today's Morning Brief.`;

  // Routed through createMessage() so this call lands in agent_costs. Direct
  // anthropic.messages.create() calls are invisible to the spend ledger.
  const resp = await createMessage(anthropic, {
    model: MODEL,
    max_tokens: 1400,
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
  const [data, prevBrief, scoreboard, prs, repeatDays] = await Promise.all([
    fetchFindings(), fetchPreviousBrief(), fetchScoreboard(), fetchOpenPRs(), fetchRepeatCounts(),
  ]);
  const ctx = buildContext(data, repeatDays);
  const content = await generateBrief(ctx, prevBrief, scoreboard, buildPRBlock(prs));
  if (!content) throw new Error('empty brief from model');
  await upsertBrief(content);
  const summary = `Morning Brief written for ${briefDate()} (${ctx.shipCount} SHIP / ${ctx.totalFindings} findings; open PRs: ${prs.ok ? prs.prs.length : 'unknown'}).`;
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
