// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/neuronwriter-narrator.mjs
// Commit: feat(agent): narrator auto-writes compliant drafts and pushes to NeuronWriter
// Push: main
// ─────────────────────────────────────
//
// THE NEURON NARRATOR (streamlined)
// ─────────────────────────────────
//   node agents/neuronwriter-narrator.mjs score  -> lists EVERY query + current score (you SEE).
//   node agents/neuronwriter-narrator.mjs fill    -> for EVERY query: uses a hand-written draft if
//                                                   one exists, otherwise WRITES one itself (Claude,
//                                                   compliance-locked), then pushes it into the editor.
//                                                   Runs only after your approval tap.
//
// No ChatGPT. Uses NEURONWRITER_API_KEY + ANTHROPIC_API_KEY -- both already GitHub secrets.

const API_BASE = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const PROJECT  = process.env.NEURONWRITER_PROJECT || "9d0bec3a70f4743c";
const KEY      = process.env.NEURONWRITER_API_KEY;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.NARRATOR_MODEL || "claude-sonnet-4-6";

const RESEND_KEY  = process.env.RESEND_API_KEY || "";
const NOTIFY_TO   = process.env.NOTIFY_EMAIL || "";
const NOTIFY_FROM = process.env.NOTIFY_FROM || "EnviroCare Narrator <onboarding@resend.dev>";

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { COMPLIANCE_SYSTEM, userPrompt } from "./lib/compliance.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dir, "neuronwriter-content");

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

function loadManifest() {
  const p = join(CONTENT_DIR, "manifest.json");
  if (!existsSync(p)) return {};
  try {
    const raw = JSON.parse(readFileSync(p, "utf8"));
    const map = {}; for (const e of raw.pages || []) map[norm(e.keyword)] = e; return map;
  } catch { return {}; }
}

// -- Claude writer (compliance-locked) ----------------------------------------
async function writeDraft(keyword, terms) {
  if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY not set -- cannot auto-write.");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2200,
      system: COMPLIANCE_SYSTEM,
      messages: [{ role: "user", content: userPrompt(keyword, terms) }],
    }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${JSON.stringify(j).slice(0,200)}`);
  const html = (j.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
  if (!html) throw new Error("empty draft from model");
  return html;
}

// -- notify + summary ---------------------------------------------------------
async function email(subject, html) {
  if (!RESEND_KEY || !NOTIFY_TO) return;
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
  const manifest = loadManifest();
  const queries = await listQueries();
  if (!queries.length) { toSummary("## Neuron Narrator -- no queries in project\n"); return; }

  const rows = [];
  for (const q of queries) {
    const id = q.query || q.id, keyword = q.keyword || "";
    let score = null;
    try { score = pickScore(await nw("get-content", { query: id })); } catch {}
    rows.push({ keyword, score, tags: Array.isArray(q.tags) ? q.tags.join(", ") : "",
                handWritten: !!manifest[norm(keyword)] });
  }
  rows.sort((a,b) => (a.score ?? -1) - (b.score ?? -1));

  let md = "## Neuron Narrator -- query scores\n\n| Keyword | Score | Status |\n|---|---|---|\n";
  for (const r of rows) md += `| ${r.keyword} | ${r.score===null?"-- (empty)":r.score+"%"} | ${r.tags||"--"} |\n`;
  md += `\n**${rows.length} queries.** Approve the **fill** step and the agent writes + pushes a `;
  md += `compliant draft into every empty editor (hand-written drafts take priority).\n`;
  toSummary(md);
  await email("Neuron Narrator -- scores", md.replace(/\n/g,"<br>"));
}

// -- FILL: write (or use) a draft for every query, then push ------------------
async function runFill() {
  const manifest = loadManifest();
  const queries = await listQueries();
  const results = [];

  for (const q of queries) {
    const id = q.query || q.id, keyword = q.keyword || "";
    if (!keyword) { continue; }
    try {
      let html, title, source;
      const hand = manifest[norm(keyword)];
      const handFile = hand ? join(CONTENT_DIR, hand.file) : null;

      if (hand && handFile && existsSync(handFile)) {
        html = readFileSync(handFile, "utf8");
        title = hand.title || keyword;
        source = "hand-written";
      } else {
        let terms = [];
        try { terms = pickTerms(await nw("get-query", { query: id })); } catch {}
        html = await writeDraft(keyword, terms);
        title = `${keyword} | EnviroCare`;
        source = "auto-written";
      }

      const resp = await nw("import-content", { project: PROJECT, query: id, html, title });
      const sc = pickScore(resp);
      results.push({ keyword, status: `${source} -> pushed${sc!==null?` (${sc}%)`:""}` });
    } catch (e) {
      results.push({ keyword, status: `ERROR -- ${e.message}` });
    }
  }

  let md = "## Neuron Narrator -- fill results\n\n| Keyword | Result |\n|---|---|\n";
  for (const r of results) md += `| ${r.keyword} | ${r.status} |\n`;
  md += `\n${results.length} editors filled. Open NeuronWriter to review the drafts and their scores.\n`;
  toSummary(md);
  await email("Neuron Narrator -- filled", md.replace(/\n/g,"<br>"));
}

// -- main ---------------------------------------------------------------------
const mode = (process.argv[2] || "score").toLowerCase();
try {
  if (mode === "fill" || mode === "push") await runFill();
  else await runScore();
} catch (e) {
  console.error("Narrator failed:", e.message);
  await email("Neuron Narrator FAILED", `<pre>${e.message}</pre>`);
  process.exit(1);
}
