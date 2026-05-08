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
  // City pages
  '/birmingham',
  '/hoover',
  '/chelsea',
  '/pelham',
  '/alabaster',
  '/vestavia-hills',
  '/mountain-brook',
  '/lake-martin',
  '/alexander-city',
  '/dadeville',
  '/eclectic',
  '/auburn',
  '/huntsville',
  '/madison',
  '/athens',
  '/decatur',
  '/hartselle',
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
