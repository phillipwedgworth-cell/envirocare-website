// Preserve the existing buyer-guide URL. Use company facts, written service
// terms and office-specific review links without self-awarded rankings.
import { GREEN, GOLD, INK, CREAM, DEEP, displayFont, bodyFont } from '@/lib/brand';
import { OFFICES } from '@/data/offices';
import { PRICING } from '@/data/pricing';

export const metadata = {
  alternates: { canonical: '/best-pest-control-birmingham' },
  title: 'How to Choose a Pest Control Company in Birmingham | EnviroCare',
  description:
    'How to choose the best pest control in Birmingham — licensing, termite coverage, published pricing and where EnviroCare fits. (205) 991-2882.',
  openGraph: {
    title: 'How to Choose a Pest Control Company in Birmingham | EnviroCare',
    description:
      'What to check before hiring a Birmingham pest control company — licensing, termite coverage, published pricing and agreement terms.',
    url: 'https://www.envirocarellc.com/best-pest-control-birmingham',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Choose a Pest Control Company in Birmingham | EnviroCare',
    description:
      'What to check before hiring a Birmingham pest control company — licensing, termite coverage, published pricing and agreement terms.',
    images: ['/og-image.png'],
  },
};

const BASE = 'https://www.envirocarellc.com';
const BIRMINGHAM = OFFICES['birmingham-downtown'];
const INITIAL_SERVICE_COPY = PRICING.initialServicePromo.active
  ? `$${PRICING.plans.pest.startup} initial pest service (${PRICING.initialServicePromo.percentOff}% off the $${PRICING.initialServiceRegular} regular price)`
  : `$${PRICING.initialServiceRegular} initial pest service`;

const CRITERIA: { n: string; h: string; body: string }[] = [
  {
    n: '01',
    h: 'Can you verify licensing for the service you need?',
    body: 'Ask for the company name and license information, then verify them with the Alabama Department of Agriculture and Industries. Confirm that the proposed work addresses your pest problem and property. Keep a copy of the written service proposal.',
  },
  {
    n: '02',
    h: 'Does termite protection include repairs or only re-treatment?',
    body: 'Ask for the written agreement and compare what it covers: additional treatment, qualifying damage repairs, or both. Review inspection requirements, exclusions, coverage limits and renewal obligations. The agreement determines what happens if termite activity or damage is found.',
  },
  {
    n: '03',
    h: 'What is the initial price and the ongoing cost?',
    body: 'Compare the initial service fee, recurring charges and service frequency. Ask whether a quoted monthly amount is a payment plan or a monthly visit, and whether an inspection is needed for a firm price. Compare the same services and agreement period across proposals.',
  },
  {
    n: '04',
    h: 'What are the agreement terms, and what happens if you sell the house?',
    body: 'Ask about the agreement length, payment method, renewal, cancellation and transfer if you move. Request the terms in writing before service starts, including how follow-up visits are handled and any charges that apply.',
  },
  {
    n: '05',
    h: 'Which office serves your home, and how do you request follow-up?',
    body: 'Check the address and direct phone number for the office serving your property. Read recent reviews for that location and ask how to contact the team between scheduled visits. Confirm what the program covers and how service is scheduled.',
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is the highest-rated pest control company in Birmingham, AL?',
    a: 'Ratings change, and each office has its own review history. Check current Google reviews for the location serving your home. Read recent comments about the service you need, then compare licensing, written pricing, coverage and follow-up terms alongside those reviews.',
  },
  {
    q: 'How much does pest control cost in Birmingham, AL?',
    a: `EnviroCare pest control starts at $${PRICING.plans.pest.fromMonthly}/month on ACH or $${PRICING.plans.pest.perVisit} per bi-monthly visit, with ${INITIAL_SERVICE_COPY}. ${PRICING.achTerms} The pest program includes free re-service between scheduled visits. Termite service is priced after inspection; ask for a quote for your property and selected services.`,
  },
  {
    q: 'What should I look for in a Birmingham pest control agreement?',
    a: `Check the service scope, visit frequency, agreement length, renewal, cancellation and any termite damage repair terms. EnviroCare offers payment per visit or monthly ACH billing. ${PRICING.achTerms} Your service terms are confirmed in writing before service starts.`,
  },
  {
    q: 'How often do I need pest control service in Birmingham?',
    a: `EnviroCare's household pest program is bi-monthly: one scheduled visit every other month, or ${PRICING.plans.pest.visitsPerYear} scheduled visits per year. Monthly ACH billing spreads payments across the agreement period; it does not mean monthly pest-control visits. Discuss the appropriate service for your property with the office.`,
  },
  {
    q: 'What precautions do you take around pets and kids?',
    a: 'Tell the office about children, pets and any specific concerns before service. EnviroCare uses EPA-registered products according to their labels. Ask your technician which preparation and re-entry instructions apply to the products and areas being treated, and follow those instructions.',
  },
  {
    q: 'Should I just do it myself?',
    a: 'Start by removing accessible food, water and shelter, correcting leaks and sealing entry points. If pests keep returning, or you suspect termite activity or damage, request an inspection to identify the problem and discuss treatment. Use any pesticide only according to its label.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'Service',
      serviceType: 'Pest control and termite service',
      name: 'Pest Control & Termite Service in the Birmingham Metro',
      provider: { '@id': `${BASE}/#organization` },
      areaServed: [
        'Birmingham', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood',
        'Alabaster', 'Chelsea', 'Pelham', 'Helena', 'Calera', 'Trussville',
      ].map((c) => ({ '@type': 'City', name: c })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Choosing Pest Control in Birmingham',
          item: `${BASE}/best-pest-control-birmingham`,
        },
      ],
    },
  ],
};

