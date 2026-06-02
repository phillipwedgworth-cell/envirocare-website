import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Alexander City Pest Control | EnviroCare Home Office Since 1958',
  description: "Alexander City pest control — EnviroCare's original 1958 office. Family-owned bi-monthly service, Sentricon® termite, mosquito and tick. Call (256) 234-6162.",
  openGraph: { url: "https://envirocare-web.vercel.app/alexander-city", type: "website", images: [{ url: "/api/og?slug=alexander-city", width: 1200, height: 630, alt: "EnviroCare pest control in alexander city" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=alexander-city"] },
};

export default function AlexanderCityPage() {
  return <CityPage slug="alexander-city" />;
}
