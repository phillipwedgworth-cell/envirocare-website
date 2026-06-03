"use client";
import { useState } from "react";
import { Phone, MapPin, Star, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
export default function Auburn() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Auburn, AL",
          "description": "Professional pest, termite, and mosquito control in Auburn, Alabama. Serving Auburn from our Alexander City office. Licensed technicians, family-owned since 1958.",
          "telephone": "+13343323321",
          "url": "https://envirocarellc.com/auburn",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1785 Tallapoosa St",
            "addressLocality": "Alexander City",
            "addressRegion": "AL",
            "postalCode": "35010"
          },
          "areaServed": ["Auburn, AL", "Opelika, AL", "Lee County, AL"],
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "500" }
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(ellipse at 60% 30%, #059669 0%, transparent 55%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-semibold text-emerald-100">Auburn & Opelika · Lee County, AL</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Auburn Pest Control<br/>
            <span className="text-emerald-400">Local Experts. Proven Results.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Serving Auburn, Opelika, and Lee County from EnviroCare's Alexander City office. Licensed pest, termite, and mosquito control for Auburn homeowners, landlords, and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:3343323321"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
              <Phone className="w-5 h-5" /> (334) 332-3321
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: "Since 1958", sub: "Family-owned" },
              { n: "4.9 Stars", sub: "Verified Reviews" },
              { n: "Eco-Safe", sub: "Kid & pet friendly" },
              { n: "Free", sub: "Termite inspection" },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-emerald-400 text-lg">{t.n}</div>
                <div className="text-xs text-slate-400 mt-1">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUBURN SPECIFIC */}
      <section className="py-16 px-6 bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Auburn Has Unique Pest Challenges</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Auburn's combination of college-town density, older housing stock, and Alabama's warm climate creates year-round pest pressure. Student rentals and historic homes near campus tend to see higher rates of roach and ant activity. Newer subdivisions battle termites and fire ants.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We serve Auburn from our Alexander City office — close enough for same-day and next-day service, experienced enough to understand Lee County's specific pest environment.
              </p>
              <div className="space-y-2">
                {[
                  "Residential homes and student rentals",
                  "Commercial properties and restaurants",
                  "Pre-purchase termite inspections",
                  "Landlord pest control programs",
                  "Auburn / Opelika / Lee County coverage",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Serving Auburn From Alexander City</h3>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Our Nearest Office</p>
                  <p className="text-sm text-slate-600">1785 Tallapoosa St, Alexander City, AL 35010</p>
                  <p className="text-xs text-slate-500 mt-1">~45 min from Auburn · Same-day service available</p>
                </div>
              </div>
              <a href="tel:3343323321"
                className="flex items-center gap-2 text-emerald-600 font-bold text-lg hover:text-emerald-700 mb-5">
                <Phone className="w-5 h-5" /> (334) 332-3321
              </a>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Current Offers</p>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>✓ $50 off initial pest control</p>
                  <p>✓ 50% off first mosquito treatment</p>
                  <p>✓ FREE termite inspection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Services in Auburn & Opelika</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🐜", name: "Pest Control", desc: "Full perimeter pest control for Auburn homes, apartments, and rentals. Ants, roaches, spiders, crickets.", href: "/services/pest-control" },
              { icon: "🪲", name: "Termite Inspection", desc: "Pre-purchase and annual inspections. Free termite inspection for Auburn homeowners.", href: "/services/termite-control", highlight: true },
              { icon: "🦟", name: "Mosquito Control", desc: "Monthly yard treatments March through November. Auburn's warm climate means a long season.", href: "/services/mosquito-control" },
              { icon: "🕷️", name: "Tick Control", desc: "Lee County's wooded areas and greenways bring tick pressure. Yard treatments bundled free with mosquito.", href: "/services/tick-control" },
              { icon: "🔥", name: "Fire Ant Control", desc: "Auburn area fire ants. Colony elimination for yards, parks, and commercial properties.", href: "/services/fire-ant-control" },
              { icon: "🏢", name: "Commercial Pest Control", desc: "Restaurants, retail, offices near Auburn and Opelika. Discreet, compliant service.", href: "/services/commercial" },
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border transition ${s.highlight ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-300 hover:shadow-md"}`}>
                {s.highlight && <span className="inline-block mb-3 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">FREE INSPECTION</span>}
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.name}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{s.desc}</p>
                <a href={s.href} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Auburn Pest Control FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "Do you serve Auburn even though your office is in Alexander City?", a: "Yes. Our Alexander City office serves Auburn, Opelika, and Lee County. It's about 45 minutes away, which puts us in the same-day service range for most Auburn locations. We've been growing our Auburn presence and have regular routes through the area." },
              { q: "Do you handle student rental properties?", a: "Yes. We work with landlords and property managers in Auburn regularly. We can service multiple units in a single visit, coordinate with tenants, and provide documentation for lease compliance purposes." },
              { q: "Are there pre-purchase termite inspections available in Auburn?", a: "Yes. We offer WDO (wood-destroying organism) inspections that satisfy most lender and real estate requirements in Alabama. These are commonly needed when buying a home in Auburn or Opelika." },
              { q: "What pests are most common in Auburn?", a: "Near campus and in older housing: roaches, ants, and spiders. In suburban Auburn and Opelika: termites, fire ants, and mosquitoes are the biggest issues. We handle all of them." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-emerald-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Auburn Pest Control You Can Trust</h2>
          <p className="text-emerald-100 text-lg mb-8">Free inspection. Same-day availability. Family-owned since 1958.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:3343323321"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-600 transition border border-emerald-500">
              <Phone className="w-5 h-5" /> (334) 332-3321
            </a>
          </div>
          <p className="text-emerald-300 text-sm mt-5">Served from Alexander City office · Licensed in Alabama</p>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[420px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-center">
              <div><h3 className="font-bold text-xl">Free Auburn Inspection</h3><p className="text-emerald-200 text-sm">We'll call within 2 hours</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-emerald-300 hover:text-white">×</button>
            </div>
            <div className="p-6 space-y-3">
              {["Pest Control","Termite Inspection","Mosquito Control","Tick Control","Commercial Service","Not sure — just inspect"].map(o => (
                <button key={o} className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition text-slate-700 text-sm font-medium">{o}</button>
              ))}
              <div className="pt-3 border-t border-slate-100 text-center">
                <a href="tel:3343323321" className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                  <Phone className="w-4 h-4" /> (334) 332-3321
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
