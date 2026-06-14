// app/pricing/PricingContent.tsx — "use client" interactive pricing page
// Metadata is exported from app/pricing/page.tsx (server component)

"use client";

import { useState } from "react";

// ---------- BRAND TOKENS ----------
const GREEN = "#0E8E40";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const GOLD_DARK = "#C18400";
const INK = "#0E1A0F";
const CREAM = "#FEFDF8";
const PAPER = "#F8F6EE";
const GREY = "#6B7569";
const LINE = "rgba(14,26,15,0.12)";

// ---------- DATA ----------
type Tier = {
  name: string;
  tagline: string;
  price: number;          // monthly with ACH
  altPrice: string;       // explanation of alt
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Essential",
    tagline: "Pest Control",
    price: 35,
    altPrice: "or $70 bimonthly · billed every other month",
    features: [
      "Bi-monthly perimeter treatment",
      "30+ household pests covered",
      "Unlimited free re-service",
      "Applied according to label directions once dry",
      "Schedule service",
    ],
    cta: "Start Essential",
  },
  {
    name: "Foundation",
    tagline: "Pest + Termite Protection",
    price: 67,
    altPrice: "Pest ($35) + Termite ($32) bundled · one invoice",
    features: [
      "Everything in Essential",
      "Sentricon® Always Active stations",
      "Up to $1,000,000 repair warranty",
      "No drilling — no holes in your slab",
      "Annual termite inspection included",
    ],
    cta: "Start Foundation",
    featured: true,
  },
  {
    name: "Outdoor Pro",
    tagline: "Mosquito + Tick",
    price: 49,
    altPrice: "March–November · seasonal yard protection",
    features: [
      "30-day yard barrier treatment",
      "Mosquito breeding sites targeted",
      "Tick protection — covers chiggers",
      "Family backyard ready",
      "Lake Martin specialty",
    ],
    cta: "Start Outdoor Pro",
  },
  {
    name: "Complete",
    tagline: "Everything",
    price: 116,
    altPrice: "Pest + Termite + Mosquito/Tick",
    features: [
      "Everything in Foundation",
      "Plus full Outdoor Pro package",
      "One invoice, one tech, one call",
      "Maximum coverage, simplest billing",
      "The Wedgworth guarantee",
    ],
    cta: "Start Complete",
  },
];

const COMPARE_ROWS = [
  {
    plan: "Pest only",
    you: "$35/mo · no contract",
    chain: "~$69/mo (only in bundle)",
    budget: "~$37/mo · 15-mo contract",
  },
  {
    plan: "Pest + Termite",
    you: "$67/mo · $0 down",
    chain: "$69/mo · $129 down",
    budget: "~$70/mo · 15-mo contract",
  },
  {
    plan: "Pest + Termite + Mosquito/Tick",
    you: "$116/mo · $0 down",
    chain: "$99/mo · $99 down",
    budget: "Not bundled",
  },
  {
    plan: "Initial service fee",
    you: "$0 outdoor · $99 pest",
    chain: "$99–$249",
    budget: "$159",
  },
  {
    plan: "Contract length",
    you: "None — cancel anytime",
    chain: "None stated",
    budget: "15 months minimum",
  },
];

