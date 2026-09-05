// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/layout.tsx
// Commit: feat: add Meta Pixel + GA4 enhanced event tracking (phone clicks, chat leads, CTA auto-track)
// Push: main
// ─────────────────────────────────────
/**
 * app/layout.tsx — EnviroCare root layout with full SEO stack
 * Updated May 16, 2026 — bakes in all known SEO assets from project history
 *
 * INCLUDES:
 *  - Site-wide metadata (title, description, og:image, Twitter card)
 *  - Google Analytics tag (G-CELEB90NKX) — confirmed from prior layout
 *  - Google Search Console verification meta tag
 *  - 3 LocalBusiness JSON-LD schemas (Birmingham, Lake Martin, Huntsville)
 *  - Playfair Display + DM Sans font preconnect
 *  - NO global Header/Footer wrapper — new pages have integrated nav/footer
 *
 * IMPORTANT: This REPLACES your existing app/layout.tsx.
 * Before pasting, compare with your current file to make sure you don't
 * lose anything custom you added. The pieces this file definitely includes:
 *   ✓ GA G-CELEB90NKX
 *   ✓ GSC verification jsPqwOPMFt1Felwq6xg6-SBxM1w0Sf1zybHX6MXth1M
 *   ✓ 3 LocalBusiness schemas
 *   ✓ og-image references
 *
 * If your current layout.tsx has anything else important (other tracking
 * pixels, additional schemas, custom providers, etc.), preserve those.
 */

import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import ChatWidgetLazy from '../components/ChatWidgetLazy';
import DeferredTracking from '../components/DeferredTracking';
import Header from '../components/shared/Header';
import America250Banner from '../components/America250Banner';
import Footer from '../components/shared/Footer';

// Self-hosted via next/font — removes the render-blocking Google Fonts
// stylesheet, applies font-display: swap, and preloads only what we use.
// This is the biggest lever on mobile LCP.
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});
import {
  ENVIROCARE_ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  SPEAKABLE_HOMEPAGE,
} from '../lib/seo/organization-schema';
import './globals.css';

// Mobile viewport — without this, phones render the desktop layout zoomed out,
// causing element overlap, a cropped logo, and buttons running off-screen.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.envirocarellc.com'),
  title: {
    default: 'EnviroCare — Family-Owned Alabama Since 1958',
    template: '%s',
  },
  description:
    'Family-owned Alabama pest control since 1958. Bi-monthly pest service, Sentricon® termite protection with $1M EnviroCare coverage subject to the terms of the agreement, mosquito and tick yard treatment, subject to the terms of the agreement. Four offices: Birmingham, Alabaster, Lake Martin, Huntsville. Call (205) 940-6360.',
  // meta keywords removed 2026-07-24 — Google has ignored the tag since 2009;
  // it only signals "template site" to anything parsing the markup.
  authors: [{ name: 'EnviroCare, LLC' }],
  creator: 'EnviroCare, LLC',
  publisher: 'EnviroCare, LLC',
  formatDetection: { telephone: false, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // NOTE: no hard-coded `url` here — a root-level og:url is inherited by every
    // page that doesn't set its own, so og:url pointed at the homepage while each
    // page's canonical pointed at itself (Ahrefs: "OG URL not matching canonical").
    siteName: 'EnviroCare',
    title: 'EnviroCare — Family-Owned Alabama Since 1958',
    description:
      'Bi-monthly pest control, Sentricon® termite protection with $1M EnviroCare coverage, mosquito and tick yard service. Four offices across Alabama.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EnviroCare — Family-Owned Alabama Since 1958',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnviroCare — Alabama Since 1958',
    description:
      'Family-owned bi-monthly pest control, Sentricon® termite protection with $1M EnviroCare coverage. Four Alabama offices.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Google Search Console verification from May 15 setup
    google: 'jsPqwOPMFt1Felwq6xg6-SBxM1w0Sf1zybHX6MXth1M',
  },
};

// ─── 4 LocalBusiness JSON-LD schemas (one per office)
//
// ⚠ FIXED 2026-08-09 — ENTITY COLLISION. This block previously held ONE node named
// BIRMINGHAM_SCHEMA that carried '@id': '.../#birmingham' with the ALABASTER NAP
// (2025 Butler Rd, +1-205-940-6360, Alabaster's GBP cid) while pointing url at
// /birmingham. lib/schema.tsx:91 used the SAME '#birmingham' @id with the real
// Birmingham NAP (2025 Butler Rd, +1-205-940-6360). Google merges nodes by @id,
// so every page emitted one business with two addresses and two phone numbers.
// Live /birmingham showed both: 940-6360 in 6 places, 991-2882 in 10.
//
// Cause is the documented naming trap: OfficeId 'birmingham' in data/offices.ts IS
// the Alabaster office (named for the metro it served). When the real city office
// opened 2026-08-05 this node was never split. Territory split below matches
// data/cities.ts exactly.
const ALABASTER_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'PestControlService',
  '@id': 'https://www.envirocarellc.com/#alabaster',
  name: 'EnviroCare — Alabaster',
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'Family-owned Alabaster and Shelby County pest control and termite service. Sentricon® termite protection, bi-monthly perimeter service, mosquito and tick yard treatment.',
  url: 'https://www.envirocarellc.com/alabaster',
  telephone: '+1-205-940-6360',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2025 Butler Rd',
    addressLocality: 'Alabaster',
    addressRegion: 'AL',
    postalCode: '35007',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.2106, longitude: -86.8164 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' },
  ],
  // Shelby County minus Chelsea and the Hwy 280 / 35242 corridor, which route to
  // the city office. Matches the ...BHM cities in data/cities.ts.
  areaServed: ['Alabaster','Pelham','Helena','Calera'],
  sameAs: ['https://www.envirocarellc.com','https://www.google.com/maps?cid=7378341068021381374'],

};

