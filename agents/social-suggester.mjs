// agents/social-suggester.mjs
// Weekly multi-model (Gemini + OpenAI + Claude) review of social + local
// performance → actionable suggestions written to agent_findings (surfaced in the
// Command Center + orchestrator digest). Read-only; runs once a week to stay cheap.

import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { panel } from "./lib/llm-panel.mjs";

const AGENT_NAME = "social-suggester";

export async function run() {
  if (!supabase) {
    await logAgentRun(AGENT_NAME, "skipped", "supabase not configured");
    return { agent: AGENT_NAME, status: "skipped" };
  }

  const since = new Date(Date.now() - 14 * 864e5).toISOString();
  const [{ data: posts }, { data: seo }] = await Promise.all([
    supabase.from("social_posts").select("location,platform,post_type,status,engagement,posted_at")
      .gte("scheduled_for", since).order("scheduled_for", { ascending: false }).limit(200),
    supabase.from("seo_metrics").select("location,keyword,solv,arp,run_date")
      .order("run_date", { ascending: false }).limit(60),
  ]);

  const prompt = [
    "You are a local-marketing strategist for EnviroCare Pest & Termite (3 Alabama offices:",
    "Huntsville, Birmingham/Alabaster, Lake Martin). Budget is limited — favor high-ROI, low-cost moves.",
    "",
    "Recent social/local posts (last 14 days):",
    JSON.stringify(posts || [], null, 0).slice(0, 4000),
    "",
    "Recent Local Falcon SoLV/ARP by location:",
    JSON.stringify(seo || [], null, 0).slice(0, 4000),
    "",
    "Give 3-5 concrete, prioritized recommendations for the coming week: which locations/topics to",
    "post more about, what to cut, and one Google Ads / local-content idea. Be specific and cheap.",
    "End with a one-line verdict: SHIP if we should increase cadence, HOLD if steady, SKIP if pull back.",
  ].join("\n");

  let result;
  try {
    result = await panel(prompt);
  } catch (e) {
    await logAgentRun(AGENT_NAME, "error", e.message);
    return { agent: AGENT_NAME, status: "error", error: e.message };
  }

  const suggestions = (result.votes || [])
    .map((v) => `**${v.source}** (${v.verdict}): ${v.reasoning}`)
    .join("\n\n");
  await writeFinding(AGENT_NAME, "social", "info", null,
    `Weekly social/local suggestions (consensus: ${result.consensus}).`,
    { consensus: result.consensus, tally: result.tally, suggestions, costUSD: result.costEstimateUSD });
  await logAgentRun(AGENT_NAME, "ok", `consensus ${result.consensus}, ~$${(result.costEstimateUSD || 0).toFixed(3)}`);
  return { agent: AGENT_NAME, status: "ok", consensus: result.consensus };
}
