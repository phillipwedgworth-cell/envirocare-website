// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/neuronwriter-pull.mjs
// Commit: feat(agents): neuronwriter-pull — the 50 scored drafts parked in NeuronWriter since June/July/Aug get scrubbed and loaded onto the site
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * neuronwriter-pull — the missing last step of the narrator.
 *
 * Sep 5 2026 audit: NeuronWriter holds 119 finished drafts (50 unique
 * keywords, ~120,000 words, scores 49–90) that were written into its editor
 * in June–August and never applied to the site. Every one tripped several
 * compliance locks (retired company name, "March through November",
 * "Sentricon coverage includes $1M", carpenter bees marketed, "crawlspace
 * work", availability promises), so the scanner would have blocked them and
 * nobody carried them across. This agent carries them across.
 *
 * For each entry in agents/knowledge/neuronwriter-manifest.json:
 *   1. GET the latest saved content (free — no analysis spent).
 *   2. Scrub it with the same lock list the scanner enforces (below).
 *   3. If the target is a City record in data/cities.ts → parse the draft into
 *      intro / whyHere / pestContext / faqs and write it into the record.
 *      (Handles both draft shapes: <h3> per pest, and <ul><li><strong>.)
 *   4. Otherwise (custom page.tsx, service page) → write the scrubbed HTML to
 *      agents/neuronwriter-content/<slug>.scrubbed.html and file a finding so
 *      the section gets placed by the next pass.
 * Idempotent: a record whose whyHere already came from NeuronWriter (marker in
 * agent_state) is skipped unless --force.
 */
import fs from "node:fs";
import path from "node:path";
import { logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";

const AGENT_NAME = "neuronwriter-pull";
const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "agents/knowledge/neuronwriter-manifest.json");
const CITIES = path.join(ROOT, "data/cities.ts");
const OUT_DIR = path.join(ROOT, "agents/neuronwriter-content");
const NW_API = process.env.NEURONWRITER_API_URL || "https://app.neuronwriter.com/neuron-api/0.5/writer";
const NW_KEY = process.env.NEURONWRITER_API_KEY;
const FORCE = process.argv.includes("--force");

// ── the lock list, as text rewrites (order matters) ─────────────────────────
const SCRUB = [
  [/EnviroCare Pest (and|&) Termite Services/g, "EnviroCare"],
  [/March through November/g, "March through October"],
  [/\bMar(?:ch)?\s*[–-]\s*Nov(?:ember)?\b/g, "March–October"],
  [/(nine|9)\s+(visits|treatments)/gi, "eight treatments"],
  [/Sentricon(®)? coverage includes up to \$1,000,000 in damage repair coverage/g, "The system carries up to $1,000,000 in EnviroCare damage repair coverage"],
  [/Sentricon(®)?('s)? (\$1M|\$1,000,000)[^.]*?(warranty|guarantee|coverage)/g, "up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement"],
  [/\b(damage repair )?(guarantee|warranty)\b/gi, "damage repair coverage"],
  [/,?\s*(hornets and )?carpenter bees\b/gi, (m) => (/hornets/.test(m) ? " and hornets" : "")],
  [/,?\s*and crawlspace work\b/g, ""],
  [/crawl ?space encapsulation/gi, "termite protection"],
  [/\b(pet|kid|child)[- ]safe\b/gi, "applied per label directions"],
  [/\b(eco[- ]friendly|non[- ]toxic|EPA[- ]approved)\b/gi, "EPA-registered"],
  [/\bthird[- ]generation\b/gi, "four generations"],
  [/\b(68|67|66)\+? years\b/g, "since 1958"],
  [/priced after a free on-site inspection, because an accurate number depends on the size of the structure and what is actually happening on the property/g, "priced by the service — mosquito $45 per treatment (eight treatments, March through October; $34 a month with a pest plan), Mosquito + Tick $65 per treatment, fire ant $150 for most yards — and termite work is quoted only after a free on-site WDO inspection"],
  [/mosquito control pairs well with tick service during peak outdoor season, and both are priced after a free on-site inspection/gi, "mosquito control pairs with tick service on wooded lots — $65 per treatment for the pair"],
  [/\bmosquito[- ]free\b/gi, "mosquito-light"],
  [/\beliminat(e|es|ing|ion)\b(?=[^.]{0,80}mosquito)/gi, "reduc$1"],
  [/\$99 (startup|initial)/g, "$75 initial service"],
  [/\$150 initial service/g, "$75 initial service"],
  [/\$79 (startup|initial)/g, "$75 initial service"],
];
// FAQ questions that are availability / scheduling promises — dropped entirely
const DROP_FAQ = /how soon|same[- ]day|how fast|how quickly|when can you (come|start)/i;
const DROP_PEST = /gnat|carpenter bee|bed ?bug|wildlife|raccoon|squirrel|lawn/i;

const txt = (h) => String(h).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
function scrub(html) { let s = html; for (const [re, rep] of SCRUB) s = s.replace(re, rep); return s; }
const EMOJI = [["termite", "🪵"], ["ant", "🐜"], ["roach", "🪳"], ["rodent", "🐭"], ["mice", "🐭"], ["rat", "🐭"], ["wasp", "🐝"], ["hornet", "🐝"], ["sting", "🐝"], ["mosquito", "🦟"], ["tick", "🦟"], ["spider", "🕷️"], ["flea", "🐾"], ["silverfish", "🐛"], ["cricket", "🦗"]];
const emoji = (t) => (EMOJI.find(([k]) => t.toLowerCase().includes(k)) || [null, "🐛"])[1];

async function getContent(id) {
  const r = await fetch(`${NW_API}/get-content`, { method: "POST", headers: { "X-API-KEY": NW_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ query: id }) });
  if (!r.ok) throw new Error(`get-content ${id}: HTTP ${r.status}`);
  const j = await r.json();
  const html = j.content ?? j.html ?? j?.data?.content;
  if (!html || txt(html).split(" ").length < 300) throw new Error(`get-content ${id}: no usable content`);
  return { html, title: j.title, description: j.description };
}

// ── parse a draft into City-record fields (both shapes) ─────────────────────
function parseDraft(html) {
  const parts = html.split(/(<h2[^>]*>[\s\S]*?<\/h2>)/);
  const pre = parts[0]; const sec = {};
  for (let i = 1; i < parts.length; i += 2) sec[txt(parts[i]).toLowerCase()] = parts[i + 1] ?? "";
  const find = (re) => Object.entries(sec).find(([k]) => re.test(k))?.[1] ?? "";
  const paras = (h) => [...h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => txt(m[1])).filter((p) => p.length > 40 && !/tel:|call \(|stop by the office/i.test(p));
  const intro = paras(pre).slice(0, 2).join(" ");
  const whyHere = paras(find(/why|built for|different|ground|local pest control|what makes/)).join(" ");
  const pestsH = find(/pests we treat|common pests|what shows up/);
  const pestContext = [];
  for (const m of pestsH.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/g)) { const t = txt(m[1]); const b = paras(m[2]).join(" "); if (t && b && !DROP_PEST.test(t + b)) pestContext.push({ emoji: emoji(t), title: t, body: b }); }
  if (!pestContext.length) for (const m of pestsH.matchAll(/<li[^>]*>\s*<strong>([\s\S]*?)<\/strong>\s*[-–—:]?\s*([\s\S]*?)<\/li>/g)) { const t = txt(m[1]); const b = txt(m[2]); if (t && b && !DROP_PEST.test(t + b)) pestContext.push({ emoji: emoji(t), title: t, body: b.charAt(0).toUpperCase() + b.slice(1) + (/[.!?]$/.test(b) ? "" : ".") }); }
  const faqH = find(/faq|frequently|questions/);
  const faqs = [];
  for (const m of faqH.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g)) { const q = txt(m[1]); const a = txt(m[2]); if (q && a && !DROP_FAQ.test(q) && !DROP_PEST.test(q + a)) faqs.push({ q, a }); }
  const pestHeadline = Object.keys(sec).find((k) => /pests we treat|common pests/.test(k));
  return { intro, whyHere, pestContext, faqs, pestHeadline: pestHeadline ? pestHeadline.replace(/\b\w/g, (c) => c.toUpperCase()) : null };
}

// ── write into data/cities.ts (top-level record = has region AND county) ────
function spanAt(s, pos) { let i = s.lastIndexOf("{", pos), depth = 0, j = i; while (j < s.length) { const c = s[j]; if (c === "{") depth++; else if (c === "}") { depth--; if (!depth) return [i, j + 1]; } else if ("\"'`".includes(c)) { const q = c; j++; while (j < s.length && s[j] !== q) { if (s[j] === "\\") j++; j++; } } j++; } throw new Error("unbalanced"); }
function recordSpan(s, slug) { for (const m of s.matchAll(new RegExp(`slug"?:\\s*['"]${slug}['"]`, "g"))) { const [i, j] = spanAt(s, m.index); const rec = s.slice(i, j); if (/\bregion"?\s*:/.test(rec) && /\bcounty"?\s*:/.test(rec)) return [i, j]; } return null; }
function setField(rec, key, val) {
  const js = JSON.stringify(val);
  const re = new RegExp(`(["']?)${key}\\1\\s*:\\s*(?:"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`|\\[(?:[^\\[\\]]|\\[[^\\[\\]]*\\])*\\])`);
  if (re.test(rec)) return rec.replace(re, (m, q) => `${q || ""}${key}${q || ""}: ${js}`);
  const body = rec.trimEnd().slice(0, -1).trimEnd(); const sep = /[,{]$/.test(body) ? "" : ",";
  return `${body}${sep}\n    ${key}: ${js},\n  }`;
}
function loadCity(slug, d) {
  let s = fs.readFileSync(CITIES, "utf8"); const span = recordSpan(s, slug); if (!span) return false;
  let rec = s.slice(span[0], span[1]);
  if (d.intro) rec = setField(rec, "intro", d.intro);
  if (d.whyHere.split(" ").length >= 60) rec = setField(rec, "whyHere", d.whyHere);
  if (d.pestHeadline) rec = setField(rec, "pestHeadline", d.pestHeadline);
  if (d.pestContext.length >= 4) rec = setField(rec, "pestContext", d.pestContext);
  if (d.faqs.length >= 3) rec = setField(rec, "faqs", d.faqs);
  fs.writeFileSync(CITIES, s.slice(0, span[0]) + rec + s.slice(span[1]));
  return true;
}

export async function run() {
  const gate = await gateOrSkip(AGENT_NAME); if (!gate.allowed) return gate.result;
  if (!NW_KEY) throw new Error("NEURONWRITER_API_KEY not set");
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const summary = { loaded: [], flagged: [], skipped: [], errors: [] };
  for (const item of manifest.entries) {
    try {
      const key = `neuronwriter:pulled:${item.slug}`;
      if (!FORCE && (await stateGet(key))) { summary.skipped.push(item.slug); continue; }
      const { html } = await getContent(item.query);
      const clean = scrub(html);
      if (item.type === "city") {
        const d = parseDraft(clean);
        if (loadCity(item.slug, d)) { summary.loaded.push(`${item.slug} (${d.pestContext.length}p/${d.faqs.length}f/${d.whyHere.split(" ").length}w)`); await stateSet(key, { query: item.query, score: item.score, at: new Date().toISOString() }); continue; }
      }
      fs.writeFileSync(path.join(OUT_DIR, `${item.slug}.scrubbed.html`), clean);
      summary.flagged.push(item.slug);
      await writeFinding(AGENT_NAME, "neuronwriter", "info", item.target ?? null, `Scrubbed NeuronWriter draft ready for ${item.target ?? item.slug} (score ${item.score}) — custom page, needs section placement: agents/neuronwriter-content/${item.slug}.scrubbed.html`, { query: item.query });
      await stateSet(key, { query: item.query, score: item.score, flagged: true, at: new Date().toISOString() });
    } catch (e) { summary.errors.push(`${item.slug}: ${e.message}`); }
  }
  await logAgentRun(AGENT_NAME, summary.errors.length && !summary.loaded.length ? "failed" : "ok", summary);
  console.log(`[${AGENT_NAME}] loaded ${summary.loaded.length}, flagged ${summary.flagged.length}, skipped ${summary.skipped.length}, errors ${summary.errors.length}`);
  return summary;
}

export const _test = { scrub, parseDraft, loadCity };
if (import.meta.url === `file://${process.argv[1]}`) run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL`, e); process.exit(1); });
