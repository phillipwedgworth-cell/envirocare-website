// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/seo-snapshot.mjs
// Commit: fix(seo-snapshot): stop logging under the seo-monitor identity
// Push: main
// ─────────────────────────────────────
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
// GRID GEOMETRY IS READ FROM THE API, NOT ASSERTED HERE (2026-07-24).
// The previous version hardcoded all three v3 campaigns as 9x9 @ 20mi. Live
// API says only Birmingham is; Huntsville is 7x7 @ 7mi and Lake Martin is
// 7x7 @ 10mi. Hardcoding geometry meant a grid edit in the Local Falcon UI
// silently desynced the code.
//
// WHY THIS MATTERS: a wider/denser grid adds outer points a single office can
// never rank in, so SoLV falls for reasons unrelated to ranking. Birmingham
// read 53.86% on v2 (5x5/15mi) and 2.71% on v3 (9x9/20mi) with no real change.
// NEVER compare SoLV across different `baseline` values.
const CAMPAIGNS = [
  { key: "a58db3090ac9ab0", location: "Huntsville" },
  { key: "4ee47a23fc4793e", location: "Birmingham/Alabaster" },
  { key: "a99dae3fd51a462", location: "Lake Martin/Alex City" },
];

// Retired — paused, never fetched. Kept so a stale key is recognizable.
// Re-paused 2026-07-24 after an accidental resume.
const RETIRED_CAMPAIGNS = {
  "1822923e68f74d1": "Huntsville v2 (paused)",
  "b6d42c9c19856f2": "Birmingham v2 (paused)",
  "7d2a6df072df6f8": "Lake Martin v2 (paused)",
};
// NOTE: campaign 853ebf2af21a1b1 ("Offices — Weekly Maps + AI", 7x7 @ 4mi)
// runs weekly and is NOT tracked here. Its AI legs report `saiv`, not `solv`,
// so ingesting it into seo_metrics would write junk zeros. Phillip decides:
// pause it (it burns credits weekly) or we add a saiv-aware reader.

// Per-campaign baseline built from LIVE geometry. Any consumer joining across
// a change in this string must treat it as a new series.
function baselineOf(meta) {
  const g = meta?.grid_size ?? "?";
  const r = meta?.radius ?? "?";
  return `${g}x${g}-${r}mi`;
}

// Campaign list metadata (grid_size, radius, status per key). 0 scan credits.
// Defensive on response shape and key field; a failure here degrades to
// baseline "?x?-?mi" with a loud warning rather than killing the snapshot.
async function lfCampaignMeta() {
  const lfKey = process.env.LOCAL_FALCON_API_KEY;
  if (!lfKey) throw new Error("LOCAL_FALCON_API_KEY not set");
  const u = new URL(`${LF_API}/campaigns`);
  u.searchParams.set("api_key", lfKey);
  u.searchParams.set("fieldmask", "report_key,name,status,grid_size,radius,keywords");
  const r = await fetch(u);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.success) throw new Error(`LF campaigns list: HTTP ${r.status}${j.message ? ` ${j.message}` : ""}`);
  const out = {};
  for (const c of j.data?.reports ?? j.reports ?? j.data?.campaigns ?? []) {
    const k = c.report_key ?? c.campaign_key ?? c.key;
    if (k) out[k] = c;
  }
  return out;
}

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

  // Live geometry + status per campaign. Degrade loudly, not silently.
  let meta = {};
  try {
    meta = await lfCampaignMeta();
  } catch (e) {
    console.warn(`[${AGENT_NAME}] campaign meta unavailable (${e.message}) — baselines will read "?x?-?mi"`);
  }

  for (const c of CAMPAIGNS) {
    const m = meta[c.key];
    // Skip-if-not-scheduled guard: a paused campaign serves frozen numbers —
    // the exact failure that produced the false 6/30 digests. Never write them.
    if (m && m.status && m.status !== "scheduled") {
      console.warn(`[${AGENT_NAME}] SKIP ${c.location}: campaign ${c.key} status="${m.status}" (not scheduled) — refusing to write frozen numbers`);
      perLocation.push({ location: c.location, campaign_key: c.key, skipped: `status=${m.status}`, keywords: [] });
      continue;
    }
    const baseline = baselineOf(m);
    const grid = m?.grid_size ? `${m.grid_size}x${m.grid_size}` : null;
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
        baseline,
        grid,
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
      baseline,
      grid,
      radius_mi: m?.radius ?? null,
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
