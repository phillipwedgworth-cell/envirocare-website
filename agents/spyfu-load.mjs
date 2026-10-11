/**
 * spyfu-load — loads a SpyFu CSV export into spyfu_keywords (agents/sql/0009).
 *
 *   node agents/spyfu-load.mjs <export.csv> [--date YYYY-MM-DD] [--dry-run]
 *
 * Why (2026-10-11): SpyFu was worked by hand (GPT pulls, web-app exports read in
 * chat) and no agent could use it. The value for the fleet is the ranking URL —
 * which page Google picked — that Search Console data here does not carry. With
 * it, keyword-opportunity flags wrong-page targets (Birmingham → /services/
 * pest-control, Trussville → /east-birmingham, Oct 5 review) on every run.
 *
 * Two export shapes are accepted, detected from the header:
 *  - Organic Keywords (has a URL column)        → export_kind "organic_keywords"
 *  - My SpyFu tracked keywords (Term, CurrentRank, no URL) → "tracked_keywords"
 * Header names are matched loosely; an unrecognised file stops with the header
 * it saw rather than loading guesses. Deterministic, no LLM, read-only on SpyFu.
 * Upserts on (keyword, export_kind, export_date), so re-loading a file is safe.
 */
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { pathToFileURL } from "node:url";

const AGENT_NAME = "spyfu-load";

// Minimal RFC-4180 parser: quoted fields, doubled quotes, CRLF, BOM.
export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  const s = text.replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '"') { if (s[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v !== "")) rows.push(row);
  return rows;
}

const norm = (h) => String(h).toLowerCase().replace(/[^a-z0-9]/g, "");
const ALIASES = {
  keyword: ["keyword", "term", "keywords"],
  rank: ["rank", "currentrank", "organicrank", "position"],
  rank_change: ["rankchange", "change"],
  ranking_url: ["url", "rankingurl", "rankedurl", "toprankedurl", "page"],
  search_volume: ["searchvolume", "monthlysearches", "volume", "localvolume"],
  keyword_difficulty: ["keyworddifficulty", "rankingdifficulty", "kd", "difficulty"],
  cpc: ["cpc", "costperclick"],
  est_clicks: ["estimatedclicks", "estmonthlyseoclicks", "seoclicks", "clicks"],
};

export function mapHeader(header) {
  const idx = {};
  const n = header.map(norm);
  for (const [field, names] of Object.entries(ALIASES)) {
    const i = n.findIndex((h) => names.includes(h));
    if (i >= 0) idx[field] = i;
  }
  return idx;
}

const int = (v) => { if (v === undefined || v === null) return null; const t = String(v).replace(/[,%$\s]/g, ""); if (t === "" || /nan/i.test(t)) return null; const n = Number(t); return Number.isFinite(n) ? Math.round(n) : null; };
const dec = (v) => { if (v === undefined || v === null) return null; const t = String(v).replace(/[,$\s]/g, ""); if (t === "" || /nan/i.test(t)) return null; const n = Number(t); return Number.isFinite(n) ? n : null; };

// SpyFu names exports like MySpyFu_envirocarellc.com_9_18_2026.csv
export function dateFromName(name) {
  const m = String(name).match(/(\d{1,2})_(\d{1,2})_(\d{4})/);
  if (!m) return null;
  return `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

export function toRows(text, { exportDate, sourceFile }) {
  const [header, ...body] = parseCsv(text);
  if (!header) throw new Error("empty file");
  const idx = mapHeader(header);
  if (idx.keyword === undefined || idx.rank === undefined) {
    throw new Error(`unrecognised SpyFu export — need a keyword and a rank column; header was: ${header.join(" | ")}`);
  }
  const kind = idx.ranking_url !== undefined ? "organic_keywords" : "tracked_keywords";
  const seen = new Map();
  for (const r of body) {
    const keyword = String(r[idx.keyword] ?? "").toLowerCase().replace(/\s+/g, " ").trim();
    if (!keyword) continue;
    const row = {
      keyword,
      rank: int(r[idx.rank]),
      rank_change: idx.rank_change !== undefined ? int(r[idx.rank_change]) : null,
      ranking_url: idx.ranking_url !== undefined ? (String(r[idx.ranking_url] ?? "").trim() || null) : null,
      search_volume: idx.search_volume !== undefined ? int(r[idx.search_volume]) : null,
      keyword_difficulty: idx.keyword_difficulty !== undefined ? int(r[idx.keyword_difficulty]) : null,
      cpc: idx.cpc !== undefined ? dec(r[idx.cpc]) : null,
      est_clicks: idx.est_clicks !== undefined ? int(r[idx.est_clicks]) : null,
      export_kind: kind,
      export_date: exportDate,
      source_file: sourceFile,
    };
    // A keyword can appear twice (two URLs). Keep the better rank.
    const prev = seen.get(keyword);
    if (!prev || (row.rank !== null && (prev.rank === null || row.rank < prev.rank))) seen.set(keyword, row);
  }
  return { kind, rows: [...seen.values()] };
}

export async function run(argv = process.argv.slice(2)) {
  const file = argv.find((a) => !a.startsWith("--"));
  const dryRun = argv.includes("--dry-run");
  const dIdx = argv.indexOf("--date");
  if (!file) throw new Error("usage: node agents/spyfu-load.mjs <export.csv> [--date YYYY-MM-DD] [--dry-run]");
  const exportDate = (dIdx >= 0 ? argv[dIdx + 1] : null) ?? dateFromName(basename(file));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(exportDate ?? "")) throw new Error("export date unknown — pass --date YYYY-MM-DD (the SpyFu export date)");

  const { kind, rows } = toRows(await readFile(file, "utf8"), { exportDate, sourceFile: basename(file) });
  const summary = { file: basename(file), kind, export_date: exportDate, rows: rows.length, ranked: rows.filter((r) => r.rank !== null).length, with_url: rows.filter((r) => r.ranking_url).length, dry_run: dryRun };
  if (dryRun) { console.log(JSON.stringify(summary, null, 2)); return summary; }

  const { supabase, logAgentRun } = await import("./lib/supabase.mjs");
  if (!supabase) throw new Error("Supabase env not set (SUPABASE_URL + service key)");
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from("spyfu_keywords").upsert(rows.slice(i, i + 500), { onConflict: "keyword,export_kind,export_date" });
    if (error) { await logAgentRun(AGENT_NAME, "failed", { ...summary, error: error.message }); throw new Error(`spyfu_keywords upsert: ${error.message}`); }
  }
  await logAgentRun(AGENT_NAME, "ok", summary);
  console.log(`[${AGENT_NAME}] ${summary.rows} rows (${kind}, ${exportDate}) loaded`);
  return summary;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL ${e.message}`); process.exit(1); });
