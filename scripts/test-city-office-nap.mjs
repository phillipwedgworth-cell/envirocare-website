// Fails if a city record's office fields disagree with each other.
//
// Found live on 2026-08-10: /bessemer, /mccalla and /gardendale rendered a call
// button that DISPLAYED "(256) 937-7676" — the Huntsville office — while its href
// was "tel:2059406360", the Alabaster office. Read it and you dial Huntsville; tap
// it and you reach Alabaster. Neither is the Birmingham office the same card was
// labelled with. Three fields, three different offices, one button.
//
// A human reading the page cannot see this: the displayed number and the dialled
// number are different attributes of the same element. Only a check comparing the
// fields catches it, which is why it survived.
import { readFileSync } from "node:fs";

const src = readFileSync("data/cities.ts", "utf8");

const OFFICES = {
  "2059406360": { phone: "(205) 940-6360", addr: /Butler/i, name: "Alabaster" },
  "2059912882": { phone: "(205) 991-2882", addr: /16th Ave/i, name: "Birmingham" },
  "2569377676": { phone: "(256) 937-7676", addr: /Old Madison Pike/i, name: "Huntsville" },
  "2562346162": { phone: "(256) 234-6162", addr: /Tallapoosa/i, name: "Alex City" },
  "3343323321": { phone: "(334) 332-3321", addr: /./, name: "Auburn" },
};

// Records appear in two styles in this file — JSON-ish and TS-ish. Check both, or
// half the file goes unscanned. (The first version of this scan matched only the
// single-quoted style and reported "0 records".)
const starts = [
  ...[...src.matchAll(/\{"slug":"([a-z-]+)"/g)].map((m) => ({ i: m.index, slug: m[1] })),
  ...[...src.matchAll(/\{ slug: '([a-z-]+)'/g)].map((m) => ({ i: m.index, slug: m[1] })),
].sort((a, b) => a.i - b.i);

// Most records do not carry office fields literally — they SPREAD a shared
// constant (`{ slug: 'hoover', ...BHM_CITY }`). Resolve those constants first,
// or the scan below skips every record that uses one.
//
// This is what went wrong before 2026-09-07: the scan looked for a literal
// `officePhone:` inside each record, which appears only in the four constant
// definitions, so it reported "ok 2 city records" out of 26+ and passed clean
// while /contact-us and the footer were both publishing the wrong NAP. A guard
// grading 2 of 26 is not a guard. The coverage floor at the bottom is there so
// that failure mode is loud instead of silent.
const CONSTANTS = Object.fromEntries(
  [...src.matchAll(/^const ([A-Z_]+) = \{([^}]*officePhone[^}]*)\};/gm)].map(([, name, body]) => {
    const f = (k) => (body.match(new RegExp(`${k}\\s*:\\s*'([^']+)'`)) || [])[1];
    return [name, { phone: f("officePhone"), tel: f("officeTel"), addr: f("officeAddress") }];
  })
);

let checked = 0, bad = 0;
starts.forEach((c, n) => {
  const rec = src.slice(c.i, n + 1 < starts.length ? starts[n + 1].i : src.length);
  const grab = (k) => (rec.match(new RegExp(`"?${k}"?\\s*:\\s*["']([^"']+)["']`)) || [])[1];
  // Inline fields win over the spread, matching JS object semantics.
  const spread = (rec.match(/\.\.\.([A-Z_]+)/) || [])[1];
  const base = (spread && CONSTANTS[spread]) || {};
  const phone = grab("officePhone") ?? base.phone;
  const tel = grab("officeTel") ?? base.tel;
  const addr = grab("officeAddress") ?? base.addr;
  if (!phone || !tel) return;
  checked++;

  const digits = phone.replace(/\D/g, "");
  if (digits !== tel) {
    console.log(`  FAIL ${c.slug}: displays ${phone} but dials tel:${tel} (${OFFICES[digits]?.name ?? "?"} vs ${OFFICES[tel]?.name ?? "?"})`);
    bad++;
    return;
  }
  const office = OFFICES[tel];
  if (office && addr && !office.addr.test(addr)) {
    console.log(`  FAIL ${c.slug}: phone is ${office.name} (${phone}) but address reads "${addr}"`);
    bad++;
  }
});

// Coverage floor. The previous version silently graded 2 records and exited 0;
// a scan that stops finding records must fail loudly rather than report "ok".
const FLOOR = 20;
if (!bad && checked < FLOOR) {
  console.log(`\nFAIL: only ${checked} city record(s) checked, expected at least ${FLOOR}.`);
  console.log("The record or constant syntax in data/cities.ts probably changed and this");
  console.log("scan is no longer resolving it. Fix the scan — do not lower the floor.");
  process.exit(1);
}

console.log(bad ? `\n${bad} inconsistent of ${checked} city records with office fields`
                : `  ok   ${checked} city records — phone, tel and address agree`);
process.exit(bad ? 1 : 0);
