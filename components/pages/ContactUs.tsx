"use client";
import { useState } from "react";
import { Phone, MapPin, Clock, Mail, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
const G = "#1B7A3C";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const sf = { fontFamily: "system-ui, -apple-system, sans-serif" };

const OFFICES = [
  {
    name: "Birmingham Office",
    address: "2025 Butler Rd",
    city: "Alabaster, AL 35007",
    phone: "(205) 940-6360",
    tel: "2059406360",
    email: "birmingham@envirocarellc.com",
    maps: "https://www.google.com/maps?cid=7378341068021381374",
    hours: "Mon–Fri 7am–6pm · Sat 8am–3pm · Sun Closed",
    serves: "Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood · Helena · Calera",
    note: "Our Birmingham-area office is physically located in Alabaster — fastest response in Shelby County.",
    accent: G,
  },
  {
    name: "Alexander City / Lake Martin",
    address: "1785 Tallapoosa St",
    city: "Alexander City, AL 35010",
    phone: "(256) 234-6162",
    tel: "2562346162",
    email: "alexcity@envirocarellc.com",
    maps: "https://www.google.com/maps?cid=12101127141767078247",
    hours: "Mon–Fri 7am–6pm · Sat 8am–3pm · Sun Closed",
    serves: "Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika · Wetumpka",
    note: "Our original office since 1958. The Wedgworth family's home base on Lake Martin.",
    accent: "#0d6b5e",
  },
  {
    name: "Huntsville Office",
    address: "7027 Old Madison Pike, Suite 108",
    city: "Huntsville, AL 35806",
    phone: "(256) 937-7676",
    tel: "2569377676",
    email: "huntsville@envirocarellc.com",
    maps: "https://maps.app.goo.gl/p5fJg2GoAr3Vk3Ua8",
    hours: "Mon–Fri 7am–6pm · Sat 8am–3pm · Sun Closed",
    serves: "Huntsville · Madison · Athens · Decatur · Hartselle · Hampton Cove · Harvest · North Alabama",
    note: "Serving North Alabama's fastest growing market — Huntsville, Madison County, and beyond.",
    accent: "#1a5276",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const FORMSPREE_ID = "xwvypjal";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (FORMSPREE_ID === "REPLACE_WITH_FORMSPREE_ID") {
      // Form not yet wired — fall back to opening email so leads still reach us
      const subject = encodeURIComponent(`Website Inquiry: ${form.service || "Pest service"}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nService: ${form.service}\n\n${form.message}`
      );
      window.location.href = `mailto:info@envirocarellc.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Form submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at (205) 649-5278.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FEFDF8", fontFamily: "Georgia, serif" }}>
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact EnviroCare Pest Control",
          "url": "https://envirocarellc.com/contact-us",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "EnviroCare Pest Control",
            "telephone": "(205) 649-5278",
            "openingHours": "Mo-Fr 07:00-18:00",
            "address": [
              {"@type": "PostalAddress", "streetAddress": "2025 Butler Rd", "addressLocality": "Alabaster", "addressRegion": "AL", "postalCode": "35007"},
              {"@type": "PostalAddress", "streetAddress": "1785 Tallapoosa St", "addressLocality": "Alexander City", "addressRegion": "AL", "postalCode": "35010"},
              {"@type": "PostalAddress", "streetAddress": "7027 Old Madison Pike Suite 108", "addressLocality": "Huntsville", "addressRegion": "AL", "postalCode": "35806"}
            ]
          }
        }
      `}</script>

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${DARK}, #1B7A3C)`, color: "#fff", padding: "60px 40px 52px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.15)", border: "1px solid rgba(245,168,0,0.3)", borderRadius: 5, padding: "5px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", ...sf, textTransform: "uppercase" }}>Free Inspection · Same-Day Available</span>
        </div>
        <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 14 }}>
          Talk to Your <em style={{ color: GOLD }}>Local</em> Office
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7, ...sf }}>
          Three Alabama offices. Real people who answer the phone. Same family since 1958.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {OFFICES.map((o, i) => (
            <a key={i} href={`tel:${o.tel}`} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "10px 18px", color: "#fff", textDecoration: "none", ...sf, fontSize: 13, fontWeight: 600 }}>
              <Phone size={14} /> {o.phone}
            </a>
          ))}
        </div>
      </section>

      {/* OFFICE SELECTOR */}
      <section style={{ padding: "56px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 12, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>Our 3 Offices</div>
            <h2 style={{ fontSize: 30, fontWeight: 400, color: DARK }}>Find Your Nearest Location</h2>
          </div>

          {/* Tab buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
            {OFFICES.map((o, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: "10px 22px", borderRadius: 6, border: selected === i ? "none" : "1px solid rgba(27,122,60,0.2)", background: selected === i ? G : "transparent", color: selected === i ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer", ...sf, transition: "all 0.15s" }}>
                {o.name}
              </button>
            ))}
          </div>

          {/* Selected office detail */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 860, margin: "0 auto" }}>
            <div style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.15)", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
              <div style={{ background: OFFICES[selected].accent, color: "#fff", padding: "18px 22px" }}>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{OFFICES[selected].name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4, ...sf }}>{OFFICES[selected].note}</div>
              </div>
              <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                  <MapPin size={16} color={G} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 11, color: "#9ca3af", ...sf, marginBottom: 2 }}>Address</div>
                    <div style={{ fontWeight: 600, color: "#111827", fontSize: 14, ...sf }}>{OFFICES[selected].address}<br />{OFFICES[selected].city}</div>
                    <a href={OFFICES[selected].maps} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: G, ...sf, fontWeight: 600, marginTop: 4, display: "inline-block" }}>Get Directions →</a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
                  <Phone size={16} color={G} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: "#9ca3af", ...sf, marginBottom: 2 }}>Phone</div>
                    <a href={`tel:${OFFICES[selected].tel}`} style={{ fontWeight: 800, fontSize: 20, color: G, textDecoration: "none", ...sf }}>{OFFICES[selected].phone}</a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
                  <Clock size={16} color={G} style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: "#9ca3af", ...sf, marginBottom: 2 }}>Hours</div>
                    <div style={{ fontSize: 13, color: "#374151", ...sf }}>{OFFICES[selected].hours}</div>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 14, marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Service Area</div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7, ...sf }}>{OFFICES[selected].serves}</div>
                </div>
                <a href={`tel:${OFFICES[selected].tel}`} style={{ display: "block", width: "100%", marginTop: 16, padding: "13px", background: G, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", ...sf, textAlign: "center", textDecoration: "none" }}>
                  Call This Office
                </a>
              </div>
            </div>

            {/* Map placeholder — use real Google Maps embed */}
            <div style={{ background: "#e8f5e9", borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* 
                DEVELOPER NOTE: Replace this div with:
                <iframe
                  src="https://www.google.com/maps/embed?pb=..." 
                  width="100%" height="100%" style={{border:0}} 
                  allowFullScreen loading="lazy"
                />
                Get embed URL from: maps.google.com → Share → Embed
              */}
              <div style={{ textAlign: "center", padding: 32 }}>
                <MapPin size={40} color={G} style={{ marginBottom: 12 }} />
                <div style={{ fontSize: 14, color: G, fontWeight: 600, ...sf, marginBottom: 8 }}>{OFFICES[selected].address}<br />{OFFICES[selected].city}</div>
                <a href={OFFICES[selected].maps} target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "10px 20px", background: G, color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", ...sf }}>
                  Open in Google Maps
                </a>
                <div style={{ marginTop: 16, fontSize: 11, color: "#6b7280", ...sf }}>Replace with Google Maps embed before launch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section style={{ background: "#f7f8f4", padding: "64px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.3fr)", gap: 36, alignItems: "start" }}>

          {/* Left — what to expect */}
          <div>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>What To Expect</div>
            <h2 style={{ fontSize: 28, fontWeight: 400, color: DARK, marginBottom: 14, lineHeight: 1.2 }}>A real Alabama technician<br />at your door, fast.</h2>
            <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 18, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", aspectRatio: "4/5" }}>
              <img src="/technician-inspection.jpg" alt="EnviroCare licensed pest control technician with inspection clipboard" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, ...sf, fontSize: 13, color: "#374151", display: "flex", flexDirection: "column", gap: 10 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: G, fontWeight: 800 }}>1.</span><span>We call back within 2 hours.</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: G, fontWeight: 800 }}>2.</span><span>Licensed Alabama tech inspects your property — no obligation.</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: G, fontWeight: 800 }}>3.</span><span>Clear written quote, your choice on next steps.</span></li>
            </ul>
          </div>

          {/* Right — form */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>Request Service</div>
              <h2 style={{ fontSize: 30, fontWeight: 400, color: DARK, marginBottom: 8 }}>Get Your Free Inspection</h2>
              <p style={{ fontSize: 15, color: "#6b7280", ...sf }}>We'll call you back within 2 hours during business hours.</p>
            </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 16, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "#374151", fontWeight: 600, ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Name *</label>
                  <input required value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, ...sf, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "#374151", fontWeight: 600, ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Phone Number *</label>
                  <input required type="tel" value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(205) 555-0100"
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, ...sf, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "#374151", fontWeight: 600, ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
                  <input type="email" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@email.com"
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, ...sf, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "#374151", fontWeight: 600, ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your City *</label>
                  <input required value={form.city} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, city: e.target.value })}
                    placeholder="Birmingham, AL"
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, ...sf, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, color: "#374151", fontWeight: 600, ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Service Needed *</label>
                <select required value={form.service} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, service: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, ...sf, outline: "none", background: "#fff" }}>
                  <option value="">Select a service...</option>
                  <option>Pest Control</option>
                  <option>Termite Inspection</option>
                  <option>Mosquito Control</option>
                  <option>Tick Control</option>
                  <option>Fire Ant Control</option>
                  <option>Flea Control</option>
                  <option>Bundle Package</option>
                  <option>Commercial Service</option>
                  <option>Not sure — please inspect</option>
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 12, color: "#374151", fontWeight: 600, ...sf, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Additional Details</label>
                <textarea value={form.message} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe what you're seeing, or tell us anything that would help..."
                  rows={4}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, ...sf, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button type="submit" disabled={submitting} style={{ width: "100%", padding: "14px", background: submitting ? "#9ca3af" : G, color: "#fff", border: "none", borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: submitting ? "wait" : "pointer", ...sf }}>
                {submitting ? "Sending..." : "Request Free Inspection →"}
              </button>
              {error && <p style={{ textAlign: "center", fontSize: 13, color: "#b91c1c", marginTop: 12, ...sf }}>{error}</p>}
              <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 12, ...sf }}>
                We'll call within 2 hours · No obligation · No pressure
              </p>
            </form>
          ) : (
            <div style={{ background: "#fff", border: `2px solid ${G}`, borderRadius: 16, padding: "52px 32px", textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🌻</div>
              <h3 style={{ fontSize: 24, fontWeight: 400, color: DARK, marginBottom: 10 }}>Thank You, {form.name}!</h3>
              <p style={{ fontSize: 15, color: "#6b7280", ...sf, marginBottom: 6 }}>We've received your request and will call you at <strong>{form.phone}</strong> within 2 hours.</p>
              <p style={{ fontSize: 14, color: "#9ca3af", ...sf }}>In the meantime, you can also reach us directly at your nearest office.</p>
            </div>
          )}
          </div>
        </div>
      </section>

      {/* FAQ QUICK */}
      <section style={{ padding: "56px 40px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: DARK, marginBottom: 24, textAlign: "center" }}>Before You Call</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["What are your hours?", "Monday–Friday 7am–6pm, Saturday 8am–3pm. Emergency situations — call us, we'll do our best."],
              ["Can I get same-day service?", "Often yes, especially for urgent situations. Call your nearest office directly for same-day availability."],
              ["Is the inspection really free?", "Yes. We inspect your property, give you a written assessment and quote, with no obligation to purchase."],
              ["Do you serve my city?", "We serve 30+ Alabama communities across 3 offices. Call us and we'll confirm whether we cover your area — most of Alabama is yes."],
            ].map(([q, a], i) => (
              <div key={i} style={{ background: "#f7f8f4", border: "1px solid rgba(27,122,60,0.1)", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: DARK, ...sf, marginBottom: 6 }}>{q}</div>
                <div style={{ fontSize: 13, color: "#6b7280", ...sf, lineHeight: 1.6 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
