// agents/seo-monitor.mjs
// Local Falcon SoLV / rankings agent for EnviroCare (3 Alabama locations).
//
// Same agentic pattern as agents/brightlocal.mjs:
//   - Worker (Haiku) is given tools and a goal, decides what to call
//   - Critic loop (Opus) holds the draft brief to the team rubric
//   - Each current SoLV reading lands in agent_findings (warning if below target)
//   - Week-over-week deltas via stateGet/stateSet keyed per location
//
// API: https://api.localfalcon.com/v1, key passed as `api_key` query param.

import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";
import { getDailyTrend, getOpportunities } from "./lib/seo-history.mjs";
import {
  writeFinding,
  writeDiscussion,
  readDiscussions,
  readFindings,
  logAgentRun,
} from "./lib/supabase.mjs";

const AGENT_NAME = "seo-monitor";
const WORKER_MODEL = "claude-haiku-4-5-20251001";
const MAX_TURNS = 15;
const PROMPT_VERSION = "2026-05-29";

const LF_KEY = process.env.LOCAL_FALCON_API_KEY;
const LF_API = "https://api.localfalcon.com/v1";

const LOCATIONS = [
  { name: "Alabaster", placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY", target: 65, reportKey: "644c1bcec9e3b67" },
  { name: "Alex City", placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c", target: 50, reportKey: "7febc8908039d6d" },
  { name: "Huntsville", placeId: "ChIJd4YXKCRmqmIR1DmDoEcGohU", target: 35, reportKey: "cd64365e1dab32f" },
];

let anthropic = null;
let anthropicInitError = null;
if (!process.env.ANTHROPIC_API_KEY) {
  anthropicInitError = "ANTHROPIC_API_KEY is not set in this environment";
} else {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } catch (e) {
    anthropicInitError = `@anthropic-ai/sdk failed to load: ${e.message}`;
    console.error(`[${AGENT_NAME}] ${anthropicInitError}`);
  }
}

// ---------- Local Falcon HTTP ----------

async function lfFetch(endpoint, params = {}) {
  if (!LF_KEY) throw new Error("LOCAL_FALCON_API_KEY is not set");
  const url = new URL(`${LF_API}/${endpoint}`);
  url.searchParams.set("api_key", LF_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const r = await fetch(url);
  if (!r.ok) throw new Error(`LF ${endpoint}: ${r.status}`);
  return r.json();
}

function findLocation(name) {
  return LOCATIONS.find((l) => l.name === name);
}

// ---------- Tool implementations ----------

// Pull the list of recent scan reports across the past N days.
// Local Falcon endpoint confirmed via the MCP: GET /v1/reports.
// Earlier "scan-reports/list" path was wrong (404).
// Response shape: { reports: [{ report_key, date, keyword, location.name, solv, grid_size, platform }], count, total, next_token }
async function listRecentScans({ days = 14 } = {}) {
  const today = new Date();
  const start = new Date(today.getTime() - days * 86400000);
  const fmt = (d) =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  try {
    const json = await lfFetch("reports", {
      start_date: fmt(start),
      end_date: fmt(today),
    });
    const reports = json?.reports ?? json?.data?.reports ?? [];
    return { scans: reports.slice(0, 30) };
  } catch (e) {
    return { error: e.message };
  }
}

// Pull a single scan by report_key. Returns the full payload; the worker can
// extract what it needs (SoLV per keyword, ARP, total nodes, etc.).
// Endpoint: GET /v1/reports/{report_key} (15-char lowercase hex).
async function getScanReport({ report_id }) {
  if (!report_id) return { error: "report_id required" };
  try {
    const json = await lfFetch(`reports/${encodeURIComponent(report_id)}`);
    return json?.data ?? json;
  } catch (e) {
    return { error: e.message };
  }
}

// Pull SoLV for a specific location via its dedicated Local Falcon location-report key.
// Each location has a stable reportKey (15-char hex) that aggregates all its keyword scans.
// Using per-location keys avoids the blind-averaging bug where all locations showed the
// same blended number from the global scan list.
async function getLatestSolv({ location_name }) {
  const loc = findLocation(location_name);
  if (!loc) return { error: `Unknown location: ${location_name}` };
  if (!loc.reportKey) {
    return { location: loc.name, solv: null, target: loc.target, note: "No reportKey configured for this location — add it from the Local Falcon UI" };
  }
  try {
    const report = await getScanReport({ report_id: loc.reportKey });
    if (report.error) return { location: loc.name, solv: null, target: loc.target, error: report.error };
    const solv = Number(report?.solv ?? report?.summary?.solv ?? NaN);
    return {
      location: loc.name,
      solv: Number.isFinite(solv) ? Math.round(solv * 100) / 100 : null,
      target: loc.target,
      report_key: loc.reportKey,
      report_date: report?.date ?? report?.created_at ?? null,
    };
  } catch (e) {
    return { error: e.message };
  }
}

async function getLastWeekSolv({ location_name }) {
  const prior = await stateGet(`${AGENT_NAME}:solv:${location_name}`);
  return prior ?? { solv: null, date: null };
}

async function recordSolv({ location_name, solv }) {
  const loc = findLocation(location_name);
  if (!loc) return { error: `Unknown location: ${location_name}` };
  await stateSet(`${AGENT_NAME}:solv:${location_name}`, {
    solv,
    date: new Date().toISOString(),
  });
  const belowTarget = typeof solv === "number" && solv < loc.target;
  await writeFinding(
    AGENT_NAME,
    "seo",
    belowTarget ? "warning" : "info",
    null,
    `${loc.name} SoLV: ${solv === null ? "no data" : `${solv}%`} (target ${loc.target}%)`,
    { location: loc.name, solv, target: loc.target, below_target: belowTarget },
  );
  return { ok: true };
}

async function readPeerFindings({ agents = ["brightlocal", "site-reviewer"], hoursBack = 168 }) {
  const findings = await readFindings(agents, hoursBack);
  const discussions = await readDiscussions(agents, hoursBack);
  return {
    findings: findings.slice(0, 20),
    discussions: discussions.slice(0, 20),
  };
}

async function postDiscussion({ message, referencesAgent = null, impactScore, effortScore }) {
  const row = await writeDiscussion({
    agentName: AGENT_NAME,
    referencesAgent,
    referencesFindingId: null,
    message,
    impactScore,
    effortScore,
  });
  return row ? { ok: true, id: row.id } : { ok: false };
}

// ---------- Tool schema ----------

const tools = [
  {
    name: "list_locations",
    description: "List all 3 EnviroCare locations with their SoLV targets.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "list_recent_scans",
    description:
      "List Local Falcon scan reports from the last N days (default 14). Returns scan IDs you can pass to get_scan_report.",
    input_schema: {
      type: "object",
      properties: { days: { type: "integer" } },
    },
  },
  {
    name: "get_scan_report",
    description:
      "Pull the full payload for a specific Local Falcon scan (per-keyword SoLV, ARP, grid nodes, etc.). Use after list_recent_scans.",
    input_schema: {
      type: "object",
      properties: { report_id: { type: "string" } },
      required: ["report_id"],
    },
  },
  {
    name: "get_latest_solv",
    description:
      "Convenience: most recent overall SoLV % for a location across its scans in the last 14 days. Returns null if no scan found.",
    input_schema: {
      type: "object",
      properties: {
        location_name: { type: "string", enum: ["Alabaster", "Alex City", "Huntsville"] },
      },
      required: ["location_name"],
    },
  },
  {
    name: "get_last_week_solv",
    description: "Read the prior week's recorded SoLV % for a location (from agent_state).",
    input_schema: {
      type: "object",
      properties: { location_name: { type: "string" } },
      required: ["location_name"],
    },
  },
  {
    name: "record_solv",
    description:
      "Persist the current SoLV % for a location. Writes to agent_state (next-week delta) and agent_findings. Call once per location after fetching.",
    input_schema: {
      type: "object",
      properties: {
        location_name: { type: "string" },
        solv: { type: "number" },
      },
      required: ["location_name", "solv"],
    },
  },
  {
    name: "read_peer_findings",
    description:
      "Read recent findings + discussions from other agents (brightlocal, site-reviewer). Use to surface cross-agent connections.",
    input_schema: {
      type: "object",
      properties: {
        agents: { type: "array", items: { type: "string" } },
        hoursBack: { type: "integer" },
      },
    },
  },
  {
    name: "post_discussion",
    description:
      "Post a cross-agent discussion entry with impact/effort scoring (1-10). Use to elevate compounding signals (e.g. SoLV low + citations low on same location).",
    input_schema: {
      type: "object",
      properties: {
        message: { type: "string" },
        referencesAgent: { type: "string" },
        impactScore: { type: "number" },
        effortScore: { type: "number" },
      },
      required: ["message", "impactScore", "effortScore"],
    },
  },
];

async function callTool(name, input) {
  switch (name) {
    case "list_locations":
      return { locations: LOCATIONS };
    case "list_recent_scans":
      return await listRecentScans(input);
    case "get_scan_report":
      return await getScanReport(input);
    case "get_latest_solv":
      return await getLatestSolv(input);
    case "get_last_week_solv":
      return await getLastWeekSolv(input);
    case "record_solv":
      return await recordSolv(input);
    case "read_peer_findings":
      return await readPeerFindings(input);
    case "post_discussion":
      return await postDiscussion(input);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ---------- Worker ----------

const WORKER_SYSTEM = `You are the Local Falcon SEO analyst for EnviroCare Pest Control (Alabama, 3 locations: Alabaster, Alex City, Huntsville). SoLV targets are Alabaster 65%, Alex City 50%, Huntsville 35%.

YOUR JOB
Produce the weekly Monday SoLV brief.

APPROACH (you choose order, skip if irrelevant)
1. read_peer_findings to see what BrightLocal / site-reviewer flagged this week.
2. list_recent_scans to see what data is available, then get_scan_report for the latest scan per location (or use get_latest_solv as a shortcut).
3. For each location: get_last_week_solv, compute the delta.
4. record_solv for each current value.
5. If a location is BELOW TARGET AND brightlocal flagged it for citations on the same location, post_discussion linking the two (impact 8+, effort 3-5).
6. Self-check: is your draft specific (numbers, deltas, named locations) or vague? If vague, gather more data first.
7. Emit the final brief.

FINAL BRIEF FORMAT
5-7 bullets. Lead with the biggest movers. Every bullet has a specific SoLV % and delta vs last week (or "no prior data"). Flag URGENT for Huntsville if SoLV remains at or near 0%. No preamble, no sign-off.

PROMPT VERSION: ${PROMPT_VERSION}`;

async function workerDraft(feedback = null, gscContext = '') {
  if (!anthropic) throw new Error(anthropicInitError ?? "Anthropic client unavailable — cannot run worker");

  const base = feedback
    ? `Run the weekly Monday SoLV brief again, addressing this critic feedback before emitting:\n\n${feedback}`
    : "Run the weekly Monday SoLV brief.";
  const initial = gscContext ? `${base}\n\n${gscContext}\n\nInclude a one-line GSC organic note at the end of your brief (click delta + top opportunity).` : base;

  const messages = [{ role: "user", content: initial }];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const resp = await createMessage(anthropic, {
      model: WORKER_MODEL,
      max_tokens: 1500,
      system: WORKER_SYSTEM,
      tools,
      messages,
    }, { agentName: AGENT_NAME, role: 'worker' });
    messages.push({ role: "assistant", content: resp.content });

    if (resp.stop_reason === "end_turn") {
      return resp.content.find((b) => b.type === "text")?.text?.trim() ?? "";
    }
    if (resp.stop_reason !== "tool_use") return "";

    const toolResults = [];
    for (const block of resp.content) {
      if (block.type !== "tool_use") continue;
      console.log(`[${AGENT_NAME}] -> ${block.name}`, JSON.stringify(block.input).slice(0, 160));
      const result = await callTool(block.name, block.input);
      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: JSON.stringify(result).slice(0, 10000),
      });
    }
    messages.push({ role: "user", content: toolResults });
  }
  return "";
}

// ---------- Entry point ----------

export async function run() {
  console.log(`[${AGENT_NAME}] Starting (prompt ${PROMPT_VERSION})`);

  // Pull GSC organic trend for context (fire-and-forget on failure — SoLV brief runs regardless)
  let gscContext = '';
  try {
    const [trend, opps] = await Promise.all([getDailyTrend(28), getOpportunities(5)]);
    if (trend) {
      const clickDelta = trend.clicks.now - trend.clicks.prev;
      const posDelta = (trend.position.prev - trend.position.now).toFixed(1);
      gscContext = `\nGSC ORGANIC TREND (last 28d vs prior 28d): clicks ${trend.clicks.now} (${clickDelta >= 0 ? '+' : ''}${clickDelta}), impressions ${trend.impressions.now} (${trend.impressions.now - trend.impressions.prev >= 0 ? '+' : ''}${trend.impressions.now - trend.impressions.prev}), avg position ${trend.position.now} (${Number(posDelta) >= 0 ? '+' : ''}${posDelta}).`;
    }
    if (opps?.length) {
      gscContext += `\nTOP GSC OPPORTUNITIES (high impressions, low clicks): ${opps.map(o => `${o.page} — ${o.impressions} impr, ${o.clicks} clicks, pos ${o.position}`).join(' | ')}`;
    }
  } catch (e) {
    console.warn(`[${AGENT_NAME}] seo-history fetch failed (non-fatal): ${e.message}`);
  }

  let draft;
  try {
    draft = await workerDraft(null, gscContext);
  } catch (e) {
    console.error(`[${AGENT_NAME}] worker failed: ${e.message}`);
    await logAgentRun(AGENT_NAME, "error", e.message);
    throw e;
  }

  const rubric = `
- Each location named explicitly with its current SoLV % (or "no data" if missing)
- Week-over-week delta for each location (or "no prior data" if first run)
- Huntsville flagged URGENT if SoLV at or near 0%
- Any location below its target flagged as BELOW TARGET with gap
- At least one concrete next action tied to a specific location and metric
- No vague phrases ("monitor", "continue efforts") without numbers
- Under 200 words, no preamble, no sign-off`;

  const final = await criticLoop({
    workerName: AGENT_NAME,
    task: "Weekly Local Falcon SoLV brief for EnviroCare's 3 Alabama locations",
    output: draft,
    rubric,
    revise: (fb) => workerDraft(fb),
    onEscalate: async (output) => {
      console.warn(`[${AGENT_NAME}] critic escalated — returning best draft`);
      await logAgentRun(AGENT_NAME, "escalated", output);
    },
  });

  await logAgentRun(AGENT_NAME, "ok", final);
  console.log(`[${AGENT_NAME}] Done`);
  return final;
}
