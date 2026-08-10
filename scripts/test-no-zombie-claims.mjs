// Fails if a RETRACTED claim reappears in repo documentation.
//
// This implements the Aug-10 rule from 00-MANIFEST-READ-FIRST:
//
//   "When a claim is corrected, the correction is not done until every doc
//    carrying the old claim is edited or deleted IN THE SAME SESSION."
//
// The Aug-9 rule ("every claim carries the tool call that produced it") has been
// written into this project at least three times and has not stopped a single
// recurrence -- because it governs how claims are CREATED, not how they are
// DESTROYED. A false claim, once written, outlives its own correction.
//
// The evidence for needing this is the retraction record itself:
//   - the Huntsville LSA budget was retracted Jul 25, retracted AGAIN Aug 1,
//     and cited five more times after that, twice as the #1 recommended action
//   - "OneUp has no MCP connector" was disproven 3.5 hours BEFORE being written
//     into a dead-ends list
//   - the $67/$127 price tiers were rejected Aug 6 and re-asserted twice more,
//     once nearly reaching five published city pages
//
// A rule that is not a test is a suggestion. This is the test.
//
// Scope: documentation only. Source files legitimately contain some of these
// strings inside compliance PATTERNS -- those are the strings being matched.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ZOMBIES = [
  { re: /\$\s?7,?600|\$\s?1,?764\s*\/?\s*(week|wk)/i,
    claim: "Huntsville LSA budget ($7,600/mo or $1,764/wk)",
    truth: "RETRACTED Jul 25 and again Aug 1 — Phillip states this spend does not exist. Verify against the live Google Ads account before quoting." },
  { re: /\b654\s+credits\b/i,
    claim: "654 Local Falcon credits",
    truth: "Wrong by ~20x. Actual balance 13,449 (viewLocalFalconAccountInformation, Aug 9 and Aug 10)." },
  { re: /vercel\.app[^.]{0,60}\b302\b|\b302\b[^.]{0,60}vercel\.app|change (it )?to a? ?301/i,
    claim: "the vercel.app alias is a 302 / should be changed to a 301",
    truth: "It is a 308 — already permanent, and Google treats it as a 301. Verified live with curl." },
  { re: /OneUp[^.]{0,40}no (MCP )?connector|no (MCP )?connector[^.]{0,30}OneUp/i,
    claim: "OneUp has no MCP connector",
    truth: "SESSION-DEPENDENT. A working connector ran a full audit and edited six posts on Aug 9. It is absent in some sessions. Check your own tool list; neither absolute is correct." },
  { re: /\$67\b|\$127\b/,
    claim: "$67 / $127 pricing tiers",
    truth: "SUPERSEDED, not invented — which is why it keeps returning honestly. docs/PRICING-SECTION-COPY-SPEC.md (Jun 11) still specifies it. data/pricing.ts and live /pricing read $35 / $69 / ~$100. The $127 figure appears nowhere at all." },
  { re: /2\.13 clicks|0\.38 for stock/i,
    claim: "Sterling Sky '2.13 clicks vs 0.38 for stock'",
    truth: "The article contains no such figures — fetched Aug 9. The deduplication mechanism is real; the numbers are not." },
  { re: /ADAI[-\s]?WDO[-\s]?100|WDIIR[-\s]?100/i,
    claim: "ADAI-WDO-100 / WDIIR-100 form numbers",
    truth: "Neither appears in Ala. Admin. Code r. 80-10-9-.18. The instrument is the Official Alabama Wood Infestation Inspection Report, Exhibit A. No form number is asserted by the rule." },
  { re: /105 occurrences|nothing built in the last two days is public|PR #74 (is )?(still )?not (yet )?merged/i,
    claim: "PR #74 unmerged / 105 name occurrences remain",
    truth: "PRs #74-#83 all merged and deployed. Measure with grep before repeating a count." },
];

// Documentation only. Rule files hold these strings ON PURPOSE.
const SKIP = new Set(["data/compliance.ts", "agents/lib/compliance.mjs", "scripts/test-no-zombie-claims.mjs"]);
const DIRS = ["claude", "docs", "docs/decisions", "monitoring", "."];

const files = [];
for (const d of DIRS) {
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d, { withFileTypes: true })) {
    if (!f.isFile() || !f.name.endsWith(".md")) continue;
    const p = d === "." ? f.name : join(d, f.name);
    if (!SKIP.has(p.replace(/\\/g, "/"))) files.push(p);
  }
}

let hits = 0;
const quarantined = [];
for (const f of files) {
  const text = readFileSync(f, "utf8");

  // A file QUARANTINED at the top — a SUPERSEDED banner in its opening lines — is
  // history, not a live claim. Its body legitimately still contains the old numbers;
  // that is the point of keeping it. Scanning inside it would force a choice between
  // deleting history and permanently failing the test.
  // Reported, not silently skipped: a quarantined file is still a file someone can
  // read and act on, and the banner is the only thing stopping them.
  if (/^[\s>#*]*SUPERSEDED\b/im.test(text.split("\n").slice(0, 25).join("\n"))) {
    quarantined.push(f);
    continue;
  }
  // A line that RECORDS the retraction is not a repetition of it.
  for (const z of ZOMBIES) {
    for (const line of text.split("\n")) {
      if (!z.re.test(line)) continue;
      // A line that RECORDS a retraction is not a repetition of it. This list is
      // deliberately generous: a false positive here costs a comment, a false NEGATIVE
      // lets a zombie back in.
      // Exemptions are deliberately generous: a false positive here costs a
      // comment, a false NEGATIVE lets a zombie back in. A line that states the
      // CORRECT value alongside the wrong one is recording the fix, not repeating
      // the claim — hence the 308/$69/no-$67 forms below.
      const RECORDS_FIX =
        /retract|~~|wrong|false|disproven|corrected|zombie|fabricat|stale|superseded|SUPERSEDED|Known and CORRECT|appears nowhere|no such figures|same class of error/i;
      const STATES_TRUTH = /\b308\b|\$69\b|13,449|no \$67|does not exist|DO NOT/i;
      const IS_DIRECTIVE = /do not ["']?fix|do not (repeat|quote|action|implement)/i;
      if (RECORDS_FIX.test(line) || STATES_TRUTH.test(line) || IS_DIRECTIVE.test(line)) continue;
      console.log(`  ZOMBIE  ${f}\n          claim: ${z.claim}\n          line:  ${line.trim().slice(0, 110)}\n          truth: ${z.truth}\n`);
      hits++;
      break;
    }
  }
}

if (quarantined.length) {
  console.log(`  quarantined (SUPERSEDED banner, not scanned): ${quarantined.join(", ")}`);
}
console.log(hits ? `${hits} retracted claim(s) repeated across ${files.length} docs` : `clean — ${files.length} docs scanned, no retracted claims repeated`);
process.exit(hits ? 1 : 0);
