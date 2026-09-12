import ZipLookup from '@/components/ZipLookup';
import Link from 'next/link';
import { OFFICES, type OfficeId } from '@/data/offices';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

const OFFICE_ORDER: OfficeId[] = ['birmingham-downtown', 'birmingham', 'lake-martin', 'huntsville'];

const OFFICE_PRESENTATION: Record<OfficeId, { label: string; page: string }> = {
  'birmingham-downtown': { label: 'Birmingham', page: '/birmingham' },
  birmingham: { label: 'Alabaster', page: '/alabaster' },
  'lake-martin': { label: 'Alexander City / Lake Martin', page: '/lake-martin' },
  huntsville: { label: 'Huntsville', page: '/huntsville' },
};

const OFFICE_SCHEMA_IDS: Record<OfficeId, string> = {
  'birmingham-downtown': 'https://www.envirocarellc.com/#birmingham',
  birmingham: 'https://www.envirocarellc.com/#alabaster',
  'lake-martin': 'https://www.envirocarellc.com/#lake-martin',
  huntsville: 'https://www.envirocarellc.com/#huntsville',
};

export const metadata = {
  alternates: { canonical: '/find-office' },
  title: 'Find Your Local EnviroCare Office | Alabama Pest Control',
  description: 'Enter your Alabama zip code to find the EnviroCare office that serves your area. Four offices: Birmingham, Alabaster, Lake Martin, Huntsville. Call (205) 940-6360.',
  openGraph: {
    title: 'Find Your Local EnviroCare Office | Alabama Pest Control',
    description: 'Enter your Alabama zip code to find the EnviroCare office that serves your area. Four offices: Birmingham, Alabaster, Lake Martin, Huntsville. Call (205) 940-6360.',
    url: 'https://www.envirocarellc.com/find-office',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Local EnviroCare Office | Alabama Pest Control',
    description: 'Enter your Alabama zip code to find the EnviroCare office that serves your area. Four offices: Birmingham, Alabaster, Lake Martin, Huntsville. Call (205) 940-6360.',
    images: ['/og-image.png'],
  },
};

export default function FindOfficePage() {
  const offices = OFFICE_ORDER.map((id) => ({
    ...OFFICES[id],
    ...OFFICE_PRESENTATION[id],
  }));

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.envirocarellc.com/find-office#page',
    name: 'Find Your Local EnviroCare Office',
    url: 'https://www.envirocarellc.com/find-office',
    about: { '@id': 'https://www.envirocarellc.com/#organization' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: offices.length,
      itemListElement: OFFICE_ORDER.map((id, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': OFFICE_SCHEMA_IDS[id] },
      })),
    },
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%)',
      padding: '80px 24px',
      fontFamily: "var(--font-sans)",
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Find Your Office', path: '/find-office' }]) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#0A7935',
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12,
        }}>
          🌻 Four Alabama Offices · Family-Owned Since 1958
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
          EnviroCare serves Alabama from four locations. Enter your zip code below and
          we&apos;ll route you to the office nearest you — a real human, not a call center.
        </p>
      </div>
      <ZipLookup variant="card" />

      <section aria-labelledby="office-map-heading" style={{ maxWidth: 1100, margin: '64px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 id="office-map-heading" style={{
            fontFamily: "var(--font-serif)", fontSize: 'clamp(28px, 4vw, 40px)',
            color: '#0E1A0F', margin: '0 0 10px',
          }}>
            Four Local Offices Across Alabama
          </h2>
          <p style={{ fontSize: 16, color: '#5A6660', maxWidth: 680, margin: '0 auto', lineHeight: 1.55 }}>
            Use the map to compare locations, or choose an office below for local service details,
            directions, and the correct direct phone number.
          </p>
        </div>
        <div style={{
          overflow: 'hidden', borderRadius: 16, border: '1px solid #D9E5DC',
          background: '#fff', boxShadow: '0 8px 28px rgba(14, 26, 15, 0.08)',
        }}>
          <iframe
            src="https://storage.googleapis.com/maps-solutions-obw98gniv9/locator-plus/5g4e/locator-plus.html"
            title="Map of EnviroCare's four Alabama pest control offices"
            width="100%"
            height="520"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: '64px auto 0', textAlign: 'center' }}>
        <p style={{ fontSize: 15, color: '#5A6660', marginBottom: 24 }}>
          Or call any office directly:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          {offices.map((office) => (
            <article key={office.id} style={officeCardStyle}>
              <strong style={officeLabel}>{office.label.toUpperCase()}</strong>
              <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a href={office.phoneHref} style={officePhone}>{office.phone}</a>
                <span style={officeAddr}>
                  {office.address.street}, {office.address.city}, {office.address.region} {office.address.postalCode}
                </span>
              </address>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
                <Link href={office.page} style={officeLink}>Local services</Link>
                {office.googleBusinessProfile ? (
                  <a href={office.googleBusinessProfile} target="_blank" rel="noreferrer" style={officeLink}>
                    Directions
                  </a>
                ) : null}
              </div>
            </article>
          ))}
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
  color: '#0E1A0F',
  textDecoration: 'none',
};
const officeAddr = {
  fontSize: 13,
  color: '#5A6660',
};
const officeLink = {
  fontSize: 13,
  fontWeight: 700,
  color: '#0A7935',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
};
