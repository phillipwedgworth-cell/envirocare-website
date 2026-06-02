import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Eclectic Pest Control & Termite Service | EnviroCare Since 1958',
  description: 'Eclectic, AL pest control. Lake Martin south-shore service. Family-owned. Call (256) 234-6162.',
  openGraph: { url: "https://envirocare-web.vercel.app/eclectic", type: "website", images: [{ url: "/api/og?slug=eclectic", width: 1200, height: 630, alt: "EnviroCare pest control in eclectic" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=eclectic"] },
};

export default function EclecticPage() {
  return <CityPage slug="eclectic" />;
}
