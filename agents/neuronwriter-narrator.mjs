// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/neuronwriter-narrator.mjs
// Commit: feat(agent): narrator auto-writes, scores, retries low drafts, ranks ready-to-ship
// Push: main
// ─────────────────────────────────────
//
// THE NEURON NARRATOR (fully automatic, rating-aware)
//   fill  -> for EVERY query: use a hand-written draft if present, else WRITE one
//            (Claude, compliance-locked), push it, read its score. If an auto draft
//            scores below the floor, rewrite it ONCE to lift it. Then rank everything
//            by score and report a "ready to ship" queue (best first).
//   score -> just list every query + its current score.
//
// No ChatGPT. Uses NEURONWRITER_API_KEY + ANTHROPIC_API_KEY (already GitHub secrets).

const API_BASE = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const PROJECT  = process.env.NEURONWRITER_PROJECT || "9d0bec3a70f4743c";
const KEY      = process.env.NEURONWRITER_API_KEY;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.NARRATOR_MODEL || "claude-sonnet-4-6";

const SCORE_FLOOR = Number(process.env.NARRATOR_SCORE_FLOOR || 65); // ready-to-ship line
const SHIP_GOOD   = Number(process.env.NARRATOR_SHIP_GOOD   || 70); // "strong" mark
const SLEEP_MS    = Number(process.env.NARRATOR_SLEEP_MS    || 1200); // gentle on rate limits

const RESEND_KEY  = process.env.RESEND_API_KEY || "";
const NOTIFY_TO   = (process.env.NOTIFY_EMAIL || "").split(",").map(s => s.trim()).filter(Boolean);
const NOTIFY_FROM = process.env.NOTIFY_FROM || "EnviroCare Narrator <onboarding@resend.dev>";

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { COMPLIANCE_SYSTEM, userPrompt } from "./lib/compliance.mjs";
import { logRunREST, logFindingREST } from "./lib/run-log.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dir, "neuronwriter-content");
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

if (!KEY) { console.error("FATAL: NEURONWRITER_API_KEY not set."); process.exit(1); }

