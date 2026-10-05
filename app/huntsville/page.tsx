// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/huntsville/page.tsx
// Commit: feat(seo): money-page titles/H1s target the queries GSC already shows them for
// Push: main
// ─────────────────────────────────────
import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/huntsville' },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville', images: ['/og/og-huntsville.png'] },
  // GSC Aug 21–Sep 14 2026: "exterminator huntsville" 539 impr at pos 8.8 (largest
  // non-brand query in the market), "mosquito control huntsville" 392, "termite control
  // huntsville" 272, Madison 309. Title leads with the biggest query; description
  // names Madison and the three services people actually search for here.
  // Sep 30 2026 (GSC Sep 20–26): /huntsville 675 impr at pos 17.7; "exterminator
  // huntsville" 106 at pos 5.7, "pest control huntsville al" 68 at pos 13.8. The page
  // owns general Huntsville pest-control intent, so the title now leads with the head
  // term and keeps "Exterminator" as the secondary phrase that already ranks.
  title: 'Pest Control Huntsville AL | Local Exterminator Since 1958 | EnviroCare',
  description: 'Pest control in Huntsville, AL from our Old Madison Pike office. Ants, roaches, rodents, Sentricon® termite & mosquito service. (256) 937-7676.',
});

export default function HuntsvillePage() {
  return <CityPage slug="huntsville" />;
}