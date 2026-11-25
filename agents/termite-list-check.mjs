// agents/termite-list-check.mjs
//
// One-off / on-demand: checks every account in Supabase `termite_list_review`
// (a review list someone already worked, e.g. Rachel's 2026-11-19 termite list)
// against the live Fieldster API and records, per line:
//   - the account's termite agreements (status, billing frequency, price)
//   - termite invoices billed in 2025 and 2026, and what is still open
//   - findings: missing 2026 bill, billed with no active agreement, price
//     mismatch, balance still open
//
// PUBLIC REPO = PUBLIC ACTIONS LOGS. Only counts and field NAMES are printed.
// Customer detail goes only to Supabase (RLS on, service role only).
// STRICTLY READ-ONLY against Fieldster (GET only).
//
// Run: LIST_NAME=rachel-2026-11-19 node agents/termite-list-check.mjs

import { cleanEnv } from "./lib/env-url.mjs";

const BASE = cleanEnv("FIELDSTER_API_BASE") || "https://envirocare.key7app.com/api";
const KEY = cleanEnv("FIELDSTER_API_TOKEN") || cleanEnv("FIELDSTER_API_KEY");
const AUTH_HEADER = cleanEnv("FIELDSTER_API_HEADER") || "Key7-Authentication";
const SB_URL = (cleanEnv("SUPABASE_URL") || "").replace(/\/+$/, "");
const SB_KEY = cleanEnv("SUPABASE_SERVICE_ROLE_KEY") || cleanEnv("SUPABASE_KEY");
const LIST = cleanEnv("LIST_NAME") || "rachel-2026-11-19";
const TODAY = new Date().toISOString().slice(0, 10);
const TERMITE = /termite|sentricon/i;

