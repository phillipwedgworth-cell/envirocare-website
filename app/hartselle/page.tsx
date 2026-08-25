// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/hartselle/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/hartselle' },
  openGraph: { url: 'https://www.envirocarellc.com/hartselle', images: ['/og/og-hartselle.png'] },
  title: 'Hartselle Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Hartselle pest control. Morgan County family service. Sentricon® baiting, $1M EnviroCare coverage. Call (256) 937-7676.',
};

export default function HartsellePage() {
  return <CityPage slug="hartselle" />;
}
