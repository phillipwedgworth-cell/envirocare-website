import type { Metadata } from 'next';

/**
 * withOpenGraph — make a page's Open Graph block complete.
 *
 * WHY THIS EXISTS
 * Next's metadata merge is SHALLOW per key: a page that exports `openGraph`
 * REPLACES the layout's whole `openGraph` object (type, locale, siteName, images)
 * instead of merging into it. Next only back-fills title/description from the
 * page's top-level fields. So a page that wrote just `{ url, images }` shipped
 * without og:type, og:site_name and og:locale, and a page that wrote
 * `{ title, description, url, type }` shipped without og:image. Ahrefs Site Audit
 * flagged those as "Open Graph tags incomplete".
 *
 * WHAT IT DOES
 * Fills ONLY what the page left out, from the page's own metadata:
 *   type      -> 'website'
 *   locale    -> 'en_US'
 *   siteName  -> 'EnviroCare'
 *   title     -> the page's own <title>
 *   description -> the page's own meta description
 *   url       -> the page's own canonical (alternates.canonical)
 *   images    -> the site default card
 * Anything the page states explicitly wins.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 * It never invents an og:url. A root-level og:url made every page point at the
 * homepage (see the NOTE in app/layout.tsx), so url is only ever taken from the
 * page's own canonical. No canonical and no url -> no og:url.
 */

export const OG_SITE_NAME = 'EnviroCare';
export const OG_LOCALE = 'en_US';
export const OG_DEFAULT_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'EnviroCare — Family-Owned Alabama Since 1958',
} as const;

function plainTitle(title: Metadata['title']): string | undefined {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object') {
    if ('absolute' in title && title.absolute) return title.absolute;
    if ('default' in title && title.default) return title.default;
  }
  return undefined;
}

function canonicalOf(meta: Metadata): string | undefined {
  const c = meta.alternates?.canonical;
  if (typeof c === 'string') return c;
  if (c instanceof URL) return c.toString();
  return undefined;
}

export function withOpenGraph(meta: Metadata): Metadata {
  const og = (meta.openGraph ?? {}) as Record<string, unknown>;
  const filled: Record<string, unknown> = { ...og };

  if (!filled.type) filled.type = 'website';
  if (!filled.locale) filled.locale = OG_LOCALE;
  if (!filled.siteName) filled.siteName = OG_SITE_NAME;

  const title = plainTitle(meta.title);
  if (!filled.title && title) filled.title = title;
  if (!filled.description && meta.description) filled.description = meta.description;

  const canonical = canonicalOf(meta);
  if (!filled.url && canonical) filled.url = canonical;

  const images = filled.images;
  const hasImages = Array.isArray(images) ? images.length > 0 : Boolean(images);
  if (!hasImages) filled.images = [OG_DEFAULT_IMAGE];

  return { ...meta, openGraph: filled as Metadata['openGraph'] };
}
