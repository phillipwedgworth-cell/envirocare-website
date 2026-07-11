import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/fultondale' },
  title: "Fultondale Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Fultondale pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
};

export default function FultondalePage() {
  return <CityPage slug="fultondale" />;
}
