import CityPage from '@/components/pages/CityPage';

export const metadata = {
  title: 'Pest Control Huntsville AL | Exterminator, Termite & Mosquito | EnviroCare',
  description: "Huntsville's trusted pest control and exterminator since 1958. Termite control with Sentricon® $1M coverage. Mosquito yard treatment. Call (256) 937-7676.",
  openGraph: { url: "https://envirocare-web.vercel.app/huntsville", type: "website", images: [{ url: "/api/og?slug=huntsville", width: 1200, height: 630, alt: "EnviroCare pest control in huntsville" }] },
  twitter: { card: "summary_large_image", images: ["/api/og?slug=huntsville"] },
};

export default function HuntsvillePage() {
  return <CityPage slug="huntsville" />;
}
