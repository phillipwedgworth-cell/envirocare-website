/**
 * Approval Console — live, Supabase-backed "Needs Your Approval" you tap through on phone/tablet.
 * Gate: /approve?k=$APPROVE_KEY   (set APPROVE_KEY in Vercel; page fails closed if unset/mismatched)
 * Server component, force-dynamic. DECISION CAPTURE ONLY — it never ships anything itself.
 * A separate executor polls status='approved', does the work, then sets 'shipped' or 'failed'.
 * 'failed' rows resurface at the top in red so a broken downstream step is loud, not silent.
 */
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import QueueClient, { type QueueItem } from './QueueClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  alternates: { canonical: '/approve' },
  title: 'Approve — EnviroCare',
  description: 'Approval console',
  robots: { index: false, follow: false },
};

const GATE = process.env.APPROVE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

function Shell({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f1720', color: '#e8edf2',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      padding: '20px 14px 60px', maxWidth: 720, margin: '0 auto' }}>
      {children}
    </div>
  );
}

export default async function ApprovePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const k = typeof sp.k === 'string' ? sp.k : '';

  if (!GATE) {
    return <Shell><h1 style={{ fontSize: 20 }}>Approval console not configured</h1>
      <p style={{ color: '#9fb0c0' }}>Set <code>APPROVE_KEY</code> in Vercel to enable this page.</p></Shell>;
  }
  if (k !== GATE) {
    return <Shell><h1 style={{ fontSize: 20 }}>🔒 Locked</h1>
      <p style={{ color: '#9fb0c0' }}>Append <code>?k=YOUR_APPROVE_KEY</code> to the URL.</p></Shell>;
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return <Shell><h1 style={{ fontSize: 20 }}>Database not configured</h1>
      <p style={{ color: '#9fb0c0' }}>Missing <code>SUPABASE_URL</code> / service key in Vercel.</p></Shell>;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data, error } = await supabase
    .from('approval_queue')
    .select('id, agent, kind, title, summary, link, priority, status, error, created_at')
    .in('status', ['pending', 'failed'])
    .limit(200);

  const rows = (data ?? []) as QueueItem[];
  // failed first (loud), then by priority desc, then oldest first.
  rows.sort((a, b) => {
    if ((a.status === 'failed') !== (b.status === 'failed')) return a.status === 'failed' ? -1 : 1;
    if ((b.priority ?? 0) !== (a.priority ?? 0)) return (b.priority ?? 0) - (a.priority ?? 0);
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <h1 style={{ fontSize: 22, margin: 0 }}>Needs Your Approval</h1>
        <span style={{ color: '#1FAE5A', fontWeight: 700, fontSize: 14 }}>{rows.length} open</span>
      </div>
      <p style={{ color: '#7d8ea0', fontSize: 12, margin: '0 0 18px' }}>
        Live from Supabase. Tap a decision — an executor ships approved items separately.
      </p>
      {error
        ? <p style={{ color: '#ff6b6b' }}>Error loading queue: {error.message}</p>
        : <QueueClient initialItems={rows} apiKey={k} />}
    </Shell>
  );
}
