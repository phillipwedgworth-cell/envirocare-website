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
  'Low-aerosol pest control for Alabama data centers: zone-by-zone IPM, rodent exclusion, station-level logs, vendor paperwork. Huntsville & Birmingham.';

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
    title: 'Rodents follow the cable',
    body: 'Mice and rats travel along conduit, cable tray and pipe runs, and they gnaw constantly to wear down their teeth. Insulation, fiber jackets and low-voltage cabling are within reach of every pathway they use. The cost is not the rodent — it is the outage ticket and the trace-down that follows.',
  },
  {
    title: 'Insects get into equipment',
    body: 'Ants, roaches and small flies collect in warm electrical gear, cabinets, controls and condensate lines. Accumulated insects foul contacts and sensors, block airflow and can trip alarms. Most never come through a door — they ride in on pallets and packaging at the dock.',
  },
  {
    title: 'Birds and the roofline',
    body: 'Rooftop condensers, louvers, generator enclosures and cooling equipment give birds shelter and nesting ledges. Nests restrict airflow, droppings foul equipment and walkways, and an open louver is a path into the building for everything else.',
  },
];

type Zone = { zone: string; risk: string; we: string };
const ZONES: Zone[] = [
  {
    zone: 'Perimeter, fence line & stormwater',
    risk: 'Rodent burrows, harborage in landscaping, retention ponds and drainage that draw pests toward the building.',
    we: 'Tamper-resistant exterior rodent stations on a numbered map, vegetation and harborage recommendations, burrow monitoring along the fence and drainage.',
  },
  {
    zone: 'Generator yard & fuel areas',
    risk: 'Warm enclosures, cable entries and quiet corners that see little foot traffic between tests.',
    we: 'Station coverage around enclosures, inspection of conduit and cable entries, exclusion recommendations for gaps found at each visit.',
  },
  {
    zone: 'Loading dock & receiving',
    risk: 'The most common entry point: open doors, worn seals and pests riding in on pallets, crates and cardboard.',
    we: 'Door-sweep and seal checks, interior mechanical traps and monitors at the dock line, receiving-area inspection and packaging-handling recommendations.',
  },
  {
    zone: 'Rooftop mechanical & cooling',
    risk: 'Bird nesting on condensers and louvers, insects at condensate and water sources, roof penetrations.',
    we: 'Rooftop inspection on agreed visits, bird-activity reporting, exclusion recommendations for louvers, penetrations and ledges.',
  },
  {
    zone: 'Electrical, UPS & battery rooms',
    risk: 'Rodents following conduit in from outside, insects collecting in warm gear.',
    we: 'Inspection and approved-location mechanical devices only. No liquid or aerosol applications in these rooms.',
  },
  {
    zone: 'Data halls, raised floor & cable pathways',
    risk: 'Hidden travel routes under floors and above trays; the area where any activity matters most.',
    we: 'Monitoring and mechanical devices in locations your facility team approves, inspection on escorted visits, and any sign of activity called out at the top of the visit report.',
  },
  {
    zone: 'Offices, break rooms & SOC',
    risk: 'Food and drink are where interior insect and rodent pressure usually starts.',
    we: 'Targeted gel-bait placement in cracks and crevices where monitoring shows activity, sanitation notes for the facility team.',
  },
];

const DEFAULT_LIMITS = [
  'No aerosol, fogging or space-spray treatments inside the building.',
  'No broadcast liquid applications in data halls, electrical, UPS or battery rooms.',
  'No rodent bait placed in data halls or under raised floors — mechanical devices there, bait stations outside.',
  'No product used that is not on the list your facility team approved in writing.',
];

