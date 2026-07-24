import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/mccalla' },
  title: "McCalla Pest Control & Termite Service | EnviroCare Since 1958",
  description: "McCalla pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
  openGraph: {
    title: "McCalla Pest Control & Termite Service | EnviroCare Since 1958",
    description: "McCalla pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/mccalla',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "McCalla Pest Control & Termite Service | EnviroCare Since 1958",
    description: "McCalla pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function MccallaPage() {
  return <CityPage slug="mccalla" />;
}
