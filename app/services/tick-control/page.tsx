import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/tick-control' },
  title: 'Tick Control in Birmingham, AL | Yard Treatment | EnviroCare',
  description: 'Seasonal tick control that significantly reduces yard ticks & chiggers. ~$43.33/mo with mosquito. Birmingham & across Alabama. Call (205) 940-6360.',
  openGraph: {
    title: 'Tick Control in Birmingham, AL | Yard Treatment | EnviroCare',
    description: 'Seasonal tick control that significantly reduces yard ticks & chiggers. ~$43.33/mo with mosquito. Birmingham & across Alabama. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services/tick-control',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tick Control in Birmingham, AL | Yard Treatment | EnviroCare',
    description: 'Seasonal tick control that significantly reduces yard ticks & chiggers. ~$43.33/mo with mosquito. Birmingham & across Alabama. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function TickControlPage() {
  return <ServicePage slug="tick-control" />;
}
