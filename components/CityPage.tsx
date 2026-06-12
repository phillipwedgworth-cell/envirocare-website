// components/CityPage.tsx
// Shared layout component for Phase A city pages.
// Uses real /logo.png from public folder. No Lake Martin nav link. No customer counts.

import Image from "next/image";
import Link from "next/link";
import type { CityData } from "@/data/phase-a-cities";

export default function CityPage({ city }: { city: CityData }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --green: #0E8E40;
          --forest: #0A7935;
          --deep: #07642B;
          --gold: #F5A800;
          --cream: #FEFDF8;
          --ink: #0E1A0F;
          --paper: #FAFAF7;
          --muted: #4b5563;
          --line: rgba(14, 142, 64, 0.15);
        }
        body {
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: var(--cream);
          line-height: 1.6;
          margin: 0;
        }
        h1, h2, h3, h4 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
      `}</style>

      {/* ============ STICKY NAV ============ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--cream)',
        borderBottom: '1px solid var(--line)',
        padding: '14px 24px'
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/logo.png" alt="EnviroCare Pest & Termite Services" width={180} height={48} style={{ height: 'auto', maxWidth: 180 }} priority />
          </Link>
          <div className="city-nav-links" style={{ display: 'flex', gap: 24, fontSize: 14, fontWeight: 500 }}>
            <Link href="/services/pest-control" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Services</Link>
            <Link href="/quote" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Pricing</Link>
            <Link href="/about-us" style={{ color: 'var(--ink)', textDecoration: 'none' }}>About</Link>
            <Link href="/contact-us" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Contact</Link>
          </div>
          <a href={`tel:${city.tel}`} style={{
            background: 'var(--gold)', color: 'var(--ink)',
            padding: '10px 18px', borderRadius: 6, fontWeight: 700, fontSize: 14,
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6
          }}>📞 {city.phone}</a>
        </div>
        <style jsx>{`
          @media (max-width: 768px) {
            .city-nav-links { display: none !important; }
          }
        `}</style>
      </nav>

      {/* ============ HERO ============ */}
      <header style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, var(--deep) 100%)',
        color: 'white', padding: '80px 24px 96px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,168,0,0.15), transparent 70%)'
        }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)', color: 'var(--gold)',
            padding: '6px 14px', borderRadius: 100, fontSize: 12,
            letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24
          }}>● {city.badge}</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, marginBottom: 20, maxWidth: 800 }}>
            {city.heroTitle} <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{city.heroTitleEm}</em>
          </h1>
          <p style={{ fontSize: 18, maxWidth: 640, marginBottom: 32, opacity: 0.92 }}>{city.heroLede}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/quote" style={{
              background: 'var(--gold)', color: 'var(--ink)', padding: '16px 28px',
              borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none'
            }}>Get Free Quote →</Link>
            <a href={`tel:${city.tel}`} style={{
              background: 'rgba(255,255,255,0.1)', color: 'white',
              border: '1px solid rgba(255,255,255,0.25)', padding: '16px 28px',
              borderRadius: 8, fontWeight: 600, textDecoration: 'none'
            }}>📞 {city.phone}</a>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
            marginTop: 56, paddingTop: 36,
            borderTop: '1px solid rgba(255,255,255,0.15)', maxWidth: 800
          }} className="city-stats">
            <Stat num="68+" lbl="Years in AL" />
            <Stat num="4.9★" lbl="Google Rating" />
            <Stat num="$1M" lbl="Sentricon® Coverage" />
            <Stat num="3 Gen" lbl="Family Owned" />
          </div>
          <style jsx>{`
            @media (max-width: 640px) {
              .city-stats { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </div>
      </header>

      {/* ============ CROSS-SELL BANNER (Athens only) ============ */}
      {city.showCrossSellBanner && (
        <section style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, var(--cream) 100%)',
          padding: '60px 24px',
          borderTop: '4px solid var(--gold)',
          borderBottom: '1px solid var(--line)'
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <Eyebrow text="For Existing Termite Customers" />
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: 'var(--deep)', marginBottom: 16 }}>
              {city.crossSellHeadline} <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>{city.crossSellHeadlineEm}</em>
            </h2>
            <p style={{ fontSize: 17, color: 'var(--muted)', marginBottom: 24, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              {city.crossSellBody}
            </p>
            <a href={`tel:${city.tel}`} style={{
              background: 'var(--gold)', color: 'var(--ink)',
              padding: '16px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16,
              display: 'inline-block', textDecoration: 'none'
            }}>📞 Call {city.phone} to add pest control</a>
          </div>
        </section>
      )}

      {/* ============ LOCAL PEST CONTEXT ============ */}
      <section style={{ background: 'linear-gradient(135deg, var(--cream) 0%, white 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow text={`Why ${city.name}`} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.15, marginBottom: 16, maxWidth: 800 }}>
            {city.contextTitle.split(' ').slice(0, -3).join(' ')} <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>{city.contextTitle.split(' ').slice(-3).join(' ')}</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 700, marginBottom: 48 }}>{city.contextLede}</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20, marginTop: 32
          }}>
            {city.pests.map(p => (
              <div key={p.title} style={{
                background: 'white', padding: 24, borderRadius: 12, border: '1px solid var(--line)'
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{p.emoji}</div>
                <h4 style={{ fontSize: 18, color: 'var(--deep)', marginBottom: 6 }}>{p.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 SERVICES ============ */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow text="All Four Programs Available" />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.15, marginBottom: 16, maxWidth: 800 }}>
            Pest. Termite. Mosquito. Tick. <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>Under one plan.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 700, marginBottom: 48 }}>
            No bundling-discount gimmick — same price as standalone. One invoice, one tech, no juggling vendors.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20
          }}>
            <ServiceCard ribbon="Most Popular" icon="🛡️" title="Pest Control" price="$35" priceUnit="/mo ACH · or $70 bi-monthly"
              desc={`Year-round defense against 30+ ${city.name} pests. Bi-monthly perimeter service.`}
              bullets={["Interior + exterior perimeter", "Unlimited free re-services", "Fire ant treatment from $150", "Interior plan $98/quarter"]} />
            <ServiceCard ribbon="$1M Coverage" icon="🪵" title="Termite (Sentricon®)" price="$32" priceUnit="/mo · or $325 install + $380/yr renewal"
              desc="Sentricon® Always Active™ stations. No drilling, no tank trucks. Up to $1M damage warranty."
              bullets={["Free full-home inspection", "Annual inspection included", "Crawlspace + pier coverage", "Continuous monitoring"]} />
            <ServiceCard ribbon="Mar – Nov" icon="🦟" title="Mosquito Control" price="$45" priceUnit="/mo · seasonal"
              desc="30-day yard barrier March through November. Reclaim your patio, deck, and outdoor living spaces."
              bullets={["Up to 9 seasonal applications", "EPA-registered products, applied per label", "Targets harborage zones", "50% off first application"]} />
            <ServiceCard icon="🐾" title="Tick Control" price="$60" priceUnit="/mo · with mosquito"
              desc={`Targeted yard treatments to break the tick lifecycle. Critical for ${city.name} properties.`}
              bullets={["Lone Star, Dog & Deer ticks", "Harborage-zone targeting", "Bundles free with mosquito", "Applied per EPA label directions"]} />
          </div>
        </div>
      </section>

      {/* ============ NEIGHBORHOODS ============ */}
      <section style={{ background: 'var(--paper)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow text={city.servingLabel} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.15, marginBottom: 16, maxWidth: 800 }}>
            The {city.name} areas, <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>served by name.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 700, marginBottom: 48 }}>
            Each section has its own pest profile. Here&apos;s how we handle each.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24
          }}>
            {city.neighborhoods.map(n => (
              <div key={n.name} style={{
                background: 'white', borderRadius: 14, padding: '32px 28px',
                borderTop: '4px solid var(--gold)',
                boxShadow: '0 4px 16px rgba(14,26,15,0.04)'
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--green)', fontWeight: 700, marginBottom: 10
                }}>{n.name}</div>
                <h3 style={{ fontSize: 26, color: 'var(--deep)', marginBottom: 14, marginTop: 0 }}>{n.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>{n.note}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {n.features.map(f => (
                    <span key={f} style={{
                      fontSize: 11, padding: '4px 10px',
                      background: 'rgba(14,142,64,0.08)', color: 'var(--deep)',
                      borderRadius: 100, fontWeight: 600
                    }}>{f}</span>
                  ))}
                </div>
                <div style={{
                  fontSize: 12, color: 'var(--muted)', fontWeight: 500,
                  paddingTop: 14, borderTop: '1px solid var(--line)'
                }}>ZIP {n.zip} · {city.office} Office {city.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS STRIP ============ */}
      <div style={{
        background: 'var(--paper)', padding: '48px 24px',
        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 56,
            color: 'var(--gold)', fontWeight: 700, lineHeight: 1
          }}>4.9</div>
          <div style={{ color: 'var(--gold)', fontSize: 22, margin: '8px 0' }}>★ ★ ★ ★ ★</div>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Verified by Google · Hundreds of reviews across Alabama</div>
          <div style={{
            display: 'grid', gap: 20,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            marginTop: 16
          }}>
            {city.reviews.map((r, i) => (
              <div key={i} style={{
                background: 'white', padding: 24, borderRadius: 12,
                textAlign: 'left', border: '1px solid var(--line)'
              }}>
                <div style={{ color: 'var(--gold)', fontSize: 13, marginBottom: 8 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 12 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>— {r.by}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ FAQ ============ */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow text={`${city.name} FAQs`} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.15, marginBottom: 16, maxWidth: 800 }}>
            Answers for <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>{city.name} homeowners.</em>
          </h2>
          <div style={{ maxWidth: 800, marginTop: 32 }}>
            {city.faqs.map((f, i) => (
              <details key={i} style={{
                border: '1px solid var(--line)', borderRadius: 10,
                marginBottom: 12, background: 'var(--paper)', overflow: 'hidden'
              }}>
                <summary style={{
                  padding: '20px 24px', cursor: 'pointer', fontWeight: 600,
                  color: 'var(--deep)', fontSize: 16, listStyle: 'none'
                }}>{f.q}</summary>
                <p style={{ padding: '0 24px 20px', color: 'var(--muted)', fontSize: 15, margin: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BLOCK ============ */}
      <div style={{ background: 'var(--ink)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--gold)', fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 16 }}>{city.ctaBlockHeadline}</h2>
        <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 600, margin: '0 auto 32px' }}>
          Free inspection. No obligation. Honest pricing. Family-owned since 1958.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`tel:${city.tel}`} style={{
            background: 'var(--gold)', color: 'var(--ink)',
            padding: '16px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16,
            textDecoration: 'none'
          }}>📞 {city.phone}</a>
          <Link href="/quote" style={{
            background: 'transparent', color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '16px 28px', borderRadius: 8, fontWeight: 600,
            textDecoration: 'none'
          }}>Get Free Quote →</Link>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: 'var(--ink)', color: 'white', padding: '56px 24px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="city-footer-grid" style={{
            display: 'grid', gap: 36,
            gridTemplateColumns: '2fr 1fr 1fr',
            marginBottom: 40
          }}>
            <div>
              <Image src="/logo.png" alt="EnviroCare" width={200} height={56} style={{ height: 'auto', maxWidth: 200, marginBottom: 16, filter: 'brightness(1.5)' }} />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                Family-owned and operated since 1958 — three generations of the Wedgworth family.
                Serving Alabama from three offices: Birmingham, Lake Martin, and Huntsville.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 16 }}>
                service@envirocarellc.com<br />Mon-Fri 8am-5pm
              </p>
            </div>
            <div>
              <h5 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: 16, fontWeight: 700
              }}>Call Us</h5>
              <FooterLink href="tel:2059406360">📞 (205) 940-6360 — Main</FooterLink>
              <FooterLink href="tel:2059406360">📞 (205) 940-6360 — Birmingham</FooterLink>
              <FooterLink href="tel:2562346162">📞 (256) 234-6162 — Lake Martin</FooterLink>
              <FooterLink href="tel:2569377676">📞 (256) 937-7676 — Huntsville</FooterLink>
            </div>
            <div>
              <h5 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: 16, fontWeight: 700
              }}>{city.office} Office</h5>
              {city.office === 'Birmingham' && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>2025 Butler Rd<br />Alabaster, AL 35007</p>}
              {city.office === 'Huntsville' && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Serving North Alabama<br />Mon-Fri 8am-5pm</p>}
              {city.office === 'Lake Martin' && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Alexander City<br />Mon-Fri 8am-5pm</p>}
              <h5 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--gold)', marginTop: 20, marginBottom: 16, fontWeight: 700
              }}>Serving</h5>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{city.footerServingCities.join(' · ')}</p>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20,
            display: 'flex', justifyContent: 'space-between',
            fontSize: 12, color: 'rgba(255,255,255,0.5)', flexWrap: 'wrap', gap: 12
          }}>
            <div>© 2026 EnviroCare Pest & Termite Services · Licensed in Alabama · Sentricon® Certified Specialist</div>
            <div>No One Cares Like EnviroCare</div>
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 768px) {
            .city-footer-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>

      {/* ============ JSON-LD ============ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://www.envirocarellc.com/${city.slug}`,
        "name": `EnviroCare Pest & Termite Services — ${city.name}`,
        "description": city.metaDescription,
        "url": `https://www.envirocarellc.com/${city.slug}`,
        "telephone": `+1${city.tel}`,
        "email": "service@envirocarellc.com",
        "openingHours": "Mo-Fr 08:00-17:00",
        "priceRange": "$35-$116/mo",
        "areaServed": [
          { "@type": "City", "name": city.name },
          ...city.neighborhoods.map(n => ({ "@type": "Neighborhood", "name": n.name }))
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "246"
        }
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": city.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </>
  );
}

// ============ SUB-COMPONENTS ============

function Stat({ num, lbl }: { num: string; lbl: string }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: 32,
        color: 'var(--gold)', fontWeight: 700
      }}>{num}</div>
      <div style={{
        fontSize: 11, letterSpacing: '0.1em',
        textTransform: 'uppercase', opacity: 0.75, marginTop: 4
      }}>{lbl}</div>
    </div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div style={{
      display: 'inline-block', fontSize: 12, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'var(--green)',
      fontWeight: 700, marginBottom: 14
    }}>{text}</div>
  );
}

function ServiceCard({
  ribbon, icon, title, price, priceUnit, desc, bullets
}: {
  ribbon?: string; icon: string; title: string;
  price: string; priceUnit: string; desc: string; bullets: string[];
}) {
  return (
    <div style={{
      background: 'var(--paper)', border: '1px solid var(--line)',
      borderRadius: 14, padding: '28px 24px', position: 'relative'
    }}>
      {ribbon && (
        <div style={{
          position: 'absolute', top: -10, right: 16,
          background: 'var(--gold)', color: 'var(--ink)',
          padding: '4px 10px', borderRadius: 4, fontSize: 10,
          fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>{ribbon}</div>
      )}
      <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 22, color: 'var(--deep)', marginBottom: 8, marginTop: 0 }}>{title}</h3>
      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: 24,
        color: 'var(--green)', fontWeight: 700, marginBottom: 12
      }}>
        {price}<small style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: 'var(--muted)', fontWeight: 400
        }}>{priceUnit}</small>
      </div>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.55 }}>{desc}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {bullets.map(b => (
          <li key={b} style={{
            fontSize: 13, color: 'var(--ink)',
            paddingLeft: 22, marginBottom: 6, position: 'relative'
          }}>
            <span style={{
              position: 'absolute', left: 0,
              color: 'var(--green)', fontWeight: 700
            }}>✓</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{
      display: 'block', padding: '4px 0',
      fontSize: 14, color: 'rgba(255,255,255,0.8)',
      textDecoration: 'none'
    }}>{children}</a>
  );
}
