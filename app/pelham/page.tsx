// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/pelham/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/pelham' },
  openGraph: { url: 'https://www.envirocarellc.com/pelham', images: ['/og/og-pelham.png'] },
  title: 'Pelham Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Pelham pest control. Oak Mountain area family-owned service. Sentricon® baiting, $1M EnviroCare coverage. Call (205) 940-6360.',
};

export default function PelhamPage() {
  return <CityPage slug="pelham" />;
}
