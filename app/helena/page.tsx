import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/helena' },
  openGraph: { url: 'https://www.envirocarellc.com/helena', images: ['/og/og-helena.png'] },
  title: 'Helena Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Helena pest control. Cahaba River-area family service. Sentricon® termite protection. Call (205) 940-6360.',
});

export default function HelenaPage() {
  return <CityPage slug="helena" />;
}
