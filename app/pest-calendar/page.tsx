import SeasonalPestCalendar from '@/components/SeasonalPestCalendar';

export const metadata = {
  alternates: { canonical: '/pest-calendar' },
  title: 'Alabama Pest Calendar | What\'s Active This Month | EnviroCare',
  description: 'Alabama pest activity by month — termites in March, mosquitoes March–November. Free inspection. Call (205) 940-6360.',
};

export default function PestCalendarPage() {
  return (
    <main style={{ background: '#FEFDF8', minHeight: '100vh' }}>
      <SeasonalPestCalendar />
    </main>
  );
}
