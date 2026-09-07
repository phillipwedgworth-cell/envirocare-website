// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from 'next';
import Homepage from '../components/pages/Homepage';

// Homepage route metadata. This file was previously a 'use client' re-export,
// which cannot export metadata — so the homepage shipped with NO canonical tag
// (flagged daily by launch-watcher since 2026-07-03). Server wrapper fixes it.
// NOTE: page-level openGraph REPLACES the layout's openGraph (shallow merge),
// so the full og block is repeated here with the homepage og:url added.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'EnviroCare',
    title: 'EnviroCare — Family-Owned Alabama Since 1958',
    description:
      // Shortened 2026-09-06. The homepage previously carried the $1M figure and
      // its required qualifier in BOTH the layout description and this og
      // description — the same 40-character disclaimer twice on one page, in tags
      // Google truncates long before reaching it.
      'Bi-monthly pest control, Sentricon® termite protection, mosquito and tick yard service. Four Alabama offices, family-owned since 1958.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EnviroCare — Family-Owned Alabama Since 1958',
      },
    ],
  },
};

export default function Page() {
  return <Homepage />;
}
