// Fails if a city's office fields disagree — with each other, with
// data/offices.ts, or with the office the sitewide header will dial.
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
//
// ─────────────────────────────────────────────────────────────────────────────
// REWRITTEN 2026-09-06 — THE PREVIOUS VERSION CHECKED ALMOST NOTHING.
//
// It printed "ok 2 city records — phone, tel and address agree" and exited 0.
// Two. The file has 34 city records. It had never validated a single one.
//
// The cause: it looked for literal `officePhone: '...'` text inside each record
// slice. No city record contains that text. Records carry their office by
// SPREADING a shared constant — `{ slug: 'hoover', ..., ...BHM_CITY, ... }` —
// so the only places the literal appears are the four constant definitions and
// the `type City` declaration. Those are what it was counting. Every real record
// hit `if (!phone || !tel) return;` and was skipped silently, because a skip is
// not a failure and the summary line only reports what it did check.
//
// This is the second time this guard has under-matched: its own history notes a
// version that reported "0 records". Going from 0 to 2 out of 34 was read as the
// fix. A guard that cannot fail is worse than no guard — it is a green check on
// the exact thing nobody is watching. So this version asserts its own coverage
// and fails when it drops.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync } from "node:fs";

const cities = readFileSync("data/cities.ts", "utf8");
const officesSrc = readFileSync("data/offices.ts", "utf8");
const routingSrc = readFileSync("data/city-offices.ts", "utf8");

const fail = [];
const note = (m) => fail.push(m);

// ── 1. data/offices.ts — the declared source of truth ────────────────────────
// id → { phone digits, street }
const SOT = {};
for (const m of officesSrc.matchAll(
  /^\s*'?([a-z-]+)'?:\s*\{\s*\n\s*id:\s*'([a-z-]+)'/gm
)) SOT[m[2]] = {};
for (const id of Object.keys(SOT)) {
  const at = officesSrc.indexOf(`id: '${id}'`);
  const rec = officesSrc.slice(at, at + 700);
  SOT[id].street = (rec.match(/street:\s*'([^']+)'/) || [])[1];
  SOT[id].tel = ((rec.match(/phoneHref:\s*'tel:\+?1?(\d{10})'/) || [])[1]) || "";
  SOT[id].phone = (rec.match(/phone:\s*'([^']+)'/) || [])[1];
}
const sotIds = Object.keys(SOT);
if (sotIds.length < 4) note(`data/offices.ts: parsed only ${sotIds.length} offices — parser is stale`);
for (const [id, o] of Object.entries(SOT)) {
  if (!o.tel || !o.phone || !o.street) note(`data/offices.ts: ${id} missing phone/tel/street`);
  else if (o.phone.replace(/\D/g, "") !== o.tel)
    note(`data/offices.ts: ${id} displays ${o.phone} but dials tel:${o.tel}`);
}

// ── 2. the office constants city records spread ──────────────────────────────
// const BHM = { officeName: '…', officePhone: '…', officeTel: '…', officeAddress: '…' };
const CONST = {};
for (const m of cities.matchAll(
  /const ([A-Z_]+) = \{ officeName: '([^']+)', officePhone: '([^']+)', officeTel: '(\d+)', officeAddress: '([^']+)' \};/g
)) {
  CONST[m[1]] = { name: m[2], phone: m[3], tel: m[4], addr: m[5] };
}
if (Object.keys(CONST).length === 0) {
  note("data/cities.ts: parsed 0 office constants — the record shape changed, this guard is blind");
}

// Each constant must be self-consistent, and must match an office in the SoT on
// BOTH phone and street. Matching on phone alone would pass a record that paired
// the right number with the wrong address — the 2026-08-10 defect.
const CONST_TO_OFFICE = {};
for (const [k, c] of Object.entries(CONST)) {
  if (c.phone.replace(/\D/g, "") !== c.tel)
    note(`cities.ts ${k}: displays ${c.phone} but dials tel:${c.tel}`);
  const match = sotIds.find(
    (id) => SOT[id].tel === c.tel && c.addr.startsWith(SOT[id].street)
  );
  if (!match) {
    const byPhone = sotIds.find((id) => SOT[id].tel === c.tel);
    note(
      byPhone
        ? `cities.ts ${k}: phone ${c.phone} belongs to office '${byPhone}' (${SOT[byPhone].street}) but the address reads "${c.addr}"`
        : `cities.ts ${k}: phone ${c.phone} matches no office in data/offices.ts`
    );
  } else CONST_TO_OFFICE[k] = match;
}

