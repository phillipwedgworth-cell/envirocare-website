import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/hartselle' },
  openGraph: { images: ['/og/og-hartselle.png'] },
  title: 'Hartselle Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Hartselle pest control. Morgan County family service. Sentricon® $1M coverage. Call (256) 937-7676.',
};

export default function HartsellePage() {
  return <CityPage slug="hartselle" />;
}
