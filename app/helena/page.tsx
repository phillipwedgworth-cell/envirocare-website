import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/helena' },
  openGraph: { images: ['/og/og-helena.png'] },
  title: 'Helena Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Helena pest control. Cahaba River-area family service. Sentricon® termite protection. Call (205) 940-6360.',
};

export default function HelenaPage() {
  return <CityPage slug="helena" />;
}
