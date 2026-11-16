// lib/leads/screen.ts — keep out-of-state and bot submissions out of the lead queue.
//
// WHY (Supabase `leads`, read 2026-11-10): of 24 website "sales" leads in the
// 30 days to Nov 9, 10 had a non-Alabama ZIP (43925 OH, 33101 FL, 80743 CO,
// 22911 VA, 41287 KY, 32672 FL, 47700, 52874, 34411, 45700). Six had a
// random-letter street ("Eqpneuqj", "Ywdqukhnc"…), two were vendor pitches from
// contractor-marketing domains. Every one was emailed to the office as a real
// lead, assigned an owner and a callback deadline, and counted as "overdue" by
// the Lead Coordinator — inflating the overdue-callback alarm.
//
// EnviroCare serves Alabama only. Alabama ZIPs are 350xx–369xx.
//
// A screened submission is still STORED (status 'not_a_lead' with the reason),
// so nothing is silently lost and a false positive can be found and reopened
// on the Lead Desk. It is just not emailed to staff and never gets an owner.

export const ALABAMA_ZIP = /^3[56]\d{3}$/;

/** A real person cannot fill the quote form faster than this. */
export const MIN_FILL_MS = 2000;

export type ScreenCode = "out_of_area" | "bot_field" | "too_fast";
export type ScreenResult = { ok: true } | { ok: false; code: ScreenCode; reason: string };

export function screenSubmission(input: {
  zip: unknown;
  /** Hidden "company_website" field. People never see it; form-filling bots do. */
  honeypot?: unknown;
  /** Milliseconds between the form rendering and the submit click. */
  elapsedMs?: unknown;
}): ScreenResult {
  const hp = typeof input.honeypot === "string" ? input.honeypot.trim() : "";
  if (hp) return { ok: false, code: "bot_field", reason: "screened: hidden bot-trap field was filled in" };

  const elapsed = Number(input.elapsedMs);
  if (input.elapsedMs !== undefined && input.elapsedMs !== null && Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return { ok: false, code: "too_fast", reason: `screened: form submitted ${elapsed} ms after it loaded` };
  }

  const zip = String(input.zip ?? "").trim().slice(0, 5);
  if (!ALABAMA_ZIP.test(zip)) {
    return { ok: false, code: "out_of_area", reason: `outside service area: ZIP ${zip || "(blank)"} is not an Alabama ZIP` };
  }
  return { ok: true };
}

/** What a real out-of-state visitor sees. Bots get a silent 200 instead. */
export const OUT_OF_AREA_MESSAGE =
  "EnviroCare serves Alabama homes and businesses only, and that ZIP code isn't in Alabama. " +
  "If you are in Alabama, please check the ZIP and try again, or call (205) 940-6360.";
