import type { MetadataRoute } from 'next';

const BASE = 'https://envirocarellc.com';

const ROUTES = [
  // Top-level
  '/',
  '/about-us',
  '/contact-us',
  '/quote',
  '/special-offers',
  '/builders',
  '/bundle-services',
  // Service pages
  '/services/pest-control',
  '/services/termite-control',
  '/services/mosquito-control',
  '/services/tick-control',
  '/services/sentricon',
  '/services/fire-ant',
  '/services/flea',
  '/services/crawlspace',
  '/services/builder',
  '/services/commercial',
  '/services/real-estate-wdo',
  // City pages — Birmingham region
  '/birmingham',
  '/hoover',
  '/chelsea',
  '/pelham',
  '/alabaster',
  '/vestavia-hills',
  '/mountain-brook',
  '/homewood',
  '/helena',
  '/calera',
  '/trussville',
  '/greystone',
  // City pages — Lake Martin / East Alabama region
  '/lake-martin',
  '/alexander-city',
  '/dadeville',
  '/eclectic',
  '/auburn',
  '/opelika',
  '/mt-laurel',
  // City pages — Huntsville / North Alabama region
  '/huntsville',
  '/madison',
  '/athens',
  '/decatur',
  '/hartselle',
  '/harvest',
  '/hampton-cove',
  // City pages — other
  '/tuscaloosa',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : path.startsWith('/services/') ? 0.9 : path === '/quote' || path === '/contact-us' ? 0.9 : 0.8,
  }));
}
