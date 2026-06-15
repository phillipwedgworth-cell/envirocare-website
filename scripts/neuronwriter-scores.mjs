// ─────────────────────────────────────────────────────────────
// EnviroCare — NeuronWriter score pull  (run from your laptop via Claude Code)
//
// WHAT IT DOES:
//   1. Finds your NeuronWriter project
//   2. Lists every query (keyword) in it
//   3. Reads the CURRENT content score for each (get-query = ZERO credits)
//   4. (optional --rescore) re-scores live deployed pages (evaluate-content)
//   5. Writes a Markdown report, a RAW json, a timestamped CSV, AND
//      (optional) logs every row to a Notion database for a running record.
//
// WHY CLAUDE CODE AND NOT CHAT: NeuronWriter's API isn't reachable from the
// chat sandbox, and the key lives only in your local .env.
//
// API (neuron-api 0.5):  POST https://app.neuronwriter.com/neuron-api/0.5/writer/<method>
//   header X-API-KEY · methods: list-projects · list-queries · get-query · evaluate-content
//
// SETUP: nothing to install (Node 18+ has fetch).
//   Required:  NEURONWRITER_API_KEY   (in .env or shell)
//   Optional:  NW_PROJECT_ID          (skip the project picker)
//   Optional Notion logging:
//              NOTION_TOKEN           (your internal integration token — you already
//                                      have one in your Actions secrets)
//              NW_NOTION_DB_ID        (the "NeuronWriter Content Scores" database id —
//                                      Claude created this for you; id is in the run doc)
//
// RUN (from repo root):
//   node scripts/neuronwriter-scores.mjs              # scores -> md + csv (+ Notion if configured)
//   node scripts/neuronwriter-scores.mjs --rescore    # also re-score live pages
//
// OUTPUT: ./audit-results/  (neuronwriter.md, neuronwriter-raw.json, neuronwriter-YYYY-MM-DD.csv)
// SAFETY: read-only on NeuronWriter + your site; never writes to the repo or commits.
// ─────────────────────────────────────────────────────────────

import { writeFile, mkdir, readFile } from "node:fs/promises";

const NW = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const BASE = process.env.AUDIT_BASE || "https://envirocare-web.vercel.app";
const OUT = "./audit-results";

let PROJECT_ID = process.env.NW_PROJECT_ID || "";
let NOTION_TOKEN = process.env.NOTION_TOKEN || "";
let NOTION_DB = process.env.NW_NOTION_DB_ID || "";
// Default parent = your COMMAND CENTER page; override with NW_NOTION_PARENT_PAGE_ID.
let NOTION_PARENT = process.env.NW_NOTION_PARENT_PAGE_ID || "377202ee-7a71-814c-9c11-c5bb122535a6";

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

