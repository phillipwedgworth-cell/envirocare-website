import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Chelsea Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Chelsea, AL pest control. Family-owned bi-monthly service. Sentricon® termite protection. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/chelsea", type: "website", images: [{ url: "/api/og?slug=chelsea", width: 1200, height: 630, alt: "EnviroCare pest control in chelsea" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=chelsea"] },
};

export default function ChelseaPage() {
  return <CityPage slug="chelsea" />;
}
