import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/termite-control' },
  title: 'Termite Control Birmingham AL | Sentricon® | EnviroCare',
  description: 'Sentricon termite protection in Birmingham, AL — priced after a free WDO inspection, no drilling, EnviroCare guarantee up to $1M. Free inspection. Call (205) 940-6360.',
};

export default function TermiteControlPage() {
  return <ServicePage slug="termite-control" />;
}
