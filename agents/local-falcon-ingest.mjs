// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/local-falcon-ingest.mjs
// Commit: feat(agents): local-falcon-ingest — SoLV + SAIV + top competitors per market into lf_visibility, zero scan credits
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * local-falcon-ingest — reads every SCHEDULED Local Falcon campaign report
 * (Maps and AI platforms) and writes one row per campaign × platform × keyword
 * × run into `lf_visibility`, with the grid baseline and the top-5 competitors
 * for that scan. Costs 0 scan credits: it only reads runs that already happened.
 *
 * Why this exists (Sep 5 2026): Local Falcon has been scoring EnviroCare against
 * competitors on Maps, ChatGPT, AI Mode and AI Overviews since Aug 14, and no
 * agent read any of it. seo-monitor reads own-SoLV only; aeo-watch is a news
 * scraper. This is the measurement layer competitor-watcher and the proposer
 * were missing.
 *
 * Best-practice notes baked in:
 *  - Deterministic. No LLM. Nothing to hallucinate.
 *  - Idempotent upsert on (campaign_key, platform, keyword, run_date).
 *  - Grid baseline stored on every row. Never compare across a baseline change.
 *  - Defensive field access: Local Falcon's response shapes drift; every read
 *    falls back rather than throws, and unknown shapes surface as a single
 *    `warning` finding instead of a crash.
 *  - Campaign keys are stable; scan report_keys are transient and stored only
 *    as provenance, never as a lookup key.
 */
import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";

const AGENT_NAME = "local-falcon-ingest";
const LF_API = process.env.LOCAL_FALCON_API_URL || "https://api.localfalcon.com/v1";
const LF_KEY = process.env.LOCAL_FALCON_API_KEY;
const LOOKBACK_DAYS = Number(process.env.LF_INGEST_LOOKBACK_DAYS ?? 21);
const TOP_N = 5;

// Verified against the Local Falcon API 2026-07-23; used only when a campaign
// report omits grid metadata so a row is never stored with an unknown baseline.
const KNOWN_BASELINES = {
  a58db3090ac9ab0: "9x9-20mi",   // Huntsville
  "4ee47a23fc4793e": "9x9-20mi", // Birmingham / Alabaster (Butler Rd)
  a99dae3fd51a462: "9x9-20mi",   // Lake Martin / Alex City
  e9348fff16b95fa: "9x9-20mi",   // Birmingham 16th Ave (created 2026-09-05)
};
const MARKET_BY_PLACE = {
  ChIJr8cmt: "Alabaster",   // 2025 Butler Rd
  ChIJjXGa0: "Birmingham",  // 2120 16th Ave S
  ChIJd4YXK: "Huntsville",
  ChIJ508mE: "Alex City",
};

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };
const first = (...vals) => vals.find((v) => v !== undefined && v !== null && v !== "");

