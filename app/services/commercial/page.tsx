import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/commercial' },
  title: 'Commercial Pest Control in Birmingham, AL | EnviroCare',
  description: 'Discreet commercial pest control for Alabama restaurants, retail, offices & multi-family. Flexible scheduling & inspection-ready logs. (205) 940-6360.',
};

export default function CommercialPage() {
  return <ServicePage slug="commercial" />;
}
