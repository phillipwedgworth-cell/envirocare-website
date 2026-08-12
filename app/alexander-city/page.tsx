import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/alexander-city' },
  openGraph: { url: 'https://www.envirocarellc.com/alexander-city', images: ['/og/og-alexander-city.png'] },
  title: 'Pest Control Alexander City AL | Since 1958 | EnviroCare',
  description: "Alexander City pest control — family-owned since 1958. Bi-monthly service, Sentricon termite, mosquito and tick for Lake Martin. Call (256) 234-6162.",
};

export default function AlexanderCityPage() {
  return <CityPage slug="alexander-city" />;
}
