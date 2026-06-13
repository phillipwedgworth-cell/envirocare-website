import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/chelsea' },
  openGraph: { images: ['/og/og-chelsea.png'] },
  title: 'Chelsea Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Chelsea, AL pest control. Family-owned bi-monthly service. Sentricon® termite protection. Call (205) 940-6360.',
};

export default function ChelseaPage() {
  return <CityPage slug="chelsea" />;
}
