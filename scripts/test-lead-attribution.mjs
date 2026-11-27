/**
 * scripts/test-lead-attribution.mjs — every web lead carries the page it came from.
 *
 * WHY THIS EXISTS (2026-11-27)
 * The Nov 27 audit found 51 web leads (Aug 28 - Nov 25 2026) with no landing
 * page anywhere in the leads table, so Search Console pages could not be tied
 * to inquiries. lib/leads/attribution.ts now records the session's landing
 * page and the three quote forms send it as `attribution`. This guard fails if
 * a form stops sending it, if the layout stops recording it, or if the helper
 * starts copying whole query strings (gclid, rwg_token and similar values must
 * only ever be stored as true/false flags).
 *
 * Run: npm run test:lead-attribution   (also part of `npm test`)
 */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const problems = [];
const read = (f) => readFileSync(f, 'utf8');

for (const f of ['components/RequestQuoteForm.tsx', 'components/pages/ContactUs.tsx', 'components/ScheduleRequest.tsx']) {
  const s = read(f);
  if (!/import\s*\{\s*leadAttribution\s*\}\s*from\s*['"]@\/lib\/leads\/attribution['"]/.test(s)) problems.push(`${f}: does not import leadAttribution`);
  if (!/attribution:\s*leadAttribution\(\)/.test(s)) problems.push(`${f}: the /api/quote body does not include attribution: leadAttribution()`);
}
const layout = read('app/layout.tsx');
if (!/<LeadAttribution\s*\/>/.test(layout)) problems.push('app/layout.tsx: <LeadAttribution /> is not mounted, so no landing page is recorded');

// Run the real helper against a fake browser.
const src = read('lib/leads/attribution.ts');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
function run(href, referrer) {
  const url = new URL(href);
  const store = new Map();
  const window = { sessionStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)) } };
  const ctx = vm.createContext({
    exports: {}, window, URL, URLSearchParams, Date, JSON, String,
    location: { pathname: url.pathname, search: url.search, hostname: url.hostname },
    document: { referrer },
  });
  vm.runInContext(js, ctx);
  ctx.exports.captureFirstTouch();
  ctx.location.pathname = '/quote';
  return { att: ctx.exports.leadAttribution(), stored: [...store.values()].join('') };
}
const a = run('https://www.envirocarellc.com/huntsville?utm_source=google&utm_medium=organic&utm_campaign=gbp-huntsville&rwg_token=SECRET123&gclid=CLICK456&email=x@y.z', 'https://www.google.com/search?q=pest+control');
if (a.att.landing_page !== '/huntsville') problems.push(`landing_page should be /huntsville, got ${a.att.landing_page}`);
if (a.att.page !== '/quote') problems.push(`page should be the submit page /quote, got ${a.att.page}`);
if (a.att.referrer_host !== 'www.google.com') problems.push(`referrer_host should be www.google.com, got ${a.att.referrer_host}`);
if (a.att.utm_source !== 'google' || a.att.utm_campaign !== 'gbp-huntsville') problems.push('utm values were not kept');
if (a.att.gbp_booking !== true || a.att.gclid !== true) problems.push('rwg_token / gclid should become true flags');
for (const leaked of ['SECRET123', 'CLICK456', 'x@y.z', 'q=pest']) {
  if (JSON.stringify(a.att).includes(leaked) || a.stored.includes(leaked)) problems.push(`raw query value leaked into attribution: ${leaked}`);
}
const b = run('https://www.envirocarellc.com/', 'https://www.envirocarellc.com/pricing');
if (b.att.referrer_host !== '') problems.push('an internal referrer must not be recorded as an external source');

if (problems.length) {
  console.log(`lead-attribution: FAIL (${problems.length})`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log('lead-attribution: PASS — 3 forms send attribution, layout records the landing page, query values stay flags');
