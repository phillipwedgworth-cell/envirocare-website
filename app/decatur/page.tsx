import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Decatur Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Decatur, AL pest control. River City family service. Sentricon® termite protection. Call (256) 937-7676.',
  openGraph: { url: "https://envirocare-web.vercel.app/decatur", type: "website", images: [{ url: "/api/og?slug=decatur", width: 1200, height: 630, alt: "EnviroCare pest control in decatur" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=decatur"] },
};

export default function DecaturPage() {
  return <CityPage slug="decatur" />;
}
