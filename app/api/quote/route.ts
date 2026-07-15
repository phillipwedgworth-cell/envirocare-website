// Path: app/api/quote/route.ts  (FULL REPLACEMENT)
//
// What this file does:
// 1. Receives quote/contact form submissions from the website
// 2. Routes lead to the correct office based on ZIP code
// 3. STORES the lead in Supabase  <-- the durable copy; happens FIRST
// 4. EMAILS the lead to Phillip + service@ via Resend
// 5. PUSHES the lead to Fieldster via API (once the endpoint URL is filled in)
//
// WHY THE ORDER CHANGED (Jul 15 2026):
// The previous version emailed the lead and stored nothing. Its header comment
// claimed "email fallback means no lead ever gets dropped" -- but email was the
// ONLY path, so a single Resend failure destroyed the lead permanently, with no
// record that it had ever arrived. Storage now happens before anything that can
// fail. Email is best-effort on top of a lead that is already on disk.
//
// Invariant this file now holds: if the handler returns ok:true, the lead exists
// somewhere durable. If BOTH storage and email fail, the customer is told to call
// instead of getting a silent error.

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cleanEnv } from "@/lib/env-url";

export const dynamic = "force-dynamic";

// A recipient is only added if it's a real-looking address. This is what makes
// the leads list "can't be corrupted": a malformed or invisible-char-poisoned
// NOTIFY_EMAIL contributes nothing instead of failing the whole Resend send.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Lazy init -- constructing Resend at module level throws during `next build`
// when RESEND_API_KEY is absent (e.g. local builds without .env secrets).
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

// Same lazy pattern for Supabase. Returns null (rather than throwing) when the
// env is absent, so a misconfigured deploy degrades to email-only instead of
// 500-ing every submission.
//
// Key preference: service-role first (bypasses RLS, which the leads table has
// enabled), falling back to SUPABASE_KEY. Both names are in use across this repo
// -- app/approve uses SUPABASE_SERVICE_ROLE_KEY, agents/lib/supabase.mjs uses
// SUPABASE_KEY -- so accept either rather than betting on one.
let _supabase: SupabaseClient | null | undefined;
function getSupabase(): SupabaseClient | null {
  if (_supabase !== undefined) return _supabase;
  const url = cleanEnv("SUPABASE_URL");
  const key =
    cleanEnv("SUPABASE_SERVICE_ROLE_KEY") || cleanEnv("SUPABASE_KEY");
  if (!url || !key) {
    _supabase = null;
    return null;
  }
  try {
    _supabase = createClient(url, key, { auth: { persistSession: false } });
  } catch {
    _supabase = null;
  }
  return _supabase;
}

// Lead fields are interpolated into an HTML email. Escape them -- a "<" in a
// customer's notes would otherwise mangle the message body.
function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
// OFFICE ROUTING -- locked NAP from Operations workspace
// ============================================================
type Office = {
  name: string;
  phone: string;
  email: string;
};

const OFFICES: Record<string, Office> = {
  birmingham: {
    name: "Birmingham / Alabaster",
    phone: "(205) 940-6360",
    email: "service@envirocarellc.com",
  },
  lakeMartin: {
    name: "Alex City / Lake Martin",
    phone: "(256) 234-6162",
    email: "service@envirocarellc.com",
  },
  huntsville: {
    name: "Huntsville",
    phone: "(256) 937-7676",
    email: "service@envirocarellc.com",
  },
  auburn: {
    name: "Auburn (routes to Alex City)",
    phone: "(334) 332-3321",
    email: "service@envirocarellc.com",
  },
};

function routeByZip(zip: string): Office {
  const z = parseInt(zip, 10);
  if (Number.isNaN(z)) return OFFICES.birmingham;

  // Huntsville metro
  if (
    (z >= 35741 && z <= 35816) ||
    (z >= 35749 && z <= 35763) ||
    z === 35613 || z === 35671 || z === 35603 || z === 35640
  ) return OFFICES.huntsville;

  // Lake Martin / Tallapoosa
  if (
    z === 35010 || z === 35011 ||
    z === 36853 || z === 36256 || z === 36024
  ) return OFFICES.lakeMartin;

  // Auburn / Opelika
  if (z >= 36830 && z <= 36832) return OFFICES.auburn;

  // Default -> Birmingham
  return OFFICES.birmingham;
}

