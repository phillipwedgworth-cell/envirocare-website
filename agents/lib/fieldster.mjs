// agents/lib/fieldster.mjs
// Shared, READ-ONLY client for the Fieldster (Key7) REST API.
//
// WHY THIS EXISTS (2026-11-25)
// ---------------------------------------------------------------------------
// Four callers each re-derived the same Fieldster facts by hand:
// scripts/build_collections.py, scripts/sync_contacts.py,
// agents/captivated-suppress-sync.mjs and agents/lead-coordinator.mjs. When
// Fieldster renamed a query parameter on 2026-10-30 (Customers/Storedcards:
// customerId -> customer_id) nothing noticed for over a week, and collections
// reporting broke silently. This module holds the facts in one place, and
// agents/fieldster-health.mjs uses it to check every weekday that the endpoints
// and fields the fleet depends on still answer the way the code expects.
//
// FACTS (each one verified against the live API by an earlier run; do not
// re-derive by probing):
//   - Base URL: https://envirocare.key7app.com/api  (Fieldster's own Postman
//     collection "FieldsterAPI.postman_collection v1.3.json").
//   - Auth header: `Key7-Authentication: <api key>` (verified 2026-09-08). A
//     wrong header name and NO header return the same 401
//     {"message":"API key missing"}, so a 401 never tells you which is wrong.
//   - Paging: `page` (0-indexed) + `page_size` (max 1000). PascalCase
//     `PageSize` is IGNORED and silently returns the default page.
//   - Lists come back as a flat JSON array (older docs show Items/Data
//     wrappers; both are accepted).
//   - Fields are snake_case. Invoices embed their customer as
//     `billing_customer`. `balance_start=0.01` returns only open invoices.
//   - The API has customers, invoices, appointments and agreements. It has NO
//     chemical-usage data (checked via /api/help on 2026-10-30): CHE-100D
//     still needs the logged-in report screen.
//
// SAFETY: this module only ever sends GET. There is deliberately no write
// helper here; anything that changes Fieldster must be its own reviewed code
// behind an explicit FIELDSTER_ALLOW_WRITES flag (see scripts/sync_contacts.py).
// The API key is read from the environment and never logged.

import { cleanEnv } from "./env-url.mjs";

export const DEFAULT_BASE = "https://envirocare.key7app.com/api";
export const DEFAULT_HEADER = "Key7-Authentication";
export const MAX_PAGE_SIZE = 1000;

export function fieldsterConfig(env = process.env) {
  const read = (name) => (env === process.env ? cleanEnv(name) : String(env[name] ?? "").trim());
  return {
    base: (read("FIELDSTER_API_BASE") || DEFAULT_BASE).replace(/\/+$/, ""),
    header: read("FIELDSTER_API_HEADER") || DEFAULT_HEADER,
    // FIELDSTER_API_TOKEN is the name most of the fleet uses; FIELDSTER_API_KEY
    // is what lead-coordinator.yml passes. Accept either.
    key: read("FIELDSTER_API_TOKEN") || read("FIELDSTER_API_KEY"),
  };
}

/** Rows from a Fieldster list response: flat array, or an Items/Data wrapper. */
export function rowsOf(json) {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object") {
    if (Array.isArray(json.Items)) return json.Items;
    if (Array.isArray(json.Data)) return json.Data;
  }
  return null; // not a list shape at all
}

export class FieldsterError extends Error {
  constructor(message, status) { super(message); this.name = "FieldsterError"; this.status = status; }
}

/**
 * One read-only GET. Returns { status, ok, data } — `data` is parsed JSON when
 * the body is JSON, otherwise null. Never throws on an HTTP status; throws
 * FieldsterError only for a missing key or a network/timeout failure.
 */
export async function fieldsterGet(path, params = {}, { config = fieldsterConfig(), timeoutMs = 60_000, fetchImpl = fetch, readBody = true } = {}) {
  if (!config.key) throw new FieldsterError("FIELDSTER_API_TOKEN (or FIELDSTER_API_KEY) is not set", 0);
  const url = new URL(`${config.base}/${String(path).replace(/^\/+/, "")}`);
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  let res;
  try {
    res = await fetchImpl(url, { method: "GET", headers: { [config.header]: config.key, accept: "application/json" }, signal: ctl.signal });
  } catch (e) {
    const why = e?.name === "AbortError" ? `timed out after ${Math.round(timeoutMs / 1000)}s` : (e?.message || String(e));
    throw new FieldsterError(`GET /${path} failed: ${redact(why, config.key)}`, 0);
  } finally {
    clearTimeout(timer);
  }
  let data = null;
  if (readBody) {
    const text = await res.text().catch(() => "");
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  }
  return { status: res.status, ok: res.ok, data };
}

/** Every row from a paged list endpoint (page is 0-indexed, page_size <= 1000). */
export async function fieldsterGetAll(path, params = {}, { maxPages = 200, pageSize = MAX_PAGE_SIZE, ...opts } = {}) {
  const out = [];
  for (let page = 0; page < maxPages; page++) {
    const r = await fieldsterGet(path, { ...params, page, page_size: pageSize }, opts);
    if (!r.ok) throw new FieldsterError(`GET /${path} page ${page} -> HTTP ${r.status}`, r.status);
    const rows = rowsOf(r.data);
    if (rows === null) throw new FieldsterError(`GET /${path} page ${page} returned no list`, r.status);
    out.push(...rows);
    if (rows.length < pageSize) return out;
  }
  throw new FieldsterError(`GET /${path} still had rows after ${maxPages} pages; refusing to keep paging`, 0);
}

/** Field names a caller relies on that are missing from a sample row. */
export function missingFields(row, fields) {
  if (!row || typeof row !== "object") return [...fields];
  return fields.filter((f) => {
    const [head, ...rest] = f.split(".");
    if (!(head in row)) return true;
    if (!rest.length) return false;
    const inner = row[head];
    return inner === null || typeof inner !== "object" ? false : missingFields(inner, [rest.join(".")]).length > 0;
  });
}

function redact(text, key) {
  return key ? String(text).split(key).join("[redacted]") : String(text);
}
