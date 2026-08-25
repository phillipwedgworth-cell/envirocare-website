// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/irondale/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/irondale' },
  title: "Irondale Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Irondale pest control and termite service. Family-owned since 1958. Sentricon® baiting, up to $1M EnviroCare coverage. Call (205) 940-6360.",
  openGraph: {
    title: "Irondale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Irondale pest control and termite service. Family-owned since 1958. Sentricon® baiting, up to $1M EnviroCare coverage. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/irondale',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Irondale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Irondale pest control and termite service. Family-owned since 1958. Sentricon® baiting, up to $1M EnviroCare coverage. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function IrondalePage() {
  return <CityPage slug="irondale" />;
}
