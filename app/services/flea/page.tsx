import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/flea' },
  title: 'Flea Control Birmingham AL | Interior Treatment | EnviroCare',
  description: 'Interior flea control in Birmingham, AL — targets the flea lifecycle indoors. Add-on to quarterly pest service, +$30/qtr. Call (205) 940-6360.',
};

export default function FleaPage() {
  return <ServicePage slug="flea" />;
}
