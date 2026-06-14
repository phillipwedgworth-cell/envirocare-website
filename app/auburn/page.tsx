import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/auburn' },
  openGraph: { images: ['/og/og-auburn.png'] },
  title: 'Pest Control Auburn AL | Termite & Mosquito | EnviroCare',
  description: 'Auburn pest control — bi-monthly service, Sentricon termite protection, mosquito treatment. Serving Auburn and Opelika. Call (334) 332-3321.',
};

export default function AuburnPage() {
  return <CityPage slug="auburn" />;
}
