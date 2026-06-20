// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/api/nw/route.ts
// Commit: feat(api): add NeuronWriter proxy route for agent access
// Push: main
// ─────────────────────────────────────
//
// NeuronWriter proxy — lets Claude sessions call NeuronWriter via web_fetch_vercel_url
// without needing app.neuronwriter.com in the sandbox allowlist.
//
// Auth: CRON_SECRET header required (same pattern as other internal routes).
// The NEURONWRITER_API_KEY never leaves Vercel.
//
// Usage:
//   POST /api/nw
//   Headers: x-cron-secret: <CRON_SECRET>
//   Body: { "endpoint": "/queries/list", "method": "GET", "body": null }
//
// NeuronWriter base: https://app.neuronwriter.com/neuron-api/0.5/
// Project ID (EnviroCare): 9d0bec3a70f4743c

import { NextRequest, NextResponse } from "next/server";

const NW_BASE = "https://app.neuronwriter.com/neuron-api/0.5";
const NW_PROJECT = "9d0bec3a70f4743c";

export async function POST(req: NextRequest) {
  // Auth guard — requires CRON_SECRET header
  const secret = process.env.CRON_SECRET;
  const provided = req.headers.get("x-cron-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.NEURONWRITER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "NEURONWRITER_API_KEY not set" }, { status: 500 });
  }

  let body: { endpoint?: string; method?: string; payload?: unknown } = {};
  try { body = await req.json(); } catch { /* empty body OK */ }

  const endpoint = body.endpoint ?? `/content/list?project=${NW_PROJECT}`;
  const method = (body.method ?? "GET").toUpperCase();
  const url = endpoint.startsWith("http") ? endpoint : `${NW_BASE}${endpoint}`;

  try {
    const nwRes = await fetch(url, {
      method,
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: method !== "GET" && body.payload ? JSON.stringify(body.payload) : undefined,
    });

    const text = await nwRes.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = text; }

    return NextResponse.json({
      ok: nwRes.ok,
      status: nwRes.status,
      data,
      project: NW_PROJECT,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}

// GET — health check (no auth, just confirms route is live)
export async function GET() {
  return NextResponse.json({
    route: "/api/nw",
    project: NW_PROJECT,
    keySet: !!process.env.NEURONWRITER_API_KEY,
    status: "ready",
  });
}
