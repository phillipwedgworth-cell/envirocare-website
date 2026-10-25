import type { Metadata } from 'next';
import ReviewsPage from '@/components/pages/ReviewsPage';

const title = 'Google Reviews by Office | EnviroCare Alabama';
const description = 'Find EnviroCare Google profiles for Birmingham, Alabaster, Huntsville and Alexander City. Read customer feedback or share your service experience.';

export const metadata: Metadata = {
  alternates: { canonical: '/reviews' },
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://www.envirocarellc.com/reviews',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ReviewsPage />;
}
