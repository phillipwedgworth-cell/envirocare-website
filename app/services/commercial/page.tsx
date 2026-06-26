import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  title: 'Commercial Pest Control in Alabama — Restaurants, Retail & Offices | EnviroCare',
  description: 'Discreet, inspection-ready commercial pest control for Alabama restaurants, retail, offices, warehouses & multi-family. Flexible after-hours scheduling, IPM & HACCP support, audit-ready logs. Free walkthrough — call (205) 940-6360.',
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
