import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome AI crawlers — being cited in AI answers is part of
      // the SEO strategy. Do not add blocks for these bots.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/approve', '/command-center', '/pay'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.envirocarellc.com'}/sitemap.xml`,
  };
}
