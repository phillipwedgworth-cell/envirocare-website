// POST /api/ads/review-login — the sign-in form on /ads/<id> posts here (patch 0022).
// Body (form): key=<COMMAND_CENTER_KEY> to sign in, or logout=1 to sign out, plus
// returnTo=/ads/<id>. On success it sets an httpOnly cookie holding an HMAC of the
// key (lib/api-auth.ts) and redirects back, so the key never appears in a URL.
// A wrong key redirects back with ?error=1. Mirrors app/api/leads/desk-login.
import { NextResponse } from "next/server";
import { ADS_COOKIE, ADS_COOKIE_MAX_AGE, adminKeyMatches, adsSessionValue } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

// returnTo is restricted to /ads/<id> so this can never become an open redirect.
const SAFE_RETURN = /^\/ads\/[A-Za-z0-9-]{1,64}$/;

export async function POST(request: Request) {
  let form: FormData;
  try { form = await request.formData(); } catch { form = new FormData(); }
  const ret = String(form.get("returnTo") ?? "");
  const path = SAFE_RETURN.test(ret) ? ret : "/";
  const back = (q = "") => NextResponse.redirect(new URL(`${path}${q}`, request.url), 303);
  const cookie = { httpOnly: true, secure: true, sameSite: "strict" as const, path: "/" };

  if (form.get("logout")) {
    const res = back();
    res.cookies.set(ADS_COOKIE, "", { ...cookie, maxAge: 0 });
    return res;
  }

  const session = adsSessionValue();
  if (!session || !adminKeyMatches(String(form.get("key") ?? ""))) return back("?error=1");

  const res = back();
  res.cookies.set(ADS_COOKIE, session, { ...cookie, maxAge: ADS_COOKIE_MAX_AGE });
  return res;
}
