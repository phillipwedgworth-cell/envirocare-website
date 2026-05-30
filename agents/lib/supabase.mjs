// agents/lib/supabase.mjs
// Shared Supabase client — imported by kv.mjs, orchestrator.mjs, and any agent that logs data

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

// Supabase errors carry code/details/hint in addition to message; .message alone
// often truncates to "Invalid ..." in Vercel log tables. Format the whole shape.
function fmtSbError(err) {
  if (!err) return "(no error object)";
  return JSON.stringify({
    message: err.message ?? null,
    code: err.code ?? null,
    details: err.details ?? null,
    hint: err.hint ?? null,
    status: err.status ?? null,
  });
}

// Export a supabase client when both env vars are present.
// Use dynamic import so local development without the package doesn't crash on module load.
export let supabase = null;
if (url && key) {
  try {
    const mod = await import("@supabase/supabase-js");
    const createClient = mod.createClient ?? mod.default?.createClient ?? mod.default;
    supabase = createClient(url, key);
  } catch (e) {
    console.error(`[supabase] failed to import @supabase/supabase-js: ${e.message}`);
    supabase = null;
  }
}

export async function logAgentRun(agentName, status, output) {
  if (!supabase) return;
  try {
    await supabase.from("agent_runs").insert({
      agent_name: agentName,
      status,
      output: typeof output === "string" ? output : JSON.stringify(output),
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error(`[supabase] logAgentRun failed: ${e.message}`);
  }
}

// Write a single finding row — silently no-ops if agent_findings table doesn't exist yet
export async function writeFinding(agentName, category, severity, pageUrl, finding, details = {}) {
  if (!supabase) return;
  const { error } = await supabase.from("agent_findings").insert({
    agent_name: agentName,
    category,
    severity,
    page_url: pageUrl ?? null,
    finding,
    details: details ?? {},
    run_date: new Date().toISOString(),
  });
  if (error) {
    if (error.message?.includes("does not exist")) {
      console.warn(`[supabase] agent_findings table missing — run agents/lib/migrations/add_agent_findings.sql`);
    } else {
      console.error(`[${agentName}] writeFinding error: ${fmtSbError(error)}`);
    }
  }
}

// Read findings from the last N hours, optionally filtered by agent names
export async function readFindings(agentNames = [], hoursBack = 24) {
  if (!supabase) return [];
  const since = new Date(Date.now() - hoursBack * 3600000).toISOString();
  let query = supabase
    .from("agent_findings")
    .select("*")
    .gte("run_date", since)
    .order("run_date", { ascending: false });
  if (agentNames.length > 0) query = query.in("agent_name", agentNames);
  const { data, error } = await query;
  if (error) {
    if (!error.message?.includes("does not exist")) {
      console.error(`[supabase] readFindings error: ${fmtSbError(error)}`);
    }
    return [];
  }
  return data ?? [];
}

// Write a cross-agent discussion entry to agent_discussions table
export async function writeDiscussion({
  agentName,
  referencesAgent = null,
  referencesFindingId = null,
  message,
  impactScore,
  effortScore,
}) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("agent_discussions").insert({
    agent_name: agentName,
    references_agent: referencesAgent,
    references_finding_id: referencesFindingId,
    message,
    impact_score: impactScore,
    effort_score: effortScore,
    created_at: new Date().toISOString(),
  }).select().single();
  if (error) {
    if (error.message?.includes("does not exist")) {
      console.warn(`[supabase] agent_discussions table missing — run agents/lib/migrations/add_agent_discussions.sql`);
    } else {
      console.error(`[${agentName}] writeDiscussion error: ${fmtSbError(error)}`);
    }
    return null;
  }
  return data;
}

// Read recent discussion entries, optionally filtered by agent names
export async function readDiscussions(agentNames = [], hoursBack = 6) {
  if (!supabase) return [];
  const since = new Date(Date.now() - hoursBack * 3600000).toISOString();
  let query = supabase
    .from("agent_discussions")
    .select("*")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(50);
  if (agentNames.length > 0) query = query.in("agent_name", agentNames);
  const { data, error } = await query;
  if (error) {
    if (!error.message?.includes("does not exist")) {
      console.error(`[supabase] readDiscussions error: ${fmtSbError(error)}`);
    }
    return [];
  }
  return data ?? [];
}

// Read all discussions from a given round (used by Round 3 critic)
export async function readAllDiscussions(hoursBack = 6) {
  return readDiscussions([], hoursBack);
}

// Returns connection diagnostics + raw error object (no log truncation).
// Probes both tables with a 1-row select so we can see Supabase's actual
// code/details/hint, not just the message.
export async function probe() {
  const out = {
    has_url: Boolean(url),
    has_key: Boolean(key),
    url_host: url ? new URL(url).host : null,
    key_prefix: key ? key.slice(0, 12) : null,
    key_length: key ? key.length : null,
    client_ready: Boolean(supabase),
    findings: null,
    discussions: null,
  };
  if (!supabase) return out;
  try {
    const r1 = await supabase.from("agent_findings").select("*").limit(1);
    out.findings = r1.error
      ? { ok: false, error: { message: r1.error.message, code: r1.error.code, details: r1.error.details, hint: r1.error.hint, status: r1.error.status } }
      : { ok: true, row_count: r1.data?.length ?? 0 };
  } catch (e) {
    out.findings = { ok: false, threw: e.message };
  }
  try {
    const r2 = await supabase.from("agent_discussions").select("*").limit(1);
    out.discussions = r2.error
      ? { ok: false, error: { message: r2.error.message, code: r2.error.code, details: r2.error.details, hint: r2.error.hint, status: r2.error.status } }
      : { ok: true, row_count: r2.data?.length ?? 0 };
  } catch (e) {
    out.discussions = { ok: false, threw: e.message };
  }
  return out;
}
