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
//
// 2026-07-19 REWRITE (why): the old version read three HARD-CODED report keys
// (one frozen scan per location). Local Falcon mints a NEW report_key on every
// scan, so those keys pointed at stale one-time snapshots — the agent reported
// the SAME SoLV every week and could never see new data. Worse, it only ever
// looked at ONE blended number per location vs a low target, so per-keyword /
// per-area dead zones (e.g. "pest control mountain brook" sitting at ~1% inside
// the Birmingham campaign) were structurally invisible and it perpetually said
// "on target" = zero catches. This version reads the LIVE scan list, computes
// per-keyword SoLV from the most recent run of each campaign keyword, and flags
// any keyword at/near 0% as a dead zone regardless of the blended average.

import { criticLoop, criticDraft } from "./lib/critic.mjs";
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
const PROMPT_VERSION = "2026-07-19";

const LF_KEY = process.env.LOCAL_FALCON_API_KEY;
const LF_API = "https://api.localfalcon.com/v1";

// A keyword scan at or below this SoLV % is a "dead zone" — EnviroCare is
// effectively invisible for that search in that area. Flagged as critical
// regardless of the location's blended target, because a 0% keyword hidden
// inside a healthy blended average is exactly what the old agent missed.
const DEAD_ZONE_SOLV = 5;
// Below this (but above dead-zone) a keyword is "weak" — worth surfacing.
const WEAK_SOLV = 20;
// How far back to look for scans. Campaigns run weekly, so 14d guarantees at
// least one run of every campaign keyword even if a run slips a day.
const LOOKBACK_DAYS = 14;

