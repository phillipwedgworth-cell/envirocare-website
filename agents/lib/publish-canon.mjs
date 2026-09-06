// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/publish-canon.mjs
// Commit: feat(agents): executor — ship approved approval_queue rows to GBP via OneUp
// Push: main (via branch + PR)
// ─────────────────────────────────────
//
// THE SHIP-TIME GATE. Everything here runs on copy that is ALREADY marked
// approved and ALREADY carries compliance_clean = true.
//
// WHY THAT IS NOT REDUNDANT
// -------------------------
// compliance_clean is a claim made by the generator at WRITE time, against the
// rules that existed then. Measured against the live queue on 2026-09-06: all
// 16 approved rows carry compliance_clean = true, and 11 of them violate a rule
// that is in force today. Three separate mechanisms produced that:
//
//   1. The canon MOVED after the row was written. Mosquito season was
//      "March–November, 9 treatments" until PR #110 made it March–October / 8
//      treatments. Five queued rows still say November.
//   2. The generator's rule copy was a DRIFTED SUBSET — the failure
//      scripts/lib/compliance-rules.mjs exists to end (read its header).
//   3. A rule lives in AGENTS.md as an owner ruling and was never encoded
//      anywhere a scanner could read it (see OWNER_RULINGS below).
//
// So the executor re-derives every rule at ship time, from the live sources,
// and never reads compliance_clean at all. A row that passes here passes on
// today's rules; a row that fails gets status='fix' and the exact phrase.
//
// FOUR LAYERS, all blocking:
//   (a) scripts/lib/compliance-rules.mjs  — data/compliance.ts, the repo's
//       single rule source. Not re-typed here; imported.
//   (b) compliance_prohibitions           — the live phrase table.
//   (c) service_canon                     — the live price/season table. Prices
//       and units are read from it, never hardcoded, so a canon change lands
//       here on the next run with no code edit.
//   (d) OWNER_RULINGS                     — the short list of rulings that are
//       canon in AGENTS.md but absent from (a)-(c). Each one carries the date
//       and the reason it is here rather than in a table.

import { scanText, compileRules } from "../../scripts/lib/compliance-rules.mjs";

// ── (d) Owner rulings not encoded in any scannable source ────────────────────
//
// Every entry here is a rule AGENTS.md states as canon that (a), (b) and (c)
// cannot express. Adding one is a last resort: prefer a row in
// compliance_prohibitions, which needs no deploy. These four cannot live there
// because they are shape rules, not phrases.
export const OWNER_RULINGS = [
  {
    // AGENTS.md, Code Review canon §2: "Absolute claims. No `unlimited` in
    // marketing copy." Reinforced by service_canon.fire_ant.notes: 'Do NOT say
    // "re-service included" or "unlimited" — dropped sitewide 2026-08-26
    // (PR #114)'.
    //
    // data/compliance.ts DISAGREES with this and its carve-out wins there:
    // rule 147 is `\bunlimited\b` with notIf
    // `unlimited\s+(free|covered|visits|pest|re-?servic|re-?treatment)`, which
    // permits the exact phrase "unlimited free re-services". That carve-out
    // predates PR #114 and is now stale. Five approved rows say "unlimited
    // free re-services" and layer (a) passes every one of them.
    //
    // Reconciling data/compliance.ts is a sitewide content change with its own
    // guard tests, so it is NOT done here. This ruling blocks the copy at the
    // publish boundary; the follow-up is to retire rule 147's carve-out.
    id: "unlimited",
    re: /\bunlimited\b/i,
    reason: 'AGENTS.md §2 bans "unlimited" in marketing copy (dropped sitewide 2026-08-26, PR #114). data/compliance.ts rule 147 still carves out "unlimited free re-service" — that carve-out is stale.',
  },
  {
    // Owner direction recorded in agents/oneup-push.mjs (2026-08-07): agreement
    // practice is not uniform, so EVERY absence-framing is inaccurate. State the
    // two billing options positively instead.
    //
    // data/compliance.ts rule 159 covers this but its pattern is
    // `\bno[\s-]+(long[\s-]?term[\s-]+)?(contract|...)s?\b`, which requires the
    // literal word "term". It therefore does NOT match "No long contracts" —
    // the phrasing actually sitting in the queue today (row 491fb0a4). Widened
    // here rather than in data/compliance.ts for the same reason as above.
    id: "contract-absence",
    re: /\bno\b[\s-]+(?:\w+[\s-]+){0,2}?(contract|agreement|commitment)s?\b|\bcancel\s+any\s?time\b|\bnot\s+locked\s+in\b/i,
    reason: "absence-of-contract framing is inaccurate (owner direction 2026-08-07) — state the ACH and per-service billing options positively instead",
  },
  {
    // Google rejects a Business Profile post whose BODY carries a phone number,
    // and the post silently fails to go live. Recorded in oneup-push.mjs.
    //
    // NOT BLOCKING, deliberately, and this is the one judgement call in this
    // file. Every approved GBP row in the queue carries its office phone, so
    // blocking would take the shippable count to zero on the strength of a
    // claim this session could not verify against Google's live API. It is
    // reported on every run instead, and the NAP check below still blocks the
    // dangerous version of it (a phone that contradicts the listing).
    id: "phone-in-body",
    re: /\(?\b\d{3}\)?[.\-\s]\d{3}[.\-\s]\d{4}\b/,
    reason: "GBP post bodies carrying a phone number are rejected by Google (agents/oneup-push.mjs, 2026-08-06) — unverified this session, so reported not blocked",
    warnOnly: true,
  },
];

