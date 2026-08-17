/**
 * scripts/test-sitemap-lastmod.mjs
 * -----------------------------------------------------------------------
 * Guard: STATIC_LASTMOD in app/sitemap.ts must be >= the author-date of
 * the newest git commit that touches app/, components/ or data/.
 *
 * Why: STATIC_LASTMOD is a hand-maintained constant (not a build stamp).
 * If someone ships code that changes pages but forgets to bump the date,
 * Google sees a stale lastmod on ~150 URLs and eventually ignores the
 * signal entirely. This test catches the drift before it reaches prod.
 *
 * Exit 0 = OK, exit 1 = stale (prints what to bump to).
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

// ── 1. Parse STATIC_LASTMOD from sitemap.ts ─────────────────────────────
const src = readFileSync("app/sitemap.ts", "utf8");
const m = src.match(/STATIC_LASTMOD\s*=\s*new\s+Date\(\s*['"]([^'"]+)['"]\s*\)/);
if (!m) {
  console.error("Could not find STATIC_LASTMOD in app/sitemap.ts");
  process.exit(1);
}
const lastmod = new Date(m[1]);
console.log(`STATIC_LASTMOD = ${m[1]}`);

// ── 2. Find newest commit touching app, components, data ──────────────────
// %aI = strict ISO 8601 author date.  We use author date (not committer
// date) because rebases/cherry-picks bump committer date but author date
// reflects when the change was actually written — the semantically
// meaningful date for "when did a page last change."
const raw = execSync(
  'git log -1 --format="%aI" -- app/ components/ data/',
  { encoding: "utf8" }
).trim();

if (!raw) {
  // No commits found (empty repo edge case) — nothing to guard against.
  console.log("No commits touch app/, components/ or data/ — nothing to check.");
  process.exit(0);
}

// Truncate to midnight UTC for a date-level comparison.  STATIC_LASTMOD
// is always set at midnight UTC (e.g. 2026-08-11T00:00:00.000Z), so we
// compare dates, not datetimes.
//
// Use the author's LOCAL calendar day — the leading YYYY-MM-DD of %aI —
// rather than converting through `new Date()`, which shifts the day for
// commits authored in the evening at a negative UTC offset.  A commit made
// at 8pm US Central on the 14th is the 15th in UTC, so a dev who correctly
// set STATIC_LASTMOD to the date they were committing on would get a false
// STALE.  This repo is committed from Alabama (UTC-5/-6), so that is the
// common case, not the edge case.
const commitDayStr = raw.slice(0, 10); // YYYY-MM-DD in the author's local tz
const [cy, cmo, cd] = commitDayStr.split("-").map(Number);
const commitDay = new Date(Date.UTC(cy, cmo - 1, cd));
const lastmodDay = new Date(
  Date.UTC(lastmod.getUTCFullYear(), lastmod.getUTCMonth(), lastmod.getUTCDate())
);

console.log(`Newest commit  = ${raw}  (day: ${commitDay.toISOString().slice(0, 10)})`);
console.log(`STATIC_LASTMOD = ${lastmodDay.toISOString().slice(0, 10)}`);

if (commitDay <= lastmodDay) {
  console.log("\nSitemap lastmod is current.");
  process.exit(0);
}

// ── 3. Stale — tell the dev exactly what to set ──────────────────────────
const fix = commitDay.toISOString().replace(/\.000Z$/, ".000Z");
console.error(
  `\nSTALE: pages changed on ${commitDay.toISOString().slice(0, 10)} ` +
  `but STATIC_LASTMOD is ${lastmodDay.toISOString().slice(0, 10)}.`
);
console.error(
  `Fix: in app/sitemap.ts, set:\n` +
  `  const STATIC_LASTMOD = new Date('${fix}');`
);
process.exit(1);
