/**
 * app/command-center/page.tsx
 * Private ops dashboard — gate: ?key=envirocare2026
 * Reads from Supabase: agent_runs, agent_findings, envirocare_seo
 */

import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EnviroCare Ops',
  description: 'Internal operations dashboard',
  robots: { index: false, follow: false },
};

// ── types ────────────────────────────────────────────────────────────────────

interface AgentRun {
  id?: number;
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
      .limit(50),
    sb
      .from('agent_findings')
      .select('id, agent_name, category, severity, page_url, finding, run_date')
      .order('run_date', { ascending: false })
      .limit(100),
    sb
      .from('envirocare_seo')
      .select('location, solv, arp, snapshot_date')
      .order('snapshot_date', { ascending: false })
      .limit(30),
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
  return `${Math.floor(hrs / 24)}d ago`;
}

function agentSummary(runs: AgentRun[]) {
  const map: Record<string, AgentRun> = {};
  for (const r of runs) {
    if (!map[r.agent_name]) map[r.agent_name] = r;
  }
  return Object.values(map);
}

function latestSeoByLocation(seo: SeoRow[]) {
  const map: Record<string, SeoRow> = {};
  for (const row of seo) {
    if (!map[row.location]) map[row.location] = row;
  }
  return Object.values(map);
}

function findingsBySeverity(findings: AgentFinding[]) {
  return {
    critical: findings.filter((f) => f.severity === 'critical'),
    high: findings.filter((f) => f.severity === 'high'),
    medium: findings.filter((f) => f.severity === 'medium'),
    low: findings.filter((f) => f.severity === 'low'),
    info: findings.filter((f) => !['critical', 'high', 'medium', 'low'].includes(f.severity)),
  };
}

function sevColor(sev: string): string {
  if (sev === 'critical') return '#ef4444';
  if (sev === 'high') return '#f97316';
  if (sev === 'medium') return '#eab308';
  if (sev === 'low') return '#3b82f6';
  return '#6b7280';
}

