// app/data-center-pest-control/page.tsx — Data center & critical-facility pest control.
//
// Added 2026-10-27. Phillip confirmed on 2026-09-30 that EnviroCare services data
// centers and wants the vertical, positioned on low-aerosol IPM (the program text
// already on /services/commercial since PR #220). This page is the dedicated
// landing page for "data center pest control" queries and doubles as the link a
// facility or vendor manager gets in a bid response.
//
// Copy rules applied (AGENTS.md canon): no safety claims, no availability or
// response-time promises, no named clients, certifications or SLAs, no competitor
// names, no prices (commercial is quoted after a walkthrough). Every phone and
// address renders from data/offices.ts so the NAP cannot drift.

import type { Metadata } from 'next';
import { GREEN, GOLD, DEEP, CREAM, INK, displayFont, bodyFont } from '@/lib/brand';
import { OFFICES } from '@/data/offices';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

const PATH = '/data-center-pest-control';
const URL = `https://www.envirocarellc.com${PATH}`;
const TITLE = 'Data Center Pest Control in Alabama | EnviroCare';
const DESC =
  'Site-specific pest management for Alabama data centers: inspection, entry-point recommendations, monitoring and reporting agreed for your facility.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { url: URL, title: TITLE, description: DESC, images: ['/og-image.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og-image.png'] },
};

/* ── Content ─────────────────────────────────────────────────────────────── */

const RISKS = [
  {
    title: 'Rodent entry and concealed routes',
    body: 'Mice can enter through small gaps or arrive with deliveries, and their gnawing can damage wiring. Inspect accessible doors, service penetrations and evidence of travel. Facility personnel should assess any suspected equipment damage.',
  },
  {
    title: 'Deliveries and storage',
    body: 'Receiving areas and stored packaging deserve attention during inspections. Record pest evidence, review how goods enter controlled areas and agree on a process for handling suspect materials.',
  },
  {
    title: 'Food, moisture and shelter',
    body: 'Food waste, leaks and clutter can support pest activity. Include staff spaces and accessible moisture sources in the assessment, and assign repairs or housekeeping changes to the appropriate facility team.',
  },
];

type Zone = { zone: string; risk: string; we: string };
const ZONES: Zone[] = [
  {
    zone: 'Perimeter, fence line & drainage',
    risk: 'Accessible gaps, shelter and moisture conditions near the building.',
    we: 'Inspection areas, any proposed exterior devices, location records and responsibility for drainage or vegetation work.',
  },
  {
    zone: 'Generator yard & fuel areas',
    risk: 'Openings around enclosures and service routes that require an authorized inspection.',
    we: 'Access permissions, accessible inspection points and the trade responsible for any equipment or penetration repair.',
  },
  {
    zone: 'Loading dock & receiving',
    risk: 'Open doors, damaged seals and incoming materials that may carry pests.',
    we: 'Door and seal observations, receiving practices and any approved monitoring locations.',
  },
  {
    zone: 'Rooftop mechanical & cooling',
    risk: 'Moisture, debris and openings that may require roof or equipment access.',
    we: 'Whether a rooftop inspection is included, who authorizes access and which findings need a separate qualified contractor.',
  },
  {
    zone: 'Electrical, UPS & battery rooms',
    risk: 'Suspected entry routes near systems that a pest inspection must not disturb.',
    we: 'Inspection limits, approved monitoring locations and prohibited products or methods. Equipment work remains with authorized facility personnel.',
  },
  {
    zone: 'Data halls, raised floor & cable pathways',
    risk: 'Concealed or restricted spaces where an observation may need escalation.',
    we: 'Escorts, accessible areas, device permissions and the notification process for evidence inside a critical zone.',
  },
  {
    zone: 'Offices, break rooms & SOC',
    risk: 'Food, storage and water sources that can support indoor activity.',
    we: 'Inspection and housekeeping responsibilities, with any treatment selected for the identified pest and approved location.',
  },
];

