import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Tuscaloosa Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Tuscaloosa pest control. Black Warrior River-area family service. Sentricon® $1M termite coverage. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/tuscaloosa", type: "website", images: [{ url: "/api/og?slug=tuscaloosa", width: 1200, height: 630, alt: "EnviroCare pest control in tuscaloosa" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=tuscaloosa"] },
};

export default function TuscaloosaPage() {
  return <CityPage slug="tuscaloosa" />;
}
