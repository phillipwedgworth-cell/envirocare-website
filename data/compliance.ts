/**
 * data/compliance.ts — SINGLE SOURCE OF TRUTH: compliance & approved language
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/compliance.ts
 * Commit: feat(data): add compliance rules for the source-of-truth auditor
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * These are MACHINE-CHECKABLE. agents/source-of-truth-auditor.mjs imports
 * BANNED_PATTERNS and scans built pages; any hit blocks the deploy.
 * Approved replacements are provided so fixes are unambiguous.
 */

export interface BannedTerm {
  /** Case-insensitive regex source */
  pattern: string;
  reason: string;
  approvedInstead: string;
  /** Optional: if the SAME line also matches this regex, the hit is suppressed
   *  (e.g. founder ≠ owner — a history reference to Phillip M. Wedgworth). */
  notIf?: string;
  /** Where the rule applies. 'content' (default) = static copy in app/components/data.
   *  'chat' = the chatbot prompt/output only (app/api/chat). Use 'chat' for
   *  AI-tell / stylistic rules so they never flag ordinary site punctuation. */
  scope?: 'content' | 'chat';
  /** 'line' (default) flags each matching line. 'file' flags the FILE only when it
   *  matches `pattern` somewhere AND fails to match `requires` anywhere — for
   *  obligations satisfied once per page (a disclosure), not once per sentence. */
  granularity?: 'line' | 'file';
  /** Only with granularity 'file': the text whose PRESENCE clears the file. */
  requires?: string;
  /** 'block' (default) fails the deploy. 'warn' reports for human review without
   *  blocking — for decision-gated language (e.g. discounts, which Phillip may
   *  approve per-offer) and rules with an open business question. */
  severity?: 'block' | 'warn';
}

