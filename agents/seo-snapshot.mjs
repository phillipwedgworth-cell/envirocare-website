// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/seo-snapshot.mjs
// Commit: fix(seo-snapshot): stop logging under the seo-monitor identity
// Push: main
// ─────────────────────────────────
// agents/seo-snapshot.mjs
// Deterministic Local Falcon -> Supabase ranking snapshot + weekly digest.
// NO LLM (runs fine while Anthropic is capped). Pulls EXISTING campaign
// reports (getCampaignReport = 0 scan credits) and upserts per-keyword
// ARP/ATRP/SoLV into seo_metrics, then writes a plain-English digest.
//
// API: GET https://api.localfalcon.com/v1/campaigns/{key}/report?api_key=...
//   -> data.run_data.run (ISO date) + data.run_data.by_keyword[] {keyword,arp,atrp,solv}
//
// Routing: SEO digest is INTERNAL (Phillip only) -> DIGEST_TO.

import { createClient } from "@supabase/supabase-js";

const AGENT_NAME = "seo-snapshot";
const LF_API = "https://api.localfalcon.com/v1";

// campaign_key -> location label (1 location per campaign; "Hoover"/"Pelham" etc. are keywords)
//
// GRID BASELINE BREAK (2026-07-23): these are the v3 campaigns. The v2 campaigns
// they replace were PAUSED on 2026-06-30 and this file was still reading them,
// so every snapshot since then re-reported frozen 6/30 numbers.
//
// v3 also changed the grid geometry (Birmingham: 5x5 @ 15mi -> 9x9 @ 20mi). A
// wider, denser grid adds outer points where a single office can never rank, so
// SoLV drops hard for reasons that have nothing to do with rankings:
//   Birmingham  v2 53.86% (5x5/15mi, 6/30)  ->  v3 2.71% (9x9/20mi, 7/17)
//   Lake Martin v2 47.50%                   ->  v3 44.49%
//   Huntsville  v2  0.67%                   ->  v3  0.20%
// DO NOT compare a v3 SoLV against a v2 SoLV. `baseline` below marks the epoch;
// any consumer joining across a baseline change must treat it as a new series.
const CAMPAIGNS = [
  { key: "a58db3090ac9ab0", location: "Huntsville",            grid: "9x9", radius_mi: 20, baseline: "v3" },
  { key: "4ee47a23fc4793e", location: "Birmingham/Alabaster",  grid: "9x9", radius_mi: 20, baseline: "v3" },
  { key: "a99dae3fd51a462", location: "Lake Martin/Alex City", grid: "9x9", radius_mi: 20, baseline: "v3" },
];

// Retired — paused 2026-06-30, kept only so a stale key is recognizable, never fetched.
const RETIRED_CAMPAIGNS = {
  "1822923e68f74d1": "Huntsville v2 (paused)",
  "b6d42c9c19856f2": "Birmingham v2 (paused)",
  "7d2a6df072df6f8": "Lake Martin v2 (paused)",
};

function supa() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_KEY not set");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function lfCampaign(key) {
  const lfKey = process.env.LOCAL_FALCON_API_KEY;
  if (!lfKey) throw new Error("LOCAL_FALCON_API_KEY not set");
  const u = new URL(`${LF_API}/campaigns/${key}/report`);
  u.searchParams.set("api_key", lfKey);
  const r = await fetch(u);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.success) throw new Error(`LF campaign ${key}: HTTP ${r.status}${j.message ? ` ${j.message}` : ""}`);
  return j.data;
}

const n2 = (v) => { const x = Number(v); return Number.isFinite(x) ? Math.round(x * 100) / 100 : null; };
const pct = (v) => (v == null ? "—" : `${Math.round(v)}%`);
const mdY = (iso) => { const p = String(iso || "").split("-").map(Number); return p[0] ? `${p[1]}/${p[2]}/${p[0]}` : String(iso || "latest"); };

