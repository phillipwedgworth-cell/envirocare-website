"use client";
import { useState } from "react";
import { Phone, CheckCircle, Star } from "lucide-react";

import Header from "@/components/shared/Header";
const BUNDLES = [
  {
    name: "Essential Bundle",
    tagline: "The smart start",
    includes: ["Bi-Monthly Pest Control", "1 Mosquito Treatment", "Annual Termite Inspection"],
    price: "Ask for quote",
    savings: "Save vs. individual",
    popular: false,
    color: "slate",
  },
  {
    name: "Protection Bundle",
    tagline: "Most popular — complete year-round coverage",
    includes: [
      "Monthly Pest Control",
      "Monthly Mosquito Treatments (Mar–Nov)",
      "Annual Termite Inspection + Monitoring",
      "Priority Scheduling",
      "Free Re-treatments Between Visits",
      "Dedicated Technician",
    ],
    price: "One simple monthly payment",
    savings: "Best value",
    popular: true,
    color: "emerald",
  },
  {
    name: "Premium Bundle",
    tagline: "Total protection — for waterfront & high-value properties",
    includes: [
      "Monthly Pest Control",
      "Monthly Mosquito + Tick Treatments",
      "Sentricon Termite Bait System",
      "Fire Ant Control",
      "Flea Control",
      "Priority Scheduling",
      "Quarterly Walk-through Report",
    ],
    price: "Ask for quote",
    savings: "Maximum protection",
    popular: false,
    color: "teal",
  },
];

export default function BundleServices() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "EnviroCare Bundle Pest Control Plans",
          "provider": { "@type": "LocalBusiness", "name": "EnviroCare Pest Control", "telephone": "(205) 940-6360" },
          "description": "Bundle pest control, mosquito control, and termite protection into one simple monthly plan. Serving Birmingham, Huntsville, and Lake Martin, Alabama.",
          "areaServed": "Alabama"
        }
      `}</script>

      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-5 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 text-sm font-semibold text-emerald-200">
            Most Popular Choice for Alabama Homeowners
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bundle & Save —<br/>
            <span className="text-emerald-400">Complete Protection. One Simple Plan.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop managing three separate pest services. Our bundle plans combine pest control, mosquito control, and termite protection into one easy monthly payment — at a better rate than individual services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)} className="px-10 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg text-lg">Get Bundle Quote</button>
            <a href="tel:2059406360" className="flex items-center justify-center gap-2 px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20 text-lg">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {/* WHY BUNDLE */}
      <section className="py-16 px-6 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why Bundle Makes Sense</h2>
            <p className="text-slate-600 text-lg">Three reasons our best customers all choose a bundle plan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💰", title: "Better Value", desc: "Bundled services cost less than booking each individually. You get full coverage for a lower combined rate — and one invoice." },
              { icon: "🔒", title: "No Gaps in Protection", desc: "Pests don't take months off. A bundle plan ensures continuous year-round coverage without remembering to rebook each season." },
              { icon: "📞", title: "One Point of Contact", desc: "One technician who knows your property. One call when you need something. No juggling multiple companies or schedules." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-emerald-100 text-center shadow-sm">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLE PLANS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Bundle</h2>
            <p className="text-slate-600 text-lg">Every bundle includes our satisfaction guarantee. Pests return? We do too — free.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BUNDLES.map((bundle, i) => {
              const STYLE_MAP: Record<string, { card: string; btn: string; check: string }> = {
                emerald: { card: "border-emerald-500 bg-emerald-50 shadow-xl scale-105", btn: "bg-emerald-600 text-white hover:bg-emerald-700", check: "text-emerald-600" },
                slate: { card: "border-slate-200 bg-white shadow-md", btn: "bg-slate-100 text-slate-800 hover:bg-slate-200", check: "text-slate-500" },
                teal: { card: "border-teal-400 bg-teal-50 shadow-md", btn: "bg-teal-600 text-white hover:bg-teal-700", check: "text-teal-600" },
              };
              const styles = STYLE_MAP[bundle.color] || STYLE_MAP.slate;
              return (
                <div key={i} className={`p-8 rounded-2xl border-2 ${styles.card}`}>
                  {bundle.popular && <div className="inline-block mb-4 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">MOST POPULAR</div>}
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{bundle.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{bundle.tagline}</p>
                  <ul className="space-y-3 mb-8">
                    {bundle.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${styles.check}`} />
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{bundle.savings}</p>
                    <p className="font-bold text-slate-900">{bundle.price}</p>
                  </div>
                  <button onClick={() => setQuoteOpen(true)} className={`w-full py-3 rounded-lg font-bold transition ${styles.btn}`}>
                    Get Quote
                  </button>
                </div>
              );
            })}
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">All prices customized by property size and location. Free quote, no obligation.</p>
        </div>
      </section>

      {/* LAKE MARTIN NOTE */}
      <section className="py-12 px-6 bg-teal-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-3">🏠 Lake Martin Homeowners — Bundle Is Essential</h3>
          <p className="text-teal-100 leading-relaxed mb-6">
            Waterfront properties at Lake Martin face year-round pest pressure from three directions simultaneously: mosquitoes from the lake, termites from the moisture-rich soil, and general pests through the wood-heavy construction. Our Premium Bundle was built for exactly this scenario.
          </p>
          <button onClick={() => setQuoteOpen(true)} className="px-8 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition">
            Get Lake Martin Bundle Quote
          </button>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">What Bundle Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Robert M.", loc: "Lake Martin", text: "I have used Envirocare for many years and I have to say they are and have been the best pest service we have ever used.", stars: 5 },
              { name: "Jessica M.", loc: "Huntsville", text: "My husband and I use EnviroCare for our pest control. We absolutely love the service and the technicians.", stars: 5 },
              { name: "Ann S.", loc: "Hoover", text: "Envirocare is very professional, schedules appointments with us, and is always on time.", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex gap-1 mb-3">{[...Array(r.stars)].map((_, s) => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-slate-700 italic mb-4">"{r.text}"</p>
                <div><p className="font-bold text-slate-900 text-sm">{r.name}</p><p className="text-xs text-slate-500">{r.loc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-emerald-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Bundle?</h2>
          <p className="text-emerald-100 text-lg mb-8">Get a free quote for your Alabama home. We'll recommend the right bundle and you decide.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)} className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg">Get Free Bundle Quote</button>
            <a href="tel:2059406360" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-600 transition border border-emerald-500">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[440px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-start">
              <div><h3 className="font-bold text-xl">Get Bundle Quote</h3><p className="text-emerald-200 text-sm mt-1">Select your location</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-emerald-300 hover:text-white mt-[-4px]">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: "Birmingham / Hoover / Chelsea / Pelham area", phone: "(205) 940-6360", tel: "2059406360" },
                { label: "Lake Martin / Alexander City / Auburn area", phone: "(256) 234-6162", tel: "2562346162" },
                { label: "Huntsville / Madison / Athens area", phone: "(256) 937-7676", tel: "2569377676" },
              ].map((o, i) => (
                <a key={i} href={`tel:${o.tel}`} className="flex justify-between items-center w-full p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition group">
                  <div>
                    <div className="text-sm font-medium text-slate-700">{o.label}</div>
                    <div className="text-emerald-600 font-bold mt-0.5">{o.phone}</div>
                  </div>
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