async function fs(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { [AUTH_HEADER]: KEY, accept: "application/json" } });
    if (res.ok) { const d = await res.json(); return Array.isArray(d) ? d : (d.data || d.items || d); }
    if (res.status === 404) return null;
    if (attempt === 3 || res.status < 500) throw new Error(`Fieldster ${path} ${res.status}`);
    await new Promise(r => setTimeout(r, 2000 * attempt));
  }
}
async function sb(path, init = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, { ...init,
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", ...(init.headers || {}) } });
  if (!res.ok) throw new Error(`Supabase ${path.split("?")[0]} ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const t = await res.text(); return t ? JSON.parse(t) : null;
}
const keysOf = o => (o && typeof o === "object" ? Object.keys(o).join(",") : String(o));
let shapesLogged = false;

// Customer lookup by account number. The param name is not documented, so try
// the likely ones and only accept an exact customer_number match.
let lookupParam = null;
async function customerByAcct(acct) {
  const params = lookupParam ? [lookupParam] : ["customer_number", "account_number", "search", "q"];
  for (const p of params) {
    const rows = await fs("/customers", { [p]: acct, page_size: 20 });
    const hit = Array.isArray(rows) ? rows.find(c => c.customer_number === acct) : null;
    if (hit) { if (!lookupParam) { lookupParam = p; console.log(`[shape] customer lookup param = ${p}`); } return hit; }
  }
  return null;
}

const agName = a => a.service_agreement?.name || a.agreement?.name || a.name || a.service_agreement_name || "";
const agPrice = a => Number(a.annual_value ?? a.annual_price ?? a.price ?? 0) || null;
const agFreq = a => a.billing_frequency?.name || a.billing_frequency || "";
const agStart = a => (a.schedule_start_date || a.start_date || a.created_date || "").slice(0, 10);

async function checkRow(row) {
  const out = { findings: [] };
  let customer = null, agreements = [];
  if (row.account_number) {
    customer = await customerByAcct(row.account_number);
    if (!customer) { out.findings.push("account number not found in Fieldster"); return out; }
    out.customer_id = customer.id; out.name = [customer.first_name, customer.last_name].filter(Boolean).join(" ") || customer.customer_name;
    out.customer_status = customer.status;
    agreements = (await fs("/agreements", { customer_id: customer.id, page_size: 200 })) || [];
  }
  if (row.agreement_id && !agreements.some(a => a.id === row.agreement_id)) {
    const a = await fs(`/agreements/${row.agreement_id}`);
    if (a && a.id) agreements.push(a);
    else if (!customer) { out.findings.push("agreement id not found in Fieldster"); return out; }
  }
  if (!shapesLogged && agreements[0]) { console.log(`[shape] agreement keys: ${keysOf(agreements[0])}`); shapesLogged = true; }

  const termiteAgs = agreements.filter(a => TERMITE.test(agName(a)));
  out.agreements = termiteAgs.map(a => ({ id: a.id, name: agName(a), status: a.status, freq: agFreq(a),
    price: agPrice(a), start: agStart(a), cancelled: (a.cancelled_date || "").slice(0, 10) || null,
    billing_customer: a.billing_customer?.customer_number || null }));
  const target = row.agreement_id ? termiteAgs.find(a => a.id === row.agreement_id) || agreements.find(a => a.id === row.agreement_id) : null;
  const activeTermite = termiteAgs.filter(a => /active/i.test(a.status || ""));

  // Invoices: the property's own customer plus any billing customer the
  // termite agreements bill to (multi-property owners are billed on one account).
  const custIds = new Set([customer?.id, ...termiteAgs.map(a => a.billing_customer?.id || a.billing_customer_id)].filter(Boolean));
  let invs = [];
  for (const cid of custIds) invs.push(...((await fs("/invoices", { customer_id: cid, page_size: 500, invoice_date_start: "2025-01-01" })) || []));
  const agIds = new Set(termiteAgs.map(a => a.id));
  const tInv = invs.filter(i => (i.agreement_id && agIds.has(i.agreement_id)) || (!i.agreement_id && /termite/i.test(i.service_type?.name || "") && i.customer_id === customer?.id));
  const byYear = y => tInv.filter(i => (i.invoice_date || "").startsWith(y));
  const sum = a => Math.round(a.reduce((s, i) => s + Number(i.total || 0), 0) * 100) / 100;
  out.billed_2025 = sum(byYear("2025")); out.billed_2026 = sum(byYear("2026"));
  out.invoices_2026 = byYear("2026").map(i => ({ n: i.invoice_number, d: (i.invoice_date || "").slice(0, 10), t: i.total, bal: i.balance, ag: i.agreement_id }));
  out.open_termite_balance = Math.round(tInv.reduce((s, i) => s + Number(i.balance || 0), 0) * 100) / 100;
  out.open_balance_all = Math.round(invs.reduce((s, i) => s + Number(i.balance || 0), 0) * 100) / 100;

  // Findings
  if (row.agreement_id && !target) out.findings.push(`listed agreement ${row.agreement_id} not on this account`);
  if (target && !/active/i.test(target.status || "")) out.findings.push(`listed agreement is ${target.status}`);
  if (["REMOVE", "NOAG"].includes(row.category)) {
    if (activeTermite.length) out.findings.push(`HAS active termite agreement(s): ${activeTermite.map(a => a.id).join(", ")} — list said none`);
    if (!activeTermite.length && out.billed_2026 > 0) out.findings.push(`billed $${out.billed_2026} termite in 2026 with no active termite agreement`);
  }
  for (const a of activeTermite) {
    const f = String(agFreq(a)).toLowerCase();
    const mine = tInv.filter(i => i.agreement_id === a.id && (i.invoice_date || "") >= "2026-01-01");
    const start = agStart(a);
    const renewMonth = start ? Number(start.slice(5, 7)) : null;
    const curMonth = Number(TODAY.slice(5, 7));
    if (/annual|year/.test(f) || f === "") {
      const firstYear = start && start >= "2025-12-01";
      if (!mine.length && !firstYear && renewMonth && renewMonth <= curMonth) out.findings.push(`MISSING 2026 BILL: agreement ${a.id} renews month ${renewMonth}, no 2026 invoice`);
      const price = agPrice(a);
      const billed = Math.round(mine.reduce((s, i) => s + Number(i.total || 0), 0) * 100) / 100;
      if (mine.length && price && Math.abs(billed - price) > 1) out.findings.push(`agreement ${a.id} price $${price} but billed $${billed} in 2026`);
    } else if (/month/.test(f)) {
      const last90 = tInv.filter(i => i.agreement_id === a.id && (i.invoice_date || "") >= new Date(Date.now() - 95 * 864e5).toISOString().slice(0, 10));
      if (last90.length < 2) out.findings.push(`MONTHLY agreement ${a.id}: only ${last90.length} invoices in last ~3 months`);
    } else if (/service/.test(f)) {
      // billed with each service: nothing to check against the calendar
    }
    if (agPrice(a) === 0) out.findings.push(`agreement ${a.id} price is $0`);
  }
  if (row.category === "BAL90" && out.open_balance_all > 0) out.findings.push(`still owes $${out.open_balance_all}`);
  if (!termiteAgs.length && row.category !== "REMOVE" && row.category !== "NOAG") out.findings.push("no termite agreement on this account");
  return out;
}

async function main() {
  if (!KEY) throw new Error("FIELDSTER_API_TOKEN not set");
  const rows = await sb(`termite_list_review?select=*&list_name=eq.${encodeURIComponent(LIST)}&order=id`);
  console.log(`[termite-list] ${rows.length} rows in ${LIST}`);
  let n = 0, flagged = 0, errors = 0;
  for (const row of rows) {
    let result;
    try { result = await checkRow(row); } catch (e) { errors++; result = { findings: [`check failed: ${e.message}`] }; }
    if (result.findings.length) flagged++;
    await sb(`termite_list_review?id=eq.${row.id}`, { method: "PATCH", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ result, checked_at: new Date().toISOString() }) });
    n++;
  }
  console.log(`[termite-list] checked ${n}, flagged ${flagged}, errors ${errors}`);
  if (errors === rows.length && rows.length) throw new Error("every check failed");
}
main().catch(e => { console.error(`[termite-list] FAILED: ${e.message}`); process.exit(1); });