export default function BestPestControlBirminghamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: CREAM, fontFamily: bodyFont, color: INK }}>
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '56px clamp(20px,5vw,64px) 72px' }}>
          <nav style={{ fontSize: 13.5, color: '#5A6660', marginBottom: 18 }}>
            <a href="/" style={{ color: '#5A6660', textDecoration: 'none' }}>Home</a>
            {' › '}
            <span>Choosing Pest Control in Birmingham</span>
          </nav>

          <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(30px,5vw,44px)', color: INK, margin: 0, lineHeight: 1.15 }}>
            How to Choose a Pest Control Company in Birmingham, AL
          </h1>
          <p style={{ fontSize: 16, marginTop: 14, marginBottom: 0 }}>
            <a href="/birmingham" style={{ color: GREEN, fontWeight: 700, textDecoration: 'none' }}>Birmingham pest control service →</a>
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, maxWidth: 780, marginTop: 16, fontWeight: 500 }}>
            The best pest control company for your Birmingham home depends on the pest, the property
            and the service terms. Compare five things: licensing, termite damage repair coverage,
            initial and recurring prices, the written agreement, and the local office handling follow-up.
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.75, maxWidth: 780, marginTop: 10, color: '#4a5750' }}>
            EnviroCare Pest Services is the public brand of EnviroCare, LLC. The Wedgworth family
            has been doing pest control in Alabama since 1958, starting in Alexander City. The fourth
            generation is now in the business. Our four offices serve Birmingham, Alabaster, Huntsville and
            Alexander City / Lake Martin. <a href="/about-us" style={{ color: GREEN, fontWeight: 600 }}>Meet the family and find our offices.</a>
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 22 }}>
            <a href="/pricing" style={{ background: GOLD, color: INK, fontWeight: 700, textDecoration: 'none', padding: '12px 22px', borderRadius: 50, fontSize: 15.5 }}>
              See Our Published Pricing →
            </a>
            <a href={BIRMINGHAM.phoneHref} style={{ border: `2px solid ${GREEN}`, color: GREEN, fontWeight: 600, textDecoration: 'none', padding: '11px 20px', borderRadius: 50, fontSize: 15.5 }}>
              Call {BIRMINGHAM.phone}
            </a>
          </div>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 16px' }}>
            Five Things Worth Checking Before You Call Anyone
          </h2>
          <div style={{ maxWidth: 860 }}>
            {CRITERIA.map((c) => (
              <div key={c.n} style={{ display: 'flex', gap: 18, marginBottom: 26, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: displayFont, fontSize: 26, color: GOLD, fontWeight: 700, lineHeight: 1.2, minWidth: 44 }}>{c.n}</div>
                <div>
                  <h3 style={{ fontSize: 17.5, color: DEEP, margin: '0 0 6px', fontWeight: 700, lineHeight: 1.35 }}>{c.h}</h3>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: '#4b5563' }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            Where EnviroCare Fits
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 800 }}>
            Our bi-monthly pest program starts at <strong>${PRICING.plans.pest.fromMonthly}/month
            on ACH or ${PRICING.plans.pest.perVisit} per bi-monthly visit</strong>, with {INITIAL_SERVICE_COPY}.
            {' '}{PRICING.achTerms} Free re-service between scheduled pest visits is included.
            Termite protection uses Sentricon<sup>®</sup> Always Active™ baiting. Qualifying homes
            can receive up to $1,000,000 in termite damage repair coverage provided by EnviroCare,
            subject to the terms of the agreement. Termite pricing is determined after inspection.
          </p>

          <aside style={{ background: '#fff', border: '1px solid rgba(14,26,15,.10)', borderRadius: 12, padding: '20px 24px', maxWidth: 800, marginTop: 22 }} aria-label="Birmingham office and reviews">
            <h3 style={{ color: DEEP, fontSize: 18, margin: '0 0 8px' }}>Check the Birmingham office</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
              {BIRMINGHAM.address.street}, {BIRMINGHAM.address.city}, {BIRMINGHAM.address.region} {BIRMINGHAM.address.postalCode}.
              {' '}<a href={BIRMINGHAM.googleBusinessProfile} style={{ color: GREEN, fontWeight: 600 }}>Read current Birmingham Google reviews</a>
              {' '}and contact our familiar local team about service for your address.
            </p>
          </aside>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            The Birmingham-Specific Part
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 800 }}>
            Tell the office what you are seeing, where you are seeing it and whether the problem
            returns between treatments. A recurring kitchen-ant problem, suspected termite activity
            and a request for a WDO letter need different responses. Our Birmingham office serves
            Birmingham, Hoover, Vestavia Hills, Mountain Brook and Homewood; our Alabaster office
            handles nearby Shelby County communities. The office can confirm the route for your
            address, the relevant service and scheduling.
          </p>

          <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(22px,3.4vw,30px)', color: GREEN, margin: '46px 0 14px' }}>
            Common Questions
          </h2>
          <div style={{ maxWidth: 820 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: '#fff', border: '1px solid rgba(14,26,15,.10)', borderRadius: 10, marginBottom: 12, padding: '4px 0' }}>
                <summary style={{ padding: '14px 18px', cursor: 'pointer', fontWeight: 600, color: DEEP, fontSize: 15.5 }}>{f.q}</summary>
                <p style={{ padding: '0 18px 16px', margin: 0, fontSize: 15, lineHeight: 1.65, color: '#4b5563' }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 40, fontSize: 15, color: '#5A6660' }}>
            Keep reading:{' '}
            <a href="/about-us" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>About EnviroCare</a>
            {' · '}
            <a href="/family-owned-vs-national-chains" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Family-Owned vs National Chains</a>
            {' · '}
            <a href="/pricing" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Published Pricing</a>
            {' · '}
            <a href="/services/termite-control" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Termite Control</a>
            {' · '}
            <a href="/birmingham" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Birmingham</a>
            {' · '}
            <a href="/hoover" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Hoover</a>
            {' · '}
            <a href="/vestavia-hills" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Vestavia Hills</a>
            {' · '}
            <a href="/mountain-brook" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>Mountain Brook</a>
            {' · '}
            <a href="/service-areas" style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>All Service Areas</a>
          </div>
        </section>
      </main>
    </>
  );
}