// -- NeuronWriter client ------------------------------------------------------
async function nw(method, body) {
  const res = await fetch(`${API_BASE}/${method}`, {
    method: "POST",
    headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { _raw: text }; }
  if (!res.ok) throw new Error(`NeuronWriter ${method} -> ${res.status}: ${text.slice(0,300)}`);
  return json;
}

function pickScore(o) {
  if (!o || typeof o !== "object") return null;
  for (const k of ["content_score","score","contentScore","current_score"])
    if (typeof o[k] === "number") return o[k];
  for (const n of ["metrics","content","revision"])
    if (o[n] && typeof o[n] === "object") { const s = pickScore(o[n]); if (s !== null) return s; }
  return null;
}
function pickTerms(o) {
  const out = [];
  const walk = (v) => {
    if (!v) return;
    if (typeof v === "string") { if (v.length < 40) out.push(v); return; }
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (typeof v === "object") {
      if (typeof v.t === "string") out.push(v.t);
      else if (typeof v.term === "string") out.push(v.term);
      else Object.values(v).forEach(walk);
    }
  };
  for (const k of ["terms","terms_txt","content_basic","recommendations"]) if (o[k]) walk(o[k]);
  return [...new Set(out)].slice(0, 60);
}
const norm = (s) => String(s||"").toLowerCase().replace(/\s+/g," ").trim();

async function readScore(id) {
  // Surface failures instead of swallowing them — a silent catch here is why a
  // broken call would show up as "-- (empty)" in the score table with no clue why.
  try { return pickScore(await nw("get-content", { query: id })); }
  catch (e) { console.error(`[narrator] get-content failed for query ${id}: ${e.message}`); return null; }
}

function loadManifest() {
  const p = join(CONTENT_DIR, "manifest.json");
  if (!existsSync(p)) return {};
  try {
    const raw = JSON.parse(readFileSync(p, "utf8"));
    const map = {}; for (const e of raw.pages || []) map[norm(e.keyword)] = e; return map;
  } catch { return {}; }
}

// -- Claude writer (compliance-locked) ----------------------------------------
async function writeDraft(keyword, terms, lift = false) {
  if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY not set -- cannot auto-write.");
  let prompt = userPrompt(keyword, terms);
  if (lift) prompt += `\n\nThis is a revision to improve SEO coverage. Work in MORE of the related terms `
    + `naturally and add depth (a richer FAQ, a short locally-specific section), while keeping every `
    + `compliance rule. Do not keyword-stuff. Aim for the 70-80 coverage range.`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL, max_tokens: 2400, system: COMPLIANCE_SYSTEM,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${JSON.stringify(j).slice(0,200)}`);
  const html = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
  if (!html) throw new Error("empty draft from model");
  return html;
}

async function pushAndScore(id, html, title) {
  const resp = await nw("import-content", { project: PROJECT, query: id, html, title });
  let sc = pickScore(resp);
  if (sc === null) { await sleep(2500); sc = await readScore(id); } // let NW recompute
  return sc;
}

// -- notify + summary ---------------------------------------------------------
async function email(subject, html) {
  if (!RESEND_KEY || !NOTIFY_TO.length) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: NOTIFY_FROM, to: NOTIFY_TO, subject, html }),
    });
  } catch (e) { console.error("email failed (non-fatal):", e.message); }
}
function toSummary(md) {
  const f = process.env.GITHUB_STEP_SUMMARY;
  if (f) { try { writeFileSync(f, md, { flag: "a" }); } catch {} }
  console.log(md);
}

async function listQueries() {
  const list = await nw("list-queries", { project: PROJECT });
  return Array.isArray(list) ? list : (list.queries || []);
}

// -- SCORE: show every query + score ------------------------------------------
async function runScore() {
  const queries = await listQueries();
  if (!queries.length) { toSummary("## Neuron Narrator -- no queries in project\n"); return; }
  const rows = [];
  for (const q of queries) {
    const id = q.query || q.id, keyword = q.keyword || "";
    rows.push({ keyword, score: await readScore(id) });
  }
  rows.sort((a,b) => (a.score ?? -1) - (b.score ?? -1));
  let md = "## Neuron Narrator -- query scores\n\n| Keyword | Score |\n|---|---|\n";
  for (const r of rows) md += `| ${r.keyword} | ${r.score===null?"-- (empty)":r.score+"%"} |\n`;
  md += `\n**${rows.length} queries.**\n`;
  toSummary(md); await email("Neuron Narrator -- scores", md.replace(/\n/g,"<br>"));
  const best = rows.reduce((m, r) => Math.max(m, r.score ?? -1), -1);
  return `score: ${rows.length} queries checked${best >= 0 ? `, best ${best}%` : ""}`;
}

// -- FILL: write/use draft for every query, push, score, lift-if-low, rank ----
async function runFill() {
  const manifest = loadManifest();
  const queries = await listQueries();
  const results = [];

  for (const q of queries) {
    const id = q.query || q.id, keyword = q.keyword || "";
    if (!keyword) continue;
    try {
      const hand = manifest[norm(keyword)];
      const handFile = hand ? join(CONTENT_DIR, hand.file) : null;
      let score, source;

      if (hand && handFile && existsSync(handFile)) {
        const html = readFileSync(handFile, "utf8");
        score = await pushAndScore(id, html, hand.title || keyword);
        source = "hand-written";
      } else {
        let terms = [];
        try { terms = pickTerms(await nw("get-query", { query: id })); } catch {}
        let html = await writeDraft(keyword, terms);
        score = await pushAndScore(id, html, `${keyword} | EnviroCare`);
        source = "auto-written";
        // rating-aware: one rewrite if it came in below the floor
        if (score !== null && score < SCORE_FLOOR) {
          const html2 = await writeDraft(keyword, terms, true);
          const score2 = await pushAndScore(id, html2, `${keyword} | EnviroCare`);
          if (score2 !== null && score2 >= score) { score = score2; source = "auto-written (lifted)"; }
        }
      }
      results.push({ keyword, score, source });
    } catch (e) {
      results.push({ keyword, score: null, source: `ERROR -- ${e.message}` });
    }
    await sleep(SLEEP_MS);
  }

  const rank = [...results].sort((a,b) => (b.score ?? -1) - (a.score ?? -1));
  const ready = rank.filter(r => (r.score ?? -1) >= SCORE_FLOOR);
  const work  = rank.filter(r => (r.score ?? -1) <  SCORE_FLOOR);

  let md = `## Neuron Narrator -- filled ${results.length} editors\n\n`;
  md += `**Ready to ship (score >= ${SCORE_FLOOR}%) -- publish these first, best at top:**\n\n`;
  md += `| # | Keyword | Score | Source |\n|---|---|---|---|\n`;
  ready.forEach((r,i) => md += `| ${i+1} | ${r.keyword} | ${r.score}%${r.score>=SHIP_GOOD?" 💪":""} | ${r.source} |\n`);
  if (!ready.length) md += `| — | (none cleared the floor yet) | | |\n`;
  if (work.length) {
    md += `\n**Still light (below ${SCORE_FLOOR}%) -- left as drafts to revisit:**\n\n| Keyword | Score |\n|---|---|\n`;
    work.forEach(r => md += `| ${r.keyword} | ${r.score===null?"err":r.score+"%"} |\n`);
  }
  md += `\nAll drafts are in NeuronWriter now. Publish to the live site best-first, a few a week, via pull requests.\n`;
  toSummary(md); await email("Neuron Narrator -- ready-to-ship queue", md.replace(/\n/g,"<br>"));

  // Surface the result in the Command Center (Recent Findings panel), not just email.
  const top = ready.slice(0, 3).map(r => `${r.keyword} ${r.score}%`).join(", ");
  await logFindingREST({
    agent_name: "neuronwriter-narrator",
    category: "content",
    severity: ready.length ? "info" : "warning",
    finding: ready.length
      ? `${ready.length} SEO draft(s) ready to ship (score ≥ ${SCORE_FLOOR}%). Top: ${top || "—"}. Review in NeuronWriter, then publish via PR.`
      : `Filled ${results.length} SEO draft(s); none cleared the ${SCORE_FLOOR}% floor yet — left as drafts to revisit.`,
  }).catch(() => {});
  return `fill: ${results.length} editors, ${ready.length} ready to ship${ready[0] ? ` (top ${ready[0].keyword} ${ready[0].score}%)` : ""}`;
}

// -- main ---------------------------------------------------------------------
const mode = (process.argv[2] || "score").toLowerCase();
// Heartbeat both outcomes to agent_runs so the watchdog's expected-run check
// can see this agent (needs SUPABASE_URL + SUPABASE_SERVICE_KEY in the workflow).
try {
  const summary = (mode === "fill" || mode === "push") ? await runFill() : await runScore();
  await logRunREST("neuronwriter-narrator", "ok", summary || `mode=${mode} completed`).catch(() => {});
} catch (e) {
  console.error("Narrator failed:", e.message);
  await logRunREST("neuronwriter-narrator", "error", `mode=${mode}: ${e.message}`).catch(() => {});
  await email("Neuron Narrator FAILED", `<pre>${e.message}</pre>`);
  process.exit(1);
}
