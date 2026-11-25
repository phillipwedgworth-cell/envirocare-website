// agents/payment-returns-audit.mjs
//
// WHY THIS EXISTS
// ---------------
// When a bank draft bounces or a card is charged back, Fieldster Payments emails
// us, but Fieldster itself keeps the original payment applied: the invoice
// shows PAID and nobody collects. The office has to reverse it by hand
// ("Debit Increase") and add the Return Check Fee. On 2026-11-25 a manual
// check found a $350 return from 11/18 still showing paid a week later, and
// two fees added and then credited back off.
//
// This agent checks every row in Supabase `payment_returns` (filled from the
// Fieldster Payments emails by a cloud Claude scheduled task) against the live
// Fieldster API and records, per return:
//   - reversed      a Debit Increase on/after the return date
//   - fee           an Administrative invoice (Return Check Fee etc.) after it
//   - fee_waived    a Credit Decrease equal to that fee
//   - repaid        a new payment after the reversal
//   - open_balance  what Fieldster says is still owed
// Results go to `payment_return_checks`; anything needing a fix is emailed.
//
// PUBLIC REPO = PUBLIC ACTIONS LOGS. Never print a customer name, account,
// invoice or amount to stdout. Details go only to Supabase and the email.
//
// STRICTLY READ-ONLY against Fieldster (GET only). API params verified live
// 2026-11-25: payment_date_start / invoice_date_start filter; plain paging
// returns oldest rows first, so never rely on page 0 without a date filter.
//
// Run: node agents/payment-returns-audit.mjs [--dry-run]

import { cleanEnv } from "./lib/env-url.mjs";

const DRY = process.argv.includes("--dry-run");
const BASE = cleanEnv("FIELDSTER_API_BASE") || "https://envirocare.key7app.com/api";
const KEY = cleanEnv("FIELDSTER_API_TOKEN") || cleanEnv("FIELDSTER_API_KEY");
const AUTH_HEADER = cleanEnv("FIELDSTER_API_HEADER") || "Key7-Authentication";
const SB_URL = (cleanEnv("SUPABASE_URL") || "").replace(/\/+$/, "");
const SB_KEY = cleanEnv("SUPABASE_SERVICE_ROLE_KEY") || cleanEnv("SUPABASE_KEY");
const LOOKBACK_DAYS = Number(cleanEnv("RETURNS_LOOKBACK_DAYS") || 60);
const REPORT_TO = ["phillipwedgworth@gmail.com",
  ...(cleanEnv("RETURNS_REPORT_TO") || "").split(",").map(s => s.trim()).filter(Boolean)];

const REVERSAL_TYPES = /debit increase|posting error|returned|nsf/i;
const WAIVE_TYPES = /credit decrease/i;
const MONEY_IN_TYPES = /^(ach|credit card|check|cash|debit card)$/i;
const FEE_NAMES = /return(ed)? check|nsf|chargeback|dispute|late fee/i;

const money = n => `$${Number(n || 0).toFixed(2)}`;
const day = s => (s || "").slice(0, 10);
const addDays = (iso, n) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
// Adjustment rows (Debit Increase, Credit Decrease) can carry their value in
// amount_applied rather than payment_total, so read whichever is set.
const amt = p => Math.max(Math.abs(Number(p.payment_total || 0)), Math.abs(Number(p.amount_applied || 0)), Math.abs(Number(p.coa_amount || 0)));
const near = (a, b) => Math.abs(Number(a) - Number(b)) < 0.02;

async function fs(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { [AUTH_HEADER]: KEY, accept: "application/json" } });
    if (res.ok) { const d = await res.json(); return Array.isArray(d) ? d : (d.data || d.items || d); }
    if (attempt === 3 || res.status < 500) throw new Error(`Fieldster ${path} ${res.status}`);
    await new Promise(r => setTimeout(r, 2000 * attempt));
  }
}

