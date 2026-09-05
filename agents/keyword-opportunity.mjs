// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/keyword-opportunity.mjs
// Commit: feat(agents): keyword-opportunity — striking-distance GSC queries (pos 6–20, by impressions) mapped to target pages; deterministic scoring, one Sonnet plan per run
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * keyword-opportunity — the agent that turns the daily GSC ingest into
 * keyword targets. Nothing did this before (Sep 5 2026): gsc_queries has
 * 12,596 rows across 10 snapshots and no reader.
 *
 * Method (deterministic, then one LLM call):
 *  1. Take the newest snapshot in gsc_queries.
 *  2. Keep non-brand queries at position 6–20 (striking distance) that are
 *     not on the compliance kill list (Tuscaloosa, bed bugs, wildlife, lawn,
 *     crawlspace encapsulation).
 *  3. Score = impressions × (1 - position/25). Top N by score.
 *  4. Map each to a target page by rule (city → /{city}; service → /services/x;
 *     otherwise the blog), using the live city and service slug lists.
 *  5. ONE Sonnet call writes a compact plan per keyword: page, what to add,
 *     why. It is told the compliance locks and forbidden to invent prices.
 *  6. Findings are deduped on the query, so a keyword proposes itself once
 *     until it moves out of the window.
 */
import Anthropic from "@anthropic-ai/sdk";
import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";

const AGENT_NAME = "keyword-opportunity";
const MODEL = process.env.KEYWORD_OPPORTUNITY_MODEL || "claude-sonnet-4-6";
const TOP_N = Number(process.env.KEYWORD_OPPORTUNITY_TOP_N ?? 15);
const POS_MIN = 6, POS_MAX = 20;

const BRAND = /envirocare|enviro care|wedgworth/i;
const KILL = /tuscaloosa|bed ?bug|wildlife|raccoon|squirrel|bat removal|lawn|crawl ?space encap|pet[- ]safe|non[- ]toxic|eco/i;
const CITIES = ["alabaster","birmingham","hoover","homewood","mountain brook","vestavia","trussville","chelsea","greystone","mt laurel","pelham","helena","calera","irondale","leeds","moody","fultondale","huntsville","madison","harvest","hampton cove","athens","decatur","alexander city","alex city","lake martin","dadeville","eclectic","auburn","opelika","sylacauga","jacksons gap"];
const CITY_SLUG = (c) => c.replace("alex city", "alexander-city").replace(/\s+/g, "-");
const SERVICES = [
  [/termite|sentricon|wdo|wood destroying/, "/services/termite-control"],
  [/mosquito/, "/services/mosquito"],
  [/tick|chigger/, "/services/tick-control"],
  [/fire ant/, "/services/fire-ant"],
  [/flea/, "/services/flea-control"],
  [/commercial|restaurant|office pest/, "/services/commercial"],
  [/exterminator|pest control|bug spray/, "/services/pest-control"],
];
const PESTS = /spider|roach|cockroach|ant\b|ants\b|silverfish|cricket|rodent|mouse|mice|rat\b|wasp|hornet|earwig|centipede|millipede|stink bug|lady ?beetle|kudzu/i;

function targetPage(q) {
  const city = CITIES.find((c) => q.includes(c));
  const svc = SERVICES.find(([re]) => re.test(q))?.[1] ?? null;
  if (city && svc && svc !== "/services/pest-control") return { page: `/${CITY_SLUG(city)}`, note: `city page, ${svc.split("/").pop()} section` };
  if (city) return { page: `/${CITY_SLUG(city)}`, note: "city page" };
  if (PESTS.test(q) && /how|get rid|kill|why|what|signs|bite|dangerous|identify/.test(q)) return { page: "/blog", note: "new or expanded blog post" };
  if (svc) return { page: svc, note: "service page" };
  if (PESTS.test(q)) return { page: "/blog", note: "blog post" };
  return { page: "/blog", note: "informational — blog" };
}

