'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Homepage() {
  return (
    <main className="ec-main">
      <style dangerouslySetInnerHTML={{ __html: HOMEPAGE_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <CallBar />
      <OfficeStrip />
      <Header />
      <GoldOfferStrip />
      <Hero />
      <ProofRow />
      <TruckSection />
      <CoreServices />
      <Pricing />
      <Heritage />
      <NotFranchise />
      <SafetySection />
      <Reviews />
      <SpecialtyServices />
      <ThreeOffices />
      <ServiceAreas />
      <BundleCTA />
      <Footer />
    </main>
  );
}

/* ============================================================
   CALL BAR + OFFICE STRIP + GOLD OFFER STRIP
   ============================================================ */
function CallBar() {
  return (
    <div className="ec-callbar">
      <a href="tel:2056495278">
        Call or Text EnviroCare &middot; <span className="ec-callbar-num">(205) 649-5278</span>
      </a>
    </div>
  );
}

function OfficeStrip() {
  return (
    <div className="ec-offices-strip">
      <span>Birmingham</span>
      <span>Alex City / Lake Martin</span>
      <span>Huntsville</span>
    </div>
  );
}

function GoldOfferStrip() {
  return (
    <div className="ec-offer-strip">
      <b>FREE Termite Inspection</b> &mdash; no obligation
    </div>
  );
}

/* ============================================================
   HEADER - LOGO IMAGE ONLY (no duplicate wordmark text!)
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
          <a href="tel:2056495278" className="ec-header-phone">
            <span>(205) 649-5278</span>
          </a>
          <Link href="/quote" className="ec-header-quote">Get Free Quote</Link>
        </div>

        <button
          className="ec-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >{mobileOpen ? '×' : '☰'}</button>
      </div>

      {mobileOpen && (
        <div className="ec-mobile-menu">
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
          <a href="tel:2056495278" onClick={() => setMobileOpen(false)}>(205) 649-5278</a>
          <Link href="/quote" className="ec-mobile-cta" onClick={() => setMobileOpen(false)}>
            Get Free Quote →
          </Link>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO with floating info cards
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
            THE GREEN TRUCK ALABAMA TRUSTS &middot; EST. 1958
          </div>

          <h1 className="ec-hero-h1">
            Three Generations Protecting<br />
            <em className="ec-h1-italic">Alabama Homes</em><br />
            <span className="ec-h1-gold">Since 1958.</span>
          </h1>

          <p className="ec-hero-sub">
            Pest, termite &amp; mosquito protection from a third-generation Alabama
            family company &mdash; Birmingham, Alex City / Lake Martin, Huntsville &amp; Auburn.
          </p>

          <div className="ec-hero-ctas">
            <Link href="/quote" className="ec-cta-primary">
              <span>Get a Free Inspection</span><span className="ec-arrow">→</span>
            </Link>
            <a href="tel:2056495278" className="ec-cta-secondary">
              <span>Call (205) 649-5278</span>
            </a>
          </div>

          <div className="ec-hero-stats">
            <div className="ec-stat"><div className="ec-stat-num">68+</div><div className="ec-stat-label">YEARS IN AL</div></div>
            <div className="ec-stat"><div className="ec-stat-num">4.9★</div><div className="ec-stat-label">GOOGLE RATING</div></div>
            <div className="ec-stat"><div className="ec-stat-num">$1M</div><div className="ec-stat-label">SENTRICON® COVERAGE</div></div>
          </div>

          <div className="ec-hero-checks">
            <span>✓ Licensed &amp; Insured</span>
            <span>✓ Sentricon® Certified</span>
            <span>✓ Fast Scheduling</span>
            <span>✓ Family Owned Since 1958</span>
          </div>
        </div>

        {/* Hero photo + floating info cards - desktop only */}
        <div className="ec-hero-visual">
          {/* Real family photo — anchors the visual column */}
          <div className="ec-hero-photo-wrap">
            <img
              src="/hero-family.jpg"
              alt="Alabama family relaxing in pest-free backyard"
              className="ec-hero-photo"
            />
            <div className="ec-hero-photo-tint" aria-hidden="true" />
          </div>

          <div className="ec-floating-card ec-card-price">
            <div className="ec-card-eyebrow">FREE INSPECTION</div>
            <div className="ec-card-price-num">$0</div>
          </div>

          <div className="ec-floating-card ec-card-same-day">
            <div className="ec-card-icon-circle">📅</div>
            <div>
              <div className="ec-card-title">Fast Scheduling</div>
              <div className="ec-card-sub">Most visits within 48 hours</div>
              <div className="ec-card-tag">LOCAL TEAM</div>
            </div>
          </div>

          <div className="ec-floating-card ec-card-google">
            <div className="ec-card-stars">★★★★★</div>
            <div className="ec-card-google-num">4.9</div>
            <div className="ec-card-google-text">
              <strong>Google Rating</strong>
              <span>Verified Google reviews</span>
            </div>
          </div>

          {/* Decorative sunflower */}
          <div className="ec-hero-sunflower" aria-hidden="true">🌻</div>
        </div>
      </div>

      {/* Pest type strip */}
      <div className="ec-pest-strip" aria-hidden="true">
        <div className="ec-pest-strip-inner">
          <span>Cockroaches</span>
          <span>·</span>
          <span>Mosquitoes</span>
          <span>·</span>
          <span>Argentine Ants</span>
          <span>·</span>
          <span>Carpenter Ants</span>
          <span>·</span>
          <span>Spiders</span>
          <span>·</span>
          <span>Stink Bugs</span>
          <span>·</span>
          <span>Fleas &amp; Ticks</span>
          <span>·</span>
          <span>Pillbugs</span>
          <span>·</span>
          <span>Silverfish</span>
          <span>·</span>
          <span>Crickets</span>
          <span>·</span>
          <span>Fire Ants</span>
          <span>·</span>
          <span>Beetles</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROOF ROW
   ============================================================ */
function ProofRow() {
  return (
    <div className="ec-proof">
      <div className="ec-proof-cell">
        <div className="ec-proof-val">$1M</div>
        <div className="ec-proof-label">Sentricon® no-drill</div>
      </div>
      <div className="ec-proof-cell">
        <div className="ec-proof-val ec-proof-stars">4.9★</div>
        <div className="ec-proof-label">Google rating</div>
      </div>
      <div className="ec-proof-cell">
        <div className="ec-proof-val ec-proof-val-sm">Licensed</div>
        <div className="ec-proof-label">&amp; insured · since 1958</div>
      </div>
    </div>
  );
}