function buildDigest(runDate, perLocation, findingsCount) {
  const lines = [`Snapshot ${mdY(runDate)}:`, ""];
  for (const loc of perLocation) {
    const kws = loc.keywords;
    const total = kws.length;
    const visible = kws.filter((k) => (k.solv ?? 0) > 0).length;
    const notVisible = total - visible;
    const sorted = [...kws].sort((a, b) => (b.solv ?? 0) - (a.solv ?? 0));
    const top = sorted[0];
    const bottom = sorted[sorted.length - 1];
    let line = `${loc.location} — ${pct(loc.agg_solv)} avg SoLV, ${visible}/${total} keywords visible.`;
    if (top && (top.solv ?? 0) > 0) line += ` Top: ${top.keyword} ${pct(top.solv)}.`;
    if (notVisible > 0) line += ` ${notVisible} not visible.`;
    else if (bottom && bottom !== top) line += ` Weakest: ${bottom.keyword} ${pct(bottom.solv)}.`;
    lines.push(line);
  }
  lines.push("");
  lines.push(`${findingsCount} new finding${findingsCount === 1 ? "" : "s"} this week.`);
  return lines.join("\n");
}

// opts.email=false skips the Resend send (used for local verification runs)
export async function run({ email = true } = {}) {
  const sb = supa();
  const captured_at = new Date().toISOString();
  const allRows = [];
  const perLocation = [];
  let runDate = null;

  for (const c of CAMPAIGNS) {
    const data = await lfCampaign(c.key);
    const rd = data.run_data || {};
    const date = rd.run || null;
    if (date && !runDate) runDate = date;
    const kws = Array.isArray(rd.by_keyword) ? rd.by_keyword : [];
    const rows = kws
      .filter((k) => k && k.keyword && date)
      .map((k) => ({
        location: c.location,
        keyword: k.keyword,
        campaign_key: c.key,
        baseline: c.baseline,
        grid: c.grid,
        arp: n2(k.arp),
        atrp: n2(k.atrp),
        solv: n2(k.solv),
        run_date: date,
        source: "local_falcon",
        captured_at,
      }));
    allRows.push(...rows);
    perLocation.push({
      location: c.location,
      campaign_key: c.key,
      baseline: c.baseline,
      grid: c.grid,
      run_date: date,
      agg_solv: n2(data.solv),
      keywords: rows.map((r) => ({ keyword: r.keyword, arp: r.arp, solv: r.solv })),
    });
  }

  // upsert metrics (dedupe on campaign_key,keyword,run_date)
  let rowsWritten = 0;
  if (allRows.length) {
    const { error } = await sb.from("seo_metrics").upsert(allRows, { onConflict: "campaign_key,keyword,run_date" });
    if (error) throw new Error(`seo_metrics upsert: ${error.message}`);
    rowsWritten = allRows.length;
  }

  // findings count — newest run (last 7 days)
  let findingsCount = 0;
  try {
    const since = new Date(Date.now() - 7 * 86400000).toISOString();
    const { count } = await sb.from("agent_findings").select("id", { count: "exact", head: true }).gte("run_date", since);
    findingsCount = count ?? 0;
  } catch { /* table optional */ }

  const summary = buildDigest(runDate, perLocation, findingsCount);

  // archive the digest
  try {
    await sb.from("seo_digests").insert({ run_date: runDate, summary_text: summary, rows_json: perLocation });
  } catch (e) { console.warn(`[${AGENT_NAME}] seo_digests insert failed: ${e.message}`); }

  // email — INTERNAL (Phillip only); sender stays onboarding@resend.dev until domain verified
  let emailed = false;
  if (email && process.env.RESEND_API_KEY && process.env.DIGEST_TO) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.DIGEST_FROM || "EnviroCare SEO <onboarding@resend.dev>";
      const to = process.env.DIGEST_TO.split(",").map((s) => s.trim()).filter(Boolean);
      await resend.emails.send({ from, to, subject: `EnviroCare weekly SEO — ${mdY(runDate)}`, text: summary });
      emailed = true;
    } catch (e) { console.warn(`[${AGENT_NAME}] digest email failed: ${e.message}`); }
  }

  // log the run
  try {
    await sb.from("agent_runs").insert({
      agent_name: AGENT_NAME,
      status: "ok",
      output: JSON.stringify({ run_date: runDate, rows_written: rowsWritten, findings: findingsCount, emailed }),
    });
  } catch (e) { console.warn(`[${AGENT_NAME}] agent_runs log failed: ${e.message}`); }

  console.log(`[${AGENT_NAME}] snapshot ${runDate}: ${rowsWritten} rows, ${findingsCount} findings, emailed=${emailed}`);
  return { run_date: runDate, rows_written: rowsWritten, findings: findingsCount, emailed, summary, locations: perLocation };
}
