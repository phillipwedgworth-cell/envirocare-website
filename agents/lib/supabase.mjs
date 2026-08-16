// agents/lib/supabase.mjs
// Shared Supabase client — imported by kv.mjs, orchestrator.mjs, and any agent that logs data

import { createHash } from "node:crypto";

import { envUrl } from "./env-url.mjs";

// envUrl() strips a stray BOM/whitespace so a pasted SUPABASE_URL can't silently
// break every agent's logging (same class of bug that broke FORMSPREE_LEAD_URL).
const url = envUrl("SUPABASE_URL") || undefined;
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

// JSON.stringify with object keys sorted, recursively, so two structurally
// equal `details` objects always hash the same regardless of insertion order.
function stableStringify(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return `[${v.map(stableStringify).join(",")}]`;
  return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(v[k])}`).join(",")}}`;
}

// Stable identity for a finding WITHIN ONE UTC DAY.
//
// DAY-SCOPED ON PURPOSE. The job is to collapse the 5 identical waves a single
// run emits (see agents/lib/run-cache.mjs for why a run emits 5), NOT to
// collapse history. A key with no date would turn a finding that recurs every
// morning into one eternally-updated row and silently destroy every
// day-over-day count the rollups read.
//
// `details` IS part of the identity, and that is not incidental. Several agents
// write a CONSTANT headline with all the real content in details — seo-watch's
// finding text is the fixed string 'Weekly SEO change scan', and
// agent-template.mjs ships that shape as the pattern every new agent copies. On
// text alone, two genuinely different scans on one day would collapse into one
// row and the earlier one's details would be silently overwritten. Hashing
// details keeps them distinct, and it costs the 5x-wave agents nothing: their
// details are pure derivations of the same run's data, so every wave hashes
// identically.
//
// Severity is deliberately NOT part of the key. It is derived from the finding
// text, so identical text means identical severity within a run; leaving it out
// means a re-classification updates the row instead of duplicating it.
//
// Deterministic across repeat calls: same inputs → same key, with no clock read
// beyond the caller-supplied day.
export function findingDedupKey(agentName, category, pageUrl, finding, details = {}, day) {
  const utcDay = day ?? new Date().toISOString().slice(0, 10);
  const norm = (v) => String(v ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  let detailsPart;
  try {
    detailsPart = stableStringify(details ?? {});
  } catch {
    // Circular / unserialisable details: fall back to a text-only identity
    // rather than throwing inside a logging helper.
    detailsPart = "";
  }
  // NUL-joined so a value containing the separator can't forge a different
  // tuple's key ("a|b" + "c" vs "a" + "b|c").
  const digest = createHash("sha256")
    .update([utcDay, norm(agentName), norm(category), norm(pageUrl), norm(finding), detailsPart].join("\u0000"))
    .digest("hex")
    .slice(0, 24);
  // Human-readable prefix so a row in the table can be traced back to its agent
  // and day without rehashing anything.
  return `${norm(agentName) || "unknown"}:${utcDay}:${digest}`;
}

// Write a single finding row — silently no-ops if agent_findings table doesn't exist yet
export async function writeFinding(agentName, category, severity, pageUrl, finding, details = {}) {
  if (!supabase) return;
  const now = new Date();
  const detailsObj = details ?? {};
  const row = {
    agent_name: agentName,
    category,
    severity,
    page_url: pageUrl ?? null,
    finding,
    details: detailsObj,
    run_date: now.toISOString(),
    dedup_key: findingDedupKey(agentName, category, pageUrl, finding, detailsObj, now.toISOString().slice(0, 10)),
  };

  // onConflict targets (agent_name, dedup_key) — the agent_findings_dedup_unique
  // index. NOT plain (dedup_key): the only single-column unique index on
  // dedup_key is PARTIAL (`WHERE dedup_key IS NOT NULL`), and Postgres refuses
  // to infer a partial index unless the statement repeats its predicate, which
  // PostgREST never emits. Verified live 2026-08-16 against this exact schema:
  // `ON CONFLICT (dedup_key)` fails with 42P10 "there is no unique or exclusion
  // constraint matching the ON CONFLICT specification", while
  // `ON CONFLICT (agent_name, dedup_key)` plans cleanly. Do not "simplify" this
  // back to the single column.
  let { error } = await supabase
    .from("agent_findings")
    .upsert(row, { onConflict: "agent_name,dedup_key" });

  // A database that never ran agents/sql/0002-aeo-watch.sql has no matching
  // unique index. Degrade to an undeduped insert rather than dropping the
  // finding — a duplicate row is a far smaller problem than a lost one.
  if (error?.code === "42P10") {
    console.warn(`[${agentName}] agent_findings has no (agent_name, dedup_key) unique index — run agents/sql/0002-aeo-watch.sql; writing undeduped`);
    ({ error } = await supabase.from("agent_findings").insert(row));
  }

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
  // The interim rounding that used to live here is GONE (2026-08-14).
  // widen_discussion_scores_to_numeric.sql was applied 2026-08-11, so
  // impact_score / effort_score are `numeric` and half-points store natively.
  //
  // Its own comment said "WHEN THAT MIGRATION IS APPLIED, DELETE THESE TWO ROUNDS.
  // Left as-is they become permanent silent lossiness that nobody remembers is
  // here." That is precisely what happened: the migration was applied and the
  // guard was not removed, so writes stopped FAILING and the problem looked
  // solved while every half-point kept being flattened at the call site.
  //
  // Measured before removing: 1,122 rows in agent_discussions, ZERO with a
  // fractional score. The column could hold 9.5 from Aug 11 onward; nothing ever
  // wrote one. A 9.5 and a 9.0 were indistinguishable for the whole window —
  // exactly the distinction the half-point scale exists to express.
  //
  // Do not reintroduce rounding at the call site. If a write ever fails on these
  // columns again, check the COLUMN TYPE first.
  const impactNum = impactScore == null ? null : Number(impactScore);
  const effortNum = effortScore == null ? null : Number(effortScore);
  const { data, error } = await supabase.from("agent_discussions").insert({
    agent_name: agentName,
    references_agent: referencesAgent,
    references_finding_id: referencesFindingId,
    message,
    impact_score: impactNum,
    effort_score: effortNum,
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
    url_path: url ? new URL(url).pathname : null,
    url_ends_with_slash: url ? url.endsWith("/") : null,
    key_prefix: key ? key.slice(0, 12) : null,
    key_length: key ? key.length : null,
    client_ready: Boolean(supabase),
    findings: null,
    discussions: null,
  };
  if (!supabase) return out;
  out.tables = {};
  for (const t of ["agent_findings", "agent_discussions", "agent_state", "agent_runs"]) {
    try {
      const r = await supabase.from(t).select("*").limit(1);
      out.tables[t] = r.error
        ? { ok: false, error: { message: r.error.message, code: r.error.code, details: r.error.details, hint: r.error.hint, status: r.error.status } }
        : { ok: true, row_count: r.data?.length ?? 0 };
    } catch (e) {
      out.tables[t] = { ok: false, threw: e.message };
    }
  }
  // Back-compat for the existing field names
  out.findings = out.tables.agent_findings;
  out.discussions = out.tables.agent_discussions;
  return out;
}
