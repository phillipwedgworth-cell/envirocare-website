// lib/cron-guard.ts
//
// Stops Vercel crons from running twice.
//
// WHY: two Vercel projects build this repo. Every push to main produces TWO
// production deployments (GitHub deployment records, 2026-09-24):
//   Production – envirocare-web-only-testing   <- the real site (envirocarellc.com)
//   Production – envirocare-website            <- a second project
// Vercel runs vercel.json crons on every project's production deployment, so each
// cron fired twice. agent_runs shows it: the orchestrator logged 2 rows every day,
// brightlocal ran twice at 09:01, seo-snapshot twice at exactly 14:00. Both copies
// hold API keys, so every scheduled agent was paying for a second run.
//
// The real fix is to delete or disable that second project in the Vercel
// dashboard. This guard makes the duplication harmless in the meantime, and keeps
// it harmless if the project is ever recreated.
//
// FAILS OPEN, deliberately. It skips ONLY when the deployment's own hostname names
// the second project ("envirocare-website-…"). On the real project, on a local
// run, in GitHub Actions, or if the Vercel system variables are not exposed, it
// returns null and the route runs as before. A guard that can never block the real
// site is worth more than a stricter one that might.
//
// Hostnames confirmed 2026-09-25 from GitHub deployment statuses:
//   second:  envirocare-website-2ntqxhgaj-envirocare-50d39ae8.vercel.app
//   primary: envirocare-web-only-testing-7zrlir0m4-envirocare-50d39ae8.vercel.app
// "envirocare-web-only-testing" does not match — the pattern needs "website".

import { NextResponse } from "next/server";

const SECONDARY_PROJECT = /(^|\/\/|\.)envirocare-website[-.]/i;

/** Returns a 200 "skipped" response when running on the duplicate project, else null. */
export function skipIfDuplicateProject(route: string): NextResponse | null {
  const host = [process.env.VERCEL_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
    .filter(Boolean)
    .join(" ");
  if (!host || !SECONDARY_PROJECT.test(host)) return null;
  console.warn(`[cron-guard] ${route}: skipped on duplicate Vercel project (${process.env.VERCEL_URL})`);
  return NextResponse.json(
    { ok: true, skipped: "duplicate Vercel project — this cron runs on envirocare-web-only-testing only" },
    { status: 200 },
  );
}
