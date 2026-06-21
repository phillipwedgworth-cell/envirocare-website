// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/watchdog.mjs
// Commit: feat(agents): watchdog + Vercel health + daily budget guard
// Push: main
// ─────────────────────────────────────
//
// The watcher of the watchers. Runs daily. Confirms every agent did its job and
// EMAILS Phillip when one didn't. Now also watches Vercel (deploys + cron health)
// and the daily AI spend so nothing runs away quietly.
//
// Reads the agent_runs ledger:
//   no recent run -> OVERDUE | ran but bad status -> FAILED | recent + ok -> healthy
// Emails on any problem immediately; emails a green digest every Monday so Phillip
// knows the watchdog itself is alive (no Monday email = watchdog down = backstop).

import { supabase, logAgentRun } from './lib/supabase.mjs';
import { sendEmail } from './lib/notify.mjs';

const HEALTHY = new Set(['ok', 'success', 'pass', 'passed', 'green', 'completed', 'done']);
const DIGEST_DAY = 1;                 // Monday (UTC)
const DAILY_USD_BUDGET = Number(process.env.DAILY_USD_BUDGET || 5);   // soft AI-spend cap
const DEPLOY_ANOMALY   = Number(process.env.DEPLOY_ANOMALY   || 12);  // deploys/24h = runaway

// Agents that write to the agent_runs ledger. Add one the moment it starts logging.
const EXPECTED = [
  { agent: 'neuronwriter-qa',       maxAgeH: 24 * 8, label: 'Weekly QA (Mon 7am CT)' },
  { agent: 'neuronwriter-optimize', maxAgeH: 24 * 8, label: 'Weekly optimize (Tue 7am CT)' },
  // Vercel cron routes — these agents already call logAgentRun() internally:
  { agent: 'seo-monitor',   maxAgeH: 24 * 8, label: 'SEO monitor (Mon)' },
  { agent: 'brightlocal',   maxAgeH: 12,     label: 'BrightLocal (4x/day)' },
  { agent: 'site-reviewer', maxAgeH: 12,     label: 'Site reviewer (4x/day)' },
];

const healthy = s => HEALTHY.has(String(s ?? '').toLowerCase());
const ageH = ts => (Date.now() - new Date(ts).getTime()) / 3.6e6;

async function latestPerAgent() {
  if (!supabase) throw new Error('Supabase client is null — SUPABASE_URL / SUPABASE_KEY not set');
  const { data, error } = await supabase.from('agent_runs')
    .select('agent_name,status,created_at').order('created_at', { ascending: false }).limit(1000);
  if (error) throw new Error(`agent_runs read: ${JSON.stringify(error)}`);
  const latest = new Map();
  for (const r of data ?? []) if (!latest.has(r.agent_name)) latest.set(r.agent_name, r);
  return latest;
}

// ── Daily AI spend (no new secret — reads the agent_costs table) ──────────────
async function budgetCheck(lines, problems) {
  if (!supabase) return;
  try {
    const since = new Date(); since.setUTCHours(0, 0, 0, 0);
    const { data, error } = await supabase.from('agent_costs')
      .select('agent_name,usd_cost,created_at').gte('created_at', since.toISOString());
    if (error) { lines.push(`budget   skipped — agent_costs read failed (${error.message})`); return; }
    const total = (data ?? []).reduce((s, r) => s + Number(r.usd_cost || 0), 0);
    const tag = total > DAILY_USD_BUDGET ? 'OVER  ' : 'ok    ';
    lines.push(`budget   ${tag} AI spend today $${total.toFixed(2)} / $${DAILY_USD_BUDGET.toFixed(2)} cap`);
    if (total > DAILY_USD_BUDGET) problems.push(`AI spend $${total.toFixed(2)}`);
  } catch (e) { lines.push(`budget   skipped — ${e.message}`); }
}

