import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/fultondale' },
  title: "Fultondale Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Fultondale pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
  openGraph: {
    title: "Fultondale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Fultondale pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/fultondale',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fultondale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Fultondale pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function FultondalePage() {
  return <CityPage slug="fultondale" />;
}
