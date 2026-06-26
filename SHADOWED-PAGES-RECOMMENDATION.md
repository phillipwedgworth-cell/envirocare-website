# Shadowed Pages — Recommendation & Handoff

> Context for the next developer (or Claude). Created during a site QA sweep on the
> `website-edits-and-suggestions` branch.

## What "shadowed" means here

Six routes have a **fully built page file** in `app/`, but `next.config` redirects the
URL somewhere else — so the built page is **never reachable**. That's the worst of both
worlds: we maintain the page but get zero traffic, trust, or conversion value from it.

**Guiding principle:** every published page should either earn traffic, earn trust, or
convert a lead. If it can't do one of those, redirect or remove it. If it can, it should
be live.

## The six pages

| Route | Currently redirects to | Recommendation |
|---|---|---|
| `/services` | `/services/pest-control` | **Un-shadow (make live)** |
| `/special-offers` | `/quote` | **Un-shadow (make live)** |
| `/realtor` | `/services/wdo-letters` | **Un-shadow (make live)** |
| `/bundle-services` | `/quote` | Keep redirect (revive only if it becomes a real info page) |
| `/services/crawlspace` | `/services/termite-control` | Keep redirect (consolidate) |
| `/services/real-estate-wdo` | `/services/wdo-letters` | Keep redirect (consolidate) |

## Why

### Make live
- **`/services`** — A services hub/index is a page customers and Google expect. It's the
  natural "shop our offerings" page and a strong ranking target for broad terms
  (e.g. "pest control services Birmingham"). Redirecting it to a single service wastes
  the best internal-linking hub on the site.
- **`/special-offers`** — Promotions/coupons pages convert very well in home services;
  people search "pest control deals near me." This is a money page.
- **`/realtor`** — Realtors are a recurring, high-value B2B referral channel (every closing
  needs a WDO/termite letter). A dedicated page builds that relationship and ranks for
  queries like "realtor termite letter Alabama."

### Keep redirected
- **`/services/crawlspace`** and **`/services/real-estate-wdo`** overlap with the termite
  and WDO-letter pages. Two pages targeting the same term causes keyword cannibalization;
  consolidating is the correct SEO move.
- **`/bundle-services`** overlaps with the quote/estimator flow. Only revive it if you want
  a genuine *informational* page about bundle savings (not another calculator).

## Implementation checklist (best practices)

When **un-shadowing** `/services`, `/special-offers`, `/realtor`:
1. Remove the corresponding redirect entry in `next.config`.
2. Confirm each page has proper `metadata` — unique `title`, `description`, and a
   `canonical`. These pages may have thin/missing SEO tags since they were never indexed.
3. Add internal links from the nav and/or footer to each newly-live route. A live page with
   no internal links won't rank and just dilutes the site.
4. Verify any existing links that previously assumed the redirect now point to the live URL.

When **keeping** the other three redirected:
1. Use **permanent (308/301)** redirects, not temporary (307), so SEO value passes to the
   destination. (Today some resolve as 307 — verify and make permanent.)
2. Once confirmed, the three shadowed page files can be deleted as dead code.

## Related cleanup (separate, still pending)

There are ~15 unused `components/pages/*.tsx` city files (e.g. Eclectic, Madison,
PestControlService, TickService, Auburn, Huntsville) that are **not imported anywhere**.
They're dead code and safe to delete in a cleanup pass — verify with a project-wide import
search before removing each one.
