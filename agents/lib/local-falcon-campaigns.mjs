/**
 * Canonical Local Falcon campaign configuration.
 *
 * Keep stable campaign keys here and enrich them with live API metadata at
 * runtime. SoLV is only comparable within the same grid/radius baseline.
 * See agents/knowledge/local-falcon-baseline.md before changing these values.
 */
export const LOCAL_FALCON_CAMPAIGNS = Object.freeze([
  Object.freeze({
    key: "e9348fff16b95fa",
    location: "Birmingham",
    campaignName: "EnviroCare Birmingham 16th Ave (Jefferson Co.) — Biweekly",
    placeId: "ChIJjXGa0ZsbiYgR1mB0oEKnqUo",
    gridSize: 9,
    radiusMiles: 20,
    target: 15,
    targetNeedsReview: false,
  }),
  Object.freeze({
    key: "4ee47a23fc4793e",
    location: "Alabaster",
    campaignName: "EnviroCare Birmingham Core (Alabaster / Butler Rd) — Biweekly",
    placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY",
    gridSize: 9,
    radiusMiles: 20,
    target: 20,
    targetNeedsReview: false,
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
