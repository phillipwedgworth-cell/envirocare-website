import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/decatur' },
  openGraph: { url: 'https://www.envirocarellc.com/decatur', images: ['/og/og-decatur.png'] },
  title: 'Pest Control Decatur AL | $35/mo | Free Termite Inspection',
  description: 'Bi-monthly pest control from $35/mo in Decatur — 30+ pests, re-service at no charge. Old Decatur to new Albany builds. Call (256) 937-7676.',
};

export default function DecaturPage() {
  return <CityPage slug="decatur" />;
}
