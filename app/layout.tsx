import type { Metadata, Viewport } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});
import StickyCallButton from '@/components/StickyCallButton';
import LogoFix from '@/components/LogoFix';
import ChatWidget from '@/components/ChatWidget';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://envirocarellc.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'EnviroCare Pest & Termite Services | Family-Owned Alabama Since 1958',
    template: '%s | EnviroCare Pest & Termite',
  },
  description:
    'Family-owned Alabama pest & termite control since 1958. Three offices: Birmingham, Lake Martin, Huntsville. Sentricon® $1M coverage, bi-monthly pest control from $35/mo. Call (205) 649-5278.',
  keywords: [
    'pest control alabama',
    'termite control birmingham',
    'sentricon alabama',
    'mosquito control huntsville',
    'lake martin pest control',
    'pest control auburn al',
    'family owned pest control',
    'envirocare',
  ],
  authors: [{ name: 'EnviroCare Pest & Termite Services' }],
  creator: 'EnviroCare Pest & Termite Services',
  publisher: 'EnviroCare Pest & Termite Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: 'EnviroCare Pest & Termite Services | Alabama Since 1958',
    description:
      'Three generations of Alabama families trust EnviroCare. Sentricon® $1M coverage, bi-monthly pest control, mosquito & tick. Birmingham · Lake Martin · Huntsville.',
    url: SITE_URL,
    siteName: 'EnviroCare Pest & Termite Services',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EnviroCare Pest & Termite — Family-Owned Alabama Since 1958',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnviroCare Pest & Termite Services | Alabama Since 1958',
    description:
      'Family-owned Alabama pest control. Sentricon® $1M coverage. Birmingham · Lake Martin · Huntsville.',
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'jsPqwOPMFt1Felwq6xg6-SBxM1w0Sf1zybHX6MXth1M',
  },
  alternates: {
    canonical: './',
  },
};

export const viewport: Viewport = {
  themeColor: '#0E8E40',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// =================== JSON-LD STRUCTURED DATA (@graph) ===================
const HOURS_SPEC = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
];

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'EnviroCare Pest & Termite Services',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      foundingDate: '1958',
      slogan: 'No One Cares Like EnviroCare',
      telephone: '+1-205-649-5278',
      areaServed: 'Alabama',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'EnviroCare Pest & Termite Services',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'PestControlService',
      '@id': `${SITE_URL}/#birmingham`,
      name: 'EnviroCare Pest & Termite Services — Birmingham',
      image: `${SITE_URL}/logo.png`,
      url: `${SITE_URL}/birmingham`,
      telephone: '+1-205-940-6360',
      priceRange: '$$',
      parentOrganization: { '@id': `${SITE_URL}/#org` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2025 Butler Rd',
        addressLocality: 'Alabaster',
        addressRegion: 'AL',
        postalCode: '35007',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 33.2348, longitude: -86.8164 },
      openingHoursSpecification: HOURS_SPEC,
      areaServed: ['Birmingham', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood', 'Alabaster', 'Chelsea', 'Pelham', 'Helena', 'Calera', 'Trussville', 'Greystone', 'Mt Laurel'],
    },
    {
      '@type': 'PestControlService',
      '@id': `${SITE_URL}/#alexcity`,
      name: 'EnviroCare Pest & Termite Services — Alex City / Lake Martin',
      image: `${SITE_URL}/logo.png`,
      url: `${SITE_URL}/alexander-city`,
      telephone: '+1-256-234-6162',
      priceRange: '$$',
      parentOrganization: { '@id': `${SITE_URL}/#org` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1785 Tallapoosa St',
        addressLocality: 'Alexander City',
        addressRegion: 'AL',
        postalCode: '35010',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 32.9440, longitude: -85.9536 },
      openingHoursSpecification: HOURS_SPEC,
      areaServed: ['Alexander City', 'Lake Martin', 'Dadeville', 'Eclectic', 'Auburn', 'Opelika', 'Jacksons Gap', 'Wetumpka'],
    },
    {
      '@type': 'PestControlService',
      '@id': `${SITE_URL}/#huntsville`,
      name: 'EnviroCare Pest & Termite Services — Huntsville',
      image: `${SITE_URL}/logo.png`,
      url: `${SITE_URL}/huntsville`,
      telephone: '+1-256-937-7676',
      priceRange: '$$',
      parentOrganization: { '@id': `${SITE_URL}/#org` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7027 Old Madison Pike, Ste 108',
        addressLocality: 'Huntsville',
        addressRegion: 'AL',
        postalCode: '35806',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 34.7252, longitude: -86.6745 },
      openingHoursSpecification: HOURS_SPEC,
      areaServed: ['Huntsville', 'Madison', 'Athens', 'Decatur', 'Hartselle', 'Harvest', 'Hampton Cove'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Preload truck images — LCP candidates on mobile and desktop */}
        <link rel="preload" as="image" href="/truck-mobile.webp" fetchPriority="high" type="image/webp" />

        {/* JSON-LD Structured Data — @graph (Org + WebSite + 3 offices) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />

        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CELEB90NKX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CELEB90NKX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        {/* CSS overrides for logo sizing — runs site-wide */}
        <LogoFix />

        {/* The page content */}
        {children}

        {/* Mobile-only sticky call button with zip-aware office routing */}
        <StickyCallButton />

        {/* AI chat assistant — all pages, green bubble bottom-right */}
        <ChatWidget />
      </body>
    </html>
  );
}
