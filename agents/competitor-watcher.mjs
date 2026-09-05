// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/competitor-watcher.mjs
// Commit: feat(agents): competitor-watcher — in-repo replacement for the laptop crew agent dark since Aug 21; SoLV/SAIV gaps + movers per market, one Sonnet digest per run
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * competitor-watcher — compares EnviroCare to the field per market and
 * platform using rows local-falcon-ingest already stored. Replaces the CrewAI
 * "Competitor Watcher" that lived on Phillip's laptop and has not run since
 * 2026-08-21.
 *
 * Deterministic alerts (thresholds in CONFIG), then ONE Sonnet call to write a
 * plain-English digest per run. The digest never suggests copy — competitor
 * names are internal intelligence only; public site copy never names one.
 *
 * Comparisons are made ONLY between two runs that share the same
 * grid_baseline. A grid change makes SoLV numbers non-comparable.
 */
import Anthropic from "@anthropic-ai/sdk";
import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";

const AGENT_NAME = "competitor-watcher";
const MODEL = process.env.COMPETITOR_WATCHER_MODEL || "claude-sonnet-4-6";
const CONFIG = {
  ownDropWarn: 5,        // our SoLV/SAIV fell ≥ 5 pts run-over-run
  competitorSurge: 10,   // a competitor gained ≥ 10 pts and sits in the top 3
  deadHeadTerm: /pest control|exterminator|termite/i, // a 0% on these is a warning, not info
  lookbackRuns: 2,
};

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : null);
const score = (r) => (r.solv ?? r.saiv);

async function latestTwoRuns() {
  const { data, error } = await supabase
    .from("lf_visibility")
    .select("campaign_key,campaign_name,market,platform,keyword,run_date,grid_baseline,solv,saiv,arp,top_competitors")
    .order("run_date", { ascending: false })
    .limit(4000);
  if (error) throw new Error(`lf_visibility read: ${error.message}`);
  // group by campaign+platform+keyword, keep two most recent run_dates
  const groups = new Map();
  for (const r of data ?? []) {
    const k = `${r.campaign_key}|${r.platform}|${r.keyword}`;
    const g = groups.get(k) ?? [];
    if (g.length < CONFIG.lookbackRuns && !g.some((x) => x.run_date === r.run_date)) g.push(r);
    groups.set(k, g);
  }
  return groups;
}

function analyze(groups) {
  const alerts = [];
  const byMarket = {};
  for (const [, runs] of groups) {
    const cur = runs[0]; if (!cur) continue;
    const prev = runs[1] && runs[1].grid_baseline === cur.grid_baseline ? runs[1] : null;
    const mine = num(score(cur));
    const top = Array.isArray(cur.top_competitors) ? cur.top_competitors.filter((c) => c.name && !/envirocare/i.test(c.name)) : [];
    const leader = top[0] ?? null;
    const m = (byMarket[cur.market] ??= { platforms: {}, keywords: 0 });
    m.keywords++;
    const p = (m.platforms[cur.platform] ??= { sum: 0, n: 0, leaders: {} });
    if (mine !== null) { p.sum += mine; p.n++; }
    if (leader) p.leaders[leader.name] = (p.leaders[leader.name] ?? 0) + 1;

    if (mine === 0 && CONFIG.deadHeadTerm.test(cur.keyword)) {
      alerts.push({ severity: "warning", market: cur.market, platform: cur.platform, keyword: cur.keyword,
        text: `0% visibility on head term "${cur.keyword}" (${cur.platform}, ${cur.grid_baseline})${leader ? ` — leader ${leader.name} at ${leader.score}%` : ""}` });
    }
    if (prev && mine !== null && num(score(prev)) !== null && num(score(prev)) - mine >= CONFIG.ownDropWarn) {
      alerts.push({ severity: "warning", market: cur.market, platform: cur.platform, keyword: cur.keyword,
        text: `Dropped ${(num(score(prev)) - mine).toFixed(1)} pts on "${cur.keyword}" (${cur.platform}) since ${prev.run_date} — ${num(score(prev))}% → ${mine}%` });
    }
    if (prev && Array.isArray(prev.top_competitors)) {
      for (const c of top.slice(0, 3)) {
        const before = prev.top_competitors.find((x) => x.place_id === c.place_id);
        if (before && c.score - before.score >= CONFIG.competitorSurge) {
          alerts.push({ severity: "info", market: cur.market, platform: cur.platform, keyword: cur.keyword,
            text: `${c.name} gained ${(c.score - before.score).toFixed(1)} pts on "${cur.keyword}" (${cur.platform}) and is #${top.indexOf(c) + 1} at ${c.score}%` });
        }
      }
    }
  }
  const table = Object.entries(byMarket).map(([market, m]) => ({
    market,
    platforms: Object.fromEntries(Object.entries(m.platforms).map(([pl, v]) => [pl, {
      avg: v.n ? Number((v.sum / v.n).toFixed(2)) : null,
      leader: Object.entries(v.leaders).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
    }])),
  }));
  return { alerts, table };
}

async function digest(anthropic, table, alerts) {
  const prompt = `You are the competitive-intelligence analyst for a family pest-control company in Alabama.
Write a 120-180 word internal digest for the owner. Plain English, no headings, no bullet lists, no marketing copy.
State per market: our average visibility by platform, who leads, and the single most important move implied by the data.
Do not recommend adding competitor names to any public page. Do not promise rankings.

DATA (JSON):
${JSON.stringify({ table, alerts: alerts.slice(0, 20) })}`;
  const res = await createMessage(anthropic, { model: MODEL, max_tokens: 500, messages: [{ role: "user", content: prompt }] }, { agentName: AGENT_NAME, role: "analyst" });
  return res?.content?.map((c) => c.text ?? "").join("").trim();
}

export async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const groups = await latestTwoRuns();
  if (groups.size === 0) {
    await logAgentRun(AGENT_NAME, "skipped", "lf_visibility is empty — run local-falcon-ingest first");
    return { skipped: true };
  }
  const { alerts, table } = analyze(groups);
  for (const a of alerts) {
    await writeFinding(AGENT_NAME, "competitor", a.severity, null, `[${a.market} · ${a.platform}] ${a.text}`, { market: a.market, platform: a.platform, keyword: a.keyword });
  }
  let text = null;
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    text = await digest(anthropic, table, alerts);
    if (text) await writeFinding(AGENT_NAME, "competitor-digest", "info", null, text, { table, alert_count: alerts.length, model: MODEL });
  } catch (e) {
    console.warn(`[${AGENT_NAME}] digest skipped: ${e.message}`);
  }
  const summary = { markets: table.length, alerts: alerts.length, digest: Boolean(text), table };
  await logAgentRun(AGENT_NAME, "ok", summary);
  console.log(`[${AGENT_NAME}] ${table.length} markets, ${alerts.length} alerts`);
  return summary;
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL`, e); process.exit(1); });
