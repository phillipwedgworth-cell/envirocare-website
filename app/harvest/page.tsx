import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/harvest' },
  openGraph: { url: 'https://www.envirocarellc.com/harvest', images: ['/og/og-harvest.png'] },
  title: 'Harvest Pest Control & Termite Service | EnviroCare',
  description: 'Harvest, AL pest control. North Madison County family service. Sentricon® termite protection. Call (256) 937-7676.',
};

export default function HarvestPage() {
  return <CityPage slug="harvest" />;
}
