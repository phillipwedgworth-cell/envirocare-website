import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/calera' },
  openGraph: { images: ['/og/og-calera.png'] },
  title: 'Calera Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Calera pest control. New construction termite pre-treat. Family-owned since 1958. Call (205) 940-6360.',
};

export default function CaleraPage() {
  return <CityPage slug="calera" />;
}
