// /lead-desk?key=… — the Lead Coordinator's staff view. Private (LEADS_DESK_KEY),
// noindex, disallowed in robots. Lists every open inquiry with its owner, its
// callback deadline and what is overdue; staff record the outcome here.
import type { Metadata } from 'next';
import { leadsDb } from '@/lib/leads/server';
import { flagsFor, responseMinutes, OPEN_STATUSES, type LeadRow } from '@/lib/leads/core';
import LeadDeskClient, { type DeskLead } from './LeadDeskClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'EnviroCare Lead Desk',
  description: 'Internal lead follow-up',
  robots: { index: false, follow: false },
};

const GATE = process.env.LEADS_DESK_KEY;

export default async function LeadDesk({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const sp = await searchParams;
  if (!GATE || sp?.key !== GATE) {
    return (
      <main style={{ maxWidth: 520, margin: '80px auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 22 }}>EnviroCare Lead Desk</h1>
        <p>Private. Open the link with your access key.</p>
      </main>
    );
  }

  const sb = leadsDb();
  if (!sb) return <main style={{ padding: 16 }}>Supabase is not configured.</main>;

  const since = new Date(Date.now() - 14 * 86_400_000).toISOString();
  const { data, error } = await sb.from('leads')
    .select('id, created_at, received_at, source, first_name, last_name, phone, email, address, zip, office, office_id, kind, customer_type, status, owner, callback_due, first_contact_at, status_updated_at, fieldster_ref, fieldster_verified_at, lost_reason, summary, service_type, notes, source_url, direction, alerts')
    .or(`status.in.(${OPEN_STATUSES.join(',')}),created_at.gte.${since}`)
    .order('callback_due', { ascending: true, nullsFirst: false })
    .limit(300);

  if (error) {
    return (
      <main style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Lead Desk</h1>
        <p>Could not read leads: {error.message}</p>
        <p>If this says a column does not exist, the schema in <code>supabase/lead-coordinator.sql</code> has not been applied yet.</p>
      </main>
    );
  }

  const now = new Date();
  const leads: DeskLead[] = (data ?? []).map((r) => ({
    ...(r as DeskLead),
    flags: flagsFor(r as LeadRow, now),
    responseMin: responseMinutes(r as LeadRow),
  }));

  return <LeadDeskClient leads={leads} deskKey={sp.key!} generatedAt={now.toISOString()} />;
}
