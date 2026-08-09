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
      description: 'Monthly pest control covering 30+ pests — ants, roaches, spiders, silverfish, and more. Includes unlimited re-service visits. Starting at $35/month.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Termite Control',
      description: 'Sentricon® Always Active™ termite bait system. No drilling into your foundation. Up to $1 million in termite damage coverage. Pricing is determined after a free on-site WDO inspection, as Alabama requires.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mosquito Control',
      description: 'Seasonal yard barrier treatment March through November. Reduces mosquitoes at breeding sites and on contact. Starting at $45 per visit, billed per service.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tick and Flea Control',
      description: 'Yard tick treatment with chigger coverage. Offered with mosquito as Mosquito + Tick at $65 per visit (March through November). Tick is not sold standalone.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fire Ant Control',
      description: 'Whole-colony fire ant treatment starting at $150, priced by yard size — available to anyone in our Alabama service area.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Builder Pre-Treatment',
      description: 'Pre-construction termite soil treatment for new builds. Certified and warranted.' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WDO Real Estate Inspection',
      description: 'Wood-Destroying Organism (WDO) inspection letters for real estate transactions throughout Alabama.' } },
  ],
};

// ─── HOMEPAGE: brand-level Organization entity ───────────────────────────────
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BRAND_URL}/#organization`,
    name: BRAND_NAME,
    url: BRAND_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    foundingDate: FOUNDING,
    founder: { '@type': 'Person', name: 'Phillip M. Wedgworth' },
    description:
      'EnviroCare is a fourth-generation, family-owned Alabama pest and termite control company doing pest control in Alabama since 1958. Sentricon-certified termite specialist serving the Birmingham metro, Huntsville/North Alabama, and the Lake Martin / Alexander City area from four Alabama offices.',
    areaServed: { '@type': 'State', name: 'Alabama' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+12059406360',
      contactType: 'customer service',
      areaServed: 'US-AL',
      availableLanguage: 'English',
    },
    // Four physical offices referenced as locations (full LocalBusiness lives on each
    // city page). NOTE: the '#birmingham' id historically pointed at the ALABASTER
    // office because it served the whole metro. The Birmingham city office opened
    // 2026-08-05; both are listed separately now.
    location: [
      { '@type': 'PestControlService', '@id': `${BRAND_URL}/#birmingham`, name: 'EnviroCare Pest Services',
        telephone: '+12059912882',
        address: { '@type': 'PostalAddress', streetAddress: '2120 16th Ave S, Ste 302', addressLocality: 'Birmingham', addressRegion: 'AL', postalCode: '35205', addressCountry: 'US' } },
      { '@type': 'LocalBusiness', '@id': `${BRAND_URL}/#alabaster`, name: `${BRAND_NAME} — Alabaster`,
        telephone: '+12059406360',
        address: { '@type': 'PostalAddress', streetAddress: '2025 Butler Rd', addressLocality: 'Alabaster', addressRegion: 'AL', postalCode: '35007', addressCountry: 'US' } },
      { '@type': 'LocalBusiness', '@id': `${BRAND_URL}/#huntsville`, name: `${BRAND_NAME} — Huntsville`,
        telephone: '+12569377676',
        address: { '@type': 'PostalAddress', streetAddress: '7027 Old Madison Pike, Ste 108', addressLocality: 'Huntsville', addressRegion: 'AL', postalCode: '35806', addressCountry: 'US' } },
      { '@type': 'LocalBusiness', '@id': `${BRAND_URL}/#alexander-city`, name: `${BRAND_NAME} — Alexander City`,
        telephone: '+12562346162',
        address: { '@type': 'PostalAddress', streetAddress: '1785 Tallapoosa St', addressLocality: 'Alexander City', addressRegion: 'AL', postalCode: '35010', addressCountry: 'US' } },
    ],
    sameAs: SAME_AS,
  };
}

