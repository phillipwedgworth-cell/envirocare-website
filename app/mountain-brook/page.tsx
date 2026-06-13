import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/mountain-brook' },
  openGraph: { images: ['/og/og-mountain-brook.png'] },
  title: 'Mountain Brook Pest & Termite Control | EnviroCare Since 1958',
  description: 'Mountain Brook pest control. Sentricon® $1M termite coverage. Discreet, professional service. Call (205) 940-6360.',
};

export default function MountainBrookPage() {
  return <CityPage slug="mountain-brook" />;
}
