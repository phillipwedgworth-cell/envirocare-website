import { NextRequest, NextResponse } from "next/server";
import { skipIfDuplicateProject } from "@/lib/cron-guard";
import { run as runBrightLocalAgent } from "@/agents/brightlocal.mjs";

async function execute(req: NextRequest) {
  const duplicate = skipIfDuplicateProject("brightlocal"); // see lib/cron-guard.ts
  if (duplicate) return duplicate;
  const secret = process.env.CRON_SECRET;
  // Fail CLOSED: `!secret ||`, not `secret &&`. The old form skipped the check
  // entirely if CRON_SECRET ever went missing, and this route runs an agent and
  // spends API budget on a plain GET. Same pattern as app/api/findings/latest.
  // Do not "simplify" it back.
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const output = await runBrightLocalAgent();
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
