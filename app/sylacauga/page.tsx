import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/sylacauga' },
  title: "Pest Control in Sylacauga, AL | Termite Service | EnviroCare",
  description: "Sylacauga pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (256) 234-6162.",
  openGraph: {
    title: "Pest Control in Sylacauga, AL | Termite Service | EnviroCare",
    description: "Sylacauga pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (256) 234-6162.",
    url: 'https://www.envirocarellc.com/sylacauga',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pest Control in Sylacauga, AL | Termite Service | EnviroCare",
    description: "Sylacauga pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (256) 234-6162.",
    images: ['/og-image.png'],
  },
};

export default function SylacaugaPage() {
  return <CityPage slug="sylacauga" />;
}
