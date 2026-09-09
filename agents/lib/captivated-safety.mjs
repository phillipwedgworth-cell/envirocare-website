// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/captivated-safety.mjs
// Commit: feat(agents): opt-out, quiet-hours and dedup enforcement for SMS sends
// Push: main
// ─────────────────────────────────────
//
// WHY THIS EXISTS
// ---------------
// Phillip confirmed 2026-09-09 that EnviroCare has consent to text its
// customers. That settles whether a first message may be sent. It does NOT
// settle three other things, which are separate obligations and stay enforced
// here regardless:
//
//   1. HONOURING STOP. Consent is revocable at any time, by any reasonable
//      means, and the revocation is effective immediately. A customer who
//      replies "stop" has withdrawn consent even though consent existed when
//      they were added.
//   2. QUIET HOURS. Calls and texts are restricted to daytime hours in the
//      RECIPIENT's timezone, consent or not.
//   3. NOT TEXTING THE SAME PERSON REPEATEDLY. Consent is not a licence to
//      send the same review request every week.
//
// These are enforced in code rather than in a template, because the person
// writing the template is not the person who will remember the rule at 11pm on
// a Friday. This is the same reasoning as the double gate in captivated.mjs.
//
// NOT LEGAL ADVICE. The thresholds below are conservative defaults, not a
// compliance opinion. Have counsel confirm them against your consent records.

import { stateGet, stateSet } from "./kv.mjs";

// Alabama is Central. All four offices are in-state, so a single zone is
// correct today; if that ever changes, resolve per contact rather than here.
export const DEFAULT_TZ = "America/Chicago";

// Statute allows 8am–9pm local. We use 9am–8pm: an hour of margin on each end
// costs nothing and absorbs DST edges, clock skew and a queue that drains
// slower than expected.
export const WINDOW_START_HOUR = 9;
export const WINDOW_END_HOUR = 20;

// Don't send the same campaign to the same contact more often than this.
export const MIN_DAYS_BETWEEN_SENDS = 60;

/**
 * Current hour (0-23) in a timezone, without pulling in a date library.
 */
export function hourIn(tz = DEFAULT_TZ, now = new Date()) {
  const h = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    hour12: false,
  }).format(now);
  return Number(h) % 24;
}

export function isWithinSendWindow(tz = DEFAULT_TZ, now = new Date()) {
  const h = hourIn(tz, now);
  return h >= WINDOW_START_HOUR && h < WINDOW_END_HOUR;
}

export function sendWindowReason(tz = DEFAULT_TZ, now = new Date()) {
  const h = hourIn(tz, now);
  if (h < WINDOW_START_HOUR) return `too early — ${h}:00 ${tz}, window opens ${WINDOW_START_HOUR}:00`;
  if (h >= WINDOW_END_HOUR) return `too late — ${h}:00 ${tz}, window closed at ${WINDOW_END_HOUR}:00`;
  return null;
}

// ── Opt-out detection ───────────────────────────────────────────────────────
// Carrier-standard keywords plus the plain-English forms people actually send.
// Matched on a normalised copy of the message: lowercased, punctuation
// stripped, whitespace collapsed. "STOP." and "Stop!" and " stop " all match.

const KEYWORDS = [
  "stop", "stopall", "unsubscribe", "cancel", "end", "quit", "optout", "opt out", "revoke",
];

const PHRASES = [
  "remove me", "take me off", "do not text", "dont text", "don t text",
  "no more texts", "no more messages", "stop texting", "stop messaging",
  "unsubscribe me", "leave me alone", "not interested stop",
];

