/**
 * app/command-center/page.tsx
 * Private ops dashboard — gate: ?key=envirocare2026
 * Reads: agent_runs, agent_findings, envirocare_seo
 */

import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EnviroCare Ops',
  description: 'Internal operations dashboard',
  robots: { index: false, follow: false },
};

// ── types ─────────────────────────────────────────────────────────────────────

interface AgentRun {
  agent_name: string;
  status: string;
  output: string;
  created_at: string;
}

interface AgentFinding {
  id?: number;
  agent_name: string;
  category: string;
  severity: string;
  page_url?: string;
  finding: string;
  run_date: string;
}

interface SeoRow {
  location: string;
  solv: number | null;
  arp: number | null;
  review_count: number | null;
  keyword: string | null;
  snapshot_date: string;
}

// ── data fetching ─────────────────────────────────────────────────────────────

async function fetchData() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return null;

  const sb = createClient(url, key);

  const [runsRes, findingsRes, seoRes] = await Promise.all([
    sb
      .from('agent_runs')
      .select('agent_name, status, output, created_at')
      .order('created_at', { ascending: false })
      .limit(60),
    sb
      .from('agent_findings')
      .select('id, agent_name, category, severity, page_url, finding, run_date')
      .order('run_date', { ascending: false })
      .limit(100),
    sb
      .from('envirocare_seo')
      .select('location, solv, arp, review_count, keyword, snapshot_date')
      .order('snapshot_date', { ascending: false })
      .limit(40),
  ]);

  return {
    runs: (runsRes.data ?? []) as AgentRun[],
    findings: (findingsRes.data ?? []) as AgentFinding[],
    seo: (seoRes.data ?? []) as SeoRow[],
    errors: [runsRes.error, findingsRes.error, seoRes.error]
      .filter(Boolean)
      .map((e) => e!.message),
  };
}

// ── helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function latestPerAgent(runs: AgentRun[]): AgentRun[] {
  const map: Record<string, AgentRun> = {};
  for (const r of runs) if (!map[r.agent_name]) map[r.agent_name] = r;
  return Object.values(map);
}

function latestPerLocation(seo: SeoRow[]): SeoRow[] {
  const map: Record<string, SeoRow> = {};
  for (const r of seo) if (!map[r.location]) map[r.location] = r;
  return Object.values(map);
}

function reviewHistory(seo: SeoRow[]): Record<string, { date: string; count: number }[]> {
  const out: Record<string, { date: string; count: number }[]> = {};
  for (const r of [...seo].reverse()) {
    if (r.review_count == null) continue;
    if (!out[r.location]) out[r.location] = [];
    out[r.location].push({ date: r.snapshot_date, count: r.review_count });
  }
  return out;
}

function sevColor(sev: string): string {
  if (sev === 'critical') return '#ef4444';
  if (sev === 'high') return '#f97316';
  if (sev === 'medium') return '#eab308';
  if (sev === 'low') return '#3b82f6';
  return '#6b7280';
}

function statusColor(s: string) {
  return s === 'success' || s === 'ok' ? '#22c55e' : s === 'error' ? '#ef4444' : '#eab308';
}

// ── constants ─────────────────────────────────────────────────────────────────

const KNOWN_LOCATIONS = ['Alabaster', 'Huntsville', 'Alex City'];

const SOLV_TARGETS: Record<string, number> = {
  Alabaster: 65,
  'Alex City': 50,
  Huntsville: 35,
  Auburn: 55,
};

