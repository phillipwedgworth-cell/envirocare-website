import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/tick-control' },
  title: 'Tick Control Birmingham AL | Yard Treatment | EnviroCare',
  description: 'Tick control in Birmingham, AL — seasonal yard treatment for Lone Star, deer, and dog ticks. Combined with mosquito service. Call (205) 940-6360.',
};

export default function TickControlPage() {
  return <ServicePage slug="tick-control" />;
}