// ── (c) service_canon → rules ────────────────────────────────────────────────
//
// AGENTS.md rules Mosquito + Tick at $65/month (2026-08-26, with
// service_canon.mosquito) but service_canon has no mosquito_tick ROW, so the
// figure is unreadable from the table. Supplied here so a legitimate $65 is not
// reported as an off-canon price. FOLLOW-UP: add the row and delete this.
const CANON_GAPS = [{ service_key: "mosquito_tick", current_price: 65, price_unit: "per month (Mar-Oct, 8 treatments)" }];

const MOSQUITO_CONTEXT = /mosquito|tick|chigger/i;

// Every dollar figure the copy is allowed to state, as an integer-cents set.
// Built from the live table so a price change needs no code edit.
function canonAmounts(canonRows) {
  const set = new Set();
  for (const r of [...canonRows, ...CANON_GAPS]) {
    for (const v of [r.standard_price, r.current_price]) {
      if (v == null) continue;
      set.add(Math.round(Number(v) * 100));
    }
  }
  // The $1,000,000 damage repair coverage is a canon figure that is not a
  // price, so it is not in service_canon. Its own qualifier rule (data/
  // compliance.ts rule 260, requires 'subject to the terms of the agreement')
  // is what governs it; here it only needs to not read as an off-canon price.
  set.add(100000000);
  return set;
}

function parseMoney(tok) {
  return Math.round(Number(String(tok).replace(/[$,\s]/g, "")) * 100);
}

/**
 * Season / treatment-count / price-unit rules derived from service_canon.
 *
 * The three failure shapes named in the task brief — "through November",
 * "9 treatments", "$33.75" — are each an instance of one of these, not
 * special cases: November contradicts the canon season, 9 contradicts the
 * canon count, and $33.75 is a DERIVED figure (45 × 8 ÷ 12 ≈ 30, or the old
 * 45 × 9 ÷ 12 = 33.75) that appears nowhere in the canon table.
 */
