import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Madison Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Madison, AL pest control. North Alabama family service. Sentricon® termite protection. Call (256) 937-7676.',
  openGraph: { url: "https://envirocare-web.vercel.app/madison", type: "website", images: [{ url: "/api/og?slug=madison", width: 1200, height: 630, alt: "EnviroCare pest control in madison" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=madison"] },
};

export default function MadisonPage() {
  return <CityPage slug="madison" />;
}
