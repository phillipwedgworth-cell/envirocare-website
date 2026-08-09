# Verification of the third-party AI SEO report — Aug 9, 2026

An external AI report proposed ~150 critical technical fixes plus four other
workstreams. **Every technical claim in it was tested against the live site and the
repo. All of them are false.** Two of the five non-technical categories are credible.

This file exists so nobody pays for that work twice, and so nobody "fixes" a redirect
system that is already correct.

> **Independently re-checked in Claude Code, 2026-08-09.** Every testable claim below
> was re-run against the live site and the repo a second time. **All confirmed.**
> Two additions from that second pass are marked **[re-check]**. This is the only one
> of the three Aug-9 documents that held up under re-verification — the live-verification
> doc and the monitor playbook each contained claims that proved false.

---

## 1. The technical claims — all false

| Report claim | Tested | Result |
|---|---|---|
| ~50 pages missing unique titles / meta descriptions | 117 `page.tsx` files + 6 live pages | ❌ **116 of 117** have a `metadata` export. Every live page tested had a unique title *and* description. |
| ~50 pages missing the mobile viewport tag | root layout + live HTML | ❌ **`export const viewport` is in `app/layout.tsx`** — inherited by every page. Live HTML: `width=device-width, initial-scale=1, maximum-scale=5` |
| ~50 pages missing self-referencing canonicals | 117 files + 6 live pages | ❌ **115 of 117** use `alternates.canonical`. Every live page tested self-referenced correctly. |
| No page titles include a city | live + `data/cities.ts` | ❌ False. `/huntsville` → *"Pest Control **Huntsville AL** \| Termite & Mosquito Service \| EnviroCare"*. Also Birmingham, Madison, Mountain Brook, Greystone. |
| Only 8% of H1s include a city | live | ❌ `/huntsville` H1 = *"**Huntsville** Pest Control & Termite Service"* |

The two pages without full metadata are `/approve` and `/ads/[id]` — **internal admin
routes that are correctly `noindex`** and should never have been crawled.

> **[re-check] Confirmed, and strengthened.** Counts reproduced exactly: 117 `page.tsx`,
> **116** with `metadata`, **115** with `alternates`, `viewport` at `app/layout.tsx:65`.
> Independently, a scan of **all 156 URLs in the live sitemap** found **zero** pages
> missing a title, meta description, canonical, or `<h1>`, and **zero** duplicate `<h1>`.
> That is a much larger sample than the 6 pages tested here and it agrees completely.

> ### ⚠️ [re-check] The blind spot between the false claim and its rebuttal
>
> The report said these tags were **missing**. They are not — that is settled. But
> nobody checked their **length**, and there is a real problem there:
>
> | Finding | Count | Worst |
> |---|---|---|
> | `<title>` over 65 chars | **56 of 156** | `/birmingham` at **91**, `/blog/cockroach-control-alabama` 76, `/wdo-inspection-letters-alabama` 75 |
> | meta description over 165 chars | **15 of 156** | `/wdo-inspection-letters-alabama` **238**, `/` **236**, `/birmingham` **226** |
>
> Google truncates rather than penalises, so this is a **click-through** issue, not a
> ranking one. It is nowhere near the report's "~150 critical" framing. But it is a
> genuine finding that a false claim and a correct rebuttal between them both hid.
> `/birmingham` at 91 characters is the obvious first fix.

### Why the numbers were probably identical

"~50 / ~50 / ~50" is the signature of **the same ~50 URLs failing all three checks** —
i.e. URLs that returned something other than parseable HTML. The obvious candidate was
the legacy Scorpion URL set. **That turned out to be wrong too — see §2.**

Given titles, descriptions, viewport and canonicals are all demonstrably present, and
legacy URLs all resolve, there is **no verified basis for the ~150 figure.**

---

## 2. ✅ CLOSE ITEM A11 — the legacy 404s were fixed

THE LIST (Jul 25) item **A11**: *"60+ blog posts + pest library were supposed to get
redirects before DNS flip. The flip already happened. Those are live 404s bleeding link
equity right now."*

**No longer true.** Nine legacy URLs tested live Aug 9 — **zero 404s:**

| Legacy URL | Resolves to | Correct? |
|---|---|---|
| `/blog/2023/june/how-to-spot-termites-in-your-home/` | `/blog/how-to-identify-termites-alabama` | ✅ **topic-matched**, not dumped on the index |
| `/blog/2022/` | `/blog` | ✅ |
| `/where-we-service/birmingham-al-pest-control/insect-control/` | `/services/pest-control` | ✅ |
| `/where-we-service/birmingham-al-pest-control/` | `/birmingham` | ✅ |
| `/photo-gallery/` | `/` | ✅ |
| `/site-map/` | `/` | ✅ |
| `/pest-library/termites` | 200, own canonical | ✅ |
| `/huntsville` · `/services/pest-control` | 200, own canonicals | ✅ |