const DEFAULT_LIMITS = [
  'Products and methods permitted or prohibited in each zone.',
  'Approved monitoring and device locations, including restrictions under raised floors.',
  'Access limits around electrical equipment, cabling and other building systems.',
  'The process for reviewing a proposed product, method or location change.',
];

const PHASES = [
  {
    tag: 'Phase 1',
    title: 'Construction & build-out',
    body: 'Discuss temporary openings, deliveries and project sequencing before setting the scope. Confirm which inspections, controls and termite-prevention work are included, and which repairs belong to the general contractor or another trade.',
  },
  {
    tag: 'Phase 2',
    title: 'Commissioning & turnover',
    body: 'Agree on the records operations needs at handover: accessible inspection findings, monitoring locations, unresolved repairs and the person responsible for each next step.',
  },
  {
    tag: 'Phase 3',
    title: 'Ongoing operations',
    body: 'Set visit frequency, reporting and review arrangements for the site. Revisit the plan when activity, access, construction or the use of a building changes.',
  },
];

const PACKET = [
  'Current license and insurance documents relevant to the proposed work',
  'Labels and Safety Data Sheets for proposed pesticide products',
  'Written scope, covered pests, exclusions and action thresholds',
  'Any agreed device map and inspection-log format',
  'Visit procedures and access requirements for facility review',
  'Report format, distribution and handling of sensitive site information',
  'Responsibilities for repairs, follow-up and escalation',
];

const ACCESS = [
  { k: 'Access and visit windows', v: 'Share badging, escort and visitor requirements during the site review. Confirm feasible visit windows and responsibilities in the agreement.' },
  { k: 'Background checks & site training', v: 'Identify any required checks or training before scheduling. Confirm the process, access arrangements and related terms before service begins.' },
  { k: 'Change control', v: 'Agree on how proposed methods, products and device locations are reviewed. Document who can authorize changes and how the updated plan is shared.' },
  { k: 'Reporting requirements', v: 'Review a sample format against your vendor-management needs. Agree on the fields, frequency and recipients rather than assuming a particular audit standard.' },
];

const PRICE_DRIVERS = [
  'Footprint, perimeter length and number of buildings',
  'Inspection areas and any proposed monitoring devices',
  'Visit frequency and the zones included in each visit',
  'Escort, badging and scheduled-window requirements',
  'Reporting, follow-up and other agreed deliverables',
];

const AREAS: { name: string; href?: string }[] = [
  { name: 'Huntsville', href: '/huntsville' },
  { name: 'Madison', href: '/madison' },
  { name: 'Decatur', href: '/decatur' },
  { name: 'Athens', href: '/athens' },
  { name: 'Meridianville', href: '/meridianville' },
  { name: 'Birmingham', href: '/birmingham' },
  { name: 'Bessemer', href: '/bessemer' },
  { name: 'McCalla', href: '/mccalla' },
  { name: 'Hoover', href: '/hoover' },
  { name: 'Alabaster', href: '/alabaster' },
  { name: 'Pelham', href: '/pelham' },
  { name: 'Calera', href: '/calera' },
  { name: 'Sylacauga', href: '/sylacauga' },
  { name: 'Alexander City', href: '/alexander-city' },
];

