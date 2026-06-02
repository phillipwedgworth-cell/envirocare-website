import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Auburn Pest Control & Termite Service | EnviroCare Family-Owned',
  description: 'Auburn, AL pest control. Lee County family service. Sentricon® $1M termite coverage. Call (334) 332-3321.',
  openGraph: { url: "https://envirocare-web.vercel.app/auburn", type: "website", images: [{ url: "/api/og?slug=auburn", width: 1200, height: 630, alt: "EnviroCare pest control in auburn" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=auburn"] },
};

export default function AuburnPage() {
  return <CityPage slug="auburn" />;
}
