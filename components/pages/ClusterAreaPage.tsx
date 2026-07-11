// components/pages/ClusterAreaPage.tsx — shared template for the four
// Birmingham-metro geographic cluster pages (Over the Mountain, South /
// East / North Birmingham). Server component: unique cluster copy comes in
// via config, member cities link to their existing flat city pages, and the
// JSON-LD is honest service-area markup (Service + FAQPage + BreadcrumbList,
// areaServed only — the one real office NAP lives on the office pages).

import Footer from '@/components/shared/Footer';
import { GREEN, GOLD, INK, CREAM, displayFont, bodyFont } from '@/lib/brand';

export type ClusterCity = {
  name: string;
  href: string;
  hook: string; // one-line local angle
};

export type ClusterOffice = {
  name: string;        // e.g. "Alabaster" — used in the disclaimer
  phone: string;       // formatted
  tel: string;         // digits
  street: string;
  cityStateZip: string; // e.g. "Alabaster, AL 35007"
};

export type ClusterConfig = {
  slug: string;
  name: string;               // e.g. "Over the Mountain"
  h1: string;
  intro: string[];            // paragraphs
  pestAngle: string;          // what drives pest pressure across this cluster
  cities: ClusterCity[];
  faqs: { q: string; a: string }[];
  nearbyClusters: { name: string; href: string }[];
  office?: ClusterOffice;     // defaults to the Alabaster metro hub
};

const BASE = 'https://www.envirocarellc.com';

const DEFAULT_OFFICE: ClusterOffice = {
  name: 'Alabaster',
  phone: '(205) 940-6360',
  tel: '2059406360',
  street: '2025 Butler Rd',
  cityStateZip: 'Alabaster, AL 35007',
};

export default function ClusterAreaPage({ cfg }: { cfg: ClusterConfig }) {
  const office = cfg.office ?? DEFAULT_OFFICE;
  const [officeCity, officeStateZip] = [office.cityStateZip.split(',')[0], office.cityStateZip.split(',').slice(1).join(',').trim()];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: 'Pest Control',
        name: `Pest Control — ${cfg.name}`,
        description: cfg.pestAngle,
        provider: {
          '@type': 'LocalBusiness',
          name: 'EnviroCare Pest & Termite Services',
          address: { '@type': 'PostalAddress', streetAddress: office.street, addressLocality: officeCity, addressRegion: 'AL', postalCode: officeStateZip.split(' ').pop(), addressCountry: 'US' },
          telephone: `+1-${office.tel.slice(0,3)}-${office.tel.slice(3,6)}-${office.tel.slice(6)}`,
        },
        areaServed: cfg.cities.map(c => ({ '@type': 'City', name: `${c.name}, AL` })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: cfg.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${BASE}/service-areas` },
          { '@type': 'ListItem', position: 3, name: cfg.name, item: `${BASE}/${cfg.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: CREAM, fontFamily: bodyFont, color: INK }}>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px clamp(20px,5vw,64px) 72px' }}>
          <nav style={{ fontSize: 13.5, color: '#5A6660', marginBottom: 18 }}>
            <a href="/" style={{ color: '#5A6660', textDecoration: 'none' }}>Home</a>
            {' › '}
            <a href="/service-areas" style={{ color: '#5A6660', textDecoration: 'none' }}>Service Areas</a>
            {' › '}
            <span>{cfg.name}</span>
          </nav>

          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(30px,5vw,44px)', color: INK, margin: 0, lineHeight: 1.15 }}>
            {cfg.h1}
          </h1>
          {cfg.intro.map((p, i) => (
            <p key={i} style={{ fontSize: 17.5, lineHeight: 1.75, maxWidth: 780, marginTop: i === 0 ? 16 : 10 }}>{p}</p>
          ))}

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 22 }}>
            <a href={`tel:${office.tel}`} style={{ background: GOLD, color: INK, fontWeight: 700, textDecoration: 'none', padding: '12px 22px', borderRadius: 50, fontSize: 15.5 }}>
              Call {office.phone}
            </a>
            <a href="/quote" style={{ border: `2px solid ${GREEN}`, color: GREEN, fontWeight: 600, textDecoration: 'none', padding: '11px 20px', borderRadius: 50, fontSize: 15.5 }}>
              See Plans →
            </a>
          </div>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 6px' }}>
            Communities We Serve in {cfg.name}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 760, margin: '0 0 20px', color: '#4a5750' }}>{cfg.pestAngle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
            {cfg.cities.map(c => (
              <a key={c.href} href={c.href} style={{ display: 'block', background: '#fff', border: '1px solid rgba(14,26,15,.08)', borderRadius: 14, padding: '18px 20px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(14,26,15,.06)' }}>
                <div style={{ fontFamily: displayFont, fontSize: 19, color: INK, marginBottom: 6 }}>{c.name} →</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: '#5A6660' }}>{c.hook}</div>
              </a>
            ))}
          </div>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            {cfg.name} Pest Control Questions
          </h2>
          <div style={{ maxWidth: 820 }}>
            {cfg.faqs.map(f => (
              <details key={f.q} style={{ background: '#fff', border: '1px solid rgba(14,26,15,.10)', borderRadius: 10, marginBottom: 12, padding: '4px 0' }}>
                <summary style={{ padding: '14px 18px', cursor: 'pointer', fontWeight: 600, color: '#07642B', fontSize: 15.5 }}>{f.q}</summary>
                <p style={{ padding: '0 18px 16px', margin: 0, fontSize: 15, lineHeight: 1.65, color: '#4b5563' }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 40, fontSize: 15, color: '#5A6660' }}>
            More EnviroCare service areas:{' '}
            {cfg.nearbyClusters.map((n, i) => (
              <span key={n.href}>
                {i > 0 && ' · '}
                <a href={n.href} style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>{n.name}</a>
              </span>
            ))}
            {' · '}
            <a href="/service-areas" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>All Service Areas</a>
          </div>

          <p style={{ marginTop: 26, fontSize: 14, color: '#7a887e', maxWidth: 780 }}>
            EnviroCare serves {cfg.name} as a service area — routes run daily from our staffed
            office at {office.street}, {office.cityStateZip}. Family-owned since 1958.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
