"use client";

/**
 * EnviroCare Homepage v2
 * Generated from envirocare-FINAL-v2.html (May 16, 2026)
 * Design DNA preserved from yesterday's approved mockup.
 * Content corrected per real pricing, real services, real brand tokens.
 *
 * Drop in: components/pages/Homepage.tsx
 * Requires in /public: logo.png, truck.jpg, kevin-headshot.jpg,
 *                     ribbon-cutting-1.jpg, ribbon-cutting-2.jpg
 */

import { useEffect } from 'react';

export default function Homepage() {
  // Load Google Fonts once on mount
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const links = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap' },
    ];
    const els: HTMLLinkElement[] = [];
    links.forEach((cfg) => {
      if (document.head.querySelector(`link[href="${cfg.href}"]`)) return;
      const el = document.createElement('link');
      Object.entries(cfg).forEach(([k, v]) => {
        if (k === 'crossOrigin') el.crossOrigin = v as string;
        else el.setAttribute(k, v as string);
      });
      document.head.appendChild(el);
      els.push(el);
    });
    return () => { els.forEach((el) => el.remove()); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOMEPAGE_CSS }} />


{/* ANN BAR */}
<div className="ann">
  🌻 <strong>Family-owned since 1958</strong> · Three generations of the Wedgworth family · Sentricon® up to $1M coverage
  <a href="tel:2056495278">Call (205) 649-5278 →</a>
</div>

{/* NAV */}
<nav>
  <div className="nav-inner">
    <div className="logo-wrap">
      <img id="ec-logo" src="/logo.png" alt="EnviroCare Pest & Termite Services"/>
    </div>
    <ul className="nav-links">
      <li><a href="#services" className="active">Services</a></li>
      <li><a href="#locations">Locations</a></li>
      <li><a href="#plans">Plans &amp; Pricing</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div className="nav-right">
      <a href="tel:2059406360" className="nav-phone">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 11.7a19.79 19.79 0 01-3.07-8.67A2 2 0 013.82 1h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        (205) 940-6360
      </a>
      <a href="#plans" className="nav-cta">Get Free Quote</a>
    </div>
  </div>
</nav>

{/* HERO */}
<section className="hero">
  <div className="hero-wash"></div>
  <div className="orb orb-a"></div>
  <div className="orb orb-b"></div>
  <div className="hero-inner">
    <div>
      <div className="eyebrow-pill">
        <span className="dot-wrap"><span className="dot-ring"></span><span className="dot-core"></span></span>
        <span className="eyebrow-txt">Family Owned · Alabama Since 1958</span>
      </div>
      <h1>Protecting Alabama Homes<em>Three Generations</em><span className="gd">Strong.</span></h1>
      <p className="hero-sub">The Wedgworth family has kept Alabama homes pest-free for 68 years. Termites, mosquitoes, ticks — handled with the care only a family business delivers.</p>
      <div className="cta-row">
        <a href="#plans" className="btn-gold">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Get a Free Quote
        </a>
        <a href="tel:2059406360" className="btn-green">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 11.7a19.79 19.79 0 01-3.07-8.67A2 2 0 013.82 1h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          (205) 940-6360
        </a>
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-n">68+</div><div className="stat-l">Years in AL</div></div>
        <div className="stat"><div className="stat-n">4.9★</div><div className="stat-l">Google Rating</div></div>
        <div className="stat"><div className="stat-n">$1M</div><div className="stat-l">Sentricon® Coverage</div></div>
        <div className="stat"><div className="stat-n">500+</div><div className="stat-l">Verified Reviews</div></div>
      </div>
      <div className="badges">
        <div className="badge"><span className="ck">✓</span> Licensed &amp; Insured</div>
        <div className="badge"><span className="ck">✓</span> Sentricon® Certified</div>
        <div className="badge"><span className="ck">✓</span> Same-Day Available</div>
        <div className="badge"><span className="ck">✓</span> Family Owned Since 1958</div>
      </div>
    </div>

    <div className="visual">
      <div className="img-frame">
        <img src="/truck.jpg" alt="EnviroCare green Ford Maverick service truck — protecting Alabama homes since 1958" loading="eager" decoding="async" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',borderRadius:'var(--r)'}}/>
        <div className="img-fade"></div>
      </div>

      <div className="gc gc-rating">
        <div>
          <div className="gc-stars"><span className="gc-star">★</span><span className="gc-star">★</span><span className="gc-star">★</span><span className="gc-star">★</span><span className="gc-star">★</span></div>
          <div className="gc-rc">500+ verified reviews</div>
        </div>
        <div><div className="gc-rn">4.9</div><div className="gc-rl">Google Rating</div></div>
      </div>
      <div className="gc gc-svc">
        <div className="gc-row">
          <div className="gc-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
          <div><div className="gc-st">Same-Day Service</div><div className="gc-ss">Call before noon — there today</div></div>
        </div>
        <div className="gc-avail"><span className="gc-dot"></span> Available Now</div>
      </div>
      <div className="gc gc-est">
        <span className="gc-est-label">Free Inspection</span>
        <span className="gc-est-val">$0</span>
      </div>
    </div>
  </div>
</section>

{/* TRUST STRIP */}
<div className="trust">
  <div className="trust-inner">
    <div className="ti"><div className="ti-chk">★</div>4.9 Google · 500+ Reviews</div>
    <div className="ti"><div className="ti-chk">✓</div>Sentricon® Certified Specialist</div>
    <div className="ti"><div className="ti-chk">✓</div>Alabama Dept. of Ag. Licensed</div>
    <div className="ti"><div className="ti-chk">✓</div>AL Pest Control Association</div>
    <div className="ti"><div className="ti-chk">✓</div>3rd-Generation Wedgworth Family</div>
  </div>
</div>

{/* MARQUEE */}
<div className="mq">
  <div className="mq-track">
    <div className="mq-item"><strong>Termites</strong></div><div className="mq-item"><strong>Fire Ants</strong></div><div className="mq-item"><strong>Cockroaches</strong></div><div className="mq-item"><strong>Mosquitoes</strong></div><div className="mq-item"><strong>Argentine Ants</strong></div><div className="mq-item"><strong>Carpenter Ants</strong></div><div className="mq-item"><strong>Spiders</strong></div><div className="mq-item"><strong>Stink Bugs</strong></div><div className="mq-item"><strong>Fleas &amp; Ticks</strong></div><div className="mq-item"><strong>Pillbugs</strong></div><div className="mq-item"><strong>Silverfish</strong></div><div className="mq-item"><strong>Subterranean Termites</strong></div><div className="mq-item"><strong>Centipedes</strong></div><div className="mq-item"><strong>Earwigs</strong></div>
    <div className="mq-item"><strong>Termites</strong></div><div className="mq-item"><strong>Fire Ants</strong></div><div className="mq-item"><strong>Cockroaches</strong></div><div className="mq-item"><strong>Mosquitoes</strong></div><div className="mq-item"><strong>Argentine Ants</strong></div><div className="mq-item"><strong>Carpenter Ants</strong></div><div className="mq-item"><strong>Spiders</strong></div><div className="mq-item"><strong>Stink Bugs</strong></div><div className="mq-item"><strong>Fleas &amp; Ticks</strong></div><div className="mq-item"><strong>Pillbugs</strong></div><div className="mq-item"><strong>Silverfish</strong></div><div className="mq-item"><strong>Subterranean Termites</strong></div><div className="mq-item"><strong>Centipedes</strong></div><div className="mq-item"><strong>Earwigs</strong></div>
  </div>
</div>

