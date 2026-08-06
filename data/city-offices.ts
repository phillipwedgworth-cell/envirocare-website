/**
 * data/city-offices.ts — route (city slug) → which office answers the phone.
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/city-offices.ts
 * Commit: fix(header): Auburn/Opelika call button dials the direct Auburn line
 * Push:   main
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
import { OFFICES, SERVICE_CITY_NUMBERS, type OfficeId } from './offices';

/** Huntsville office — (256) 937-7676 */
const HUNTSVILLE_SLUGS = [
  'huntsville',
  'huntsville-exterminator',
  'huntsville-mosquito-control',
  'huntsville-termite-control',
  'madison',
  'madison-pest-control',
  'madison-exterminator',
  'madison-mosquito-control',
  'madison-termite-control',
  'madison-commercial-pest-control',
  'decatur-pest-control',
  'decatur-exterminator',
  'decatur-mosquito-control',
  'decatur-termite-control',
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
  // Auburn/Opelika DISPATCH from the Lake Martin office, so they stay mapped here
  // for office/address purposes — but they do NOT show the Lake Martin phone.
  // They have their own local Auburn line; see SERVICE_CITY_SLUGS + phoneForPath.
  'auburn',
  'opelika',
] as const;

/**
 * Service cities that publish their OWN local number instead of their dispatch
 * office's. These are not offices (no staffed address) — the number forwards to
 * the office in SERVICE_CITY_NUMBERS[key].routesTo.
 *
 * Auburn: data/cities.ts markets '(334) 332-3321' as the direct Auburn line in
 * that page's metaTitle, metaDescription and FAQs ("you'll reach us fastest on
 * the direct Auburn line"). The header must dial the number the page advertises,
 * or the sticky call button silently contradicts the page copy — and the paid
 * Auburn presence number gets no attribution. Opelika is the same Lee County
 * market and its page promises that same line.
 */
const SERVICE_CITY_SLUGS: Record<
  string,
  { key: keyof typeof SERVICE_CITY_NUMBERS; label: string }
> = {
  auburn: { key: 'auburn', label: 'Auburn' },
  opelika: { key: 'auburn', label: 'Auburn / Opelika' },
};

export const CITY_OFFICE: Record<string, OfficeId> = Object.fromEntries([
  ...HUNTSVILLE_SLUGS.map((s): [string, OfficeId] => [s, 'huntsville']),
  ...LAKE_MARTIN_SLUGS.map((s): [string, OfficeId] => [s, 'lake-martin']),
  // /birmingham is the city office (opened 2026-08-05). Without this entry the
  // slug falls through to the 'birmingham' default below — which is the
  // ALABASTER office — and the sitewide header dialled 940-6360 on a page whose
  // body advertises 991-2882. Every other metro slug still defaults to Alabaster.
  ['birmingham', 'birmingham-downtown'] as [string, OfficeId],
]);

/**
 * Which office should the header phone show for this pathname?
 * Handles top-level city routes (/huntsville) and nested ones
 * (/service-areas/madison). Everything else → Birmingham.
 */
export function officeForPath(pathname: string): OfficeId {
  const slug = slugForPath(pathname);
  if (!slug) return 'birmingham';
  return CITY_OFFICE[slug] ?? 'birmingham';
}

/** First meaningful path segment, unwrapping /service-areas/<city>. */
function slugForPath(pathname: string): string | null {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;
  return parts[0] === 'service-areas' && parts[1] ? parts[1] : parts[0];
}

/**
 * Which phone should the header call button dial for this pathname?
 *
 * Service cities with their own local number win over their dispatch office
 * (see SERVICE_CITY_SLUGS). Everything else uses its office's number, and
 * anything unmapped falls back to Birmingham — so a new route can never render
 * a wrong number, only the main one.
 */
export function phoneForPath(pathname: string): {
  phone: string;
  phoneHref: string;
  label: string;
} {
  const slug = slugForPath(pathname);
  const serviceCity = slug ? SERVICE_CITY_SLUGS[slug] : undefined;
  if (serviceCity) {
    const num = SERVICE_CITY_NUMBERS[serviceCity.key];
    return { phone: num.phone, phoneHref: num.phoneHref, label: serviceCity.label };
  }
  const office = OFFICES[officeForPath(pathname)];
  return { phone: office.phone, phoneHref: office.phoneHref, label: office.name };
}
