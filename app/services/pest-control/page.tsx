import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/pest-control' },
  title: 'Pest Control Birmingham AL | Bi-Monthly Service $35/mo | EnviroCare',
  description: 'Bi-monthly pest control in Birmingham, AL — $35/mo, 30+ pests covered, unlimited re-service. Family-owned since 1958. Call (205) 940-6360.',
};

export default function PestControlPage() {
  return <ServicePage slug="pest-control" />;
}