{/* CORE PROGRAMS — 4 PILLARS */}
<section className="programs" id="programs">
  <div className="container">
    <div className="section-eyebrow">Our Core Services</div>
    <h2 className="section-title">Four Pillars of <span>Total Protection</span></h2>
    <p className="section-sub">Every Alabama home needs these four. We've perfected each over 68 years across Birmingham, Lake Martin and Huntsville.</p>

    <div className="prog-grid">

      {/* 1. PEST */}
      <div className="prog-card">
        <div className="prog-art prog-art-1">
          <div className="prog-art-grid"></div>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="pestG" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff" stop-opacity="0.18"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
            <circle cx="100" cy="100" r="80" fill="url(#pestG)"/>
            <path d="M100 30 L155 50 L155 100 Q155 150 100 175 Q45 150 45 100 L45 50 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(134,239,172,.6)" stroke-width="2"/>
            <path d="M75 105 L100 80 L125 105 L125 140 L75 140 Z" fill="#fff" opacity="0.95"/>
            <rect x="92" y="115" width="16" height="25" fill="#15803D"/>
            <g transform="translate(100,160)" opacity="0.95">
              <circle r="14" fill="none" stroke="#EAB308" stroke-width="2.5"/>
              <line x1="-10" y1="-10" x2="10" y2="10" stroke="#EAB308" stroke-width="2.5"/>
            </g>
          </svg>
        </div>
        <div className="prog-body">
          <span style={{display:'inline-block',background:'rgba(255,255,255,.12)',color:'#fff',fontSize:'9px',fontWeight:'700',padding:'3px 9px',borderRadius:'20px',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:'.6rem'}}>Most Popular</span>
          <div className="prog-name">Pest Control</div>
          <div className="prog-desc">Year-round defense against ants, roaches, spiders &amp; 30+ pests. Bi-monthly service keeps homes pest-free.</div>
          <ul className="prog-features">
            <li><span className="prog-chk">✓</span>Interior + exterior perimeter</li>
            <li><span className="prog-chk">✓</span>Unlimited free re-treatments</li>
            <li><span className="prog-chk">✓</span>$50 off initial service</li>
          </ul>
          <a href="#plans" className="prog-link">Learn more →</a>
        </div>
      </div>

      {/* 2. TERMITE (FEATURED) */}
      <div className="prog-card featured">
        <div className="prog-badge">$1M Coverage</div>
        <div className="prog-art prog-art-2">
          <div className="prog-art-grid"></div>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="termG" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff" stop-opacity="0.2"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
            <circle cx="100" cy="100" r="80" fill="url(#termG)"/>
            <rect x="35" y="125" width="130" height="40" fill="#fff" opacity="0.12" rx="3"/>
            <path d="M65 125 L100 90 L135 125 L135 140 L65 140 Z" fill="#fff" opacity="0.95"/>
            <rect x="92" y="115" width="16" height="25" fill="#0F5C2E"/>
            <g fill="#86EFAC">
              <circle cx="50" cy="160" r="4"/>
              <circle cx="80" cy="165" r="4"/>
              <circle cx="120" cy="165" r="4"/>
              <circle cx="150" cy="160" r="4"/>
            </g>
            <path d="M55 90 Q100 50 145 90" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="3 4" opacity="0.7"/>
            <g transform="translate(100,55)">
              <circle r="18" fill="#EAB308" stroke="#fff" stroke-width="2"/>
              <text y="5" text-anchor="middle" font-family="Playfair Display,serif" font-size="13" font-weight="900" fill="#0A1A0E">$1M</text>
            </g>
          </svg>
        </div>
        <div className="prog-body">
          <span style={{display:'inline-block',background:'rgba(234,179,8,.25)',color:'#FEF3C7',fontSize:'9px',fontWeight:'700',padding:'3px 9px',borderRadius:'20px',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:'.6rem'}}>Sentricon® Certified</span>
          <div className="prog-name">Termite Control</div>
          <div className="prog-desc">Sentricon® Always Active™ system. Continuous protection backed by up to $1M damage warranty.</div>
          <ul className="prog-features">
            <li><span className="prog-chk">✓</span>Free full-home inspection</li>
            <li><span className="prog-chk">✓</span>Annual inspection included</li>
            <li><span className="prog-chk">✓</span>Crawlspace + dock + pier</li>
          </ul>
          <a href="#plans" className="prog-link">Learn more →</a>
        </div>
      </div>

      {/* 3. MOSQUITO */}
      <div className="prog-card">
        <div className="prog-art prog-art-3">
          <div className="prog-art-grid"></div>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="mosqG" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff" stop-opacity="0.2"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
            <circle cx="100" cy="100" r="80" fill="url(#mosqG)"/>
            <ellipse cx="100" cy="135" rx="65" ry="12" fill="#fff" opacity="0.2"/>
            <rect x="62" y="115" width="6" height="22" fill="#fff" opacity="0.9"/>
            <circle cx="65" cy="108" r="14" fill="#fff" opacity="0.9"/>
            <rect x="132" y="118" width="5" height="20" fill="#fff" opacity="0.9"/>
            <circle cx="134.5" cy="112" r="11" fill="#fff" opacity="0.9"/>
            <path d="M40 135 Q100 60 160 135" fill="none" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4 4" opacity="0.85"/>
            <path d="M50 135 Q100 78 150 135" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.5"/>
            <g transform="translate(100,55)">
              <circle r="20" fill="#EAB308" stroke="#fff" stroke-width="2"/>
              <text y="-2" text-anchor="middle" font-family="Playfair Display,serif" font-size="13" font-weight="900" fill="#0A1A0E">21</text>
              <text y="10" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7" font-weight="700" fill="#0A1A0E">DAYS</text>
            </g>
          </svg>
        </div>
        <div className="prog-body">
          <span style={{display:'inline-block',background:'rgba(255,255,255,.12)',color:'#fff',fontSize:'9px',fontWeight:'700',padding:'3px 9px',borderRadius:'20px',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:'.6rem'}}>Lake Martin Specialty</span>
          <div className="prog-name">Mosquito Control</div>
          <div className="prog-desc">21-day yard barrier April–October. Reclaim your deck, dock and outdoor living spaces all season.</div>
          <ul className="prog-features">
            <li><span className="prog-chk">✓</span>Up to 12 seasonal applications</li>
            <li><span className="prog-chk">✓</span>Pet- &amp; kid-safe once dry</li>
            <li><span className="prog-chk">✓</span>50% off first application</li>
          </ul>
          <a href="#plans" className="prog-link">Learn more →</a>
        </div>
      </div>

      {/* 4. TICK */}
      <div className="prog-card">
        <div className="prog-art prog-art-4">
          <div className="prog-art-grid"></div>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="tickG" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff" stop-opacity="0.2"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
            <circle cx="100" cy="100" r="80" fill="url(#tickG)"/>
            {/* grass blades */}
            <g stroke="#fff" stroke-width="2" fill="none" opacity="0.85" stroke-linecap="round">
              <path d="M50 165 Q52 130 55 100"/>
              <path d="M75 165 Q78 125 82 90"/>
              <path d="M100 170 Q103 130 106 95"/>
              <path d="M125 165 Q128 125 132 90"/>
              <path d="M150 165 Q152 130 155 100"/>
            </g>
            {/* protective shield */}
            <path d="M40 130 Q100 75 160 130" fill="none" stroke="#86EFAC" stroke-width="2.5" stroke-dasharray="4 4" opacity="0.85"/>
            {/* cross-out tick */}
            <g transform="translate(100,55)">
              <circle r="18" fill="#EAB308" stroke="#fff" stroke-width="2"/>
              {/* tiny tick silhouette */}
              <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#0A1A0E"/>
              <circle cx="-4" cy="-1" r="2" fill="#0A1A0E"/>
              <line x1="-12" y1="-12" x2="12" y2="12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
            </g>
            {/* pet-safe paw indicator */}
            <g transform="translate(155,160)" fill="#fff" opacity="0.85">
              <circle cx="0" cy="0" r="3"/>
              <circle cx="-5" cy="-4" r="1.8"/>
              <circle cx="5" cy="-4" r="1.8"/>
              <circle cx="-7" cy="2" r="1.5"/>
              <circle cx="7" cy="2" r="1.5"/>
            </g>
          </svg>
        </div>
        <div className="prog-body">
          <span style={{display:'inline-block',background:'rgba(255,255,255,.12)',color:'#fff',fontSize:'9px',fontWeight:'700',padding:'3px 9px',borderRadius:'20px',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:'.6rem'}}>Pet &amp; Family Safe</span>
          <div className="prog-name">Tick Control</div>
          <div className="prog-desc">Targeted yard treatments to break the tick lifecycle. Critical for waterfront and wooded properties.</div>
          <ul className="prog-features">
            <li><span className="prog-chk">✓</span>Lone Star, Dog &amp; Deer ticks</li>
            <li><span className="prog-chk">✓</span>Harborage-zone targeting</li>
            <li><span className="prog-chk">✓</span>Bundled free with mosquito</li>
          </ul>
          <a href="#plans" className="prog-link">Learn more →</a>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ALL SPECIALTY SERVICES */}
<section className="section services-bg" id="services">
  <div className="container">
    <div className="section-eyebrow">Specialty &amp; Add-On Services</div>
    <h2 className="section-title">Built for <span>Alabama Properties</span></h2>
    <p className="section-sub">Add any of these to your core service — one invoice, one technician, no juggling vendors.</p>

    <div className="svc-grid">

      <div className="svc-card">
        <div className="svc-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3 4 5 4 9a4 4 0 01-8 0c0-4 3-6 4-9z"/><path d="M12 14c.5 1.5 2 2.5 2 4a2 2 0 01-4 0c0-1.5 1.5-2.5 2-4z"/></svg></div>
        <div className="svc-name">Fire Ant Control</div>
        <div className="svc-desc">Yard-wide elimination &amp; mound treatment. Critical for lake homes and barefoot families.</div>
        <span className="svc-tag">Add-On</span>
      </div>

      <div className="svc-card">
        <div className="svc-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg></div>
        <div className="svc-name">Flea Control</div>
        <div className="svc-desc">Yard barrier treatments to break the flea lifecycle. Bundles seamlessly with mosquito &amp; tick service.</div>
        <span className="svc-tag">Pet-Friendly</span>
      </div>

      <div className="svc-card">
        <div className="svc-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V11l7-5 7 5v10M9 21v-6h6v6"/></svg></div>
        <div className="svc-name">Builder Pre-Treat</div>
        <div className="svc-desc">Pre-construction termite treatment for new builds. The right time to start Sentricon® protection.</div>
        <span className="svc-tag">New Construction</span>
      </div>

      <div className="svc-card">
        <div className="svc-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11H5a2 2 0 00-2 2v7h18v-7a2 2 0 00-2-2h-4M9 11V5a3 3 0 016 0v6M9 11h6"/></svg></div>
        <div className="svc-name">Real Estate / WDO Letters</div>
        <div className="svc-desc">Wood-destroying organism inspection letters for closings. Fast turnaround, lender-ready format.</div>
        <span className="svc-tag">Closings</span>
      </div>

      <div className="svc-card">
        <div className="svc-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M4 12V8h16v4M6 16h2M16 16h2M8 20h8"/></svg></div>
        <div className="svc-name">Crawlspace Service</div>
        <div className="svc-desc">Moisture control, vapor barriers &amp; targeted treatments for the most vulnerable part of your home.</div>
        <span className="svc-tag">Foundation Care</span>
      </div>

      <div className="svc-card">
        <div className="svc-icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V8h14v13M8 21v-5h3v5M13 21v-5h3v5M9 4l3-2 3 2"/></svg></div>
        <div className="svc-name">Commercial Service</div>
        <div className="svc-desc">Restaurants, offices, warehouses. Discrete scheduling &amp; full compliance documentation.</div>
        <span className="svc-tag">IPM &amp; HACCP</span>
      </div>

    </div>
  </div>
</section>

