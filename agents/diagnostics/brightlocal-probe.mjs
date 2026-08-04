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

// The endpoint the agent actually uses (JSON-RPC initialize; no session).
try {
  const res = await fetch("https://mcp.brightlocal.com/mcp", {
    method: "POST",
    headers: { "x-api-key": KEY, "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "probe", version: "0" } } }),
    signal: AbortSignal.timeout(20000),
  });
  const body = (await res.text()).slice(0, 300).replace(/\s+/g, " ");
  console.log(`MCP endpoint: HTTP ${res.status} — ${body}`);
} catch (e) {
  console.log(`MCP endpoint: FETCH ERROR — ${e.message}`);
}
