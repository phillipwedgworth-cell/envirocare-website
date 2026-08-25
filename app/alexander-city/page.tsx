import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/alexander-city' },
  openGraph: { url: 'https://www.envirocarellc.com/alexander-city', images: ['/og/og-alexander-city.png'] },
  title: 'Pest Control Alexander City & Lake Martin | From $35/mo',
  description: "Bi-monthly pest control from $35/mo for Alex City and Lake Martin — 30+ pests, re-service at no charge. Free termite inspection. Call (256) 234-6162.",
};

export default function AlexanderCityPage() {
  return <CityPage slug="alexander-city" />;
}
