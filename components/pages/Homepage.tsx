'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * EnviroCare Homepage v2 — Rebuilt from PDF May 18, 2026
 *
 * Layout: Hero → Trust Strip → Core Services → Specialty Services
 *         → Three Offices → Heritage → Reviews → Pricing → Bundle CTA → Footer
 *
 * All content matches Phillip-confirmed brand facts:
 * - Real phones (main 205-649-5278, Birmingham 205-940-6360, etc.)
 * - Real pricing ($35/$67/$127 with $1M coverage on Foundation)
 * - NO bed bug, wildlife, bee/wasp standalone, rodent standalone
 * - 1958 heritage, Kevin Wedgworth, "No One Cares Like EnviroCare"
 */

export default function Homepage() {
  return (
    <main className="ec-main">
      <style dangerouslySetInnerHTML={{ __html: HOMEPAGE_CSS }} />

      <TopBanner />
      <Header />
      <Hero />
      <TrustStrip />
      <CoreServices />
      <SpecialtyServices />
      <ThreeOffices />
      <Heritage />
      <Reviews />
      <Pricing />
      <BundleCTA />
      <Footer />
    </main>
  );
}

/* ============================================================
   TOP BANNER (above header)
   ============================================================ */
function TopBanner() {
  return (
    <div className="ec-banner">
      <div className="ec-banner-inner">
        <span className="ec-banner-sun">🌻</span>
        <span className="ec-banner-gold">Family-owned since 1958</span>
        <span className="ec-banner-dot">·</span>
        <span className="ec-banner-text">Three generations of the Wedgworth family</span>
        <span className="ec-banner-dot">·</span>
        <span className="ec-banner-text">Sentricon® up to $1M coverage</span>
        <a href="tel:2056495278" className="ec-banner-call">
          Call (205) 649-5278 →
        </a>
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
            alt="EnviroCare"
            width={48}
            height={48}
            className="ec-brand-logo"
            priority
          />
          <span className="ec-brand-text">EnviroCare</span>
        </Link>

        <nav className="ec-nav" aria-label="Main navigation">
          <Link href="/services/pest-control">Services</Link>
          <Link href="/lake-martin"><em>Lake Martin</em></Link>
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
          >
            Pay Bill
          </a>
          <a href="tel:2059406360" className="ec-header-phone">
            <span className="ec-phone-icon">📞</span>
            <span>(205) 940-6360</span>
          </a>
          <Link href="/quote" className="ec-header-quote">
            Get Free Quote
          </Link>
        </div>

        <button
          className="ec-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '×' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="ec-mobile-menu">
          <Link href="/services/pest-control" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="/lake-martin" onClick={() => setMobileOpen(false)}>Lake Martin</Link>
          <Link href="/quote" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/about-us" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact</Link>
          <a
            href="https://payenvirocare.key7app.com/User/Login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            Pay Bill
          </a>
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
      <div className="ec-hero-bg" aria-hidden="true">
        <div className="ec-orb ec-orb-1"></div>
        <div className="ec-orb ec-orb-2"></div>
        <div className="ec-orb ec-orb-3"></div>
      </div>

      <div className="ec-hero-inner">
        <div className="ec-hero-content">
          <div className="ec-eyebrow">
            <span className="ec-eyebrow-dot">●</span>
            FAMILY OWNED · ALABAMA SINCE 1958
          </div>

          <h1 className="ec-hero-h1">
            Protecting Alabama Homes
            <br />
            <em className="ec-h1-italic">Three Generations</em>
            <br />
            <span className="ec-h1-gold">Strong.</span>
          </h1>

          <p className="ec-hero-sub">
            The Wedgworth family has kept Alabama homes pest-free for 68 years.
            Termites, mosquitoes, ticks — handled with the care only a family
            business delivers.
          </p>

          <div className="ec-hero-ctas">
            <Link href="/quote" className="ec-cta-primary">
              <span>Get a Free Quote</span>
              <span className="ec-arrow">→</span>
            </Link>
            <a href="tel:2059406360" className="ec-cta-secondary">
              <span>📞</span>
              <span>(205) 940-6360</span>
            </a>
          </div>

          <div className="ec-hero-stats">
            <div className="ec-stat">
              <div className="ec-stat-num">68+</div>
              <div className="ec-stat-label">YEARS IN AL</div>
            </div>
            <div className="ec-stat">
              <div className="ec-stat-num">4.9★</div>
              <div className="ec-stat-label">GOOGLE RATING</div>
            </div>
            <div className="ec-stat">
              <div className="ec-stat-num">$1M</div>
              <div className="ec-stat-label">SENTRICON® COVERAGE</div>
            </div>
            <div className="ec-stat">
              <div className="ec-stat-num">500+</div>
              <div className="ec-stat-label">VERIFIED REVIEWS</div>
            </div>
          </div>

          <div className="ec-hero-checks">
            <span>✓ Licensed &amp; Insured</span>
            <span>✓ Sentricon® Certified</span>
            <span>✓ Same-Day Available</span>
            <span>✓ Family Owned Since 1958</span>
          </div>
        </div>

        <div className="ec-hero-card-wrap">
          <div className="ec-hero-card">
            <span className="ec-hero-card-eyebrow">FREE INSPECTION</span>
            <span className="ec-hero-card-price">$0</span>
          </div>
          <div className="ec-hero-card ec-hero-card-2">
            <span className="ec-hero-card-icon">⚡</span>
            <div>
              <div className="ec-hero-card-title">Same-Day Service</div>
              <div className="ec-hero-card-sub">Call before noon — there today</div>
              <div className="ec-hero-card-tag">AVAILABLE NOW</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST STRIP
   ============================================================ */
function TrustStrip() {
  return (
    <section className="ec-trust">
      <div className="ec-trust-inner">
        <span className="ec-trust-item">
          <span className="ec-trust-icon">★</span>
          <span><strong>4.9 Google</strong> · 500+ Reviews</span>
        </span>
        <span className="ec-trust-divider"></span>
        <span className="ec-trust-item">
          <span className="ec-trust-icon">✓</span>
          Sentricon® Certified Specialist
        </span>
        <span className="ec-trust-divider"></span>
        <span className="ec-trust-item">
          <span className="ec-trust-icon">✓</span>
          Alabama Dept. of Ag. Licensed
        </span>
        <span className="ec-trust-divider"></span>
        <span className="ec-trust-item">
          <span className="ec-trust-icon">✓</span>
          AL Pest Control Association
        </span>
        <span className="ec-trust-divider"></span>
        <span className="ec-trust-item">
          <span className="ec-trust-icon">✓</span>
          3rd-Generation Wedgworth Family
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   CORE SERVICES
   ============================================================ */
function CoreServices() {
  return (
    <section className="ec-services">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">OUR CORE SERVICES</div>
        <h2 className="ec-section-h2">
          Four Pillars of <em>Total Protection</em>
        </h2>
        <p className="ec-section-sub">
          Every Alabama home needs these four. We&apos;ve perfected each over 68
          years across Birmingham, Lake Martin and Huntsville.
        </p>

        <div className="ec-services-grid">
          <ServiceCard
            badge="MOST POPULAR"
            title="Pest Control"
            description="Year-round defense against ants, roaches, spiders & 30+ pests. Bi-monthly service keeps homes pest-free."
            bullets={[
              'Interior + exterior perimeter',
              'Unlimited free re-treatments',
              '$50 off initial service',
            ]}
            href="/services/pest-control"
            cornerIcon="🛡️"
            featured
          />
          <ServiceCard
            badge="SENTRICON® CERTIFIED"
            title="Termite Control"
            description="Sentricon® Always Active™ system. Continuous protection backed by up to $1M damage warranty."
            bullets={[
              'Free full-home inspection',
              'Annual inspection included',
              'Crawlspace + dock + pier',
            ]}
            href="/services/termite-control"
            cornerIcon="🪵"
            highlight="$1M COVERAGE"
          />
          <ServiceCard
            badge="LAKE MARTIN SPECIALTY"
            title="Mosquito Control"
            description="21-day yard barrier April–October. Reclaim your deck, dock and outdoor living spaces all season."
            bullets={[
              'Up to 12 seasonal applications',
              'Pet- & kid-safe once dry',
              '50% off first application',
            ]}
            href="/services/mosquito-control"
            cornerIcon="🦟"
            highlight="21 DAYS"
          />
          <ServiceCard
            badge="PET & FAMILY SAFE"
            title="Tick Control"
            description="Targeted yard treatments to break the tick lifecycle. Critical for waterfront and wooded properties."
            bullets={[
              'Lone Star, Dog & Deer ticks',
              'Harborage-zone targeting',
              'Bundled free with mosquito',
            ]}
            href="/services/tick-control"
            cornerIcon="🐾"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  badge,
  title,
  description,
  bullets,
  href,
  cornerIcon,
  featured,
  highlight,
}: {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  cornerIcon: string;
  featured?: boolean;
  highlight?: string;
}) {
  return (
    <Link href={href} className={`ec-service-card ${featured ? 'ec-service-featured' : ''}`}>
      <div className="ec-service-icon-wrap">
        <span className="ec-service-icon">{cornerIcon}</span>
        {highlight && <span className="ec-service-highlight">{highlight}</span>}
      </div>
      <div className="ec-service-badge">{badge}</div>
      <h3 className="ec-service-title">{title}</h3>
      <p className="ec-service-desc">{description}</p>
      <ul className="ec-service-bullets">
        {bullets.map((b) => (
          <li key={b}>
            <span className="ec-check">✓</span> {b}
          </li>
        ))}
      </ul>
      <span className="ec-service-arrow">Learn more →</span>
    </Link>
  );
}

/* ============================================================
   SPECIALTY SERVICES
   ============================================================ */
function SpecialtyServices() {
  const specialty = [
    {
      icon: '🌻',
      title: 'Fire Ant Control',
      desc: 'Yard-wide elimination & mound treatment. Critical for lake homes and barefoot families.',
      tag: 'ADD-ON',
      href: '/services/fire-ant',
    },
    {
      icon: '🪲',
      title: 'Flea Control',
      desc: 'Yard barrier treatments to break the flea lifecycle. Bundles seamlessly with mosquito & tick service.',
      tag: 'PET-FRIENDLY',
      href: '/services/flea',
    },
    {
      icon: '🏠',
      title: 'Builder Pre-Treat',
      desc: "Pre-construction termite treatment for new builds. The right time to start Sentricon® protection.",
      tag: 'NEW CONSTRUCTION',
      href: '/services/builder-pre-treat',
    },
    {
      icon: '📋',
      title: 'Real Estate / WDO Letters',
      desc: 'Wood-destroying organism inspection letters for closings. Fast turnaround, lender-ready format.',
      tag: 'CLOSINGS',
      href: '/services/wdo-letters',
    },
    {
      icon: '🏗️',
      title: 'Crawlspace Service',
      desc: 'Moisture control, vapor barriers & targeted treatments for the most vulnerable part of your home.',
      tag: 'FOUNDATION CARE',
      href: '/services/crawlspace',
    },
    {
      icon: '🏢',
      title: 'Commercial Service',
      desc: 'Restaurants, offices, warehouses. Discrete scheduling & full compliance documentation.',
      tag: 'IPM & HACCP',
      href: '/services/commercial',
    },
  ];

  return (
    <section className="ec-specialty">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">SPECIALTY & ADD-ON SERVICES</div>
        <h2 className="ec-section-h2">
          Built for <em>Alabama Properties</em>
        </h2>
        <p className="ec-section-sub">
          Add any of these to your core service — one invoice, one technician,
          no juggling vendors.
        </p>

        <div className="ec-specialty-grid">
          {specialty.map((s) => (
            <Link key={s.title} href={s.href} className="ec-specialty-card">
              <span className="ec-specialty-icon">{s.icon}</span>
              <h3 className="ec-specialty-title">{s.title}</h3>
              <p className="ec-specialty-desc">{s.desc}</p>
              <span className="ec-specialty-tag">{s.tag}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   THREE OFFICES
   ============================================================ */
function ThreeOffices() {
  return (
    <section className="ec-offices">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">THREE ALABAMA OFFICES</div>
        <h2 className="ec-section-h2">
          Local Technicians, <em>Statewide Reach</em>
        </h2>
        <p className="ec-section-sub">
          Three offices across Alabama — Birmingham, Lake Martin, and Huntsville.
          Your technician is always a neighbor, never dispatched out of state.
        </p>

        <div className="ec-offices-grid">
          <OfficeCard
            icon="🏙️"
            city="Birmingham"
            label="BIRMINGHAM OFFICE"
            address="2025 Butler Rd, Alabaster, AL 35007"
            areas="Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood · Helena · Calera"
            phone="(205) 940-6360"
            phoneHref="tel:2059406360"
            link="/birmingham"
          />
          <OfficeCard
            icon="🏞️"
            city="Lake Martin"
            label="ALEXANDER CITY — EST. 1958"
            address="1785 Tallapoosa St, Alexander City, AL 35010"
            areas="Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika · Wetumpka"
            phone="(256) 234-6162"
            phoneHref="tel:2562346162"
            link="/lake-martin"
            featured
          />
          <OfficeCard
            icon="🚀"
            city="Huntsville"
            label="HUNTSVILLE OFFICE"
            address="7027 Old Madison Pike, Ste 108, Huntsville, AL 35806"
            areas="Huntsville · Madison · Athens · Decatur · Hartselle · Hampton Cove · Harvest · North Alabama"
            phone="(256) 937-7676"
            phoneHref="tel:2569377676"
            link="/huntsville"
          />
        </div>
      </div>
    </section>
  );
}

function OfficeCard({
  icon, city, label, address, areas, phone, phoneHref, link, featured,
}: {
  icon: string; city: string; label: string; address: string;
  areas: string; phone: string; phoneHref: string; link: string;
  featured?: boolean;
}) {
  return (
    <div className={`ec-office-card ${featured ? 'ec-office-featured' : ''}`}>
      <div className="ec-office-icon">{icon}</div>
      <h3 className="ec-office-city">{city}</h3>
      <div className="ec-office-label">{label}</div>
      <div className="ec-office-addr">{address}</div>
      <div className="ec-office-areas">{areas}</div>
      <a href={phoneHref} className="ec-office-phone">
        <span>📞</span> {phone}
      </a>
      <Link href={link} className="ec-office-link">View {city} →</Link>
    </div>
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
          Three Generations.{' '}
          <em>One Family.</em> One Promise.
        </h2>
        <div className="ec-heritage-grid">
          <div className="ec-heritage-text">
            <p>
              In <strong>1958, Phillip M. Wedgworth</strong> started EnviroCare
              with one truck and one belief — that families deserved an Alabama
              pest control company that actually answers the phone and stands
              behind the work.
            </p>
            <p>
              Sixty-eight years later, his grandsons{' '}
              <strong>Phillip, Kevin, and Lex Wedgworth</strong> run the company.
              Three Alabama offices. Same family. Same answer to your pest
              problem.
            </p>
            <blockquote className="ec-heritage-quote">
              &ldquo;No One Cares Like EnviroCare.&rdquo;
            </blockquote>
            <div className="ec-heritage-stats">
              <div className="ec-h-stat">
                <div className="ec-h-stat-num">1958</div>
                <div className="ec-h-stat-label">FOUNDED</div>
              </div>
              <div className="ec-h-stat">
                <div className="ec-h-stat-num">3</div>
                <div className="ec-h-stat-label">GENERATIONS</div>
              </div>
              <div className="ec-h-stat">
                <div className="ec-h-stat-num">100%</div>
                <div className="ec-h-stat-label">FAMILY OWNED</div>
              </div>
            </div>
          </div>
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
            <span className="ec-reviews-num">4.9</span>
            <span className="ec-reviews-stars">★★★★★</span>
            <span className="ec-reviews-count">· 500+ reviews</span>
          </span>
        </div>
        <div className="ec-section-eyebrow">CUSTOMER REVIEWS</div>
        <h2 className="ec-section-h2">
          What Alabama Families <em>Are Saying</em>
        </h2>
        <p className="ec-section-sub">
          Real Google reviews from real Alabama homes. Not hand-picked — this is
          what customers say every week.
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

        <Link href="/reviews" className="ec-reviews-link">
          See all 500+ reviews →
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING
   ============================================================ */
function Pricing() {
  return (
    <section className="ec-pricing">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">PLANS & PRICING</div>
        <h2 className="ec-section-h2">
          Pick Your <em>Protection Plan</em>
        </h2>
        <p className="ec-section-sub">
          Honest, straightforward pricing. No contracts, no hidden fees — pay
          monthly on ACH, cancel anytime.
        </p>

        <div className="ec-pricing-grid">
          <PriceCard
            title="Essential"
            tags={['Pest']}
            tagline="Year-round pest control for the everyday Alabama home."
            price="35"
            unit="/mo"
            terms="ACH · or $70 bi-monthly"
            bullets={[
              'Bi-monthly exterior treatment',
              '30+ common pests covered',
              'Unlimited free re-services',
              'Same-week scheduling',
              'Family- & pet-safe applications',
            ]}
            cta="Start Essential"
            href="/quote?plan=essential"
          />
          <PriceCard
            title="Foundation"
            tags={['Pest', 'Termite']}
            tagline="Pest control + Sentricon® termite protection. The right baseline for any Alabama home."
            price="67"
            unit="/mo"
            terms="ACH · one invoice, one tech"
            bullets={[
              'Everything in Essential, plus:',
              'Sentricon® Always Active™ system',
              'Annual termite inspection',
              '$1M damage repair coverage',
              'WDO inspection letter (1/yr)',
              'No drilling, no tank trucks',
            ]}
            cta="Start Foundation"
            href="/quote?plan=foundation"
            badge="MOST POPULAR"
            featured
          />
          <PriceCard
            title="Complete"
            tags={['Pest', 'Termite', 'Mosquito', 'Tick']}
            tagline="All four programs — pest, termite, mosquito & tick — under one plan."
            price="127"
            unit="/mo"
            terms="ACH · everything in one invoice"
            bullets={[
              'Everything in Foundation, plus:',
              'Mosquito barrier (Apr–Oct, every 21 days)',
              'Tick yard treatments included',
              'Flea yard treatment included',
              'Dedicated account technician',
              'Priority same-week response',
            ]}
            cta="Start Complete"
            href="/quote?plan=complete"
          />
        </div>

        <div className="ec-offers">
          <div className="ec-offer">
            <div className="ec-offer-icon">🏷️</div>
            <div className="ec-offer-title">$50 Off Initial Service</div>
            <div className="ec-offer-desc">
              New full-service program customers. Mention when calling.
            </div>
          </div>
          <div className="ec-offer">
            <div className="ec-offer-icon">✦</div>
            <div className="ec-offer-title">50% Off First Mosquito App</div>
            <div className="ec-offer-desc">
              New mosquito program customers. Mention when calling.
            </div>
          </div>
          <div className="ec-offer">
            <div className="ec-offer-icon">🔍</div>
            <div className="ec-offer-title">Free Termite Inspection</div>
            <div className="ec-offer-desc">
              No obligation. Schedule today at any AL office.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  title, tags, tagline, price, unit, terms, bullets, cta, href, badge, featured,
}: {
  title: string; tags: string[]; tagline: string; price: string; unit: string;
  terms: string; bullets: string[]; cta: string; href: string;
  badge?: string; featured?: boolean;
}) {
  return (
    <div className={`ec-price-card ${featured ? 'ec-price-featured' : ''}`}>
      {badge && <div className="ec-price-badge">{badge}</div>}
      <h3 className="ec-price-title">{title}</h3>
      <div className="ec-price-tags">
        {tags.map((t) => (
          <span key={t} className="ec-price-tag">{t}</span>
        ))}
      </div>
      <p className="ec-price-tagline">{tagline}</p>
      <div className="ec-price-row">
        <span className="ec-price-dollar">$</span>
        <span className="ec-price-num">{price}</span>
        <span className="ec-price-unit">{unit}</span>
      </div>
      <div className="ec-price-terms">{terms}</div>
      <ul className="ec-price-bullets">
        {bullets.map((b) => (
          <li key={b}><span className="ec-check">✓</span> {b}</li>
        ))}
      </ul>
      <Link href={href} className={`ec-price-cta ${featured ? 'ec-price-cta-featured' : ''}`}>
        {cta}
      </Link>
    </div>
  );
}

/* ============================================================
   BUNDLE CTA
   ============================================================ */
function BundleCTA() {
  return (
    <section className="ec-bundle">
      <div className="ec-section-inner ec-bundle-inner">
        <h2 className="ec-bundle-h2">
          🌻 One Invoice. One Tech. <em>One Trusted Team.</em>
        </h2>
        <p className="ec-bundle-sub">
          Combine Pest + Termite + Mosquito + Tick on a single plan. Same
          competitive pricing as standalone — just simpler to manage.
        </p>
        <div className="ec-bundle-prices">
          <div className="ec-bundle-line">
            Pest + Termite <span className="ec-bundle-price">$67/mo</span>
          </div>
          <div className="ec-bundle-line">
            Outdoor Bundle (Mosquito + Tick + Flea){' '}
            <span className="ec-bundle-price">$60/mo</span>
          </div>
          <div className="ec-bundle-line">
            All Four Programs <span className="ec-bundle-price">$127/mo</span>
          </div>
        </div>
        <div className="ec-bundle-ctas">
          <a href="tel:2056495278" className="ec-cta-primary">
            Call (205) 649-5278
          </a>
          <Link href="/quote" className="ec-cta-secondary-light">
            See Plans →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="ec-footer">
      <div className="ec-footer-inner">
        <div className="ec-footer-brand-col">
          <Link href="/" className="ec-footer-brand">
            <Image
              src="/logo.png"
              alt="EnviroCare"
              width={48}
              height={48}
              className="ec-footer-logo"
            />
            <span className="ec-footer-brandtext">EnviroCare</span>
          </Link>
          <p className="ec-footer-tag">
            Family-owned and operated since 1958 — now in its third generation
            of the Wedgworth family. Serving Alabama from three offices:
            Birmingham, Lake Martin, and Huntsville.
          </p>
          <div className="ec-footer-phones">
            <a href="tel:2056495278" className="ec-footer-phone">
              📞 <span>(205) 649-5278</span> — <em>Main Line</em>
            </a>
            <a href="tel:2059406360" className="ec-footer-phone">
              📞 <span>(205) 940-6360</span> — <em>Birmingham</em>
            </a>
            <a href="tel:2562346162" className="ec-footer-phone">
              📞 <span>(256) 234-6162</span> — <em>Lake Martin / Alex City</em>
            </a>
            <a href="tel:2569377676" className="ec-footer-phone">
              📞 <span>(256) 937-7676</span> — <em>Huntsville</em>
            </a>
          </div>
        </div>

        <div className="ec-footer-col">
          <h4 className="ec-footer-h4">CORE SERVICES</h4>
          <Link href="/services/pest-control">Pest Control</Link>
          <Link href="/services/termite-control">Termite Control</Link>
          <Link href="/services/mosquito-control">Mosquito Control</Link>
          <Link href="/services/tick-control">Tick Control</Link>
          <Link href="/bundle-services">Bundle &amp; Save</Link>
        </div>

        <div className="ec-footer-col">
          <h4 className="ec-footer-h4">SPECIALTY</h4>
          <Link href="/services/fire-ant">Fire Ant Control</Link>
          <Link href="/services/flea">Flea Control</Link>
          <Link href="/services/builder-pre-treat">Builder Pre-Treat</Link>
          <Link href="/services/wdo-letters">Real Estate / WDO Letters</Link>
          <Link href="/services/crawlspace">Crawlspace Service</Link>
          <Link href="/services/commercial">Commercial Service</Link>
        </div>

        <div className="ec-footer-col">
          <h4 className="ec-footer-h4">SERVICE AREAS</h4>
          <Link href="/birmingham">Birmingham, AL</Link>
          <Link href="/huntsville">Huntsville, AL</Link>
          <Link href="/auburn">Auburn, AL</Link>
          <Link href="/alexander-city">Alexander City, AL</Link>
          <Link href="/lake-martin">Lake Martin, AL</Link>
          <Link href="/mountain-brook">Mountain Brook, AL</Link>
          <Link href="/find-office">Find My Office →</Link>
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
   STYLES - all inline so this file is self-contained
   ============================================================ */
const HOMEPAGE_CSS = `
  /* ===== RESET & BASE ===== */
  .ec-main {
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    color: #0E1A0F;
    background: #FEFDF8;
    min-height: 100vh;
    line-height: 1.55;
  }
  .ec-main * { box-sizing: border-box; }
  .ec-main a { color: inherit; text-decoration: none; }

  /* ===== TOP BANNER ===== */
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
  .ec-banner-dot { opacity: 0.5; }
  .ec-banner-text { opacity: 0.92; }
  .ec-banner-call {
    margin-left: 12px;
    background: #F5A800;
    color: #0E1A0F !important;
    padding: 4px 12px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 12px;
  }
  @media (max-width: 720px) {
    .ec-banner-text:nth-of-type(2),
    .ec-banner-dot:nth-of-type(3),
    .ec-banner-dot:nth-of-type(4) { display: none; }
  }

  /* ===== HEADER ===== */
  .ec-header {
    background: #fff;
    border-bottom: 1px solid #E8E2D8;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 0 rgba(14,26,15,0.04);
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
    gap: 10px;
    flex-shrink: 0;
  }
  .ec-brand-logo {
    height: 44px !important;
    width: auto !important;
    object-fit: contain;
  }
  .ec-brand-text {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    color: #0E8E40;
    line-height: 1;
    white-space: nowrap;
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
  .ec-header-cta {
    display: none;
    align-items: center;
    gap: 10px;
  }
  .ec-header-pay {
    font-size: 14px;
    font-weight: 600;
    color: #5A6660 !important;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #E8E2D8;
    transition: all 0.15s;
  }
  .ec-header-pay:hover { color: #0E8E40 !important; border-color: #0E8E40; }
  .ec-header-phone {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    border-radius: 999px;
    border: 1.5px solid #0E8E40;
    color: #0E8E40 !important;
    font-weight: 700;
    font-size: 14px;
  }
  .ec-phone-icon { font-size: 13px; }
  .ec-header-quote {
    padding: 10px 20px;
    background: #0E1A0F;
    color: #fff !important;
    border-radius: 999px;
    font-weight: 700;
    font-size: 14px;
    transition: background 0.15s;
  }
  .ec-header-quote:hover { background: #1A2620; }
  .ec-mobile-toggle {
    background: transparent;
    border: 1px solid #E8E2D8;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    font-size: 22px;
    color: #0E1A0F;
    cursor: pointer;
  }
  .ec-mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 20px 20px;
    border-top: 1px solid #E8E2D8;
    background: #fff;
  }
  .ec-mobile-menu a {
    padding: 12px 8px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #F1F5F2;
  }
  .ec-mobile-cta {
    margin-top: 8px;
    padding: 14px 20px !important;
    background: #F5A800;
    color: #0E1A0F !important;
    border-radius: 999px;
    text-align: center;
    font-weight: 700 !important;
  }
  @media (min-width: 1024px) {
    .ec-nav, .ec-header-cta { display: flex; }
    .ec-mobile-toggle { display: none; }
    .ec-mobile-menu { display: none !important; }
  }

  /* ===== HERO ===== */
  .ec-hero {
    position: relative;
    background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%);
    padding: 64px 20px 80px;
    overflow: hidden;
  }
  .ec-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .ec-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.55;
    animation: ec-float 8s ease-in-out infinite;
  }
  .ec-orb-1 {
    width: 320px; height: 320px;
    background: #0E8E40;
    top: -80px; left: -80px;
  }
  .ec-orb-2 {
    width: 280px; height: 280px;
    background: #F5A800;
    top: 200px; right: -60px;
    animation-delay: -3s;
  }
  .ec-orb-3 {
    width: 220px; height: 220px;
    background: #0A7935;
    bottom: -80px; left: 30%;
    animation-delay: -5s;
  }
  @keyframes ec-float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }
  .ec-hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    position: relative;
    z-index: 1;
  }
  .ec-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #0E8E40;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: #0E8E40;
    letter-spacing: 0.08em;
    margin-bottom: 24px;
  }
  .ec-eyebrow-dot { color: #F5A800; font-size: 8px; }
  .ec-hero-h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(40px, 7vw, 80px);
    font-weight: 700;
    line-height: 1.05;
    margin: 0 0 24px;
    color: #0E1A0F;
  }
  .ec-h1-italic {
    font-style: italic;
    color: #0E8E40;
    font-weight: 400;
  }
  .ec-h1-gold { color: #F5A800; }
  .ec-hero-sub {
    font-size: 18px;
    line-height: 1.6;
    color: #5A6660;
    max-width: 520px;
    margin: 0 0 32px;
  }
  .ec-hero-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
  }
  .ec-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 28px;
    background: #F5A800;
    color: #0E1A0F !important;
    border-radius: 999px;
    font-weight: 700;
    font-size: 16px;
    transition: all 0.15s;
    box-shadow: 0 4px 12px rgba(245,168,0,0.3);
  }
  .ec-cta-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(245,168,0,0.4);
  }
  .ec-arrow { font-size: 16px; }
  .ec-cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 28px;
    background: transparent;
    color: #0E8E40 !important;
    border: 2px solid #0E8E40;
    border-radius: 999px;
    font-weight: 700;
    font-size: 16px;
    transition: all 0.15s;
  }
  .ec-cta-secondary:hover { background: #E8F5EE; }
  .ec-hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px;
    margin-bottom: 24px;
    max-width: 520px;
  }
  .ec-stat {
    padding: 4px 0 4px 16px;
    border-left: 3px solid #0E8E40;
  }
  .ec-stat-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    color: #0E1A0F;
  }
  .ec-stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #5A6660;
    margin-top: 2px;
  }
  .ec-hero-checks {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ec-hero-checks span {
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    color: #5A6660;
  }
  .ec-hero-card-wrap {
    display: none;
    position: relative;
  }
  .ec-hero-card {
    position: absolute;
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 14px;
    padding: 16px 20px;
    box-shadow: 0 12px 32px rgba(14,26,15,0.08);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ec-hero-card:first-child {
    top: 60%; left: 0;
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 22px;
  }
  .ec-hero-card-2 { top: 12%; right: 40px; }
  .ec-hero-card-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #5A6660;
  }
  .ec-hero-card-price {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 32px;
    font-weight: 700;
    color: #0E1A0F;
  }
  .ec-hero-card-icon {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: #E8F5EE;
    color: #0E8E40;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  .ec-hero-card-title {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 2px;
  }
  .ec-hero-card-sub { font-size: 12px; color: #5A6660; margin-bottom: 6px; }
  .ec-hero-card-tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    color: #0E8E40;
    background: #E8F5EE;
    padding: 3px 8px;
    border-radius: 999px;
    letter-spacing: 0.05em;
  }
  @media (min-width: 1024px) {
    .ec-hero-inner {
      grid-template-columns: 1fr 1fr;
      gap: 64px;
    }
    .ec-hero-card-wrap { display: block; min-height: 480px; }
  }

  /* ===== TRUST STRIP ===== */
  .ec-trust {
    background: #fff;
    border-top: 1px solid #F5A800;
    border-bottom: 1px solid #F5A800;
    padding: 16px 20px;
  }
  .ec-trust-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 13px;
  }
  .ec-trust-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #5A6660;
  }
  .ec-trust-item strong { color: #0E1A0F; }
  .ec-trust-icon { color: #F5A800; font-weight: 700; }
  .ec-trust-divider {
    width: 1px;
    height: 16px;
    background: #E8E2D8;
  }
  @media (max-width: 720px) {
    .ec-trust-divider { display: none; }
  }

  /* ===== SECTION SHARED ===== */
  .ec-section-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 20px;
  }
  .ec-section-eyebrow {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #0E8E40;
    padding: 6px 14px;
    background: #E8F5EE;
    border-radius: 999px;
    margin-bottom: 16px;
  }
  .ec-section-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(34px, 5vw, 56px);
    font-weight: 700;
    line-height: 1.1;
    margin: 0 0 16px;
    color: #0E1A0F;
  }
  .ec-section-h2 em {
    font-style: italic;
    color: #0E8E40;
    font-weight: 600;
  }
  .ec-section-sub {
    font-size: 18px;
    color: #5A6660;
    max-width: 680px;
    margin: 0 0 48px;
    line-height: 1.55;
  }

  /* ===== CORE SERVICES ===== */
  .ec-services { background: #fff; }
  .ec-services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 640px) {
    .ec-services-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .ec-services-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .ec-service-card {
    background: #FEFDF8;
    border: 1px solid #E8E2D8;
    border-radius: 16px;
    padding: 28px 24px;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .ec-service-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(14,26,15,0.1);
    border-color: #0E8E40;
  }
  .ec-service-featured {
    border-color: #F5A800;
    background: #fff;
  }
  .ec-service-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .ec-service-icon {
    font-size: 40px;
    line-height: 1;
  }
  .ec-service-highlight {
    font-size: 10px;
    font-weight: 700;
    color: #F5A800;
    background: #FFF8E7;
    padding: 4px 10px;
    border-radius: 999px;
    letter-spacing: 0.06em;
  }
  .ec-service-badge {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0E8E40;
    margin-bottom: 10px;
  }
  .ec-service-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 10px;
    color: #0E1A0F;
  }
  .ec-service-desc {
    font-size: 14px;
    color: #5A6660;
    line-height: 1.55;
    margin: 0 0 16px;
    flex-grow: 1;
  }
  .ec-service-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    font-size: 13px;
    color: #1A2620;
  }
  .ec-service-bullets li {
    padding: 4px 0;
    line-height: 1.4;
  }
  .ec-check { color: #0E8E40; font-weight: 700; }
  .ec-service-arrow {
    color: #F5A800;
    font-weight: 700;
    font-size: 14px;
    margin-top: auto;
  }

  /* ===== SPECIALTY SERVICES ===== */
  .ec-specialty {
    background: linear-gradient(180deg, #FEFDF8 0%, #F5F1E8 100%);
  }
  .ec-specialty-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media (min-width: 640px) { .ec-specialty-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-specialty-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-specialty-card {
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 14px;
    padding: 24px;
    transition: all 0.2s;
  }
  .ec-specialty-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(14,26,15,0.06);
    border-color: #0E8E40;
  }
  .ec-specialty-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 12px;
  }
  .ec-specialty-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px;
    color: #0E1A0F;
  }
  .ec-specialty-desc {
    font-size: 14px;
    color: #5A6660;
    line-height: 1.5;
    margin: 0 0 14px;
  }
  .ec-specialty-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    color: #0E8E40;
    letter-spacing: 0.06em;
  }

  /* ===== OFFICES ===== */
  .ec-offices { background: #fff; }
  .ec-offices-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 1024px) { .ec-offices-grid { grid-template-columns: repeat(3, 1fr); } }
  .ec-office-card {
    background: #FEFDF8;
    border: 1px solid #E8E2D8;
    border-radius: 16px;
    padding: 28px 24px;
    text-align: center;
    transition: all 0.2s;
  }
  .ec-office-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(14,26,15,0.08);
  }
  .ec-office-featured {
    background: linear-gradient(180deg, #FFF8E7 0%, #FEFDF8 100%);
    border-color: #F5A800;
  }
  .ec-office-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }
  .ec-office-city {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 6px;
    color: #0E1A0F;
  }
  .ec-office-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0E8E40;
    margin-bottom: 12px;
  }
  .ec-office-addr {
    font-size: 14px;
    color: #1A2620;
    margin-bottom: 12px;
    font-weight: 500;
  }
  .ec-office-areas {
    font-size: 13px;
    color: #5A6660;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  .ec-office-phone {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    border: 1.5px solid #0E8E40;
    color: #0E8E40 !important;
    border-radius: 999px;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .ec-office-link {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #F5A800 !important;
  }

  /* ===== HERITAGE ===== */
  .ec-heritage {
    background: linear-gradient(180deg, #FEFDF8 0%, #E8F5EE 100%);
  }
  .ec-heritage-grid {
    max-width: 760px;
    margin: 0 auto;
  }
  .ec-heritage-text p {
    font-size: 17px;
    line-height: 1.7;
    color: #1A2620;
    margin: 0 0 20px;
  }
  .ec-heritage-quote {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 26px;
    font-style: italic;
    color: #0E1A0F;
    border-left: 4px solid #F5A800;
    padding-left: 20px;
    margin: 32px 0;
    font-weight: 700;
  }
  .ec-heritage-stats {
    display: flex;
    gap: 32px;
    margin-top: 24px;
    flex-wrap: wrap;
  }
  .ec-h-stat-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 36px;
    font-weight: 700;
    color: #0E8E40;
    line-height: 1;
  }
  .ec-h-stat-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #5A6660;
    margin-top: 4px;
  }

  /* ===== REVIEWS ===== */
  .ec-reviews { background: #fff; }
  .ec-reviews-badge {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 12px 20px;
    background: #FEFDF8;
    border: 1px solid #E8E2D8;
    border-radius: 999px;
    margin-bottom: 24px;
  }
  .ec-reviews-g {
    font-size: 12px;
    color: #5A6660;
  }
  .ec-reviews-rating {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .ec-reviews-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px;
    font-weight: 700;
    color: #0E1A0F;
  }
  .ec-reviews-stars { color: #F5A800; font-size: 14px; letter-spacing: 1px; }
  .ec-reviews-count { font-size: 12px; color: #5A6660; }
  .ec-reviews-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media (min-width: 640px) { .ec-reviews-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-reviews-grid { grid-template-columns: repeat(4, 1fr); } }
  .ec-review-card {
    position: relative;
    background: #FEFDF8;
    border: 1px solid #E8E2D8;
    border-radius: 14px;
    padding: 24px;
    transition: transform 0.2s;
  }
  .ec-review-card:hover { transform: translateY(-2px); }
  .ec-review-quote {
    position: absolute;
    top: 8px;
    right: 16px;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 60px;
    color: #F5A800;
    opacity: 0.3;
    line-height: 1;
  }
  .ec-review-stars {
    color: #F5A800;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }
  .ec-review-text {
    font-size: 15px;
    line-height: 1.6;
    color: #1A2620;
    margin: 0 0 20px;
    font-style: italic;
  }
  .ec-review-author {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 14px;
    border-top: 1px solid #F1F5F2;
  }
  .ec-review-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0E8E40, #0A7935);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 15px;
  }
  .ec-review-name { font-size: 14px; font-weight: 700; color: #0E1A0F; }
  .ec-review-city { font-size: 12px; color: #5A6660; }
  .ec-reviews-link {
    display: inline-block;
    margin-top: 32px;
    font-size: 15px;
    font-weight: 700;
    color: #F5A800 !important;
  }

  /* ===== PRICING ===== */
  .ec-pricing { background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%); }
  .ec-pricing-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 1024px) {
    .ec-pricing-grid { grid-template-columns: repeat(3, 1fr); align-items: start; }
  }
  .ec-price-card {
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 20px;
    padding: 32px 28px;
    position: relative;
    display: flex;
    flex-direction: column;
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
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #F5A800;
    color: #0E1A0F;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 6px 14px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .ec-price-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px;
    color: #0E1A0F;
  }
  .ec-price-tags {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }
  .ec-price-tag {
    font-size: 11px;
    font-weight: 700;
    color: #0E8E40;
    background: #E8F5EE;
    padding: 4px 10px;
    border-radius: 999px;
  }
  .ec-price-tagline {
    font-size: 14px;
    color: #5A6660;
    font-style: italic;
    margin: 0 0 20px;
    line-height: 1.5;
  }
  .ec-price-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 4px;
  }
  .ec-price-dollar {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    color: #0E8E40;
    font-weight: 700;
  }
  .ec-price-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 64px;
    font-weight: 700;
    color: #0E8E40;
    line-height: 1;
  }
  .ec-price-unit {
    font-size: 18px;
    color: #5A6660;
    font-weight: 500;
  }
  .ec-price-terms {
    font-size: 13px;
    color: #5A6660;
    margin-bottom: 24px;
  }
  .ec-price-bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    flex-grow: 1;
  }
  .ec-price-bullets li {
    padding: 6px 0;
    font-size: 14px;
    color: #1A2620;
    line-height: 1.5;
  }
  .ec-price-cta {
    display: block;
    padding: 14px;
    background: #FEFDF8;
    border: 1.5px solid #0E8E40;
    color: #0E8E40 !important;
    border-radius: 999px;
    font-weight: 700;
    text-align: center;
    transition: all 0.15s;
  }
  .ec-price-cta:hover { background: #E8F5EE; }
  .ec-price-cta-featured {
    background: #0E8E40;
    color: #fff !important;
    border-color: #0E8E40;
  }
  .ec-price-cta-featured:hover {
    background: #0A7935;
  }

  .ec-offers {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 40px;
  }
  @media (min-width: 720px) { .ec-offers { grid-template-columns: repeat(3, 1fr); } }
  .ec-offer {
    padding: 20px 24px;
    background: #fff;
    border: 1.5px dashed #F5A800;
    border-radius: 14px;
    text-align: center;
  }
  .ec-offer-icon { font-size: 24px; margin-bottom: 8px; }
  .ec-offer-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #0E1A0F;
    margin-bottom: 4px;
  }
  .ec-offer-desc { font-size: 13px; color: #5A6660; }

  /* ===== BUNDLE CTA ===== */
  .ec-bundle {
    background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
    color: #fff;
  }
  .ec-bundle-inner { text-align: center; }
  .ec-bundle-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 4.5vw, 44px);
    font-weight: 700;
    line-height: 1.15;
    margin: 0 0 16px;
  }
  .ec-bundle-h2 em { font-style: italic; color: #F5A800; }
  .ec-bundle-sub {
    font-size: 17px;
    opacity: 0.92;
    max-width: 640px;
    margin: 0 auto 32px;
  }
  .ec-bundle-prices {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 640px;
    margin: 0 auto 32px;
  }
  .ec-bundle-line {
    padding: 14px 20px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ec-bundle-price {
    color: #F5A800;
    font-weight: 700;
    font-size: 18px;
  }
  .ec-bundle-ctas {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .ec-cta-secondary-light {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 28px;
    background: transparent;
    color: #fff !important;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 999px;
    font-weight: 700;
  }
  .ec-cta-secondary-light:hover {
    background: rgba(255,255,255,0.1);
    border-color: #fff;
  }

  /* ===== FOOTER ===== */
  .ec-footer {
    background: #0E1A0F;
    color: #fff;
    padding: 60px 20px 32px;
  }
  .ec-footer-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  @media (min-width: 720px) {
    .ec-footer-inner { grid-template-columns: 2fr 1fr 1fr 1fr; }
  }
  .ec-footer-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .ec-footer-logo {
    height: 44px !important;
    width: auto !important;
    object-fit: contain;
  }
  .ec-footer-brandtext {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    color: #F5A800;
  }
  .ec-footer-tag {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255,255,255,0.7);
    margin: 0 0 20px;
  }
  .ec-footer-phones {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .ec-footer-phone {
    color: #F5A800 !important;
    font-size: 14px;
    font-weight: 600;
  }
  .ec-footer-phone em {
    color: rgba(255,255,255,0.6);
    font-style: normal;
    font-weight: 400;
  }
  .ec-footer-col h4 {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #F5A800;
    margin: 0 0 16px;
  }
  .ec-footer-col a {
    display: block;
    padding: 4px 0;
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    transition: color 0.15s;
  }
  .ec-footer-col a:hover { color: #fff; }
  .ec-footer-bottom {
    max-width: 1280px;
    margin: 40px auto 0;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(255,255,255,0.5);
  }
  .ec-footer-bottom-links {
    display: flex;
    gap: 16px;
  }
  .ec-footer-bottom-links a { color: rgba(255,255,255,0.5); }
  .ec-footer-bottom-links a:hover { color: #fff; }
`;
