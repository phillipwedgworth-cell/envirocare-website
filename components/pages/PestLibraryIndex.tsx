"use client";

import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PestIcon from "@/components/shared/PestIcon";
import { getAllPests } from "@/data/pest-library";

/**
 * PestLibraryIndex — /pest-library hub listing all pest profiles.
 * Migrated from the legacy Scorpion pest library to recover SEO equity.
 */
export default function PestLibraryIndex() {
  const pests = getAllPests();
  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: PLI_CSS }} />

      <section className="pli-hero">
        <div className="pli-inner">
          <div className="pli-eyebrow">PEST LIBRARY · ALABAMA</div>
          <h1 className="pli-h1">Know Your Alabama Pests</h1>
          <p className="pli-sub">
            Identification, behavior, and control for the pests we treat across Alabama —
            from termites and mosquitoes to the humidity-loving bugs in your basement.
            Family-owned since 1958.
          </p>
          <div className="pli-ctas">
            <a href="tel:2059406360" className="pli-cta-gold">Call (205) 940-6360</a>
            <Link href="/quote" className="pli-cta-outline">Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      <div className="pli-body">
        <div className="pli-inner">
          <div className="pli-grid">
            {pests.map((p) => (
              <Link key={p.slug} href={`/pest-library/${p.slug}`} className="pli-card">
                <span className="pli-icon" aria-hidden="true"><PestIcon name={p.icon} size={26} /></span>
                <span className="pli-card-body">
                  <span className="pli-card-name">{p.name}</span>
                  <span className="pli-card-also">{p.also}</span>
                </span>
                <span className="pli-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

const PLI_CSS = `
  .pli-inner { max-width: 980px; margin: 0 auto; padding: 0 clamp(20px,5vw,32px); }
  .pli-hero {
    background: linear-gradient(135deg, #07642B 0%, #0A7935 55%, #0E8E40 100%);
    color: #fff; padding: clamp(48px,7vw,80px) 0 clamp(44px,6vw,64px);
  }
  .pli-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: 0.12em; opacity: 0.85; margin-bottom: 14px; }
  .pli-h1 { font-family: var(--font-serif); font-size: clamp(30px,5.5vw,48px); font-weight: 700; line-height: 1.06; margin: 0 0 16px; }
  .pli-sub { font-size: clamp(16px,2.2vw,18px); line-height: 1.6; max-width: 62ch; opacity: 0.95; margin: 0 0 26px; }
  .pli-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
  .pli-cta-gold {
    background: #F5A800; color: #0E1A0F !important; text-decoration: none;
    padding: 13px 24px; border-radius: 999px; font-weight: 700; font-size: 15px;
    display: inline-flex; align-items: center; box-shadow: 0 4px 16px rgba(245,168,0,0.32);
  }
  .pli-cta-outline {
    border: 2px solid rgba(255,255,255,0.55); color: #fff !important; text-decoration: none;
    padding: 11px 22px; border-radius: 999px; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center;
  }
  .pli-body { background: #FEFDF8; padding: clamp(40px,6vw,64px) 0; }
  .pli-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media (min-width: 600px) { .pli-grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 920px) { .pli-grid { grid-template-columns: 1fr 1fr 1fr; } }
  .pli-card {
    display: flex; align-items: center; gap: 14px; background: #fff;
    border: 1px solid rgba(14,142,64,0.16); border-left: 4px solid #0E8E40;
    border-radius: 14px; padding: 16px 18px; text-decoration: none; color: #0E1A0F;
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .pli-card:hover { box-shadow: 0 10px 26px rgba(14,26,15,0.10); transform: translateY(-2px); }
  .pli-icon {
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
    width: 44px; height: 44px; border-radius: 11px; background: rgba(14,142,64,0.10); color: #0A7935;
  }
  .pli-card-body { display: flex; flex-direction: column; min-width: 0; }
  .pli-card-name { font-weight: 700; font-size: 16px; }
  .pli-card-also { font-size: 12.5px; color: #5b6f60; line-height: 1.35; margin-top: 2px; }
  .pli-arrow { margin-left: auto; color: #F5A800; font-weight: 700; flex-shrink: 0; }
`;
