import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/calera' },
  openGraph: { url: 'https://www.envirocarellc.com/calera', images: ['/og/og-calera.png'] },
  title: "Calera Pest Control & Termite Service | EnviroCare",
  description: "Calera pest control from $35/mo, Sentricon® termite protection and new-construction termite pre-treatment for builders. Call (205) 940-6360.",
});

export default function CaleraPage() {
  return <CityPage slug="calera" />;
}
