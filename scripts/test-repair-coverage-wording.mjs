/**
 * scripts/test-repair-coverage-wording.mjs — the $1,000,000 repair coverage is
 * never described as included with every termite agreement.
 *
 * WHY THIS EXISTS (Phillip, 2026-11-27)
 * About 8% of EnviroCare termite agreements carry repair coverage; the rest are
 * retreatment-only. ~40 places on the site said the plan "includes", "comes
 * with" or is "backed by" up to $1,000,000 in repair coverage, which reads as
 * every agreement. They now say repair coverage is available on qualifying
 * homes under an EnviroCare repair agreement. This guard fails if the figure
 * sits next to "includes / comes with / backed by / covers repairs / every plan"
 * without a qualifier ("qualifying", "available", "repair agreement",
 * "retreatment-only", "can include", "may receive") in the same window.
 *
 * Run: npm run test:repair-coverage   (also part of `npm test`)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['app', 'components', 'data', 'lib'];
const SKIP = [/data[\\/]compliance\.ts$/, /scripts[\\/]/];
const FIG = /1,000,000|\$1M\b|1 million/g;
const BAD = /\b(includes?|comes? with|every (plan|agreement|home|customer)|all (plans|agreements)|each (plan|agreement)|with every|backed by|you get|you receive|covers repairs)\b/i;
const OK = /qualifying|available|retreatment-only|can include|may receive|repair agreement/i;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== 'node_modules') yield* walk(p); }
    else if (/\.(ts|tsx)$/.test(name)) yield p;
  }
}

const problems = [];
let scanned = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (SKIP.some((r) => r.test(file))) continue;
    scanned++;
    const s = readFileSync(file, 'utf8');
    for (const m of s.matchAll(FIG)) {
      const ctx = s.slice(Math.max(0, m.index - 140), m.index + m[0].length + 90);
      if (BAD.test(ctx) && !OK.test(ctx)) problems.push(`${file}: …${ctx.replace(/\s+/g, ' ').slice(0, 200)}…`);
    }
  }
}

if (scanned < 50) {
  console.log(`repair-coverage: FAIL — only ${scanned} files scanned; the walk is broken`);
  process.exit(1);
}
if (problems.length) {
  console.log(`repair-coverage: FAIL (${problems.length}) — $1M coverage described as included with every agreement`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log(`repair-coverage: PASS — ${scanned} files; every $1M mention is qualified (most agreements are retreatment-only)`);
