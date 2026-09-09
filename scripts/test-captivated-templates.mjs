// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: scripts/test-captivated-templates.mjs
// Commit: feat(guards): scan Captivated message templates against data/compliance.ts
// Push: main
// ─────────────────────────────────────
//
// WHY THIS EXISTS
// ---------------
// The 2026-09-09 sweep found the same defect class on two surfaces that publish
// straight to customers and that NO guard reads:
//
//   · BrightLocal — Birmingham's GMB description carried "EnviroCare's own
//     damage repair guarantee", live on Google with Active Sync ON for 9 days.
//     data/compliance.ts:95 matches that exact string. The rule existed. Nothing
//     ran it against the listing.
//   · The OneUp queue — same story, checked only by hand, weekly, by a sweep.
//
// Captivated is the third such surface and the most direct: a text message lands
// in a customer's hand, cannot be edited after sending, and is the medium where
// an unqualified "$1,000,000 guarantee" does the most damage. This guard closes
// it BEFORE the first send rather than after the first sweep finds it.
//
// It reuses scripts/lib/compliance-rules.mjs — the same single rule source the
// repo guard and scripts/proposer.mjs use. No rules are transcribed here. The
// 2026-08-18 note in proposer.mjs explains what hand-copying rules cost last
// time: 9 of 30 rules copied, and every scan reported clean with authority.
//
// SKIP BEHAVIOUR — deliberately loud
// ----------------------------------
// The Sep 9 sweep also found test:citynap reporting "ok 2 city records" where it
// read 5 a week earlier, out of ~100 city pages, exiting 0 the whole time. A
// guard whose coverage can collapse without failing is not a guard. So:
//
//   · no API key           → SKIP, exit 0, printed loudly (nothing to check)
//   · key present, 0 rows  → FAIL, exit 1 (a key that returns nothing is broken,
//                            not clean — this is the citynap failure mode)
//   · key present, N rows  → scan all N, fail on any blocking hit
//
// Run:  node scripts/test-captivated-templates.mjs
// CI:   set captivated_api (or CAPTIVATED_API_KEY) in the workflow env.

import { compileRules, scanText } from "./lib/compliance-rules.mjs";
import { isConfigured, listTemplates, apiKey, CaptivatedError } from "../agents/lib/captivated.mjs";

// Captivated's payload shape is not pinned by the PDF docs, so pull text from
// any plausible field rather than guessing one and silently scanning nothing.
const TEXT_FIELDS = ["body", "content", "message", "text", "template", "body_text"];
const NAME_FIELDS = ["name", "title", "label"];

function pick(obj, fields) {
  for (const f of fields) {
    const v = obj?.[f];
    if (typeof v === "string" && v.trim()) return v;
  }
  return null;
}

function asArray(payload) {
  if (Array.isArray(payload)) return payload;
  for (const k of ["data", "templates", "results", "items", "records"]) {
    if (Array.isArray(payload?.[k])) return payload[k];
  }
  return [];
}

async function main() {
  if (!isConfigured()) {
    console.log("captivated-templates: SKIPPED — no API key in the environment.");
    console.log("  Set captivated_api (or CAPTIVATED_API_KEY) to enable this guard.");
    console.log("  This guard checks nothing right now. That is not a pass.");
    return 0;
  }

  const { source } = apiKey();
  let payload;
  try {
    payload = await listTemplates();
  } catch (e) {
    const detail = e instanceof CaptivatedError && e.status ? ` (HTTP ${e.status})` : "";
    console.error(`captivated-templates: FAIL — could not read templates${detail}: ${e.message}`);
    console.error("  A guard that cannot reach its surface must fail, not pass quietly.");
    return 1;
  }

  const templates = asArray(payload);

  // Coverage floor. A configured key that returns zero templates means the shape
  // changed, the account is empty, or the token lacks scope — all of which are
  // findings, none of which are "clean".
  if (templates.length === 0) {
    console.error(`captivated-templates: FAIL — key present (${source}) but 0 templates returned.`);
    console.error("  Either the account has no templates, the token lacks scope, or the");
    console.error("  response shape changed. Any of those needs a human, not a green tick.");
    return 1;
  }

  const rules = compileRules();
  let scanned = 0;
  let unreadable = 0;
  const failures = [];
  const warned = [];

  for (const t of templates) {
    const name = pick(t, NAME_FIELDS) || String(t?.id ?? "(unnamed)");
    const body = pick(t, TEXT_FIELDS);
    if (!body) {
      unreadable++;
      console.warn(`  ?  ${name}: no readable text field (looked for: ${TEXT_FIELDS.join(", ")})`);
      continue;
    }
    scanned++;
    const scan = scanText(body, rules);
    if (!scan.clean) {
      if (scan.blocking?.length) {
        failures.push({ name, hits: scan.blocking });
      }
      if (scan.warnings?.length) {
        warned.push({ name, hits: scan.warnings });
      }
    }
  }

  // A template whose body we cannot find is unscanned, and unscanned is not
  // clean. Same principle as the coverage floor above.
  if (unreadable > 0 && scanned === 0) {
    console.error(`captivated-templates: FAIL — ${unreadable} template(s) returned, none had a readable body field.`);
    console.error("  Add the correct field name to TEXT_FIELDS in this file.");
    return 1;
  }

  for (const w of warned) {
    for (const h of w.hits) console.warn(`  warn  ${w.name}: ${h.reason} — "${h.match}"`);
  }

  if (failures.length) {
    console.error(`\ncaptivated-templates: FAIL — ${failures.length} template(s) carry banned language:\n`);
    for (const f of failures) {
      console.error(`  ${f.name}`);
      for (const h of f.hits) console.error(`      match:  "${h.match}"\n      reason: ${h.reason}`);
    }
    console.error("\nThese are text messages. Fix the template in Captivated before sending.");
    return 1;
  }

  const note = unreadable ? `, ${unreadable} unreadable` : "";
  console.log(`  ok   ${scanned} Captivated template(s) scanned${note} — no blocking compliance hits`);
  if (warned.length) console.log(`  ${warned.length} template(s) carry non-blocking warnings (above)`);
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.error(`captivated-templates: FAIL — unexpected error: ${e?.stack || e}`);
    process.exit(1);
  });
