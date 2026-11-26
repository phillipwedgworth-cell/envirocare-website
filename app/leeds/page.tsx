import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/leeds' },
  title: "Leeds, AL Pest Control & Termite Service | EnviroCare",
  description: "Leeds, AL pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
  openGraph: {
    title: "Leeds, AL Pest Control & Termite Service | EnviroCare",
    description: "Leeds, AL pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    url: 'https://www.envirocarellc.com/leeds',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Leeds, AL Pest Control & Termite Service | EnviroCare",
    description: "Leeds, AL pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function LeedsPage() {
  return <CityPage slug="leeds" />;
}
