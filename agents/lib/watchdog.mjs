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

async function getRecentAgentErrors({ supabaseUrl, supabaseServiceRoleKey }) {
  if (!supabaseUrl || !supabaseServiceRoleKey) return [];
  const url = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/agent_logs?select=created_at,error_type,agent_name,error_message&order=created_at.desc&limit=25`;
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
  if (!res.ok) return [];
  return res.json();
}

function dedupeLogs(logs, canary) {
  const seen = new Set();
  const entries = [];

  if (!canary.ok && ERROR_KIND_FLEET_WIDE.has(canary.kind)) {
    entries.push({ source: "canary", kind: canary.kind, message: canary.body?.error?.message ?? canary.error ?? "fleet-wide canary failure" });
  }

  for (const log of logs || []) {
    const key = `${log.agent_name}::${log.error_type || "UNKNOWN"}::${log.error_message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({
      source: "agent_log",
      agent_name: log.agent_name,
      kind: log.error_type || "UNKNOWN",
      message: log.error_message,
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
