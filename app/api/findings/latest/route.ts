import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { cleanEnv } from "@/lib/env-url";

export const runtime = "nodejs";
export const maxDuration = 15;

// Internal agent runs/findings. Was publicly readable (found 2026-09-24).
// Requires `Authorization: Bearer <FINDINGS_READ_KEY>`; fails closed when the
// env var is unset. Header, not query string, so the key stays out of logs.
function authorized(req: Request): boolean {
  const expected = cleanEnv("FINDINGS_READ_KEY");
  const got = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!expected || !got) return false;
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
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
    console.error("[findings/latest]", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "internal error" }, { status: 500 });
  }
}