{/* LOCATIONS */}
<section className="section" id="locations" style={{background:'var(--white)'}}>
  <div className="container">
    <div className="section-eyebrow">Three Alabama Offices</div>
    <h2 className="section-title">Local Technicians, <span>Statewide Reach</span></h2>
    <p className="section-sub">Three offices across Alabama — Birmingham, Lake Martin, and Huntsville. Your technician is always a neighbor, never dispatched out of state.</p>

    <div className="loc-grid">

      {/* Birmingham — Vulcan Statue */}
      <div className="loc-card">
        <div className="loc-art loc-art-1">
          <div className="loc-art-grid"></div>
          <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMax meet">
            <defs><linearGradient id="bhmFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff" stop-opacity="0.28"/><stop offset="100%" stop-color="#fff" stop-opacity="0.05"/></linearGradient></defs>
            {/* city skyline */}
            <rect x="20" y="110" width="30" height="60" fill="url(#bhmFade)"/>
            <rect x="55" y="90" width="40" height="80" fill="url(#bhmFade)"/>
            <rect x="100" y="70" width="50" height="100" fill="url(#bhmFade)"/>
            <rect x="155" y="60" width="35" height="110" fill="url(#bhmFade)"/>
            <rect x="295" y="80" width="40" height="90" fill="url(#bhmFade)"/>
            <rect x="340" y="100" width="30" height="70" fill="url(#bhmFade)"/>
            {/* Vulcan statue silhouette center */}
            <g transform="translate(220,40)" fill="#fff" opacity="0.9">
              {/* pedestal */}
              <rect x="-25" y="100" width="50" height="30" fill="url(#bhmFade)"/>
              <rect x="-30" y="125" width="60" height="8" fill="url(#bhmFade)"/>
              {/* legs */}
              <rect x="-10" y="65" width="8" height="40"/>
              <rect x="2" y="65" width="8" height="40"/>
              {/* skirt/tunic */}
              <path d="M-15 50 L15 50 L18 70 L-18 70 Z"/>
              {/* torso */}
              <rect x="-12" y="30" width="24" height="22"/>
              {/* arm raising spear/torch up */}
              <rect x="10" y="10" width="6" height="30" transform="rotate(15, 13, 25)"/>
              {/* spear/flame on top */}
              <polygon points="20,-2 14,12 26,12" fill="#EAB308"/>
              <polygon points="20,-8 16,4 24,4" fill="#FCD34D"/>
              {/* other arm holding hammer down */}
              <rect x="-16" y="32" width="6" height="20"/>
              <rect x="-22" y="48" width="14" height="6"/>
              {/* head */}
              <circle cx="0" cy="22" r="7"/>
              {/* helmet detail */}
              <path d="M-7 18 L-4 12 L4 12 L7 18 Z"/>
            </g>
            {/* Vulcan label */}
            <text x="220" y="160" text-anchor="middle" fill="#fff" font-family="Playfair Display,serif" font-size="8" font-weight="700" opacity="0.6" letter-spacing="2">VULCAN</text>
            {/* window dots */}
            <g fill="#EAB308" opacity="0.55">
              <circle cx="65" cy="110" r="1"/><circle cx="75" cy="110" r="1"/><circle cx="85" cy="110" r="1"/>
              <circle cx="115" cy="90" r="1"/><circle cx="125" cy="100" r="1"/><circle cx="140" cy="110" r="1"/>
              <circle cx="170" cy="90" r="1"/><circle cx="180" cy="110" r="1"/>
              <circle cx="305" cy="100" r="1"/><circle cx="320" cy="110" r="1"/><circle cx="350" cy="115" r="1"/>
            </g>
          </svg>
          <div className="loc-city-name">🏙️ Birmingham</div>
        </div>
        <div className="loc-body">
          <div className="loc-office">Birmingham Office</div>
          <div className="loc-addr">2025 Butler Rd, Alabaster, AL 35007</div>
          <div className="loc-serves">Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood · Helena · Calera</div>
          <a href="tel:2059406360" className="loc-phone">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 11.7a19.79 19.79 0 01-3.07-8.67A2 2 0 013.82 1h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (205) 940-6360
          </a>
        </div>
      </div>

      {/* Lake Martin — Lake + Pier + Boat */}
      <div className="loc-card">
        <div className="loc-art loc-art-2">
          <div className="loc-art-grid"></div>
          <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMax meet">
            <defs><linearGradient id="lmFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff" stop-opacity="0.32"/><stop offset="100%" stop-color="#fff" stop-opacity="0.06"/></linearGradient></defs>
            {/* distant tree-line */}
            <polygon points="0,95 80,45 160,80 240,35 340,65 400,50 400,170 0,170" fill="url(#lmFade)"/>
            {/* water */}
            <rect x="0" y="115" width="400" height="55" fill="rgba(255,255,255,0.12)"/>
            {/* water ripples */}
            <g stroke="#EAB308" stroke-width="1" fill="none" opacity="0.55">
              <path d="M30 130 Q40 127 50 130"/>
              <path d="M80 140 Q90 137 100 140"/>
              <path d="M180 135 Q190 132 200 135"/>
              <path d="M280 143 Q290 140 300 143"/>
              <path d="M340 133 Q350 130 360 133"/>
            </g>
            {/* pier */}
            <rect x="120" y="125" width="60" height="3" fill="#EAB308" opacity="0.9"/>
            <line x1="125" y1="125" x2="125" y2="140" stroke="#EAB308" stroke-width="2" opacity="0.9"/>
            <line x1="155" y1="125" x2="155" y2="143" stroke="#EAB308" stroke-width="2" opacity="0.9"/>
            <line x1="175" y1="125" x2="175" y2="145" stroke="#EAB308" stroke-width="2" opacity="0.9"/>
            {/* boat */}
            <path d="M210 127 L240 127 L235 135 L215 135 Z" fill="#fff" opacity="0.92"/>
            <line x1="225" y1="115" x2="225" y2="127" stroke="#fff" stroke-width="1.5" opacity="0.92"/>
            {/* pine trees */}
            <g fill="#fff" opacity="0.9">
              <polygon points="60,105 50,120 70,120"/>
              <polygon points="60,95 48,113 72,113"/>
              <rect x="58" y="120" width="4" height="6"/>
            </g>
            <g fill="#fff" opacity="0.9">
              <polygon points="320,100 308,117 332,117"/>
              <polygon points="320,90 305,110 335,110"/>
              <rect x="318" y="117" width="4" height="7"/>
            </g>
            {/* sun */}
            <circle cx="300" cy="45" r="14" fill="#EAB308" opacity="0.92"/>
            {/* sun rays */}
            <g stroke="#EAB308" stroke-width="1.5" opacity="0.5">
              <line x1="300" y1="22" x2="300" y2="28"/>
              <line x1="277" y1="45" x2="283" y2="45"/>
              <line x1="317" y1="45" x2="323" y2="45"/>
            </g>
          </svg>
          <div className="loc-city-name">🏞️ Lake Martin</div>
        </div>
        <div className="loc-body">
          <div className="loc-office">Alexander City — Est. 1958</div>
          <div className="loc-addr">1785 Tallapoosa St, Alexander City, AL 35010</div>
          <div className="loc-serves">Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika · Wetumpka</div>
          <a href="tel:2562346162" className="loc-phone">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 11.7a19.79 19.79 0 01-3.07-8.67A2 2 0 013.82 1h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (256) 234-6162
          </a>
        </div>
      </div>

      {/* Huntsville — Saturn V Rocket */}
      <div className="loc-card">
        <div className="loc-art loc-art-3">
          <div className="loc-art-grid"></div>
          <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMax meet">
            <defs><linearGradient id="hsvFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff" stop-opacity="0.32"/><stop offset="100%" stop-color="#fff" stop-opacity="0.06"/></linearGradient></defs>
            {/* stars */}
            <g fill="#EAB308">
              <circle cx="40" cy="30" r="1"/><circle cx="80" cy="20" r="1.2"/><circle cx="130" cy="35" r="1"/>
              <circle cx="280" cy="25" r="1.2"/><circle cx="340" cy="40" r="1"/><circle cx="370" cy="20" r="1"/>
            </g>
            {/* moon */}
            <circle cx="60" cy="50" r="12" fill="#fff" opacity="0.7"/>
            <circle cx="64" cy="48" r="11" fill="#0F5C2E" opacity="0.95"/>
            {/* ground/buildings */}
            <rect x="0" y="125" width="400" height="45" fill="url(#hsvFade)" opacity="0.5"/>
            <rect x="20" y="110" width="40" height="60" fill="url(#hsvFade)"/>
            <rect x="65" y="120" width="30" height="50" fill="url(#hsvFade)"/>
            <rect x="100" y="105" width="50" height="65" fill="url(#hsvFade)"/>
            {/* Saturn V rocket center */}
            <g transform="translate(200,40)">
              <polygon points="0,0 -10,30 10,30" fill="#fff" opacity="0.96"/>
              <rect x="-10" y="30" width="20" height="60" fill="#fff" opacity="0.96"/>
              <rect x="-10" y="40" width="20" height="3" fill="#0F5C2E"/>
              <rect x="-10" y="55" width="20" height="3" fill="#0F5C2E"/>
              <rect x="-10" y="70" width="20" height="3" fill="#0F5C2E"/>
              <text x="0" y="50" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="6" font-weight="700" fill="#0A1A0E">USA</text>
              <polygon points="-12,90 -8,100 8,100 12,90" fill="#fff" opacity="0.85"/>
              <polygon points="-10,80 -18,95 -10,95" fill="#fff" opacity="0.85"/>
              <polygon points="10,80 18,95 10,95" fill="#fff" opacity="0.85"/>
              <path d="M-8 100 Q-4 115 0 122 Q4 115 8 100 Z" fill="#EAB308">
                <animate attributeName="d" values="M-8 100 Q-4 115 0 122 Q4 115 8 100 Z;M-8 100 Q-4 118 0 126 Q4 118 8 100 Z;M-8 100 Q-4 115 0 122 Q4 115 8 100 Z" dur="0.6s" repeatCount="indefinite"/>
              </path>
            </g>
            {/* more buildings */}
            <rect x="260" y="115" width="35" height="55" fill="url(#hsvFade)"/>
            <rect x="300" y="105" width="45" height="65" fill="url(#hsvFade)"/>
            <rect x="350" y="120" width="40" height="50" fill="url(#hsvFade)"/>
            {/* window lights */}
            <g fill="#EAB308" opacity="0.7">
              <circle cx="35" cy="125" r="1"/><circle cx="45" cy="135" r="1"/>
              <circle cx="115" cy="115" r="1"/><circle cx="135" cy="125" r="1"/>
              <circle cx="275" cy="125" r="1"/><circle cx="315" cy="115" r="1"/><circle cx="330" cy="130" r="1"/>
            </g>
          </svg>
          <div className="loc-city-name">🚀 Huntsville</div>
        </div>
        <div className="loc-body">
          <div className="loc-office">Huntsville Office</div>
          <div className="loc-addr">7027 Old Madison Pike, Ste 108, Huntsville, AL 35806</div>
          <div className="loc-serves">Huntsville · Madison · Athens · Decatur · Hartselle · Hampton Cove · Harvest · North Alabama</div>
          <a href="tel:2569377676" className="loc-phone">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 11.7a19.79 19.79 0 01-3.07-8.67A2 2 0 013.82 1h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (256) 937-7676
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

