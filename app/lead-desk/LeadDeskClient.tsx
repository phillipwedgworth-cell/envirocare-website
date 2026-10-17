'use client';
import { useEffect, useMemo, useState } from 'react';
import { LOST_REASONS } from '@/lib/leads/core';

export type DeskLead = {
  id: string; created_at: string; received_at: string | null; source: string | null;
  first_name: string; last_name: string; phone: string; email: string; address: string | null; zip: string;
  office: string | null; office_id: string | null; kind: string | null; customer_type: string | null;
  status: string | null; owner: string | null; callback_due: string | null; first_contact_at: string | null;
  status_updated_at: string | null; fieldster_ref: string | null; fieldster_verified_at: string | null;
  lost_reason: string | null; summary: string | null; service_type: string | null; notes: string | null;
  source_url: string | null; direction: string | null; alerts: string[] | null; flags: string[]; responseMin: number | null;
};

const ct = (s: string | null) => (s ? new Date(s).toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—');
const fmtPhone = (d: string) => (d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d);
const NOT_A_LEAD_REASONS = ['existing customer — service handled', 'billing question handled', 'wrong number / spam', 'vendor / sales call', 'too brief — no callback possible'];

export default function LeadDeskClient({ leads, deskKey, generatedAt }: { leads: DeskLead[]; deskKey: string; generatedAt: string }) {
  const [actor, setActor] = useState('');
  useEffect(() => {
    try { setActor(window.localStorage.getItem('ec:desk-actor') ?? ''); } catch { /* storage blocked */ }
  }, []);
  const [rows, setRows] = useState(leads);
  const [showClosed, setShowClosed] = useState(false);

  const open = useMemo(() => rows.filter((l) => ['new', 'contacted'].includes(l.status ?? 'new')), [rows]);
  const closed = useMemo(() => rows.filter((l) => !['new', 'contacted'].includes(l.status ?? 'new')), [rows]);
  const overdue = open.filter((l) => l.flags.includes('callback overdue')).length;

  function saveActor(v: string) {
    setActor(v);
    try { window.localStorage.setItem('ec:desk-actor', v); } catch { /* storage blocked */ }
  }

  async function update(id: string, body: Record<string, unknown>) {
    if (!actor.trim()) { alertBox('Type your name at the top first — every change records who made it.'); return false; }
    const res = await fetch('/api/leads/update', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-leads-key': deskKey },
      body: JSON.stringify({ id, actor, ...body }),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j.ok) { alertBox(j.error || `Update failed (${res.status})`); return false; }
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: String(body.status), flags: [], fieldster_ref: (body.fieldsterRef as string) ?? r.fieldster_ref, lost_reason: (body.reason as string) ?? r.lost_reason, first_contact_at: r.first_contact_at ?? new Date().toISOString() } : r)));
    return true;
  }

  return (
    <main style={S.main}>
      {/* Staff tool: the customer call bar and chat bubble would cover the lead cards. */}
      <style>{`.mab-bar,.ec-scout-fab{display:none!important}`}</style>
      <header style={S.head}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>Lead Desk</h1>
          <div style={S.muted}>Every inquiry: one owner, a deadline, a verified outcome · loaded {ct(generatedAt)} CT</div>
        </div>
        <label style={S.actor}>Your name
          <input value={actor} onChange={(e) => saveActor(e.target.value)} placeholder="e.g. Rachel" style={S.input} />
        </label>
      </header>

      <div id="desk-toast" style={{ ...S.toast, position: 'sticky', top: 8, zIndex: 5 }} role="status" />
      <section style={S.kpis}>
        <Kpi label="Open" value={open.length} />
        <Kpi label="Overdue" value={overdue} warn={overdue > 0} />
        <Kpi label="Booked (14d)" value={closed.filter((l) => l.status === 'booked').length} />
        <Kpi label="Lost (14d)" value={closed.filter((l) => l.status === 'lost').length} />
      </section>

      {open.length === 0 && <p style={S.muted}>No open inquiries.</p>}
      {open.map((l) => <LeadCard key={l.id} l={l} onUpdate={update} />)}

      <button type="button" onClick={() => setShowClosed((v) => !v)} style={S.link}>
        {showClosed ? 'Hide' : 'Show'} closed in the last 14 days ({closed.length})
      </button>
      {showClosed && closed.map((l) => <LeadCard key={l.id} l={l} onUpdate={update} closed />)}
    </main>
  );
}

