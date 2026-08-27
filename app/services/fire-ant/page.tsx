// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/services/fire-ant/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
//
// WHAT CHANGED (Jun 11, 2026 — per Phillip):
// 1. PRICING: Fire ant is a PRICED SERVICE — $150 minimum, priced per sq ft
//    of covered area. NOT free, NOT included in pest control, NOT
//    existing-customer-only. Available to anyone, same model as tick.
// 2. BANNED LANGUAGE REMOVED: "Pet & Kid Friendly" card, "safe for pets and
//    children" FAQ → replaced with EPA label-directions language (Option 1
//    copy locked Jun 10).
// 3. MOBILE-FIRST REBUILD: 16px+ fonts, 48px+ tap targets, tel: links,
//    single column under 640px, sticky bottom CTA bar (mobile only),
//    no images = fast load, clamp() typography.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fire Ant Control in Alabama | Colony Elimination | EnviroCare",
  description:
    "Fire ant treatment that reaches the queen, not just the mound. $150 for most yards, one-year warranty. Open to all. Birmingham & across Alabama. (205) 940-6360.",
  alternates: { canonical: "/services/fire-ant" },
  openGraph: { url: 'https://www.envirocarellc.com/services/fire-ant',
    title: "Fire Ant Control | EnviroCare",
    description:
      "Whole-colony fire ant treatment with season-long suppression. $150 for most yards, backed by a one-year warranty.",
    type: "website",
  },
};

const BRAND_GREEN = "#0A7935";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

