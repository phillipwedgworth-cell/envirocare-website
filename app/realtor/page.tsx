import RealtorPage from '@/components/pages/RealtorPage';

export const metadata = {
  alternates: { canonical: '/realtor' },
  title: "Alabama WDO Letters for Realtors & Closings | EnviroCare",
  description: "WDO inspection letters for Alabama closings: the lender-ready Official Alabama Wood Infestation Inspection Report for agents. Call (205) 940-6360.",
  openGraph: {
    title: "Alabama WDO Letters for Realtors & Closings | EnviroCare",
    description: "WDO inspection letters for Alabama closings: the lender-ready Official Alabama Wood Infestation Inspection Report for agents. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/realtor',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alabama WDO Letters for Realtors & Closings | EnviroCare",
    description: "WDO inspection letters for Alabama closings: the lender-ready Official Alabama Wood Infestation Inspection Report for agents. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <RealtorPage />;
}
