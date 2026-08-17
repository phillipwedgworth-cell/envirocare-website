# Social / GBP content benchmark — competitor & industry practice

**Standing reference. Read this BEFORE authoring new social or GBP content.**
Sourced from live web research 2026-08-17, not assumed. Per Phillip's instruction to
check how competitors and the industry actually market before building our own.

Sources:
- [Pest Control Social Media Marketing: A Guide for Busy Operators](https://apaya.com/blog/pest-control-social-media-marketing) — Apaya
- [Advanced Google Business Profile Optimization for Pest Control](https://cubecreative.design/blog/pest-control-marketing/advanced-gbp-optimization-pest-control) — Cube Creative

---

## 1. Real photos beat template graphics. Always, when one exists.

> "Avoid generic stock photos like the plague — authentic images of your actual
> business perform significantly better."

Trades content on Instagram runs **4.40% engagement, the highest of any tracked
industry** — and that is real job documentation, not polished design.

**Rule:** a real photo of an actual job beats a template graphic whenever one exists.
The deterministic brand render is the correct fallback for topics with no photo, not
the default choice.

This independently confirms the 2026-08-17 image audit. Two of the seven "approved"
images were watermarked Adobe Stock previews (one deleted, see below), and two more
were the same generic stock burst cropped differently. The problem was never only
licensing — generic stock is the wrong direction on performance grounds too.

**Current usable library is 3 files**, and the benchmark ranks them clearly:
- `ribbon-cutting-1.jpg` / `-2.jpg` — real event photos, real signage. **Best
  category available.** Use one, never both together.
- `termite-damage.jpg` — real macro, on topic. Good.
- `family-yard.jpg` / `hero-family.jpg` — generic stock, same photo burst. Exactly
  what the guidance says to avoid. Licensed and safe, but weakest performers.
- `lake-martin-aerial.jpg` — **DELETED 2026-08-17**, watermarked Adobe Stock preview
  (asset #458955959 visible in the pixels). Unlicensed. Never restore it.
- `truck.jpg` — never publish. Shows a "Lawn" service panel; EnviroCare does not do
  lawn care, and that false-category signal is being chased across GBP and citations.
- `truck-lifestyle.webp`, `technician-envirocare.webp` — AI-generated fakes with
  visible tells (wrong grille badge, lowercase-c "Envirocare" typo baked in). Also:
  **no WebP anywhere on GBP — it hard-rejects the format.** JPG/PNG only, 1200×900.

**The reshoot remains the highest-leverage single action available** — truck, crew,
office, one hour, golden hour. Every prior doc reached this conclusion and the
benchmark reaches it independently: the photo library is the bottleneck, not the
copy, not the cadence, and not the tooling.

## 2. Post seasonal content ~6 weeks BEFORE the pest peaks

Not once it is already active. The reasoning is operational, not aesthetic: by the
time a pest is visibly active, technicians are already booked on it, so a reactive
post generates leads there is no capacity to convert.

The existing fire-ant post is reactive ("Fire Ants Are Back", mid-August, ants
already out). Fine as a one-off. If fire ants become a recurring wheel slot, next
year's version ships ~6 weeks ahead.

## 3. CTAs: specific and action-oriented

"Call now" and a concrete appointment path outperform "when works for you?". The GBP
`Call now` button setup already does this — no change needed.

## 4. Educational and identification hooks tend to beat straight sell copy

"What we found", pest-vs-pest comparisons ("termites vs. carpenter ants"), "5 signs
you might have X". Worth testing against the value-prop headline style currently in
use ("One Treatment. One Year.").

## 5. Cadence is not the weak point

Stated floor is 2–3 GBP posts/month. Current cadence is 3×/week GBP plus 2×/week
Facebook — well above it. Confirms the gap is imagery, not frequency.

## 6. Imagery that performs when real photos exist

Before/after exclusion work · entry-point close-ups with a scale reference (a pencil
beside a gap) · staff in uniform · branded vehicle shots.

**None of these exist in the library yet.** This is the shot list for the reshoot.

## 7. Local specificity converts where people are already asking

Facebook neighbourhood groups ("anyone know a good exterminator?") convert directly.
GBP works as the verification landing page once someone is already looking. Not
actionable today; relevant if a community-engagement channel joins the wheel.

---

## What this does NOT change

Nothing here overrides `agents/lib/compliance.mjs`, `data/compliance.ts` or
`ENVIROCARE-CANONICAL-FACTS.md`. Competitor practice is a **tactics layer on top of
the guardrails, never a reason to bend them.**

An educational "5 signs" post still cannot use elimination language, uncited
statistics, or banned pricing framing. A "what we found" job photo still cannot show
a service EnviroCare does not offer. If a tactic here and a compliance rule conflict,
the compliance rule wins and the tactic gets dropped.
