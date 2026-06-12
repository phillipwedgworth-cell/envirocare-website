import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/birmingham' },
  title: 'Birmingham Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Family-owned Birmingham pest control. Termite, mosquito & tick service. Sentricon® up to $1M coverage. Call (205) 940-6360.',
};

export default function BirminghamPage() {
  return <CityPage slug="birmingham" />;
}
