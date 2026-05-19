/**
 * app/sitemap.ts — EnviroCare site sitemap
 * Generated May 16, 2026 — Phase 4 SEO prep
 *
 * Includes all 26 city pages + 10 service pages + main pages.
 * Next.js auto-generates /sitemap.xml from this file.
 *
 * REPLACES existing app/sitemap.ts.
 */

import type { MetadataRoute } from 'next';

// Update this when you flip DNS from envirocare-web.vercel.app → envirocarellc.com
const BASE_URL = 'https://envirocare-web.vercel.app';

// Cities served (from data/cities.ts — Stage 1)
const CITY_SLUGS = [
  'birmingham', 'hoover', 'vestavia-hills', 'mountain-brook', 'homewood',
  'alabaster', 'chelsea', 'pelham', 'helena', 'calera',
  'trussville', 'mt-laurel', 'tuscaloosa',
  'lake-martin', 'alexander-city', 'dadeville', 'eclectic',
  'auburn', 'opelika',
  'huntsville', 'madison', 'athens', 'decatur', 'hartselle',
  'harvest', 'hampton-cove',
];

// Services offered (from data/services.ts — Stage 2)
const SERVICE_SLUGS = [
  'pest-control',
  'termite-control',
  'mosquito-control',
  'tick-control',
  'fire-ant',
  'flea',
  'builder',
  'real-estate-wdo',
  'crawlspace',
  'commercial',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main pages — highest priority
  const mainPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/why-envirocare`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/realtor`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/builders`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...mainPages, ...servicePages, ...cityPages];
}
