/**
 * scripts/test-breadcrumbs.mjs — validate BreadcrumbList in the BUILT HTML.
 *
 * WHY THIS READS .next AND NOT SOURCE: the bug that motivated it was invisible in
 * source. ServicePage passed `service.title` to the breadcrumb builder. That field
 * does not exist — it is `service.name` — so the value was `undefined`, and
 * JSON.stringify DROPS undefined keys rather than erroring. The markup shipped as:
 *
 *     { "@type": "ListItem", "position": 3, "item": ".../services/mosquito" }
 *
 * Valid JSON, valid-looking script tag, no build error, no type error (this build
 * skips type validation), and a breadcrumb Google cannot render because the crumb
 * has no name. Six service pages were like that.
 *
 * A source scan cannot catch it — `service.title` is a perfectly plausible
 * expression. Only the rendered output shows the key is gone. Same lesson as the
 * /images redirect: a green build tells you the file exists, not that the output
 * is correct.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, sep } from 'node:path';

const ROOT = join('.next', 'server', 'app');
if (!existsSync(ROOT)) {
  console.log('breadcrumbs: no build output at .next — run `next build` first. Skipping.');
  process.exit(0);
}

// Pages that legitimately carry no breadcrumb: the root has nothing above it, and
// these are not content pages.
const EXEMPT = new Set(['index', '_not-found', 'pay']);

function walk(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (n.endsWith('.html')) acc.push(p);
  }
  return acc;
}

// Two checks added 2026-08-17, each after the previous version of this guard let a
// real defect through to production:
//
//  1. ITEM URLs. ComboPage passed `/${c.slug}` but ComboContent has no `slug` field,
//     so all 15 combo pages shipped item: ".../undefined". The guard passed them
//     because it only ever looked at `name`. A crumb with a broken URL is a broken
//     breadcrumb even when it reads correctly.
//
//  2. DUPLICATES. Eleven pages already had a hand-written BreadcrumbList. A sweep
//     that adds one "to every page missing it" will happily give those a second,
//     and two conflicting trails is worse than none — Google has to pick.
const bad = [];
let checked = 0;
let withBc = 0;

for (const p of walk(ROOT)) {
  const rel = p.slice(ROOT.length + 1).split(sep).join('/').replace(/\.html$/, '');
  if (EXEMPT.has(rel)) continue;
  checked++;

  const html = readFileSync(p, 'utf8');
  if (!html.includes('BreadcrumbList')) continue;
  withBc++;
  let trailsOnPage = 0;

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const nodes = Array.isArray(data) ? data : [data];
    for (const node of nodes) {
      if (!node || typeof node !== 'object') continue;
      for (const n of [node, ...(node['@graph'] ?? [])]) {
        if (!n || n['@type'] !== 'BreadcrumbList') continue;
        trailsOnPage++;
        const items = n.itemListElement ?? [];
        if (!items.length) {
          bad.push(`${rel}: BreadcrumbList with no items`);
          continue;
        }
        items.forEach((it, i) => {
          const where = `${rel}: crumb ${i + 1}/${items.length}`;
          if (!it.name) {
            bad.push(`${where} has no "name" (position ${it.position ?? '?'})`);
          } else if (String(it.name).includes('undefined')) {
            bad.push(`${where} name contains "undefined"`);
          }
          // `item` is optional on the trailing crumb, but when present it must be a
          // real absolute URL. ".../undefined" is the shape that shipped.
          if (it.item !== undefined) {
            const url = String(it.item);
            if (!/^https:\/\/www\.envirocarellc\.com(\/|$)/.test(url)) {
              bad.push(`${where} item is not an absolute site URL: ${url}`);
            } else if (/\/undefined(\/|$)|\/null(\/|$)/.test(url)) {
              bad.push(`${where} item URL contains undefined/null: ${url}`);
            }
          }
        });
      }
    }
  }

  if (trailsOnPage > 1) {
    bad.push(`${rel}: ${trailsOnPage} BreadcrumbList nodes on one page — Google has to pick`);
  }
}

console.log(`breadcrumbs: ${checked} pages checked, ${withBc} carry a BreadcrumbList`);

// A GUARD THAT PASSES ON AN EMPTY SET IS NOT A GUARD.
// This printed "0 pages checked ... PASS" on 2026-08-17 because a font-fetch error
// killed the build and left .next/server/app with no HTML in it. The directory
// existed, so the existsSync check above was satisfied, and every loop below simply
// had nothing to iterate. Green on zero evidence.
//
// That is the same shape as the four guards this repo already had: they passed
// because they never read the thing they claimed to check. Refusing to report
// success without a plausible corpus is the cheapest possible defence.
const MIN_PAGES = 100; // the site builds ~157; anything near zero means a broken build
if (checked < MIN_PAGES) {
  console.log(
    `\nFAIL: only ${checked} page(s) found under ${ROOT} — expected at least ${MIN_PAGES}.\n` +
    `This is almost certainly an incomplete or failed build, not a clean site.\n` +
    `Re-run \`next build\` and check it completed before trusting this result.`
  );
  process.exit(1);
}
if (withBc === 0) {
  console.log(`\nFAIL: ${checked} pages scanned and NOT ONE carries a BreadcrumbList.`);
  process.exit(1);
}

if (bad.length) {
  console.log(`\n${bad.length} PROBLEM(S):`);
  for (const b of bad) console.log('  ' + b);
  process.exit(1);
}

console.log('breadcrumbs: PASS — every BreadcrumbList has a named crumb at each position.');
