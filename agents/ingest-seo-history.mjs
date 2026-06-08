// ─── CLAUDE CODE: RUN THIS SCRIPT ───
// Purpose: Load your GSC CSV exports (Scorpion-era organic history) into Supabase
//          so the agents can track trends over time.
// Run:     node ingest-seo-history.mjs ./path-to-gsc-export-folder
// Install: npm i @supabase/supabase-js papaparse
// Env (do NOT hardcode):
//   SUPABASE_URL                — your project URL
//   SUPABASE_SERVICE_ROLE_KEY   — service-role key (server-side only, never client)
// Prereq: run supabase-seo-history-schema.sql first (creates the tables).
// ─────────────────────────────────────

import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';

const DIR = process.argv[2] || './gsc-export';
const LABEL = `gsc-16mo-${new Date().toISOString().slice(0, 7)}`; // e.g. gsc-16mo-2026-06
const DOMAIN = 'envirocarellc.com';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
if (!url || !key) { console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY)'); process.exit(1); }
const db = createClient(url, key, { auth: { persistSession: false } });

// helpers
const num = (v) => { const n = parseFloat(String(v ?? '').replace(/[, ]/g, '')); return Number.isFinite(n) ? n : 0; };
const pct = (v) => { const s = String(v ?? '').replace('%', '').trim(); const n = parseFloat(s); return Number.isFinite(n) ? +(n / 100).toFixed(4) : null; };
const readCsv = (file) => {
  const p = path.join(DIR, file);
  if (!fs.existsSync(p)) { console.warn(`  (skip) ${file} not found`); return null; }
  const text = fs.readFileSync(p, 'utf8');
  return Papa.parse(text, { header: true, skipEmptyLines: true }).data.filter(r => Object.keys(r).length > 1);
};

async function upsert(table, rows, onConflict) {
  if (!rows?.length) return 0;
  // chunk to stay well under payload limits
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await db.from(table).upsert(rows.slice(i, i + 500), { onConflict });
    if (error) { console.error(`  ! ${table}:`, error.message); throw error; }
  }
  return rows.length;
}

async function main() {
  console.log(`Ingesting from ${DIR}  (label: ${LABEL})\n`);
  const today = new Date().toISOString().slice(0, 10);

  // 1) Daily history → gsc_daily
  const chart = readCsv('Chart.csv');
  let dailyCount = 0, dateStart = null, dateEnd = null;
  if (chart) {
    const rows = chart.map(r => ({
      date: r.Date, clicks: num(r.Clicks), impressions: num(r.Impressions),
      ctr: pct(r.CTR), position: num(r.Position), domain: DOMAIN,
    })).filter(r => r.date);
    dateStart = rows[0]?.date; dateEnd = rows[rows.length - 1]?.date;
    dailyCount = await upsert('gsc_daily', rows, 'date,domain');
    console.log(`  gsc_daily: ${dailyCount} days (${dateStart} → ${dateEnd})`);
  }

  // 2) Queries → gsc_queries
  const queries = readCsv('Queries.csv');
  if (queries) {
    const rows = queries.map(r => ({
      query: r['Top queries'], clicks: num(r.Clicks), impressions: num(r.Impressions),
      ctr: pct(r.CTR), position: num(r.Position), snapshot_label: LABEL, snapshot_date: today,
    })).filter(r => r.query);
    console.log(`  gsc_queries: ${await upsert('gsc_queries', rows, 'query,snapshot_label')}`);
  }

  // 3) Pages → gsc_pages
  const pages = readCsv('Pages.csv');
  if (pages) {
    const rows = pages.map(r => ({
      page: r['Top pages'], clicks: num(r.Clicks), impressions: num(r.Impressions),
      ctr: pct(r.CTR), position: num(r.Position), snapshot_label: LABEL, snapshot_date: today,
    })).filter(r => r.page);
    console.log(`  gsc_pages: ${await upsert('gsc_pages', rows, 'page,snapshot_label')}`);
  }

  // 4) Devices + Countries → gsc_dimensions
  const dims = [];
  for (const [file, dim, keyName] of [['Devices.csv', 'device', 'Device'], ['Countries.csv', 'country', 'Country']]) {
    const data = readCsv(file);
    if (data) data.forEach(r => dims.push({
      dimension: dim, value: r[keyName], clicks: num(r.Clicks), impressions: num(r.Impressions),
      ctr: pct(r.CTR), position: num(r.Position), snapshot_label: LABEL,
    }));
  }
  if (dims.length) console.log(`  gsc_dimensions: ${await upsert('gsc_dimensions', dims.filter(d => d.value), 'dimension,value,snapshot_label')}`);

  // 5) Register the snapshot
  await upsert('seo_snapshots', [{
    label: LABEL, domain: DOMAIN, source: 'gsc',
    date_start: dateStart, date_end: dateEnd, row_count: (queries?.length || 0) + (pages?.length || 0),
  }], 'label,source');

  console.log('\n✅ Done. The agents can now read history from gsc_daily / gsc_queries / gsc_pages / gsc_opportunities.');
}

main().catch(e => { console.error('Ingestion failed:', e.message); process.exit(1); });
