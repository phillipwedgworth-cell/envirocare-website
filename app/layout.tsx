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
import Script from 'next/script';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import ChatWidget from '../components/ChatWidget';
import Header from '../components/shared/Header';
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
    default: 'EnviroCare Pest & Termite Services — Family-Owned Alabama Since 1958',
    template: '%s',
  },
  description:
    'Family-owned Alabama pest control since 1958. Bi-monthly pest service, Sentricon® termite protection with $1M coverage, mosquito and tick yard treatment. Three offices: Birmingham, Lake Martin, Huntsville. Call (205) 940-6360.',
  keywords: [
    'Alabama pest control',
    'Birmingham pest control',
    'Lake Martin pest control',
    'Huntsville pest control',
    'Auburn pest control',
    'Sentricon termite',
    'Alabama termite service',
    'family-owned pest control Alabama',
    'EnviroCare',
  ],
  authors: [{ name: 'EnviroCare Pest & Termite Services LLC' }],
  creator: 'EnviroCare Pest & Termite Services LLC',
  publisher: 'EnviroCare Pest & Termite Services LLC',
  formatDetection: { telephone: false, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.envirocarellc.com',
    siteName: 'EnviroCare Pest & Termite Services',
    title: 'EnviroCare Pest & Termite Services — Family-Owned Alabama Since 1958',
    description:
      'Bi-monthly pest control, Sentricon® termite protection with $1M coverage, mosquito and tick yard service. Three offices across Alabama.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EnviroCare Pest & Termite Services — Family-Owned Alabama Since 1958',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnviroCare Pest & Termite Services — Alabama Since 1958',
    description:
      'Family-owned bi-monthly pest control, Sentricon® termite protection with $1M coverage. Three Alabama offices.',
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

// ─── 3 LocalBusiness JSON-LD schemas (one per office)
const BIRMINGHAM_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.envirocarellc.com/#birmingham',
  name: 'EnviroCare Pest & Termite Services — Birmingham',
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'Family-owned Birmingham pest control and termite service since 1958. Sentricon® $1M coverage, bi-monthly perimeter service, mosquito and tick yard treatment.',
  url: 'https://www.envirocarellc.com/birmingham',
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
  areaServed: ['Birmingham','Hoover','Vestavia Hills','Mountain Brook','Homewood','Alabaster','Chelsea','Pelham','Helena','Calera','Trussville','Greystone','Mt Laurel'],
  sameAs: ['https://www.envirocarellc.com','https://www.google.com/maps?cid=7378341068021381374'],

};

const LAKE_MARTIN_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.envirocarellc.com/#lake-martin',
  name: 'EnviroCare Pest & Termite Services — Alex City / Lake Martin',
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
  name: 'EnviroCare Pest & Termite Services — Huntsville',
  image: 'https://www.envirocarellc.com/og-image.png',
  description:
    'Family-owned Huntsville pest control and termite service. Sentricon® $1M coverage, bi-monthly perimeter service, mosquito and tick yard treatment across North Alabama.',
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

        {/* LocalBusiness structured data — one per office */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BIRMINGHAM_SCHEMA) }}
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
        <Header />
        {children}
        <Footer />
        <ChatWidget />

        {/* Google Analytics 4 — G-CELEB90NKX */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CELEB90NKX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CELEB90NKX');

            // ── EnviroCare event helpers (used by components + inline listeners) ──
            window.ecTrack = function(eventName, params) {
              gtag('event', eventName, params || {});
              if (window.fbq) fbq('trackCustom', eventName, params || {});
            };

            // Auto-track phone link clicks (tel: links)
            document.addEventListener('click', function(e) {
              var link = e.target.closest('a[href^="tel:"]');
              if (link) {
                var phone = link.href.replace('tel:', '');
                gtag('event', 'phone_click', {
                  event_category: 'engagement',
                  event_label: phone,
                  value: 1
                });
                if (window.fbq) fbq('track', 'Contact', { content_name: phone });
              }
            });

            // Auto-track email link clicks
            document.addEventListener('click', function(e) {
              var link = e.target.closest('a[href^="mailto:"]');
              if (link) {
                gtag('event', 'email_click', {
                  event_category: 'engagement',
                  event_label: link.href.replace('mailto:', '')
                });
              }
            });

            // Auto-track CTA button clicks (buttons/links with data-track attribute)
            document.addEventListener('click', function(e) {
              var el = e.target.closest('[data-track]');
              if (el) {
                gtag('event', el.getAttribute('data-track'), {
                  event_category: 'cta',
                  event_label: el.textContent.trim().substring(0, 50)
                });
              }
            });
          `}
        </Script>

        {/* Meta Pixel — envirocare main page (ID: 1945518562226719) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1945518562226719');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1945518562226719&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
