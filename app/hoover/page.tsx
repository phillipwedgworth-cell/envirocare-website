import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Hoover Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Hoover, AL family-owned pest control. Sentricon® $1M coverage. Mosquito & tick yard service. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/hoover", type: "website", images: [{ url: "/api/og?slug=hoover", width: 1200, height: 630, alt: "EnviroCare pest control in hoover" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=hoover"] },
};

export default function HooverPage() {
  return <CityPage slug="hoover" />;
}