/* ============================================================
   TRUCK SECTION
   ============================================================ */
function TruckSection() {
  return (
    <div className="ec-truck-wrap">
      <Image
        src="/truck-mobile.webp"
        alt="EnviroCare green service truck"
        width={800}
        height={400}
        className="ec-truck-img"
        sizes="100vw"
      />
      <div className="ec-truck-cap">
        Real EnviroCare trucks. Real Alabama neighbors. A familiar local team whenever possible.
      </div>
    </div>
  );
}

/* ============================================================
   CORE SERVICES
   ============================================================ */
function CoreServices() {
  return (
    <section className="ec-services">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">OUR SERVICES</div>
        <h2 className="ec-section-h2">Four Ways We <em>Protect Your Home</em></h2>
        <p className="ec-section-sub">
          Pest, termite, mosquito, and tick protection &mdash; handled by the same
          local Alabama team that&apos;s been doing this since 1958.
        </p>
        <div className="ec-services-grid">
          <ServiceCard
            badge="MOST HOMES START HERE" title="Pest Control"
            description="30+ common pests, inside and out. Bi-monthly service with unlimited free re-service between visits."
            bullets={['Interior + exterior perimeter', 'Unlimited free re-treatments', 'Bi-monthly schedule']}
            href="/services/pest-control" cornerIcon="🛡️" featured
          />
          <ServiceCard
            badge="SENTRICON® CERTIFIED" title="Termite — Sentricon®"
            description="Up to $1M coverage with no drilling required. Year-round monitoring and annual inspection included."
            bullets={['No drilling, no tank trucks', 'Annual inspection included', 'Up to $1M damage coverage']}
            href="/services/termite-control" cornerIcon="🪵" highlight="$1M COVERAGE"
          />
          <ServiceCard
            badge="SEASONAL · MAR–NOV" title="Mosquito Barrier"
            description="Yard barrier treatment applied every 30 days, March through November. Reclaim your outdoor living spaces."
            bullets={['Every 30 days, Mar–Nov', 'Deck, yard &amp; dock coverage', 'Free re-service if needed']}
            href="/services/mosquito-control" cornerIcon="🦟" highlight="30-DAY BARRIER"
          />
          <ServiceCard
            badge="BUNDLED WITH MOSQUITO" title="Tick Protection"
            description="Targeted yard treatments to break the tick lifecycle. Critical for wooded and waterfront properties."
            bullets={['Lone Star, Dog &amp; Deer ticks', 'Harborage-zone targeting', 'Free when bundled with mosquito']}
            href="/services/tick-control" cornerIcon="🐾"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ badge, title, description, bullets, href, cornerIcon, featured, highlight }: {
  badge: string; title: string; description: string; bullets: string[];
  href: string; cornerIcon: string; featured?: boolean; highlight?: string;
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
        {bullets.map((b) => <li key={b}><span className="ec-check">✓</span> {b}</li>)}
      </ul>
      <span className="ec-service-arrow">Learn more →</span>
    </Link>
  );
}

/* ============================================================
   SPECIALTY
   ============================================================ */
