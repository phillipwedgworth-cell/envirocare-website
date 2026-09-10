// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: scripts/test-captivated-safety.mjs
// Commit: test(guards): assert the SMS safety rails actually fire
// Push: main
// ─────────────────────────────────────
//
// WHY THIS EXISTS
// ---------------
// The 2026-08-24 sweep recommended a test OF the guards — asserting each rule
// fires on the phrasings it has historically missed — and repeated it on Aug 31
// and Sep 9, by which point three separate guards had returned green over live
// defects. Nothing in this repo tests whether a safety rail actually catches
// what it claims to catch.
//
// This is that test, for the SMS path, written before the first send rather
// than after the first incident. It runs offline: no API key, no network. It
// asserts three things that would otherwise only be discovered in production,
// where "discovered in production" means a text message.
//
//   1. The outbound template is clean against data/compliance.ts — AND the
//      known-bad phrasings are genuinely blocked. A scanner that passes
//      everything also passes the template, so testing the template alone
//      proves nothing. The controls include the exact string that was live on
//      Birmingham's Google listing for 9 days ("EnviroCare's own damage repair
//      guarantee") and the unqualified $1M shape.
//   2. Opt-out detection catches every carrier keyword and the plain-English
//      forms, and does NOT fire on benign messages that merely contain the
//      word — "stop by the office", "cancel my appointment". A false negative
//      here texts someone who told you to stop.
//   3. Quiet hours reject late-night and early-morning sends in Central time.
//
// Run: node scripts/test-captivated-safety.mjs

import { compileRules, scanText } from "./lib/compliance-rules.mjs";
import {
  isOptOut,
  isWithinSendWindow,
  hourIn,
  screenContact,
} from "../agents/lib/captivated-safety.mjs";

let failures = 0;
const ok = (cond, label) => {
  console.log(`  ${cond ? "ok  " : "FAIL"} ${label}`);
  if (!cond) failures++;
};

// The body agents/captivated-send.mjs renders. Kept in sync by eye; if the
// template there changes, this control must change with it.
const RENDERED =
  "Hi Sarah, this is EnviroCare. Thanks for letting our Huntsville team take care of your home. " +
  "If you have a minute, a short Google review genuinely helps the local crew: " +
  "https://g.page/r/example/review Reply STOP to opt out.";

// Phrasings that MUST be blocked. Each one is real: the first two are the
// Birmingham GMB description and its shape; the third is the site-wide
// unqualified $1M; the fourth is the entity-1958 claim /llms.txt forbids;
// the fifth is the Corteva attribution found live on two blog pages Sep 9.
const MUST_BLOCK = [
  ["unqualified $1,000,000 + guarantee", "Our $1,000,000 guarantee protects your home. Reply STOP to opt out."],
  ["possessive guarantee (the Birmingham GMB string)", "Backed by EnviroCare's own damage repair guarantee. Reply STOP to opt out."],
  ["unqualified $1M", "Sentricon with $1M coverage. Reply STOP to opt out."],
  ["entity founded 1958", "EnviroCare was founded in 1958. Reply STOP to opt out."],
];

const MUST_OPT_OUT = [
  "STOP", "stop", "Stop!", "STOPALL", "unsubscribe", "Cancel", "QUIT", "End",
  "opt out", "OPTOUT", "remove me from this list", "please take me off",
  "do not text me again", "stop texting me", "no more texts please", "Unsubscribe me",
];

const MUST_NOT_OPT_OUT = [
  "yes please come tuesday",
  "thanks!",
  "can you stop by the office tomorrow",
  "I need to cancel my appointment",
  "we stopped by but nobody was home",
  "sounds good",
  "what time will the tech arrive",
  "cancel my appointment for friday",
];

function main() {
  const rules = compileRules();

  console.log(`\ncaptivated-safety: compliance (${rules.length} rules from data/compliance.ts)`);
  ok(rules.length >= 30, `rule source loaded — ${rules.length} rules (floor 30, so a broken loader fails here)`);

  const scan = scanText(RENDERED, rules);
  ok(scan.clean, "outbound review-request template is compliance-clean");
  if (!scan.clean) console.log(`       ${JSON.stringify(scan.notes)}`);

  for (const [label, body] of MUST_BLOCK) {
    const r = scanText(body, rules);
    ok(!r.clean && (r.blocking || []).length > 0, `BLOCKED: ${label}`);
  }

  console.log(`\ncaptivated-safety: opt-out detection`);
  let missed = 0;
  for (const t of MUST_OPT_OUT) if (!isOptOut(t)) { missed++; console.log(`       missed: "${t}"`); }
  ok(missed === 0, `all ${MUST_OPT_OUT.length} opt-out phrasings detected`);

  let falsePos = 0;
  for (const t of MUST_NOT_OPT_OUT) if (isOptOut(t)) { falsePos++; console.log(`       false positive: "${t}"`); }
  ok(falsePos === 0, `no false positives across ${MUST_NOT_OPT_OUT.length} benign messages`);

  console.log(`\ncaptivated-safety: quiet hours (America/Chicago)`);
  const at = (iso) => new Date(iso);
  ok(!isWithinSendWindow("America/Chicago", at("2026-09-09T04:00:00Z")), `23:00 CT rejected`);
  ok(!isWithinSendWindow("America/Chicago", at("2026-09-09T11:00:00Z")), `06:00 CT rejected`);
  ok(isWithinSendWindow("America/Chicago", at("2026-09-09T18:00:00Z")), `13:00 CT allowed`);
  ok(!isWithinSendWindow("America/Chicago", at("2026-09-10T02:00:00Z")), `21:00 CT rejected`);
  console.log(`       (hour right now in CT: ${hourIn("America/Chicago")})`);

  console.log(`\ncaptivated-safety: per-contact screening`);
  const suppressed = new Set(["opted-out"]);
  const history = {
    recent: new Date(Date.now() - 5 * 86400000).toISOString(),
    old: new Date(Date.now() - 200 * 86400000).toISOString(),
  };
  ok(screenContact("fresh", { suppressed, history }).ok, "never-contacted contact is eligible");
  ok(!screenContact("opted-out", { suppressed, history }).ok, "opted-out contact is excluded");
  ok(!screenContact("recent", { suppressed, history }).ok, "contact texted 5 days ago is excluded");
  ok(screenContact("old", { suppressed, history }).ok, "contact texted 200 days ago is eligible again");
  ok(!screenContact("", { suppressed, history }).ok, "empty contact id is excluded");

  console.log(
    failures === 0
      ? `\ncaptivated-safety: PASS\n`
      : `\ncaptivated-safety: FAIL — ${failures} assertion(s) failed\n`,
  );
  return failures === 0 ? 0 : 1;
}

process.exit(main());
