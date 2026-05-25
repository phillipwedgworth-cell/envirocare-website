// agents/lib/supabase.mjs
// Shared Supabase client — imported by kv.mjs, orchestrator.mjs, and any agent that logs data

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

// null when running locally without Supabase env vars — callers must guard
export const supabase = url && key ? createClient(url, key) : null;

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
      console.error(`[${agentName}] writeFinding error: ${error.message}`);
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
      console.error(`[supabase] readFindings error: ${error.message}`);
    }
    return [];
  }
  return data ?? [];
}