const EXTERNAL_LINKS = [
  {
    group: 'SEO & Local',
    links: [
      { label: 'Local Falcon', href: 'https://app.localfalcon.com', icon: '🦅' },
      { label: 'BrightLocal', href: 'https://dashboard.brightlocal.com', icon: '📍' },
      { label: 'Search Console', href: 'https://search.google.com/search-console', icon: '🔍' },
      { label: 'Google Analytics', href: 'https://analytics.google.com/analytics/web/#/p/G-CELEB90NKX', icon: '📈' },
      { label: 'Google Business', href: 'https://business.google.com', icon: '📌' },
    ],
  },
  {
    group: 'Infrastructure',
    links: [
      { label: 'Vercel', href: 'https://vercel.com/phillipwedgworth-cell/envirocare-website', icon: '▲' },
      { label: 'Supabase', href: 'https://supabase.com/dashboard', icon: '🗄️' },
      { label: 'GitHub', href: 'https://github.com/phillipwedgworth-cell/envirocare-website', icon: '🐙' },
      { label: 'Resend', href: 'https://resend.com/emails', icon: '✉️' },
    ],
  },
  {
    group: 'Site Pages',
    links: [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Pricing', href: '/pricing', icon: '💰' },
      { label: 'Blog', href: '/blog', icon: '📝' },
      { label: 'Services', href: '/services', icon: '🐛' },
      { label: 'Contact', href: '/contact-us', icon: '📞' },
      { label: 'Birmingham', href: '/birmingham', icon: '🏙️' },
      { label: 'Huntsville', href: '/huntsville', icon: '🚀' },
      { label: 'Lake Martin', href: '/lake-martin', icon: '⛵' },
    ],
  },
];

// ── CSS ── (scoped to #cc-root so it doesn't bleed into layout)
const CSS = `
#cc-root {
  background: #0a0f1a;
  color: #e2e8f0;
  font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  min-height: 100vh;
}
#cc-root *, #cc-root *::before, #cc-root *::after { box-sizing: border-box; }
#cc-root a { color: inherit; text-decoration: none; }
.cc-hdr {
  background: linear-gradient(135deg, #0E8E40 0%, #065f29 100%);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  position: sticky;
  top: 0;
  z-index: 100;
}
.cc-hdr-title { font-size: 18px; font-weight: 700; color: #fff; }
.cc-hdr-sub { font-size: 11px; color: rgba(255,255,255,0.65); margin-top: 1px; }
.cc-hdr-pill {
  margin-left: auto;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 999px;
  white-space: nowrap;
}
.cc-hdr-refresh {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: rgba(255,255,255,0.15);
  color: #fff !important;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.cc-body { max-width: 1280px; margin: 0 auto; padding: 20px 16px 80px; }
.cc-sect {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #475569;
  margin: 28px 0 10px;
}
.cc-grid2 { display: grid; gap: 12px; grid-template-columns: 1fr; }
.cc-grid3 { display: grid; gap: 12px; grid-template-columns: 1fr; }
@media(min-width: 640px)  { .cc-grid2 { grid-template-columns: 1fr 1fr; } }
@media(min-width: 640px)  { .cc-grid3 { grid-template-columns: 1fr 1fr; } }
@media(min-width: 1000px) { .cc-grid3 { grid-template-columns: 1fr 1fr 1fr; } }
.cc-span { grid-column: 1 / -1; }
.cc-card {
  background: #131d2e;
  border: 1px solid #1e2e45;
  border-radius: 12px;
  padding: 14px 16px;
}
.cc-card-lbl {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #4a5e78;
  margin-bottom: 10px;
}
.cc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.cc-agent-status { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
.cc-agent-name { font-weight: 600; font-size: 13px; color: #f1f5f9; text-transform: capitalize; }
.cc-agent-meta { font-size: 11px; color: #4a5e78; }
.cc-agent-snippet {
  font-size: 11px; color: #364960; margin-top: 5px; line-height: 1.35;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.cc-badge {
  display: inline-flex; align-items: center;
  background: #0a0f1a; color: #64748b;
  font-size: 10px; font-weight: 600;
  padding: 2px 7px; border-radius: 999px;
  white-space: nowrap; margin-top: 6px;
}
.cc-solv-big { font-size: 32px; font-weight: 700; line-height: 1; }
.cc-solv-green { color: #0E8E40; }
.cc-solv-yellow { color: #eab308; }
.cc-solv-red { color: #ef4444; }
.cc-solv-gray { color: #4a5e78; }
.cc-solv-target { font-size: 11px; color: #4a5e78; margin-top: 2px; }
.cc-solv-row { display: flex; gap: 20px; margin-top: 10px; flex-wrap: wrap; }
.cc-solv-stat { display: flex; flex-direction: column; }
.cc-solv-stat-val { font-size: 15px; font-weight: 600; color: #94a3b8; }
.cc-solv-stat-lbl { font-size: 10px; color: #4a5e78; text-transform: uppercase; letter-spacing: .06em; }
.cc-rev-big { font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.cc-rev-pos { font-size: 12px; color: #22c55e; font-weight: 600; }
.cc-rev-neu { font-size: 12px; color: #64748b; }
.cc-rev-loc { font-size: 11px; color: #4a5e78; margin-top: 2px; }
.cc-sev-bar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.cc-sev-chip {
  display: flex; align-items: center; gap: 4px;
  background: #0a0f1a; border-radius: 999px;
  padding: 3px 10px; font-size: 11px; font-weight: 600;
}
.cc-sev-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.cc-fr { padding: 9px 0; border-top: 1px solid #0f172a; }
.cc-fr-head { display: flex; align-items: center; gap: 6px; }
.cc-fr-agent { font-size: 9px; color: #334155; text-transform: uppercase; letter-spacing: .06em; }
.cc-fr-time { margin-left: auto; font-size: 9px; color: #1e293b; }
.cc-fr-text { font-size: 12px; color: #94a3b8; margin-top: 3px; line-height: 1.4; }
.cc-fr-url { font-size: 10px; color: #334155; margin-top: 2px; }
.cc-fr-url a { color: #475569 !important; }
.cc-ext-group { margin-bottom: 18px; }
.cc-ext-group:last-child { margin-bottom: 0; }
.cc-ext-grp-name {
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: .08em;
  color: #2d4056; margin-bottom: 8px;
}
.cc-ext-links { display: flex; flex-wrap: wrap; gap: 6px; }
.cc-ext-link {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 12px;
  background: #0a0f1a; color: #64748b !important;
  border: 1px solid #1a2840; border-radius: 7px;
  font-size: 12px; font-weight: 500; white-space: nowrap;
}
.cc-ext-link:hover { background: #0E8E40 !important; color: #fff !important; border-color: #0E8E40; }
.cc-empty { color: #2d4056; font-size: 12px; padding: 8px 0; }
.cc-err {
  margin-top: 14px; padding: 9px 14px;
  background: #1c0a0a; border: 1px solid #7f1d1d;
  border-radius: 8px; color: #fca5a5; font-size: 11px;
}
.cc-no-sb {
  margin-top: 32px; padding: 48px 24px;
  background: #131d2e; border: 1px solid #1e2e45;
  border-radius: 12px; text-align: center; color: #4a5e78;
}
`;

