/**
 * scripts/scan-source-compliance.mjs — the guard that reads the actual PAGES.
 *
 * WHY THIS EXISTS (2026-08-11)
 * ---------------------------------------------------------------------------
 * `npm test` ran four guards and all four returned green while 158 unqualified
 * $1M claims, three affirmative guarantee claims and a banned contract-free claim
 * were live on the site. Not one of them was a false negative — none of the four
 * ever opened a page file:
 *
 *   test:compliance  → reads data/compliance.ts and asserts 44 hardcoded strings
 *                      against the regexes. It tests the RULES, not the SITE.
 *   test:zombies     → scans 20 .md files.
 *   test:citynap     → reads 5 records out of data/cities.ts.
 *   test:imagery     → asset filenames.
 *
 * So the suite could only ever fail if someone broke a regex. The site could say
 * anything. That is what "all four guards pass" actually meant.
 *
 * This script closes that gap: it compiles the SAME BANNED_PATTERNS out of
 * data/compliance.ts and runs them over the real copy in app/, components/,
 * data/ and the public text files. `severity: 'block'` hits exit non-zero;
 * `severity: 'warn'` hits are printed for a human and do not fail the build.
 *
 * Keep test:compliance too — it guards the regexes themselves. The two are
 * complementary, and neither substitutes for the other.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, relative, sep } from 'node:path';
import { compileRules } from './lib/compliance-rules.mjs';

const ROOT = process.cwd();

// ── Where the site's copy actually lives ──────────────────────────────────────
const SCAN_DIRS = ['app', 'components', 'data', 'lib', 'shared'];
const SCAN_FILES = ['public/llms-full.txt', 'public/llms.txt'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.txt', '.mdx']);

// data/compliance.ts documents every banned phrase in prose and would flag itself
// on nearly every rule. The scanners and the command-center BANNED regex quote the
// phrases on purpose too.
const SKIP_FILES = new Set(
  [
    'data/compliance.ts',
    'app/command-center/page.tsx',
  ].map((p) => p.split('/').join(sep))
);

const SKIP_DIRS = new Set(['node_modules', '.next', '.vercel', '.git']);

// ── Allowlist ────────────────────────────────────────────────────────────────
// Every entry is a NEGATIVE use: copy that names a banned phrase in order to say
// the site does NOT claim it, an enforcement list, or a third-party proper noun.
// Matched on file + substring, never on line number (line numbers rot).
//
// Adding to this list is a decision, not a convenience. If you cannot write a
// one-line reason that survives being read aloud to a regulator, fix the copy
// instead. Everything here was reviewed 2026-08-11.
const ALLOW = [
  { file: 'app/api/chat/route.ts', contains: 'pet-safe',
    why: 'Chatbot system prompt: the list of phrases the model is told NEVER to output.' },
  { file: 'app/api/chat/route.ts', contains: 'same-day',
    why: 'Chatbot system prompt: same banned-phrase list.' },
  { file: 'public/llms-full.txt', contains: 'pet-safe',
    why: '"What EnviroCare Does NOT Claim" section — the phrases are listed as absent by design.' },
  { file: 'public/llms-full.txt', contains: 'Same-day',
    why: 'Same "Does NOT Claim" section.' },
  { file: 'public/llms-full.txt', contains: 'not a Corteva/manufacturer guarantee',
    why: 'Explicitly disclaims manufacturer backing — the opposite of the banned attribution.' },
  // app/llms.txt/route.ts — the "Accuracy notes for AI systems" block exists to tell
  // models what NOT to say about us, so it necessarily quotes the banned phrasing.
  // Same negative-use pattern as the llms-full.txt entries above. Listed individually
  // with reasons rather than skipping the file, so the other ~100 lines of llms.txt
  // stay guarded. Added 2026-08-14.
  { file: 'app/llms.txt/route.ts', contains: 'guaranteed, pet-safe',
    why: 'The never-claim list: phrases models are instructed not to apply to us.' },
  { file: 'app/llms.txt/route.ts', contains: 'EnviroCare was founded in 1958',
    why: 'Quoted as an INCORRECT statement, on a line that says both forms are wrong.' },
  { file: 'app/llms.txt/route.ts', contains: 'EnviroCare has operated since 1958',
    why: 'Same line — quoted as incorrect. This is the entity/1958 claim being forbidden.' },
  { file: 'app/llms.txt/route.ts', contains: 'Older citations use the retired name',
    why: 'Labelled as the RETIRED name so models reconcile old citations to the current one. Same decision as alternateName in lib/seo/organization-schema.ts.' },
  { file: 'app/llms.txt/route.ts', contains: 'Alabama does not use the NPMA-33',
    why: 'States the form is NOT used here — the correction, not the error.' },

  { file: 'app/privacy/page.tsx', contains: 'SameDay AI',
    why: 'Proper noun: the name of the phone answering vendor, disclosed in the privacy policy.' },
  { file: 'app/best-pest-control-birmingham/page.tsx', contains: 'same-day emergency service at 9 p.m.',
    why: 'The "when NOT to choose us" section — states a competitor beats us on this. Not a claim.' },
  { file: 'data/offices.ts', contains: 'BANNED_PHONE_NUMBERS',
    why: 'The enforcement list of numbers that must never appear. Deleting it removes the guard.' },
  { file: 'data/offices.ts', contains: '6495278',
    why: 'Members of BANNED_PHONE_NUMBERS above.' },
];

function allowed(relPosix, line) {
  return ALLOW.some((a) => relPosix === a.file && line.includes(a.contains));
}

// ── Metadata vs body copy ────────────────────────────────────────────────────
// A `description:` is a SERP snippet with a ~155-character budget, and a `title:`
// has ~60. Neither can carry a nine-word disclosure clause without destroying the
// snippet, and neither is where a disclosure legally belongs — the LANDING PAGE is.
// Requiring the qualifier inside a meta description would force deleting the figure
// from search results entirely, which helps nobody.
//
// So file-scoped obligations are judged on RENDERED BODY COPY only. Metadata may
// state the figure; the page it points at must carry the qualifier. This exemption
// applies ONLY to file-scoped rules — every line-scoped rule (safety claims,
// contract-free claims, the retired name) still applies to metadata in full.
// NARROWED 2026-08-17. The first version matched any key literally named
// `description:` — and a schema.org `Service.description` is BODY CONTENT consumed
// by machines, not a 155-char SERP snippet. lib/schema.tsx:50 shipped
// "Up to $1 million in termite damage coverage" with no qualifier into the
// hasOfferCatalog JSON-LD of 30 city pages, and this guard exempted it silently.
//
// The rendered page carried the clause in visible copy, so a human reader was
// covered and the rule's stated intent held. The MACHINE surface was not — and
// /llms.txt and /llms-full.txt exist precisely because this business courts the
// answer engines that read JSON-LD independently of the body.
//
// Fifth instance of the shape this repo keeps hitting: the regex matched a KEY NAME
// where it needed to match a POSITION. Now requires the key to sit at metadata
// indentation (2-4 spaces, i.e. inside `export const metadata = {...}` or its
// openGraph/twitter sub-objects) rather than the deeper nesting of a schema object
// literal. Not airtight, but it distinguishes the two real cases in this repo, and
// a deep `description:` now gets scanned instead of skipped.
const METADATA_FIELD = /^ {2,4}(?:title|description|metaTitle|metaDescription|excerpt|ogTitle|ogDescription|summary|blurb)\s*:/;

// ── Hardening the above, 2026-08-17 ──────────────────────────────────────────
// The comment above is right that indentation "distinguishes the two real cases in
// this repo", and right that it is not airtight. Here is the specific way it is not,
// because it is worth naming rather than rediscovering:
//
//   app/blog/[slug]/page.tsx:30-31   `title:` / `description:` at SIX spaces
//   app/pest-library/[pest]/page.tsx:25-26   same
//
// Those are genuine Next.js metadata, nested one level deeper because they sit inside
// `generateMetadata`'s `return {`. Under the 2-4 rule they are NO LONGER exempt. They
// pass today only because their values are variables (`post.metaDescription`), so no
// literal figure appears on the line. The day a post's metaDescription literal carries
// the $1M figure — or any future file-scoped rule matches there — that is a FALSE
// POSITIVE failing the build on correct metadata. The coupling is to whitespace, so a
// formatter change flips it in either direction, silently.
//
// So: keep the indentation test as a fast pre-filter, and additionally require the line
// to actually sit inside a metadata declaration. Brace-matched from the declaration, so
// generateMetadata's extra nesting is included and a schema object literal never is.
// Ambiguity fails CLOSED — no exemption means the rule applies, which is the safe side.
function metadataLineSet(text) {
  const lines = text.split('\n');
  const inMeta = new Set();
  const DECL = /export\s+(?:const\s+metadata\b|(?:async\s+)?function\s+generateMetadata\b)/;
  for (let i = 0; i < lines.length; i++) {
    if (!DECL.test(lines[i])) continue;
    let depth = 0;
    let opened = false;
    for (let j = i; j < lines.length; j++) {
      for (const ch of lines[j]) {
        if (ch === '{') { depth++; opened = true; }
        else if (ch === '}') depth--;
      }
      inMeta.add(j);
      if (opened && depth <= 0) break;
    }
  }
  return inMeta;
}

// Indentation OR real-metadata-position: the key must look like metadata AND live in a
// metadata block. `public/*.txt` files have no declarations, so nothing there is exempt,
// which is correct — those are body copy end to end.
function isExemptMetadata(line, idx, metaLines) {
  return METADATA_FIELD.test(line) && metaLines.has(idx);
}


// ── Rule extraction ───────────────────────────────────────────────────────────
// Parsed line-by-line rather than imported, because this is a .mjs run by plain
// node and data/compliance.ts is TypeScript. This is the same approach
// test-compliance-guarantee.mjs uses, and it is why data/compliance.ts carries
// "keep pattern and notIf on ONE line" warnings — honour them.
// compileRules MOVED to scripts/lib/compliance-rules.mjs, 2026-08-18, and imported
// at the top of this file. It used to live here while scripts/proposer.mjs kept a
// hand-copied 9-rule subset of the same rules -- which is how six banned claims
// reached approval_queue flagged compliance_clean = true. One copy now, so the
// generator and the repo guard cannot disagree about what is banned.

// ── Comment stripping ─────────────────────────────────────────────────────────
// This repo documents its banned phrases heavily in comments ("NEVER write third
// generation", the whole rationale block above each rule). Scanning raw source
// would bury every real hit under its own documentation. Comments are replaced
// with blank lines rather than removed, so reported line numbers stay accurate.
function stripComments(text, file) {
  if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return text;

  let out = '';
  let i = 0;
  let inLine = false;
  let inBlock = false;
  let quote = null; // ' " ` or null

  while (i < text.length) {
    const c = text[i];
    const next = text[i + 1];

    if (inLine) {
      if (c === '\n') { inLine = false; out += c; } else { out += ' '; }
      i++; continue;
    }
    if (inBlock) {
      if (c === '*' && next === '/') { inBlock = false; out += '  '; i += 2; continue; }
      out += c === '\n' ? '\n' : ' ';
      i++; continue;
    }
    if (quote) {
      // Skip escapes so a \" inside a string does not close it.
      if (c === '\\') { out += text.slice(i, i + 2); i += 2; continue; }
      if (c === quote) quote = null;
      out += c; i++; continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; out += c; i++; continue; }
    if (c === '/' && next === '/') { inLine = true; out += '  '; i += 2; continue; }
    if (c === '/' && next === '*') { inBlock = true; out += '  '; i += 2; continue; }

    out += c; i++;
  }
  return out;
}

// ── File walk ─────────────────────────────────────────────────────────────────
function walk(dir, acc = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return acc; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) { walk(full, acc); continue; }
    const dot = name.lastIndexOf('.');
    if (dot < 0 || !SCAN_EXT.has(name.slice(dot))) continue;
    acc.push(full);
  }
  return acc;
}

// ── Run ───────────────────────────────────────────────────────────────────────
const rules = compileRules();
console.log(`${rules.length} rules compiled from data/compliance.ts`);

// Files git ignores cannot ship, so they are not live copy. Without this the
// scanner reads local scratch — data/_newpost_tmp.used.txt, gitignored at
// .gitignore:25 — as though it were a page, and `npm test` FAILS locally on a
// file CI never sees. A guard that fails on something unshippable teaches people
// to ignore BLOCKING output, which is worse than the gap it was closing.
// Found 2026-09-02 when the new demonstrative-guarantee rule flagged that very
// file. If git is unavailable, scan everything — a false positive beats a miss.
// Scoped to SCAN_DIRS on purpose. Unscoped, this command also enumerates every
// file under .next/ — over a megabyte of output, which exceeds execFileSync's
// default 1 MB maxBuffer and throws ENOBUFS. The catch then returned an empty
// set and the filter silently did nothing, which is exactly how this looked
// when it was still broken. maxBuffer is raised as a second belt.
function gitIgnored() {
  try {
    const out = execFileSync(
      'git',
      ['ls-files', '--others', '--ignored', '--exclude-standard', '--', ...SCAN_DIRS],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 32 * 1024 * 1024 },
    );
    return new Set(out.split('\n').filter(Boolean).map((p) => p.split('/').join(sep)));
  } catch {
    return new Set();
  }
}
const IGNORED = gitIgnored();

const files = [
  ...SCAN_DIRS.flatMap((d) => walk(join(ROOT, d))),
  ...SCAN_FILES.map((f) => join(ROOT, f.split('/').join(sep))),
].filter((f) => !IGNORED.has(relative(ROOT, f)));

const blocking = [];
const warnings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  if (SKIP_FILES.has(rel)) continue;

  let raw;
  try { raw = readFileSync(file, 'utf8'); } catch { continue; }

  const relPosix = rel.split(sep).join('/');
  const isChatFile = relPosix.startsWith('app/api/chat');
  const text = stripComments(raw, rel);
  const lines = text.split('\n');
  const metaLines = metadataLineSet(text);

  for (const rule of rules) {
    // 'chat'-scoped rules apply only to the chatbot prompt/output, and the
    // content rules are what the public pages are held to.
    if (rule.scope === 'chat' && !isChatFile) continue;

    // FILE-scoped: the obligation is satisfied once per file, so a single presence
    // of `requires` anywhere clears every occurrence in it. Report the FIRST
    // occurrence as the anchor — that is where a human starts reading.
    if (rule.granularity === 'file') {
      if (rule.requires && rule.requires.test(text)) continue;
      const idx = lines.findIndex((l, i) => {
        if (isExemptMetadata(l, i, metaLines)) return false; // see METADATA_FIELD note
        rule.re.lastIndex = 0;
        return rule.re.test(l) && !(rule.notIf && rule.notIf.test(l));
      });
      if (idx < 0) continue;
      if (allowed(relPosix, lines[idx])) continue;
      rule.re.lastIndex = 0;
      const hit = {
        file: relPosix,
        line: idx + 1,
        match: (lines[idx].match(rule.re) || [''])[0].trim().slice(0, 80),
        reason: rule.reason,
      };
      (rule.severity === 'warn' ? warnings : blocking).push(hit);
      continue;
    }

    lines.forEach((line, idx) => {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line)) !== null) {
        if (rule.notIf && rule.notIf.test(line)) break;
        if (allowed(relPosix, line)) break;
        const hit = {
          file: relPosix,
          line: idx + 1,
          match: m[0].trim().slice(0, 80),
          reason: rule.reason,
        };
        (rule.severity === 'warn' ? warnings : blocking).push(hit);
        if (m[0] === '') rule.re.lastIndex++; // zero-width guard
        break; // one hit per rule per line is enough to report
      }
    });
  }
}

const fmt = (h) => `  ${h.file}:${h.line}\n      match:  ${JSON.stringify(h.match)}\n      reason: ${h.reason}`;

console.log(`\nScanned ${files.length} files across ${SCAN_DIRS.join(', ')} + public text.\n`);

if (warnings.length) {
  console.log(`── ${warnings.length} WARN (review, does not fail the build) ──`);
  for (const h of warnings) console.log(fmt(h));
  console.log('');
}

if (blocking.length) {
  console.log(`── ${blocking.length} BLOCKING ──`);
  for (const h of blocking) console.log(fmt(h));
  console.log(`\nFAIL: ${blocking.length} blocking compliance hit(s) in live copy.`);
  process.exit(1);
}

console.log('PASS: no blocking compliance hits in app/, components/, data/, lib/, shared/ or public text.');
