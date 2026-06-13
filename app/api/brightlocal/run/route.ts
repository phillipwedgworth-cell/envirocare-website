// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/api/brightlocal/run/route.ts
// Commit: chore(crons): scheduled 4x/day (NAP watch) + CRON_SECRET auth
// Push: main
// ─────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { run as runBrightLocalAgent } from "@/agents/brightlocal.mjs";

async function execute(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
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
