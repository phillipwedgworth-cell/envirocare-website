// lib/api-auth.ts
//
// One fail-closed gate for every internal API route (patch 0021, 2026-11-08).
//
// WHY: the Nov 8 Sunday audit (R5) found production routes that ran paid agents
// or changed data with no auth at all (cfo/run, proposer/run, style-critic/run,
// ads approve/feedback/draft, three diagnostics), and six cron routes that
// FAILED OPEN — `if (secret && …)` lets every request through when CRON_SECRET
// is unset. A missing env var must mean "nobody gets in", never "everybody does".
//
// Two keys, both read through cleanEnv (BOM / zero-width safe):
//   CRON_SECRET        — machine callers. Vercel Cron sends
//                        `Authorization: Bearer <CRON_SECRET>` automatically.
//   COMMAND_CENTER_KEY — the human admin gate already used by /command-center,
//                        /api/social-approve and /api/agents/pagespeed.
// Keys travel in headers, never the query string, so they stay out of logs.

import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { cleanEnv } from "@/lib/env-url";

function safeEqual(got: string, expected: string): boolean {
  if (!got || !expected) return false;
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function bearer(req: Request): string {
  return (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
}

/** True only when CRON_SECRET is set AND the request carries it as a Bearer token. */
export function hasCronSecret(req: Request): boolean {
  return safeEqual(bearer(req), cleanEnv("CRON_SECRET"));
}

/** True only when COMMAND_CENTER_KEY is set AND the request carries it (x-admin-key header or Bearer). */
export function hasAdminKey(req: Request): boolean {
  const expected = cleanEnv("COMMAND_CENTER_KEY");
  const got = (req.headers.get("x-admin-key") ?? "").trim() || bearer(req);
  return safeEqual(got, expected);
}

const unauthorized = () => NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

/** Machine routes: returns a 401 response unless the CRON_SECRET matches; null means "go ahead". */
export function requireCron(req: Request): NextResponse | null {
  return hasCronSecret(req) ? null : unauthorized();
}

/** Admin routes: CRON_SECRET (machines) or COMMAND_CENTER_KEY (a human in the review UI). */
export function requireAdmin(req: Request): NextResponse | null {
  return hasCronSecret(req) || hasAdminKey(req) ? null : unauthorized();
}