// ---------- COMPONENT ----------
export default function PricingContent() {
  const [billingMode, setBillingMode] = useState<"monthly" | "bimonthly">("monthly");

  return (
    <main style={{ background: CREAM, color: INK, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* HERO */}
      <section style={{
        background: `radial-gradient(circle at 80% 20%, rgba(245,168,0,0.1), transparent 50%), linear-gradient(160deg, ${INK} 0%, ${DEEP} 100%)`,
        color: "#fff",
        padding: "80px 36px 64px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: GOLD,
            border: `1px solid ${GOLD}`,
            borderRadius: 4,
            padding: "4px 12px",
            marginBottom: 18,
          }}>
            Plans &amp; Pricing
          </div>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(40px, 5.5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 18,
          }}>
            Honest pricing, <em style={{ color: GOLD, fontWeight: 500 }}>no surprises.</em>
          </h1>
          <p style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.6,
            maxWidth: 620,
            margin: "0 auto",
          }}>
            Real monthly rates, on the page, no calculator games. Pick what your home needs — pay for that. <strong style={{ color: GOLD }}>No contract. No surprises.</strong>
          </p>
        </div>
      </section>

      {/* COMPETITOR PRICING BANNER */}
      <section style={{ padding: "48px 36px 0" }}>
        <div style={{
          maxWidth: 760,
          margin: "0 auto",
          background: "linear-gradient(135deg, rgba(14,142,64,0.05), rgba(245,168,0,0.08))",
          border: `1px solid ${LINE}`,
          borderRadius: 8,
          padding: "22px 28px",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22, fontWeight: 500, lineHeight: 1.4, color: INK,
          }}>
            A big national chain starts around <span style={{ color: GOLD_DARK, fontWeight: 600 }}>$69/mo</span> plus a $99–249 setup fee.
            A budget competitor runs <span style={{ color: GOLD_DARK, fontWeight: 600 }}>$37/mo</span> — but on a 15-month contract.<br />
            <em style={{ color: FOREST, fontStyle: "italic" }}>EnviroCare starts at $35/mo, no contract — and $0 to start on mosquito, tick &amp; fire ant.</em>
          </div>
          <div style={{ fontSize: 13, color: GREY, marginTop: 8 }}>
            Based on published market rates, May 2026
          </div>
        </div>
      </section>

      {/* TIER GRID */}
      <section style={{ padding: "48px 36px 80px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}>
            {TIERS.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>

          {/* TRUST STRIP */}
          <div style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            paddingTop: 36,
            borderTop: `1px solid ${LINE}`,
          }}>
            <TrustItem icon="✓" title="No contract required" text="Cancel anytime. We earn your business every visit." />
            <TrustItem icon="$" title="Honest start-up pricing" text="$0 to start on mosquito, tick &amp; fire ant. Pest control's start-up visit is $99 on the new-customer promo." />
            <TrustItem icon="↻" title="Unlimited re-service" text="Bugs come back between visits? So do we. Free." />
          </div>
        </div>
      </section>

      {/* HEAD-TO-HEAD TABLE */}
      <section style={{ padding: "0 36px 100px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{
            background: PAPER,
            borderRadius: 12,
            padding: 36,
          }}>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 26, fontWeight: 500, marginBottom: 6,
              letterSpacing: "-0.01em",
            }}>
              Side-by-side: monthly cost vs. the big two
            </h2>
            <p style={{ fontSize: 14, color: GREY, marginBottom: 24 }}>
              Apples-to-apples, what an Alabama homeowner actually pays.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 600 }}>
                <thead>
                  <tr>
                    <th style={cellHead}>Plan type</th>
                    <th style={cellHead}>EnviroCare</th>
                    <th style={cellHead}>National chain</th>
                    <th style={cellHead}>Budget competitor</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.plan}>
                      <td style={{ ...cell, fontWeight: 600 }}>{row.plan}</td>
                      <td style={{ ...cell, background: "rgba(245,168,0,0.08)", fontWeight: 700, color: FOREST }}>{row.you}</td>
                      <td style={cell}>{row.chain}</td>
                      <td style={cell}>{row.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 36px 120px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              display: "inline-block",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: FOREST,
              border: `1px solid ${FOREST}`,
              borderRadius: 4,
              padding: "4px 12px",
              marginBottom: 14,
            }}>
              Pricing FAQ
            </div>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 36, fontWeight: 400, letterSpacing: "-0.01em",
            }}>
              The questions we get most.
            </h2>
          </div>
          <div>
            <FAQ q="Is there a contract?" a="No. EnviroCare is month-to-month. Cancel anytime — we earn your business every visit. (For comparison, some competitors require a 15-month minimum contract.)" />
            <FAQ q="Is there an initial service fee?" a="It depends on the service. Mosquito, tick, and fire ant have no setup fee — you start at the regular rate. Pest control has a one-time start-up visit (currently $99 on the new-customer promo). Termite is a one-time $325 install, or $32/mo with no install fee. No hidden or recurring fees beyond that." />
            <FAQ q="Why is the bundle not discounted?" a="Bundling with us is a convenience play, not a discount play. One invoice, one technician, one schedule. We chose to keep our base prices honest rather than inflate them and call the bundle a 'savings.'" />
            <FAQ q="What's the difference between $35/mo ACH and $70 bimonthly?" a="They're the same price ($35 × 2 months = $70). ACH (auto-draft from your bank) gets the lower monthly rate; bimonthly billing is for customers who prefer a paper bill or card." />
            <FAQ q="Why is termite $32/mo OR a one-time install?" a="$32/mo is our ACH monthly rate. The alternative is a one-time $325 installation that includes the first-year guarantee, then $380/yr to renew — preferred by some homeowners or builders. Both include the same Sentricon® system and warranty." />
            <FAQ q="What does Mosquito + Tick cover?" a="A 30-day yard barrier from March through November. It targets mosquito breeding sites and adult populations, plus tick pressure — including the chiggers that come with wooded lots — around the perimeter. Especially popular with dog owners and Lake Martin lakefront homes. (Flea is a separate interior add-on.)" />
            <FAQ q="What's the Sentricon $1M warranty?" a="If termites cause structural damage to your home while you're on active Sentricon protection, EnviroCare covers repairs up to $1,000,000 — our guarantee. Sentricon® is also the only termite product to win the EPA's Presidential Green Chemistry Challenge Award." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        background: `linear-gradient(160deg, ${GREEN} 0%, ${DEEP} 100%)`,
        padding: "80px 36px",
        textAlign: "center",
        color: "#fff",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 48, color: GOLD, marginBottom: 16, fontFamily: "'Fraunces', serif" }}>🌻</div>
          <h2 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: 400, lineHeight: 1.1, marginBottom: 14,
          }}>
            Pick a plan. <em style={{ color: GOLD, fontStyle: "italic" }}>Get started in 2 minutes.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Free inspection. No salesman pressure. The Wedgworth family guarantee.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: GOLD, color: INK, border: "none", borderRadius: 8,
              padding: "16px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer",
            }}>
              Get Free Inspection →
            </button>
            <a href="tel:2059406360" style={{
              background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8,
              padding: "16px 24px", fontWeight: 600, fontSize: 15,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              📞 (205) 940-6360
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------- TIER CARD ----------
function TierCard({ tier }: { tier: Tier }) {
  const isFeatured = tier.featured;
  return (
    <div style={{
      background: isFeatured ? `linear-gradient(180deg, ${INK} 0%, #1a2a1c 100%)` : "#fff",
      color: isFeatured ? "#fff" : INK,
      border: isFeatured ? "none" : `1px solid ${LINE}`,
      borderRadius: 12,
      padding: "32px 26px",
      position: "relative",
      transform: isFeatured ? "scale(1.04)" : "none",
      boxShadow: isFeatured ? "0 20px 50px rgba(14,26,15,0.15)" : "none",
      display: "flex",
      flexDirection: "column",
    }}>
      {isFeatured && (
        <div style={{
          position: "absolute",
          top: -12, left: "50%",
          transform: "translateX(-50%)",
          background: GOLD, color: INK,
          fontSize: 10, fontWeight: 800,
          letterSpacing: "0.12em",
          padding: "5px 14px",
          borderRadius: 4,
          textTransform: "uppercase",
        }}>
          Most Popular
        </div>
      )}
      <div style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 22, fontWeight: 500,
        letterSpacing: "-0.01em", marginBottom: 4,
      }}>
        {tier.name}
      </div>
      <div style={{
        fontSize: 12,
        color: isFeatured ? GOLD : GREY,
        marginBottom: 22, fontWeight: 500,
      }}>
        {tier.tagline}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 24, color: isFeatured ? "rgba(255,255,255,0.6)" : "rgba(14,26,15,0.6)",
          fontWeight: 500,
        }}>
          $
        </span>
        <span style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 56, fontWeight: 600,
          color: isFeatured ? GOLD : FOREST,
          letterSpacing: "-0.03em", lineHeight: 1,
        }}>
          {tier.price}
        </span>
        <span style={{
          fontSize: 14, color: isFeatured ? "rgba(255,255,255,0.5)" : GREY,
          fontWeight: 500, marginLeft: 4,
        }}>
          /mo · ACH
        </span>
      </div>
      <div style={{
        fontSize: 12,
        color: isFeatured ? "rgba(255,255,255,0.5)" : GREY,
        marginBottom: 22, paddingBottom: 22,
        borderBottom: isFeatured ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${LINE}`,
      }}>
        {tier.altPrice}
      </div>
      <ul style={{ listStyle: "none", marginBottom: 28, padding: 0, flexGrow: 1 }}>
        {tier.features.map((f, i) => (
          <li key={i} style={{
            fontSize: 13,
            color: isFeatured ? "rgba(255,255,255,0.85)" : "rgba(14,26,15,0.78)",
            padding: "7px 0",
            display: "flex", gap: 10,
            lineHeight: 1.5,
          }}>
            <span style={{ color: isFeatured ? GOLD : FOREST, fontWeight: 800, flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button style={{
        background: isFeatured ? GOLD : FOREST,
        color: isFeatured ? INK : "#fff",
        border: "none", borderRadius: 7,
        padding: 13, fontWeight: 700, fontSize: 14,
        cursor: "pointer", width: "100%",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        {tier.cta}
      </button>
    </div>
  );
}

// ---------- TRUST ITEM ----------
function TrustItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{
        width: 36, height: 36,
        background: "rgba(14,142,64,0.08)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: FOREST, fontSize: 16, fontWeight: 700,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 15, fontWeight: 500, color: INK, marginBottom: 2,
        }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: GREY, lineHeight: 1.5 }}>
          {text}
        </div>
      </div>
    </div>
  );
}

// ---------- FAQ ITEM ----------
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: `1px solid ${LINE}`,
      padding: "20px 0",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left",
          background: "none", border: "none",
          cursor: "pointer", padding: 0,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 20,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
        <span style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 18, fontWeight: 500, color: INK,
          letterSpacing: "-0.005em",
        }}>
          {q}
        </span>
        <span style={{
          color: FOREST, fontSize: 20, fontWeight: 700, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 0.2s",
        }}>
          +
        </span>
      </button>
      {open && (
        <div style={{
          marginTop: 14, paddingRight: 30,
          fontSize: 15, color: "rgba(14,26,15,0.7)", lineHeight: 1.7,
        }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ---------- TABLE CELLS ----------
const cellHead: React.CSSProperties = {
  background: INK,
  color: GOLD,
  textAlign: "left",
  padding: "14px 16px",
  fontFamily: "'Fraunces', Georgia, serif",
  fontWeight: 500,
  fontSize: 14,
};

const cell: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: `1px solid ${LINE}`,
  background: "#fff",
  fontSize: 14,
};

