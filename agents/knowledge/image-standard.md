# EnviroCare — Social Image Standard

> **HARD CONSTRAINT FOR EVERY AGENT.** Injected into your prompt via
> `agents/lib/knowledge.mjs`. Before selecting, generating, or approving ANY image
> for a post, page, or profile: check §4 first. A single failure blocks publish.
> You may NEVER generate an image of a vehicle, uniform, employee, or building —
> see §0. If asked to, refuse and say why.

**v1 · Aug 7, 2026.** Any image published to Google Business Profile, Facebook,
Instagram or X must pass every section below. If it fails one line, it does not
ship. No exceptions for "it's just a quick post."

---

## 0. What is actually in the library

### ❌ `truck.jpg` — COMPLIANCE FAILURE, not just ugly

Phone snapshot in a parking lot: blank warehouse wall, cracked asphalt, traffic
cones, competitor-colored building in frame, hard midday shadow, flat side-on
angle. Reads as a used-car listing.

The service icons on the bed panel read **Lawn · Pest · Termite · Mosquito**.
**"Lawn" is on the truck.** EnviroCare does not do lawn care, and Google's AI
Overview already calls it *"a lawn care and pest control company."* Publishing
this to three Google Business Profiles feeds the exact problem the citation
cleanup is trying to kill — same finding as the door sign, on a vehicle, in a
photo we control.

### ❌ `truck-lifestyle.webp` and `technician-envirocare.webp` — AI FAKES

- The "truck" wears a **Chevrolet bowtie grille** on a body shaped like the Ford
  Maverick EnviroCare actually drives. Wheels, badging and panel gaps do not
  resolve. Its tagline renders **"No One Cares Like Envirocare"** — lowercase c,
  the exact NAP capitalization error being chased across GBP and citations.
- The technician is a composited stock figure on a generated interior.

**Rule: never publish a generated image of a vehicle, a uniform, an employee, or
an office.** Customers in Alexander City know what the truck looks like. A fake
one is worse than no photo.

> **STATUS 2026-08-07:** `technician-envirocare.webp` was found LIVE on
> `/contact-us`, directly beneath the headline "A real Alabama technician at your
> door" with alt text calling it an EnviroCare technician — a fabricated person
> presented as real. Replaced with `sentricon-install.webp` (a genuine field
> photo). `truck.jpg` and `truck-lifestyle.webp` are NOT referenced by any page.
> The files remain in `public/` — do not reintroduce them.

### ⚠️ Under 900px on the long edge — usable, not preferred
`home-southern.jpg` · `sentricon-install.webp` · `kevin.jpg`

### ✅ Safe to publish
`family-yard.jpg` · `hero-family.jpg` · `lake-martin-aerial.jpg` ·
`lake-home-hero.jpg` · `termite-damage.jpg` · `ribbon-cutting-1.jpg` / `-2.jpg`

---

## 1. Technical — hard fails

| Rule | Value |
|---|---|
| Format | JPG or PNG. **Not WebP** — GBP rejects it. (WebP is fine on the website.) |
| GBP hard minimum | 250 × 250 px, 10 KB – 5 MB. Below this Google rejects the post. |
| **Quality target** | **1200 × 900 px.** Never upscale a smaller file to hit it. |
| Aspect ratio | 4:3 or 1:1. GBP crops to 4:3 and will cut a 16:9 image. |
| File size | Under 5 MB. |
| Safe zone | Nothing important in the outer 10% — GBP crops it. |
| Focus | Subject tack sharp. No motion blur, no phone-zoom mush. |
| Hosting | Publicly fetchable URL, no login. |

> ⚠️ **Nothing in the library hits 1200 × 900.** Largest usable JPGs are
> `family-yard.jpg` (1400×788), `hero-family.jpg` (1360×765),
> `lake-martin-aerial.jpg` (1000×563) — all short on height, all 16:9, all
> cropped by Google. Only **six** usable JPGs exist, which is why the calendar
> alternates two images per market. That is a library problem, not a design one.

