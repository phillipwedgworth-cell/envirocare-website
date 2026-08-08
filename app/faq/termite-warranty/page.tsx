// app/faq/termite-warranty/page.tsx
// EnviroCare · Sentricon $1M Termite Warranty FAQ
// Server component — no client interactivity needed

import type { Metadata } from "next";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Sentricon $1 Million Termite Warranty FAQ | EnviroCare Alabama",
  description:
    "How the Sentricon $1,000,000 termite damage warranty works in Alabama — what is covered and how to keep it active. Family-owned since 1958.",
  alternates: { canonical: './' },
  openGraph: {
    title: "Sentricon $1 Million Termite Warranty FAQ | EnviroCare Alabama",
    description: "How the Sentricon $1,000,000 termite damage warranty works in Alabama — what is covered and how to keep it active. Family-owned since 1958.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sentricon $1 Million Termite Warranty FAQ | EnviroCare Alabama",
    description: "How the Sentricon $1,000,000 termite damage warranty works in Alabama — what is covered and how to keep it active. Family-owned since 1958.",
    images: ['/og-image.png'],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Sentricon $1 million termite warranty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If termites cause structural damage to your home while it's under active Sentricon® protection, EnviroCare covers repair costs up to $1,000,000. That coverage is subject to the terms of the agreement — backed by four generations protecting Alabama homes since 1958.",
      },
    },
    {
      "@type": "Question",
      name: "What does the Sentricon warranty cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The warranty covers structural repair costs caused by subterranean termite damage that occurs while the Sentricon system is active and properly maintained. Coverage requires that annual inspections are completed and the bait stations remain active. Your EnviroCare technician confirms coverage status at each annual inspection.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Sentricon cost at EnviroCare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EnviroCare prices Sentricon® after a free on-site WDO inspection, as Alabama requires — the exact figure depends on your home's linear footage and foundation type. Every plan includes the same Sentricon Always Active system and the full $1,000,000 warranty, and the inspection is always free with no obligation.",
      },
    },
    {
      "@type": "Question",
      name: "Is drilling required to install Sentricon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sentricon is an in-ground bait station system. Stations are installed around the perimeter of your home in the soil — no drilling into your slab, no chemical injection through your foundation. This is one of the key advantages over liquid termite barrier treatments.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Sentricon and liquid termite treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Liquid treatment (Termidor, etc.) creates a chemical barrier in the soil around your foundation. It kills termites on contact but doesn't eliminate the colony. Sentricon uses bait that worker termites carry back to the colony, eliminating the entire colony including the queen. Sentricon is the only termite product to receive the EPA Presidential Green Chemistry Challenge Award.",
      },
    },
  ],
};

const G = "#0A7935";
const GT = "#0A7935";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const CREAM = "#FEFDF8";
const PAPER = "#F8F6EE";
const GREY = "#6B7569";
const LINE = "rgba(14,26,15,0.12)";
const sf = { fontFamily: "var(--font-sans)" } as const;
const ss = { fontFamily: "'Fraunces', var(--font-serif)" } as const;

