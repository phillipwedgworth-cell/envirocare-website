import { NextRequest, NextResponse } from "next/server";
import { run as runSocialPoster } from "@/agents/social-poster.mjs";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

// Publishes due social_posts to Facebook / Instagram / Google Business Profile.
// Guarded by CRON_SECRET (Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`
// automatically when that env var is set). Platform clients no-op until their
// tokens exist, so this is safe to schedule immediately.
async function execute(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const out = await runSocialPoster();
    return NextResponse.json({ ok: true, ...out });
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
