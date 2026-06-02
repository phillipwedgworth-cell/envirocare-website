import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Harvest Pest Control & Termite Service | EnviroCare',
  description: 'Harvest, AL pest control. North Madison County family service. Sentricon® termite protection. Call (256) 937-7676.',
  openGraph: { url: "https://envirocare-web.vercel.app/harvest", type: "website", images: [{ url: "/api/og?slug=harvest", width: 1200, height: 630, alt: "EnviroCare pest control in harvest" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=harvest"] },
};

export default function HarvestPage() {
  return <CityPage slug="harvest" />;
}
