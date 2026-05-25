// agents/supabase-inspector.mjs
// Reads the latest agent_findings and envirocare_seo snapshots from Supabase
// Summarizes what the current pipeline and SEO data show

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { supabase } from "./lib/supabase.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function getLatestFindings() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("agent_findings")
    .select("id, agent_name, category, severity, finding, run_date")
    .order("run_date", { ascending: false })
    .limit(50);
  if (error) {
    console.error(`[supabase-inspector] agent_findings query failed: ${error.message}`);
    return null;
  }
  return data ?? [];
}

async function getLatestSeoData() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("envirocare_seo")
    .select("location, solv, arp, snapshot_date")
    .order("snapshot_date", { ascending: false })
    .limit(12);
  if (error) {
    console.error(`[supabase-inspector] envirocare_seo query failed: ${error.message}`);
    return null;
  }
  return data ?? [];
}

function buildSummaryPrompt(findings, seoData, feedback = null) {
  const findingLines = findings.length
    ? findings.slice(0, 12).map(f => `- [${f.agent_name}/${f.category}/${f.severity}] ${f.finding}`).join("\n")
    : "No recent Supabase findings available.";

  const agentCounts = findings.reduce((counts, f) => {
    counts[f.agent_name] = (counts[f.agent_name] || 0) + 1;
    counts[`${f.agent_name}:${f.category}`] = (counts[`${f.agent_name}:${f.category}`] || 0) + 1;
    return counts;
  }, {});

  const topAgents = Object.entries(agentCounts)
    .filter(([k]) => !k.includes(":"))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => `${name}: ${count}`)
    .join(", ");

  const seoLines = seoData.length
    ? seoData.map(row => `${row.location}: SoLV ${row.solv ?? "?"}% ARP ${row.arp ?? "?"}`).join("\n")
    : "No recent envirocare_seo snapshots available.";

  return `You are a data-savvy operations analyst for EnviroCare Pest & Termite Services.

Use the latest Supabase content from agent_findings and envirocare_seo to produce a brief, actionable summary.

AGENT FINDINGS TOP LINES:
${findingLines}

AGENT COUNTS:
${topAgents || "none"}

SEO SNAPSHOTS:
${seoLines}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK:\n${feedback}` : ""}

STRICT FORMAT:
- Start immediately with "• " on the first line.
- Write 5-7 bullets.
- First bullet must call out whether Supabase is connected and whether recent data is present.
- Mention the most frequent finding sources and any urgent content or competitor trends.
- If envirocare_seo data exists, include one bullet summarizing the best or worst location.
- Under 180 words. No title, no sign-off, no extra sections.
`;
}

export async function run() {
  console.log("[supabase-inspector] Starting");

  if (!supabase) {
    const noConn = "• Supabase is not configured locally; set SUPABASE_URL and SUPABASE_KEY so the inspector can read agent_findings and envirocare_seo.";
    console.log("[supabase-inspector] No Supabase client available");
    return noConn;
  }

  const [findings, seoData] = await Promise.all([getLatestFindings(), getLatestSeoData()]);
  if (!findings?.length && !seoData?.length) {
    const noData = "• Supabase connection is live, but no recent agent_findings or envirocare_seo rows were returned. Verify the tables have data and the correct project is connected.";
    console.log("[supabase-inspector] No recent Supabase data");
    return noData;
  }

  const prompt = buildSummaryPrompt(findings || [], seoData || []);
  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 420,
    messages: [{ role: "user", content: prompt }],
  });

  const draft = msg.content.find(b => b.type === "text")?.text ?? "• Supabase inspector could not generate a summary.";

  const final = await criticLoop({
    workerName: "supabase-inspector",
    task: "Summarize the latest Supabase agent findings and envirocare_seo snapshots for EnviroCare.",
    output: draft,
    rubric: `
- Starts with "• " exactly on the first line
- Includes whether Supabase is connected and whether recent data exists
- Mentions at least one finding source and one SEO location if data exists
- No title, no sign-off, no extra sections
- Under 180 words
`,
    revise: (feedback) => {
      const promptWithFeedback = prompt + "\nPREVIOUS REVIEW FEEDBACK:\n" + feedback;
      return anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 420,
        messages: [{ role: "user", content: promptWithFeedback }],
      }).then(r => r.content.find(b => b.type === "text")?.text ?? draft);
    },
    onEscalate: async () => console.warn("[supabase-inspector] Critic maxed out"),
  });

  console.log("[supabase-inspector] Done");
  return final;
}
