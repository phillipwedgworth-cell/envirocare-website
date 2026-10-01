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
    // First run that measures the Birmingham profile. Earlier runs on this key
    // measured Alabaster (see LEGACY_RUN_IDENTITY) and are NOT Birmingham data.
    seriesStart: "2026-10-02",
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
    // Not yet run. Until it completes, Alabaster is "pending", never 0%.
    seriesStart: "2026-10-02",
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

// Runs whose measured profile differs from the campaign's CURRENT profile.
// Matched by campaign key + run date when the report does not carry place_id.
export const LEGACY_RUN_IDENTITY = Object.freeze([
  Object.freeze({
    campaignKey: "4ee47a23fc4793e",
    before: "2026-10-02",
    placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY",
    location: "Alabaster",
    note: "Pre-2026-10-02 runs of the Birmingham Core key measured the Alabaster / Butler Rd profile.",
  }),
]);

/**
 * Numeric read that never invents a zero. Number(null) === 0 and Number("") === 0,
 * so a plain Number() turns "Local Falcon sent nothing" into "EnviroCare is
 * invisible". Missing → null. A genuine measured 0 (0 or "0") stays 0.
 */
export function localFalconNumber(value) {
  if (value === null || value === undefined || typeof value === "boolean") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const isoDay = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const t = Date.parse(String(value));
  return Number.isFinite(t) ? new Date(t).toISOString().slice(0, 10) : null;
};

/**
 * Who a specific RUN actually measured. Campaign key is not identity: a key can
 * be re-pointed to another office's profile (4ee47a23 was, on 2026-10-02).
 * Order of trust: the scan's own place_id → a dated legacy rule → current config.
 *
 * Returns { campaignKey, location, placeId, runDate, seriesId, inSeries, reason }.
 * inSeries === false means the run belongs to a DIFFERENT series than the
 * campaign's current market (or predates that series) — label it by `location`,
 * but never present it as the campaign's current market and never diff across it.
 */
export function localFalconRunIdentity(campaignKey, runDate, scanPlaceId = null) {
  const campaign = localFalconCampaign(campaignKey);
  const day = isoDay(runDate);
  let placeId = scanPlaceId || null;
  let reason = placeId ? "scan place_id" : null;
  if (!placeId && day) {
    const legacy = LEGACY_RUN_IDENTITY.find((r) => r.campaignKey === campaignKey && day < r.before);
    if (legacy) { placeId = legacy.placeId; reason = legacy.note; }
  }
  if (!placeId && campaign) { placeId = campaign.placeId; reason = "current campaign config"; }
  const byPlace = LOCAL_FALCON_CAMPAIGNS.find((c) => c.placeId === placeId);
  const location = byPlace?.location ?? campaign?.location ?? "Unknown";
  const sameProfile = Boolean(campaign && placeId === campaign.placeId);
  const afterStart = !campaign?.seriesStart || (day !== null && day >= campaign.seriesStart);
  const inSeries = sameProfile && afterStart;
  const seriesId = inSeries
    ? `${campaignKey}:${placeId}:${campaign.seriesStart ?? "origin"}`
    : `${campaignKey}:${placeId ?? "?"}:legacy`;
  return { campaignKey, location, placeId, runDate: day, seriesId, inSeries, reason };
}

/**
 * Whether two readings can be diffed, and over which keywords. Requires the same
 * series (campaign + measured profile + series start), the same known grid, and
 * a NEWER run. Keyword sets may differ; the delta is then computed only over the
 * common keywords and the cohort change is disclosed.
 *   prior/current: { seriesId, baseline, runDate, keywords: { [kw]: solv } }
 */
export function localFalconComparison(prior, current) {
  if (!prior || !current) return { comparable: false, reason: "no prior reading" };
  if (!prior.seriesId || prior.seriesId !== current.seriesId) return { comparable: false, reason: "different series (profile or series start changed)" };
  if (!prior.baseline || prior.baseline !== current.baseline || String(current.baseline).includes("?")) return { comparable: false, reason: "different or unknown grid" };
  if (!prior.runDate || !current.runDate) return { comparable: false, reason: "missing run date" };
  if (prior.runDate === current.runDate) return { comparable: false, reason: `no new run since ${current.runDate}`, sameRun: true };
  if (prior.runDate > current.runDate) return { comparable: false, reason: "prior reading is newer than current" };
  const pk = prior.keywords ?? {};
  const ck = current.keywords ?? {};
  const common = Object.keys(ck).filter((k) => localFalconNumber(ck[k]) !== null && localFalconNumber(pk[k]) !== null);
  if (common.length === 0) return { comparable: false, reason: "no keywords in common" };
  const mean = (m) => common.reduce((s, k) => s + localFalconNumber(m[k]), 0) / common.length;
  const delta = Math.round((mean(ck) - mean(pk)) * 100) / 100;
  const added = Object.keys(ck).filter((k) => !(k in pk));
  const dropped = Object.keys(pk).filter((k) => !(k in ck));
  return { comparable: true, delta, commonKeywords: common.length, cohortChanged: added.length > 0 || dropped.length > 0, added, dropped, since: prior.runDate };
}

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
