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
const norm = (p) => p.split('\\').join('/'); // path.join is backslash on Windows — normalize before matching
// Files excluded by design: they DEFINE the rules / source-of-truth and would self-match.
const EXCLUDE = new Set([
  'agents/knowledge/brand.md',
  'data/compliance.ts', // holds the patterns AS DATA
  'data/business.ts',   // source-of-truth definitions (would self-match the generation/owner rules)
  'data/offices.ts',    // holds BANNED_PHONE_NUMBERS as data
]);
// NOTE: app/api/chat/route.ts is intentionally NOT excluded — the chatbot states
// company facts (owner, generation, phones) to users, so content rules must apply to it.
const isExcluded = (rel) => {
  const r = norm(rel);
  return EXCLUDE.has(r) || /(^|\/)compliance\.ts$/.test(r); // any **/compliance.ts
};
const isChatFile = (rel) => norm(rel).startsWith('app/api/chat/');
// Lines containing any of these are skipped (product names + rule-restating comments).
const ALLOWLIST = ['SameDay AI', 'Compliance:', 'approvedInstead', 'no "safe', 'BANNED', 'banned',
  // chatbot system-prompt prohibitions restate banned phrases on purpose ("NEVER say pet-safe")
  'NEVER say', 'NEVER promise'];
// Pure comment lines never ship to users — skip them so rules don't match code comments.
const isCommentLine = (t) => t.startsWith('//') || t.startsWith('*') || t.startsWith('/*');

// ── Derive banned patterns from data/compliance.ts (the one source) ──────────
// Un-escape a TS single-quoted string literal back into a usable regex source.
const unesc = (s) => s.replace(/\\\\/g, '\\');
const field = (obj, key) => {
  const m = obj.match(new RegExp(key + `:\\s*'((?:\\\\.|[^'\\\\])*)'`));
  return m ? m[1] : null;
};
function loadBannedPatterns() {
  const txt = readFileSync(join(ROOT, 'data/compliance.ts'), 'utf8');
  // Isolate the BANNED_PATTERNS array body, then parse each { ... } entry on its own.
  const body = (txt.match(/BANNED_PATTERNS[^=]*=\s*\[([\s\S]*?)\];/) || [, ''])[1];
  const out = [];
  for (const obj of body.match(/\{[^{}]*\}/g) || []) {
    const pattern = field(obj, 'pattern');
    if (!pattern) continue;
    const notIf = field(obj, 'notIf');
    const scope = field(obj, 'scope') || 'content';
    out.push({
      rx: new RegExp(unesc(pattern), 'i'),
      reason: field(obj, 'reason') || '',
      approved: field(obj, 'approvedInstead') || '',
      notRx: notIf ? new RegExp(unesc(notIf), 'i') : null,
      scope,
    });
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
    else if (EXTS.has(extname(name)) && !isExcluded(rel)) acc.push(rel);
  }
  return acc;
}

const patterns = loadBannedPatterns();
const files = SCAN_DIRS.flatMap((d) => walk(d));
const violations = [];

for (const rel of files) {
  const chat = isChatFile(rel);
  const lines = readFileSync(join(ROOT, rel), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const t = line.trim();
    if (isCommentLine(t)) return;                       // comments don't ship to users
    if (ALLOWLIST.some((a) => line.includes(a))) return;
    for (const p of patterns) {
      if (p.scope === 'chat' && !chat) continue;        // AI-tell rules only on chatbot files
      if (!p.rx.test(line)) continue;
      if (p.notRx && p.notRx.test(line)) continue;      // suppressed context (e.g. founder ≠ owner)
      violations.push({ file: norm(rel), line: i + 1, reason: p.reason, approved: p.approved, text: t.slice(0, 100) });
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
