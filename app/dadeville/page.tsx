import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Dadeville Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Dadeville pest control. Lake Martin-area family service. Sentricon® termite protection. Call (256) 234-6162.',
  openGraph: { url: "https://envirocare-web.vercel.app/dadeville", type: "website", images: [{ url: "/api/og?slug=dadeville", width: 1200, height: 630, alt: "EnviroCare pest control in dadeville" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=dadeville"] },
};

export default function DadevillePage() {
  return <CityPage slug="dadeville" />;
}
