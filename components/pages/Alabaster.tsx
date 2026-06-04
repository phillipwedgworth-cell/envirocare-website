"use client";
import { useState } from "react";
import { Phone, MapPin, Star, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
export default function Alabaster() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Alabaster, AL",
          "description": "Professional pest, termite, and mosquito control in Alabaster, Alabama. Our Birmingham-area office is located right here in Alabaster at 2025 Butler Rd.",
          "telephone": "+12059406360",
          "url": "https://envirocarellc.com/alabaster",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2025 Butler Rd",
            "addressLocality": "Alabaster",
            "addressRegion": "AL",
            "postalCode": "35007"
          },
          "areaServed": ["Alabaster, AL", "Pelham, AL", "Helena, AL", "Calera, AL", "Hoover, AL"],
          ,
          "foundingDate": "1958"
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(ellipse at 80% 10%, #059669 0%, transparent 60%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-semibold text-emerald-100">Our Office Is Right Here in Alabaster</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Alabaster Pest Control<br/>
            <span className="text-emerald-400">From Your Neighborhood</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            EnviroCare's Birmingham-area office is located at 2025 Butler Rd in Alabaster. We're not sending someone from across town — your technician is your neighbor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:2059406360"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: "Local Office", sub: "2025 Butler Rd, Alabaster" },
              { n: "Since 1958", sub: "Trusted in Alabama" },
              { n: "4.9 Stars", sub: "Verified Reviews" },
              { n: "Same Day", sub: "Service Available" },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-emerald-400 text-lg">{t.n}</div>
                <div className="text-xs text-slate-400 mt-1">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE CALLOUT */}
      <section className="py-10 px-6 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-1">Our Alabaster Office</p>
              <p className="text-lg font-bold text-slate-900">2025 Butler Rd, Alabaster, AL 35007</p>
              <p className="text-slate-600 text-sm">Serving Alabaster, Pelham, Helena, Calera, Hoover & surrounding communities</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="https://www.google.com/maps?cid=7378341068021381374" target="_blank" rel="noreferrer"
              className="px-5 py-2.5 bg-white border border-emerald-200 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition text-sm">
              Get Directions
            </a>
            <a href="tel:2059406360"
              className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition text-sm">
              Call Office
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pest Control Services in Alabaster</h2>
            <p className="text-lg text-slate-600">Everything your Alabaster home needs, from the team right down the road</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🐜", name: "Pest Control", desc: "Ants, roaches, spiders, crickets & more. Full perimeter protection for Alabaster homes.", href: "/services/pest-control" },
              { icon: "🪲", name: "Termite Control", desc: "Free inspection. Protect your Alabaster home's structure from Alabama's aggressive termites.", href: "/services/termite-control", highlight: true },
              { icon: "🦟", name: "Mosquito Control", desc: "Take back your yard. Monthly treatments timed to Alabama's mosquito season.", href: "/services/mosquito-control" },
              { icon: "🔥", name: "Fire Ant Control", desc: "Eliminate fire ant colonies before they become a danger to your family.", href: "/services/fire-ant-control" },
              { icon: "🕷️", name: "Tick Control", desc: "Tick yard treatments for Alabaster's wooded neighborhoods. Break the tick lifecycle around your home.", href: "/services/tick-control" },
              { icon: "🏢", name: "Commercial", desc: "Restaurants, offices, warehouses — discreet, compliant pest control for Alabaster businesses.", href: "/services/commercial" },
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border transition ${s.highlight ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md"}`}>
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

      {/* WHY LOCAL MATTERS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Alabaster Chooses<br/>EnviroCare
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Our office is in Alabaster", desc: "2025 Butler Rd. Not a regional dispatch center — our local team is right here." },
                  { title: "Fastest response times", desc: "When your office is local, scheduling is typically within 48 hours." },
                  { title: "We know Alabaster's pest patterns", desc: "Alabaster's clay soil, drainage, and neighborhoods create specific pest pressures we understand." },
                  { title: "Family owned since 1958", desc: "Three generations. We treat your home like it's our own — because we live here too." },
                  { title: "Licensed, insured, eco-safe", desc: "All Alabama-licensed technicians. Treatments safe for kids, pets, and the environment." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Areas We Serve from Alabaster</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Alabaster","Pelham","Helena","Calera","Hoover","Chelsea","Montevallo","Vincent","Shelby County"].map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-700 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Current Offers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><span className="text-emerald-300">✓</span> $50 off initial pest control</div>
                  <div className="flex items-center gap-2"><span className="text-emerald-300">✓</span> 50% off first mosquito treatment</div>
                  <div className="flex items-center gap-2"><span className="text-emerald-300">✓</span> FREE termite inspection</div>
                </div>
                <button onClick={() => setQuoteOpen(true)} className="mt-4 w-full py-3 bg-white text-emerald-800 font-bold rounded-lg hover:bg-emerald-50 transition">
                  Claim Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Janet H.", loc: "Alabaster area", text: "The person who did our treatment was great. Very friendly and very careful of our things.", stars: 5 },
              { name: "Ann S.", loc: "Alabaster", text: "Envirocare is very professional, schedules appointments with us, and is always on time.", stars: 5 },
              { name: "Robert M.", loc: "Shelby County", text: "I have used Envirocare for many years and I have to say they are and have been the best pest service we have ever used.", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex gap-1 mb-3">{[...Array(r.stars)].map((_, s) => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-slate-700 italic mb-4">"{r.text}"</p>
                <div><p className="font-bold text-slate-900 text-sm">{r.name}</p><p className="text-xs text-slate-500">{r.loc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Alabaster Pest Control FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "Do you really have an office in Alabaster?", a: "Yes — 2025 Butler Rd, Alabaster, AL 35007. This is our Birmingham-area office. Your technician dispatches from here, not from a distant location." },
              { q: "What pests are most common in Alabaster?", a: "Alabaster's clay soil and mix of newer and established neighborhoods creates pressure from termites, fire ants, moisture ants, and during summer months, heavy mosquito activity. We treat all of these year-round." },
              { q: "How quickly can you get to my Alabaster home?", a: "Service is typically available within 48 hours. Because our office is in Alabaster, response times are among the fastest of any service area we cover." },
              { q: "Do you serve the whole Shelby County area?", a: "Yes. From our Alabaster office we serve Alabaster, Pelham, Helena, Calera, Hoover, Chelsea, Montevallo, Vincent, and surrounding Shelby County communities." },
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
          <h2 className="text-4xl font-bold mb-4">Your Local Alabaster Pest Experts</h2>
          <p className="text-emerald-100 text-lg mb-8">Free inspection. Fast scheduling. The office down the road since 1958.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:2059406360"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-600 transition border border-emerald-500">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
          <p className="text-emerald-300 text-sm mt-6">2025 Butler Rd, Alabaster, AL 35007 · Licensed & Insured</p>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[420px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-center">
              <div><h3 className="font-bold text-xl">Free Alabaster Inspection</h3><p className="text-emerald-200 text-sm">We'll call within 2 hours</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-emerald-300 hover:text-white">×</button>
            </div>
            <div className="p-6 space-y-3">
              {["Pest Control","Termite Inspection","Mosquito Control","Fire Ants","Bundle Package","Not sure — just inspect"].map(o => (
                <button key={o} className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition text-slate-700 text-sm font-medium">{o}</button>
              ))}
              <div className="pt-3 border-t border-slate-100 text-center">
                <a href="tel:2059406360" className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                  <Phone className="w-4 h-4" /> (205) 940-6360
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
