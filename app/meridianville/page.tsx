import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/meridianville' },
  title: "Meridianville Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Meridianville pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 937-7676.",
  openGraph: {
    title: "Meridianville Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Meridianville pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 937-7676.",
    url: 'https://www.envirocarellc.com/meridianville',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Meridianville Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Meridianville pest control and termite service. Family-owned since 1958. Sentricon® termite protection. Call (256) 937-7676.",
    images: ['/og-image.png'],
  },
};

export default function MeridianvillePage() {
  return <CityPage slug="meridianville" />;
}
