/**
 * data/service-areas.ts — SINGLE SOURCE OF TRUTH: markets → cities → office
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/service-areas.ts
 * Commit: feat(data): add service-areas source of truth
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * TUSCALOOSA IS EXCLUDED — EnviroCare does not service it. Any city page, nav,
 * footer, or zip-to-office entry that includes Tuscaloosa is a bug.
 * (Note: data/zip-to-office.ts currently lists Tuscaloosa under Birmingham —
 * fix that during migration.)
 *
 * Each city maps to the office + phone that actually serves it, so pages and
 * schema never show the wrong number for a market.
 */

import type { OfficeId } from './offices';

export interface Market {
  id: string;
  label: string;
  office: OfficeId;
  cities: string[];
}

export const MARKETS: Market[] = [
  {
    id: 'birmingham-metro',
    label: 'Birmingham Metro',
    office: 'birmingham',
    cities: [
      'Birmingham', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood',
      'Alabaster', 'Pelham', 'Helena', 'Calera', 'Chelsea', 'Trussville',
      'Greystone', 'Mt Laurel', 'Gardendale', 'Bessemer', 'Leeds', 'Moody',
      'Fultondale', 'Indian Springs', 'Oak Mountain',
      // Tuscaloosa intentionally OMITTED — not serviced.
    ],
  },
  {
    id: 'huntsville-metro',
    label: 'Huntsville / North Alabama',
    office: 'huntsville',
    cities: [
      'Huntsville', 'Madison', 'Hampton Cove', 'Athens', 'Decatur',
      'Hartselle', 'Harvest', 'New Market', 'Meridianville', 'Toney',
    ],
  },
  {
    id: 'lake-martin',
    label: 'Lake Martin / Alexander City',
    office: 'lake-martin',
    cities: [
      'Alexander City', 'Dadeville', 'Eclectic', 'Wilsonville',
      // Lake Martin communities
      'Willow Point', 'The Ridge', 'StillWaters', 'The Heritage',
    ],
  },
  {
    id: 'auburn-opelika',
    label: 'Auburn / Opelika',
    office: 'lake-martin', // routes through the Lake Martin office
    cities: ['Auburn', 'Opelika'],
  },
];

/** Cities EnviroCare does NOT serve (guard against accidental page creation). */
export const EXCLUDED_CITIES = ['Tuscaloosa'];
