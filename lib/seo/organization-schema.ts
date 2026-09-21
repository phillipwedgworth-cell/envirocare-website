// Organization-level schema for AEO (Answer Engine Optimization).
// This is the canonical BRAND entity. Physical offices are separate
// PestControlService/LocalBusiness nodes in app/layout.tsx and reference this
// Organization by @id. Keeping the brand node separate avoids merging one
// addressless LocalBusiness with four staffed offices.
//
// Retired/legacy brand names stay in alternateName so search engines and answer
// engines can reconcile older citations with the current brand.
export const ENVIROCARE_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.envirocarellc.com/#organization',
  // Published brand name per the 2026-08-09 ruling. Per-location GBP titles are
  // represented by the office nodes in app/layout.tsx.
  name: 'EnviroCare Pest Services',
  legalName: 'EnviroCare, LLC',
  alternateName: [
    'EnviroCare',
    'EnviroCare, LLC',
    'EnviroCare Pest Control',
    'EnviroCare Termite',
    'EnviroCare Pest & Termite Services',
    'EnviroCare Pest & Termite Services LLC',
    'Wedgworth Pest Control',
    'Wedgworth Pest & Termite',
    "Wedgworth's Pest Control",
  ],
  url: 'https://www.envirocarellc.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.envirocarellc.com/logo.png',
    width: 600,
    height: 200,
  },
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'Family-owned Alabama pest control and termite company led by the Wedgworth family, whose pest-control history in Alabama began in Alexander City in 1958 as Wedgworth Pest Control. EnviroCare provides bi-monthly pest control, Sentricon® termite protection with up to $1M in EnviroCare damage repair coverage on qualifying homes, subject to the terms of the agreement, and mosquito and tick yard treatment from four Alabama offices: Birmingham, Alabaster, Alexander City / Lake Martin, and Huntsville.',
  // Do not put foundingDate: 1958 on this Organization. 1958 is the start of the
  // Wedgworth family's Alabama pest-control history, not the formation date of
  // the later EnviroCare, LLC legal entity.
  employee: [
    { '@type': 'Person', name: 'Kevin Wedgworth', jobTitle: 'Owner' },
    { '@type': 'Person', name: 'William Lex Wedgworth', description: 'Fourth-generation member of the Wedgworth family, working in the business since 2016.' },
  ],
  knowsAbout: [
    'Pest Control', 'Termite Control', 'Sentricon Termite Baiting', 'Mosquito Control', 'Tick Control',
    'Fire Ant Control', 'Flea Control', 'WDO Wood-Destroying Organism Inspection', 'Real Estate Pest Inspection',
    'Builder Pre-Treatment', 'Commercial Pest Control', 'Brown Recluse Spider Control', 'Carpenter Ant Control',
    'German Cockroach Control', 'Alabama Pest Pressure', 'Eastern Subterranean Termites',
  ],
  areaServed: [
    { '@type': 'State', name: 'Alabama' },
    { '@type': 'City', name: 'Birmingham', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Huntsville', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Madison', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Hoover', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Alexander City', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Auburn', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Decatur', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'City', name: 'Athens', containedInPlace: { '@type': 'State', name: 'Alabama' } },
    { '@type': 'Place', name: 'Lake Martin, Alabama' },
  ],
  // Connect the brand entity to the four staffed office entities without
  // repeating their NAP data here. Each referenced node owns its physical address.
  subOrganization: [
    { '@id': 'https://www.envirocarellc.com/#birmingham' },
    { '@id': 'https://www.envirocarellc.com/#alabaster' },
    { '@id': 'https://www.envirocarellc.com/#lake-martin' },
    { '@id': 'https://www.envirocarellc.com/#huntsville' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'EnviroCare',
    itemListElement: [
      {
        '@type': 'Offer', name: 'Essential Pest Control', price: '35', priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '35', priceCurrency: 'USD', unitText: 'per month, billed monthly via ACH' },
        itemOffered: { '@type': 'Service', name: 'Bi-Monthly Exterior Pest Control', description: 'Bi-monthly perimeter exterior treatment covering 30+ common Alabama pests with unlimited free re-services between scheduled visits.' },
      },
      {
        // Termite carries NO flat price — Alabama requires an on-site WDO inspection first.
        '@type': 'Offer', name: 'Sentricon® Termite Protection',
        itemOffered: { '@type': 'Service', name: 'Sentricon® Always Active™ Termite Baiting', description: 'In-ground bait station termite protection, no drilling required. Pricing is determined after a free on-site WDO inspection based on linear footage and foundation type. Qualifying homes carry up to $1M in EnviroCare damage repair coverage, subject to the terms of the agreement.' },
      },
      {
        '@type': 'Offer', name: 'Mosquito Yard Barrier', price: '45', priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '45', priceCurrency: 'USD', unitText: 'per month, 8 treatments March through October' },
        itemOffered: { '@type': 'Service', name: 'Monthly Mosquito Yard Treatment', description: '30-day yard barrier mosquito treatment for an average-size yard, $45 a month with ACH spreading it evenly across the year. Applied monthly March through October (8 treatments). Firm price after a free inspection.' },
      },
      {
        '@type': 'Offer', name: 'Mosquito + Tick Outdoor Pro', price: '65', priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '65', priceCurrency: 'USD', unitText: 'per month, 8 treatments March through October' },
        itemOffered: { '@type': 'Service', name: 'Mosquito + Tick Yard Treatment', description: 'Combined mosquito and tick yard barrier — covers chiggers. 30-day refresh, March through October.' },
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/EnviroCareAL',
    'https://www.google.com/maps/place/?q=place_id:ChIJjXGa0ZsbiYgR1mB0oEKnqUo',
    'https://www.google.com/maps/place/?q=place_id:ChIJr8cmt-EeiYgR_jgX9xsiZWY',
    'https://www.google.com/maps/place/?q=place_id:ChIJd4YXKCRmqmIR1DmDoEcGohU',
    'https://www.google.com/maps/place/?q=place_id:ChIJ508mEjcLjIgRZ2HdWgXX76c',
  ],
  slogan: 'No One Cares Like EnviroCare',
  award: 'Sentricon® Certified Specialist',
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+1-205-991-2882', contactType: 'customer service', areaServed: ['Birmingham', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood', 'Trussville', 'Irondale', 'Leeds', 'Moody', 'Fultondale', 'Gardendale', 'Bessemer', 'McCalla', 'Crestline', 'English Village', 'Cherokee Bend', 'Cahaba Heights', 'Mountain Brook Village', 'Liberty Park'], availableLanguage: 'English', hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' } },
    { '@type': 'ContactPoint', telephone: '+1-205-940-6360', contactType: 'customer service', areaServed: ['Alabaster', 'Pelham', 'Helena', 'Calera', 'Chelsea', 'Greystone', 'Mt Laurel', 'Inverness', 'Brook Highland', 'Meadow Brook', 'Eagle Point', 'Highland Lakes', 'Chelsea Park'], availableLanguage: 'English', hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' } },
    { '@type': 'ContactPoint', telephone: '+1-256-234-6162', contactType: 'customer service', areaServed: ['Alexander City', 'Lake Martin', 'Dadeville', 'Eclectic'], availableLanguage: 'English' },
    { '@type': 'ContactPoint', telephone: '+1-334-332-3321', contactType: 'customer service', areaServed: ['Auburn', 'Opelika'], availableLanguage: 'English' },
    { '@type': 'ContactPoint', telephone: '+1-256-937-7676', contactType: 'customer service', areaServed: ['Huntsville', 'Madison', 'Athens', 'Decatur', 'Hartselle', 'Harvest', 'Hampton Cove'], availableLanguage: 'English' },
  ],
};

// Speakable schema — for voice assistants (Alexa, Siri, Google Assistant) and AI voice answers.
export const SPEAKABLE_HOMEPAGE = {
  '@context': 'https://schema.org',
  '@type': 'SpeakableSpecification',
  cssSelector: ['h1', '.ec-hero-sub', '.ec-section-h2', '[itemprop=speakable]'],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.envirocarellc.com/#website',
  url: 'https://www.envirocarellc.com',
  name: 'EnviroCare',
  publisher: { '@id': 'https://www.envirocarellc.com/#organization' },
  inLanguage: 'en-US',
};
