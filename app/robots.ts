import type { MetadataRoute } from 'next';

// Admin / non-content paths. Kept in one place because robots.txt groups do NOT
// inherit: a named user-agent group is matched INSTEAD of the `*` group, never in
// addition to it. Listing these only under `*` (as this file did until 2026-08-11)
// left /api/, /approve, /ads/, /command-center and /pay crawlable by all eight
// named AI bots — the opposite of what the `*` group was written to express.
const DISALLOW = ['/api/', '/approve', '/ads/', '/command-center', '/pay'];

// Explicitly welcome AI crawlers — being cited in AI answers is part of the SEO
// strategy. Do not add content blocks for these bots; they get the same DISALLOW
// as everyone else and nothing more.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.envirocarellc.com'}/sitemap.xml`,
  };
}
