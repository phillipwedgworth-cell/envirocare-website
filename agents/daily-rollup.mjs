/**
 * Daily Roll-Up — the agent that solves the "stop hand-pasting status docs"
 * problem.
 *
 * Runs once per day via GitHub Actions (after the other agents have run).
 * Queries Supabase for the previous 24 hours of agent activity, aggregates
 * it, and:
 *
 *   1. Writes ONE "Daily Rollup" page in the Agent Command Center summarizing
 *      what every agent did, with counts, costs, and links.
 *   2. Sends ONE email to Phillip with the same summary.
 *
 * This is the file that ensures Phillip never again receives a hand-typed
 * "here's what happened" message from anyone. The agents speak for themselves.
 */

import { postActivity, emailDigest } from './lib/notifier.mjs';
import { logRunREST } from './lib/run-log.mjs';

const PROJECT_REF = 'dyoujmyleihcpqgeifre';
const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;
const TZ = 'America/Chicago';

function supabaseHeaders() {
  return {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    'content-type': 'application/json',
  };
}

async function fetchLastDay() {
  const since = new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(); // 26h window to cover any cron drift
  const [runs, findings, discussions, costs, watchdog] = await Promise.all([
    fetch(`${BASE}/agent_runs?started_at=gte.${since}&order=started_at.desc`, { headers: supabaseHeaders() }).then((r) => r.json()),
    fetch(`${BASE}/agent_findings?created_at=gte.${since}&order=created_at.desc`, { headers: supabaseHeaders() }).then((r) => r.json()),
    fetch(`${BASE}/agent_discussions?created_at=gte.${since}&order=created_at.desc`, { headers: supabaseHeaders() }).then((r) => r.json()),
    // Real spend lives in agent_costs.usd_cost. The rollup used to sum only
    // agent_discussions.cost_usd and reported $0.0000 on a $2.01 day (Sep 27 audit N4).
    fetch(`${BASE}/agent_costs?created_at=gte.${since}&select=agent_name,usd_cost,cost_usd`, { headers: supabaseHeaders() }).then((r) => r.json()),
    // Latest watchdog verdict, so "all quiet" can never contradict it (Sep 27 audit R4).
    fetch(`${BASE}/agent_runs?agent_name=eq.watchdog&order=started_at.desc&limit=1`, { headers: supabaseHeaders() }).then((r) => r.json()),
  ]);
  return { runs: arr(runs), findings: arr(findings), discussions: arr(discussions), costs: arr(costs), watchdog: arr(watchdog)[0] ?? null };
}
function arr(x) { return Array.isArray(x) ? x : []; }

const blank = () => ({ runs: 0, findings: 0, ship: 0, skip: 0, hold: 0, costUSD: 0, bad: 0 });
const BAD_STATUS = new Set(['escalated', 'error', 'failed', 'blocked']);

function aggregate({ runs, findings, costs }) {
  const byAgent = {};
  for (const r of runs) {
    const a = r.agent_name || r.agent || 'unknown';
    byAgent[a] = byAgent[a] || blank();
    byAgent[a].runs++;
    if (BAD_STATUS.has(r.status)) byAgent[a].bad++;
  }
  for (const f of findings) {
    const a = f.agent_name || f.agent || 'unknown';
    byAgent[a] = byAgent[a] || blank();
    byAgent[a].findings++;
    const verdict = f.panel_verdict;
    if (verdict === 'SHIP') byAgent[a].ship++;
    else if (verdict === 'SKIP') byAgent[a].skip++;
    else if (verdict === 'HOLD') byAgent[a].hold++;
  }
  for (const c of costs) {
    const a = c.agent_name || 'unknown';
    byAgent[a] = byAgent[a] || blank();
    byAgent[a].costUSD += Number(c.usd_cost ?? c.cost_usd ?? 0);
  }
  return byAgent;
}

function watchdogProblems(row) {
  if (!row?.output) return [];
  try {
    const o = typeof row.output === 'string' ? JSON.parse(row.output) : row.output;
    return Array.isArray(o?.problems) ? o.problems : [];
  } catch { return []; }
}

function fmtDate() {
  return new Date().toLocaleDateString('en-US', { timeZone: TZ, dateStyle: 'medium' });
}

