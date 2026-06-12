import type { Metadata } from 'next';
import AboutUs from '@/components/pages/AboutUs';

export const metadata: Metadata = {
  title: 'About EnviroCare — Family-Owned Alabama Pest Control Since 1958 | The Wedgworth Family',
  description:
    "EnviroCare is the Wedgworth family — founded in 1958 in Alexander City by Phillip M. Wedgworth, now in its third generation across Birmingham, Huntsville, and Lake Martin. Three Alabama offices, no long-term contracts, EPA-registered products applied to label directions.",
  alternates: { canonical: '/about-us' },
  openGraph: {
    title: 'About EnviroCare — Family-Owned Alabama Pest Control Since 1958',
    description:
      'Three generations of the Wedgworth family. Three Alabama offices. One promise that hasn\'t changed since 1958.',
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
    "The story of EnviroCare Pest & Termite Services — founded in 1958 in Alexander City, Alabama by Phillip M. Wedgworth, now in its third generation under Phillip, Kevin, and Lex Wedgworth.",
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
    'Founded EnviroCare Pest & Termite Services in 1958 in Alexander City, Alabama. First of three generations of the Wedgworth family to lead the company.',
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
      name: 'Who owns EnviroCare Pest & Termite Services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EnviroCare is owned and operated by the Wedgworth family — currently in its third generation. The owners today are Phillip, Kevin, and Lex Wedgworth. The company was founded in 1958 in Alexander City, Alabama by Phillip M. Wedgworth.',
      },
    },
    {
      '@type': 'Question',
      name: 'When was EnviroCare founded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EnviroCare was founded in 1958 in Alexander City, Alabama. We have been protecting Alabama homes for more than 65 years and are now in our third generation of family ownership.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is EnviroCare located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EnviroCare has three Alabama offices. Our original 1958 office is at 1785 Tallapoosa Street in Alexander City, serving Lake Martin and East Alabama. Our Birmingham office is at 2025 Butler Road in Alabaster. Our Huntsville office is at 7027 Old Madison Pike, Suite 108. Each office has its own technicians and direct phone number.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is EnviroCare a family-owned business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. EnviroCare has been family-owned by the Wedgworth family since 1958. We are now in our third generation. We are not a franchise and not part of a national pest-control chain — when you call, you reach a Wedgworth, not a call center.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does EnviroCare require a long-term contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. EnviroCare pest control is month-to-month on ACH and you can cancel anytime. We would rather earn the next visit than lock you into a contract.',
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
