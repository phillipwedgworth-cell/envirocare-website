"use client";
import { useState } from "react";
import { Phone, CheckCircle, ChevronDown, Shield, Leaf, Clock } from "lucide-react";

import Header from "@/components/shared/Header";
export default function MosquitoControl() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Mosquito Control Services",
          "provider": {
            "@type": "LocalBusiness",
            "name": "EnviroCare Pest Control",
            "telephone": "(205) 649-5278",
            "foundingDate": "1958"
          },
          "areaServed": ["Birmingham, AL","Huntsville, AL","Lake Martin, AL","Alexander City, AL","Madison, AL","Hoover, AL"],
          "description": "Professional mosquito control for Alabama homes. Monthly yard treatments, waterfront-safe products, 50% off first application.",
          "offers": {
            "@type": "Offer",
            "description": "50% off first mosquito treatment",
            "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "USD" }
          }
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(ellipse at 70% 20%, #0d9488 0%, transparent 60%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-teal-500/20 rounded-full border border-teal-400/30">
            <span className="text-sm font-bold text-teal-200">🎉 50% OFF Your First Mosquito Treatment</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Professional Mosquito<br/>
            <span className="text-teal-400">Control in Alabama</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Take back your yard. EnviroCare's mosquito programs keep your family protected all season — with treatments designed for Alabama's climate, waterfront properties, and peak summer pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition shadow-lg">
              Claim 50% Off First Treatment
            </button>
            <a href="tel:2056495278"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
              <Phone className="w-5 h-5" /> (205) 649-5278
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-white/10">
            {[
              { n: "3 Offices", sub: "Birmingham · Huntsville · Lake Martin" },
              { n: "Since 1958", sub: "Alabama's trusted experts" },
              { n: "Eco-Safe", sub: "Kids & pets welcome back in 30 min" },
              { n: "Monthly", sub: "Programs all season long" },
            ].map((t, i) => (
              <div key={i}>
                <div className="font-bold text-teal-400 text-lg">{t.n}</div>
                <div className="text-xs text-slate-400 mt-1">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PROFESSIONAL */}
      <section className="py-16 px-6 bg-teal-50 border-b border-teal-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Leaf className="w-8 h-8"/>, title: "Store Products Don't Work Here", desc: "Big box mosquito sprays and candles provide minimal relief in Alabama's high-pressure summer environment. Professional barrier treatments are a different category entirely." },
              { icon: <Shield className="w-8 h-8"/>, title: "Treats the Source, Not the Symptom", desc: "We treat vegetation, tree lines, and shaded areas where mosquitoes rest during the day — eliminating them before they bite, not after." },
              { icon: <Clock className="w-8 h-8"/>, title: "Protection That Lasts", desc: "Each application creates a barrier that remains effective for 3–4 weeks. Monthly programs maintain continuous coverage through peak season." },
            ].map((item, i) => (
              <div key={i} className="p-6">
                <div className="text-teal-600 flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Our Mosquito Program Works</h2>
            <p className="text-lg text-slate-600">Simple, recurring, effective</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Inspection", desc: "We assess your property — yard size, vegetation, standing water risk, and peak exposure areas." },
              { step: "02", title: "First Treatment", desc: "Full barrier application to vegetation, shrubs, tree lines, deck undersides, and all shaded resting areas." },
              { step: "03", title: "Monthly Follow-up", desc: "Return every 3–4 weeks through season. Consistent coverage is what separates good results from great ones." },
              { step: "04", title: "Season-End Review", desc: "At end of season we assess results, adjust plan for next year, and set you up for early April start." },
            ].map((s, i) => (
              <div key={i} className="relative p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-4xl font-bold text-teal-100 mb-3">{s.step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mosquito Control Programs</h2>
            <p className="text-lg text-slate-600">Choose the coverage that fits your property</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Seasonal Program",
                price: "April–October",
                tag: "Most Popular",
                highlight: true,
                features: [
                  "Monthly treatments (7 visits)",
                  "Full barrier application",
                  "50% off first treatment",
                  "Waterfront-safe products",
                  "Re-treatment if needed",
                  "All property areas treated",
                ],
                cta: "Start Seasonal Program",
              },
              {
                name: "One-Time Treatment",
                price: "Single application",
                tag: "Event ready",
                highlight: false,
                features: [
                  "Full yard barrier treatment",
                  "3–4 weeks of protection",
                  "Great before outdoor events",
                  "50% off first treatment applies",
                  "Same professional application",
                ],
                cta: "Book One-Time Treatment",
              },
              {
                name: "Bundle & Save",
                price: "Best value",
                tag: "Maximum protection",
                highlight: false,
                features: [
                  "Mosquito + Pest + Termite",
                  "One simple monthly plan",
                  "All 3 services combined",
                  "Biggest savings available",
                  "Single point of contact",
                  "Satisfaction guaranteed",
                ],
                cta: "See Bundle Options",
              },
            ].map((p, i) => (
              <div key={i} className={`p-8 rounded-xl border-2 ${p.highlight ? "border-teal-500 bg-teal-50 shadow-lg" : "border-slate-200 bg-white"}`}>
                {p.tag && <span className={`inline-block mb-4 px-3 py-1 text-xs font-bold rounded-full ${p.highlight ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"}`}>{p.tag}</span>}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-teal-600 font-medium mb-6">{p.price}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setQuoteOpen(true)}
                  className={`w-full py-3 rounded-lg font-bold transition ${p.highlight ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAKE MARTIN SPECIAL */}
      <section className="py-16 px-6 bg-teal-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-4 px-3 py-1 bg-teal-600 text-teal-100 text-xs font-bold rounded-full uppercase tracking-wide">Lake Martin Waterfront</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Waterfront Mosquito Control Requires Different Expertise</h2>
              <p className="text-teal-100 leading-relaxed mb-6">
                880 miles of shoreline. Standing water everywhere. Lake Martin mosquito pressure is severe, and treating it correctly near water requires specific products and protocols not every company uses.
              </p>
              <div className="space-y-3">
                {[
                  "EPA-approved waterfront-safe products only",
                  "Dock and pier structure treatment",
                  "Shoreline vegetation management",
                  "Eco-safe — won't harm lake wildlife",
                  "68+ years serving Lake Martin from Alexander City",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-100 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setQuoteOpen(true)}
                  className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition">
                  Lake Martin Quote
                </button>
                <a href="tel:2562346162"
                  className="flex items-center gap-2 px-6 py-3 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-600 transition border border-teal-500">
                  <Phone className="w-4 h-4" /> (256) 234-6162
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-teal-300 uppercase tracking-wide text-xs mb-4">Lake Martin Communities We Serve</h3>
              {["Alexander City","Dadeville","Eclectic","Russell Lands / The Ridge","Stillwaters Resort Area","Wind Creek State Park Area","All Lake Martin shoreline communities"].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-teal-700/50 rounded-lg border border-teal-600">
                  <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                  <span className="text-teal-100 text-sm">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Mosquito Control Across Alabama</h2>
          <p className="text-slate-600 mb-10">Three offices serving three markets — your technician is always local</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { office: "Birmingham Office", phone: "(205) 940-6360", tel: "2059406360", cities: ["Birmingham","Hoover","Chelsea","Pelham","Alabaster","Vestavia Hills","Mountain Brook","Homewood"] },
              { office: "Alexander City / Lake Martin", phone: "(256) 234-6162", tel: "2562346162", cities: ["Lake Martin","Alexander City","Dadeville","Eclectic","Auburn","Opelika"] },
              { office: "Huntsville Office", phone: "(256) 937-7676", tel: "2569377676", cities: ["Huntsville","Madison","Athens","Decatur","Hartselle","North Alabama"] },
            ].map((o, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{o.office}</h3>
                <a href={`tel:${o.tel}`} className="text-teal-600 font-bold text-lg mb-4 block hover:text-teal-700">{o.phone}</a>
                <div className="flex flex-wrap gap-1">
                  {o.cities.map(c => <span key={c} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Mosquito Control FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "When should I start mosquito treatments in Alabama?", a: "April. Not July. By the time mosquitoes are bothersome in June, they've been breeding for 8–10 weeks. Starting in April interrupts the breeding cycle before populations explode. The earlier you start, the less pressure you face all summer." },
              { q: "How long does each treatment last?", a: "Each professional barrier treatment provides 3–4 weeks of protection. This is why monthly treatments are the standard for effective control — you're maintaining continuous coverage rather than allowing populations to rebuild between visits." },
              { q: "Are treatments safe for my kids and pets?", a: "Yes. Products return to safe after a 30-minute dry time. All EnviroCare mosquito products are EPA-approved and applied by licensed technicians. We'll tell you exactly what we used and when you and your family can return to the yard." },
              { q: "Do you treat near water (ponds, lake shorelines)?", a: "Yes — with specific products approved for near-water application. Our Lake Martin program uses waterfront-appropriate treatments with proper shoreline buffers to protect lake ecology while effectively treating your property." },
              { q: "What's the difference between your program and what I buy at the store?", a: "Professional-grade residual products applied by licensed technicians are categorically different from consumer products. The active ingredients, application methods, and coverage are all more effective. This isn't a marketing claim — it's why pest control is a licensed profession." },
              { q: "Do you treat the whole yard or specific areas?", a: "We focus on where mosquitoes actually rest and breed: vegetation, shrubs, tree lines, shaded areas, deck and porch undersides, and any standing water sources. Treating open lawn is far less effective than targeting resting sites. We treat smart, not just everywhere." },
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
      <section className="py-20 px-6 bg-gradient-to-br from-teal-800 to-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">50% Off Your First Treatment</h2>
          <p className="text-teal-100 text-lg mb-8">Peak season is here. Get protected before it gets bad.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-white text-teal-900 font-bold rounded-xl hover:bg-teal-50 transition shadow-lg">
              Claim 50% Off Now
            </button>
            <a href="tel:2056495278"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-600 transition border border-teal-500">
              <Phone className="w-5 h-5" /> (205) 649-5278
            </a>
          </div>
          <p className="text-teal-400 text-sm mt-6">3 Alabama offices · Licensed & insured · Founded 1958</p>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[440px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-teal-700 text-white p-5 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl">Claim 50% Off Mosquito Treatment</h3>
                <p className="text-teal-200 text-sm mt-1">Select your location</p>
              </div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-teal-300 hover:text-white mt-[-4px]">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: "Birmingham / Hoover / Chelsea / Pelham area", phone: "(205) 940-6360", tel: "2059406360" },
                { label: "Lake Martin / Alexander City / Auburn area", phone: "(256) 234-6162", tel: "2562346162" },
                { label: "Huntsville / Madison / Athens area", phone: "(256) 937-7676", tel: "2569377676" },
              ].map((o, i) => (
                <a key={i} href={`tel:${o.tel}`}
                  className="flex justify-between items-center w-full p-4 border-2 border-slate-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition group">
                  <div>
                    <div className="text-sm font-medium text-slate-700 group-hover:text-teal-800">{o.label}</div>
                    <div className="text-teal-600 font-bold mt-0.5">{o.phone}</div>
                  </div>
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition" />
                </a>
              ))}
              <a href="/contact-us" className="block w-full text-center py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition text-sm">
                Or request online →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
