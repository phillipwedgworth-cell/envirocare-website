// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/run-log.mjs
// Commit: fix(agents): fleet at top form — cost_usd/usd_cost unified, run rows always dated, site-reviewer dedup+unpause, aeo-watch failure finalizer, NeuronWriter hard budget, BrightLocal false-zero guard, seo-monitor baseline fallback, crew on schedule
// Push: main (via branch + PR)
// ─────────────────────────────────────
// agents/lib/run-log.mjs
// Dependency-free agent_runs heartbeat writer for scripts that don't use
// lib/supabase.mjs (morning-brief, daily-rollup, neuronwriter-narrator auth
// with SUPABASE_SERVICE_KEY over raw REST and never pulled in the supabase-js
// client). One row per run — this is what the watchdog's expected-run
// heartbeat check reads, so EVERY scheduled script must call it on both
// success and failure. An agent that dies before logging shows up as OVERDUE
// once its last success ages past schedule + grace (the Morning Brief
// blind spot: it failed daily for weeks while the watchdog reported green).

const PROJECT_REF = "dyoujmyleihcpqgeifre"; // same fallback ref morning-brief already hardcodes

export async function logRunREST(agentName, status, output) {
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
  if (!key) {
    console.warn(`[${agentName}] no SUPABASE_SERVICE_KEY/SUPABASE_KEY — run not logged to agent_runs`);
    return false;
  }
  const base = (process.env.SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`)
    .trim().replace(/\/+$/, "");
  try {
    const res = await fetch(`${base}/rest/v1/agent_runs`, {
      method: "POST",
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([{
        agent_name: agentName,
        agent: agentName,
        status,
        output: String(output ?? "").slice(0, 2000),
        // This logger fires once, at the end of a run. Stamp start AND end so
        // readers that filter on started_at (the watchdog's cadence check, ad-hoc
        // audits) see the row. Sep 4 2026: rows with started_at NULL made a
        // healthy fleet look like 3 agents.
        started_at: new Date().toISOString(),
        ended_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }]),
    });
    if (!res.ok) {
      console.error(`[${agentName}] agent_runs log failed: ${res.status} ${(await res.text().catch(() => "")).slice(0, 200)}`);
    }
    return res.ok;
  } catch (e) {
    console.error(`[${agentName}] agent_runs log failed: ${e.message}`);
    return false;
  }
}

// Sibling of logRunREST for agent_findings — lets a plain-REST script surface a
// human-readable "here's what I did / found" row that the Command Center's
// "Recent Findings" panel renders. Non-fatal: returns false on any problem.
export async function logFindingREST({ agent_name, category = "info", severity = "info", finding, page_url = null, run_date }) {
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
  if (!key || !finding) {
    console.warn(`[${agent_name}] finding not logged (missing key or text)`);
    return false;
  }
  const base = (process.env.SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`)
    .trim().replace(/\/+$/, "");
  const today = run_date || new Date().toISOString().slice(0, 10);
  try {
    const res = await fetch(`${base}/rest/v1/agent_findings`, {
      method: "POST",
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([{
        agent_name, category, severity,
        page_url,
        finding: String(finding).slice(0, 1000),
        run_date: today,
      }]),
    });
    if (!res.ok) console.error(`[${agent_name}] agent_findings log failed: ${res.status} ${(await res.text().catch(()=> "")).slice(0,200)}`);
    return res.ok;
  } catch (e) {
    console.error(`[${agent_name}] agent_findings log failed: ${e.message}`);
    return false;
  }
}