{/* HERITAGE / ABOUT */}
<section className="section" style={{background:'var(--cream)',position:'relative',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:'0',background:'radial-gradient(circle at 85% 25%,rgba(245,168,0,0.08) 0%,transparent 45%),radial-gradient(circle at 15% 75%,rgba(14,142,64,0.07) 0%,transparent 50%)',pointerEvents:'none'}}></div>
  <div className="container" style={{position:'relative',zIndex:'2'}}>
    <div style={{display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:'4rem',alignItems:'center'}}>

      <div>
        <div className="section-eyebrow" style={{marginBottom:'1rem'}}>Our Story</div>
        <h2 className="section-title" style={{textAlign:'left',marginBottom:'1.4rem'}}>Three Generations.<br/><span>One Family.</span> One Promise.</h2>
        <p style={{fontSize:'1.1rem',lineHeight:'1.75',color:'var(--ink-soft)',marginBottom:'1.4rem'}}>
          In 1958, <strong style={{color:'var(--ink)'}}>Phillip M. Wedgworth</strong> started EnviroCare with one truck and one belief — that families deserved an Alabama pest control company that actually answers the phone and stands behind the work.
        </p>
        <p style={{fontSize:'1.1rem',lineHeight:'1.75',color:'var(--ink-soft)',marginBottom:'2rem'}}>
          Sixty-eight years later, his grandsons <strong style={{color:'var(--ink)'}}>Phillip, Kevin, and Lex Wedgworth</strong> run the company. Three Alabama offices. Same family. Same answer to your pest problem.
        </p>
        <div style={{fontFamily:'\'Playfair Display\',serif',fontStyle:'italic',fontSize:'1.5rem',color:'var(--green-dk)',fontWeight:'700',borderLeft:'4px solid var(--gold)',paddingLeft:'1.2rem',lineHeight:'1.4'}}>
          "No One Cares Like EnviroCare."
        </div>
        <div style={{display:'flex',gap:'1.6rem',marginTop:'2rem',flexWrap:'wrap'}}>
          <div><div style={{fontFamily:'\'Playfair Display\',serif',fontSize:'2.2rem',fontWeight:'900',color:'var(--green-dk)',lineHeight:'1'}}>1958</div><div style={{fontSize:'11px',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-soft)',fontWeight:'600',marginTop:'4px'}}>Founded</div></div>
          <div><div style={{fontFamily:'\'Playfair Display\',serif',fontSize:'2.2rem',fontWeight:'900',color:'var(--green-dk)',lineHeight:'1'}}>3</div><div style={{fontSize:'11px',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-soft)',fontWeight:'600',marginTop:'4px'}}>Generations</div></div>
          <div><div style={{fontFamily:'\'Playfair Display\',serif',fontSize:'2.2rem',fontWeight:'900',color:'var(--green-dk)',lineHeight:'1'}}>100%</div><div style={{fontSize:'11px',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-soft)',fontWeight:'600',marginTop:'4px'}}>Family Owned</div></div>
        </div>
      </div>

      <div style={{position:'relative',display:'grid',gridTemplateColumns:'1.3fr 1fr',gridTemplateRows:'auto auto',gap:'1rem'}}>
        <div style={{gridRow:'1/3',borderRadius:'var(--r)',overflow:'hidden',boxShadow:'var(--sh-lg)',border:'6px solid #fff',transform:'rotate(-1.5deg)',transition:'transform .4s ease'}} onMouseOver={(e)=>e.currentTarget.style.transform='rotate(0deg) scale(1.02)'} onMouseOut={(e)=>e.currentTarget.style.transform='rotate(-1.5deg)'}>
          <img src="/kevin-headshot.jpg" alt="Kevin Wedgworth — third-generation owner of EnviroCare" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',aspectRatio:'3/4'}}/>
          <div style={{position:'absolute',bottom:'1rem',left:'1rem',right:'1rem',background:'rgba(255,255,255,0.95)',backdropFilter:'blur(8px)',padding:'.7rem 1rem',borderRadius:'8px',boxShadow:'0 4px 12px rgba(0,0,0,.1)'}}>
            <div style={{fontSize:'13px',fontWeight:'700',color:'var(--ink)'}}>Kevin Wedgworth</div>
            <div style={{fontSize:'11px',color:'var(--ink-soft)',marginTop:'2px'}}>3rd-Generation Owner</div>
          </div>
        </div>

        <div style={{borderRadius:'var(--r)',overflow:'hidden',boxShadow:'var(--sh-md)',border:'6px solid #fff',transform:'rotate(2deg)',transition:'transform .4s ease'}} onMouseOver={(e)=>e.currentTarget.style.transform='rotate(0deg) scale(1.05)'} onMouseOut={(e)=>e.currentTarget.style.transform='rotate(2deg)'}>
          <img src="/ribbon-cutting-1.jpg" alt="EnviroCare ribbon cutting — Alabama family business" loading="lazy" style={{width:'100%',height:'160px',objectFit:'cover',display:'block'}}/>
        </div>

        <div style={{borderRadius:'var(--r)',overflow:'hidden',boxShadow:'var(--sh-md)',border:'6px solid #fff',transform:'rotate(-2deg)',transition:'transform .4s ease'}} onMouseOver={(e)=>e.currentTarget.style.transform='rotate(0deg) scale(1.05)'} onMouseOut={(e)=>e.currentTarget.style.transform='rotate(-2deg)'}>
          <img src="/ribbon-cutting-2.jpg" alt="EnviroCare community event — serving Alabama since 1958" loading="lazy" style={{width:'100%',height:'160px',objectFit:'cover',display:'block'}}/>
        </div>
      </div>

    </div>
  </div>
</section>

{/* REVIEWS */}
<section className="section reviews-bg">
  <div className="container">
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'1rem',marginBottom:'1.4rem',flexWrap:'wrap'}}>
      <div style={{display:'flex',alignItems:'center',gap:'.7rem',background:'#fff',padding:'.7rem 1.2rem',borderRadius:'50px',boxShadow:'0 4px 16px rgba(0,0,0,.08)',border:'1px solid rgba(0,0,0,.05)'}}>
        <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        <div>
          <div style={{fontSize:'11px',color:'var(--ink-soft)',fontWeight:'600',lineHeight:'1'}}>Verified by Google</div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'3px'}}><span style={{fontSize:'16px',fontWeight:'800',color:'var(--ink)'}}>4.9</span><span style={{color:'#FBBC05',fontSize:'14px',letterSpacing:'1px'}}>★★★★★</span><span style={{fontSize:'12px',color:'var(--ink-soft)'}}>· 500+ reviews</span></div>
        </div>
      </div>
    </div>
    <div className="section-eyebrow">Customer Reviews</div>
    <h2 className="section-title">What Alabama Families <span>Are Saying</span></h2>
    <p className="section-sub">Real Google reviews from real Alabama homes. Not hand-picked — this is what customers say every week.</p>
  </div>
  <div className="review-track-wrap">
    <div className="review-track">
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"I have used EnviroCare for many years — the best pest service we have ever used."</div><div className="rev-who"><div className="rev-avatar">R</div><div><div className="rev-name">Robert M.</div><div className="rev-loc">Lake Martin, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"My husband and I love the service and technicians. Could not recommend more!"</div><div className="rev-who"><div className="rev-avatar">J</div><div><div className="rev-name">Jessica M.</div><div className="rev-loc">Huntsville, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"Very professional, schedules with us, and is always on time."</div><div className="rev-who"><div className="rev-avatar">A</div><div><div className="rev-name">Ann S.</div><div className="rev-loc">Hoover, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"No other pest control company can top the service from EnviroCare!!!"</div><div className="rev-who"><div className="rev-avatar">D</div><div><div className="rev-name">Dariel S.</div><div className="rev-loc">Madison, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"The technician was friendly and careful of our things. Five stars without hesitation."</div><div className="rev-who"><div className="rev-avatar">J</div><div><div className="rev-name">Janet H.</div><div className="rev-loc">Birmingham, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"I value their professionalism and flexibility when scheduling. Always reliable."</div><div className="rev-who"><div className="rev-avatar">M</div><div><div className="rev-name">Mashonda T.</div><div className="rev-loc">Alexander City, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"12 years with EnviroCare. Tried switching once — came right back. Nothing compares."</div><div className="rev-who"><div className="rev-avatar">T</div><div><div className="rev-name">Terry B.</div><div className="rev-loc">Chelsea, AL</div></div></div></div>
      {/* duplicate for seamless loop */}
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"I have used EnviroCare for many years — the best pest service we have ever used."</div><div className="rev-who"><div className="rev-avatar">R</div><div><div className="rev-name">Robert M.</div><div className="rev-loc">Lake Martin, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"My husband and I love the service and technicians. Could not recommend more!"</div><div className="rev-who"><div className="rev-avatar">J</div><div><div className="rev-name">Jessica M.</div><div className="rev-loc">Huntsville, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"Very professional, schedules with us, and is always on time."</div><div className="rev-who"><div className="rev-avatar">A</div><div><div className="rev-name">Ann S.</div><div className="rev-loc">Hoover, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"No other pest control company can top the service from EnviroCare!!!"</div><div className="rev-who"><div className="rev-avatar">D</div><div><div className="rev-name">Dariel S.</div><div className="rev-loc">Madison, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"The technician was friendly and careful of our things. Five stars without hesitation."</div><div className="rev-who"><div className="rev-avatar">J</div><div><div className="rev-name">Janet H.</div><div className="rev-loc">Birmingham, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"I value their professionalism and flexibility when scheduling. Always reliable."</div><div className="rev-who"><div className="rev-avatar">M</div><div><div className="rev-name">Mashonda T.</div><div className="rev-loc">Alexander City, AL</div></div></div></div>
      <div className="rev-card"><div className="rev-quote">"</div><div className="rev-stars"><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span><span className="rev-star">★</span></div><div className="rev-text">"12 years with EnviroCare. Tried switching once — came right back. Nothing compares."</div><div className="rev-who"><div className="rev-avatar">T</div><div><div className="rev-name">Terry B.</div><div className="rev-loc">Chelsea, AL</div></div></div></div>
    </div>
  </div>
