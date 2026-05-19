import type { Metadata } from 'next';
import RequestQuoteForm from '@/components/RequestQuoteForm';

export const metadata: Metadata = {
  title: 'Request a Free Pest Control Quote | EnviroCare Alabama',
  description:
    'Request a personal pest control quote from EnviroCare. Routed to your local Birmingham, Lake Martin, or Huntsville office. Same- or next-day response.',
  alternates: { canonical: 'https://envirocarellc.com/request-quote' },
};

export default function RequestQuotePage() {
  return <RequestQuoteForm />;
}
