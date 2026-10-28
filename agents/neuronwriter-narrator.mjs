// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/neuronwriter-narrator.mjs
// Commit: feat(agent): narrator auto-writes, scores, retries low drafts, ranks ready-to-ship
// Push: main
// ─────────────────────────────────────
//
// THE NEURON NARRATOR (fully automatic, rating-aware)
//   fill  -> unique keywords, planned first, bounded candidate batch: use a hand draft or WRITE one
//            (Claude), validate citations/structure/compliance before import, read its score. If an auto draft
//            scores below the floor, rewrite it ONCE to lift it. Then rank everything
//            by score and report a "score-ready" queue (best first). Score-ready means
//            NeuronWriter keyword coverage ONLY: no compliance scan, no plagiarism check,
//            no image, no duplicate check. On 10-12 nine of 24 such drafts carried banned
//            claims. The weekly content PR (blog-from-drafts / content-refresh) is the gate.
//   score -> just list every query + its current score.
//
// No ChatGPT. Uses NEURONWRITER_API_KEY + ANTHROPIC_API_KEY (already GitHub secrets).

const API_BASE = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const PROJECT  = process.env.NEURONWRITER_PROJECT || "9d0bec3a70f4743c";
const KEY      = process.env.NEURONWRITER_API_KEY;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.NARRATOR_MODEL || "claude-sonnet-4-6";

const SCORE_FLOOR = Number(process.env.NARRATOR_SCORE_FLOOR || 65); // score-ready line (keyword coverage only)
const SHIP_GOOD   = Number(process.env.NARRATOR_SHIP_GOOD   || 70); // "strong" mark
const SLEEP_MS    = Number(process.env.NARRATOR_SLEEP_MS    || 1200); // gentle on rate limits

// Do not overwrite a draft that is already good. Before this existed, every FILL run
// blew away hand-corrected editor content and replaced it with a fresh model draft —
// including drafts a human had just fixed for compliance. Set NARRATOR_FORCE=1 to
// deliberately rewrite everything.
const PROTECT_AT = Number(process.env.NARRATOR_PROTECT_AT || 70);
const FORCE      = process.env.NARRATOR_FORCE === "1";

const RESEND_KEY  = process.env.RESEND_API_KEY || "";
const NOTIFY_TO   = (process.env.NOTIFY_EMAIL || "").split(",").map(s => s.trim()).filter(Boolean);
const NOTIFY_FROM = process.env.NOTIFY_FROM || "EnviroCare Narrator <onboarding@resend.dev>";

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { COMPLIANCE_SYSTEM, userPrompt } from "./lib/compliance.mjs";
import { logRunREST, logFindingREST } from "./lib/run-log.mjs";
import { knowledgeBlock } from "./lib/knowledge.mjs";
import { assessEditorialDraft, sourcePrompt, selectNarratorQueries, narratorWriteLimit } from "./lib/editorial-quality.mjs";

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

// API shapes proven in CI 2026-08-03 (run 30851142163): NEITHER list-queries rows
// nor get-content responses carry any score field. list-queries rows: id, query,
// keyword, language, engine, created, updated, source, tags, *_url. get-content:
// content, title, description, created, type, query, keyword, language, engine,
// project. The ONLY reads that return content_score are import-content (a write)
// and evaluate-content (read-only, quota-free — the 75/month quota is on
// new-query, see lib/neuronwriter.mjs). So: keep listedScore in case NW ever adds
// the field, and read real scores via get-content html -> evaluate-content.
const listedScore = (q) =>
  typeof q?.content_score === "number" ? q.content_score
  : typeof q?.score === "number" ? q.score
  : null;