## 2. Composition

- Golden hour or open shade. No midday sun, blown highlights, or black shadows.
- Shoot the truck **three-quarter, camera at headlight height**, front wheels
  turned slightly out — not standing up looking down at the door.
- The background is half the photo: a real Alabama home, driveway, landscaping.
  Never a parking lot, warehouse wall, dumpster, cones, or other signage.
- One subject: truck *or* technician *or* the house.
- Keep the top third calm — Facebook and Instagram crop tighter than GBP.
- People look at people. A real technician at a real house beats a parked truck.

## 3. Brand

- Wordmark is **EnviroCare** — capital E, capital C. Wrong capitalization in
  frame = the photo is wrong.
- Sunflower logo, green `#0A7935`, gold `#F5A800`.
- Tagline: **"No One Cares Like EnviroCare."**
- No competitor vehicles, signage, or storefronts in frame.

## 4. Compliance — check before EVERY publish

- ❌ **No "Lawn" anywhere in frame** — wrap panel, door sign, yard sign, shirt,
  clipboard. Highest-priority visual check.
- ❌ No bed bug, wildlife, or honeybee imagery — services not sold.
- ❌ No phone number visible that could be the dead **(205) 649-5278**.
- ❌ No review count, star rating, or reviews badge.
- ❌ No price unless the ACH disclosure is in the caption.
- ❌ No generated people, vehicles, uniforms, or buildings.
- ✅ Customer's face in frame → written release on file, or don't publish.

## 5. 🔴 The fix that matters most

**Reshoot the truck.** One hour, golden hour, in front of a real customer's home
— and either re-wrap the "Lawn" panel or shoot from the passenger side /
three-quarter front so it is not in frame. Until then, use `family-yard.jpg`,
`hero-family.jpg` or `lake-martin-aerial.jpg` on truck-themed posts and skip the
vehicle entirely. A modern iPhone at golden hour beats every AI image in the
library — the problems are lighting, background and the Lawn panel, not gear.

## 6. Review gate

Two reviewers, because they fail differently: whichever model wrote the copy is
biased toward its own reading; a second model reading the image cold catches what
the author's eye skips. Run §7 before anything publishes. Anything other than
PASS does not ship.

## 7. Reviewer prompt — copy verbatim

```
You are a brand compliance reviewer for EnviroCare,
a family-owned Alabama pest control company (Alexander City, Alabaster,
Birmingham, Huntsville).

I am going to give you an image intended for a Google Business Profile or
Facebook post. Review it against the checklist below and answer in this exact
format:

VERDICT: PASS or FAIL
FAILURES: (numbered list, quote the specific rule, say what you see)
FIX: (one sentence, the cheapest thing that would make it pass)

Be strict. Default to FAIL when uncertain. Do not be encouraging.

CHECKLIST

A. Authenticity
1. Is this a real photograph, or AI-generated / composited? Look hard at
   vehicle badges and grilles, wheels, hands, text on clothing and signage,
   panel gaps, and background architecture. If any of it does not resolve
   correctly, FAIL.
2. If a vehicle is shown, is the badging internally consistent? EnviroCare
   drives a Ford Maverick. A Chevrolet grille on a Ford body is a FAIL.

B. Compliance — highest priority
3. Does the word "Lawn" appear ANYWHERE in the image — vehicle wrap panel,
   door sign, yard sign, uniform, paperwork? EnviroCare does not do lawn care
   and Google already miscategorizes them as a lawn company. Any visible
   "Lawn" is an automatic FAIL.
4. Any bed bug, wildlife, or honeybee imagery? FAIL — services not offered.
5. Any visible phone number, review count, star rating, or price? FAIL.
6. Any competitor's vehicle, signage, or storefront in frame? FAIL.

C. Brand
7. Is the wordmark spelled "EnviroCare" with a capital E AND a capital C?
   "Envirocare" is a FAIL.
8. Tagline, if visible, must read "No One Cares Like EnviroCare."

D. Craft
9. Lighting: golden hour or open shade. Harsh midday sun, blown highlights,
   or crushed shadows = FAIL.
10. Background: a real home, driveway, or landscaping. A parking lot,
    warehouse wall, dumpster, traffic cones, or blank industrial wall = FAIL.
11. Sharpness: subject tack sharp, no motion blur or digital-zoom mush.
12. Framing: if a vehicle, three-quarter angle at roughly headlight height —
    not a flat side-on shot from standing height.
13. Resolution and shape: at least 1200x900, 4:3 or 1:1. Nothing important in
    the outer 10 percent, because Google crops it.

Now review the attached image.
```

