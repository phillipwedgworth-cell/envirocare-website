// THE SURFACE THIS COVERS, AND WHY IT TOOK TWO INCIDENTS
// ------------------------------------------------------
// Every guard in this repo scans the repo. BrightLocal is not in the repo, so
// nothing has ever read it — and it publishes straight to Google, Bing, Apple
// and Facebook with Active Sync on.
//
//   2026-08-31  Birmingham's GMB description was found carrying
//               "EnviroCare's own damage repair guarantee of up to $1,000,000".
//               data/compliance.ts already matched that exact string. Ten repo
//               guards passed. None of them looks at a listing.
//   2026-09-09  Same string. Same location. Same sync setting. Nine days later,
//               still live, reported again by hand.
//
// The Aug-24, Aug-31 and Sep-9 sweeps each recommended pointing the existing
// rules at the surfaces that actually publish. This does that for BrightLocal.
// It would have failed the build on 2026-08-31 and every day since.
//
// It reuses `blMcpCall` from agents/brightlocal.mjs (same BRIGHTLOCAL_API_KEY,
// same session handshake) and `compileRules`/`scanText` from the single rule
// source. No credentials and no rules are duplicated here.
//
// SKIP/FAIL BEHAVIOUR — the citynap lesson
// ----------------------------------------
//   no key                    → SKIP, exit 0, stated loudly as "not a pass"
//   key present, call fails   → FAIL, exit 1 (a guard that cannot reach its
//                               surface must not report clean)
//   fewer than MIN_LOCATIONS  → FAIL, exit 1 (coverage floor)
//   a description is dirty    → FAIL, exit 1, louder if that channel syncs
//
// Run: node scripts/test-brightlocal-descriptions.mjs

import { compileRules, scanText } from "./lib/compliance-rules.mjs";
import { cleanEnv } from "../agents/lib/env-url.mjs";

const MIN_LOCATIONS = 4; // 4 locations on 2026-09-09. A drop means we stopped looking.
const CHANNELS = ["gmb", "bing", "apple_maps", "facebook"];

function asItems(payload) {
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload)) return payload;
  for (const k of ["data", "locations", "results", "records"]) {
    if (Array.isArray(payload?.[k])) return payload[k];
  }
  return [];
}

async function main() {
  if (!cleanEnv("BRIGHTLOCAL_API_KEY")) {
    console.log("brightlocal-descriptions: SKIPPED — BRIGHTLOCAL_API_KEY is not set.");
    console.log("  This guard checks nothing right now. That is not a pass.");
    console.log("  Set it in CI to cover the listings that publish to Google.");
    return 0;
  }

  // Imported lazily: agents/brightlocal.mjs may throw at import time in some
  // configurations, and a guard should report that rather than crash.
  let blMcpCall;
  try {
    ({ blMcpCall } = await import("../agents/brightlocal.mjs"));
  } catch (e) {
    console.error(`brightlocal-descriptions: FAIL — cannot load the BrightLocal client: ${e.message}`);
    return 1;
  }

  let payload;
  try {
    // Bare call, on purpose. agents/diagnostics/brightlocal-inventory.mjs found
    // that passing num_per_page: 50 returned ZERO items while the bare call
    // returned all four -- the parameter is validated to 1-15 and an out-of-range
    // value fails as an empty list, not an error. The bare call (default 10) was
    // re-verified 2026-09-10 through the BrightLocal connector: 4 items, each with
    // active_sync_data.{gmb,bing,apple_maps,facebook}.description populated and
    // metadata.active_sync.<channel>.active_sync_enabled -- the exact paths read
    // below. total_count is checked so growth past one page fails loudly.
    payload = await blMcpCall("find_locations");
  } catch (e) {
    console.error(`brightlocal-descriptions: FAIL — find_locations failed: ${e.message}`);
    console.error("  Note: 'no session ID returned' is how a rejected/expired key presents.");
    console.error("  The review-responder hit exactly this on 2026-09-07 across all three RM reports.");
    return 1;
  }

  const items = asItems(payload);
  const total = Number(payload?.total_count ?? items.length);
  if (Number.isFinite(total) && total > items.length) {
    console.error(`brightlocal-descriptions: FAIL — BrightLocal reports ${total} locations but only ${items.length} were returned.`);
    console.error("  The account outgrew one page. Add paging here before trusting this guard again.");
    return 1;
  }
  if (items.length < MIN_LOCATIONS) {
    console.error(`brightlocal-descriptions: FAIL — ${items.length} location(s) returned (floor ${MIN_LOCATIONS}).`);
    console.error("  Either locations were removed, or the response shape changed and most are unscanned.");
    return 1;
  }

  const rules = compileRules();
  let scanned = 0;
  const blocked = [];
  const warned = [];

  for (const item of items) {
    const loc = item.location ?? item;
    const name = `${loc.business_name ?? loc.name ?? "?"} / ${loc.address?.city ?? "?"} (${loc.location_id ?? "?"})`;
    const sync = loc.active_sync_data?.metadata?.active_sync ?? {};

    for (const ch of CHANNELS) {
      const desc = loc.active_sync_data?.[ch]?.description;
      if (typeof desc !== "string" || !desc.trim()) continue;
      scanned++;
      const live = sync?.[ch]?.active_sync_enabled === true;
      const scan = scanText(desc, rules);
      for (const h of scan.blocking || []) blocked.push({ name, ch, live, ...h });
      for (const h of scan.warnings || []) warned.push({ name, ch, live, ...h });
    }
  }

  if (scanned === 0) {
    console.error(`brightlocal-descriptions: FAIL — ${items.length} locations returned but 0 descriptions were readable.`);
    console.error("  All description fields are empty, or the payload shape changed.");
    return 1;
  }

  for (const w of warned) {
    console.warn(`  warn  ${w.name} [${w.ch}${w.live ? ", SYNCING" : ""}]: ${w.reason} — "${w.match}"`);
  }

  if (blocked.length) {
    const liveCount = blocked.filter((b) => b.live).length;
    console.error(`\nbrightlocal-descriptions: FAIL — ${blocked.length} banned phrase(s) in listing copy` +
      (liveCount ? `, ${liveCount} of them on a channel with Active Sync ON:` : ":") + "\n");
    for (const b of blocked) {
      console.error(`  ${b.name}  [${b.ch}]${b.live ? "  🔴 SYNCING TO THE LIVE LISTING" : "  (sync off)"}`);
      console.error(`      match:  "${b.match}"`);
      console.error(`      reason: ${b.reason}\n`);
    }
    console.error("This copy publishes to Google/Bing/Apple. Fix it in BrightLocal, not in the repo.\n");
    return 1;
  }

  console.log(`  ok   ${scanned} listing description(s) across ${items.length} locations — no blocking hits`);
  if (warned.length) console.log(`  ${warned.length} non-blocking warning(s) above`);
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.error(`brightlocal-descriptions: FAIL — unexpected error: ${e?.stack || e}`);
    process.exit(1);
  });
