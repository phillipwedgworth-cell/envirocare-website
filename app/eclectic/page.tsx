import type { Metadata } from 'next';
import { withOpenGraph } from '@/lib/seo/open-graph';
import CityPage from '@/components/pages/CityPage';

export const metadata: Metadata = withOpenGraph({
  alternates: { canonical: '/eclectic' },
  openGraph: { url: 'https://www.envirocarellc.com/eclectic', images: ['/og/og-eclectic.png'] },
  title: 'Pest Control in Eclectic, AL | Lake Martin South Shore',
  description: 'Eclectic, AL pest control for Lake Martin's south shore: bi-monthly service from $35/mo, Sentricon® termite protection and mosquito. (256) 234-6162.',
});

export default function EclecticPage() {
  return <CityPage slug="eclectic" />;
}
