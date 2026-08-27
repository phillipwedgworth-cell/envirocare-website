// agents/diagnostics/brightlocal-probe.mjs
// Answers ONE question: is BRIGHTLOCAL_API_KEY itself valid, or is the
// mcp.brightlocal.com endpoint (which agents/brightlocal.mjs talks to) the
// thing that's broken? The 2026-08-04 renewed key still came back
// INVALID_API_KEY through the MCP endpoint — this hits the plain Manage REST
// API with the same key so the two failure modes can be told apart.
// Prints HTTP statuses and body snippets only — NEVER the key.
const KEY = (process.env.BRIGHTLOCAL_API_KEY || "").trim();
if (!KEY) { console.error("BRIGHTLOCAL_API_KEY not set"); process.exit(1); }
console.log(`key present: length ${KEY.length}`);

const targets = [
  { name: "Manage REST (x-api-key)", url: "https://api.brightlocal.com/manage/v1/locations?num_per_page=1" },
  { name: "Manage REST clients",     url: "https://api.brightlocal.com/manage/v1/clients?num_per_page=1" },
];

for (const t of targets) {
  try {
    const res = await fetch(t.url, { headers: { "x-api-key": KEY }, signal: AbortSignal.timeout(20000) });
    const body = (await res.text()).slice(0, 200).replace(/\s+/g, " ");
    console.log(`${t.name}: HTTP ${res.status} — ${body}`);
  } catch (e) {
    console.log(`${t.name}: FETCH ERROR — ${e.message}`);
  }
}

// Full MCP session both ways: query-param auth (what agents/brightlocal.mjs
// does today) vs x-api-key header auth (what the working local MCP config uses).
async function mcpSession(label, url, extraHeaders) {
  const hdrs = { "content-type": "application/json", accept: "application/json, text/event-stream", ...extraHeaders };
  try {
    const init = await fetch(url, {
      method: "POST", headers: hdrs,
      body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "probe", version: "0" } } }),
      signal: AbortSignal.timeout(20000),
    });
    const sid = init.headers.get("mcp-session-id");
    const ibody = (await init.text()).slice(0, 120).replace(/\s+/g, " ");
    console.log(`${label} init: HTTP ${init.status}, session=${sid ? "YES" : "NO"} — ${ibody}`);
    if (!sid) return;
    const shdrs = { ...hdrs, "Mcp-Session-Id": sid };
    await fetch(url, { method: "POST", headers: shdrs, body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }), signal: AbortSignal.timeout(20000) });
    const call = await fetch(url, {
      method: "POST", headers: shdrs,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "find_locations", arguments: { num_per_page: 1 } } }),
      signal: AbortSignal.timeout(30000),
    });
    const cbody = (await call.text()).slice(0, 250).replace(/\s+/g, " ");
    console.log(`${label} tools/call: HTTP ${call.status} — ${cbody}`);
  } catch (e) {
    console.log(`${label}: FETCH ERROR — ${e.message}`);
  }
}

await mcpSession("MCP query-param auth", `https://mcp.brightlocal.com/mcp?api-key=${encodeURIComponent(KEY)}`, {});
await mcpSession("MCP x-api-key header", "https://mcp.brightlocal.com/mcp", { "x-api-key": KEY });

// ── CAPABILITY + CREDIT DISCOVERY (added 2026-08-27) ─────────────────────────
// "Which BrightLocal products are out of credits?" could not be answered from
// this repo: nothing here ever asked. The answer had been carried in chat as an
// assertion, which is exactly the stale-document failure AGENTS.md rule zero
// warns about.
//
// This does NOT guess endpoint names from memory. It asks the server what it
// offers (tools/list is authoritative), then tries a small set of REST paths and
// prints whatever comes back — including the 404s. A 404 here is a RESULT, not a
// failure of the probe: it tells the next reader that path does not exist, so
// nobody re-derives it. Read-only throughout; nothing is spent or ordered.
async function mcpListTools(label, url, extraHeaders) {
  const hdrs = { "content-type": "application/json", accept: "application/json, text/event-stream", ...extraHeaders };
  try {
    const init = await fetch(url, {
      method: "POST", headers: hdrs,
      body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "probe", version: "0" } } }),
      signal: AbortSignal.timeout(20000),
    });
    const sid = init.headers.get("mcp-session-id");
    if (!sid) { console.log(`${label} tools/list: no session (HTTP ${init.status}) — skipped`); return; }
    const shdrs = { ...hdrs, "Mcp-Session-Id": sid };
    await fetch(url, { method: "POST", headers: shdrs, body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }), signal: AbortSignal.timeout(20000) });
    const res = await fetch(url, {
      method: "POST", headers: shdrs,
      body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }),
      signal: AbortSignal.timeout(30000),
    });
    const raw = await res.text();
    // The endpoint may answer as SSE ("data: {...}") or as plain JSON.
    const jsonText = raw.includes('"jsonrpc"') ? raw.slice(raw.indexOf("{", raw.indexOf('"jsonrpc"') - 40)) : raw;
    let tools = null;
    try { tools = JSON.parse(jsonText)?.result?.tools; } catch { /* fall through to raw */ }
    if (!Array.isArray(tools)) {
      console.log(`${label} tools/list: HTTP ${res.status} — unparsed: ${raw.slice(0, 300).replace(/\s+/g, " ")}`);
      return;
    }
    console.log(`${label} tools/list: HTTP ${res.status} — ${tools.length} tool(s) available:`);
    for (const t of tools) {
      console.log(`    - ${t.name}: ${String(t.description ?? "").replace(/\s+/g, " ").slice(0, 110)}`);
    }
    // Call out anything that looks like it reports balance/quota, so the
    // credits question can be answered directly on the next run.
    const money = tools.filter(t => /credit|balance|quota|usage|account|subscription|plan/i.test(`${t.name} ${t.description ?? ""}`));
    console.log(money.length
      ? `    >> credit/account-related tools: ${money.map(t => t.name).join(", ")}`
      : `    >> NONE of the exposed tools reports credits — credits are dashboard-only via this key.`);
  } catch (e) {
    console.log(`${label} tools/list: FETCH ERROR — ${e.message}`);
  }
}

await mcpListTools("MCP query-param auth", `https://mcp.brightlocal.com/mcp?api-key=${encodeURIComponent(KEY)}`, {});
await mcpListTools("MCP x-api-key header", "https://mcp.brightlocal.com/mcp", { "x-api-key": KEY });

console.log("\n-- REST paths that might carry credit/usage info (404 = does not exist, which is useful) --");
for (const path of [
  "manage/v1/account",
  "manage/v1/credits",
  "manage/v1/subscription",
  "v4/credits",
  "seo-tools/api/v4/credits",
]) {
  const url = `https://api.brightlocal.com/${path}`;
  try {
    const res = await fetch(url, { headers: { "x-api-key": KEY }, signal: AbortSignal.timeout(15000) });
    const body = (await res.text()).slice(0, 160).replace(/\s+/g, " ");
    console.log(`  ${path}: HTTP ${res.status} — ${body}`);
  } catch (e) {
    console.log(`  ${path}: FETCH ERROR — ${e.message}`);
  }
}
