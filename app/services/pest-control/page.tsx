import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/pest-control' },
  title: 'Home Pest Control Services in Alabama | EnviroCare',
  description: 'Bi-monthly home pest control for ants, roaches, spiders and more across EnviroCare service areas in Alabama. Four local offices serving surrounding communities.',
  openGraph: {
    title: 'Home Pest Control Services in Alabama | EnviroCare',
    description: 'Bi-monthly home pest control for ants, roaches, spiders and more across EnviroCare service areas in Alabama. Four local offices serving surrounding communities.',
    url: 'https://www.envirocarellc.com/services/pest-control',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Pest Control Services in Alabama | EnviroCare',
    description: 'Bi-monthly home pest control for ants, roaches, spiders and more across EnviroCare service areas in Alabama. Four local offices serving surrounding communities.',
    images: ['/og-image.png'],
  },
};

export default function PestControlPage() {
  return <ServicePage slug="pest-control" />;
}
