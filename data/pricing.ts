// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: data/pricing.ts
// Commit: feat(pricing): flat $75 initial service on all plans; de-list tick/flea pricing
// Push: main
// ─────────────────────────────────────
/**
 * data/pricing.ts — SINGLE SOURCE OF TRUTH: pricing & startup fees
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/pricing.ts
 * Commit: feat(data): add pricing source of truth (latest locked model)
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * This reflects the LATEST locked model (supersedes the old $32/$325/$380
 * termite-flat model the termite sweep is removing). data/services.ts and city
 * FAQs should migrate to read from here so there is ONE price source.
 *
 * ⚠️ OPEN DECISION (blocks the termite sweep — Phillip must resolve):
 *   Termite has NO flat price; it is quoted after a free WDO inspection.
 *   BUT the ACH/monthly billing model needs a year-round termite anchor.
 *   Until TERMITE.monthlyAnchor is set, do not write a termite $/mo anywhere.
 */

export const PRICING = {
  plans: {
    pest: {
      label: 'Pest Control',
      fromMonthly: 35,           // From $35/mo
      startup: 75,               // FLAT $75 initial service — all plans (Phillip, Aug 24 2026)
    },
    pestMosquito: {
      label: 'Pest + Mosquito',
      fromMonthly: 69,           // From $69/mo
      startup: 75,               // FLAT $75 initial service — all plans
      badge: 'Most Popular',
    },
    complete: {
      label: 'Complete',
      fromMonthly: 100,          // From ~$100/mo
      startup: 229,              // NOT the flat $75 — Complete keeps its own
                                 // initial fee (Phillip, Aug 24 2026)
      badge: 'Best Value',
      // NOTE: "Complete" historically included termite $/mo. If termite stays
      // quote-only, confirm what the ~$100/mo Complete anchor represents.
    },
  },

  // Standard initial-service fee: a flat $75, replacing the old $79 split
  // (Phillip, Aug 24 2026). Complete is the deliberate exception and stays at
  // $229 — read plans.<plan>.startup, not this, when a plan is in hand.
  initialServiceFee: 75,
  initialServiceFeeExceptions: { complete: 229 },

  addOns: {
    // RULED 2026-08-26 (Phillip, with service_canon.mosquito): the mosquito
    // offer is MONTHLY, not per-visit. $45/month for an average-size yard,
    // eight treatments March-October, firm price after a free inspection, and
    // ACH spreads it evenly across the year. The old perVisit:45 read as
    // $360/season; this reads as $540/year. It is a different offer, not a
    // rewording — do not "restore" the per-visit shape.
    mosquito: { monthly: 45, monthlyWithPestOnly: 34 }, // $34/mo ONLY when paired with pest
    // Tick and flea are QUOTED, not listed. They stay off the pricing page as
    // sellable line items (Phillip, Aug 24 2026) — the service pages remain for
    // search, but price discovery happens on the phone.
    mosquitoTick: { monthly: 65, listOnPricingPage: false }, // monthly, same ruling
    tick: { monthlyWithMosquitoOnly: 20, listOnPricingPage: false }, // 65 - 45, derived
    flea: { model: 'Quoted — interior add-on', listOnPricingPage: false },
  },

  termite: {
    flatPrice: null,             // intentionally none
    model: 'Quoted after a free WDO inspection.',
    monthlyAnchor: null,         // ⚠️ OPEN DECISION — set before any termite $/mo copy
  },

  // Compliance: bundles are a CONVENIENCE (one invoice, one tech), NEVER a discount.
  bundlingIsDiscount: false,

  // ACH / monthly-billing disclosure — SOURCE OF TRUTH.
  // MUST appear wherever a $/mo price is shown (homepage plan cards, /pricing,
  // the bundle, city-page FAQs). Use `achTerms` (full line) as the disclosure;
  // `achFootnoteShort` is the compact label for tight spots.
  achTerms:
    'Monthly pricing requires a 12-month service agreement, billed automatically by ACH auto-draft in equal, averaged monthly payments.',
  achFootnoteShort: '12-month agreement · ACH auto-draft · equal averaged payments',

  currency: 'USD',
} as const;

export type Pricing = typeof PRICING;

// Convenience re-exports for components that just need the disclosure string.
export const ACH_TERMS = PRICING.achTerms;
export const ACH_FOOTNOTE_SHORT = PRICING.achFootnoteShort;