export function canonViolations(text, canonRows) {
  const body = String(text || "");
  const hits = [];
  const mosquito = canonRows.find((r) => r.service_key === "mosquito");

  if (MOSQUITO_CONTEXT.test(body)) {
    // Season. The canon unit string carries it ("per month (Mar-Oct, 8
    // treatments)"), so read the end month out of the unit rather than
    // hardcoding October.
    const endMonth = /oct/i.test(mosquito?.price_unit ?? "") ? "October" : null;
    const badSeason = body.match(/\b(?:march|mar\.?)\s*(?:through|thru|to|[-–—])\s*(november|nov\.?)\b|\bthrough\s+november\b/i);
    if (endMonth && badSeason) {
      hits.push({ rule: "canon:mosquito-season", match: badSeason[0], reason: `mosquito season is March–${endMonth} per service_canon.mosquito, not November` });
    }

    // Treatment count.
    const canonCount = (mosquito?.price_unit ?? "").match(/(\d+)\s*treatments/i)?.[1] ?? "8";
    const countHit = body.match(/\b(?:about\s+|approximately\s+|roughly\s+)?(\d+|nine|ten)\s+treatments?\b/i);
    if (countHit && countHit[1].toLowerCase() !== canonCount && !/^(eight|8)$/i.test(countHit[1])) {
      hits.push({ rule: "canon:mosquito-treatments", match: countHit[0], reason: `service_canon.mosquito is ${canonCount} treatments per season` });
    }

    // Price UNIT. $45 and $65 are MONTHLY figures. A per-treatment or
    // per-visit restatement of them is the exact regression AGENTS.md calls
    // out: "Flag any diff that reintroduces a per-visit or per-treatment
    // mosquito price". Blob-scoped, not sentence-scoped, because these posts
    // are single-topic and the price routinely sits a sentence away from the
    // word "mosquito".
    const unitHit = body.match(/\$\s?\d[\d,.]*\s*(?:\/|\bper\b)\s*(treatment|application|visit|service)\b/i);
    if (unitHit) {
      hits.push({ rule: "canon:mosquito-price-unit", match: unitHit[0], reason: `mosquito pricing is MONTHLY ($${mosquito?.current_price ?? 45}/month; Mosquito + Tick $65/month, ruled 2026-08-26) — never per treatment, application, or visit` });
    }
  }

  // Termite is never a flat number.
  const termite = body.match(/termite[^.!?]{0,80}?\$\s?\d[\d,.]*/i);
  if (termite && !/\bas low as\b/i.test(termite[0]) && !/\$\s?1[,.]?000[,.]?000|\$\s?1\s?(million|M)\b/i.test(termite[0])) {
    hits.push({ rule: "canon:termite-flat-price", match: termite[0].slice(0, 80), reason: 'termite is never a flat number — "as low as $30/month or $360/year, subject to inspection"' });
  }

  // Any dollar figure that is not a canon amount. This is what catches $33.75
  // without anybody having to think of $33.75.
  const allowed = canonAmounts(canonRows);
  for (const m of body.matchAll(/\$\s?\d[\d,]*(?:\.\d{1,2})?/g)) {
    const cents = parseMoney(m[0]);
    if (Number.isNaN(cents) || allowed.has(cents)) continue;
    hits.push({ rule: "canon:off-canon-price", match: m[0], reason: `$${(cents / 100).toFixed(2)} is not a price in service_canon — every published figure must come from the canon table` });
  }

  return hits;
}

// ── (b) compliance_prohibitions → rules ──────────────────────────────────────
//
// Word-boundary matched, not substring. "safe" is a bare phrase in the table;
// a substring match would fire on "safety", "safely" and "unsafe" and make the
// whole layer unusable. Hyphens in a phrase are matched loosely so "pet-safe",
// "pet safe" and "petsafe" all hit.
export function prohibitionRegex(phrase) {
  const escaped = String(phrase).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const loose = escaped.replace(/(\\?-|\s)+/g, "[\\s-]*");
  return new RegExp(`(?<![\\w-])${loose}(?![\\w-])`, "i");
}

export function prohibitionViolations(text, prohibitions) {
  const body = String(text || "");
  const hits = [];
  for (const p of prohibitions) {
    if (!p?.phrase) continue;
    const m = body.match(prohibitionRegex(p.phrase));
    if (m) hits.push({ rule: `prohibition:${p.category ?? "general"}`, match: m[0], reason: `${p.reason || "banned phrase"} (compliance_prohibitions #${p.id}, ${p.severity ?? "RED"})` });
  }
  return hits;
}

// ── Date staleness ───────────────────────────────────────────────────────────
//
// A GBP post that names a month or a holiday that has already gone by reads as
// abandoned, and Google surfaces it for weeks. The queue is full of these
// because it was written in July and August and nothing ever shipped.
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// Fixed 2026 dates. Only holidays that actually appear in seasonal pest copy.
const HOLIDAYS_2026 = [
  ["memorial day", "2026-05-25"],
  ["fourth of july", "2026-07-04"],
  ["july 4th", "2026-07-04"],
  ["independence day", "2026-07-04"],
  ["labor day", "2026-09-07"],
  ["halloween", "2026-10-31"],
  ["thanksgiving", "2026-11-26"],
  ["christmas", "2026-12-25"],
  ["new year", "2027-01-01"],
];

