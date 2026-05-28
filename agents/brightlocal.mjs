// agents/brightlocal.mjs
// BrightLocal citation-score agent for EnviroCare (Alabama, 3 locations).
//
// Pattern:
//   1. Worker (Haiku, tool-use) decides what to fetch and produces a draft brief.
//   2. Critic loop (Opus, from ./lib/critic.mjs) holds the draft to the team rubric.
//   3. Each current citation score is persisted via writeFinding so the rest of
//      the framework (orchestrator, advisors) can read it.
//   4. Week-over-week deltas come from stateGet/stateSet keyed by location.

import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import { writeFinding, logAgentRun } from "./lib/supabase.mjs";

const AGENT_NAME = "brightlocal";
const WORKER_MODEL = "claude-haiku-4-5-20251001";
const MAX_TURNS = 12;

const BL_KEY = process.env.BRIGHTLOCAL_API_KEY;
const BL_API = "https://api.brightlocal.com/v4";

const LOCATIONS = [
  { name: "Alabaster", id: 4068335, target: 85 },
  { name: "Huntsville", id: 4068730, target: 85 },
  { name: "Alex City", id: 4068729, target: 85 },
];

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } catch (e) {
    console.error(`[${AGENT_NAME}] failed to import @anthropic-ai/sdk: ${e.message}`);
  }
}

// ---------- BrightLocal API ----------

