import { readFileSync } from "node:fs";
const src = readFileSync("data/compliance.ts", "utf8");
const body = src.slice(src.indexOf("BANNED_PATTERNS"), src.indexOf("SOFT_RULES"));

const rules = [];
for (const line of body.split("\n")) {
  if (!line.includes("pattern:")) continue;
  const dq = line.match(/pattern:\s*"((?:\\.|[^"\\])*)"/);
  const sq = line.match(/pattern:\s*'((?:\\.|[^'\\])*)'/);
  if (!dq && !sq) continue;
  // TS string literal -> real string. The single-quote path MUST unescape
  // backslashes too, or every \\b-anchored rule compiles to a literal backslash
  // and silently never matches.
  const lit = dq ? dq[1] : sq[1].replace(/\\'/g, "'").replace(/"/g, '\\"');
  const raw = JSON.parse(`"${lit}"`);
  const nm = line.match(/notIf:\s*'((?:\\.|[^'\\])*)'/);
  // `requires` belongs to file-scoped rules (granularity: 'file'), where the
  // obligation is satisfied once per page rather than once per line. These cases
  // assert what a string means STANDING ALONE, so a string that already carries
  // the required text is not a violation — same effect as notIf here.
  const rq = line.match(/requires:\s*'((?:\\.|[^'\\])*)'/);
  const exempt = [nm && nm[1], rq && rq[1]].filter(Boolean).join("|");
  rules.push({ re: new RegExp(raw, "i"), notIf: exempt ? new RegExp(exempt, "i") : null, raw });
}
console.log(`${rules.length} rules compiled OK\n`);

const flag = (t) => rules.some((r) => r.re.test(t) && !(r.notIf && r.notIf.test(t)));

