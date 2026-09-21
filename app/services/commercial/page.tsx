// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/services/commercial/page.tsx
// Commit: feat(seo): money-page titles/H1s target the queries GSC already shows them for
// Push: main
// ─────────────────────────────────────
import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  // GSC Aug 21–Sep 14 2026: "commercial pest control" 3,489 impr at pos 34; "commercial
  // pest management" 268; "commercial termite inspection/control" 495; restaurant /
  // warehouse / office pest control (Bessemer) at pos 8–9. Title and H1 now name the
  // service and the two metros that can actually win it; termite inspections added.
  title: 'Commercial Pest Control — Birmingham & Huntsville AL | EnviroCare',
  description: 'Commercial pest control & termite inspections for restaurants, offices & multi-family in Birmingham & Huntsville AL. Audit-ready logs. (205) 940-6360.',
  openGraph: {
    title: 'Commercial Pest Control — Birmingham & Huntsville AL | EnviroCare',
    description: 'Commercial pest control & termite inspections for restaurants, offices & multi-family in Birmingham & Huntsville AL. Audit-ready logs. (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services/commercial',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Pest Control — Birmingham & Huntsville AL | EnviroCare',
    description: 'Commercial pest control & termite inspections for restaurants, offices & multi-family in Birmingham & Huntsville AL. Audit-ready logs. (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
