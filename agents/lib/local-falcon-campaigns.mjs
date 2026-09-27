/**
 * Canonical Local Falcon campaign configuration.
 *
 * Keep stable campaign keys here and enrich them with live API metadata at
 * runtime. SoLV is only comparable within the same grid/radius baseline.
 * See agents/knowledge/local-falcon-baseline.md before changing these values.
 */
// Re-verified against the live Local Falcon account 2026-09-27:
//   4ee47a23fc4793e  Its 2026-09-18 scans measured the ALABASTER profile
//                    (2025 Butler Rd, ChIJr8cmt…) — so every row already in
//                    lf_visibility labelled "Alabaster" for this key is CORRECT.
//                    The campaign has since been renamed "Birmingham Core —
//                    Biweekly (9x9, 22kw, Birmingham GBP)" and a placeId filter
//                    now returns it for the 16th Ave BIRMINGHAM profile, so from
//                    its next run (2026-10-02) it measures Birmingham.
//                    The SoLV series breaks there: do not compare across it.
//   51d824c315edded  "Alabaster Core — Biweekly (7x7, 17kw, Alabaster GBP)" takes
//                    over Butler Rd from 2026-10-02 (first run). Before this
//                    change it was not seeded, so Alabaster would have dropped
//                    out of every brief after 10-02.
//   e9348fff16b95fa  is a MONTHLY 5x5/10mi Birmingham/Hoover/OTM campaign (the
//                    old entry said 9x9/20mi biweekly). Superseded as Birmingham's
//                    core by 4ee47a23 from 10-02.
// The ingest labels rows by the SCAN's place_id first (marketFor), so rows follow
// the profile actually measured, whichever key produced them.
export const LOCAL_FALCON_CAMPAIGNS = Object.freeze([
  Object.freeze({
    key: "4ee47a23fc4793e",
    location: "Birmingham",
    campaignName: "EnviroCare Birmingham Core — Biweekly (9x9, 22kw, Birmingham GBP)",
    placeId: "ChIJjXGa0ZsbiYgR1mB0oEKnqUo",
    gridSize: 9,
    radiusMiles: 20,
    target: 15,
    targetNeedsReview: false,
  }),
  Object.freeze({
    key: "51d824c315edded",
    location: "Alabaster",
    campaignName: "EnviroCare Alabaster Core — Biweekly (7x7, 17kw, Alabaster GBP)",
    placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY",
    gridSize: 7,
    radiusMiles: 10,
    target: 20,
    targetNeedsReview: true,
  }),
  Object.freeze({
    key: "a99dae3fd51a462",
    location: "Alex City",
    campaignName: "EnviroCare Lake Martin — Biweekly",
    placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c",
    gridSize: 7,
    radiusMiles: 10,
    target: 55,
    targetNeedsReview: true,
  }),
  Object.freeze({
    key: "a58db3090ac9ab0",
    location: "Huntsville",
    campaignName: "EnviroCare Huntsville — Biweekly",
    placeId: "ChIJd4YXKCRmqmIR1DmDoEcGohU",
    gridSize: 7,
    radiusMiles: 7,
    target: 10,
    targetNeedsReview: true,
  }),
]);

export function localFalconCampaign(campaignKey) {
  return LOCAL_FALCON_CAMPAIGNS.find((campaign) => campaign.key === campaignKey) ?? null;
}

export function localFalconLocation(location) {
  return LOCAL_FALCON_CAMPAIGNS.find((campaign) => campaign.location === location) ?? null;
}

export function localFalconGridLabel(rawGrid) {
  if (rawGrid === null || rawGrid === undefined || rawGrid === "") return null;
  const text = String(rawGrid).trim().toLowerCase().replace(/\s+/g, "");
  if (/^\d+x\d+$/.test(text)) return text;
  const dimension = Number(text);
  return Number.isFinite(dimension) && dimension > 0 ? `${dimension}x${dimension}` : null;
}

export function localFalconBaseline(meta, campaignKey) {
  const fallback = localFalconCampaign(campaignKey);
  const grid = localFalconGridLabel(meta?.grid_size ?? meta?.size ?? meta?.grid)
    ?? (fallback ? `${fallback.gridSize}x${fallback.gridSize}` : null);
  const radius = Number(meta?.radius ?? meta?.radius_miles ?? fallback?.radiusMiles);
  return grid && Number.isFinite(radius) && radius > 0 ? `${grid}-${radius}mi` : "?x?-?mi";
}
