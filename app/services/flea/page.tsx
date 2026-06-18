import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/flea' },
  title: 'Flea Control in Birmingham, AL | Interior Treatment | EnviroCare',
  description: 'Flea control that breaks the life cycle in carpet & bedding, not just on pets. Interior service, $128/qtr. Birmingham & across Alabama. (205) 940-6360.',
};

export default function FleaPage() {
  return <ServicePage slug="flea" />;
}
