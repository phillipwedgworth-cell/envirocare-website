// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/stillwaters/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/stillwaters' },
  title: 'StillWaters Pest Control & Termite Service | EnviroCare Lake Martin',
  description: 'Pest, termite & mosquito control for StillWaters homes on Lake Martin near Dadeville. No-drill Sentricon® with $1M EnviroCare coverage. Family-owned. Call (256) 234-6162.',
  openGraph: {
    title: 'StillWaters Pest Control & Termite Service | EnviroCare Lake Martin',
    description: 'Pest, termite & mosquito control for StillWaters homes on Lake Martin near Dadeville. No-drill Sentricon® with $1M EnviroCare coverage. Family-owned. Call (256) 234-6162.',
    url: 'https://www.envirocarellc.com/stillwaters',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StillWaters Pest Control & Termite Service | EnviroCare Lake Martin',
    description: 'Pest, termite & mosquito control for StillWaters homes on Lake Martin near Dadeville. No-drill Sentricon® with $1M EnviroCare coverage. Family-owned. Call (256) 234-6162.',
    images: ['/og-image.png'],
  },
};

export default function StillWatersPage() {
  return <CityPage slug="stillwaters" />;
}
