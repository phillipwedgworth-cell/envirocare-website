import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/mosquito-control' },
  title: 'Mosquito Control in Birmingham & Huntsville, AL | EnviroCare',
  description: 'Seasonal mosquito control (Mar–Nov) that significantly reduces yard mosquitoes. ~$33.75/mo. Add tick & chigger coverage. Call (205) 940-6360.',
};

export default function MosquitoControlPage() {
  return <ServicePage slug="mosquito-control" />;
}