// ============================================================
// FIELDSTER API PUSH -- fill in when Harris sends docs
// ============================================================
// TODO(Phillip): Once Harris confirms the Fieldster API details,
// fill in these two constants and the request will start working.
// Until then this returns not-ok and the lead still reaches you via
// Supabase + email.

const FIELDSTER_API_URL = ""; // e.g. "https://api.fieldster.com/v1/customers"
const FIELDSTER_AUTH_SCHEME = "Bearer"; // or "X-API-Key" -- confirm with Harris

async function pushToFieldster(lead: Lead): Promise<{ ok: boolean; id?: string; error?: string }> {
  const token = process.env.FIELDSTER_API_TOKEN;

  // Hard guard: don't try if either piece is missing.
  if (!token || !FIELDSTER_API_URL) {
    return { ok: false, error: "Fieldster not configured yet -- Supabase + email active" };
  }

  try {
    const res = await fetch(FIELDSTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${FIELDSTER_AUTH_SCHEME} ${token}`,
      },
      // TODO(Phillip): Adjust field names to match Fieldster's actual schema.
      body: JSON.stringify({
        first_name: lead.firstName,
        last_name: lead.lastName,
        phone: lead.phone,
        email: lead.email,
        address: lead.address,
        zip: lead.zip,
        service_type: lead.serviceType,
        notes: lead.notes,
        source: "website-quote-form",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `Fieldster returned ${res.status}: ${text}` };
    }

    const data = await res.json();
    return { ok: true, id: data.id || data.customer_id || "unknown" };
  } catch (err) {
    return { ok: false, error: `Fieldster fetch failed: ${(err as Error).message}` };
  }
}

// ============================================================
// STORE -- the durable copy. Runs before anything that can fail.
// ============================================================
async function storeLead(
  lead: Lead,
  office: Office,
  raw: unknown
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase not configured" };

  try {
    const { data, error } = await sb
      .from("leads")
      .insert({
        first_name: lead.firstName,
        last_name: lead.lastName,
        phone: lead.phone,
        email: lead.email,
        address: lead.address ?? null,
        zip: lead.zip,
        service_type: lead.serviceType ?? null,
        notes: lead.notes ?? null,
        office: office.name,
        office_phone: office.phone,
        email_status: "pending",
        raw: raw as Record<string, unknown>,
      })
      .select("id")
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

// Record whether the notification actually went out. Best-effort: if this fails
// the lead row still exists, which is the part that matters.
async function markEmailStatus(id: string | undefined, status: string, error?: string) {
  if (!id) return;
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb
      .from("leads")
      .update({ email_status: status, email_error: error ?? null })
      .eq("id", id);
  } catch {
    // swallow -- telemetry must never break the request
  }
}

// ============================================================
// EMAIL NOTIFICATION -- best-effort, on top of a stored lead
// ============================================================
async function emailLead(lead: Lead, office: Office, fieldsterStatus: string, leadId?: string) {
  // Every website lead goes to BOTH Phillip and the service inbox. These are
  // hardcoded as the floor so the lead reaches them no matter what NOTIFY_EMAIL
  // happens to be set to in Vercel; NOTIFY_EMAIL (comma-separated) can ADD more.
  // cleanEnv() strips invisible/BOM chars and EMAIL_RE drops anything that isn't
  // a valid address, so a corrupt NOTIFY_EMAIL can never poison the whole send.
  const baseRecipients = ["phillipwedgworth@gmail.com", "service@envirocarellc.com"];
  const envRecipients = cleanEnv("NOTIFY_EMAIL")
    .split(",").map((s) => s.trim()).filter((s) => EMAIL_RE.test(s));
  const notifyTo = Array.from(new Set([...baseRecipients, ...envRecipients]));
  const notifyFrom = cleanEnv("NOTIFY_FROM") || "leads@envirocarellc.com";

  const subject = `New lead: ${lead.firstName} ${lead.lastName} -> ${office.name}`;
  const html = `
    <h2>New website lead</h2>
    <p><b>Routing:</b> ${esc(office.name)} — ${esc(office.phone)}</p>
    <hr/>
    <p><b>Name:</b> ${esc(lead.firstName)} ${esc(lead.lastName)}</p>
    <p><b>Phone:</b> ${esc(lead.phone)}</p>
    <p><b>Email:</b> ${esc(lead.email) || "(not provided)"}</p>
    <p><b>Address:</b> ${esc(lead.address) || "(not provided)"}</p>
    <p><b>ZIP:</b> ${esc(lead.zip)}</p>
    <p><b>Service:</b> ${esc(lead.serviceType) || "(not specified)"}</p>
    <p><b>Notes:</b> ${esc(lead.notes) || "(none)"}</p>
    <hr/>
    <p><i>Fieldster status: ${esc(fieldsterStatus)}</i></p>
    ${leadId ? `<p><i>Lead ID: ${esc(leadId)}</i></p>` : ""}
  `;

  // Reply-To the customer when they gave us an address, so hitting reply in
  // Outlook goes to them and not to the leads@ robot.
  const replyTo = EMAIL_RE.test(lead.email) ? lead.email : undefined;

  await getResend().emails.send({
    from: notifyFrom,
    to: notifyTo,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}

// ============================================================
// HANDLER
// ============================================================
type Lead = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  zip: string;
  serviceType?: string;
  notes?: string;
};

export async function POST(request: Request) {
  try {
    const raw = await request.json();

    // Normalize the payload. The website quote form (RequestQuoteForm) posts a
    // single `name` plus `plan`/`service`/`message`; older callers post
    // firstName/lastName + serviceType/notes. Accept BOTH so a lead is never
    // dropped on a field-name mismatch (this previously 400'd every quote-form
    // submission because `name` !== `firstName`).
    const fullName = String(raw.name ?? `${raw.firstName ?? ""} ${raw.lastName ?? ""}`).trim();
    const [firstName = "", ...rest] = fullName.split(/\s+/);
    const lastName = rest.join(" ");
    const serviceType = raw.service ?? raw.serviceType ?? "";
    const notes = [raw.plan ? `Plan: ${raw.plan}` : "", raw.message ?? raw.notes ?? ""]
      .filter(Boolean)
      .join(" — ");
    const lead: Lead = {
      firstName,
      lastName,
      phone: raw.phone,
      email: raw.email ?? "",
      address: raw.address,
      zip: raw.zip,
      serviceType,
      notes,
    };

    // Validate the bare minimum
    if (!fullName || !lead.phone || !lead.zip) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, phone, zip)" },
        { status: 400 }
      );
    }

    const office = routeByZip(lead.zip);

    // 1. STORE FIRST. Everything after this point can fail without losing the lead.
    const stored = await storeLead(lead, office, raw);

    // 2. Fieldster (no-op until configured).
    const fieldster = await pushToFieldster(lead);
    const fieldsterStatus = fieldster.ok
      ? `pushed to Fieldster (id ${fieldster.id})`
      : `Fieldster skipped: ${fieldster.error}`;

    // 3. Email. Best-effort -- a failure here must not take the lead down.
    let emailed = false;
    let emailError: string | undefined;
    try {
      await emailLead(lead, office, fieldsterStatus, stored.id);
      emailed = true;
      await markEmailStatus(stored.id, "sent");
    } catch (err) {
      emailError = (err as Error).message;
      await markEmailStatus(stored.id, "failed", emailError);
      // Deliberately not rethrown. The lead is already in Supabase; surfacing a
      // 500 here would tell the customer their submission failed when it didn't.
      console.error("[quote] lead stored but email failed:", emailError, {
        leadId: stored.id,
      });
    }

    // 4. Only a total loss is an error. If NEITHER path held the lead, say so
    //    honestly and give the customer a phone number rather than eating it.
    if (!stored.ok && !emailed) {
      console.error("[quote] LEAD LOST -- store and email both failed", {
        store: stored.error,
        email: emailError,
        zip: lead.zip,
      });
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't submit your request. Please call us at " +
            office.phone +
            " and we'll take care of you right away.",
        },
        { status: 500 }
      );
    }

    if (!stored.ok) {
      // Emailed but not stored -- degraded, still delivered. Worth knowing about.
      console.warn("[quote] lead emailed but NOT stored:", stored.error);
    }

    return NextResponse.json({
      ok: true,
      office: office.name,
      stored: stored.ok,
      emailed,
      fieldster: fieldster.ok,
    });
  } catch (err) {
    console.error("[quote] handler threw:", (err as Error).message);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
