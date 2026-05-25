// agents/brightlocal.mjs
// Worker: pulls BrightLocal Citation Tracker scores, writes weekly citation brief
// Critic: checks brief for specific numbers, flags below 85/100, no vague language

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const BL_KEY = process.env.BRIGHTLOCAL_API_KEY;
const BL_API = "https://api.brightlocal.com/v4";

const LOCATIONS = [
  { name: "Alabaster",  id: 4068335, target_score: 85 },
  { name: "Huntsville", id: 4068730, target_score: 85 },
  { name: "Alex City",  id: 4068729, target_score: 85 },
];

async function blFetch(endpoint, params = {}) {
  const url = new URL(`${BL_API}/${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url, { headers: { "api-key": BL_KEY } });
  if (!r.ok) throw new Error(`BL ${endpoint}: ${r.status}`);
  return r.json();
}

async function pullData() {
  const results = [];
  for (const loc of LOCATIONS) {
    let score = null;
    try {
      const report = await blFetch("ct/reports", { "location-id": loc.id });
      const r = report?.results || report?.data || report;
      score = r?.overall_score ?? r?.score ?? r?.citation_score ?? null;
    } catch (err) {
      console.error(`[brightlocal] ${loc.name} fetch failed: ${err.message}`);
    }
    results.push({ name: loc.name, id: loc.id, score, target: loc.target_score });
  }
  return results;
}

async function writeBrief(data, prevData, feedback = null) {
  const prompt = `You are a local-SEO citation analyst for EnviroCare Pest Control (Alabama, 3 locations).
Write a citation-health brief in 5-7 bullets.

Locations (target 85/100): Alabaster, Huntsville, Alex City
Current data: ${JSON.stringify(data)}
Previous week: ${JSON.stringify(prevData)}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK TO ADDRESS:\n${feedback}` : ""}

STRICT FORMAT: Start IMMEDIATELY with "• " on the first line — no title, no intro, no sign-off.
Write EXACTLY 3 bullets — one for Alabaster, one for Huntsville, one for Alex City. NO "All Locations" bullet. NO summary bullet.
Each bullet: location name — score (or "unavailable") — one specific next step.
Hard limit: 100 words total. Each bullet max 30 words.`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text || "";
}

export async function run() {
  console.log("[brightlocal] Starting");

  const currentData = await pullData();
  const prevData = await stateGet("brightlocal:last-run") || [];

  let draft = await writeBrief(currentData, prevData);

  const final = await criticLoop({
    workerName: "brightlocal",
    task: "Write a weekly citation-health brief for EnviroCare with specific citation scores, week-over-week deltas, and flags for any location below 85/100",
    output: draft,
    rubric: `
- If citation data available: score per location, deltas, BELOW TARGET flags
- If no data: states data unavailable per location with actionable next step — PASS this
- First character is "•" or "–" — no title, no intro sentence
- Under 150 words
- No sign-off`,
    revise: (feedback) => writeBrief(currentData, prevData, feedback),
    onEscalate: async (output, history) => {
      console.warn("[brightlocal] Escalating to human — critic loop maxed out");
    },
  });

  await stateSet("brightlocal:last-run", currentData);
  await stateSet("brightlocal:last-brief", { text: final, date: new Date().toISOString() });

  console.log("[brightlocal] Done");
  return final;
}
