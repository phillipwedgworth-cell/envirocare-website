// ─── CLAUDE CODE: ADD TO THE AGENT REPO ───
// Path: lib/seo-history.mjs  (sits next to lib/kv.mjs)
// Purpose: gives the GSC + GA4 Digest agent (#4) MEMORY — it reads the stored
//          gsc_* history and reports MOVEMENT vs last snapshot, not flat numbers.
// Requires: @supabase/supabase-js, and the supabase-seo-history-schema.sql tables.
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or reuse SUPABASE_KEY already wired)
// ──────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';
import { envUrl } from './env-url.mjs';

// Lazy, guarded client. Creating the client at module scope crashes the
// Next.js production build during "Collecting page data" (env vars are
// runtime-only). Instantiate on first use and no-op when env is missing.
let _db;
function getDb() {
  if (_db !== undefined) return _db;
  const url = envUrl("SUPABASE_URL");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  _db = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return _db;
}

// Most recent stored query snapshot label (so we compare against the right baseline).
export async function getLatestSnapshotLabel() {
  const db = getDb();
  if (!db) return null;
  const { data } = await db
    .from('seo_snapshots')
    .select('label, date_end')
    .eq('source', 'gsc')
    .order('loaded_at', { ascending: false })
    .limit(1);
  return data?.[0]?.label || null;
}

// The opportunity list (high impressions, low clicks) — what to write/fix next.
export async function getOpportunities(limit = 10) {
  const db = getDb();
  if (!db) return [];
  const { data, error } = await db
    .from('gsc_opportunities')
    .select('*')
    .limit(limit);
  if (error) return [];
  return data;
}

// Daily trend: compare the last `days` to the prior `days`. Returns deltas.
export async function getDailyTrend(days = 28) {
  const db = getDb();
  if (!db) return null;
  const { data } = await db
    .from('gsc_daily')
    .select('date, clicks, impressions, position')
    .order('date', { ascending: false })
    .limit(days * 2);
  if (!data?.length) return null;
  const recent = data.slice(0, days);
  const prior = data.slice(days, days * 2);
  const sum = (rows, k) => rows.reduce((a, r) => a + (r[k] || 0), 0);
  const avg = (rows, k) => rows.length ? sum(rows, k) / rows.length : 0;
  return {
    clicks: { now: sum(recent, 'clicks'), prev: sum(prior, 'clicks') },
    impressions: { now: sum(recent, 'impressions'), prev: sum(prior, 'impressions') },
    position: { now: +avg(recent, 'position').toFixed(1), prev: +avg(prior, 'position').toFixed(1) },
  };
}

// Compare a FRESH GSC pull (array of {query, impressions, position}) to the last
// stored snapshot. Returns the biggest movers — this is the "what changed" the
// Monday Brief leads with.
export async function getQueryDeltas(freshQueries = [], topN = 8) {
  const db = getDb();
  if (!db) return { note: 'Supabase not configured — no snapshot history available.' };
  const label = await getLatestSnapshotLabel();
  if (!label) return { note: 'No prior snapshot yet — first run establishes the baseline.' };
  const { data: prior } = await db
    .from('gsc_queries')
    .select('query, impressions, position')
    .eq('snapshot_label', label);
  const priorMap = new Map((prior || []).map(r => [r.query, r]));
  const movers = [];
  for (const q of freshQueries) {
    const old = priorMap.get(q.query);
    if (!old) { movers.push({ query: q.query, posDelta: null, isNew: true, position: q.position }); continue; }
    const posDelta = +(old.position - q.position).toFixed(1); // positive = moved UP (lower number)
    if (Math.abs(posDelta) >= 2) movers.push({ query: q.query, posDelta, from: old.position, to: q.position });
  }
  movers.sort((a, b) => (b.posDelta || 0) - (a.posDelta || 0));
  return { baseline: label, movers: movers.slice(0, topN) };
}

// ─── HOW THE AGENT USES THIS ───
// In the GSC Digest agent (#4), at the start of its run:
//   import { getDailyTrend, getQueryDeltas, getOpportunities } from '../lib/seo-history.mjs';
//   const trend  = await getDailyTrend(28);
//   const movers = await getQueryDeltas(freshGscPull);   // freshGscPull = this week's GSC data
//   const opps   = await getOpportunities(10);
// Then phrase findings as movement: "Clicks 28d: {trend.clicks.now} vs {prev}",
//   "Madison {mover.from}→{mover.to}", "Next page to write: {opps[0].page}".
// After the run, re-run the ingestion (or insert this week's pull) so next week has a baseline.
