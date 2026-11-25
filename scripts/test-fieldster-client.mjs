// Offline test for agents/lib/fieldster.mjs and agents/fieldster-health.mjs.
// No network, no credentials: fetch is faked. Asserts the client only sends
// GET with the Key7-Authentication header and snake_case paging, never leaks
// the key in an error, and that the health check turns a renamed field, a 401
// or a changed stored-card route into a failure.
import assert from "node:assert/strict";
import { fieldsterGet, fieldsterGetAll, rowsOf, missingFields, fieldsterConfig } from "../agents/lib/fieldster.mjs";
import { runChecks, summarize } from "../agents/fieldster-health.mjs";

const config = fieldsterConfig({ FIELDSTER_API_TOKEN: "test-key-123" });
assert.equal(config.base, "https://envirocare.key7app.com/api");
assert.equal(config.header, "Key7-Authentication");
assert.equal(fieldsterConfig({ FIELDSTER_API_KEY: "k2" }).key, "k2", "FIELDSTER_API_KEY is accepted as a fallback");

const calls = [];
const fake = (routes) => async (url, opts) => {
  const u = new URL(url);
  calls.push({ path: u.pathname, params: Object.fromEntries(u.searchParams), method: opts.method, headers: opts.headers });
  const hit = routes(u);
  return { ok: hit.status >= 200 && hit.status < 300, status: hit.status, text: async () => JSON.stringify(hit.body ?? null) };
};

// GET only, right header, snake_case paging, flat-array handling.
let r = await fieldsterGet("customers", { page: 0, page_size: 1 }, { config, fetchImpl: fake(() => ({ status: 200, body: [{ id: 7 }] })) });
assert.equal(r.status, 200);
assert.deepEqual(rowsOf(r.data), [{ id: 7 }]);
assert.equal(calls.at(-1).method, "GET");
assert.equal(calls.at(-1).headers["Key7-Authentication"], "test-key-123");
assert.equal(calls.at(-1).params.page_size, "1");
assert.ok(!("PageSize" in calls.at(-1).params), "PascalCase paging is never sent");
assert.deepEqual(rowsOf({ Items: [1] }), [1]);
assert.equal(rowsOf({ message: "x" }), null);

// Paging stops on a short page.
const pages = await fieldsterGetAll("invoices", {}, { config, pageSize: 2, fetchImpl: fake((u) => ({ status: 200, body: u.searchParams.get("page") === "0" ? [1, 2] : [3] })) });
assert.deepEqual(pages, [1, 2, 3]);

// The key never appears in an error message.
await assert.rejects(
  fieldsterGet("customers", {}, { config, fetchImpl: async () => { throw new Error("boom test-key-123"); } }),
  (e) => !e.message.includes("test-key-123"),
);
await assert.rejects(fieldsterGet("customers", {}, { config: fieldsterConfig({}) }), /not set/);

// Nested field checks.
assert.deepEqual(missingFields({ balance: 1, billing_customer: { id: 1 } }, ["balance", "billing_customer.id", "billing_customer.customer_number"]), ["billing_customer.customer_number"]);

// Healthy API: every check passes.
const healthyRoutes = (u) => {
  const p = u.pathname.replace("/api/", "");
  if (p === "customers") return { status: 200, body: [{ id: 42 }] };
  if (p === "invoices") return { status: 200, body: [{ balance: "10.00", due_date: "2026-11-01", billing_customer: { id: 42, customer_number: "A1", customer_name: "Test" } }] };
  if (p === "appointments") return { status: 200, body: [{ appointment_date: "2026-11-20", status: "completed" }] };
  if (p === "agreements") return { status: 200, body: [{ id: 9 }] };
  if (p === "Customers/Storedcards") { assert.equal(u.searchParams.get("customer_id"), "42"); return { status: 200, body: [] }; }
  return { status: 404 };
};
let res = await runChecks({ config, fetchImpl: fake(healthyRoutes) });
assert.equal(summarize(res).failed.length, 0, "healthy API passes");
assert.equal(res.length, 5);

// A renamed invoice field fails the run and names the field, not the data.
res = await runChecks({ config, fetchImpl: fake((u) => u.pathname.endsWith("/invoices") ? { status: 200, body: [{ balance: "1", dueDate: "x", billing_customer: { id: 1, customer_number: "A", customer_name: "B" } }] } : healthyRoutes(u)) });
const bad = summarize(res).failed;
assert.equal(bad.length, 1);
assert.match(bad[0].note, /due_date/);
assert.ok(!summarize(res).md.includes("Test"), "report carries no customer data");

// A rejected key stops after the first call.
calls.length = 0;
res = await runChecks({ config, fetchImpl: fake(() => ({ status: 401, body: { message: "API key missing" } })) });
assert.equal(res.length, 1);
assert.equal(res[0].ok, false);
assert.equal(calls.length, 1);

// The 2026-10-30 failure mode: stored-card route answers 405.
res = await runChecks({ config, fetchImpl: fake((u) => u.pathname.endsWith("/Customers/Storedcards") ? { status: 405 } : healthyRoutes(u)) });
assert.equal(summarize(res).failed.map((x) => x.path).join(), "Customers/Storedcards");

console.log("✓ Fieldster client: GET-only, Key7-Authentication, snake_case paging, key redacted; health check catches renamed fields, 401 and stored-card route changes");
