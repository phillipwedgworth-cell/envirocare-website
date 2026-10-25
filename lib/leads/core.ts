// lib/leads/core.ts — EnviroCare Lead Coordinator: the fixed rules.
//
// PURPOSE (Phillip, 2026-10-05): every qualified inquiry has an assigned person,
// a next action and a verified outcome.
//
// Everything in here is deterministic on purpose. No model decides an office, a
// deadline, a price or whether something is "booked" — those are business facts
// and they come from rules and from data/ files. A model may later summarise a
// call; it may not change any field this file computes.
//
// This file imports NOTHING, so it runs unchanged in three places:
//   • Next.js routes        (import from '@/lib/leads/core')
//   • the GitHub Actions agent (node strips the types: '../lib/leads/core.ts')
//   • the guard test         (scripts/test-lead-coordinator.mjs)
// Keep it to erasable TypeScript only: no enums, no namespaces, no parameter
// properties — node's type stripping rejects them.

// ─── 1. Parse a Sameday notification email ──────────────────────────────────
//
// Sameday sends one email per call from notifications@gosameday.com. The body is
// one line of UPPERCASE labels followed by values, e.g.
//   CALLER Jane Doe CALLER ID (205) 555-0100 CONTACT PHONE NUMBER (205) 555-0100
//   CALL TIME Oct 3, 11:33 AM ... STATUS callBack SUMMARY Jane called ...
//   View Message in Sameday https://app.sameday.ai/envirocare/conversations?id=…
// Format confirmed against live emails, Gmail, 2026-10-05. The daily
// "Report Notifications" email is not a call and is ignored.

// Longest first, so "CALLER ID" is never read as "CALLER" + "ID ...".
const CALL_EMAIL_LABELS = [
  'NEW OR EXISTING CUSTOMER',
  'COMPANY NAME',
  'REQUESTED CALLBACK TIME',
  'CONTACT PHONE NUMBER',
  'CALLBACK REASON',
  'CUSTOMER NAME',
  'CLAIM NUMBER',
  'CAMPAIGN',
  'CALL TIME',
  'CALLER ID',
  'ADDRESS',
  'CALLER',
  'EMAIL',
  'QUOTE',
  'STATUS',
] as const;

export type SamedayCall = {
  callerName: string;
  customerName: string;
  phone: string;            // digits only, 10 long when parseable
  email: string;
  address: string;
  zip: string;              // '' when the address carries none
  callTimeText: string;     // as Sameday printed it, e.g. "Oct 3, 11:33 AM"
  requestedCallback: string;
  callbackReason: string;
  customerType: 'new' | 'existing' | 'unknown';
  samedayStatus: string;    // lead | callBack | ... (Sameday's own word)
  summary: string;
  conversationUrl: string;
  conversationId: string;   // stable external id for de-duplication
  direction: 'inbound' | 'outbound'; // outbound = a Sameday campaign call
  campaign: string;
  quote: string;            // a price Sameday stated on the call, verbatim
};

export function isSamedayCallEmail(subject: string, body: string): boolean {
  if (/report notifications/i.test(subject)) return false;
  return /took a message for you|reached out to a customer for you/i.test(body) ||
    /\b(LEAD|CALLBACK|SUPPORT|CANCELLATION)\s+-\s+/.test(subject);
}

