import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/tick-control' },
  title: 'Tick Control in Birmingham, AL | Yard Treatment | EnviroCare',
  description: 'Seasonal tick control that significantly reduces yard ticks & chiggers. ~$48.75/mo with mosquito. Birmingham & across Alabama. Call (205) 940-6360.',
};

export default function TickControlPage() {
  return <ServicePage slug="tick-control" />;
}
