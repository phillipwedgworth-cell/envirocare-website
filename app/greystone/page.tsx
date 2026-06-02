import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Greystone Area Pest Control (Hoover, AL) | EnviroCare Since 1958',
  description: 'Pest control for the Greystone area of Hoover, AL. Sentricon® $1M termite coverage. Family-owned since 1958. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/greystone", type: "website", images: [{ url: "/api/og?slug=greystone", width: 1200, height: 630, alt: "EnviroCare pest control in greystone" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=greystone"] },
};

export default function GreystonePage() {
  return <CityPage slug="greystone" />;
}
