// agents/run.mjs — local CLI runner for the full orchestrator
// Usage: node agents/run.mjs
// Loads .env from repo root, calls orchestrator handler with mock req/res

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env from repo root ───────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
try {
  const envLines = readFileSync(resolve(__dir, "../.env"), "utf8").split("\n");
  for (const line of envLines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  console.log("[run] .env loaded from repo root");
} catch {
  console.warn("[run] No .env found — using existing env vars");
}

// ── Mock req/res ──────────────────────────────────────────────────────────
const req = { method: "GET" };
const res = {
  _code: 200,
  status(code) { this._code = code; return this; },
  json(body)  { console.log(`\n[run] Response ${this._code}:`, JSON.stringify(body, null, 2)); },
};

// ── Run ───────────────────────────────────────────────────────────────────
const { default: handler } = await import("./orchestrator.mjs");
await handler(req, res);