</section>

{/* PLANS */}
<section className="section plans-bg" id="plans">
  <div className="container">
    <div className="section-eyebrow">Plans &amp; Pricing</div>
    <h2 className="section-title">Pick Your <span>Protection Plan</span></h2>
    <p className="section-sub">Honest, straightforward pricing. No contracts, no hidden fees — pay monthly on ACH, cancel anytime.</p>

    <div className="plans-grid">

      <div className="plan-card">
        <div className="plan-name">Essential</div>
        <div className="plan-icon-row">
          <span className="plan-icon-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 9V5M12 19v-4M9 12H5M19 12h-4"/></svg> Pest</span>
        </div>
        <div className="plan-tag-line">Year-round pest control for the everyday Alabama home.</div>
        <div className="plan-price">
          <sup>$</sup><span className="num">35</span><span className="per">/mo</span>
          <span className="plan-price-note">ACH · or $70 bi-monthly</span>
        </div>
        <ul className="plan-features">
          <li><span className="plan-chk">✓</span>Bi-monthly exterior treatment</li>
          <li><span className="plan-chk">✓</span>30+ common pests covered</li>
          <li><span className="plan-chk">✓</span>Unlimited free re-services</li>
          <li><span className="plan-chk">✓</span>Same-week scheduling</li>
          <li><span className="plan-chk">✓</span>Family- &amp; pet-safe applications</li>
        </ul>
        <a href="tel:2056495278" className="plan-cta">Start Essential</a>
      </div>

      <div className="plan-card featured">
        <div className="plan-tag">Most Popular</div>
        <div className="plan-name">Foundation</div>
        <div className="plan-icon-row">
          <span className="plan-icon-pill">Pest</span>
          <span className="plan-icon-pill">Termite</span>
        </div>
        <div className="plan-tag-line">Pest control + Sentricon® termite protection. The right baseline for any Alabama home.</div>
        <div className="plan-price">
          <sup>$</sup><span className="num">67</span><span className="per">/mo</span>
          <span className="plan-price-note">ACH · one invoice, one tech</span>
        </div>
        <ul className="plan-features">
          <li><span className="plan-chk">✓</span>Everything in Essential, plus:</li>
          <li><span className="plan-chk">✓</span>Sentricon® Always Active™ system</li>
          <li><span className="plan-chk">✓</span>Annual termite inspection</li>
          <li><span className="plan-chk">✓</span>$1M damage repair coverage</li>
          <li><span className="plan-chk">✓</span>WDO inspection letter (1/yr)</li>
          <li><span className="plan-chk">✓</span>No drilling, no tank trucks</li>
        </ul>
        <a href="tel:2056495278" className="plan-cta">Start Foundation</a>
      </div>

      <div className="plan-card">
        <div className="plan-name">Complete</div>
        <div className="plan-icon-row">
          <span className="plan-icon-pill">Pest</span>
          <span className="plan-icon-pill">Termite</span>
          <span className="plan-icon-pill">Mosquito</span>
          <span className="plan-icon-pill">Tick</span>
        </div>
        <div className="plan-tag-line">All four programs — pest, termite, mosquito &amp; tick — under one plan.</div>
        <div className="plan-price">
          <sup>$</sup><span className="num">127</span><span className="per">/mo</span>
          <span className="plan-price-note">ACH · everything in one invoice</span>
        </div>
        <ul className="plan-features">
          <li><span className="plan-chk">✓</span>Everything in Foundation, plus:</li>
          <li><span className="plan-chk">✓</span>Mosquito barrier (Apr–Oct, every 21 days)</li>
          <li><span className="plan-chk">✓</span>Tick yard treatments included</li>
          <li><span className="plan-chk">✓</span>Flea yard treatment included</li>
          <li><span className="plan-chk">✓</span>Dedicated account technician</li>
          <li><span className="plan-chk">✓</span>Priority same-week response</li>
        </ul>
        <a href="tel:2056495278" className="plan-cta">Start Complete</a>
      </div>

    </div>

    {/* Coupons */}
    <div className="coupon-row">
      <div className="coupon coupon-1">
        <div className="coupon-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EAB308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>
        <div className="coupon-title">$50 Off Initial Service</div>
        <div className="coupon-sub">New full-service program customers. Mention when calling.</div>
      </div>
      <div className="coupon coupon-2">
        <div className="coupon-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg></div>
        <div className="coupon-title">50% Off First Mosquito App</div>
        <div className="coupon-sub">New mosquito program customers. Mention when calling.</div>
      </div>
      <div className="coupon coupon-3">
        <div className="coupon-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <div className="coupon-title">Free Termite Inspection</div>
        <div className="coupon-sub">No obligation. Schedule today at any AL office.</div>
      </div>
    </div>
  </div>
</section>

{/* BUNDLE BANNER */}
<div className="bundle">
  <div className="container bundle-inner">
    <div className="bundle-title">🌻 One Invoice. One Tech. One Trusted Team.</div>
    <p className="bundle-sub">Combine Pest + Termite + Mosquito + Tick on a single plan. Same competitive pricing as standalone — just simpler to manage.</p>
    <div className="bundle-pills">
      <div className="bundle-pill">Pest + Termite <strong>$67/mo</strong></div>
      <div className="bundle-pill">Outdoor Bundle (Mosquito + Tick + Flea) <strong>$60/mo</strong></div>
      <div className="bundle-pill">All Four Programs <strong>$127/mo</strong></div>
    </div>
    <div style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
      <a href="tel:2056495278" className="btn-gold" style={{overflow:'visible'}}>Call (205) 649-5278</a>
      <a href="#plans" className="btn-outline-white">See Plans →</a>
    </div>
  </div>
</div>

{/* FOOTER */}
<footer id="contact">
  <div className="footer-grid">
    <div>
      <div className="footer-brand">
        <strong>EnviroCare Pest &amp; Termite Services</strong>
        Family-owned and operated since 1958 — now in its third generation of the Wedgworth family. Serving Alabama from three offices: Birmingham, Lake Martin, and Huntsville.
        <br/><br/>
        <a href="tel:2056495278" className="footer-phone" style={{fontSize:'1.05rem',fontWeight:'700'}}>📞 (205) 649-5278 — Main Line</a><br/>
        <a href="tel:2059406360" className="footer-phone">📞 (205) 940-6360 — Birmingham</a><br/>
        <a href="tel:2562346162" className="footer-phone">📞 (256) 234-6162 — Lake Martin / Alex City</a><br/>
        <a href="tel:2569377676" className="footer-phone">📞 (256) 937-7676 — Huntsville</a>
      </div>
    </div>
    <div>
      <div className="footer-head">Core Services</div>
      <ul className="footer-links">
        <li><a href="#">Pest Control</a></li>
        <li><a href="#">Termite Control</a></li>
        <li><a href="#">Mosquito Control</a></li>
        <li><a href="#">Tick Control</a></li>
        <li><a href="#">Bundle &amp; Save</a></li>
      </ul>
    </div>
    <div>
      <div className="footer-head">Specialty</div>
      <ul className="footer-links">
        <li><a href="#">Fire Ant Control</a></li>
        <li><a href="#">Flea Control</a></li>
        <li><a href="#">Builder Pre-Treat</a></li>
        <li><a href="#">Real Estate / WDO Letters</a></li>
        <li><a href="#">Crawlspace Service</a></li>
        <li><a href="#">Commercial Service</a></li>
      </ul>
    </div>
    <div>
      <div className="footer-head">Service Areas</div>
      <ul className="footer-links">
        <li><a href="#">Birmingham, AL</a></li>
        <li><a href="#">Huntsville, AL</a></li>
        <li><a href="#">Auburn, AL</a></li>
        <li><a href="#">Alexander City, AL</a></li>
        <li><a href="#">Lake Martin, AL</a></li>
        <li><a href="#">Mountain Brook, AL</a></li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <span>© 2026 EnviroCare Pest &amp; Termite Services LLC. All rights reserved. Licensed in Alabama · Sentricon® Certified Specialist</span>
    <div style={{display:'flex',gap:'1.5rem'}}>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Sitemap</a>
    </div>
  </div>
</footer>


    </>
  );
}

