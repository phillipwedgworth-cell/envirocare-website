import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  title: 'Commercial Pest Control Birmingham & Huntsville AL | EnviroCare',
  description: 'Commercial pest control in Birmingham and Huntsville, AL — restaurants, offices, warehouses. Documented service, inspection-ready. Call (205) 940-6360.',
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
