import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Pelham Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Pelham pest control. Oak Mountain area family-owned service. Sentricon® $1M coverage. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/pelham", type: "website", images: [{ url: "/api/og?slug=pelham", width: 1200, height: 630, alt: "EnviroCare pest control in pelham" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=pelham"] },
};

export default function PelhamPage() {
  return <CityPage slug="pelham" />;
}