const HOMEPAGE_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  /* REAL ENVIROCARE BRAND — vibrant mint, not generic emerald */
  --green:#0E8E40; --green-mid:#22C55E; --green-dk:#0A7935; --green-deep:#07642B; --green-darkest:#062514;
  --green-lt:#DCFCE7; --green-xlt:#F0FDF4;
  --gold:#F5A800; --gold-dk:#CA8A04; --gold-lt:#FEF3C7; --gold-deep:#A16207;
  --white:#fff; --cream:#FFFDF8;
  --ink:#0A1A0E; --ink-mid:#1E293B; --ink-soft:#475569;
  --border:#BBF7D0; --border-soft:#D1FAE5;
  --r:16px;
  --sh-sm:0 2px 12px rgba(22,163,74,.09);
  --sh-md:0 8px 32px rgba(22,163,74,.14);
  --sh-lg:0 24px 60px rgba(22,163,74,.18);
  --sh-xl:0 30px 80px rgba(15,92,46,.28);
}
html{scroll-behavior:smooth}
body{font-family:"DM Sans",sans-serif;background:var(--white);color:var(--ink);overflow-x:hidden;-webkit-font-smoothing:antialiased}

/* ─── ANNOUNCEMENT BAR */
.ann{background:var(--green-deep);color:rgba(255,255,255,.9);font-size:12.5px;font-weight:500;padding:9px 2rem;text-align:center;letter-spacing:.02em}
.ann strong{color:var(--gold)}
.ann a{color:var(--gold);text-decoration:none;font-weight:600;margin-left:4px}
.ann a:hover{text-decoration:underline}

/* ─── NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.97);backdrop-filter:blur(18px);border-bottom:1px solid var(--border-soft);padding:0 clamp(1.5rem,5vw,4rem)}
.nav-inner{max-width:1320px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:96px}
.logo-wrap{width:300px;flex-shrink:0;animation:logoIn 1.4s cubic-bezier(.16,1,.3,1) both;transform-origin:left center}
@keyframes logoIn{0%{transform:scale(1.4) translateX(4%);opacity:0;filter:blur(2px)}100%{transform:scale(1) translateX(0);opacity:1;filter:blur(0)}}
#ec-logo{filter:drop-shadow(0 1px 2px rgba(15,92,46,.18)) drop-shadow(0 4px 12px rgba(15,92,46,.1));transition:filter .3s;width:100%;height:auto;display:block}
#ec-logo:hover{filter:drop-shadow(0 2px 6px rgba(15,92,46,.28)) drop-shadow(0 6px 18px rgba(15,92,46,.16))}

.nav-links{display:flex;gap:2rem;list-style:none;align-items:center}
.nav-links a{font-size:13.5px;font-weight:500;color:var(--ink-mid);text-decoration:none;transition:color .2s;position:relative}
.nav-links a::after{content:'';position:absolute;left:0;bottom:-2px;width:0;height:2px;background:var(--green);transition:width .25s}
.nav-links a:hover{color:var(--green)}
.nav-links a:hover::after,.nav-links a.active::after{width:100%}
.nav-links a.active{color:var(--green);font-weight:600}
.nav-right{display:flex;align-items:center;gap:.7rem}
.nav-phone{font-size:13px;font-weight:600;color:var(--green-dk);text-decoration:none;display:flex;align-items:center;gap:6px;padding:.4rem .85rem;border-radius:50px;border:1.5px solid rgba(22,163,74,.25);transition:all .2s}
.nav-phone:hover{background:var(--green-lt);border-color:var(--green)}
.nav-cta{background:var(--gold);color:var(--ink);border:none;border-radius:50px;padding:.6rem 1.4rem;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;font-family:"DM Sans",sans-serif;transition:all .2s;white-space:nowrap;box-shadow:0 2px 12px rgba(234,179,8,.32)}
.nav-cta:hover{background:var(--gold-dk);transform:translateY(-1px);box-shadow:0 6px 20px rgba(234,179,8,.45)}

/* ─── HERO */
.hero{position:relative;overflow:hidden;background:var(--white);padding:5rem clamp(1.5rem,5vw,4rem) 5rem}
.hero-wash{position:absolute;top:0;right:0;bottom:0;width:55%;background:linear-gradient(140deg,var(--green-xlt) 0%,var(--green-lt) 50%,#86EFAC 100%);clip-path:polygon(12% 0,100% 0,100% 100%,0 100%);z-index:0;pointer-events:none}
.hero-wash::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(22,163,74,0.07)' stroke-width='1'%3E%3Cpath d='M30 0 Q30 30 60 30'/%3E%3Cpath d='M0 30 Q30 30 30 60'/%3E%3C/g%3E%3C/svg%3E") repeat;opacity:.5}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.orb-a{width:520px;height:520px;background:radial-gradient(circle,rgba(34,197,94,.18) 0%,transparent 70%);top:-100px;right:10%;animation:oa 16s ease-in-out infinite alternate}
.orb-b{width:380px;height:380px;background:radial-gradient(circle,rgba(234,179,8,.12) 0%,transparent 70%);bottom:-50px;left:4%;animation:ob 12s ease-in-out infinite alternate}
@keyframes oa{from{transform:translate(0,0)}to{transform:translate(-55px,45px)}}
@keyframes ob{from{transform:translate(0,0)}to{transform:translate(38px,-38px)}}
.hero-inner{position:relative;z-index:10;max-width:1320px;margin:0 auto;display:grid;grid-template-columns:1fr 1.05fr;gap:4rem;align-items:center}

.eyebrow-pill{display:inline-flex;align-items:center;gap:8px;background:var(--green-lt);border:1px solid rgba(22,163,74,.3);border-radius:40px;padding:.4rem 1rem .4rem .65rem;margin-bottom:1.5rem}
.dot-wrap{position:relative;width:10px;height:10px;display:flex;align-items:center;justify-content:center}
.dot-core{width:8px;height:8px;border-radius:50%;background:var(--green-mid);z-index:1;animation:dcb 2.2s ease-in-out infinite}
.dot-ring{position:absolute;inset:-4px;border-radius:50%;border:1.5px solid var(--green-mid);animation:drx 2.2s ease-out infinite}
@keyframes dcb{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.82);opacity:.7}}
@keyframes drx{0%{transform:scale(.5);opacity:.9}100%{transform:scale(2.4);opacity:0}}
.eyebrow-txt{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--green-dk)}

.hero h1{font-family:"Playfair Display",serif;font-size:clamp(2.4rem,4.6vw,4rem);font-weight:900;line-height:1.05;color:var(--ink);margin-bottom:1.4rem;letter-spacing:-.5px}
.hero h1 em{color:var(--green-dk);font-style:italic;display:block}
.hero h1 .gd{color:var(--gold-dk)}
.hero-sub{font-size:1.08rem;line-height:1.75;color:var(--ink-soft);max-width:480px;margin-bottom:2.2rem}
.cta-row{display:flex;gap:.9rem;flex-wrap:wrap;margin-bottom:2.5rem}

.btn-gold{position:relative;background:var(--gold);color:var(--ink);border:none;border-radius:50px;padding:.95rem 2.1rem;font-family:"DM Sans",sans-serif;font-size:1rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .25s,box-shadow .25s;box-shadow:0 4px 18px rgba(234,179,8,.4);overflow:visible}
.btn-gold::before,.btn-gold::after{content:"";position:absolute;border-radius:50px;border:2px solid rgba(234,179,8,.65);pointer-events:none}
.btn-gold::before{inset:-5px;animation:gp 2.8s ease-out infinite}
.btn-gold::after{inset:-11px;border-color:rgba(234,179,8,.28);animation:gp 2.8s ease-out .55s infinite}
.btn-gold:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(234,179,8,.55)}
@keyframes gp{0%{transform:scale(1);opacity:1}70%,100%{transform:scale(1.28);opacity:0}}
.btn-green{background:transparent;color:var(--green-dk);border:2px solid var(--green-dk);border-radius:50px;padding:.92rem 1.8rem;font-family:"DM Sans",sans-serif;font-size:1rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s}
.btn-green:hover{background:var(--green-dk);color:var(--white);box-shadow:0 6px 20px rgba(21,128,61,.32)}
.btn-outline-white{background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.5);border-radius:50px;padding:.75rem 1.6rem;font-family:"DM Sans",sans-serif;font-size:.95rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s}
.btn-outline-white:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.85)}

.stats{display:flex;gap:2rem;flex-wrap:wrap;margin-bottom:2rem}
.stat{border-left:3px solid var(--gold);padding-left:.9rem}
.stat-n{font-family:"Playfair Display",serif;font-size:1.85rem;font-weight:700;color:var(--green-dk);line-height:1}
.stat-l{font-size:10.5px;color:var(--ink-soft);letter-spacing:.05em;margin-top:3px;text-transform:uppercase;font-weight:600}

.badges{display:flex;gap:.7rem;flex-wrap:wrap}
.badge{display:flex;align-items:center;gap:6px;background:var(--green-lt);border:1px solid rgba(22,163,74,.2);border-radius:8px;padding:.45rem .85rem;font-size:12px;font-weight:500;color:var(--ink-mid)}
.badge .ck{color:var(--green-dk);font-weight:700;font-size:13px}

/* ─── HERO VISUAL */
.visual{position:relative}
.img-frame{position:relative;border-radius:24px;aspect-ratio:1/1;background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%);box-shadow:var(--sh-xl);overflow:hidden}
/* image slot — drop your real Alabama home photo here */
.img-frame img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s ease}
.img-frame:hover img{transform:scale(1.04)}
.img-fade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(6,37,20,.4) 100%);pointer-events:none}
/* fallback illustration, hidden when image loads */
.hero-illust-bg{position:absolute;inset:0;background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%)}
.hero-illust-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(234,179,8,.18) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(34,197,94,.22) 0%,transparent 55%)}
.hero-illust-bg .grid-p{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 75%)}
.hero-illust-bg svg{position:absolute;inset:0;width:100%;height:100%}

