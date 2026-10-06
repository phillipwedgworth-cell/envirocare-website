import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  LOCAL_FALCON_CAMPAIGNS,
  localFalconBaseline,
  localFalconComparison,
  localFalconGridLabel,
  localFalconNumber,
  localFalconRunIdentity,
} from "../agents/lib/local-falcon-campaigns.mjs";

assert.equal(LOCAL_FALCON_CAMPAIGNS.length, 4, "all four verified offices must be monitored");
assert.equal(new Set(LOCAL_FALCON_CAMPAIGNS.map((c) => c.key)).size, 4, "campaign keys must be unique");
assert.equal(new Set(LOCAL_FALCON_CAMPAIGNS.map((c) => c.placeId)).size, 4, "place IDs must be unique");
assert.ok(LOCAL_FALCON_CAMPAIGNS.some((c) => c.location === "Birmingham"), "new Birmingham office campaign is required");
// Each market's campaign must scan THAT market's profile (verified live 2026-09-27).
const PLACE = { Birmingham: "ChIJjXGa0ZsbiYgR1mB0oEKnqUo", Alabaster: "ChIJr8cmt-EeiYgR_jgX9xsiZWY", "Alex City": "ChIJ508mEjcLjIgRZ2HdWgXX76c", Huntsville: "ChIJd4YXKCRmqmIR1DmDoEcGohU" };
for (const c of LOCAL_FALCON_CAMPAIGNS) assert.equal(c.placeId, PLACE[c.location], `${c.key} is labelled ${c.location} but scans another office's profile`);

const expectedBaselines = new Map([
  ["4ee47a23fc4793e", "9x9-20mi"],
  ["51d824c315edded", "7x7-10mi"],
  ["a99dae3fd51a462", "7x7-10mi"],
  ["a58db3090ac9ab0", "7x7-7mi"],
]);

for (const campaign of LOCAL_FALCON_CAMPAIGNS) {
  assert.equal(localFalconBaseline(null, campaign.key), expectedBaselines.get(campaign.key));
}

assert.equal(localFalconGridLabel("7x7"), "7x7", "formatted grids must not become 7x7x7x7");
assert.equal(localFalconBaseline({ grid_size: "7x7", radius: 10 }, "a99dae3fd51a462"), "7x7-10mi");
assert.equal(localFalconBaseline({ grid_size: 5, radius_miles: 15 }, "a99dae3fd51a462"), "5x5-15mi");

for (const path of ["agents/seo-snapshot.mjs", "agents/seo-monitor.mjs", "agents/local-falcon-ingest.mjs"]) {
  const source = await readFile(path, "utf8");
  assert.match(source, /\.\/lib\/local-falcon-campaigns\.mjs/, `${path} must use the canonical campaign config`);
}

// ── Missing is not zero ────────────────────────────────────────────────────
for (const missing of [null, undefined, "", "  ", "n/a", NaN, true, false]) {
  assert.equal(localFalconNumber(missing), null, `${JSON.stringify(missing)} must read as missing, not 0`);
}
assert.equal(localFalconNumber(0), 0, "a measured 0 stays 0");
assert.equal(localFalconNumber("0"), 0, 'a measured "0" stays 0');
assert.equal(localFalconNumber("13.36"), 13.36);

// ── Run identity: a re-pointed key must not relabel its history ────────────
const BHM = "4ee47a23fc4793e", ALB = "51d824c315edded", HSV = "a58db3090ac9ab0";
const legacy = localFalconRunIdentity(BHM, "2026-09-18");
assert.equal(legacy.location, "Alabaster", "4ee47a23's 09-18 run measured Alabaster");
assert.equal(legacy.placeId, PLACE.Alabaster);
assert.equal(legacy.inSeries, false, "a legacy run is not part of the Birmingham series");
const firstBhm = localFalconRunIdentity(BHM, "2026-10-02T14:00:00.000Z");
assert.equal(firstBhm.location, "Birmingham");
assert.equal(firstBhm.inSeries, true, "the first Birmingham-profile run starts the Birmingham series");
assert.notEqual(legacy.seriesId, firstBhm.seriesId, "legacy and new series must never share an id");
// The scan's own place_id wins over every rule.
assert.equal(localFalconRunIdentity(BHM, "2026-09-18", PLACE.Birmingham).location, "Birmingham");
assert.equal(localFalconRunIdentity(BHM, "2026-10-16", PLACE.Alabaster).inSeries, false, "a profile switch back is detected from the scan");
// New Alabaster campaign: not run yet → pending, not a series.
assert.equal(localFalconRunIdentity(ALB, null).inSeries, false, "never-run Alabaster Core is pending");
assert.equal(localFalconRunIdentity(ALB, "2026-10-02").inSeries, true);
// Ongoing series are unaffected.
assert.equal(localFalconRunIdentity(HSV, "2026-09-18").inSeries, true);

// ── Comparison rules ───────────────────────────────────────────────────────
const s1 = firstBhm.seriesId;
const reading = (runDate, keywords, over = {}) => ({ seriesId: s1, baseline: "9x9-20mi", runDate, keywords, ...over });
const a = reading("2026-10-02", { "pest control birmingham al": 4, "termite control birmingham al": 2 });
const b = reading("2026-10-16", { "pest control birmingham al": 6, "termite control birmingham al": 2 });
assert.deepEqual(localFalconComparison(a, b).delta, 1, "same series, same cohort → mean delta");
assert.equal(localFalconComparison(a, a).comparable, false, "same run read twice is not a +0.00 change");
assert.equal(localFalconComparison(a, a).sameRun, true);
assert.equal(localFalconComparison({ ...a, seriesId: legacy.seriesId, runDate: "2026-09-18" }, b).comparable, false,
  "Alabaster 13.36 vs Birmingham must never produce a delta (finding 9769)");
assert.equal(localFalconComparison({ ...a, seriesId: undefined }, b).comparable, false, "pre-fix priors without series_id are not comparable");
assert.equal(localFalconComparison({ ...a, baseline: "5x5-10mi" }, b).comparable, false, "grid change breaks comparison");
assert.equal(localFalconComparison(a, { ...b, baseline: "?x?-?mi" }).comparable, false, "unknown grid breaks comparison");
const grown = reading("2026-10-16", { "pest control birmingham al": 10, "sentricon birmingham al": 0 });
const g = localFalconComparison(a, grown);
assert.equal(g.comparable, true);
assert.equal(g.commonKeywords, 1, "added keywords are excluded from the delta");
assert.equal(g.delta, 6);
assert.equal(g.cohortChanged, true, "cohort change is disclosed");
const withMissing = reading("2026-10-16", { "pest control birmingham al": null, "termite control birmingham al": 3 });
assert.equal(localFalconComparison(a, withMissing).commonKeywords, 1, "a missing number is skipped, not counted as 0");

// Readers must label by run identity and must not use bare Number() on scores.
for (const path of ["agents/seo-snapshot.mjs", "agents/seo-monitor.mjs", "agents/local-falcon-ingest.mjs"]) {
  const source = await readFile(path, "utf8");
  assert.match(source, /localFalconRunIdentity/, `${path} must resolve each run's measured profile`);
  assert.match(source, /localFalconNumber/, `${path} must use the null-safe number reader`);
}
const watcher = await readFile("agents/competitor-watcher.mjs", "utf8");
assert.match(watcher, /\$\{r\.place_id/, "competitor-watcher must key runs by measured profile");

console.log("✓ Local Falcon identity: legacy runs stay Alabaster, new series start clean, missing ≠ 0, no cross-series deltas");
console.log("✓ Local Falcon config: 4 campaigns, unique place IDs, correct per-market baselines");
