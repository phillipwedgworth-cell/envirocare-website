import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Trussville Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Trussville pest control. Cahaba River-area family service. Sentricon® $1M coverage. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/trussville", type: "website", images: [{ url: "/api/og?slug=trussville", width: 1200, height: 630, alt: "EnviroCare pest control in trussville" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=trussville"] },
};

export default function TrussvillePage() {
  return <CityPage slug="trussville" />;
}