const PHASES = [
  {
    tag: 'Phase 1',
    title: 'Construction & build-out',
    body: 'New sites inherit the pest population of the land they are built on, and an open shell with cardboard everywhere is peak exposure. We coordinate with the general contractor on jobsite rodent control and a perimeter program during the build, pre-construction termite soil treatment on builder projects scheduled around the pour sequence, and an exclusion punch list for penetrations, louvers and door seals before turnover.',
  },
  {
    tag: 'Phase 2',
    title: 'Commissioning & turnover',
    body: 'A baseline inspection of the finished building, a numbered device map, and the written IPM plan your operations team signs off on — so day one of operations starts with documentation, not a blank file.',
  },
  {
    tag: 'Phase 3',
    title: 'Ongoing operations',
    body: 'Scheduled service on the frequency your site needs (monthly is common for critical facilities), a report after every visit, and a periodic review of trends, conducive conditions and open exclusion items with your facility manager.',
  },
];

const PACKET = [
  'Certificate of insurance for your vendor file',
  'Alabama structural pest control business license (Dept. of Agriculture & Industries)',
  'Current labels and Safety Data Sheets for every product proposed — nothing outside that list is used',
  'Written IPM plan: pests of concern, action thresholds, approved methods and approved interior locations',
  'Numbered device map and station-level service logs',
  'A written description of each visit type for your method-of-procedure or change-control process',
  'A service report after every visit: what was inspected, found, applied and recommended',
];

const ACCESS = [
  { k: 'Your rules, your windows', v: 'We work inside your badging, escort and visitor rules, and schedule visits for the windows your operations team sets.' },
  { k: 'Background checks & site training', v: 'If your site requires them, tell us at the walkthrough and they become part of the program before the first visit.' },
  { k: 'Change control', v: 'Methods and approved interior locations are agreed in writing first. A change of product or location goes back through your approval, not around it.' },
  { k: 'Documentation that survives an audit', v: 'Station-by-station logs and visit reports you can hand an auditor, a tenant or your corporate vendor-management team.' },
];

