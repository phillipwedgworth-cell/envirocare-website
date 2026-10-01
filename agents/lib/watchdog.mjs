// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/watchdog.mjs
// Commit: fix(watchdog): read agent_runs; agent_logs is never written
// Push: main
// ─────────────────────────────────────
import { callClaude, AnthropicError, classifyAnthropicFailure } from "./anthropic-guard.mjs";

// Cheapest valid model — the canary only needs a single "ok" token back.
const CANARY_MODEL = "claude-haiku-4-5";
const ERROR_KIND_FLEET_WIDE = new Set(["KEY_CAPPED", "AUTH"]);

export async function runWatchdog({
  supabaseUrl,
  supabaseServiceRoleKey,
  alertEmail,
  resendApiKey,
  fromEmail,
  anthropicApiKey,
}) {
  const canary = await runCanary(anthropicApiKey);
  const logs = await getRecentAgentErrors({ supabaseUrl, supabaseServiceRoleKey });
  const stale = await getStaleAgents({ supabaseUrl, supabaseServiceRoleKey });
  const findings = dedupeLogs(logs, canary);
  const alerted = await alertIfNeeded({ findings, stale, canary, alertEmail, resendApiKey, fromEmail });
  return { canary, findings, stale, alerted };
}

// Max hours between runs before an agent counts as stale. Keyed to the
// schedules in vercel.json and .github/workflows as of 2026-10-01: weekly
// agents get 8 days (one missed Monday), daily agents 30 hours.
// Add an agent here when you schedule it; remove it when you retire it.
const EXPECTED_MAX_HOURS = {
  orchestrator: 8 * 24,
  "seo-monitor": 8 * 24,
  "review-responder": 8 * 24,
  "neuronwriter-qa": 8 * 24,
  brightlocal: 8 * 24,
  "seo-snapshot": 8 * 24,
  "neuronwriter-narrator": 8 * 24,
  "neuronwriter-pull": 8 * 24,
  "morning-brief": 30,
  "captivated-suppress-sync": 3 * 24, // weekdays only
};

