// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/bessemer/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/bessemer' },
  title: "Bessemer Pest Control & Termite Service | EnviroCare",
  description: "Bessemer pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (205) 991-2882.",
  openGraph: {
    title: "Bessemer Pest Control & Termite Service | EnviroCare",
    description: "Bessemer pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (205) 991-2882.",
    url: 'https://www.envirocarellc.com/bessemer',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bessemer Pest Control & Termite Service | EnviroCare",
    description: "Bessemer pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function BessemerPage() {
  return <CityPage slug="bessemer" />;
}