// No more per-location reportKey — we read whatever the campaigns produced.
const LOCATIONS = [
  { name: "Alabaster", placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY", target: 65 },
  { name: "Alex City", placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c", target: 50 },
  { name: "Huntsville", placeId: "ChIJd4YXKCRmqmIR1DmDoEcGohU", target: 35 },
];

let anthropic = null;
let anthropicInitError = null;
if (!process.env.ANTHROPIC_API_KEY) {
  anthropicInitError = "ANTHROPIC_API_KEY is not set in this environment";
} else {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0 });
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

const fmtDate = (d) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// ---------- Data layer (reads LIVE scans, not frozen keys) ----------

// Pull recent scan reports, optionally filtered to one Place ID. The list
// endpoint returns one row per keyword-scan with its own SoLV — that per-keyword
// granularity is what lets us catch dead zones. Response shape (confirmed via the
// Local Falcon MCP, which wraps this same REST API):
//   { reports: [{ report_key, date, keyword, location:{name}, place_id,
//                 solv, arp, atrp, grid_size, radius, platform }], total, next_token }
async function fetchRecentReports({ placeId = null, days = LOOKBACK_DAYS } = {}) {
  const today = new Date();
  const start = new Date(today.getTime() - days * 86400000);
  const params = { start_date: fmtDate(start), end_date: fmtDate(today) };
  // Prefer maps (google) rankings for the SoLV brief; AI platforms are a
  // separate concern handled by aeo-watch. If the API ignores these params we
  // filter client-side below anyway.
  if (placeId) params.place_id = placeId;
  const json = await lfFetch("reports", params);
  let reports = json?.reports ?? json?.data?.reports ?? [];
  // Client-side guards in case the REST filters aren't honored.
  if (placeId) reports = reports.filter((r) => (r.place_id ?? r.location?.place_id) === placeId);
  // google/maps only — an AI-platform 0% is not a maps dead zone.
  reports = reports.filter((r) => !r.platform || r.platform === "google");
  return reports;
}

// Keep only the most recent scan per keyword (list is newest-first; dedupe by
// keyword). Returns [{ keyword, solv, grid_size, date, report_key }].
function latestPerKeyword(reports) {
  const seen = new Map();
  for (const r of reports) {
    const kw = (r.keyword ?? "").trim().toLowerCase();
    if (!kw || seen.has(kw)) continue;
    seen.set(kw, {
      keyword: r.keyword,
      solv: num(r.solv ?? r.summary?.solv),
      grid_size: r.grid_size ?? null,
      date: r.date ?? r.created_at ?? null,
      report_key: r.report_key ?? null,
    });
  }
  return [...seen.values()];
}

// Compute a location's live picture: blended SoLV (avg of latest per-keyword),
// the worst keywords, the best keyword, and any dead zones.
async function computeLocation(location_name) {
  const loc = findLocation(location_name);
  if (!loc) return { error: `Unknown location: ${location_name}` };

  let reports;
  try {
    reports = await fetchRecentReports({ placeId: loc.placeId });
  } catch (e) {
    return { location: loc.name, error: `Local Falcon fetch failed: ${e.message}` };
  }

  const kws = latestPerKeyword(reports).filter((k) => k.solv !== null);
  if (kws.length === 0) {
    return {
      location: loc.name,
      target: loc.target,
      blended_solv: null,
      keyword_count: 0,
      note: "No Google-Maps scans found in the last 14 days — is the weekly campaign running for this location?",
    };
  }

  const blended = Math.round((kws.reduce((s, k) => s + k.solv, 0) / kws.length) * 100) / 100;
  const sorted = [...kws].sort((a, b) => a.solv - b.solv);
  const deadZones = sorted.filter((k) => k.solv <= DEAD_ZONE_SOLV);
  const weak = sorted.filter((k) => k.solv > DEAD_ZONE_SOLV && k.solv < WEAK_SOLV);

  return {
    location: loc.name,
    target: loc.target,
    blended_solv: blended,
    below_target: blended < loc.target,
    keyword_count: kws.length,
    latest_date: kws[0]?.date ?? null,
    best: sorted[sorted.length - 1],
    worst: sorted.slice(0, 3),
    dead_zones: deadZones.map((k) => ({ keyword: k.keyword, solv: k.solv })),
    weak: weak.map((k) => ({ keyword: k.keyword, solv: k.solv })),
  };
}

// The main tool: compute the live picture, WRITE all findings + state, and
// return the summary. Doing the writes here (not leaving them to the Haiku
// worker) guarantees findings land even if the worker skips a step.
async function analyzeLocation({ location_name }) {
  const summary = await computeLocation(location_name);
  if (summary.error || summary.blended_solv === null) {
    // Still surface "no data" as a finding so a silent campaign failure is visible.
    if (summary.note) {
      await writeFinding(AGENT_NAME, "seo", "warning", null,
        `${summary.location}: ${summary.note}`, { location: summary.location });
    }
    return summary;
  }

  // Week-over-week delta from stored blended SoLV.
  const prior = await stateGet(`${AGENT_NAME}:solv:${location_name}`);
  const priorSolv = prior?.solv ?? null;
  const delta = priorSolv === null ? null : Math.round((summary.blended_solv - priorSolv) * 100) / 100;
  await stateSet(`${AGENT_NAME}:solv:${location_name}`, {
    solv: summary.blended_solv,
    date: new Date().toISOString(),
  });

  // Per-location blended finding (warning if below target).
  await writeFinding(
    AGENT_NAME, "seo",
    summary.below_target ? "warning" : "info",
    null,
    `${summary.location} blended SoLV ${summary.blended_solv}% (target ${summary.target}%, ${summary.keyword_count} keywords)${delta === null ? "" : `, ${delta >= 0 ? "+" : ""}${delta} w/w`}`,
    { location: summary.location, solv: summary.blended_solv, target: summary.target, below_target: summary.below_target, delta },
  );

  // One CRITICAL finding per dead-zone keyword — this is the thing the old
  // agent could never emit.
  for (const dz of summary.dead_zones) {
    await writeFinding(
      AGENT_NAME, "seo", "critical", null,
      `DEAD ZONE — ${summary.location}: "${dz.keyword}" at ${dz.solv}% SoLV (effectively invisible)`,
      { location: summary.location, keyword: dz.keyword, solv: dz.solv, kind: "dead_zone" },
    );
  }

  return { ...summary, prior_solv: priorSolv, delta };
}

async function getLastWeekSolv({ location_name }) {
  const prior = await stateGet(`${AGENT_NAME}:solv:${location_name}`);
  return prior ?? { solv: null, date: null };
}

async function readPeerFindings({ agents = ["brightlocal", "site-reviewer"], hoursBack = 168 }) {
  const findings = await readFindings(agents, hoursBack);
  const discussions = await readDiscussions(agents, hoursBack);
  return { findings: findings.slice(0, 20), discussions: discussions.slice(0, 20) };
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
    description: "List all 3 EnviroCare locations with their blended-SoLV targets.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "analyze_location",
    description:
      "Pull the LIVE last-14-day Google-Maps scans for one location, compute blended SoLV, best/worst keywords, and dead zones (keywords at/near 0%). This also records the finding(s) and the week-over-week baseline. Call once per location. Returns blended_solv, delta, worst[], dead_zones[], weak[], best.",
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
    description: "Read the prior week's recorded blended SoLV % for a location (from agent_state). Call BEFORE analyze_location if you want the pre-update baseline.",
    input_schema: {
      type: "object",
      properties: { location_name: { type: "string" } },
      required: ["location_name"],
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
      "Post a cross-agent discussion entry with impact/effort scoring (1-10). Use to elevate compounding signals (e.g. dead zone + citations low on the same location).",
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
    case "analyze_location":
      return await analyzeLocation(input);
    case "get_last_week_solv":
      return await getLastWeekSolv(input);
    case "read_peer_findings":
      return await readPeerFindings(input);
    case "post_discussion":
      return await postDiscussion(input);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ---------- Worker ----------

const WORKER_SYSTEM = `You are the Local Falcon SEO analyst for EnviroCare Pest Control (Alabama, 3 locations: Alabaster, Alex City, Huntsville). Blended-SoLV targets are Alabaster 65%, Alex City 50%, Huntsville 35%.

YOUR JOB
Produce the weekly Monday SoLV brief. A single blended number "on target" is NOT good enough — your most valuable output is finding DEAD ZONES: individual keywords/areas where EnviroCare is at or near 0% even when the average looks fine.

APPROACH (you choose order, skip if irrelevant)
1. read_peer_findings to see what BrightLocal / site-reviewer flagged this week.
2. analyze_location for EACH of the 3 locations. This returns blended SoLV, the week-over-week delta, the 3 worst keywords, and any dead_zones/weak keywords. It also records the findings — you do not need a separate record step.
3. If a location has dead zones AND brightlocal flagged it for citations on the same location, post_discussion linking the two (impact 8+, effort 3-5).
4. Self-check: does your draft name the specific weak/dead keywords (not just the blended average)? If it only cites blended numbers, go back and pull the worst[] and dead_zones[] into the brief.
5. Emit the final brief.

FINAL BRIEF FORMAT
5-8 bullets. Lead with dead zones (name the keyword, the location, and the SoLV %). Then blended SoLV per location with week-over-week delta. Flag URGENT for any location whose blended SoLV is at or near 0%. End with the single highest-value action. No preamble, no sign-off.

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
- Dead zones lead the brief: any keyword at/near 0% SoLV named with its location and % (or an explicit "no dead zones found this week")
- Each location named with its current blended SoLV % (or "no data" if missing)
- Week-over-week delta for each location (or "no prior data" if first run)
- Any location flagged URGENT if blended SoLV at or near 0%
- At least one concrete next action tied to a specific location + keyword/area
- No vague phrases ("monitor", "continue efforts") without numbers
- Under 220 words, no preamble, no sign-off`;

  const final = criticDraft(await criticLoop({
    workerName: AGENT_NAME,
    task: "Weekly Local Falcon SoLV brief for EnviroCare's 3 Alabama locations",
    output: draft,
    rubric,
    revise: (fb) => workerDraft(fb),
    onEscalate: async (output) => {
      console.warn(`[${AGENT_NAME}] critic escalated — returning best draft`);
      await logAgentRun(AGENT_NAME, "escalated", output);
    },
  }));

  await logAgentRun(AGENT_NAME, "ok", final);
  console.log(`[${AGENT_NAME}] Done`);
  return final;
}