export function digitsOnly(s: string): string {
  const d = String(s ?? '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d;
}

export function parseSamedayEmail(body: string): SamedayCall {
  const text = String(body ?? '').replace(/\s+/g, ' ').trim();

  const urlMatch = text.match(/https:\/\/app\.sameday\.ai\/\S*conversations\?id=([A-Za-z0-9]+)/);
  const conversationUrl = urlMatch ? urlMatch[0] : '';
  const conversationId = urlMatch ? urlMatch[1] : '';

  // The record runs from after "took a message for you." to "View Message".
  let rec = text;
  const outbound = /reached out to a customer for you/i.test(rec);
  const start = rec.search(/(took a message|reached out to a customer) for you\.?/i);
  if (start >= 0) rec = rec.slice(start).replace(/^(took a message|reached out to a customer) for you\.?\s*/i, '');
  const end = rec.search(/View Message in Sameday/i);
  if (end >= 0) rec = rec.slice(0, end);

  // SUMMARY is always last and is free text, so cut it off before splitting:
  // an uppercase word inside a summary must never be read as a label.
  let summary = '';
  const sIdx = rec.search(/\bSUMMARY\b/);
  if (sIdx >= 0) {
    summary = rec.slice(sIdx + 'SUMMARY'.length).trim();
    rec = rec.slice(0, sIdx);
  }

  const fields: Record<string, string> = {};
  const re = new RegExp(`\\b(${CALL_EMAIL_LABELS.map((l) => l.replace(/ /g, '\\s')).join('|')})\\b`, 'g');
  const hits: { label: string; at: number; len: number }[] = [];
  for (const m of rec.matchAll(re)) hits.push({ label: m[1].replace(/\s/g, ' '), at: m.index ?? 0, len: m[0].length });
  hits.forEach((h, i) => {
    const next = hits[i + 1]?.at ?? rec.length;
    if (!(h.label in fields)) fields[h.label] = rec.slice(h.at + h.len, next).trim();
  });

  const address = fields['ADDRESS'] ?? '';
  const zipMatch = address.match(/\b(3[56]\d{3})\b/); // Alabama ZIPs are 35xxx/36xxx
  const nx = (fields['NEW OR EXISTING CUSTOMER'] ?? '').toLowerCase();

  return {
    callerName: fields['CALLER'] ?? '',
    customerName: fields['CUSTOMER NAME'] ?? fields['CALLER'] ?? '',
    phone: digitsOnly(fields['CONTACT PHONE NUMBER'] || fields['CALLER ID'] || ''),
    email: fields['EMAIL'] ?? '',
    address,
    zip: zipMatch ? zipMatch[1] : '',
    callTimeText: fields['CALL TIME'] ?? '',
    requestedCallback: fields['REQUESTED CALLBACK TIME'] ?? '',
    callbackReason: fields['CALLBACK REASON'] ?? '',
    customerType: nx.startsWith('new') ? 'new' : nx.startsWith('exist') ? 'existing' : 'unknown',
    samedayStatus: fields['STATUS'] ?? '',
    summary,
    conversationUrl,
    conversationId,
    direction: outbound ? 'outbound' : 'inbound',
    campaign: fields['CAMPAIGN'] ?? '',
    quote: fields['QUOTE'] ?? '',
  };
}

// ─── 2. Qualify: what kind of inquiry is this? ─────────────────────────────
//
// sales   — a new customer, or anyone asking for service/quote/inspection
// service — an existing customer with a service issue (pests back, reschedule)
// billing — paying, a bill, autopay, a card
// other   — too brief to tell, wrong number, vendor, spam
//
// Only `sales` must end in booked / lost. The others end in `resolved`.
// Keyword rules, not a model: they are auditable and they never invent a price.

export type LeadKind = 'sales' | 'service' | 'billing' | 'other';

const BILLING_RE = /\b(pay(ment|ing)?|bill(ing)?|invoice|balance|auto-?pay|card on file|credit card|ach|refund|charge[sd]?)\b/i;
const SALES_RE = /\b(quote|estimate|pric(e|ing)|inspection|new (customer|service)|start service|sign up|termite|mosquito|sentricon|wdo|treatment|exterminat|infest|roach|ant|spider|rodent|mice|rat|flea|tick)s?\b/i;
const SERVICE_RE = /\b(re-?service|come back|callback visit|still (seeing|have)|reschedul|technician|tech|missed (visit|appointment)|appointment)\b/i;
const TOO_BRIEF_RE = /too brief to determine|no engagement|wrong number|hung up/i;
// Job applicants and vendors are real callbacks but never sales.
const NOT_CUSTOMER_RE = /\b(job application|applied for|hiring( process)?|employment|marketing opportunit\w*|advertis\w+|vendor|sales rep(resentative)?)\b/i;

export function classifyInquiry(input: { customerType: 'new' | 'existing' | 'unknown'; reason: string; summary: string }): LeadKind {
  const text = `${input.reason} ${input.summary}`;
  if (NOT_CUSTOMER_RE.test(text)) return 'other';
  if (BILLING_RE.test(text)) return 'billing';
  if (input.customerType === 'new') return TOO_BRIEF_RE.test(text) && !SALES_RE.test(text) ? 'other' : 'sales';
  if (input.customerType === 'existing') return SERVICE_RE.test(text) || !SALES_RE.test(text) ? 'service' : 'sales';
  if (TOO_BRIEF_RE.test(text)) return 'other';
  return SALES_RE.test(text) ? 'sales' : 'other';
}

// ─── 2b. Alerts a person must act on, whatever the kind ─────────────────────
//
// Found by running the parser over all 231 Sameday call emails of Sep 5–Oct 5
// 2026 (Gmail, read 2026-10-05): several outbound cross-sell contacts asked to be
// taken off the call list, some callers asked to cancel, and Sameday stated
// prices on calls. Each needs a specific human action, so each is its own alert.

const DNC_RE = /\b(stop (sending|calling|contacting)|remov(e|al) (him|her|them|me)?\s*(from|off)|tak(e|en) (him|her|them|me) off|off the (calling|contact|call) list|do not (call|contact)|no (more|further) (calls|contact|marketing)|not to receive)\b/i;
const CANCEL_RE = /\bcancel(l?ing|l?ed)? (their|his|her|my|the)?\s*(recurring |monthly |pest |termite |regular )*(service|account|plan|contract|agreement)\b/i;

export function alertsFor(call: Pick<SamedayCall, 'summary' | 'callbackReason' | 'samedayStatus' | 'quote'>): string[] {
  const text = `${call.callbackReason} ${call.summary}`;
  const a: string[] = [];
  if (DNC_RE.test(text)) a.push('do-not-contact request — remove from Sameday campaign lists and note it in Fieldster');
  if (call.samedayStatus.toLowerCase() === 'cancellation' || CANCEL_RE.test(text)) a.push('cancellation request — retention call');
  if (/\$\s?\d/.test(call.quote)) a.push(`price stated on the call: "${call.quote.slice(0, 120)}" — check against data/pricing.ts`);
  return a;
}

// An outbound campaign call that Sameday itself records as declined with no
// follow-up is closed as lost on arrival, so staff are not asked to "call back"
// someone who just said no. The reason names Sameday as the source.
export function autoOutcome(call: Pick<SamedayCall, 'direction' | 'summary'>): { status: 'lost'; reason: string } | null {
  if (call.direction !== 'outbound') return null;
  const t = call.summary;
  if (/\b(declined|not interested)\b/i.test(t) && /\bno (further )?(action|follow-?up)\b/i.test(t))
    return { status: 'lost', reason: 'declined on Sameday campaign call (per Sameday summary)' };
  if (DNC_RE.test(t)) return { status: 'lost', reason: 'asked not to be contacted (per Sameday summary)' };
  // The customer hung up on a campaign call. The campaign re-dials on its own
  // schedule; a staff callback to someone who hung up on marketing is not a lead.
  if (TOO_BRIEF_RE.test(t) || /voicemail/i.test(t)) return { status: 'lost', reason: 'no conversation on campaign call (per Sameday summary)' };
  return null;
}

// ─── 3. Callback deadline ──────────────────────────────────────────────────
//
// Staffed hours: Mon–Fri 8:00–17:00 America/Chicago (GBP hours, data/offices.ts).
// Target, Phillip 2026-10-05: human follow-up within 5 minutes during staffed
// hours; an after-hours inquiry is due at the next opening plus a grace period.
// These are OPERATING TARGETS to test, not a statement of current performance.
// Federal holidays are not modelled — a holiday call is due on the holiday.

export const STAFFED = { tz: 'America/Chicago', openHour: 8, closeHour: 17, days: [1, 2, 3, 4, 5] } as const;
export const SLA_MIN_IN_HOURS = 5;
export const SLA_MIN_AFTER_OPEN = 60; // overnight/weekend inquiries: due 9:00 AM

function ctParts(d: Date) {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone: STAFFED.tz, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, weekday: 'short',
  }).formatToParts(d);
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? '';
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
  return { y: +g('year'), mo: +g('month'), da: +g('day'), h: +g('hour') % 24, mi: +g('minute'), wd };
}

