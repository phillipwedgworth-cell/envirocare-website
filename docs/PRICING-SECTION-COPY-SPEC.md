// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: docs/PRICING-SECTION-COPY-SPEC.md
// Commit: docs: pricing section copy spec — per-treatment/monthly toggle, Jun 11 model
// Push: main
// ─────────────────────────────────────

# Pricing Section Copy Spec — "Per Service ⇄ Monthly" Toggle
*Claude's panel vote, Jun 11 2026. Apply to the live pricing section (homepage + /quote). Pull real component from GitHub first — do not edit stale mockups.*

## Toggle behavior
Two states. Same three cards + Outdoor Pro. Only the price line and one sub-line change. Default state: **Monthly** (lower sticker = better conversion; per-service builds trust for skeptics).

Toggle labels: `Per Service` | `Monthly Plan` (already exists on page — keep, rewire numbers).

## Card copy — BOTH STATES

### Essential — Pest
- Monthly: **$35/mo** · "ACH autopay · cancel anytime"
- Per Service: **$70 per visit** · "bi-monthly · or $108 quarterly"
- Bullets (unchanged plus): ✓ Exterior-first treatment — you don't need to be home · ✓ 30+ pests · ✓ Unlimited free re-services · ✓ EPA-registered products applied per label directions
- Initial line under CTA: "*$150 initial — ask about our $99 new-customer rate*"

### Foundation — Pest + Termite (MOST POPULAR — keep badge)
- Monthly: **$67/mo** · "exactly what pest + termite cost separately — one tech, one invoice"
- Per Service: "Pest $70/visit + Sentricon® **$325 install** (includes year-1 guarantee) · $380/yr renewal"
- Bullets unchanged ($1M coverage etc.)

### Outdoor Pro — Mosquito + Tick
- Monthly: **$49/mo** · "($65/treatment × 9 treatments, billed evenly across 12 months)"
- Per Service: **$65 per treatment** · "9 treatments · every 30 days · March–November"
- Bullets: ✓ Mosquito barrier reduction program · ✓ Tick + **chigger** coverage — built for lake & wooded lots · ✓ Free re-treatment between visits if biting pests return · ✓ $0 initial fee
- NEVER: elimination/mosquito-free claims. REMOVE flea from this card entirely.

### Complete — All Four
- Monthly: **$116/mo** · "exact standalone math: $35 + $32 + $49. Zero bundle markup."
- Per Service: "Pest $70/visit + Termite $325/$380yr + Outdoor $65/treatment"
- Bullets: ✓ Everything in Foundation · ✓ Mosquito + tick + chigger program (9 treatments Mar–Nov) · ✓ One technician learns your property · ✓ Priority same-week response
- REMOVE: "Tick included / Flea included" lines.

## Trust strip (replaces promo trio or sits under it)
"**$99 initial on pest control — and $0 initial fees on mosquito, tick & fire ant.** Orkin charges $100+ just for an inspection. We don't."
(Variant without naming competitor: "Many companies charge $100–$250 just to get started. Your only initial fee here is pest control — $150, often $99.")

## Truck-section bundle strip — corrected
- Pest + Termite — $67/mo
- Mosquito + Tick (covers chiggers) — $49/mo · $65/treatment
- All Four Programs — $116/mo
- Tagline keeps: "Same pricing as standalone — just simpler to manage." (now mathematically true)

## Selling angles (panel: rank these)
1. "Pay for treatments, not for winter." — 9 real mosquito treatments billed evenly; competitors hide mosquito in 12-month rates.
2. "No entry toll." — $0 initials on outdoor services; pest-only plan exists at $35 (Wayne's cheapest door is $69/mo with forced termite).
3. "Math you can check." — $116 = 35+32+49. Print the equation on the card.
4. "Chigger coverage" — unique Lake Martin/wooded-lot hook nobody local is saying.

## Also update when shipping
- /services/mosquito-control: 9 treatments (not 12), re-treatment promise, no elimination language
- /services/tick-control: "+$20/treatment with mosquito ($65 total)" not "free"
- /services/flea: interior add-on +$30/quarter
- /services/termite-control: $325 install incl yr-1 / $380 renewal
- chatbot route.ts pricing block: all of the above
