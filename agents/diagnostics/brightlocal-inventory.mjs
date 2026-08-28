// agents/diagnostics/brightlocal-inventory.mjs
//
// Answers, from the live API rather than from a document: what is actually in
// this BrightLocal account, and what is out of credits?
//
// WHY THIS EXISTS (2026-08-27): "BrightLocal Citation Builder is at 0 credits"
// had been carried in conversation as a fact with nothing in the repo able to
// confirm it. AGENTS.md rule zero: check the live source before stating a
// conclusion. The capability probe (brightlocal-probe.mjs) discovered the two
// tools that answer it — get_cb_credits and get_lsg_credits — so this asks them.
//
// It also lists locations and Citation Builder campaigns, because a credit
// balance is only meaningful next to what is consuming credits. The probe run
// on 2026-08-27 returned total_count:4 locations while agents/brightlocal.mjs
// has 3 hardcoded, so the reconciliation is printed here too.
//
// READ-ONLY. Every call is a getter; nothing is ordered, spent, or written.
const KEY = (process.env.BRIGHTLOCAL_API_KEY || "").trim();
if (!KEY) { console.error("BRIGHTLOCAL_API_KEY not set"); process.exit(1); }

const MCP_URL = "https://mcp.brightlocal.com/mcp";
const HDRS = { "content-type": "application/json", accept: "application/json, text/event-stream", "x-api-key": KEY };

// The endpoint answers as SSE ("event: message\ndata: {...}") or plain JSON.
function parseRpc(raw) {
  const i = raw.indexOf('{"jsonrpc"');
  if (i === -1) return null;
  try { return JSON.parse(raw.slice(i)); } catch { return null; }
}

// One session reused across every call — cheaper and avoids hammering init.
async function openSession() {
  const init = await fetch(MCP_URL, {
    method: "POST", headers: HDRS,
    body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "inventory", version: "1" } } }),
    signal: AbortSignal.timeout(20000),
  });
  const sid = init.headers.get("mcp-session-id");
  if (!sid) throw new Error(`no MCP session (HTTP ${init.status})`);
  const shdrs = { ...HDRS, "Mcp-Session-Id": sid };
  await fetch(MCP_URL, { method: "POST", headers: shdrs, body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }), signal: AbortSignal.timeout(20000) });
  return shdrs;
}

let nextId = 1;
async function call(shdrs, name, args = {}) {
  const res = await fetch(MCP_URL, {
    method: "POST", headers: shdrs,
    body: JSON.stringify({ jsonrpc: "2.0", id: nextId++, method: "tools/call", params: { name, arguments: args } }),
    signal: AbortSignal.timeout(45000),
  });
  const rpc = parseRpc(await res.text());
  if (!rpc) return { error: `HTTP ${res.status}, unparseable response` };
  if (rpc.error) return { error: `${rpc.error.code}: ${rpc.error.message}` };
  const text = rpc.result?.content?.[0]?.text;
  if (typeof text !== "string") return { raw: rpc.result };
  try { return { data: JSON.parse(text) }; } catch { return { text } ; }
}

const shdrs = await openSession();

// ── Credits ─────────────────────────────────────────────────────────────────
console.log("=== CREDIT BALANCES ===");
for (const [label, tool] of [
  ["Citation Builder", "get_cb_credits"],
  ["Local Search Grid", "get_lsg_credits"],
]) {
  const r = await call(shdrs, tool);
  if (r.error) { console.log(`  ${label.padEnd(18)} ERROR — ${r.error}`); continue; }
  const v = r.data ?? r.text ?? r.raw;
  // Shape is not documented here; print the number if we can find one, and the
  // whole object regardless so a shape change is visible rather than swallowed.
  const n = typeof v === "number" ? v
    : (v && typeof v === "object" ? (v.credits ?? v.credit ?? v.balance ?? v.remaining ?? v.available) : undefined);
  console.log(`  ${label.padEnd(18)} ${n !== undefined ? `${n} credit(s)` : "(see raw)"}   raw: ${JSON.stringify(v).slice(0, 200)}`);
}

// ── Citation Builder campaigns — what would consume those credits ───────────
console.log("\n=== CITATION BUILDER CAMPAIGNS ===");
{
  const r = await call(shdrs, "find_cb_campaigns");
  if (r.error) console.log(`  ERROR — ${r.error}`);
  else {
    const items = r.data?.items ?? r.data?.campaigns ?? (Array.isArray(r.data) ? r.data : []);
    if (!items.length) {
      console.log("  none — no Citation Builder campaign exists in this account.");
      console.log("  (So 'out of credits' would not be what is blocking citation work: nothing is queued.)");
    } else {
      for (const c of items) {
        console.log(`  - id=${c.campaign_id ?? c.id ?? "?"} status=${c.status ?? "?"} location=${c.location_id ?? "?"} ${c.name ?? ""}`.trim());
      }
    }
    console.log(`  raw count: ${items.length}`);
  }
}

