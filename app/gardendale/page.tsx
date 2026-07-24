import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/gardendale' },
  title: "Gardendale Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Gardendale pest control and termite service. Family-owned since 1958. Sentricon® up to $1M coverage. Call (205) 940-6360.",
  openGraph: {
    title: "Gardendale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Gardendale pest control and termite service. Family-owned since 1958. Sentricon® up to $1M coverage. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/gardendale',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gardendale Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Gardendale pest control and termite service. Family-owned since 1958. Sentricon® up to $1M coverage. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function GardendalePage() {
  return <CityPage slug="gardendale" />;
}