**A11 can be marked done.** It has been stale for some weeks.

> **[re-check] Confirmed — with one correction to the hop count.**
> Legacy URLs **with a trailing slash take 2 hops**, not 1:
>
> ```
> /blog/2023/june/how-to-spot-termites-in-your-home/   -> 2 hops -> /blog/how-to-identify-termites-alabama
> /blog/2023/june/how-to-spot-termites-in-your-home    -> 1 hop  -> /blog/how-to-identify-termites-alabama
> /where-we-service/birmingham-al-pest-control/        -> 2 hops -> /birmingham
> /where-we-service/birmingham-al-pest-control         -> 1 hop  -> /birmingham
> ```
>
> The trailing slash is stripped first (308), then the real redirect fires. **Scorpion
> built every URL with a trailing slash**, so the actual inbound backlinks are landing
> on 2-hop chains. Equity still passes — Google follows chains of this length and 308
> is permanent — so this is **not** a defect and must not be "fixed". It is recorded
> because a 2-hop chain is easy to mistake for a misconfiguration.
>
> **A11 cannot be closed in a file:** `THE-LIST-Jul25.md` **does not exist anywhere in
> the repo.** Whoever holds it should close A11 there.

---

## 3. 🔴 Do NOT "fix" the redirect system — it is deliberate

Anyone told to "add redirects for the legacy URLs" will break working behaviour. The
design is documented in the code and is correct:

- **Legacy blog URLs are owned by `middleware.ts`, not `next.config.ts`.** The
  middleware 301s each legacy post to the **best-matching live post by topic keyword**
  (recluse, termite, roach, spider, tick, mosquito, silverfish, cricket, centipede,
  ant), and sends year/month archives to `/blog`. That recovers intent instead of
  dumping ~80 URLs on an index page.
- **The old blanket `/blog/{2022..2026}/:path*` config redirects were deliberately
  removed.** The code comment explains why: *"a config redirect could otherwise shadow
  the middleware before it runs."* Re-adding them would silently disable the
  topic-matching.
- **`/reviews` and `/special-offers` must NOT be redirected.** Both are real, ranking,
  converting pages. `next.config.ts` carries explicit `NOTE:` comments saying so. The
  June coverage map lists them as gaps — **that map is out of date.**
- 96 redirect rules are already live, including apex→www and three alternate domains.

**`monitoring/scorpion-url-coverage.md` (Jun 10) is superseded.** Its "gaps" were
either closed or intentionally left open.

> **[re-check] Actioned.** `/reviews` and `/special-offers` re-confirmed live at **200**.
> A ⛔ SUPERSEDED banner has been prepended to `monitoring/scorpion-url-coverage.md`
> naming all three traps, so the stale gap list cannot be actioned by someone who
> opens that file without this one.

---

## 4. What in the report IS worth acting on

### ✅ Internal linking and navigation — credible

*37% of service pages linked from the homepage, 2% in main nav.* Consistent with what
we already knew: four pages existed **only in the sitemap** until Aug 8. The proposed
fix — a **Services mega-menu + Locations menu** — is already scoped as **Task 2** in the
code queue. This one is right and should be built.

> ### ⚠️ [re-check] BUILT — but it is worth materially less than implied
>
> Shipped Aug 9: Services and Service Areas submenus, 47 links, native
> `<details>`/`<summary>` so every link is in server HTML without JS and `<summary>` is
> keyboard-accessible for free. Verified in the **build output**, not just source.
>
> **"2% in main nav" is true but misleading. The FOOTER already links almost all of
> these sitewide.** Diffing built pages against live, only **8 of 35** nav targets were
> not already linked from every page:
>
> `/services/sentricon` · `/services/wdo-letters` · `/mt-laurel` · `/hartselle` ·
> `/harvest` · `/hampton-cove` · `/dadeville` · `/eclectic`
>
> Real internal-link delta is **+5 unique URLs per page, not +35**. Two of the eight
> (sentricon, wdo-letters) are commercially significant and grouping cities by
> servicing office is a genuine UX gain — but **no ranking move should be expected
> from this alone**, and it should not be billed as if 35 pages were orphaned.
>
> One route was deliberately excluded: **`madison`** is defined in `data/cities.ts` but
> has no `app/madison` page, so linking it would have put a 404 in the nav.

### ✅ Citations — credible

*~21% of directories have no listing, only 7 fully consistent, phone matches on 8.*
Consistent with everything verified independently: six live name variants, the dead
(205) 649-5278, lawn contamination on YellowPages/Birdeye/Nextdoor/Angi, and BBB filed
under `weed-control-services`.

