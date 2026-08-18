// Guards the GENERATOR, not the repo.
//
// WHY, 2026-08-18. scripts/proposer.mjs scanned its output against a hand-copied
// 9-rule subset of data/compliance.ts (30 rules). Six proposals carrying the
// retired name, an unqualified $1,000,000, and the possessive-guarantee shape
// were written to approval_queue with compliance_clean = true. The scan ran; it
// could not see rules nobody had transcribed.
//
// scripts/lib/compliance-rules.mjs is now the single source. This test fails if
// that wiring is ever broken again -- either by rule count collapsing back toward
// a subset, or by real leaked copy passing as clean.
import { compileRules, scanText } from './lib/compliance-rules.mjs';
import { readFileSync } from 'node:fs';

let failed = 0;
const ok = (cond, label) => {
  console.log(`  ${cond ? 'ok  ' : 'FAIL'}  ${label}`);
  if (!cond) failed++;
};

const rules = compileRules();

// 1. Rule count must track data/compliance.ts, not a subset. The hand-copy had 9.
const declared = (readFileSync('data/compliance.ts', 'utf8').match(/pattern:/g) || []).length;
ok(rules.length >= declared - 1, `loaded ${rules.length} rules against ${declared} declared in data/compliance.ts`);
ok(rules.length > 20, `rule count ${rules.length} is not a hand-copied subset`);

// 2. Real copy pulled from approval_queue, Aug 18 2026. Must NOT read clean.
const LEAKED = [
  ["Aug 18 Lake Martin", "EnviroCare Pest & Termite Services brings 68 years of family pest control expertise to Lake Martin and Alexander City. Our Sentricon Always Active termite defense uses no drilling and includes EnviroCare's own $1,000,000 repair guarantee."],
  ["Jul 25 Birmingham", "Termite Defense: No Drilling, Full Coverage Guarantee. Our proprietary guarantee covers repairs up to $1,000,000 and is backed by EnviroCare, not the manufacturer."],
  ["unqualified $1M alone", "Termite damage accelerates in late summer heat. Coverage up to $1,000,000 is included."],
];
for (const [label, text] of LEAKED) {
  const r = scanText(text, rules);
  ok(!r.clean, `${label} -- flagged (${r.blocking.length} blocking, ${r.warnings.length} warn)`);
}

// 3. Approved copy must stay clean, or the guard is noise and gets ignored.
const GOOD = [
  ["qualified $1M", "Termite service includes up to $1,000,000 in damage repair coverage, subject to the terms of the agreement, and is priced after a free on-site inspection."],
  ["plain service copy", "Our licensed technicians treat the exterior perimeter on a bi-monthly schedule, and re-service between scheduled visits is included at no extra charge."],
];
for (const [label, text] of GOOD) {
  const r = scanText(text, rules);
  ok(r.clean, `${label} -- clean${r.clean ? '' : ` (got: ${r.notes})`}`);
}

// 4. The proposer must actually import the shared module, not re-copy rules.
const prop = readFileSync('scripts/proposer.mjs', 'utf8');
ok(prop.includes('lib/compliance-rules.mjs'), 'proposer.mjs imports the shared rule source');
ok(!/const BANNED\s*=\s*\[/.test(prop), 'proposer.mjs holds no hand-copied rule array');

console.log(failed ? `\nFAIL: ${failed} check(s) failed.` : '\ngenerated-content compliance: PASS');
process.exit(failed ? 1 : 0);