async function getStaleAgents({ supabaseUrl, supabaseServiceRoleKey }) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // Can't check means can't vouch: report it rather than return a clean [].
    return [{ agent: "(staleness check)", lastRun: null, reason: "SUPABASE_URL or service key missing" }];
  }
  const since = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
  const url = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/agent_runs`
    + `?select=created_at,agent_name,agent&created_at=gte.${since}&order=created_at.desc&limit=2000`;
  let rows;
  try {
    const res = await fetch(url, { headers: { apikey: supabaseServiceRoleKey, Authorization: `Bearer ${supabaseServiceRoleKey}` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    rows = await res.json();
  } catch (e) {
    return [{ agent: "(staleness check)", lastRun: null, reason: `agent_runs read failed: ${e.message}` }];
  }
  const last = {};
  for (const r of rows) {
    const who = r.agent_name ?? r.agent;
    if (who && !last[who]) last[who] = r.created_at;
  }
  const now = Date.now();
  return Object.entries(EXPECTED_MAX_HOURS)
    .filter(([agent, maxH]) => !last[agent] || (now - Date.parse(last[agent])) / 3.6e6 > maxH)
    .map(([agent, maxH]) => ({ agent, lastRun: last[agent] ?? null, reason: `no run in ${maxH}h` }));
}

async function runCanary(apiKey) {
  try {
    const response = await callClaude({
      model: CANARY_MODEL,
      system: "You are a minimal check that should return the single token 'ok'.",
      messages: [{ role: "user", content: "Respond with ok." }],
      max_tokens: 5,
      apiKey,
    });
    // Messages API shape: { content: [{ type: "text", text: "..." }] }
    const text = String(response?.content?.[0]?.text ?? "").trim().toLowerCase();
    return { ok: text.includes("ok"), kind: "OK", response };
  } catch (error) {
    if (error instanceof AnthropicError) {
      return { ok: false, kind: error.kind, status: error.status, body: error.body };
    }
    return { ok: false, kind: "OTHER", error: String(error) };
  }
}

async function getRecentAgentErrors({ supabaseUrl, supabaseServiceRoleKey }) {
  if (!supabaseUrl || !supabaseServiceRoleKey) return [];
  // agent_logs has exactly one reference in this entire repo -- this read.
  // Nothing writes it, so it is empty by construction and this check has always
  // returned []. agent_runs is what the fleet actually writes. Verified by grep
  // of the repo source, not by a schema dump.
  const url = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/agent_runs`
    + `?select=created_at,agent_name,agent,status,output`
    + `&order=created_at.desc&limit=200`;
  let res;
  try {
    res = await fetch(url, {
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
      },
    });
  } catch {
    return [];
  }
  // agent_logs may not exist yet (the fleet currently logs to agent_costs only).
  // A missing table returns a non-2xx here, so we degrade to "canary only".
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[watchdog] agent_runs read failed: ${res.status} ${body.slice(0, 300)}`);
    return [];
  }
  const rows = await res.json().catch(() => []);
  const FAILED = new Set(["error", "failed", "fail", "crashed", "timeout"]);
  return (Array.isArray(rows) ? rows : [])
    .filter((r) => FAILED.has(String(r.status ?? "").toLowerCase()))
    .slice(0, 25);
}

function dedupeLogs(logs, canary) {
  const seen = new Set();
  const entries = [];

  if (!canary.ok && ERROR_KIND_FLEET_WIDE.has(canary.kind)) {
    entries.push({ source: "canary", kind: canary.kind, message: canary.body?.error?.message ?? canary.error ?? "fleet-wide canary failure" });
  }

  for (const log of logs || []) {
    const who = log.agent_name ?? log.agent ?? "unknown";
    const key = `${who}::${log.status ?? "UNKNOWN"}::${String(log.output ?? "").slice(0, 200)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({
      source: "agent_run",
      agent_name: who,
      kind: String(log.status ?? "UNKNOWN").toUpperCase(),
      message: String(log.output ?? "").slice(0, 300) || "(no output recorded)",
      created_at: log.created_at,
    });
  }

  return entries;
}

async function alertIfNeeded({ findings, stale = [], canary, alertEmail, resendApiKey, fromEmail }) {
  const fleetIssue = !canary.ok && ERROR_KIND_FLEET_WIDE.has(canary.kind);
  // The watchdog fires ~5x/day (Vercel 30 */6 + the GH workflow). Staleness only
  // emails from the 12:30 UTC Vercel run (7:30am CT) so it lands once a day.
  const staleIssue = stale.length > 0 && new Date().getUTCHours() === 12;
  if (!fleetIssue && !staleIssue) return false;

  const recipients = String(alertEmail || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  if (!recipients.length || !resendApiKey || !fromEmail) return false;

  const body = {
    from: fromEmail,
    to: recipients,
    subject: fleetIssue ? `[WATCHDOG] Fleet alert: ${canary.kind}` : `[WATCHDOG] ${stale.length} agent(s) missed their schedule`,
    text: (fleetIssue
      ? `Fleet watchdog detected a fleet-wide agent failure.\n\nCanary kind: ${canary.kind}\nStatus: ${canary.status}\nMessage: ${canary.body?.error?.message ?? JSON.stringify(canary.body)}\n\n`
      : "")
      + (stale.length ? `Stale agents:\n${stale.map(s => `- ${s.agent}: last run ${s.lastRun ?? "never (30d window)"} (${s.reason})`).join("\n")}\n\n` : "")
      + `Recent failed runs:\n${findings.map(f => `- ${f.source}: ${f.agent_name || f.kind} ${f.message}`).join("\n") || "- none"}`,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify(body),
  });

  return res.ok;
}