const FAQS = [
  {
    "q": "Can a data center pest plan limit indoor pesticide use?",
    "a": "Inspection, entry-point management and monitoring can be considered before pesticide use. Any proposed treatment must fit the identified pest, product label, equipment restrictions and facility approval. Agree on permitted and prohibited methods for each zone before service begins."
  },
  {
    "q": "How are rodent-control methods selected for critical rooms?",
    "a": "The assessment should identify the evidence, access limitations and appropriate monitoring or control options. Device locations and inspection arrangements require facility agreement. Do not place bait or move equipment to investigate without the required authorization."
  },
  {
    "q": "What paperwork should we request for vendor onboarding?",
    "a": "Request current license and insurance documents, relevant product labels and Safety Data Sheets, the proposed scope, and a sample report. Identify any additional maps, visit procedures or reporting your site requires, and confirm the deliverables in the agreement."
  },
  {
    "q": "How often should a data center be serviced?",
    "a": "Frequency follows the site assessment and agreed scope. Pest evidence, receiving activity, access, construction and monitoring needs can affect the schedule. There is no single monthly or quarterly interval that establishes an appropriate program for every data center."
  },
  {
    "q": "What if our site requires escorts or background checks?",
    "a": "Share those requirements during the site review. Confirm access arrangements, required checks or training, scheduling and any related costs before service is agreed."
  },
  {
    "q": "Can pest planning begin during construction?",
    "a": "Discuss the project phase, temporary openings, deliveries and handover requirements when requesting a proposal. Confirm which construction-stage work can be included and how it is coordinated with the contractor. A construction plan does not automatically include termite treatment or building repairs."
  },
  {
    "q": "How is data center pest control priced?",
    "a": "The proposal is specific to the site. Inspection scope, buildings, devices, visit frequency, access and reporting requirements affect the work. Request the scope, exclusions, schedule and price in writing before authorizing service."
  },
  {
    "q": "Which Alabama office should we contact?",
    "a": "Contact the office serving your site: Huntsville for North Alabama, Birmingham and Alabaster for their metro and county service areas, or Alexander City for Lake Martin and nearby communities. Confirm the property location and proposed commercial scope with the office."
  }
];

/* ── Page ────────────────────────────────────────────────────────────────── */

const ss = { fontFamily: displayFont } as const;
const pad = 'clamp(16px,5vw,64px)';
const card = { border: '1px solid rgba(14,142,64,0.18)', borderRadius: 14, background: '#fff' } as const;

