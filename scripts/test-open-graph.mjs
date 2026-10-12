/**
 * scripts/test-open-graph.mjs — Open Graph completeness, checked two ways.
 *
 * ROOT CAUSE THIS GUARDS
 * Next's metadata merge is shallow per key. A page that exports `openGraph`
 * REPLACES the layout's openGraph object, so a page that wrote only
 * `{ url, images }` lost og:type / og:site_name / og:locale, and a page that wrote
 * `{ title, description, url, type }` lost og:image. 106 built pages were
 * incomplete (Ahrefs Site Audit, 2026-09-30: 105 URLs). The fix is
 * lib/seo/open-graph.ts `withOpenGraph()`; this test keeps it fixed.
 *
 * 1. UNIT — withOpenGraph() fills gaps, never overrides, never invents og:url.
 *    (Imports the .ts directly; needs Node >= 22.18 or 24, see AGENTS.md.)
 * 2. BUILT HTML — same approach as test-breadcrumbs.mjs. Source cannot prove what
 *    Next actually renders, so this reads .next/server/app/**.html: every indexable
 *    page must carry og:title, og:description, og:type, og:url and og:image, and og:url must equal the canonical.
 *    Skips (exit 0) when there is no build output, like the breadcrumb guard.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, sep } from 'node:path';
import { withOpenGraph, OG_DEFAULT_IMAGE } from '../lib/seo/open-graph.ts';

const failures = [];
const fail = (m) => failures.push(m);

// ── 1. unit ────────────────────────────────────────────────────────────────
{
  // The exact broken shape from app/calera, app/helena, app/alabaster.
  const r = withOpenGraph({
    title: 'Calera Pest Control',
    description: 'desc',
    alternates: { canonical: '/calera' },
    openGraph: { url: 'https://www.envirocarellc.com/calera', images: ['/og/og-calera.png'] },
  }).openGraph;
  if (r.type !== 'website') fail('unit: type not defaulted');
  if (r.siteName !== 'EnviroCare') fail('unit: siteName not defaulted');
  if (r.locale !== 'en_US') fail('unit: locale not defaulted');
  if (r.title !== 'Calera Pest Control') fail('unit: title not taken from page title');
  if (r.description !== 'desc') fail('unit: description not taken from page description');
  if (r.url !== 'https://www.envirocarellc.com/calera') fail('unit: explicit url overridden');
  if (r.images[0] !== '/og/og-calera.png') fail('unit: explicit images overridden');

  // The neighborhood / blog shape: everything but an image.
  const n = withOpenGraph({
    title: 't', description: 'd', alternates: { canonical: '/x' },
    openGraph: { title: 'ot', description: 'od', url: '/x', type: 'article' },
  }).openGraph;
  if (n.type !== 'article') fail('unit: explicit type overridden');
  if (n.title !== 'ot' || n.description !== 'od') fail('unit: explicit og title/description overridden');
  if (n.images?.[0]?.url !== OG_DEFAULT_IMAGE.url) fail('unit: default image not added');

  // url comes from the page canonical only.
  const c = withOpenGraph({ title: 't', description: 'd', alternates: { canonical: '/y' } }).openGraph;
  if (c.url !== '/y') fail('unit: url not taken from canonical');
  const none = withOpenGraph({ title: 't', description: 'd' }).openGraph;
  if ('url' in none && none.url) fail('unit: invented an og:url with no canonical (would point pages at the wrong URL)');
}

// ── 2. built HTML ──────────────────────────────────────────────────────────
const ROOT = join('.next', 'server', 'app');
const EXEMPT = new Set(['_not-found', 'pay']); // not-found is noindex; /pay is a redirect
// The five tags a crawler needs to build a link card. og:site_name / og:locale are
// nicer-to-have and are NOT enforced here: ~74 pages that already pass the core
// five still lack them (same shallow-merge cause, not flagged by Ahrefs). They are
// reported below as a non-failing notice so the gap stays visible.
const REQUIRED = ['og:title', 'og:description', 'og:type', 'og:url', 'og:image'];
const OPTIONAL = ['og:site_name', 'og:locale'];
let noSiteMeta = 0;
// Representative pages: the three named in the Ahrefs report, a neighborhood page
// (missing og:image before), a blog post and a pest-library page (dynamic routes),
// and the homepage (already complete; must stay complete).
const MUST_BE_CHECKED = ['calera', 'helena', 'alabaster', 'indian-springs', 'index',
  'blog/chiggers-alabama-yard', 'pest-library/ants'];

function walk(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (n.endsWith('.html')) acc.push(p);
  }
  return acc;
}
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

let checked = 0;
if (!existsSync(ROOT)) {
  console.log('open-graph: no build output at .next — unit checks only. Run `next build` for the HTML checks.');
} else {
  const seen = new Set();
  for (const p of walk(ROOT)) {
    const rel = p.slice(ROOT.length + 1).split(sep).join('/').replace(/\.html$/, '');
    if (EXEMPT.has(rel)) continue;
    const html = readFileSync(p, 'utf8');
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
    checked++; seen.add(rel);
    const og = {};
    for (const m of html.matchAll(/<meta[^>]+>/g)) {
      const key = attr(m[0], 'property');
      if (key?.startsWith('og:')) (og[key] ??= []).push(attr(m[0], 'content'));
    }
    if (OPTIONAL.some((k) => !og[k]?.[0])) noSiteMeta++;
    const missing = REQUIRED.filter((k) => !og[k]?.[0]);
    if (missing.length) fail(`/${rel}: missing ${missing.join(', ')}`);
    for (const k of REQUIRED) if (og[k]?.length > 1) fail(`/${rel}: duplicate ${k}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (og['og:url']?.[0] && canonical && og['og:url'][0].replace(/\/$/, '') !== canonical.replace(/\/$/, ''))
      fail(`/${rel}: og:url ${og['og:url'][0]} != canonical ${canonical}`);
    if (og['og:image']?.[0] && !/^https?:\/\//.test(og['og:image'][0]))
      fail(`/${rel}: og:image is not absolute: ${og['og:image'][0]}`);
  }
  for (const r of MUST_BE_CHECKED) if (!seen.has(r)) fail(`representative page "${r}" was not found in the build output`);
}

if (failures.length) {
  console.error(`open-graph: FAIL (${failures.length})`);
  for (const f of failures.slice(0, 60)) console.error('  - ' + f);
  if (failures.length > 60) console.error(`  … and ${failures.length - 60} more`);
  process.exit(1);
}
console.log(`open-graph: PASS — unit checks ok, ${checked} built pages have the core Open Graph tags.`);
if (noSiteMeta) console.log(`open-graph: notice — ${noSiteMeta} pages lack og:site_name/og:locale (not enforced).`);
