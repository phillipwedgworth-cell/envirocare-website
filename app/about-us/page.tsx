import type { Metadata } from 'next';
import AboutUs from '@/components/pages/AboutUs';

export const metadata: Metadata = {
  title: 'About EnviroCare — Alabama Pest Control Since 1958',
  description:
    "EnviroCare is the Wedgworth family — doing pest control in Alabama since 1958, starting in Alexander City, now four generations on. Four Alabama offices, two ways to pay.",
  alternates: { canonical: '/about-us' },
  openGraph: {
    title: 'About EnviroCare — Family-Owned in Alabama Since 1958',
    description:
      'Four generations of the Wedgworth family. Four Alabama offices. One promise that hasn\'t changed since 1958.',
    url: '/about-us',
    type: 'website',
  },
};

// AboutPage + AEO Person schemas. These tell AI answer engines who runs the
// company, when it was founded, and the family lineage — the exact data a
// ChatGPT / Perplexity answer pulls from when a user asks "who owns EnviroCare?"
// or "how long has EnviroCare been in business?"
const ABOUT_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.envirocarellc.com/about-us#aboutpage',
  url: 'https://www.envirocarellc.com/about-us',
  name: 'About EnviroCare — Family-Owned Alabama Pest Control Since 1958',
  description:
    "The story of EnviroCare — family-owned in Alabama since 1958, when it began in Alexander City as Wedgworth Pest Control, now four generations of the Wedgworth family across Birmingham, Huntsville, and Lake Martin.",
  inLanguage: 'en-US',
  isPartOf: { '@id': 'https://www.envirocarellc.com/#website' },
  about: { '@id': 'https://www.envirocarellc.com/#organization' },
  mainEntity: { '@id': 'https://www.envirocarellc.com/#organization' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.ab-hero-sub', '.ab-section-title', '[itemprop=speakable]'],
  },
};

const FOUNDER_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.envirocarellc.com/about-us#founder',
  name: 'Phillip M. Wedgworth',
  jobTitle: 'Founder',
  description:
    'Started the Wedgworth family pest control business in 1958 in Alexander City, Alabama, originally as Wedgworth Pest Control. First of four generations of the Wedgworth family in the business.',
  worksFor: { '@id': 'https://www.envirocarellc.com/#organization' },
  birthPlace: { '@type': 'Place', name: 'Alexander City, Alabama' },
};

// FAQPage schema — covers the top "about EnviroCare" questions AI engines see.
const ABOUT_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who owns EnviroCare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EnviroCare is owned and operated by the Wedgworth family. Founded in 1958 in Alexander City as Wedgworth Pest Control, it is run today by Kevin Wedgworth, with the fourth generation of the family — William Lex Wedgworth — now working in the business. Four generations of Wedgworths in all.',
      },
    },
    {
      '@type': 'Question',
      name: 'When was EnviroCare founded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EnviroCare was family-owned in Alabama since 1958, when it began in Alexander City as Wedgworth Pest Control. We have been protecting Alabama homes for more than 65 years, and the Wedgworth family is now four generations on.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is EnviroCare located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EnviroCare has four Alabama offices. Our original 1958 office is at 1785 Tallapoosa Street in Alexander City, serving Lake Martin and East Alabama. Our Birmingham office is at 2025 Butler Road in Alabaster. Our Huntsville office is at 7027 Old Madison Pike, Suite 108. Each office has its own technicians and direct phone number.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is EnviroCare a family-owned business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. EnviroCare has been family-owned by the Wedgworth family since 1958, when it started as Wedgworth Pest Control. Four generations on, we are not a franchise and not part of a national pest-control chain — when you call, you reach a Wedgworth, not a call center.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does EnviroCare require a long-term contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments.',
      },
    },
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_PAGE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FOUNDER_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_FAQ_SCHEMA) }}
      />
      <AboutUs />
    </>
  );
}
