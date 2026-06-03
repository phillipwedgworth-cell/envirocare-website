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

// =================== JSON-LD STRUCTURED DATA ===================
const birminghamJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PestControlService',
  '@id': `${SITE_URL}/#birmingham`,
  name: 'EnviroCare Pest & Termite Services — Birmingham',
  image: `${SITE_URL}/og-image.png`,
  description:
    'Family-owned Birmingham pest control and termite service since 1958. Sentricon® $1M coverage, bi-monthly perimeter service, mosquito and tick yard treatment.',
  url: `${SITE_URL}/birmingham`,
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
};

const lakeMartinJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PestControlService',
  '@id': `${SITE_URL}/#lake-martin`,
  name: "EnviroCare Pest & Termite Services — Alex City / Lake Martin",
  image: `${SITE_URL}/og-image.png`,
  description:
    "EnviroCare's original 1958 office. Family-owned pest control, Sentricon® termite protection, mosquito and tick service for Lake Martin and East Alabama.",
  url: `${SITE_URL}/lake-martin`,
  telephone: '+1-256-234-6162',
  priceRange: '$$',
  foundingDate: '1958',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1785 Tallapoosa St',
    addressLocality: 'Alexander City',
    addressRegion: 'AL',
    postalCode: '35010',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
};

const huntsvilleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PestControlService',
  '@id': `${SITE_URL}/#huntsville`,
  name: 'EnviroCare Pest & Termite Services — Huntsville',
  image: `${SITE_URL}/og-image.png`,
  description:
    'Family-owned Huntsville pest control and termite service. Sentricon® $1M coverage, bi-monthly perimeter service, mosquito and tick yard treatment across North Alabama.',
  url: `${SITE_URL}/huntsville`,
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'EnviroCare Pest & Termite Services',
  alternateName: 'EnviroCare',
  url: SITE_URL,
<<<<<<< HEAD
  logo: `${SITE_URL}/logo.png`,
=======
  logo: '/logo.png',
>>>>>>> fix/prelaunch-batch
  foundingDate: '1958',
  founder: {
    '@type': 'Person',
    name: 'Phillip M. Wedgworth',
  },
  description:
    'Three generations of family-owned pest and termite control across Alabama. Founded 1958 in Alexander City.',
  slogan: 'No One Cares Like EnviroCare.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-205-649-5278',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Preload the hero truck image — biggest LCP element */}
        <link rel="preload" as="image" href="/truck.jpg" fetchPriority="high" />

        {/* JSON-LD Structured Data — 4 schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(birminghamJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lakeMartinJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(huntsvilleJsonLd) }}
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
