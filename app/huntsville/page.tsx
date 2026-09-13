import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/huntsville' },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville', images: ['/og/og-huntsville.png'] },
  title: 'Pest Control & Exterminator Huntsville AL | EnviroCare',
  description: 'Local Huntsville pest control and exterminator service for ants, roaches, spiders, termites, mosquitoes and ticks. Call EnviroCare at (256) 937-7676.',
};

export default function HuntsvillePage() {
  return <CityPage slug="huntsville" />;
}