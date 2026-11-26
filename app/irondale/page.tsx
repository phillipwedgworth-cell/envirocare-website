// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/irondale/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/irondale' },
  title: "Irondale Pest Control & Termite Service | EnviroCare",
  description: "Irondale pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
  openGraph: {
    title: "Irondale Pest Control & Termite Service | EnviroCare",
    description: "Irondale pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    url: 'https://www.envirocarellc.com/irondale',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Irondale Pest Control & Termite Service | EnviroCare",
    description: "Irondale pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function IrondalePage() {
  return <CityPage slug="irondale" />;
}
