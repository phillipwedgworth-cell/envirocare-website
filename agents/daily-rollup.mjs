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
  const [runs, findings, discussions] = await Promise.all([
    fetch(`${BASE}/agent_runs?started_at=gte.${since}&order=started_at.desc`, { headers: supabaseHeaders() }).then((r) => r.json()),
    fetch(`${BASE}/agent_findings?created_at=gte.${since}&order=created_at.desc`, { headers: supabaseHeaders() }).then((r) => r.json()),
    fetch(`${BASE}/agent_discussions?created_at=gte.${since}&order=created_at.desc`, { headers: supabaseHeaders() }).then((r) => r.json()),
  ]);
  return { runs: arr(runs), findings: arr(findings), discussions: arr(discussions) };
}
function arr(x) { return Array.isArray(x) ? x : []; }

function aggregate({ runs, findings, discussions }) {
  const byAgent = {};
  for (const r of runs) {
    byAgent[r.agent] = byAgent[r.agent] || { runs: 0, findings: 0, ship: 0, skip: 0, hold: 0, costUSD: 0 };
    byAgent[r.agent].runs++;
  }
  for (const f of findings) {
    byAgent[f.agent] = byAgent[f.agent] || { runs: 0, findings: 0, ship: 0, skip: 0, hold: 0, costUSD: 0 };
    byAgent[f.agent].findings++;
    const verdict = f.panel_verdict;
    if (verdict === 'SHIP') byAgent[f.agent].ship++;
    else if (verdict === 'SKIP') byAgent[f.agent].skip++;
    else if (verdict === 'HOLD') byAgent[f.agent].hold++;
  }
  for (const d of discussions) {
    const a = d.agent || 'unknown';
    byAgent[a] = byAgent[a] || { runs: 0, findings: 0, ship: 0, skip: 0, hold: 0, costUSD: 0 };
    byAgent[a].costUSD += Number(d.cost_usd || 0);
  }
  return byAgent;
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

  if (shipFindings.length) {
    await emailDigest({ agent: 'Daily Rollup', findings: shipFindings });
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
