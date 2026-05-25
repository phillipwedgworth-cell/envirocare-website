// agents/seo-monitor.mjs
// Worker: pulls Local Falcon data, writes weekly SEO brief
// Critic: checks brief for accuracy, actionability, correct priorities

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import { supabase } from "./lib/supabase.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const LF_KEY = process.env.LOCAL_FALCON_API_KEY;
const LF_API = "https://api.localfalcon.com/v1";

const LOCATIONS = [
  { name: "Alabaster",  placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY", target_solv: 65 },
  { name: "Alex City",  placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c", target_solv: 50 },
  { name: "Huntsville", placeId: "ChIJd4YXKCRmqmIR1DmDoEcGohU", target_solv: 35 },
  { name: "Auburn",     placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c", target_solv: 55 }, // Alex City GBP scanning Auburn market
];

async function lfFetch(endpoint, params = {}) {
  const url = new URL(`${LF_API}/${endpoint}`);
  url.searchParams.set("api_key", LF_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`LF ${endpoint}: ${r.status}`);
  return r.json();
}

async function pullData() {
  const today = new Date().toLocaleDateString("en-US");
  const weekAgo = new Date(Date.now() - 7 * 86400000).toLocaleDateString("en-US");
  const reports = await lfFetch("scan-reports/list", { start_date: weekAgo, end_date: today });
  return reports?.data?.reports || [];
}

async function writeBrief(data, prevData, feedback = null) {
  const prompt = `You are an SEO analyst for EnviroCare Pest Control (Alabama, 3 locations).
Write a weekly SEO brief in 6-8 bullets. Lead with biggest movers. Flag anything below its SoLV target.

Locations + SoLV targets: Alabaster 65%, Alex City 50%, Huntsville 35%
Current data: ${JSON.stringify(data)}
Previous week: ${JSON.stringify(prevData)}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK TO ADDRESS:\n${feedback}` : ""}

Rules: terse, no preamble, specific numbers only, flag Huntsville as URGENT if SoLV still 0%.`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text || "";
}

export async function run() {
  console.log("[seo-monitor] Starting");

  let currentData = [];
  try {
    currentData = await pullData();
  } catch (err) {
    console.warn("[seo-monitor] LF data fetch failed:", err.message, "— continuing with empty data");
  }
  const prevData = await stateGet("seo:last-run") || [];

  if (!currentData.length) {
    const noDataBrief = "No Local Falcon scan data available this cycle — SoLV figures for Alabaster, Alex City, Auburn, and Huntsville could not be pulled. Action: verify Local Falcon API key in Vercel env vars and confirm weekly scans are scheduled for all 4 locations.";
    await stateSet("seo:last-brief", { text: noDataBrief, date: new Date().toISOString() });
    console.log("[seo-monitor] No data — returning canned brief");
    return noDataBrief;
  }

  let draft = await writeBrief(currentData, prevData);

  const final = await criticLoop({
    workerName: "seo-monitor",
    task: "Write a weekly SEO brief for EnviroCare with specific ranking deltas and actionable priorities",
    output: draft,
    rubric: `
- If scan data available: specific SoLV % for each location, flags below-target, Huntsville URGENT if 0%
- If no scan data: clearly states data unavailable (1-2 sentences) and identifies the gap — pass this
- At least one actionable recommendation (or data-gap recommendation)
- Under 200 words
- No preamble, headers, or sign-off`,
    revise: (feedback) => writeBrief(currentData, prevData, feedback),
    onEscalate: async (output, history) => {
      console.warn("[seo-monitor] Escalating to human — critic loop maxed out");
    },
  });

  await stateSet("seo:last-run", currentData);
  await stateSet("seo:last-brief", { text: final, date: new Date().toISOString() });

  if (supabase) {
    const today = new Date().toISOString().split("T")[0];
    const rows = LOCATIONS.map(loc => {
      const report = (currentData ?? []).find(
        r => r.place_id === loc.placeId || r.location?.place_id === loc.placeId
      );
      return {
        location:      loc.name,
        keyword:       report?.search_keyword ?? report?.keyword ?? null,
        solv:          report?.solv_percentage ?? report?.atop ?? report?.solv ?? null,
        arp:           report?.arp ?? report?.average_rank ?? null,
        review_count:  report?.review_count ?? null,
        snapshot_date: today,
      };
    });
    const { error } = await supabase.from("envirocare_seo").insert(rows);
    if (error) console.error("[seo-monitor] Supabase insert error:", error.message);
    else console.log("[seo-monitor] SEO snapshot logged to Supabase");
  }

  console.log("[seo-monitor] Done");
  return final;
}
