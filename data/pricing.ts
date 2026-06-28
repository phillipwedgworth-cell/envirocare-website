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
      startup: 79,               // $79 startup
    },
    pestMosquito: {
      label: 'Pest + Mosquito',
      fromMonthly: 69,           // From $69/mo
      startup: 79,               // $79 startup
      badge: 'Most Popular',
    },
    complete: {
      label: 'Complete',
      fromMonthly: 100,          // From ~$100/mo
      startup: 229,
      badge: 'Best Value',
      // NOTE: "Complete" historically included termite $/mo. If termite stays
      // quote-only, confirm what the ~$100/mo Complete anchor represents.
    },
  },

  addOns: {
    mosquito: { perVisit: 45, monthlyWithPestOnly: 34 }, // $34/mo ONLY when paired with pest
    mosquitoTick: { perVisit: 65 },
    tick: { perVisitWithMosquitoOnly: 20 }, // +$20/visit, mosquito only
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
