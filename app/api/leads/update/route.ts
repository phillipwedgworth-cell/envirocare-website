// POST /api/leads/update — the Lead Desk records what happened to a lead.
// Header `x-leads-key` must equal LEADS_DESK_KEY. Every change is validated by
// lib/leads/core.ts (booked needs a Fieldster number, lost needs a reason, …)
// and written to lead_events with who made it.
import { NextResponse } from 'next/server';
import { keyMatches, leadsDb } from '@/lib/leads/server';
import { STATUSES, validateStatusChange, type LeadKind, type LeadStatus } from '@/lib/leads/core';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!keyMatches(request.headers.get('x-leads-key'), 'LEADS_DESK_KEY')) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const sb = leadsDb();
  if (!sb) return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 500 });

  let p: Record<string, unknown>;
  try { p = await request.json(); } catch { return NextResponse.json({ ok: false, error: 'body must be JSON' }, { status: 400 }); }

  const id = String(p.id ?? '');
  const status = String(p.status ?? '') as LeadStatus;
  const actor = String(p.actor ?? '').trim().slice(0, 80);
  const fieldsterRef = p.fieldsterRef ? String(p.fieldsterRef).trim().slice(0, 40) : undefined;
  const reason = p.reason ? String(p.reason).trim().slice(0, 200) : undefined;
  const duplicateOf = p.duplicateOf ? String(p.duplicateOf).trim() : undefined;
  const note = p.note ? String(p.note).trim().slice(0, 1000) : undefined;
  const revenue = p.revenue != null && p.revenue !== '' ? Number(p.revenue) : undefined;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false, error: 'bad lead id' }, { status: 400 });
  if (!STATUSES.includes(status)) return NextResponse.json({ ok: false, error: 'bad status' }, { status: 400 });

  const cur = await sb.from('leads').select('id, kind, status, first_contact_at').eq('id', id).maybeSingle();
  if (cur.error) return NextResponse.json({ ok: false, error: cur.error.message }, { status: 500 });
  if (!cur.data) return NextResponse.json({ ok: false, error: 'lead not found' }, { status: 404 });

  const kind = (cur.data.kind ?? 'sales') as LeadKind;
  const from = (cur.data.status ?? 'new') as LeadStatus;
  const problem = validateStatusChange(kind, from, { status, actor, fieldsterRef, reason, duplicateOf, note });
  if (problem) return NextResponse.json({ ok: false, error: problem }, { status: 422 });

  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { status, status_updated_at: now };
  // First human contact is stamped once, by whichever status first leaves 'new'.
  if (!cur.data.first_contact_at && status !== 'new' && status !== 'duplicate') patch.first_contact_at = now;
  if (status === 'booked') { patch.fieldster_ref = fieldsterRef; patch.fieldster_verified_at = null; }
  if (status === 'lost' || status === 'not_a_lead') patch.lost_reason = reason;
  if (status === 'duplicate') patch.duplicate_of = duplicateOf;
  if (revenue != null && Number.isFinite(revenue) && revenue >= 0) patch.outcome_revenue = revenue;

  const up = await sb.from('leads').update(patch).eq('id', id);
  if (up.error) return NextResponse.json({ ok: false, error: up.error.message }, { status: 500 });

  await sb.from('lead_events').insert({
    lead_id: id, actor, event: 'status', from_status: from, to_status: status,
    detail: { fieldsterRef: fieldsterRef ?? null, reason: reason ?? null, duplicateOf: duplicateOf ?? null, note: note ?? null, revenue: revenue ?? null },
  });
  return NextResponse.json({ ok: true, id, status });
}
