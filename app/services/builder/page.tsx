import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/builder' },
  title: 'Pre-Construction Termite Treatment for Alabama Builders | EnviroCare',
  description: 'Pre-construction termite soil treatment for Alabama builders — protection before the slab is poured. Coordinated to your build schedule. (205) 940-6360.',
};

export default function BuilderPage() {
  return <ServicePage slug="builder" />;
}
