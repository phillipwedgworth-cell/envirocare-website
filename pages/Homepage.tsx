"use client";
import { useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Star, CheckCircle, Shield, Leaf, Users, Bug, ArrowRight } from "lucide-react";
import Header from "@/components/shared/Header";

const PEST_MARQUEE = ["Termites", "Fire Ants", "Cockroaches", "Mosquitoes", "Bed Bugs", "Rodents", "Spiders", "Wasps & Hornets", "Fleas & Ticks", "Wildlife", "Silverfish", "Subterranean Termites", "Centipedes", "Earwigs"];

const OFFICES = [
  { name: "Birmingham", full: "Birmingham Office", address: "2025 Butler Rd, Alabaster, AL 35007", phone: "(205) 940-6360", tel: "2059406360", serves: "Birmingham · Hoover · Chelsea · Pelham · Alabaster · Vestavia Hills · Mountain Brook · Homewood", emoji: "🏙️" },
  { name: "Lake Martin", full: "Alexander City / Lake Martin", address: "1785 Tallapoosa St, Alexander City, AL 35010", phone: "(256) 234-6162", tel: "2562346162", serves: "Lake Martin · Alexander City · Dadeville · Eclectic · Auburn · Opelika", emoji: "🏞️" },
  { name: "Huntsville", full: "Huntsville Office", address: "7027 Old Madison Pike, Suite 108, Huntsville, AL 35806", phone: "(256) 937-7676", tel: "2569377676", serves: "Huntsville · Madison · Athens · Decatur · Hartselle · North Alabama", emoji: "🚀" },
];

const FLAGSHIP_PROGRAMS = [
  {
    icon: "🐜",
    name: "Bi-Monthly Pest Control",
    tag: "Most Popular",
    desc: "Six visits a year. Roaches, ants, spiders, rodents — gone and stay gone. Free re-treatment between visits.",
    cta: "From $XX/mo",
    href: "/services/pest-control",
  },
  {
    icon: "🪲",
    name: "Termite Protection",
    tag: "Free Inspection",
    desc: "Sentricon® Always Active — the proven bait system. No drilling, no chemicals injected into your home.",
    cta: "Free inspection",
    href: "/services/termite-control",
  },
  {
    icon: "🦟",
    name: "Mosquito + Tick Combo",
    tag: "Family Favorite",
    desc: "Yard treatments April–October. Both threats handled in one visit. Family and pet-safe application.",
    cta: "50% off first visit",
    href: "/services/mosquito-control",
  },
];

const ADDITIONAL_SERVICES = [
  { icon: "🔥", name: "Fire Ant Control" },
  { icon: "🐭", name: "Rodent Control" },
  { icon: "🐝", name: "Bee & Wasp" },
  { icon: "🦝", name: "Wildlife Removal" },
  { icon: "🏢", name: "Commercial" },
  { icon: "🏠", name: "Builder Program" },
];

const REVIEWS = [
  { name: "Robert M.", loc: "Lake Martin", text: "I have used Envirocare for many years — the best pest service we have ever used." },
  { name: "Jessica M.", loc: "Huntsville", text: "We absolutely love the service and the technicians. Could not recommend more." },
  { name: "Ann S.", loc: "Hoover", text: "Envirocare is very professional, schedules appointments with us, and is always on time." },
  { name: "Dariel S.", loc: "Madison", text: "No other pest control company can top the service provided by EnviroCare!!!" },
  { name: "Janet H.", loc: "Birmingham", text: "The person who did our treatment was great. Very friendly and careful of our things." },
  { name: "Mashonda T.", loc: "Alexander City", text: "I continue to value their professionalism and flexibility when scheduling." },
];

const CITIES = [
  "Birmingham", "Hoover", "Chelsea", "Pelham", "Alabaster",
  "Vestavia Hills", "Mountain Brook", "Homewood", "Huntsville",
  "Madison", "Athens", "Decatur", "Lake Martin", "Alexander City",
  "Dadeville", "Eclectic", "Auburn", "Helena", "Calera", "+ more",
];

