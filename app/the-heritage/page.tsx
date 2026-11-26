import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/the-heritage' },
  title: 'The Heritage Pest Control & Termite Service | Lake Martin',
  description: 'Pest control and new-construction Sentricon® termite protection for homes at The Heritage on Lake Martin. Free termite inspection. (256) 234-6162.',
  openGraph: {
    title: 'The Heritage Pest Control & Termite Service | Lake Martin',
    description: 'Pest control and new-construction Sentricon® termite protection for homes at The Heritage on Lake Martin. Free termite inspection. (256) 234-6162.',
    url: 'https://www.envirocarellc.com/the-heritage',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Heritage Pest Control & Termite Service | Lake Martin',
    description: 'Pest control and new-construction Sentricon® termite protection for homes at The Heritage on Lake Martin. Free termite inspection. (256) 234-6162.',
    images: ['/og-image.png'],
  },
};

export default function TheHeritagePage() {
  return <CityPage slug="the-heritage" />;
}
