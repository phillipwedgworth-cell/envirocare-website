import { NextRequest, NextResponse } from "next/server";
import { run as runSnapshot } from "@/agents/seo-snapshot.mjs";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

// Pulls the 3 Local Falcon CAMPAIGN reports (0 scan credits), upserts per-keyword
// ARP/ATRP/SoLV into seo_metrics, writes a plain-English digest to seo_digests,
// and emails it to the internal inbox. Guarded by CRON_SECRET (Vercel Cron sends
// `Authorization: Bearer <CRON_SECRET>` automatically when that env var is set).
async function execute(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const out = await runSnapshot();
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
