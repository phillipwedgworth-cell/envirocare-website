/**
 * app/sitemap.ts — EnviroCare site sitemap
 * Rebuilt 2026-06-10 (speed/SEO audit): the old map listed redirect SOURCES
 * (/pricing, /why-envirocare, /services, /realtor, /contact, real-estate-wdo)
 * instead of canonical pages, omitted sentricon + builder-pre-treat, and had
 * zero blog URLs. Blog slugs now come straight from data/blog-posts.ts.
 */

import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';

// Update this when you flip DNS from envirocarellc.com (flipped)
const BASE_URL = 'https://www.envirocarellc.com';

// Cities served (from data/cities.ts)
const CITY_SLUGS = [
  'birmingham', 'hoover', 'vestavia-hills', 'mountain-brook', 'homewood',
  'alabaster', 'chelsea', 'pelham', 'helena', 'calera',
  'trussville', 'greystone', 'mt-laurel', 'tuscaloosa',
  'lake-martin', 'alexander-city', 'dadeville', 'eclectic',
  'willow-point', 'the-ridge', 'stillwaters', 'the-heritage',
  'auburn', 'opelika',
  'huntsville', 'athens', 'decatur', 'hartselle',
  'harvest', 'hampton-cove',
];

// Cities that live under /service-areas/* (deep pages with self-canonicals).
// /madison 301s here — see next.config.ts redirects.
const SERVICE_AREA_SLUGS = ['madison', 'fultondale', 'redstone-arsenal'];

// City×service combo pages (top-level routes)
const COMBO_SLUGS = [
  'birmingham-mosquito-control',
  'huntsville-mosquito-control',
  'birmingham-termite-control',
  'huntsville-termite-control',
  'birmingham-exterminator',
  'huntsville-exterminator',
];

// Service pages that exist as REAL routes (no redirect sources here)
const SERVICE_SLUGS = [
  'pest-control',
  'interior-pest-control',
  'termite-control',
  'sentricon',
  'mosquito-control',
  'tick-control',
  'fire-ant',
  'flea',
  'builder',
  'builder-pre-treat',
  'wdo-letters',
  'crawlspace',
  'commercial',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main pages — canonical URLs only
  const mainPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/builders`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq/mosquito`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/faq/termite-warranty`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/contact-us`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/find-office`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const serviceAreaPages: MetadataRoute.Sitemap = SERVICE_AREA_SLUGS.map((slug) => ({
    url: `${BASE_URL}/service-areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const comboPages: MetadataRoute.Sitemap = COMBO_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...mainPages, ...servicePages, ...comboPages, ...cityPages, ...serviceAreaPages, ...blogPages];
}