/**
 * @param {string} text
 * @param {Date} now
 * @param {number} leadDays How far ahead a dated reference must still be to be
 *   worth publishing. Default 2: a post scheduled today for a holiday tomorrow
 *   is dead on arrival, and this run caps at 3 posts/day so a queued row may
 *   not go out for another day or two. Labor Day (2026-09-07) is stale on
 *   2026-09-06 for exactly this reason.
 */
export function dateStaleViolations(text, now = new Date(), leadDays = 2) {
  const body = String(text || "");
  const hits = [];
  const horizon = new Date(now.getTime() + leadDays * 86400000);

  for (const [name, iso] of HOLIDAYS_2026) {
    if (!new RegExp(`\\b${name.replace(/\s+/g, "\\s+")}\\b`, "i").test(body)) continue;
    const when = new Date(`${iso}T12:00:00Z`);
    if (when <= horizon) {
      hits.push({ rule: "date:holiday", match: name, reason: `${name} was ${iso} — within ${leadDays} days of this run or already past` });
    }
  }

  const nowMonth = now.getUTCMonth();
  const nowYear = now.getUTCFullYear();
  for (let i = 0; i < MONTHS.length; i++) {
    const name = MONTHS[i];
    // "March through October" is a SEASON, not a timestamp. Skip a month that
    // is one end of a range — the canon season rule above owns those.
    const rangeSafe = new RegExp(`\\b(?:${name}\\s*(?:through|thru|to|[-–—])|(?:through|thru|to|[-–—])\\s*${name})\\b`, "i");
    if (rangeSafe.test(body)) continue;
    if (!new RegExp(`\\b${name}\\b`, "i").test(body)) continue;
    // "May" is also a verb; only treat it as a month inside a range, which the
    // carve-out above already handled.
    if (name === "may") continue;
    // A month earlier in THIS year is past. December referenced in January is
    // handled the same way a human would read it — as last month, i.e. stale.
    if (i < nowMonth) {
      hits.push({ rule: "date:past-month", match: name, reason: `copy is anchored to ${name}; it is ${MONTHS[nowMonth]} ${nowYear}` });
    }
  }
  return hits;
}

// ── Layer (a) + the whole gate ───────────────────────────────────────────────

let _rules = null;
function repoRules() {
  if (!_rules) _rules = compileRules();
  return _rules;
}

/**
 * Run every layer over one blob of copy.
 * @returns {{clean:boolean, blocking:Array, warnings:Array, note:string|null}}
 */
export function gateCopy(text, { prohibitions = [], canonRows = [], now = new Date(), leadDays = 2 } = {}) {
  const blocking = [];
  const warnings = [];

  // (a) the repo's single rule source
  const repo = scanText(text, repoRules());
  for (const b of repo.blocking) blocking.push({ rule: "compliance.ts", match: b.match, reason: b.reason });
  for (const w of repo.warnings) warnings.push({ rule: "compliance.ts", match: w.match, reason: w.reason });

  // (b) live phrase table
  blocking.push(...prohibitionViolations(text, prohibitions));

  // (c) live canon table
  blocking.push(...canonViolations(text, canonRows));

  // date staleness
  blocking.push(...dateStaleViolations(text, now, leadDays));

  // (d) owner rulings
  for (const r of OWNER_RULINGS) {
    const m = String(text || "").match(r.re);
    if (!m) continue;
    (r.warnOnly ? warnings : blocking).push({ rule: `ruling:${r.id}`, match: m[0], reason: r.reason });
  }

  const fmt = (h) => `${h.rule}: ${h.reason} ("${String(h.match).slice(0, 60)}")`;
  const parts = [];
  if (blocking.length) parts.push(`BLOCKING: ${blocking.map(fmt).join(" | ")}`);
  if (warnings.length) parts.push(`WARN: ${warnings.map(fmt).join(" | ")}`);

  return { clean: blocking.length === 0, blocking, warnings, note: parts.length ? parts.join(" || ") : null };
}

export default { gateCopy, canonViolations, prohibitionViolations, dateStaleViolations, OWNER_RULINGS };