// ── 3. which office will the sitewide header dial? (data/city-offices.ts) ────
const grabList = (name) => {
  const m = routingSrc.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\]`));
  return m ? [...m[1].matchAll(/'([a-z-]+)'/g)].map((x) => x[1]) : [];
};
const ROUTE = {};
for (const s of grabList("HUNTSVILLE_SLUGS")) ROUTE[s] = "huntsville";
for (const s of grabList("LAKE_MARTIN_SLUGS")) ROUTE[s] = "lake-martin";
// The two inline `.map()` groups at the bottom of the file.
for (const m of routingSrc.matchAll(
  /\(\[([^\]]*?)\] as const\)\s*\n?\s*\.map\(\(s\): \[string, OfficeId\] => \[s, '([a-z-]+)'\]\)/g
)) {
  for (const s of [...m[1].matchAll(/'([a-z-]+)'/g)]) ROUTE[s[1]] = m[2];
}
if (Object.keys(ROUTE).length < 20)
  note(`data/city-offices.ts: parsed only ${Object.keys(ROUTE).length} routed slugs — parser is stale`);
// officeForPath() falls back to 'birmingham' for anything unmapped.
const routedOffice = (slug) => ROUTE[slug] ?? "birmingham";

// ── 4. every city record ─────────────────────────────────────────────────────
const records = [
  ...cities.matchAll(/\{\s*"?slug"?:\s*['"]([a-z-]+)['"]([\s\S]*?)(?=\n\s*\{\s*"?slug"?:|\n\];)/g),
];
let checked = 0;
for (const [, slug, body] of records) {
  const spreads = [...body.matchAll(/\.\.\.([A-Z_]+)\b/g)].map((m) => m[1]).filter((k) => k in CONST);
  if (spreads.length === 0) {
    // Inline office fields are still legal — check them the old way.
    const phone = (body.match(/officePhone"?:\s*['"]([^'"]+)['"]/) || [])[1];
    const tel = (body.match(/officeTel"?:\s*['"]([^'"]+)['"]/) || [])[1];
    if (!phone || !tel) { note(`${slug}: no office constant spread and no inline office fields`); continue; }
    if (phone.replace(/\D/g, "") !== tel) note(`${slug}: displays ${phone} but dials tel:${tel}`);
    checked++;
    continue;
  }
  if (spreads.length > 1) {
    note(`${slug}: spreads ${spreads.length} office constants (${spreads.join(", ")}) — last one silently wins`);
    continue;
  }
  checked++;

  const office = CONST_TO_OFFICE[spreads[0]];
  if (!office) continue; // already reported at the constant level

  // THE CHECK THAT MATTERS: the body copy's office and the header's office.
  // The header reads data/city-offices.ts; the page body reads data/cities.ts.
  // Add a Jefferson County page to cities.ts with ...BHM_CITY and forget to list
  // it in city-offices.ts, and the page says (205) 991-2882 while the sticky call
  // button dials (205) 940-6360. Nothing else in this repo compares the two.
  const header = routedOffice(slug);
  if (header !== office) {
    note(
      `${slug}: page body shows the '${office}' office (${CONST[spreads[0]].phone}) ` +
      `but the header dials '${header}' (${SOT[header]?.phone ?? "?"}) — ` +
      `data/cities.ts and data/city-offices.ts disagree`
    );
  }

  // A city-specific direct line must still be internally consistent.
  const dp = (body.match(/directPhone:\s*'([^']+)'/) || [])[1];
  const dt = (body.match(/directTel:\s*'([^']+)'/) || [])[1];
  if (dp && dt && dp.replace(/\D/g, "") !== dt)
    note(`${slug}: directPhone ${dp} does not match directTel ${dt}`);
  if ((dp && !dt) || (dt && !dp)) note(`${slug}: has one of directPhone/directTel but not the other`);
}

// ── 5. coverage assertion — the part the old guard lacked ────────────────────
// A silent drop in what gets checked is the failure mode this guard has hit
// twice. Coverage is now an assertion, not a footnote.
const MIN_RECORDS = 30;
if (checked < MIN_RECORDS) {
  note(
    `COVERAGE: only ${checked} of ${records.length} city records were checked ` +
    `(expected at least ${MIN_RECORDS}). The record shape probably changed and ` +
    `this guard has gone blind — fix the parser, do not lower the floor.`
  );
}

if (fail.length) {
  for (const f of fail) console.log(`  FAIL ${f}`);
  console.log(`\n${fail.length} problem(s) across ${checked} city records`);
  process.exit(1);
}
console.log(
  `  ok   ${checked} city records × ${Object.keys(CONST).length} offices — ` +
  `display phone, tel: href, street address, data/offices.ts and the header all agree`
);
