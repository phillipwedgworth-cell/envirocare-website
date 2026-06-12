import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/trussville' },
  title: 'Trussville Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Trussville pest control. Cahaba River-area family service. Sentricon® $1M coverage. Call (205) 940-6360.',
};

export default function TrussvillePage() {
  return <CityPage slug="trussville" />;
}
