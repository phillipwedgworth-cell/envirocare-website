// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/dadeville/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/dadeville' },
  openGraph: { url: 'https://www.envirocarellc.com/dadeville', images: ['/og/og-dadeville.png'] },
  // Retitled 2026-07-25: Local Falcon 7/24 showed "pest control dadeville al" at
  // 0.00% SoLV, found in only 6 of 49 grid points — the single hole in a market
  // where EnviroCare otherwise holds ~45% SoLV. Title now leads with the query.
  title: 'Dadeville, AL Pest Control & Termite Service | EnviroCare',
  description: 'Pest control in Dadeville, AL for StillWaters and the Lake Martin east shore. Sentricon® termite protection and mosquito service. Call (256) 234-6162.',
});

export default function DadevillePage() {
  return <CityPage slug="dadeville" />;
}
