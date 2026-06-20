// ─── CLAUDE CODE: NeuronWriter proxy ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/api/nw/route.ts
// Push: main
// ───────────────────────────────────────
//
// Lets Claude sessions call NeuronWriter via web_fetch_vercel_url without adding
// app.neuronwriter.com to the sandbox allowlist. The NEURONWRITER_API_KEY never
// leaves Vercel.
//
//   GET  /api/nw                          → health check (no auth, keySet status)
//   GET  /api/nw?q=/list-queries&secret=… → proxy a NeuronWriter READ (secret required)
//   POST /api/nw   (x-cron-secret header) → full proxy { endpoint, method, payload }
//
// SECURITY:
//   - `q`/`endpoint` MUST be a relative NeuronWriter path (starts with "/", no "://",
//     no ".."). Absolute URLs are rejected so the API key can never be sent to an
//     attacker-controlled host (no SSRF / key exfiltration).
//   - The key is attached server-side via the X-API-KEY header NeuronWriter expects.
//   - Both proxy paths require the CRON_SECRET (query param for GET, header for POST);
//     only the bare health check is unauthenticated.
//
// NeuronWriter base: https://app.neuronwriter.com/neuron-api/0.5
// Project ID (EnviroCare): 9d0bec3a70f4743c

import { NextRequest, NextResponse } from "next/server";

const NW_BASE = "https://app.neuronwriter.com/neuron-api/0.5";
const NW_PROJECT = "9d0bec3a70f4743c";

// Accept only a relative NeuronWriter API path — never an absolute URL.
function isSafePath(p: string): boolean {
  return p.startsWith("/") && !p.includes("://") && !p.includes("..");
}

async function callNW(path: string, method: string, payload: unknown, apiKey: string) {
  const nwRes = await fetch(`${NW_BASE}${path}`, {
    method,
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: method !== "GET" && payload ? JSON.stringify(payload) : undefined,
  });
  const text = await nwRes.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = text; }
  return NextResponse.json({ ok: nwRes.ok, status: nwRes.status, data, project: NW_PROJECT });
}

export async function GET(req: NextRequest) {
  // Strip a leading BOM (U+FEFF) + surrounding whitespace — a BOM in the Vercel
  // env value would otherwise corrupt the X-API-KEY header and 401 every call.
  const apiKey = process.env.NEURONWRITER_API_KEY?.replace(/^\uFEFF/, "").trim();
  const q = req.nextUrl.searchParams.get("q");

  // Health check — no q
  if (!q) {
    return NextResponse.json({
      route: "/api/nw",
      project: NW_PROJECT,
      keySet: !!apiKey,
      status: "ready",
      usage: "GET /api/nw?q=/list-queries&secret=<CRON_SECRET>",
    });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret || req.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!apiKey) {
    return NextResponse.json({ error: "NEURONWRITER_API_KEY not set" }, { status: 500 });
  }
  if (!isSafePath(q)) {
    return NextResponse.json({ error: "Invalid endpoint — relative NeuronWriter path required" }, { status: 400 });
  }

  try {
    return await callNW(q, "GET", null, apiKey);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("x-cron-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Strip a leading BOM (U+FEFF) + surrounding whitespace — a BOM in the Vercel
  // env value would otherwise corrupt the X-API-KEY header and 401 every call.
  const apiKey = process.env.NEURONWRITER_API_KEY?.replace(/^\uFEFF/, "").trim();
  if (!apiKey) {
    return NextResponse.json({ error: "NEURONWRITER_API_KEY not set" }, { status: 500 });
  }

  let body: { endpoint?: string; method?: string; payload?: unknown } = {};
  try { body = await req.json(); } catch { /* empty body OK */ }

  const endpoint = body.endpoint ?? "/list-queries";
  if (!isSafePath(endpoint)) {
    return NextResponse.json({ error: "Invalid endpoint — relative NeuronWriter path required" }, { status: 400 });
  }
  const method = (body.method ?? "POST").toUpperCase();

  try {
    return await callNW(endpoint, method, body.payload, apiKey);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
