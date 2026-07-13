import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  title: 'Commercial Pest Control in Alabama | EnviroCare',
  description: 'Commercial pest control for Alabama restaurants, retail, offices & warehouses. After-hours scheduling, audit-ready logs. Call (205) 940-6360.',
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