const PRICE_DRIVERS = [
  'Footprint, perimeter length and number of buildings',
  'Device count from the walkthrough and the numbered map',
  'Visit frequency and how many zones each visit covers',
  'Escort, badging and scheduled-window time on site',
  'Reporting and documentation your contract requires',
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
    q: 'Can you service a data center without spraying inside?',
    a: 'Yes, and that is the default. Inside the building the program runs on exclusion, inspection, monitoring and mechanical devices, with targeted gel bait in cracks and crevices only where monitoring shows activity and only in areas your facility team has approved. There is no aerosol, fogging or broadcast liquid treatment indoors unless your team specifically approves it in writing.',
  },
  {
    q: 'Why not put rodent bait under the raised floor?',
    a: 'A rodent that takes bait can die where nobody can reach it — under a floor tile, above a tray or inside a wall — and that becomes an odor and insect problem of its own. Inside critical spaces we use mechanical devices that are checked and logged on every visit. Bait stations stay outside, on the perimeter, where they belong.',
  },
  {
    q: 'What paperwork do you provide for vendor onboarding?',
    a: 'A certificate of insurance, our Alabama structural pest control business license, labels and Safety Data Sheets for every product proposed, a written IPM plan with action thresholds, a numbered device map, and a written description of each visit type for your method-of-procedure or change-control process. After service starts, you get a report after every visit.',
  },
  {
    q: 'How often should a data center be serviced?',
    a: 'Most critical facilities run monthly, with exterior perimeter stations checked on every visit and interior devices checked on the schedule your site sets. The walkthrough sets the real frequency: footprint, surrounding land use, dock traffic and what the first inspection finds all move it.',
  },
  {
    q: 'Do you work with sites that require escorts or background checks?',
    a: 'Yes. Technicians work inside your badging, escort and visitor rules and on the windows your operations team schedules. If your site requires background checks or site-specific training, tell us at the walkthrough and it is built into the program before the first visit.',
  },
  {
    q: 'Can you start during construction?',
    a: 'Yes, and it is the cheapest time to start. Jobsite rodent control and a perimeter program during the build, pre-construction termite soil treatment on builder projects scheduled around the pour sequence, and an exclusion punch list before turnover all cost less than correcting a building that opened with pests already inside.',
  },
  {
    q: 'How is data center pest control priced?',
    a: 'Per site, after a free walkthrough. Footprint, perimeter length, device count, visit frequency, escort and scheduled-window time, and the reporting your contract requires all go into the number, and you get scope, frequency and price in writing before work starts.',
  },
  {
    q: 'What areas of Alabama do you cover?',
    a: 'North Alabama from the Huntsville office — Huntsville, Madison, Decatur, Athens and the surrounding area — and the Birmingham metro from the Birmingham and Alabaster offices, including Bessemer, McCalla, Hoover and Shelby County, plus the Lake Martin area from Alexander City. Call the office nearest the site.',
  },
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Data center pest management program',
        itemListElement: PHASES.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p.title } })),
      },
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
            Data Center Pest Control <em style={{ color: GOLD, fontStyle: 'italic' }}>built around uptime, not a spray schedule.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', margin: '0 0 14px', maxWidth: 700 }}>
            A low-aerosol Integrated Pest Management program for data centers, colocation sites and technology facilities across Alabama — exclusion and monitoring on the outside, mechanical devices and inspection on the inside, and a log for every station your auditor asks about.
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
            {['Low-aerosol IPM', 'Station-level logs', 'Works inside your access rules', 'Construction to operations'].map((t) => (
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
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 10px' }}>Why pests are an uptime problem</h2>
          <p style={{ fontSize: 15.5, color: '#4b5563', lineHeight: 1.75, margin: '0 0 26px', maxWidth: 720 }}>
            A data center has no food on the floor and nobody leaves the doors open — and it still has pests. The infrastructure that keeps it running gives them warmth, water and protected travel routes, and the round-the-clock flow of deliveries and contractors gives them a way in.
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

      {/* ZONES */}
      <section style={{ padding: `56px ${pad}`, background: CREAM }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 10px' }}>The program, zone by zone</h2>
          <p style={{ fontSize: 15.5, color: '#4b5563', lineHeight: 1.75, margin: '0 0 26px', maxWidth: 720 }}>
            Pest pressure starts outside and works in. The program is built the same way: the heaviest work happens at the perimeter and the dock, so the data halls see as little of it as possible.
          </p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
            {ZONES.map((z, i) => (
              <li key={z.zone} style={{ ...card, padding: '18px 20px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 16px', alignItems: 'start' }}>
                <span style={{ ...ss, gridRow: 'span 3', fontSize: 22, fontWeight: 700, color: i < 4 ? GREEN : DEEP, minWidth: 34 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ ...ss, fontSize: 17.5, color: INK, margin: 0, fontWeight: 700 }}>{z.zone}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}><strong style={{ color: '#374151' }}>Risk:</strong> {z.risk}</p>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}><strong style={{ color: DEEP }}>What we do:</strong> {z.we}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DEFAULT LIMITS */}
      <section style={{ padding: `56px ${pad}`, background: INK, color: '#fff' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>The default inside your building</div>
            <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, margin: '0 0 12px', lineHeight: 1.2 }}>What we don&apos;t do in critical spaces</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
              These are the starting rules for every data center program. Your facility team can tighten them; nothing on this list changes without their written approval.
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
          <h2 style={{ ...ss, fontSize: 'clamp(1.5rem,2.8vw,2.05rem)', fontWeight: 600, color: INK, margin: '0 0 26px' }}>From the slab to steady state</h2>
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
            <h2 style={{ ...ss, fontSize: 'clamp(1.35rem,2.4vw,1.7rem)', fontWeight: 600, color: INK, margin: '0 0 8px' }}>What your vendor manager gets</h2>
            <p style={{ fontSize: 14.5, color: '#4b5563', lineHeight: 1.7, margin: '0 0 14px' }}>The onboarding file, ready before the first visit.</p>
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
          <div style={{ fontSize: 14.5, color: '#5A6660', margin: '8px 0 18px' }}>after a free walkthrough — scope, frequency and price in writing before work starts</div>
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
            North Alabama&apos;s research parks and industrial parks, Birmingham&apos;s downtown and western corridors, and Shelby County are each served from a staffed local office. Call the one nearest your site.
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
            Part of EnviroCare&apos;s commercial program — the same IPM approach also runs in labs, clean offices, warehouses and any building where routine spraying inside is unwanted.
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