async function blFetch(endpoint, params = {}) {
  if (!BL_KEY) throw new Error("BRIGHTLOCAL_API_KEY is not set");
  const url = new URL(`${BL_API}/${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url, { headers: { "api-key": BL_KEY } });
  if (!r.ok) throw new Error(`BL ${endpoint}: ${r.status}`);
  return r.json();
}

function findLocation(name) {
  return LOCATIONS.find((l) => l.name === name);
}

// ---------- Tool implementations (called by the worker) ----------

async function getCitationScore({ location_name }) {
  const loc = findLocation(location_name);
  if (!loc) return { error: `Unknown location: ${location_name}` };
  try {
    const report = await blFetch("ct/reports", { "location-id": loc.id });
    const r = report?.results || report?.data || report;
    const score = r?.overall_score ?? r?.score ?? r?.citation_score ?? null;
    return { location: loc.name, score, target: loc.target };
  } catch (err) {
    return { error: err.message };
  }
}

async function getReputationSummary({ location_name }) {
  const loc = findLocation(location_name);
  if (!loc) return { error: `Unknown location: ${location_name}` };
  try {
    const r = await blFetch("rm/reports", { "location-id": loc.id });
    return { location: loc.name, data: r };
  } catch (err) {
    return { error: err.message };
  }
}

async function getLastWeekScore({ location_name }) {
  const prior = await stateGet(`${AGENT_NAME}:score:${location_name}`);
  return prior ?? { score: null, date: null };
}

async function recordScore({ location_name, score }) {
  const loc = findLocation(location_name);
  if (!loc) return { error: `Unknown location: ${location_name}` };
  await stateSet(`${AGENT_NAME}:score:${location_name}`, {
    score,
    date: new Date().toISOString(),
  });
  const belowTarget = score !== null && score < loc.target;
  await writeFinding(
    AGENT_NAME,
    "seo",
    belowTarget ? "warning" : "info",
    null,
    `${loc.name} citation score: ${score}/100 (target ${loc.target})`,
    { location: loc.name, score, target: loc.target, below_target: belowTarget },
  );
  return { ok: true };
}

// ---------- Tool schema seen by the worker ----------

const tools = [
  {
    name: "list_locations",
    description: "List all 3 EnviroCare locations and their citation-score targets.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "get_citation_score",
    description: "Pull the current BrightLocal citation score (out of 100) for one location.",
    input_schema: {
      type: "object",
      properties: {
        location_name: { type: "string", enum: ["Alabaster", "Huntsville", "Alex City"] },
      },
      required: ["location_name"],
    },
  },
  {
    name: "get_reputation_summary",
    description:
      "Pull BrightLocal Reputation Manager data (reviews, rating) for one location. Use only when a score is anomalous or near target — costs an API call.",
    input_schema: {
      type: "object",
      properties: {
        location_name: { type: "string", enum: ["Alabaster", "Huntsville", "Alex City"] },
      },
      required: ["location_name"],
    },
  },
  {
    name: "get_last_week_score",
    description: "Read the prior week's recorded citation score for a location (from agent_state).",
    input_schema: {
      type: "object",
      properties: { location_name: { type: "string" } },
      required: ["location_name"],
    },
  },
  {
    name: "record_score",
    description:
      "Persist the current citation score for a location. Writes to agent_state (for next week's delta) and agent_findings (for the framework). Call once per location after fetching.",
    input_schema: {
      type: "object",
      properties: {
        location_name: { type: "string" },
        score: { type: "number" },
      },
      required: ["location_name", "score"],
    },
  },
];

async function callTool(name, input) {
  switch (name) {
    case "list_locations":
      return { locations: LOCATIONS };
    case "get_citation_score":
      return await getCitationScore(input);
    case "get_reputation_summary":
      return await getReputationSummary(input);
    case "get_last_week_score":
      return await getLastWeekScore(input);
    case "record_score":
      return await recordScore(input);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ---------- Worker (tool-use loop) ----------

const WORKER_SYSTEM = `You are the BrightLocal citation analyst for EnviroCare Pest Control (Alabama, 3 locations: Alabaster, Huntsville, Alex City). All three target a citation score of 85/100.

Your job: write the weekly Monday citation brief.

Approach (you choose order, skip steps if irrelevant):
1. Read the last week's score for each location (get_last_week_score).
2. Pull the current citation score for each location (get_citation_score).
3. Record each current score via record_score so the rest of the system can see it.
4. If any score is anomalous (big delta vs last week, near target, below 85), pull reputation data BEFORE writing.
5. Self-check before emitting: is the draft specific (numbers, deltas, named locations) or vague? If vague, gather more data first.
6. Emit the final brief.

Final brief format: 5-7 bullets. Lead with the biggest movers. Every bullet has a specific number and a delta vs last week (or "no prior data" if first run). Flag any score < 85 as BELOW TARGET with the gap to target. No preamble, no sign-off.`;

async function workerDraft(feedback = null) {
  if (!anthropic) throw new Error("ANTHROPIC_API_KEY is not set");

  const initialUser = feedback
    ? `Run the weekly Monday citation brief again, addressing this critic feedback before emitting:\n\n${feedback}`
    : "Run the weekly Monday citation brief.";

  const messages = [{ role: "user", content: initialUser }];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const resp = await anthropic.messages.create({
      model: WORKER_MODEL,
      max_tokens: 1500,
      system: WORKER_SYSTEM,
      tools,
      messages,
    });

    messages.push({ role: "assistant", content: resp.content });

    if (resp.stop_reason === "end_turn") {
      const text = resp.content.find((b) => b.type === "text")?.text?.trim() ?? "";
      return text;
    }

    if (resp.stop_reason !== "tool_use") return "";

    const toolResults = [];
    for (const block of resp.content) {
      if (block.type !== "tool_use") continue;
      console.log(`[${AGENT_NAME}] -> ${block.name}`, block.input);
      const result = await callTool(block.name, block.input);
      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: JSON.stringify(result),
      });
    }
    messages.push({ role: "user", content: toolResults });
  }

  return "";
}

// ---------- Entry point ----------

export async function run() {
  console.log(`[${AGENT_NAME}] Starting`);

  let draft;
  try {
    draft = await workerDraft();
  } catch (err) {
    console.error(`[${AGENT_NAME}] worker failed: ${err.message}`);
    await logAgentRun(AGENT_NAME, "error", err.message);
    throw err;
  }

  const rubric = `
- Each location named explicitly with its current citation score out of 100
- Week-over-week delta for each location (or "no prior data" if first run)
- Any score < 85 explicitly flagged as BELOW TARGET with gap to target
- At least one concrete next action tied to a specific location and citation gap
- No vague phrases ("improve citations", "monitor closely") without numbers
- Under 200 words, no preamble, no sign-off`;

  const final = await criticLoop({
    workerName: AGENT_NAME,
    task: "Weekly BrightLocal citation brief for EnviroCare's 3 Alabama locations",
    output: draft,
    rubric,
    revise: (feedback) => workerDraft(feedback),
    onEscalate: async (output) => {
      console.warn(`[${AGENT_NAME}] critic escalated — returning best draft`);
      await logAgentRun(AGENT_NAME, "escalated", output);
    },
  });

  await logAgentRun(AGENT_NAME, "ok", final);
  console.log(`[${AGENT_NAME}] Done`);
  return final;
}
