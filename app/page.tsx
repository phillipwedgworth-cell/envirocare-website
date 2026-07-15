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
    siteName: 'EnviroCare Pest & Termite Services',
    title: 'EnviroCare Pest & Termite Services — Family-Owned Alabama Since 1958',
    description:
      'Bi-monthly pest control, Sentricon® termite protection with $1M coverage, mosquito and tick yard service. Three offices across Alabama.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EnviroCare Pest & Termite Services — Family-Owned Alabama Since 1958',
      },
    ],
  },
};

export default function Page() {
  return <Homepage />;
}
