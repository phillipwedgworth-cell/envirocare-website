import ScheduleRequest from '../../components/ScheduleRequest';

export const metadata = {
  alternates: { canonical: '/quote' },
  title: "Request a Free Pest Control Visit | EnviroCare Alabama",
  description: "Tell us what works best and our office will call to set up your free pest control visit. Pest, termite, and mosquito service across Alabama — no obligation.",
};

export default function QuotePage() {
  return (
    <>
      <section style={{ background: '#FEFDF8', padding: '48px 16px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 600, color: '#0E1A0F', marginBottom: 8 }}>
              Request a Free Pest Control Visit
            </h1>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: '#5b6f60', fontSize: '15.5px', margin: 0 }}>
              Tell us what works best and our office will call to set it up — most visits don&rsquo;t require you home.
            </p>
          </div>
          <ScheduleRequest />
        </div>
      </section>
      <p style={{
        textAlign: 'center',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: '14px',
        color: '#5A6660',
        padding: '0 16px 40px',
        margin: 0,
      }}>
        Need help choosing?{' '}
        <a
          href="/pricing"
          style={{ color: '#0E8E40', textDecoration: 'underline', fontWeight: 600 }}
        >
          View our transparent pricing →
        </a>
      </p>
    </>
  );
}
