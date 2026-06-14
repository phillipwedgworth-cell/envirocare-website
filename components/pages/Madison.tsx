"use client";
import { useState } from "react";
import { Phone, MapPin, Star, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
const G = "#0E8E40";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const sf = { fontFamily: "system-ui, sans-serif" };

const SERVICES = [
  { icon: "🐜", name: "Pest Control", desc: "Ants, roaches, spiders, crickets & more. Full perimeter protection.", highlight: false },
  { icon: "🪲", name: "Termite Control", desc: "Free inspection. Protect your Madison home from Alabama termites.", highlight: true },
  { icon: "🦟", name: "Mosquito Control", desc: "Monthly yard treatments March–November. 50% off first treatment.", highlight: false },
  { icon: "🕷️", name: "Tick Control", desc: "Safe protection for family and pets all season long.", highlight: false },
  { icon: "🔥", name: "Fire Ant Control", desc: "Colony elimination and lasting perimeter protection.", highlight: false },
  { icon: "📦", name: "Bundle & Save", desc: "Pest + Mosquito + Termite combined. Madison's most popular plan.", highlight: false },
];

const REVIEWS = [
  { name: "Jessica M.", loc: "Madison", text: "My husband and I use EnviroCare for our pest control. We absolutely love the service and the technicians.", stars: 5 },
  { name: "Dariel S.", loc: "Madison", text: "No other pest control company can top the service provided by EnviroCare!!!", stars: 5 },
  { name: "Ann S.", loc: "Hoover", text: "Envirocare is very professional, schedules appointments with us, and is always on time.", stars: 5 },
];

export default function Madison() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#FEFDF8", fontFamily: "'Playfair Display', Georgia, serif" }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "EnviroCare Pest Control - Madison, AL",
        "description": "Professional pest, termite, and mosquito control in Madison, Alabama. Serving from our Huntsville office. Family-owned since 1958.",
        "telephone": "+12569377676",
        "url": "https://www.envirocarellc.com/madison",
        "address": { "@type": "PostalAddress", "addressLocality": "Madison", "addressRegion": "AL", "postalCode": "35758" },
        "areaServed": "Madison, AL",
        
      })}} />

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${DARK}, ${G})`, color: "#fff", padding: "72px 40px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 60, top: 40, fontSize: 180, opacity: 0.05, pointerEvents: "none", lineHeight: 1 }}>🌻</div>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.12)", border: "1px solid rgba(245,168,0,0.3)", borderRadius: 5, padding: "5px 14px", marginBottom: 22 }}>
            <MapPin size={12} color={GOLD} />
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", ...sf, textTransform: "uppercase" }}>Madison, AL · Madison County · Huntsville Office</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,56px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 6 }}>Madison Pest Control</h1>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 22, color: GOLD }}>Trusted Since 1958.</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 540, marginBottom: 32, ...sf }}>
            Serving Madison's growing community from our Huntsville office. Professional pest, termite, and mosquito control for Madison families and businesses — fast response, local expertise, guaranteed results.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            <button onClick={() => setQuoteOpen(true)} style={{ background: GOLD, color: DARK, border: "none", borderRadius: 8, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", ...sf }}>Get Free Inspection</button>
            <a href="tel:2569377676" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (256) 937-7676
            </a>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
            {[["Since 1958", "Family-owned"], ["4.7 Stars", "Verified"], ["Fast", "Scheduling"], ["FREE", "Termite Inspection"]].map(([n, l]) => (
              <div key={n}><div style={{ fontSize: 18, fontWeight: 800, color: GOLD, ...sf }}>{n}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3, ...sf }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <div style={{ background: GOLD, color: DARK, padding: "12px 24px", display: "flex", justifyContent: "center", alignItems: "center", gap: 18, flexWrap: "wrap", fontSize: 13, fontWeight: 600, ...sf }}>
        <span>$50 OFF Initial Pest Control</span><span style={{ opacity: 0.4 }}>·</span>
        <span>50% OFF First Mosquito Treatment</span><span style={{ opacity: 0.4 }}>·</span>
        <span>FREE Termite Inspection</span>
        <button onClick={() => setQuoteOpen(true)} style={{ background: DARK, color: GOLD, border: "none", borderRadius: 5, padding: "5px 14px", fontWeight: 700, fontSize: 11, cursor: "pointer", ...sf, marginLeft: 4 }}>CLAIM →</button>
      </div>

      {/* SERVICES */}
      <section style={{ padding: "64px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>Services in Madison</div>
            <h2 style={{ fontSize: 30, fontWeight: 400, color: DARK, marginBottom: 8 }}>Pest Protection for Madison Homes</h2>
            <p style={{ fontSize: 15, color: "#6b7280", ...sf }}>Everything your Madison home needs, from the team right down the road in Huntsville</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ background: "#fff", border: s.highlight ? `2px solid ${G}` : "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "22px 20px" }}>
                {s.highlight && <span style={{ display: "inline-block", marginBottom: 10, padding: "2px 10px", background: G, color: "#fff", fontSize: 10, fontWeight: 800, ...sf, borderRadius: 4 }}>FREE INSPECTION</span>}
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 6, ...sf }}>{s.name}</div>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, ...sf, marginBottom: 12 }}>{s.desc}</p>
                <button onClick={() => setQuoteOpen(true)} style={{ fontSize: 12, color: G, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, ...sf }}>Get quote →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: DARK, padding: "56px 40px", color: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, textAlign: "center", marginBottom: 36 }}>What Madison Customers Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "22px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>{[...Array(r.stars)].map((_, s) => <Star key={s} size={13} fill={GOLD} color={GOLD} />)}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>"{r.text}"</p>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13, ...sf }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", ...sf }}>{r.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(160deg, ${G}, #0f4d26)`, padding: "72px 40px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🌻</div>
          <h2 style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.2, marginBottom: 12 }}>Protect Your<br /><em>Madison Home</em></h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, ...sf, lineHeight: 1.7, marginBottom: 28 }}>Free inspection. Fast scheduling from our Huntsville office. The Wedgworth family guarantee.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setQuoteOpen(true)} style={{ background: GOLD, color: DARK, border: "none", borderRadius: 8, padding: "14px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", ...sf }}>Get Free Inspection</button>
            <a href="tel:2569377676" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "14px 20px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (256) 937-7676
            </a>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <div onClick={() => setQuoteOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(14,26,15,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ background: "#FEFDF8", borderRadius: 16, width: "100%", maxWidth: 400, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ background: G, color: "#fff", padding: "20px 24px", display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontWeight: 700, fontSize: 18 }}>Free Madison Inspection</div><div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4, ...sf }}>Huntsville office — we'll call within 2 hours</div></div>
              <button onClick={() => setQuoteOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 26, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: "22px" }}>
              {["Pest Control", "Termite Inspection", "Mosquito Control", "Tick Control", "Bundle Package", "Not sure — just inspect"].map(o => (
                <button key={o} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "1.5px solid rgba(27,122,60,0.15)", borderRadius: 10, background: "none", cursor: "pointer", fontSize: 14, color: "#374151", ...sf, marginBottom: 8 }}>{o}</button>
              ))}
              <a href="tel:2569377676" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", background: G, color: "#fff", borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf, marginTop: 4 }}>
                <Phone size={16} /> (256) 937-7676
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