/* glass cards */
.gc{position:absolute;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.6);border-radius:16px;box-shadow:0 12px 36px rgba(15,92,46,.32),0 2px 8px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.95);z-index:5}
.gc-rating{bottom:-22px;left:-26px;padding:.95rem 1.2rem;display:flex;align-items:center;gap:12px;animation:bob1 3.8s ease-in-out infinite}
@keyframes bob1{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.gc-svc{top:-16px;right:-22px;padding:.85rem 1.1rem;display:flex;flex-direction:column;gap:6px;animation:bob2 2.8s ease-in-out infinite}
@keyframes bob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
.gc-stars{display:flex;gap:2px;margin-bottom:3px}
.gc-star{color:var(--gold);font-size:14px}
.gc-rn{font-size:1.4rem;font-weight:700;color:var(--ink);line-height:1;font-family:"Playfair Display",serif}
.gc-rl,.gc-rc{font-size:10px;color:var(--ink-soft);white-space:nowrap;font-weight:500}
.gc-rc{opacity:.75}
.gc-row{display:flex;align-items:center;gap:10px}
.gc-ic{width:36px;height:36px;border-radius:10px;background:var(--green-lt);border:1px solid rgba(22,163,74,.25);display:flex;align-items:center;justify-content:center;color:var(--green-dk)}
.gc-st{font-size:13px;font-weight:700;color:var(--ink);white-space:nowrap}
.gc-ss{font-size:10px;color:var(--ink-soft);white-space:nowrap}
.gc-avail{display:inline-flex;align-items:center;gap:5px;background:var(--green-lt);border:1px solid rgba(22,163,74,.25);border-radius:20px;padding:3px 10px;font-size:9.5px;font-weight:700;color:var(--green-dk);letter-spacing:.06em;text-transform:uppercase;width:fit-content}
.gc-dot{width:6px;height:6px;border-radius:50%;background:var(--green-mid);animation:dcb 1.8s ease-in-out infinite}
.gc-est{position:absolute;top:30%;left:-26px;padding:.7rem 1rem;display:flex;flex-direction:column;gap:2px;animation:bob1 4.4s ease-in-out infinite}
.gc-est-label{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--green-dk)}
.gc-est-val{font-family:"Playfair Display",serif;font-size:1.5rem;font-weight:700;color:var(--ink);line-height:1}

/* ─── SECTION SHARED */
.section{padding:5.5rem clamp(1.5rem,5vw,4rem)}
.container{max-width:1320px;margin:0 auto}
.section-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--green-dk);background:var(--green-lt);border:1px solid rgba(22,163,74,.25);border-radius:40px;padding:.32rem .9rem;margin-bottom:1rem}
.section-title{font-family:"Playfair Display",serif;font-size:clamp(2rem,3.6vw,3rem);font-weight:900;color:var(--ink);line-height:1.1;margin-bottom:.85rem;letter-spacing:-.4px}
.section-title span{color:var(--green-dk)}
.section-sub{font-size:1.05rem;line-height:1.75;color:var(--ink-soft);max-width:580px}

/* ─── TRUST STRIP */
.trust{background:var(--white);border-top:3px solid var(--gold);border-bottom:1px solid var(--border-soft);padding:1.2rem clamp(1.5rem,5vw,4rem)}
.trust-inner{max-width:1320px;margin:0 auto;display:flex;justify-content:center;gap:2.5rem;flex-wrap:wrap}
.ti{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:500;color:var(--ink-soft)}
.ti-chk{width:20px;height:20px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:11px;color:white;flex-shrink:0;font-weight:700}

