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

const HEALTHY = new Set(['ok', 'success', 'pass', 'passed', 'green', 'complete', 'completed', 'done']);
const DIGEST_DAY = 1;                 // Monday (UTC)
const DAILY_USD_BUDGET = Number(process.env.DAILY_USD_BUDGET || 5);   // soft AI-spend cap
const DEPLOY_ANOMALY   = Number(process.env.DEPLOY_ANOMALY   || 12);  // deploys/24h = runaway
const RUNTIME_ERROR_ALERT = Number(process.env.RUNTIME_ERROR_ALERT || 10); // fn errors/24h worth an email
const IN_FLIGHT_GRACE_H = 3;          // a 'running' row younger than this is a live run, not a crash

// Anthropic returns this in the 400 body when the monthly org/workspace usage
// limit is hit. Those requests are NEVER billed, so the daily spend counter
// stays at $0 and would otherwise pass as healthy — this string is the only
// signal that the whole fleet is silently blocked.
const ANTHROPIC_CAP_SIGNATURE = 'specified API usage limits';

// Every scheduled automation that writes to the agent_runs ledger, with the
// heartbeat window = schedule interval + grace. The check is on the last
// SUCCESSFUL run: an agent that crashes before logging, or logs only errors,
// goes OVERDUE once its last success ages past this window — that is the
// Morning Brief blind spot (failed daily for weeks while the ledger's latest
// row was simply absent and the old latest-run check stayed green).
// Daily agents get 30h (24 + 6 grace); weeklies 192h (7d + 1d grace).
// Not listed (log nothing yet): ingest-seo — add once it heartbeats.
const EXPECTED = [
  // GitHub Actions — daily
  { agent: 'morning-brief',         maxAgeH: 30,     label: 'Morning Brief (daily 13:30 UTC)' },
  { agent: 'daily-rollup',          maxAgeH: 30,     label: 'Daily Rollup (daily 13:00 UTC)' },
  { agent: 'aeo-watch',             maxAgeH: 30,     label: 'AEO watch (daily 12:00 UTC)' },
  { agent: 'neuronwriter-narrator', maxAgeH: 30,     label: 'Neuron Narrator (daily 13:00 UTC score)' },
  { agent: 'social-poster',         maxAgeH: 30,     label: 'Social poster (daily 15:00 UTC)' },
  // GitHub Actions — weekly
  { agent: 'neuronwriter-qa',       maxAgeH: 24 * 8, label: 'Weekly QA (Mon 7am CT)' },
  { agent: 'neuronwriter-optimize', maxAgeH: 24 * 8, label: 'Weekly optimize (Tue 7am CT)' },
  { agent: 'seo-watch',             maxAgeH: 24 * 8, label: 'SEO watch (Mon 13:00 UTC)' },
  { agent: 'seo-monitor',           maxAgeH: 24 * 8, label: 'SEO monitor (Mon)' },
  // Vercel cron routes — these agents already call logAgentRun() internally:
  { agent: 'orchestrator',          maxAgeH: 30,     label: 'Orchestrator (daily 09:00 UTC, Vercel cron)' },
  { agent: 'review-responder',      maxAgeH: 24 * 8, label: 'Review responder (Mon, via orchestrator)' },
  { agent: 'brightlocal',           maxAgeH: 12,     label: 'BrightLocal (4x/day)' },
  { agent: 'site-reviewer',         maxAgeH: 12,     label: 'Site reviewer (4x/day)' },
];

const healthy = s => HEALTHY.has(String(s ?? '').toLowerCase());
const ageH = ts => (Date.now() - new Date(ts).getTime()) / 3.6e6;

// A 'running' row younger than IN_FLIGHT_GRACE_H is a live run (aeo-watch
// inserts 'running' at start and PATCHes to 'complete'); older means it
// crashed mid-run without ever closing the row.
const inFlight = r => String(r?.status ?? '').toLowerCase() === 'running'
  && ageH(r.created_at) < IN_FLIGHT_GRACE_H;

async function latestPerAgent() {
  if (!supabase) throw new Error('Supabase client is null — SUPABASE_URL / SUPABASE_KEY not set');
  const { data, error } = await supabase.from('agent_runs')
    .select('agent_name,status,created_at,output').order('created_at', { ascending: false }).limit(1000);
  if (error) throw new Error(`agent_runs read: ${JSON.stringify(error)}`);
  // Track both the latest run (any status — catches active failures) and the
  // latest HEALTHY run (the heartbeat — catches agents that stopped succeeding).
  const latest = new Map(), latestHealthy = new Map();
  for (const r of data ?? []) {
    if (!latest.has(r.agent_name)) latest.set(r.agent_name, r);
    if (healthy(r.status) && !latestHealthy.has(r.agent_name)) latestHealthy.set(r.agent_name, r);
  }
  return { latest, latestHealthy };
}

