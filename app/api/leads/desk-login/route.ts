// POST /api/leads/desk-login — the Lead Desk sign-in form posts here.
// Body (form): key=<LEADS_DESK_KEY> to sign in, or logout=1 to sign out.
// On success it sets an httpOnly session cookie (an HMAC of the key, see
// lib/leads/server.ts) and redirects to /lead-desk, so the key never appears in
// a URL. A wrong key redirects back with ?error=1.
import { NextResponse } from 'next/server';
import { DESK_COOKIE, DESK_COOKIE_MAX_AGE, deskSessionValue, keyMatches } from '@/lib/leads/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let form: FormData;
  try { form = await request.formData(); } catch { form = new FormData(); }
  const back = (q = '') => NextResponse.redirect(new URL(`/lead-desk${q}`, request.url), 303);

  if (form.get('logout')) {
    const res = back();
    res.cookies.set(DESK_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
    return res;
  }

  const session = deskSessionValue();
  if (!session || !keyMatches(String(form.get('key') ?? ''), 'LEADS_DESK_KEY')) return back('?error=1');

  const res = back();
  res.cookies.set(DESK_COOKIE, session, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: DESK_COOKIE_MAX_AGE });
  return res;
}
