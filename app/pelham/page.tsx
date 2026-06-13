import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/pelham' },
  openGraph: { images: ['/og/og-pelham.png'] },
  title: 'Pelham Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Pelham pest control. Oak Mountain area family-owned service. Sentricon® $1M coverage. Call (205) 940-6360.',
};

export default function PelhamPage() {
  return <CityPage slug="pelham" />;
}
