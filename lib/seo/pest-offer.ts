// Recurring pest control Offer pricing for JSON-LD, built from data/pricing.ts.
//
// Why this exists (2026-11-16): a NeuronWriter domain audit read the $35 Offer
// next to the $75 initial service on /pricing as a price conflict. They are
// different charges. The Offer now states each one separately:
//   - $35/month: the PAYMENT interval (ACH auto-draft on a 12-month agreement),
//   - $70: the per-visit option for the bi-monthly SERVICE interval,
//   - the initial service: a one-time charge ($150 regular, promo price shown
//     alongside it), described in text and never as the recurring price.
// Do not change the monthly amount to the initial-service figure.
import { PRICING } from '@/data/pricing';

const pest = PRICING.plans.pest;
const regular = PRICING.initialServiceRegular;
const promo = pest.startup;

export const PEST_INITIAL_SERVICE_TEXT =
  promo < regular
    ? `The initial service is a separate one-time charge: $${regular} regular, currently $${promo} (${PRICING.initialServicePromo.label}).`
    : `The initial service is a separate one-time charge of $${regular}.`;

export const PEST_OFFER_DESCRIPTION =
  `Recurring bi-monthly exterior pest control (${pest.visitsPerYear} scheduled visits a year), with interior service when needed under the selected agreement. ` +
  `Pay $${pest.fromMonthly} a month by ACH auto-draft or $${pest.perVisit} per bi-monthly visit. ${PRICING.achTerms} ` +
  PEST_INITIAL_SERVICE_TEXT;

export const PEST_PRICE_SPECIFICATION = [
  {
    '@type': 'UnitPriceSpecification',
    name: 'Monthly ACH payment (12-month service agreement)',
    price: String(pest.fromMonthly),
    priceCurrency: PRICING.currency,
    unitCode: 'MON',
    unitText: 'per month, ACH auto-draft, 12-month agreement',
    billingDuration: { '@type': 'QuantitativeValue', value: 12, unitCode: 'MON' },
  },
  {
    '@type': 'UnitPriceSpecification',
    name: 'Per-visit payment',
    price: String(pest.perVisit),
    priceCurrency: PRICING.currency,
    unitText: 'per scheduled bi-monthly visit',
  },
];
