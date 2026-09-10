// Path: app/api/collections/send-batch-text/route.ts  (NEW FILE)
//
// Sends a batch of collections text messages through Captivated on Sabrena's
// behalf, from Vercel.
//
// NOTE ON WHY IT LIVES HERE. An earlier draft of this comment said Captivated's
// domain is "blocked by org network policy" from the automation sandbox and the
// local device shell, and that Vercel was the only place that could reach it.
// That is not so: api.captivated.works was reached from that same local shell on
// 2026-09-10 (401 unauthenticated, 200 on /tags and /contacts with the key).
// Vercel may still be the right home — it is where the key already lives and
// where a staff-triggered route belongs — but reachability is not the reason.
//
// This route has NO access to the local Collections workbook. Its data
// comes from Supabase (collections_call_list, collections_do_not_contact),
// which build_collections.py refreshes every weekday morning. If those
// tables are stale, this route is stale too — check collections_snapshots.
//
// SAFETY
//   - Every recipient is checked against collections_do_not_contact before
//     anything is sent. An account with no_text = true is silently dropped,
//     never sent to, and reported back as skipped.
//   - A send-cadence guard blocks re-texting the same account within
//     TEXT_COOLDOWN_DAYS, using collections_text_log — prevents duplicate
//     sends if Sabrena queues the same account twice.
//   - Requires a shared secret (COLLECTIONS_ROUTE_KEY) in the request —
//     this is a staff tool, not a public endpoint. Same pattern as this
//     repo's other admin routes (APPROVE_KEY, COMMAND_CENTER_KEY).
//
// REQUEST BODY
//   {
//     "key": "<COLLECTIONS_ROUTE_KEY>",
//     "queued_by": "Sabrena",
//     "entries": [
//       { "account": "232-00001496", "template_key": "past_due_30" },
//       { "account": "232-00126437", "template_key": "past_due_60" }
//     ]
//   }
//
// TEMPLATES are defined below, not user-supplied free text — this keeps
// every send auditable and consistent with EnviroCare's collections policy.
// Add a template here, then reference its key from the workbook's Call List
// "Template" column (once that column exists).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cleanEnv } from "@/lib/env-url";

export const dynamic = "force-dynamic";

const TEXT_COOLDOWN_DAYS = 7;

// {account} and {balance} are substituted per recipient. Keep these short —
// SMS, not email. Edit wording here; nothing else needs to change to update
// what customers receive.
const TEMPLATES: Record<string, (balance: string) => string> = {
  past_due_30: (balance) =>
    `Hi, this is EnviroCare Pest Services. Your account has a past-due balance of ${balance}. ` +
    `Please call (205) 940-6360 or reply to this text to take care of it. Thank you.`,
  past_due_60: (balance) =>
    `EnviroCare: Your account is over 60 days past due (${balance}). Please contact us today at ` +
    `(205) 940-6360 to avoid further action on your account.`,
  autopay_declined: (balance) =>
    `EnviroCare: Your autopay draft did not go through (balance ${balance}). Please call ` +
    `(205) 940-6360 or reply with an updated card to keep your service active.`,
  need_valid_cc: (balance) =>
    `EnviroCare: We're unable to process your payment (balance ${balance}) -- no valid card ` +
    `is on file. Please call (205) 940-6360 or reply with an updated card to avoid a lapse in service.`,
  cc_expired: (balance) =>
    `EnviroCare: The card on file for your account has expired (balance ${balance}). Please call ` +
    `(205) 940-6360 or reply with an updated card to keep your service active.`,
  need_ach_installments: (balance) =>
    `EnviroCare: To keep your monthly installment plan active (balance ${balance}), we need bank ` +
    `draft (ACH) information on file -- installments can't be paid by card. Please call (205) 940-6360 to add your bank account.`,
};

