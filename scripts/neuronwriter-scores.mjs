// ─────────────────────────────────────────────────────────────
// EnviroCare — NeuronWriter score pull  (run from your laptop via Claude Code)
//
// WHAT IT DOES:
//   1. Finds your NeuronWriter project
//   2. Lists every query (keyword) in it
//   3. Reads the CURRENT content score for each — uses get-query, which
//      per NeuronWriter's docs consumes ZERO analysis credits
//   4. (optional) Re-scores live deployed pages with evaluate-content,
//      which evaluates without saving a revision
//
// WHY CLAUDE CODE AND NOT CHAT: the API isn't reachable from the chat
// sandbox, and the key lives only in your local .env.
//
// CONFIRMED API (neuron-api 0.5):
//   POST https://app.neuronwriter.com/neuron-api/0.5/writer/<method>
//   header: X-API-KEY: <key>
//   methods used: list-projects · list-queries · get-query · evaluate-content
//
// SETUP: nothing to install (Node 18+ has fetch). Just have
//   NEURONWRITER_API_KEY in your .env (or shell env).
//
// RUN (from repo root):
//   node scripts/neuronwriter-scores.mjs              # list scores
//   node scripts/neuronwriter-scores.mjs --rescore    # also re-score live pages
//
// OUTPUT: ./audit-results/neuronwriter.md  +  neuronwriter-raw.json
// SAFETY: read-only on your site; never writes to the repo or commits.
// ─────────────────────────────────────────────────────────────

import { writeFile, mkdir, readFile } from "node:fs/promises";

const NW = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const BASE = process.env.AUDIT_BASE || "https://envirocare-web.vercel.app";
const OUT = "./audit-results";

// Optional: set your project id to skip the picker (grab from the dashboard URL).
let PROJECT_ID = process.env.NW_PROJECT_ID || "";

// Optional re-score map: keyword (lowercase, partial-match) -> live path.
// Only used with --rescore. Add the pages you want freshly scored.
const RESCORE_MAP = {
  "pest control": "/services/pest-control",
  "termite": "/services/termite-control",
  "mosquito": "/services/mosquito-control",
  "tick": "/services/tick-control",
  "fire ant": "/services/fire-ant",
  "flea": "/services/flea",
  "commercial": "/services/commercial",
  "wdo": "/services/wdo-letters",
  "builder": "/services/builder-pre-treat",
};

// ---- tiny .env loader (only if var not already in environment) ----
async function loadEnv() {
  if (process.env.NEURONWRITER_API_KEY) return process.env.NEURONWRITER_API_KEY;
  try {
    const txt = await readFile("./.env", "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*NEURONWRITER_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, "");
      const p = line.match(/^\s*NW_PROJECT_ID\s*=\s*(.+?)\s*$/);
      if (p && !PROJECT_ID) PROJECT_ID = p[1].replace(/^["']|["']$/g, "");
    }
  } catch { /* no .env */ }
  return process.env.NEURONWRITER_API_KEY || "";
}

let KEY = "";
async function call(method, body = {}) {
  const res = await fetch(`${NW}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-KEY": KEY },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = { _raw: text }; }
  if (!res.ok) throw new Error(`${method} → HTTP ${res.status}: ${text.slice(0, 200)}`);
  return data;
}

// pull a content score out of get-query's response regardless of exact key
function pickScore(d) {
  return (
    d?.content_score ?? d?.score ??
    d?.metrics?.content_score ?? d?.content?.content_score ??
    d?.content?.score ?? d?.evaluation?.content_score ?? null
  );
}

(async () => {
  await mkdir(OUT, { recursive: true });
  KEY = await loadEnv();
  if (!KEY) { console.error("❌ NEURONWRITER_API_KEY not found in env or ./.env"); process.exit(1); }

  const rescore = process.argv.includes("--rescore");

  // 1) project
  if (!PROJECT_ID) {
    const projects = await call("list-projects");
    const list = Array.isArray(projects) ? projects : projects.projects || [];
    console.log("\nProjects on this account:");
    for (const p of list) console.log(`  ${p.project}  —  ${p.name} (${p.language || ""} ${p.engine || ""})`);
    const guess = list.find((p) => /envirocare/i.test(p.name || ""));
    if (guess) { PROJECT_ID = guess.project; console.log(`\n→ Using "${guess.name}" (${guess.project})`); }
    else { console.log("\nSet NW_PROJECT_ID in your .env to the EnviroCare project id above, then re-run."); process.exit(0); }
  }

  // 2) queries
  const q = await call("list-queries", { project: PROJECT_ID });
  const queries = Array.isArray(q) ? q : q.queries || [];
  if (!queries.length) { console.error("No queries found for this project."); process.exit(0); }

  // 3) scores
  const raw = [];
  const rows = [];
  for (const item of queries) {
    const qid = item.query || item.id;
    const keyword = item.keyword || item.name || "(no keyword)";
    let score = null, source = "current";
    try {
      const detail = await call("get-query", { query: qid });
      score = pickScore(detail);
      raw.push({ qid, keyword, source: "get-query", detail });

      if (rescore) {
        const k = keyword.toLowerCase();
        const path = Object.entries(RESCORE_MAP).find(([kw]) => k.includes(kw))?.[1];
        if (path) {
          const ev = await call("evaluate-content", { query: qid, url: `${BASE}${path}` });
          const fresh = pickScore(ev);
          if (fresh != null) { score = fresh; source = `live ${path}`; }
          raw.push({ qid, keyword, source: `evaluate ${path}`, detail: ev });
        }
      }
    } catch (e) {
      raw.push({ qid, keyword, error: String(e.message) });
    }
    rows.push({ keyword, qid, score, source });
    process.stdout.write(`  • ${keyword}: ${score ?? "—"}\n`);
  }

  rows.sort((a, b) => (Number(a.score) || 999) - (Number(b.score) || 999));
  let md = `# NeuronWriter content scores\n\n_${new Date().toISOString()} · project ${PROJECT_ID}_\n\n`;
  md += `Target band: **70–80** (don't chase 100). Sorted lowest-first so weak pages are on top.\n\n`;
  md += `| Keyword | Score | Source | Query id |\n|---|---|---|---|\n`;
  for (const r of rows) {
    const flag = typeof r.score === "number" ? (r.score >= 70 ? "✅" : "⬇️") : "—";
    md += `| ${r.keyword} | ${flag} ${r.score ?? "—"} | ${r.source} | ${r.qid} |\n`;
  }
  md += `\n_Run with \`--rescore\` to evaluate the live deployed pages (uses evaluate-content, no saved revision)._\n`;

  await writeFile(`${OUT}/neuronwriter.md`, md);
  await writeFile(`${OUT}/neuronwriter-raw.json`, JSON.stringify(raw, null, 2));
  console.log(`\n✅ ${OUT}/neuronwriter.md  (+ neuronwriter-raw.json for the full API shape)`);
})();
