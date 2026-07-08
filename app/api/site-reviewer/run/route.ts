import { NextRequest, NextResponse } from "next/server";
import { run as runSiteReviewer } from "@/agents/site-reviewer.mjs";

// The agent self-chunks (N pages per invocation, cursor in Supabase
// agent_state, resumes on the next cron tick) — 300s is a ceiling it plans
// around, not a limit it runs into. Do not raise this.
export const maxDuration = 300;

async function execute(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const output = await runSiteReviewer();
    return NextResponse.json({ ok: true, output });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return execute(req);
}

export async function POST(req: NextRequest) {
  return execute(req);
}
