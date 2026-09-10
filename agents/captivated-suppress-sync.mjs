// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/captivated-suppress-sync.mjs
// Commit: feat(agents): bridge Fieldster do-not-call notes into the SMS suppression list
// Push: main
// ─────────────────────────────────────
//
// THE GAP THIS CLOSES
// -------------------
// Before this, EnviroCare had two opt-out lists that did not know about each
// other, and the one staff maintain was the one the sender ignored:
//
//   Captivated  →  contact ids, harvested from STOP replies      (sender reads)
//   Fieldster   →  customer notes, "COLLECTIONS DO NOT CALL"     (sender ignored)
//   Workbook    →  "Do Not Contact" tab, typed by Sabrena        (sender ignored)
//
// COLLECTIONS_STAFF_GUIDE.md says of that tab: "This list is what will keep any
// future bulk-text tool from ever messaging someone who opted out — so if it's
// not on this list, it isn't protected." It was not protecting anyone, because
// captivated-send.mjs screened on Captivated contact ids and nothing translated.
//
// Neither Fieldster nor the workbook knows a Captivated contact id, and
// Captivated does not know a Fieldster account number. The phone number is the
// only identifier both sides hold, so this syncs by phone.
//
// MEASURED 2026-09-10 against the live API: 26 of 699 past-due customers carry a
// do-not-call note, and all 26 have a phone on file. Those are people already
// sent to collections. Texting them a cheerful review request would be the worst
// possible message to the worst possible audience.
//
// STRICTLY READ-ONLY against Fieldster — GET only, exactly like
// scripts/build_collections.py. The only write is to the Supabase KV
// suppression list, and it is ADDITIVE: this never removes a number. Re-consent
// is a deliberate human act, not something a sync should be able to undo.
//
// Run:  node agents/captivated-suppress-sync.mjs [--dry-run]

import { gateOrSkip } from "./lib/agent-gate.mjs";
import { logRunREST, logFindingREST } from "./lib/run-log.mjs";
import { cleanEnv } from "./lib/env-url.mjs";
import {
  normalisePhone,
  loadSuppressedPhones,
  mergeSuppressedPhones,
  normaliseEmail,
  loadSuppressedEmails,
  mergeSuppressedEmails,
} from "./lib/captivated-safety.mjs";

const AGENT_NAME = "captivated-suppress-sync";
const DRY = process.argv.includes("--dry-run");

const BASE = cleanEnv("FIELDSTER_API_BASE") || "https://envirocare.key7app.com/api";
const KEY = cleanEnv("FIELDSTER_API_TOKEN") || cleanEnv("FIELDSTER_API_KEY");
// Verified 2026-09-08 from Fieldster's own published Postman collection. Do not
// re-derive by probing: a wrong header name and NO header return byte-identical
// 401s, so the error carries no signal. See scripts/build_collections.py.
const AUTH_HEADER = cleanEnv("FIELDSTER_API_HEADER") || "Key7-Authentication";

// Phrasings found live in Fieldster customer notes. Deliberately broad: a false
// positive costs one unsent review request, a false negative texts someone who
// has been sent to collections.
const DO_NOT_CONTACT_RE =
  /do\s*not\s*(call|text|contact)|don'?t\s*(call|text|contact)|in\s+collections|sent\s+to\s+collections|no\s+(call|text)\b/i;

