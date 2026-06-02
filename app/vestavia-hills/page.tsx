import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Vestavia Hills Pest Control | EnviroCare Family-Owned Since 1958',
  description: 'Vestavia Hills pest control & termite protection. Sentricon® Certified. Family-owned. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/vestavia-hills", type: "website", images: [{ url: "/api/og?slug=vestavia-hills", width: 1200, height: 630, alt: "EnviroCare pest control in vestavia hills" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=vestavia-hills"] },
};

export default function VestaviaHillsPage() {
  return <CityPage slug="vestavia-hills" />;
}
