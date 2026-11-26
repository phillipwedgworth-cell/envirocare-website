import FaqPage from '@/components/pages/FaqPage';

export const metadata = {
  alternates: { canonical: '/faq' },
  title: "EnviroCare FAQ | Pest, Termite & Mosquito Answers in Alabama",
  description: "Answers to common questions about EnviroCare pest control, Sentricon® termite, mosquito and tick service, pricing and scheduling. Call (205) 940-6360.",
  openGraph: {
    title: "EnviroCare FAQ | Pest, Termite & Mosquito Answers in Alabama",
    description: "Answers to common questions about EnviroCare pest control, Sentricon® termite, mosquito and tick service, pricing and scheduling. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/faq',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "EnviroCare FAQ | Pest, Termite & Mosquito Answers in Alabama",
    description: "Answers to common questions about EnviroCare pest control, Sentricon® termite, mosquito and tick service, pricing and scheduling. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <FaqPage />;
}