// ── Daily AI spend (no new secret — reads the agent_costs table) ──────────────
// Two independent checks live here:
//   (a) the $/day spend cap (agent_costs), and
//   (b) the Anthropic MONTHLY usage cap, which the $/day counter cannot see —
//       a capped month returns $0 spend, so (a) alone reports a false "ok".
async function budgetCheck(lines, problems) {
  if (!supabase) return;

  // (a) Daily $ spend.
  try {
    const since = new Date(); since.setUTCHours(0, 0, 0, 0);
    const { data, error } = await supabase.from('agent_costs')
      .select('agent_name,usd_cost,created_at').gte('created_at', since.toISOString());
    if (error) {
      lines.push(`budget   skipped — agent_costs read failed (${error.message})`);
    } else {
      const total = (data ?? []).reduce((s, r) => s + Number(r.usd_cost || 0), 0);
      const tag = total > DAILY_USD_BUDGET ? 'OVER  ' : 'ok    ';
      lines.push(`budget   ${tag} AI spend today $${total.toFixed(2)} / $${DAILY_USD_BUDGET.toFixed(2)} cap`);
      if (total > DAILY_USD_BUDGET) problems.push(`AI spend $${total.toFixed(2)}`);
    }
  } catch (e) { lines.push(`budget   skipped — ${e.message}`); }

  // (b) Anthropic monthly cap — runs even if (a) failed; it is the spend
  // counter's blind spot. Any agent run whose output carries the 400 signature
  // means the fleet is blocked, regardless of what the $ counter says.
  await anthropicCapCheck(lines, problems);
}

// Scan recent agent_runs output for the monthly-cap 400 signature. A single hit
// is CRITICAL: the whole fleet is blocked and nothing is being billed, so the
// dollar counter alone would (wrongly) report everything healthy.
async function anthropicCapCheck(lines, problems) {
  if (!supabase) return;
  try {
    const dayAgo = new Date(Date.now() - 24 * 3.6e6).toISOString();
    const { data, error } = await supabase.from('agent_runs')
      .select('agent_name,output,created_at')
      .gte('created_at', dayAgo).order('created_at', { ascending: false }).limit(1000);
    if (error) { lines.push(`anthropic skipped — agent_runs read failed (${error.message})`); return; }
    const sig = ANTHROPIC_CAP_SIGNATURE.toLowerCase();
    const hits = (data ?? []).filter(r => String(r.output ?? '').toLowerCase().includes(sig));
    if (hits.length) {
      const who = [...new Set(hits.map(r => r.agent_name))].join(', ');
      lines.push(`CRITICAL Anthropic monthly cap hit — "${ANTHROPIC_CAP_SIGNATURE}" in ${hits.length} run(s): ${who}`);
      problems.push('Anthropic monthly cap hit');
    } else {
      lines.push(`anthropic ok    — no monthly-cap errors in last 24h`);
    }
  } catch (e) { lines.push(`anthropic skipped — ${e.message}`); }
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

    await runtimeErrorCheck(lines, problems, { token, project, team, deps });
  } catch (e) { lines.push(`vercel   skipped — ${e.message}`); }
}

