import type { MetadataRoute } from 'next';

// Staging — disallow all crawlers until DNS flips to envirocarellc.com
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', disallow: '/' },
    ],
    sitemap: 'https://envirocare-web.vercel.app/sitemap.xml',
    host: 'https://envirocare-web.vercel.app',
  };
}
