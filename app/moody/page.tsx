import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/moody' },
  title: "Moody, AL Pest Control & Termite Service | EnviroCare",
  description: "Moody, AL pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
  openGraph: {
    title: "Moody, AL Pest Control & Termite Service | EnviroCare",
    description: "Moody, AL pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    url: 'https://www.envirocarellc.com/moody',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Moody, AL Pest Control & Termite Service | EnviroCare",
    description: "Moody, AL pest control from $35/mo with re-service between visits, plus Sentricon® termite protection after a free inspection. (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function MoodyPage() {
  return <CityPage slug="moody" />;
}
