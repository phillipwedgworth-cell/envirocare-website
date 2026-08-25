// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/gardendale/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/gardendale' },
  title: "Gardendale Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Gardendale pest control and termite service. Family-owned since 1958. Sentricon® baiting, up to $1M EnviroCare coverage. Call (205) 991-2882.",
  openGraph: {
    title: "Gardendale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Gardendale pest control and termite service. Family-owned since 1958. Sentricon® baiting, up to $1M EnviroCare coverage. Call (205) 991-2882.",
    url: 'https://www.envirocarellc.com/gardendale',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gardendale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Gardendale pest control and termite service. Family-owned since 1958. Sentricon® baiting, up to $1M EnviroCare coverage. Call (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function GardendalePage() {
  return <CityPage slug="gardendale" />;
}