async function readScore(id, strict = false) {
  // Surface failures instead of swallowing them — a silent catch here is why a
  // broken call would show up as "-- (empty)" in the score table with no clue why.
  try {
    const c = await nw("get-content", { query: id });
    let s = pickScore(c);
    if (s !== null) return s;
    const html = typeof c?.content === "string" ? c.content : "";
    if (!html.trim()) return null; // genuinely empty editor
    const ev = await nw("evaluate-content", { query: id, html, title: c.title || "", description: c.description || "" });
    return pickScore(ev);
  }
  catch (e) { if (strict) throw e; console.error(`[narrator] readScore failed for query ${id}: ${e.message}`); return null; }
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
// Loaded once per process. NOTE: knowledgeBlock() reads the local
// agents/knowledge/*.md files (brand, competitors, goals, strategy) — it is
// NOT Supabase-backed, despite what an earlier patch comment claimed.
let _knowledge = null;
function getKnowledge() {
  if (_knowledge === null) {
    _knowledge = knowledgeBlock();
    if (_knowledge) console.log("[narrator] loaded knowledge block (agents/knowledge/*.md)");
    else console.warn("[narrator] no knowledge files loaded — using hardcoded compliance rules only");
  }
  return _knowledge;
}

// The model sometimes returns HTML wrapped in a markdown code fence. Pushing that
// raw put a literal ```html into two saved drafts on 2026-08-03.
function stripFences(s) {
  return String(s || "")
    .replace(/^\s*```(?:html)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
}

async function writeDraft(keyword, terms, lift = false) {
  if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY not set -- cannot auto-write.");
  let prompt = userPrompt(keyword, terms);
  prompt += `\n\nEDITORIAL REQUIREMENTS: Start with a 15–100 word <p class="lede"> that directly answers the search. Include useful question headings, a concrete next step and relevant internal links. Cite a supplied source beside the specific point it supports. Never invent URLs, evidence, prices, certification, data-center experience or performance numbers. Do not imply sources endorse EnviroCare. Only use the following external sources, within their stated scope:\n${sourcePrompt(keyword)}`;
  if (lift) prompt += `\n\nThis is a revision to improve SEO coverage. Work in MORE of the related terms `
    + `naturally and add depth (a richer FAQ, a short locally-specific section), while keeping every `
    + `compliance rule. Do not keyword-stuff. Aim for the 70-80 coverage range.`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL, max_tokens: 4000, system: COMPLIANCE_SYSTEM + getKnowledge(),
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${JSON.stringify(j).slice(0,200)}`);
  const html = stripFences((j.content || []).filter(b => b.type === "text").map(b => b.text).join("\n"));
  if (!html) throw new Error("empty draft from model");
  return html;
}

// Score draft candidates without changing the NeuronWriter editor. A failed
// rewrite must not replace a better existing or first-pass draft.
async function evaluateDraft(id, html, title) {
  const resp = await nw("evaluate-content", { query: id, html, title, description: "" });
  const score = pickScore(resp);
  if (score === null) throw new Error("evaluate-content returned no content score; editor unchanged");
  return score;
}

async function pushAndScore(id, html, title, keyword) {
  const quality = assessEditorialDraft(html, { keyword, title });
  if (!quality.pass) throw new Error(`editor unchanged: ${quality.problems.join("; ")}`);
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
  const rows = Array.isArray(list) ? list : (list.queries || []);
  if (rows[0]) console.log(`[narrator] list-queries row keys: ${Object.keys(rows[0]).join(", ")}`);
  return rows;
}

// -- SCORE: show every query + score ------------------------------------------
async function runScore() {
  const queries = await listQueries();
  if (!queries.length) { toSummary("## Neuron Narrator -- no queries in project\n"); return; }
  const rows = [];
  for (const q of queries) {
    const id = q.query || q.id, keyword = q.keyword || "";
    rows.push({ keyword, score: listedScore(q) ?? await readScore(id) });
    await sleep(300); // readScore is now 2 API calls (get-content + evaluate-content)
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
  const batchPath = join(__dir, "knowledge/editorial-batch-36.json");
  const priorities = existsSync(batchPath) ? JSON.parse(readFileSync(batchPath, "utf8")).posts.map(p => p.keyword) : [];
  const allQueries = await listQueries();
  const queries = selectNarratorQueries(allQueries, priorities);
  const results = [];
  const maxWrites = narratorWriteLimit(process.env.NARRATOR_MAX_WRITES);
  let attempted = 0;
  console.log(`[narrator] ${allQueries.length} query rows -> ${queries.length} unique keyword editors; planned topics first`);

  for (const q of queries) {
    if (attempted >= maxWrites) break;
    const id = q.query || q.id, keyword = q.keyword || "";
    if (!keyword) continue;
    try {
      const hand = manifest[norm(keyword)];
      const handFile = hand ? join(CONTENT_DIR, hand.file) : null;
      let score, source;

      // Protect good editors even when a manifest draft exists. FORCE permits a
      // replacement attempt but never bypasses the editorial gate.
      const hasHandDraft = Boolean(hand && handFile && existsSync(handFile));
      let existing = null;
      if (!FORCE) {
        existing = listedScore(q) ?? await readScore(id, true);
        if (existing !== null && existing >= PROTECT_AT) {
          results.push({ keyword, score: existing, source: `kept (already ${existing}%)` });
          await sleep(SLEEP_MS);
          continue;
        }
      }

      attempted++;
      if (hasHandDraft) {
        const html = readFileSync(handFile, "utf8");
        score = await pushAndScore(id, html, hand.title || keyword, keyword);
        source = "hand-written";
      } else {
        let terms = [];
        try { terms = pickTerms(await nw("get-query", { query: id })); } catch {}
        const title = `${keyword} | EnviroCare`;
        let html = await writeDraft(keyword, terms);
        let proposed = await evaluateDraft(id, html, title);
        source = "auto-written";
        // Evaluate a single lift BEFORE importing anything. Previously, a
        // worse second attempt overwrote the better first attempt in the editor.
        if (proposed < SCORE_FLOOR) {
          const html2 = await writeDraft(keyword, terms, true);
          const score2 = await evaluateDraft(id, html2, title);
          if (score2 > proposed) {
            html = html2;
            proposed = score2;
            source = "auto-written (lifted)";
          }
        }
        // A low-scoring existing editor still deserves protection: never
        // replace it with an equal or worse machine draft unless forced.
        if (!FORCE && existing !== null && proposed <= existing) {
          results.push({ keyword, score: existing, source: `kept (candidate ${proposed}% vs current ${existing}%)` });
          await sleep(SLEEP_MS);
          continue;
        }
        score = await pushAndScore(id, html, title, keyword);
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

  const imported = results.filter(r => r.source === "hand-written" || r.source.startsWith("auto-written")).length;
  let md = `## Neuron Narrator -- checked ${results.length} unique editors; imported ${imported} drafts\n\n`;
  md += `**Score-ready (NeuronWriter >= ${SCORE_FLOOR}%, keyword coverage only) -- NOT compliance- or plagiarism-checked, no images. Do not publish from here: the weekly content PR runs those gates. Best first:**\n\n`;
  md += `| # | Keyword | Score | Source |\n|---|---|---|---|\n`;
  ready.forEach((r,i) => md += `| ${i+1} | ${r.keyword} | ${r.score}%${r.score>=SHIP_GOOD?" 💪":""} | ${r.source} |\n`);
  if (!ready.length) md += `| — | (none cleared the floor yet) | | |\n`;
  if (work.length) {
    md += `\n**Still light (below ${SCORE_FLOOR}%) -- left as drafts to revisit:**\n\n| Keyword | Score |\n|---|---|\n`;
    work.forEach(r => md += `| ${r.keyword} | ${r.score===null?"err":r.score+"%"} |\n`);
  }
  md += `\nCandidate attempts: ${attempted}/${maxWrites}; ${queries.length - results.length} unique editors not visited after the batch limit.\n`;
  md += `\nOnly imported drafts changed NeuronWriter; kept, blocked and error rows did not. Score-ready is not publication approval. Review originality, source support, imagery and the built-page checks before any human merge.\n`;
  toSummary(md); await email("Neuron Narrator -- score-ready drafts (unchecked)", md.replace(/\n/g,"<br>"));

  // Surface the result in the Command Center (Recent Findings panel), not just email.
  const top = ready.slice(0, 3).map(r => `${r.keyword} ${r.score}%`).join(", ");
  await logFindingREST({
    agent_name: "neuronwriter-narrator",
    category: "content",
    severity: ready.length ? "info" : "warning",
    finding: ready.length
      ? `${ready.length} draft(s) score-ready (NeuronWriter ≥ ${SCORE_FLOOR}%, keyword coverage only — NOT compliance- or plagiarism-checked, no images). Top: ${top || "—"}. They reach the site only through the weekly content PR, which runs those gates.`
      : `Filled ${results.length} SEO draft(s); none cleared the ${SCORE_FLOOR}% floor yet — left as drafts to revisit.`,
  }).catch(() => {});
  const failures = results.filter(r => r.source.startsWith("ERROR"));
  return { status: failures.length ? (failures.length === results.length ? "error" : "partial") : "ok", summary: `fill: ${results.length} editors checked, ${imported} imported, ${failures.length} blocked/error, ${queries.length - results.length} deferred` };
}

// -- main ---------------------------------------------------------------------
const mode = (process.argv[2] || "score").toLowerCase();
// Heartbeat both outcomes to agent_runs so the watchdog's expected-run check
// can see this agent (needs SUPABASE_URL + SUPABASE_SERVICE_KEY in the workflow).
try {
  const result = (mode === "fill" || mode === "push") ? await runFill() : await runScore();
  const status = typeof result === "object" ? result.status : "ok";
  const summary = typeof result === "object" ? result.summary : result;
  await logRunREST("neuronwriter-narrator", status, summary || `mode=${mode} completed`).catch(() => {});
  if (status === "error") process.exitCode = 1;
} catch (e) {
  console.error("Narrator failed:", e.message);
  await logRunREST("neuronwriter-narrator", "error", `mode=${mode}: ${e.message}`).catch(() => {});
  await email("Neuron Narrator FAILED", `<pre>${e.message}</pre>`);
  process.exit(1);
}