function alertBox(msg: string) {
  // No browser alert(): it blocks automation and is easy to miss on phones.
  const el = document.getElementById('desk-toast');
  if (el) { el.textContent = msg; el.style.display = 'block'; setTimeout(() => { el.style.display = 'none'; }, 6000); }
}

function Kpi({ label, value, warn }: { label: string; value: number; warn?: boolean }) {
  return (
    <div style={{ ...S.kpi, borderColor: warn ? '#B4231F' : '#E4E0D4' }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: warn ? '#B4231F' : '#0E1A0F' }}>{value}</div>
      <div style={S.muted}>{label}</div>
    </div>
  );
}

function LeadCard({ l, onUpdate, closed }: { l: DeskLead; onUpdate: (id: string, b: Record<string, unknown>) => Promise<boolean>; closed?: boolean }) {
  const [mode, setMode] = useState<'' | 'booked' | 'lost' | 'not_a_lead'>('');
  const [ref, setRef] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const name = `${l.first_name} ${l.last_name}`.trim() || 'Unknown caller';
  const sales = (l.kind ?? 'sales') === 'sales';
  // 'other' is mostly "call too brief — please call back": it can still become a booking.
  const canBook = sales || l.kind === 'other';

  async function go(body: Record<string, unknown>) {
    setBusy(true);
    const ok = await onUpdate(l.id, body);
    setBusy(false);
    if (ok) setMode('');
  }

  return (
    <article style={{ ...S.card, borderLeftColor: l.flags.includes('callback overdue') ? '#B4231F' : l.flags.length ? '#F5A800' : '#0E8E40' }}>
      <div style={S.row}>
        <strong style={{ fontSize: 16 }}>{name}</strong>
        <span style={S.badge}>{l.kind ?? '—'} · {l.customer_type ?? '—'} · {l.source ?? 'web'}{l.direction === 'outbound' ? ' · campaign call' : ''}</span>
        <span style={S.badge}>{l.status ?? 'new'}</span>
      </div>
      <div style={S.row}>
        <a href={`tel:${l.phone}`} style={S.phone}>{fmtPhone(l.phone)}</a>
        <span style={S.muted}>{l.office ?? 'Unrouted'} · owner: <b>{l.owner ?? 'NONE'}</b></span>
      </div>
      <div style={S.muted}>Received {ct(l.received_at ?? l.created_at)} · due {ct(l.callback_due)}{l.responseMin != null ? ` · first contact after ${l.responseMin} min` : ''}</div>
      {(l.summary || l.service_type || l.notes) && <p style={S.summary}>{l.summary || l.service_type}{l.notes ? ` — ${l.notes}` : ''}</p>}
      {l.address && <div style={S.muted}>{l.address}{l.zip ? ` ${l.zip}` : ''}</div>}
      {l.flags.length > 0 && <div style={S.flags}>⚠ {l.flags.join(' · ')}</div>}
      {(l.alerts ?? []).map((a) => <div key={a} style={S.alert}>🔔 {a}</div>)}
      {l.fieldster_ref && <div style={S.muted}>Fieldster #{l.fieldster_ref} {l.fieldster_verified_at ? '✓ verified' : '(not yet verified)'}</div>}
      {l.lost_reason && <div style={S.muted}>Reason: {l.lost_reason}</div>}
      {l.source_url && <a href={l.source_url} target="_blank" rel="noreferrer" style={S.small}>Open call in Sameday →</a>}

      {!closed && (
        <div style={S.actions}>
          {l.status !== 'contacted' && <button disabled={busy} style={S.btn} onClick={() => go({ status: 'contacted' })}>Contacted</button>}
          {canBook && <button disabled={busy} style={S.btnPrimary} onClick={() => setMode('booked')}>Booked…</button>}
          {canBook && <button disabled={busy} style={S.btn} onClick={() => setMode('lost')}>Lost…</button>}
          {!sales && <button disabled={busy} style={S.btnPrimary} onClick={() => go({ status: 'resolved' })}>Resolved</button>}
          <button disabled={busy} style={S.btn} onClick={() => setMode('not_a_lead')}>Not a lead…</button>
        </div>
      )}
      {closed && l.status === 'booked' && (
        <div style={S.actions}><button disabled={busy} style={S.btn} onClick={() => setMode('lost')}>Cancelled → lost…</button></div>
      )}

      {mode === 'booked' && (
        <div style={S.form}>
          <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Fieldster appointment / job #" style={S.input} />
          <button disabled={busy || ref.trim().length < 3} style={S.btnPrimary} onClick={() => go({ status: 'booked', fieldsterRef: ref })}>Save booked</button>
        </div>
      )}
      {(mode === 'lost' || mode === 'not_a_lead') && (
        <div style={S.form}>
          <select value={reason} onChange={(e) => setReason(e.target.value)} style={S.input}>
            <option value="">Reason…</option>
            {(mode === 'lost' ? [...LOST_REASONS] : NOT_A_LEAD_REASONS).map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <button disabled={busy || !reason} style={S.btnPrimary} onClick={() => go({ status: mode, reason })}>Save</button>
        </div>
      )}
    </article>
  );
}

const S: Record<string, React.CSSProperties> = {
  main: { maxWidth: 820, margin: '0 auto', padding: '20px 16px 60px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0E1A0F', background: '#FEFDF8', minHeight: '100vh' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap', marginBottom: 16 },
  actor: { display: 'flex', flexDirection: 'column', fontSize: 13, fontWeight: 600, gap: 4 },
  kpis: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10, marginBottom: 18 },
  kpi: { background: '#fff', border: '1.5px solid', borderRadius: 12, padding: '10px 14px' },
  card: { background: '#fff', border: '1px solid #E4E0D4', borderLeft: '5px solid', borderRadius: 12, padding: 14, marginBottom: 12, display: 'grid', gap: 6 },
  row: { display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' },
  badge: { fontSize: 12, background: '#F1EEE4', borderRadius: 999, padding: '3px 10px' },
  phone: { fontSize: 17, fontWeight: 700, color: '#0E8E40', textDecoration: 'none', minHeight: 44, display: 'inline-flex', alignItems: 'center' },
  muted: { fontSize: 13, color: '#5b6f60' },
  small: { fontSize: 13, color: '#0E8E40' },
  summary: { fontSize: 14, lineHeight: 1.5, margin: '4px 0', color: '#374151' },
  flags: { fontSize: 13, fontWeight: 700, color: '#B4231F' },
  actions: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 },
  form: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  btn: { minHeight: 44, padding: '0 16px', borderRadius: 999, border: '1.5px solid #E4E0D4', background: '#fff', fontWeight: 600, cursor: 'pointer' },
  btnPrimary: { minHeight: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: '#0E8E40', color: '#fff', fontWeight: 700, cursor: 'pointer' },
  input: { minHeight: 44, padding: '0 12px', borderRadius: 10, border: '1px solid #E4E0D4', fontSize: 15, background: '#fff' },
  link: { background: 'none', border: 'none', color: '#0E8E40', fontWeight: 700, padding: '12px 0', cursor: 'pointer', minHeight: 44 },
  alert: { fontSize: 13, fontWeight: 600, color: '#7A4B00', background: '#FFF6E0', borderRadius: 8, padding: '6px 10px' },
  toast: { display: 'none', fontSize: 13, background: '#FDECEA', color: '#B4231F', borderRadius: 8, padding: '8px 10px' },
};
