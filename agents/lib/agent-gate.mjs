// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/agent-gate.mjs
// Commit: feat(agents): enforce agent_registry.status as a real kill switch
// Push: main
// ─────────────────────────────────────
//
// WHY THIS EXISTS
// ---------------
// agent_registry.status was decorative. Scheduling lives entirely in GitHub
// Actions cron, and nothing in the codebase ever read the column. Verified
// live 2026-08-24: `site-reviewer` and `social-poster` are both marked
// 'paused' in agent_registry and both ran anyway — site-reviewer 16 times
// that day. Pausing an agent in the table did nothing at all.
//
// This module makes the column authoritative. Agents call gate() as the very
// first thing in run(); if the registry says paused/retired/disabled, the
// agent logs a 'skipped' heartbeat and returns without doing work or spending
// tokens.
//
// FAIL-OPEN, DELIBERATELY. If Supabase is unreachable or the row is missing,
// the agent runs. A network blip must not silently stop the whole fleet — a
// wasted run is cheaper than a week of invisible dead air. Only an explicit
// non-active status in the table stops an agent.

import { cleanEnv, envUrl } from "./env-url.mjs";

// The rest of the fleet reads SUPABASE_URL (see agents/lib/supabase.mjs), so
// this does too. A hardcoded project ref that drifts from the real one would
// 404 every read and, because the gate fails open, leave the kill switch
// permanently off — the exact bug this module exists to fix. The literal is
// only a last-resort fallback.
const FALLBACK_REF = "dyoujmyleihcpqgeifre";
const BASE =
  envUrl("SUPABASE_URL").replace(/\/+$/, "") ||
  `https://${FALLBACK_REF}.supabase.co`;
const REST = `${BASE}/rest/v1`;

// Anything not in this set stops the agent. Kept as an allow-list on purpose:
// a typo'd status ('pasued') should stop the agent rather than quietly run it.
const RUNNABLE = new Set(["active", "enabled", "live"]);

function headers() {
  // SUPABASE_KEY fallback: several workflows set only that one.
  const key = cleanEnv("SUPABASE_SERVICE_KEY") || cleanEnv("SUPABASE_KEY");
  if (!key) return null;
  return { apikey: key, authorization: `Bearer ${key}` };
}

/**
 * Look up an agent's registry status.
 * @returns {Promise<{allowed:boolean, status:string|null, reason:string}>}
 */
export async function checkStatus(agentName) {
  const h = headers();
  if (!h) {
    return { allowed: true, status: null, reason: "no SUPABASE_SERVICE_KEY / SUPABASE_KEY — gate open" };
  }
  try {
    const url =
      `${REST}/agent_registry` +
      `?agent_name=eq.${encodeURIComponent(agentName)}` +
      `&select=agent_name,status,muted_reason&limit=1`;
    const res = await fetch(url, { headers: h });
    if (!res.ok) {
      return { allowed: true, status: null, reason: `registry read ${res.status} — gate open` };
    }
    const rows = await res.json();
    const row = Array.isArray(rows) ? rows[0] : null;
    if (!row) {
      // Unregistered agent. Runs, but says so loudly — an agent nobody
      // registered is exactly the divergence that produced the Title-Case
      // twin fleet.
      return { allowed: true, status: null, reason: `not in agent_registry — gate open, REGISTER IT` };
    }
    const status = String(row.status || "").toLowerCase();
    if (RUNNABLE.has(status)) {
      return { allowed: true, status, reason: "active" };
    }
    const why = row.muted_reason ? ` (${row.muted_reason})` : "";
    return { allowed: false, status, reason: `agent_registry.status = '${status}'${why}` };
  } catch (e) {
    return { allowed: true, status: null, reason: `registry unreachable (${e.message}) — gate open` };
  }
}

/**
 * Gate an agent run. Call as the first statement inside run().
 *
 *   const gate = await gateOrSkip(AGENT_NAME);
 *   if (!gate.allowed) return gate.result;
 *
 * Writes a 'skipped' row to agent_runs so the watchdog can tell "paused on
 * purpose" apart from "silently died", which it currently cannot.
 */
export async function gateOrSkip(agentName) {
  const check = await checkStatus(agentName);
  if (check.allowed) {
    if (check.status === null) console.warn(`[${agentName}] gate: ${check.reason}`);
    return { allowed: true, result: null };
  }
  console.log(`[${agentName}] SKIPPED — ${check.reason}`);
  await heartbeatSkip(agentName, check.reason);
  return {
    allowed: false,
    result: { agent: agentName, status: "skipped", reason: check.reason },
  };
}

async function heartbeatSkip(agentName, reason) {
  const h = headers();
  if (!h) return;
  try {
    await fetch(`${REST}/agent_runs`, {
      method: "POST",
      headers: { ...h, "content-type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify([
        {
          agent_name: agentName,
          agent: agentName,
          status: "skipped",
          summary: `gated: ${reason}`,
          started_at: new Date().toISOString(),
          ended_at: new Date().toISOString(),
        },
      ]),
    });
  } catch {
    // A missed heartbeat must never turn into a crash.
  }
}

export default { checkStatus, gateOrSkip };
