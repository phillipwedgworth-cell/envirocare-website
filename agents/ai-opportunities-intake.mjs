// agents/ai-opportunities-intake.mjs
// Turn the NeuronWriter AI-Tracker "Opportunities" export into concrete work for
// the existing optimize/QA pipeline. Reads agents/neuronwriter-content/ai-opportunities.json
// and UPSERTS each 'optimize' opportunity that has a `page` into
// agents/neuronwriter-targets.json (dedup by page+keyword). Opportunities with
// page:null or type:'mention' are reported, not added — they need a human to map
// a route or decide new comparison/FAQ content.
//
// Safe + offline: no network, no secrets. Idempotent — re-running adds nothing new.
//   node agents/ai-opportunities-intake.mjs          # apply
//   node agents/ai-opportunities-intake.mjs --dry     # report only, write nothing
//
// This is step D of agents/reports/ai-visibility-action-plan-2026-07.md, automated.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const OPPS_PATH = join(__dir, "neuronwriter-content", "ai-opportunities.json");
const TARGETS_PATH = join(__dir, "neuronwriter-targets.json");
const DRY = process.argv.includes("--dry");

const norm = (s) => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();

if (!existsSync(OPPS_PATH)) { console.error(`Missing ${OPPS_PATH}`); process.exit(1); }
if (!existsSync(TARGETS_PATH)) { console.error(`Missing ${TARGETS_PATH}`); process.exit(1); }

const opps = JSON.parse(readFileSync(OPPS_PATH, "utf8"));
const targetsDoc = JSON.parse(readFileSync(TARGETS_PATH, "utf8"));
const targets = Array.isArray(targetsDoc.targets) ? targetsDoc.targets : [];

const seen = new Set(targets.map((t) => `${t.page}::${norm(t.keyword)}`));

const added = [];
const unmapped = [];
const mentions = [];
const skipped = [];

for (const o of opps.opportunities || []) {
  const prompt = o.prompt || "";
  if (o.status === "done" || o.status === "rejected") { skipped.push(prompt); continue; }
  if (o.type === "mention") { mentions.push(prompt); continue; }
  if (!o.page) { unmapped.push(prompt); continue; }

  const key = `${o.page}::${norm(prompt)}`;
  if (seen.has(key)) { skipped.push(`${prompt} (already a target)`); continue; }

  seen.add(key);
  const entry = { page: o.page, keyword: norm(prompt), priority: o.priority || 2 };
  targets.push(entry);
  added.push(entry);
}

// Keep the file tidy: money pages first (priority asc), stable within a tier.
targets.sort((a, b) => (a.priority || 9) - (b.priority || 9));
targetsDoc.targets = targets;

console.log(`AI-opportunities intake  (source: ${opps.exported || "?"}, ${opps.total_opportunities ?? "?"} total, ${opps.opportunities?.length ?? 0} loaded)`);
console.log(`  + ${added.length} new target(s):`);
added.forEach((t) => console.log(`      [p${t.priority}] ${t.keyword}  ->  ${t.page}`));
if (unmapped.length) {
  console.log(`  ? ${unmapped.length} opportunity(ies) need a page mapping (edit "page" in ai-opportunities.json):`);
  unmapped.forEach((p) => console.log(`      - ${p}`));
}
if (mentions.length) console.log(`  ~ ${mentions.length} 'mention' opportunity(ies) (decide new comparison/FAQ content, not auto-added).`);
if (skipped.length) console.log(`  . ${skipped.length} skipped (done/rejected/duplicate).`);

if (DRY) { console.log("\n--dry: no files written."); process.exit(0); }
if (added.length === 0) { console.log("\nNothing to write — targets already up to date."); process.exit(0); }

writeFileSync(TARGETS_PATH, JSON.stringify(targetsDoc, null, 2) + "\n");
console.log(`\nWrote ${added.length} new target(s) to ${TARGETS_PATH}. The weekly optimize/QA agents will pick them up within the 75/mo quota.`);