async function main() {
  const data = await fetchLastDay();
  const byAgent = aggregate(data);

  const totalRuns = Object.values(byAgent).reduce((s, a) => s + a.runs, 0);
  const totalFindings = Object.values(byAgent).reduce((s, a) => s + a.findings, 0);
  const totalShip = Object.values(byAgent).reduce((s, a) => s + a.ship, 0);
  const totalCost = Object.values(byAgent).reduce((s, a) => s + a.costUSD, 0);

  const lines = [];
  lines.push(`**Daily Rollup — ${fmtDate()}**`);
  lines.push('');
  lines.push(`Runs across all agents: ${totalRuns}`);
  lines.push(`Findings examined: ${totalFindings}`);
  lines.push(`SHIP verdicts (need review): ${totalShip}`);
  lines.push(`Total panel cost: $${totalCost.toFixed(4)}`);
  lines.push('');
  lines.push('**By agent:**');
  for (const [agent, s] of Object.entries(byAgent)) {
    lines.push(`• ${agent} — ${s.runs} run · ${s.findings} findings · SHIP/SKIP/HOLD = ${s.ship}/${s.skip}/${s.hold} · $${s.costUSD.toFixed(4)}`);
  }
  if (Object.keys(byAgent).length === 0) {
    lines.push('• (No agent activity in the last 24h)');
  }

  // Write a single Daily Rollup card to the Agent Command Center
  await postActivity({
    agent: 'monday-orchestrator', // generic dispatcher
    type: 'run-summary',
    title: `Daily Rollup — ${fmtDate()}`,
    status: 'Auto-Filed',
    priority: totalShip > 0 ? 'Med' : 'Low',
    tags: ['daily-rollup'],
    costUSD: totalCost,
    bodyParagraphs: lines,
  });

  // Also fetch today's SHIP findings to email (these are what needs human review)
  const shipFindings = data.findings
    .filter((f) => f.panel_verdict === 'SHIP')
    .map((f) => ({
      title: f.title,
      source: f.source,
      summary: f.summary,
      url: f.url,
      tags: f.tags,
    }));

  const problems = watchdogProblems(data.watchdog);
  const troubled = Object.entries(byAgent).filter(([, s]) => s.bad > 0).map(([a, s]) => `${a} (${s.bad} escalated/failed)`);

  if (shipFindings.length) {
    await emailDigest({ agent: 'Daily Rollup', findings: shipFindings });
  } else if (problems.length || troubled.length) {
    // Never say "all quiet" while the watchdog or the run ledger says otherwise.
    await emailDigest({
      agent: 'Daily Rollup',
      findings: [
        {
          title: `${fmtDate()} — ${problems.length + troubled.length} need attention`,
          source: 'system',
          summary: [
            problems.length ? `Watchdog: ${problems.join(', ')}.` : '',
            troubled.length ? `Escalated/failed runs: ${troubled.join(', ')}.` : '',
            `Spend last 24h: $${totalCost.toFixed(2)}.`,
          ].filter(Boolean).join(' '),
          tags: ['rollup', 'attention'],
        },
      ],
    });
  } else {
    // Quiet day — send a much shorter "all quiet" email so Phillip knows the system ran
    await emailDigest({
      agent: 'Daily Rollup',
      findings: [
        {
          title: `${fmtDate()} — all quiet`,
          source: 'system',
          summary: `${totalRuns} agent runs completed. ${totalFindings} items examined. Nothing flagged for your review today.`,
          tags: ['rollup'],
        },
      ],
    });
  }

  const summary = `${totalRuns} runs · ${totalFindings} findings · ${totalShip} SHIP · $${totalCost.toFixed(4)}`;
  console.log(`[daily-rollup] ${summary}`);
  return summary;
}

// Heartbeat both outcomes to agent_runs so the watchdog's expected-run check
// can see this agent (it previously never wrote to the ledger at all).
main()
  .then((summary) => logRunREST('daily-rollup', 'ok', summary))
  .catch(async (e) => {
    console.error('[daily-rollup] FATAL:', e);
    await logRunREST('daily-rollup', 'error', e?.message ?? String(e)).catch(() => {});
    process.exit(1);
  });
