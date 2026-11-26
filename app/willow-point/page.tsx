// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/willow-point/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/willow-point' },
  title: 'Willow Point Pest Control & Termite Service | Lake Martin',
  description: 'Pest, termite and mosquito control for Willow Point homes on Lake Martin. Sentricon® termite baiting with a free inspection to start. (256) 234-6162.',
  openGraph: {
    title: 'Willow Point Pest Control & Termite Service | Lake Martin',
    description: 'Pest, termite and mosquito control for Willow Point homes on Lake Martin. Sentricon® termite baiting with a free inspection to start. (256) 234-6162.',
    url: 'https://www.envirocarellc.com/willow-point',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Willow Point Pest Control & Termite Service | Lake Martin',
    description: 'Pest, termite and mosquito control for Willow Point homes on Lake Martin. Sentricon® termite baiting with a free inspection to start. (256) 234-6162.',
    images: ['/og-image.png'],
  },
};

export default function WillowPointPage() {
  return <CityPage slug="willow-point" />;
}