const FAQS = [
  {
    q: "What is the Sentricon $1,000,000 termite warranty?",
    a: "If termites cause structural damage to your home while it's under active Sentricon® Always Active protection, EnviroCare covers repair costs up to $1,000,000. That coverage is subject to the terms of the agreement, and it's among the strongest in residential termite control.",
  },
  {
    q: "What exactly does the warranty cover?",
    a: "Structural repair costs from subterranean termite damage that occurs while the Sentricon system is active and properly maintained. This includes damage to load-bearing walls, floor joists, rafters, and other structural members. The warranty applies as long as your annual inspection is completed and your bait stations remain active with fresh bait.",
  },
  {
    q: "What's NOT covered?",
    a: "Cosmetic damage (paint, wallpaper, trim) that isn't structural. Pre-existing damage present before Sentricon installation. Damage from other wood-destroying insects like carpenter ants or wood-boring beetles — Sentricon is specifically for subterranean termites. Your EnviroCare technician will document your home's condition at installation to establish a baseline.",
  },
  {
    q: "How do I keep the warranty active?",
    a: "Complete your annual inspection every 12 months. EnviroCare schedules and reminds you — you don't need to track it yourself. As long as your account is current and your annual inspection happens, you're covered. If you cancel service and restart, a new inspection and waiting period may apply.",
  },
  {
    q: "How much does Sentricon cost at EnviroCare?",
    a: "Sentricon® is priced after a free on-site WDO inspection — Alabama regulates termite work, so the exact figure depends on your home's linear footage and foundation type. Every plan includes the same Sentricon Always Active system and the full $1,000,000 warranty. The inspection is free with no obligation.",
  },
  {
    q: "Is drilling required to install Sentricon?",
    a: "No. Sentricon stations go into the soil around your home's perimeter — no drilling into your slab, no injection through your foundation wall, no damage to landscaping. Installation typically takes 2–3 hours. You don't need to be home for the technician to install.",
  },
  {
    q: "How is Sentricon different from liquid termite treatment?",
    a: "Liquid barrier treatments (Termidor, etc.) create a chemical zone around your foundation that kills termites on contact but leaves the colony alive to keep generating workers. Sentricon uses a bait that worker termites carry back to the colony — it eliminates the entire colony including the queen. Sentricon is also the only termite control product to receive the EPA's Presidential Green Chemistry Challenge Award.",
  },
  {
    q: "Do I need to leave my house during installation?",
    a: "No. Installation involves placing stations in the soil around the outside of your home. The technician doesn't need to enter your house. There's no chemical injection, no drilling, and nothing that requires you to vacate.",
  },
  {
    q: "Will I see termites die?",
    a: "Usually not directly. Sentricon works by colony elimination — worker termites find the bait, feed on it, and share it with the colony including the queen. The colony declines over 30–90 days as reproductives stop producing and workers die off. Your technician checks bait consumption at each annual inspection and confirms the colony is being impacted.",
  },
  {
    q: "Can I add Sentricon to my existing pest control plan?",
    a: "Yes. Sentricon can be added to any existing EnviroCare pest control plan on one invoice — pest control is $35/month and the Sentricon® portion is quoted at your free WDO inspection, with the same technician on one schedule. Call any of our four Alabama offices to add termite protection.",
  },
  {
    q: "EnviroCare vs. Terminix or Orkin for termites — what's the difference?",
    a: "EnviroCare is the only local, family-owned Sentricon Certified Specialist in central Alabama. Kevin Wedgworth's family has been protecting Alabama homes since 1958. National chains rotate technicians — you'll get a different person each visit. EnviroCare assigns the same tech to your property so they know your home's history. And up to $1,000,000 in damage repair coverage stands behind every Sentricon system, subject to the terms of the agreement we install and maintain.",
  },
];

const COMPARE = [
  { feature: "Method", sentricon: "In-ground bait stations", liquid: "Soil injection barrier" },
  { feature: "Colony elimination", sentricon: "Yes — kills entire colony", liquid: "No — kills workers on contact" },
  { feature: "Drilling required", sentricon: "None", liquid: "Yes — through slab/foundation" },
  { feature: "Damage warranty", sentricon: "$1,000,000 (Corteva)", liquid: "Varies / none standard" },
  { feature: "EPA recognition", sentricon: "Presidential Green Chemistry Award", liquid: "Standard registration" },
  { feature: "Re-treatment needed", sentricon: "Annual inspection only", liquid: "Every 5–10 years" },
  { feature: "Chemical in soil", sentricon: "Minimal — targeted bait only", liquid: "100+ gallons injected" },
];