## 8. Workflow

1. Write the post copy, pick the image, run the text compliance scan (banned
   phrases, pricing, ACH disclosure, **no phone numbers — GBP rejects captions
   containing them**).
2. Second model reviews the image against §7 → PASS or FAIL.
3. Any FAIL → fix or swap, re-review. Never override.
4. Both PASS → build the CSV → OneUp bulk upload → Submit.
5. Log what shipped in `agents/knowledge/content-ledger.md` the same session.

## Fabricated statistic — do not repeat (recorded 2026-08-09)

`EnviroCare-Visual-Template-System-Jul31.md` §4 attributes **"2.13 clicks vs 0.38
for stock"** to Sterling Sky. The article was fetched 2026-08-09 and **contains no
such figures** — no click counts, no sample size. It reports qualitative case-study
observations only.

Same class as the retired `$32` price, the `$67`/`$127` tiers, and the
`ADAI-WDO-100` form number: a number that entered a doc, got quoted forward, and
was never re-verified. `agents/lib/compliance.mjs` bans uncited statistics for
exactly this reason.

**The mechanism still holds and is the part worth citing:** Google already has
copies of common stock files indexed, so uploading one adds nothing new. That is a
deduplication effect, not a penalty — and it is why stock is *invisible* rather
than *harmful*.

## Deleted 2026-08-09

`truck-lifestyle.webp` and `technician-envirocare.webp` are gone from `public/`.
They were unreferenced by any page but still returned **HTTP 200** — an orphaned
file in `public/` is a published URL. Both showed a Chevrolet grille on a Ford
Maverick body and a lowercase "Envirocare" wordmark.

Enforced by `npm run test:imagery`. Recoverable from git history; do not restore.

## truck.jpg — read the photo before editing it (2026-08-09)

`public/truck.jpg` is a REAL photograph and a genuine asset. **Do not delete it**
(unlike the two AI fakes above). It is currently unreferenced by any page but still
returns HTTP 200.

Two things visible in the frame, confirmed by opening it rather than by description:

**1. The door reads "EnviroCare PEST SERVICES."** This independently corroborates the
2026-08-09 naming ruling from a physical vehicle rather than a document — the published
brand name is on the truck. See `docs/decisions/name.md`.

**2. The four-icon strip reads Lawn · Pest · Termite · Mosquito.** The "Lawn" tile is on
the ACTUAL WRAP, on four vehicles driving around Alabama.

> ⚠️ **Patching "Lawn" out of the photograph does not make the trucks compliant.**
> `data/compliance.ts` bans marketing lawn care, and `SERVICES_NOT_OFFERED` excludes it,
> yet the fleet advertises it. This is an OPERATIONS question, not an image question, and
> only Phillip can settle it:
>   - if lawn care is NOT offered, the wraps carry a service claim the rules forbid, and
>     the fix is vinyl, not Photoshop;
>   - if it IS offered, `data/compliance.ts` is wrong and the rule should change.
>
> Editing the photo makes the marketing look consistent while the discrepancy stays on
> the road. Record which way it goes; do not quietly keep patching the image.
