import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/helena' },
  openGraph: { url: 'https://www.envirocarellc.com/helena', images: ['/og/og-helena.png'] },
  title: "Helena Pest Control & Termite Service | EnviroCare",
  description: "Helena pest control near the Cahaba River: bi-monthly service from $35/mo, Sentricon® termite protection and mosquito. Call (205) 940-6360.",
});

export default function HelenaPage() {
  return <CityPage slug="helena" />;
}
