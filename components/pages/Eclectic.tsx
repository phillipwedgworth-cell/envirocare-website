"use client";
import { useState } from "react";
import { Phone, MapPin, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
const G = "#0E8E40";
const TEAL = "#0d6b5e";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const sf = { fontFamily: "system-ui, -apple-system, sans-serif" };

export default function Eclectic() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#FEFDF8", fontFamily: "Georgia, serif" }}>
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Eclectic, AL",
          "description": "Professional mosquito, termite, and pest control in Eclectic, Alabama — the city with the most Lake Martin shoreline. Waterfront-safe treatments. Serving from our Alexander City office since 1958.",
          "telephone": "+12562346162",
          "url": "https://envirocarellc.com/eclectic",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1785 Tallapoosa St",
            "addressLocality": "Alexander City",
            "addressRegion": "AL",
            "postalCode": "35010"
          },
          "areaServed": ["Eclectic, AL", "Elmore County, AL", "Lake Martin, AL"],
          
        }
      `}</script>

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${DARK}, ${TEAL})`, color: "#fff", padding: "72px 40px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 400, height: 400, background: `radial-gradient(circle, rgba(245,168,0,0.08) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 60, top: 40, fontSize: 180, opacity: 0.05, pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>🏞️</div>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.12)", border: "1px solid rgba(245,168,0,0.3)", borderRadius: 5, padding: "5px 14px", marginBottom: 22 }}>
            <MapPin size={12} color={GOLD} />
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", ...sf, textTransform: "uppercase" }}>
              Eclectic, AL · Elmore County · Lake Martin's Longest Shoreline
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 6 }}>
            Eclectic Pest Control
          </h1>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 22, color: GOLD }}>
            Lake Martin's Specialists.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 560, marginBottom: 32, ...sf }}>
            Eclectic has more Lake Martin shoreline than any other city. That means more mosquitoes, more moisture for termites, and more reason to trust an expert who knows this specific stretch of the lake. EnviroCare has served Eclectic from our Alexander City office since 1958.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            <button onClick={() => setQuoteOpen(true)} style={{ background: GOLD, color: DARK, border: "none", borderRadius: 8, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", ...sf }}>Get Free Inspection</button>
            <a href="tel:2562346162" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (256) 234-6162
            </a>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
            {[["Most", "Lake Martin shoreline of any city"], ["Since 1958", "Serving Eclectic & Lake Martin"], ["Fast", "Scheduling"], ["Eco-Safe", "Waterfront-approved products"]].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontSize: 18, fontWeight: 800, color: GOLD, ...sf }}>{n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3, ...sf }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ECLECTIC IS DIFFERENT */}
      <section style={{ padding: "72px 40px", background: "#f7f9f7", borderBottom: `3px solid rgba(13,107,94,0.1)` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", border: `2px solid ${TEAL}`, borderRadius: 4, padding: "3px 12px", marginBottom: 22, fontSize: 11, letterSpacing: "0.15em", color: TEAL, ...sf, fontWeight: 700, textTransform: "uppercase" }}>
              Eclectic's Unique Challenge
            </div>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 400, color: DARK, lineHeight: 1.2, marginBottom: 20 }}>
              More shoreline means<br /><em style={{ color: TEAL }}>more pest pressure.</em>
            </h2>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 16, ...sf }}>
              Eclectic has more Lake Martin shoreline than any other city on the lake — which means more waterfront property, more beautiful lakefront homes, and significantly more mosquito and termite pressure than inland communities.
            </p>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 16, ...sf }}>
              The continuous moisture from the lake, the wooded lots, and the warm Alabama climate create conditions where pests thrive without professional intervention. Standard treatments aren't enough near water — you need products and protocols specific to the waterfront.
            </p>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 28, ...sf }}>
              EnviroCare has been doing this on Lake Martin since 1958. We know Eclectic. We know the lake. And we know what works here.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Waterfront mosquito treatments — lake-safe products only",
                "Termite inspection includes docks, piers, and boathouses",
                "Fire ant control for lakefront lawns and access paths",
                "Eco-safe — EPA-approved for use near water bodies",
                "Serving from Alexander City office — true local service",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <CheckCircle size={15} color={TEAL} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: "#374151", ...sf }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* STOCK PHOTO: Replace with real Lake Martin shoreline near Eclectic */}
            <div style={{ background: "linear-gradient(135deg, #e0f0ee, #c8e6e0)", borderRadius: 16, height: 220, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(13,107,94,0.15)" }}>
              <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>🏞️</div>
                <div style={{ fontSize: 13, color: TEAL, fontWeight: 600, ...sf }}>Lake Martin Shoreline · Eclectic, AL</div>
                <div style={{ fontSize: 11, color: "#9ca3af", ...sf, marginTop: 4 }}>Photo: Use Lake Martin waterfront photo here</div>
              </div>
            </div>

            <div style={{ background: DARK, borderRadius: 14, padding: "22px", border: `1px solid rgba(245,168,0,0.15)` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", ...sf, marginBottom: 14 }}>Eclectic Fast Facts</div>
              {[["Shoreline", "Most of any Lake Martin city"], ["Location", "Elmore County, south end of lake"], ["EnviroCare here since", "1958"], ["Office serving Eclectic", "Alexander City — (256) 234-6162"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10, marginBottom: 10 }}>
                  <span style={{ color: "#6b7280", fontSize: 12, ...sf }}>{l}</span>
                  <span style={{ color: "#e5e7eb", fontSize: 12, fontWeight: 600, ...sf, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </div>

            <a href="tel:2562346162" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: TEAL, color: "#fff", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 16, ...sf, textDecoration: "none" }}>
              <Phone size={18} /> (256) 234-6162
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "64px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontSize: 30, fontWeight: 400, color: DARK, marginBottom: 8 }}>Services in Eclectic & Lake Martin</h2>
            <p style={{ fontSize: 15, color: "#6b7280", ...sf }}>Built for waterfront living on Alabama's largest lake</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {[
              { icon: "🦟", name: "Mosquito Control", primary: true, desc: "Our most-requested Lake Martin service. Monthly barrier treatments March–November. Waterfront-safe formulas, dock treatment included. 50% off your first application.", offer: "50% off first treatment" },
              { icon: "🪲", name: "Termite Control", primary: false, desc: "Eclectic's moisture-rich waterfront environment is prime termite territory. Free inspection covers the home, crawlspace, dock, pier, and boathouse. Sentricon® system available.", offer: "Free inspection" },
              { icon: "🐜", name: "Pest Control", primary: false, desc: "Full perimeter pest control for Eclectic homes. Quarterly programs keep ants, spiders, roaches, and other pests out all season. Eco-safe for waterfront properties.", offer: "$50 off first service" },
              { icon: "🔥", name: "Fire Ant Control", primary: false, desc: "Fire ants near Lake Martin shorelines are a serious hazard, especially for children and barefoot access. Colony elimination and perimeter barriers.", offer: null },
              { icon: "🕷️", name: "Tick Control", primary: false, desc: "Wooded lakefront lots around Eclectic have heavy tick pressure. We treat vegetation, trails, and yard perimeters to protect your family and pets all season.", offer: null },
              { icon: "📦", name: "Bundle & Save", primary: false, desc: "Most Eclectic homeowners combine Pest + Mosquito + Termite. One simple monthly plan, maximum protection. Premium package available for waterfront properties.", offer: "Best value" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: s.primary ? `2px solid ${TEAL}` : "1px solid rgba(13,107,94,0.12)", borderRadius: 14, padding: "22px 20px", position: "relative" }}>
                {s.primary && <div style={{ position: "absolute", top: -10, left: 20, background: TEAL, color: "#fff", borderRadius: 4, padding: "2px 10px", fontSize: 10, fontWeight: 800, ...sf, letterSpacing: "0.08em" }}>MOST POPULAR FOR LAKE HOMES</div>}
                <div style={{ fontSize: 32, marginBottom: 10, marginTop: s.primary ? 6 : 0 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: DARK, fontSize: 16, marginBottom: 6, ...sf }}>{s.name}</div>
                {s.offer && <div style={{ display: "inline-block", background: s.primary ? "rgba(13,107,94,0.1)" : "#f9fafb", color: TEAL, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600, ...sf, marginBottom: 10 }}>{s.offer}</div>}
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, ...sf, marginBottom: 14 }}>{s.desc}</p>
                <button onClick={() => setQuoteOpen(true)} style={{ fontSize: 12, color: TEAL, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, ...sf }}>Get quote →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f7f9f7", padding: "56px 40px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: DARK, marginBottom: 28, textAlign: "center" }}>Eclectic & Lake Martin FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { q: "Does EnviroCare treat near Lake Martin's water?", a: "Yes — specifically and only with EPA-approved waterfront products. We maintain proper buffers from the shoreline and use formulas that are effective against mosquitoes and pests without harming Lake Martin's aquatic ecosystem. This is a specialty, not an afterthought." },
              { q: "Do you inspect docks and boathouses in Eclectic?", a: "Yes. Docks, piers, and boathouses are high-moisture wood structures that attract termites and wood-boring insects. Our Lake Martin inspections always include all exterior structures on the property, not just the main home." },
              { q: "We only use our lake house seasonally — can you work around that?", a: "Absolutely. Many Eclectic properties are seasonal or weekend homes. We offer lockbox access arrangements and will treat while you're away — notifying you before and after every visit with a written report." },
              { q: "What's the fastest you can get to Eclectic?", a: "Service is typically available within 48 hours from our Alexander City office for most situations. Alexander City is our home — Eclectic is in our backyard, and we treat it that way." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(13,107,94,0.1)", borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontWeight: 700, color: DARK, fontSize: 14, ...sf, paddingRight: 16 }}>{item.q}</span>
                  <ChevronDown size={18} color="#9ca3af" style={{ flexShrink: 0, transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 20px 16px", color: "#4b5563", fontSize: 14, lineHeight: 1.7, ...sf, borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 12 }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(160deg, ${TEAL}, #084d42)`, padding: "72px 40px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🌻</div>
          <h2 style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.2, marginBottom: 12 }}>Protect Your<br /><em>Lake Martin Home</em></h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, ...sf, lineHeight: 1.7, marginBottom: 28 }}>
            EnviroCare has been your neighbor on Lake Martin since 1958. Free inspection, fast scheduling, waterfront expertise.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
            <button onClick={() => setQuoteOpen(true)} style={{ background: GOLD, color: DARK, border: "none", borderRadius: 8, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", ...sf }}>Get Free Inspection</button>
            <a href="tel:2562346162" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "14px 20px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (256) 234-6162
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, ...sf }}>Alexander City Office · Licensed & Insured · Founded 1958</p>
        </div>
      </section>

      {quoteOpen && (
        <div onClick={() => setQuoteOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(14,26,15,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ background: "#FEFDF8", borderRadius: 16, width: "100%", maxWidth: 420, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ background: TEAL, color: "#fff", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Free Eclectic Inspection</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4, ...sf }}>Alexander City office · We'll call within 2 hours</div>
              </div>
              <button onClick={() => setQuoteOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 26, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: "22px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                {["Mosquito Control", "Termite Inspection", "Pest Control", "Fire Ants", "Tick Control", "Bundle Package", "Not sure — just inspect"].map(o => (
                  <button key={o} style={{ textAlign: "left", padding: "12px 16px", border: "1.5px solid rgba(13,107,94,0.15)", borderRadius: 10, background: "none", cursor: "pointer", fontSize: 14, color: "#374151", ...sf }}
                    onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.background = "#f0fdf9"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = "rgba(13,107,94,0.15)"; e.currentTarget.style.background = "none"; }}>
                    {o}
                  </button>
                ))}
              </div>
              <a href="tel:2562346162" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", background: TEAL, color: "#fff", borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}>
                <Phone size={16} /> (256) 234-6162
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
