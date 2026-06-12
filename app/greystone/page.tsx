import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/greystone' },
  title: 'Greystone Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Greystone pest control. Premium home termite protection. Sentricon® $1M coverage. Call (205) 940-6360.',
};

export default function GreystonePage() {
  return <CityPage slug="greystone" />;
}
