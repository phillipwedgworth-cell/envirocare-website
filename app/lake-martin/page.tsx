import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/lake-martin' },
  openGraph: { url: 'https://www.envirocarellc.com/lake-martin', images: ['/og/og-lake-martin.png'] },
  title: 'Lake Martin Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Lake Martin pest control. Waterfront termite protection. Mosquito & tick yard service. Call (256) 234-6162.',
};

export default function LakeMartinPage() {
  return <CityPage slug="lake-martin" />;
}
