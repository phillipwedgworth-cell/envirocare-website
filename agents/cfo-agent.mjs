// agents/cfo-agent.mjs
// CFO agent foundation for EnviroCare web.

import { supabase } from "../lib/supabase.mjs";
import { getFinancialSnapshot } from "../lib/quickbooks.ts";
import { getFathomReports } from "../lib/google-drive.ts";
import { runFinancialPanel } from "../lib/multi-model.ts";

function ensureSupabase() {
  if (!supabase) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY environment variables");
  }

  return supabase;
}

async function saveSnapshot(snapshot, fathomReports) {
  const db = ensureSupabase();

  const { error } = await db.from("cfo_snapshots").insert({
    snapshot_date: snapshot.snapshot_date,
    source: snapshot.source,
    raw_json: {
      quickbooks: snapshot.raw_json,
      fathom_reports: fathomReports,
    },
    normalized_json: {
      ...snapshot.normalized_json,
      fathom_reports: fathomReports,
    },
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Supabase cfo_snapshots insert failed: ${error.message}`);
  }
}

async function saveBrief({ weekOf, snapshotCount, results }) {
  const db = ensureSupabase();

  const { error } = await db.from("cfo_briefs").insert({
    week_of: weekOf,
    claude_analysis: results.claude.analysis,
    gemini_analysis: results.gemini.analysis,
    gpt_analysis: results.gpt.analysis,
    synthesis: results.synthesis,
    flags: Array.from(new Set([...(results.claude.flags ?? []), ...(results.gemini.flags ?? []), ...(results.gpt.flags ?? [])])),
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
  const snapshot = await getFinancialSnapshot();
  const fathomReports = await getFathomReports();

  await saveSnapshot(snapshot, fathomReports);

  const financialData = [
    snapshot.normalized_json,
    {
      source: "fathom_reports",
      reports: fathomReports,
    },
  ];

  const results = await runFinancialPanel(financialData);
  const weekOf = snapshot.snapshot_date;

  await saveBrief({ weekOf, snapshotCount: 1, results });

  return results;
}
