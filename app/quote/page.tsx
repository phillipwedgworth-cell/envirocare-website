import ScheduleRequest from '../../components/ScheduleRequest';

export const metadata = {
  alternates: { canonical: '/quote' },
  title: "Request a Visit | EnviroCare Alabama",
  description: "Tell us when works best and our Alabama office will call to set up your pest, termite, or mosquito visit. Free inspection — no obligation.",
};

export default function QuotePage() {
  return (
    <main>
      <section style={{ background: '#FEFDF8', padding: '48px 16px 56px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.7rem,3vw,2.3rem)', fontWeight: 600, color: '#0E1A0F', marginBottom: 10 }}>
              Request a Visit
            </h1>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: '#5b6f60', fontSize: '15.5px', lineHeight: 1.6, margin: 0 }}>
              Tell us what works best and our office will call to set it up — most visits don&rsquo;t require you home.
            </p>
          </div>
          <ScheduleRequest />
          <p style={{
            textAlign: 'center',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '14px',
            color: '#5A6660',
            marginTop: 24,
            marginBottom: 0,
          }}>
            Prefer to talk it through?{' '}
            <a
              href="/request-quote"
              style={{ color: '#0E8E40', textDecoration: 'underline', fontWeight: 600 }}
            >
              Request a personal quote →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
