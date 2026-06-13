import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/alabaster' },
  openGraph: { images: ['/og/og-alabaster.png'] },
  title: 'Alabaster Pest Control & Termite Service | EnviroCare Home Office',
  description: 'Alabaster pest control — home of EnviroCare since 1958. Bi-monthly service, Sentricon® $1M termite protection, mosquito and tick treatment. Call (205) 940-6360.',
};

export default function AlabasterPage() {
  return <CityPage slug="alabaster" />;
}