export default function FireAntPage() {
  const serif: React.CSSProperties = { fontFamily: "var(--font-serif)" };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fire Ant Control",
    serviceType: "Fire Ant Treatment",
    provider: {
      "@type": "LocalBusiness",
      name: "EnviroCare",
      telephone: "+1-205-940-6360",
      areaServed: "Alabama",
      address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd", addressLocality: "Alabaster", addressRegion: "AL", postalCode: "35007", addressCountry: "US" },
    },
    description:
      "Whole-colony fire ant bait treatment with season-long suppression for Alabama homes and properties. $150 covers most yards; larger properties are quoted by the square footage treated. Backed by a one-year warranty.",
    areaServed: { "@type": "State", name: "Alabama" },
    offers: {
      "@type": "Offer",
      price: "150",
      priceCurrency: "USD",
      description: "Starting price; final price based on square footage of covered area",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does fire ant control cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "$150 covers most yards. Larger properties are quoted by the square footage we treat, so call your local EnviroCare office for an exact number. Every fire ant treatment is backed by a one-year warranty.",
        },
      },
      {
        "@type": "Question",
        name: "Do I have to be an existing EnviroCare customer?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Fire ant control is available to anyone in our Alabama service area. Many customers pair it with bi-monthly pest control for year-round coverage, but it stands on its own.",
        },
      },
      {
        "@type": "Question",
        name: "How long does fire ant treatment last?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Our granular bait application provides season-long colony suppression — typically 6 to 9 months per application.",
        },
      },
      {
        "@type": "Question",
        name: "When can my family use the yard again?",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.envirocarellc.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.envirocarellc.com/services" },
      { "@type": "ListItem", position: 3, name: "Fire Ant Control" },
    ],
  };

  return (
    <main style={{ fontFamily: "var(--font-sans)", color: INK, background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(160deg, ${DEEP} 0%, ${FOREST} 60%, ${BRAND_GREEN} 100%)`, color: "#fff", padding: "clamp(48px, 8vw, 80px) 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, margin: "0 0 14px" }}>
            Fire Ant Control · Alabama
          </p>
          <h1 style={{ ...serif, fontSize: "clamp(32px, 7vw, 52px)", lineHeight: 1.12, margin: "0 0 16px" }}>
            Take back your yard from fire ants
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 19px)", lineHeight: 1.6, opacity: 0.92, maxWidth: 560, margin: "0 auto 12px" }}>
            Whole-colony bait treatment that collapses the mound from the inside —
            with season-long suppression, not a quick knockdown.
          </p>

          {/* PRICE CARD — clear, honest, mobile-legible */}
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: `1px solid rgba(245,168,0,0.5)`, borderRadius: 12, padding: "16px 28px", margin: "8px 0 28px" }}>
            <div style={{ fontSize: "clamp(26px, 5vw, 34px)", fontWeight: 800, color: GOLD }}>$150</div>
            <div style={{ fontSize: 15, opacity: 0.85, marginTop: 4 }}>Covers most yards · one-year warranty</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a
              href="tel:2059406360"
              style={{ background: GOLD, color: INK, padding: "16px 30px", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 17, minHeight: 48, display: "inline-flex", alignItems: "center", gap: 8 }}
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

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "clamp(48px, 7vw, 72px) 20px", maxWidth: 980, margin: "0 auto" }}>
        <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 10px", textAlign: "center" }}>
          Why bait beats mound-chasing
        </h2>
        <p style={{ fontSize: 16, color: "#4b5563", textAlign: "center", maxWidth: 680, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Drenching one mound just moves the colony. Our granular bait works the way
          fire ants do — workers carry it back to the queen, and the colony collapses
          from the inside.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
          {[
            {
              title: "Whole-Colony Bait",
              body: "Worker ants carry granular bait back to the queen. The colony collapses from the inside — no chasing the mound around the yard.",
            },
            {
              title: "Season-Long Suppression",
              body: "One properly timed application gives 6–9 months of control across the treated area.",
            },
            {
              title: "Yard-Wide Coverage",
              body: "We treat your covered area edge to edge, not just the mounds you can see. Pricing scales with the square footage we protect.",
            },
          ].map((c) => (
            <div key={c.title} style={{ background: CREAM, border: "1px solid rgba(14,142,64,0.18)", borderRadius: 12, padding: "22px 20px" }}>
              <h3 style={{ ...serif, fontSize: 20, color: DEEP, margin: "0 0 8px" }}>{c.title}</h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING EXPLAINER ── */}
      <section style={{ background: CREAM, padding: "clamp(48px, 7vw, 72px) 20px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 16px" }}>
            Simple, honest pricing
          </h2>
          <div style={{ background: "#fff", border: `2px solid ${BRAND_GREEN}`, borderRadius: 14, padding: "28px 24px", margin: "0 auto 20px", maxWidth: 480 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: BRAND_GREEN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Fire Ant Treatment
            </div>
            <div style={{ fontSize: "clamp(34px, 7vw, 44px)", fontWeight: 800, color: INK, lineHeight: 1 }}>
              $150<span style={{ fontSize: 18, fontWeight: 600, color: "#6b7280" }}> minimum</span>
            </div>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.6, margin: "12px 0 0" }}>
              Final price is based on the square footage of the area we cover.
              Bigger yards cost more than smaller ones — we'll quote your exact
              property before any work begins.
            </p>
          </div>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, maxWidth: 540, margin: "0 auto" }}>
            Many customers pair fire ant treatment with bi-monthly pest control or
            mosquito service for one technician and one invoice — same price as
            standalone, just simpler.
          </p>
        </div>
      </section>

      {/* ── PHONE GRID ── */}
      <section style={{ padding: "clamp(48px, 7vw, 72px) 20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 10px" }}>
            Call your local office
          </h2>
          <p style={{ fontSize: 16, color: "#4b5563", margin: "0 0 28px" }}>
            We'll measure your covered area and quote your exact price.
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
            q: "What does fire ant control cost?",
            a: "$150 covers most yards. Larger properties are quoted by the square footage we treat, so call your local office and we'll give you an exact number. Every treatment is backed by a one-year warranty.",
          },
          {
            q: "Do I have to be an existing EnviroCare customer?",
            a: "No. Fire ant control is available to anyone in our Alabama service area. Many customers pair it with bi-monthly pest control for year-round coverage, but it stands on its own.",
          },
          {
            q: "How long does fire ant treatment last?",
            a: "Our granular bait gives season-long colony suppression — typically 6 to 9 months per application.",
          },
          {
            q: "When can my family use the yard again?",
            a: "We use only EPA-registered products and apply them exactly as the label directs. Before your technician leaves, they'll let you know when treated areas are ready again — usually as soon as everything's dry.",
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
          Ready to get rid of fire ants?
        </h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          $150 covers most yards, backed by a one-year warranty. One call gets you an exact quote.
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

      {/* ── STICKY MOBILE CTA BAR ──
          Mobile-only. Two equal tap targets, 56px tall.
          Hidden ≥768px via the media query in the style tag below. */}
      <div
        id="fa-sticky-cta"
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
            @media (min-width: 768px) { #fa-sticky-cta { display: none !important; } }
            @media (max-width: 767px) { main { padding-bottom: 56px; } }
            details summary::-webkit-details-marker { display: none; }
          `,
        }}
      />
    </main>
  );
}