async function sb(path, init = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`Supabase ${path.split("?")[0]} ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const body = await res.text();
  return body ? JSON.parse(body) : null;
}

async function checkOne(r, used) {
  const start = addDays(r.notice_date, -3);
  const pays = await fs("/payments", { customer_id: r.fieldster_customer_id, page_size: 500, payment_date_start: start });
  const invs = await fs("/invoices", { customer_id: r.fieldster_customer_id, page_size: 500, invoice_date_start: addDays(r.notice_date, -400) });

  // A customer can have several returns; each reversal row may only count once.
  const reversals = [];
  let reversedAmt = 0;
  for (const p of pays) {
    if (reversedAmt + 0.01 >= Number(r.amount || 0)) break;
    if (!REVERSAL_TYPES.test(p.payment_type || "") || day(p.payment_date) < addDays(r.notice_date, -1) || used.has(p.id)) continue;
    used.add(p.id); reversals.push(p); reversedAmt += amt(p);
  }
  const reversed = reversedAmt + 0.01 >= Number(r.amount || 0);
  const partial = !reversed && reversedAmt > 0;

  // Fee invoices: Administrative invoices dated on/after the return.
  const adminInvs = invs.filter(i => day(i.invoice_date) >= addDays(r.notice_date, -1) && /admin/i.test(i.service_type?.name || ""));
  // A fee invoice counts for one return only (several returns can share a
  // customer), and only once its line items are read and name a fee: an
  // unreadable Administrative invoice is reported, never assumed to be the fee.
  const fees = [];
  let unverifiedFee = false;
  for (const i of adminInvs) {
    if (used.has(`inv:${i.id}`)) continue;
    let names;
    try {
      const d = await fs(`/invoices/${i.id}`);
      names = (d.invoice_details || []).map(x => x.service?.name || x.description || "").filter(Boolean);
    } catch { unverifiedFee = true; continue; }
    if (names.some(n => FEE_NAMES.test(n))) {
      used.add(`inv:${i.id}`);
      fees.push({ number: i.invoice_number, total: i.total, balance: i.balance, names });
      break; // one fee per return
    }
  }
  const feeTotal = fees.reduce((s, f) => s + Number(f.total || 0), 0);
  const waivers = pays.filter(p => WAIVE_TYPES.test(p.payment_type || "") && day(p.payment_date) >= addDays(r.notice_date, -1));
  const feeWaived = fees.length > 0 && waivers.some(w => fees.some(f => near(amt(w), f.total)) || near(amt(w), feeTotal));
  const wrongFeeName = fees.some(f => f.names.length && !f.names.some(n => /return(ed)? check/i.test(n)));
  const repaid = pays.filter(p => MONEY_IN_TYPES.test(p.payment_type || "") && day(p.payment_date) >= r.notice_date)
    .reduce((s, p) => s + amt(p), 0);

  const listed = (r.invoice_numbers || "").split(",").map(s => s.trim()).filter(Boolean);
  const listedInvs = invs.filter(i => listed.includes(i.invoice_number));
  const openBalance = invs.reduce((s, i) => s + Number(i.balance || 0), 0);

  const issues = [];
  if (!reversed) issues.push(partial
    ? `only ${money(reversedAmt)} of ${money(r.amount)} reversed`
    : `payment NOT reversed — Fieldster still shows ${listedInvs.length ? listedInvs.map(i => `${i.invoice_number} balance ${money(i.balance)}`).join(", ") : "it paid"}`);
  if (!fees.length) issues.push(unverifiedFee
    ? "fee not confirmed — an Administrative invoice exists but its line items could not be read"
    : "no Return Check Fee added");
  if (feeWaived) issues.push(`fee ${money(feeTotal)} added then credited off (Credit Decrease)`);
  if (wrongFeeName) issues.push(`fee posted as "${fees.flatMap(f => f.names).join(", ")}" instead of the Return Check Fee service`);

  const status = !reversed ? "not_reversed" : !fees.length ? "no_fee" : feeWaived ? "fee_waived" : issues.length ? "fee_issue" : "ok";
  return {
    dispute_id: r.dispute_id, checked_at: new Date().toISOString(), status, reversed,
    fee_added: fees.length ? feeTotal : null, fee_waived: feeWaived, open_balance: Math.round(openBalance * 100) / 100,
    detail: { issues, reversed_amount: reversedAmt, repaid_after: repaid, fees, wrong_fee_name: wrongFeeName },
  };
}

async function sendReport(rows, checks) {
  const key = cleanEnv("RESEND_API_KEY"), from = cleanEnv("NOTIFY_FROM");
  const byId = Object.fromEntries(rows.map(r => [r.dispute_id, r]));
  const bad = checks.filter(c => c.status !== "ok");
  const lines = bad.map(c => {
    const r = byId[c.dispute_id];
    const age = Math.round((Date.now() - new Date(r.notice_date + "T12:00:00Z")) / 864e5);
    return `• ${r.customer_name} (cust ${r.fieldster_customer_id}) — ${r.kind.replace("_", " ")} ${money(r.amount)} on ${r.notice_date} (${age} days ago), dispute ${r.dispute_id}\n    ${c.detail.issues.join("; ")}\n    Fieldster open balance now ${money(c.open_balance)}`;
  });
  const okCount = checks.length - bad.length;
  const subject = bad.length
    ? `Payment returns: ${bad.length} need fixing in Fieldster`
    : `Payment returns: all ${checks.length} handled`;
  const text = [
    `Checked ${checks.length} bank returns / chargebacks from the last ${LOOKBACK_DAYS} days against Fieldster (read-only), ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CT.`,
    "",
    bad.length ? "NEEDS FIXING:" : "Nothing to fix.",
    ...lines,
    "",
    `${okCount} handled correctly (reversed, Return Check Fee added, not waived).`,
    "",
    "Rule: reverse the payment the same day the return comes in, then add the Return Check Fee through the service (not a typed amount, not a Late Fee).",
    "To stop flagging one you have reviewed, set ignore_reason on its row in Supabase table payment_returns.",
  ].join("\n");
  if (cleanEnv("RETURNS_NO_EMAIL")) { console.log(`[report] RETURNS_NO_EMAIL set — ${bad.length} flagged, email not sent`); return; }
  if (DRY || !key || !from) { console.log(`[report] ${DRY ? "dry-run" : "RESEND not configured"} — ${bad.length} flagged, email not sent`); return; }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: REPORT_TO, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
  console.log(`[report] emailed ${REPORT_TO.length} recipient(s): ${bad.length} flagged, ${okCount} ok`);
}

async function main() {
  if (!KEY) throw new Error("FIELDSTER_API_TOKEN not set");
  if (!SB_URL || !SB_KEY) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set");
  const since = addDays(new Date().toISOString().slice(0, 10), -LOOKBACK_DAYS);
  const rows = await sb(`payment_returns?select=*&ignore_reason=is.null&notice_date=gte.${since}&kind=in.(ach_return,chargeback)&order=notice_date.asc`);
  console.log(`[audit] ${rows.length} returns to check`);
  // Guard against a silently empty feed: the email-ingest task should add rows most weeks.
  if (!rows.length) console.log("[audit] WARNING: no returns in window — check the Gmail ingest scheduled task is running");

  const checks = [];
  let errors = 0;
  const usedByCustomer = {};
  for (const r of rows) {
    const used = (usedByCustomer[r.fieldster_customer_id] ||= new Set());
    try { checks.push(await checkOne(r, used)); }
    catch (e) {
      errors++;
      // Same keys as a normal row: PostgREST bulk upserts need uniform objects.
      checks.push({ dispute_id: r.dispute_id, checked_at: new Date().toISOString(), status: "error",
        reversed: null, fee_added: null, fee_waived: null, open_balance: null,
        detail: { issues: [`check failed: ${e.message}`] } });
    }
  }
  const counts = checks.reduce((m, c) => (m[c.status] = (m[c.status] || 0) + 1, m), {});
  console.log(`[audit] results ${JSON.stringify(counts)}`);
  if (!DRY && checks.length) {
    await sb("payment_return_checks?on_conflict=dispute_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(checks),
    });
    console.log(`[audit] wrote ${checks.length} rows to payment_return_checks`);
  }
  await sendReport(rows, checks);
  if (errors === rows.length && rows.length) throw new Error("every check failed — Fieldster API problem");
}

main().catch(e => { console.error(`[audit] FAILED: ${e.message}`); process.exit(1); });
