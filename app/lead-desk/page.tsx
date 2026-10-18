// /lead-desk — the Lead Coordinator's staff view. Private (LEADS_DESK_KEY, entered
// once in a sign-in form; the session is an httpOnly cookie — the key never goes
// in a URL, see app/api/leads/desk-login),
// noindex, disallowed in robots. Lists every open inquiry with its owner, its
// callback deadline and what is overdue; staff record the outcome here.
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { DESK_COOKIE, deskSessionOk, leadsDb } from '@/lib/leads/server';
import { flagsFor, responseMinutes, OPEN_STATUSES, type LeadRow } from '@/lib/leads/core';
import LeadDeskClient, { type DeskLead } from './LeadDeskClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'EnviroCare Lead Desk',
  description: 'Internal lead follow-up',
  robots: { index: false, follow: false },
};

const box = { maxWidth: 520, margin: '80px auto', padding: 16, fontFamily: 'system-ui, sans-serif' } as const;

export default async function LeadDesk({ searchParams }: { searchParams: Promise<{ error?: string; key?: string }> }) {
  const sp = await searchParams;
  const jar = await cookies();
  if (!deskSessionOk(jar.get(DESK_COOKIE)?.value)) {
    return (
      <main style={box}>
        <h1 style={{ fontSize: 22 }}>EnviroCare Lead Desk</h1>
        <p>Private. Enter the desk access key.</p>
        {sp?.error && <p style={{ color: '#b00020' }}>That key did not match.</p>}
        {sp?.key && <p style={{ color: '#b00020' }}>Access keys in links are no longer accepted. Type the key below, then update your bookmark to the plain /lead-desk address.</p>}
        <form method="post" action="/api/leads/desk-login" style={{ display: 'flex', gap: 8 }}>
          <input name="key" type="password" autoComplete="current-password" required aria-label="Access key"
            style={{ flex: 1, padding: '8px 10px', fontSize: 16 }} />
          <button type="submit" style={{ padding: '8px 14px', fontSize: 16 }}>Sign in</button>
        </form>
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

  return <LeadDeskClient leads={leads} generatedAt={now.toISOString()} />;
}
