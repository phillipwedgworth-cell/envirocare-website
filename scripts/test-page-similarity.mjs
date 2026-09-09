// Fails if two LOCATION pages are near-duplicates of each other.
//
// The rule "do not publish duplicate or near-duplicate location pages" has been
// stated repeatedly and never had a machine check behind it, which is the same
// failure mode data/compliance.ts documents for prices: a rule that lives in
// prose is not a rule. An external audit in Sep 2026 asserted that Hartselle,
// Harvest and Hampton Cove were the "clearest examples" of duplication. Measured,
// they are 33-35% similar — below the site average. The audit was wrong, but
// nobody could show that until someone measured it. This measures it.
//
// METHOD. Jaccard similarity on 8-word shingles of the rendered text. Shingles,
// not bag-of-words: two pages about pest control in different towns share
// vocabulary by necessity, and only shared PHRASING indicates real duplication.
//
// SCOPE. Location pages only — detected by the CityPage hero markup rather than
// a hard-coded slug list, so a new city page is covered the day it ships and a
// renamed one does not silently drop out. Utility pages (/pay, /quote,
// /find-office) are deliberately excluded: they are thin, so shared header and
// footer chrome dominates their text and they score 50-62% against each other
// without sharing a single sentence of content.
//
// BASELINE at time of writing (2026-09-09, 30 location pages, 435 pairs):
//   worst pair /stillwaters vs /willow-point 52.4%, then /stillwaters vs
//   /the-ridge 52.3% — the Lake Martin neighbourhood cluster. Nothing above 53%.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILD = ".next/server/app";
const K = 8;
const BLOCK = 0.70;   // near-duplicate: fail
const WARN = 0.60;    // report, do not fail

if (!existsSync(BUILD)) {
  console.log(`similarity: no build output at ${BUILD} — run \`next build\` first.`);
  process.exit(1);
}

// A location page is one rendered by components/pages/CityPage.tsx. Its hero
// carries these class names; matching markup beats maintaining a slug list.
const IS_LOCATION = /class="city-hero|city-art-box|city-hero-inner/;

function plainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(text) {
  const w = text.split(" ").filter(Boolean);
  const out = new Set();
  for (let i = 0; i + K <= w.length; i++) out.add(w.slice(i, i + K).join(" "));
  return out;
}

const docs = new Map();
for (const f of readdirSync(BUILD)) {
  if (!f.endsWith(".html")) continue;
  const html = readFileSync(join(BUILD, f), "utf8");
  if (!IS_LOCATION.test(html)) continue;
  const t = plainText(html);
  if (t.split(" ").length < 200) continue;   // stub, nothing to compare
  docs.set(f.replace(/\.html$/, ""), shingles(t));
}

if (docs.size < 5) {
  console.log(`\nFAIL: only ${docs.size} location page(s) found under ${BUILD} — expected many.`);
  console.log("Either the build is incomplete or CityPage's markup changed and this");
  console.log("scan no longer recognises a location page. Fix the scan, not the floor.");
  process.exit(1);
}

const keys = [...docs.keys()];
const pairs = [];
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const a = docs.get(keys[i]);
    const b = docs.get(keys[j]);
    let inter = 0;
    for (const s of a) if (b.has(s)) inter++;
    const union = a.size + b.size - inter;
    pairs.push([keys[i], keys[j], union ? inter / union : 0]);
  }
}
pairs.sort((x, y) => y[2] - x[2]);

const blocking = pairs.filter((p) => p[2] >= BLOCK);
const warning = pairs.filter((p) => p[2] >= WARN && p[2] < BLOCK);

for (const [a, b, s] of warning) {
  console.log(`  warn  ${(s * 100).toFixed(1)}%  /${a} vs /${b}`);
}

if (blocking.length) {
  console.log(`\nFAIL: ${blocking.length} near-duplicate location page pair(s) at or above ${BLOCK * 100}%:`);
  for (const [a, b, s] of blocking) {
    console.log(`   ${(s * 100).toFixed(1)}%  /${a}  vs  /${b}`);
  }
  console.log("\nTwo pages this similar compete with each other. Differentiate the");
  console.log("thinner one on local specifics, or consolidate and redirect.");
  process.exit(1);
}

const worst = pairs[0];
console.log(`  ok   ${docs.size} location pages, ${pairs.length} pairs — worst ` +
            `${(worst[2] * 100).toFixed(1)}% (/${worst[0]} vs /${worst[1]}), under the ` +
            `${BLOCK * 100}% duplicate threshold`);
