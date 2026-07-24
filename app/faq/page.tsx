import FaqPage from '@/components/pages/FaqPage';

export const metadata = {
  alternates: { canonical: '/faq' },
  title: 'EnviroCare FAQ | Pest, Termite & Mosquito Answers',
  description: 'Common questions about EnviroCare pest control, Sentricon® termite, mosquito and tick services. 68 years answering Alabama questions. Call (205) 940-6360.',
  openGraph: {
    title: 'EnviroCare FAQ | Pest, Termite & Mosquito Answers',
    description: 'Common questions about EnviroCare pest control, Sentricon® termite, mosquito and tick services. 68 years answering Alabama questions. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/faq',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnviroCare FAQ | Pest, Termite & Mosquito Answers',
    description: 'Common questions about EnviroCare pest control, Sentricon® termite, mosquito and tick services. 68 years answering Alabama questions. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <FaqPage />;
}
