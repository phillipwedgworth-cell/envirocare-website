import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/willow-point' },
  title: 'Willow Point Pest Control & Termite Service | EnviroCare Lake Martin',
  description: 'Pest, termite & mosquito control for Willow Point homes on Lake Martin. No-drill Sentricon® with $1M coverage. Family-owned since 1958. Call (256) 234-6162.',
  openGraph: {
    title: 'Willow Point Pest Control & Termite Service | EnviroCare Lake Martin',
    description: 'Pest, termite & mosquito control for Willow Point homes on Lake Martin. No-drill Sentricon® with $1M coverage. Family-owned since 1958. Call (256) 234-6162.',
    url: 'https://www.envirocarellc.com/willow-point',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Willow Point Pest Control & Termite Service | EnviroCare Lake Martin',
    description: 'Pest, termite & mosquito control for Willow Point homes on Lake Martin. No-drill Sentricon® with $1M coverage. Family-owned since 1958. Call (256) 234-6162.',
    images: ['/og-image.png'],
  },
};

export default function WillowPointPage() {
  return <CityPage slug="willow-point" />;
}
