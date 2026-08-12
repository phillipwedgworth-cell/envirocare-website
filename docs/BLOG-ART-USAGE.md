# EnviroCare blog graphics — usage + alt text (Aug 12, 2026)

> **STATUS: the six .webp files are NOT in this repo yet.** This document arrived via
> a patch whose binary blobs were truncated in transit, so the artwork could not be
> reconstructed. The alt text, placement map and compliance record below are complete
> and authoritative — they are the part worth keeping. Copy the files into
> `public/images/blog/` from the Cowork session (or re-export them) before referencing
> any of these filenames in a component, or the build will ship broken images.

Rendered deterministically per BRAND-ASSET-LOCK (Canva generate-design is banned for
EnviroCare artwork — 8 spec violations on Aug 10 test). Locked palette from
`app/globals.css`, Open Sans 400/700/800. 1600×900. Use the `.webp` on the site
(38–49 KB each); `.png` is the archive/social master.

## 1. alabama-pest-pressure-calendar.webp
Use on: every "pest control [city] al" page, seasonal posts, homepage blog teasers.
Alt text:
"Calendar chart showing when pest pressure peaks in Alabama by month — termites peak
March through May, mosquitoes and ticks June through August, fire ants and fleas
late spring through early fall."

## 2. termite-swarm-season-alabama-timeline.webp
Use on: termite control pages (Birmingham/Huntsville), Sentricon posts, spring content.
Alt text:
"Timeline of termite swarm season in Alabama — first subterranean termite swarms in
late February, peak swarm season March through May, and Formosan termite swarms on
warm nights in May and June."

## 3. how-sentricon-always-active-works.webp
Use on: sentricon termite system alabama page, termite service pages.
Alt text:
"Four-step diagram of how the Sentricon Always Active termite bait system works —
stations installed around the home, termites find the bait first, workers spread the
bait through the colony, and protection stays active year-round."

## 4. mosquito-tick-treatment-season-alabama.webp
Use on: mosquito control birmingham/huntsville pages, tick control page, spring/summer posts.
Alt text:
"Chart of mosquito and tick season in Alabama showing the March through November
treatment window, with peak activity from June through August."

## 5. fire-ant-activity-alabama-by-month.webp
Use on: fire ant control alabama page, spring and fall posts.
Alt text:
"Bar chart of fire ant activity in Alabama by month — mounds appear after spring
rains, activity stays high May through September, with spring and early fall as
the best treatment windows."

## 6. wdo-letter-alabama-real-estate-explained.webp
Use on: wdo letter inspection alabama page, real-estate/realtor content.
Alt text:
"Four-step diagram explaining a WDO letter for Alabama real estate — a home sale
triggers the request, a licensed inspector checks for wood-destroying organisms,
findings go on Alabama's official wood infestation report, and the report clears
the sale to close."

## Compliance check (all six)
- No guarantee/elimination promises; no $ coverage claims (those need the full
  qualifier — kept off artwork entirely)
- "Fourth-generation" not stated (no generation claims on artwork); 1958 not attached
  to the entity anywhere
- No banned services (bed bug / wildlife / lawn) depicted or named
- No Corteva attribution in copy; "Certified Sentricon Specialist®" status line only
- Footer: "EnviroCare Pest Services · envirocarellc.com" (current name, capital C)
- Approved "March through November" wording matches listing descriptions verbatim

Note the third bullet is the same rule that `data/compliance.ts` enforces in text and
that the Aug 12 guard widening closed for prose: 1958 attaches to the FAMILY, never to
the entity. Artwork was authored correctly on that point.

## Repo placement
`public/images/blog/` — reference via `next/image` with width/height set to avoid CLS.
Filenames above are final (keyword-bearing, kebab-case).

## Suggested first placements
- `termite-swarm-season-alabama-timeline` → `blog/alabama-termite-swarm-season` + `blog/termite-season-2026-alabama`
- `mosquito-tick-treatment-season-alabama` → `services/mosquito`, `services/tick-control`, `blog/mosquito-season-birmingham-al`
- `alabama-pest-pressure-calendar` → city pages / homepage blog teaser
- `how-sentricon-always-active-works` → `services/sentricon`, `services/termite-control`
- `fire-ant-activity-alabama-by-month` → `services/fire-ant`
- `wdo-letter-alabama-real-estate-explained` → `services/wdo-letters`
