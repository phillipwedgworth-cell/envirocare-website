import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/vestavia-hills' },
  title: 'Vestavia Hills Pest Control | EnviroCare Family-Owned Since 1958',
  description: 'Vestavia Hills pest control & termite protection. Sentricon® Certified. Family-owned. Call (205) 940-6360.',
};

export default function VestaviaHillsPage() {
  return <CityPage slug="vestavia-hills" />;
}
