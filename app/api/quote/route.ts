// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/api/quote/route.ts
// Commit: feat(quote): add email fallback + Fieldster push scaffold
// Push: main
// ─────────────────────────────────────
//
// What this file does:
// 1. Receives quote/contact form submissions from the website
// 2. Routes lead to the correct office based on ZIP code
// 3. EMAILS the lead to Phillip via Resend (works TODAY, no config needed beyond RESEND_API_KEY)
// 4. PUSHES the lead to Fieldster via API (works once endpoint URL is filled in below)
//
// Why both: email fallback means no lead ever gets dropped, even if Fieldster
// is down or misconfigured. Belt and suspenders.

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================
// OFFICE ROUTING — locked NAP from Operations workspace
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

  // Default → Birmingham
  return OFFICES.birmingham;
}

// ============================================================
// FIELDSTER API PUSH — fill in when Harris sends docs
// ============================================================
// TODO(Phillip): Once Harris confirms the Fieldster API details,
// fill in these three constants and the request will start working.
// Until then, this function returns null and the lead still
// reaches you via email (see below).

const FIELDSTER_API_URL = ""; // e.g. "https://api.fieldster.com/v1/customers"
const FIELDSTER_AUTH_SCHEME = "Bearer"; // or "X-API-Key" — confirm with Harris

async function pushToFieldster(lead: Lead): Promise<{ ok: boolean; id?: string; error?: string }> {
  const token = process.env.FIELDSTER_API_TOKEN;

  // Hard guard: don't try if either piece is missing.
  if (!token || !FIELDSTER_API_URL) {
    return { ok: false, error: "Fieldster not configured yet — email fallback active" };
  }

  try {
    const res = await fetch(FIELDSTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${FIELDSTER_AUTH_SCHEME} ${token}`,
      },
      // TODO(Phillip): Adjust field names to match Fieldster's actual schema.
      // The names below are guesses based on common CRM conventions.
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
// EMAIL FALLBACK — always runs, regardless of Fieldster status
// ============================================================
async function emailLead(lead: Lead, office: Office, fieldsterStatus: string) {
  const notifyTo = process.env.NOTIFY_EMAIL || "service@envirocarellc.com";
  const notifyFrom = process.env.NOTIFY_FROM || "leads@envirocarellc.com";

  const subject = `New lead: ${lead.firstName} ${lead.lastName} → ${office.name}`;
  const html = `
    <h2>New website lead</h2>
    <p><b>Routing:</b> ${office.name} — ${office.phone}</p>
    <hr/>
    <p><b>Name:</b> ${lead.firstName} ${lead.lastName}</p>
    <p><b>Phone:</b> ${lead.phone}</p>
    <p><b>Email:</b> ${lead.email}</p>
    <p><b>Address:</b> ${lead.address || "(not provided)"}</p>
    <p><b>ZIP:</b> ${lead.zip}</p>
    <p><b>Service:</b> ${lead.serviceType || "(not specified)"}</p>
    <p><b>Notes:</b> ${lead.notes || "(none)"}</p>
    <hr/>
    <p><i>Fieldster status: ${fieldsterStatus}</i></p>
  `;

  await resend.emails.send({
    from: notifyFrom,
    to: notifyTo,
    subject,
    html,
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
    const lead: Lead = await request.json();

    // Validate the bare minimum
    if (!lead.firstName || !lead.phone || !lead.zip) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (firstName, phone, zip)" },
        { status: 400 }
      );
    }

    const office = routeByZip(lead.zip);
    const fieldster = await pushToFieldster(lead);
    const fieldsterStatus = fieldster.ok
      ? `pushed to Fieldster (id ${fieldster.id})`
      : `Fieldster skipped: ${fieldster.error}`;

    // Email always sends. This is the safety net.
    await emailLead(lead, office, fieldsterStatus);

    return NextResponse.json({
      ok: true,
      office: office.name,
      fieldster: fieldster.ok,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
