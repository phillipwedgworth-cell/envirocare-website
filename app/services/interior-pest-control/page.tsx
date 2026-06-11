// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/services/interior-pest-control/page.tsx
// Commit: feat: interior + exterior quarterly service page — $98/qtr, flea add-on $128/qtr
// Push: main
// ─────────────────────────────────────
//
// ⚠️ PHILLIP CONFIRM BEFORE DEPLOY (one assumption made):
// Interpreted as: Quarterly INSIDE + OUTSIDE plan = $98/quarter (4 visits/yr,
// interior treatment included each visit). Flea add-on = +$30/quarter =
// $128/quarter total. Flea REQUIRES this plan (interior access needed).
// If $98 is interior-ONLY stacked on top of the bi-monthly plan, say so and
// this page gets a 5-minute revision before pushing.
//
// MARKET CONTEXT (researched Jun 11, 2026): National quarterly plans average
// $100–$175/visit; Terminix leads with interior+exterior framing. $98 is a
// price-leadership position — this page says so without naming competitors.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interior + Exterior Pest Control in Alabama | EnviroCare Pest & Termite",
  description:
    "Quarterly inside-and-outside pest control for Alabama homes — $98 per quarter. Add flea treatment for $30 more. Family-owned since 1958.",
  alternates: { canonical: "/services/interior-pest-control" },
  openGraph: {
    title: "Interior + Exterior Pest Control | EnviroCare",
    description:
      "Quarterly inside-and-outside protection — $98/quarter. Flea treatment add-on available.",
    type: "website",
  },
};

const BRAND_GREEN = "#0E8E40";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

