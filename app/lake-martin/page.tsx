import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/lake-martin' },
  openGraph: { url: 'https://www.envirocarellc.com/lake-martin', images: ['/og/og-lake-martin.png'] },
  title: 'Lake Martin Pest Control & Termite Service | EnviroCare',
  description: 'Lake Martin pest control from $35/mo, Sentricon® termite protection and mosquito service for lake homes, docks and boathouses. Call (256) 234-6162.',
});

export default function LakeMartinPage() {
  return <CityPage slug="lake-martin" />;
}
