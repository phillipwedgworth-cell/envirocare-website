import type { Metadata } from 'next';
import RequestQuoteForm from '@/components/RequestQuoteForm';

export const metadata: Metadata = {
  title: 'Request a Free Pest Control Quote | EnviroCare Alabama',
  description:
    'Request a personal pest control quote from EnviroCare. Routed to your local Birmingham, Lake Martin, or Huntsville office. Same- or next-day response.',
  alternates: { canonical: './' },
  openGraph: {
    title: 'Request a Free Pest Control Quote | EnviroCare Alabama',
    description: 'Request a personal pest control quote from EnviroCare. Routed to your local Birmingham, Lake Martin, or Huntsville office. Same- or next-day response.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Free Pest Control Quote | EnviroCare Alabama',
    description: 'Request a personal pest control quote from EnviroCare. Routed to your local Birmingham, Lake Martin, or Huntsville office. Same- or next-day response.',
    images: ['/og-image.png'],
  },
};

export default function RequestQuotePage() {
  return <RequestQuoteForm />;
}
