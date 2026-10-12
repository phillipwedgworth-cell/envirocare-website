// THE HOLE THIS CLOSES
// --------------------
// data/compliance.ts carries the $1M-qualifier rule at `granularity: 'file'`,
// and the long comment above it explains why that is right: a ribbon reading
// "$1M Coverage", a 60-char title and an og:description physically cannot carry
// a nine-word clause, so a LINE rule produced 253 useless hits. The obligation
// is that the qualifier appears somewhere on the PAGE.
//
// That reasoning is sound for a page component, where one file is one page.
// It is wrong for `data/blog-posts.ts`, where ONE FILE HOLDS ~60 INDEPENDENT
// PAGES. The rule asks "does 'subject to the terms of the agreement' appear
// anywhere in this file?" — and it does, many times, in other posts. So a
// single compliant post immunises all the others, and the rule can never fire
// on that file no matter what any individual post says.
//
// Verified 2026-09-09: `npm run test:source` returned PASS while
// /blog/sentricon-vs-liquid-termite-treatment carried "$1,000,000 repair
// warranty. Corteva backs Sentricon..." with the qualifier absent from that
// post entirely. Not a missing rule — a correct rule evaluated at the wrong
// unit.
//
// FIX: split the file into post records and run the SAME rules from the SAME
// source (scripts/lib/compliance-rules.mjs) against each post on its own. No
// rules are transcribed here. `scanText`'s `requires` check is already
// scoped to whatever body it is handed, so passing one post makes every
// file-granularity rule post-granularity for free.
//
// Run: node scripts/test-blog-post-compliance.mjs

import { readFileSync } from "node:fs";
import { compileRules, scanText } from "./lib/compliance-rules.mjs";

const FILE = "data/blog-posts.ts";

// Records are `  {` at two-space indent with `    slug: '...'` on the next line.
// If that shape ever changes, the coverage floor below fails loudly rather than
// reporting zero posts and exiting green — which is the failure mode this whole
// file exists to prevent.
function splitPosts(src) {
  const lines = src.split("\n");
  const starts = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "  {" && /^\s{4}slug:\s*['"]/.test(lines[i + 1] || "")) {
      const slug = (lines[i + 1].match(/slug:\s*['"]([^'"]+)['"]/) || [])[1] || `post-${i}`;
      starts.push({ i, slug });
    }
  }
  return starts.map((s, n) => ({
    slug: s.slug,
    line: s.i + 1,
    body: lines.slice(s.i, n + 1 < starts.length ? starts[n + 1].i : lines.length).join("\n"),
  }));
}

// Coverage floor. data/blog-posts.ts held 60 posts on 2026-09-10. If this scan
// ever sees far fewer, the record shape drifted and most posts are going
// unscanned — exactly the way test:citynap quietly fell from 5 records to 2.
const MIN_POSTS = 40;

function main() {
  let src;
  try {
    src = readFileSync(FILE, "utf8");
  } catch (e) {
    console.error(`blog-post-compliance: FAIL — cannot read ${FILE}: ${e.message}`);
    return 1;
  }

  const posts = splitPosts(src);
  if (posts.length < MIN_POSTS) {
    console.error(`blog-post-compliance: FAIL — only ${posts.length} post record(s) found in ${FILE} (floor ${MIN_POSTS}).`);
    console.error("  The record shape probably changed. Fix splitPosts() — do not lower the floor.");
    return 1;
  }

  const rules = compileRules();
  const blocked = [];
  const warned = [];

  for (const p of posts) {
    const scan = scanText(p.body, rules);
    if (scan.clean && !(scan.warnings || []).length) continue;
    for (const h of scan.blocking || []) blocked.push({ ...p, ...h });
    for (const h of scan.warnings || []) warned.push({ ...p, ...h });
  }

  for (const w of warned) {
    console.warn(`  warn  ${w.slug} (${FILE}:${w.line}): ${w.reason} — "${w.match}"`);
  }

  if (blocked.length) {
    console.error(`\nblog-post-compliance: FAIL — ${blocked.length} blocking hit(s) across ${posts.length} posts:\n`);
    for (const b of blocked) {
      console.error(`  ${b.slug}  (${FILE}:${b.line})`);
      console.error(`      match:  "${b.match}"`);
      console.error(`      reason: ${b.reason}\n`);
    }
    console.error("Each post is its own page. The qualifier has to be in THAT post,");
    console.error("not merely somewhere else in the file.\n");
    return 1;
  }

  console.log(`  ok   ${posts.length} blog posts scanned individually against ${rules.length} rules — no blocking hits`);
  if (warned.length) console.log(`  ${warned.length} non-blocking warning(s) above`);
  return 0;
}

process.exit(main());