export default function TermiteWarrantyFAQ() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM, ...sf }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(160deg, ${DARK} 0%, #0a1f10 100%)`,
          padding: "72px clamp(20px,5vw,64px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: GOLD,
            opacity: 0.04,
            filter: "blur(90px)",
          }}
        />
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${GOLD}18`,
              border: `1px solid ${GOLD}44`,
              borderRadius: 6,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: GOLD,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Sentricon® · $1,000,000 Warranty · FAQ
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem,4.5vw,3rem)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: "-0.02em",
              ...ss,
            }}
          >
            The Sentricon $1,000,000 Warranty —{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              What It Really Covers.
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: 36,
              maxWidth: 640,
            }}
          >
            Industry’s strongest termite protection. No drilling required.
            Here's exactly how the warranty works, what it covers, and what it
            costs.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="/services/sentricon"
              style={{
                background: GOLD,
                color: DARK,
                padding: "14px 30px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              See Sentricon Plans →
            </a>
            <a
              href="tel:2059406360"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {/* WARRANTY CALLOUT */}
      <section style={{ background: "#fff", padding: "56px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            {[
              {
                n: "$1,000,000",
                label: "Repair warranty",
                note: "Our guarantee — four generations behind it",
                color: GOLD,
              },
              {
                n: "No drilling",
                label: "Installation method",
                note: "In-ground stations — no holes in your slab or foundation",
                color: G,
              },
              {
                n: "Quote",
                label: "Starting price",
                note: "No setup fee, no initial charge, no annual contract",
                color: G,
              },
              {
                n: "EPA award",
                label: "Green Chemistry recognition",
                note: "Only termite product to win the Presidential Green Chemistry Challenge",
                color: GT,
              },
            ].map((item) => (
              <div
                key={item.n}
                style={{
                  background: CREAM,
                  border: `1px solid ${LINE}`,
                  borderRadius: 12,
                  padding: "24px 20px",
                  borderTop: `3px solid ${item.color}`,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: item.color,
                    marginBottom: 4,
                    ...ss,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.n}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: DARK,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: GREY, lineHeight: 1.5 }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section
        style={{ background: PAPER, padding: "64px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 8,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            Sentricon vs. Liquid Termite Treatment
          </h2>
          <p style={{ color: GREY, fontSize: 14, marginBottom: 28 }}>
            Side-by-side comparison of the two most common termite control methods.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                minWidth: 520,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      background: DARK,
                      color: GOLD,
                      textAlign: "left",
                      padding: "12px 16px",
                      ...ss,
                      fontWeight: 500,
                    }}
                  >
                    Feature
                  </th>
                  <th
                    style={{
                      background: DARK,
                      color: GOLD,
                      textAlign: "left",
                      padding: "12px 16px",
                      ...ss,
                      fontWeight: 500,
                    }}
                  >
                    Sentricon®
                  </th>
                  <th
                    style={{
                      background: DARK,
                      color: "rgba(255,255,255,0.55)",
                      textAlign: "left",
                      padding: "12px 16px",
                      ...ss,
                      fontWeight: 500,
                    }}
                  >
                    Liquid Barrier
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={row.feature}>
                    <td
                      style={{
                        padding: "13px 16px",
                        borderBottom: `1px solid ${LINE}`,
                        fontWeight: 600,
                        background: i % 2 === 0 ? "#fff" : CREAM,
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        borderBottom: `1px solid ${LINE}`,
                        color: GT,
                        fontWeight: 600,
                        background: i % 2 === 0 ? `${G}06` : `${G}0A`,
                      }}
                    >
                      {row.sentricon}
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        borderBottom: `1px solid ${LINE}`,
                        color: GREY,
                        background: i % 2 === 0 ? "#fff" : CREAM,
                      }}
                    >
                      {row.liquid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        style={{ background: CREAM, padding: "64px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem,2.8vw,2rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 40,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            Termite Warranty FAQ
          </h2>
          <div>
            {FAQS.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1px solid ${LINE}`,
                  padding: "24px 0",
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    color: DARK,
                    fontSize: 17,
                    marginBottom: 10,
                    lineHeight: 1.4,
                    ...ss,
                  }}
                >
                  {item.q}
                </p>
                <p
                  style={{
                    color: "#3d4f44",
                    lineHeight: 1.8,
                    fontSize: 15,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(160deg, ${DARK} 0%, #0d2b12 100%)`,
          padding: "72px clamp(20px,5vw,64px)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: `1px solid ${GOLD}55`,
              borderRadius: 4,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            Sentricon Certified Specialist · Alabama
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 600,
              color: "#fff",
              marginBottom: 16,
              letterSpacing: "-0.02em",
              ...ss,
            }}
          >
            $1,000,000 Termite Protection.{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              Priced after a free WDO inspection.
            </em>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              marginBottom: 32,
              fontSize: 16,
              lineHeight: 1.75,
            }}
          >
            No drilling. No setup fee. The Wedgworth family has protected
            Alabama homes from termites since 1958. Free inspection, no
            pressure.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/quote"
              style={{
                background: GOLD,
                color: DARK,
                padding: "16px 36px",
                borderRadius: 8,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Get Free Termite Inspection →
            </a>
            <a
              href="tel:2059406360"
              style={{
                background: "transparent",
                color: "#fff",
                padding: "16px 36px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              (205) 940-6360
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