export const BANNED_PATTERNS: BannedTerm[] = [
  { pattern: 'pet[\\s-]?safe',        reason: 'safety claim',  approvedInstead: 'EPA-registered, applied per label directions' },
  { pattern: 'kid[\\s-]?safe',        reason: 'safety claim',  approvedInstead: 'EPA-registered, applied per label directions' },
  { pattern: 'child[\\s-]?safe',      reason: 'safety claim',  approvedInstead: 'EPA-registered, applied per label directions' },
  { pattern: 'non[\\s-]?toxic',       reason: 'safety claim',  approvedInstead: 'EPA-registered products' },
  { pattern: 'eco[\\s-]?(safe|friendly)', reason: 'safety/green claim', approvedInstead: 'EPA-registered products' },
  { pattern: 'safe once dry',         reason: 'safety claim',  approvedInstead: 'allow applications to dry per label directions' },
  { pattern: 'same[\\s-]?day',        reason: 'availability claim', approvedInstead: 'prompt scheduling' },
  { pattern: 'there today',           reason: 'availability claim', approvedInstead: 'prompt scheduling' },
  { pattern: 'available now',         reason: 'availability claim', approvedInstead: 'prompt scheduling' },
  // "same technician" alone is fine ("real people, same technician on your route"); only a
  // PROMISE of it is a staffing claim. Require an every-time/guaranteed qualifier nearby.
  { pattern: '\\bsame technician\\b[^.]*\\b(every (time|visit)|always|guaranteed?|each (visit|service))\\b', reason: 'staffing promise', approvedInstead: 'a familiar local team whenever possible' },
  { pattern: 'bundle\\s*&\\s*save',   reason: 'bundle-discount claim', approvedInstead: 'bundle for convenience (one invoice, one tech)' },
  // GUARANTEE — the word is banned as a CLAIM, but three uses are legitimate and a
  // bare token match will destroy all three. Match the claim SHAPE, never the word.
  //
  //  1. NEGATED HEDGES — "we never guarantee elimination", "we can't guarantee zero
  //     ticks". These say the OPPOSITE of a guarantee and are what keeps mosquito and
  //     tick copy from over-promising. Stripping them inverts the meaning and creates
  //     exactly the exposure this rule exists to prevent. The lookbehind below exempts
  //     a preceding negation.
  //  2. STATUTORY QUOTATION — Ala. Admin. Code r. 80-10-9-.18 reads "Such instrument
  //     shall carry a guarantee that if an infestation ... is found within ninety (90)
  //     days ... shall be treated by the licensee, free of charge." Our WDO pages
  //     paraphrase this ("treats the structure at no charge") and should keep doing so,
  //     but if anyone ever quotes the rule directly, removing the word would make the
  //     QUOTATION WRONG. Never sweep inside a quotation of the rule.
  //  3. The re-service commitment is real; only its framing as a "guarantee" is the
  //     issue. Reword, do not delete the substance.
  //  ── two gaps found 2026-08-09 by checking the guard against the pages it was
  //     supposed to have caught. Both were real misses, not theory:
  //     (a) HTML-ENTITY POSSESSIVE. /mountain-brook line 153 reads
  //         "EnviroCare&apos;s guarantee of up to $1,000,000". The character class
  //         [’'] matches the two literal apostrophes but NOT the entity, so the
  //         claim sailed through. &apos; / &#39; / &#x27; / &rsquo; now all match.
  //     (b) BARE DURATION. "a 30-day guarantee" (both exterminator pages) has no
  //         possessive at all, so the claim-shape pattern skipped it entirely.
  //         Covered by the second rule below.
  //     (c) INTERVENING WORD. "our satisfaction guarantee" (live on /special-offers)
  //         also slipped past: the old pattern only allowed digits/currency or the
  //         literal "damage repair" between the possessive and the word. Now allows
  //         up to three intervening words, which is what caught it.
  { pattern: "(?<!\\b(?:never|not|don[’']t|doesn[’']t|cannot|can[’']t|no)\\s)\\b(our|your|its|EnviroCare(?:[’']|&apos;|&#39;|&#x27;|&rsquo;)s)\\s+(own\\s+)?(?:[$\\w,.]+\\s+){0,3}guarantee\\b",
    reason: 'coverage asserted as a guarantee',
    approvedInstead: 'up to $1,000,000 in damage repair coverage, subject to the terms of the agreement' },
  // A duration attached to "guarantee" is a claim no matter whose it is:
  // "a 30-day guarantee", "90 day guarantee", "12-month guarantee".
  { pattern: "\\b\\d{1,3}[\\s-]?(day|days|month|months|year|years)\\s+guarantee\\b",
    reason: 'time-bounded guarantee asserted as a claim',
    approvedInstead: 'state the commitment without the word: e.g. "if pests return within 30 days we come back at no charge"' },
  // Dead Scorpion tracking number — must never appear.
  { pattern: '649[\\s-]?5278',        reason: 'dead tracking number', approvedInstead: 'the correct office line from data/offices.ts' },
  // GENERATION — company is FOURTH-generation; Kevin is the THIRD-generation OWNER.
  // Allowed (never flagged): "fourth/4th-generation" and "third/3rd-generation owner".
  // Flag only company-level third-gen: "(3rd|third)-generation [Wedgworth] family/business/company".
  { pattern: '(third|3rd)[ -]generation\\s+(wedgworth\\s+)?(family|business|company)', reason: 'wrong generation (company is fourth)', approvedInstead: 'fourth-generation Wedgworth family (see data/business.ts)' },
  // OWNERSHIP — owner is Kevin Wedgworth (gen 3). Flag an "owner" claim naming anyone else.
  // notIf excludes founder/history references (Phillip M. Wedgworth is the gen-1 FOUNDER, not owner).
  // ── Added 2026-07-28 (approval-queue item 9): the 3 classes packs kept sneaking past self-scans ──
  // Discounts are DECISION-GATED, not always banned (Phillip approves real offers, e.g. the $79
  // initial promo) — severity 'warn' surfaces them for review instead of blocking the deploy.
  { pattern: '\\d+\\s*%\\s*off|percent\\s+off|half[\\s-]off|\\bdiscount(s|ed)?\\b', notIf: 'NOT discounts|aren.{0,2}t discounts|No promo|not a discount', severity: 'warn', reason: 'discount language — needs per-offer approval', approvedInstead: 'no discount framing unless the specific offer is approved; bundling is convenience only' },
  // RULED 2026-07-28 (Phillip): rodent CONTROL PROGRAMS ARE OFFERED - residential (with
  // regular pest control) and commercial (restaurants, commercial, governmental buildings).
  // The old 'rodent removal' entry in SERVICES_NOT_OFFERED conflated rodent control with
  // wildlife removal and caused false scrubs. Rodent marketing is legitimate; only
  // WILDLIFE removal (raccoon/squirrel/bat) stays banned - and now hard-blocks:
  { pattern: 'wildlife\\s+(removal|control|trapping)', notIf: 'not\\s+offer|refuge|exclud|no raccoons', reason: 'wildlife service marketing — not offered', approvedInstead: 'do not market wildlife services' },
  // 'unlimited' is approved ONLY in the re-service/re-treatment phrasings. Anything else
  // ('unlimited protection', 'unlimited treatments') is a service-scope overpromise. BLOCKS.
  { pattern: '\\bunlimited\\b', notIf: 'unlimited\\s+(free|covered|visits|pest|re-?servic|re-?treatment)', reason: 'unapproved unlimited claim', approvedInstead: 'unlimited (free) re-service / re-treatment is the only approved unlimited phrasing' },
  { pattern: '\\bowner\\b[^.\\n]*\\b(phillip|lex|william)\\b', notIf: '(Phillip M\\.|founder|founded)', reason: 'wrong owner', approvedInstead: 'Kevin Wedgworth (owner, gen 3); Phillip M. Wedgworth is the founder (gen 1)' },

  // ── Added 2026-08-09 after a live audit of all 156 sitemap pages ─────────────
  // Every one of these was already a stated rule with NO machine check behind it,
  // which is why each kept coming back after being fixed by hand. Same failure
  // mode as the retired $32/mo price: the rule lived in prose, not in a regex.

  // CONTRACT-FREE CLAIMS — banned outright (owner direction, Aug 2026). Agreement
  // practice is not uniform, so ANY absence-framing is inaccurate. State the two
  // billing options positively instead. Found live on /best-pest-control-birmingham
  // and /family-owned-vs-national-chains as "pay per visit with no long-term agreement".
  { pattern: '\\bno[\\s-]+(long[\\s-]?term[\\s-]+)?(contract|agreement|commitment)s?\\b',
    reason: 'contract-free claim — agreement practice is not uniform',
    approvedInstead: 'pay per visit billed as serviced, or equal monthly ACH payments under a 12-month billing agreement; terms confirmed in writing before service starts' },
  { pattern: '\\bcancel\\s+(any\\s?time|whenever)\\b',
    reason: 'cancel-anytime claim',
    approvedInstead: 'terms are confirmed in writing before service starts' },

  // TURNAROUND-TIME PROMISES on WDO/termite work. Matches the PROMISE SHAPE (a
  // deliverable + a clock), never a bare time reference — "if heavy rain falls
  // within 24 hours of your treatment" on /faq/mosquito is legitimate and must
  // keep passing. Verified against both in the test at the bottom of this comment.
  { pattern: '\\b\\d{1,3}[\\s-]hour turnaround\\b',
    reason: 'turnaround-time promise',
    approvedInstead: 'tell us the closing date when you book and we will work to it' },
  // WARN, not block: the owner's rule is scoped to WDO/termite pages, and this
  // schema can't express page scope. As a hard block it would fail the build on
  // legitimate copy — e.g. the /contact-us form's "we call back within 2 hours",
  // which is a real commitment the office makes, not a WDO turnaround claim.
  // A human decides per hit; the WDO/termite ones were cleared 2026-08-09.
  { pattern: '\\b(letters?|reports?|visits?|inspections?|appointments?)\\b[^.!?]{0,70}?\\b(with)?in\\s+\\d{1,3}\\s*(hours|hrs)\\b', severity: 'warn',
    reason: 'turnaround-time promise — banned on WDO/termite pages, judgment call elsewhere',
    approvedInstead: 'tell us the closing date when you book and we will work to it' },

  // WRONG WDO FORM. Alabama does NOT use the NPMA-33. Ala. Admin. Code r. 80-10-9-.18
  // (rule text read directly 2026-08-08) makes the instrument the "Official Alabama
  // Wood Infestation Inspection Report", Exhibit "A" to the rule, obtained from the
  // Commissioner. "WDIIR-100" and "ADAI-WDO-100" are designations that appear
  // nowhere in the rule. This mattered more than a typo: /realtor sold the wrong
  // form to realtors and closing attorneys — the exact readers who would know.
  // NOTE: keep `pattern` and `notIf` on ONE line. Several scan harnesses parse this
  // file line-by-line rather than importing it, and a notIf on its own line is
  // silently dropped — which turns a carve-out into a false positive.
  { pattern: '\\bNPMA[\\s-]?33\\b|\\bWDIIR[\\s-]?100\\b|\\bADAI[\\s-]?WDO[\\s-]?100\\b', notIf: 'not the NPMA-33|no .{0,12}(ADAI-WDO-100|WDIIR-100).{0,20}(exists|designation)',
    reason: 'wrong/nonexistent WDO form designation for Alabama',
    approvedInstead: 'Official Alabama Wood Infestation Inspection Report (Ala. Admin. Code r. 80-10-9-.18, Exhibit A)' },

  // "FOUNDED 1958" -- the company was not. EnviroCare LLC began 1993 and
  // incorporated 2005; 1958 is when the FAMILY started, as Wedgworth Pest Control.
  // BBB publishes both dates, so this is a visible contradiction.
  //
  // There was NO pattern for this in this file at all, and the only one that existed
  // (agents/oneup-push.mjs) required the word "in" -- so "founded 1958", which is what
  // five live pages actually said including the /about-us meta description, matched
  // nothing. Third time this week a guard matched a literal instead of a shape.
  // Matches founded/established/est. with or without "in", and "since 1958" only when
  // it attaches to the COMPANY rather than the family.
  // WIDENED again 2026-08-10. The rule matched founded/established/est. and missed
  // "Lex Wedgworth STARTED THIS COMPANY in 1958" -- a queued Facebook draft marked
  // ready to publish. Any verb that attaches the COMPANY's origin to 1958 is the
  // same claim; the verb is not the point. Fourth time in one day that a guard here
  // matched a literal instead of a shape.
  // "the family started in 1958" and "in Alabama since 1958" stay legal via notIf.
  // NOTE: pattern and notIf MUST stay on one line — see the comment on the WDO rule.
  // I broke that here on 2026-08-10 and a scan of data/cities.ts immediately
  // false-flagged /alexander-city, whose "the Wedgworth family started in 1958" is
  // the APPROVED form. Carve-outs are the FAMILY forms only: "since 1958" alone must
  // NOT exempt, or "started this company in 1958, family-owned since 1958" passes on
  // the strength of its own second clause.
  // WIDENED AGAIN 2026-08-12, fifth time. The pattern still required the origin verb
  // and "1958" to be nearly adjacent, so a PLACE between them walked straight through:
  //     "EnviroCare was founded in Alabama in 1958"   <- live in a queued builder draft
  //     "The company was founded in Birmingham in 1958"
  // Both name the COMPANY's origin as 1958, which is the banned claim; the words in
  // between were never the point. Now matched as a SHAPE: an origin verb followed by
  // 1958 anywhere in the same sentence. The carve-outs move to notIf, where they are
  // readable, and now include the two legitimate FAMILY/OFFICE forms:
  //   - "the Wedgworth family started in 1958"           (family, not company)
  //   - "the family opened the Alexander City office in 1958"  (the OFFICE did open then)
  { pattern: '\\b(founded|established|est\\.?|started|began|opened|launched)\\b[^.!?]{0,45}?\\b1958\\b', notIf: 'family (has |been )?(started|doing|opened)|the family (started|opened|has)|(started|founded|began) the family|opened the [A-Za-z ]{0,24}office|office (in|opened)|never say|do not say|banned|NEVER write',
    reason: '"founded 1958" -- the FAMILY started in 1958; the company began 1993/2005',
    approvedInstead: 'the family has been doing pest control in Alabama since 1958 / family-owned since 1958' },

  // $1M COVERAGE ATTRIBUTION. It is EnviroCare's own; attributing it to Corteva,
  // Sentricon's maker, or "the manufacturer" misrepresents who is actually liable.
  // This existed only as a SOFT_RULE in prose, so nothing checked it -- and three
  // GBP posts scheduled for 2026-08-13 carried "damage repair coverage from
  // Corteva" across all three locations. Being a Sentricon Certified Specialist is
  // a real credential and is deliberately NOT matched here; only the attribution is.
  { pattern: '(coverage|repair|warrant\\w*)[^.]{0,40}\\b(from|by|backed by|through)\\s+(corteva|the\\s+manufacturer|sentricon)|\\b(corteva|manufacturer)([\'’]s)?\\s+(guarantee|warranty|coverage)\\b',
    reason: 'coverage attributed to the manufacturer',
    approvedInstead: 'up to $1,000,000 in damage repair coverage, subject to the terms of the agreement (EnviroCare-backed; never attributed to Corteva or Sentricon)' },

  // $1M WITHOUT THE QUALIFIER (added 2026-08-11). The approved phrasing has always
  // carried "subject to the terms of the agreement", and 29 pages used it correctly
  // -- so the standard was understood. But nothing CHECKED it, and the sitewide
  // header band ("Up to $1M repair coverage · No drilling") therefore shipped the
  // bare figure to all 156 URLs, 158 occurrences, with no qualifier anywhere near it.
  // Same failure mode as "founded 1958" and the retired $32/mo price: the rule lived
  // in prose, not in a regex, so the one place it was missing was invisible.
  // notIf carries the qualifier plus the negative-context forms (the "does NOT claim"
  // list in llms-full.txt and the chatbot's own banned-phrase prompt).
  //
  // GRANULARITY IS 'file', NOT 'line', AND THAT IS THE WHOLE POINT. A line-scoped
  // version of this rule produced 253 hits and would have been useless: a ribbon
  // reading `$1M Coverage`, a 60-char page title, and an og:description physically
  // cannot carry a nine-word clause, so the only way to satisfy a line rule is to
  // delete the figure everywhere. The obligation is that the QUALIFIER APPEARS ON
  // THE PAGE -- which is also exactly how the Aug 11 audit tested it ("no qualifier
  // within 300 characters"). So: if a file states the figure anywhere, that file
  // must also state the qualifier somewhere. Badges stay; unqualified pages fail.
  // NOTE: keep pattern, notIf and requires on ONE line -- see the WDO rule comment.
  { pattern: '\\$1(?:,000,000|M|\\.0M|\\s*million)\\b', granularity: 'file', requires: 'subject to the terms of the agreement', notIf: 'not a Corteva|not the manufacturer|never attribut|NEVER|does not claim|do not say|banned',
    reason: '$1M coverage figure appears in this file with no "subject to the terms of the agreement" anywhere in it',
    approvedInstead: 'up to $1,000,000 in damage repair coverage, subject to the terms of the agreement' },

  // SIXTH SHAPE, 2026-08-12. Reported by the Cowork session and verified here: the
  // rule above only knows ORIGIN verbs (founded/started/began/...). It says nothing
  // about DURATION verbs, so attaching the ENTITY to 1958 with one sailed through:
  //     "EnviroCare has handled pest control in Alabama since 1958"
  //     "EnviroCare has worked Alabama since 1958"
  // Both assert that EnviroCare has been operating since 1958. It has not — the LLC
  // began 1993 and incorporated 2005; 1958 is the FAMILY, as Wedgworth Pest Control.
  // Identical claim, different subject and tense, and all six drafts I pushed to the
  // NeuronWriter editor that morning carried it.
  // The carve-out is the SUBJECT, not the verb: family/Wedgworth forms are approved
  // and must keep passing, as must a bare "Family-owned since 1958" with no entity.
  // NOTE: keep pattern and notIf on ONE line — see the comment on the WDO rule.
  // A DURATION VERB is required, not bare juxtaposition. Dropping that requirement
  // produced 93 hits, and most were the approved brand shorthand — the live header
  // tagline "EnviroCare · Since 1958" and ~60 page titles ending "…Since 1958".
  // Those state no verb and assert no operating history; "Family-owned since 1958"
  // is explicitly approved and is the same shape. The claim is the VERB:
  // "EnviroCare HAS PROTECTED homes since 1958" says the entity was operating, and
  // that is the part that is untrue.
  { pattern: '\\bEnviroCare\\b[^.!?]{0,40}?\\b(has|have|had)\\b(\\s+been)?[^.!?]{0,90}?\\bsince\\s+1958\\b', notIf: 'family|Wedgworth|never say|do not say|banned|NEVER write',
    reason: 'entity attached to 1958 via a duration verb — EnviroCare began 1993/2005; the FAMILY started 1958',
    approvedInstead: 'the family has been doing pest control in Alabama since 1958 / family-owned since 1958' },

  // RETIRED NAME (decision 2026-08-09). Warn, not block: it is still the sitewide
  // BRAND_NAME in lib/schema.tsx and appears on all 156 pages, so blocking would
  // fail every build before that NAP change is approved and made.
  // Matches THREE forms, all of which were live after the first sweep "finished":
  //   1. literal ampersand   "EnviroCare Pest & Termite Services"
  //   2. HTML entity         "EnviroCare Pest &amp; Termite Services"  <- the footer,
  //      on EVERY page, including the copyright line. A literal-string sweep walks
  //      straight past this. Exactly the same blind spot as the &apos; possessive
  //      that let a guarantee claim survive on /mountain-brook.
  //   3. truncated           "EnviroCare Pest & Termite" (no "Services") -- /pricing,
  //      /what-pest-problem and /service-areas/madison page titles.
  // "Services" is optional in the pattern for exactly that reason.
  //   4. spelled out   'EnviroCare Pest and Termite Services'  <- generated copy
  //      used this on 2026-08-09, four times per page plus the title, across five
  //      city drafts. An ampersand-only pattern misses it entirely. This is the
  //      FOURTH encoding of one name; assume a fifth exists and match loosely.
  // WIDENED 2026-08-14 (ruling, item 3). The rule required the literal "EnviroCare"
  // immediately before "Pest & Termite", so /services shipped the retired name with a
  // different word in front of it and the guard never saw it:
  //     "Alabama Pest & Termite Services | ..."
  // The retired brand is the PHRASE "Pest & Termite Services"; what precedes it is not
  // the point. Now matches with any single word before it, or none. FIFTH encoding of
  // this one name, after literal-&, &amp;, truncated, and spelled-out "and".
  // TWO ALTERNATIVES, because "Services" can only be optional when "EnviroCare"
  // anchors it. Dropping the anchor AND keeping Services optional over-matched
  // immediately: "Pre-Construction Pest and Termite Treatment in Alabama" is a
  // descriptive H1, not the retired brand, and the first attempt flagged it.
  //   1. EnviroCare-anchored -> "Services" optional (catches the truncated titles)
  //   2. any/no prefix       -> "Services" REQUIRED (catches "Alabama Pest & Termite
  //      Services" while leaving "... Pest and Termite Treatment" alone)
  { pattern: '\\bEnviroCare Pest (&|&amp;|and) Termite( Services)?\\b|\\bPest (&|&amp;|and) Termite Services\\b', severity: 'warn',
    reason: 'retired name — appears on no sign, plate or letterhead',
    approvedInstead: 'per-location: "EnviroCare" (Alexander City, Alabaster, Huntsville), "EnviroCare Pest Services" (Birmingham)' },
];

