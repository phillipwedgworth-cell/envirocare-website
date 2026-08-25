// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/the-ridge/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/the-ridge' },
  title: 'The Ridge Pest Control & Termite Service | EnviroCare Lake Martin',
  description: 'Pest, termite & mosquito control for homes at The Ridge on Lake Martin. No-drill Sentricon® with $1M EnviroCare coverage. Family-owned since 1958. Call (256) 234-6162.',
  openGraph: {
    title: 'The Ridge Pest Control & Termite Service | EnviroCare Lake Martin',
    description: 'Pest, termite & mosquito control for homes at The Ridge on Lake Martin. No-drill Sentricon® with $1M EnviroCare coverage. Family-owned since 1958. Call (256) 234-6162.',
    url: 'https://www.envirocarellc.com/the-ridge',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ridge Pest Control & Termite Service | EnviroCare Lake Martin',
    description: 'Pest, termite & mosquito control for homes at The Ridge on Lake Martin. No-drill Sentricon® with $1M EnviroCare coverage. Family-owned since 1958. Call (256) 234-6162.',
    images: ['/og-image.png'],
  },
};

export default function TheRidgePage() {
  return <CityPage slug="the-ridge" />;
}