function normalise(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * True when a message is a reasonable expression of opt-out.
 *
 * Deliberately errs toward over-matching. A false positive costs one
 * unsent review request. A false negative is a message to someone who
 * told you to stop.
 */
export function isOptOut(text) {
  const n = normalise(text);
  if (!n) return false;
  // A short message that IS a keyword — "stop", "STOP!", "cancel"
  const words = n.split(" ");
  if (words.length <= 3 && words.some((w) => KEYWORDS.includes(w))) return true;
  // A keyword standing alone anywhere in a longer message
  if (KEYWORDS.some((k) => new RegExp(`\\b${k.replace(" ", "\\s+")}\\b`).test(n))) {
    // "stop by the office" / "cancel my appointment" are not opt-outs.
    if (/\b(stop by|stopped by|stop in|cancel (my )?(appointment|service call|visit))\b/.test(n)) return false;
    return true;
  }
  return PHRASES.some((p) => n.includes(p));
}

/**
 * Walk conversation messages and return the set of contact identifiers that
 * have opted out. Inbound only — our own copy of the word "stop" is not a
 * customer revoking consent.
 *
 * @param {Array} messages  message objects from getConversationMessages()
 * @param {(m:any)=>boolean|null} isOutbound  direction predicate
 * @param {(m:any)=>string|null} contactIdOf  how to read the contact id
 */
export function collectOptOuts(messages, isOutbound, contactIdOf) {
  const out = new Set();
  for (const m of messages || []) {
    if (isOutbound(m) === true) continue; // ours, not theirs
    const body = m?.body ?? m?.content ?? m?.text ?? m?.message ?? "";
    if (!isOptOut(body)) continue;
    const id = contactIdOf(m);
    if (id) out.add(String(id));
  }
  return out;
}

// ── Suppression list, persisted ─────────────────────────────────────────────
// Opt-outs must survive the run that discovered them. A set rebuilt from a
// 40-conversation sample every time would silently "forget" anyone whose
// conversation fell out of the sample.

const SUPPRESSION_KEY = "captivated:suppressed";

export async function loadSuppressed() {
  const raw = await stateGet(SUPPRESSION_KEY);
  const ids = Array.isArray(raw?.ids) ? raw.ids : Array.isArray(raw) ? raw : [];
  return new Set(ids.map(String));
}

/**
 * Union the newly-seen opt-outs into the stored list. Additive on purpose:
 * an id is never removed by this function. Re-consent is a deliberate human
 * act, not something a scan should be able to undo.
 */
export async function mergeSuppressed(newIds) {
  const existing = await loadSuppressed();
  let added = 0;
  for (const id of newIds) {
    if (!existing.has(String(id))) {
      existing.add(String(id));
      added++;
    }
  }
  if (added > 0) {
    await stateSet(SUPPRESSION_KEY, { ids: [...existing], updated_at: new Date().toISOString() });
  }
  return { total: existing.size, added, set: existing };
}

// ── Per-contact send history / dedup ────────────────────────────────────────

const historyKey = (campaign) => `captivated:lastsent:${campaign}`;

export async function loadSendHistory(campaign) {
  const raw = await stateGet(historyKey(campaign));
  return raw && typeof raw === "object" ? raw : {};
}

export async function recordSends(campaign, contactIds, when = new Date()) {
  const hist = await loadSendHistory(campaign);
  const iso = when.toISOString();
  for (const id of contactIds) hist[String(id)] = iso;
  await stateSet(historyKey(campaign), hist);
  return hist;
}

export function tooSoon(history, contactId, minDays = MIN_DAYS_BETWEEN_SENDS, now = new Date()) {
  const last = history?.[String(contactId)];
  if (!last) return false;
  const days = (now - new Date(last)) / 86400000;
  return Number.isFinite(days) && days < minDays;
}

/**
 * One place that answers "may I text this contact right now, and if not, why".
 * Returns { ok, reason }. Callers log the reason for every excluded contact so
 * a shrinking audience is explained rather than mysterious.
 */
export function screenContact(contactId, { suppressed, history, minDays = MIN_DAYS_BETWEEN_SENDS, now = new Date() }) {
  const id = String(contactId);
  if (!id) return { ok: false, reason: "no contact id" };
  if (suppressed?.has(id)) return { ok: false, reason: "opted out" };
  if (tooSoon(history, id, minDays, now)) return { ok: false, reason: `contacted within ${minDays} days` };
  return { ok: true, reason: null };
}

export default {
  DEFAULT_TZ,
  WINDOW_START_HOUR,
  WINDOW_END_HOUR,
  MIN_DAYS_BETWEEN_SENDS,
  hourIn,
  isWithinSendWindow,
  sendWindowReason,
  isOptOut,
  collectOptOuts,
  loadSuppressed,
  mergeSuppressed,
  loadSendHistory,
  recordSends,
  tooSoon,
  screenContact,
};
