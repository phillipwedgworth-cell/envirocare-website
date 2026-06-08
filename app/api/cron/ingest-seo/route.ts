// app/api/cron/ingest-seo/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Weekly Vercel Cron entry point that runs the GSC + GA4 ingests server-side.
// Wire it up in vercel.json (see seo-ingest/README). Protected by CRON_SECRET so
// only Vercel Cron (or you, with the header) can trigger it.
//
// NOTE: the ingest logic lives in agents/ingest-gsc.mjs + agents/ingest-ga4.mjs
// as standalone scripts. The cleanest integration is to export their core as
// functions and import them here. Quickest integration (shown below) shells out
// to the scripts. Pick one — the import approach is preferred for serverless.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  // auth: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};
  try {
    // Preferred: refactor each script to `export async function run()` and import:
    //   const { run: runGsc } = await import("@/agents/ingest-gsc.mjs");
    //   results.gsc = await runGsc();
    //   const { run: runGa4 } = await import("@/agents/ingest-ga4.mjs");
    //   results.ga4 = await runGa4();
    //
    // Until refactored, this route is a placeholder that documents the contract.
    results.note =
      "Refactor ingest-gsc.mjs / ingest-ga4.mjs to export run() and import them here, " +
      "or trigger the .mjs scripts from a GitHub Action instead of Vercel Cron.";
    return NextResponse.json({ ok: true, ranAt: new Date().toISOString(), results });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e), results },
      { status: 500 }
    );
  }
}
