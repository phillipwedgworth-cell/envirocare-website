import { NextRequest, NextResponse } from "next/server";
import { skipIfDuplicateProject } from "@/lib/cron-guard";

// Placeholder ceiling until the promoter agent is wired in; keep in line
// with the other agent run routes when the real implementation lands.
export const maxDuration = 60;

async function execute(req: NextRequest) {
  const duplicate = skipIfDuplicateProject("promoter"); // see lib/cron-guard.ts
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
    // The promoter agent isn't implemented yet — this stub keeps the
    // scheduled cron green instead of 404ing until it lands.
    return NextResponse.json({
      ok: true,
      output: { skipped: true, reason: "promoter agent not yet implemented" },
    });
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
