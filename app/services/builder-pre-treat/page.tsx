import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Builder Termite Pre-Treatment | EnviroCare Pest & Termite Services",
  description:
    "Pre-construction termite treatment for builders in Alabama. Soil pre-treatment, Sentricon® bait systems, and combination plans. WDO letters available. Serving Birmingham, Huntsville & Lake Martin.",
  alternates: { canonical: "/services/builder-pre-treat" },
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
      name: "Builder Pre-Construction Termite Treatment",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare Pest & Termite Services",
        telephone: "(205) 940-6360",
        url: "https://envirocarellc.com",
      },
      areaServed: { "@type": "State", name: "Alabama" },
      description:
        "Pre-construction termite treatment for Alabama builders. Soil treatment, Sentricon bait systems, and combination approaches. WDO letters and paperwork handled.",
      serviceType: "Pre-Construction Termite Treatment",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://envirocarellc.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://envirocarellc.com/services" },
        { "@type": "ListItem", position: 3, name: "Builder Pre-Treatment" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What Alabama building code requires for termite pre-treatment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Alabama requires a soil treatment or approved alternative (such as a Sentricon® baiting system) prior to pouring the slab or covering treated soil. EnviroCare handles the required documentation for inspectors and lenders.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide the required paperwork for inspections and closing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We issue the NPCA-99-B form (soil treatment report) and can issue WDO letters (ADAI Form WDO-100) for closing. Builder packets, lender letters, and warranty documents are handled in-house.",
          },
        },
        {
          "@type": "Question",
          name: "How far in advance do you need to be scheduled?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We typically need 48–72 hours notice for soil pre-treatment. For ongoing builder relationships we schedule around your pour date to keep projects moving.",
          },
        },
        {
          "@type": "Question",
          name: "Do you work with production builders or only custom builds?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both. We handle individual custom homes and high-volume production builders with recurring scheduling. Call to discuss your volume and we'll set up an account.",
          },
        },
      ],
    },
  ],
};