**Useful specifics — competitor directories worth pursuing:** `shelbychamber.org`
(a chamber link is a genuine local signal and cheap), `macraesbluebook.com`,
`cityof.com`, `threebestrated.com`.

⚠️ Note the report says "standardize NAP via Active Sync." Active Sync is already on
for gmb, facebook, bing and appleMaps on all three locations — **and it is currently
syncing out a banned guarantee claim and the retired brand name.** Fix the descriptions
*first* (`EnviroCare-BrightLocal-Description-Rewrites-Aug9.md`), or Active Sync
propagates the error faster.

> **[re-check] This warning is correct and just got more urgent.** The weekly monitor
> found the **Huntsville GBP description was rewritten on 2026-08-08**. It dropped
> *"Huntsville, Madison, and North Alabama"* for *"across Alabama"* and dropped
> *"up to $1 million"* — losing exactly the local terms that listing needs, while
> **keeping** "Founded in 1958", the retired name, and "guarantee".
> See `claude/EnviroCare-Monitor-2026-08-09.md`. Do not run a NAP standardization push
> until the descriptions are fixed.

### ⚠️ GBP — right instinct, wrong unit

The report treats GBP as **one profile at 4.7★ / 253 reviews**. There are **three**:

| Location | Reviews | Rating | Photos |
|---|---|---|---|
| Alabaster | 247 | 4.7 | 7 |
| Alex City | 39 | 4.8 | 8 |
| **Huntsville** | **34** | **5.0** | **5** |

Averaging hides the point. **Huntsville is the one that matters** — it already appears
at 20 of 25 grid points and still earns **0.00% SoLV** (average rank ~16). Reviews are
the lever there, not visibility. Photos and posting cadence should be planned
per-location.

The **6 May 2026 complaint about missed visits and billing**, plus two lateness
mentions, could not be verified from here — but an unanswered complaint of that kind is
worth attention regardless of the rest of the report.

> **[re-check]** There is now a **fourth** office — Birmingham, 2120 16th Ave S Ste 302,
> (205) 991-2882 — with **no GBP at all**. It is not in this table because it does not
> exist on Google yet. Creating it is the single largest GBP item outstanding.

### ✅ Backlinks — directionally right, unmeasurable here

Authority below Orkin and Mosquito Authority is certainly true. 8–12 quality local
links per quarter is a reasonable target. **Magnitude cannot be verified** — the Ahrefs
API returns `Insufficient plan` on every endpoint.

### ✅ One piece of the remedy is right anyway

*"Request a re-crawl in Google Search Console."* Still worth doing — not for meta tags,
but because `/where-we-service/birmingham-al-pest-control/` still shows the cached SERP
title *"Envirocare Lawn & Pest Services NEW staging"* even though the live page is
clean.

---

## 5. Also confirmed while testing

The live homepage title still reads **"EnviroCare Pest & Termite Services — Family-Owned
Alabama Since 1958."** The rename is correct in the patch but **the patch is not
merged**, so the retired name is still what the public and the crawlers see.

> **[re-check] Confirmed live, and the blocker is named.** The retired string is the
> sitewide `BRAND_NAME` in `lib/schema.tsx`, feeding Organization JSON-LD on all 156
> pages; 47 files reference it. The **writing rule** has been fixed so agents stop
> generating it (`agents/lib/compliance.mjs`), and a `warn`-level guard now flags it.
> The 47-file sweep is **deliberately not done** — it is an outward-facing NAP change
> and the decision doc it cites, `EnviroCare-Name-Decision-FINAL-Aug9.md`, **is not in
> the repo**. Needs Phillip's confirmation, not another document asserting it.

---

## Sources

- Live fetches of 9 URLs on `www.envirocarellc.com`, 2026-08-09
- Repo audit: all 117 `app/**/page.tsx`, `app/layout.tsx`, `next.config.ts` (96
  redirects), `middleware.ts`, `app/robots.ts`, `data/cities.ts`
- BrightLocal + Local Falcon APIs, read live 2026-08-09
- `monitoring/scorpion-url-coverage.md` (Jun 10, superseded) ·
  `claude/EnviroCare-THE-LIST-Jul25.md` item A11 — **note: this file is not in the repo**
- **[re-check]** Independent second pass in Claude Code 2026-08-09: all 156 sitemap
  URLs fetched and scanned; redirect hop counts traced with `curl -L`; nav links
  verified in `.next/server/app/*.html` build output. See
  `claude/SITE-AUDIT-2026-08-09.md` and `claude/EnviroCare-Monitor-2026-08-09.md`.
