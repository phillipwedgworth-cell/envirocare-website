import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fire Ant Control | EnviroCare Pest & Termite Services",
  description:
    "Fire ant re-treatment included for EnviroCare pest control customers. No extra charge — just call and we come back. Serving Birmingham, Huntsville & Lake Martin, AL.",
  alternates: { canonical: "/services/fire-ant" },
  robots: { index: true, follow: true },
};

const BRAND_GREEN = "#0E8E40";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Fire Ant Control",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare Pest & Termite Services",
        telephone: "(205) 940-6360",
        url: "https://envirocarellc.com",
      },
      areaServed: [{ "@type": "State", name: "Alabama" }],
      description:
        "Fire ant control and re-treatment included at no extra charge for EnviroCare bi-monthly pest control customers.",
      serviceType: "Fire Ant Control",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://envirocarellc.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://envirocarellc.com/services" },
        { "@type": "ListItem", position: 3, name: "Fire Ant Control" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is fire ant treatment included with my pest control plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. EnviroCare's bi-monthly perimeter pest control plan covers fire ants. If a mound returns between visits, call us — re-treatment is included at no extra charge.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a separate fire ant contract?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Fire ant control is part of your existing EnviroCare plan. There is no separate contract or add-on fee.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly will you come back if fire ants return?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically within 1–2 business days of your call. Unlimited re-service is part of the plan — just let us know and we schedule it.",
          },
        },
        {
          "@type": "Question",
          name: "I'm not a current customer. Can I sign up just for fire ants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fire ant coverage is offered as part of our bi-monthly perimeter pest plan, which covers 30+ pests. Call your nearest office and we'll walk you through the options.",
          },
        },
      ],
    },
  ],
};

export default function FireAntPage() {
  const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
  const sans: React.CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: CREAM, minHeight: "100vh", color: INK, ...sans }}>

        {/* HERO */}
        <section
          style={{
            background: `linear-gradient(135deg, ${DEEP} 0%, #0a5e28 100%)`,
            color: "#fff",
            padding: "72px 24px 56px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>
              For EnviroCare Customers
            </p>
            <h1 style={{ ...serif, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, margin: "0 0 16px", lineHeight: 1.2 }}>
              Fire Ant Control
            </h1>
            <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 560, margin: "0 auto 32px" }}>
              Already on our plan? Fire ant re-treatment is included — no extra charge, no waiting.
            </p>
            <Link
              href="tel:2059406360"
              style={{
                display: "inline-block",
                background: GOLD,
                color: "#000",
                padding: "14px 32px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              Call for Re-Treatment → (205) 940-6360
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 32, color: DEEP, textAlign: "center", marginBottom: 8 }}>
            How Fire Ant Coverage Works
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: 48, fontSize: 16 }}>
            Simple. No paperwork. No extra fees.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { step: "1", title: "You're on plan", body: "Your bi-monthly EnviroCare service already includes fire ant coverage across your entire property perimeter." },
              { step: "2", title: "Fire ant mound appears", body: "Alabama fire ants are aggressive recolonizers. Mounds can pop up between visits — that's normal in our climate." },
              { step: "3", title: "Call or text us", body: "Contact your nearest office. We'll schedule a re-treatment — usually within 1–2 business days, no charge." },
              { step: "4", title: "We come back", body: "Technician treats the mound(s). Covered under your unlimited re-service agreement." },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "28px 24px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  borderTop: `4px solid ${BRAND_GREEN}`,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: BRAND_GREEN,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 16,
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ ...serif, fontSize: 19, color: DEEP, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#444", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT'S INCLUDED BANNER */}
        <section style={{ background: DEEP, color: "#fff", padding: "48px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, marginBottom: 16 }}>
              Your plan already covers 30+ pests — including fire ants
            </h2>
            <p style={{ fontSize: 16, opacity: 0.88, lineHeight: 1.7, marginBottom: 32 }}>
              EnviroCare's bi-monthly perimeter treatment handles fire ants, fleas, roaches, spiders, silverfish, earwigs,
              centipedes, and more. Unlimited re-service means we don't clock out after your scheduled visit.
            </p>
            <Link
              href="/services/pest-control"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.6)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              See Full Pest Plan Coverage
            </Link>
          </div>
        </section>

        {/* NOT A CUSTOMER CTA */}
        <section style={{ padding: "64px 24px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: 28, color: DEEP, marginBottom: 12 }}>
            Not a customer yet?
          </h2>
          <p style={{ fontSize: 16, color: "#555", lineHeight: 1.7, marginBottom: 32 }}>
            Fire ant control is included in our bi-monthly perimeter plan starting at $35/mo. One call gets you
            covered for fire ants plus 30+ other pests, with unlimited re-service.
          </p>
          <Link
            href="/quote"
            style={{
              display: "inline-block",
              background: BRAND_GREEN,
              color: "#fff",
              padding: "14px 36px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            Get a Free Quote
          </Link>
        </section>

        {/* FAQ */}
        <section style={{ background: "#fff", padding: "64px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
              Fire Ant FAQs
            </h2>
            {[
              {
                q: "Is fire ant treatment included with my pest control plan?",
                a: "Yes. EnviroCare's bi-monthly perimeter plan covers fire ants. If a mound returns between visits, call us — re-treatment is included at no extra charge.",
              },
              {
                q: "Do I need a separate fire ant contract?",
                a: "No. Fire ant control is part of your existing EnviroCare plan. There's no separate contract or add-on fee.",
              },
              {
                q: "How quickly will you come back if fire ants return?",
                a: "Typically within 1–2 business days. Unlimited re-service is part of the plan — just let us know and we schedule it.",
              },
              {
                q: "I'm not a customer yet. Can I sign up just for fire ants?",
                a: "Fire ant coverage is part of our bi-monthly perimeter pest plan, which covers 30+ pests. Call your nearest office and we'll walk you through the options.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid rgba(14,142,64,0.15)",
                  padding: "24px 0",
                }}
              >
                <h3 style={{ ...serif, fontSize: 18, color: DEEP, marginBottom: 10 }}>{item.q}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#444", margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OFFICE CONTACTS */}
        <section style={{ padding: "48px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 24, color: DEEP, textAlign: "center", marginBottom: 32 }}>
            Call Your Nearest Office
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { city: "Birmingham / Alabaster", phone: "(205) 940-6360", href: "tel:2059406360" },
              { city: "Alex City / Lake Martin", phone: "(256) 234-6162", href: "tel:2562346162" },
              { city: "Huntsville", phone: "(256) 937-7676", href: "tel:2569377676" },
            ].map((o) => (
              <Link
                key={o.city}
                href={o.href}
                style={{
                  display: "block",
                  background: BRAND_GREEN,
                  color: "#fff",
                  borderRadius: 10,
                  padding: "22px 20px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>{o.city}</p>
                <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{o.phone}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
