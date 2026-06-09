// agents/ingest-ga4.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Pull GA4 data via Google's OWN free Analytics Data API (no Supermetrics) and
// write monitoring/ga4-latest.json (same shape the old Supermetrics run produced)
// + append monitoring/ga4-history.csv. Optional: also upserts a ga4_weekly row
// to Supabase if GA4_WRITE_SUPABASE=1 (table SQL in ga4_weekly-schema.sql).
//
// AUTH: OAuth2 user credentials (same refresh token as ingest-gsc.mjs). We auth
// AS phillipwedgworth@gmail.com, who has access to the GA4 property — no service
// account needed. Generate the token once — see seo-ingest/oauth-setup.md.
//
// ⚠️ PROPERTY ID GOTCHA: the GA4 *measurement ID* (G-CELEB90NKX) does NOT work
// with the Data API. You need the NUMERIC property ID — GA4 → Admin → Property
// Settings → "Property ID" (e.g. 123456789). Set it as GA4_PROPERTY_ID.
//
// ENV (server-side only):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
//   GA4_PROPERTY_ID     — numeric property id (NOT the G- measurement id).
//   SUPABASE_URL, SUPABASE_KEY  — only needed if GA4_WRITE_SUPABASE=1.
//
// RUN:  node agents/ingest-ga4.mjs            (last 7 days vs prior 7)
// INSTALL:  npm i googleapis @supabase/supabase-js
// ─────────────────────────────────────────────────────────────────────────────

import { google } from "googleapis";
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;            // numeric
const SITE = "envirocarellc.com";
const MEASUREMENT_ID = "G-CELEB90NKX";                      // for reference/output only
const OUT_JSON = resolve(process.env.GA4_OUT || "monitoring/ga4-latest.json");
const OUT_CSV = resolve(process.env.GA4_CSV || "monitoring/ga4-history.csv");

function iso(d) { return d.toISOString().slice(0, 10); }
const end = new Date(); end.setDate(end.getDate() - 1);
const start = new Date(end); start.setDate(start.getDate() - 6);     // last 7 days
const prevEnd = new Date(start); prevEnd.setDate(prevEnd.getDate() - 1);
const prevStart = new Date(prevEnd); prevStart.setDate(prevStart.getDate() - 6);

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

async function main() {
  if (!PROPERTY_ID) { console.error("Missing GA4_PROPERTY_ID (numeric, NOT the G- measurement id)"); process.exit(1); }
  const data = google.analyticsdata({ version: "v1beta", auth: oauthClient() });
  const property = `properties/${PROPERTY_ID}`;

  async function runReport(body) {
    const res = await data.properties.runReport({ property, requestBody: body });
    return res.data;
  }
  const rangeNow = { startDate: iso(start), endDate: iso(end) };
  const rangePrev = { startDate: iso(prevStart), endDate: iso(prevEnd) };

  // Totals (this period vs prior) — sessions, users, engaged sessions, conversions
  const totalsReport = await runReport({
    dateRanges: [rangeNow, rangePrev],
    metrics: [
      { name: "sessions" }, { name: "totalUsers" },
      { name: "engagedSessions" }, { name: "conversions" },
    ],
  });
  // With 2 dateRanges, GA4 returns a dateRange dimension; map rows by it.
  const totalsByRange = {};
  for (const row of totalsReport.rows || []) {
    const rangeName = row.dimensionValues?.[0]?.value || "date_range_0";
    totalsByRange[rangeName] = {
      sessions: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
      engagedSessions: Number(row.metricValues?.[2]?.value || 0),
      conversions: Number(row.metricValues?.[3]?.value || 0),
    };
  }
  const totals = totalsByRange["date_range_0"] || { sessions: 0, users: 0, engagedSessions: 0, conversions: 0 };
  const totalsPrev = totalsByRange["date_range_1"] || null;

  async function breakdown(dimName, metric = "sessions", limit = 15) {
    const r = await runReport({
      dateRanges: [rangeNow],
      dimensions: [{ name: dimName }],
      metrics: [{ name: metric }],
      orderBys: [{ metric: { metricName: metric }, desc: true }],
      limit,
    });
    return (r.rows || []).map((row) => ({
      key: row.dimensionValues?.[0]?.value,
      value: Number(row.metricValues?.[0]?.value || 0),
    }));
  }

  const [channels, landingPages, devices, cities, conversionEvents] = await Promise.all([
    breakdown("sessionDefaultChannelGroup"),
    breakdown("landingPagePlusQueryString"),
    breakdown("deviceCategory"),
    breakdown("city"),
    breakdown("eventName", "conversions"),
  ]);

  const out = {
    report: "envirocare-ga4-weekly",
    run_date: iso(new Date()),
    status: "ok",
    property: MEASUREMENT_ID,
    ga4_property_id: PROPERTY_ID,
    site: SITE,
    data_source: "Google Analytics Data API (direct, no Supermetrics)",
    period: rangeNow,
    prior_period: rangePrev,
    totals,
    totals_prior: totalsPrev,
    channels,
    landing_pages: landingPages,
    devices,
    cities,
    conversion_events: conversionEvents,
  };

  if (!existsSync(dirname(OUT_JSON))) mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(out, null, 2));

  // history CSV (one row per run)
  const header = "run_date,period_start,period_end,sessions,users,engaged_sessions,conversions\n";
  if (!existsSync(OUT_CSV)) writeFileSync(OUT_CSV, header);
  appendFileSync(OUT_CSV,
    `${out.run_date},${rangeNow.startDate},${rangeNow.endDate},${totals.sessions},${totals.users},${totals.engagedSessions},${totals.conversions}\n`);

  // optional Supabase write
  if (process.env.GA4_WRITE_SUPABASE === "1") {
    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_KEY"), { auth: { persistSession: false } });
    const { error } = await db.from("ga4_weekly").upsert([{
      period_end: rangeNow.endDate,
      site: SITE,
      sessions: totals.sessions,
      users: totals.users,
      engaged_sessions: totals.engagedSessions,
      conversions: totals.conversions,
      payload: out,
    }], { onConflict: "period_end,site" });
    if (error) throw error;
  }

  console.log(JSON.stringify({ ok: true, ...totals, wrote: OUT_JSON }, null, 2));
}

main().catch((e) => { console.error("ingest-ga4 failed:", e.message || e); process.exit(1); });
