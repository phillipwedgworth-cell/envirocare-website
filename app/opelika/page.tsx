import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/opelika' },
  openGraph: { url: 'https://www.envirocarellc.com/opelika', images: ['/og/og-opelika.png'] },
  title: 'Pest Control Opelika AL | Termite & Mosquito | EnviroCare',
  description: 'Opelika pest control. Lee County family service. Sentricon® termite protection. Call (334) 332-3321.',
});

export default function OpelikaPage() {
  return <CityPage slug="opelika" />;
}