function SpecialtyServices() {
  const specialty = [
    { icon: '🌻', title: 'Fire Ant Control', desc: 'Yard-wide elimination & mound treatment. Critical for lake homes and barefoot families.', tag: 'ADD-ON', href: '/services/fire-ant' },
    { icon: '🪲', title: 'Flea Control', desc: 'Yard barrier treatments to break the flea lifecycle. Bundles seamlessly with mosquito & tick service.', tag: 'ADD-ON', href: '/services/flea' },
    { icon: '🏠', title: 'Builder Pre-Treat', desc: 'Pre-construction termite treatment for new builds. The right time to start Sentricon® protection.', tag: 'NEW CONSTRUCTION', href: '/services/builder-pre-treat' },
    { icon: '📋', title: 'Real Estate / WDO Letters', desc: 'Wood-destroying organism inspection letters for closings. Fast turnaround, lender-ready format.', tag: 'CLOSINGS', href: '/services/wdo-letters' },
    { icon: '🏗️', title: 'Crawlspace Service', desc: 'Moisture control, vapor barriers & targeted treatments for the most vulnerable part of your home.', tag: 'FOUNDATION CARE', href: '/services/crawlspace' },
    { icon: '🏢', title: 'Commercial Service', desc: 'Restaurants, offices, warehouses. Discrete scheduling & full compliance documentation.', tag: 'IPM & HACCP', href: '/services/commercial' },
  ];

  return (
    <section className="ec-specialty">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">SPECIALTY & ADD-ON SERVICES</div>
        <h2 className="ec-section-h2">Built for <em>Alabama Properties</em></h2>
        <p className="ec-section-sub">
          Add any of these to your core service — one invoice, one technician, no juggling vendors.
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
   THREE OFFICES with CUSTOM SVG ART
   ============================================================ */
function ThreeOffices() {
  return (
    <section className="ec-offices">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">THREE ALABAMA OFFICES</div>
        <h2 className="ec-section-h2">Local Technicians, <em>Statewide Reach</em></h2>
        <p className="ec-section-sub">
          Three offices across Alabama — Birmingham, Lake Martin, and Huntsville.
          Your technician is always a neighbor, never dispatched out of state.
        </p>

        <div className="ec-offices-grid">
          {/* BIRMINGHAM - Vulcan Statue */}
          <OfficeCard
            art={<VulcanSVG />}
            city="Birmingham"
            label="BIRMINGHAM OFFICE"
            address="2025 Butler Rd, Alabaster, AL 35007"
            areas="Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood · Helena · Calera"
            phone="(205) 940-6360"
            phoneHref="tel:2059406360"
            link="/birmingham"
          />
          {/* LAKE MARTIN - Real Aerial Photo (replaces SVG) */}
          <OfficeCard
            art={<LakeMartinPhoto />}
            city="Alex City / Lake Martin"
            label="ALEXANDER CITY — EST. 1958"
            address="1785 Tallapoosa St, Alexander City, AL 35010"
            areas="Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika · Wetumpka"
            phone="(256) 234-6162"
            phoneHref="tel:2562346162"
            link="/lake-martin"
            featured
          />
          {/* HUNTSVILLE - Saturn V Rocket */}
          <OfficeCard
            art={<SaturnVSVG />}
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

function OfficeCard({ art, city, label, address, areas, phone, phoneHref, link, featured }: {
  art: React.ReactNode; city: string; label: string; address: string;
  areas: string; phone: string; phoneHref: string; link: string; featured?: boolean;
}) {
  return (
    <div className={`ec-office-card ${featured ? 'ec-office-featured' : ''}`}>
      <div className="ec-office-art">{art}</div>
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
   ALL 27 SERVICE AREAS - grouped by office, fully linked
   ============================================================ */
function ServiceAreas() {
  const birmingham = [
    { name: 'Birmingham', slug: 'birmingham' },
    { name: 'Hoover', slug: 'hoover' },
    { name: 'Vestavia Hills', slug: 'vestavia-hills' },
    { name: 'Mountain Brook', slug: 'mountain-brook' },
    { name: 'Homewood', slug: 'homewood' },
    { name: 'Alabaster', slug: 'alabaster' },
    { name: 'Chelsea', slug: 'chelsea' },
    { name: 'Pelham', slug: 'pelham' },
    { name: 'Helena', slug: 'helena' },
    { name: 'Calera', slug: 'calera' },
    { name: 'Trussville', slug: 'trussville' },
    { name: 'Mt Laurel', slug: 'mt-laurel' },
  ];

  const lakeMartin = [
    { name: 'Alexander City', slug: 'alexander-city' },
    { name: 'Lake Martin', slug: 'lake-martin' },
    { name: 'Dadeville', slug: 'dadeville' },
    { name: 'Eclectic', slug: 'eclectic' },
    { name: 'Auburn', slug: 'auburn' },
    { name: 'Opelika', slug: 'opelika' },
  ];

  const huntsville = [
    { name: 'Huntsville', slug: 'huntsville' },
    { name: 'Madison', slug: 'madison' },
    { name: 'Athens', slug: 'athens' },
    { name: 'Decatur', slug: 'decatur' },
    { name: 'Hartselle', slug: 'hartselle' },
    { name: 'Harvest', slug: 'harvest' },
    { name: 'Hampton Cove', slug: 'hampton-cove' },
  ];

  return (
    <section className="ec-areas">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">ALL SERVICE AREAS</div>
        <h2 className="ec-section-h2">
          27 Cities Across <em>Alabama</em>
        </h2>
        <p className="ec-section-sub">
          Whether you&apos;re in downtown Birmingham, on the lake in Dadeville, or
          near Bridge Street in Huntsville — we have a local technician for you.
          Tap your city for local pricing and fast scheduling — most visits within 48 hours.
        </p>

        <div className="ec-areas-grid">
          {/* Birmingham column */}
          <div className="ec-areas-col">
            <div className="ec-areas-head">
              <span className="ec-areas-icon">🏙️</span>
              <div>
                <div className="ec-areas-office">BIRMINGHAM OFFICE</div>
                <a href="tel:2059406360" className="ec-areas-phone">(205) 940-6360</a>
              </div>
            </div>
            <div className="ec-areas-cities">
              {birmingham.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="ec-areas-city">
                  {c.name} <span className="ec-areas-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Lake Martin column */}
          <div className="ec-areas-col ec-areas-featured">
            <div className="ec-areas-head">
              <span className="ec-areas-icon">🏞️</span>
              <div>
                <div className="ec-areas-office">ALEX CITY / LAKE MARTIN · EST. 1958</div>
                <a href="tel:2562346162" className="ec-areas-phone">(256) 234-6162</a>
              </div>
            </div>
            <div className="ec-areas-cities">
              {lakeMartin.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="ec-areas-city">
                  {c.name} <span className="ec-areas-arrow">→</span>
                </Link>
              ))}
            </div>
            <div className="ec-areas-auburn-note">
              <span className="ec-areas-auburn-icon">📞</span>
              Auburn direct line: <a href="tel:3343323321"><strong>(334) 332-3321</strong></a>
            </div>
          </div>

          {/* Huntsville column */}
          <div className="ec-areas-col">
            <div className="ec-areas-head">
              <span className="ec-areas-icon">🚀</span>
              <div>
                <div className="ec-areas-office">HUNTSVILLE OFFICE</div>
                <a href="tel:2569377676" className="ec-areas-phone">(256) 937-7676</a>
              </div>
            </div>
            <div className="ec-areas-cities">
              {huntsville.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="ec-areas-city">
                  {c.name} <span className="ec-areas-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ec-areas-cta">
          <p>Don&apos;t see your city? Type your zip to find your local office:</p>
          <Link href="/find-office" className="ec-cta-primary">
            Find My Office →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CUSTOM SVG ART for each office
   ============================================================ */
function VulcanSVG() {
  return (
    <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="ec-svg-art">
      {/* Sky */}
      <rect width="120" height="100" fill="url(#vulcanSky)" />
      <defs>
        <linearGradient id="vulcanSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8F5EE" />
          <stop offset="1" stopColor="#FEFDF8" />
        </linearGradient>
      </defs>

      {/* Red mountain (Red Mountain, AL) */}
      <path d="M 0 80 L 30 50 L 50 65 L 70 40 L 95 55 L 120 70 L 120 100 L 0 100 Z"
        fill="#0A7935" opacity="0.3" />
      <path d="M 0 85 L 25 65 L 50 75 L 75 60 L 100 70 L 120 80 L 120 100 L 0 100 Z"
        fill="#0E8E40" opacity="0.5" />

      {/* Vulcan pedestal */}
      <rect x="55" y="55" width="10" height="30" fill="#5A6660" />
      <rect x="52" y="82" width="16" height="6" fill="#0E1A0F" />

      {/* Vulcan body */}
      <circle cx="60" cy="48" r="4" fill="#5A6660" />
      <rect x="56" y="50" width="8" height="10" fill="#5A6660" />

      {/* Vulcan's raised arm + spear */}
      <line x1="60" y1="52" x2="60" y2="38" stroke="#5A6660" strokeWidth="2" strokeLinecap="round" />
      {/* The famous gold torch/spear tip */}
      <circle cx="60" cy="34" r="3" fill="#F5A800" />
      <circle cx="60" cy="32" r="2" fill="#FFE082" opacity="0.9" />

      {/* City skyline silhouettes */}
      <rect x="10" y="70" width="6" height="20" fill="#0E1A0F" opacity="0.7" />
      <rect x="18" y="74" width="5" height="16" fill="#0E1A0F" opacity="0.7" />
      <rect x="25" y="68" width="4" height="22" fill="#0E1A0F" opacity="0.7" />
      <rect x="85" y="70" width="5" height="20" fill="#0E1A0F" opacity="0.7" />
      <rect x="92" y="65" width="4" height="25" fill="#0E1A0F" opacity="0.7" />
      <rect x="98" y="72" width="6" height="18" fill="#0E1A0F" opacity="0.7" />
      <rect x="106" y="68" width="4" height="22" fill="#0E1A0F" opacity="0.7" />
    </svg>
  );
}

function LakeMartinPhoto() {
  return (
    <div className="ec-photo-art">
      <img
        src="/lake-martin-aerial.jpg"
        alt="Aerial view of Lake Martin, Alabama"
        className="ec-photo-art-img"
      />
      <div className="ec-photo-art-overlay"></div>
      <div className="ec-photo-art-badge">EST. 1958</div>
    </div>
  );
}

function LakeSVG() {
  return (
    <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="ec-svg-art">
      {/* Sky */}
      <rect width="120" height="60" fill="url(#lakeSky)" />
      <defs>
        <linearGradient id="lakeSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE082" />
          <stop offset="1" stopColor="#FEFDF8" />
        </linearGradient>
        <linearGradient id="lakeWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E8E40" stopOpacity="0.7" />
          <stop offset="1" stopColor="#0A7935" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Sun */}
      <circle cx="90" cy="25" r="10" fill="#F5A800" opacity="0.85" />
      <circle cx="90" cy="25" r="13" fill="#F5A800" opacity="0.3" />

      {/* Distant tree line */}
      <path d="M 0 55 Q 15 48 25 52 Q 40 44 55 50 Q 70 42 85 48 Q 100 45 120 50 L 120 60 L 0 60 Z"
        fill="#0A7935" opacity="0.4" />

      {/* Water */}
      <rect x="0" y="60" width="120" height="40" fill="url(#lakeWater)" />

      {/* Water ripples */}
      <line x1="10" y1="72" x2="30" y2="72" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="78" x2="75" y2="78" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <line x1="85" y1="85" x2="115" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="90" x2="50" y2="90" stroke="#fff" strokeWidth="1" opacity="0.3" />

      {/* Dock */}
      <rect x="55" y="58" width="40" height="3" fill="#7A5C3A" />
      <line x1="60" y1="61" x2="60" y2="68" stroke="#5A4226" strokeWidth="2" />
      <line x1="70" y1="61" x2="70" y2="68" stroke="#5A4226" strokeWidth="2" />
      <line x1="80" y1="61" x2="80" y2="68" stroke="#5A4226" strokeWidth="2" />
      <line x1="90" y1="61" x2="90" y2="68" stroke="#5A4226" strokeWidth="2" />

      {/* Sailboat */}
      <path d="M 25 55 L 25 38 L 38 55 Z" fill="#FFE082" />
      <line x1="25" y1="38" x2="25" y2="56" stroke="#0E1A0F" strokeWidth="1.5" />
      <path d="M 18 56 L 32 56 L 30 60 L 20 60 Z" fill="#5A4226" />
    </svg>
  );
}

function SaturnVSVG() {
  return (
    <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="ec-svg-art">
      {/* Sky gradient - launch dawn */}
      <rect width="120" height="100" fill="url(#rocketSky)" />
      <defs>
        <linearGradient id="rocketSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A2620" />
          <stop offset="0.5" stopColor="#0E8E40" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFE082" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="flames" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5A800" />
          <stop offset="0.5" stopColor="#FF6B00" />
          <stop offset="1" stopColor="#FFE082" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Stars */}
      <circle cx="20" cy="15" r="0.8" fill="#fff" />
      <circle cx="105" cy="10" r="0.8" fill="#fff" />
      <circle cx="35" cy="8" r="0.6" fill="#fff" />
      <circle cx="95" cy="25" r="0.6" fill="#fff" />
      <circle cx="15" cy="30" r="0.6" fill="#fff" />

      {/* Ground */}
      <rect x="0" y="92" width="120" height="8" fill="#0E1A0F" />

      {/* Rocket body */}
      <rect x="56" y="30" width="8" height="55" fill="#FEFDF8" />
      <rect x="56" y="30" width="8" height="3" fill="#DC2626" />
      <rect x="56" y="45" width="8" height="2" fill="#0E1A0F" />
      <rect x="56" y="60" width="8" height="2" fill="#0E1A0F" />

      {/* Rocket cone */}
      <path d="M 56 30 L 60 18 L 64 30 Z" fill="#FEFDF8" />
      <path d="M 60 18 L 60 12" stroke="#DC2626" strokeWidth="1" />

      {/* Fins */}
      <path d="M 56 75 L 50 88 L 56 85 Z" fill="#DC2626" />
      <path d="M 64 75 L 70 88 L 64 85 Z" fill="#DC2626" />

      {/* US flag on side */}
      <rect x="57" y="50" width="3" height="2" fill="#fff" />
      <rect x="57" y="50" width="1" height="1" fill="#1E3A8A" />
      <text x="58" y="58" fontSize="3" fill="#0E1A0F" fontFamily="Arial">USA</text>

      {/* Flames */}
      <path d="M 56 85 L 53 100 L 60 95 L 67 100 L 64 85 Z" fill="url(#flames)" opacity="0.9" />
      <ellipse cx="60" cy="93" rx="3" ry="6" fill="#fff" opacity="0.6" />
    </svg>
  );
}

/* ============================================================
   HERITAGE - Kevin photo + ribbon cutting photos
   ============================================================ */
function Heritage() {
  return (
    <section className="ec-heritage">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">OUR STORY</div>
        <h2 className="ec-section-h2">
          Three Generations. <em>One Family.</em> One Promise.
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
              Sixty-eight years later, his grandson{' '}
              <strong>Kevin Wedgworth</strong> runs the company.
              Three Alabama offices. Same family. Same answer to your pest problem.
            </p>
            <blockquote className="ec-heritage-quote">
              &ldquo;No One Cares Like EnviroCare.&rdquo;
            </blockquote>
            <div className="ec-heritage-stats">
              <div className="ec-h-stat"><div className="ec-h-stat-num">1958</div><div className="ec-h-stat-label">FOUNDED</div></div>
              <div className="ec-h-stat"><div className="ec-h-stat-num">3</div><div className="ec-h-stat-label">GENERATIONS</div></div>
              <div className="ec-h-stat"><div className="ec-h-stat-num">100%</div><div className="ec-h-stat-label">FAMILY OWNED</div></div>
            </div>
          </div>

          <div className="ec-heritage-photos">
            {/* Kevin Wedgworth photo - polaroid style */}
            <div className="ec-photo-frame ec-photo-kevin">
              <img
                src="/kevin.jpg"
                alt="Kevin Wedgworth, third-generation owner"
                className="ec-photo-img"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/kevin-headshot.jpg';
                }}
              />
              <div className="ec-photo-caption">
                <strong>Kevin Wedgworth</strong>
                <span>3rd-Generation Owner</span>
              </div>
            </div>

            {/* Ribbon cutting photos */}
            <div className="ec-photo-frame ec-photo-ribbon-1">
              <img
                src="/ribbon-cutting-1.jpg"
                alt="Birmingham office ribbon cutting"
                className="ec-photo-img"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('ec-photo-fallback');
                }}
              />
              <div className="ec-photo-caption ec-caption-small">
                <strong>Birmingham Office Opening</strong>
              </div>
            </div>

            <div className="ec-photo-frame ec-photo-ribbon-2">
              <img
                src="/ribbon-cutting-2.jpg"
                alt="Huntsville office ribbon cutting"
                className="ec-photo-img"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('ec-photo-fallback');
                }}
              />
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
   NOT A FRANCHISE / NOT A CALL CENTER
   ============================================================ */
function NotFranchise() {
  return (
    <section className="ec-not-franchise">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">WHY ENVIROCARE</div>
        <h2 className="ec-section-h2">Not a Franchise. <em>Not a Call Center.</em></h2>
        <ul className="ec-nf-list">
          <li>Local Alabama offices</li>
          <li>A familiar local team whenever possible</li>
          <li>Family-owned since 1958</li>
          <li>Free re-service between visits</li>
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
   SAFETY SECTION
   ============================================================ */
function SafetySection() {
  return (
    <section className="ec-safety">
      <div className="ec-section-inner">
        <p className="ec-safety-p">
          We protect homes like yours &mdash; including our own.
        </p>
        <p className="ec-safety-sub">
          EPA-registered products. Licensed Alabama technicians. Applied according to label
          directions, with any drying or re-entry instructions explained before service.
        </p>
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
          <span className="ec-reviews-stars">★★★★★</span>
          <span className="ec-reviews-num">4.9</span>
          <span className="ec-reviews-g">Verified by Google</span>
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
   PRICING — à la carte, real prices, no named tiers
   ============================================================ */
function Pricing() {
  return (
    <section className="ec-pricing">
      <div className="ec-section-inner">
        <div className="ec-section-eyebrow">PRICING</div>
        <h2 className="ec-section-h2">Simple, <em>honest pricing</em></h2>
        <p className="ec-section-sub">
          Pick what your home needs. Pay monthly by auto-draft, or per service.
        </p>

        <div className="ec-pricing-initial">
          Every plan starts with a one-time <strong>$150 initial service</strong>.
          Monthly billing begins the following month &mdash; no setup fee.
        </div>

        <div className="ec-alc-grid">
          <AlcCard
            title="Pest Control"
            desc="30+ common pests, inside &amp; out"
            price="35"
            cadence="every other month · unlimited free re-service"
            alt="or $70 per service"
            featured
            tag="Most Homes Start Here"
          />
          <AlcCard
            title="Termite — Sentricon®"
            desc="Up to $1M coverage · no drilling"
            price="32"
            cadence="year-round monitoring · annual inspection"
            alt="or $380 install + annual renewal"
          />
          <AlcCard
            title="Mosquito Barrier"
            desc="Yard treatment for mosquitoes"
            price="45"
            cadence="monthly, March–November"
          />
          <AlcCard
            title="Mosquito + Tick + Flea"
            desc="Full outdoor-living protection"
            price="60"
            cadence="seasonal · great for lake &amp; wooded lots"
          />
        </div>

        <div className="ec-alc-bundle">
          <div className="ec-alc-bundle-title">Want it all on one bill?</div>
          <div className="ec-alc-bundle-body">
            Combine any services into <strong>one monthly payment, one invoice, one technician.</strong>{' '}
            Tell us what your home needs and we&apos;ll put it together &mdash;{' '}
            call <strong>(205) 649-5278</strong> or get a free quote.
          </div>
        </div>

        <div className="ec-pricing-cta-row">
          <Link href="/quote" className="ec-cta-primary">Get a Free Quote →</Link>
        </div>
      </div>
    </section>
  );
}

function AlcCard({ title, desc, price, cadence, alt, featured, tag }: {
  title: string; desc: string; price: string; cadence: string;
  alt?: string; featured?: boolean; tag?: string;
}) {
  return (
    <div className={`ec-alc-card ${featured ? 'ec-alc-featured' : ''}`}>
      {tag && <div className="ec-alc-tag">{tag}</div>}
      <div className="ec-alc-row">
        <div>
          <div className="ec-alc-name">{title}</div>
          <div className="ec-alc-desc" dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
        <div className="ec-alc-price-wrap">
          <span className="ec-alc-price">${price}</span>
          <span className="ec-alc-per">/month</span>
        </div>
      </div>
      <div className="ec-alc-cadence">{cadence}</div>
      {alt && <div className="ec-alc-alt">{alt}</div>}
    </div>
  );
}

function PriceCard({ title, tags, tagline, price, unit, terms, bullets, cta, href, badge, featured }: {
  title: string; tags: string[]; tagline: string; price: string; unit: string;
  terms: string; bullets: string[]; cta: string; href: string;
  badge?: string; featured?: boolean;
}) {
  return (
    <div className={`ec-price-card ${featured ? 'ec-price-featured' : ''}`}>
      {badge && <div className="ec-price-badge">{badge}</div>}
      <h3 className="ec-price-title">{title}</h3>
      <div className="ec-price-tags">
        {tags.map((t) => <span key={t} className="ec-price-tag">{t}</span>)}
      </div>
      <p className="ec-price-tagline">{tagline}</p>
      <div className="ec-price-row">
        <span className="ec-price-dollar">$</span>
        <span className="ec-price-num">{price}</span>
        <span className="ec-price-unit">{unit}</span>
      </div>
      <div className="ec-price-terms">{terms}</div>
      <ul className="ec-price-bullets">
        {bullets.map((b) => <li key={b}><span className="ec-check">✓</span> {b}</li>)}
      </ul>
      <Link href={href} className={`ec-price-cta ${featured ? 'ec-price-cta-featured' : ''}`}>
        {cta}
      </Link>
    </div>
  );
}

function SvcPriceCard({ icon, title, price, unit, note, bullets, href, featured }: {
  icon: string; title: string; price: string; unit: string; note: string;
  bullets: string[]; href: string; featured?: boolean;
}) {
  return (
    <div className={`ec-svc-price-card ${featured ? 'ec-svc-price-featured' : ''}`}>
      <div className="ec-svc-price-icon">{icon}</div>
      <h3 className="ec-svc-price-title">{title}</h3>
      <div className="ec-svc-price-row">
        {price !== '0' && <span className="ec-svc-price-dollar">$</span>}
        <span className="ec-svc-price-num">{price === '0' ? 'FREE' : price}</span>
        {price !== '0' && <span className="ec-svc-price-unit">{unit}</span>}
      </div>
      <div className="ec-svc-price-note">{note}</div>
      <ul className="ec-svc-price-bullets">
        {bullets.map((b) => <li key={b}><span className="ec-check">✓</span> {b}</li>)}
      </ul>
      <Link href={href} className="ec-svc-price-cta">Get Quote →</Link>
    </div>
  );
}

/* ============================================================
   BUNDLE CTA - with truck image
   ============================================================ */
function BundleCTA() {
  return (
    <section className="ec-bundle">
      <div className="ec-bundle-truck-wrap">
        <img
          src="/truck.jpg"
          alt="EnviroCare green service truck with sunflower wrap"
          className="ec-bundle-truck"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="ec-bundle-truck-overlay"></div>
      </div>

      <div className="ec-section-inner ec-bundle-inner">
        <div className="ec-bundle-truck-eyebrow">You&apos;ll Recognize Us</div>
        <h2 className="ec-bundle-h2">
          The green truck <em>with the sunflower.</em>
        </h2>
        <p className="ec-bundle-truck-text">
          When you see it in your neighborhood, you know EnviroCare is protecting a home nearby.
          A familiar face across Alabama for over 68 years.
        </p>

        <div className="ec-bundle-divider"></div>

        <h3 className="ec-bundle-h3">
          One Invoice. One Tech. <em>One Trusted Team.</em>
        </h3>
        <p className="ec-bundle-sub">
          Combine any services into one monthly payment, one invoice. Tell us what your home needs
          and we&apos;ll put it together &mdash; no juggling vendors, no separate bills.
        </p>
        <div className="ec-bundle-ctas">
          <a href="tel:2056495278" className="ec-cta-primary">Call (205) 649-5278</a>
          <Link href="/quote" className="ec-cta-secondary-light">Get a Free Quote →</Link>
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
            <Image src="/logo.png" alt="EnviroCare" width={180} height={48} className="ec-footer-logo" />
          </Link>
          <p className="ec-footer-tag">
            Family-owned and operated since 1958 &mdash; now in its third generation
            of the Wedgworth family. Three local offices: Birmingham, Alex City / Lake Martin, and Huntsville.
            Mon&ndash;Fri 8:00&nbsp;AM&ndash;5:00&nbsp;PM &middot; Closed weekends.
          </p>
          <div className="ec-footer-phones">
            <a href="tel:2056495278" className="ec-footer-phone"><span>(205) 649-5278</span> &mdash; <em>Main · Call or Text</em></a>
            <a href="tel:2059406360" className="ec-footer-phone"><span>(205) 940-6360</span> &mdash; <em>Birmingham</em></a>
            <a href="tel:2562346162" className="ec-footer-phone"><span>(256) 234-6162</span> &mdash; <em>Alex City / Lake Martin</em></a>
            <a href="tel:2569377676" className="ec-footer-phone"><span>(256) 937-7676</span> &mdash; <em>Huntsville</em></a>
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
            <div className="ec-footer-areas-label">Alex City / Lake Martin</div>
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
            <Link href="/madison">Madison</Link>
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
   FAQ JSON-LD
   ============================================================ */
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does pest control cost with EnviroCare?',
      acceptedAnswer: { '@type': 'Answer', text: 'EnviroCare pest control is $35/month and covers 30+ pests on a bi-monthly schedule with unlimited free re-service between visits, or $70 per service. Every plan starts with a one-time $150 initial service, with monthly billing beginning the following month.' },
    },
    {
      '@type': 'Question',
      name: 'What areas of Alabama does EnviroCare serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'EnviroCare serves the Birmingham metro, the Alexander City / Lake Martin area, Huntsville and the Tennessee Valley, and Auburn. The family-owned company has been operating in Alabama since 1958 with three local offices.' },
    },
    {
      '@type': 'Question',
      name: 'Does EnviroCare use Sentricon for termite control?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. EnviroCare installs the Sentricon termite baiting system with no drilling and up to $1 million in coverage. Termite protection is $32/month, or $380 to install plus an annual renewal.' },
    },
    {
      '@type': 'Question',
      name: 'How often does EnviroCare treat for mosquitoes?',
      acceptedAnswer: { '@type': 'Answer', text: "EnviroCare's mosquito yard barrier is applied every 30 days from March through November. Mosquito service is $45/month, or $60/month bundled with tick and flea protection." },
    },
    {
      '@type': 'Question',
      name: "Are EnviroCare's pest treatments okay around children and pets?",
      acceptedAnswer: { '@type': 'Answer', text: 'EnviroCare uses EPA-registered products applied by licensed Alabama technicians according to label directions. Your technician will explain any drying time or re-entry instructions before service.' },
    },
    {
      '@type': 'Question',
      name: 'Is EnviroCare a national franchise?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. EnviroCare is a third-generation, family-owned Alabama company founded in 1958. Calls reach local offices rather than a national call center, and customers get a familiar local team whenever possible.' },
    },
  ],
};

/* ============================================================
   STYLES
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
    /* Zoom-in entrance animation: 1.6x → 1x over 1.2s */
    animation: ec-logo-zoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    transform-origin: left center;
  }
  @keyframes ec-logo-zoom {
    0% {
      transform: scale(1.6);
      opacity: 0;
      filter: blur(2px);
    }
    50% {
      opacity: 1;
      filter: blur(1px);
    }
    100% {
      transform: scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }
  /* Skip animation for users who prefer reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .ec-brand-logo {
      animation: none !important;
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
    /* Smaller zoom on mobile so it doesn't feel jarring */
    @keyframes ec-logo-zoom {
      0% {
        transform: scale(1.6);
        opacity: 0;
        filter: blur(2px);
      }
      100% {
        transform: scale(1);
        opacity: 1;
        filter: blur(0);
      }
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
    padding: 9px 16px; border-radius: 999px;
    border: 1.5px solid #0E8E40; color: #0E8E40 !important;
    font-weight: 700; font-size: 14px;
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
    background: transparent; border: 1px solid #E8E2D8;
    border-radius: 8px; width: 40px; height: 40px;
    font-size: 22px; color: #0E1A0F; cursor: pointer;
  }
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
    background: #F5A800; color: #0E1A0F !important;
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
  .ec-hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .ec-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); opacity: 0.55;
    animation: ec-float 8s ease-in-out infinite;
  }
  .ec-orb-1 { width: 320px; height: 320px; background: #0E8E40; top: -80px; left: -80px; }
  .ec-orb-2 { width: 280px; height: 280px; background: #F5A800; top: 200px; right: -60px; animation-delay: -3s; }
  .ec-orb-3 { width: 220px; height: 220px; background: #0A7935; bottom: -80px; left: 30%; animation-delay: -5s; }
  @keyframes ec-float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
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
    padding: 16px 28px; background: #F5A800;
    color: #0E1A0F !important; border-radius: 999px;
    font-weight: 700; font-size: 16px; transition: all 0.15s;
    box-shadow: 0 4px 12px rgba(245,168,0,0.3);
  }
  .ec-cta-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(245,168,0,0.4);
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
  .ec-hero-stats {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 12px 24px; margin-bottom: 24px; max-width: 520px;
  }
  .ec-stat {
    padding: 4px 0 4px 16px; border-left: 3px solid #0E8E40;
  }
  .ec-stat-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700; line-height: 1; color: #0E1A0F;
  }
  .ec-stat-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
    color: #5A6660; margin-top: 2px;
  }
  .ec-hero-checks { display: flex; flex-wrap: wrap; gap: 6px; }
  .ec-hero-checks span {
    padding: 6px 12px; background: #fff;
    border: 1px solid #E8E2D8; border-radius: 999px;
    font-size: 12px; font-weight: 500; color: #5A6660;
  }

  /* Floating cards - desktop only */
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
  .ec-floating-card {
    position: absolute;
    background: #fff;
    border: 1px solid #E8E2D8;
    border-radius: 16px;
    padding: 18px 22px;
    box-shadow: 0 12px 32px rgba(14,26,15,0.1);
    display: flex; align-items: center; gap: 12px;
    z-index: 2;
  }
  .ec-card-price {
    top: 60%; left: 20px;
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 26px;
  }
  .ec-card-eyebrow {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; color: #5A6660;
  }
  .ec-card-price-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 44px; font-weight: 700; color: #0E1A0F;
    line-height: 1;
  }
  .ec-card-same-day {
    top: 8%; right: 20px;
  }
  .ec-card-icon-circle {
    width: 40px; height: 40px; border-radius: 50%;
    background: #E8F5EE; color: #0E8E40;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .ec-card-title { font-weight: 700; font-size: 14px; margin-bottom: 2px; }
  .ec-card-sub { font-size: 12px; color: #5A6660; margin-bottom: 6px; }
  .ec-card-tag {
    display: inline-block; font-size: 10px; font-weight: 700;
    color: #0E8E40; background: #E8F5EE;
    padding: 3px 8px; border-radius: 999px; letter-spacing: 0.05em;
  }
  .ec-card-google {
    top: 32%; left: 40%;
    flex-direction: column; align-items: center;
    padding: 14px 18px; gap: 4px;
  }
  .ec-card-stars { color: #F5A800; font-size: 14px; letter-spacing: 1px; }
  .ec-card-google-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px; font-weight: 700; color: #0E1A0F; line-height: 1;
  }
  .ec-card-google-text {
    display: flex; flex-direction: column; align-items: center;
    font-size: 11px; color: #5A6660;
  }
  .ec-card-google-text strong { color: #0E1A0F; font-size: 12px; }

  .ec-hero-sunflower {
    position: absolute;
    bottom: 0; right: 80px;
    font-size: 200px;
    opacity: 0.08;
    pointer-events: none;
    transform: rotate(-15deg);
  }

  @media (min-width: 1024px) {
    .ec-hero-inner { grid-template-columns: 1fr 1fr; gap: 64px; }
    .ec-hero-visual { display: block; }
  }

  /* PEST STRIP */
  .ec-pest-strip {
    border-top: 1px solid #E8E2D8;
    background: #fff;
    padding: 12px 0;
    overflow: hidden;
    position: relative;
  }
  .ec-pest-strip-inner {
    display: flex;
    gap: 24px;
    font-size: 13px;
    color: #94A89A;
    white-space: nowrap;
    animation: ec-marquee 40s linear infinite;
    padding-left: 100%;
  }
  @keyframes ec-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  .ec-pest-strip-inner span:nth-child(even) {
    color: #F5A800; font-weight: 700;
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
    padding: 80px 20px;
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
    font-size: 32px; display: block; margin-bottom: 12px;
  }
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
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 18px; border: 1.5px solid #0E8E40;
    color: #0E8E40 !important; border-radius: 999px;
    font-weight: 700; font-size: 14px; margin-bottom: 10px;
  }
  .ec-office-link {
    display: block; font-size: 13px; font-weight: 600; color: #F5A800 !important;
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
    .ec-pricing-grid { grid-template-columns: repeat(3, 1fr); align-items: start; }
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
    background: #0E1A0F; color: #fff;
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
    height: 44px !important; width: auto !important;
    object-fit: contain; filter: brightness(1.1);
  }
  .ec-footer-tag {
    font-size: 14px; line-height: 1.6;
    color: rgba(255,255,255,0.7); margin: 0 0 20px;
  }
  .ec-footer-phones {
    display: flex; flex-direction: column; gap: 6px;
  }
  .ec-footer-phone {
    color: #F5A800 !important;
    font-size: 14px; font-weight: 600;
  }
  .ec-footer-phone em {
    color: rgba(255,255,255,0.6);
    font-style: normal; font-weight: 400;
  }
  .ec-footer-col h4 {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; color: #F5A800;
    margin: 0 0 16px;
  }
  .ec-footer-col a {
    display: block; padding: 4px 0;
    font-size: 14px; color: rgba(255,255,255,0.7);
    transition: color 0.15s;
  }
  .ec-footer-col a:hover { color: #fff; }

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
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 4px;
  }
  .ec-footer-areas-group a {
    padding: 2px 0;
    font-size: 13px;
  }
  .ec-footer-find {
    display: inline-block !important;
    margin-top: 12px;
    padding: 8px 14px !important;
    background: rgba(245,168,0,0.15);
    border: 1px solid #F5A800;
    border-radius: 999px;
    color: #F5A800 !important;
    font-size: 13px !important;
    font-weight: 700;
    transition: all 0.15s;
  }
  .ec-footer-find:hover {
    background: #F5A800;
    color: #0E1A0F !important;
  }
  .ec-footer-bottom {
    max-width: 1280px; margin: 40px auto 0;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex; flex-wrap: wrap; gap: 16px;
    justify-content: space-between;
    font-size: 12px; color: rgba(255,255,255,0.5);
  }
  .ec-footer-bottom-links { display: flex; gap: 16px; }
  .ec-footer-bottom-links a { color: rgba(255,255,255,0.5); }
  .ec-footer-bottom-links a:hover { color: #fff; }

  /* CALL BAR */
  .ec-callbar {
    background: #07642B; color: #fff;
    text-align: center; padding: 9px 14px;
    font-size: 13px; font-weight: 600; letter-spacing: .01em;
  }
  .ec-callbar a { color: #fff; text-decoration: none; }
  .ec-callbar-num { color: #F5A800; font-weight: 800; font-size: 15px; letter-spacing: .02em; }

  /* OFFICE STRIP */
  .ec-offices-strip {
    background: #0A7935; color: rgba(255,255,255,.92);
    display: flex; justify-content: center;
    font-size: 11px; font-weight: 600; letter-spacing: .03em; text-transform: uppercase;
  }
  .ec-offices-strip span {
    padding: 6px 10px; border-right: 1px solid rgba(255,255,255,.18);
  }
  .ec-offices-strip span:last-child { border-right: none; }

  /* GOLD OFFER STRIP */
  .ec-offer-strip {
    background: #F5A800; color: #0E1A0F;
    display: flex; align-items: center; justify-content: center;
    padding: 9px 14px; font-weight: 700; font-size: 13px; letter-spacing: .02em;
    gap: 6px;
  }

  /* PROOF ROW */
  .ec-proof {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    background: #0E1A0F;
  }
  .ec-proof-cell {
    padding: 14px 8px; text-align: center;
    border-right: 1px solid rgba(255,255,255,.10);
  }
  .ec-proof-cell:last-child { border-right: none; }
  .ec-proof-val {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700; color: #F5A800; font-size: 20px; line-height: 1;
  }
  .ec-proof-stars { font-size: 16px; letter-spacing: 1px; }
  .ec-proof-val-sm { font-size: 16px; }
  .ec-proof-label {
    color: rgba(255,255,255,.72); font-size: 10.5px;
    font-weight: 600; letter-spacing: .02em; margin-top: 5px; line-height: 1.25;
  }

  /* TRUCK SECTION */
  .ec-truck-wrap { position: relative; background: #07642B; }
  .ec-truck-img { width: 100%; display: block; }
  .ec-truck-cap {
    position: absolute; left: 0; right: 0; bottom: 0;
    background: linear-gradient(transparent, rgba(7,40,18,.85));
    color: #fff; padding: 24px 16px 12px;
    font-size: 12.5px; font-weight: 600; letter-spacing: .02em;
  }

  /* À LA CARTE PRICING */
  .ec-pricing-initial {
    background: rgba(245,168,0,.12); border: 1px solid #F5A800;
    border-radius: 12px; padding: 12px 16px;
    font-size: 13px; color: #7a5800; font-weight: 600;
    margin-bottom: 24px; line-height: 1.4;
  }
  .ec-alc-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
  @media (min-width: 640px) { .ec-alc-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ec-alc-grid { grid-template-columns: repeat(4, 1fr); } }
  .ec-alc-card {
    background: #fff; border: 1px solid #E8E2D8;
    border-radius: 16px; padding: 18px 16px; position: relative;
  }
  .ec-alc-featured { border: 2px solid #F5A800; box-shadow: 0 10px 26px rgba(245,168,0,.16); }
  .ec-alc-tag {
    position: absolute; top: -10px; left: 16px;
    background: #F5A800; color: #0E1A0F;
    font-size: 10px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase;
    padding: 4px 11px; border-radius: 20px;
  }
  .ec-alc-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .ec-alc-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700; font-size: 17px;
  }
  .ec-alc-desc { font-size: 11.5px; color: #6b7065; margin-top: 2px; }
  .ec-alc-price-wrap { text-align: right; flex-shrink: 0; }
  .ec-alc-price {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 26px; color: #0E8E40; font-weight: 700; line-height: 1;
  }
  .ec-alc-featured .ec-alc-price { color: #07642B; }
  .ec-alc-per { font-size: 11.5px; color: #6b7065; display: block; margin-top: 1px; }
  .ec-alc-cadence {
    margin-top: 10px; padding-top: 9px;
    border-top: 1px dashed rgba(14,26,15,.10);
    font-size: 11px; color: #5e6359;
  }
  .ec-alc-alt { font-size: 11px; color: #9a6b00; font-weight: 700; margin-top: 6px; }
  .ec-alc-bundle {
    background: #0E1A0F; color: #fff;
    border-radius: 14px; padding: 18px 20px; margin-top: 12px;
  }
  .ec-alc-bundle-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 17px; font-weight: 700; margin-bottom: 6px;
  }
  .ec-alc-bundle-body { font-size: 13px; color: rgba(255,255,255,.75); line-height: 1.55; }
  .ec-alc-bundle-body strong { color: #F5A800; }
  .ec-pricing-cta-row { text-align: center; margin-top: 32px; }

  /* NOT A FRANCHISE */
  .ec-not-franchise { background: #fff; }
  .ec-nf-list {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: 1fr; gap: 12px;
    max-width: 560px;
  }
  @media (min-width: 640px) { .ec-nf-list { grid-template-columns: repeat(2, 1fr); } }
  .ec-nf-list li {
    padding: 14px 18px; background: #E8F5EE;
    border-left: 4px solid #0E8E40; border-radius: 0 8px 8px 0;
    font-size: 15px; font-weight: 600; color: #0E1A0F;
  }

  /* SAFETY SECTION */
  .ec-safety { background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%); }
  .ec-safety-p {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(20px, 3vw, 28px); font-weight: 700;
    color: #0E1A0F; margin: 0 0 12px; line-height: 1.3;
  }
  .ec-safety-sub {
    font-size: 16px; color: #5A6660; line-height: 1.6;
    max-width: 640px; margin: 0;
  }
`;
