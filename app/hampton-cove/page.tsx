import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Hampton Cove Pest Control | EnviroCare Since 1958',
  description: 'Hampton Cove pest control. Premium Huntsville-area service. Sentricon® $1M coverage. Call (256) 937-7676.',
  openGraph: { url: "https://envirocare-web.vercel.app/hampton-cove", type: "website", images: [{ url: "/api/og?slug=hampton-cove", width: 1200, height: 630, alt: "EnviroCare pest control in hampton cove" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=hampton-cove"] },
};

export default function HamptonCovePage() {
  return <CityPage slug="hampton-cove" />;
}
