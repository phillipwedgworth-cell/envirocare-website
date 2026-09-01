"use client";

import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PestIcon from "@/components/shared/PestIcon";
import { getPest } from "@/data/pest-library";

import { breadcrumbList } from '@/lib/seo/breadcrumbs';
/**
 * PestLibraryPage — shared template for the 12 /pest-library/<pest> profiles.
 * Migrated from the legacy Scorpion pest library at the same URLs to recover
 * the SEO equity those pages ranked for. Data lives in data/pest-library.ts.
 * Compliance-safe copy (no "guarantee"/"safe"/eradication promises).
 */
export default function PestLibraryPage({ slug }: { slug: string }) {
  const pest = getPest(slug);
  if (!pest) {
    return (
      <main>
        <section className="pl-hero"><div className="pl-inner"><h1>Pest not found</h1>
          <p><Link href="/pest-library" className="pl-back">← Back to the Pest Library</Link></p></div></section>
      </main>
    );
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pest.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: PL_CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Pest Library', path: '/pest-library' }, { name: pest.name, path: `/pest-library/${slug}` }]) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* HERO */}
      <section className="pl-hero">
        <div className="pl-inner">
          <div className="pl-eyebrow"><Link href="/pest-library">PEST LIBRARY</Link> · ALABAMA</div>
          <div className="pl-hero-row">
            <span className="pl-hero-icon" aria-hidden="true"><PestIcon name={pest.icon} size={40} /></span>
            <div>
              <h1 className="pl-h1">{pest.name} in Alabama</h1>
              <div className="pl-also">{pest.also}</div>
            </div>
          </div>
          <p className="pl-intro">{pest.intro}</p>
          <div className="pl-ctas">
            <a href="tel:2059406360" className="pl-cta-gold">Call (205) 940-6360</a>
            {/* The identification page is the one that ranks (ticks sits at #2 while
                /services/tick-control ranks nowhere), so the service page is reached
                above the fold rather than by a 301 that would risk the position.
                serviceSlug already exists on every PestEntry. */}
            <Link href={`/services/${pest.serviceSlug}`} className="pl-cta-outline">Get Professional Treatment →</Link>
            <Link href="/quote" className="pl-cta-outline">Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      <div className="pl-body">
        <div className="pl-inner">
          {pest.image && (
            <figure className="pl-photo">
              <img
                src={pest.image}
                alt={pest.imageAlt || `${pest.name} — Alabama pest`}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
              {pest.imageCredit && <figcaption className="pl-photo-credit">Photo: {pest.imageCredit}</figcaption>}
            </figure>
          )}
          <section className="pl-section">
            <h2 className="pl-h2">How to identify {pest.name.toLowerCase()}</h2>
            <p>{pest.identification}</p>
          </section>

          <section className="pl-section">
            <h2 className="pl-h2">Behavior in Alabama</h2>
            <p>{pest.behavior}</p>
          </section>

          <section className="pl-section">
            <h2 className="pl-h2">Why {pest.name.toLowerCase()} are a problem</h2>
            <div className="pl-grid">
              {pest.risks.map((r) => (
                <div key={r} className="pl-card">
                  <span className="pl-check" aria-hidden="true"><PestIcon name="check" size={16} /></span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pl-section">
            <h2 className="pl-h2">Signs of {pest.name.toLowerCase()} activity</h2>
            <ul className="pl-list">
              {pest.signs.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </section>

          <section className="pl-section pl-season">
            <h2 className="pl-h2">When they’re active</h2>
            <p>{pest.seasonal}</p>
          </section>

          {/* TREATMENT */}
          <section className="pl-section pl-treat">
            <h2 className="pl-h2">How EnviroCare controls {pest.name.toLowerCase()}</h2>
            <p>{pest.treatment}</p>
            <Link href={`/services/${pest.serviceSlug}`} className="pl-cta-green">
              See our {pest.serviceLabel} service →
            </Link>
          </section>

          {/* FAQ */}
          {pest.faqs.length > 0 && (
            <section className="pl-section">
              <h2 className="pl-h2">Common questions</h2>
              {pest.faqs.map((f) => (
                <div key={f.q} className="pl-faq">
                  <h3 className="pl-faq-q">{f.q}</h3>
                  <p className="pl-faq-a">{f.a}</p>
                </div>
              ))}
            </section>
          )}

          {/* CLOSE CTA */}
          <section className="pl-close">
            <h2 className="pl-close-h">Dealing with {pest.name.toLowerCase()}? Let’s handle it.</h2>
            <p>Family-owned in Alabama since 1958. Licensed technicians, EPA-registered products, no long-term pest control contract.</p>
            <div className="pl-ctas">
              <a href="tel:2059406360" className="pl-cta-gold">Call (205) 940-6360</a>
              <Link href="/quote" className="pl-cta-outline">Get a Free Quote →</Link>
            </div>
            <p className="pl-backwrap"><Link href="/pest-library" className="pl-back">← Back to the Pest Library</Link></p>
          </section>
        </div>
      </div>

    </main>
  );
}

const PL_CSS = `
  .pl-inner { max-width: 820px; margin: 0 auto; padding: 0 clamp(20px,5vw,32px); }
  .pl-hero {
    background: linear-gradient(135deg, #07642B 0%, #0A7935 55%, #0E8E40 100%);
    color: #fff; padding: clamp(48px,7vw,76px) 0 clamp(40px,6vw,60px);
  }
  .pl-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: 0.12em; opacity: 0.85; margin-bottom: 18px; }
  .pl-eyebrow a { color: #F5A800; text-decoration: none; }
  .pl-hero-row { display: flex; align-items: center; gap: 16px; margin-bottom: 18px; }
  .pl-hero-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 64px; height: 64px; border-radius: 16px; flex-shrink: 0;
    background: rgba(255,255,255,0.14); color: #fff;
  }
  .pl-h1 { font-family: var(--font-serif); font-size: clamp(28px,5vw,42px); font-weight: 700; line-height: 1.08; margin: 0; }
  .pl-also { font-size: 14px; opacity: 0.82; margin-top: 6px; }
  .pl-intro { font-size: clamp(16px,2.2vw,18px); line-height: 1.6; max-width: 64ch; margin: 0 0 26px; opacity: 0.95; }
  .pl-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
  .pl-cta-gold {
    background: #F5A800; color: #0E1A0F !important; text-decoration: none;
    padding: 13px 24px; border-radius: 999px; font-weight: 700; font-size: 15px;
    display: inline-flex; align-items: center; box-shadow: 0 4px 16px rgba(245,168,0,0.32);
  }
  .pl-cta-outline {
    border: 2px solid rgba(255,255,255,0.55); color: #fff !important; text-decoration: none;
    padding: 11px 22px; border-radius: 999px; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center;
  }
  .pl-cta-green {
    background: #0E8E40; color: #fff !important; text-decoration: none;
    padding: 12px 22px; border-radius: 999px; font-weight: 700; font-size: 15px;
    display: inline-flex; align-items: center; margin-top: 6px;
  }
  .pl-body { background: #FEFDF8; color: #0E1A0F; padding: clamp(40px,6vw,64px) 0; }
  .pl-section { margin-bottom: 40px; }
  .pl-photo { margin: 0 0 34px; }
  .pl-photo img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 16px; display: block; box-shadow: 0 10px 28px rgba(14,26,15,0.12); background: #eef3ee; }
  .pl-photo-credit { font-size: 11px; color: #8a978c; margin: 8px 2px 0; }
  .pl-h2 { font-family: var(--font-serif); font-size: clamp(20px,3vw,27px); font-weight: 700; color: #07642B; margin: 0 0 14px; }
  .pl-body p { font-size: 16px; line-height: 1.7; color: #2f3b33; margin: 0 0 12px; }
  .pl-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 4px; }
  @media (min-width: 640px) { .pl-grid { grid-template-columns: 1fr 1fr; } }
  .pl-card {
    display: flex; align-items: flex-start; gap: 10px; background: #fff;
    border: 1px solid rgba(14,142,64,0.16); border-left: 4px solid #0E8E40;
    border-radius: 12px; padding: 14px 16px; font-size: 15px; line-height: 1.5; color: #2f3b33;
  }
  .pl-check { color: #0A7935; flex-shrink: 0; display: inline-flex; margin-top: 1px; }
  .pl-list { margin: 0; padding-left: 0; list-style: none; }
  .pl-list li { position: relative; padding: 8px 0 8px 26px; font-size: 16px; line-height: 1.5; color: #2f3b33; border-bottom: 1px solid rgba(14,26,15,0.07); }
  .pl-list li::before { content: ""; position: absolute; left: 4px; top: 16px; width: 8px; height: 8px; border-radius: 50%; background: #F5A800; }
  .pl-season p, .pl-treat { }
  .pl-treat {
    background: #fff; border: 1px solid rgba(14,142,64,0.18); border-radius: 16px;
    padding: clamp(20px,4vw,28px); box-shadow: 0 8px 26px rgba(14,26,15,0.06);
  }
  .pl-faq { margin-bottom: 18px; }
  .pl-faq-q { font-size: 16px; font-weight: 700; color: #0E1A0F; margin: 0 0 4px; }
  .pl-faq-a { font-size: 15px; line-height: 1.6; color: #4b5750; margin: 0; }
  .pl-close {
    background: #0B3D20; color: #fff; border-radius: 18px; padding: clamp(28px,5vw,40px);
    text-align: center; margin-top: 8px;
  }
  .pl-close-h { font-family: var(--font-serif); font-size: clamp(20px,3vw,28px); font-weight: 700; margin: 0 0 10px; }
  .pl-close p { color: rgba(255,255,255,0.82); font-size: 15px; line-height: 1.6; margin: 0 auto 20px; max-width: 52ch; }
  .pl-close .pl-ctas { justify-content: center; }
  .pl-backwrap { margin: 22px 0 0 !important; }
  .pl-back { color: #F5A800 !important; text-decoration: none; font-weight: 600; font-size: 14px; }
`;
