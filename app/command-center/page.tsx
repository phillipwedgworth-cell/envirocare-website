/**
 * EnviroCare Command Center — single-pane-of-glass ops cockpit.
 * Gate: /command-center?key=envirocare2026
 * Server component. Reads every Supabase feed the agents + ingests populate:
 *   agent_runs · agent_findings · envirocare_seo · gsc_daily · ga4_weekly
 *   gads_campaigns · cfo_snapshots · morning_brief
 * Empty sections show how to populate them. No client JS.
 */
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  alternates: { canonical: '/command-center' },
  title: 'EnviroCare Command Center',
  description: 'Internal operations cockpit',
  robots: { index: false, follow: false },
};

const GATE = 'envirocare2026';

// ── types ─────────────────────────────────────────────────────────────────────
interface AgentRun { agent_name: string; status: string; output: string | null; created_at: string; }
interface Finding { id?: number; agent_name: string; category: string; severity: string; page_url?: string | null; finding: string; run_date: string; }
interface SeoRow { location: string; solv: number | null; arp: number | null; review_count: number | null; keyword: string | null; snapshot_date: string; }
interface GscDay { date: string; clicks: number; impressions: number; ctr: number; position: number; }
interface Ga4Row { period_end: string; sessions: number; users: number; engaged_sessions: number; conversions: number; }
interface GadsRow { campaign: string; cost: number; clicks: number; impressions: number; conversions: number; cost_per_conv: number; snapshot_label: string; snapshot_date: string; }
interface CfoRow { snapshot_date: string; metrics: Record<string, unknown>; note: string | null; }
interface BriefRow { brief_date: string; content: string; }

// ── helpers ─────────────────────────────────────────────────────────────────
const num = (v: unknown) => (v == null || isNaN(Number(v)) ? 0 : Number(v));
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const pct1 = (n: number) => `${n.toFixed(1)}%`;

