// agents/lead-coordinator.mjs — EnviroCare Lead Coordinator
//
// PURPOSE (Phillip, 2026-10-05): every qualified inquiry has an assigned person,
// a next action and a verified outcome.
//
// Sameday keeps answering calls. Fieldster keeps customers, routes and billing.
// This agent does not talk to customers and never writes to Fieldster. It:
//   1. ASSIGNS  every lead that has no owner / deadline yet (web-form leads; the
//               Sameday relay assigns its own on arrival via /api/leads/ingest)
//   2. VERIFIES "booked" claims: looks the Fieldster appointment number up through
//               the Fieldster API (read-only) and stamps fieldster_verified_at
//   3. REPORTS  overdue callbacks, leads with no outcome, unverified bookings,
//               possible duplicates and response times — by email
//
// No model is used. Offices, owners, deadlines and statuses come from fixed rules
// (lib/leads/core.ts, data/lead-owners.ts). A booking is "verified" only when the
// Fieldster record is found, never because someone said so.
//
// Runs: .github/workflows/lead-coordinator.yml (weekdays). Full report on the
// morning run; the midday/afternoon runs email only when something is overdue.

import { supabase, logAgentRun } from './lib/supabase.mjs';
import { sendEmail } from './lib/notify.mjs';
import { callbackDue, classifyInquiry, digitsOnly, flagsFor, responseMinutes, SLA_MIN_IN_HOURS, OPEN_STATUSES } from '../lib/leads/core.ts';
import { ownerFor, isPlaceholderOwner } from '../data/lead-owners.ts';
import { officeForZip, isInServiceArea } from '../data/zip-to-office.ts';

const AGENT = 'lead-coordinator';
const MODE = process.env.LEAD_REPORT_MODE || 'auto';         // full | overdue-only | auto
// Leads that arrived before the coordinator went live have no recorded outcome.
// They are counted once as backlog, never flagged as overdue.
const START = new Date(process.env.LEAD_COORDINATOR_START || '2026-10-06T00:00:00-05:00');
const FIELDSTER_BASE = 'https://envirocare.key7app.com/api';
const FIELDSTER_KEY = (process.env.FIELDSTER_API_KEY || '').trim();
const WINDOW_DAYS = 30;

