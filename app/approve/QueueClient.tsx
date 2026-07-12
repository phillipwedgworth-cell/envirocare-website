'use client';

import { useState, type CSSProperties } from 'react';

export interface QueueItem {
  id: number;
  agent: string;
  kind: string;
  title: string;
  summary: string | null;
  link: string | null;
  priority: number | null;
  status: string;
  error: string | null;
  created_at: string;
}

type Decision = 'approved' | 'fix' | 'skipped';

function timeAgo(s: string) {
  const m = Math.floor((Date.now() - new Date(s).getTime()) / 60000);
  if (isNaN(m)) return '';
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function QueueClient({ initialItems, apiKey }: { initialItems: QueueItem[]; apiKey: string }) {
  const [items, setItems] = useState<QueueItem[]>(initialItems);
  const [busy, setBusy] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function decide(item: QueueItem, decision: Decision) {
    setErr(null);
    let note: string | undefined;
    if (decision === 'fix') {
      note = window.prompt('What needs fixing? (this note goes to the agent)') || '';
      if (note === '') return; // cancelled
    }
    setBusy(item.id);
    try {
      const res = await fetch('/api/approve', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: item.id, decision, note, k: apiKey }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setItems((prev) => prev.filter((i) => i.id !== item.id)); // remove decided card
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Failed to record decision');
    } finally {
      setBusy(null);
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 12px', color: '#7d8ea0' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
        <div style={{ fontSize: 16 }}>All clear — nothing waiting on you.</div>
      </div>
    );
  }

  const btn = (bg: string): CSSProperties => ({
    flex: 1, padding: '12px 8px', border: 'none', borderRadius: 10, background: bg,
    color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', minHeight: 46,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {err && <div style={{ background: '#3a1414', color: '#ff9a9a', padding: '10px 12px', borderRadius: 8, fontSize: 13 }}>{err}</div>}
      {items.map((it) => {
        const failed = it.status === 'failed';
        return (
          <div key={it.id} style={{
            background: '#18222e', borderRadius: 14, padding: 16,
            border: `1px solid ${failed ? '#b3261e' : '#25313f'}`,
            borderLeft: `5px solid ${failed ? '#ff5c4d' : '#1FAE5A'}`,
            opacity: busy === it.id ? 0.55 : 1, transition: 'opacity .15s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5,
                color: failed ? '#ff8a7d' : '#1FAE5A', fontWeight: 700 }}>
                {failed ? '⚠ FAILED — ' : ''}{it.agent} · {it.kind}
              </span>
              <span style={{ fontSize: 11, color: '#6b7c8e', whiteSpace: 'nowrap' }}>{timeAgo(it.created_at)}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, marginBottom: it.summary ? 6 : 0 }}>{it.title}</div>
            {it.summary && <div style={{ fontSize: 13.5, color: '#b7c4d1', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>{it.summary}</div>}
            {failed && it.error && <div style={{ fontSize: 12.5, color: '#ff9a9a', marginTop: 8 }}>Executor error: {it.error}</div>}
            {it.link && <a href={it.link} target="_blank" rel="noreferrer"
              style={{ display: 'inline-block', marginTop: 8, fontSize: 13, color: '#69b7ff' }}>Preview ↗</a>}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button style={btn('#1FAE5A')} disabled={busy === it.id} onClick={() => decide(it, 'approved')}>Approve</button>
              <button style={btn('#c9821f')} disabled={busy === it.id} onClick={() => decide(it, 'fix')}>Fix it</button>
              <button style={btn('#41505f')} disabled={busy === it.id} onClick={() => decide(it, 'skipped')}>Skip</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
