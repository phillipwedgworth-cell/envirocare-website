import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Birmingham Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Family-owned Birmingham pest control. Termite, mosquito & tick service. Sentricon® up to $1M coverage. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/birmingham", type: "website", images: [{ url: "/api/og?slug=birmingham", width: 1200, height: 630, alt: "EnviroCare pest control in birmingham" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=birmingham"] },
};

export default function BirminghamPage() {
  return <CityPage slug="birmingham" />;
}
