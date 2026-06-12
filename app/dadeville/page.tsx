import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/dadeville' },
  title: 'Dadeville Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Dadeville pest control. Lake Martin-area family service. Sentricon® termite protection. Call (256) 234-6162.',
};

export default function DadevillePage() {
  return <CityPage slug="dadeville" />;
}