/** Hard rules that need human judgment (auditor flags as WARN, not auto-block). */
export const SOFT_RULES: string[] = [
  'Mosquito: never guarantee or imply elimination ("mosquito-free", "eliminate mosquitoes").',
  'No public review counts ("289 reviews"). Star ratings OK. 4.9★ homepage only.',
  'No customer counts ("45+ Athens homes").',
  'No competitor names anywhere in public copy.',
  '$1M coverage is EnviroCareʼs own guarantee — never imply Corteva/manufacturer backing.',
  'Carpenter bees: existing customers only — never marketed to new customers.',
  'Tuscaloosa: NOT serviced — must not appear in any city list, footer, or nav.',
  'Contract/pricing: NEVER claim "no contract", "no long-term contract", "no agreement" or "cancel anytime" anywhere. Agreement practice is not uniform — some per-visit customers sign one, some do not. The $35/mo plan is a 12-month ACH billing agreement. State the two billing options only, and say terms are confirmed in writing before service starts. Initial fee: $150 standard, $79 current promo (do not hardcode the promo price in evergreen copy).',
];

/** Services EnviroCare does NOT offer — must not be marketed. */
// NOTE: rodent control IS offered (residential w/ regular pest control + commercial -
// restaurants, commercial, governmental; Phillip 2026-07-28). Only WILDLIFE is out.
export const SERVICES_NOT_OFFERED = ['bed bug', 'raccoon', 'squirrel', 'wildlife removal'];

/** Locked seasonal facts (the Lake Martin "April–October" mismatch is the bug to fix). */
export const SEASONS = {
  mosquito: { label: 'March–November', treatments: 9 },
};