// ── page ──────────────────────────────────────────────────────────────────────

export default async function CommandCenter({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  // ── gate ──
  if (key !== 'envirocare2026') {
    return (
      <div style={{
        margin: 0, minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0a0f1a', fontFamily: 'system-ui,sans-serif',
      }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🔒</div>
          <p style={{ fontSize: 17, color: '#94a3b8' }}>Access restricted</p>
          <p style={{ fontSize: 12, marginTop: 6 }}>Append ?key=envirocare2026 to the URL.</p>
        </div>
      </div>
    );
  }

  const data = await fetchData();

  const agents     = data ? latestPerAgent(data.runs) : [];
  const seoLatest  = data ? latestPerLocation(data.seo) : [];
  const revHist    = data ? reviewHistory(data.seo) : {};
  const findings   = data?.findings ?? [];
  const recent30   = findings.slice(0, 30);

  const findingCount = findings.reduce<Record<string, number>>((acc, f) => {
    acc[f.agent_name] = (acc[f.agent_name] || 0) + 1;
    return acc;
  }, {});

  const sevCount = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const f of findings) {
    if      (f.severity === 'critical') sevCount.critical++;
    else if (f.severity === 'high')     sevCount.high++;
    else if (f.severity === 'medium')   sevCount.medium++;
    else if (f.severity === 'low')      sevCount.low++;
    else                                sevCount.info++;
  }

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div id="cc-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HEADER ── */}
      <div className="cc-hdr">
        <span style={{ fontSize: 26, lineHeight: 1 }}>🌻</span>
        <div>
          <div className="cc-hdr-title">EnviroCare Ops</div>
          <div className="cc-hdr-sub">{dateStr}</div>
        </div>
        <div className="cc-hdr-pill">
          {data ? '🟢 Supabase live' : '🔴 offline'}
        </div>
        <a href="/command-center?key=envirocare2026" className="cc-hdr-refresh">
          ↻ Refresh
        </a>
      </div>

      <div className="cc-body">

        {/* ── NO SUPABASE ── */}
        {!data && (
          <div className="cc-no-sb">
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <p style={{ fontSize: 15, color: '#64748b', marginBottom: 6 }}>Supabase not connected</p>
            <p style={{ fontSize: 12 }}>Set SUPABASE_URL and SUPABASE_KEY in Vercel env vars.</p>
          </div>
        )}

        {data && (
          <>
            {/* ── AGENT STATUS ── */}
            <div className="cc-sect">Agent Status</div>
            <div className="cc-grid3">
              {agents.length === 0 && (
                <div className="cc-card cc-span">
                  <p className="cc-empty">No agent runs recorded yet.</p>
                </div>
              )}
              {agents.map((a) => (
                <div key={a.agent_name} className="cc-card">
                  <div className="cc-card-lbl">{a.agent_name}</div>
                  <div className="cc-agent-status">
                    <span className="cc-dot" style={{ background: statusColor(a.status) }} />
                    <span className="cc-agent-name">{a.status}</span>
                  </div>
                  <div className="cc-agent-meta">
                    {relativeTime(a.created_at)} · {new Date(a.created_at).toLocaleDateString()}
                  </div>
                  <div className="cc-agent-snippet">
                    {a.output?.replace(/^[•\d.\-]\s*/gm, '').trim().slice(0, 150)}
                  </div>
                  {!!findingCount[a.agent_name] && (
                    <div className="cc-badge">{findingCount[a.agent_name]} findings</div>
                  )}
                </div>
              ))}
            </div>

            {/* ── SoLV METRICS ── */}
            <div className="cc-sect">SoLV Metrics</div>
            <div className="cc-grid3">
              {seoLatest.length === 0 && (
                <div className="cc-card cc-span">
                  <p className="cc-empty">No envirocare_seo data yet. Run the SEO monitor agent and confirm LOCAL_FALCON_API_KEY is set.</p>
                </div>
              )}
              {seoLatest.map((row) => {
                const target = SOLV_TARGETS[row.location] ?? 50;
                const pct    = row.solv ?? 0;
                const cls    = row.solv == null
                  ? 'cc-solv-gray'
                  : pct >= target
                    ? 'cc-solv-green'
                    : pct >= target * 0.7
                      ? 'cc-solv-yellow'
                      : 'cc-solv-red';
                return (
                  <div key={row.location} className="cc-card">
                    <div className="cc-card-lbl">{row.location}</div>
                    <div className={`cc-solv-big ${cls}`}>
                      {row.solv != null ? `${row.solv}%` : '—'}
                    </div>
                    <div className="cc-solv-target">
                      Target {target}% ·{' '}
                      {row.solv != null
                        ? row.solv >= target ? '✅ on target' : '⚠️ below target'
                        : 'no data'} · {relativeTime(row.snapshot_date)}
                    </div>
                    <div className="cc-solv-row">
                      {row.arp != null && (
                        <div className="cc-solv-stat">
                          <span className="cc-solv-stat-val">{row.arp}</span>
                          <span className="cc-solv-stat-lbl">ARP</span>
                        </div>
                      )}
                      {row.review_count != null && (
                        <div className="cc-solv-stat">
                          <span className="cc-solv-stat-val">{row.review_count}</span>
                          <span className="cc-solv-stat-lbl">Reviews</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {KNOWN_LOCATIONS
                .filter((loc) => !seoLatest.some((r) => r.location === loc))
                .map((loc) => (
                  <div key={loc} className="cc-card" style={{ opacity: 0.4 }}>
                    <div className="cc-card-lbl">{loc}</div>
                    <div className="cc-solv-big cc-solv-gray">—</div>
                    <div className="cc-solv-target">No data</div>
                  </div>
                ))}
            </div>

            {/* ── REVIEW TRACKER ── */}
            <div className="cc-sect">Review Count Tracker</div>
            <div className="cc-grid3">
              {seoLatest.filter((r) => r.review_count != null).length === 0 && (
                <div className="cc-card cc-span">
                  <p className="cc-empty">Review counts populate once the SEO monitor agent runs with live Local Falcon data.</p>
                </div>
              )}
              {seoLatest
                .filter((r) => r.review_count != null)
                .map((row) => {
                  const hist  = revHist[row.location] ?? [];
                  const prev  = hist.length >= 2 ? hist[hist.length - 2].count : null;
                  const curr  = row.review_count!;
                  const delta = prev != null ? curr - prev : null;
                  return (
                    <div key={row.location} className="cc-card">
                      <div className="cc-card-lbl">{row.location} — Reviews</div>
                      <div className="cc-rev-big">{curr.toLocaleString()}</div>
                      <div style={{ marginTop: 4 }}>
                        {delta != null && delta > 0  && <span className="cc-rev-pos">+{delta} since last run</span>}
                        {delta != null && delta === 0 && <span className="cc-rev-neu">No change</span>}
                        {delta == null                && <span className="cc-rev-neu">First snapshot</span>}
                      </div>
                      <div className="cc-rev-loc">{relativeTime(row.snapshot_date)}</div>
                    </div>
                  );
                })}
            </div>

            {/* ── AGENT FINDINGS ── */}
            <div className="cc-sect">Agent Findings</div>
            <div className="cc-card">
              <div className="cc-sev-bar">
                {(
                  [
                    ['critical', sevCount.critical],
                    ['high',     sevCount.high],
                    ['medium',   sevCount.medium],
                    ['low',      sevCount.low],
                    ['info',     sevCount.info],
                  ] as [string, number][]
                ).map(([sev, cnt]) => (
                  <div key={sev} className="cc-sev-chip">
                    <span className="cc-sev-dot" style={{ background: sevColor(sev) }} />
                    <span style={{ color: sevColor(sev) }}>{cnt}</span>
                    <span style={{ color: '#334155', fontWeight: 400, textTransform: 'capitalize' }}>&nbsp;{sev}</span>
                  </div>
                ))}
                <div className="cc-sev-chip" style={{ marginLeft: 'auto' }}>
                  <span style={{ color: '#4a5e78' }}>Total&nbsp;</span>
                  <span style={{ color: '#94a3b8' }}>{findings.length}</span>
                </div>
              </div>

              {recent30.length === 0 && <p className="cc-empty">No findings yet.</p>}
              {recent30.map((f, i) => (
                <div key={f.id ?? i} className="cc-fr">
                  <div className="cc-fr-head">
                    <span className="cc-sev-dot" style={{ background: sevColor(f.severity) }} />
                    <span className="cc-fr-agent">{f.agent_name} · {f.category}</span>
                    <span className="cc-fr-time">{relativeTime(f.run_date)}</span>
                  </div>
                  <div className="cc-fr-text">{f.finding}</div>
                  {f.page_url && (
                    <div className="cc-fr-url">
                      <a href={f.page_url} target="_blank" rel="noopener">{f.page_url}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── EXTERNAL DASHBOARDS ── */}
            <div className="cc-sect">External Dashboards</div>
            <div className="cc-card">
              {EXTERNAL_LINKS.map((g) => (
                <div key={g.group} className="cc-ext-group">
                  <div className="cc-ext-grp-name">{g.group}</div>
                  <div className="cc-ext-links">
                    {g.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="cc-ext-link"
                        target={l.href.startsWith('/') ? '_self' : '_blank'}
                        rel="noopener"
                      >
                        <span>{l.icon}</span>{l.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {data.errors.length > 0 && (
              <div className="cc-err">
                <strong>DB errors: </strong>{data.errors.join(' · ')}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
