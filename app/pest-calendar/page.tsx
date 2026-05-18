import SeasonalPestCalendar from '@/components/SeasonalPestCalendar';

export const metadata = {
  title: 'Alabama Pest Calendar | What\'s Active This Month | EnviroCare',
  description: 'Alabama pest activity by month. Termites in March, mosquitoes April–October, rodents in fall. What\'s in your yard right now? Free inspection. Call (205) 649-5278.',
};

export default function PestCalendarPage() {
  return (
    <main style={{ background: '#FEFDF8', minHeight: '100vh' }}>
      <SeasonalPestCalendar />
    </main>
  );
}
