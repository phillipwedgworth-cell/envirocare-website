<!-- BEGIN:nextjs-agent-rules -->
# SINGLE REPO — READ FIRST

**The only live repo is `phillipwedgworth-cell/envirocare-website`.**

**Live site: https://www.envirocarellc.com** — always use this host in agents,
scrapers, audits and tests.

Do NOT use `https://envirocare-web.vercel.app` or any `*.vercel.app` deployment
URL. The alias 308-redirects to www (verified Jul 26 2026) and preview URLs sit
behind Vercel Authentication, so anything that fetches them measures a redirect
or a login screen. This file previously named that host as "live", which is how
three scheduled agents (site-reviewer, neuronwriter-qa, neuronwriter-optimize)
ended up auditing the wrong site for months and reporting a page-speed "crisis"
that no independent check could reproduce. Fixed 2026-07-25.

The Vercel project serving the live domain is `envirocare-web-only-testing`
(the name is misleading — it IS production, and it holds the Upstash KV chatbot
store). Do not move the domain off it. See `claude/WHICH-VERCEL-PROJECT-IS-LIVE.md`.
The old repo `envirocare-web` is archived at `phillipwedgworth-cell/zz-ARCHIVED-envirocare-web-OLD` — never push there.
Local primary clone: `C:\Users\pwedg\Desktop\Envirocare Stuf\envirocare-website-deploy\`

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AGENTS.md — EnviroCare, LLC

Context for any AI agent working on this repo or this account.
Vercel agent, Claude Code, and Cursor all read it.

**Last verified: Jul 26, 2026.** Re-verify anything older than 30 days.

---

## Rule zero: verify before you conclude

This project has repeatedly lost time to agents reasoning from stale documents
instead of live data. On Jul 25 alone, five confident conclusions were wrong:

| Claim | Reality |
|---|---|
| "Gemini and Grok were never scanned" | They had been scanned that same morning |
| "City pages are too thin to rank" | The 0% pages are the *deepest* pages |
| "Huntsville's problem is review volume" | Competitors with 15–37 reviews outrank it |
| "`/huntsville` has never been crawled" | It is indexed — the export was stale |
| "Legacy `/where-we-service/*` return 200" | They resolve to the new pages |

**Therefore:**

1. **Check the live source before stating a conclusion.** GSC Coverage exports
   lag by weeks — always confirm a specific URL with live URL Inspection.
2. **Correct the existing doc. Do not write a new one.** This project has 200+
   docs with contradictory conclusions coexisting.
3. **State what you verified and when.** "Checked live Jul 25" beats a
   confident assertion.
4. **Report actual status codes and raw values**, not browser impressions.

---

## Business facts

- **EnviroCare, LLC** — family-owned Alabama pest control, founded 1958, fourth
  generation (Wedgworth family). Formerly "Lex Wedgworth Pest Control Inc."
- Canonical brand name: **EnviroCare, LLC**. Not "Envirocare", not "Enviro Care".

### Four locations (the first three GBP-verified as of Jul 25 2026)

| Office | Address | Phone | Store code |
|---|---|---|---|
| Alabaster (Birmingham metro) | 2025 Butler Rd, Alabaster, AL 35007 | (205) 940-6360 | 62134 |
| Alexander City | 1785 Tallapoosa St, Alexander City, AL 35010 | (256) 234-6162 | 62135 |
| Huntsville | 7027 Old Madison Pike NW Ste 108, Huntsville, AL 35806 | (256) 937-7676 | 63766 |
| **Birmingham** (added 2026-08-05) | **2120 16th Ave S, Ste 302, Birmingham, AL 35205** | **(205) 991-2882** | — no GBP yet |

⚠️ **The Birmingham office has NO Google Business Profile yet** — Phillip is
creating one. Until it exists, do not describe it as GBP-verified and do not
expect it in Local Falcon / BrightLocal location data.

⚠️ **Naming trap in `data/offices.ts`:** the OfficeId `'birmingham'` is the
**Alabaster** office (named for the metro it serves). The city office is
`'birmingham-downtown'`. ZIP routing in `data/zip-to-office.ts` keys off the
former — do not rename it.

✅ **RULED 2026-08-12 (Phillip) — this is CLOSED. Do not "fix" it.**
**(205) 940-6360 is the PRIMARY company number.** (205) 991-2882 is the Birmingham
office direct line. The ~191 Birmingham-metro occurrences of 940-6360 are CORRECT
and intentional; leave them. This also closes nap-master.md open question #1 — yes,
940-6360 on all three LSA profiles is deliberate: it is the primary intake line.

Usage rules:
- **Primary / company-wide contexts** (site header, LSA profiles, general citations
  with no specific office, service pages not tied to one office): **(205) 940-6360**.
- **A NAP block's phone must match its address.** `2025 Butler Rd` pairs with
  **(205) 940-6360**. (`2120 16th Ave S, Ste 302` paired with
  **(205) 991-2882** — see the 2026-08-24 update below; that pairing is no
  longer published anywhere but `data/offices.ts`.) Never cross them. (Audited 2026-08-13 with a proximity scan: zero crossed pairs in the
  repo. Note a file-level grep is useless here — find-office, offices.ts, layout.tsx
  and ContactUs all legitimately list every office, so co-occurrence is normal and
  only same-block adjacency is a defect.)
- Office direct lines: Alabaster (205) 940-6360 · Alex City (256) 234-6162
  · Huntsville (256) 937-7676 · Auburn (334) 332-3321. Birmingham's
  (205) 991-2882 was retired from customer-facing pages on 2026-08-24 — see §4.

⚠️ **SUPERSEDED IN PART, 2026-08-24 (Phillip: "940 is the main line").** The
2026-08-12 ruling above still holds for 940-6360 being primary. What changed:
the whole Birmingham metro now displays 940-6360 / Butler Rd, so 991-2882 and
2120 16th Ave S no longer appear on any customer-facing page, in schema, or in
llms.txt. Butler Rd is the office with an actual Google Business Profile.

⚠️ **(205) 649-5278 is DEAD.** It still appears on the Thryv directory network
(YellowPages / YP / DexKnows / Superpages). Never reintroduce it.

`nap-master.md` and `ENVIROCARE-CANONICAL-FACTS.md` are the source of truth.

---

## Infrastructure

- **Vercel project:** `envirocare-web-only-testing`
  (`prj_bD63HstQIuOMn5cEGDK4RAW7yM2F`), team `team_e56vlWMynAPn6B3dI83AzgAD`.
  **Despite the name, this is production.** Serves `www.envirocarellc.com`,
  `envirocarellc.com`, `envirocare-web.vercel.app`.
- Next.js. Node 24.x.
- Canonical host: **`https://www.envirocarellc.com`** (www, https). robots.txt
  declares the www sitemap.
- GSC property: `sc-domain:envirocarellc.com` (domain property, covers both).

---

## Verified healthy — do not "fix" these

Checked live Jul 25 2026 (redirect + canonical items re-checked Jul 26):

- ✅ **No manual actions. No security issues.**
- ✅ All 3 GBP locations verified, correct category (Pest control service)
- ✅ `robots.txt` correct — GPTBot / ClaudeBot / PerplexityBot allowed; only
  `/api/`, `/approve`, `/command-center`, `/pay` disallowed
- ✅ Sitemap valid, read successfully, 131 pages
- ✅ llms.txt and schema in place
- ✅ City page content is strong (`/huntsville` ~3,000 words, 19 neighborhoods)
- ✅ Homepage links to every city page; `/find-office` exists and works
- ✅ **All legacy `/where-we-service/*` URLs are one-hop server-side permanent
  redirects (HTTP 308, from `next.config.ts` `redirects()`) — NOT client-side.**
  Verified with raw HTTP HEAD Jul 26 2026. Google treats 308 like 301; the GSC
  "Crawled – currently not indexed" classification predates these redirects.
- ✅ `/commercial-pest-control` → `/services/commercial` (one hop)
- ✅ Homepage self-referencing canonical shipped (`app/page.tsx`,
  `alternates: { canonical: '/' }`) with `metadataBase` set site-wide in
  `app/layout.tsx` — `?tid=` variants emit the correct canonical (verified
  live Jul 26 2026 against `/?tid=TESTPARAM123`).
- ✅ `envirocare-web.vercel.app` → 308 permanent redirect to www (Jul 26 2026)
- ✅ 4 noindex pages all intentional (`/coupons/print/`, `/privacy-policy/`,
  `/request-appointment/`, `/site-search/`)

**The 114 "Page with redirect" entries in GSC are correct behaviour, not a bug.**
Real external backlinks point at those old Scorpion URLs. Never remove them.

### Appended-domain URLs (investigated Jul 26 2026 — not a codebase bug)

The two malformed URLs (`/blog/2026/january/...-proble/www.envirocarellc.com`,
`sitemap.xml/envirocarellc.com`) came from the legacy Scorpion site's own
protocol-less links, not from this repo. Grepped every href/URL construction:
no concatenation bug exists; `app/sitemap.ts` builds all URLs from a single
`BASE_URL` constant. Live behaviour: the blog variant 301s to
`/blog/diy-pest-control-mistakes` via middleware; the sitemap variant 404s
(correct). Remaining cleanup is **manual**: delete the junk
`sitemap.xml/envirocarellc.com` submission in GSC (human-only, see guardrails).

---

## The actual constraint

Every independent line of analysis in July 2026 converged on the same thing:

**Off-site authority.** 178 backlinks, 51 referring domains, **zero editorial
links**, anchor text 100% directory boilerplate ("visit website"), 94% of links
pointing at the homepage.

Consequences that look like separate problems but are not:
- Alexander City wins Gemini (79.59% SAIV) because it is a 9-competitor market
- Birmingham scores 0% despite being indexed — 15 competitors, no corroboration
- Several city pages sit in "Discovered – not indexed" (crawl priority)

**Do not propose more content as the fix.** Tested and disproven Jul 25.

---

## Known open issues

1. ~~Client-side vs 301 redirects on legacy `/where-we-service/*`~~ —
   **disproven Jul 26 2026**: all are one-hop server-side 308 permanents.
2. ~~Homepage missing self-referencing canonical~~ — **resolved**; verified
   live Jul 26 2026.
3. ~~Appended-domain link bug~~ — **investigated Jul 26 2026, not a codebase
   bug** (see above). Open remainder: delete the junk sitemap entry in GSC.
4. Thryv directory record still publishing the dead phone number
5. Pending unreviewed Google update on the Huntsville GBP
6. `thepestadvice.com` lists the pre-rebrand name at the Alex City address

---

## Guardrails

**Never do without explicit human approval:**
- Change a GBP address, name, or category (risks re-verification)
- Accept or reject a Google-suggested profile update
- Remove existing redirects
- Submit or delete sitemaps in GSC
- Publish or deploy to production

**Tooling reality:** Ahrefs and Semrush are connected but have no API access
(insufficient plan / no units). Backlink and keyword data comes from Google
Search Console. Local Falcon and BrightLocal are live and have credits.

<!-- BEGIN:vercel-agent-code-review -->
# Code Review guidelines — EnviroCare compliance canon

Vercel Agent Code Review reads this file automatically. Everything below exists
because it has actually shipped to production and cost money to unwind. Treat a
match on any rule here as a **blocking** finding, same severity as a bug.

These are business-correctness rules a linter cannot catch. Bugs, security and
performance still come first — this is additional context, not a replacement.

## 1. The $1,000,000 termite coverage is EnviroCare's, never Sentricon's

This is the single most repeated error in this codebase. On 2026-08-24 a sweep
found **123 occurrences across 55 files**, including page `<title>` tags that
were live in Google results, and one comparison-table row reading
`sentricon: "$1,000,000 (Corteva)"`.

Sentricon® and Corteva make the bait system. **EnviroCare** backs the damage
repair coverage. Flag any diff where the dollar figure sits next to Sentricon or
Corteva without EnviroCare named as the provider in the same sentence.

- ✅ `up to $1,000,000 in termite damage repair coverage provided by EnviroCare, subject to the terms of the agreement`
- ✅ `Sentricon® baiting, $1M EnviroCare coverage`
- ❌ `Sentricon® $1M coverage`
- ❌ `$1,000,000 (Corteva)`
- ❌ any possessive: `Sentricon's guarantee`, `the Sentricon warranty`

Say **damage repair coverage** or **damage coverage**. Never **warranty** or
**guarantee** attached to the figure. Where the figure appears, `subject to the
terms of the agreement` should appear too.

## 2. Banned language — flag on sight

- **Safety claims.** No `safe`, `pet-safe`, `child-safe`, `eco-safe`,
  `non-toxic`, `EPA-approved`. The EPA **registers** pesticides, it does not
  approve them — "EPA-approved" is both banned and factually false.
- **Absolute claims.** No `unlimited` in marketing copy. No promise to
  *eliminate* mosquitoes — only *reduce* or *knock down*.
- **Availability claims.** No `same-day`, `available now`, `there today`,
  `24/7 service`. Routes are scheduled; the company cannot promise arrival.
- **`same technician` every visit.** Use `familiar local team`.
- **Public review counts.** Star ratings are fine. Counts are not — they drift
  and go stale (one page said 247 while another said 228 for the same office).
- **Competitor names.** Never in customer-facing copy.
- **Generation.** EnviroCare is **fourth generation**. Never third.

## 3. Retired services and areas — a diff reintroducing these is a regression

- **Tuscaloosa** is not a service area.
- **Crawlspace service** is retired. `/services/crawlspace` 301s to
  `/services/termite-control`. Do not add crawlspace as a sellable service —
  describing a crawlspace as a place termites enter is fine.
- **Bed bug** and **wildlife** are not offered.
- **Carpenter bee** is existing customers only.

## 4. NAP — phone numbers and addresses

| Market | Phone | Address |
|---|---|---|
| Birmingham metro (MAIN) | `(205) 940-6360` | 2025 Butler Rd, Alabaster |
| Alex City / Lake Martin | `(256) 234-6162` | 1785 Tallapoosa St, Alexander City |
| Huntsville / North AL | `(256) 937-7676` | 7027 Old Madison Pike Ste 108 |

- ☠️ **`(205) 649-5278` is a dead tracking number.** Any diff adding it is a
  blocking error.
- **`(205) 991-2882` and `2120 16th Ave S` are retired from customer-facing
  pages** as of 2026-08-24. That office has no Google Business Profile;
  publishing it worked against local rankings. The record survives in
  `data/offices.ts` only.
- A Birmingham-region page must never show the Huntsville number, or the
  reverse. Seven city pages had this wrong in their **meta descriptions**.

## 5. Pricing — `data/pricing.ts` is the only source of truth

Flag any hardcoded price in a component, page, blog post, chatbot prompt, or
JSON-LD block that contradicts it.

- Pest from **$35/mo** on ACH · **$75 initial service on Pest and on
  Pest + Mosquito**. **Complete is $229** — Phillip ruled on this directly on
  2026-08-24 when a pack tried to collapse it to $75. Read
  `plans.<plan>.startup`, never the bare `initialServiceFee`
- The $75 initial is **50% off a $150 regular price** — it is not a flat price
  that another discount can stack onto
- Mosquito **$45/month** for an average-size yard — eight treatments
  **March–October**, firm price after a free inspection, ACH spreads it evenly
  across the year. Mosquito + Tick is **$65/month**. Ruled 2026-08-26 (Phillip,
  with `service_canon.mosquito`); this REPLACES the old "$45/visit, nine rounds
  March–November" line. Flag any diff that reintroduces a per-visit or
  per-treatment mosquito price, a ninth treatment, or a derived second monthly
  figure such as "$30/month" or "$43.33/month" — $45 and $65 ARE the monthly
  prices now, so a second one contradicts them
- **Tick and flea are quoted, never priced on-page** (`listOnPricingPage: false`)
- **Termite is never a flat number.** Always "priced at inspection" or
  "subject to inspection"

Evergreen metadata should use the standing price (`$35/mo`), not the promo, so
it does not go stale when a promo ends.

## 6. Schema and metadata count as live copy

JSON-LD, `openGraph`, `twitter`, and meta descriptions are what Google prints.
Every rule above applies to them exactly as it applies to visible text. The
worst violations found in the 2026-08-24 sweep were in `<title>` tags and Offer
schema, not body copy.

## 7. AI imagery

Photorealistic AI depictions of EnviroCare trucks, technicians, or job sites are
banned. Illustrations, diagrams, and infographics are fine.
<!-- END:vercel-agent-code-review -->
