/**
 * app/sitemap.ts — EnviroCare site sitemap
 * Rebuilt 2026-06-10 (speed/SEO audit): the old map listed redirect SOURCES
 * (/pricing, /why-envirocare, /contact, real-estate-wdo) instead of canonical
 * pages, omitted sentricon + builder-pre-treat, and had zero blog URLs. Blog
 * slugs now come straight from data/blog-posts.ts.
 *
 * CORRECTED 2026-07-25: the 2026-06-10 note also listed /services and /realtor
 * as redirect sources. They are NOT — next.config.ts un-shadowed both on the
 * same day and they have been real 200-status pages since. They are now in the
 * map, along with /special-offers, /privacy and /terms. See the ADDED block below.
 */

import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';
import { getAllPests } from '@/data/pest-library';

// Update this when you flip DNS from envirocarellc.com (flipped)
const BASE_URL = 'https://www.envirocarellc.com';

// Cities served (from data/cities.ts)
const CITY_SLUGS = [
  'birmingham', 'hoover', 'vestavia-hills', 'mountain-brook', 'homewood',
  'alabaster', 'chelsea', 'pelham', 'helena', 'calera',
  'trussville', 'greystone', 'mt-laurel',
  'lake-martin', 'alexander-city', 'dadeville', 'eclectic',
  'willow-point', 'the-ridge', 'stillwaters', 'the-heritage',
  'auburn', 'opelika',
  'huntsville', 'athens', 'decatur', 'hartselle',
  'harvest', 'hampton-cove',
  // Premium-tier neighborhood pages (Jun 2026)
  'liberty-park', 'highland-lakes', 'indian-springs',
  'eagle-point', 'brook-highland', 'meadow-brook',
  // 280-corridor & affluent gaps (Jul 20, 2026)
  'inverness', 'cahaba-heights', 'ballantrae', 'ross-bridge', 'chelsea-park',
  // Mountain Brook sub-areas (Jul 2026)
  'crestline', 'english-village', 'mountain-brook-village', 'cherokee-bend',
  // New market pages (Jun 25, 2026) — competitor/radius expansion
  'bessemer', 'mccalla', 'gardendale', 'meridianville', 'sylacauga',
  'irondale', 'leeds', 'moody', 'fultondale',
  // Birmingham-metro cluster pages (Jul 11, 2026 metro rebuild)
  'over-the-mountain', 'south-birmingham', 'east-birmingham', 'north-birmingham',
  'north-alabama', 'lake-martin-area',
];

// Cities that live under /service-areas/* (deep pages with self-canonicals).
// /madison 301s here — see next.config.ts redirects.
const SERVICE_AREA_SLUGS = ['madison', 'redstone-arsenal'];

// City×service combo pages (top-level routes)
const COMBO_SLUGS = [
  'birmingham-mosquito-control',
  'huntsville-mosquito-control',
  'birmingham-termite-control',
  'huntsville-termite-control',
  'birmingham-exterminator',
  'huntsville-exterminator',
  // Track A wave 1 (2026-07-24) — Madison + Decatur, chosen from the 16-month
  // GSC export (natural demand curves, winnable positions). Verify indexation
  // in GSC before shipping wave 2.
  'madison-pest-control',
  'madison-termite-control',
  'madison-mosquito-control',
  'madison-exterminator',
  'madison-commercial-pest-control',
  'decatur-pest-control',
  'decatur-mosquito-control',
  'decatur-exterminator',
  'decatur-termite-control',
];

// Service pages that exist as REAL routes (no redirect sources here).
// Removed 2026-06-29 (SEO audit): mosquito-control→mosquito, real-estate-wdo→
// wdo-letters, and crawlspace→termite-control all 308-redirect (see next.config.ts),
// so the sitemap now lists only the final destination URLs.
const SERVICE_SLUGS = [
  'pest-control',
  'interior-pest-control',
  'termite-control',
  'sentricon',
  'mosquito',
  'tick-control',
  'fire-ant',
  'flea',
  // 'builder' + 'builder-pre-treat' removed 2026-07-24 — both 301 to /builders (canonical)
  'wdo-letters',
  'commercial',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main pages — canonical URLs only
  const mainPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/service-areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/builders`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/faq/mosquito`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/faq/termite-warranty`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/contact-us`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/find-office`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/family-owned-vs-national-chains`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/best-pest-control-birmingham`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // B2B WDO page for agents/closing attorneys (campaign-plan Track E4) — the
    // homeowner-facing page remains /services/wdo-letters.
    { url: `${BASE_URL}/wdo-inspection-letters-alabama`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/what-pest-problem`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    // ADDED 2026-07-25 (live-site audit): these five were linked in the global
    // nav/footer and returned 200, but were absent from the sitemap. The header
    // comment above lists /services and /realtor as "redirect SOURCES" — that was
    // true when this file was rebuilt on 2026-06-10, but next.config.ts un-shadowed
    // both the SAME DAY (see the "UN-SHADOWED per SHADOWED-PAGES-RECOMMENDATION.md"
    // block, ~line 178). They are real pages and have been for six weeks.
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/realtor`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/special-offers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // RESOLVED 2026-08-05: /request-quote is gone. It and /quote were two
    // 200-status pages with near-identical titles, both self-canonical, both
    // posting to /api/quote — cannibalization, not two products. /quote survives
    // (already the sitemap entry, line ~96) and /request-quote now 308s to it via
    // next.config.ts. All 13 internal links were repointed at /quote in the same
    // commit so nothing hops through the redirect.
    //
    // STILL OPEN — which FORM /quote renders. The deleted page used
    // RequestQuoteForm (name, phone, email, address, zip, plan, service, message);
    // /quote uses ScheduleRequest (name, email, tel). Richer data vs. lower
    // friction. Both post to the same endpoint, so swapping is a one-line change
    // in app/quote/page.tsx with no URL churn. Phillip's call.
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

  const pestLibraryPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pest-library`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    ...getAllPests().map((p) => ({
      url: `${BASE_URL}/pest-library/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...mainPages, ...servicePages, ...comboPages, ...cityPages, ...serviceAreaPages, ...pestLibraryPages, ...blogPages];
}
