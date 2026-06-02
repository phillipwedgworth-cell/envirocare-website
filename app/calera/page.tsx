import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Calera Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Calera pest control. New construction termite pre-treat. Family-owned since 1958. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/calera", type: "website", images: [{ url: "/api/og?slug=calera", width: 1200, height: 630, alt: "EnviroCare pest control in calera" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=calera"] },
};

export default function CaleraPage() {
  return <CityPage slug="calera" />;
}
