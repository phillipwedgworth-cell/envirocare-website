// agents/ai-citation-probe.mjs
// FIRST-PARTY AI-VISIBILITY MONITOR (GEO/AEO). Fires the tracked prompts
// (agents/ai-citation-prompts.json) at web-grounded AI engines and measures, per
// prompt/engine: is EnviroCare MENTIONED, is envirocarellc.com CITED, and which
// COMPETITOR domains showed up instead. Writes a committed snapshot to
// agents/reports/ai-citations-latest.json and prints a summary. This is the
// in-house version of NeuronWriter's AI-Tracker — we own the data, no vendor API.
//
// Engines (each optional — runs whichever keys exist):
//   OpenAI    web-search model  (OPENAI_API_KEY)      — default model gpt-4o-search-preview
//   Gemini    Google Search grounding (GEMINI_API_KEY) — default gemini-2.0-flash
//   Perplexity sonar (PERPLEXITY_API_KEY)              — inherently web-grounded
//
//   node agents/ai-citation-probe.mjs            # all prompts, all available engines
//   node agents/ai-citation-probe.mjs --limit 5  # first 5 prompts (cheap smoke test)
//
// Defensive by design: every engine call is wrapped; a failure records an error
// for that cell and the run continues. No secrets are logged.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const CFG = JSON.parse(readFileSync(join(__dir, "ai-citation-prompts.json"), "utf8"));
const OUT = join(__dir, "reports", "ai-citations-latest.json");

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const PPLX_KEY = process.env.PERPLEXITY_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_SEARCH_MODEL || "gpt-4o-search-preview";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const STAMP = process.env.PROBE_DATE || ""; // pass an ISO date in CI; Date.* avoided for determinism

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const lc = (s) => String(s || "").toLowerCase();

const limIdx = process.argv.indexOf("--limit");
const LIMIT = limIdx > -1 ? Number(process.argv[limIdx + 1]) : 0;
const PROMPTS = LIMIT ? CFG.prompts.slice(0, LIMIT) : CFG.prompts;

const URL_RE = /https?:\/\/[^\s"')<>\]]+/gi;
const urlsFromText = (t) => (String(t || "").match(URL_RE) || []).map((u) => u.replace(/[.,]$/, ""));

// ---- engines: each returns { engine, ok, text, urls, error } ----------------
async function askOpenAI(prompt) {
  if (!OPENAI_KEY) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: OPENAI_MODEL, messages: [{ role: "user", content: prompt }] }),
    });
    const j = await res.json();
    if (!res.ok) return { engine: "openai", ok: false, text: "", urls: [], error: `${res.status}: ${JSON.stringify(j).slice(0, 160)}` };
    const msg = j.choices?.[0]?.message || {};
    const text = msg.content || "";
    const annUrls = (msg.annotations || []).map((a) => a?.url_citation?.url || a?.url).filter(Boolean);
    return { engine: "openai", ok: true, text, urls: [...new Set([...annUrls, ...urlsFromText(text)])], error: null };
  } catch (e) { return { engine: "openai", ok: false, text: "", urls: [], error: e.message }; }
}

async function askGemini(prompt) {
  if (!GEMINI_KEY) return null;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], tools: [{ google_search: {} }] }),
    });
    const j = await res.json();
    if (!res.ok) return { engine: "gemini", ok: false, text: "", urls: [], error: `${res.status}: ${JSON.stringify(j).slice(0, 160)}` };
    const cand = j.candidates?.[0] || {};
    const text = (cand.content?.parts || []).map((p) => p.text || "").join(" ");
    const chunks = cand.groundingMetadata?.groundingChunks || [];
    const gUrls = chunks.map((c) => c?.web?.uri).filter(Boolean);
    return { engine: "gemini", ok: true, text, urls: [...new Set([...gUrls, ...urlsFromText(text)])], error: null };
  } catch (e) { return { engine: "gemini", ok: false, text: "", urls: [], error: e.message }; }
}

async function askPerplexity(prompt) {
  if (!PPLX_KEY) return null;
  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${PPLX_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.PPLX_MODEL || "sonar", messages: [{ role: "user", content: prompt }] }),
    });
    const j = await res.json();
    if (!res.ok) return { engine: "perplexity", ok: false, text: "", urls: [], error: `${res.status}: ${JSON.stringify(j).slice(0, 160)}` };
    const text = j.choices?.[0]?.message?.content || "";
    const cites = j.citations || j.choices?.[0]?.message?.citations || [];
    return { engine: "perplexity", ok: true, text, urls: [...new Set([...cites, ...urlsFromText(text)])], error: null };
  } catch (e) { return { engine: "perplexity", ok: false, text: "", urls: [], error: e.message }; }
}

