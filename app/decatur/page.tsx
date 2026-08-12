import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/decatur' },
  openGraph: { url: 'https://www.envirocarellc.com/decatur', images: ['/og/og-decatur.png'] },
  title: 'Decatur Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Decatur, AL pest control. River City family service. Sentricon® termite protection. Call (256) 937-7676.',
};

export default function DecaturPage() {
  return <CityPage slug="decatur" />;
}
