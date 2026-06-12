import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/pest-control' },
  title: 'Alabama Pest Control | EnviroCare Bi-Monthly Service Since 1958',
  description: 'Bi-monthly perimeter pest control across Birmingham, Lake Martin, Huntsville. 30+ pests covered, unlimited re-services. Family-owned. Call (205) 940-6360.',
};

export default function PestControlPage() {
  return <ServicePage slug="pest-control" />;
}