/* ─── MARQUEE */
.mq{background:var(--green-deep);padding:.95rem 0;overflow:hidden}
.mq-track{display:flex;width:max-content;animation:mqs 38s linear infinite}
.mq-track:hover{animation-play-state:paused}
.mq-item{display:flex;align-items:center;gap:.7rem;padding:0 2.2rem;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.55);letter-spacing:.05em;white-space:nowrap}
.mq-item strong{color:rgba(255,255,255,.92)}
.mq-item::after{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;background:rgba(234,179,8,.6);margin-left:2.2rem}
@keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ─── CORE PROGRAMS — 4 PILLARS */
.programs{background:linear-gradient(180deg,var(--green-deep) 0%,var(--green-darkest) 100%);padding:6rem clamp(1.5rem,5vw,4rem);position:relative;overflow:hidden}
.programs::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1.5' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E") repeat}
.programs::after{content:'';position:absolute;top:-40%;right:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(234,179,8,.1) 0%,transparent 70%);pointer-events:none}
.programs .section-eyebrow{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2);color:#86EFAC}
.programs .section-title{color:var(--white)}
.programs .section-title span{color:var(--gold)}
.programs .section-sub{color:rgba(255,255,255,.72);max-width:680px}
.prog-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-top:3rem;position:relative;z-index:2}
.prog-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:0;position:relative;overflow:hidden;transition:all .35s cubic-bezier(.16,1,.3,1);cursor:pointer;backdrop-filter:blur(8px)}
.prog-card:hover{background:rgba(255,255,255,.09);transform:translateY(-6px);box-shadow:0 24px 50px rgba(0,0,0,.35);border-color:rgba(255,255,255,.22)}
.prog-card.featured{background:linear-gradient(180deg,rgba(234,179,8,.16) 0%,rgba(234,179,8,.04) 100%);border-color:rgba(234,179,8,.5)}
.prog-card.featured:hover{background:linear-gradient(180deg,rgba(234,179,8,.22) 0%,rgba(234,179,8,.06) 100%)}
.prog-badge{position:absolute;top:.9rem;right:.9rem;background:var(--gold);color:var(--ink);font-size:8.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:20px;z-index:3}
.prog-art{width:100%;height:140px;border-radius:20px 20px 0 0;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.prog-art-1{background:linear-gradient(135deg,#16A34A 0%,#15803D 100%)}
.prog-art-2{background:linear-gradient(135deg,#CA8A04 0%,#A16207 100%)}
.prog-art-3{background:linear-gradient(135deg,#22C55E 0%,#16A34A 100%)}
.prog-art-4{background:linear-gradient(135deg,#15803D 0%,#0F5C2E 100%)}
.prog-art svg{position:relative;z-index:2;width:80%;height:80%}
.prog-art-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:32px 32px;opacity:.7}
.prog-body{padding:1.4rem 1.4rem 1.5rem}
.prog-name{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:700;color:var(--white);margin-bottom:.45rem;letter-spacing:-.2px}
.prog-desc{font-size:.85rem;line-height:1.6;color:rgba(255,255,255,.72);margin-bottom:1rem}
.prog-features{list-style:none;margin-bottom:1.25rem}
.prog-features li{display:flex;align-items:flex-start;gap:7px;font-size:.8rem;color:rgba(255,255,255,.78);margin-bottom:.4rem}
.prog-chk{color:#86EFAC;font-size:12px;flex-shrink:0;margin-top:1px;font-weight:700}
.prog-link{display:inline-flex;align-items:center;gap:6px;font-size:.83rem;font-weight:600;color:var(--gold);text-decoration:none;transition:gap .2s}
.prog-link:hover{gap:11px}

/* ─── SERVICES GRID — premium icon cards */
.services-bg{background:var(--cream);position:relative}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:3rem}
.svc-card{background:var(--white);border:1px solid var(--border-soft);border-radius:18px;padding:1.75rem 1.5rem;transition:all .3s cubic-bezier(.16,1,.3,1);cursor:pointer;position:relative;overflow:hidden}
.svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green) 0%,var(--green-mid) 50%,var(--gold) 100%);transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
.svc-card:hover{border-color:var(--green);transform:translateY(-4px);box-shadow:var(--sh-md)}
.svc-card:hover::before{transform:scaleX(1)}
.svc-icon-box{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--green-lt) 0%,#BBF7D0 100%);display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem;position:relative;transition:all .3s}
.svc-icon-box::after{content:'';position:absolute;inset:0;border-radius:14px;background:linear-gradient(135deg,var(--green) 0%,var(--green-mid) 100%);opacity:0;transition:opacity .3s}
.svc-card:hover .svc-icon-box::after{opacity:1}
.svc-icon-box svg{position:relative;z-index:2;width:28px;height:28px;color:var(--green-dk);transition:color .3s}
.svc-card:hover .svc-icon-box svg{color:var(--white)}
.svc-name{font-family:"Playfair Display",serif;font-size:1.15rem;font-weight:700;color:var(--ink);margin-bottom:.4rem;letter-spacing:-.2px}
.svc-desc{font-size:.875rem;color:var(--ink-soft);line-height:1.6;margin-bottom:.9rem}
.svc-tag{display:inline-block;background:var(--green-lt);color:var(--green-dk);font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;letter-spacing:.05em;text-transform:uppercase}

/* ─── LOCATIONS */
.loc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.loc-card{border-radius:22px;overflow:hidden;border:1px solid var(--border-soft);box-shadow:var(--sh-sm);transition:all .35s cubic-bezier(.16,1,.3,1);background:var(--white)}
.loc-card:hover{transform:translateY(-5px);box-shadow:var(--sh-md);border-color:var(--green)}
.loc-art{position:relative;height:170px;overflow:hidden;display:flex;align-items:flex-end;padding:1.1rem}
.loc-art-1{background:linear-gradient(160deg,#16A34A 0%,#15803D 60%,#0F5C2E 100%)}
.loc-art-2{background:linear-gradient(160deg,#22C55E 0%,#16A34A 50%,#15803D 100%)}
.loc-art-3{background:linear-gradient(160deg,#15803D 0%,#0F5C2E 60%,#062514 100%)}
.loc-art svg{position:absolute;inset:0;width:100%;height:100%}
.loc-art-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:24px 24px;opacity:.5}
.loc-city-name{position:relative;z-index:2;font-family:"Playfair Display",serif;font-size:1.3rem;font-weight:700;color:var(--white);text-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;gap:8px}
.loc-body{padding:1.4rem 1.5rem 1.6rem}
.loc-office{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--green-dk);margin-bottom:.5rem}
.loc-addr{font-size:.875rem;color:var(--ink-mid);margin-bottom:.6rem;line-height:1.5;font-weight:500}
.loc-serves{font-size:.8rem;color:var(--ink-soft);line-height:1.55;margin-bottom:1rem}
.loc-phone{display:inline-flex;align-items:center;gap:6px;font-size:.9rem;font-weight:700;color:var(--green-dk);text-decoration:none;padding:.5rem 1.05rem;border-radius:50px;border:1.5px solid var(--green-dk);transition:all .2s}
.loc-phone:hover{background:var(--green-dk);color:var(--white)}

/* ─── REVIEWS */
.reviews-bg{background:linear-gradient(180deg,var(--green-xlt) 0%,var(--green-lt) 100%)}
.review-track-wrap{overflow:hidden;margin-top:2.5rem;position:relative}
.review-track-wrap::before,.review-track-wrap::after{content:'';position:absolute;top:0;bottom:0;width:90px;z-index:2;pointer-events:none}
.review-track-wrap::before{left:0;background:linear-gradient(90deg,var(--green-xlt),transparent)}
.review-track-wrap::after{right:0;background:linear-gradient(-90deg,var(--green-lt),transparent)}
.review-track{display:flex;gap:1.25rem;width:max-content;animation:revScroll 50s linear infinite}
.review-track:hover{animation-play-state:paused}
.rev-card{width:320px;flex-shrink:0;background:var(--white);border:1px solid var(--border-soft);border-radius:18px;padding:1.65rem;box-shadow:var(--sh-sm);position:relative}
.rev-quote{position:absolute;top:-10px;right:18px;font-family:"Playfair Display",serif;font-size:3.5rem;color:var(--gold);line-height:1;opacity:.3}
.rev-stars{display:flex;gap:2px;margin-bottom:.8rem}
.rev-star{color:var(--gold);font-size:14px}
.rev-text{font-size:.92rem;line-height:1.65;color:var(--ink-mid);margin-bottom:1.1rem;font-style:italic}
.rev-who{display:flex;align-items:center;gap:10px;padding-top:1rem;border-top:1px solid var(--border-soft)}
.rev-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--green) 0%,var(--green-mid) 100%);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;box-shadow:0 2px 8px rgba(22,163,74,.3)}
.rev-name{font-size:.88rem;font-weight:600;color:var(--ink)}
.rev-loc{font-size:.78rem;color:var(--ink-soft)}
@keyframes revScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ─── PLANS */
.plans-bg{background:var(--white)}
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.plan-card{border-radius:22px;border:1.5px solid var(--border-soft);padding:2.1rem 1.85rem;position:relative;transition:all .3s;background:var(--white)}
.plan-card:hover{transform:translateY(-5px);box-shadow:var(--sh-md)}
.plan-card.featured{border-color:var(--green);box-shadow:0 0 0 3px rgba(22,163,74,.1),var(--sh-md);background:linear-gradient(180deg,#F8FFF9 0%,var(--white) 50%)}
.plan-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--green) 0%,var(--green-mid) 100%);color:white;font-size:9.5px;font-weight:700;padding:5px 16px;border-radius:20px;white-space:nowrap;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 4px 14px rgba(22,163,74,.4)}
.plan-name{font-family:"Playfair Display",serif;font-size:1.4rem;font-weight:700;color:var(--ink);margin-bottom:.5rem}
.plan-icon-row{display:flex;align-items:center;gap:.45rem;margin-bottom:.85rem;flex-wrap:wrap}
.plan-icon-pill{display:inline-flex;align-items:center;gap:5px;background:var(--green-lt);border:1px solid rgba(22,163,74,.25);border-radius:30px;padding:4px 11px;font-size:11px;font-weight:600;color:var(--green-dk)}
.plan-icon-pill svg{width:11px;height:11px}
.plan-tag-line{font-size:.88rem;color:var(--ink-soft);margin-bottom:1.3rem;line-height:1.5;font-style:italic}
.plan-price{margin-bottom:1.4rem}
.plan-price sup{font-size:1.1rem;font-weight:700;color:var(--green-dk);vertical-align:top;margin-top:.4rem;display:inline-block}
.plan-price .num{font-size:3rem;font-weight:700;color:var(--green-dk);font-family:"Playfair Display",serif;line-height:1}
.plan-price .per{font-size:.85rem;color:var(--ink-soft);margin-left:2px}
.plan-price-note{font-size:11px;color:var(--ink-soft);margin-top:.4rem;display:block}
.plan-features{list-style:none;margin-bottom:1.6rem}
.plan-features li{display:flex;align-items:flex-start;gap:9px;font-size:.88rem;color:var(--ink-mid);margin-bottom:.55rem;line-height:1.5}
.plan-chk{color:var(--green);font-weight:700;flex-shrink:0;margin-top:2px}
.plan-cta{display:block;text-align:center;background:var(--green-dk);color:var(--white);border:none;border-radius:50px;padding:.85rem;font-family:"DM Sans",sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;text-decoration:none;transition:all .2s}
.plan-cta:hover{background:var(--green-deep);transform:translateY(-1px);box-shadow:0 6px 16px rgba(15,92,46,.32)}
.plan-card.featured .plan-cta{background:var(--gold);color:var(--ink)}
.plan-card.featured .plan-cta:hover{background:var(--gold-dk);box-shadow:0 6px 16px rgba(234,179,8,.45)}

/* coupons */
.coupon-row{display:flex;gap:1rem;flex-wrap:wrap;margin-top:2.5rem}
.coupon{flex:1;min-width:240px;border-radius:var(--r);padding:1.4rem 1.3rem;text-align:center;position:relative;overflow:hidden}
.coupon-1{background:var(--gold-lt);border:2px dashed var(--gold)}
.coupon-2{background:var(--green-lt);border:2px dashed var(--green)}
.coupon-3{background:var(--green-lt);border:2px dashed var(--green-dk)}
.coupon-icon{width:42px;height:42px;border-radius:12px;background:var(--white);display:flex;align-items:center;justify-content:center;margin:0 auto .65rem;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.coupon-title{font-family:"Playfair Display",serif;font-size:1.05rem;margin-bottom:.3rem;font-weight:700;color:var(--ink)}
.coupon-sub{font-size:.8rem;color:var(--ink-soft);line-height:1.5}

/* ─── BUNDLE BANNER */
.bundle{background:linear-gradient(135deg,var(--green) 0%,var(--green-dk) 50%,var(--green-deep) 100%);padding:3.5rem clamp(1.5rem,5vw,4rem);text-align:center;position:relative;overflow:hidden}
.bundle::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 50%,rgba(234,179,8,.14) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(134,239,172,.12) 0%,transparent 50%);pointer-events:none}
.bundle-inner{position:relative;z-index:2}
.bundle-title{font-family:"Playfair Display",serif;font-size:clamp(1.6rem,3vw,2.3rem);font-weight:700;color:var(--white);margin-bottom:.6rem;letter-spacing:-.3px}
.bundle-sub{color:rgba(255,255,255,.82);margin-bottom:1.8rem;font-size:1.02rem}
.bundle-pills{display:flex;justify-content:center;gap:.85rem;flex-wrap:wrap;margin-bottom:2rem}
.bundle-pill{background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.27);border-radius:50px;padding:.5rem 1.15rem;font-size:.875rem;color:rgba(255,255,255,.92);font-weight:500}
.bundle-pill strong{color:var(--gold);font-weight:700}

/* ─── FOOTER */
footer{background:var(--ink);color:rgba(255,255,255,.7);padding:4.5rem clamp(1.5rem,5vw,4rem) 2rem;position:relative}
footer::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green) 0%,var(--gold) 50%,var(--green) 100%)}
.footer-grid{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem}
.footer-brand{font-size:.9rem;line-height:1.7;color:rgba(255,255,255,.55)}
.footer-brand strong{color:var(--white);display:block;margin-bottom:.6rem;font-size:1.05rem;font-family:"Playfair Display",serif}
.footer-phone{color:var(--gold);text-decoration:none;font-weight:600;font-size:.875rem;display:inline-block;margin-top:.4rem;transition:color .2s}
.footer-phone:hover{color:#FCD34D}
.footer-head{font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:1.1rem}
.footer-links{list-style:none}
.footer-links li{margin-bottom:.55rem}
.footer-links a{color:rgba(255,255,255,.6);text-decoration:none;font-size:.875rem;transition:color .2s}
.footer-links a:hover{color:var(--gold)}
.footer-bottom{max-width:1320px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;border-top:1px solid rgba(255,255,255,.08);padding-top:1.5rem;font-size:.8rem;color:rgba(255,255,255,.35)}
.footer-bottom a{color:rgba(255,255,255,.35);text-decoration:none;transition:color .2s}
.footer-bottom a:hover{color:rgba(255,255,255,.6)}

/* ─── RESPONSIVE */
@media(max-width:1100px){
  .prog-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:1000px){
  .hero-inner,.loc-grid,.plans-grid{grid-template-columns:1fr}
  .svc-grid{grid-template-columns:repeat(2,1fr)}
  .nav-links{display:none}
  .logo-wrap{width:240px}
  .hero-wash{display:none}
  .footer-grid{grid-template-columns:1fr 1fr}
  /* Heritage block stacks on tablet */
  section[style*="background:var(--cream)"] .container > div{grid-template-columns:1fr !important;gap:2.5rem !important}
}
@media(max-width:600px){
  .hero h1{font-size:2.1rem}
  .svc-grid,.prog-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
  .logo-wrap{width:200px}
  .nav-inner{height:78px}
  .section{padding:4rem 1.5rem}
  .visual{display:none} /* hide hero truck photo only on phone, keeps tablet rich */
}
`;
