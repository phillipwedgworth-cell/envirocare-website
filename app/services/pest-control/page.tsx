import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/pest-control' },
  title: 'Pest Control in Birmingham, AL | Bi-Monthly Service | EnviroCare',
  description: 'Bi-monthly pest control that re-treats before the barrier wears off. Ants, roaches, spiders & more across Birmingham & Alabama. From ~$35/mo. (205) 940-6360.',
};

export default function PestControlPage() {
  return <ServicePage slug="pest-control" />;
}