// ── Locations — reconcile against the 3 hardcoded in agents/brightlocal.mjs ──
console.log("\n=== LOCATIONS IN BRIGHTLOCAL ===");
{
  const KNOWN = new Map([[4068335, "Alabaster"], [4068730, "Huntsville"], [4068729, "Alex City"]]);
  // No num_per_page: passing 50 returned zero items while the probe's 1
  // returned four, so the parameter is doing something other than what it looks
  // like. An empty list here must never be reported as "the location is gone" —
  // that is a query defect wearing the costume of a finding.
  const r = await call(shdrs, "find_locations");
  if (r.error) console.log(`  ERROR — ${r.error}`);
  else {
    const items = r.data?.items ?? [];
    if (!items.length) {
      console.log(`  QUERY RETURNED NOTHING — not evidence of anything. Raw: ${JSON.stringify(r.data ?? r.text ?? r.raw).slice(0, 400)}`);
    }
    console.log(`  ${items.length} location(s):`);
    for (const it of items) {
      const L = it.location ?? it;
      const id = L.location_id;
      const known = KNOWN.has(id) ? `tracked as "${KNOWN.get(id)}"` : "*** NOT in agents/brightlocal.mjs ***";
      const addr = [L.address1, L.city, L.region, L.postcode].filter(Boolean).join(", ");
      console.log(`  - ${id}  ${L.business_name ?? L.name ?? "?"}  ${addr}   ${known}`);
    }
    // Only meaningful when the query actually returned something.
    if (items.length) {
      const seen = new Set(items.map(i => (i.location ?? i).location_id));
      for (const [id, nm] of KNOWN) {
        if (!seen.has(id)) console.log(`  !! ${nm} (${id}) is hardcoded in the agent but NOT returned by BrightLocal`);
      }
    }
  }
}

// ── The exact NAP each campaign would publish ───────────────────────────────
// This is the part that actually matters before buying credits. A Citation
// Builder run pushes a location's Name/Address/Phone out across the directory
// network, and directory listings are far harder to retract than a page edit.
// On 2026-08-24 Phillip retired 2120 16th Ave S, Ste 302 and (205) 991-2882
// from customer-facing use, so a campaign still holding that NAP would publish
// a decision that was deliberately reversed.
//
// find_locations returns the ids but its address fields did not match the names
// guessed here (they printed blank), so get_location is used and the RAW object
// is dumped — reading the real field names off the wire beats guessing them.
console.log("\n=== NAP STORED PER LOCATION (what a Citation Builder run would publish) ===");
{
  const RETIRED = [/2120\s*16th/i, /991[-\s]?2882/];
  for (const id of [4068335, 4068730, 4068729, 4130578]) {
    const r = await call(shdrs, "get_location", { location_id: id });
    if (r.error) { console.log(`  ${id}: ERROR — ${r.error}`); continue; }
    const raw = JSON.stringify(r.data ?? r.text ?? r.raw);
    const hits = RETIRED.filter(re => re.test(raw)).map(re => String(re));
    console.log(`  --- location ${id} ---`);
    console.log(`  ${raw.slice(0, 900)}`);
    if (hits.length) {
      console.log(`  *** CONTAINS RETIRED NAP (${hits.join(", ")}) — do NOT run this campaign without a decision ***`);
    }
  }
}

// ── Which URL has BrightLocal been auditing? ────────────────────────────────
// On 2026-08-27 BrightLocal reported a website health score of 36.4/100 with
// "every page missing title tags, meta descriptions, canonical tags and the
// viewport tag". That is false: the live pages carry all four (verified against
// https://www.envirocarellc.com/huntsville, HTTP 200, and against 161/161
// prerendered pages in .next).
//
// The likeliest explanation is the one AGENTS.md already documents costing this
// project months: an audit pointed at the wrong host. A *.vercel.app preview
// sits behind Vercel Authentication, so a crawler fetches a login page — which
// genuinely has no title, description, canonical or viewport. So: print the URL
// each location actually stores, because that is what gets crawled.
console.log("\n=== WEBSITE URL STORED PER LOCATION (this is what BrightLocal audits) ===");
{
  const GOOD = /^https?:\/\/(www\.)?envirocarellc\.com\/?$/i;
  for (const id of [4068335, 4068730, 4068729, 4130578]) {
    const r = await call(shdrs, "get_location", { location_id: id });
    if (r.error) { console.log(`  ${id}: ERROR — ${r.error}`); continue; }
    const obj = r.data ?? {};
    // Field name is not documented here — collect every key that looks like a URL
    // rather than guessing one and reporting a false "missing".
    const found = [];
    (function walk(o, path = "") {
      if (o && typeof o === "object") {
        for (const [k, v] of Object.entries(o)) {
          if (typeof v === "string" && /^https?:\/\//i.test(v) && /url|site|web/i.test(k)) found.push([`${path}${k}`, v]);
          else if (v && typeof v === "object") walk(v, `${path}${k}.`);
        }
      }
    })(obj);
    if (!found.length) { console.log(`  ${id}: no URL-like field found (not proof of absence — raw keys: ${Object.keys(obj).slice(0, 12).join(", ")})`); continue; }
    for (const [k, v] of found) {
      const verdict = GOOD.test(v) ? "OK" : (/vercel\.app/i.test(v) ? "*** VERCEL PREVIEW — behind auth, crawls as a login page ***" : "check");
      console.log(`  ${id}  ${k} = ${v}   ${verdict}`);
    }
  }
}

console.log("\nRead-only: nothing was ordered, spent, or modified.");