const BIRMINGHAM_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'PestControlService',
  '@id': 'https://www.envirocarellc.com/#birmingham',
  // Per-location name: the Birmingham door sign reads "EnviroCare Pest Services".
  name: 'EnviroCare Pest Services',
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'Family-owned Birmingham pest control and termite service. Sentricon® termite protection, bi-monthly perimeter service, mosquito and tick yard treatment across the Birmingham metro.',
  url: 'https://www.envirocarellc.com/birmingham',
  telephone: '+1-205-940-6360',
  priceRange: '$$',
  // Was streetAddress '2025 Butler Rd, Alabaster' / addressLocality 'Birmingham'
  // / postalCode '35205' — Alabaster's street and phone with Birmingham's city
  // and ZIP, the same mashup this pack just removed from 21 metro pages. Left
  // here it would have contradicted every page it appears on, in JSON-LD, which
  // AGENTS.md §6 counts as live copy. §4 already settles which way it resolves:
  // (205) 991-2882 and 2120 16th Ave S are retired from customer-facing pages
  // (2026-08-24) because that office has no GBP, so Alabaster is the only NAP
  // this node can carry. telephone below was already 940-6360.
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2025 Butler Rd',
    addressLocality: 'Alabaster',
    addressRegion: 'AL',
    postalCode: '35007',
    addressCountry: 'US',
  },
  // No `geo` and no Google Maps `sameAs`: this office has NO Google Business
  // Profile yet. Do not invent coordinates and do not point sameAs at another
  // office's listing — that is what created the collision this block just fixed.
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' },
  ],
  // The ...BHM_CITY cities in data/cities.ts.
  areaServed: ['Birmingham','Homewood','Mountain Brook','Vestavia Hills','Hoover','Chelsea','Trussville','Greystone','Mt Laurel'],
  parentOrganization: {
    '@type': 'Organization',
    '@id': 'https://www.envirocarellc.com/#organization',
    // Must match lib/seo/organization-schema.ts EXACTLY -- this shares the
    // '#organization' @id with it, so a different name here merges into one
    // entity carrying two names. That is the same defect just fixed on
    // '#birmingham'. legalName lives on the Organization node, not here.
    name: 'EnviroCare Pest Services',
    url: 'https://www.envirocarellc.com/',
  },
  sameAs: ['https://www.envirocarellc.com'],

};

const LAKE_MARTIN_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.envirocarellc.com/#lake-martin',
  name: 'EnviroCare — Alex City / Lake Martin',
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'EnviroCare\'s original 1958 office. Family-owned pest control, Sentricon® termite protection, mosquito and tick service for Lake Martin and East Alabama.',
  url: 'https://www.envirocarellc.com/lake-martin',
  telephone: '+1-256-234-6162',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1785 Tallapoosa St',
    addressLocality: 'Alexander City',
    addressRegion: 'AL',
    postalCode: '35010',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 32.9539, longitude: -85.9536 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' },
  ],
  areaServed: ['Lake Martin','Alexander City','Dadeville','Eclectic','Auburn','Opelika'],
  sameAs: ['https://www.envirocarellc.com','https://www.google.com/maps?cid=12101127141767078247'],

};

const HUNTSVILLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.envirocarellc.com/#huntsville',
  name: 'EnviroCare — Huntsville',
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'Family-owned Huntsville pest control and termite service. Sentricon® baiting, $1M EnviroCare coverage, bi-monthly perimeter service, mosquito and tick yard treatment across North Alabama.',
  url: 'https://www.envirocarellc.com/huntsville',
  telephone: '+1-256-937-7676',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7027 Old Madison Pike, Ste 108',
    addressLocality: 'Huntsville',
    addressRegion: 'AL',
    postalCode: '35806',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 34.7121, longitude: -86.6867 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' },
  ],
  areaServed: ['Huntsville','Madison','Athens','Decatur','Hartselle','Harvest','Hampton Cove'],
  sameAs: ['https://www.envirocarellc.com','https://maps.app.goo.gl/p5fJg2GoAr3Vk3Ua8'],

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Fonts are now self-hosted via next/font (see top of file) —
            no external Google Fonts stylesheet needed. */}

        {/* LocalBusiness structured data — one per office (4 as of 2026-08-05) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BIRMINGHAM_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ALABASTER_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LAKE_MARTIN_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HUNTSVILLE_SCHEMA) }}
        />
        {/* AEO master schemas — Organization (with sameAs for AI entity verification),
            WebSite (publisher reference), and Speakable (voice assistant pickup).
            These are the highest-leverage schemas for ChatGPT / Perplexity / Gemini
            and Google AI Overview visibility. See lib/seo/organization-schema.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ENVIROCARE_ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SPEAKABLE_HOMEPAGE) }}
        />
      </head>
      <body>
        {/*
          SITEWIDE HEADER (2026-06-27): the single sticky <Header /> renders once
          here so every route — homepage, deep city/service pages, /pricing — gets
          the same nav. Individual pages must NOT render their own <Header /> or it
          will double up. (Footer stays per-page.)
        */}
        <America250Banner />
        <Header />
        {children}
        <Footer />
        <ChatWidgetLazy />

        {/* GA4 + Meta Pixel — deferred until first user interaction or 5 s idle.
            Saves ~345 KiB from the LCP window; see components/DeferredTracking.tsx. */}
        <DeferredTracking />
      </body>
    </html>
  );
}
