import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/termite-control' },
  title: 'Termite Control Birmingham AL | Sentricon® | EnviroCare',
  description: 'Sentricon termite protection in Birmingham, AL — no drilling, EnviroCare guarantee up to $1M. Free WDO inspection. Call (205) 940-6360.',
  openGraph: {
    title: 'Termite Control Birmingham AL | Sentricon® | EnviroCare',
    description: 'Sentricon termite protection in Birmingham, AL — no drilling, EnviroCare guarantee up to $1M. Free WDO inspection. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/services/termite-control',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Termite Control Birmingham AL | Sentricon® | EnviroCare',
    description: 'Sentricon termite protection in Birmingham, AL — no drilling, EnviroCare guarantee up to $1M. Free WDO inspection. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function TermiteControlPage() {
  return <ServicePage slug="termite-control" />;
}
