import ZipLookup from '@/components/ZipLookup';

export const metadata = {
  alternates: { canonical: '/find-office' },
  title: 'Find Your Local EnviroCare Office | Alabama Pest Control',
  description: 'Enter your Alabama zip code to find the EnviroCare office that serves your area. Three offices: Birmingham, Lake Martin, Huntsville. Call (205) 940-6360.',
};

export default function FindOfficePage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%)',
      padding: '80px 24px',
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#0A7935',
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12,
        }}>
          🌻 Three Alabama Offices · Family-Owned Since 1958
        </div>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700, margin: '0 0 16px', lineHeight: 1.1,
          color: '#0E1A0F',
        }}>
          Find Your <em style={{ color: '#0A7935' }}>Local Office</em>
        </h1>
        <p style={{
          fontSize: 18, color: '#5A6660', maxWidth: 640, margin: '0 auto', lineHeight: 1.55,
        }}>
          EnviroCare serves Alabama from three locations. Enter your zip code below and
          we&apos;ll route you to the office nearest you — a real human, not a call center.
        </p>
      </div>
      <ZipLookup variant="card" />
      <div style={{ maxWidth: 900, margin: '64px auto 0', textAlign: 'center' }}>
        <p style={{ fontSize: 15, color: '#5A6660', marginBottom: 24 }}>
          Or call any office directly:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          <a href="tel:2059406360" style={officeCardStyle}>
            <strong style={officeLabel}>BIRMINGHAM</strong>
            <span style={officePhone}>(205) 940-6360</span>
            <span style={officeAddr}>2025 Butler Rd, Alabaster</span>
          </a>
          <a href="tel:2562346162" style={officeCardStyle}>
            <strong style={officeLabel}>LAKE MARTIN / ALEX CITY</strong>
            <span style={officePhone}>(256) 234-6162</span>
            <span style={officeAddr}>1785 Tallapoosa St, Alexander City</span>
          </a>
          <a href="tel:2569377676" style={officeCardStyle}>
            <strong style={officeLabel}>HUNTSVILLE</strong>
            <span style={officePhone}>(256) 937-7676</span>
            <span style={officeAddr}>7027 Old Madison Pike, Ste 108</span>
          </a>
        </div>
      </div>
    </main>
  );
}

const officeCardStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 6,
  padding: '20px 24px',
  background: '#fff',
  border: '1px solid #E8E2D8',
  borderRadius: 14,
  textDecoration: 'none',
  color: '#0E1A0F',
  transition: 'transform 0.15s, box-shadow 0.15s',
};
const officeLabel = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.06em',
  color: '#0A7935',
};
const officePhone = {
  fontFamily: "var(--font-serif)",
  fontSize: 22,
  fontWeight: 700,
};
const officeAddr = {
  fontSize: 13,
  color: '#5A6660',
};
