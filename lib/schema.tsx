//
// CHANGES IN THIS VERSION (v2, June 8 2026):
//  • REMOVED hard-coded aggregateRating/reviewCount from all LocalBusiness blocks.
//    Reason: Google does not render self-serving review stars for LocalBusiness/
//    Organization, and hard-coded counts go stale + can be flagged as non-visible
//    markup. If/when a maintained first-party review feed exists, re-add it then.
//  • ADDED getOrganizationSchema() for the HOMEPAGE (brand-level entity).
//    City pages keep their own LocalBusiness block. This fixes entity/page mismatch.
//
// USAGE:
//   Homepage (app/page.tsx):            <SchemaScript schema={getOrganizationSchema()} />
//   Birmingham/Alabaster city page:     <SchemaScript schema={getBirminghamSchema()} />
//   Huntsville city page:               <SchemaScript schema={getHuntsvilleSchema()} />
//   Alexander City city page:           <SchemaScript schema={getAlexCitySchema()} />
//   FAQ blocks call getFAQSchema() internally — no extra wiring needed.

import React from 'react';

// ─── Shared constants ────────────────────────────────────────────────────────
const BRAND_NAME = 'EnviroCare';
const BRAND_URL  = 'https://www.envirocarellc.com';
const LOGO_URL   = 'https://www.envirocarellc.com/logo.png';
const EMAIL      = 'service@envirocarellc.com';
const FOUNDING   = '1958';
const PRICE_RANGE = '$$';

const HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
];

const SAME_AS = [
  'https://www.facebook.com/envirocarepest',
  'https://www.yelp.com/biz/envirocare-pest-and-termite-services',
];

// ─── Service catalog (shared) ─────────────────────────────────────────────────
// NOTE: bed bug and wildlife removal are NOT offered — intentionally excluded.
export const SERVICE_CATALOG = {
  '@type': 'OfferCatalog',
  name: 'Pest & Termite Control Services',
  itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pest Control',
      description: 'Bi-monthly perimeter pest control, once every two months, for covered pests including ants, roaches and spiders. Interior service and re-services follow the selected agreement.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Termite Control',
      description: 'Sentricon® Always Active™ uses in-ground bait stations. After inspection and approval, qualifying homes may receive up to $1,000,000 in termite damage repair coverage provided by EnviroCare, subject to the terms of the agreement. Treatment scope and pricing are determined at inspection.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mosquito Control',
      description: 'Seasonal mosquito reduction with eight treatments from March through October. Final scope and pricing follow a property inspection; monthly billing terms are confirmed before service.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tick and Flea Control',
      description: 'Tick treatments and flea control are quoted for the property. Confirm the treatment area, service scope and program options with the office.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fire Ant Control',
      description: 'Whole-colony fire ant treatment starting at $150, priced by yard size — available to anyone in our Alabama service area.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Builder Pre-Treatment',
      description: 'Pre-construction termite soil treatment for new builds. Certified and warranted.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WDO Real Estate Inspection',
      description: 'Paid Wood-Destroying Organism (WDO) inspection letters for real estate transactions in our Alabama service area. Contact the office to confirm the fee, property requirements and scheduling.' } },
  ],
};

// ─── HOMEPAGE: brand-level Organization entity ───────────────────────────────
// ── REMOVED 2026-08-10: getOrganizationSchema, getBirminghamSchema,
//    getHuntsvilleSchema, getAlexCitySchema ─────────────────────────────────
// All four were DEAD -- zero imports anywhere in the repo, verified before
// deletion -- and all four were hazards rather than merely unused:
//
//   * getOrganizationSchema built an Organization node on '#organization' with
//     name: BRAND_NAME ('EnviroCare'), while the LIVE node in
//     lib/seo/organization-schema.ts emits 'EnviroCare Pest Services'.
//   * getBirminghamSchema built '#birmingham' with name: BRAND_NAME, while the
//     live node in app/layout.tsx emits 'EnviroCare Pest Services'.
//
// Google merges nodes by @id. Either one, if ever imported, would have
// recreated exactly the two-names-one-entity defect fixed on '#birmingham'
// earlier this week -- a second definition of the same entity sitting one
// import away from going live.
//
// BRAND_NAME stays 'EnviroCare' on purpose: it is still correct for the
// per-office LocalBusiness names below, where the door-sign rule applies
// (Alabaster / Huntsville / Alexander City all publish "EnviroCare").
// Recover from git history if a location schema is ever needed again -- but
// build it from lib/seo/organization-schema.ts, not from a second source.

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

// ─── React component: drop a schema into any page as JSON-LD ─────────────────
export function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

export function MultiSchemaScript({ schemas }: { schemas: object[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}
