import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/mosquito-control' },
  title: 'Mosquito Control Birmingham AL | 30-Day Yard Barrier | EnviroCare',
  description: 'Monthly mosquito yard treatment in Birmingham, AL — $45/treatment, March through November. Typically reduces activity noticeably. Call (205) 940-6360.',
};

export default function MosquitoControlPage() {
  return <ServicePage slug="mosquito-control" />;
}
