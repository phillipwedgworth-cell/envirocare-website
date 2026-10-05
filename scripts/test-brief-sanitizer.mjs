// Guard for agents/lib/brief-sanitize.mjs (Sunday audit 2026-10-04, R5).
// The morning brief must never ship a SoLV change computed across two
// different grids/campaigns, e.g. "Alabaster surge (+25 pts since Aug 27)".
import { stripCrossSeriesClaims } from "../agents/lib/brief-sanitize.mjs";

const mustStrip = [
  "Alabaster surge (+25 pts since Aug 27) — 38.7%",
  "Huntsville up 3.2% since Sep 5",
  "Lake Martin jumped since 2026-08-27 to 44%",
  "Birmingham −4 points since 9/18",
];
const mustKeep = [
  "Alabaster SoLV 38.7% across 17 keywords (run 2026-10-02)",
  "78 clicks (−10) · 11,868 impr",
  "Still open since Sep 23 (12 days)",
  "Huntsville 0.4% — no change",
];
let fail = 0;
for (const l of mustStrip) if (stripCrossSeriesClaims(l).removed !== 1) { console.error(`NOT STRIPPED: ${l}`); fail++; }
for (const l of mustKeep) if (stripCrossSeriesClaims(l).removed !== 0) { console.error(`WRONGLY STRIPPED: ${l}`); fail++; }
const mixed = stripCrossSeriesClaims(mustKeep.concat(mustStrip).join("\n"));
if (mixed.removed !== mustStrip.length || !mixed.text.includes("line(s) removed")) { console.error("mixed brief not handled"); fail++; }
if (fail) { console.error(`\ntest:brief FAILED (${fail})`); process.exit(1); }
console.log(`test:brief OK — ${mustStrip.length} cross-series lines stripped, ${mustKeep.length} legitimate lines kept`);