// ── Vercel health (VERCEL_TOKEN-gated — graceful skip if absent) ──────────────
// Non-destructive: reads the deployments API only. Never GET-pings work routes,
// never triggers the orchestrator. Flags failed deploys + runaway deploy volume.
async function vercelCheck(lines, problems) {
  const token = process.env.VERCEL_TOKEN;
  const project = process.env.VERCEL_PROJECT_ID || 'prj_bD63HstQIuOMn5cEGDK4RAW7yM2F';
  const team    = process.env.VERCEL_TEAM_ID    || 'envirocare-50d39ae8';
  if (!token) { lines.push('vercel   skipped — set VERCEL_TOKEN secret to enable deploy/cost checks'); return; }
  try {
    const u = `https://api.vercel.com/v6/deployments?projectId=${project}&teamId=${team}&limit=20`;
    const r = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) { lines.push(`vercel   skipped — API ${r.status}`); return; }
    const deps = (await r.json()).deployments ?? [];
    const dayAgo = Date.now() - 24 * 3.6e6;
    const last24 = deps.filter(d => (d.created ?? d.createdAt ?? 0) > dayAgo);
    const errored = deps.find(d => String(d.state ?? d.readyState).toUpperCase() === 'ERROR');
    lines.push(`vercel   ${last24.length} deploy(s)/24h${last24.length > DEPLOY_ANOMALY ? ' — RUNAWAY' : ''}; latest=${String(deps[0]?.state ?? deps[0]?.readyState ?? '?').toLowerCase()}`);
    if (last24.length > DEPLOY_ANOMALY) problems.push(`${last24.length} Vercel deploys/24h`);
    if (errored) { lines.push(`vercel   FAILED deploy on record: ${errored.url ?? errored.uid}`); problems.push('Vercel deploy ERROR'); }
  } catch (e) { lines.push(`vercel   skipped — ${e.message}`); }
}

async function run() {
  const latest = await latestPerAgent();
  const lines = [], problems = [];

  for (const e of EXPECTED) {
    const r = latest.get(e.agent);
    if (!r) { lines.push(`OVERDUE  ${e.agent} — no run on record (${e.label})`); problems.push(e.agent); }
    else if (ageH(r.created_at) > e.maxAgeH) { lines.push(`OVERDUE  ${e.agent} — last run ${Math.round(ageH(r.created_at)/24)}d ago (${e.label})`); problems.push(e.agent); }
    else if (!healthy(r.status)) { lines.push(`FAILED   ${e.agent} — status="${r.status}", ${Math.round(ageH(r.created_at))}h ago`); problems.push(e.agent); }
    else { lines.push(`ok       ${e.agent} — ${Math.round(ageH(r.created_at))}h ago`); }
  }
  const expected = new Set(EXPECTED.map(e => e.agent));
  for (const [name, r] of latest) {
    if (expected.has(name)) continue;
    if (!healthy(r.status)) { lines.push(`FAILED   ${name} — status="${r.status}"`); problems.push(name); }
  }

  await budgetCheck(lines, problems);
  await vercelCheck(lines, problems);

  const body = [
    `EnviroCare agent + infra health — ${new Date().toISOString().slice(0,16).replace('T',' ')} UTC`, ``,
    ...lines, ``,
    problems.length ? `${problems.length} item(s) need attention: ${problems.join(', ')}`
                    : `All monitored agents, Vercel, and budget healthy.`, ``,
    `Vercel hard budget cap lives in the Vercel dashboard → Settings → Spend Management.`,
    `This watchdog runs daily; you get this digest every Monday as proof it is alive.`,
  ].join('\n');
  console.log(body);

  let emailed = false;
  if (problems.length) emailed = await sendEmail(`⚠️ EnviroCare: ${problems.length} need attention`, body);
  else if (new Date().getUTCDay() === DIGEST_DAY) emailed = await sendEmail(`✅ EnviroCare: all healthy`, body);

  await logAgentRun('watchdog', problems.length ? 'fail' : 'ok', { problems, emailed });
  return { problems, emailed };
}

run().catch(async e => {
  console.error(`[watchdog] ${e.message}`);
  await sendEmail('⛔ EnviroCare watchdog crashed', `The watchdog could not complete:\n\n${e.message}`).catch(() => {});
  process.exit(1);
});
