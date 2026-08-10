import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/bessemer' },
  title: "Bessemer Pest Control & Termite Service | EnviroCare Since 1958",
  description: "Bessemer pest control and termite service. Family-owned since 1958. Sentricon® up to $1M coverage. Call (205) 991-2882.",
  openGraph: {
    title: "Bessemer Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Bessemer pest control and termite service. Family-owned since 1958. Sentricon® up to $1M coverage. Call (205) 991-2882.",
    url: 'https://www.envirocarellc.com/bessemer',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bessemer Pest Control & Termite Service | EnviroCare Since 1958",
    description: "Bessemer pest control and termite service. Family-owned since 1958. Sentricon® up to $1M coverage. Call (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

export default function BessemerPage() {
  return <CityPage slug="bessemer" />;
}