// ---- tiny .env loader (only fills vars not already in environment) ----
async function loadEnv() {
  try {
    const txt = await readFile("./.env", "utf8");
    const grab = (name) => {
      const m = txt.match(new RegExp(`^\\s*${name}\\s*=\\s*(.+?)\\s*$`, "m"));
      return m ? m[1].replace(/^["']|["']$/g, "") : "";
    };
    if (!process.env.NEURONWRITER_API_KEY) process.env.NEURONWRITER_API_KEY = grab("NEURONWRITER_API_KEY");
    if (!PROJECT_ID) PROJECT_ID = grab("NW_PROJECT_ID");
    if (!NOTION_TOKEN) NOTION_TOKEN = grab("NOTION_TOKEN");
    if (!NOTION_DB) NOTION_DB = grab("NW_NOTION_DB_ID");
    const pp = grab("NW_NOTION_PARENT_PAGE_ID"); if (pp) NOTION_PARENT = pp;
  } catch { /* no .env — rely on shell env */ }
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

function pickScore(d) {
  return (
    d?.content_score ?? d?.score ??
    d?.metrics?.content_score ?? d?.content?.content_score ??
    d?.content?.score ?? d?.evaluation?.content_score ?? null
  );
}

const today = () => new Date().toISOString().slice(0, 10);
const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;


const NOTION_HEADERS = () => ({
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
});

// Returns a usable database id: the configured one, or a freshly-created table
// under your COMMAND CENTER page. Prints the new id so you can pin it in .env.
async function ensureNotionDb() {
  if (NOTION_DB) return NOTION_DB;
  if (!NOTION_TOKEN) return "";
  const body = {
    parent: { type: "page_id", page_id: NOTION_PARENT },
    title: [{ type: "text", text: { content: "NeuronWriter Content Scores" } }],
    properties: {
      Page: { title: {} },
      Score: { number: {} },
      Status: { select: { options: [
        { name: "On target", color: "green" },
        { name: "Below target", color: "red" },
        { name: "Unknown", color: "gray" },
      ] } },
      Source: { rich_text: {} },
      "Query ID": { rich_text: {} },
      Run: { date: {} },
    },
  };
  const res = await fetch("https://api.notion.com/v1/databases", {
    method: "POST", headers: NOTION_HEADERS(), body: JSON.stringify(body),
  });
  const txt = await res.text();
  if (!res.ok) {
    console.error("  Could not create Notion table:", res.status, txt.slice(0, 200));
    console.error("  (Make sure your integration is shared with the COMMAND CENTER page.)");
    return "";
  }
  const id = JSON.parse(txt).id;
  console.log(`\n🆕 Created Notion table "NeuronWriter Content Scores": ${id}`);
  console.log(`   → Pin it so future runs append to the SAME table:  NW_NOTION_DB_ID=${id}\n`);
  NOTION_DB = id;
  return id;
}

// ---- Notion logging (optional, REST, no SDK) ----
async function logToNotion(rows) {
  if (!NOTION_TOKEN) {
    console.log("ℹ️  Notion logging skipped (set NOTION_TOKEN to enable; CSV is always written).");
    return;
  }
  const db = await ensureNotionDb();
  if (!db) { console.log("ℹ️  Notion logging skipped (no table id / no access)."); return; }
  const run = today();
  let ok = 0, fail = 0;
  for (const r of rows) {
    const status = typeof r.score === "number"
      ? (r.score >= 70 ? "On target" : "Below target")
      : "Unknown";
    const body = {
      parent: { database_id: db },
      properties: {
        Page: { title: [{ text: { content: String(r.keyword).slice(0, 1900) } }] },
        Score: typeof r.score === "number" ? { number: r.score } : { number: null },
        Status: { select: { name: status } },
        Source: { rich_text: [{ text: { content: String(r.source).slice(0, 1900) } }] },
        "Query ID": { rich_text: [{ text: { content: String(r.qid).slice(0, 1900) } }] },
        Run: { date: { start: run } },
      },
    };
    try {
      const res = await fetch("https://api.notion.com/v1/pages", {
        method: "POST", headers: NOTION_HEADERS(), body: JSON.stringify(body),
      });
      if (res.ok) ok++;
      else { fail++; if (fail <= 2) console.error("  Notion row failed:", res.status, (await res.text()).slice(0, 160)); }
    } catch (e) { fail++; if (fail <= 2) console.error("  Notion error:", String(e.message)); }
  }
  console.log(`📝 Notion: ${ok} rows logged${fail ? `, ${fail} failed` : ""}.`);
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

  // markdown
  let md = `# NeuronWriter content scores\n\n_${new Date().toISOString()} · project ${PROJECT_ID}_\n\n`;
  md += `Target band: **70–80** (don't chase 100). Sorted lowest-first.\n\n`;
  md += `| Keyword | Score | Source | Query id |\n|---|---|---|---|\n`;
  for (const r of rows) {
    const flag = typeof r.score === "number" ? (r.score >= 70 ? "✅" : "⬇️") : "—";
    md += `| ${r.keyword} | ${flag} ${r.score ?? "—"} | ${r.source} | ${r.qid} |\n`;
  }
  md += `\n_Run with \`--rescore\` to evaluate live pages (evaluate-content, no saved revision)._\n`;

  // csv (timestamped so each run is its own record)
  let csv = "keyword,score,status,source,query_id,run_date\n";
  for (const r of rows) {
    const status = typeof r.score === "number" ? (r.score >= 70 ? "on_target" : "below_target") : "unknown";
    csv += [r.keyword, r.score ?? "", status, r.source, r.qid, today()].map(csvCell).join(",") + "\n";
  }

  await writeFile(`${OUT}/neuronwriter.md`, md);
  await writeFile(`${OUT}/neuronwriter-raw.json`, JSON.stringify(raw, null, 2));
  await writeFile(`${OUT}/neuronwriter-${today()}.csv`, csv);
  console.log(`\n✅ ${OUT}/neuronwriter.md  ·  neuronwriter-${today()}.csv  ·  neuronwriter-raw.json`);

  await logToNotion(rows);
})();
