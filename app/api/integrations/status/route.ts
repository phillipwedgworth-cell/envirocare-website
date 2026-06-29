// app/api/integrations/status/route.ts
// Read-only integration health: Resend domain verification (incl. the DNS
// records needed — these are destined for public DNS, not secrets) and a
// Supabase connectivity check. Returns NO keys or secret values.

import { NextResponse } from "next/server";
import { envUrl } from "@/lib/env-url";

export const dynamic = "force-dynamic";

async function resendStatus() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { configured: false };
  try {
    const resp = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!resp.ok) return { configured: true, error: `domains list ${resp.status}` };
    const data = await resp.json();
    const domains = (data?.data ?? []).map((d: { id: string; name: string; status: string }) => ({
      name: d.name,
      status: d.status,
      id: d.id,
    }));
    // Pull DNS records for envirocarellc.com when present
    const target = (data?.data ?? []).find((d: { name: string }) => d.name === "envirocarellc.com");
    let records = null;
    if (target) {
      const dr = await fetch(`https://api.resend.com/domains/${target.id}`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      if (dr.ok) {
        const dd = await dr.json();
        records = (dd?.records ?? []).map((r: { record: string; name: string; type: string; value: string; status: string; priority?: number }) => ({
          record: r.record, type: r.type, name: r.name, value: r.value, status: r.status, priority: r.priority ?? null,
        }));
      }
    }
    return { configured: true, domains, envirocarellcRecords: records };
  } catch (e) {
    return { configured: true, error: e instanceof Error ? e.message : String(e) };
  }
}

async function supabaseStatus() {
  const url = envUrl("SUPABASE_URL");
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return { configured: false };
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(url, key);
    const { error, count } = await sb.from("agent_runs").select("*", { count: "exact", head: true });
    if (error) return { configured: true, connected: false, error: error.message };
    return { configured: true, connected: true, agentRunsCount: count ?? null };
  } catch (e) {
    return { configured: true, connected: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function GET() {
  const [resend, supabase] = await Promise.all([resendStatus(), supabaseStatus()]);
  return NextResponse.json({
    resend,
    supabase,
    notion: { configured: !!process.env.NOTION_TOKEN },
    formspree: { configured: !!process.env.FORMSPREE_LEAD_URL },
    notifyFrom: process.env.NOTIFY_FROM ? "set" : "unset (using resend.dev fallback)",
  });
}
