import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Mt Laurel Pest Control & Termite Service | EnviroCare',
  description: 'Mt Laurel pest control. Village-area family service. Sentricon® termite protection. Call (205) 940-6360.',
  openGraph: { url: "https://envirocare-web.vercel.app/mt-laurel", type: "website", images: [{ url: "/api/og?slug=mt-laurel", width: 1200, height: 630, alt: "EnviroCare pest control in mt laurel" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=mt-laurel"] },
};

export default function MtLaurelPage() {
  return <CityPage slug="mt-laurel" />;
}
