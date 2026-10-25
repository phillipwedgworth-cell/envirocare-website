import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomepageReview from './HomepageReview';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'EnviroCare homepage design review',
  robots: { index: false, follow: false },
};

export default function DesignReviewPage() {
  // Review tooling is available on the requested Vercel preview, never production.
  if (process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV === 'production') {
    notFound();
  }
  return <HomepageReview />;
}
