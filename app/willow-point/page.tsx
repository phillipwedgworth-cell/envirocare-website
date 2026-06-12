import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/willow-point' },
  title: 'Willow Point Pest Control & Termite Service | EnviroCare Lake Martin',
  description: 'Pest, termite & mosquito control for Willow Point homes on Lake Martin. No-drill Sentricon® with $1M coverage. Family-owned since 1958. Call (256) 234-6162.',
};

export default function WillowPointPage() {
  return <CityPage slug="willow-point" />;
}
