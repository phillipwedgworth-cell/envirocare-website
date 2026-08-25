// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/alabaster/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/alabaster' },
  openGraph: { url: 'https://www.envirocarellc.com/alabaster', images: ['/og/og-alabaster.png'] },
  title: 'Alabaster Pest Control & Termite Service | EnviroCare Home Office',
  description: 'Alabaster pest control — home of EnviroCare since 1958. Bi-monthly service, Sentricon® baiting with $1M EnviroCare termite coverage, mosquito and tick treatment. Call (205) 940-6360.',
};

export default function AlabasterPage() {
  return <CityPage slug="alabaster" />;
}