function statusDot(status: string) {
  const c = status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : '#eab308';
  return (
    <span
      style={{
        display: 'inline-block',
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: c,
        marginRight: 6,
        flexShrink: 0,
      }}
    />
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function CommandCenter({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  // Gate check
  if (key !== 'envirocare2026') {
    return (
      <html lang="en">
        <body
          style={{
            margin: 0,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
            <p style={{ fontSize: 18, color: '#cbd5e1' }}>Access restricted.</p>
            <p style={{ fontSize: 13 }}>Add ?key= to the URL to continue.</p>
          </div>
        </body>
      </html>
    );
  }

  const data = await fetchData();

  const agents = data ? agentSummary(data.runs) : [];
  const seoLatest = data ? latestSeoByLocation(data.seo) : [];
  const recentFindings = data ? data.findings.slice(0, 30) : [];
  const bySev = data ? findingsBySeverity(data.findings) : { critical: [], high: [], medium: [], low: [], info: [] };
  const findingCounts = data
    ? data.findings.reduce<Record<string, number>>((acc, f) => {
        acc[f.agent_name] = (acc[f.agent_name] || 0) + 1;
        return acc;
      }, {})
    : {};

  const LOCATIONS = ['Birmingham', 'Huntsville', 'Alex City', 'Alabaster', 'Lake Martin'];

  const quickLinks = [
    { label: '📊 Blog', href: '/blog' },
    { label: '💰 Pricing', href: '/pricing' },
    { label: '📞 Contact Us', href: '/contact-us' },
    { label: '🏙️ Birmingham', href: '/birmingham' },
    { label: '🏙️ Huntsville', href: '/huntsville' },
    { label: '🏙️ Lake Martin', href: '/lake-martin' },
    { label: '🐛 Services', href: '/services' },
    { label: '⭐ Why Us', href: '/why-envirocare' },
    { label: '🏠 Realtor', href: '/realtor' },
    { label: '🔨 Builders', href: '/builders' },
  ];

  const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
      background: #0f172a;
      color: #e2e8f0;
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }
    .cc-header {
      background: linear-gradient(135deg, #0E8E40 0%, #065f29 100%);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .cc-header-title { font-size: 20px; font-weight: 700; color: #fff; }
    .cc-header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 1px; }
    .cc-header-badge {
      margin-left: auto;
      background: rgba(255,255,255,0.15);
      color: #fff;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 999px;
    }
    .cc-body { max-width: 1200px; margin: 0 auto; padding: 20px 16px 60px; }
    .cc-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
    @media(min-width: 700px) { .cc-grid { grid-template-columns: 1fr 1fr; } }
    @media(min-width: 1100px) { .cc-grid { grid-template-columns: 1fr 1fr 1fr; } }
    .cc-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 16px;
    }
    .cc-card-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: #64748b;
      margin-bottom: 12px;
    }
    .cc-section-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: #475569;
      margin: 28px 0 12px;
    }
    .cc-agent-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px solid #1e293b;
    }
    .cc-agent-row:last-child { border-bottom: none; }
    .cc-agent-name { font-weight: 600; color: #f1f5f9; font-size: 13px; }
    .cc-agent-meta { font-size: 11px; color: #64748b; margin-top: 2px; }
    .cc-agent-count {
      margin-left: auto;
      background: #0f172a;
      color: #94a3b8;
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 999px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .cc-solv-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #0f172a;
    }
    .cc-solv-row:last-child { border-bottom: none; }
    .cc-solv-loc { font-weight: 600; color: #f1f5f9; font-size: 13px; flex: 1; min-width: 0; }
    .cc-solv-val {
      font-size: 18px;
      font-weight: 700;
      color: #0E8E40;
    }
    .cc-solv-arp { font-size: 11px; color: #64748b; }
    .cc-solv-date { font-size: 10px; color: #475569; }
    .cc-sev-bar {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .cc-sev-chip {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #0f172a;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
    }
    .cc-finding-row {
      padding: 9px 0;
      border-bottom: 1px solid #0f172a;
    }
    .cc-finding-row:last-child { border-bottom: none; }
    .cc-finding-agent { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: .05em; }
    .cc-finding-text { font-size: 13px; color: #cbd5e1; margin-top: 2px; line-height: 1.4; }
    .cc-finding-url { font-size: 11px; color: #64748b; margin-top: 2px; }
    .cc-finding-date { font-size: 10px; color: #334155; margin-top: 2px; }
    .cc-sev-dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .cc-quick-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cc-quick-link {
      display: inline-flex;
      align-items: center;
      padding: 7px 14px;
      background: #0f172a;
      color: #94a3b8;
      border: 1px solid #1e293b;
      border-radius: 8px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: background .15s, color .15s;
    }
    .cc-quick-link:hover { background: #0E8E40; color: #fff; border-color: #0E8E40; }
    .cc-empty { color: #475569; font-size: 13px; padding: 10px 0; }
    .cc-wide { grid-column: 1 / -1; }
    .cc-nodata {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 40px 20px;
      text-align: center;
      color: #64748b;
    }
  `;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>EnviroCare Ops</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content="EnviroCare Ops" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0E8E40" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        {/* Header */}
        <div className="cc-header">
          <span style={{ fontSize: 28 }}>🌻</span>
          <div>
            <div className="cc-header-title">EnviroCare Ops</div>
            <div className="cc-header-sub">Command Center · {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
          <div className="cc-header-badge">
            {data ? '🟢 Supabase connected' : '🔴 No Supabase'}
          </div>
        </div>

        <div className="cc-body">

          {!data && (
            <div className="cc-nodata" style={{ marginTop: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
              <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 4 }}>Supabase not connected</p>
              <p style={{ fontSize: 13 }}>Set SUPABASE_URL and SUPABASE_KEY in your environment.</p>
            </div>
          )}

          {data && (
            <>
              {/* ── AGENT STATUS ── */}
              <div className="cc-section-label">Agent Status</div>
              <div className="cc-grid">
                {agents.length === 0 && (
                  <div className="cc-card cc-wide">
                    <p className="cc-empty">No agent runs recorded yet.</p>
                  </div>
                )}
                {agents.map((a) => (
                  <div key={a.agent_name} className="cc-card">
                    <div className="cc-card-title">{a.agent_name}</div>
                    <div className="cc-agent-row" style={{ paddingTop: 0 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="cc-agent-name" style={{ display: 'flex', alignItems: 'center' }}>
                          {statusDot(a.status)}
                          <span style={{ textTransform: 'capitalize' }}>{a.status}</span>
                        </div>
                        <div className="cc-agent-meta">
                          Last run: {relativeTime(a.created_at)} · {new Date(a.created_at).toLocaleDateString()}
                        </div>
                        <div className="cc-agent-meta" style={{ marginTop: 4, color: '#475569', fontSize: 11 }}>
                          {a.output?.slice(0, 120)}{a.output?.length > 120 ? '…' : ''}
                        </div>
                      </div>
                      {findingCounts[a.agent_name] && (
                        <div className="cc-agent-count">{findingCounts[a.agent_name]} findings</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── SEO / SoLV METRICS ── */}
              <div className="cc-section-label">SoLV Metrics</div>
              <div className="cc-grid">
                {seoLatest.length === 0 && (
                  <div className="cc-card cc-wide">
                    <p className="cc-empty">No envirocare_seo data yet.</p>
                  </div>
                )}
                {seoLatest.map((row) => (
                  <div key={row.location} className="cc-card">
                    <div className="cc-card-title">{row.location}</div>
                    <div className="cc-solv-row" style={{ paddingTop: 0 }}>
                      <div className="cc-solv-loc">SoLV</div>
                      <div>
                        <div className="cc-solv-val">
                          {row.solv != null ? `${row.solv}%` : '—'}
                        </div>
                        <div className="cc-solv-date">{relativeTime(row.snapshot_date)}</div>
                      </div>
                    </div>
                    {row.arp != null && (
                      <div className="cc-solv-row">
                        <div className="cc-solv-loc">ARP</div>
                        <div className="cc-solv-val" style={{ fontSize: 16 }}>{row.arp}</div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Show remaining locations from the known list with no data */}
                {LOCATIONS.filter(
                  (loc) => !seoLatest.some((r) => r.location.toLowerCase() === loc.toLowerCase())
                ).map((loc) => (
                  <div key={loc} className="cc-card" style={{ opacity: 0.5 }}>
                    <div className="cc-card-title">{loc}</div>
                    <div className="cc-empty">No data yet</div>
                  </div>
                ))}
              </div>

              {/* ── FINDINGS SUMMARY ── */}
              <div className="cc-section-label">Findings Summary</div>
              <div className="cc-card" style={{ marginBottom: 0 }}>
                <div className="cc-sev-bar">
                  {[
                    { label: 'Critical', key: 'critical' as const },
                    { label: 'High', key: 'high' as const },
                    { label: 'Medium', key: 'medium' as const },
                    { label: 'Low', key: 'low' as const },
                    { label: 'Info', key: 'info' as const },
                  ].map(({ label, key }) => (
                    <div key={key} className="cc-sev-chip">
                      <span className="cc-sev-dot" style={{ background: sevColor(key) }} />
                      <span style={{ color: sevColor(key) }}>{bySev[key].length}</span>
                      <span style={{ color: '#64748b', fontWeight: 400 }}> {label}</span>
                    </div>
                  ))}
                  <div className="cc-sev-chip" style={{ marginLeft: 'auto' }}>
                    <span style={{ color: '#94a3b8' }}>Total: </span>
                    <span style={{ color: '#e2e8f0', marginLeft: 4 }}>{data.findings.length}</span>
                  </div>
                </div>

                {/* Recent findings list */}
                {recentFindings.length === 0 && (
                  <p className="cc-empty">No findings recorded yet.</p>
                )}
                {recentFindings.map((f, i) => (
                  <div key={f.id ?? i} className="cc-finding-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="cc-sev-dot" style={{ background: sevColor(f.severity), marginTop: 1 }} />
                      <span className="cc-finding-agent">{f.agent_name} · {f.category}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#334155' }}>{relativeTime(f.run_date)}</span>
                    </div>
                    <div className="cc-finding-text">{f.finding}</div>
                    {f.page_url && (
                      <div className="cc-finding-url">
                        <a href={f.page_url} target="_blank" rel="noopener" style={{ color: '#64748b' }}>{f.page_url}</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── QUICK ACTIONS ── */}
              <div className="cc-section-label">Quick Links</div>
              <div className="cc-card">
                <div className="cc-quick-grid">
                  {quickLinks.map((l) => (
                    <a key={l.href} href={l.href} className="cc-quick-link" target="_blank" rel="noopener">
                      {l.label}
                    </a>
                  ))}
                  <a
                    href={`/command-center?key=envirocare2026`}
                    className="cc-quick-link"
                    style={{ background: '#0E8E40', color: '#fff', borderColor: '#0E8E40' }}
                  >
                    🔄 Refresh
                  </a>
                </div>
              </div>

              {data.errors.length > 0 && (
                <div style={{ marginTop: 16, padding: '10px 14px', background: '#1e293b', border: '1px solid #7f1d1d', borderRadius: 8, color: '#fca5a5', fontSize: 12 }}>
                  <strong>DB errors:</strong> {data.errors.join(' · ')}
                </div>
              )}
            </>
          )}
        </div>
      </body>
    </html>
  );
}