export default function DataCenterPestControlPage() {
  const huntsville = OFFICES.huntsville;
  const birmingham = OFFICES['birmingham-downtown'];
  const alabaster = OFFICES.birmingham; // NAMING TRAP: id 'birmingham' is the Alabaster office
  const lakeMartin = OFFICES['lake-martin'];
  const offices = [
    { o: huntsville, serves: 'Huntsville, Madison, Decatur, Athens & North Alabama' },
    { o: birmingham, serves: 'Birmingham, Bessemer, McCalla, Hoover & Jefferson County' },
    { o: alabaster, serves: 'Alabaster, Pelham, Calera & Shelby County — company main line' },
    { o: lakeMartin, serves: 'Alexander City, Sylacauga & the Lake Martin area' },
  ];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: 'Data Center Pest Control',
      serviceType: 'Data center and critical facility pest management',
      description: DESC,
      url: URL,
      provider: { '@id': 'https://www.envirocarellc.com/#organization' },
      areaServed: [
        { '@type': 'State', name: 'Alabama' },
        ...AREAS.map((a) => ({ '@type': 'City', name: `${a.name}, AL` })),
      ],
      audience: { '@type': 'BusinessAudience', name: 'Data center and critical facility operators, facility managers and vendor managers' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: bodyFont }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...breadcrumbList([
              { name: 'Services', path: '/services' },
              { name: 'Commercial Pest Control', path: '/services/commercial' },
              { name: 'Data Center Pest Control', path: PATH },
            ]),
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${INK} 0%, #0B2A16 55%, ${DEEP} 100%)`, color: '#fff', padding: `64px ${pad} 48px`, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>
            <a href="/services" style={{ color: 'inherit' }}>Services</a> / <a href="/services/commercial" style={{ color: 'inherit' }}>Commercial</a> / <span style={{ color: 'rgba(255,255,255,0.8)' }}>Data Centers</span>
          </nav>
          <div style={{ display: 'inline-block', border: `1px solid ${GOLD}55`, background: `${GOLD}22`, borderRadius: 6, padding: '5px 14px', marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Critical Facilities · Alabama</span>
          </div>
          <h1 style={{ ...ss, fontSize: 'clamp(2rem,4.6vw,3.1rem)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 18px' }}>
            Data Center Pest Control <em style={{ color: GOLD, fontStyle: 'italic' }}>planned around your facility.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', margin: '0 0 14px', maxWidth: 700 }}>
            Discuss pest prevention for your Alabama data center, colocation site or technology facility. Start with an inspection scope, entry-point recommendations and monitoring needs, then agree on methods, access and reporting for the individual site.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: 700 }}>
            EnviroCare is a fourth-generation, family-owned Alabama company — the Wedgworth family started in 1958 in Alexander City — with offices in Huntsville, Birmingham, Alabaster and Alexander City.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26 }}>
            <a href="/quote" style={{ background: GOLD, color: INK, padding: '14px 26px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Request a Site Walkthrough →</a>
            <a href={huntsville.phoneHref} style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 22px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>North AL {huntsville.phone}</a>
            <a href={alabaster.phoneHref} style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 22px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>Main line {alabaster.phone}</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10, marginTop: 34 }}>
            {['Site-specific IPM planning', 'Agreed reporting', 'Access coordination', 'Project-phase review'].map((t) => (
              <div key={t} style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
                <span style={{ color: GOLD, marginRight: 8 }}>●</span>{t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISKS */}
      <section style={{ padding: `56px ${pad}`, background: '#fff' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 10px' }}>Where pest risks need attention</h2>
          <p style={{ fontSize: 15.5, color: '#4b5563', lineHeight: 1.75, margin: '0 0 26px', maxWidth: 720 }}>
            Inspect the conditions and evidence at the site. Openings, deliveries, storage and moisture each deserve attention, while any finding near critical equipment needs the appropriate facility response.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
            {RISKS.map((r) => (
              <div key={r.title} style={{ ...card, background: CREAM, padding: '22px 20px' }}>
                <h3 style={{ ...ss, fontSize: 18, color: DEEP, margin: '0 0 8px', fontWeight: 700 }}>{r.title}</h3>
                <p style={{ fontSize: 14.5, color: '#4b5563', lineHeight: 1.65, margin: 0 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: `0 ${pad} 24px`, fontSize: 13.5, lineHeight: 1.7, color: '#4b5563' }}>
        <p>Planning references: <a href="https://www.epa.gov/sites/default/files/2015-11/documents/ipm_in_buildings.pdf">EPA guidance on IPM in buildings</a> supports coordinated prevention and records. <a href="https://ipm.ucanr.edu/home-and-landscape/house-mouse/">UC IPM guidance on house mice</a> describes entry routes and gnawing damage. Site-specific methods and responsibilities still belong in the facility agreement.</p>
      </div>

      {/* ZONES */}
      <section style={{ padding: `56px ${pad}`, background: CREAM }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 10px' }}>The program, zone by zone</h2>
          <p style={{ fontSize: 15.5, color: '#4b5563', lineHeight: 1.75, margin: '0 0 26px', maxWidth: 720 }}>
            Use the zones below as a walkthrough agenda. The written proposal should identify included locations, access limits, methods and responsibilities. Repairs, roof access and work on building systems require separate authorization and the appropriate trade.
          </p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
            {ZONES.map((z, i) => (
              <li key={z.zone} style={{ ...card, padding: '18px 20px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 16px', alignItems: 'start' }}>
                <span style={{ ...ss, gridRow: 'span 3', fontSize: 22, fontWeight: 700, color: i < 4 ? GREEN : DEEP, minWidth: 34 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ ...ss, fontSize: 17.5, color: INK, margin: 0, fontWeight: 700 }}>{z.zone}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#374151' }}>Risk:</strong> {z.risk}</p>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}><strong style={{ color: DEEP }}>What to agree:</strong> {z.we}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DEFAULT LIMITS */}
      <section style={{ padding: `56px ${pad}`, background: INK, color: '#fff' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>Methods and access</div>
            <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, margin: '0 0 12px', lineHeight: 1.2 }}>Write the limits into the plan</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
              Review the restrictions that apply to your equipment and operating procedures. Agree on them with the provider before work begins; facility approval does not replace product-label requirements.
            </p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            {DEFAULT_LIMITS.map((l) => (
              <li key={l} style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '13px 16px', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.88)' }}>
                <span style={{ color: GOLD, fontWeight: 700, marginRight: 8 }}>✕</span>{l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PHASES */}
      <section style={{ padding: `56px ${pad}`, background: '#fff' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 26px' }}>Plan for each project phase</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
            {PHASES.map((p) => (
              <div key={p.title} style={{ ...card, background: CREAM, padding: '22px 20px', borderTop: `4px solid ${GREEN}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GREEN, textTransform: 'uppercase', marginBottom: 6 }}>{p.tag}</div>
                <h3 style={{ ...ss, fontSize: 19, color: INK, margin: '0 0 8px', fontWeight: 700 }}>{p.title}</h3>
                <p style={{ fontSize: 14.5, color: '#4b5563', lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENDOR PACKET + ACCESS */}
      <section style={{ padding: `56px ${pad}`, background: CREAM }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
          <div style={{ ...card, padding: '26px 24px' }}>
            <h2 style={{ ...ss, fontSize: 'clamp(1.35rem,2.4vw,1.7rem)', fontWeight: 600, color: INK, margin: '0 0 8px' }}>Documents to request</h2>
            <p style={{ fontSize: 14.5, color: '#4b5563', lineHeight: 1.7, margin: '0 0 14px' }}>Review required documents and confirm agreed deliverables before service begins.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {PACKET.map((p) => (
                <li key={p} style={{ fontSize: 14.5, color: '#374151', lineHeight: 1.6, padding: '7px 0', borderTop: '1px solid rgba(14,142,64,0.1)' }}>
                  <span style={{ color: GREEN, fontWeight: 700, marginRight: 8 }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ ...ss, fontSize: 'clamp(1.35rem,2.4vw,1.7rem)', fontWeight: 600, color: INK, margin: '4px 0 16px' }}>Access, security & change control</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {ACCESS.map((a) => (
                <div key={a.k} style={{ borderLeft: `3px solid ${GOLD}`, padding: '4px 0 4px 14px' }}>
                  <div style={{ fontWeight: 700, color: DEEP, fontSize: 15, marginBottom: 3 }}>{a.k}</div>
                  <div style={{ fontSize: 14.5, color: '#4b5563', lineHeight: 1.65 }}>{a.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: `56px ${pad}`, background: '#fff' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', ...card, padding: '30px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GREEN, textTransform: 'uppercase', marginBottom: 8 }}>Data Center Program</div>
          <div style={{ ...ss, fontSize: 38, fontWeight: 700, color: INK, lineHeight: 1.1 }}>Quoted per site</div>
          <div style={{ fontSize: 14.5, color: '#5A6660', margin: '8px 0 18px' }}>after a site review — confirm scope, frequency and price before work starts</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', textAlign: 'left' }}>
            {PRICE_DRIVERS.map((b) => (
              <li key={b} style={{ fontSize: 14.5, color: '#374151', padding: '5px 0' }}>• {b}</li>
            ))}
          </ul>
          <a href="/quote" style={{ display: 'inline-block', background: GREEN, color: '#fff', padding: '14px 32px', borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Request a Walkthrough →</a>
        </div>
      </section>

      {/* COVERAGE */}
      <section style={{ padding: `56px ${pad}`, background: CREAM }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 10px' }}>Local offices near Alabama&apos;s data center corridors</h2>
          <p style={{ fontSize: 15.5, color: '#4b5563', lineHeight: 1.75, margin: '0 0 22px', maxWidth: 720 }}>
            Contact the office serving your property to discuss location, access and the proposed commercial scope.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 22 }}>
            {offices.map(({ o, serves }) => (
              <div key={o.id} style={{ ...card, padding: '18px 18px' }}>
                <div style={{ ...ss, fontSize: 17, fontWeight: 700, color: INK }}>{o.name}</div>
                <div style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.55, margin: '4px 0 8px' }}>
                  {o.address.street}, {o.address.city}, AL {o.address.postalCode}
                </div>
                <a href={o.phoneHref} style={{ color: GREEN, fontWeight: 700, fontSize: 15.5, textDecoration: 'none' }}>{o.phone}</a>
                <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5, marginTop: 8 }}>{serves}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AREAS.map((a) => (
              <a key={a.name} href={a.href} style={{ border: '1px solid rgba(14,142,64,0.25)', borderRadius: 999, padding: '8px 14px', color: DEEP, fontSize: 14, textDecoration: 'none', background: '#fff' }}>{a.name}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting buyer guides */}
      <section style={{ padding: `40px ${pad}`, background: CREAM }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK }}>Planning a data center pest-control program?</h2>
          <p style={{ color: '#4b5563', lineHeight: 1.7 }}>Use these guides to prepare your walkthrough, compare proposals and assign follow-up work.</p>
          <ul style={{ lineHeight: 2 }}>
            <li><a href="/blog/data-center-ipm-plan" style={{ color: DEEP }}>What should a data center IPM plan include?</a></li>
            <li><a href="/blog/data-center-rodent-entry-points" style={{ color: DEEP }}>Where do rodents enter a data center?</a></li>
            <li><a href="/blog/data-center-pest-control-vendor-checklist" style={{ color: DEEP }}>How do you evaluate a pest-control vendor?</a></li>
            <li><a href="/blog/data-center-pest-control-construction-handover" style={{ color: DEEP }}>Data Center Pest Control: Construction Handover</a></li>
            <li><a href="/blog/data-center-pest-control-service-report" style={{ color: DEEP }}>What Should a Data Center Pest Report Show?</a></li>
            <li><a href="/blog/data-center-pest-activity-response" style={{ color: DEEP }}>Pest Activity in a Data Center: What Happens Next?</a></li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: `56px ${pad}`, background: '#fff' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 22px' }}>Data center pest control questions</h2>
          {FAQS.map((f) => (
            <details key={f.q} style={{ border: '1px solid rgba(14,142,64,0.15)', borderRadius: 10, marginBottom: 10, background: CREAM, padding: '0 18px' }}>
              <summary style={{ padding: '14px 0', cursor: 'pointer', fontWeight: 600, color: DEEP, fontSize: 15.5 }}>{f.q}</summary>
              <p style={{ color: '#4b5563', fontSize: 14.5, lineHeight: 1.7, padding: '0 0 16px', margin: 0 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CROSS LINKS */}
      <section style={{ padding: `40px ${pad} 64px`, background: CREAM }}>
        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, margin: '0 0 14px' }}>
            For other types of property, explore EnviroCare&apos;s commercial service and discuss the inspection, methods and reporting appropriate to the site.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'Commercial Pest Control', href: '/services/commercial' },
              { name: 'Commercial Pest Control — Madison', href: '/madison-commercial-pest-control' },
              { name: 'Termite Control', href: '/services/termite-control' },
              { name: 'Builder Programs', href: '/builders' },
              { name: 'Find Your Office', href: '/find-office' },
            ].map((r) => (
              <a key={r.href} href={r.href} style={{ border: '1px solid rgba(14,142,64,0.3)', borderRadius: 999, padding: '9px 18px', color: DEEP, fontWeight: 600, fontSize: 14, textDecoration: 'none', background: '#fff' }}>{r.name} →</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
