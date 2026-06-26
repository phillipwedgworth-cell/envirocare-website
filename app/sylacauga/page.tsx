import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/sylacauga' },
  title: "Sylacauga Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Sylacauga pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 234-6162.",
};

export default function SylacaugaPage() {
  return <CityPage slug="sylacauga" />;
}
