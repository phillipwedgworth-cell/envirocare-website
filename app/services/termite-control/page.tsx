import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/termite-control' },
  title: 'Termite Control in Birmingham, AL & Sentricon® | EnviroCare',
  description: 'Termite control in Birmingham, AL with the Sentricon® bait system and no drilling. Free WDO termite inspection; Sentricon® is quoted after inspection in EnviroCare service areas.',
  openGraph: {
    title: 'Termite Control in Birmingham, AL & Sentricon® | EnviroCare',
    description: 'Termite control in Birmingham, AL with the Sentricon® bait system and no drilling. Free WDO termite inspection; Sentricon® is quoted after inspection in EnviroCare service areas.',
    url: 'https://www.envirocarellc.com/services/termite-control',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Termite Control in Birmingham, AL & Sentricon® | EnviroCare',
    description: 'Termite control in Birmingham, AL with the Sentricon® bait system and no drilling. Free WDO termite inspection; Sentricon® is quoted after inspection in EnviroCare service areas.',
    images: ['/og-image.png'],
  },
};

export default function TermiteControlPage() {
  return <ServicePage slug="termite-control" />;
}
