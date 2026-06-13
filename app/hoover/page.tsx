import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/hoover' },
  openGraph: { images: ['/og/og-hoover.png'] },
  title: 'Hoover Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Hoover, AL family-owned pest control. Sentricon® $1M coverage. Mosquito & tick yard service. Call (205) 940-6360.',
};

export default function HooverPage() {
  return <CityPage slug="hoover" />;
}
