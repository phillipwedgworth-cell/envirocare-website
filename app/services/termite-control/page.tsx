import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/termite-control' },
  title: 'Sentricon® Termite Control & Cost in Alabama | EnviroCare',
  description: 'Sentricon® termite protection with in-ground bait stations and no drilling. Free WDO inspection; termite service is quoted after inspection in EnviroCare service areas.',
  openGraph: {
    title: 'Sentricon® Termite Control & Cost in Alabama | EnviroCare',
    description: 'Sentricon® termite protection with in-ground bait stations and no drilling. Free WDO inspection; termite service is quoted after inspection in EnviroCare service areas.',
    url: 'https://www.envirocarellc.com/services/termite-control',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentricon® Termite Control & Cost in Alabama | EnviroCare',
    description: 'Sentricon® termite protection with in-ground bait stations and no drilling. Free WDO inspection; termite service is quoted after inspection in EnviroCare service areas.',
    images: ['/og-image.png'],
  },
};

export default function TermiteControlPage() {
  return <ServicePage slug="termite-control" />;
}