export default function InteriorPestControlPage() {
  const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interior + Exterior Pest Control",
    serviceType: "Quarterly Interior and Exterior Pest Control",
    provider: {
      "@type": "LocalBusiness",
      name: "EnviroCare Pest & Termite Services",
      telephone: "+1-205-940-6360",
      areaServed: "Alabama",
    },
    description:
      "Quarterly pest control covering both the inside and outside of your home, with optional flea treatment add-on. Serving Alabama since 1958.",
    areaServed: { "@type": "State", name: "Alabama" },
    offers: {
      "@type": "Offer",
      price: "98",
      priceCurrency: "USD",
      description: "Per quarter; flea treatment add-on available for $30 more per quarter",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the interior + exterior plan cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "The quarterly inside-and-outside plan is $98 per quarter — four visits a year, each covering interior trouble spots and the full exterior perimeter. Adding flea treatment brings it to $128 per quarter.",
        },
      },
      {
        "@type": "Question",
        name: "How is this different from the bi-monthly plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Our bi-monthly plan ($35/month) is exterior-first — six visits a year protecting your home from the outside, no need to be home. The quarterly plan adds interior treatment to every visit for homes that want inside coverage too.",
        },
      },
      {
        "@type": "Question",
        name: "Why does flea treatment require the interior plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Fleas live where pets live — carpets, bedding, baseboards, and furniture. Effective flea control has to treat inside the home, so it's offered as a $30-per-quarter add-on to our interior + exterior plan.",
        },
      },
      {
        "@type": "Question",
        name: "When can my family use treated rooms again?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We use only EPA-registered products and apply them exactly as the label directs. Before your technician leaves, they'll let you know when treated areas are ready again — usually as soon as everything's dry.",
        },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://envirocarellc.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://envirocarellc.com/services" },
      { "@type": "ListItem", position: 3, name: "Interior + Exterior Pest Control" },
    ],
  };

  return (
    <main style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: INK, background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(160deg, ${DEEP} 0%, ${FOREST} 60%, ${BRAND_GREEN} 100%)`, color: "#fff", padding: "clamp(48px, 8vw, 80px) 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, margin: "0 0 14px" }}>
            Quarterly Plan · Inside + Outside
          </p>
          <h1 style={{ ...serif, fontSize: "clamp(32px, 7vw, 52px)", lineHeight: 1.12, margin: "0 0 16px" }}>
            Protection that covers both sides of your front door
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 19px)", lineHeight: 1.6, opacity: 0.92, maxWidth: 560, margin: "0 auto 12px" }}>
            Four visits a year. Every visit treats your interior trouble spots
            and your full exterior perimeter.
          </p>

          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: `1px solid rgba(245,168,0,0.5)`, borderRadius: 12, padding: "16px 28px", margin: "8px 0 28px" }}>
            <div style={{ fontSize: "clamp(26px, 5vw, 34px)", fontWeight: 800, color: GOLD }}>$98 / quarter</div>
            <div style={{ fontSize: 15, opacity: 0.85, marginTop: 4 }}>Add flea treatment — $128/quarter total</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a
              href="tel:2059406360"
              style={{ background: GOLD, color: INK, padding: "16px 30px", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 17, minHeight: 48, display: "inline-flex", alignItems: "center" }}
            >
              Call (205) 940-6360
            </a>
            <Link
              href="/quote"
              style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "14px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 17, minHeight: 48, display: "inline-flex", alignItems: "center" }}
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── TWO PLANS, SIDE BY SIDE ── */}
      <section style={{ padding: "clamp(48px, 7vw, 72px) 20px", maxWidth: 980, margin: "0 auto" }}>
        <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 10px", textAlign: "center" }}>
          Two ways to protect your home
        </h2>
        <p style={{ fontSize: 16, color: "#4b5563", textAlign: "center", maxWidth: 680, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Most Alabama homes do great with exterior-first protection. Homes with
          pets, past interior issues, or anyone who just wants inside coverage
          choose the quarterly plan.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 18 }}>
          {/* Bi-monthly card */}
          <div style={{ background: CREAM, border: "1px solid rgba(14,142,64,0.18)", borderRadius: 14, padding: "26px 22px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: BRAND_GREEN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Exterior-First · Bi-Monthly
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: INK, lineHeight: 1, marginBottom: 4 }}>
              $35<span style={{ fontSize: 17, fontWeight: 600, color: "#6b7280" }}>/mo</span>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 16px" }}>6 visits a year · or $70 bi-monthly</p>
            <ul style={{ margin: 0, padding: "0 0 0 20px", fontSize: 16, color: "#374151", lineHeight: 1.9 }}>
              <li>Full exterior perimeter every visit</li>
              <li>30+ Alabama pests covered</li>
              <li>You don't need to be home</li>
              <li>Unlimited re-service between visits</li>
            </ul>
            <Link
              href="/services/pest-control"
              style={{ display: "block", textAlign: "center", marginTop: 20, background: "#fff", color: DEEP, border: `2px solid ${BRAND_GREEN}`, padding: "13px 0", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 16 }}
            >
              See Bi-Monthly Plan
            </Link>
          </div>

          {/* Quarterly interior card */}
          <div style={{ background: "#fff", border: `2px solid ${GOLD}`, borderRadius: 14, padding: "26px 22px", position: "relative" }}>
            <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: GOLD, color: INK, fontSize: 12, fontWeight: 800, padding: "4px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
              INSIDE + OUTSIDE
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: BRAND_GREEN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, marginTop: 6 }}>
              Interior + Exterior · Quarterly
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: INK, lineHeight: 1, marginBottom: 4 }}>
              $98<span style={{ fontSize: 17, fontWeight: 600, color: "#6b7280" }}>/quarter</span>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 16px" }}>4 visits a year · interior included every visit</p>
            <ul style={{ margin: 0, padding: "0 0 0 20px", fontSize: 16, color: "#374151", lineHeight: 1.9 }}>
              <li>Everything in the exterior plan</li>
              <li>Interior baseboards, kitchens, baths</li>
              <li>Garage and entry-point treatment</li>
              <li>Flea add-on available (+$30/qtr)</li>
            </ul>
            <a
              href="tel:2059406360"
              style={{ display: "block", textAlign: "center", marginTop: 20, background: GOLD, color: INK, padding: "14px 0", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 16 }}
            >
              Call to Start — (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {/* ── FLEA ADD-ON ── */}
      <section style={{ background: CREAM, padding: "clamp(48px, 7vw, 72px) 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 16px" }}>
            Have pets? Add flea treatment.
          </h2>
          <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.65, maxWidth: 600, margin: "0 auto 24px" }}>
            Fleas live where pets live — carpets, bedding, baseboards, furniture.
            That's why real flea control has to happen inside the home, and why
            it's built on top of this plan.
          </p>
          <div style={{ background: "#fff", border: `2px solid ${BRAND_GREEN}`, borderRadius: 14, padding: "28px 24px", margin: "0 auto", maxWidth: 480 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: BRAND_GREEN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Interior Plan + Flea Treatment
            </div>
            <div style={{ fontSize: "clamp(34px, 7vw, 44px)", fontWeight: 800, color: INK, lineHeight: 1 }}>
              $128<span style={{ fontSize: 18, fontWeight: 600, color: "#6b7280" }}>/quarter</span>
            </div>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.6, margin: "12px 0 0" }}>
              Quarterly inside-and-outside service plus targeted flea treatment
              of the interior areas your pets use most.
            </p>
          </div>
        </div>
      </section>

      {/* ── PHONE GRID ── */}
      <section style={{ padding: "clamp(48px, 7vw, 72px) 20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 10px" }}>
            Call your local office
          </h2>
          <p style={{ fontSize: 16, color: "#4b5563", margin: "0 0 28px" }}>
            One call sets up your first inside-and-outside visit.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14, maxWidth: 820, margin: "0 auto" }}>
            {[
              { city: "Birmingham", phone: "(205) 940-6360", tel: "2059406360" },
              { city: "Alex City / Lake Martin", phone: "(256) 234-6162", tel: "2562346162" },
              { city: "Huntsville", phone: "(256) 937-7676", tel: "2569377676" },
              { city: "Auburn", phone: "(334) 332-3321", tel: "3343323321" },
            ].map((o) => (
              <a
                key={o.city}
                href={`tel:${o.tel}`}
                style={{ display: "block", background: CREAM, border: "1px solid rgba(14,142,64,0.2)", borderRadius: 12, padding: "20px 16px", textDecoration: "none", color: INK, minHeight: 48 }}
              >
                <div style={{ ...serif, fontSize: 18, color: DEEP, fontWeight: 700, marginBottom: 6 }}>{o.city}</div>
                <div style={{ fontSize: 17, color: BRAND_GREEN, fontWeight: 700 }}>{o.phone}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "0 20px clamp(48px, 7vw, 72px)", maxWidth: 820, margin: "0 auto" }}>
        <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 32px)", color: DEEP, margin: "0 0 28px", textAlign: "center" }}>
          Common questions
        </h2>
        {[
          {
            q: "What does the interior + exterior plan cost?",
            a: "The quarterly inside-and-outside plan is $98 per quarter — four visits a year, each covering interior trouble spots and the full exterior perimeter. Adding flea treatment brings it to $128 per quarter.",
          },
          {
            q: "How is this different from the bi-monthly plan?",
            a: "Our bi-monthly plan ($35/month) is exterior-first — six visits a year protecting your home from the outside, with no need to be home. The quarterly plan adds interior treatment to every visit for homes that want inside coverage too.",
          },
          {
            q: "Why does flea treatment require the interior plan?",
            a: "Fleas live where pets live — carpets, bedding, baseboards, and furniture. Effective flea control has to treat inside the home, so it's offered as a $30-per-quarter add-on to this plan.",
          },
          {
            q: "When can my family use treated rooms again?",
            a: "We use only EPA-registered products and apply them exactly as the label directs. Before your technician leaves, they'll let you know when treated areas are ready again — usually as soon as everything's dry.",
          },
          {
            q: "Do I need to be home for every visit?",
            a: "For interior treatment, yes — we need access to the inside of your home. We schedule visits in windows that work for you, and the exterior portion can be done any time.",
          },
        ].map((f, i) => (
          <details
            key={i}
            style={{ background: "#fff", border: "1px solid rgba(14,142,64,0.15)", borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}
          >
            <summary style={{ ...serif, fontSize: 17, color: DEEP, fontWeight: 700, cursor: "pointer", listStyle: "none", minHeight: 32, display: "flex", alignItems: "center" }}>
              {f.q}
            </summary>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.65, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
          </details>
        ))}
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ background: INK, color: "#fff", padding: "clamp(40px, 6vw, 56px) 20px", textAlign: "center" }}>
        <h2 style={{ ...serif, fontSize: "clamp(24px, 5vw, 30px)", color: GOLD, margin: "0 0 12px" }}>
          Inside and outside, handled.
        </h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          $98 per quarter. Add flea treatment for $128 total. Family-owned since 1958.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a
            href="tel:2059406360"
            style={{ background: GOLD, color: INK, padding: "16px 30px", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 17, minHeight: 48, display: "inline-flex", alignItems: "center" }}
          >
            Call (205) 940-6360
          </a>
          <Link
            href="/quote"
            style={{ background: BRAND_GREEN, color: "#fff", padding: "16px 30px", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 17, minHeight: 48, display: "inline-flex", alignItems: "center" }}
          >
            Free Quote
          </Link>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA BAR ── */}
      <div
        id="int-sticky-cta"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90, display: "flex", boxShadow: "0 -2px 12px rgba(0,0,0,0.15)" }}
      >
        <a
          href="tel:2059406360"
          style={{ flex: 1, background: GOLD, color: INK, textAlign: "center", padding: "17px 8px", fontWeight: 800, fontSize: 16, textDecoration: "none" }}
        >
          Call Now
        </a>
        <Link
          href="/quote"
          style={{ flex: 1, background: BRAND_GREEN, color: "#fff", textAlign: "center", padding: "17px 8px", fontWeight: 800, fontSize: 16, textDecoration: "none" }}
        >
          Free Quote
        </Link>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 768px) { #int-sticky-cta { display: none !important; } }
            @media (max-width: 767px) { main { padding-bottom: 56px; } }
            details summary::-webkit-details-marker { display: none; }
          `,
        }}
      />
    </main>
  );
}
