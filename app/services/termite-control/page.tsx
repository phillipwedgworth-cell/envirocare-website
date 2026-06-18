import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/termite-control' },
  title: 'Termite Control & Sentricon in Birmingham, AL | EnviroCare',
  description: 'Sentricon termite protection across Birmingham & Alabama. Colony elimination, $325 install or ~$32/mo. Family-owned since 1958. Call (205) 940-6360.',
};

export default function TermiteControlPage() {
  return <ServicePage slug="termite-control" />;
}
