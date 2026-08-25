import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/decatur' },
  openGraph: { url: 'https://www.envirocarellc.com/decatur', images: ['/og/og-decatur.png'] },
  title: 'Pest Control Decatur AL | From $35/mo | Free Termite Inspection',
  description: 'Bi-monthly pest control from $35/month in Decatur — 30+ pests, re-service between visits at no charge. Old Decatur crawlspaces to new Albany builds. Free termite inspection. Call (256) 937-7676.',
};

export default function DecaturPage() {
  return <CityPage slug="decatur" />;
}
