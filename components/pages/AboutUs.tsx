"use client";
import { useState } from "react";
import { Phone, MapPin, Award, Users, Leaf, Heart } from "lucide-react";

import Header from "@/components/shared/Header";
export default function AboutUs() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control",
          "foundingDate": "1958",
          "founder": { "@type": "Person", "name": "Phillip M. Wedgworth" },
          "description": "Family-owned Alabama pest control company founded in 1958 by Phillip M. Wedgworth in Alexander City. Now in its third generation, serving Birmingham, Huntsville, and Lake Martin.",
          "telephone": "+12059406360",
          "url": "https://envirocarellc.com/about-us",
          "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": "10" },
          "areaServed": "Alabama"
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950 text-white py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: "url('/home-southern.jpg')", backgroundSize: "cover", backgroundPosition: "center 60%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(ellipse at 20% 50%, #0A7935 0%, transparent 60%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30">
              <span className="text-emerald-300 font-semibold text-sm">Family-Owned · Alexander City, AL · Since 1958</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              No One Cares<br/>
              <span className="text-emerald-400">Like EnviroCare</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Three generations of the Wedgworth family. Three offices across Alabama. One promise that hasn't changed since 1958 — to protect Alabama homes like they're our own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setQuoteOpen(true)}
                className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg">
                Get Free Inspection
              </button>
              <a href="tel:2059406360"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
                <Phone className="w-5 h-5" /> (205) 940-6360
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Started at Lake Martin.<br/>Built Across Alabama.</h2>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  In 1958, Phillip M. Wedgworth started EnviroCare with a single goal: to protect the homes and families of the Alexander City and Lake Martin community he called home.
                </p>
                <p>
                  The Lake Martin area was growing. New families were building homes along 880 miles of shoreline. And with Alabama's warm, humid climate came pests — termites threatening foundations, mosquitoes making evenings unbearable, fire ants turning yards into hazards.
                </p>
                <p>
                  Phillip believed in doing things right. Not the fastest way. Not the cheapest way. The right way. That meant showing up on time, treating customers with respect, using effective products safely, and standing behind every job.
                </p>
                <p>
                  That philosophy worked. Customers trusted EnviroCare. They referred their neighbors. They came back year after year.
                </p>
                <p>
                  Over the decades, that trust grew into something larger. EnviroCare expanded — first within the Lake Martin area, then to Birmingham, then to Huntsville. Today, three generations of the Wedgworth family serve customers across Alabama from three offices.
                </p>
                <p className="font-semibold text-slate-900">
                  The company is bigger. The territory is larger. But the philosophy hasn't changed. No one cares like EnviroCare.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-bold text-slate-900 mb-8 text-lg">Three Generations of Protecting Alabama</h3>
              <div className="space-y-1">
                {[
                  { year: "1958", title: "The Founding", desc: "Phillip M. Wedgworth started EnviroCare in Alexander City with one truck and one belief: that Alabama families deserved a pest control company that actually answered the phone and stood behind the work." },
                  { year: "1960s–70s", title: "Growing with Lake Martin", desc: "As Lake Martin grows, so does EnviroCare. Expanded service to Dadeville, Eclectic, and surrounding communities." },
                  { year: "1980s", title: "Second Generation", desc: "His son Phillip L. Wedgworth took over leadership, growing the business across Alabama and building the reputation EnviroCare carries today. Phillip L. retired in the 2010s after decades of service." },
                  { year: "1990s–2000s", title: "Birmingham Expansion", desc: "EnviroCare opens the Birmingham-area office (Alabaster) to serve greater Birmingham, Hoover, Shelby County, and beyond." },
                  { year: "2020s", title: "Third Generation", desc: "His grandson Kevin Wedgworth now runs EnviroCare. Same family. Same answer to your pest problem." },
                  { year: "2022", title: "Huntsville Opens", desc: "EnviroCare opened its Huntsville office, bringing three generations of Alabama pest control expertise to North Alabama — now serving Madison, Athens, Decatur, and beyond." },
                  { year: "Today", title: "Still Family. Still Local.", desc: "EnviroCare serves Alabama from three offices — Birmingham, Lake Martin, and Huntsville — and remains 100% family-owned." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                      {i < 6 && <div className="w-0.5 bg-emerald-200 flex-1 my-1" />}
                    </div>
                    <div className="pb-6">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{item.year}</span>
                      <h4 className="font-bold text-slate-900 mt-0.5 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-slate-600">The values this family built. The values we still live by.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-8 h-8"/>, title: "Family First", desc: "We're a family business serving families. We treat your home with the same care we'd want for our own." },
              { icon: <Users className="w-8 h-8"/>, title: "True Local", desc: "No national call centers. No distant dispatchers. Your call goes to a local office with a technician who knows your community." },
              { icon: <Leaf className="w-8 h-8"/>, title: "Eco-Responsible", desc: "Effective pest control doesn't have to harm the environment. We use products that protect your home without harming Alabama's ecology." },
              { icon: <Award className="w-8 h-8"/>, title: "Done Right", desc: "We'd rather spend extra time doing a job properly than cut corners. Every treatment is backed by our satisfaction guarantee." },
            ].map((v, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-emerald-600 flex justify-center mb-4">{v.icon}</div>
                <h3 className="font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 OFFICES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Three Offices. One Standard.</h2>
            <p className="text-lg text-slate-600">Each office is staffed by local technicians who know their community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alexander City / Lake Martin",
                address: "1785 Tallapoosa St, Alexander City, AL 35010",
                phone: "(256) 234-6162",
                tel: "2562346162",
                maps: "https://www.google.com/maps?cid=12101127141767078247",
                note: "Our original office. Home base since 1958. Serving the Lake Martin community longer than anyone.",
                badge: "Est. 1958 · Original Office",
                color: "emerald",
              },
              {
                name: "Birmingham Office",
                address: "2025 Butler Rd, Alabaster, AL 35007",
                phone: "(205) 940-6360",
                tel: "2059406360",
                maps: "https://www.google.com/maps?cid=7378341068021381374",
                note: "Serving greater Birmingham, Hoover, Chelsea, Pelham, Alabaster, Vestavia Hills, Mountain Brook, and Shelby County.",
                badge: "Birmingham Metro",
                color: "blue",
              },
              {
                name: "Huntsville Office",
                address: "7027 Old Madison Pike, Suite 108, Huntsville, AL 35806",
                phone: "(256) 937-7676",
                tel: "2569377676",
                maps: "https://maps.app.goo.gl/p5fJg2GoAr3Vk3Ua8",
                note: "Serving Huntsville, Madison, Athens, Decatur, Hartselle, and all of North Alabama.",
                badge: "North Alabama",
                color: "violet",
              },
            ].map((o, i) => {
              const colors = {
                emerald: "border-emerald-500",
                blue: "border-blue-500",
                violet: "border-violet-500",
              };
              const badgeColors = {
                emerald: "bg-emerald-100 text-emerald-800",
                blue: "bg-blue-100 text-blue-800",
                violet: "bg-violet-100 text-violet-800",
              };
              return (
                <div key={i} className={`p-6 bg-white rounded-xl border-2 ${(colors as Record<string, string>)[o.color]} shadow-sm`}>
                  <span className={`inline-block mb-3 px-3 py-1 text-xs font-bold rounded-full ${(badgeColors as Record<string, string>)[o.color]}`}>{o.badge}</span>
                  <h3 className="font-bold text-slate-900 mb-3">{o.name}</h3>
                  <a href={o.maps} target="_blank" rel="noreferrer"
                    className="flex items-start gap-2 text-sm text-slate-500 hover:text-emerald-600 transition mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />{o.address}
                  </a>
                  <a href={`tel:${o.tel}`} className="flex items-center gap-2 text-emerald-600 font-bold mb-4 hover:text-emerald-700 transition">
                    <Phone className="w-4 h-4" />{o.phone}
                  </a>
                  <p className="text-sm text-slate-600 leading-relaxed">{o.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KEVIN SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/kevin-headshot.jpg"
                alt="Kevin Wedgworth - EnviroCare Operations"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">Leadership</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Kevin Wedgworth</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Kevin leads EnviroCare's day-to-day operations, carrying forward the family mission his grandfather started in Alexander City in 1958.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                With deep roots in Alabama and a hands-on approach to every market EnviroCare serves, Kevin ensures that what made this company great — showing up, doing it right, standing behind the work — stays true across all three offices and every community we protect.
              </p>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <div className="flex items-center gap-3"><span className="text-emerald-600 font-bold">✓</span>Third-generation family leadership</div>
                <div className="flex items-center gap-3"><span className="text-emerald-600 font-bold">✓</span>Oversees all 3 Alabama offices</div>
                <div className="flex items-center gap-3"><span className="text-emerald-600 font-bold">✓</span>Alabama-licensed pest control operator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIBBON CUTTING */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Growing in Alabama's Communities</h2>
            <p className="text-slate-600">Our office openings bring the community together — because that's who we serve</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/ribbon-cutting-1.jpg"
              alt="EnviroCare office ribbon cutting ceremony with community members"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">EnviroCare office opening — supported by the local community we've served for generations</p>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Licensed, Certified & Trusted</h2>
            <p className="text-slate-400">Every technician. Every treatment. Every time.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { badge: "APCA Member", desc: "Alabama Pest Control Association" },
              { badge: "Sentricon Certified", desc: "Termite bait system specialists" },
              { badge: "GBAHB Member", desc: "Greater Birmingham home builders" },
              { badge: "Alabama Licensed", desc: "All technicians state-certified" },
            ].map((c, i) => (
              <div key={i} className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                <div className="text-emerald-400 font-bold mb-2">{c.badge}</div>
                <div className="text-slate-400 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-emerald-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">68 Years of Caring. Ready to Help You.</h2>
          <p className="text-emerald-100 text-lg mb-8">Free inspection from your local EnviroCare office. No obligation, no pressure.</p>
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
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[440px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-start">
              <div><h3 className="font-bold text-xl">Free Pest Inspection</h3><p className="text-emerald-200 text-sm mt-1">Select your location</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-emerald-300 hover:text-white mt-[-4px]">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: "Birmingham / Hoover / Chelsea / Pelham", phone: "(205) 940-6360", tel: "2059406360" },
                { label: "Lake Martin / Alexander City / Auburn", phone: "(256) 234-6162", tel: "2562346162" },
                { label: "Huntsville / Madison / Athens / Decatur", phone: "(256) 937-7676", tel: "2569377676" },
              ].map((o, i) => (
                <a key={i} href={`tel:${o.tel}`}
                  className="flex justify-between items-center w-full p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition group">
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
