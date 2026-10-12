// scripts/test-page-refresh.mjs — guards data/page-refresh.ts (npm run test:page-refresh).
//
// Every entry in data/page-refresh.ts is content that an agent (or a reviewed
// session) added to a live page. This guard fails the build if an entry:
//   1. points at a route that does not exist in app/ (content for a page nobody sees),
//   2. points at an image that is not in public/ (a broken <img> on a money page),
//   3. is missing alt text, or has width/height that disagree with the real file,
//   4. adds copy without a NeuronWriter before/after score, or with an "after"
//      below "before" (a refresh must never make a page score worse), or above 85
//      (the band is 70-80; chasing 100 reads as keyword stuffing),
//   5. adds copy without a recorded originality check, or with overlap above the
//      thresholds in agents/lib/originality.mjs,
//   6. contains a blocking compliance phrase — the same rules test:source applies,
//      run here too so a failure names the refresh entry, not just a line number,
//   7. was SELF-CHECKED: the originality figures are recomputed here against the
//      built site (when .next exists) instead of trusting the numbers the agent wrote.
// Also unit-tests agents/lib/originality.mjs so a broken checker cannot pass silently.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { compileRules, scanText } from './lib/compliance-rules.mjs';
import { checkOriginality, containment } from '../agents/lib/originality.mjs';

const ROOT = process.cwd();
let failed = 0;
const fail = (m) => { failed++; console.log(`  FAIL ${m}`); };
const ok = (m) => console.log(`  ok   ${m}`);

// ── 0. the checker itself ────────────────────────────────────────────────────
{
  const a = 'termites live in the soil and need steady moisture to reach the wood of a house';
  if (containment(a, a) !== 1) fail('originality: identical text should be 100% contained');
  else if (containment(a, 'completely different words about mosquitoes and lakes and docks in summer heat') !== 0) fail('originality: unrelated text should be 0%');
  else if (checkOriginality(a, { competitors: [{ url: 'x', text: `${a} ${'filler word '.repeat(40)}` }] }).pass) fail('originality: a copied passage must fail');
  else ok('originality checker: identical=1, unrelated=0, copied passage fails');
}

// ── load entries ─────────────────────────────────────────────────────────────
const src = readFileSync('data/page-refresh.ts', 'utf8');
const m = src.match(/\/\* BEGIN PAGE_REFRESH_JSON \*\/\s*const PAGE_REFRESH_JSON = ([\s\S]*?) as const;\s*\/\* END PAGE_REFRESH_JSON \*\//);
if (!m) { console.log('  FAIL could not find the PAGE_REFRESH_JSON block'); process.exit(1); }
let entries;
try { entries = JSON.parse(m[1]); } catch (e) { console.log(`  FAIL PAGE_REFRESH_JSON is not valid JSON: ${e.message}`); process.exit(1); }
const routes = Object.keys(entries);
ok(`${routes.length} refresh entr${routes.length === 1 ? 'y' : 'ies'} parsed`);

// image dimensions for png/jpg/webp without a dependency
function imageSize(p) {
  const b = readFileSync(p);
  if (b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const c = b.toString('ascii', 12, 16);
    if (c === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (c === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (c === 'VP8L') { const n = b.readUInt32LE(21); return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

// built pages, for the independent originality recheck
const BUILD = '.next/server/app';
const built = [];
if (existsSync(BUILD)) {
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.html')) {
        const route = '/' + p.slice(BUILD.length + 1).replace(/\.html$/, '').replace(/(^|\/)index$/, '');
        built.push({ route: route === '/' ? '/' : route.replace(/\/$/, ''), text: readFileSync(p, 'utf8').replace(/<header[\s\S]*?<\/header>|<footer[\s\S]*?<\/footer>/g, ' ').replace(/<section data-page-refresh[\s\S]*?<\/section>/g, ' ') });
      }
    }
  })(BUILD);
}

const rules = compileRules();
for (const route of routes) {
  const e = entries[route];
  const tag = `${route}:`;
  const failedBefore = failed;
  const pageRoute = route.split('#')[0];
  const page = pageRoute === '/' ? 'app/page.tsx' : join('app', pageRoute, 'page.tsx');
  if (!existsSync(page)) fail(`${tag} no page at ${page}`);
  else if (!/RefreshedContent|<CityPage\b|<ServicePage\b|<DeepCityPage\b|<NeighborhoodPage\b|ComboPage/.test(readFileSync(page, 'utf8'))) fail(`${tag} ${page} does not render <RefreshedContent> — this entry would never appear`);

  const copy = [e.heading, ...(e.paragraphs || []), ...(e.faqs || []).flatMap((f) => [f.q, f.a])].filter(Boolean).join('\n');
  const all = [copy, e.figure?.alt, e.figure?.caption].filter(Boolean).join('\n');

  if (e.figure) {
    const f = join('public', e.figure.src.replace(/^\//, ''));
    if (!existsSync(f)) fail(`${tag} image ${e.figure.src} is not in public/`);
    else {
      const sz = imageSize(f);
      if (sz && (sz.w !== e.figure.width || sz.h !== e.figure.height)) fail(`${tag} ${e.figure.src} is ${sz.w}x${sz.h}, entry says ${e.figure.width}x${e.figure.height}`);
    }
    if (!e.figure.alt || e.figure.alt.trim().length < 15) fail(`${tag} figure needs real alt text`);
  }

  if (copy) {
    const n = e.neuron || {};
    if (typeof n.before !== 'number' || typeof n.after !== 'number') fail(`${tag} copy added without a NeuronWriter before/after score`);
    else if (n.after < n.before) fail(`${tag} NeuronWriter score went DOWN (${n.before} -> ${n.after})`);
    else if (n.after > 85) fail(`${tag} NeuronWriter ${n.after} is above the 85 ceiling (band is 70-80)`);
    if (!e.originality) fail(`${tag} copy added without an originality check`);
    else if (e.originality.maxCompetitorOverlap > 0.03 || e.originality.maxSiteOverlap > 0.15) fail(`${tag} recorded overlap is over threshold`);
    if (built.length) {
      const r = checkOriginality(copy, { sitePages: built.filter((p) => p.route !== pageRoute) });
      if (r.maxSiteOverlap > 0.15) fail(`${tag} recheck: ${Math.round(r.maxSiteOverlap * 100)}% of its phrasing already appears on ${r.worstSitePage}`);
    }
  }

  const s = scanText(all, rules);
  if (!s.clean) fail(`${tag} compliance: ${s.blocking.map((b) => `${b.reason} — "${b.match}"`).join('; ')}`);

  if (failed === failedBefore) ok(`${route} ${[e.figure ? 'image' : '', copy ? `${copy.split(/\s+/).length} words, NW ${e.neuron.before}->${e.neuron.after}` : ''].filter(Boolean).join(' + ')}`);
}
if (!built.length) console.log('  note: no build output — independent site-overlap recheck skipped (CI builds first)');

console.log(failed ? `\npage-refresh: ${failed} problem(s)` : '\npage-refresh: PASS');
process.exit(failed ? 1 : 0);