function timeAgo(s?: string) {
  if (!s) return '—';
  const d = new Date(s).getTime();
  if (isNaN(d)) return '—';
  const m = Math.floor((Date.now() - d) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function firstPerKey<T>(rows: T[], key: (r: T) => string): Map<string, T> {
  const m = new Map<string, T>();
  for (const r of rows) { const k = key(r); if (!m.has(k)) m.set(k, r); }
  return m;
}

function Spark({ values, w = 132, h = 34, color = '#0E8E40' }: { values: number[]; w?: number; h?: number; color?: string }) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1), min = Math.min(...values, 0), span = max - min || 1;
  const pts = values.map((v, i) => `${((i / (values.length - 1)) * w).toFixed(1)},${(h - ((v - min) / span) * (h - 4) - 2).toFixed(1)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function sevColor(s: string) {
  if (s === 'critical') return '#C0392B';
  if (s === 'warning') return '#B8860B';
  return '#0E8E40';
}
function statusColor(s: string) {
  if (s === 'ok') return '#0E8E40';
  if (s === 'escalated') return '#B8860B';
  if (s === 'error') return '#C0392B';
  return '#9aa39b';
}

// ── data ──────────────────────────────────────────────────────────────────────
async function fetchAll() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  const sb = createClient(url, key);
  const grab = <T,>(p: PromiseLike<{ data: T[] | null }>): Promise<T[]> =>
    Promise.resolve(p).then((r) => (r.data ?? []) as T[]).catch(() => [] as T[]);

  const [runs, findings, seo, gsc, ga4, gads, cfo, brief] = await Promise.all([
    grab<AgentRun>(sb.from('agent_runs').select('agent_name,status,output,created_at').order('created_at', { ascending: false }).limit(80)),
    grab<Finding>(sb.from('agent_findings').select('id,agent_name,category,severity,page_url,finding,run_date').order('run_date', { ascending: false }).limit(120)),
    grab<SeoRow>(sb.from('envirocare_seo').select('location,solv,arp,review_count,keyword,snapshot_date').order('snapshot_date', { ascending: false }).limit(80)),
    grab<GscDay>(sb.from('gsc_daily').select('date,clicks,impressions,ctr,position').order('date', { ascending: false }).limit(45)),
    grab<Ga4Row>(sb.from('ga4_weekly').select('period_end,sessions,users,engaged_sessions,conversions').order('period_end', { ascending: false }).limit(12)),
    grab<GadsRow>(sb.from('gads_campaigns').select('campaign,cost,clicks,impressions,conversions,cost_per_conv,snapshot_label,snapshot_date').order('snapshot_date', { ascending: false }).limit(60)),
    grab<CfoRow>(sb.from('cfo_snapshots').select('snapshot_date,metrics,note').order('snapshot_date', { ascending: false }).limit(1)),
    grab<BriefRow>(sb.from('morning_brief').select('brief_date,content').order('brief_date', { ascending: false }).limit(1)),
  ]);
  return { runs, findings, seo, gsc, ga4, gads, cfo, brief };
}

// ── small UI atoms ────────────────────────────────────────────────────────────
function Kpi({ label, value, sub, accent }: { label: string; value: string; sub?: React.ReactNode; accent?: string }) {
  return (
    <div className="cc-kpi">
      <div className="cc-kpi-label">{label}</div>
      <div className="cc-kpi-val" style={accent ? { color: accent } : undefined}>{value}</div>
      {sub && <div className="cc-kpi-sub">{sub}</div>}
    </div>
  );
}
function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="cc-panel">
      <div className="cc-panel-head"><h2>{title}</h2>{hint && <span className="cc-panel-hint">{hint}</span>}</div>
      {children}
    </section>
  );
}
function Empty({ children }: { children: React.ReactNode }) {
  return <p className="cc-empty">{children}</p>;
}

// ── page ────────────────────────────────────────────────────────────────────
export default async function CommandCenter({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const sp = await searchParams;
  if (sp?.key !== GATE) {
    return (
      <main className="cc-locked">
        <style dangerouslySetInnerHTML={{ __html: CC_CSS }} />
        <div className="cc-lock-card">
          <div className="cc-lock-sun">🌻</div>
          <h1>EnviroCare Command Center</h1>
          <p>Private. Append <code>?key=…</code> to your link to view.</p>
        </div>
      </main>
    );
  }

  const data = await fetchAll();
  const now = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  if (!data) {
    return (
      <main className="cc-locked">
        <style dangerouslySetInnerHTML={{ __html: CC_CSS }} />
        <div className="cc-lock-card">
          <h1>Command Center</h1>
          <p>Supabase not configured (SUPABASE_URL / SUPABASE_KEY missing in this environment).</p>
        </div>
      </main>
    );
  }

  const { runs, findings, seo, gsc, ga4, gads, cfo, brief } = data;

  // local SEO — latest row per market
  const MARKETS = ['Alabaster', 'Alex City', 'Huntsville'];
  const latestSeo = firstPerKey(seo, (r) => r.location);
  const totalReviews = MARKETS.reduce((s, m) => s + num(latestSeo.get(m)?.review_count), 0);
  const solvVals = MARKETS.map((m) => num(latestSeo.get(m)?.solv)).filter((v) => v > 0);
  const avgSolv = solvVals.length ? solvVals.reduce((a, b) => a + b, 0) / solvVals.length : 0;

  // GSC
  const gscChrono = [...gsc].reverse();
  const gscLatest = gsc[0];
  const gscClicks30 = gsc.reduce((s, d) => s + num(d.clicks), 0);

  // GA4
  const ga4Chrono = [...ga4].reverse();
  const ga4Latest = ga4[0];

  // Google Ads — latest snapshot
  const latestLabel = gads[0]?.snapshot_label;
  const adRows = gads.filter((g) => g.snapshot_label === latestLabel);
  const adCost = adRows.reduce((s, g) => s + num(g.cost), 0);
  const adConv = adRows.reduce((s, g) => s + num(g.conversions), 0);
  const topAds = [...adRows].sort((a, b) => num(b.cost) - num(a.cost)).slice(0, 5);

  // agents
  const latestRun = firstPerKey(runs, (r) => r.agent_name);
  const agentNames = ['brightlocal', 'review-responder', 'seo-monitor', 'neuronwriter-qa', 'cfo-agent', 'site-reviewer', 'proposer', 'orchestrator'];
  const sevCount = { critical: 0, warning: 0, info: 0 };
  for (const f of findings) {
    if (f.severity === 'critical') sevCount.critical++;
    else if (f.severity === 'warning') sevCount.warning++;
    else sevCount.info++;
  }
  const openCritical = sevCount.critical;

  const integrations: [string, boolean][] = [
    ['Supabase', !!process.env.SUPABASE_URL],
    ['Anthropic', !!process.env.ANTHROPIC_API_KEY],
    ['Local Falcon', !!process.env.LOCAL_FALCON_API_KEY],
    ['Email (Resend)', !!process.env.RESEND_API_KEY],
    ['Cron secret', !!process.env.CRON_SECRET],
    ['NeuronWriter', !!process.env.NEURONWRITER_API_KEY],
    ['GA4', !!process.env.GA4_PROPERTY_ID],
  ];

  const crons: [string, string][] = [
    ['BrightLocal — NAP / citation watch', '4×/day · 9p·3a·9a·3p CT'],
    ['Site health / integrity', '4×/day · 12a·6a·12p·6p CT'],
    ['SEO rank monitor', 'midday + daily digest'],
    ['Full digest email (all agents)', 'daily · 4a CT'],
  ];

  return (
    <main className="cc">
      <style dangerouslySetInnerHTML={{ __html: CC_CSS }} />

      <header className="cc-top">
        <div>
          <div className="cc-eyebrow">🌻 ENVIROCARE · OPS COCKPIT</div>
          <h1>Command Center</h1>
        </div>
        <div className="cc-updated">Updated {now}</div>
      </header>

      {/* KPI ROW */}
      <div className="cc-kpis">
        <Kpi label="Avg Share of Voice" value={avgSolv ? pct1(avgSolv) : '—'} accent="#0E8E40"
          sub={solvVals.length ? `${solvVals.length} markets` : 'run SEO monitor'} />
        <Kpi label="Total Reviews" value={totalReviews ? fmt(totalReviews) : '—'} accent="#F5A800"
          sub={totalReviews ? 'across 3 markets' : 'from Local Falcon'} />
        <Kpi label="Organic Clicks (45d)" value={gscClicks30 ? fmt(gscClicks30) : '—'}
          sub={gscLatest ? <Spark values={gscChrono.map((d) => num(d.clicks))} /> : 'ingest GSC'} />
        <Kpi label="Sessions (wk)" value={ga4Latest ? fmt(num(ga4Latest.sessions)) : '—'}
          sub={ga4Latest ? <Spark values={ga4Chrono.map((d) => num(d.sessions))} color="#0A7935" /> : 'ingest GA4'} />
        <Kpi label="Ad Spend" value={adRows.length ? money(adCost) : '—'}
          sub={adRows.length ? `${fmt(adConv)} conv` : 'import GAds'} />
        <Kpi label="Open Critical" value={fmt(openCritical)} accent={openCritical ? '#C0392B' : '#0E8E40'}
          sub={openCritical ? 'needs attention' : 'all clear'} />
      </div>

      <div className="cc-grid">
        {/* LOCAL SEARCH */}
        <Panel title="Local Search" hint="Local Falcon">
          {latestSeo.size === 0 ? (
            <Empty>No ranking snapshots yet. Run the SEO monitor (needs <code>LOCAL_FALCON_API_KEY</code>).</Empty>
          ) : (
            <div className="cc-markets">
              {MARKETS.map((m) => {
                const r = latestSeo.get(m);
                const solv = num(r?.solv);
                return (
                  <div key={m} className="cc-market">
                    <div className="cc-market-name">{m}</div>
                    <div className="cc-market-solv" style={{ color: solv >= 50 ? '#0E8E40' : solv >= 25 ? '#B8860B' : '#C0392B' }}>
                      {r?.solv != null ? pct1(solv) : '—'}
                    </div>
                    <div className="cc-market-meta">
                      <span>ARP {r?.arp != null ? num(r.arp).toFixed(1) : '—'}</span>
                      <span>{r?.review_count != null ? fmt(num(r.review_count)) : '—'} reviews</span>
                    </div>
                    <div className="cc-market-date">{r?.snapshot_date ?? ''}</div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>

        {/* TRAFFIC & SEARCH */}
        <Panel title="Traffic & Search" hint="GA4 · GSC">
          {!gscLatest && !ga4Latest ? (
            <Empty>No traffic data yet. Run the GA4 / GSC ingests (<code>ingest-ga4.mjs</code>, <code>ingest-gsc.mjs</code>).</Empty>
          ) : (
            <div className="cc-ts">
              {gscLatest && (
                <div className="cc-ts-row">
                  <div><div className="cc-ts-num">{fmt(num(gscLatest.clicks))}</div><div className="cc-ts-lbl">clicks / day</div></div>
                  <div><div className="cc-ts-num">{fmt(num(gscLatest.impressions))}</div><div className="cc-ts-lbl">impressions</div></div>
                  <div><div className="cc-ts-num">{num(gscLatest.position).toFixed(1)}</div><div className="cc-ts-lbl">avg position</div></div>
                  <Spark values={gscChrono.map((d) => num(d.clicks))} w={120} />
                </div>
              )}
              {ga4Latest && (
                <div className="cc-ts-row">
                  <div><div className="cc-ts-num">{fmt(num(ga4Latest.sessions))}</div><div className="cc-ts-lbl">sessions / wk</div></div>
                  <div><div className="cc-ts-num">{fmt(num(ga4Latest.users))}</div><div className="cc-ts-lbl">users</div></div>
                  <div><div className="cc-ts-num">{fmt(num(ga4Latest.conversions))}</div><div className="cc-ts-lbl">conversions</div></div>
                  <Spark values={ga4Chrono.map((d) => num(d.sessions))} w={120} color="#0A7935" />
                </div>
              )}
            </div>
          )}
        </Panel>

        {/* GOOGLE ADS */}
        <Panel title="Google Ads" hint={latestLabel ? String(latestLabel) : 'paid'}>
          {adRows.length === 0 ? (
            <Empty>No campaign data. Import a GAds report (<code>ingest-gads-campaigns.mjs</code>).</Empty>
          ) : (
            <>
              <div className="cc-ad-totals">
                <span><strong>{money(adCost)}</strong> spend</span>
                <span><strong>{fmt(adConv)}</strong> conv</span>
                <span><strong>{adConv ? money(adCost / adConv) : '—'}</strong> / conv</span>
              </div>
              <table className="cc-table">
                <tbody>
                  {topAds.map((a) => (
                    <tr key={a.campaign}>
                      <td className="cc-td-name">{a.campaign}</td>
                      <td>{money(num(a.cost))}</td>
                      <td>{fmt(num(a.conversions))} conv</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Panel>

        {/* AGENTS */}
        <Panel title="Agents" hint="last run">
          <div className="cc-sev">
            <span className="cc-sev-chip" style={{ background: '#FCEBEB', color: '#C0392B' }}>{sevCount.critical} critical</span>
            <span className="cc-sev-chip" style={{ background: '#FBF3DF', color: '#8a6400' }}>{sevCount.warning} warning</span>
            <span className="cc-sev-chip" style={{ background: '#EAF3DE', color: '#3B6D11' }}>{sevCount.info} info</span>
          </div>
          <div className="cc-agents">
            {agentNames.map((n) => {
              const r = latestRun.get(n);
              return (
                <div key={n} className="cc-agent">
                  <span className="cc-dot" style={{ background: r ? statusColor(r.status) : '#cfd6cf' }} />
                  <span className="cc-agent-name">{n}</span>
                  <span className="cc-agent-when">{r ? timeAgo(r.created_at) : 'never run'}</span>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* RECENT FINDINGS */}
        <Panel title="Recent Findings" hint={`${findings.length} total`}>
          {findings.length === 0 ? (
            <Empty>No findings yet — agents post here as they run.</Empty>
          ) : (
            <ul className="cc-findings">
              {findings.slice(0, 12).map((f, i) => (
                <li key={f.id ?? i}>
                  <span className="cc-fdot" style={{ background: sevColor(f.severity) }} />
                  <div>
                    <div className="cc-f-text">{f.finding}</div>
                    <div className="cc-f-meta">{f.agent_name} · {f.category} · {timeAgo(f.run_date)}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* DAILY BRIEF */}
        <Panel title="Latest Digest" hint={brief[0]?.brief_date ?? ''}>
          {brief.length === 0 ? (
            <Empty>No digest archived yet — the orchestrator writes one each morning.</Empty>
          ) : (
            <p className="cc-brief">{brief[0].content.slice(0, 420)}{brief[0].content.length > 420 ? '…' : ''}</p>
          )}
        </Panel>

        {/* INTEGRATIONS */}
        <Panel title="Integrations" hint="configured keys">
          <div className="cc-integrations">
            {integrations.map(([n, ok]) => (
              <div key={n} className="cc-int">
                <span className="cc-dot" style={{ background: ok ? '#0E8E40' : '#cfd6cf' }} />
                <span>{n}</span>
                <span className="cc-int-state">{ok ? 'on' : 'off'}</span>
              </div>
            ))}
          </div>
          {cfo[0]?.note && <p className="cc-cfo-note">CFO: {cfo[0].note}</p>}
        </Panel>

        {/* SCHEDULE */}
        <Panel title="Monitoring Schedule" hint="live crons">
          <ul className="cc-cron">
            {crons.map(([n, when]) => (
              <li key={n}><span className="cc-cron-name">{n}</span><span className="cc-cron-when">{when}</span></li>
            ))}
          </ul>
        </Panel>
      </div>

      <footer className="cc-foot">EnviroCare · No One Cares Like EnviroCare · private ops cockpit</footer>
    </main>
  );
}

const CC_CSS = `
.cc { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; background: #F5F1E8; color: #0E1A0F; min-height: 100vh; padding: 20px clamp(14px,3vw,32px) 60px; }
.cc h1, .cc h2 { font-family: 'Playfair Display', Georgia, serif; }
.cc-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; flex-wrap: wrap; max-width: 1280px; margin: 0 auto 18px; }
.cc-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #0E8E40; }
.cc-top h1 { margin: 2px 0 0; font-size: clamp(1.6rem,3vw,2.2rem); color: #07642B; }
.cc-updated { font-size: 12px; color: #5A6660; }
.cc-kpis { max-width: 1280px; margin: 0 auto 18px; display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 700px) { .cc-kpis { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1080px) { .cc-kpis { grid-template-columns: repeat(6, 1fr); } }
.cc-kpi { background: #fff; border: 1px solid #E6DECB; border-radius: 14px; padding: 14px 16px; box-shadow: 0 1px 0 rgba(14,26,15,0.03); }
.cc-kpi-label { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; color: #6b766b; text-transform: uppercase; }
.cc-kpi-val { font-family: 'Playfair Display', Georgia, serif; font-size: 1.9rem; font-weight: 700; line-height: 1.1; margin: 4px 0 2px; }
.cc-kpi-sub { font-size: 12px; color: #5A6660; }
.cc-grid { max-width: 1280px; margin: 0 auto; display: grid; gap: 14px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .cc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1140px) { .cc-grid { grid-template-columns: repeat(3, 1fr); } }
.cc-panel { background: #fff; border: 1px solid #E6DECB; border-radius: 16px; padding: 16px 18px; box-shadow: 0 1px 0 rgba(14,26,15,0.03); }
.cc-panel-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid #F0EAD9; padding-bottom: 8px; }
.cc-panel-head h2 { font-size: 1.05rem; margin: 0; color: #0E1A0F; }
.cc-panel-hint { font-size: 11px; color: #94a08f; font-weight: 600; letter-spacing: 0.04em; }
.cc-empty { font-size: 13px; color: #7a857a; margin: 6px 0; line-height: 1.5; }
.cc-empty code { background: #F0EAD9; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
.cc-markets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.cc-market { background: #FBF8F0; border: 1px solid #EFE8D6; border-radius: 10px; padding: 10px 8px; text-align: center; }
.cc-market-name { font-size: 11px; font-weight: 700; color: #5A6660; }
.cc-market-solv { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin: 2px 0; }
.cc-market-meta { display: flex; flex-direction: column; gap: 1px; font-size: 11px; color: #6b766b; }
.cc-market-date { font-size: 10px; color: #aab2a8; margin-top: 4px; }
.cc-ts { display: flex; flex-direction: column; gap: 14px; }
.cc-ts-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.cc-ts-num { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #07642B; }
.cc-ts-lbl { font-size: 11px; color: #6b766b; }
.cc-ad-totals { display: flex; gap: 14px; flex-wrap: wrap; font-size: 13px; color: #5A6660; margin-bottom: 10px; }
.cc-ad-totals strong { color: #0E1A0F; }
.cc-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.cc-table td { padding: 6px 4px; border-top: 1px solid #F2ECDD; }
.cc-td-name { font-weight: 600; color: #0E1A0F; }
.cc-table td:not(.cc-td-name) { text-align: right; color: #5A6660; white-space: nowrap; }
.cc-sev { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.cc-sev-chip { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.cc-agents { display: flex; flex-direction: column; gap: 6px; }
.cc-agent { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.cc-agent-name { font-weight: 600; flex: 1; }
.cc-agent-when { font-size: 11px; color: #94a08f; }
.cc-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.cc-findings { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
.cc-findings li { display: flex; gap: 9px; align-items: flex-start; }
.cc-fdot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.cc-f-text { font-size: 13px; line-height: 1.4; color: #1A2620; }
.cc-f-meta { font-size: 11px; color: #94a08f; margin-top: 1px; }
.cc-brief { font-size: 13px; line-height: 1.55; color: #3a463a; white-space: pre-wrap; margin: 0; }
.cc-integrations { display: grid; grid-template-columns: repeat(2, 1fr); gap: 7px; }
.cc-int { display: flex; align-items: center; gap: 7px; font-size: 12.5px; }
.cc-int-state { margin-left: auto; font-size: 11px; color: #94a08f; }
.cc-cfo-note { font-size: 12px; color: #5A6660; margin: 10px 0 0; }
.cc-cron { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.cc-cron li { display: flex; justify-content: space-between; gap: 10px; font-size: 12.5px; align-items: baseline; }
.cc-cron-name { color: #1A2620; }
.cc-cron-when { color: #0E8E40; font-weight: 600; white-space: nowrap; }
.cc-foot { max-width: 1280px; margin: 24px auto 0; text-align: center; font-size: 11px; color: #94a08f; }
.cc-locked { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #F5F1E8; font-family: 'DM Sans', system-ui, sans-serif; padding: 20px; }
.cc-lock-card { background: #fff; border: 1px solid #E6DECB; border-radius: 16px; padding: 36px 32px; text-align: center; max-width: 380px; }
.cc-lock-sun { font-size: 28px; }
.cc-lock-card h1 { font-family: 'Playfair Display', serif; color: #07642B; margin: 8px 0; font-size: 1.4rem; }
.cc-lock-card p { font-size: 13px; color: #5A6660; }
.cc-lock-card code { background: #F0EAD9; padding: 1px 6px; border-radius: 4px; }
`;
