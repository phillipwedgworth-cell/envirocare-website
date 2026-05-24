// agents/cfo-agent.mjs
// CFO agent foundation for EnviroCare web.

import Anthropic from "@anthropic-ai/sdk";
import { supabase } from "../lib/supabase.mjs";

const AGENT_NAME = "CFO Agent";
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function formatSnapshot(snapshot, index) {
  const date = new Date(snapshot.snapshot_date ?? snapshot.created_at).toISOString().slice(0, 10);
  const payload = snapshot.normalized_json ?? snapshot.raw_json ?? snapshot.metrics ?? {};
  return `${index + 1}. ${date}: ${JSON.stringify(payload)}`;
}

async function getLatestSnapshots() {
  const { data, error } = await supabase
    .from("cfo_snapshots")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    throw new Error(`Supabase cfo_snapshots query failed: ${error.message}`);
  }

  return data ?? [];
}

function buildPrompt(snapshots, weekOf) {
  const snapshotSummary = snapshots.length
    ? snapshots.map(formatSnapshot).join("\n")
    : "No CFO snapshot data available.";

  return `You are an EnviroCare CFO analyst.

Use the latest cfo_snapshots data to write a concise executive financial brief.

WEEK OF: ${weekOf}

SNAPSHOTS:
${snapshotSummary}

RULES:
- Start the first line with "• ".
- Write exactly 5 short bullets.
- Mention revenue, cash flow, margin, operating risk, and one top recommendation.
- If no snapshot data exists, say exactly that and recommend populating cfo_snapshots.
- Do not include a title, sign-off, or extra sections.
- Stay under 160 words.`;
}

async function saveBrief({ brief, weekOf, snapshotCount }) {
  const { error } = await supabase.from("cfo_briefs").insert({
    week_of: weekOf,
    claude_analysis: brief,
    gemini_analysis: null,
    gpt_analysis: null,
    synthesis: null,
    flags: null,
    google_doc_url: null,
    created_at: new Date().toISOString(),
    source: "cfo-agent",
    snapshot_count: snapshotCount,
  });

  if (error) {
    throw new Error(`Supabase cfo_briefs insert failed: ${error.message}`);
  }
}

export async function run() {
  const snapshots = await getLatestSnapshots();
  const weekOf = snapshots.length
    ? new Date(snapshots[0].snapshot_date ?? snapshots[0].created_at).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const prompt = buildPrompt(snapshots, weekOf);
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 420,
    messages: [{ role: "user", content: prompt }],
  });

  const brief = response.content.find(item => item.type === "text")?.text ?? "• Could not generate CFO brief.";
  await saveBrief({ brief, weekOf, snapshotCount: snapshots.length });

  return brief;
}