const ctNow = () => new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', hour12: false });
const ct = (s) => (s ? new Date(s).toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—');
const name = (l) => `${l.first_name ?? ''} ${l.last_name ?? ''}`.trim() || 'Unknown caller';
const phone = (d) => (d && d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d || '—');

function isMorningRun() {
  if (MODE === 'full') return true;
  if (MODE === 'overdue-only') return false;
  const h = Number(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', hour: 'numeric', hour12: false }));
  return h < 10;
}

// ── 1. Assign ────────────────────────────────────────────────────────────────
async function assignUnowned(leads, log) {
  let n = 0;
  for (const l of leads) {
    const received = new Date(l.received_at || l.created_at);
    if (received < START) continue;
    if (l.owner && l.callback_due && l.kind && l.office_id) continue;
    const zip = String(l.zip || '').slice(0, 5);
    const officeId = zip && isInServiceArea(zip) ? officeForZip(zip).id : 'unrouted';
    // Website form: the visitor is asking for service, so a new-customer inquiry.
    const kind = l.kind || classifyInquiry({ customerType: l.customer_type || 'new', reason: l.service_type || '', summary: l.notes || '' });
    const owner = ownerFor(officeId, kind);
    const patch = {
      office_id: l.office_id || officeId,
      kind,
      customer_type: l.customer_type || 'new',
      owner: l.owner || owner.owner,
      owner_email: l.owner_email || owner.email,
      callback_due: l.callback_due || callbackDue(received).toISOString(),
      received_at: l.received_at || l.created_at,
      status_updated_at: l.status_updated_at || l.created_at,
    };
    const { error } = await supabase.from('leads').update(patch).eq('id', l.id);
    if (error) { log.errors.push(`assign ${l.id}: ${error.message}`); continue; }
    await supabase.from('lead_events').insert({ lead_id: l.id, actor: AGENT, event: 'assigned', detail: patch });
    Object.assign(l, patch);
    n++;
  }
  return n;
}

// ── 2. Verify bookings against Fieldster (read-only) ─────────────────────────
// Staff type the Fieldster appointment number. We GET that appointment and,
// when the record exposes a customer, check the customer's phone matches the
// lead's. Field names are not fully documented (Fieldster API v1.4), so the
// phone match searches the returned JSON for the lead's 10 digits.
async function fieldsterGet(path) {
  const res = await fetch(`${FIELDSTER_BASE}${path}`, { headers: { 'Key7-Authentication': FIELDSTER_KEY, Accept: 'application/json' } });
  if (res.status === 404) return { notFound: true };
  if (!res.ok) throw new Error(`Fieldster ${path} → HTTP ${res.status}`);
  return { data: await res.json() };
}
const hasDigits = (obj, digits) => digits && digitsOnly(JSON.stringify(obj ?? '')).includes(digits);

async function verifyBookings(leads, log) {
  const pending = leads.filter((l) => l.status === 'booked' && l.fieldster_ref && !l.fieldster_verified_at);
  if (!pending.length) return { checked: 0, verified: 0, skipped: false };
  if (!FIELDSTER_KEY) return { checked: 0, verified: 0, skipped: true, pending: pending.length };
  let verified = 0;
  for (const l of pending) {
    try {
      const appt = await fieldsterGet(`/appointments/${encodeURIComponent(l.fieldster_ref)}`);
      if (appt.notFound) { log.unverified.push({ l, why: `Fieldster has no appointment #${l.fieldster_ref}` }); continue; }
      let match = hasDigits(appt.data, l.phone);
      const custId = appt.data?.customer_id ?? appt.data?.customer?.id;
      if (!match && custId != null) {
        const cust = await fieldsterGet(`/customers/${encodeURIComponent(custId)}`);
        match = !cust.notFound && hasDigits(cust.data, l.phone);
      }
      if (!match) { log.unverified.push({ l, why: `appointment #${l.fieldster_ref} exists but its customer phone is not ${phone(l.phone)}` }); continue; }
      const at = new Date().toISOString();
      const { error } = await supabase.from('leads').update({ fieldster_verified_at: at, fieldster_status: 'pushed', fieldster_id: String(l.fieldster_ref) }).eq('id', l.id);
      if (error) throw new Error(error.message);
      await supabase.from('lead_events').insert({ lead_id: l.id, actor: AGENT, event: 'verified', detail: { fieldster_ref: l.fieldster_ref } });
      l.fieldster_verified_at = at;
      verified++;
    } catch (e) {
      log.errors.push(`verify ${l.id}: ${e.message}`);
    }
  }
  return { checked: pending.length, verified, skipped: false };
}

// ── 3. Report ────────────────────────────────────────────────────────────────
function median(xs) {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : Math.round((s[s.length / 2 - 1] + s[s.length / 2]) / 2);
}

const last7Auto = (live, now) => live.filter((l) => l.status === 'lost' && /per Sameday summary/.test(l.lost_reason ?? '') && now - new Date(l.received_at || l.created_at) < 7 * 86_400_000).length;

function buildReport(leads, ctx) {
  const now = new Date();
  const live = leads.filter((l) => new Date(l.received_at || l.created_at) >= START);
  const backlog = leads.filter((l) => new Date(l.received_at || l.created_at) < START && OPEN_STATUSES.includes(l.status ?? 'new'));
  const flagged = live.map((l) => ({ l, flags: flagsFor(l, now) })).filter((x) => x.flags.length);
  const overdue = flagged.filter((x) => x.flags.includes('callback overdue'));
  const stale = flagged.filter((x) => x.flags.includes('no outcome 48h after contact'));
  const unverifiedOld = flagged.filter((x) => x.flags.includes('booking not verified in Fieldster'));

  // Possible duplicates: same phone, more than one open lead.
  const byPhone = new Map();
  for (const l of live.filter((x) => OPEN_STATUSES.includes(x.status ?? 'new'))) {
    if (!l.phone) continue;
    byPhone.set(l.phone, [...(byPhone.get(l.phone) ?? []), l]);
  }
  const dupes = [...byPhone.values()].filter((g) => g.length > 1);

  const last7 = live.filter((l) => now - new Date(l.received_at || l.created_at) < 7 * 86_400_000);
  const resp = last7.map(responseMinutes).filter((m) => m != null);
  const withinTarget = resp.filter((m) => m <= SLA_MIN_IN_HOURS).length;
  const count = (arr, k) => arr.reduce((m, l) => ((m[l[k] ?? '—'] = (m[l[k] ?? '—'] ?? 0) + 1), m), {});
  const fmtCounts = (o) => Object.entries(o).map(([k, v]) => `${k} ${v}`).join(' · ') || 'none';
  const placeholder = new Set(live.filter((l) => isPlaceholderOwner(l.owner)).map((l) => l.owner)).size > 0;

  const line = (l, extra = '') => `  • ${name(l)} ${phone(l.phone)} — ${l.kind ?? '?'} / ${l.office ?? 'unrouted'} — owner ${l.owner ?? 'NONE'} — due ${ct(l.callback_due)}${extra}`;
  const out = [];
  out.push(`EnviroCare Lead Coordinator — ${now.toLocaleDateString('en-US', { timeZone: 'America/Chicago', weekday: 'long', month: 'short', day: 'numeric' })}`);
  out.push('Source: Supabase leads table, read at ' + ct(now.toISOString()) + ' CT. Lead Desk: /lead-desk');
  out.push('');
  out.push(`OVERDUE CALLBACKS: ${overdue.length}`);
  overdue.forEach(({ l }) => out.push(line(l)));
  out.push('');
  out.push(`NO OUTCOME 48h AFTER CONTACT: ${stale.length}`);
  stale.forEach(({ l }) => out.push(line(l, ` — contacted ${ct(l.status_updated_at)}`)));
  out.push('');
  out.push(`BOOKED BUT NOT VERIFIED IN FIELDSTER: ${unverifiedOld.length + ctx.unverified.length}`);
  ctx.unverified.forEach(({ l, why }) => out.push(`${line(l)} — ${why}`));
  unverifiedOld.filter(({ l }) => !ctx.unverified.some((u) => u.l.id === l.id)).forEach(({ l }) => out.push(line(l, ` — Fieldster #${l.fieldster_ref}`)));
  if (ctx.verify.skipped) out.push(`  (Not checked: FIELDSTER_API_KEY is not set, so ${ctx.verify.pending} booking(s) could not be verified.)`);
  out.push('');
  const recentAlerts = live.filter((l) => (l.alerts ?? []).length && now - new Date(l.received_at || l.created_at) < 3 * 86_400_000);
  out.push(`ALERTS FROM CALLS IN THE LAST 3 DAYS: ${recentAlerts.length}`);
  recentAlerts.forEach((l) => l.alerts.forEach((a) => out.push(`  • ${name(l)} ${phone(l.phone)} — ${a}`)));
  out.push('');
  const auto = last7Auto(live, now);
  if (auto) { out.push(`Campaign calls closed automatically from Sameday's own summary (declined, hung up, or asked not to be contacted), last 7 days: ${auto}`); out.push(''); }
  out.push(`POSSIBLE DUPLICATES (same phone, more than one open lead): ${dupes.length}`);
  dupes.forEach((g) => out.push(`  • ${phone(g[0].phone)} — ${g.length} open leads: ${g.map((l) => l.id.slice(0, 8)).join(', ')}`));
  out.push('');
  out.push('LAST 7 DAYS');
  out.push(`  Inquiries: ${last7.length} (${fmtCounts(count(last7, 'source'))})`);
  out.push(`  By kind: ${fmtCounts(count(last7, 'kind'))}`);
  out.push(`  By office: ${fmtCounts(count(last7, 'office'))}`);
  out.push(`  Outcomes: ${fmtCounts(count(last7, 'status'))}`);
  out.push(`  First contact recorded: ${resp.length} of ${last7.length}` + (resp.length ? ` · median ${median(resp)} min · within ${SLA_MIN_IN_HOURS} min: ${withinTarget}` : ''));
  out.push(`  (Response time is measured from receipt to the first status change on the Lead Desk. A call nobody records is not counted as fast.)`);
  if (ctx.assigned) out.push(`  Assigned this run: ${ctx.assigned}`);
  if (backlog.length) {
    out.push('');
    out.push(`BEFORE THE COORDINATOR STARTED: ${backlog.length} older lead(s) still marked open with no recorded outcome. Not flagged as overdue. Close them on the Lead Desk when known.`);
  }
  out.push('');
  out.push('NOT CHECKED');
  if (placeholder) out.push('  • Named owners: data/lead-owners.ts still assigns office QUEUES, not people.');
  if (ctx.verify.skipped) out.push('  • Fieldster: no API key in this workflow, so no booking was verified.');
  if (!ctx.samedayRecent) out.push('  • Sameday: no Sameday lead arrived in the last 3 days. Either it was quiet or the Gmail relay is not running — check script.google.com.');
  out.push('  • Calls answered by staff directly (not through Sameday or the website) are not in this report.');
  out.push('  • Revenue: only what staff enter on the Lead Desk; Fieldster invoices are not read yet.');
  if (ctx.errors.length) { out.push(''); out.push('ERRORS'); ctx.errors.forEach((e) => out.push('  • ' + e)); }

  return { text: out.join('\n'), overdue: overdue.length, flagged: flagged.length, last7: last7.length };
}

async function main() {
  if (!supabase) { console.error('No Supabase credentials'); process.exit(1); }
  const ctx = { errors: [], unverified: [], assigned: 0, verify: { checked: 0, verified: 0, skipped: false }, samedayRecent: true };

  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000).toISOString();
  const { data, error } = await supabase.from('leads')
    .select('id, created_at, received_at, source, first_name, last_name, phone, zip, service_type, notes, office, office_id, kind, customer_type, status, owner, owner_email, callback_due, first_contact_at, status_updated_at, fieldster_ref, fieldster_verified_at, lost_reason, direction, alerts')
    .or(`created_at.gte.${since},status.in.(${OPEN_STATUSES.join(',')}),and(status.eq.booked,fieldster_verified_at.is.null)`)
    .limit(2000);
  if (error) {
    // Most likely: supabase/lead-coordinator.sql not applied yet. Say so; don't pretend.
    await logAgentRun(AGENT, 'failed', { error: error.message, hint: 'apply supabase/lead-coordinator.sql' });
    await sendEmail('⚠️ Lead Coordinator could not read leads', `Supabase said: ${error.message}\n\nIf a column is missing, the schema in supabase/lead-coordinator.sql has not been applied yet.`);
    process.exit(1);
  }
  const leads = (data ?? []).map((l) => ({ ...l, phone: digitsOnly(l.phone), status: l.status ?? 'new' }));

  ctx.assigned = await assignUnowned(leads, ctx);
  ctx.verify = await verifyBookings(leads, ctx);
  ctx.samedayRecent = leads.some((l) => l.source === 'sameday' && Date.now() - new Date(l.received_at || l.created_at) < 3 * 86_400_000);

  const report = buildReport(leads, ctx);
  console.log(report.text);

  let emailed = false;
  if (isMorningRun()) {
    emailed = await sendEmail(`${report.overdue ? '⚠️' : '✅'} Leads: ${report.overdue} overdue · ${report.flagged} need attention · ${report.last7} this week`, report.text);
  } else if (report.overdue > 0) {
    emailed = await sendEmail(`⚠️ ${report.overdue} lead callback(s) overdue`, report.text);
  }

  const status = ctx.errors.length ? 'partial' : 'ok';
  await logAgentRun(AGENT, status, {
    mode: isMorningRun() ? 'full' : 'overdue-only', ct: ctNow(), leads: leads.length, assigned: ctx.assigned,
    overdue: report.overdue, flagged: report.flagged, fieldster: ctx.verify, emailed, errors: ctx.errors.slice(0, 5),
  });
}

main().catch(async (e) => {
  console.error(e);
  await logAgentRun(AGENT, 'failed', { error: String(e?.message ?? e) });
  process.exit(1);
});
