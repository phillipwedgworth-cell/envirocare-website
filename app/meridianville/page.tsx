import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/meridianville' },
  title: "Meridianville Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Meridianville pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 937-7676.",
};

export default function MeridianvillePage() {
  return <CityPage slug="meridianville" />;
}
