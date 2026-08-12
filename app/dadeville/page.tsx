import CityPage from '@/components/pages/CityPage';

export const metadata = {
  alternates: { canonical: '/dadeville' },
  openGraph: { url: 'https://www.envirocarellc.com/dadeville', images: ['/og/og-dadeville.png'] },
  // Retitled 2026-07-25: Local Falcon 7/24 showed "pest control dadeville al" at
  // 0.00% SoLV, found in only 6 of 49 grid points — the single hole in a market
  // where EnviroCare otherwise holds ~45% SoLV. Title now leads with the query.
  title: 'Pest Control Dadeville AL | Termite & Mosquito | EnviroCare Since 1958',
  description: 'Pest control in Dadeville, AL from the family that has served Tallapoosa County since 1958. StillWaters, downtown & Lake Martin east shore. No-drill Sentricon® with $1M coverage. Call (256) 234-6162.',
};

export default function DadevillePage() {
  return <CityPage slug="dadeville" />;
}
