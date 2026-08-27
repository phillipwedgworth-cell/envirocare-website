/**
 * scripts/test-tracking-integrity.mjs — guard the analytics that measures the money.
 *
 * WHY THIS EXISTS
 * ---------------------------------------------------------------------------
 * On 2026-08-17 a performance refactor rewrote Google's canonical gtag bootstrap
 *
 *     function gtag(){ dataLayer.push(arguments); }
 *
 * into what looks like the same thing in modern JS:
 *
 *     function gtag(...args){ dataLayer.push(args); }
 *
 * gtag.js identifies a COMMAND (js / config / event / consent) by the pushed
 * value being an `arguments` object. A real Array is treated as an ordinary data
 * push and discarded. So the container still loaded, reported state:2, threw no
 * console error, and dataLayer filled up normally — while ZERO hits were sent.
 * GA4 went from 260 sessions (Aug 13-19) to 1, and it took ten days and a
 * headless-Chrome investigation to notice, because nothing anywhere failed.
 *
 * A code comment now marks that line. A comment is not a guard. This is.
 *
 * WHY IT READS .next AND NOT ONLY SOURCE: the shipped bundle is what runs in a
 * visitor's browser. Minifiers cannot rename `arguments` (it is a reserved
 * binding), so `push(arguments)` survives minification verbatim and can be
 * asserted against the real artifact — the same lesson test-breadcrumbs.mjs
 * learned: a green build tells you the file exists, not that the output is right.
 *
 * Run: npm run test:tracking   (also part of `npm test`)
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const problems = [];
const notes = [];

// ── 1. SOURCE: the gtag bootstrap must push `arguments` ──────────────────────
// Strip comments before the code checks. DeferredTracking.tsx carries a warning
// comment that QUOTES the broken form (`push(args)`) as an example of what not to
// write — scanning raw text flags the warning itself. Only whole-line `//`
// comments are removed, never a trailing one, so a `https://` inside a string
// cannot swallow the rest of its line and hide real code from the scan.
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '')
   .split('\n').filter(l => !/^\s*\/\//.test(l)).join('\n');

const TRACKING_SRC = join('components', 'DeferredTracking.tsx');
if (!existsSync(TRACKING_SRC)) {
  problems.push(`${TRACKING_SRC} is missing — the site has no tracking loader.`);
} else {
  const src = readFileSync(TRACKING_SRC, 'utf8');
  const code = stripComments(src);

  if (!/dataLayer\.push\(arguments\)/.test(code)) {
    problems.push(
      `${TRACKING_SRC}: the gtag bootstrap does not push \`arguments\`.\n` +
      `      GA4 will load, log nothing, and report no error. This is the exact\n` +
      `      2026-08-17 outage. Restore Google's canonical snippet verbatim:\n` +
      `          const gtag = function () { window.dataLayer.push(arguments); };`
    );
  }

  // The exact rewrite that caused the outage.
  if (/dataLayer\.push\(\s*args\s*\)/.test(code)) {
    problems.push(
      `${TRACKING_SRC}: pushes an Array (\`push(args)\`) instead of \`arguments\`.\n` +
      `      gtag.js silently ignores Array pushes. This kills GA4 with no error.`
    );
  }

  // Assert the RIGHT shape rather than trying to enumerate every wrong one:
  // gtag must be bound to a `function`. An arrow has no `arguments` binding at
  // all, so it fails the same silent way — and a positive assertion also catches
  // rewrites nobody has thought of yet. Note the type annotation
  // `const gtag: (...args: unknown[]) => void = function () {}` is legitimate —
  // what matters is that the VALUE is a function expression.
  const boundToFunction =
    /function\s+gtag\s*\(/.test(code) ||           // function gtag() {}
    /\bgtag\b[^\n]*=\s*function\s*\(/.test(code);  // const gtag = function () {}
  if (!boundToFunction) {
    problems.push(
      `${TRACKING_SRC}: gtag is not bound to a \`function\` expression.\n` +
      `      Only a real function has an \`arguments\` object; an arrow function\n` +
      `      does not, so gtag.js would receive nothing it recognises.`
    );
  }

  // The measurement ID must still be there and well-formed.
  if (!/G-[A-Z0-9]{6,}/.test(src)) {
    problems.push(`${TRACKING_SRC}: no G-XXXXXXXXXX measurement ID found.`);
  }
}

// ── 2. SOURCE: every lead form must fire a conversion ────────────────────────
// A form that posts a lead but fires no `generate_lead` is invisible in GA4 and
// in Google Ads — the campaign optimises against nothing. ScheduleRequest.tsx,
// the site's primary lead form (it renders on /quote AND every city page), was
// in exactly that state until 2026-08-27.
// ContactUs posts to Formspree rather than an internal route — still a lead.
const LEAD_ENDPOINTS = ['/api/quote', '/api/chat', 'formspree.io'];

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules' || n.startsWith('.')) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx|jsx)$/.test(n)) acc.push(p);
  }
  return acc;
}

const leadForms = [];
for (const f of [...walk('components'), ...walk('app')]) {
  const src = readFileSync(f, 'utf8');
  // Only client components that actually SUBMIT to a lead endpoint. An admin
  // page that reads leads back (app/approve) is not a lead form.
  const posts = LEAD_ENDPOINTS.some(e => src.includes(e));
  if (!posts || !/method:\s*["']POST["']/.test(src)) continue;
  leadForms.push(f);
  // Strip comments here too. ScheduleRequest.tsx documents its conversion event
  // in a comment that names `generate_lead`, so a raw substring check passed even
  // after the actual call was removed — the guard silently stopped guarding.
  if (!stripComments(src).includes('generate_lead')) {
    problems.push(
      `${f}: submits a lead but never fires \`generate_lead\`.\n` +
      `      The submission will not appear as a conversion in GA4 or Google Ads.`
    );
  }
}

// Refuse to report success on an empty corpus — the failure mode where a guard
// passes because it never actually looked at anything. This repo has been bitten
// by that before (see test-breadcrumbs.mjs).
const MIN_LEAD_FORMS = 3;   // schedule, quote, chat, contact — 4 as of 2026-08-27
if (leadForms.length < MIN_LEAD_FORMS) {
  problems.push(
    `only ${leadForms.length} lead form(s) found, expected at least ${MIN_LEAD_FORMS}.\n` +
    `      Either forms were removed, or this guard's detection broke and it is\n` +
    `      passing without checking anything. Do not trust a PASS here.`
  );
} else {
  notes.push(`${leadForms.length} lead form(s) checked: ${leadForms.map(f => f.split(/[\\/]/).pop()).join(', ')}`);
}

// ── 3. BUILD OUTPUT: what actually ships to the browser ──────────────────────
const CHUNKS = join('.next', 'static', 'chunks');
if (!existsSync(CHUNKS)) {
  notes.push('no build output at .next — source checks only. Run `next build` for the full guard.');
} else {
  const js = walk2(CHUNKS);
  const all = js.map(f => readFileSync(f, 'utf8'));

  if (all.length < 5) {
    problems.push(`only ${all.length} chunk(s) under ${CHUNKS} — incomplete build, result not trustworthy.`);
  } else {
    // `arguments` is a reserved binding; no minifier renames it. If this string
    // is absent from the shipped bundle, GA4 is dead in production right now.
    if (!all.some(c => c.includes('push(arguments)'))) {
      problems.push(
        `the built bundle contains no \`push(arguments)\` — the gtag bootstrap did\n` +
        `      not survive the build. GA4 is dead in production. This is the check\n` +
        `      that would have caught the 2026-08-17 outage on the day it shipped.`
      );
    }
    if (!all.some(c => c.includes('generate_lead'))) {
      problems.push('the built bundle contains no `generate_lead` — no lead form reports a conversion.');
    }
    if (!all.some(c => c.includes('phone_click'))) {
      problems.push('the built bundle contains no `phone_click` — for a pest control company the phone click IS the conversion.');
    }
    notes.push(`build output verified across ${all.length} chunk(s).`);
  }
}

function walk2(dir, acc = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk2(p, acc);
    else if (n.endsWith('.js')) acc.push(p);
  }
  return acc;
}

// ── Report ───────────────────────────────────────────────────────────────────
for (const n of notes) console.log(`tracking: ${n}`);

if (problems.length) {
  console.log(`\n${problems.length} TRACKING PROBLEM(S):`);
  for (const p of problems) console.log('  - ' + p);
  console.log(
    `\nThese are silent failures: nothing errors, nothing 500s, the site looks fine.\n` +
    `The only symptom is a number quietly going to zero. Fix before merging.`
  );
  process.exit(1);
}

console.log('tracking: PASS — gtag pushes `arguments`, every lead form reports a conversion, and both survive the build.');
