import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/huntsville' },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville', images: ['/og/og-huntsville.png'] },
  title: 'Pest Control Huntsville AL | Termite & Mosquito Service | EnviroCare',
  description: 'Pest control in Huntsville, AL — bi-monthly service, Sentricon termite, mosquito and tick yard treatment. Family-owned since 1958. Call (256) 937-7676.',
};

export default function HuntsvillePage() {
  return <CityPage slug="huntsville" />;
}
