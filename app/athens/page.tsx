import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Athens Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Athens, AL pest control. Limestone County family service. Sentricon® $1M coverage. Call (256) 937-7676.',
  openGraph: { url: "https://envirocare-web.vercel.app/athens", type: "website", images: [{ url: "/api/og?slug=athens", width: 1200, height: 630, alt: "EnviroCare pest control in athens" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=athens"] },
};

export default function AthensPage() {
  return <CityPage slug="athens" />;
}
