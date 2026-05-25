// agents/competitor-watcher.mjs
// Pulls Local Falcon scan data for all 3 locations
// Compares our SoLV vs top competitors and vs previous week
// Flags drops or competitor gains
// Writes alerts to agent_findings table

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import { writeFinding, supabase } from "./lib/supabase.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const LF_KEY = process.env.LOCAL_FALCON_API_KEY;
const LF_API = "https://api.localfalcon.com/v1";

const LOCATIONS = [
  { name: "Alabaster",  placeId: "ChIJr8cmt-EeiYgR_jgX9xsiZWY", target_solv: 65 },
  { name: "Alex City",  placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c", target_solv: 50 },
  { name: "Huntsville", placeId: "ChIJd4YXKCRmqmIR1DmDoEcGohU", target_solv: 35 },
  { name: "Auburn",     placeId: "ChIJ508mEjcLjIgRZ2HdWgXX76c", target_solv: 55 }, // Alex City GBP scanning Auburn market
];

async function lfFetch(endpoint, params = {}) {
  const url = new URL(`${LF_API}/${endpoint}`);
  url.searchParams.set("api_key", LF_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`LF ${endpoint}: ${r.status}`);
  return r.json();
}

async function getLatestScans() {
  const today   = new Date().toLocaleDateString("en-US");
  const weekAgo = new Date(Date.now() - 7 * 86400000).toLocaleDateString("en-US");
  const reports = await lfFetch("scan-reports/list", { start_date: weekAgo, end_date: today });
  return reports?.data?.reports || reports?.reports || [];
}

async function getCompetitorReports() {
  try {
    const today   = new Date().toLocaleDateString("en-US");
    const weekAgo = new Date(Date.now() - 7 * 86400000).toLocaleDateString("en-US");
    const res = await lfFetch("competitor-reports/list", { start_date: weekAgo, end_date: today });
    return res?.data?.reports || res?.reports || [];
  } catch {
    return []; // endpoint may not exist — fall back to scan data
  }
}

function extractLocMetrics(scans, loc) {
  const matching = scans.filter(r =>
    r.place_id === loc.placeId ||
    r.location?.place_id === loc.placeId ||
    r.location_name?.toLowerCase().includes(loc.name.toLowerCase())
  );
  if (!matching.length) return null;
  const r = matching[0];
  return {
    solv: r.solv_percentage ?? r.atop ?? r.solv ?? null,
    arp:  r.arp ?? r.average_rank ?? null,
    keyword: r.search_keyword ?? r.keyword ?? null,
    competitors: r.competitors ?? r.top_competitors ?? [],
    scannedAt: r.created_at ?? r.scanned_at ?? null,
  };
}

async function getPrevSoLV(locName) {
  if (!supabase) return null;
  const { data } = await supabase
    .from("envirocare_seo")
    .select("solv, snapshot_date")
    .eq("location", locName)
    .order("snapshot_date", { ascending: false })
    .limit(2);
  if (!data || data.length < 2) return null;
  return data[1]?.solv ?? null;
}

async function writeSummary(alerts, metrics, feedback = null) {
  const metricLines = LOCATIONS.map(loc => {
    const m = metrics[loc.name];
    if (!m) return `${loc.name}: no scan data available`;
    const delta = m.delta !== null ? ` (${m.delta > 0 ? "+" : ""}${m.delta}% vs last week)` : "";
    const status = m.solv !== null && m.solv < loc.target_solv ? ` ⚠ BELOW TARGET ${loc.target_solv}%` : "";
    return `${loc.name}: SoLV ${m.solv ?? "?"}%${delta}${status}`;
  }).join("\n");

  const prompt = `You are an SEO analyst for EnviroCare Pest Control (Alabama, 3 locations).
Write a 5-7 bullet competitive intelligence brief.

LOCATION METRICS:
${metricLines}

ALERTS THIS WEEK:
${alerts.length ? alerts.join("\n") : "No scan data available this week"}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK:\n${feedback}` : ""}

STRICT FORMAT: Start IMMEDIATELY with "• " on the first line — no title, no intro, no sign-off.
Lead with biggest threats. Include exact SoLV % and deltas if available. Flag URGENT for Huntsville if SoLV is 0%. If no data, state clearly which locations have no data and give one actionable fix each. Under 180 words.`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? alerts.join("\n");
}

export async function run() {
  console.log("[competitor-watcher] Starting");

  const [scans, competitorReports] = await Promise.all([
    getLatestScans().catch(e => { console.error("[competitor-watcher] scan fetch error:", e.message); return []; }),
    getCompetitorReports(),
  ]);

  console.log(`[competitor-watcher] ${scans.length} scans, ${competitorReports.length} competitor reports`);

  const alerts = [];
  const metrics = {};

  for (const loc of LOCATIONS) {
    const current = extractLocMetrics(scans, loc);
    const prevSolv = await getPrevSoLV(loc.name);

    const delta = current?.solv != null && prevSolv != null
      ? Math.round((current.solv - prevSolv) * 10) / 10
      : null;

    metrics[loc.name] = { ...current, delta, prevSolv };

    if (!current) {
      alerts.push(`${loc.name}: no scan data found this week`);
      await writeFinding("competitor-watcher", "competitor", "warning", null,
        `No scan data found for ${loc.name} this week`, { location: loc.name });
      continue;
    }

    if (current.solv !== null && current.solv < loc.target_solv) {
      const sev = current.solv === 0 ? "critical" : "warning";
      const msg = `${loc.name} SoLV ${current.solv}% is below target ${loc.target_solv}%` +
        (current.solv === 0 ? " — URGENT: zero visibility" : "");
      alerts.push(msg);
      await writeFinding("competitor-watcher", "competitor", sev, null, msg,
        { location: loc.name, solv: current.solv, target: loc.target_solv });
    }

    if (delta !== null && delta < -3) {
      const msg = `${loc.name} SoLV dropped ${delta}% this week (${prevSolv}% → ${current.solv}%)`;
      alerts.push(msg);
      await writeFinding("competitor-watcher", "competitor", "warning", null, msg,
        { location: loc.name, solv: current.solv, prevSolv, delta });
    }

    if (current.competitors?.length > 0) {
      const topCompetitors = current.competitors.slice(0, 3).map(c => c.name ?? c).join(", ");
      await writeFinding("competitor-watcher", "competitor", "info", null,
        `${loc.name} top competitors: ${topCompetitors}`,
        { location: loc.name, competitors: current.competitors.slice(0, 5) });
    }
  }

  for (const report of competitorReports.slice(0, 10)) {
    const compName = report.competitor_name ?? report.name;
    const compSolv = report.solv_percentage ?? report.solv;
    if (compName && compSolv > 40) {
      alerts.push(`Competitor "${compName}" at ${compSolv}% SoLV — strong presence`);
      await writeFinding("competitor-watcher", "competitor", "warning", null,
        `Competitor "${compName}" at ${compSolv}% SoLV`, { competitor: compName, solv: compSolv });
    }
  }

  const hasAnyData = Object.values(metrics).some(m => m?.solv !== null && m?.solv !== undefined);
  if (!hasAnyData && scans.length === 0) {
    const noDataBrief = "• No scan data available this cycle for Huntsville, Alabaster, Alex City, or Auburn — SoLV and competitor rankings cannot be assessed.\n• URGENT: Huntsville has had 0% SoLV historically; reconnect Local Falcon and rerun scans before next Monday.\n• Action: verify LOCAL_FALCON_API_KEY in Vercel env and confirm weekly auto-scans are active in the Local Falcon dashboard.";
    await stateSet("competitor-watcher:last-run", { metrics, alerts, date: new Date().toISOString() });
    console.log("[competitor-watcher] No data — returning canned brief");
    return noDataBrief;
  }

  const draft = await writeSummary(alerts, metrics);

  const final = await criticLoop({
    workerName: "competitor-watcher",
    task: "Write a competitive intelligence brief for EnviroCare with SoLV data, week-over-week deltas, and alerts",
    output: draft,
    rubric: `
- If scan data available: SoLV % per location, deltas, below-target flags, Huntsville URGENT if 0%
- If no scan data: clearly states data unavailable with specific locations listed — PASS this
- First character is "•" or "–" — no title or intro sentence
- No vague filler statements
- Under 180 words
- No sign-off`,
    revise: (feedback) => writeSummary(alerts, metrics, feedback),
    onEscalate: async () => console.warn("[competitor-watcher] Critic maxed out"),
  });

  await stateSet("competitor-watcher:last-run", { metrics, alerts, date: new Date().toISOString() });
  console.log("[competitor-watcher] Done");
  return final;
}
