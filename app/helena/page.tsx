import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Helena Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Helena pest control. Cahaba River-area family service. Sentricon® termite protection. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/helena", type: "website", images: [{ url: "/api/og?slug=helena", width: 1200, height: 630, alt: "EnviroCare pest control in helena" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=helena"] },
};

export default function HelenaPage() {
  return <CityPage slug="helena" />;
}