async function latestSnapshot() {
  const { data, error } = await supabase.from("gsc_queries").select("snapshot_label,snapshot_date").order("snapshot_date", { ascending: false }).limit(1);
  if (error) throw new Error(`gsc_queries: ${error.message}`);
  return data?.[0] ?? null;
}

async function candidates(snapshot) {
  const { data, error } = await supabase.from("gsc_queries").select("query,clicks,impressions,ctr,position")
    .eq("snapshot_label", snapshot.snapshot_label).gte("position", POS_MIN).lte("position", POS_MAX).order("impressions", { ascending: false }).limit(400);
  if (error) throw new Error(`gsc_queries read: ${error.message}`);
  return (data ?? [])
    .map((r) => ({ ...r, query: String(r.query).toLowerCase().trim() }))
    .filter((r) => r.query && !BRAND.test(r.query) && !KILL.test(r.query) && r.impressions > 0)
    .map((r) => ({ ...r, score: Math.round(r.impressions * (1 - Number(r.position) / 25)), ...targetPage(r.query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_N);
}

async function plan(anthropic, rows, snapshot) {
  const prompt = `You plan on-page SEO work for EnviroCare, a family pest-control company in Alabama (four offices: Alabaster, Birmingham, Huntsville, Alexander City / Lake Martin).
For each keyword below, write ONE line: "<keyword> → <page> — <what to add, concretely>". 15-30 words each. No headings.
Hard rules: never state a price; never use safe/pet-safe/eco-friendly/non-toxic/guarantee/EPA-approved/same-day; never mention competitors, Tuscaloosa, bed bugs, wildlife, or lawn care; mosquito is "reduce", never "eliminate"; termite pricing is quote-only.
Snapshot: ${snapshot.snapshot_label} (${snapshot.snapshot_date}). Position is Google average position; impressions are for the snapshot window.

${rows.map((r) => `- "${r.query}" | pos ${Number(r.position).toFixed(1)} | ${r.impressions} imps | ${r.clicks} clicks | target ${r.page} (${r.note})`).join("\n")}`;
  const res = await createMessage(anthropic, { model: MODEL, max_tokens: 1200, messages: [{ role: "user", content: prompt }] }, { agentName: AGENT_NAME, role: "planner" });
  return res?.content?.map((c) => c.text ?? "").join("").trim();
}

export async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const snapshot = await latestSnapshot();
  if (!snapshot) { await logAgentRun(AGENT_NAME, "skipped", "no gsc_queries snapshot"); return { skipped: true }; }
  const rows = await candidates(snapshot);
  if (!rows.length) { await logAgentRun(AGENT_NAME, "ok", { snapshot, candidates: 0 }); return { candidates: 0 }; }

  let planText = null;
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    planText = await plan(anthropic, rows, snapshot);
  } catch (e) { console.warn(`[${AGENT_NAME}] plan skipped: ${e.message}`); }

  const lines = (planText ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
  for (const r of rows) {
    const line = lines.find((l) => l.toLowerCase().includes(r.query)) ?? `${r.query} → ${r.page} — expand coverage of this intent (${r.note})`;
    await writeFinding(AGENT_NAME, "keyword-opportunity", "info", r.page, line, {
      query: r.query, position: Number(r.position), impressions: r.impressions, clicks: r.clicks, score: r.score, snapshot: snapshot.snapshot_label, model: planText ? MODEL : null,
    });
  }
  const summary = { snapshot: snapshot.snapshot_label, candidates: rows.length, top: rows.slice(0, 5).map((r) => `${r.query} (pos ${Number(r.position).toFixed(1)}, ${r.impressions} imps → ${r.page})`), planned: Boolean(planText) };
  await logAgentRun(AGENT_NAME, "ok", summary);
  console.log(`[${AGENT_NAME}] ${rows.length} opportunities from ${snapshot.snapshot_label}`);
  return summary;
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL`, e); process.exit(1); });
