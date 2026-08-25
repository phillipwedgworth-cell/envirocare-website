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
  title: 'Pest Control Pelham AL | From $35/mo | Oak Mountain Routes',
  description: 'Bi-monthly pest control from $35/month in Pelham — 30+ pests, re-service between visits at no charge. Built for Oak Mountain tick and mosquito pressure. Free termite inspection. Call (205) 940-6360.',
};

export default function PelhamPage() {
  return <CityPage slug="pelham" />;
}
