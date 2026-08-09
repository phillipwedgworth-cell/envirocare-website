/**
 * data/business.ts — SINGLE SOURCE OF TRUTH: core company facts
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/business.ts
 * Commit: feat(data): add business-facts source of truth
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * RULE: Every page, schema object, email, and agent reads company facts FROM
 * HERE. Do not hard-code the name, founding year, generation, or tagline anywhere
 * else. If a fact changes, change it once, here.
 *
 * Phillip G. Wedgworth (digital ops) is intentionally NOT in any public field.
 */

export const BUSINESS = {
  legalName: 'EnviroCare',
  displayName: 'EnviroCare',
  foundedYear: 1958,
  originalName: 'Wedgworth Pest Control',
  originCity: 'Alexander City, AL',

  // GENERATION — locked to FOURTH. Any page saying "third generation" is wrong.
  generationOrdinal: 4,
  generationLabel: 'fourth-generation',
  // Approved public sentence (use verbatim or lightly trimmed):
  generationSentence:
    'A fourth-generation, family-owned Alabama company serving the same communities since 1958.',

  // Ownership lineage — for About/Person schema only. Keep private notes OUT of copy.
  owner: { name: 'Kevin Wedgworth', role: 'Owner', generation: 3 },
  founder: { name: 'Phillip M. Wedgworth', generation: 1 },

  tagline: 'No One Cares Like EnviroCare',
  domain: 'https://www.envirocarellc.com',

  social: {
    facebook: 'https://www.facebook.com/EnviroCareAL',
    twitter: 'https://twitter.com/EnviroCareAL',
  },

  // Brand system — never guess or alter.
  brand: {
    colors: {
      gold: '#F5A800',
      green: '#0E8E40', // vibrant mint — NOT dark forest #1B7A3C
      forest: '#0A7935',
      deep: '#07642B',
      cream: '#FEFDF8',
      ink: '#0E1A0F',
    },
    fonts: { headline: 'Playfair Display', body: 'DM Sans' },
    logo: '/logo.png',
  },
} as const;

export type Business = typeof BUSINESS;
