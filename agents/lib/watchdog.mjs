// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/watchdog.mjs
// Commit: fix(watchdog): read agent_runs not agent_logs; stop swallowing 42703
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
  const findings = dedupeLogs(logs, canary);
  const alerted = await alertIfNeeded({ findings, canary, alertEmail, resendApiKey, fromEmail });
  return { canary, findings, alerted };
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

// Verified against the live schema on 2026-07-24.
//
// This used to read `agent_logs`, selecting created_at,error_type,agent_name,
// error_message. Live `agent_logs` is (id, agent, status, summary, duration_sec,
// created_at) -- three of those four columns do not exist, so PostgREST returned
// 42703 on every call. The `if (!res.ok) return []` below swallowed it silently,
// which meant the watchdog has been running canary-only and reporting healthy.
//
// `agent_logs` is also never written by any agent in this repo. `agent_runs` is
// the table the fleet actually writes, and it carries agent_name, agent, status
// and output. Repointed there, and the failure path is now loud.
const FAILED_STATUSES = new Set(["error", "failed", "fail", "crashed", "timeout"]);

async function getRecentAgentErrors({ supabaseUrl, supabaseServiceRoleKey }) {
  if (!supabaseUrl || !supabaseServiceRoleKey) return [];
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
  } catch (e) {
    console.error(`[watchdog] agent_runs read threw: ${e.message}`);
    return [];
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[watchdog] agent_runs read failed: ${res.status} ${body.slice(0, 300)}`);
    return [];
  }
  const rows = await res.json().catch(() => []);
  return (Array.isArray(rows) ? rows : [])
    .filter((r) => FAILED_STATUSES.has(String(r.status ?? "").toLowerCase()))
    .slice(0, 25);
}

function dedupeLogs(logs, canary) {
  const seen = new Set();
  const entries = [];

  if (!canary.ok && ERROR_KIND_FLEET_WIDE.has(canary.kind)) {
    entries.push({ source: "canary", kind: canary.kind, message: canary.body?.error?.message ?? canary.error ?? "fleet-wide canary failure" });
  }

  for (const log of logs || []) {
    // agent_runs carries BOTH `agent_name` and legacy `agent`; different writers
    // fill different ones, so coalesce rather than trusting either alone.
    const who = log.agent_name ?? log.agent ?? "unknown";
    const kind = String(log.status ?? "UNKNOWN").toUpperCase();
    const message = String(log.output ?? "").slice(0, 300) || "(no output recorded)";
    const key = `${who}::${kind}::${message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({
      source: "agent_run",
      agent_name: who,
      kind,
      message,
      created_at: log.created_at,
    });
  }

  return entries;
}

async function alertIfNeeded({ findings, canary, alertEmail, resendApiKey, fromEmail }) {
  const fleetIssue = !canary.ok && ERROR_KIND_FLEET_WIDE.has(canary.kind);
  if (!fleetIssue) return false;

  const recipients = String(alertEmail || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  if (!recipients.length || !resendApiKey || !fromEmail) return false;

  const body = {
    from: fromEmail,
    to: recipients,
    subject: `[WATCHDOG] Fleet alert: ${canary.kind}`,
    text: `Fleet watchdog detected a fleet-wide agent failure.\n\nCanary kind: ${canary.kind}\nStatus: ${canary.status}\nMessage: ${canary.body?.error?.message ?? JSON.stringify(canary.body)}\n\nRecent findings:\n${findings.map(f => `- ${f.source}: ${f.agent_name || f.kind} ${f.message}`).join("\n")}`,
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
