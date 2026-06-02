import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Mountain Brook Pest & Termite Control | EnviroCare Since 1958',
  description: 'Mountain Brook pest control. Sentricon® $1M termite coverage. Discreet, professional service. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/mountain-brook", type: "website", images: [{ url: "/api/og?slug=mountain-brook", width: 1200, height: 630, alt: "EnviroCare pest control in mountain brook" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=mountain-brook"] },
};

export default function MountainBrookPage() {
  return <CityPage slug="mountain-brook" />;
}