async function lfFetch(endpoint, params = {}) {
  if (!LF_KEY) throw new Error("LOCAL_FALCON_API_KEY is not set");
  const url = new URL(`${LF_API}/${endpoint}`);
  url.searchParams.set("api_key", LF_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const r = await fetch(url);
  if (!r.ok) throw new Error(`LF ${endpoint}: HTTP ${r.status}`);
  const json = await r.json();
  if (json && json.success === false) throw new Error(`LF ${endpoint}: ${json.message || "success=false"}`);
  return json;
}

function marketFor(placeId) {
  for (const [prefix, market] of Object.entries(MARKET_BY_PLACE)) if (String(placeId || "").startsWith(prefix)) return market;
  return "Unknown";
}

function baselineOf(meta, campaignKey) {
  const g = first(meta?.grid_size, meta?.size, meta?.grid);
  const r = first(meta?.radius, meta?.radius_miles);
  if (g && r) return `${g}x${g}-${r}mi`;
  return KNOWN_BASELINES[campaignKey] ?? "unknown";
}

function isFresh(dateStr) {
  const t = Date.parse(dateStr ?? "");
  return Number.isFinite(t) && Date.now() - t <= LOOKBACK_DAYS * 86400000;
}

// ── campaign list (stable keys) ─────────────────────────────────────────────
async function listScheduledCampaigns() {
  const json = await lfFetch("campaigns", { fieldmask: "campaign_key,name,status,platforms,grid_size,radius,measurement,keywords,place_ids,last_run,next_run,locations" });
  const rows = first(json?.data?.campaigns, json?.data, []);
  return (Array.isArray(rows) ? rows : Object.values(rows)).filter((c) => c && (c.status ?? "scheduled") === "scheduled");
}

// ── campaign report: headline + per-keyword + per-scan provenance ───────────
async function readCampaignReport(campaignKey) {
  const json = await lfFetch(`campaigns/${campaignKey}/report`);
  const d = json?.data ?? {};
  const rd = d.run_data ?? {};
  const runDate = first(rd.run, d.date, d.last_run);
  const byKeyword = Array.isArray(rd.by_keyword) ? rd.by_keyword : [];
  // Some report shapes list individual scans with platform + report_key.
  const scans = Array.isArray(rd.scans) ? rd.scans : Array.isArray(d.scans) ? d.scans : [];
  return { runDate, headline: { solv: num(d.solv), saiv: num(d.saiv), arp: num(d.arp), atrp: num(d.atrp) }, byKeyword, scans };
}

// ── scan report: competitors for one scan (fieldmasked, ~few KB) ────────────
async function readScanCompetitors(reportKey, platform) {
  try {
    const metric = ["google", "apple", "native"].includes(platform) ? "solv" : "saiv";
    const json = await lfFetch(`reports/${reportKey}`, { fieldmask: `report_key,platform,keyword,place_id,${metric},arp,atrp,grid_size,radius,rankings.by_${metric},places.*.name,places.*.${metric}` });
    const d = json?.data ?? {};
    const ranking = d?.rankings?.[`by_${metric}`] ?? {};
    const places = d?.places ?? {};
    const top = Object.entries(ranking)
      .map(([pid, score]) => ({ place_id: pid, name: places?.[pid]?.name ?? pid, score: num(score) }))
      .filter((p) => p.score !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_N + 1);
    return { top, self: { keyword: d.keyword, score: num(d[metric]), arp: num(d.arp), atrp: num(d.atrp) }, grid: { grid_size: d.grid_size, radius: d.radius } };
  } catch (e) {
    console.warn(`[${AGENT_NAME}] competitors unavailable for ${reportKey}: ${e.message}`);
    return null;
  }
}

async function upsertRows(rows) {
  if (!supabase || rows.length === 0) return 0;
  const { error } = await supabase.from("lf_visibility").upsert(rows, { onConflict: "campaign_key,platform,keyword,run_date" });
  if (error) throw new Error(`lf_visibility upsert: ${error.message}`);
  return rows.length;
}

export async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const summary = { campaigns: 0, rows: 0, stale: [], shape_warnings: [], errors: [] };
  let campaigns = [];
  try { campaigns = await listScheduledCampaigns(); }
  catch (e) { await logAgentRun(AGENT_NAME, "failed", `campaign list: ${e.message}`); throw e; }

  for (const c of campaigns) {
    const key = first(c.campaign_key, c.key);
    if (!key) continue;
    summary.campaigns++;
    try {
      const rep = await readCampaignReport(key);
      if (!isFresh(rep.runDate)) { summary.stale.push(`${c.name} (last run ${rep.runDate ?? "never"})`); continue; }
      const runDate = new Date(rep.runDate).toISOString().slice(0, 10);
      const placeIds = Array.isArray(c.place_ids) ? c.place_ids : (Array.isArray(c.locations) ? c.locations.map((l) => l.place_id ?? l) : []);
      const platforms = Array.isArray(c.platforms) ? c.platforms : ["google"];
      const baseline = baselineOf(c, key);
      const rows = [];

      // Path A: per-scan provenance available → competitors per keyword/platform.
      const scanRows = rep.scans.filter((s) => s && (s.report_key || s.key));
      if (scanRows.length) {
        for (const s of scanRows) {
          const rk = first(s.report_key, s.key);
          const platform = first(s.platform, "google");
          const comp = await readScanCompetitors(rk, platform);
          const metricIsSolv = ["google", "apple", "native"].includes(platform);
          const selfScore = comp?.self?.score ?? num(first(s.solv, s.saiv));
          rows.push({
            campaign_key: key, campaign_name: c.name ?? null, market: marketFor(first(s.place_id, placeIds[0])),
            place_id: first(s.place_id, placeIds[0], null), platform, keyword: first(comp?.self?.keyword, s.keyword, "(campaign)"),
            run_date: runDate, grid_baseline: comp?.grid?.grid_size && comp?.grid?.radius ? `${comp.grid.grid_size}x${comp.grid.grid_size}-${comp.grid.radius}mi` : baseline,
            solv: metricIsSolv ? selfScore : null, saiv: metricIsSolv ? null : selfScore,
            arp: comp?.self?.arp ?? num(s.arp), atrp: comp?.self?.atrp ?? num(s.atrp),
            top_competitors: comp?.top ?? null, report_key: rk,
          });
        }
      } else {
        // Path B: per-keyword aggregate only (no competitors) — still worth storing.
        if (!rep.byKeyword.length) summary.shape_warnings.push(`${c.name}: no by_keyword and no scans in report`);
        for (const k of rep.byKeyword) {
          const metricIsSolv = platforms.length === 1 && ["google", "native"].includes(platforms[0]);
          rows.push({
            campaign_key: key, campaign_name: c.name ?? null, market: marketFor(placeIds[0]), place_id: placeIds[0] ?? null,
            platform: metricIsSolv ? "google" : platforms.join("+"), keyword: k.keyword, run_date: runDate, grid_baseline: baseline,
            solv: metricIsSolv ? num(k.solv) : null, saiv: metricIsSolv ? null : num(first(k.saiv, k.solv)),
            arp: num(k.arp), atrp: num(k.atrp), top_competitors: null, report_key: null,
          });
        }
      }
      summary.rows += await upsertRows(rows);
    } catch (e) {
      summary.errors.push(`${c.name ?? key}: ${e.message}`);
    }
  }

  if (summary.stale.length) await writeFinding(AGENT_NAME, "local-falcon", "warning", null, `Local Falcon campaigns with no run in ${LOOKBACK_DAYS}d (paused or failing): ${summary.stale.join("; ")}`, { stale: summary.stale });
  if (summary.shape_warnings.length) await writeFinding(AGENT_NAME, "local-falcon", "warning", null, `Local Falcon report shape returned no keyword rows — check API response fields: ${summary.shape_warnings.join("; ")}`, { warnings: summary.shape_warnings });
  const status = summary.errors.length && summary.rows === 0 ? "failed" : "ok";
  await logAgentRun(AGENT_NAME, status, summary);
  console.log(`[${AGENT_NAME}] ${summary.campaigns} campaigns → ${summary.rows} rows; stale ${summary.stale.length}; errors ${summary.errors.length}`);
  return summary;
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL`, e); process.exit(1); });
