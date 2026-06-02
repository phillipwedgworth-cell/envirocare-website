import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Opelika Pest Control & Termite Service | EnviroCare',
  description: 'Opelika pest control. Lee County family service. Sentricon® termite protection. Call (256) 234-6162.',
  openGraph: { url: "https://envirocare-web.vercel.app/opelika", type: "website", images: [{ url: "/api/og?slug=opelika", width: 1200, height: 630, alt: "EnviroCare pest control in opelika" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=opelika"] },
};

export default function OpelikaPage() {
  return <CityPage slug="opelika" />;
}
