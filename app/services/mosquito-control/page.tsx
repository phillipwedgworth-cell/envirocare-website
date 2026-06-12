import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/mosquito-control' },
  title: 'Alabama Mosquito Yard Treatment | EnviroCare 30-Day Service',
  description: 'Mosquito barrier yard service every 30 days, March–November. Family-owned, Applied per label directions. Call (205) 940-6360.',
};

export default function MosquitoControlPage() {
  return <ServicePage slug="mosquito-control" />;
}