// ── Vercel RUNTIME errors (function crashes, 5xx, cron-route timeouts) ────────
// The deploy check above only sees BUILD failures; a route that deploys fine
// and then dies at runtime (e.g. site-reviewer hitting the 300s cap) is
// invisible to it. Read the current production deployment's runtime-logs
// stream (best-effort: it is a stream, so read for a bounded window and parse
// whatever arrived) and count error/fatal-level entries from the last 24h.
async function runtimeErrorCheck(lines, problems, { token, project, team, deps }) {
  const prod = deps.find(d =>
    (d.target ?? '') === 'production' &&
    String(d.state ?? d.readyState).toUpperCase() === 'READY');
  if (!prod) { lines.push('runtime  skipped — no READY production deploy in the last 20'); return; }
  const depId = prod.uid ?? prod.id;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);
  try {
    const u = `https://api.vercel.com/v1/projects/${project}/deployments/${depId}/runtime-logs?teamId=${team}`;
    const r = await fetch(u, { headers: { Authorization: `Bearer ${token}` }, signal: ctrl.signal });
    if (!r.ok) { lines.push(`runtime  skipped — API ${r.status}`); return; }

    // Bounded read: stop at stream end, 2MB, or the 10s abort — keep what we have.
    let raw = '';
    const reader = r.body.getReader();
    const dec = new TextDecoder();
    try {
      while (raw.length < 2_000_000) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += dec.decode(value, { stream: true });
      }
    } catch { /* aborted mid-stream — parse what arrived */ }

    // Body is NDJSON (one log object per line) or a JSON array — accept both.
    let events = [];
    const trimmed = raw.trim();
    if (trimmed.startsWith('[')) {
      try { events = JSON.parse(trimmed); } catch { /* truncated array — fall through */ }
    }
    if (!events.length) {
      for (const line of trimmed.split('\n')) {
        const t = line.trim();
        if (!t.startsWith('{')) continue;
        try { events.push(JSON.parse(t)); } catch { /* partial trailing line */ }
      }
    }

    const dayAgo = Date.now() - 24 * 3.6e6;
    const byPath = new Map();
    let errors = 0;
    for (const ev of events) {
      const ts = Number(ev.timestampInMs ?? ev.timestamp ?? 0);
      if (ts && ts < dayAgo) continue;
      const isError = ev.level === 'error' || ev.level === 'fatal' || Number(ev.responseStatusCode) >= 500;
      if (!isError) continue;
      errors++;
      const p = ev.requestPath ?? '?';
      byPath.set(p, (byPath.get(p) ?? 0) + 1);
    }
    const top = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([p, n]) => `${p}×${n}`).join(', ');
    lines.push(`runtime  ${errors} error(s)/24h in ${events.length} sampled log entries${top ? ` — top: ${top}` : ''}`);
    if (errors >= RUNTIME_ERROR_ALERT) problems.push(`${errors} Vercel runtime errors/24h${top ? ` (${top})` : ''}`);
  } catch (e) {
    // runtime-logs is a LIVE tail: on a quiet site nothing arrives inside the
    // sample window and the abort fires during fetch — that is "no traffic
    // observed", not a broken check.
    if (e.name === 'AbortError' || /abort/i.test(String(e.message))) {
      lines.push('runtime  idle — live-log tail sent no entries in the 10s sample window (best-effort check)');
    } else {
      lines.push(`runtime  skipped — ${e.message}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

async function run() {
  const { latest, latestHealthy } = await latestPerAgent();
  const lines = [], problems = [];

  for (const e of EXPECTED) {
    const last = latest.get(e.agent);
    const ok = latestHealthy.get(e.agent);
    const okAgeH = ok ? ageH(ok.created_at) : Infinity;
    const attempt = last
      ? `last attempt status="${last.status}" ${Math.round(ageH(last.created_at))}h ago`
      : 'no attempt on record';
    if (!ok || okAgeH > e.maxAgeH) {
      // A recent 'blocked' row is a DELIBERATE pause (quota guard, key gate)
      // that re-logs itself each scheduled run and auto-resumes — report it as
      // paused, not OVERDUE, so a known month-long quota wait doesn't page
      // daily. Older than 14d means the agent stopped even re-logging: overdue.
      const pausedRow = last && String(last.status).toLowerCase() === 'blocked'
        && ageH(last.created_at) < 24 * 14 ? last : null;
      if (pausedRow) {
        const why = pausedRow.output ? `: ${String(pausedRow.output).slice(0, 140)}` : '';
        lines.push(`paused   ${e.agent} — self-blocked ${Math.round(ageH(pausedRow.created_at))}h ago${why} (${e.label})`);
      } else {
        // Heartbeat miss: no SUCCESSFUL run inside schedule + grace. Fires both
        // when the agent stopped running AND when it runs but only ever fails.
        const when = ok ? `${Math.round(okAgeH / 24)}d ago` : 'never';
        lines.push(`OVERDUE  ${e.agent} — last success ${when}, allowed ${e.maxAgeH}h; ${attempt} (${e.label})`);
        problems.push(e.agent);
      }
    } else if (!healthy(last.status) && !inFlight(last)) {
      lines.push(`FAILED   ${e.agent} — status="${last.status}", ${Math.round(ageH(last.created_at))}h ago (last success ${Math.round(okAgeH)}h ago)`);
      problems.push(e.agent);
    } else {
      lines.push(`ok       ${e.agent} — success ${Math.round(okAgeH)}h ago`);
    }
  }
  const expected = new Set(EXPECTED.map(e => e.agent));
  for (const [name, r] of latest) {
    if (expected.has(name)) continue;
    if (name === 'watchdog') continue;   // never self-monitor via the ledger — reading its own last row created a false "watchdog failed" loop
    if (!healthy(r.status) && !inFlight(r)) { lines.push(`FAILED   ${name} — status="${r.status}"`); problems.push(name); }
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

  // The watchdog itself completed successfully — always log 'ok' and carry any
  // found problems in the payload. Logging 'fail' here (merely because OTHER
  // agents have problems) made the next run read its own row and re-flag
  // "watchdog failed" — a self-perpetuating false alarm. A genuine watchdog
  // failure exits non-zero via the catch below, which is the real liveness signal.
  await logAgentRun('watchdog', 'ok', { problems, emailed });
  return { problems, emailed };
}

run().catch(async e => {
  console.error(`[watchdog] ${e.message}`);
  await sendEmail('⛔ EnviroCare watchdog crashed', `The watchdog could not complete:\n\n${e.message}`).catch(() => {});
  process.exit(1);
});
