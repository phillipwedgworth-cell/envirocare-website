import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  title: 'Alabama Commercial Pest Control | EnviroCare IPM & HACCP',
  description: 'Commercial pest control for restaurants, offices, warehouses. Discrete scheduling, full compliance documentation. Call (205) 940-6360.',
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
