import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/opelika' },
  openGraph: { url: 'https://www.envirocarellc.com/opelika', images: ['/og/og-opelika.png'] },
  title: 'Opelika, AL Pest Control & Termite Service | EnviroCare',
  description: 'Opelika pest control for Lee County homes: bi-monthly service from $35/mo, Sentricon® termite protection and mosquito service. Call (334) 332-3321.',
});

export default function OpelikaPage() {
  return <CityPage slug="opelika" />;
}