// [text, shouldFlag, why]
const cases = [
  // --- turnaround: must FLAG (real promises found live) ---
  ["Most letters delivered within 48 hours of inspection.", true, "WDO turnaround"],
  ["lender-ready, 48-hour turnaround", true, "turnaround phrase"],
  ["most visits are within 48 hours", true, "visit turnaround"],
  ["inspections are typically available within 48 hours.", true, "inspection turnaround"],
  ["NPMA-33 letter emailed within 48 hours. Most under 24.", true, "letter turnaround"],
  // --- turnaround: must NOT flag (legitimate, currently live) ---
  ["If heavy rain falls within 24 hours of your treatment, call us and we'll re-treat at no charge.", false, "rain condition, not a promise"],
  ["Sentricon stations are checked on a regular schedule through the year.", false, "no clock at all"],
  ["The rule fixes a ninety (90) day retreatment period.", false, "statutory period"],
  // --- contract ---
  ["Pay per visit with no long-term agreement, or equal monthly ACH", true, "contract-free claim"],
  ["there are no contracts to worry about", true, "contract-free claim"],
  ["you can cancel anytime", true, "cancel-anytime"],
  ["Pay per visit billed as serviced, or equal monthly ACH payments under a 12-month billing agreement", false, "the approved positive framing"],
  ["Commonly annual service agreements", false, "describing competitors"],
  // --- WDO form ---
  ["lender-ready NPMA-33 form", true, "wrong form"],
  ["the official WDIIR-100 letter", true, "nonexistent designation"],
  ["Alabama uses its OWN report — it is not the NPMA-33 industry form", false, "the carve-out comment"],
  ["The Official Alabama Wood Infestation Inspection Report, lender-ready.", false, "the correct name"],
  // --- guarantee (existing rule, must still behave) ---
  ["we never guarantee elimination", false, "negated hedge"],
  ["backed by EnviroCare's own guarantee", true, "guarantee claim"],
  // the three gaps found 2026-08-09 against pages the guard should have caught
  ["EnviroCare&apos;s guarantee of up to $1,000,000 in property coverage", true, "HTML-entity possessive"],
  ["EnviroCare&#39;s guarantee", true, "numeric-entity possessive"],
  ["includes a 30-day guarantee with follow-up", true, "bare duration"],
  ["licensed technician, and our satisfaction guarantee", true, "intervening word"],
  ["our own damage repair guarantee", true, "still catches the original shape"],
  // the fourth gap, found 2026-08-24 and still live 2026-08-31 on
  // /blog/pest-control-cost-huntsville. Verbatim, then the shapes around it.
  ['That "we will make it right" guarantee is a big part of the price', true, "demonstrative + quoted promise — the live blog sentence"],
  ["That guarantee is a big part of the price", true, "demonstrative, no quotes"],
  ["This guarantee covers the structure", true, "demonstrative 'this'"],
  ["the satisfaction guarantee we stand behind", true, "definite article + intervening word"],
  // and the shape it must NOT swallow — see note (d) in data/compliance.ts
  ["shall carry a guarantee that if an infestation is found", false, "statutory 'a guarantee' must still pass"],
  ["No honest company can guarantee that pests never return", false, "negated, 'guarantee' as verb"],
  // must NOT flag - these are the legitimate uses
  ["we can't guarantee zero ticks, because wildlife reintroduces them", false, "negated hedge, contraction"],
  ["We don't guarantee elimination, but treatments reduce activity", false, "negated hedge"],
  ["shall carry a guarantee that if an infestation is found within ninety (90) days", false, "statutory quotation"],
  ["up to $1,000,000 in damage repair coverage, subject to the terms of the agreement", false, "the approved phrasing"],
  // the sitewide header band that shipped the bare figure to all 156 URLs
  ["Sentricon® termite protection · Up to $1M repair coverage · No drilling", true, "$1M with no qualifier — the header band"],
  ["Up to $1M damage warranty.", true, "$1M abbreviated, no qualifier"],
  ["Up to $1 million in damage repair coverage", true, "$1 million spelled out, no qualifier"],
  ["Up to $1M repair coverage, subject to the terms of the agreement", false, "qualified on the same line must pass"],
  // --- name ---
  // Built from parts on purpose: a literal here would be rewritten by any future
  // sitewide rename sweep, silently turning this assertion into a tautology.
  ["EnviroCare Pest" + " & Termite " + "Services", true, "retired name, literal ampersand"],
  ["EnviroCare Pest" + " &amp; Termite " + "Services", true, "retired name, HTML entity (the footer form)"],
  ["EnviroCare Pest" + " & Termite", true, "retired name, truncated (no 'Services')"],
  ["EnviroCare Pest" + " and Termite " + "Services", true, "retired name, 'and' spelled out"],
  ["© 2026 EnviroCare Pest" + " &amp; Termite " + "Services LLC", true, "the copyright line, on every page"],
  // "founded 1958" -- five live pages, and no rule in this file caught it
  ["the Wedgworth family — founded 1958 in Alexander City", true, "founded 1958, no 'in'"],
  ["Fourth-generation Wedgworth family business, founded 1958", true, "founded 1958 bare"],
  ["founded in 1958", true, "founded IN 1958"],
  ["Established 1958", true, "established 1958"],
  // the queued Facebook draft marked "ready" on 2026-08-10
  ["Lex Wedgworth started this company in 1958", true, "STARTED this company in 1958"],
  ["Kevin's grandfather began the business in 1958", true, "began the business in 1958"],
  // 2026-08-12: a PLACE between the verb and the year defeated the rule entirely.
  // Seven live locations said this and the guard reported clean on all of them.
  ["EnviroCare was founded in Alabama in 1958", true, "founded in <place> in 1958"],
  ["Founded in Alexander City, Alabama in 1958", true, "founded in <city>, <state> in 1958"],
  ["The company was founded in Birmingham in 1958", true, "company founded in <place> in 1958"],
  ["**Founded:** 1958", true, "founded as a bare metadata field"],
  // ...and the legitimate forms that must survive the widening
  ["the Wedgworth family opened the Alexander City office in 1958", false, "the OFFICE did open in 1958"],
  ["Started the family pest control business in 1958 in Alexander City", false, "founder bio — the FAMILY business did start then"],
  // SIXTH shape, 2026-08-12 (found by the Cowork session, verified here). The rule
  // above knows only ORIGIN verbs, so a DURATION verb attaching the ENTITY to 1958
  // slipped it — and all six NW drafts carried it.
  ["EnviroCare has handled pest control and termite control in Alabama since 1958", true, "entity + duration verb + since 1958"],
  ["EnviroCare has worked Alabama since 1958", true, "entity + worked since 1958"],
  ["EnviroCare has protected homes since 1958", true, "entity + protected since 1958"],
  ["EnviroCare has been doing this for Alabama families since 1958", true, "entity + has been + since 1958"],
  // ...and the brand shorthand that must survive it. Requiring a duration VERB is
  // what separates these; without it the rule flagged 93 places, ~60 of them titles.
  ["EnviroCare — Alabama Pest Control Since 1958", false, "page title, no verb — approved shorthand"],
  ["EnviroCare · Since 1958", false, "the live header tagline — approved shorthand"],
  ["The Wedgworth family behind EnviroCare has been doing pest control in Alabama since 1958", false, "family subject must pass"],
  ["the family started doing pest control in Alabama in 1958", false, "FAMILY form must pass"],
  ["the family has been doing pest control in Alabama since 1958", false, "APPROVED phrasing must pass"],
  ["Family-owned since 1958", false, "approved short form must pass"],
  ["EnviroCare", false, "the approved generic name must NOT flag"],
  ["EnviroCare Pest Services", false, "the approved Birmingham name must NOT flag"],
];

let pass = 0;
for (const [t, want, why] of cases) {
  const got = flag(t);
  const ok = got === want;
  pass += ok ? 1 : 0;
  console.log(`${ok ? "  ok  " : "  FAIL"} got=${String(got).padEnd(5)} want=${String(want).padEnd(5)} ${why}`);
  if (!ok) console.log(`         ${JSON.stringify(t)}`);
}
console.log(`\n${pass}/${cases.length} correct`);
process.exit(pass === cases.length ? 0 : 1);
