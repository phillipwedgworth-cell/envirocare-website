// lib/seo/breadcrumbs.ts — one BreadcrumbList builder for every page type.
//
// WHY THIS EXISTS: BreadcrumbList was on 50 of 160 built pages. The 110 without it
// were not a list of forgotten files — they are the pages rendered by the seven
// SHARED components (CityPage, ComboPage, DeepCityPage, NeighborhoodPage,
// ServicePage, PestLibraryPage, BlogPostPage), none of which emitted one, while
// ClusterAreaPage and a handful of hand-written routes did. So the gap tracked
// component boundaries, not effort.
//
// Fixing it per-page would mean 110 edits and a 111th page shipping without it next
// week. Fixing it in the components is seven edits and the default becomes correct.
//
// Google renders the breadcrumb trail in the SERP from this markup, and it wants the
// trail to match the page's actual position in the site — so each caller passes its
// real parent chain rather than a generic Home > Page.

const BASE = 'https://www.envirocarellc.com';

export type Crumb = {
  /** Visible label, e.g. "Service Areas" */
  name: string;
  /** Path with a leading slash, e.g. "/service-areas". Omit for the current page —
   *  Google accepts a trailing item without `item`, and it avoids asserting a URL
   *  for a page that may be a dynamic segment. */
  path?: string;
};

/**
 * Build a BreadcrumbList node. Always prepends Home, so callers pass only the
 * trail below it:
 *
 *   breadcrumbList([{ name: 'Service Areas', path: '/service-areas' },
 *                   { name: 'Hoover', path: '/hoover' }])
 *
 * Returns a plain object to be embedded in an existing @graph or emitted on its own.
 */
export function breadcrumbList(trail: Crumb[]) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      // `item` omitted on a crumb with no path — valid, and better than inventing one.
      ...(c.path ? { item: c.path === '/' ? BASE : `${BASE}${c.path}` } : {}),
    })),
  };
}
