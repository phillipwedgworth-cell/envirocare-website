// agents/ingest-gsc.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Pull Google Search Console data via Google's OWN free API (no Supermetrics)
// and upsert into the Supabase tables the agents already read:
//   gsc_daily   (date, clicks, impressions, ctr, position, domain)  unique(date,domain)
//   gsc_queries (query, ..., snapshot_label, snapshot_date)          unique(query,snapshot_label)
//   gsc_pages   (page,  ..., snapshot_label, snapshot_date)          unique(page,snapshot_label)
//   seo_snapshots (registry row per run)
//
// seo-monitor.mjs + agents/lib/seo-history.mjs read these, so once this runs the
// trend memory + weekly GSC report work again — no agent code changes needed.
//
// ENV (server-side only):
//   GOOGLE_SA_KEY_JSON  — full service-account JSON key (one line). The SA email
//                         must be added as a user on the GSC property.
//   SUPABASE_URL, SUPABASE_KEY  — existing Supabase service-role creds.
//
// RUN:  node agents/ingest-gsc.mjs            (last 7 days)
//       node agents/ingest-gsc.mjs --days 480 (backfill ~16 months, first run)
//
// INSTALL:  npm i googleapis @supabase/supabase-js
// ─────────────────────────────────────────────────────────────────────────────

import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.GSC_SITE_URL || "https://envirocarellc.com";
const DOMAIN = "envirocarellc.com";
const ROW_LIMIT = 25000;

// ── args ──
const daysArg = process.argv.indexOf("--days");
const DAYS = daysArg !== -1 ? parseInt(process.argv[daysArg + 1], 10) : 7;

// ── date helpers (GSC data lags ~2-3 days; end 3 days back to avoid partial rows) ──
function iso(d) { return d.toISOString().slice(0, 10); }
const end = new Date(); end.setDate(end.getDate() - 3);
const start = new Date(end); start.setDate(start.getDate() - (DAYS - 1));
const startDate = iso(start);
const endDate = iso(end);
const snapshotLabel = `gsc-weekly-${iso(new Date())}`;

function requireEnv(name) {
  const v = process.env[name];
  if (!v) { console.error(`Missing ${name}`); process.exit(1); }
  return v;
}

async function main() {
  const credentials = JSON.parse(requireEnv("GOOGLE_SA_KEY_JSON"));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const sc = google.searchconsole({ version: "v1", auth });
  const db = createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_KEY"), {
    auth: { persistSession: false },
  });

  async function query(dimensions) {
    const res = await sc.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: { startDate, endDate, dimensions, rowLimit: ROW_LIMIT, dataState: "final" },
    });
    return res.data.rows || [];
  }

  // 1) daily
  const dailyRows = (await query(["date"])).map((r) => ({
    date: r.keys[0],
    clicks: Math.round(r.clicks || 0),
    impressions: Math.round(r.impressions || 0),
    ctr: Number((r.ctr || 0).toFixed(4)),       // GSC returns ctr as a fraction
    position: Number((r.position || 0).toFixed(2)),
    domain: DOMAIN,
  }));
  if (dailyRows.length) {
    const { error } = await db.from("gsc_daily").upsert(dailyRows, { onConflict: "date,domain" });
    if (error) throw error;
  }

  // 2) queries
  const queryRows = (await query(["query"])).map((r) => ({
    query: r.keys[0],
    clicks: Math.round(r.clicks || 0),
    impressions: Math.round(r.impressions || 0),
    ctr: Number((r.ctr || 0).toFixed(4)),
    position: Number((r.position || 0).toFixed(2)),
    snapshot_label: snapshotLabel,
    snapshot_date: endDate,
  }));
  if (queryRows.length) {
    const { error } = await db.from("gsc_queries").upsert(queryRows, { onConflict: "query,snapshot_label" });
    if (error) throw error;
  }

  // 3) pages
  const pageRows = (await query(["page"])).map((r) => ({
    page: r.keys[0],
    clicks: Math.round(r.clicks || 0),
    impressions: Math.round(r.impressions || 0),
    ctr: Number((r.ctr || 0).toFixed(4)),
    position: Number((r.position || 0).toFixed(2)),
    snapshot_label: snapshotLabel,
    snapshot_date: endDate,
  }));
  if (pageRows.length) {
    const { error } = await db.from("gsc_pages").upsert(pageRows, { onConflict: "page,snapshot_label" });
    if (error) throw error;
  }

  // 4) registry row
  {
    const { error } = await db.from("seo_snapshots").upsert(
      [{
        label: snapshotLabel,
        domain: DOMAIN,
        source: "gsc",
        date_start: startDate,
        date_end: endDate,
        row_count: dailyRows.length + queryRows.length + pageRows.length,
      }],
      { onConflict: "label,source" }
    );
    if (error) throw error;
  }

  console.log(JSON.stringify({
    ok: true, site: SITE_URL, range: `${startDate}..${endDate}`,
    snapshot: snapshotLabel,
    daily: dailyRows.length, queries: queryRows.length, pages: pageRows.length,
  }, null, 2));
}

main().catch((e) => { console.error("ingest-gsc failed:", e.message || e); process.exit(1); });
