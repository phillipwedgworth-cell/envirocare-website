// ─── CLAUDE CODE: RUN THIS SCRIPT ───
// Purpose: Load Google Ads campaign report CSV into Supabase
// Run:     node ingest-gads-campaigns.mjs ./path-to-campaign-report.csv
// Install: npm i @supabase/supabase-js papaparse  (already installed)
// Env:     SUPABASE_URL  SUPABASE_SERVICE_ROLE_KEY
// Prereq:  run agents/supabase-gads-schema.sql first.
// ─────────────────────────────────────

import fs from 'node:fs';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';
import { cleanEnv } from './lib/cleanEnv.mjs';

const FILE = process.argv[2];
if (!FILE) { console.error('Usage: node ingest-gads-campaigns.mjs <campaign-report.csv>'); process.exit(1); }

const url = cleanEnv(process.env.SUPABASE_URL);
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
if (!url || !key) { console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY)'); process.exit(1); }
const db = createClient(url, key, { auth: { persistSession: false } });

const num = (v) => { const n = parseFloat(String(v ?? '').replace(/[,$%  ]/g, '')); return Number.isFinite(n) ? n : 0; };
const pct = (v) => { const n = parseFloat(String(v ?? '').replace(/[%]/g, '').trim()); return Number.isFinite(n) ? +(n / 100).toFixed(4) : null; };
const nullBlank = (v) => { const s = String(v ?? '').trim(); return (s === '' || s === '--') ? null : s; };

const text = fs.readFileSync(FILE, 'utf8');
const lines = text.split('\n');

// Row 1 is report title, row 2 is date range, row 3 is header
const dateRangeLine = lines[1] ?? '';
const dateMatch = dateRangeLine.match(/([A-Za-z]+ \d+,\s*\d{4})\s*[-–]\s*([A-Za-z]+ \d+,\s*\d{4})/);
const parseDate = (s) => { const d = new Date(s?.trim()); return isNaN(d) ? null : d.toISOString().slice(0, 10); };
const dateStart = dateMatch ? parseDate(dateMatch[1]) : null;
const dateEnd   = dateMatch ? parseDate(dateMatch[2]) : null;
const LABEL = `gads-scorpion-${dateEnd ?? new Date().toISOString().slice(0, 7)}`;
const today = new Date().toISOString().slice(0, 10);

console.log(`Ingesting ${FILE}`);
console.log(`  Date range: ${dateStart} → ${dateEnd}  (label: ${LABEL})\n`);

// Skip header lines, parse from row 3 onward
const csvBody = lines.slice(2).join('\n');
const { data } = Papa.parse(csvBody, { header: true, skipEmptyLines: true });

const rows = data
  .filter(r => r['Campaign'] && r['Campaign'].trim() !== '')
  .map(r => ({
    campaign:       r['Campaign'].trim(),
    network:        nullBlank(r['Network (with search partners)']),
    status:         nullBlank(r['Status']),
    campaign_type:  nullBlank(r['Campaign type']),
    budget:         num(r['Budget']) || null,
    clicks:         num(r['Clicks']),
    impressions:    num(r['Impr.']),
    interactions:   num(r['Interactions']),
    cost:           num(r['Cost']) || null,
    avg_cpc:        num(r['Avg. CPC']) || null,
    conversions:    num(r['Conversions']) || null,
    conv_rate:      pct(r['Conv. rate']),
    cost_per_conv:  num(r['Cost / conv.']) || null,
    bid_strategy:   nullBlank(r['Bid strategy type']),
    snapshot_label: LABEL,
    snapshot_date:  today,
    date_start:     dateStart,
    date_end:       dateEnd,
  }));

if (!rows.length) { console.error('No rows parsed — check CSV format'); process.exit(1); }

// Deduplicate by (campaign, network, snapshot_label) — last row wins
const seen = new Map();
for (const r of rows) {
  const k = `${r.campaign}||${r.network}||${r.snapshot_label}`;
  seen.set(k, r);
}
const deduped = [...seen.values()];
console.log(`  Rows: ${rows.length} parsed → ${deduped.length} unique`);

// Try full insert first; if column missing, fall back to core columns only
const tryUpsert = async (payload, onConflict) => {
  for (let i = 0; i < payload.length; i += 500) {
    const { error } = await db.from('gads_campaigns').upsert(payload.slice(i, i + 500), { onConflict });
    if (error) return error;
  }
  return null;
};

let err = await tryUpsert(deduped, 'campaign,network,snapshot_label');
if (err && err.message?.includes('schema cache')) {
  console.warn('  Some columns missing — inserting core fields only');
  const core = deduped.map(({ campaign, network, status, clicks, impressions, cost, snapshot_label, snapshot_date, date_start, date_end }) =>
    ({ campaign, network, status, clicks, impressions, cost, snapshot_label, snapshot_date, date_start, date_end }));
  err = await tryUpsert(core, 'campaign,network,snapshot_label');
}
if (err) { console.error('Insert error:', err.message); process.exit(1); }

console.log(`  gads_campaigns: ${rows.length} rows loaded`);
console.log('\nDone. Agents can now read paid campaign history from gads_campaigns.');
