import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/fultondale' },
  title: "Fultondale Pest Control & Termite Service | EnviroCare",
  description: "Fultondale pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
  openGraph: {
    title: "Fultondale Pest Control & Termite Service | EnviroCare",
    description: "Fultondale pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    url: 'https://www.envirocarellc.com/fultondale',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fultondale Pest Control & Termite Service | EnviroCare",
    description: "Fultondale pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function FultondalePage() {
  return <CityPage slug="fultondale" />;
}
