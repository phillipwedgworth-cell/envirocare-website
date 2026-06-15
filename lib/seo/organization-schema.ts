// Organization-level schema for AEO (Answer Engine Optimization).
// This is the single most important schema for getting picked up by
// ChatGPT, Perplexity, Gemini, and Google's AI Overviews. The `sameAs`
// array is how AI systems verify entity identity across the web.
//
// Jun 14, 2026 — added "Wedgworth Pest Control" to alternateName so search
// engines + AI treat the legacy family name as the same entity as EnviroCare.
//
//
// To add new social profiles: just add the URL to SAME_AS below.
export const ENVIROCARE_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'PestControlService'],
  '@id': 'https://www.envirocarellc.com/#organization',
  name: 'EnviroCare Pest & Termite Services',
  legalName: 'EnviroCare Pest & Termite Services LLC',
  alternateName: ['EnviroCare', 'EnviroCare Pest Control', 'EnviroCare Termite', 'Wedgworth Pest Control', 'Wedgworth Pest & Termite', "Wedgworth's Pest Control"],
  url: 'https://www.envirocarellc.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.envirocarellc.com/logo.png',
    width: 600,
    height: 200,
  },
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    "Family-owned, fourth-generation Alabama pest control and termite company founded in 1958 in Alexander City, originally as Wedgworth Pest Control. EnviroCare provides bi-monthly pest control, Sentricon® termite protection with up to $1M repair coverage, and mosquito and tick yard treatment across Alabama from three offices: Birmingham/Alabaster, Lake Martin/Alex City, and Huntsville. Around Lake Martin and Alexander City, EnviroCare is the Wedgworth family business that locals have long known as Wedgworth Pest Control.",
  foundingDate: '1958',
  foundingLocation: {
    '@type': 'Place',
    name: 'Alexander City, Alabama',
    address: { '@type': 'PostalAddress', addressLocality: 'Alexander City', addressRegion: 'AL', addressCountry: 'US' },
  },
  founder: {
    '@type': 'Person',
    name: 'Phillip M. Wedgworth',
    jobTitle: 'Founder',
    description: 'Started the family pest control business in 1958 in Alexander City, Alabama, originally as Wedgworth Pest Control. First of four generations of the Wedgworth family in the business.',
  },
  // Current ownership — Wedgworth family
  employee: [
    { '@type': 'Person', name: 'Kevin Wedgworth', jobTitle: 'Owner' },
    { '@type': 'Person', name: 'William Lex Wedgworth', description: 'Fourth-generation member of the Wedgworth family, working in the business since 2024.' },
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
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'EnviroCare Pest & Termite Services',
    itemListElement: [
      {
        '@type': 'Offer', name: 'Essential Pest Control', price: '35', priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '35', priceCurrency: 'USD', unitText: 'per month, billed monthly via ACH' },
        itemOffered: { '@type': 'Service', name: 'Bi-Monthly Exterior Pest Control', description: 'Bi-monthly perimeter exterior treatment covering 30+ common Alabama pests with unlimited free re-services between scheduled visits.' },
      },
      {
        // Termite carries NO flat price — Alabama requires an on-site WDO inspection first.
        '@type': 'Offer', name: 'Sentricon® Termite Protection',
        itemOffered: { '@type': 'Service', name: 'Sentricon® Always Active™ Termite Baiting', description: 'In-ground bait station termite protection, no drilling required. Pricing is determined after a free on-site WDO inspection, as Alabama requires (based on linear footage and foundation type). Qualifying homes carry up to $1M in EnviroCare damage coverage.' },
      },
      {
        '@type': 'Offer', name: 'Mosquito Yard Barrier', price: '45', priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '45', priceCurrency: 'USD', unitText: 'per treatment, March through November' },
        itemOffered: { '@type': 'Service', name: 'Monthly Mosquito Yard Treatment', description: '30-day yard barrier mosquito treatment, applied monthly March through November (9 treatments per year).' },
      },
      {
        '@type': 'Offer', name: 'Mosquito + Tick Outdoor Pro', price: '65', priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '65', priceCurrency: 'USD', unitText: 'per treatment, March through November' },
        itemOffered: { '@type': 'Service', name: 'Mosquito + Tick Yard Treatment', description: 'Combined mosquito and tick yard barrier — covers chiggers. 30-day refresh, March through November.' },
      },
    ],
  },
  // sameAs — KEY FOR AEO. AI systems use this to verify entity identity.
  // Add real URLs as they're confirmed. Comments mark items needing verification.
  sameAs: [
    'https://www.facebook.com/envirocarepestandtermite',
    'https://www.google.com/maps/place/?q=place_id:ChIJr8cmt-EeiYgR_jgX9xsiZWY',  // Alabaster GBP
    'https://www.google.com/maps/place/?q=place_id:ChIJd4YXKCRmqmIR1DmDoEcGohU',  // Huntsville GBP
    'https://www.google.com/maps/place/?q=place_id:ChIJ508mEjcLjIgRZ2HdWgXX76c',  // Alex City GBP
    // TODO: add when live — BBB profile, LinkedIn, Yelp, Nextdoor, Substack, Medium
  ],
  slogan: 'No One Cares Like EnviroCare',
  award: 'Sentricon® Certified Specialist',
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+1-205-940-6360', contactType: 'customer service', areaServed: ['Birmingham', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood', 'Alabaster', 'Pelham', 'Helena'], availableLanguage: 'English', hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' } },
    { '@type': 'ContactPoint', telephone: '+1-256-234-6162', contactType: 'customer service', areaServed: ['Alexander City', 'Lake Martin', 'Dadeville', 'Eclectic', 'Auburn', 'Opelika'], availableLanguage: 'English' },
    { '@type': 'ContactPoint', telephone: '+1-256-937-7676', contactType: 'customer service', areaServed: ['Huntsville', 'Madison', 'Athens', 'Decatur', 'Hartselle', 'Harvest', 'Hampton Cove'], availableLanguage: 'English' },
  ],
};

// Speakable schema — for voice assistants (Alexa, Siri, Google Assistant) and AI voice answers.
// Attach to homepage and key hub pages. Tells the AI which CSS selectors to read aloud.
export const SPEAKABLE_HOMEPAGE = {
  '@context': 'https://schema.org',
  '@type': 'SpeakableSpecification',
  cssSelector: ['h1', '.hero-sub', '.section-title', '[itemprop=speakable]'],
};

// WebSite + SearchAction — helps AI know your site supports search
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.envirocarellc.com/#website',
  url: 'https://www.envirocarellc.com',
  name: 'EnviroCare Pest & Termite Services',
  publisher: { '@id': 'https://www.envirocarellc.com/#organization' },
  inLanguage: 'en-US',
  // potentialAction omitted: only include when you actually have a /search endpoint
};
