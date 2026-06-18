import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/real-estate-wdo' },
  title: 'WDO Inspections & Termite Letters in Alabama | EnviroCare',
  description: 'Real estate WDO inspections & termite letters across Alabama. Turnaround that fits your closing. Buyers, sellers & agents. Call (205) 940-6360.',
};

export default function RealEstateWdoPage() {
  return <ServicePage slug="real-estate-wdo" />;
}
