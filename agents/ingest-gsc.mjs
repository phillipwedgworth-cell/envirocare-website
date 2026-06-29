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
// AUTH: OAuth2 user credentials (NOT a service account). GSC won't let you add a
// service-account email to a consumer Gmail property via its UI, so we auth AS
// you (phillipwedgworth@gmail.com), who already owns the property. One refresh
// token (with both webmasters.readonly + analytics.readonly scopes) covers this
// script AND ingest-ga4.mjs. Generate it once — see seo-ingest/oauth-setup.md.
//
// ENV (server-side only):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
//   SUPABASE_URL, SUPABASE_KEY  — existing Supabase service-role creds.
//   GSC_SITE_URL                — optional, defaults to https://envirocarellc.com
//
// RUN:  node agents/ingest-gsc.mjs            (last 7 days)
//       node agents/ingest-gsc.mjs --days 480 (backfill ~16 months, first run)
//       node agents/ingest-gsc.mjs --ping      (token smoke-test only — no DB writes)
//
// INSTALL:  npm i googleapis @supabase/supabase-js
// ─────────────────────────────────────────────────────────────────────────────

import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import { cleanEnv } from "./lib/cleanEnv.mjs";

const SITE_URL = cleanEnv(process.env.GSC_SITE_URL) || "sc-domain:envirocarellc.com";
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

function oauthClient() {
  const c = new google.auth.OAuth2(
    requireEnv("GOOGLE_CLIENT_ID"),
    requireEnv("GOOGLE_CLIENT_SECRET")
  );
  c.setCredentials({ refresh_token: requireEnv("GOOGLE_REFRESH_TOKEN") });
  return c;
}

async function ping() {
  console.log("ping: exchanging refresh token…");
  const auth = oauthClient();
  const { credentials } = await auth.refreshAccessToken();
  if (!credentials.access_token) throw new Error("No access_token returned");
  console.log(`ping: token OK (expires ${new Date(credentials.expiry_date).toISOString()})`);

  const sc = google.searchconsole({ version: "v1", auth });
  const pingEnd = new Date(); pingEnd.setDate(pingEnd.getDate() - 3);
  const pingStart = new Date(pingEnd);
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate: iso(pingStart), endDate: iso(pingEnd), dimensions: ["date"], rowLimit: 1, dataState: "final" },
  });
  const rows = res.data.rows || [];
  console.log(JSON.stringify({ ok: true, ping: true, site: SITE_URL, sampleDate: rows[0]?.keys[0] ?? "(no data yet)", clicks: rows[0]?.clicks ?? 0 }, null, 2));
}

async function main() {
  const sc = google.searchconsole({ version: "v1", auth: oauthClient() });
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

const isPing = process.argv.includes("--ping");
(isPing ? ping() : main()).catch((e) => { console.error("ingest-gsc failed:", e.message || e); process.exit(1); });
