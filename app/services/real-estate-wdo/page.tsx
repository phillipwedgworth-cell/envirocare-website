import ServicePage from '@/components/pages/ServicePage';

export const metadata = {
  alternates: { canonical: '/services/real-estate-wdo' },
  title: 'Alabama WDO Inspection Letters | EnviroCare Fast Turnaround',
  description: 'Wood-destroying organism inspection letters for Alabama closings. Lender-ready format. Call (205) 940-6360.',
};

export default function RealEstateWdoPage() {
  return <ServicePage slug="real-estate-wdo" />;
}