export default function Homepage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const ss = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
  const sf = { fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" };
  const G = "#0E8E40";          // bright kelly green to match logo
  const G_BRIGHT = "#2EAA61";   // even brighter for accents
  const G_DEEP = "#07642B";     // deep for darker zones
  const GOLD = "#F5A800";
  const GOLD_BRIGHT = "#FBC51A";
  const DARK = "#0E1A0F";
  const CREAM = "#FEFDF8";

  return (
    <div style={{ minHeight: "100vh", background: CREAM, ...ss }}>

      <Header />

      {/* HERO — v4 light design */}
      <section style={{ position: "relative", overflow: "hidden", background: "#fff", padding: "4.5rem clamp(1.5rem, 5vw, 4rem) 4rem" }}>
        {/* diagonal green wash on right */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "52%", background: "linear-gradient(135deg, #F2FAF5 0%, #E8F5EE 55%, #cee8d6 100%)", clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)", zIndex: 0, pointerEvents: "none" }} />
        {/* soft orbs */}
        <div className="ec-orb-1" style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, width: 480, height: 480, background: "radial-gradient(circle, rgba(46,170,97,0.12) 0%, transparent 70%)", top: -80, right: "14%" }} />
        <div className="ec-orb-2" style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0, width: 360, height: 360, background: "radial-gradient(circle, rgba(245,168,0,0.10) 0%, transparent 70%)", bottom: -40, left: "3%" }} />

        <div className="ec-hero-grid">
          <div>
            {/* eyebrow with pulsing dot */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#E8F5EE", border: "1px solid rgba(14,142,64,0.2)", borderRadius: 40, padding: "0.4rem 1rem 0.4rem 0.7rem", marginBottom: 26 }}>
              <span style={{ position: "relative", width: 10, height: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <span className="ec-pulse-ring" />
                <span className="ec-pulse-dot" />
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: G, ...sf }}>Serving Alabama Since 1958 · Available Today</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.04, color: DARK, margin: "0 0 1.4rem", letterSpacing: "-0.5px", ...ss }}>
              Alabama&apos;s Pest Control<br />
              <em style={{ color: G, fontStyle: "italic", fontWeight: 700, display: "block" }}>Since Before You</em>
              <span style={{ color: GOLD_BRIGHT, fontWeight: 900 }}>Were Born.</span>
            </h1>

            <p style={{ fontSize: "1.05rem", lineHeight: 1.78, color: "#5A7060", maxWidth: 500, marginBottom: "2.2rem", ...sf }}>
              Three generations of the Wedgworth family protecting Alabama homes. Founded in Alexander City in <strong style={{ color: DARK }}>1958</strong> — before Waynes, before the franchises, before anyone else called themselves local.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginBottom: "2.4rem" }}>
              <a href="/quote" className="ec-cta-pulse" style={{ background: GOLD, color: DARK, borderRadius: 50, padding: "0.95rem 2.1rem", fontSize: "1rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 18px rgba(245,168,0,0.35)", ...sf }}>
                Get a Free Quote <ArrowRight size={16} />
              </a>
              <a href="tel:2056495278" style={{ background: "transparent", color: G, border: `2px solid ${G}`, borderRadius: 50, padding: "0.85rem 1.7rem", fontSize: "1rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, ...sf }}>
                <Phone size={15} /> (205) 649-5278
              </a>
            </div>

            {/* Stats with gold left border */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
              {[["68+", "Years in Alabama"], ["4.9★", "Google Rating"], ["500+", "Verified Reviews"]].map(([n, l]) => (
                <div key={n} style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "0.9rem" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 700, color: G, lineHeight: 1, ...ss }}>{n}</div>
                  <div style={{ fontSize: 10.5, color: "#5A7060", letterSpacing: "0.05em", marginTop: 3, textTransform: "uppercase", ...sf }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {["Licensed & Insured", "Satisfaction Guarantee", "Same-Day Available", "Family Owned"].map(t => (
                <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#E8F5EE", border: "1px solid rgba(14,142,64,0.15)", borderRadius: 8, padding: "0.42rem 0.8rem", fontSize: 12, fontWeight: 500, color: "#2C3E30", ...sf }}>
                  <span style={{ color: G, fontWeight: 700, fontSize: 13 }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — truck image with glass cards */}
          <div className="ec-hero-visual">
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", position: "relative", boxShadow: "0 24px 60px rgba(14,142,64,0.16), 0 4px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(14,142,64,0.12)" }}>
              <Image src="/truck.jpg" alt="EnviroCare green Ford Maverick service truck — recognized across Alabama" fill priority sizes="(max-width: 960px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(13,82,41,0.18) 100%)" }} />
            </div>

            {/* Rating glass card */}
            <div className="ec-card-slow" style={{ position: "absolute", bottom: -20, left: -30, padding: "0.9rem 1.2rem", display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(14,142,64,0.12)", borderRadius: 16, boxShadow: "0 8px 30px rgba(14,142,64,0.13)" }}>
              <div>
                <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
                  {[0,1,2,3,4].map(i => <span key={i} style={{ color: GOLD, fontSize: 14 }}>★</span>)}
                </div>
                <div style={{ fontSize: 10, color: "#5A7060", whiteSpace: "nowrap", ...sf }}>500+ verified reviews</div>
              </div>
              <div>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: DARK, lineHeight: 1, ...ss }}>4.9</div>
                <div style={{ fontSize: 10, color: "#5A7060", whiteSpace: "nowrap", ...sf }}>Google Rating</div>
              </div>
            </div>

            {/* Same-day glass card */}
            <div className="ec-card-fast" style={{ position: "absolute", top: -16, right: -26, padding: "0.85rem 1.1rem", display: "flex", flexDirection: "column", gap: 6, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(14,142,64,0.12)", borderRadius: 16, boxShadow: "0 8px 30px rgba(14,142,64,0.13)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#E8F5EE", border: "1px solid rgba(14,142,64,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>⚡</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DARK, whiteSpace: "nowrap", ...sf }}>Same-Day Service</div>
                  <div style={{ fontSize: 10, color: "#5A7060", whiteSpace: "nowrap", ...sf }}>Call before noon — there today</div>
                </div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#E8F5EE", border: "1px solid rgba(14,142,64,0.2)", borderRadius: 20, padding: "3px 10px", fontSize: 9.5, fontWeight: 700, color: G, letterSpacing: "0.06em", textTransform: "uppercase", width: "fit-content", ...sf }}>
                <span className="ec-pulse-dot" style={{ width: 6, height: 6 }} /> Available Now
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ background: "#fff", borderTop: `3px solid ${GOLD}`, borderBottom: "1px solid #D4E8D8", padding: "1.15rem clamp(1.5rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          {["Alabama's Most Trusted Since 1958", "Licensed, Bonded & Insured", "3rd Generation Family Business", "100% Satisfaction Guarantee", "No Contracts Required"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 500, color: "#5A7060", ...sf }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", flexShrink: 0 }}>✓</div>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Pest marquee */}
      <div style={{ background: G_DEEP, padding: "0.95rem 0", overflow: "hidden" }}>
        <div className="ec-marquee-track" style={{ display: "flex", width: "max-content" }}>
          {[...PEST_MARQUEE, ...PEST_MARQUEE].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0 2.2rem", fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.05em", whiteSpace: "nowrap", ...sf }}>
              <strong>{p}</strong>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(245,168,0,0.55)", marginLeft: "1.5rem" }} />
            </div>
          ))}
        </div>
      </div>

      {/* OFFERS BANNER */}
      <div style={{ background: GOLD, color: DARK, padding: "14px 24px", display: "flex", justifyContent: "center", alignItems: "center", gap: 22, flexWrap: "wrap", fontSize: 14, fontWeight: 700, ...sf }}>
        <span>$50 OFF Initial Pest Control</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>50% OFF First Mosquito Treatment</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>FREE Termite Inspection</span>
        <a href="/special-offers" style={{ background: DARK, color: GOLD_BRIGHT, border: "none", borderRadius: 6, padding: "7px 16px", fontWeight: 800, fontSize: 12, textDecoration: "none", ...sf, letterSpacing: "0.08em", marginLeft: 6 }}>CLAIM →</a>
      </div>

      {/* FLAGSHIP PROGRAMS */}
      <section style={{ padding: "96px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", border: `1.5px solid ${G}`, borderRadius: 6, padding: "5px 16px", marginBottom: 18, fontSize: 12, letterSpacing: "0.14em", color: G, ...sf, fontWeight: 800, textTransform: "uppercase" }}>Three Flagship Programs</div>
            <h2 style={{ fontSize: "clamp(34px, 4.5vw, 52px)", fontWeight: 400, color: DARK, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.5px" }}>
              The Protection Most Alabama<br />Families Choose.
            </h2>
            <p style={{ fontSize: 17, color: "#4b5b50", maxWidth: 620, margin: "0 auto", lineHeight: 1.65, ...sf }}>
              Pick one or bundle all three. Same family-owned care since 1958. Same Alabama-licensed technicians.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22, marginBottom: 50 }}>
            {FLAGSHIP_PROGRAMS.map((p, i) => (
              <a key={i} href={p.href} style={{ display: "block", textDecoration: "none", background: "#fff", border: "2px solid rgba(14,142,64,0.12)", borderRadius: 18, padding: "32px 28px", transition: "all 0.2s", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = G; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(14,142,64,0.18)`; }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = "rgba(14,142,64,0.12)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ position: "absolute", top: 18, right: 18, background: GOLD, color: DARK, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", ...sf }}>{p.tag}</span>
                <div style={{ fontSize: 56, marginBottom: 20, lineHeight: 1 }}>{p.icon}</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 14, lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: 15, color: "#4b5b50", lineHeight: 1.7, marginBottom: 22, ...sf }}>{p.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18, borderTop: "1px solid rgba(14,142,64,0.1)" }}>
                  <span style={{ fontSize: 13, color: G, fontWeight: 800, ...sf }}>{p.cta}</span>
                  <ArrowRight size={18} color={G} />
                </div>
              </a>
            ))}
          </div>

          {/* Bundle CTA */}
          <div style={{ background: `linear-gradient(135deg, ${DARK}, ${G_DEEP})`, borderRadius: 20, padding: "44px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontSize: 12, color: GOLD_BRIGHT, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", ...sf, marginBottom: 10 }}>Bundle & Save</div>
              <h3 style={{ fontSize: 30, fontWeight: 400, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>All Three. One Simple Price.</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, ...sf, marginBottom: 18, lineHeight: 1.6 }}>Pest + Termite + Mosquito/Tick — bundled in one monthly plan. Most popular choice.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Bi-Monthly Pest", "Termite Sentricon", "Mosquito + Tick"].map(s => (
                  <span key={s} style={{ background: "rgba(245,168,0,0.18)", border: `1px solid ${GOLD}40`, borderRadius: 5, padding: "6px 14px", fontSize: 13, color: GOLD_BRIGHT, ...sf, fontWeight: 600 }}>✓ {s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/bundle-services" style={{ background: GOLD, color: DARK, border: "none", borderRadius: 10, padding: "16px 32px", fontWeight: 800, fontSize: 15, ...sf, textDecoration: "none", display: "block", textAlign: "center", boxShadow: `0 6px 18px ${GOLD}55` }}>See Bundle Pricing</a>
              <a href="/quote" style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "16px 32px", fontWeight: 700, fontSize: 15, ...sf, textDecoration: "none", display: "block", textAlign: "center" }}>Free Quote</a>
            </div>
          </div>

          {/* Additional services */}
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#7a8a82", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", ...sf, marginBottom: 18 }}>Also Available</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {ADDITIONAL_SERVICES.map(s => (
                <div key={s.name} style={{ background: "#f7f9f5", border: "1px solid rgba(14,142,64,0.12)", borderRadius: 50, padding: "10px 20px", fontSize: 14, color: "#374151", ...sf, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{s.icon}</span> {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HERITAGE / STORY */}
      <section style={{ padding: "92px 32px", background: "#f7f9f5" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ display: "inline-block", border: `1.5px solid ${G}`, borderRadius: 6, padding: "5px 16px", marginBottom: 26, fontSize: 12, letterSpacing: "0.14em", color: G, ...sf, fontWeight: 800, textTransform: "uppercase" }}>
              Est. 1958 · Alexander City, Alabama
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: DARK, lineHeight: 1.15, marginBottom: 26, letterSpacing: "-0.5px" }}>
              Not a franchise.<br /><em style={{ color: G, fontWeight: 700 }}>Your neighbors.</em>
            </h2>
            <p style={{ fontSize: 17, color: "#4b5b50", lineHeight: 1.8, marginBottom: 18, ...sf }}>
              In 1958, Phillip M. Wedgworth started EnviroCare with one truck and one promise to the Lake Martin community — show up, do it right, stand behind the work.
            </p>
            <p style={{ fontSize: 17, color: "#4b5b50", lineHeight: 1.8, marginBottom: 18, ...sf }}>
              Sixty-eight years later, Kevin Wedgworth leads three Alabama offices. The trucks are greener. The commitment hasn't moved an inch.
            </p>
            <p style={{ fontSize: 17, color: "#4b5b50", lineHeight: 1.8, marginBottom: 36, ...sf, fontWeight: 600 }}>
              When Waynes was new, EnviroCare had already been protecting Alabama homes for fifteen years.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[[<Shield size={16} key="s"/>, "Alabama Licensed & Insured"], [<Leaf size={16} key="l"/>, "Eco-Friendly Treatments"], [<CheckCircle size={16} key="c"/>, "Satisfaction Guaranteed"], [<Users size={16} key="u"/>, "3rd Generation Family"], [<Star size={16} key="st"/>, "4.9 Stars · 500+ Reviews"], [<Bug size={16} key="b"/>, "Sentricon® Certified"]].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "#1f2a23", fontSize: 14, ...sf, fontWeight: 600 }}>
                  <span style={{ color: G }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: DARK, borderRadius: 20, padding: "36px 32px", marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: GOLD_BRIGHT, letterSpacing: "0.14em", textTransform: "uppercase", ...sf, marginBottom: 28 }}>By the Numbers</div>
              {[["Years protecting Alabama homes", "68+"], ["Google reviews rating", "4.9 ★"], ["Alabama offices", "3"], ["Communities served", "30+"], ["Programs", "10+"], ["Satisfaction guarantee", "100%"]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 14, marginBottom: 14 }}>
                  <span style={{ color: "#9ba8a1", fontSize: 14, ...sf }}>{label}</span>
                  <span style={{ color: GOLD, fontWeight: 800, fontSize: 24, ...sf }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", aspectRatio: "16/9" }}>
              <Image src="/ribbon-cutting-1.jpg" alt="EnviroCare office opening with Alabama community" fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(transparent, rgba(14,26,15,0.92))`, padding: "26px 20px 16px" }}>
                <p style={{ color: GOLD_BRIGHT, fontSize: 13, fontWeight: 700, ...sf, margin: 0 }}>Community roots across Alabama</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, ...sf, margin: "4px 0 0" }}>Office opening — supported by the neighbors we serve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUCK */}
      <section style={{ background: DARK, padding: "72px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: GOLD_BRIGHT, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", ...sf, marginBottom: 14 }}>You'll Recognize Us</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#fff", lineHeight: 1.2, marginBottom: 18 }}>The green truck<br /><em style={{ color: GOLD }}>with the sunflower.</em></h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8, ...sf, marginBottom: 12 }}>When you see it in your neighborhood, you know EnviroCare is protecting a home nearby. A familiar face across Alabama for over 68 years.</p>
            <p style={{ color: GOLD_BRIGHT, fontSize: 14, fontStyle: "italic", fontWeight: 500 }}>"No One Cares Like EnviroCare"</p>
          </div>
          <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 70px rgba(0,0,0,0.55)", position: "relative", aspectRatio: "16/10" }}>
            <Image src="/truck.jpg" alt="EnviroCare green Ford Maverick service truck with sunflower wrap" fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* 3 OFFICES */}
      <section style={{ padding: "92px 32px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", border: `1.5px solid ${G}`, borderRadius: 6, padding: "5px 16px", marginBottom: 18, fontSize: 12, letterSpacing: "0.14em", color: G, ...sf, fontWeight: 800, textTransform: "uppercase" }}>3 Alabama Offices</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 400, color: DARK, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.5px" }}>Local Experts in Your Market</h2>
            <p style={{ fontSize: 17, color: "#4b5b50", ...sf }}>Your local office answers. Your local technician shows up.</p>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
            {OFFICES.map((o, i) => (
              <button key={i} onClick={() => setActiveOffice(i)} style={{ padding: "12px 26px", borderRadius: 8, border: activeOffice === i ? "none" : `1.5px solid rgba(14,142,64,0.22)`, background: activeOffice === i ? G : "transparent", color: activeOffice === i ? "#fff" : "#1f2a23", fontWeight: 700, fontSize: 14, cursor: "pointer", ...sf, transition: "all 0.15s" }}>
                {o.emoji} {o.name}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 580, margin: "0 auto", background: "#fff", border: "1px solid rgba(14,142,64,0.18)", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
            <div style={{ background: G, color: "#fff", padding: "24px 28px" }}>
              <div style={{ fontWeight: 800, fontSize: 19 }}>{OFFICES[activeOffice].full}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6, ...sf }}>{OFFICES[activeOffice].serves}</div>
            </div>
            <div style={{ padding: "28px" }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
                <MapPin size={17} color={G} style={{ flexShrink: 0, marginTop: 3 }} />
                <div><div style={{ fontSize: 11, color: "#7a8a82", ...sf, marginBottom: 3, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Office Address</div><div style={{ fontWeight: 700, color: DARK, fontSize: 15, ...sf }}>{OFFICES[activeOffice].address}</div></div>
              </div>
              <div style={{ display: "flex", gap: 14, marginBottom: 24, alignItems: "center" }}>
                <Phone size={17} color={G} style={{ flexShrink: 0 }} />
                <div><div style={{ fontSize: 11, color: "#7a8a82", ...sf, marginBottom: 3, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Direct Line</div><a href={`tel:${OFFICES[activeOffice].tel}`} style={{ fontWeight: 800, fontSize: 26, color: G, textDecoration: "none", ...sf }}>{OFFICES[activeOffice].phone}</a></div>
              </div>
              <a href="/quote" style={{ display: "block", padding: "15px", background: G, color: "#fff", borderRadius: 10, fontWeight: 800, fontSize: 14, ...sf, textDecoration: "none", textAlign: "center", boxShadow: `0 4px 14px ${G}40` }}>Get Free Inspection</a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(108px, 1fr))", gap: 8, maxWidth: 880, margin: "40px auto 0" }}>
            {CITIES.map(city => (
              <a key={city} href={`/${city.toLowerCase().replace(/\s+/g, "-").replace(/\+\s*/g, "")}`} style={{ textAlign: "center", padding: "10px 8px", fontSize: 13, color: "#374151", background: "#fff", border: "1px solid rgba(14,142,64,0.12)", borderRadius: 8, textDecoration: "none", ...sf, fontWeight: 500, transition: "all 0.15s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = "rgba(14,142,64,0.12)"; e.currentTarget.style.color = "#374151"; }}>
                {city}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: DARK, padding: "92px 32px", color: "#fff" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill={GOLD} color={GOLD} />)}
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 400, marginBottom: 12, letterSpacing: "-0.5px" }}>4.9 Stars · 500+ Reviews</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, ...sf }}>What Alabama homeowners say about EnviroCare</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "28px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{[...Array(5)].map((_, s) => <Star key={s} size={13} fill={GOLD} color={GOLD} />)}</div>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 14, ...sf }}>{r.name}</div>
                <div style={{ fontSize: 12, color: GOLD_BRIGHT, ...sf, marginTop: 2, fontWeight: 500 }}>{r.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(160deg, ${G}, ${G_DEEP})`, padding: "92px 32px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ fontSize: 56, marginBottom: 18 }}>🌻</div>
          <h2 style={{ fontSize: "clamp(36px, 4.5vw, 52px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.5px" }}>Ready to Live<br /><em style={{ fontWeight: 700 }}>Pest-Free?</em></h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, ...sf, lineHeight: 1.7, marginBottom: 38 }}>
            Join thousands of Alabama families who trust EnviroCare. Free inspection, same-day availability, the Wedgworth family guarantee.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
            <a href="/quote" style={{ background: GOLD, color: DARK, border: "none", borderRadius: 10, padding: "18px 36px", fontWeight: 800, fontSize: 17, ...sf, textDecoration: "none", boxShadow: `0 8px 24px rgba(0,0,0,0.18)` }}>Get Free Inspection</a>
            <a href="tel:2056495278" style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "18px 28px", fontWeight: 700, fontSize: 17, textDecoration: "none", ...sf }}>
              <Phone size={18} /> (205) 649-5278
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, ...sf, letterSpacing: "0.06em" }}>Birmingham · Alexander City · Huntsville · Licensed & Insured · Founded 1958</p>
        </div>
      </section>
    </div>
  );
}
