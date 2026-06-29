"use client";
import { useState } from "react";
import { Phone, Clock, CheckCircle, Calendar, Truck, Tag } from "lucide-react";

import Header from "@/components/shared/Header";
import PestIcon, { resolveIconName } from "@/components/shared/PestIcon";
const G = "#0E8E40";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const sf = { fontFamily: "system-ui, -apple-system, sans-serif" };

const OFFERS = [
  {
    headline: "$50 OFF",
    subline: "Initial Pest Control",
    icon: "🐜",
    description: "New customers get $50 off your first pest control treatment. Full perimeter protection, licensed technician, and our satisfaction guarantee — $50 less.",
    terms: "Valid for new customers only. Applies to initial general pest control service. Must mention offer at time of booking.",
    cta: "Claim $50 Off",
    color: G,
    label: "MOST POPULAR",
    includes: ["Full perimeter treatment", "Licensed AL technician", "Satisfaction guarantee", "30-day re-treatment included"],
  },
  {
    headline: "50% OFF",
    subline: "First Mosquito Application",
    icon: "🦟",
    description: "Half off your first professional mosquito treatment. Peak season is here — protect your yard before it gets bad. Monthly programs keep you protected all season.",
    terms: "Valid for new mosquito program enrollments. 50% discount applied to first application only. Monthly program continues at regular rate.",
    cta: "Claim 50% Off",
    color: "#0d6b5e",
    label: "PEAK SEASON",
    includes: ["Full yard barrier treatment", "Dock & pier treatment (lake homes)", "Waterfront-approved products", "Dries in about 30 minutes"],
  },
  {
    headline: "FREE",
    subline: "Termite Inspection",
    icon: "🪲",
    description: "No charge, no obligation termite inspection for Alabama homeowners. We'll assess your property, check all structures, and give you a written report — at no cost.",
    terms: "Free inspection offered to all Alabama homeowners. No purchase required. Valid at all 3 EnviroCare locations.",
    cta: "Schedule Free Inspection",
    color: "#7d3c00",
    label: "NO OBLIGATION",
    includes: ["Full interior inspection", "Crawlspace & attic check", "Foundation & perimeter", "Written report provided"],
  },
];

