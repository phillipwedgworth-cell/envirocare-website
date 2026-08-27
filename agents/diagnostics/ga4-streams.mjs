/**
 * agents/diagnostics/ga4-streams.mjs — read-only GA4 data-stream inspector.
 *
 * WHY THIS EXISTS (2026-08-27)
 * ---------------------------------------------------------------------------
 * Live headless-Chrome testing proved the browser tag loads correctly but
 * sends ZERO /g/collect hits, even with consent forced to all-granted. The
 * gtag container for G-CELEB90NKX still returns fully loaded (state:2), which
 * rules out a simply retired ID. The remaining explanation is that the GA4
 * WEB DATA STREAM was deleted and recreated — recreating a stream mints a new
 * G-... Measurement ID and silently orphans the old one, so the site keeps
 * sending to an address nobody reads.
 *
 * This script asks the GA4 Admin API which streams actually exist right now
 * and what their Measurement IDs are. The `createTime` on each stream is the
 * decisive evidence: a web stream created around 2026-08-20 confirms the
 * delete/recreate theory and explains the traffic cliff (260 sessions
 * Aug 13-19 -> 1).
 *
 * READ-ONLY. Lists streams; changes nothing. Uses the same OAuth refresh
 * token as ingest-ga4.mjs / ingest-gsc.mjs (analytics.readonly covers Admin
 * API read methods), so it needs no new credentials.
 *
 * RUN: via the "GA4 Stream Check" workflow (workflow_dispatch), which is where
 * the Google OAuth secrets live.
 */
import { google } from "googleapis";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

function requireEnv(name) {
  const v = process.env[name];
  if (!v) { console.error(`::error::Missing ${name}`); process.exit(1); }
  return v;
}

function oauthClient() {
  const c = new google.auth.OAuth2(
    requireEnv("GOOGLE_CLIENT_ID"),
    requireEnv("GOOGLE_CLIENT_SECRET"),
  );
  c.setCredentials({ refresh_token: requireEnv("GOOGLE_REFRESH_TOKEN") });
  return c;
}

async function main() {
  if (!PROPERTY_ID) {
    console.error("::error::Missing GA4_PROPERTY_ID (numeric property id, NOT the G- measurement id)");
    process.exit(1);
  }
  const admin = google.analyticsadmin({ version: "v1beta", auth: oauthClient() });
  const property = `properties/${PROPERTY_ID}`;

  // Property itself — confirms the numeric id resolves and we can read it.
  try {
    const p = await admin.properties.get({ name: property });
    console.log(`PROPERTY  ${PROPERTY_ID}`);
    console.log(`  displayName : ${p.data.displayName}`);
    console.log(`  createTime  : ${p.data.createTime}`);
    console.log(`  timeZone    : ${p.data.timeZone}`);
    console.log(`  currency    : ${p.data.currencyCode}`);
  } catch (e) {
    console.error(`::error::properties.get failed: ${e.message}`);
    process.exit(1);
  }

  // The answer we actually came for.
  const res = await admin.properties.dataStreams.list({ parent: property, pageSize: 200 });
  const streams = res.data.dataStreams ?? [];
  console.log(`\nDATA STREAMS (${streams.length})`);
  if (!streams.length) {
    console.log("  (none — a property with no web stream cannot receive tag traffic at all)");
  }

  const webIds = [];
  for (const s of streams) {
    const mid = s.webStreamData?.measurementId ?? "";
    if (mid) webIds.push(mid);
    console.log(`\n  ${s.displayName}`);
    console.log(`    type          : ${s.type}`);
    console.log(`    MEASUREMENT ID: ${mid || "(not a web stream)"}`);
    console.log(`    defaultUri    : ${s.webStreamData?.defaultUri ?? "-"}`);
    console.log(`    createTime    : ${s.createTime}   <-- recent = stream was recreated`);
    console.log(`    updateTime    : ${s.updateTime}`);
    console.log(`    resourceName  : ${s.name}`);
  }

  // Verdict against what the site is currently hardcoded to send to.
  const LIVE = "G-CELEB90NKX";
  console.log(`\n=== VERDICT ===`);
  console.log(`site currently sends to : ${LIVE}`);
  console.log(`property's web stream(s): ${webIds.join(", ") || "(none)"}`);
  if (webIds.includes(LIVE)) {
    console.log(`MATCH — the ID is correct, so the dead-tracking cause is NOT a stale measurement id.`);
    console.log(`Next suspects: an internal-traffic/developer filter, a data-redaction rule, or`);
    console.log(`hostname mismatch in the stream config. Check Admin > Data Streams > Configure tag settings.`);
  } else {
    console.log(`MISMATCH — this is the bug. The site is sending to an ID this property no longer has.`);
    console.log(`FIX: set NEXT_PUBLIC_GA_ID in Vercel to the Measurement ID above, then redeploy.`);
  }
}

main().catch((e) => { console.error(`::error::${e.message}`); process.exit(1); });
