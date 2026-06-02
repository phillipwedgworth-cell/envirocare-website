import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Lake Martin Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Lake Martin pest control. Waterfront termite protection. Mosquito & tick yard service. Call (256) 234-6162.',
  openGraph: { url: "https://envirocare-web.vercel.app/lake-martin", type: "website", images: [{ url: "/api/og?slug=lake-martin", width: 1200, height: 630, alt: "EnviroCare pest control in lake martin" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=lake-martin"] },
};

export default function LakeMartinPage() {
  return <CityPage slug="lake-martin" />;
}
