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

import { createHmac, timingSafeEqual } from "node:crypto";
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

// ── Ad-review session (patch 0022, 2026-11-10). Replaces 0021's `?key=` link: a key
// in a URL leaks into browser history, bookmarks, screenshots and access logs. The
// reviewer types COMMAND_CENTER_KEY into the sign-in form on /ads/<id> once
// (app/api/ads/review-login); the httpOnly cookie holds an HMAC of the key, never
// the key itself, so rotating COMMAND_CENTER_KEY signs every browser out. Same
// pattern as the Lead Desk (lib/leads/server.ts). Unset key => no session can match.
export const ADS_COOKIE = "ec_ads_review";
export const ADS_COOKIE_MAX_AGE = 30 * 86_400;
export function adsSessionValue(): string | null {
  const key = cleanEnv("COMMAND_CENTER_KEY");
  return key ? createHmac("sha256", key).update("ads-review-session-v1").digest("hex") : null;
}
export function adsSessionOk(cookieValue: string | null | undefined): boolean {
  return safeEqual(String(cookieValue ?? ""), adsSessionValue() ?? "");
}
function cookieFrom(req: Request, name: string): string {
  for (const part of (req.headers.get("cookie") ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return "";
}
/** True only when the request carries a valid ad-review session cookie. */
export function hasAdsSession(req: Request): boolean {
  return adsSessionOk(cookieFrom(req, ADS_COOKIE));
}
/** Constant-time check of a typed key against COMMAND_CENTER_KEY (sign-in form). */
export function adminKeyMatches(given: string): boolean {
  return safeEqual(given.trim(), cleanEnv("COMMAND_CENTER_KEY"));
}

const unauthorized = () => NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

/** Machine routes: returns a 401 response unless the CRON_SECRET matches; null means "go ahead". */
export function requireCron(req: Request): NextResponse | null {
  return hasCronSecret(req) ? null : unauthorized();
}

/** Admin routes: CRON_SECRET (machines), COMMAND_CENTER_KEY as a header, or a signed-in ad-review session. */
export function requireAdmin(req: Request): NextResponse | null {
  return hasCronSecret(req) || hasAdminKey(req) || hasAdsSession(req) ? null : unauthorized();
}
