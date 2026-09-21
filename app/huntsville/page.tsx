// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/huntsville/page.tsx
// Commit: feat(seo): money-page titles/H1s target the queries GSC already shows them for
// Push: main
// ─────────────────────────────────────
import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/huntsville' },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville', images: ['/og/og-huntsville.png'] },
  // GSC Aug 21–Sep 14 2026: "exterminator huntsville" 539 impr at pos 8.8 (largest
  // non-brand query in the market), "mosquito control huntsville" 392, "termite control
  // huntsville" 272, Madison 309. Title leads with the biggest query; description
  // names Madison and the three services people actually search for here.
  title: 'Exterminator & Pest Control Huntsville AL | Termite, Mosquito | EnviroCare',
  description: 'Huntsville & Madison exterminator — ants, roaches, spiders, rodents. Sentricon® termite, mosquito & tick control. Local office. (256) 937-7676.',
};

export default function HuntsvillePage() {
  return <CityPage slug="huntsville" />;
}