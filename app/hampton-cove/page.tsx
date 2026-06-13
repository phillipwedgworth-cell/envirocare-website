import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/hampton-cove' },
  openGraph: { images: ['/og/og-hampton-cove.png'] },
  title: 'Hampton Cove Pest Control | EnviroCare Since 1958',
  description: 'Hampton Cove pest control. Premium Huntsville-area service. Sentricon® $1M coverage. Call (256) 937-7676.',
};

export default function HamptonCovePage() {
  return <CityPage slug="hampton-cove" />;
}
