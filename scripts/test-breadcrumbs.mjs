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
        const items = n.itemListElement ?? [];
        if (!items.length) {
          bad.push(`${rel}: BreadcrumbList with no items`);
          continue;
        }
        items.forEach((it, i) => {
          if (!it.name) {
            bad.push(`${rel}: crumb ${i + 1} has no "name" (position ${it.position ?? '?'})`);
          } else if (String(it.name).includes('undefined')) {
            bad.push(`${rel}: crumb ${i + 1} name contains "undefined"`);
          }
        });
      }
    }
  }
}

console.log(`breadcrumbs: ${checked} pages checked, ${withBc} carry a BreadcrumbList`);

if (bad.length) {
  console.log(`\n${bad.length} PROBLEM(S):`);
  for (const b of bad) console.log('  ' + b);
  process.exit(1);
}

console.log('breadcrumbs: PASS — every BreadcrumbList has a named crumb at each position.');