async function fieldsterOpenInvoices() {
  if (!KEY) throw new Error("FIELDSTER_API_TOKEN not set");
  const url = new URL(`${BASE}/invoices`);
  url.searchParams.set("page", "0");
  url.searchParams.set("page_size", "1000");
  // Only invoices with money outstanding. Unfiltered, this endpoint takes ~16s
  // for ONE customer and times out past ~50 — see build_collections.py.
  url.searchParams.set("balance_start", "0.01");
  const res = await fetch(url, { headers: { [AUTH_HEADER]: KEY, accept: "application/json" } });
  if (!res.ok) throw new Error(`Fieldster ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : json?.Items ?? json?.Data ?? [];
}

async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const out = {
    agent: AGENT_NAME,
    mode: DRY ? "DRY RUN" : "SYNC",
    customers_scanned: 0,
    flagged: 0,
    flagged_without_phone: 0,
    flagged_without_email: 0,
    phones_added: 0,
    emails_added: 0,
    suppression_total: 0,
    suppression_email_total: 0,
    samples: [],
    errors: [],
  };

  let invoices;
  try {
    invoices = await fieldsterOpenInvoices();
  } catch (e) {
    out.errors.push(`fieldster: ${e.message}`);
    console.error(`[${AGENT_NAME}] FAILED to read Fieldster: ${e.message}`);
    await logRunREST(AGENT_NAME, "error", out).catch(() => {});
    process.exitCode = 1;
    return out;
  }

  // One row per customer — invoices embed billing_customer.
  const customers = new Map();
  for (const inv of invoices) {
    const c = inv?.billing_customer;
    if (c?.id != null && !customers.has(c.id)) customers.set(c.id, c);
  }
  out.customers_scanned = customers.size;

  const phones = new Set();
  const emails = new Set();
  for (const c of customers.values()) {
    if (!DO_NOT_CONTACT_RE.test(String(c.notes || ""))) continue;
    out.flagged++;
    const p = normalisePhone(c.primary_phone) || normalisePhone(c.primary_mobile);
    const e = normaliseEmail(c.primary_email);
    if (p) phones.add(p);
    else out.flagged_without_phone++;
    if (e) emails.add(e);
    else out.flagged_without_email++;
    if (out.samples.length < 5) {
      out.samples.push({
        account: c.customer_number,
        note: String(c.notes).replace(/\s+/g, " ").slice(0, 60),
      });
    }
  }

  const beforePhones = await loadSuppressedPhones();
  const beforeEmails = await loadSuppressedEmails();
  if (DRY) {
    out.phones_added = [...phones].filter((p) => !beforePhones.has(p)).length;
    out.emails_added = [...emails].filter((e) => !beforeEmails.has(e)).length;
    out.suppression_total = beforePhones.size;
    out.suppression_email_total = beforeEmails.size;
  } else {
    const mp = await mergeSuppressedPhones(phones, "fieldster-notes");
    const me = await mergeSuppressedEmails(emails, "fieldster-notes");
    out.phones_added = mp.added;
    out.emails_added = me.added;
    out.suppression_total = mp.total;
    out.suppression_email_total = me.total;
  }

  console.log(`\n[${AGENT_NAME}] ${out.mode}`);
  console.log(`  customers with a balance : ${out.customers_scanned}`);
  console.log(`  do-not-contact notes     : ${out.flagged} (${out.flagged_without_phone} no phone, ${out.flagged_without_email} no email)`);
  console.log(`  phones ${DRY ? "WOULD add" : "added"}            : ${out.phones_added}  (list now ${out.suppression_total}${DRY ? ", unchanged — dry run" : ""})`);
  console.log(`  emails ${DRY ? "WOULD add" : "added"}            : ${out.emails_added}  (list now ${out.suppression_email_total}${DRY ? ", unchanged — dry run" : ""})`);
  for (const s of out.samples) console.log(`    ${s.account}  "${s.note}"`);

  // A flagged customer with no phone cannot be screened by phone, so the sender
  // could still reach them if Captivated holds a number Fieldster does not.
  // That is worth a finding rather than a silent gap.
  if (out.flagged_without_phone > 0) {
    await logFindingREST({
      agent_name: AGENT_NAME,
      category: "compliance",
      severity: "warning",
      finding: `${out.flagged_without_phone} customer(s) marked do-not-contact in Fieldster have no phone on file, so they cannot be screened out of an SMS send by phone.`,
      run_date: new Date().toISOString().slice(0, 10),
    }).catch(() => {});
  }

  console.log(
    "\n  NOTE: this syncs FIELDSTER notes only. The workbook's \"Do Not Contact\" tab\n" +
    "  is still not wired in — it lives in an .xlsx, not an API. Export it to CSV\n" +
    "  and add a second source here before relying on it.\n",
  );

  await logRunREST(AGENT_NAME, out.errors.length ? "partial" : "ok", out).catch(() => {});
  return out;
}

run().catch((e) => {
  console.error(`[${AGENT_NAME}] FAILED: ${e?.stack || e}`);
  logRunREST(AGENT_NAME, "error", { error: String(e?.message || e) }).catch(() => {});
  process.exitCode = 1;
});
