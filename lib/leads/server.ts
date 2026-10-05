// lib/leads/server.ts — server-only helpers for the Lead Coordinator routes.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { timingSafeEqual } from 'node:crypto';
import { officeForZip, isInServiceArea, OFFICES as OFFICE_BY_ID } from '@/data/zip-to-office';
import { CITY_OFFICE } from '@/data/city-offices';
import { ownerFor } from '@/data/lead-owners';
import {
  alertsFor, autoOutcome, callbackDue, classifyInquiry, isSamedayCallEmail, parseSamedayEmail,
  type LeadKind,
} from '@/lib/leads/core';

const clean = (k: string) => (process.env[k] ?? '').trim();

let _sb: SupabaseClient | null | undefined;
export function leadsDb(): SupabaseClient | null {
  if (_sb !== undefined) return _sb;
  const url = clean('SUPABASE_URL');
  const key = clean('SUPABASE_SERVICE_ROLE_KEY') || clean('SUPABASE_KEY');
  _sb = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return _sb;
}

// Constant-time key check. An unset env key means the door is CLOSED, never open.
export function keyMatches(given: string | null | undefined, envName: string): boolean {
  const want = clean(envName);
  if (!want || !given) return false;
  const a = Buffer.from(String(given));
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

// ZIP first (data/zip-to-office.ts). Sameday addresses often have no ZIP, so fall
// back to a city name that matches a city-page slug (data/city-offices.ts).
// Anything else is 'unrouted' and goes to the main office to triage — never guessed.
export function routeOffice(zip: string, address = ''): { officeId: string; officeName: string; officePhone: string } {
  if (zip && isInServiceArea(zip)) {
    const o = officeForZip(zip);
    return { officeId: o.id, officeName: o.name, officePhone: o.phone };
  }
  const slugText = address.toLowerCase().replace(/[^a-z\s-]/g, ' ').replace(/\s+/g, ' ');
  const slugs = Object.keys(CITY_OFFICE).sort((a, b) => b.length - a.length);
  const hit = slugs.find((s) => new RegExp(`(^| )${s.replace(/-/g, ' ')}( |$)`).test(slugText));
  if (hit) {
    const o = OFFICE_BY_ID[CITY_OFFICE[hit]];
    if (o) return { officeId: o.id, officeName: o.name, officePhone: o.phone };
  }
  return { officeId: 'unrouted', officeName: 'Unrouted (no ZIP or known city)', officePhone: '' };
}

export type IngestResult =
  | { ok: true; id: string; created: boolean; kind: LeadKind; officeId: string; owner: string; due: string }
  | { ok: true; ignored: string }
  | { ok: false; error: string };

// One Sameday notification email -> one lead row. Idempotent on the Sameday
// conversation id, so the relay can safely re-send.
export async function ingestSamedayEmail(input: {
  subject: string; body: string; receivedAt: string; messageId?: string;
}): Promise<IngestResult> {
  if (!isSamedayCallEmail(input.subject, input.body)) return { ok: true, ignored: 'not a Sameday call email' };
  const sb = leadsDb();
  if (!sb) return { ok: false, error: 'Supabase not configured' };

  const call = parseSamedayEmail(input.body);
  const externalId = call.conversationId || (input.messageId ? `gmail:${input.messageId}` : '');
  if (!externalId) return { ok: false, error: 'no Sameday conversation id or message id — cannot de-duplicate' };
  if (!call.phone) return { ok: false, error: 'no phone number in the Sameday email' };

  const existing = await sb.from('leads').select('id, kind, office_id, owner, callback_due')
    .eq('source', 'sameday').eq('external_id', externalId).maybeSingle();
  if (existing.error) return { ok: false, error: existing.error.message };
  if (existing.data) {
    return { ok: true, id: existing.data.id, created: false, kind: existing.data.kind,
      officeId: existing.data.office_id, owner: existing.data.owner, due: existing.data.callback_due };
  }

  const received = new Date(input.receivedAt);
  const receivedAt = isNaN(received.getTime()) ? new Date() : received;
  const kind = classifyInquiry({ customerType: call.customerType, reason: call.callbackReason, summary: call.summary });
  const office = routeOffice(call.zip, call.address);
  const owner = ownerFor(office.officeId, kind);
  const due = callbackDue(receivedAt).toISOString();
  const alerts = alertsFor(call);
  const auto = autoOutcome(call);
  const [firstName = '', ...rest] = (call.customerName || call.callerName).split(/\s+/).filter(Boolean);

  const ins = await sb.from('leads').insert({
    source: 'sameday',
    external_id: externalId,
    received_at: receivedAt.toISOString(),
    first_name: firstName,
    last_name: rest.join(' '),
    phone: call.phone,
    email: call.email,
    address: call.address || null,
    zip: call.zip || '',
    service_type: call.callbackReason || null,
    notes: call.requestedCallback ? `Requested callback: ${call.requestedCallback}` : null,
    summary: call.summary || null,
    source_url: call.conversationUrl || null,
    office: office.officeName,
    office_phone: office.officePhone,
    office_id: office.officeId,
    kind,
    customer_type: call.customerType,
    status: auto ? auto.status : 'new',
    lost_reason: auto ? auto.reason : null,
    direction: call.direction,
    alerts: alerts.length ? alerts : null,
    owner: owner.owner,
    owner_email: owner.email,
    callback_due: due,
    status_updated_at: receivedAt.toISOString(),
    email_status: 'sent',          // Sameday already emailed the office; we did not
    fieldster_status: 'skipped',
    raw: { subject: input.subject, messageId: input.messageId ?? null, samedayStatus: call.samedayStatus, callTime: call.callTimeText, campaign: call.campaign || null, quote: call.quote || null },
  }).select('id').single();
  if (ins.error) return { ok: false, error: ins.error.message };

  await sb.from('lead_events').insert({
    lead_id: ins.data.id, actor: auto ? 'sameday (auto)' : 'lead-coordinator', event: 'created',
    to_status: auto ? auto.status : 'new',
    detail: { source: 'sameday', direction: call.direction, kind, office: office.officeId, owner: owner.owner, callback_due: due, alerts, auto_reason: auto?.reason ?? null },
  });
  return { ok: true, id: ins.data.id, created: true, kind, officeId: office.officeId, owner: owner.owner, due };
}