// ---- analysis ----------------------------------------------------------------
function analyze(r) {
  const hay = lc(r.text + " " + r.urls.join(" "));
  const brand_mentioned = CFG.brand_variants.some((b) => hay.includes(lc(b)));
  const domain_cited = hay.includes(lc(CFG.domain));
  const competitors_cited = CFG.competitors.filter((c) => hay.includes(lc(c)));
  return { brand_mentioned, domain_cited, competitors_cited };
}

// ---- run ---------------------------------------------------------------------
const engines = [askOpenAI, askGemini, askPerplexity];
const active = [OPENAI_KEY && "openai", GEMINI_KEY && "gemini", PPLX_KEY && "perplexity"].filter(Boolean);
if (!active.length) { console.error("No engine keys set (need OPENAI_API_KEY, GEMINI_API_KEY, or PERPLEXITY_API_KEY)."); process.exit(1); }
console.log(`AI-citation probe — ${PROMPTS.length} prompts × [${active.join(", ")}]\n`);

const rows = [];
let cells = 0, mentioned = 0, cited = 0;
const opportunities = [];

for (const prompt of PROMPTS) {
  const engineResults = [];
  for (const fn of engines) {
    const r = await fn(prompt);
    if (!r) continue;
    const a = r.ok ? analyze(r) : { brand_mentioned: false, domain_cited: false, competitors_cited: [] };
    engineResults.push({ engine: r.engine, ok: r.ok, error: r.error, ...a, urls: r.urls.slice(0, 8) });
    if (r.ok) { cells++; if (a.brand_mentioned) mentioned++; if (a.domain_cited) cited++; }
    await sleep(600);
  }
  const anyCited = engineResults.some((e) => e.domain_cited);
  const anyMention = engineResults.some((e) => e.brand_mentioned);
  const comps = [...new Set(engineResults.flatMap((e) => e.competitors_cited))];
  rows.push({ prompt, any_brand_mentioned: anyMention, any_domain_cited: anyCited, competitors_cited: comps, engines: engineResults });
  // Opportunity = we are not cited on any engine (mentioned-but-not-cited is the priority gap).
  if (!anyCited) opportunities.push({ prompt, brand_mentioned: anyMention, competitors_cited: comps, gap: anyMention ? "mentioned-not-cited" : "absent" });
  console.log(`  ${anyCited ? "✅ cited" : anyMention ? "🟡 mentioned" : "❌ absent"}  ${prompt}${comps.length ? `   (competitors: ${comps.join(", ")})` : ""}`);
}

const metrics = {
  engine_cells: cells,
  brand_mention_rate: cells ? Math.round((mentioned / cells) * 100) : 0,
  domain_cited_rate: cells ? Math.round((cited / cells) * 100) : 0,
  prompts_cited: rows.filter((r) => r.any_domain_cited).length,
  prompts_total: rows.length,
};

const report = {
  _comment: "First-party AI-visibility snapshot from agents/ai-citation-probe.mjs. domain_cited_rate is the money metric (does AI cite envirocarellc.com). Compare to NeuronWriter's dashboard. Opportunities feed agents/neuronwriter-content/ai-opportunities.json.",
  date: STAMP || null,
  engines: active,
  metrics,
  opportunities,
  results: rows,
};
writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");

console.log(`\nMetrics: brand mentioned ${metrics.brand_mention_rate}% · domain cited ${metrics.domain_cited_rate}% · ${metrics.prompts_cited}/${metrics.prompts_total} prompts cite us`);
console.log(`Opportunities (not cited): ${opportunities.length}`);
console.log(`Wrote ${OUT}`);

// Optional summary email (reuses the same Resend env the other agents use).
if (process.env.RESEND_API_KEY && (process.env.NOTIFY_EMAIL || "").trim()) {
  const to = process.env.NOTIFY_EMAIL.split(",").map((s) => s.trim()).filter(Boolean);
  const html = `<h3>AI-citation probe</h3><p>Brand mentioned <b>${metrics.brand_mention_rate}%</b> · domain cited <b>${metrics.domain_cited_rate}%</b> · ${metrics.prompts_cited}/${metrics.prompts_total} prompts cite envirocarellc.com.</p><p><b>${opportunities.length}</b> prompts don't cite us yet.</p>` +
    `<ul>${opportunities.slice(0, 15).map((o) => `<li>${o.prompt} — ${o.gap}${o.competitors_cited.length ? ` (${o.competitors_cited.join(", ")})` : ""}</li>`).join("")}</ul>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.NOTIFY_FROM || "EnviroCare AI Visibility <onboarding@resend.dev>", to, subject: `AI-citation probe — ${metrics.domain_cited_rate}% domain-cited`, html }),
    });
  } catch (e) { console.error("email failed (non-fatal):", e.message); }
}
