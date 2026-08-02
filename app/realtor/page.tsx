import RealtorPage from '@/components/pages/RealtorPage';

export const metadata = {
  alternates: { canonical: '/realtor' },
  title: 'Alabama WDO Letters for Realtors | EnviroCare',
  description: 'Fast WDO inspection letters for Alabama real estate closings. NPMA-33 form, lender-ready, 48-hour turnaround. Family-owned since 1958. Call (205) 940-6360.',
  openGraph: {
    title: 'Alabama WDO Letters for Realtors | EnviroCare',
    description: 'Fast WDO inspection letters for Alabama real estate closings. NPMA-33 form, lender-ready, 48-hour turnaround. Family-owned since 1958. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/realtor',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alabama WDO Letters for Realtors | EnviroCare',
    description: 'Fast WDO inspection letters for Alabama real estate closings. NPMA-33 form, lender-ready, 48-hour turnaround. Family-owned since 1958. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <RealtorPage />;
}
