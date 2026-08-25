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
  title: 'Pest Control Alabaster AL | $35/mo | Free Termite Inspection',
  description: 'Bi-monthly pest control from $35/mo in Alabaster — 30+ pests, re-service at no charge. Sentricon® termite baiting, no drilling. Call (205) 940-6360.',
};

export default function AlabasterPage() {
  return <CityPage slug="alabaster" />;
}
