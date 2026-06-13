import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/huntsville' },
  openGraph: { images: ['/og/og-huntsville.png'] },
  title: 'Pest Control Huntsville AL | Exterminator, Termite & Mosquito | EnviroCare',
  description: "Huntsville's trusted pest control and exterminator since 1958. Bi-monthly from $35/mo, Sentricon® $1M termite coverage, mosquito & tick yard treatment. Research Park · Hampton Cove · Jones Valley. Call (256) 937-7676.",
};

export default function HuntsvillePage() {
  return <CityPage slug="huntsville" />;
}
