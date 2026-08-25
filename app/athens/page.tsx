// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/athens/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/athens' },
  openGraph: { url: 'https://www.envirocarellc.com/athens', images: ['/og/og-athens.png'] },
  title: 'Athens Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Athens, AL pest control. Limestone County family service. Sentricon® baiting, $1M EnviroCare coverage. Call (256) 937-7676.',
};

export default function AthensPage() {
  return <CityPage slug="athens" />;
}
