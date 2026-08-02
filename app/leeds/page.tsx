import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/leeds' },
  title: "Leeds Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Leeds AL pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
  openGraph: {
    title: "Leeds Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Leeds AL pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/leeds',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Leeds Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Leeds AL pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function LeedsPage() {
  return <CityPage slug="leeds" />;
}
