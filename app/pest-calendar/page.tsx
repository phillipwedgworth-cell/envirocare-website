import SeasonalPestCalendar from '@/components/SeasonalPestCalendar';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata = {
  alternates: { canonical: '/pest-calendar' },
  title: 'Alabama Pest Calendar | What\'s Active This Month | EnviroCare',
  description: 'Alabama pest activity by month — termites in March, mosquitoes March–November. Free inspection. Call (205) 940-6360.',
  openGraph: {
    title: 'Alabama Pest Calendar | What\'s Active This Month | EnviroCare',
    description: 'Alabama pest activity by month — termites in March, mosquitoes March–November. Free inspection. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/pest-calendar',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alabama Pest Calendar | What\'s Active This Month | EnviroCare',
    description: 'Alabama pest activity by month — termites in March, mosquitoes March–November. Free inspection. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function PestCalendarPage() {
  return (
    <main style={{ background: '#FEFDF8', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Pest Calendar', path: '/pest-calendar' }]) }) }} />
      <SeasonalPestCalendar />
    </main>
  );
}
