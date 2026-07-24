// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/builders/page.tsx
// Commit: feat(builders): canonical builder page — Service + FAQPage + Breadcrumb JSON-LD
// Push: main
// ─────────────────────────────────────
// /builders is now the ONE canonical builder / pre-construction page.
// /services/builder and /services/builder-pre-treat 301 here (next.config.ts).
import BuildersPage from '@/components/pages/BuildersPage';
import { BUILDER_FAQS } from '@/data/builder-faqs';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.envirocarellc.com';

export const metadata = {
  alternates: { canonical: '/builders' },
  title: 'Pre-Construction Termite Treatment for Alabama Builders | EnviroCare',
  description:
    'Code-compliant pre-construction termite treatment for Alabama builders: pre-slab soil treatment, Sentricon® install, WDO letter at closing. One vendor, coordinated to your build. (205) 940-6360.',
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE}/builders#service`,
      name: 'Pre-Construction Termite Treatment for Builders',
      serviceType: 'Pre-Construction Termite Treatment',
      url: `${SITE}/builders`,
      description:
        'Code-compliant termite protection for Alabama new construction: pre-slab soil treatment with EPA-registered termiticide applied per label directions, Sentricon® Always Active installation at landscape phase, and NPMA-33 WDO documentation at closing. Scope and pricing confirmed after a free site inspection.',
      audience: { '@type': 'BusinessAudience', name: 'Home builders and general contractors' },
      provider: {
        '@type': 'LocalBusiness',
        name: 'EnviroCare Pest & Termite Services',
        telephone: '+1-205-940-6360',
        url: SITE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2025 Butler Rd',
          addressLocality: 'Alabaster',
          addressRegion: 'AL',
          postalCode: '35007',
          addressCountry: 'US',
        },
      },
      areaServed: [
        { '@type': 'City', name: 'Birmingham', containedInPlace: { '@type': 'State', name: 'Alabama' } },
        { '@type': 'City', name: 'Huntsville', containedInPlace: { '@type': 'State', name: 'Alabama' } },
        { '@type': 'City', name: 'Alexander City', containedInPlace: { '@type': 'State', name: 'Alabama' } },
        { '@type': 'City', name: 'Auburn', containedInPlace: { '@type': 'State', name: 'Alabama' } },
        { '@type': 'Place', name: 'Lake Martin, Alabama' },
      ],
      // Intentionally no Offer/price node — builder work is quoted per project
      // after a free site inspection (pricing lock: termite is quote-only).
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/builders#faq`,
      mainEntity: BUILDER_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE}/builders#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Builders', item: `${SITE}/builders` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BuildersPage />
    </>
  );
}
