// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/pages/Homepage.tsx
// Commit: feat(homepage): restore Lake Martin band, truck banner, specialty services sections
// Push: main
// ─────────────────────────────────────

// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/pages/Homepage.tsx
// Commit: feat(homepage): per-service accent colors + tighter section spacing
// Push: main
// ─────────────────────────────────────


// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/pages/Homepage.tsx
// Commit: feat: consolidate homepage — Option B layout, compact pricing, no contract language
// Push: main
// ─────────────────────────────────────
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import StickyCallButton from '@/components/StickyCallButton';

/**
 * EnviroCare Homepage v6 — Consolidated Option B (Jun 19, 2026)
 *
 * Changes from v5:
 * 1. Merged CoreServices + Pricing into one ConsolidatedPricing section (compact expandable list)
 * 2. Section order: Hero → Pricing → Reviews → FindOffice → Heritage → Footer (Option B)
 * 3. Restored: TruckBanner, SpecialtyServices (Jun 22) — LakeMartinBand removed (locked: no Lake Martin on homepage)
 * 4. ThreeOffices replaced with FindYourOffice zip finder
 * 5. "No contract" language removed sitewide per owner direction
 * 6. Hero copy: "interior and exterior coverage" replaces "we treat from the outside"
 * 7. Pricing: Pest $79 initial, tick as +$20 add-on, termite priced at free WDO inspection (no flat $/mo)
 * 8. Complete tier ~$100/mo (matches data/pricing.ts and city pages)
 */

/* ============================================================
   LOCAL BUSINESS JSON-LD — one PestControl node per office cluster.
   All values come from data/offices.ts (verified). No reviews or
   aggregateRating injected (not verified per office).
   ============================================================ */
