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
        status,
        output: String(output ?? "").slice(0, 2000),
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