// UTC instant for a Chicago wall-clock time (handles CST/CDT).
function ctWallToUtc(y: number, mo: number, da: number, h: number, mi: number): Date {
  const guess = new Date(Date.UTC(y, mo - 1, da, h, mi));
  const p = ctParts(guess);
  const asIfUtc = Date.UTC(p.y, p.mo - 1, p.da, p.h, p.mi);
  return new Date(guess.getTime() - (asIfUtc - guess.getTime()));
}

export function isStaffed(at: Date): boolean {
  const p = ctParts(at);
  return (STAFFED.days as readonly number[]).includes(p.wd) && p.h >= STAFFED.openHour && p.h < STAFFED.closeHour;
}

export function nextOpening(at: Date): Date {
  for (let i = 0; i < 8; i++) {
    const day = new Date(at.getTime() + i * 86_400_000);
    const p = ctParts(day);
    if (!(STAFFED.days as readonly number[]).includes(p.wd)) continue;
    const open = ctWallToUtc(p.y, p.mo, p.da, STAFFED.openHour, 0);
    if (open.getTime() > at.getTime()) return open;
  }
  return new Date(at.getTime() + 86_400_000); // unreachable in practice
}

export function callbackDue(receivedAt: Date): Date {
  if (isStaffed(receivedAt)) return new Date(receivedAt.getTime() + SLA_MIN_IN_HOURS * 60_000);
  return new Date(nextOpening(receivedAt).getTime() + SLA_MIN_AFTER_OPEN * 60_000);
}

