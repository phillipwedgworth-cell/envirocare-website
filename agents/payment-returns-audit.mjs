// agents/payment-returns-audit.mjs
//
// Checks every bank return / chargeback in Supabase `payment_returns` against
// Fieldster and records whether the office handled it: payment reversed so the
// invoice shows due again, Return Check Fee added, fee not quietly waived.
//
// PUBLIC REPO = PUBLIC ACTIONS LOGS. Never print a customer name, account,
// invoice or amount to stdout. Details go to Supabase and the emailed report.
//
// STRICTLY READ-ONLY against Fieldster (GET only).
//
// Run: node agents/payment-returns-audit.mjs [--probe] [--dry-run]

import { cleanEnv } from "./lib/env-url.mjs";

const PROBE = process.argv.includes("--probe");
const BASE = cleanEnv("FIELDSTER_API_BASE") || "https://envirocare.key7app.com/api";
const KEY = cleanEnv("FIELDSTER_API_TOKEN") || cleanEnv("FIELDSTER_API_KEY");
const AUTH_HEADER = cleanEnv("FIELDSTER_API_HEADER") || "Key7-Authentication";

async function fs(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { [AUTH_HEADER]: KEY, accept: "application/json" } });
  if (!res.ok) throw new Error(`Fieldster ${path} ${res.status}`);
  return res.json();
}

function shape(o, depth = 0) {
  if (o === null) return "null";
  if (Array.isArray(o)) return `[${o.length ? shape(o[0], depth + 1) : ""}]`;
  if (typeof o === "object") {
    if (depth > 1) return "{…}";
    return "{" + Object.keys(o).map(k => `${k}:${shape(o[k], depth + 1)}`).join(", ") + "}";
  }
  return typeof o;
}

async function probe() {
  // Test customer ids come from env so they are not in the public repo.
  const ids = (cleanEnv("PROBE_CUSTOMER_IDS") || "").split(",").filter(Boolean);
  for (const [i, id] of ids.entries()) {
    console.log(`--- probe customer #${i + 1}`);
    for (const p of ["/payments", "/invoices"]) {
      try {
        const d = await fs(p, { customer_id: id, page_size: 200 });
        const rows = Array.isArray(d) ? d : (d.data || d.items || []);
        console.log(`${p}: ${rows.length} rows; shape ${shape(rows[0])}`);
        if (p === "/payments") {
          const types = {};
          for (const r of rows) {
            const t = r.payment_type?.name || r.payment_type || r.type || "?";
            const sign = Number(r.amount ?? r.total ?? 0) < 0 ? "neg" : "pos";
            types[`${t}/${sign}`] = (types[`${t}/${sign}`] || 0) + 1;
          }
          console.log(`  payment types: ${JSON.stringify(types)}`);
        } else {
          const svc = {};
          for (const r of rows) {
            const s = r.service_type?.name || r.service?.name || r.description || "?";
            svc[s] = (svc[s] || 0) + 1;
          }
          console.log(`  invoice service types: ${JSON.stringify(svc)}`);
        }
      } catch (e) { console.log(`${p}: ERROR ${e.message}`); }
    }
  }
}

if (!KEY) { console.error("FIELDSTER_API_TOKEN not set"); process.exit(1); }
async function probeParams() {
  const id = (cleanEnv("PROBE_CUSTOMER_IDS") || "").split(",")[1];
  const tries = [
    ["/payments", {}], ["/payments", { payment_date_start: "2026-11-01" }], ["/payments", { start_date: "2026-11-01" }],
    ["/payments", { date_start: "2026-11-01" }], ["/payments", { payment_date_from: "2026-11-01" }],
    ["/payments", { posting_date_start: "2026-11-01" }], ["/payments", { page: 1 }], ["/payments", { page: 2 }],
    ["/invoices", {}], ["/invoices", { invoice_date_start: "2026-11-01" }], ["/invoices", { start_date: "2026-11-01" }],
    ["/invoices", { page: 1 }], ["/invoices", { page: 2 }],
  ];
  for (const [p, extra] of tries) {
    try {
      const d = await fs(p, { customer_id: id, page_size: 200, ...extra });
      const rows = Array.isArray(d) ? d : (d.data || d.items || []);
      const dates = rows.map(r => (r.payment_date || r.invoice_date || "").slice(0, 10)).sort();
      console.log(`${p} ${JSON.stringify(extra)} -> ${rows.length} rows, ${dates[0]} .. ${dates[dates.length - 1]}`);
    } catch (e) { console.log(`${p} ${JSON.stringify(extra)} -> ERROR ${e.message}`); }
  }
}
if (PROBE) { await probe(); await probeParams(); }
