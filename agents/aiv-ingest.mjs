// agents/aiv-ingest.mjs — BrightLocal AI Visibility → Supabase aiv_runs.
//
// WHY (2026-10-12): BrightLocal runs AI Visibility reports (Google AI Overview,
// Google AI Mode, ChatGPT) every Monday for Huntsville, Alabaster and Alex City,
// and on demand for Birmingham — but no agent ever read them. The results sat in
// BrightLocal while aeo-watch / ai-citation-probe were retired (2026-09-27).
// This stores one row per completed run so morning-brief can report it and the
// trend is queryable.
//
// Read-only against BrightLocal. Idempotent: run_id is the primary key, so a run
// already stored is skipped. Competitor names arrive wrapped in BrightLocal's
// [UNTRUSTED_DATA] envelope — they are stored as data, never shown verbatim in
// customer copy (competitor names are banned there).
//
// Usage: node agents/aiv-ingest.mjs
import { blMcpCall } from './brightlocal.mjs';
import { supabase, logAgentRun } from './lib/supabase.mjs';

const AGENT = 'aiv-ingest';
// BrightLocal location id -> market label used across the fleet.
const MARKETS = { 4068730: 'Huntsville', 4068335: 'Alabaster', 4068729: 'Alex City', 4130578: 'Birmingham' };

const strip = (s) => String(s ?? '').replace(/\[\/?UNTRUSTED_DATA[^\]]*\]/g, '').trim();
const n = (v) => (v === null || v === undefined || v === '' || !Number.isFinite(Number(v)) ? null : Number(v));

async function run() {
  if (!supabase) throw new Error('Supabase not configured');
  const found = await blMcpCall('find_aiv_reports', { num_per_page: 15 });
  const reports = found?.data ?? [];
  const out = [];
  for (const rep of reports) {
    const market = MARKETS[rep.location_id] ?? String(rep.location_id);
    try {
      const r = await blMcpCall('get_aiv_latest_run', { report_id: rep.report_id });
      if (r?.status !== 'completed' || !r.result) { out.push(`${market}: latest run ${r?.status ?? 'missing'}`); continue; }
      const { data: have } = await supabase.from('aiv_runs').select('run_id').eq('run_id', r.run_id).limit(1);
      if (have?.length) { out.push(`${market}: run ${r.completed_at?.slice(0, 10)} already stored`); continue; }
      const s = r.result.summary ?? {};
      const platforms = Object.fromEntries(Object.entries(r.result.platform_breakdown ?? {}).map(([k, v]) => [k, { visibility_score: n(v?.visibility_score), mention_rate: n(v?.mention_rate), avg_position: n(v?.avg_position) }]));
      const top = (r.result.competitors ?? []).slice(0, 5).map((c) => ({ name: strip(c.name), mention_rate: n(c.mention_rate ?? c.visibility) }));
      const { error } = await supabase.from('aiv_runs').insert({
        run_id: r.run_id, report_id: rep.report_id, location_id: rep.location_id, market,
        completed_at: r.completed_at, visibility_score: n(s.visibility_score), mention_rate: n(s.mention_rate),
        share_of_voice: n(s.share_of_voice), avg_position: n(s.avg_position), checks: n(s.checks_with_ai_response),
        platforms, top_competitors: top,
      });
      if (error) throw new Error(error.message);
      out.push(`${market}: stored ${r.completed_at?.slice(0, 10)} visibility ${s.visibility_score} mention ${s.mention_rate}%`);
    } catch (e) {
      out.push(`${market}: error ${e.message}`);
    }
    if (rep.schedule_frequency === 'manual') out.push(`${market}: report is MANUAL — set it to weekly in BrightLocal or it never refreshes`);
  }
  for (const l of out) console.log(`[${AGENT}] ${l}`);
  await logAgentRun(AGENT, out.some((l) => l.includes('error')) ? 'partial' : 'ok', { lines: out }, `${reports.length} AI Visibility reports checked`);
}

run().catch(async (e) => { console.error(`[${AGENT}] ${e.message}`); try { await logAgentRun(AGENT, 'fail', { error: e.message }); } catch {} process.exit(1); });