// ─── 4. Status rules — what each status REQUIRES ───────────────────────────
//
// "Booked" means a Fieldster appointment/job exists. It cannot be set without the
// Fieldster reference, so "booked" is never a guess. "Verified" is a separate
// stamp the agent adds only after it finds that record through the Fieldster API.

export const STATUSES = ['new', 'contacted', 'booked', 'resolved', 'lost', 'not_a_lead', 'duplicate'] as const;
export type LeadStatus = (typeof STATUSES)[number];
export const OPEN_STATUSES: LeadStatus[] = ['new', 'contacted'];

export const LOST_REASONS = [
  'no answer after 3 attempts', 'price', 'outside service area', 'service not offered',
  'chose another company', 'not ready / just shopping', 'other',
] as const;

export type StatusChange = {
  status: LeadStatus;
  actor: string;
  fieldsterRef?: string;
  reason?: string;
  duplicateOf?: string;
  note?: string;
};

export function validateStatusChange(kind: LeadKind, from: LeadStatus, c: StatusChange): string | null {
  if (!STATUSES.includes(c.status)) return `unknown status "${c.status}"`;
  if (!c.actor || c.actor.trim().length < 2) return 'who made the change is required';
  if (c.status === 'booked') {
    if (!c.fieldsterRef || !/^[A-Za-z0-9-]{3,}$/.test(c.fieldsterRef.trim()))
      return 'booked requires the Fieldster appointment or job number';
  }
  if (c.status === 'lost' && !c.reason) return 'lost requires a reason';
  if (c.status === 'not_a_lead' && !c.reason) return 'not a lead requires a reason';
  if (c.status === 'duplicate' && !c.duplicateOf) return 'duplicate requires the original lead id';
  if (c.status === 'resolved' && kind === 'sales')
    return 'a sales inquiry ends booked or lost, not resolved';
  if (from === 'booked' && c.status !== 'booked' && c.status !== 'lost')
    return 'a booked lead can only be corrected to lost (cancelled), not reopened';
  return null;
}

// ─── 5. What the coordinator flags ─────────────────────────────────────────

export type LeadRow = {
  id: string;
  created_at: string;
  received_at?: string | null;
  kind?: LeadKind | null;
  status?: LeadStatus | null;
  owner?: string | null;
  callback_due?: string | null;
  first_contact_at?: string | null;
  status_updated_at?: string | null;
  fieldster_ref?: string | null;
  fieldster_verified_at?: string | null;
};

export const STALE_CONTACTED_H = 48;   // contacted but no outcome after 2 days
export const UNVERIFIED_BOOKED_H = 24; // booked, Fieldster record not found after 1 day

export function flagsFor(l: LeadRow, now: Date): string[] {
  const f: string[] = [];
  const st = l.status ?? 'new';
  if (!l.owner) f.push('no owner');
  if (st === 'new' && l.callback_due && new Date(l.callback_due) < now) f.push('callback overdue');
  if (st === 'contacted' && l.status_updated_at &&
      now.getTime() - new Date(l.status_updated_at).getTime() > STALE_CONTACTED_H * 3.6e6) f.push('no outcome 48h after contact');
  if (st === 'booked' && !l.fieldster_ref) f.push('booked without Fieldster reference');
  if (st === 'booked' && l.fieldster_ref && !l.fieldster_verified_at && l.status_updated_at &&
      now.getTime() - new Date(l.status_updated_at).getTime() > UNVERIFIED_BOOKED_H * 3.6e6) f.push('booking not verified in Fieldster');
  return f;
}

// Minutes from receipt to first contact — the number the 5-minute target is measured on.
export function responseMinutes(l: LeadRow): number | null {
  if (!l.first_contact_at) return null;
  const from = new Date(l.received_at || l.created_at).getTime();
  return Math.max(0, Math.round((new Date(l.first_contact_at).getTime() - from) / 60_000));
}