export default function SpecialOffers() {
  const [claiming, setClaiming] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#FEFDF8", fontFamily: "'Playfair Display', Georgia, serif" }}>

      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          "name": "EnviroCare Special Offers",
          "provider": {
            "@type": "LocalBusiness",
            "name": "EnviroCare Pest Control",
            "telephone": "(205) 940-6360",
            "address": { "@type": "PostalAddress", "streetAddress": "2025 Butler Rd", "addressLocality": "Alabaster", "addressRegion": "AL", "postalCode": "35007", "addressCountry": "US" }
          },
          "itemListElement": [
            {"@type": "Offer", "name": "$50 OFF Initial Pest Control", "description": "New customers save $50 on first pest control treatment"},
            {"@type": "Offer", "name": "50% OFF First Mosquito Treatment", "description": "Half off first professional mosquito application"},
            {"@type": "Offer", "name": "FREE Termite Inspection", "description": "No-charge termite inspection for Alabama homeowners"}
          ]
        }
      `}</script>

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${DARK}, ${G})`, color: "#fff", padding: "60px 40px 52px", textAlign: "center" }}>
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><Tag size={44} color={GOLD} /></div>
        <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 12 }}>
          Current <em style={{ color: GOLD }}>Special Offers</em>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 440, margin: "0 auto 8px", lineHeight: 1.7, ...sf }}>
          No gimmicks. These are real savings for Alabama families — because 68 years of trust means something.
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", ...sf }}>
          Call to claim any offer: <strong style={{ color: GOLD }}>(205) 940-6360</strong>
        </p>
      </section>

      {/* OFFER CARDS */}
      <section style={{ padding: "64px 40px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {OFFERS.map((offer, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Color header */}
              <div style={{ background: offer.color, padding: "28px 28px 24px", color: "#fff", position: "relative" }}>
                {offer.label && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: GOLD, color: DARK, borderRadius: 4, padding: "3px 10px", fontSize: 10, fontWeight: 800, ...sf, letterSpacing: "0.08em" }}>
                    {offer.label}
                  </div>
                )}
                <div style={{ marginBottom: 10 }}><PestIcon name={resolveIconName(offer.icon)} size={36} style={{ color: "#fff" }} /></div>
                <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, ...sf, letterSpacing: "-2px" }}>{offer.headline}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>{offer.subline}</div>
              </div>

              {/* Body */}
              <div style={{ padding: "24px 28px" }}>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, ...sf, marginBottom: 18 }}>{offer.description}</p>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.08em", ...sf, textTransform: "uppercase", marginBottom: 8 }}>Includes</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {offer.includes.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "#374151", ...sf }}>
                        <CheckCircle size={14} color={G} style={{ flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => setClaiming(i)} style={{ width: "100%", padding: "13px", background: offer.color, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", ...sf, marginBottom: 12 }}>
                  {offer.cta} →
                </button>

                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.06em", ...sf, textTransform: "uppercase", marginBottom: 4 }}>Terms</div>
                  <p style={{ fontSize: 11, color: "#9ca3af", ...sf, lineHeight: 1.5, margin: 0 }}>{offer.terms}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO CLAIM */}
      <section style={{ background: "#f7f8f4", padding: "56px 40px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, color: DARK, marginBottom: 32 }}>How to Claim Your Offer</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { step: "1", icon: <Phone size={22} />, title: "Call Your Local Office", desc: "Tell us which offer you'd like and mention it at time of booking" },
              { step: "2", icon: <Calendar size={22} />, title: "Schedule Your Visit", desc: "We'll confirm a time that works — usually within 48 hours" },
              { step: "3", icon: <Truck size={22} />, title: "We Show Up", desc: "Licensed EnviroCare technician arrives, inspects, and does the job right" },
              { step: "4", icon: <CheckCircle size={22} />, title: "Offer Applied", desc: "Your discount is applied automatically. No coupons, no hassle" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.1)", borderRadius: 14, padding: "24px 20px" }}>
                <div style={{ width: 36, height: 36, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 16, fontWeight: 800, color: "#fff", ...sf }}>{s.step}</div>
                <div style={{ fontSize: 22, marginBottom: 8, ...(typeof s.icon === "string" ? {} : {}) }}>
                  {typeof s.icon === "string" ? s.icon : <div style={{ color: G, display: "flex", justifyContent: "center" }}>{s.icon}</div>}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: DARK, ...sf, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#6b7280", ...sf, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 OFFICE PHONES */}
      <section style={{ padding: "52px 40px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: DARK, marginBottom: 8 }}>Call Your Local Office</h2>
          <p style={{ fontSize: 14, color: "#6b7280", ...sf, marginBottom: 32 }}>Mention the offer when you call and we'll take care of the rest.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              ["Birmingham Office", "(205) 940-6360", "2059406360", "Serving greater Birmingham, Hoover, Chelsea, Pelham, Alabaster"],
              ["Alexander City / Lake Martin", "(256) 234-6162", "2562346162", "Serving Lake Martin, Alexander City, Dadeville, Eclectic, Auburn"],
              ["Huntsville Office", "(256) 937-7676", "2569377676", "Serving Huntsville, Madison, Athens, Decatur, North Alabama"],
            ].map(([name, phone, tel, serves]) => (
              <div key={tel} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "22px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: DARK, ...sf, marginBottom: 8 }}>{name}</div>
                <a href={`tel:${tel}`} style={{ display: "flex", alignItems: "center", gap: 6, color: G, fontWeight: 800, fontSize: 18, ...sf, textDecoration: "none", justifyContent: "center", marginBottom: 10 }}>
                  <Phone size={16} /> {phone}
                </a>
                <div style={{ fontSize: 11, color: "#9ca3af", ...sf, lineHeight: 1.5 }}>{serves}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLAIM MODAL */}
      {claiming !== null && (
        <div onClick={() => setClaiming(null)} style={{ position: "fixed", inset: 0, background: "rgba(14,26,15,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ background: "#FEFDF8", borderRadius: 16, width: "100%", maxWidth: 420, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ background: OFFERS[claiming].color, color: "#fff", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, fontFamily: "'Playfair Display', Georgia, serif" }}>Claim: {OFFERS[claiming].headline} {OFFERS[claiming].subline}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4, ...sf }}>Select your location to call</div>
              </div>
              <button onClick={() => setClaiming(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 26, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: "22px" }}>
              <p style={{ fontSize: 13, color: "#6b7280", ...sf, marginBottom: 14, lineHeight: 1.6 }}>Mention <strong>"{OFFERS[claiming].headline} {OFFERS[claiming].subline}"</strong> when you call. No coupon code needed.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {[["Birmingham / Hoover / Chelsea / Pelham", "(205) 940-6360", "2059406360"], ["Lake Martin / Alexander City / Auburn", "(256) 234-6162", "2562346162"], ["Huntsville / Madison / Athens / Decatur", "(256) 937-7676", "2569377676"]].map(([label, phone, tel]) => (
                  <a key={tel} href={`tel:${tel}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", border: "1.5px solid rgba(27,122,60,0.15)", borderRadius: 10, textDecoration: "none" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.borderColor = G}
                    onMouseLeave={(e: React.MouseEvent<HTMLElement>) => e.currentTarget.style.borderColor = "rgba(27,122,60,0.15)"}>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", ...sf }}>{label}</div>
                      <div style={{ fontWeight: 800, color: G, marginTop: 2, ...sf }}>{phone}</div>
                    </div>
                    <Phone size={14} color="#9ca3af" />
                  </a>
                ))}
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 14px" }}>
                <p style={{ fontSize: 11, color: "#9ca3af", ...sf, lineHeight: 1.5, margin: 0 }}>{OFFERS[claiming].terms}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
