import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Homewood Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Homewood pest control. Bi-monthly service, Sentricon® termite protection. Family-owned. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/homewood", type: "website", images: [{ url: "/api/og?slug=homewood", width: 1200, height: 630, alt: "EnviroCare pest control in homewood" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=homewood"] },
};

export default function HomewoodPage() {
  return <CityPage slug="homewood" />;
}
