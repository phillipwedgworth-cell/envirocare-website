/**
 * data/city-offices.ts — route (city slug) → which office answers the phone.
 *
 * WHY THIS FILE EXISTS (and is not just derived from data/cities.ts):
 * The sitewide <Header /> is a CLIENT component. data/cities.ts is ~130KB of
 * per-city copy, FAQs, and pest content — importing it into the client bundle to
 * read one phone number would be a serious regression. This module is tiny and
 * safe to ship to the browser; it only pulls in data/offices.ts (the declared
 * single source of truth for phones).
 *
 * SOURCE OF TRUTH for the mapping below:
 *   1. data/cities.ts  — each city spreads BHM / LKM / HSV (its office)
 *   2. each area page's own body copy — verified every non-Birmingham page renders
 *      exactly one office phone, with zero conflicts (audit 2026-07-12)
 *
 * DEFAULT IS BIRMINGHAM. Anything not listed here falls back to the main
 * (205) 940-6360 line — i.e. the previous sitewide behavior — so an unmapped or
 * new route can never render a wrong number, only the main one.
 *
 * If you add a Huntsville- or Lake-Martin-area page, add its slug here too.
 */
import type { OfficeId } from './offices';

/** Huntsville office — (256) 937-7676 */
const HUNTSVILLE_SLUGS = [
  'huntsville',
  'huntsville-exterminator',
  'huntsville-mosquito-control',
  'huntsville-termite-control',
  'madison',
  'redstone-arsenal',
  'athens',
  'decatur',
  'hartselle',
  'harvest',
  'hampton-cove',
  'meridianville',
  'north-alabama',
] as const;

/** Alexander City / Lake Martin office — (256) 234-6162 */
const LAKE_MARTIN_SLUGS = [
  'lake-martin',
  'lake-martin-area',
  'alexander-city',
  'dadeville',
  'eclectic',
  'sylacauga',
  'stillwaters',
  'willow-point',
  'the-ridge',
  'the-heritage',
  // Auburn/Opelika are service cities that route to the Lake Martin office.
  // (offices.ts also lists an Auburn forwarding line; the header intentionally
  // shows the office number the Auburn page itself renders.)
  'auburn',
  'opelika',
] as const;

export const CITY_OFFICE: Record<string, OfficeId> = Object.fromEntries([
  ...HUNTSVILLE_SLUGS.map((s): [string, OfficeId] => [s, 'huntsville']),
  ...LAKE_MARTIN_SLUGS.map((s): [string, OfficeId] => [s, 'lake-martin']),
]);

/**
 * Which office should the header phone show for this pathname?
 * Handles top-level city routes (/huntsville) and nested ones
 * (/service-areas/madison). Everything else → Birmingham.
 */
export function officeForPath(pathname: string): OfficeId {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'birmingham';
  const slug = parts[0] === 'service-areas' && parts[1] ? parts[1] : parts[0];
  return CITY_OFFICE[slug] ?? 'birmingham';
}
