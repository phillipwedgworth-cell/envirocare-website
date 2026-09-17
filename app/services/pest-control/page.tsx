// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/services/pest-control/page.tsx
// Commit: feat(seo): money-page titles/H1s target the queries GSC already shows them for
// Push: main
// ─────────────────────────────────────
import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/pest-control' },
  // GSC Aug 21–Sep 14 2026: "pest control plans" 512 impr at pos 27.7 with no page
  // targeting it; "pest control services" 309 at pos 5.9. Title now carries both.
  title: 'Pest Control Plans & Services in Alabama | From $35/mo | EnviroCare',
  description: 'Bi-monthly pest control plans from $35/mo covering ants, roaches, spiders, rodents and 30+ pests, with free re-service between visits. Four local Alabama offices: Birmingham, Alabaster, Huntsville, Lake Martin.',
  openGraph: {
    title: 'Pest Control Plans & Services in Alabama | From $35/mo | EnviroCare',
    description: 'Bi-monthly pest control plans from $35/mo covering ants, roaches, spiders, rodents and 30+ pests, with free re-service between visits. Four local Alabama offices: Birmingham, Alabaster, Huntsville, Lake Martin.',
    url: 'https://www.envirocarellc.com/services/pest-control',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pest Control Plans & Services in Alabama | From $35/mo | EnviroCare',
    description: 'Bi-monthly pest control plans from $35/mo covering ants, roaches, spiders, rodents and 30+ pests, with free re-service between visits. Four local Alabama offices: Birmingham, Alabaster, Huntsville, Lake Martin.',
    images: ['/og-image.png'],
  },
};

export default function PestControlPage() {
  return <ServicePage slug="pest-control" />;
}
