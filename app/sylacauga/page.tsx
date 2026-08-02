import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/sylacauga' },
  title: "Sylacauga Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Sylacauga pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 234-6162.",
  openGraph: {
    title: "Sylacauga Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Sylacauga pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 234-6162.",
    url: 'https://www.envirocarellc.com/sylacauga',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sylacauga Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Sylacauga pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 234-6162.",
    images: ['/og-image.png'],
  },
};

export default function SylacaugaPage() {
  return <CityPage slug="sylacauga" />;
}
