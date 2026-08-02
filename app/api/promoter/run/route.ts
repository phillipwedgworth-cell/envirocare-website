import { NextRequest, NextResponse } from "next/server";

// Placeholder ceiling until the promoter agent is wired in; keep in line
// with the other agent run routes when the real implementation lands.
export const maxDuration = 60;

async function execute(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
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