export default function BuilderPreTreatPage() {
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
              For Builders & Contractors
            </p>
            <h1 style={{ ...serif, fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 700, margin: "0 0 16px", lineHeight: 1.2 }}>
              Pre-Construction Termite Treatment
            </h1>
            <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.65 }}>
              Code-compliant soil treatment and Sentricon® bait systems for Alabama builders. Paperwork handled. Projects keep moving.
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
              Talk to a Builder Rep → (205) 940-6360
            </Link>
          </div>
        </section>

        {/* TREATMENT OPTIONS */}
        <section style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 32, color: DEEP, textAlign: "center", marginBottom: 8 }}>
            Three Treatment Paths
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: 48, fontSize: 16 }}>
            We match the approach to the build — soil type, buyer preference, and lender requirements all factor in.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              {
                title: "Soil Pre-Treatment",
                tag: "Most Common",
                body: "Applied to the soil before the slab is poured. Creates a chemical barrier termites can't cross. Required by Alabama building code; we issue the NPCA-99-B form for your inspector.",
                detail: "Fast turnaround — typically same week. Minimal schedule disruption.",
                color: BRAND_GREEN,
              },
              {
                title: "Sentricon® Bait System",
                tag: "No-Drilling Option",
                body: "Sentricon® Always Active™ bait stations installed around the perimeter. No soil injection, no tank trucks. Works 24/7 and provides up to $1M in repair coverage under EnviroCare's plan.",
                detail: "Preferred for buyers who want ongoing monitoring. Annual renewal maintains coverage.",
                color: DEEP,
              },
              {
                title: "Combination Plan",
                tag: "Maximum Protection",
                body: "Soil pre-treatment at construction plus Sentricon® post-close. The builder gets code compliance; the buyer gets lifetime protection with monitoring.",
                detail: "Popular with premium builders marketing long-term warranty to buyers.",
                color: "#0a5e28",
              },
            ].map((plan) => (
              <div
                key={plan.title}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "32px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                  borderTop: `4px solid ${plan.color}`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: plan.color,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 4,
                    marginBottom: 16,
                    alignSelf: "flex-start",
                  }}
                >
                  {plan.tag}
                </span>
                <h3 style={{ ...serif, fontSize: 22, color: DEEP, marginBottom: 12 }}>{plan.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#444", marginBottom: 12 }}>{plan.body}</p>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, fontStyle: "italic", marginTop: "auto" }}>{plan.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PAPERWORK SECTION */}
        <section style={{ background: DEEP, color: "#fff", padding: "56px 24px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, marginBottom: 16, textAlign: "center" }}>
              The Paperwork — We Handle It
            </h2>
            <p style={{ fontSize: 16, opacity: 0.88, textAlign: "center", lineHeight: 1.7, marginBottom: 40 }}>
              Closing delays from missing termite documents are avoidable. We know what lenders, inspectors, and real estate attorneys need.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {[
                { doc: "NPCA-99-B", desc: "Soil treatment certification for inspectors and code compliance" },
                { doc: "WDO Letter", desc: "ADAI Form WDO-100 for VA, FHA, and conventional loan closings" },
                { doc: "Builder Warranty", desc: "Ongoing protection plan documentation for buyer at closing" },
                { doc: "Sentricon® Certificate", desc: "Bait system installation and monitoring confirmation" },
              ].map((d) => (
                <div
                  key={d.doc}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "22px 20px",
                    borderLeft: `3px solid ${GOLD}`,
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 8px", color: GOLD }}>{d.doc}</p>
                  <p style={{ fontSize: 14, opacity: 0.85, margin: 0, lineHeight: 1.55 }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ padding: "72px 24px", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
            Typical Builder Timeline
          </h2>
          {[
            { phase: "Pre-permit", action: "Call EnviroCare — we'll set up your builder account and confirm which treatment type meets your permit and lender requirements." },
            { phase: "Pre-pour (48–72 hrs out)", action: "We schedule soil pre-treatment to align with your pour date. We issue the NPCA-99-B immediately after treatment." },
            { phase: "Framing / close-out", action: "If adding Sentricon®, stations are installed around the perimeter post-frame. Certificate issued for closing packet." },
            { phase: "Closing", action: "WDO letter (if required by lender) issued. Buyer receives warranty documentation and is set up in our system for annual renewal." },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                marginBottom: 28,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: BRAND_GREEN,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: DEEP, margin: "0 0 6px", fontSize: 16 }}>{item.phase}</p>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#444", margin: 0 }}>{item.action}</p>
              </div>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section style={{ background: "#fff", padding: "64px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
              Builder FAQs
            </h2>
            {[
              {
                q: "What does Alabama building code require for termite pre-treatment?",
                a: "Alabama requires a soil treatment or approved alternative — such as a Sentricon® baiting system — before pouring the slab or covering treated soil. EnviroCare handles the required documentation for inspectors and lenders.",
              },
              {
                q: "Do you provide the required paperwork for inspections and closing?",
                a: "Yes. We issue the NPCA-99-B form for soil treatment and WDO letters (ADAI Form WDO-100) for closing. Builder packets, lender letters, and warranty documents are handled in-house.",
              },
              {
                q: "How far in advance do you need to be scheduled?",
                a: "We need 48–72 hours for soil pre-treatment. For ongoing builder relationships we coordinate around your pour date to keep projects on schedule.",
              },
              {
                q: "Do you work with production builders or only custom builds?",
                a: "Both. We handle individual custom homes and high-volume production builders with recurring scheduling. Call to discuss your volume and we'll set up a builder account.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ borderBottom: "1px solid rgba(14,142,64,0.15)", padding: "24px 0" }}
              >
                <h3 style={{ ...serif, fontSize: 18, color: DEEP, marginBottom: 10 }}>{item.q}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#444", margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / OFFICES */}
        <section style={{ padding: "56px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 24, color: DEEP, textAlign: "center", marginBottom: 8 }}>
            Ready to set up a builder account?
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: 32, fontSize: 16 }}>
            Call the office closest to your job site. We'll get you set up and on the schedule.
          </p>
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
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/services/wdo-letters" style={{ color: BRAND_GREEN, fontWeight: 600 }}>
              Need a WDO letter for a real estate closing? →
            </Link>
          </p>
        </section>

      </main>
    </>
  );
}
