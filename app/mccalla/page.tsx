import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/mccalla' },
  title: "McCalla Pest Control & Termite Service | EnviroCare",
  description: "McCalla pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (205) 991-2882.",
  openGraph: {
    title: "McCalla Pest Control & Termite Service | EnviroCare",
    description: "McCalla pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (205) 991-2882.",
    url: 'https://www.envirocarellc.com/mccalla',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "McCalla Pest Control & Termite Service | EnviroCare",
    description: "McCalla pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. Call (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function MccallaPage() {
  return <CityPage slug="mccalla" />;
}
