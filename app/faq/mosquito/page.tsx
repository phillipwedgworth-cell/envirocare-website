// app/faq/mosquito/page.tsx
// EnviroCare · Mosquito FAQ · targets May–August peak search intent
// Server component — metadata exported at top level, no interactivity needed

import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: "Mosquito FAQ Alabama | When Does Season Start? | EnviroCare",
  description:
    "Alabama mosquito season FAQ — when it starts, how long it lasts, and what $45/visit covers. EnviroCare, family-owned since 1958.",
  alternates: { canonical: './' },
  openGraph: { url: 'https://www.envirocarellc.com/faq/mosquito',
    title: "Mosquito FAQ Alabama | When Does Season Start? | EnviroCare",
    description: "Alabama mosquito season FAQ — when it starts, how long it lasts, and what $45/visit covers. EnviroCare, family-owned since 1958.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mosquito FAQ Alabama | When Does Season Start? | EnviroCare",
    description: "Alabama mosquito season FAQ — when it starts, how long it lasts, and what $45/visit covers. EnviroCare, family-owned since 1958.",
    images: ['/og-image.png'],
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does mosquito season start in Alabama?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mosquito season in Alabama typically begins in late March to early April — when overnight temperatures stay consistently above 50°F. Activity peaks from May through August, then tapers in September and October. EnviroCare's season runs March through November with 30-day treatment cycles.",
      },
    },
    {
      "@type": "Question",
      name: "How often do you treat for mosquitoes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every 30 days, March through November. That cycle matches the lifespan of adult mosquitoes and breaks the breeding cycle before the next generation explodes. Customers who start treatment in April consistently see lower pressure all season.",
      },
    },
    {
      "@type": "Question",
      name: "When can kids and pets go back outside after mosquito treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once the application is dry — typically 30–45 minutes. EnviroCare uses EPA-registered products applied according to label directions. We do not spray vegetable gardens, blooming flowers, or open water. Your technician confirms the re-entry window before leaving.",
      },
    },
    {
      "@type": "Question",
      name: "How much does mosquito control cost in Alabama?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EnviroCare's mosquito program is $45 per visit, March through November (9 visits, billed per service — no monthly). There's no setup fee and no annual contract. You can add it to an existing pest or termite plan anytime. Mosquito + Tick (chiggers covered) is $65 per visit; flea is an interior-plan add-on.",
      },
    },
    {
      "@type": "Question",
      name: "Do you treat Lake Martin waterfront properties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EnviroCare is the only pest control company with a dedicated Lake Martin office (Alexander City). We use EPA-registered barrier products applied according to label directions. Lakefront properties receive extra attention to dock areas, boat storage, and shoreline vegetation.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if mosquitoes come back between treatments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We come back at no charge. Heavy rain can reduce barrier effectiveness earlier than 21 days. If you're seeing significant mosquito activity before your next scheduled visit, call us and we'll re-treat — free. That's our standard policy, not an exception.",
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
    q: "When does mosquito season start in Alabama?",
    a: "Late March to early April — once overnight temperatures hold above 50°F. May through August is peak. The season officially runs through October, but July and August are when Birmingham, Huntsville, and Lake Martin homeowners feel it most. Starting treatment in April, before the population explodes, is the single most effective thing you can do.",
  },
  {
    q: "How often do you treat?",
    a: "Every 30 days, March through November. That cycle matches adult mosquito lifespan and breaks the breeding cycle before the next generation takes over. We'll notify you the day before and leave a door hanger after. You don't need to be home.",
  },
  {
    q: "When can kids and pets go back in the yard?",
    a: "Once the application is dry — typically 30 to 45 minutes. We don't spray vegetable gardens, blooming flowers, or standing water your pets drink from. Your technician will walk you through the re-entry time before they leave. We've been treating Alabama family yards since 1958.",
  },
  {
    q: "How much does mosquito control cost?",
    a: "$45 per visit, March through November (9 visits, billed per service — no monthly). No setup fee, no initial charge. You can add it to an existing pest or termite plan at any time. Mosquito + Tick (chiggers covered) is $65 per visit; flea is an interior-plan add-on.",
  },
  {
    q: "Do you serve Lake Martin waterfront homes?",
    a: "Yes — and EnviroCare is the only pest control company with a dedicated Lake Martin office (Alexander City, AL). We use EPA-registered barrier products applied per label directions. Docks, boat storage areas, and shoreline vegetation get specific attention. Call our Lake Martin line at (256) 234-6162.",
  },
  {
    q: "What if it rains right after treatment?",
    a: "Light rain within a few hours can reduce effectiveness. If heavy rain falls within 24 hours of your treatment, call us and we'll re-treat at no charge. We track weather and proactively reschedule when significant rain is forecast around your service window.",
  },
  {
    q: "What if mosquitoes come back before the next visit?",
    a: "Call us. We come back free. Unlimited re-service is our standard policy for all plans — not a premium upgrade. If the barrier breaks down before 21 days due to heavy rain or unusual conditions, we treat again at no charge.",
  },
  {
    q: "Do you treat standing water?",
    a: "We identify and advise on standing water — gutters, birdbaths, tarps, low spots — because mosquitoes breed in as little as a bottle cap of water. We apply larvicide to water sources that can't be emptied (decorative ponds, etc.). Eliminating standing water and applying barrier spray together is the most effective combination.",
  },
  {
    q: "Can I start mid-season in June or July?",
    a: "Absolutely. We take new customers any time during the season. Starting mid-season means you'll still get three to four treatments in that year. The $45/visit rate is the same regardless of when you start.",
  },
  {
    q: "How is EnviroCare different from national mosquito companies?",
    a: "We're family-owned and local — fourth generation, in Alabama pest control since 1958. Kevin Wedgworth and his team service the same neighborhoods his grandfather started in. You get the same tech on every visit, a direct phone number (not a call center), and genuine accountability. We don't subcontract.",
  },
];

