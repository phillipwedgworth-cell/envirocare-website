// agents/oura-health.mjs
// Worker: pulls Oura Ring daily readiness, HRV, sleep, RHR
// Critic: checks brief for specific numbers and actionable recommendation

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const OURA_TOKEN = process.env.OURA_TOKEN;
const OURA_BASE = "https://api.ouraring.com";

async function ouraFetch(endpoint, params = {}) {
  const url = new URL(`${OURA_BASE}${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${OURA_TOKEN}` },
  });
  if (!r.ok) throw new Error(`Oura ${endpoint}: ${r.status}`);
  return r.json();
}

async function pullData() {
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

  const [readiness, sleepData, activity] = await Promise.all([
    ouraFetch("/v2/usercollection/daily_readiness", { start_date: today, end_date: today }),
    ouraFetch("/v2/usercollection/sleep", { start_date: weekAgo, end_date: today }),
    ouraFetch("/v2/usercollection/daily_activity", { start_date: today, end_date: today }),
  ]);

  const todayReadiness = readiness?.data?.[0] ?? null;
  const sessions = sleepData?.data ?? [];
  const todaySessions = sessions.filter(s => s.day === today);
  const mainSleep = todaySessions.length
    ? todaySessions.reduce((a, b) =>
        (a.total_sleep_duration || 0) > (b.total_sleep_duration || 0) ? a : b
      )
    : null;

  const hrvVals = sessions.filter(s => s.average_hrv).map(s => s.average_hrv);
  const hrv7dayAvg = hrvVals.length
    ? Math.round(hrvVals.reduce((a, b) => a + b, 0) / hrvVals.length)
    : null;

  const sleepHours = mainSleep ? (mainSleep.total_sleep_duration / 3600).toFixed(1) : null;
  const currentHRV = mainSleep?.average_hrv ?? null;
  const hrvDeltaPct = (currentHRV && hrv7dayAvg)
    ? Math.round(((currentHRV - hrv7dayAvg) / hrv7dayAvg) * 100)
    : null;

  const sleepDebt = sessions.length
    ? Math.max(0,
        (8 * sessions.length - sessions.reduce((a, s) => a + (s.total_sleep_duration || 0) / 3600, 0))
        / sessions.length
      ).toFixed(1)
    : null;

  return {
    readiness: todayReadiness?.score ?? null,
    hrv: currentHRV,
    hrv7dayAvg,
    hrvDeltaPct,
    sleepHours,
    sleepDebt,
    rhr: mainSleep?.average_heart_rate ?? null,
    activityScore: activity?.data?.[0]?.score ?? null,
    steps: activity?.data?.[0]?.steps ?? null,
  };
}

async function writeBrief(data, feedback = null) {
  const hrvLine = data.hrv && data.hrv7dayAvg
    ? `HRV ${data.hrv}ms (7-day avg ${data.hrv7dayAvg}ms, ${data.hrvDeltaPct > 0 ? "+" : ""}${data.hrvDeltaPct ?? "?"}%)`
    : "HRV unavailable";

  const prompt = `Write a 3-line health brief for Phillip's morning email based on this Oura data:
Readiness: ${data.readiness ?? "N/A"}/100
${hrvLine}
Sleep: ${data.sleepHours ?? "N/A"}h | Sleep debt this week: ${data.sleepDebt ?? "N/A"}h
RHR: ${data.rhr ?? "N/A"}bpm | Activity: ${data.activityScore ?? "N/A"}/100 | Steps: ${data.steps?.toLocaleString() ?? "N/A"}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK:\n${feedback}` : ""}

Write EXACTLY 3 plain lines. No headers, no bullets, no labels.
Line 1: Readiness score as a number (use N/A if missing) + brief HRV note
Line 2: Sleep hours as a number (use N/A if missing) + sleep debt
Line 3: One specific recommendation for today — never vague, never "rest more"

If any metric is N/A, write it as "N/A" inline — do NOT refuse to generate or ask for more data.
Under 60 words total.`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text || "";
}

export async function run() {
  console.log("[oura-health] Starting");

  const data = await pullData();
  console.log(`[oura-health] Readiness=${data.readiness} HRV=${data.hrv}ms Sleep=${data.sleepHours}h`);

  let draft = await writeBrief(data);

  const final = await criticLoop({
    workerName: "oura-health",
    task: "Write a 3-line daily health brief with readiness, HRV, sleep, and one recommendation",
    output: draft,
    rubric: `
- Exactly 3 plain lines (no bullets, no headers, no labels)
- Line 1 contains readiness score as a number OR "N/A" if unavailable
- Line 2 contains sleep hours as a number OR "N/A" if unavailable
- Line 3 is a specific recommendation (not vague)
- Under 60 words
- If any metric shows as N/A that is acceptable — PASS this`,
    revise: (feedback) => writeBrief(data, feedback),
    onEscalate: async (output) => {
      console.warn("[oura-health] Escalating — critic loop maxed out");
    },
  });

  await stateSet("oura:today", { data, brief: final, date: new Date().toISOString() });
  console.log("[oura-health] Done");
  return final;
}
