import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/mosquito' },
  title: 'Mosquito Control in Alabama | EnviroCare',
  description: 'Seasonal mosquito control across EnviroCare service areas in Alabama, with 8 scheduled treatments from March through October. Free inspection and local service.',
  openGraph: {
    title: 'Mosquito Control in Alabama | EnviroCare',
    description: 'Seasonal mosquito control across EnviroCare service areas in Alabama, with 8 scheduled treatments from March through October. Free inspection and local service.',
    url: 'https://www.envirocarellc.com/services/mosquito',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mosquito Control in Alabama | EnviroCare',
    description: 'Seasonal mosquito control across EnviroCare service areas in Alabama, with 8 scheduled treatments from March through October. Free inspection and local service.',
    images: ['/og-image.png'],
  },
};

export default function MosquitoPage() {
  return <ServicePage slug="mosquito" />;
}
