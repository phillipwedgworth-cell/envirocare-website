// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/athens/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/athens' },
  openGraph: { url: 'https://www.envirocarellc.com/athens', images: ['/og/og-athens.png'] },
  title: "Athens Pest Control & Termite Service | EnviroCare",
  description: "Athens, AL pest control for Limestone County homes: bi-monthly service from $35/mo and Sentricon® termite protection. Call (256) 937-7676.",
});

export default function AthensPage() {
  return <CityPage slug="athens" />;
}
