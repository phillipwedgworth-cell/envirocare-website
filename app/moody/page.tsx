import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/moody' },
  title: "Moody Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Moody AL pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
};

export default function MoodyPage() {
  return <CityPage slug="moody" />;
}
