#!/usr/bin/env node
/**
 * agents/source-of-truth-auditor.mjs — AGENT 1: deploy-blocking compliance gate
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   agents/source-of-truth-auditor.mjs
 * Commit: feat(agents): source-of-truth auditor (blocks deploys on violations)
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * Single source of truth: rules are DERIVED from data/compliance.ts at runtime,
 * so there is no second copy to drift. Scans app/ components/ data/ lib/ for
 * banned language (pet-safe, same-day, the dead 649-5278 number, "third
 * generation", Bundle & Save, etc.). Exits 1 on any HARD violation so CI can
 * block the deploy. SOFT rules are printed as warnings.
 *
 * Run:  node agents/source-of-truth-auditor.mjs
 * CI:   add as a required check BEFORE the Vercel deploy step.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'data', 'lib'];
const EXTS = new Set(['.ts', '.tsx', '.md', '.mdx']);
// Intentional internal facts — excluded by design.
const EXCLUDE = new Set([
  'app/api/chat/route.ts',
  'agents/knowledge/brand.md',
  'data/compliance.ts', // holds the patterns AS DATA
  'data/offices.ts',    // holds BANNED_PHONE_NUMBERS as data
]);
// Lines containing any of these are skipped (product names + rule-restating comments).
const ALLOWLIST = ['SameDay AI', 'Compliance:', 'approvedInstead', 'no "safe', 'BANNED', 'banned'];

// ── Derive banned patterns from data/compliance.ts (the one source) ──────────
function loadBannedPatterns() {
  const txt = readFileSync(join(ROOT, 'data/compliance.ts'), 'utf8');
  const out = [];
  const re = /pattern:\s*'((?:\\.|[^'\\])*)'\s*,\s*reason:\s*'([^']*)'\s*,\s*approvedInstead:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(txt))) {
    const src = m[1].replace(/\\\\/g, '\\'); // un-escape the TS string back to a regex source
    out.push({ rx: new RegExp(src, 'i'), reason: m[2], approved: m[3] });
  }
  return out;
}

function walk(dir, acc = []) {
  let entries;
  try { entries = readdirSync(join(ROOT, dir)); } catch { return acc; }
  for (const name of entries) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const rel = join(dir, name);
    const full = join(ROOT, rel);
    if (statSync(full).isDirectory()) walk(rel, acc);
    else if (EXTS.has(extname(name)) && !EXCLUDE.has(rel)) acc.push(rel);
  }
  return acc;
}

const patterns = loadBannedPatterns();
const files = SCAN_DIRS.flatMap((d) => walk(d));
const violations = [];

for (const rel of files) {
  const lines = readFileSync(join(ROOT, rel), 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (ALLOWLIST.some((a) => line.includes(a))) return;
    for (const p of patterns) {
      if (p.rx.test(line)) {
        violations.push({ file: rel, line: i + 1, reason: p.reason, approved: p.approved, text: line.trim().slice(0, 100) });
      }
    }
  });
}

console.log(`\n[source-of-truth auditor] scanned ${files.length} files, ${patterns.length} rules\n`);

if (violations.length === 0) {
  console.log('✅ No banned language found. Safe to deploy.\n');
  process.exit(0);
}

console.log(`❌ ${violations.length} violation(s) — BLOCKING deploy:\n`);
for (const v of violations) {
  console.log(`  ${v.file}:${v.line}  [${v.reason}]`);
  console.log(`     found:    ${v.text}`);
  console.log(`     fix with: ${v.approved}\n`);
}
process.exit(1);
