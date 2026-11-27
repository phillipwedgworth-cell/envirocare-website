// data/local-offers.ts — plain-English offer blocks for the city × service
// combo pages (rendered by components/ComboPage.tsx when a page sets `offers`).
//
// Added 2026-11-26 from BrightLocal's AI Insights (Alabaster, Oct 24 2026):
// AI answers quote competitors' easy-to-compare offers, so each combo page now
// states ours in one place.
//
// RULES FOR THIS FILE
// - Every line must already be on record: data/pricing.ts, data/services.ts,
//   or a ruling recorded in AGENTS.md. Do not invent prices or terms.
// - A term that is NOT on record stays `null`. ComboPage skips null items, so
//   nothing unconfirmed can reach the live site. Fill one in only after Phillip
//   confirms the exact wording, then it shows on every page that uses it.
// - Wording rules (AGENTS.md + Nov 23 2026 ruling): the $1M line is quoted
//   exactly; never "guarantee", "warranty", "pet-safe", "same-day", "24/7" or
//   "mosquito-free"; termite is never a flat price; liquid termite treatment is
//   never offered to new customers.

import { PRICING } from '@/data/pricing';

export type OfferKey = 'termite' | 'mosquito' | 'fireAnt';
export type OfferItem = { title: string; body: string | null };
export type OfferBlock = { heading: string; items: OfferItem[] };

/** Exact approved coverage sentence (Nov 23 2026 ruling). */
export const COVERAGE_LINE =
  'up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement.';

export const LOCAL_OFFERS: Record<OfferKey, OfferBlock> = {
  termite: {
    heading: 'Termite coverage in plain English',
    items: [
      {
        title: 'Damage repair coverage',
        body: `New termite customers get the Sentricon® Always Active™ bait system, which comes with ${COVERAGE_LINE} The price is set after a free termite inspection, never as a flat number.`,
      },
      {
        title: 'Retreatment-only plans',
        body: 'Some termite agreements, including many older bonds, only pay to retreat the house if termites come back. They do not pay for repairing damage. If you are comparing plans or holding an old bond, look for the words "retreatment only" and read the coverage limit and exclusions.',
      },
      {
        title: 'Your written agreement decides',
        body: 'What is covered, what is excluded and what you need to keep up are set by the written agreement. Ask us to walk you through it before you sign.',
      },
      // NOT ON RECORD (2026-11-26): whether EnviroCare sells a retreat-only
      // termite plan to new customers, and how it is priced against the repair
      // plan. Fill in only after Phillip confirms. Hidden while null.
      { title: 'Our retreatment-only option', body: null },
    ],
  },
  mosquito: {
    heading: 'Mosquito offers at a glance',
    items: [
      {
        title: 'Seasonal program',
        body: `$${PRICING.addOns.mosquito.monthly}/month for an average-size yard: eight treatments from March through October, with the price confirmed after a free look at your property. Paired with our pest plan it is $${PRICING.addOns.mosquito.monthlyWithPestOnly}/month, and mosquito plus tick is $${PRICING.addOns.mosquitoTick.monthly}/month.`,
      },
      {
        title: 'Planning a backyard event?',
        body: 'Seasonal program customers can ask for a pre-event knockdown application ahead of a backyard wedding, party or holiday at no extra charge.',
      },
      // NOT ON RECORD (2026-11-26): a one-time event mosquito treatment for
      // people who are not on the seasonal program — price and what it
      // includes. Hidden while null.
      { title: 'One-time event treatment', body: null },
    ],
  },
  fireAnt: {
    heading: 'Fire ant treatment at a glance',
    items: [
      {
        title: 'Price',
        body: '$150 minimum. Larger properties are priced by the square footage treated, and your technician gives you the number before any work starts.',
      },
      {
        title: 'Open to everyone',
        body: 'Fire ant control is a standalone service. You do not need to be on a pest plan, and it is not part of the standard bi-monthly perimeter service.',
      },
      // NOT ON RECORD in approved wording (2026-11-26): the one-year follow-up
      // term. data/services.ts calls it a "one-year warranty", but the Nov 23
      // 2026 ruling bans "warranty" in content, and what the year covers
      // (retreatment? exclusions?) is not written down. Hidden while null.
      { title: 'One-year follow-up', body: null },
    ],
  },
};
