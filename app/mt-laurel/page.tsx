import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/mt-laurel' },
  openGraph: { images: ['/og/og-mt-laurel.png'] },
  title: 'Mt Laurel Pest Control & Termite Service | EnviroCare',
  description: 'Mt Laurel pest control. Village-area family service. Sentricon® termite protection. Call (205) 940-6360.',
};

export default function MtLaurelPage() {
  return <CityPage slug="mt-laurel" />;
}
