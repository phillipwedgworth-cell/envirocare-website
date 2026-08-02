import ReviewsPage from '@/components/pages/ReviewsPage';

export const metadata = {
  alternates: { canonical: '/reviews' },
  title: 'Customer Reviews — Google Verified | EnviroCare Alabama',
  description: 'Read EnviroCare\'s verified Google reviews. five-star average rating across 68 years of Alabama service. Family-owned since 1958.',
  openGraph: {
    title: 'Customer Reviews — Google Verified | EnviroCare Alabama',
    description: 'Read EnviroCare\'s verified Google reviews. five-star average rating across 68 years of Alabama service. Family-owned since 1958.',
    url: 'https://www.envirocarellc.com/reviews',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews — Google Verified | EnviroCare Alabama',
    description: 'Read EnviroCare\'s verified Google reviews. five-star average rating across 68 years of Alabama service. Family-owned since 1958.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <ReviewsPage />;
}
