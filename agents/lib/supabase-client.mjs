// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/supabase-client.mjs
// Commit: fix(agents): fleet at top form — cost_usd/usd_cost unified, run rows always dated, site-reviewer dedup+unpause, aeo-watch failure finalizer, NeuronWriter hard budget, BrightLocal false-zero guard, seo-monitor baseline fallback, crew on schedule
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * Supabase write helpers for AEO-Watch.
 *
 * Uses the existing tables from the agent infrastructure:
 *   - agent_findings  (one row per item surfaced, with dedup key)
 *   - agent_runs      (one row per scheduled run; tracks last_run_at + items_found)
 *   - agent_discussions  (panel votes + reasoning per finding)
 *
 * No new tables needed. Schema additions live in agents/sql/0002-aeo-watch.sql
 * (just indexes + an agent_findings.dedup_key unique constraint).
 *
 * Service-role key required. Set in env: SUPABASE_URL + SUPABASE_SERVICE_KEY.
 */

const PROJECT_REF = 'dyoujmyleihcpqgeifre';
const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;
const AGENT_NAME = 'aeo-watch';

function headers() {
  return {
    'content-type': 'application/json',
    apikey: process.env.SUPABASE_SERVICE_KEY,
    authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    Prefer: 'return=representation',
  };
}

export async function startRun() {
  const r = await fetch(`${BASE}/agent_runs`, {
    method: 'POST',
    headers: headers(),
    // `agent` is the column AEO-Watch reads/writes; `agent_name` is the legacy
    // NOT NULL column from the shared base schema — populate both.
    body: JSON.stringify([{ agent: AGENT_NAME, agent_name: AGENT_NAME, status: 'running', started_at: new Date().toISOString() }]),
  });
  if (!r.ok) throw new Error(`startRun ${r.status}: ${await r.text()}`);
  const [row] = await r.json();
  return row.id;
}

export async function endRun(runId, summary) {
  await fetch(`${BASE}/agent_runs?id=eq.${runId}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({
      status: 'complete',
      ended_at: new Date().toISOString(),
      summary,
    }),
  });
}

// Close a run as failed. Called from aeo-watch's fatal handler so a crash
// never leaves a 'running' row behind (three of them accumulated Sep 2–4 2026;
// the watchdog treats a stale 'running' as a crash only after IN_FLIGHT_GRACE_H).
export async function failRun(runId, error) {
  if (!runId) return;
  try {
    await fetch(`${BASE}/agent_runs?id=eq.${runId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        status: 'failed',
        ended_at: new Date().toISOString(),
        summary: `FATAL: ${String(error?.stack ?? error?.message ?? error).slice(0, 1500)}`,
      }),
    });
  } catch (e) {
    console.error(`[supabase-client] failRun could not close run ${runId}: ${e.message}`);
  }
}

export async function getLastRunAt() {
  const r = await fetch(
    `${BASE}/agent_runs?agent=eq.${AGENT_NAME}&status=eq.complete&order=ended_at.desc&limit=1`,
    { headers: headers() }
  );
  const rows = await r.json();
  return rows[0]?.ended_at ? new Date(rows[0].ended_at) : null;
}

/**
 * Insert a finding with dedup. If a row with the same dedup_key exists,
 * skip silently (does NOT throw). Returns true if inserted, false if dup.
 */
export async function upsertFinding({ dedupKey, source, title, url, summary, tags, panelResult }) {
  // Check existence first — cheaper than relying on a unique constraint conflict
  const exists = await fetch(
    `${BASE}/agent_findings?dedup_key=eq.${encodeURIComponent(dedupKey)}&limit=1`,
    { headers: headers() }
  );
  const existsArr = await exists.json();
  if (Array.isArray(existsArr) && existsArr.length) return { inserted: false, id: existsArr[0].id };

  const r = await fetch(`${BASE}/agent_findings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify([
      {
        agent: AGENT_NAME,
        // Legacy NOT NULL columns from the shared base schema:
        agent_name: AGENT_NAME,
        category: 'seo',
        finding: title || summary || dedupKey,
        dedup_key: dedupKey,
        source,
        title,
        url,
        summary,
        tags,
        panel_verdict: panelResult?.consensus || null,
        panel_split: panelResult?.split || false,
        panel_payload: panelResult || null,
        created_at: new Date().toISOString(),
      },
    ]),
  });
  if (!r.ok) {
    // 409 = unique conflict (race condition with parallel run) — treat as dup
    if (r.status === 409) return { inserted: false, id: null };
    throw new Error(`insert finding ${r.status}: ${await r.text()}`);
  }
  // The insert succeeded (2xx). It does NOT follow that a row came back.
  //
  // CRASHED IN PRODUCTION 2026-09-16, aeo-watch run 35123838102:
  //   FATAL: TypeError: Cannot read properties of undefined (reading 'id')
  //       at upsertFinding (agents/lib/supabase-client.mjs:130:36)
  // `const [row] = await r.json()` destructured an empty array, so `row.id` threw and
  // took the whole run down after it had already fetched every feed.
  //
  // PostgREST returns an empty representation on a successful write in more than one
  // ordinary case — a row filtered by a SELECT policy, or a conflict resolved
  // server-side. Neither is an error, and neither should be fatal: without an id there
  // is simply no finding to hang a panel row off, which is exactly the case the caller
  // already handles. aeo-watch.mjs guards on `!finding?.inserted || !finding.id` and
  // skips, so reporting the non-representation as a non-insert lets the run continue
  // through the remaining findings instead of aborting.
  //
  // Reading the body defensively (not destructuring) is the whole fix — an empty body,
  // a bare object and the normal array all resolve without throwing.
  const body = await r.json().catch(() => null);
  const row = Array.isArray(body) ? body[0] : body;
  if (!row || row.id === undefined || row.id === null) {
    return { inserted: false, id: null };
  }
  return { inserted: true, id: row.id };
}

export async function recordPanel(findingId, panelResult) {
  await fetch(`${BASE}/agent_discussions`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify([
      {
        agent: AGENT_NAME,
        // Legacy NOT NULL columns from the shared base schema:
        agent_name: AGENT_NAME,
        message: `panel verdict: ${panelResult.consensus}${panelResult.split ? ' (split)' : ''}`,
        finding_id: findingId,
        votes: panelResult.votes,
        tally: panelResult.tally,
        consensus: panelResult.consensus,
        split: panelResult.split,
        cost_usd: panelResult.costEstimateUSD,
        created_at: new Date().toISOString(),
      },
    ]),
  });
}