function LocalBusinessJsonLd() {
  const SITE = 'https://envirocare-web.vercel.app';
  const offerCatalog = {
    '@type': 'OfferCatalog',
    name: 'Pest & Termite Services',
    itemListElement: [
      'Pest Control', 'Termite Control / Sentricon®', 'Mosquito Control',
      'Tick Control', 'Fire Ant Control', 'Flea Control',
      'WDO Inspection Letters', 'Commercial Pest Control', 'Builder Pre-Treatment',
    ].map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
  };
  const clusters = [
    {
      id: 'birmingham',
      name: 'EnviroCare Pest & Termite Services — Birmingham / Alabaster',
      street: '2025 Butler Rd', city: 'Alabaster', zip: '35007',
      phone: '+1-205-940-6360',
      sameAs: 'https://www.google.com/maps?cid=7378341068021381374',
      areaServed: ['Birmingham', 'Alabaster', 'Hoover', 'Vestavia Hills', 'Mountain Brook', 'Homewood', 'Pelham', 'Chelsea'],
    },
    {
      id: 'lake-martin',
      name: 'EnviroCare Pest & Termite Services — Alexander City / Lake Martin',
      street: '1785 Tallapoosa St', city: 'Alexander City', zip: '35010',
      phone: '+1-256-234-6162',
      sameAs: 'https://www.google.com/maps?cid=12101127141767078247',
      areaServed: ['Alexander City', 'Lake Martin', 'Dadeville', 'Eclectic', 'Auburn', 'Opelika'],
    },
    {
      id: 'huntsville',
      name: 'EnviroCare Pest & Termite Services — Huntsville',
      street: '7027 Old Madison Pike, Ste 108', city: 'Huntsville', zip: '35806',
      phone: '+1-256-937-7676',
      sameAs: 'https://maps.app.goo.gl/p5fJg2GoAr3Vk3Ua8',
      areaServed: ['Huntsville', 'Madison', 'Athens', 'Decatur', 'Hartselle', 'Harvest', 'Hampton Cove'],
    },
  ];
  const schema = clusters.map((c) => ({
    '@context': 'https://schema.org',
    '@type': 'PestControl',
    '@id': `${SITE}/#office-${c.id}`,
    name: c.name,
    url: SITE,
    telephone: c.phone,
    image: `${SITE}/logo.png`,
    logo: `${SITE}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: 'AL',
      postalCode: c.zip,
      addressCountry: 'US',
    },
    areaServed: c.areaServed.map((a) => ({ '@type': 'City', name: `${a}, AL` })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    sameAs: [c.sameAs],
    hasOfferCatalog: offerCatalog,
  }));
  return (
    <>
      {schema.map((s) => (
        <script
          key={s['@id']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export default function Homepage() {
  return (
    <main className="ec-main">
      <style dangerouslySetInnerHTML={{ __html: HOMEPAGE_CSS }} />
      <LocalBusinessJsonLd />
      <TopBanner />
      <Header />
      <Hero />
      <ConsolidatedPricing />
      <Reviews />
      <ServiceLinks />
      <SpecialtyServices />
      <FindYourOffice />
      <Heritage />
      <Footer />
      <StickyCallButton />
    </main>
  );
}

/* ============================================================
   TOP BANNER
   ============================================================ */
function TopBanner() {
  return (
    <div className="ec-banner">
      <div className="ec-banner-inner">
        <div className="ec-banner-rotator" aria-live="off">
          <span className="ec-banner-msg"><span className="ec-banner-gold">Family-owned since 1958</span> · Four generations of the Wedgworth family</span>
          <span className="ec-banner-msg"><span className="ec-banner-gold">Sentricon® termite protection</span> · Up to $1M repair coverage · No drilling</span>
          <span className="ec-banner-msg"><span className="ec-banner-gold">Realtors &amp; closings:</span> WDO inspection letters · Fast, lender-ready turnaround</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="ec-header">
      <div className="ec-header-inner">
        <Link href="/" className="ec-brand" aria-label="EnviroCare home">
          <Image
            src="/logo.png"
            alt="EnviroCare Pest & Termite Services"
            width={280}
            height={72}
            className="ec-brand-logo"
            priority
          />
        </Link>

        <nav className="ec-nav" aria-label="Main navigation">
          <Link href="/services/pest-control">Services</Link>
          <Link href="/quote">Pricing</Link>
          <Link href="/about-us">About</Link>
          <Link href="/contact-us">Contact</Link>
        </nav>

        <div className="ec-header-cta">
          <a
            href="https://payenvirocare.key7app.com/User/Login"
            target="_blank"
            rel="noopener noreferrer"
            className="ec-header-pay"
          >Pay Bill</a>
          <a href="tel:2059406360" className="ec-header-phone">
            <span>(205) 940-6360</span>
          </a>
        </div>

        <button
          type="button"
          className="ec-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="ec-mobile-menu"
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="ec-mobile-menu" id="ec-mobile-menu">
          <Link href="/services/pest-control" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="/quote" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/about-us" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact</Link>
          <a
            href="https://payenvirocare.key7app.com/User/Login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >Pay Bill</a>
            <a href="tel:2059406360" onClick={() => setMobileOpen(false)}>Call (205) 940-6360</a>
          <Link href="/quote" className="ec-mobile-cta" onClick={() => setMobileOpen(false)}>
            Get Free Quote →
          </Link>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section className="ec-hero">
      <div className="ec-hero-inner">
        <div className="ec-hero-content">
          <div className="ec-eyebrow">
            <span className="ec-eyebrow-dot">●</span>
            FAMILY OWNED · ALABAMA SINCE 1958
          </div>

          <h1 className="ec-hero-h1">
            Protecting Alabama Homes<br />
            <em className="ec-h1-italic">Four Generations</em><br />
            <span className="ec-h1-gold">Strong.</span>
          </h1>

          <p className="ec-hero-keyword">
            Alabama pest, termite &amp; mosquito control — trusted since 1958.
          </p>

          <p className="ec-hero-sub">
            Pest, termite &amp; mosquito protection from one trusted Alabama
            company — with trained specialists for every service.
          </p>

          <div className="ec-hero-ctas">
            <Link href="/quote" className="ec-cta-primary">
              <span>Get a Free Quote</span><span className="ec-arrow">→</span>
            </Link>
            <a href="tel:2059406360" className="ec-cta-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>(205) 940-6360</span>
            </a>
          </div>

          <div className="ec-hero-trust-row">
            <span>★★★★★ Google Reviews</span>
            <span aria-hidden="true">·</span>
            <span>Sentricon® Certified</span>
            <span aria-hidden="true">·</span>
            <span>Up to $1M Coverage</span>
            <span aria-hidden="true">·</span>
            <span>Since 1958</span>
          </div>
        </div>

        <div className="ec-hero-visual">
          <div className="ec-hero-photo-wrap">
            <Image
              src="/hero-family.webp"
              alt="Alabama family relaxing in their backyard"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 45vw, 1px"
              className="ec-hero-photo"
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            />
            <div className="ec-hero-photo-tint" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONSOLIDATED PRICING — compact expandable list with toggle
   Replaces: CoreServices + Pricing + SpecialtyServices
   ============================================================ */
interface RecurringPlan {
  key: string;
  icon: string;
  name: string;
  badge?: string;
  popular?: boolean;
  dotColor: string;
  accent: string;
  accentText: string;
  perservice: { price: string; terms: string };
  monthly: { price: string; terms: string };
  bullets: string[];
  addon?: string;
  cta: string;
  ctaCls: string;
  fine?: string;
}

// Core protection plans: Pest → Termite → Mosquito (with +$20/application tick
// option) → Complete package that bundles all three.
const RECURRING_PLANS: RecurringPlan[] = [
  {
    key: 'pest', icon: 'shield', name: 'Pest Control', badge: 'MOST POPULAR', popular: true,
    accent: '#C62828', accentText: '#ffffff', dotColor: '#C62828',
    perservice: { price: '$70/visit · bimonthly', terms: '6 visits a year · $79 initial service fee' },
    monthly: { price: 'From $35/mo ACH', terms: '$79 initial · equal monthly ACH drafts' },
    bullets: ['Bimonthly interior & exterior treatment', 'Covers 30+ pests, including mice & rats', 'Unlimited free re-service between visits', 'EPA-registered products, applied per label'],
    cta: 'Choose Pest Control', ctaCls: 'ec-cp-cta-green', fine: '$79 initial',
  },
  {
    key: 'termite', icon: 'wood', name: 'Termite Control', badge: 'MOST INSURANCE',
    accent: '#E0A100', accentText: '#1a1400', dotColor: '#E0A100',
    perservice: { price: 'Priced after free inspection', terms: 'Sentricon® Always Active™ · annual renewal' },
    monthly: { price: 'Quoted after inspection', terms: 'Annual renewal keeps your $1M coverage active' },
    bullets: ['Sentricon® bait-station system', 'Up to $1M termite damage repair coverage', 'Free WDO inspection included', 'No drilling, no concrete cuts'],
    cta: 'Get Free Termite Inspection', ctaCls: 'ec-cp-cta-outline', fine: 'Free inspection · no obligation',
  },
  {
    key: 'mosquito', icon: 'mosquito', name: 'Mosquito Control',
    accent: '#E2711D', accentText: '#ffffff', dotColor: '#E2711D',
    perservice: { price: '$45/visit · seasonal', terms: 'Monthly service March–November' },
    monthly: { price: 'From $34/mo with a pest plan', terms: 'Seasonal mosquito barrier on one draft' },
    bullets: ['30-day yard barrier (March–November)', 'Targets adult mosquitoes & harborage areas', 'Add tick protection: +$20 per application', 'Free re-treatment between scheduled visits'],
    addon: 'Add the tick program to any mosquito visit: +$20 per application',
    cta: 'Choose Mosquito', ctaCls: 'ec-cp-cta-outline', fine: 'No startup fee',
  },
  {
    key: 'complete', icon: 'home', name: 'Complete Protection', badge: 'BEST VALUE',
    accent: '#0E8E40', accentText: '#ffffff', dotColor: '#0E8E40',
    perservice: { price: 'Pest + Mosquito + Sentricon®', terms: 'Termite confirmed after inspection & approval' },
    monthly: { price: 'From ~$100/mo ACH', terms: 'Pest + mosquito on ACH · Sentricon® termite priced at inspection' },
    bullets: ['Everything in Pest Control', 'Seasonal mosquito (add tick +$20/application)', 'Sentricon® termite + up to $1M coverage', 'One company, one invoice'],
    cta: 'Choose Complete', ctaCls: 'ec-cp-cta-dark', fine: '$229 initial · termite confirmed after inspection',
  },
];

/* Clean line icons for plans & add-ons (replaces emoji). */
function SvcIcon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'shield':
      return <svg {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'mosquito':
      return <svg {...p}><path d="M12 8v9" /><path d="M12 8c0-2 1.6-3.5 3.6-3.5M12 8c0-2-1.6-3.5-3.6-3.5" /><path d="M5 11l7 2 7-2M5 15l7 1 7-1" /></svg>;
    case 'home':
      return <svg {...p}><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></svg>;
    case 'wood':
      return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 6v12M12 6v12M17 6v12" /></svg>;
    case 'doc':
      return <svg {...p}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M10 13h6M10 16h6" /></svg>;
    case 'builder':
      return <svg {...p}><path d="M3 21h18" /><path d="M6 21V8l6-4 6 4v13" /><path d="M10 21v-5h4v5" /></svg>;
    case 'commercial':
      return <svg {...p}><path d="M3 21h18" /><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" /></svg>;
    case 'bug':
      return <svg {...p}><path d="M12 8a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0v-3a4 4 0 0 1 4-4z" /><path d="M12 4v4M5 9l3 2M19 9l-3 2M4 15h4M16 15h4M6 20l3-2M18 20l-3-2" /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

function ConsolidatedPricing() {
  const [mode, setMode] = useState<'perservice' | 'monthly'>('perservice');
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="ec-cp">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">SERVICES &amp; PRICING</div>
        <h2 className="ec-section-h2">Alabama Protection, <em>Clearly Priced</em></h2>
        <p className="ec-section-sub">
          Mix and match any way you like &mdash; one service, two, or all three. Pick just what you need, add the tick program to mosquito for +$20 per application, or choose Complete and let us handle everything on one invoice.
        </p>

        {/* ---------- Core Protection Plans ---------- */}
        <h3 className="ec-cp-block-title">Build Your Own Protection</h3>

        {/* Billing display toggle */}
        <div className="ec-cp-toggle-wrap" role="group" aria-label="Billing display">
          <button
            type="button"
            className={`ec-cp-toggle-label ${mode === 'perservice' ? 'ec-cp-active' : ''}`}
            aria-pressed={mode === 'perservice'}
            onClick={() => setMode('perservice')}
          >Per Service</button>
          <div
            className={`ec-cp-toggle-bar ${mode === 'monthly' ? 'ec-cp-bar-on' : ''}`}
            aria-hidden="true"
            onClick={() => setMode(m => m === 'perservice' ? 'monthly' : 'perservice')}
          >
            <div className={`ec-cp-toggle-dot ${mode === 'monthly' ? 'ec-cp-dot-right' : ''}`} />
          </div>
          <button
            type="button"
            className={`ec-cp-toggle-label ${mode === 'monthly' ? 'ec-cp-active' : ''}`}
            aria-pressed={mode === 'monthly'}
            onClick={() => setMode('monthly')}
          >Monthly ACH</button>
        </div>
        <p className="ec-cp-toggle-note">
          {mode === 'perservice'
            ? 'Pay each visit as it happens.'
            : 'Equal monthly ACH drafts. Not financing.'}
        </p>

        <div className="ec-cp-list">
          {RECURRING_PLANS.map(plan => {
            const d = plan[mode];
            const isOpen = openKey === plan.key;
            const panelId = `ec-cp-panel-${plan.key}`;
            return (
              <div
                key={plan.key}
                className={`ec-cp-item ${plan.popular ? 'ec-cp-pop' : ''} ${isOpen ? 'ec-cp-open' : ''}`}
                style={{ borderLeft: `4px solid ${plan.accent}` }}
              >
                <button
                  type="button"
                  className="ec-cp-item-top"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenKey(isOpen ? null : plan.key)}
                >
                  <span className="ec-cp-dot" style={{ background: plan.dotColor }}><SvcIcon name={plan.icon} /></span>
                  <span className="ec-cp-item-info">
                    <span className="ec-cp-item-name">
                      {plan.name}
                      {plan.badge && <span className="ec-cp-badge" style={{ background: plan.accent, color: plan.accentText }}>{plan.badge}</span>}
                    </span>
                    <span className="ec-cp-item-price">{d.price}</span>
                  </span>
                  <span className="ec-cp-arrow" aria-hidden="true">▼</span>
                </button>

                {isOpen && (
                  <div id={panelId} className="ec-cp-detail">
                    <div className="ec-cp-terms">{d.terms}</div>
                    <ul className="ec-cp-bullets">
                      {plan.bullets.map(b => <li key={b}><span className="ec-cp-chk">✓</span>{b}</li>)}
                    </ul>
                    {plan.addon && <div className="ec-cp-addon">{plan.addon}</div>}
                    <Link href="/quote" className="ec-cp-cta" style={{ background: plan.accent, color: plan.accentText, border: 'none' }}>{plan.cta}</Link>
                    {plan.fine && <div className="ec-cp-fine"><em>{plan.fine}</em></div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="ec-cp-strip">
          <strong>$79 initial service fee</strong> for new pest customers.
          Mosquito and tick have no startup.
        </div>
        <div className="ec-cp-assurance">We never charge twice for the same coverage.</div>
        <div className="ec-cp-faq">
          Already have termite coverage? We&rsquo;ll verify your protection before recommending anything.
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REVIEWS
   ============================================================ */
function Reviews() {
  const reviews = [
    { name: 'Jessica M.', city: 'Huntsville, AL', text: 'My husband and I love the service and technicians. Could not recommend more!' },
    { name: 'Ann S.', city: 'Hoover, AL', text: 'Very professional, schedules with us, and is always on time.' },
    { name: 'Dariel S.', city: 'Madison, AL', text: 'No other pest control company can top the service from EnviroCare!!!' },
    { name: 'Janet H.', city: 'Birmingham, AL', text: 'The technician was friendly and careful of our things. Five stars without hesitation.' },
  ];

  return (
    <section className="ec-reviews">
      <div className="ec-section-inner">
        <div className="ec-reviews-badge">
          <span className="ec-reviews-g">Verified by Google</span>
          <span className="ec-reviews-rating">
            <span className="ec-reviews-stars">★★★★★</span>
            <span className="ec-reviews-count">· 4.7★ Google</span>
          </span>
        </div>
        <div className="ec-section-eyebrow">CUSTOMER REVIEWS</div>
        <h2 className="ec-section-h2">What Alabama Families <em>Are Saying</em></h2>
        <p className="ec-section-sub">
          Real Google reviews from real Alabama homes. Not hand-picked — this is what customers say every week.
        </p>

        <div className="ec-reviews-grid">
          {reviews.map((r) => (
            <div key={r.name} className="ec-review-card">
              <span className="ec-review-quote">&ldquo;</span>
              <div className="ec-review-stars">★★★★★</div>
              <p className="ec-review-text">{r.text}</p>
              <div className="ec-review-author">
                <div className="ec-review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <div className="ec-review-name">{r.name}</div>
                  <div className="ec-review-city">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/reviews" className="ec-reviews-link">See all reviews →</Link>
      </div>
    </section>
  );
}

/* ============================================================
   FIND YOUR OFFICE — zip finder replaces 3 office cards
   ============================================================ */
function ServiceLinks() {
  const services = [
    { name: 'Pest Control', slug: 'pest-control', icon: 'shield', accent: '#C62828' },
    { name: 'Termite Control', slug: 'termite-control', icon: 'wood', accent: '#E0A100' },
    { name: 'Mosquito Control', slug: 'mosquito-control', icon: 'mosquito', accent: '#E2711D' },
    { name: 'Tick Control', slug: 'tick-control', icon: 'bug', accent: '#07642B' },
    { name: 'Fire Ant Control', slug: 'fire-ant', icon: 'bug', accent: '#DC4A1A' },
    { name: 'Flea Control', slug: 'flea', icon: 'bug', accent: '#0E7490' },
    { name: 'Commercial', slug: 'commercial', icon: 'commercial', accent: '#0E1A0F' },
    { name: 'Real Estate / WDO', slug: 'wdo-letters', icon: 'doc', accent: '#0A7935' },
  ];
  return (
    <section className="ec-services-links" style={{ padding: 'clamp(2.5rem,6vw,4rem) 0', background: '#FEFDF8' }}>
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">EXPLORE OUR SERVICES</div>
        <h2 className="ec-section-h2">Every Service, <em>One Local Team</em></h2>
        <p className="ec-section-sub">Tap a service for coverage, pricing, and what&rsquo;s included.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: 14, marginTop: '2rem' }}>
          {services.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '1px solid rgba(14,142,64,0.15)', borderLeft: `4px solid ${s.accent}`, borderRadius: 14, padding: '16px 18px', textDecoration: 'none', color: '#0E1A0F', fontWeight: 600, fontSize: 16, minHeight: 58, transition: 'box-shadow 0.2s, transform 0.15s' }}
            >
              <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: `${s.accent}14`, color: s.accent, flexShrink: 0 }}>
                <SvcIcon name={s.icon} />
              </span>
              <span style={{ flex: 1 }}>{s.name}</span>
              <span style={{ color: '#0E8E40', fontWeight: 700 }} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FindYourOffice() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const offices = [
    { name: 'Birmingham / Alabaster', phone: '(205) 940-6360', phoneHref: 'tel:2059406360',
      zips: ['35004','35007','35022','35023','35040','35041','35042','35043','35051','35060','35061','35062','35064','35068','35071','35073','35078','35080','35085','35094','35111','35114','35115','35116','35117','35118','35119','35120','35124','35126','35127','35128','35130','35131','35133','35135','35139','35142','35143','35144','35146','35147','35148','35150','35160','35173','35176','35180','35185','35186','35188','35201','35202','35203','35204','35205','35206','35207','35208','35209','35210','35211','35212','35213','35214','35215','35216','35217','35218','35219','35220','35221','35222','35223','35224','35225','35226','35228','35229','35231','35232','35233','35234','35235','35236','35237','35238','35242','35243','35244','35246','35249','35253','35254','35255','35259','35260','35261','35263','35266','35277','35278','35279','35280','35281','35282','35283','35285','35287','35288','35289','35290','35291','35292','35293','35294','35295','35296','35297','35298'] },
    { name: 'Alexander City / Lake Martin', phone: '(256) 234-6162', phoneHref: 'tel:2562346162',
      zips: ['35010','35072','35089','35096','36003','36008','36064','36067','36075','36078','36080','36830','36832'] },
    { name: 'Huntsville', phone: '(256) 937-7676', phoneHref: 'tel:2569377676',
      zips: ['35601','35602','35603','35611','35613','35614','35620','35630','35631','35640','35649','35670','35671','35672','35673','35674','35739','35741','35748','35749','35750','35751','35752','35755','35756','35757','35758','35759','35760','35761','35762','35763','35764','35765','35766','35768','35769','35771','35772','35773','35774','35775','35776','35801','35802','35803','35804','35805','35806','35807','35808','35809','35810','35811','35812','35813','35814','35815','35816','35824','35893','35894','35895','35896','35897','35898','35899'] },
  ];

  // Crawlable service-area links (routes verified to exist in the repo).
  const popularAreas = [
    { name: 'Birmingham', href: '/birmingham' },
    { name: 'Hoover', href: '/hoover' },
    { name: 'Vestavia Hills', href: '/vestavia-hills' },
    { name: 'Mountain Brook', href: '/mountain-brook' },
    { name: 'Homewood', href: '/homewood' },
    { name: 'Alabaster', href: '/alabaster' },
    { name: 'Pelham', href: '/pelham' },
    { name: 'Chelsea', href: '/chelsea' },
    { name: 'Alexander City', href: '/alexander-city' },
    { name: 'Alex City / Lake Martin', href: '/lake-martin' },
    { name: 'Auburn', href: '/auburn' },
    { name: 'Huntsville', href: '/huntsville' },
    { name: 'Madison', href: '/service-areas/madison' },
  ];

  const findOffice = () => {
    const z = zip.trim();
    if (!z || z.length < 5) { setResult('Please enter a 5-digit ZIP code.'); return; }
    const match = offices.find(o => o.zips.includes(z));
    if (match) {
      setResult(`Your office: ${match.name} — ${match.phone}`);
    } else {
      setResult('We may serve your area! Call (205) 940-6360 to check.');
    }
  };

  return (
    <section className="ec-findoffice">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">THREE OFFICES ACROSS ALABAMA</div>
        <h2 className="ec-section-h2">Find <em>Your Office</em></h2>
        <p className="ec-section-sub">
          Birmingham/Alabaster · Alexander City/Lake Martin · Huntsville
        </p>
        <div className="ec-fo-box">
          <input
            type="text"
            className="ec-fo-input"
            placeholder="Enter ZIP code"
            maxLength={5}
            value={zip}
            onChange={e => { setZip(e.target.value.replace(/\D/g, '')); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && findOffice()}
          />
          <button className="ec-fo-btn" onClick={findOffice}>Find Office →</button>
        </div>
        {result && <div className="ec-fo-result">{result}</div>}
        <div className="ec-fo-phones">
            <a href="tel:2059406360">(205) 940-6360 — Birmingham</a>
            <a href="tel:2562346162">(256) 234-6162 — Alex City / Lake Martin</a>
            <a href="tel:2569377676">(256) 937-7676 — Huntsville</a>
        </div>
        <div className="ec-fo-areas">
          <div className="ec-fo-areas-label">Popular service areas</div>
          <div className="ec-fo-areas-grid">
            {popularAreas.map(a => (
              <Link key={a.href} href={a.href} className="ec-fo-area-link">{a.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HERITAGE
   ============================================================ */
function Heritage() {
  return (
    <section className="ec-heritage">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">OUR STORY</div>
        <h2 className="ec-section-h2">
          Four Generations. <em>One Family.</em> One Promise.
        </h2>

        <div className="ec-heritage-grid">
          <div className="ec-heritage-text">
            <p>
              EnviroCare started in 1958 as Wedgworth Pest Control on Lake Martin.
              Four generations later, the same family still runs it &mdash; now
              protecting homes across Central &amp; North Alabama from offices in
              Birmingham, Lake Martin, and Huntsville.
            </p>
            <blockquote className="ec-heritage-quote">
              &ldquo;No One Cares Like EnviroCare.&rdquo;
            </blockquote>
            <div className="ec-heritage-stats">
              <div className="ec-h-stat"><div className="ec-h-stat-num">1958</div><div className="ec-h-stat-label">FOUNDED</div></div>
              <div className="ec-h-stat"><div className="ec-h-stat-num">4</div><div className="ec-h-stat-label">GENERATIONS</div></div>
              <div className="ec-h-stat"><div className="ec-h-stat-num">100%</div><div className="ec-h-stat-label">FAMILY OWNED</div></div>
            </div>
            <Link href="/about-us" className="ec-heritage-link">Read our full story →</Link>
          </div>

          <div className="ec-heritage-photos">
            <div className="ec-photo-frame ec-photo-kevin">
              <span className="ec-photo-imgwrap">
                <Image
                  src="/kevin.jpg"
                  alt="Kevin Wedgworth, owner of EnviroCare Pest & Termite Services"
                  fill
                  sizes="(min-width: 1024px) 260px, 200px"
                  className="ec-photo-img"
                  style={{ objectFit: 'cover' }}
                />
              </span>
              <div className="ec-photo-caption">
                <strong>Kevin Wedgworth</strong>
                <span>Owner &amp; Operator</span>
              </div>
            </div>

            <div className="ec-photo-frame ec-photo-ribbon-1">
              <span className="ec-photo-imgwrap">
                <Image
                  src="/ribbon-cutting-1.jpg"
                  alt="EnviroCare Birmingham office ribbon cutting"
                  fill
                  sizes="170px"
                  className="ec-photo-img"
                  style={{ objectFit: 'cover' }}
                />
              </span>
              <div className="ec-photo-caption ec-caption-small">
                <strong>Birmingham Office Opening</strong>
              </div>
            </div>

            <div className="ec-photo-frame ec-photo-ribbon-2">
              <span className="ec-photo-imgwrap">
                <Image
                  src="/ribbon-cutting-2.jpg"
                  alt="EnviroCare Huntsville office ribbon cutting"
                  fill
                  sizes="170px"
                  className="ec-photo-img"
                  style={{ objectFit: 'cover' }}
                />
              </span>
              <div className="ec-photo-caption ec-caption-small">
                <strong>Huntsville Office Opening</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SPECIALTY SERVICES — restored Jun 22
   ============================================================ */
function SpecialtyServices() {
  const items = [
    { icon: 'builder', name: 'Builder Pre-Treat', slug: 'builder-pre-treat',
      desc: 'New construction termite pre-treatment. We work with your builder\'s timeline and provide the documentation lenders require.' },
    { icon: 'doc', name: 'Real Estate / WDO', slug: 'wdo-letters',
      desc: 'Wood-Destroying Organism inspection letters for closings, refinancing, and VA/FHA loans. Fast turnaround, lender-ready reports.' },
    { icon: 'commercial', name: 'Commercial Service', slug: 'commercial',
      desc: 'Restaurants, offices, warehouses, and multi-family. Scheduled around your business hours with documentation for inspectors.' },
  ];
  return (
    <section className="ec-specialty">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">SPECIALTY SERVICES</div>
        <h2 className="ec-section-h2">Builders, Realtors &amp; <em>Commercial</em></h2>
        <p className="ec-section-sub">
          Not every job is a residential subscription. These services are priced per project.
        </p>
        <div className="ec-specialty-grid">
          {items.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="ec-specialty-card">
              <span className="ec-specialty-icon"><SvcIcon name={s.icon} /></span>
              <h3 className="ec-specialty-title">{s.name}</h3>
              <p className="ec-specialty-desc">{s.desc}</p>
              <span className="ec-specialty-tag">LEARN MORE →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ec-footer">
      <div className="ec-footer-inner">
        <div className="ec-footer-brand-col">
          <Link href="/" className="ec-footer-brand">
            <Image src="/logo.png" alt="EnviroCare Pest & Termite Services" width={280} height={72} className="ec-footer-logo" />
          </Link>
          <p className="ec-footer-tag">
            Family-owned and operated since 1958 — now in its fourth generation
            of the Wedgworth family. Serving Alabama from three offices: Birmingham, Lake Martin, and Huntsville.
          </p>
          <div className="ec-footer-phones">
            <a href="tel:2059406360" className="ec-footer-phone"><span>(205) 940-6360</span> <em>Birmingham</em></a>
            <a href="tel:2562346162" className="ec-footer-phone"><span>(256) 234-6162</span> <em>Lake Martin / Alex City</em></a>
            <a href="tel:2569377676" className="ec-footer-phone"><span>(256) 937-7676</span> <em>Huntsville</em></a>
          </div>
        </div>

        <div className="ec-footer-col">
          <h4 className="ec-footer-h4">CORE SERVICES</h4>
          <Link href="/services/pest-control">Pest Control</Link>
          <Link href="/services/termite-control">Termite Control</Link>
          <Link href="/services/mosquito-control">Mosquito Control</Link>
          <Link href="/services/tick-control">Tick Control</Link>
          <Link href="/quote?plan=complete">Complete Plan</Link>
        </div>

        <div className="ec-footer-col">
          <h4 className="ec-footer-h4">SPECIALTY</h4>
          <Link href="/services/fire-ant">Fire Ant Control</Link>
          <Link href="/services/flea">Flea Control</Link>
          <Link href="/services/builder-pre-treat">Builder Pre-Treat</Link>
          <Link href="/services/wdo-letters">Real Estate / WDO Letters</Link>
          <Link href="/services/commercial">Commercial Service</Link>
        </div>

        <div className="ec-footer-col ec-footer-col-areas">
          <h4 className="ec-footer-h4">SERVICE AREAS</h4>
          <div className="ec-footer-areas-group">
            <div className="ec-footer-areas-label">Birmingham Metro</div>
            <Link href="/birmingham">Birmingham</Link>
            <Link href="/hoover">Hoover</Link>
            <Link href="/vestavia-hills">Vestavia Hills</Link>
            <Link href="/mountain-brook">Mountain Brook</Link>
            <Link href="/homewood">Homewood</Link>
            <Link href="/alabaster">Alabaster</Link>
            <Link href="/chelsea">Chelsea</Link>
            <Link href="/pelham">Pelham</Link>
            <Link href="/helena">Helena</Link>
            <Link href="/calera">Calera</Link>
            <Link href="/trussville">Trussville</Link>
            <Link href="/mt-laurel">Mt Laurel</Link>
          </div>
          <div className="ec-footer-areas-group">
            <div className="ec-footer-areas-label">Lake Martin / Alex City</div>
            <Link href="/alexander-city">Alexander City</Link>
            <Link href="/lake-martin">Lake Martin</Link>
            <Link href="/dadeville">Dadeville</Link>
            <Link href="/eclectic">Eclectic</Link>
            <Link href="/auburn">Auburn</Link>
            <Link href="/opelika">Opelika</Link>
          </div>
          <div className="ec-footer-areas-group">
            <div className="ec-footer-areas-label">North Alabama</div>
            <Link href="/huntsville">Huntsville</Link>
            <Link href="/service-areas/madison">Madison</Link>
            <Link href="/athens">Athens</Link>
            <Link href="/decatur">Decatur</Link>
            <Link href="/hartselle">Hartselle</Link>
            <Link href="/harvest">Harvest</Link>
            <Link href="/hampton-cove">Hampton Cove</Link>
          </div>
          <Link href="/find-office" className="ec-footer-find">Find My Office →</Link>
        </div>
      </div>

      <div className="ec-footer-bottom">
        <span>© 2026 EnviroCare Pest &amp; Termite Services LLC. All rights reserved.</span>
        <span>Licensed in Alabama · Sentricon® Certified Specialist</span>
        <div className="ec-footer-bottom-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   STYLES — existing CSS preserved + new consolidated pricing CSS
   ============================================================ */
const HOMEPAGE_CSS = `
  .ec-main {
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    color: #0E1A0F;
    background: #FEFDF8;
    min-height: 100vh;
    line-height: 1.55;
  }
  .ec-main * { box-sizing: border-box; }
  .ec-main a { color: inherit; text-decoration: none; }

  /* TOP BANNER */
  .ec-banner {
    background: linear-gradient(90deg, #0A7935 0%, #0E8E40 50%, #0A7935 100%);
    color: #fff;
    padding: 8px 16px;
    font-size: 13px;
    overflow: hidden;
  }
  .ec-banner-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .ec-banner-sun { font-size: 14px; }
  .ec-banner-gold { color: #F5A800; font-weight: 600; }
  .ec-banner-rotator {
    position: relative;
    height: 20px;
    overflow: hidden;
    flex: 0 1 auto;
    min-width: 0;
  }
  .ec-banner-msg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    opacity: 0;
    animation: ec-banner-cycle 15s infinite;
  }
  .ec-banner-msg:nth-child(2) { animation-delay: 5s; }
  .ec-banner-msg:nth-child(3) { animation-delay: 10s; }
  @keyframes ec-banner-cycle {
    0% { opacity: 0; transform: translateY(8px); }
    4% { opacity: 1; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(0); }
    34% { opacity: 0; transform: translateY(-8px); }
    100% { opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ec-banner-msg { animation: none; }
    .ec-banner-msg:first-child { opacity: 1; position: static; }
    .ec-banner-msg:nth-child(2), .ec-banner-msg:nth-child(3) { display: none; }
  }
  @media (max-width: 720px) {
    .ec-banner-rotator { width: 100%; }
    .ec-banner-msg { font-size: 12px; }
    .ec-hero-ctas { flex-direction: column; align-items: stretch; gap: 10px; }
    .ec-hero-ctas .ec-cta-primary,
    .ec-hero-ctas .ec-cta-secondary { width: 100%; justify-content: center; }
  }
  .ec-banner-call {
    margin-left: 12px;
    background: #F5A800;
    color: #0E1A0F !important;
    padding: 7px 16px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 13px;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 2px 8px rgba(245,168,0,0.3);
    transition: background 0.15s, transform 0.15s;
    text-decoration: none;
  }
  .ec-banner-call:hover {
    background: #FFB81F;
    transform: translateY(-1px);
  }


  /* HEADER - LOGO IMAGE ONLY */
  .ec-header {
    background: #fff;
    border-bottom: 1px solid #E8E2D8;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 0 rgba(14,26,15,0.04);
    max-width: 100vw;
    overflow-x: hidden;
  }
  .ec-header-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .ec-brand {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    max-height: 72px;
  }
  .ec-brand-logo {
    height: 64px !important;
    width: auto !important;
    max-width: 240px !important;
    object-fit: contain !important;
    display: block !important;
    /* Subtle opacity fade-in only ���� no scale/zoom, protects above-the-fold LCP */
    animation: ec-logo-fade 400ms ease-out both;
  }
  @keyframes ec-logo-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  /* Skip animation for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .ec-brand-logo {
      animation: none !important;
      opacity: 1 !important;
    }
  }
  @media (max-width: 480px) {
    .ec-brand {
      max-height: 60px;
    }
    .ec-brand-logo {
      height: 52px !important;
      max-width: 200px !important;
    }
  }

  .ec-nav {
    display: none;
    gap: 28px;
    font-size: 15px;
    font-weight: 500;
  }
  .ec-nav a { color: #1A2620; transition: color 0.15s; }
  .ec-nav a:hover { color: #0E8E40; }
  .ec-nav em { font-style: italic; color: #0E8E40; }

  .ec-header-cta { display: none; align-items: center; gap: 10px; }
  .ec-header-pay {
    font-size: 14px; font-weight: 600;
    color: #5A6660 !important; padding: 8px 14px;
    border-radius: 999px; border: 1px solid #E8E2D8;
    transition: all 0.15s;
  }
  .ec-header-pay:hover { color: #0E8E40 !important; border-color: #0E8E40; }
  .ec-header-phone {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 18px; border-radius: 999px;
    border: 1.5px solid #0E8E40; color: #0E8E40 !important;
    font-weight: 700; font-size: 15px;
    transition: all 0.15s;
    min-height: 42px;
  }
  .ec-header-phone:hover {
    background: #E8F5EE;
    border-color: #0A7935;
  }
  .ec-phone-icon { font-size: 13px; }
  .ec-header-quote {
    padding: 10px 20px; background: #0E1A0F;
    color: #fff !important; border-radius: 999px;
    font-weight: 700; font-size: 14px;
    transition: background 0.15s;
  }
  .ec-header-quote:hover { background: #1A2620; }

  .ec-mobile-toggle {
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; border: 1px solid #E8E2D8;
    border-radius: 8px; width: 44px; height: 44px;
    color: #0E1A0F; cursor: pointer; transition: border-color 0.15s, background 0.15s;
  }
  .ec-mobile-toggle:hover { border-color: #0E8E40; background: #F1F5F2; }
  .ec-mobile-menu {
    display: flex; flex-direction: column; gap: 4px;
    padding: 12px 20px 20px;
    border-top: 1px solid #E8E2D8; background: #fff;
  }
  .ec-mobile-menu a {
    padding: 12px 8px; font-size: 16px; font-weight: 500;
    border-bottom: 1px solid #F1F5F2;
  }
  .ec-mobile-cta {
  margin-top: 8px; padding: 14px 20px !important;
  background: #0E8E40; color: #ffffff !important;
  border-radius: 999px; text-align: center;
  font-weight: 700 !important;
  }
  @media (min-width: 1024px) {
    .ec-nav, .ec-header-cta { display: flex; }
    .ec-mobile-toggle { display: none; }
    .ec-mobile-menu { display: none !important; }
  }

  /* HERO */
  .ec-hero {
    position: relative;
    background-image:
      linear-gradient(180deg, rgba(232,245,238,0.92) 0%, rgba(254,253,248,0.95) 60%, rgba(254,253,248,1) 100%),
      url('/family-yard.jpg');
    background-position: center 30%;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 64px 20px 0;
    overflow: hidden;
  }
  .ec-hero-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr;
    gap: 48px; position: relative; z-index: 1;
    padding-bottom: 60px;
  }
  .ec-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; background: rgba(255,255,255,0.7);
    border: 1px solid #0E8E40; border-radius: 999px;
    font-size: 11px; font-weight: 700; color: #0E8E40;
    letter-spacing: 0.08em; margin-bottom: 24px;
  }
  .ec-eyebrow-dot { color: #F5A800; font-size: 8px; }
  .ec-hero-h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(40px, 7vw, 80px); font-weight: 700;
    line-height: 1.05; margin: 0 0 24px; color: #0E1A0F;
  }
  .ec-h1-italic { font-style: italic; color: #0E8E40; font-weight: 400; }
  .ec-h1-gold { color: #F5A800; }
  .ec-hero-sub {
    font-size: 18px; line-height: 1.6; color: #5A6660;
    max-width: 520px; margin: 0 0 32px;
  }
  .ec-hero-ctas {
    display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px;
  }
  .ec-cta-primary {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 28px; background: #0E8E40;
  color: #ffffff !important; border-radius: 999px;
  font-weight: 700; font-size: 16px; transition: all 0.15s;
  box-shadow: 0 4px 12px rgba(14,142,64,0.3);
  }
  .ec-cta-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(14,142,64,0.4);
  }
  .ec-arrow { font-size: 16px; }
  .ec-cta-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 28px; background: transparent;
    color: #0E8E40 !important; border: 2px solid #0E8E40;
    border-radius: 999px; font-weight: 700; font-size: 16px;
    transition: all 0.15s;
  }
  .ec-cta-secondary:hover { background: #E8F5EE; }
  .ec-hero-trust-row {
    display: flex; flex-wrap: wrap; align-items: center;
    gap: 10px; font-size: 13px; font-weight: 600; color: #5A6660;
  }
  .ec-hero-trust-row span:first-child { color: #0E1A0F; }

  /* Hero photo column - desktop only */
  .ec-hero-visual {
    display: none;
    position: relative;
    min-height: 540px;
  }
  /* Hero family photo — fills the visual column */
  .ec-hero-photo-wrap {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(14,26,15,0.18);
  }
  .ec-hero-photo {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 30%;
    display: block;
  }
  .ec-hero-photo-tint {
    position: absolute; inset: 0;
    background: linear-gradient(
      160deg,
      rgba(14,26,15,0.08) 0%,
      rgba(14,26,15,0.22) 100%
    );
  }
  @media (min-width: 1024px) {
    .ec-hero-inner { grid-template-columns: 1fr 1fr; gap: 64px; }
    .ec-hero-visual { display: block; }
  }

  /* TRUST STRIP */
  .ec-trust {
    background: #fff;
    border-top: 1px solid #F5A800;
    border-bottom: 1px solid #F5A800;
    padding: 16px 20px;
  }
  .ec-trust-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: center;
    gap: 16px; flex-wrap: wrap; font-size: 13px;
  }
  .ec-trust-item { display: inline-flex; align-items: center; gap: 6px; color: #5A6660; }
  .ec-trust-item strong { color: #0E1A0F; }
  .ec-trust-icon { color: #F5A800; font-weight: 700; }
  .ec-trust-divider { width: 1px; height: 16px; background: #E8E2D8; }
  @media (max-width: 720px) {
    .ec-trust-divider { display: none; }
  }

  /* SECTION SHARED */
  .ec-section-inner {
    max-width: 1280px; margin: 0 auto;
    padding: clamp(48px, 8vw, 72px) 20px;
  }
  .ec-section-eyebrow {
    display: inline-block; font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; color: #0E8E40;
    padding: 6px 14px; background: #E8F5EE; border-radius: 999px;
    margin-bottom: 16px;
  }
  .ec-section-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(34px, 5vw, 56px); font-weight: 700;
    line-height: 1.1; margin: 0 0 16px; color: #0E1A0F;
  }
  .ec-section-h2 em { font-style: italic; color: #0E8E40; font-weight: 600; }
  .ec-section-sub {
    font-size: 18px; color: #5A6660; max-width: 680px;
    margin: 0 0 48px; line-height: 1.55;
  }

  /* CORE SERVICES */
  .ec-services { background: #fff; }
  .ec-services-grid {
    display: grid; grid-template-columns: 1fr; gap: 20px;
  }
  @media (min-width: 640px) { .ec-services-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-services-grid { grid-template-columns: repeat(4, 1fr); } }
  .ec-service-card {
    background: #FEFDF8; border: 1px solid #E8E2D8;
    border-radius: 16px; padding: 28px 24px;
    transition: all 0.2s; display: flex; flex-direction: column;
  }
  .ec-service-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(14,26,15,0.1);
    border-color: #0E8E40;
  }
  .ec-service-featured {
    border-color: #F5A800; background: #fff;
  }
  .ec-service-icon-wrap {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .ec-service-icon { font-size: 40px; line-height: 1; }
  .ec-service-highlight {
    font-size: 10px; font-weight: 700; color: #F5A800;
    background: #FFF8E7; padding: 4px 10px;
    border-radius: 999px; letter-spacing: 0.06em;
  }
  .ec-service-pricechip {
    display: flex; flex-direction: column; align-items: flex-end; text-align: right;
  }
  .ec-service-priceamt {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700; color: #0E8E40; font-size: 22px; line-height: 1; white-space: nowrap;
  }
  .ec-service-pricelab {
    font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
    color: #F5A800; margin-top: 3px; white-space: nowrap;
  }
  @media (max-width: 640px) {
    .ec-office-cities a, .ec-service-arrow, .ec-lake-cta { min-height: 44px; display: inline-flex; align-items: center; }
  }
  .ec-service-badge {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    color: #0E8E40; margin-bottom: 10px;
  }
  .ec-service-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px; font-weight: 700; margin: 0 0 10px; color: #0E1A0F;
  }
  .ec-service-desc {
    font-size: 14px; color: #5A6660; line-height: 1.55;
    margin: 0 0 16px; flex-grow: 1;
  }
  .ec-service-bullets {
    list-style: none; padding: 0; margin: 0 0 20px;
    font-size: 13px; color: #1A2620;
  }
  .ec-service-bullets li { padding: 4px 0; line-height: 1.4; }
  .ec-check { color: #0E8E40; font-weight: 700; }
  .ec-service-arrow {
    color: #F5A800; font-weight: 700; font-size: 14px; margin-top: auto;
  }

  /* SPECIALTY */
  .ec-specialty { background: linear-gradient(180deg, #FEFDF8 0%, #F5F1E8 100%); }
  .ec-specialty-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media (min-width: 640px) { .ec-specialty-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-specialty-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-specialty-card {
    background: #fff; border: 1px solid #E8E2D8;
    border-radius: 14px; padding: 24px; transition: all 0.2s;
  }
  .ec-specialty-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(14,26,15,0.06);
    border-color: #0E8E40;
  }
.ec-specialty-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; margin-bottom: 14px;
  border-radius: 12px; background: #F1F5F2; color: #0E8E40;
  }
  .ec-specialty-icon svg { width: 24px; height: 24px; }
  .ec-specialty-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 700; margin: 0 0 8px; color: #0E1A0F;
  }
  .ec-specialty-desc {
    font-size: 14px; color: #5A6660; line-height: 1.5; margin: 0 0 14px;
  }
  .ec-specialty-tag {
    display: inline-block; font-size: 11px; font-weight: 700;
    color: #0E8E40; letter-spacing: 0.06em;
  }

  /* OFFICES */
  .ec-offices { background: #fff; }
  .ec-offices-grid {
    display: grid; grid-template-columns: 1fr; gap: 20px;
  }
  @media (min-width: 1024px) { .ec-offices-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-office-card {
    background: #FEFDF8; border: 1px solid #E8E2D8;
    border-radius: 16px; padding: 0 24px 28px;
    text-align: center; transition: all 0.2s;
    overflow: hidden;
  }
  .ec-office-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(14,26,15,0.08);
  }
  .ec-office-featured {
    background: linear-gradient(180deg, #FFF8E7 0%, #FEFDF8 30%);
    border-color: #F5A800;
  }
  .ec-office-art {
    margin: 0 -24px 16px;
    background: #F5F1E8;
    height: 140px;
    overflow: hidden;
  }
  .ec-svg-art {
    width: 100%; height: 100%; display: block;
  }
  .ec-photo-art {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .ec-photo-art-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .ec-photo-art-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(14,142,64,0.15) 0%, rgba(245,168,0,0.10) 100%);
    pointer-events: none;
  }
  .ec-photo-art-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255,255,255,0.95);
    color: #0E1A0F;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    box-shadow: 0 2px 8px rgba(14,26,15,0.15);
  }
  .ec-office-city {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700; margin: 0 0 6px; color: #0E1A0F;
  }
  .ec-office-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    color: #0E8E40; margin-bottom: 12px;
  }
  .ec-office-addr {
    font-size: 14px; color: #1A2620;
    margin-bottom: 12px; font-weight: 500;
  }
  .ec-office-areas {
    font-size: 13px; color: #5A6660;
    margin-bottom: 20px; line-height: 1.5;
  }
  .ec-office-phone {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 20px; border: 1.5px solid #0E8E40;
    color: #0E8E40 !important; border-radius: 999px;
    font-weight: 700; font-size: 15px; margin-bottom: 10px;
    min-height: 48px;
    transition: all 0.15s;
  }
  .ec-office-phone:hover {
    background: #E8F5EE;
    border-color: #0A7935;
  }
  .ec-office-link {
    display: block; font-size: 13px; font-weight: 600; color: #F5A800 !important;
  }
  .ec-office-cities {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
    margin: 4px 0 16px;
  }
  .ec-office-city-link {
    display: inline-flex; align-items: center;
    font-size: 12.5px; font-weight: 600; color: #1A2620 !important;
    background: #F1F5F0; border: 1px solid #E2EAE2;
    padding: 7px 11px; border-radius: 8px; min-height: 36px;
    text-decoration: none; transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .ec-office-city-link:hover {
    background: #0E8E40; color: #fff !important; border-color: #0E8E40;
  }
  .ec-office-city-arrow { opacity: 0.45; margin-left: 1px; }
  .ec-office-auburn {
    font-size: 12.5px; color: #5A6660; margin: 0 0 14px; line-height: 1.4;
  }
  .ec-office-auburn a { color: #0E8E40 !important; }

  /* LAKE MARTIN FEATURE BAND — secondary to hero, restrained */
  .ec-lake { background: #07642B; overflow: hidden; }
  .ec-lake-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr;
  }
  .ec-lake-photo-wrap {
    position: relative; min-height: 220px; max-height: 300px; overflow: hidden;
  }
  .ec-lake-photo {
    width: 100%; height: 100%; min-height: 220px;
    object-fit: cover; display: block;
  }
  .ec-lake-content {
    padding: 36px clamp(20px,5vw,56px); color: #FEFDF8; align-self: center;
  }
  .ec-lake-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    color: #F5A800; margin-bottom: 10px;
  }
  .ec-lake-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.5rem,3.2vw,2.1rem); font-weight: 600; line-height: 1.15;
    margin: 0 0 12px; color: #FEFDF8;
  }
  .ec-lake-h2 em { color: #F5A800; font-style: italic; }
  .ec-lake-text {
    font-size: 15px; line-height: 1.6; color: #D8E8DC; margin: 0 0 16px; max-width: 46ch;
  }
  .ec-lake-benefits { list-style: none; margin: 0 0 20px; padding: 0; }
  .ec-lake-benefits li {
    display: flex; align-items: flex-start; gap: 8px;
    font-size: 14px; color: #EAF3EC; margin-bottom: 8px; line-height: 1.45;
  }
  .ec-lake-check { color: #F5A800; font-weight: 700; flex-shrink: 0; }
  .ec-lake-cta {
    display: inline-block; background: #F5A800; color: #0E1A0F !important;
    font-weight: 700; font-size: 14px; padding: 12px 22px; border-radius: 999px;
    text-decoration: none; transition: background 0.15s, transform 0.15s;
  }
  .ec-lake-cta:hover { background: #FFB81F; transform: translateY(-1px); }
  @media (min-width: 900px) {
    .ec-lake-inner { grid-template-columns: 1.05fr 1fr; }
    .ec-lake-photo-wrap { max-height: none; }
  }

  /* Compact Lake Martin strip — no photo, tighter padding */
  .ec-lake-compact .ec-lake-compact-inner {
    display: block;
  }
  .ec-lake-compact .ec-lake-compact-content {
    padding: 28px clamp(20px,5vw,56px);
    text-align: center;
    max-width: 720px;
    margin: 0 auto;
  }
  .ec-lake-compact .ec-lake-h2 {
    font-size: clamp(1.25rem,2.5vw,1.6rem);
    margin-bottom: 8px;
  }
  .ec-lake-compact .ec-lake-text {
    font-size: 14px;
    margin: 0 auto 14px;
    max-width: 52ch;
  }
  .ec-lake-compact .ec-lake-eyebrow {
    margin-bottom: 6px;
  }

  /* SERVICE AREAS - all 27 cities */
  .ec-areas {
    background: linear-gradient(180deg, #FEFDF8 0%, #F5F1E8 100%);
  }
  .ec-areas-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 900px) {
    .ec-areas-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .ec-areas-col {
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 16px;
    padding: 24px;
    transition: all 0.2s;
  }
  .ec-areas-col:hover {
    box-shadow: 0 8px 20px rgba(14,26,15,0.06);
    border-color: #0E8E40;
  }
  .ec-areas-featured {
    background: linear-gradient(180deg, #FFF8E7 0%, #fff 30%);
    border-color: #F5A800;
    position: relative;
  }
  .ec-areas-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #F1F5F2;
  }
  .ec-areas-icon { font-size: 36px; line-height: 1; }
  .ec-areas-office {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0E8E40;
    margin-bottom: 4px;
  }
  .ec-areas-phone {
    color: #0E1A0F !important;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Playfair Display', Georgia, serif;
  }
  .ec-areas-cities {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }
  .ec-areas-city {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #1A2620 !important;
    transition: all 0.15s;
    border: 1px solid transparent;
  }
  .ec-areas-city:hover {
    background: #E8F5EE;
    color: #0E8E40 !important;
    border-color: #0E8E40;
    transform: translateX(2px);
  }
  .ec-areas-arrow {
    color: #F5A800;
    font-weight: 700;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .ec-areas-city:hover .ec-areas-arrow { opacity: 1; }
  .ec-areas-auburn-note {
    margin-top: 16px;
    padding: 12px 14px;
    background: #FEFDF8;
    border: 1px dashed #F5A800;
    border-radius: 10px;
    font-size: 13px;
    color: #5A6660;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ec-areas-auburn-note a {
    color: #0E8E40 !important;
    text-decoration: none;
  }
  .ec-areas-auburn-note a:hover { text-decoration: underline; }
  .ec-areas-auburn-icon { font-size: 14px; }
  .ec-areas-cta {
    margin-top: 48px;
    text-align: center;
  }
  .ec-areas-cta p {
    font-size: 16px;
    color: #5A6660;
    margin: 0 0 16px;
  }

  /* HERITAGE */
  .ec-heritage {
    background: linear-gradient(180deg, #FEFDF8 0%, #E8F5EE 100%);
  }
  .ec-heritage-grid {
    display: grid; grid-template-columns: 1fr; gap: 48px;
    align-items: center;
  }
  @media (min-width: 1024px) {
    .ec-heritage-grid { grid-template-columns: 1fr 1fr; }
  }
  .ec-heritage-text p {
    font-size: 17px; line-height: 1.7;
    color: #1A2620; margin: 0 0 20px;
  }
  .ec-heritage-quote {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 26px; font-style: italic; color: #0E1A0F;
    border-left: 4px solid #F5A800; padding-left: 20px;
    margin: 32px 0; font-weight: 700;
  }
  .ec-heritage-stats {
    display: flex; gap: 32px; margin-top: 24px; flex-wrap: wrap;
  }
  .ec-h-stat-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 36px; font-weight: 700; color: #0E8E40; line-height: 1;
  }
  .ec-h-stat-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    color: #5A6660; margin-top: 4px;
  }

  /* PHOTOS */
  .ec-heritage-photos {
    position: relative;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ec-photo-frame {
    position: absolute;
    background: #fff;
    padding: 12px 12px 40px;
    box-shadow: 0 12px 30px rgba(14,26,15,0.15);
    transition: transform 0.3s;
    overflow: hidden;
  }
  .ec-photo-frame:hover { transform: scale(1.02); }
  .ec-photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .ec-photo-caption {
    position: absolute;
    bottom: 6px;
    left: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .ec-photo-caption strong {
    font-size: 13px;
    font-weight: 700;
    color: #0E1A0F;
  }
  .ec-photo-caption span {
    font-size: 11px;
    color: #5A6660;
  }
  .ec-caption-small strong { font-size: 11px; }

  .ec-heritage-link {
    display: inline-block; margin-top: 20px;
    color: #0E8E40; font-weight: 700; font-size: 15px;
    border-bottom: 2px solid transparent; transition: border-color 0.15s;
  }
  .ec-heritage-link:hover { border-color: #0E8E40; }

  .ec-photo-kevin {
    width: 260px;
    height: 340px;
    left: 0;
    top: 40px;
    transform: rotate(-3deg);
    z-index: 2;
  }
  .ec-photo-ribbon-1 {
    width: 220px;
    height: 160px;
    right: 0;
    top: 0;
    transform: rotate(4deg);
    z-index: 1;
  }
  .ec-photo-ribbon-2 {
    width: 220px;
    height: 160px;
    right: 20px;
    bottom: 0;
    transform: rotate(-2deg);
    z-index: 1;
  }

  /* Fallback styling if photos missing */
  .ec-photo-fallback {
    background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }
  .ec-photo-fallback::before {
    content: '🌻';
    font-size: 60px;
    margin-bottom: 12px;
  }
  .ec-photo-fallback .ec-photo-caption {
    position: static;
    color: #fff;
    text-align: center;
    margin-top: 12px;
  }
  .ec-photo-fallback .ec-photo-caption strong { color: #fff; }
  .ec-photo-fallback .ec-photo-caption span { color: rgba(255,255,255,0.85); }

  @media (max-width: 1023px) {
    .ec-heritage-photos {
      min-height: 360px;
    }
    .ec-photo-kevin {
      width: 200px; height: 260px;
      left: 50%;
      transform: translateX(-60%) rotate(-3deg);
    }
    .ec-photo-ribbon-1 {
      width: 170px; height: 120px;
      right: 0; top: 20px;
    }
    .ec-photo-ribbon-2 {
      width: 170px; height: 120px;
      left: 0; bottom: 0;
    }
  }
  @media (max-width: 640px) {
    .ec-heritage-photos {
      min-height: 320px;
    }
    .ec-photo-kevin {
      width: 160px; height: 210px;
    }
    .ec-photo-ribbon-1 {
      width: 140px; height: 100px;
    }
    .ec-photo-ribbon-2 {
      width: 140px; height: 100px;
    }
  }

  /* REVIEWS */
  .ec-reviews { background: #fff; }
  .ec-reviews-badge {
    display: inline-flex; align-items: center; gap: 16px;
    padding: 12px 20px; background: #FEFDF8;
    border: 1px solid #E8E2D8; border-radius: 999px;
    margin-bottom: 24px;
  }
  .ec-reviews-g { font-size: 12px; color: #5A6660; }
  .ec-reviews-rating { display: inline-flex; align-items: center; gap: 8px; }
  .ec-reviews-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px; font-weight: 700; color: #0E1A0F;
  }
  .ec-reviews-stars { color: #F5A800; font-size: 14px; letter-spacing: 1px; }
  .ec-reviews-count { font-size: 12px; color: #5A6660; }
  .ec-reviews-grid {
    display: grid; grid-template-columns: 1fr; gap: 16px;
  }
  @media (min-width: 640px) { .ec-reviews-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-reviews-grid { grid-template-columns: repeat(4, 1fr); } }
  .ec-review-card {
    position: relative; background: #FEFDF8;
    border: 1px solid #E8E2D8; border-radius: 14px;
    padding: 24px; transition: transform 0.2s;
  }
  .ec-review-card:hover { transform: translateY(-2px); }
  .ec-review-quote {
    position: absolute; top: 8px; right: 16px;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 60px; color: #F5A800; opacity: 0.3; line-height: 1;
  }
  .ec-review-stars {
    color: #F5A800; font-size: 14px;
    letter-spacing: 1px; margin-bottom: 12px;
  }
  .ec-review-text {
    font-size: 15px; line-height: 1.6;
    color: #1A2620; margin: 0 0 20px; font-style: italic;
  }
  .ec-review-author {
    display: flex; align-items: center; gap: 10px;
    padding-top: 14px; border-top: 1px solid #F1F5F2;
  }
  .ec-review-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #0E8E40, #0A7935);
    color: #fff; display: inline-flex;
    align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px;
  }
  .ec-review-name { font-size: 14px; font-weight: 700; color: #0E1A0F; }
  .ec-review-city { font-size: 12px; color: #5A6660; }
  .ec-reviews-link {
    display: inline-block; margin-top: 32px;
    font-size: 15px; font-weight: 700; color: #F5A800 !important;
  }

  /* PRICING */
  .ec-pricing { background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%); }
  .ec-pricing-grid {
    display: grid; grid-template-columns: 1fr; gap: 20px;
  }
  @media (min-width: 1024px) {
    .ec-pricing-grid { grid-template-columns: repeat(2, 1fr); align-items: start; } }
  @media (min-width: 1200px) { .ec-pricing-grid { grid-template-columns: repeat(4, 1fr); align-items: start; }
  }
  .ec-price-card {
    background: #fff; border: 1px solid #E8E2D8;
    border-radius: 20px; padding: 32px 28px;
    position: relative; display: flex; flex-direction: column;
  }
  .ec-price-featured {
    border: 2px solid #0E8E40;
    background: linear-gradient(180deg, #E8F5EE 0%, #fff 30%);
    box-shadow: 0 12px 32px rgba(14,142,64,0.12);
  }
  @media (min-width: 1024px) {
    .ec-price-featured { transform: scale(1.04); }
  }
  .ec-price-badge {
    position: absolute; top: -12px; left: 50%;
    transform: translateX(-50%); background: #F5A800;
    color: #0E1A0F; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; padding: 6px 14px;
    border-radius: 999px; white-space: nowrap;
  }
  .ec-price-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700;
    margin: 0 0 8px; color: #0E1A0F;
  }
  .ec-price-tags { display: flex; gap: 6px; margin-bottom: 12px; }
  .ec-price-tag {
    font-size: 11px; font-weight: 700;
    color: #0E8E40; background: #E8F5EE;
    padding: 4px 10px; border-radius: 999px;
  }
  .ec-price-tagline {
    font-size: 14px; color: #5A6660;
    font-style: italic; margin: 0 0 20px; line-height: 1.5;
  }
  .ec-price-row {
    display: flex; align-items: baseline;
    gap: 4px; margin-bottom: 4px;
  }
  .ec-price-dollar {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px; color: #0E8E40; font-weight: 700;
  }
  .ec-price-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 64px; font-weight: 700;
    color: #0E8E40; line-height: 1;
  }
  .ec-price-unit { font-size: 18px; color: #5A6660; font-weight: 500; }
  .ec-price-terms {
    font-size: 13px; color: #5A6660; margin-bottom: 24px;
  }
  .ec-price-bullets {
    list-style: none; padding: 0; margin: 0 0 24px; flex-grow: 1;
  }
  .ec-price-bullets li {
    padding: 6px 0; font-size: 14px;
    color: #1A2620; line-height: 1.5;
  }
  .ec-price-cta {
    display: block; padding: 14px;
    background: #FEFDF8; border: 1.5px solid #0E8E40;
    color: #0E8E40 !important; border-radius: 999px;
    font-weight: 700; text-align: center;
    transition: all 0.15s;
  }
  .ec-price-cta:hover { background: #E8F5EE; }
  .ec-price-cta-featured {
    background: #0E8E40; color: #fff !important;
    border-color: #0E8E40;
  }
  .ec-price-cta-featured:hover { background: #0A7935; }

  /* PRICING TOGGLE */
  .ec-price-toggle-wrap {
    display: flex; align-items: center; justify-content: center;
    gap: 16px; margin-bottom: 40px;
  }
  .ec-price-toggle-btn {
    background: none; border: none; cursor: pointer;
    font-size: 15px; font-weight: 600;
    color: #94A89A; padding: 6px 4px;
    font-family: 'DM Sans', system-ui, sans-serif;
    transition: color 0.2s;
  }
  .ec-price-toggle-btn.ec-toggle-active { color: #0E8E40; }
  .ec-price-toggle-track {
    width: 64px; height: 32px;
    background: #E8F5EE; border: 2px solid #0E8E40;
    border-radius: 999px; position: relative;
    cursor: pointer; flex-shrink: 0;
    transition: background 0.2s;
  }
  .ec-price-toggle-pill {
    position: absolute; top: 3px;
    width: 22px; height: 22px;
    background: #0E8E40; border-radius: 50%;
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ec-pill-left  { left: 3px; }
  .ec-pill-right { left: 35px; }

  /* fade-in when switching views */
  @keyframes ec-price-fade {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ec-pricing-fade { animation: ec-price-fade 0.22s ease both; }

  /* PER-SERVICE GRID */
  .ec-svc-price-grid {
    display: grid; grid-template-columns: 1fr; gap: 16px;
  }
  @media (min-width: 640px) { .ec-svc-price-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-svc-price-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-svc-price-card {
    background: #fff; border: 1px solid #E8E2D8;
    border-radius: 18px; padding: 24px 22px;
    display: flex; flex-direction: column;
    transition: all 0.2s;
  }
  .ec-svc-price-card:hover {
    border-color: #0E8E40;
    box-shadow: 0 8px 24px rgba(14,142,64,0.1);
    transform: translateY(-2px);
  }
  .ec-svc-price-featured {
    border: 2px solid #F5A800;
    background: linear-gradient(180deg, #FFF8E7 0%, #fff 40%);
  }
  .ec-svc-price-icon { font-size: 32px; margin-bottom: 10px; }
  .ec-svc-price-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px; font-weight: 700;
    color: #0E1A0F; margin: 0 0 10px;
  }
  .ec-svc-price-row {
    display: flex; align-items: baseline;
    gap: 3px; margin-bottom: 4px;
  }
  .ec-svc-price-dollar {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px; font-weight: 700; color: #0E8E40;
  }
  .ec-svc-price-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 42px; font-weight: 700;
    color: #0E8E40; line-height: 1;
  }
  .ec-svc-price-unit { font-size: 14px; color: #5A6660; font-weight: 500; }
  .ec-svc-price-note {
    font-size: 12px; color: #5A6660;
    margin-bottom: 16px; font-style: italic;
  }
  .ec-svc-price-bullets {
    list-style: none; padding: 0; margin: 0 0 20px; flex-grow: 1;
  }
  .ec-svc-price-bullets li {
    padding: 4px 0; font-size: 13px;
    color: #1A2620; line-height: 1.5;
  }
  .ec-svc-price-cta {
    display: block; padding: 11px;
    background: #FEFDF8; border: 1.5px solid #0E8E40;
    color: #0E8E40 !important; border-radius: 999px;
    font-weight: 700; font-size: 14px; text-align: center;
    transition: all 0.15s; margin-top: auto;
  }
  .ec-svc-price-cta:hover { background: #E8F5EE; }

  .ec-price-composite { font-family: 'Playfair Display', Georgia, serif; font-size: 17px; font-weight: 700; color: #0E1A0F; line-height: 1.45; min-height: 58px; display: flex; align-items: center; }
  .ec-price-fineprint { margin-top: 10px; font-size: 12px; color: #5A6660; text-align: center; }
  .ec-price-trust-strip { margin-top: 28px; background: #fff; border: 1px solid #F5A800; border-radius: 12px; padding: 14px 20px; font-size: 14px; color: #3D4F44; text-align: center; line-height: 1.6; }
  .ec-offers {
    display: grid; grid-template-columns: 1fr;
    gap: 12px; margin-top: 40px;
  }
  @media (min-width: 720px) { .ec-offers { grid-template-columns: repeat(3, 1fr); } }
  .ec-offer {
    padding: 20px 24px; background: #fff;
    border: 1.5px dashed #F5A800;
    border-radius: 14px; text-align: center;
  }
  .ec-offer-icon { font-size: 24px; margin-bottom: 8px; }
  .ec-offer-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px; font-weight: 700;
    color: #0E1A0F; margin-bottom: 4px;
  }
  .ec-offer-desc { font-size: 13px; color: #5A6660; }

  /* BUNDLE CTA + TRUCK */
  .ec-bundle {
    background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .ec-bundle-truck-wrap {
    position: relative;
    height: 280px;
    overflow: hidden;
  }
  .ec-bundle-truck {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .ec-bundle-truck-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg,
      rgba(14,26,15,0.0) 0%,
      rgba(14,26,15,0.4) 70%,
      rgba(14,142,64,1) 100%);
  }
  .ec-bundle-inner {
    text-align: center;
    padding-top: 40px;
  }
  .ec-bundle-truck-eyebrow {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em;
    color: #F5A800;
    margin-bottom: 12px;
  }
  .ec-bundle-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 4.5vw, 44px);
    font-weight: 700; line-height: 1.15;
    margin: 0 0 16px;
  }
  .ec-bundle-h2 em { font-style: italic; color: #F5A800; }
  .ec-bundle-truck-text {
    font-size: 17px; opacity: 0.92;
    max-width: 640px; margin: 0 auto 32px;
  }
  .ec-bundle-divider {
    width: 80px; height: 2px;
    background: #F5A800; opacity: 0.5;
    margin: 32px auto;
  }
  .ec-bundle-h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700; line-height: 1.15;
    margin: 0 0 12px;
  }
  .ec-bundle-h3 em { font-style: italic; color: #F5A800; }
  .ec-bundle-sub {
    font-size: 16px; opacity: 0.92;
    max-width: 640px; margin: 0 auto 24px;
  }
  .ec-bundle-prices {
    display: flex; flex-direction: column; gap: 8px;
    max-width: 640px; margin: 0 auto 32px;
  }
  .ec-bundle-line {
    padding: 14px 20px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px; font-size: 15px;
    display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 8px;
  }
  .ec-bundle-price {
    color: #F5A800; font-weight: 700; font-size: 18px;
  }
  .ec-bundle-ctas {
    display: flex; gap: 12px;
    justify-content: center; flex-wrap: wrap;
  }
  .ec-cta-secondary-light {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 28px; background: transparent;
    color: #fff !important;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 999px; font-weight: 700;
  }
  .ec-cta-secondary-light:hover {
    background: rgba(255,255,255,0.1);
    border-color: #fff;
  }

  /* FOOTER */
  .ec-footer {
    background: #F4F0E6; color: #3A4A3E;
    border-top: 1px solid #E4DECB;
    padding: 60px 20px 32px;
  }
  .ec-footer-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr; gap: 32px;
  }
  @media (min-width: 720px) {
    .ec-footer-inner { grid-template-columns: 2fr 1fr 1fr 1fr; }
  }
  .ec-footer-brand { display: inline-block; margin-bottom: 16px; }
  .ec-footer-logo {
    height: 48px !important; width: auto !important;
    object-fit: contain;
  }
  .ec-footer-tag {
    font-size: 14px; line-height: 1.6;
    color: #5A6660; margin: 0 0 20px;
  }
  .ec-footer-phones {
    display: flex; flex-direction: column; gap: 8px;
  }
  .ec-footer-phone {
    color: #0E8E40 !important;
    font-size: 15px; font-weight: 700;
  }
  .ec-footer-phone em {
    color: #5A6660;
    font-style: normal; font-weight: 400; font-size: 13px;
    margin-left: 6px;
  }
  .ec-footer-col h4 {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; color: #14331E;
    margin: 0 0 16px;
  }
  .ec-footer-col a {
    display: block; padding: 4px 0;
    font-size: 14px; color: #5A6660;
    transition: color 0.15s;
  }
  .ec-footer-col a:hover { color: #0E8E40; }

  /* Expanded footer service areas - 3 grouped columns */
  .ec-footer-col-areas { grid-column: span 1; }
  @media (min-width: 720px) {
    .ec-footer-col-areas {
      grid-column: span 1;
    }
  }
  .ec-footer-areas-group {
    margin-bottom: 16px;
  }
  .ec-footer-areas-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #8A9A8C;
    text-transform: uppercase;
    margin-bottom: 6px;
    border-bottom: 1px solid #E4DECB;
    padding-bottom: 4px;
  }
  .ec-footer-areas-group a {
    padding: 2px 0;
    font-size: 13px;
  }
  .ec-footer-find {
    display: inline-block !important;
    margin-top: 12px;
    padding: 9px 16px !important;
    background: #0E8E40;
    border: 1px solid #0E8E40;
    border-radius: 999px;
    color: #ffffff !important;
    font-size: 13px !important;
    font-weight: 700;
    transition: all 0.15s;
  }
  .ec-footer-find:hover {
    background: #0B7333;
    border-color: #0B7333;
    color: #ffffff !important;
  }
  .ec-footer-bottom {
    max-width: 1280px; margin: 40px auto 0;
    padding-top: 24px;
    border-top: 1px solid #E4DECB;
    display: flex; flex-wrap: wrap; gap: 16px;
    justify-content: space-between;
    font-size: 12px; color: #8A9A8C;
  }
  .ec-footer-bottom-links { display: flex; gap: 16px; }
  .ec-footer-bottom-links a { color: #8A9A8C; }
  .ec-footer-bottom-links a:hover { color: #0E8E40; }
  @media (max-width: 899px) {
    .ec-main { padding-bottom: 80px; }
  }

  /* ============================================================
     CONSOLIDATED PRICING — compact expandable list
     ============================================================ */
  .ec-cp {
    padding: 64px 20px;
    background: #fff;
  }
  .ec-cp-toggle-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  .ec-cp-toggle-label {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #9aa89c;
    user-select: none;
    transition: color 0.2s;
  }
  .ec-cp-active { color: #0E1A0F; }
  .ec-cp-toggle-bar {
    width: 52px;
    height: 28px;
    background: #cdd5ce;
    border-radius: 14px;
    position: relative;
    cursor: pointer;
    transition: background 0.3s;
  }
  .ec-cp-bar-on { background: #2d6a3e; }
  .ec-cp-toggle-dot {
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }
  .ec-cp-dot-right { transform: translateX(24px); }
  .ec-cp-toggle-note {
    text-align: center;
    font-size: 12.5px;
    color: #5b6f60;
    margin-bottom: 28px;
    font-style: italic;
    min-height: 18px;
  }

  .ec-cp-list {
    max-width: 480px;
    margin: 0 auto;
  }
  .ec-cp-item {
    background: #fff;
    border: 1.5px solid #e4e7e4;
    border-radius: 14px;
    margin-bottom: 14px;
    overflow: hidden;
    transition: box-shadow 0.2s;
    cursor: pointer;
  }
  .ec-cp-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
  .ec-cp-pop { border-color: #2d6a3e; box-shadow: 0 2px 12px rgba(45,106,62,0.1); }
  .ec-cp-item-top {
    display: flex;
    align-items: center;
    padding: 16px 18px;
    gap: 14px;
  }
  .ec-cp-dot {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    background: #2d6a3e;
    color: #fff;
  }
  .ec-cp-pop .ec-cp-dot { background: #0E1A0F; }
  .ec-cp-item-info { flex: 1; }
  .ec-cp-item-name { font-weight: 700; font-size: 18px; color: #1a2e1c; }
  .ec-cp-item-price { font-size: 15px; color: #2d6a3e; font-weight: 600; }
  .ec-cp-arrow {
    font-size: 18px;
    color: #5b6f60;
    transition: transform 0.25s;
  }
  .ec-cp-open .ec-cp-arrow { transform: rotate(180deg); }

  .ec-cp-badge {
    font-size: 9px;
    font-weight: 700;
    background: #F5A800;
    color: #0E1A0F;
    padding: 2px 8px;
    border-radius: 10px;
    margin-left: 6px;
    vertical-align: middle;
    letter-spacing: 0.04em;
  }

  .ec-cp-detail {
    padding: 0 18px 18px;
    border-top: 1px solid #eee;
    padding-top: 14px;
  }
  .ec-cp-terms {
  font-size: 13px;
  color: #8a9a8c;
    margin-bottom: 10px;
    line-height: 1.4;
  }
  .ec-cp-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 10px;
  }
  .ec-cp-bullets li {
  font-size: 15px;
  padding: 5px 0;
  color: #3a5040;
  line-height: 1.45;
    display: flex;
    gap: 7px;
  }
  .ec-cp-chk {
    color: #2d6a3e;
    font-weight: 700;
    flex-shrink: 0;
  }

  .ec-cp-addon {
    margin: 8px 0 12px;
    padding: 9px 12px;
    background: #f0f7f1;
    border: 1.5px dashed #2d6a3e;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #1a2e1c;
  }

  .ec-cp-cta {
    display: block;
    text-align: center;
    padding: 14px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
    transition: all 0.2s;
  }
  .ec-cp-cta-outline { border: 1.5px solid #2d6a3e; color: #2d6a3e; background: #fff; }
  .ec-cp-cta-outline:hover { background: #f0f7f1; }
  .ec-cp-cta-green { background: #2d6a3e; color: #fff; }
  .ec-cp-cta-green:hover { background: #245832; }
  .ec-cp-cta-gold { background: #F5A800; color: #0E1A0F; }
  .ec-cp-cta-gold:hover { background: #e09e00; }
  .ec-cp-cta-dark { background: #0E1A0F; color: #fff; }
  .ec-cp-cta-dark:hover { background: #060d06; }

  .ec-cp-fine {
    text-align: center;
    font-size: 11px;
    color: #8a9a8c;
    margin-top: 6px;
  }

  .ec-cp-divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 6px 0;
  }
  .ec-cp-divider::before,
  .ec-cp-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #d4ddd6;
  }
  .ec-cp-divider span {
    font-size: 11px;
    font-weight: 700;
    color: #2d6a3e;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .ec-cp-strip {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: #5b6f60;
    line-height: 1.55;
    padding: 14px 16px;
    background: #FEFDF8;
    border-radius: 10px;
  }
  .ec-cp-strip strong { color: #1a2e1c; }
  .ec-cp-assurance {
    text-align: center;
    margin-top: 12px;
    font-size: 12.5px;
    color: #2d6a3e;
    font-weight: 600;
  }
  .ec-cp-faq {
    text-align: center;
    margin-top: 8px;
    font-size: 12px;
    color: #5b6f60;
    font-style: italic;
  }

  /* ============================================================
     FIND YOUR OFFICE — zip finder
     ============================================================ */
  .ec-findoffice {
    padding: 56px 20px;
    background: #FEFDF8;
  }
  .ec-fo-box {
    text-align: center;
    margin-bottom: 16px;
  }
  .ec-fo-input {
    padding: 14px 20px;
    border: 1.5px solid #e4e7e4;
    border-radius: 10px;
    font-size: 16px;
    width: 180px;
    text-align: center;
    font-family: inherit;
  }
  .ec-fo-input:focus {
    outline: none;
    border-color: #2d6a3e;
    box-shadow: 0 0 0 3px rgba(45,106,62,0.1);
  }
  .ec-fo-btn {
    padding: 14px 24px;
    border-radius: 10px;
    background: #2d6a3e;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    border: none;
    cursor: pointer;
    margin-left: 8px;
    font-family: inherit;
    transition: background 0.2s;
  }
  .ec-fo-btn:hover { background: #245832; }
  .ec-fo-result {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #2d6a3e;
    margin-bottom: 16px;
  }
  .ec-fo-phones {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
  }
  .ec-fo-phones a {
    font-size: 13.5px;
    color: #5b6f60;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
  .ec-fo-phones a:hover { color: #2d6a3e; }
  @media (max-width: 480px) {
    .ec-fo-box { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .ec-fo-btn { margin-left: 0; width: 180px; }
  }

  /* ── Hero keyword subhead (added) ── */
  .ec-hero-keyword {
    font-size: clamp(15px, 2.2vw, 19px);
    font-weight: 600;
    color: #0E8E40;
    margin: -8px 0 20px;
    letter-spacing: 0.01em;
  }

  /* ── Pricing: button resets + two-block structure (added) ── */
  button.ec-cp-toggle-label {
    background: none; border: none; padding: 0;
    font-family: inherit; line-height: 1.2;
  }
  button.ec-cp-item-top {
    width: 100%; background: none; border: none;
    font: inherit; color: inherit; text-align: left; cursor: pointer;
  }
  .ec-cp-item-info {
    display: flex; flex-direction: column; align-items: flex-start; gap: 2px; min-width: 0;
  }
  .ec-cp-item-name { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }
  .ec-cp-block-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(20px, 3vw, 26px); font-weight: 700;
    color: #0E1A0F; text-align: center; margin: 8px 0 18px;
  }
  .ec-cp-block-title-2 { margin-top: 44px; }
  .ec-cp-block-sub {
    text-align: center; font-size: 14px; color: #5b6f60;
    max-width: 520px; margin: 0 auto 22px;
  }
  .ec-cp-onetime {
    max-width: 480px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px;
  }
  .ec-cp-ot-card {
    display: flex; align-items: flex-start; gap: 12px;
    background: #fff; border: 1.5px solid #e4e7e4; border-radius: 14px;
    padding: 14px 16px; transition: box-shadow 0.2s, border-color 0.2s;
  }
  .ec-cp-ot-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); border-color: #2d6a3e; }
  .ec-cp-ot-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: #F1F5F2; color: #0E8E40; flex-shrink: 0; }
  .ec-cp-ot-body { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
  .ec-cp-ot-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
  .ec-cp-ot-name { font-weight: 700; font-size: 15px; color: #1a2e1c; }
  .ec-cp-ot-desc { font-size: 12.5px; color: #5b6f60; line-height: 1.45; }
  .ec-cp-ot-price {
    font-size: 12px; font-weight: 700; color: #2d6a3e;
    white-space: nowrap; flex-shrink: 0; text-align: right;
  }

  /* ── Heritage photo wrapper for next/image fill (added) ── */
  .ec-photo-imgwrap {
    position: relative; display: block; width: 100%; height: 100%;
  }

  /* ── Find-office crawlable city links (added) ── */
  .ec-fo-areas { margin-top: 28px; text-align: center; }
  .ec-fo-areas-label {
    font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    color: #5b6f60; text-transform: uppercase; margin-bottom: 12px;
  }
  .ec-fo-areas-grid {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
  }
  .ec-fo-area-link {
    font-size: 13px; font-weight: 600; color: #1A2620 !important;
    background: #F1F5F0; border: 1px solid #E2EAE2;
    padding: 8px 12px; border-radius: 8px; min-height: 36px;
    display: inline-flex; align-items: center;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .ec-fo-area-link:hover { background: #0E8E40; color: #fff !important; border-color: #0E8E40; }

  /* ── Mobile hero cleanup (added, last so it wins the cascade) ──
     Goals: less clutter above the headline, a single call pattern on
     mobile (the sticky bottom bar), and room so that bar never covers
     hero copy. Desktop is untouched. */
  @media (max-width: 720px) {
    /* Drop the duplicate call pill in the top banner — calling lives in the sticky bar */
    .ec-banner-call { display: none; }

    /* Tighter, more premium first screen */
    .ec-hero { padding-top: 36px; }
    .ec-hero-inner { gap: 0; padding-bottom: 16px; }

    /* Tighten oversized section padding on mobile so there are no large
       empty bands between sections (hero→pricing, around the truck banner, etc.) */
    .ec-section-inner { padding-top: 40px; padding-bottom: 40px; }
    .ec-cp { padding: 36px 20px; }
    .ec-eyebrow { margin-bottom: 16px; }
    .ec-hero-h1 { font-size: clamp(34px, 8.5vw, 46px); line-height: 1.08; margin: 0 0 16px; }
    .ec-hero-keyword { font-size: 14px; margin: -4px 0 14px; }
    .ec-hero-sub { font-size: 16px; line-height: 1.55; margin: 0 0 22px; }
    .ec-hero-ctas { margin-bottom: 24px; }

    /* Single primary CTA on mobile; secondary call button is redundant with sticky bar */
    .ec-hero-ctas .ec-cta-secondary { display: none; }
    .ec-hero-ctas .ec-cta-primary { width: 100%; justify-content: center; }
  }
`;
