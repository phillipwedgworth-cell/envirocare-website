import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cleanEnv } from "@/lib/cleanEnv";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function GET() {
  try {
    const supabase = createClient(
      cleanEnv(process.env.SUPABASE_URL),
      process.env.SUPABASE_KEY!
    );

    // Latest agent runs
    const { data: runs } = await supabase
      .from("agent_runs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(7);

    // Latest findings from all agents
    const { data: findings } = await supabase
      .from("agent_findings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    // Latest discussions (multi-model panel output)
    const { data: discussions } = await supabase
      .from("agent_discussions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    // Current agent state (scores, deltas)
    const { data: state } = await supabase
      .from("agent_state")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(10);

    return NextResponse.json({
      ok: true,
      asOf: new Date().toISOString(),
      runs: runs ?? [],
      findings: findings ?? [],
      discussions: discussions ?? [],
      state: state ?? [],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
