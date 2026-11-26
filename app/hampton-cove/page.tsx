// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/hampton-cove/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/hampton-cove' },
  openGraph: { url: 'https://www.envirocarellc.com/hampton-cove', images: ['/og/og-hampton-cove.png'] },
  title: "Hampton Cove Pest Control & Termite Service | EnviroCare",
  description: "Hampton Cove pest control for southeast Huntsville homes: bi-monthly service from $35/mo and Sentricon® termite protection. Call (256) 937-7676.",
});

export default function HamptonCovePage() {
  return <CityPage slug="hampton-cove" />;
}