const SEASONDATA = [
  { month: "Mar", level: 15, label: "Emerging" },
  { month: "Apr", level: 40, label: "Active" },
  { month: "May", level: 75, label: "Peak" },
  { month: "Jun", level: 92, label: "Peak" },
  { month: "Jul", level: 100, label: "Peak" },
  { month: "Aug", level: 95, label: "Peak" },
  { month: "Sep", level: 60, label: "Active" },
  { month: "Oct", level: 30, label: "Tapering" },
  { month: "Nov", level: 5, label: "Low" },
];

export default function MosquitoFAQ() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM, ...sf }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'FAQ', path: '/faq' }, { name: 'Mosquito FAQ', path: '/faq/mosquito' }]) }) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(160deg, ${DARK} 0%, #0a2410 100%)`,
          padding: "72px clamp(20px,5vw,64px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: G,
            opacity: 0.06,
            filter: "blur(100px)",
          }}
        />
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `${G}22`,
              border: `1px solid ${G}44`,
              borderRadius: 6,
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: G,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Mosquito Control · Alabama · FAQ
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
            Mosquito Season in Alabama —{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              Every Question Answered.
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: 36,
              maxWidth: 620,
            }}
          >
            May through August is peak season. Here's what Alabama homeowners
            ask us most — from when to start treatment to when the dog can go
            back out in the yard.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="/quote"
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
              Get 50% Off First Treatment →
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

      {/* SEASON CHART */}
      <section
        style={{ background: "#fff", padding: "64px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem,2.5vw,1.8rem)",
              fontWeight: 600,
              color: DARK,
              marginBottom: 8,
              letterSpacing: "-0.015em",
              ...ss,
            }}
          >
            Alabama Mosquito Activity by Month
          </h2>
          <p
            style={{
              color: GREY,
              fontSize: 14,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Peak season is May–August. Starting treatment in April — before
            populations explode — produces dramatically better results all
            summer.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9,1fr)",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            {SEASONDATA.map((d) => {
              const isPeak = d.level >= 75;
              const isActive = d.level >= 40 && d.level < 75;
              const barColor = isPeak ? G : isActive ? `${G}88` : `${G}33`;
              return (
                <div
                  key={d.month}
                  style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: isPeak ? G : GREY,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {isPeak ? "PEAK" : ""}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: `${Math.max(d.level * 1.2, 6)}px`,
                      background: barColor,
                      borderRadius: "4px 4px 0 0",
                      transition: "height 0.3s",
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isPeak ? DARK : GREY,
                    }}
                  >
                    {d.month}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 20,
              padding: "14px 18px",
              background: `${G}0D`,
              border: `1px solid ${G}33`,
              borderRadius: 8,
              fontSize: 13,
              color: GT,
              lineHeight: 1.6,
            }}
          >
            <strong>EnviroCare service season:</strong> March through November.
            30-day treatment cycle. Sign up in April for the best results.
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
            Mosquito Control FAQ
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

      {/* QUICK FACTS STRIP */}
      <section
        style={{ background: PAPER, padding: "48px clamp(20px,5vw,64px)" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 20,
            }}
          >
            {[
              { n: "$45/visit", label: "March–November" },
              { n: "21 days", label: "Treatment cycle" },
              { n: "Free", label: "Re-service between visits" },
              { n: "Since 1958", label: "Family-owned Alabama" },
              { n: "4 offices", label: "Birmingham · Alabaster · Huntsville · Lake Martin" },
            ].map((item) => (
              <div key={item.n} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: G,
                    ...ss,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.n}
                </div>
                <div style={{ fontSize: 13, color: GREY, marginTop: 4 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(160deg, ${G} 0%, #07642b 100%)`,
          padding: "72px clamp(20px,5vw,64px)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            New Customers · Limited Time
          </p>
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
            50% Off Your First{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              Mosquito Treatment
            </em>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              marginBottom: 32,
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            No long-term pest control contract. No setup fee. Local Alabama family since 1958.
            Start before May for the best results all season.
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
              Claim 50% Off →
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