// ─── Birmingham / Alabaster office (city page) ───────────────────────────────
export function getBirminghamSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BRAND_URL}/#birmingham`,
    name: BRAND_NAME,
    image: LOGO_URL,
    logo: LOGO_URL,
    url: `${BRAND_URL}/birmingham`,
    telephone: '+12059912882',
    email: EMAIL,
    foundingDate: FOUNDING,
    priceRange: PRICE_RANGE,
    address: { '@type': 'PostalAddress', streetAddress: '2120 16th Ave S, Ste 302', addressLocality: 'Birmingham', addressRegion: 'AL', postalCode: '35205', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 33.5030, longitude: -86.8025 },
    openingHoursSpecification: HOURS,
    description:
      'Family-owned Alabama pest control since 1958. Serving Birmingham, Hoover, Vestavia Hills, Mountain Brook, Homewood, Alabaster, Pelham, Chelsea, Helena, and surrounding communities. Sentricon-certified termite specialist with $1M damage coverage.',
    areaServed: ['Birmingham','Hoover','Vestavia Hills','Mountain Brook','Homewood','Alabaster','Chelsea','Pelham','Helena','Calera','Trussville','Greystone','Mt Laurel'].map((c) => ({ '@type': 'City', name: c })),
    hasOfferCatalog: SERVICE_CATALOG,
    sameAs: SAME_AS,
    // aggregateRating intentionally omitted — see header note.
  };
}

// ─── Huntsville office (city page) ───────────────────────────────────────────
export function getHuntsvilleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BRAND_URL}/#huntsville`,
    name: BRAND_NAME,
    image: LOGO_URL,
    logo: LOGO_URL,
    url: `${BRAND_URL}/huntsville`,
    telephone: '+12569377676',
    email: EMAIL,
    foundingDate: FOUNDING,
    priceRange: PRICE_RANGE,
    address: { '@type': 'PostalAddress', streetAddress: '7027 Old Madison Pike, Ste 108', addressLocality: 'Huntsville', addressRegion: 'AL', postalCode: '35806', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 34.7121, longitude: -86.6867 },
    openingHoursSpecification: HOURS,
    description:
      'Family-owned Alabama pest control serving Alabama since 1958 — Huntsville, Madison, Hampton Cove, Athens, and surrounding North Alabama communities. Sentricon-certified termite specialist with $1M damage coverage.',
    areaServed: ['Huntsville','Madison','Hampton Cove','Athens','Decatur','Hartselle','Harvest','New Market','Meridianville','Toney'].map((c) => ({ '@type': 'City', name: c })),
    hasOfferCatalog: SERVICE_CATALOG,
    sameAs: SAME_AS,
    // aggregateRating intentionally omitted — see header note.
  };
}

// ─── Alexander City / Lake Martin office (city page) ─────────────────────────
export function getAlexCitySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BRAND_URL}/#alexander-city`,
    name: BRAND_NAME,
    image: LOGO_URL,
    logo: LOGO_URL,
    url: `${BRAND_URL}/service-areas/alexander-city`,
    telephone: '+12562346162',
    email: EMAIL,
    foundingDate: FOUNDING,
    priceRange: PRICE_RANGE,
    address: { '@type': 'PostalAddress', streetAddress: '1785 Tallapoosa St', addressLocality: 'Alexander City', addressRegion: 'AL', postalCode: '35010', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 32.9539, longitude: -85.9536 },
    openingHoursSpecification: HOURS,
    description:
      'Founded 1958 in Alexander City, AL — our original location. Serving Alexander City, Lake Martin, Dadeville, Auburn, Eclectic, Jacksons Gap, and surrounding Tallapoosa County communities. Sentricon-certified termite specialist. Locally owned for 65+ years.',
    areaServed: ['Alexander City','Lake Martin','Dadeville','Eclectic','Auburn','Opelika','Jacksons Gap','Wetumpka'].map((c) => ({ '@type': 'City', name: c })),
    hasOfferCatalog: SERVICE_CATALOG,
    sameAs: SAME_AS,
    // aggregateRating intentionally omitted — see header note.
  };
}

// ─── FAQ Page Schema ─────────────────────────────────────────────────────────
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
