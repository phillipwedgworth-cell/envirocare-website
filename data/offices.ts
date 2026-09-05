/**
 * data/offices.ts — SINGLE SOURCE OF TRUTH: offices, phones, addresses
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/offices.ts
 * Commit: feat(data): add offices source of truth
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * The dead Scorpion tracking number (205) 649-5278 is BANNED. It must never
 * appear in any office, page, or schema. compliance.ts enforces this.
 *
 * OfficeId matches data/zip-to-office.ts.
 */

// NAMING TRAP: the id 'birmingham' below is the ALABASTER office (2025 Butler Rd)
// — it is named for the metro it serves, not the city it sits in. The actual
// Birmingham city office added 2026-08-05 is 'birmingham-downtown'. Do not
// rename 'birmingham'; data/zip-to-office.ts keys metro ZIP routing off it.
export type OfficeId = 'birmingham' | 'birmingham-downtown' | 'lake-martin' | 'huntsville';

export interface Office {
  id: OfficeId;
  /** Public-facing office label */
  name: string;
  /** Real physical address (staffed). Service-area-only markets are NOT offices. */
  address: { street: string; city: string; region: 'AL'; postalCode: string };
  /** The ONE phone for this office. No tracking numbers. */
  phone: string; // display format
  phoneHref: string; // tel: digits
  /** Markets this office serves (see service-areas.ts for full city lists). */
  servesMarkets: string[];
  googleBusinessProfile?: string;
}

export const OFFICES: Record<OfficeId, Office> = {
  birmingham: {
    id: 'birmingham',
    name: 'Birmingham / Alabaster',
    address: { street: '2025 Butler Rd', city: 'Alabaster', region: 'AL', postalCode: '35007' },
    phone: '(205) 940-6360', // real MAIN line
    phoneHref: 'tel:+12059406360',
    servesMarkets: ['birmingham-metro'],
    googleBusinessProfile: 'https://www.google.com/maps?cid=7378341068021381374',
  },
  // Birmingham city office — CONFIRMED by Phillip 2026-08-05, incl. Suite 302.
  // GBP verified 2026-09-05 (place_id ChIJjXGa0ZsbiYgR1mB0oEKnqUo), so the
  // googleBusinessProfile link below is now populated. It was deliberately
  // absent for as long as no profile existed.
  //
  // ✅ SETTLED 2026-09-05 (Phillip: "Hoover goes to Birmingham as Over the
  // Mountain"). The question this comment used to leave open — which number
  // Birmingham-metro pages display — is answered: Jefferson County pages point
  // at this office, Shelby County pages stay on Alabaster. data/city-offices.ts
  // holds the split. The 2026-08-24 retirement of this line was conditional on
  // there being no GBP; that condition no longer holds.
  'birmingham-downtown': {
    id: 'birmingham-downtown',
    name: 'Birmingham',
    address: { street: '2120 16th Ave S, Ste 302', city: 'Birmingham', region: 'AL', postalCode: '35205' },
    // Verified GBP, confirmed live 2026-09-05: 5.0 / 10 reviews, hours M–F 8–5.
    googleBusinessProfile: 'https://www.google.com/maps/place/?q=place_id:ChIJjXGa0ZsbiYgR1mB0oEKnqUo',
    phone: '(205) 991-2882',
    phoneHref: 'tel:+12059912882',
    servesMarkets: ['birmingham-metro'],
  },
  'lake-martin': {
    id: 'lake-martin',
    name: 'Alexander City / Lake Martin',
    address: { street: '1785 Tallapoosa St', city: 'Alexander City', region: 'AL', postalCode: '35010' },
    phone: '(256) 234-6162', // serves Alex City + Lake Martin; Auburn routes here
    phoneHref: 'tel:+12562346162',
    servesMarkets: ['lake-martin', 'auburn-opelika'],
    googleBusinessProfile: 'https://www.google.com/maps?cid=12101127141767078247',
  },
  huntsville: {
    id: 'huntsville',
    name: 'Huntsville',
    address: { street: '7027 Old Madison Pike, Ste 108', city: 'Huntsville', region: 'AL', postalCode: '35806' },
    phone: '(256) 937-7676',
    phoneHref: 'tel:+12569377676',
    servesMarkets: ['huntsville-metro'],
    googleBusinessProfile: 'https://maps.app.goo.gl/p5fJg2GoAr3Vk3Ua8',
  },
};

/** Auburn is a SERVICE CITY, not an office. Its number forwards to Lake Martin. */
export const SERVICE_CITY_NUMBERS = {
  auburn: { phone: '(334) 332-3321', phoneHref: 'tel:+13343323321', routesTo: 'lake-martin' as OfficeId },
};

/** Numbers that must NEVER appear on the site (enforced by compliance.ts). */
export const BANNED_PHONE_NUMBERS = ['2056495278', '205-649-5278', '(205) 649-5278'];
