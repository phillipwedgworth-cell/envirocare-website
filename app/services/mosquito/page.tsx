import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/mosquito' },
  title: 'Mosquito Control in Birmingham & Huntsville, AL | EnviroCare',
  description: 'Seasonal mosquito control (Mar–Oct) that significantly reduces yard mosquitoes. ACH spreads it across the year. Add tick & chigger coverage. Call (205) 940-6360.',
  openGraph: {
    title: 'Mosquito Control in Birmingham & Huntsville, AL | EnviroCare',
    description: 'Seasonal mosquito control (Mar–Oct) that significantly reduces yard mosquitoes. ACH spreads it across the year. Add tick & chigger coverage. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services/mosquito',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mosquito Control in Birmingham & Huntsville, AL | EnviroCare',
    description: 'Seasonal mosquito control (Mar–Oct) that significantly reduces yard mosquitoes. ACH spreads it across the year. Add tick & chigger coverage. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function MosquitoPage() {
  return <ServicePage slug="mosquito" />;
}
