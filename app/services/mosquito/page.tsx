// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/services/mosquito/page.tsx
// Commit: feat(seo): money-page titles/H1s target the queries GSC already shows them for
// Push: main
// ─────────────────────────────────────
import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/mosquito' },
  // GSC Aug 21–Sep 14 2026: city + "mosquito control" queries across every market
  // (Auburn 263, Decatur 188, Vestavia 177, Fultondale 205, Huntsville 392); the
  // "mosquito & tick control" variant shows for Birmingham and Huntsville. $45/month
  // and $65/month Mosquito + Tick are the canonical prices (AGENTS.md §5).
  title: 'Mosquito & Tick Control in Alabama | $45/mo, March–October | EnviroCare',
  description: 'Mosquito yard treatment from $45/month — 8 treatments March through October. Mosquito + Tick $65/month. Free inspection across Alabama.',
  openGraph: {
    title: 'Mosquito & Tick Control in Alabama | $45/mo, March–October | EnviroCare',
    description: 'Mosquito yard treatment from $45/month — 8 treatments March through October. Mosquito + Tick $65/month. Free inspection across Alabama.',
    url: 'https://www.envirocarellc.com/services/mosquito',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mosquito & Tick Control in Alabama | $45/mo, March–October | EnviroCare',
    description: 'Mosquito yard treatment from $45/month — 8 treatments March through October. Mosquito + Tick $65/month. Free inspection across Alabama.',
    images: ['/og-image.png'],
  },
};

export default function MosquitoPage() {
  return <ServicePage slug="mosquito" />;
}
