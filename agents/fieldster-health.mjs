// agents/fieldster-health.mjs
// Weekday READ-ONLY contract check of the Fieldster (Key7) API endpoints the
// fleet depends on. Runs inside .github/workflows/collections-suppression.yml,
// right after the do-not-contact sync, at 6:30am CT.
//
// WHY: on 2026-10-30 Fieldster changed the stored-card endpoint's query
// parameter (customerId -> customer_id). Nothing in the fleet checked, and
// collections reporting stayed broken for over a week before anyone noticed.
// A token that expires or a field that is renamed breaks the same way: the
// collections rebuild, the do-not-contact sync and lead verification each fail
// in their own corner, hours apart. This check fails loudly in one place first.
//
// WHAT IT DOES: a handful of single-row GETs (page_size=1). For each it checks
// the HTTP status, that the body is a list, and that the fields our code reads
// are still present. It records only statuses, row counts and missing FIELD
// NAMES — never customer data, never stored-card bodies, never the API key.
//
// WHAT IT DOES NOT DO: write anything to Fieldster, read chemical usage (the API
// has none; CHE-100D still needs the report screen), or touch payments.
//
//   node agents/fieldster-health.mjs            # run the checks
//   node agents/fieldster-health.mjs --dry-run  # print the plan, no network

import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { fieldsterConfig, fieldsterGet, rowsOf, missingFields } from "./lib/fieldster.mjs";
import { logRunREST, logFindingREST } from "./lib/run-log.mjs";

const AGENT = "fieldster-health";

// The fields each caller actually reads. If Fieldster renames one, the caller
// silently produces blanks; this list is what turns that into a red run.
export const CHECKS = [
  { name: "auth + customers", path: "customers", params: { page: 0, page_size: 1 },
    fields: ["id"], usedBy: "lead-coordinator (customer phone match)" },
  { name: "open invoices", path: "invoices", params: { page: 0, page_size: 1, balance_start: "0.01" },
    fields: ["balance", "due_date", "billing_customer", "billing_customer.id", "billing_customer.customer_number", "billing_customer.customer_name"],
    usedBy: "build_collections.py, captivated-suppress-sync" },
  { name: "appointments", path: "appointments", params: { page: 0, page_size: 1, appointment_date_start: daysAgo(7) },
    fields: ["appointment_date", "status"], usedBy: "agreement screening, lead-coordinator" },
  { name: "active agreements", path: "agreements", params: { page: 0, page_size: 1, status: "active" },
    fields: ["id"], usedBy: "agreement screening" },
];

function daysAgo(n) {
  const d = new Date(Date.now() - n * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export async function runChecks({ config = fieldsterConfig(), fetchImpl = fetch } = {}) {
  const results = [];
  let customerId = null;
  for (const c of CHECKS) {
    const r = { name: c.name, path: c.path, status: 0, rows: null, missing: [], ok: false, note: "" };
    try {
      const res = await fieldsterGet(c.path, c.params, { config, fetchImpl, timeoutMs: 90_000 });
      r.status = res.status;
      const rows = res.ok ? rowsOf(res.data) : null;
      if (!res.ok) r.note = res.status === 401 ? "API key rejected or missing (401)" : `HTTP ${res.status}`;
      else if (rows === null) r.note = "response is not a list";
      else {
        r.rows = rows.length;
        if (rows.length) {
          r.missing = missingFields(rows[0], c.fields);
          if (c.path === "customers") customerId = rows[0].id ?? null;
        }
        r.ok = r.missing.length === 0;
        if (!rows.length) r.note = "no rows to check fields against";
        else if (r.missing.length) r.note = `fields missing: ${r.missing.join(", ")}`;
      }
    } catch (e) {
      r.note = e.message;
    }
    results.push(r);
    // A rejected key makes every later call a 401 too; stop instead of
    // reporting four identical failures.
    if (r.status === 401) break;
  }

  // Stored-card endpoint: status only, body never read. 200 or 404 means the
  // route and its customer_id parameter are still accepted; 400/405 is the
  // failure mode seen 2026-10-30.
  if (customerId !== null) {
    const r = { name: "stored cards (status only)", path: "Customers/Storedcards", status: 0, rows: null, missing: [], ok: false, note: "" };
    try {
      const res = await fieldsterGet("Customers/Storedcards", { customer_id: customerId }, { config, fetchImpl, readBody: false });
      r.status = res.status;
      r.ok = res.status === 200 || res.status === 404;
      if (!r.ok) r.note = `HTTP ${res.status} (route or customer_id parameter changed?)`;
    } catch (e) { r.note = e.message; }
    results.push(r);
  }
  return results;
}

export function summarize(results) {
  const failed = results.filter((r) => !r.ok);
  let md = `## Fieldster API health -- ${failed.length ? `${failed.length} problem(s)` : "all checks passed"}\n\n`;
  md += "| Check | HTTP | Rows | Result |\n|---|---|---|---|\n";
  for (const r of results) md += `| ${r.name} | ${r.status || "—"} | ${r.rows ?? "—"} | ${r.ok ? "ok" : (r.note || "failed").replace(/\|/g, "/")} |\n`;
  return { failed, md };
}

async function main() {
  const config = fieldsterConfig();
  if (process.argv.includes("--dry-run")) {
    console.log(`[${AGENT}] dry run: would GET ${CHECKS.map((c) => c.path).join(", ")} and Customers/Storedcards (status only) at ${config.base} using header ${config.header}; key ${config.key ? "present" : "MISSING"}.`);
    return;
  }
  if (!config.key) {
    const msg = "FIELDSTER_API_TOKEN / FIELDSTER_API_KEY not set; nothing checked (that is not a pass).";
    console.error(`[${AGENT}] ${msg}`);
    await logRunREST(AGENT, "error", msg).catch(() => {});
    process.exitCode = 1;
    return;
  }
  const results = await runChecks({ config });
  const { failed, md } = summarize(results);
  console.log(md);
  if (process.env.GITHUB_STEP_SUMMARY) { try { writeFileSync(process.env.GITHUB_STEP_SUMMARY, md, { flag: "a" }); } catch {} }
  const line = failed.length
    ? `${failed.length}/${results.length} Fieldster checks failed: ${failed.map((r) => `${r.name} (${r.note || r.status})`).join("; ")}`
    : `${results.length} Fieldster checks passed`;
  await logRunREST(AGENT, failed.length ? "error" : "ok", line).catch(() => {});
  if (failed.length) {
    await logFindingREST({ agent_name: AGENT, category: "integration", severity: "warning",
      finding: `${line}. Collections rebuild, do-not-contact sync and lead verification read these endpoints.` }).catch(() => {});
    process.exitCode = 1;
  }
}

// Only run when executed directly, so tests can import runChecks/summarize.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
