import { NextRequest, NextResponse } from "next/server";
import { runWatchdog } from "@/agents/lib/watchdog.mjs";

// A single canary call + one Supabase read. 60s is ample.
export const maxDuration = 60;

async function execute(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const output = await runWatchdog({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_KEY,
      alertEmail: process.env.ALERT_EMAIL,
      resendApiKey: process.env.RESEND_API_KEY,
      fromEmail: process.env.NOTIFY_FROM,
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    });
    // ok:false when the canary caught a fleet-wide failure — surface it as 200
    // so the cron run isn't flagged as a transport error; the body carries truth.
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