function getSupabase() {
  const url = cleanEnv("SUPABASE_URL");
  const key = cleanEnv("SUPABASE_SERVICE_ROLE_KEY") || cleanEnv("SUPABASE_KEY");
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  const routeKey = cleanEnv("COLLECTIONS_ROUTE_KEY");
  const captivatedKey = cleanEnv("CAPTIVATED_API");
  const supabase = getSupabase();

  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }
  if (!captivatedKey) {
    return NextResponse.json({ ok: false, error: "CAPTIVATED_API not configured" }, { status: 500 });
  }

  let body: {
    key?: string;
    queued_by?: string;
    entries?: { account: string; template_key: string }[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!routeKey || body.key !== routeKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!Array.isArray(body.entries) || body.entries.length === 0) {
    return NextResponse.json({ ok: false, error: "entries[] required" }, { status: 400 });
  }

  const accounts = body.entries.map((e) => e.account);

  // Pull current contact info for exactly these accounts.
  const { data: callListRows, error: clErr } = await supabase
    .from("collections_call_list")
    .select("account, customer, phone, balance")
    .in("account", accounts);
  if (clErr) {
    return NextResponse.json({ ok: false, error: `collections_call_list: ${clErr.message}` }, { status: 500 });
  }
  const byAccount = new Map((callListRows ?? []).map((r) => [r.account, r]));

  // Do Not Contact check.
  const { data: dncRows, error: dncErr } = await supabase
    .from("collections_do_not_contact")
    .select("account, no_text")
    .in("account", accounts);
  if (dncErr) {
    return NextResponse.json({ ok: false, error: `collections_do_not_contact: ${dncErr.message}` }, { status: 500 });
  }
  const doNotText = new Set((dncRows ?? []).filter((r) => r.no_text).map((r) => r.account));

  // AN EMPTY DO-NOT-CONTACT TABLE IS A REFUSAL, NOT A CLEAN BILL.
  //
  // Measured 2026-09-10: collections_call_list held 192 accounts and
  // collections_do_not_contact held ZERO rows — while 26 customers carried a
  // Fieldster note reading "COLLECTIONS DO NOT CALL" / "HAS BEEN SENT TO
  // COLLECTIONS. DO NOT CALL.", and 25 of those 26 were sitting on that very
  // call list, all with a phone number. Nothing populated the table, so the
  // check above passed all 25 through. One queued batch and every one of them
  // gets a collections text.
  //
  // Empty means BOTH "nobody is flagged" and "the sync has never run", and this
  // route cannot tell them apart. So it refuses. Populate the table with
  // `npm run captivated:suppress`, which writes it from Fieldster notes.
  const { count: dncTotal, error: dncCountErr } = await supabase
    .from("collections_do_not_contact")
    .select("account", { count: "exact", head: true });
  if (dncCountErr) {
    return NextResponse.json(
      { ok: false, error: `collections_do_not_contact count: ${dncCountErr.message}` },
      { status: 500 }
    );
  }
  if (!dncTotal) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Refusing to send: collections_do_not_contact is empty. That cannot be told apart " +
          "from a sync that never ran, and 25 of the accounts on the current call list are " +
          "marked do-not-call in Fieldster. Run `npm run captivated:suppress` first.",
      },
      { status: 409 }
    );
  }

  // Cadence guard: anyone texted in the last TEXT_COOLDOWN_DAYS is skipped.
  const cutoff = new Date(Date.now() - TEXT_COOLDOWN_DAYS * 86400_000).toISOString();
  const { data: recentSends, error: logErr } = await supabase
    .from("collections_text_log")
    .select("account")
    .in("account", accounts)
    .gte("created_at", cutoff)
    .eq("status", "sent");
  if (logErr) {
    return NextResponse.json({ ok: false, error: `collections_text_log: ${logErr.message}` }, { status: 500 });
  }
  const recentlyTexted = new Set((recentSends ?? []).map((r) => r.account));

  const skipped: { account: string; reason: string }[] = [];
  const toSend: { account: string; phone: string; message: string; template_key: string }[] = [];

  for (const entry of body.entries) {
    const row = byAccount.get(entry.account);
    const template = TEMPLATES[entry.template_key];
    if (!row) {
      skipped.push({ account: entry.account, reason: "not found in current call list" });
      continue;
    }
    if (!template) {
      skipped.push({ account: entry.account, reason: `unknown template_key "${entry.template_key}"` });
      continue;
    }
    if (!row.phone) {
      skipped.push({ account: entry.account, reason: "no phone on file" });
      continue;
    }
    if (doNotText.has(entry.account)) {
      skipped.push({ account: entry.account, reason: "on Do Not Contact list" });
      continue;
    }
    if (recentlyTexted.has(entry.account)) {
      skipped.push({ account: entry.account, reason: `texted within last ${TEXT_COOLDOWN_DAYS} days` });
      continue;
    }
    const balance = `$${Number(row.balance ?? 0).toFixed(2)}`;
    toSend.push({
      account: entry.account,
      phone: row.phone,
      message: template(balance),
      template_key: entry.template_key,
    });
  }

  if (toSend.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped });
  }

  // Captivated bulk send. POST /api/command/v1/messages/bulk_create, Bearer auth.
  //
  // HOST IS api., NOT app. — corrected 2026-09-10. This read app.captivated.works,
  // which is not the API: it answers 403 with an S3 <Error><Code>AccessDenied</Code>
  // XML body, i.e. an asset bucket. api.captivated.works answers a proper JSON 401.
  // Posting to app. would have failed every send — res.json() would throw on the
  // XML, captivatedResult would be null, and every row would log status "failed".
  // Safe, but never working.
  //
  // The header comment above also claimed this domain is "blocked by org network
  // policy from ... the local device shell". It is not: api.captivated.works was
  // reached from that shell on 2026-09-10 (401 unauthenticated, 200 on /tags and
  // /contacts with the key). Vercel may still be the right home for this route,
  // but reachability is not the reason.
  const res = await fetch("https://api.captivated.works/api/command/v1/messages/bulk_create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${captivatedKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: toSend.map((s) => ({ to: s.phone, body: s.message })),
    }),
  });

  const captivatedResult = await res.json().catch(() => null);

  // Log every attempted send, success or not, for the audit trail.
  const logRows = toSend.map((s) => ({
    account: s.account,
    phone: s.phone,
    template_key: s.template_key,
    message: s.message,
    captivated_job_id: captivatedResult?.job_id ?? null,
    status: res.ok ? "sent" : "failed",
    queued_by: body.queued_by ?? "unknown",
  }));
  await supabase.from("collections_text_log").insert(logRows);

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: "Captivated bulk_create failed", detail: captivatedResult, skipped },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    sent: toSend.length,
    skipped,
    captivated_job_id: captivatedResult?.job_id ?? null,
  });
}
