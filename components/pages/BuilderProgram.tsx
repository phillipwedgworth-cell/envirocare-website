"use client";
import { useState } from "react";
import { Phone, CheckCircle, ChevronDown, Home, Users, Shield, Award, Clock } from "lucide-react";

import Header from "@/components/shared/Header";
export default function BuilderProgram() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "New Home Builder Pest Control Program",
          "provider": {
            "@type": "LocalBusiness",
            "name": "EnviroCare Pest Control",
            "telephone": "(205) 649-5278",
            "foundingDate": "1958"
          },
          "description": "EnviroCare partners with Alabama home builders for new construction pest pre-treatment, Sentricon installation, and homeowner protection plans. Serving Birmingham, Huntsville, and Lake Martin.",
          "areaServed": "Alabama"
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden text-white py-20 md:py-28" style={{background:"linear-gradient(135deg, #0f2d1a 0%, #0E8E40 60%, #0f4d26 100%)"}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 80%, #F5A800 0%, transparent 50%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-yellow-400/40" style={{background:"rgba(245,168,0,0.15)"}}>
              <Home className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-200">Alabama Home Builder Partner Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We Don't Just Protect Homes.<br/>
              <span style={{color:"#F5A800"}}>We Protect Relationships.</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
              EnviroCare partners with Alabama's home builders to deliver more than pest control — we deliver peace of mind from foundation to final walkthrough. Our builder program protects your homes, your reputation, and your homeowners for the long term.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={() => setContactOpen(true)}
                className="px-8 py-4 font-bold rounded-xl transition shadow-lg text-base"
                style={{background:"#F5A800", color:"#1A1A1A"}}>
                Talk to Our Builder Team
              </button>
              <a href="tel:2056495278"
                className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl transition border text-base"
                style={{background:"rgba(255,255,255,0.1)", borderColor:"rgba(255,255,255,0.2)"}}>
                <Phone className="w-5 h-5" /> (205) 649-5278
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-white/10">
              {[
                { n: "Since 1958", sub: "Builder relationships built over decades" },
                { n: "3 Markets", sub: "Birmingham · Huntsville · Lake Martin" },
                { n: "Certified", sub: "Sentricon Specialist™" },
                { n: "Always", sub: "On time, on budget" },
              ].map((t, i) => (
                <div key={i}>
                  <div className="text-xl font-bold" style={{color:"#F5A800"}}>{t.n}</div>
                  <div className="text-xs text-green-200 mt-1 leading-tight">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{color:"#0E8E40"}}>More Than a Vendor</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                We Go Beyond the Service Call
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                Most pest control companies show up, spray, and leave. EnviroCare thinks differently. When you partner with us on new construction, you're getting a team that takes ownership of the long-term outcome — for you and for your homeowners.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                We coordinate with your construction timeline. We're on site when we need to be. We document everything. And when your homeowner needs help two years later, we're still here — your customer is our customer, and we treat them that way.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                That's what 68+ years of Alabama builder relationships looks like. Trust built on showing up, doing it right, and staying committed.
              </p>
              <div className="space-y-3">
                {[
                  "Flexible scheduling around your construction calendar",
                  "On-site pre-treat before slab pour when needed",
                  "Documentation and warranties transferred to homeowner",
                  "Homeowner onboarding — we explain the system to them",
                  "Dedicated builder contact for scheduling and questions",
                  "Priority service for builder partner homeowners",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color:"#0E8E40"}} />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats/trust block */}
            <div className="space-y-4">
              {/* STOCK PHOTO: Replace with actual photo of EnviroCare truck at new construction site / frame stage */}
              <div className="rounded-2xl overflow-hidden shadow-xl h-64 bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop"
                  alt="New home construction site with pest pre-treatment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium" style={{background:"linear-gradient(transparent, rgba(0,0,0,0.7))"}}>
                  Pre-treatment during framing — the most effective phase for long-term protection
                  {/* STOCK PHOTO NOTE: Replace with real EnviroCare new construction pre-treat photo */}
                </div>
              </div>
              <div className="p-6 rounded-2xl border-2 text-white" style={{background:"#0E8E40", borderColor:"#F5A800"}}>
                <p className="font-bold text-yellow-300 text-sm uppercase tracking-wide mb-3">Why Builders Choose EnviroCare</p>
                <div className="space-y-3">
                  {[
                    "Family-owned — same decision-makers for 68+ years",
                    "Local offices in your markets (not a national call center)",
                    "Certified Sentricon Specialist™ — premium product access",
                    "Reputation protects your reputation",
                    "Homeowners inherited — not handed off",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-green-100">
                      <span className="font-bold text-yellow-400 flex-shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDER SERVICES */}
      <section className="py-16 px-6" style={{background:"#f7f9f7"}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Do for Builders</h2>
            <p className="text-lg text-slate-600">From groundbreaking to move-in and beyond</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Home className="w-7 h-7" />,
                title: "Pre-Construction Soil Treatment",
                phase: "Before slab pour",
                desc: "Termiticide applied to the soil under and around the foundation before concrete is poured. The most effective and comprehensive method of termite prevention for new homes.",
                highlight: false,
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: "Sentricon® System Installation",
                phase: "At framing or move-in",
                desc: "Certified Sentricon Specialists install bait stations around the completed home's perimeter. Provides ongoing, always-active monitoring and colony elimination from day one.",
                highlight: true,
              },
              {
                icon: <CheckCircle className="w-7 h-7" />,
                title: "Construction Phase Pest Control",
                phase: "During build",
                desc: "Open construction creates pest entry points. We manage pest pressure during the build to protect materials, prevent harborage, and keep job sites clean.",
                highlight: false,
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Homeowner Onboarding",
                phase: "At closing",
                desc: "We meet with new homeowners to explain their protection system, answer questions, and set up their annual monitoring account. Your buyers feel taken care of — because they are.",
                highlight: false,
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: "Warranty & Documentation",
                phase: "Delivered at closing",
                desc: "Full documentation of all treatments, warranty coverage, and service history provided to the homeowner at closing. Clean records for your legal protection too.",
                highlight: false,
              },
              {
                icon: <Clock className="w-7 h-7" />,
                title: "Ongoing Annual Monitoring",
                phase: "Year 1 and beyond",
                desc: "Homeowners transition into EnviroCare's annual Sentricon monitoring plan. We keep protecting your homes long after you've moved on to the next project.",
                highlight: false,
              },
            ].map((service, i) => (
              <div key={i} className={`p-6 rounded-xl border-2 transition ${service.highlight ? "text-white" : "bg-white border-slate-200 hover:border-green-300 hover:shadow-md"}`}
                style={service.highlight ? {background:"#0E8E40", borderColor:"#F5A800"} : {}}>
                <div className="mb-4" style={{color: service.highlight ? "#F5A800" : "#0E8E40"}}>{service.icon}</div>
                <span className={`inline-block mb-3 px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wide ${service.highlight ? "text-green-800" : "text-green-700"}`}
                  style={{background: service.highlight ? "#F5A800" : "#d1fae5"}}>
                  {service.phase}
                </span>
                <h3 className={`text-lg font-bold mb-3 ${service.highlight ? "text-white" : "text-slate-900"}`}>{service.title}</h3>
                <p className={`text-sm leading-relaxed ${service.highlight ? "text-green-100" : "text-slate-600"}`}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS WE SERVE BUILDERS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Builder Markets We Serve</h2>
            <p className="text-slate-600 text-lg">Active new construction across all 3 of our Alabama markets</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                market: "Greater Birmingham",
                office: "2025 Butler Rd, Alabaster",
                phone: "(205) 940-6360",
                tel: "2059406360",
                communities: ["Chelsea", "Pelham", "Helena", "Calera", "Alabaster", "Hoover", "Trussville", "Gardendale", "Vestavia Hills", "Mountain Brook"],
                note: "One of Alabama's fastest-growing suburban markets. Heavy new construction in Chelsea/Shelby County corridor.",
                color: "blue",
              },
              {
                market: "Huntsville Metro",
                office: "7027 Old Madison Pike, Huntsville",
                phone: "(256) 937-7676",
                tel: "2569377676",
                communities: ["Huntsville", "Madison", "Athens", "Harvest", "Hampton Cove", "Meridianville", "Decatur"],
                note: "Fastest growing market in Alabama. Rocket City's expansion drives massive new residential development.",
                color: "green",
              },
              {
                market: "Lake Martin / Alex City",
                office: "1785 Tallapoosa St, Alexander City",
                phone: "(256) 234-6162",
                tel: "2562346162",
                communities: ["Lake Martin waterfront", "Alexander City", "Dadeville", "Eclectic", "Russell Lands developments", "Auburn / Opelika"],
                note: "Premium waterfront market. Average home values $778k+. Builder relationships here require specialist-level knowledge.",
                color: "teal",
              },
            ].map((market, i) => {
              const colors = {
                blue: { border: "#3b82f6", badge: "#eff6ff", badgeText: "#1e40af" },
                green: { border: "#0E8E40", badge: "#f0fdf4", badgeText: "#166534" },
                teal: { border: "#0d9488", badge: "#f0fdfa", badgeText: "#115e59" },
              }[market.color as 'blue' | 'green' | 'teal']!;
              return (
                <div key={i} className="p-6 rounded-xl border-2 bg-white" style={{borderColor: colors.border}}>
                  <h3 className="font-bold text-slate-900 text-xl mb-1">{market.market}</h3>
                  <p className="text-xs text-slate-500 mb-3">{market.office}</p>
                  <a href={`tel:${market.tel}`} className="flex items-center gap-2 font-bold mb-4" style={{color: colors.border}}>
                    <Phone className="w-4 h-4" />{market.phone}
                  </a>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{market.note}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {market.communities.map(c => (
                      <span key={c} className="text-xs px-2 py-1 rounded-full font-medium" style={{background: colors.badge, color: colors.badgeText}}>{c}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / TRUST SECTION */}
      <section className="py-16 px-6 text-white" style={{background:"#1a1a1a"}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{color:"#F5A800"}}>Built on Trust</p>
              <h2 className="text-3xl font-bold text-white mb-6">The Same Team. The Same Commitment.<br/>For Decades.</h2>
              <p className="text-slate-300 leading-relaxed mb-5">
                When you call EnviroCare for a builder quote, you're not calling a call center. You're talking to the people who will actually show up on your job site — the same team that's been serving Alabama builders since before many of today's neighborhoods existed.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                We understand what builders need: reliability, documentation, flexible scheduling, and a company that understands your liability. We've been doing this long enough to know exactly how to be a partner you can count on.
              </p>
              {/* STOCK PHOTO CALLOUT */}
              <div className="p-4 rounded-xl border border-yellow-500/30" style={{background:"rgba(245,168,0,0.1)"}}>
                <p className="text-yellow-300 text-sm font-semibold mb-1">📸 Photo Recommendation Here</p>
                <p className="text-yellow-200/70 text-xs">Use: Kevin Wedgworth meeting with builder partner, OR EnviroCare truck parked at new construction site with framing visible in background. Shows "at the job site" presence.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  quote: "EnviroCare shows up when they say they will. For a builder, that's everything.",
                  name: "Alabama Home Builder",
                  loc: "Birmingham Metro"
                },
                {
                  quote: "My buyers love that their new home comes with EnviroCare's Sentricon already installed. It's a selling point.",
                  name: "Custom Home Builder",
                  loc: "Lake Martin"
                },
                {
                  quote: "We've worked with the Wedgworth family for years. When your company answers the phone, that's who you want.",
                  name: "Residential Builder",
                  loc: "Huntsville"
                },
              ].map((t, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-700" style={{background:"#242424"}}>
                  <p className="text-slate-200 italic mb-3 leading-relaxed text-sm">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.loc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6" style={{background:"#f7f9f7"}}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Builder Program FAQ</h2>
          <div className="space-y-3">
            {[
              {
                q: "How do we set up a builder account with EnviroCare?",
                a: "Call or email your nearest EnviroCare office directly and ask for the builder program. We'll schedule a meeting, walk through your current project pipeline, and structure a program around your needs and volume. No complicated contracts — we work the way you work."
              },
              {
                q: "What's the timeline for pre-treat scheduling?",
                a: "We ask for 48–72 hours notice for pre-treat scheduling on active jobs. For high-volume builders with multiple sites, we set up a recurring schedule aligned with your build calendar. We build our schedule around yours — not the other way around."
              },
              {
                q: "Do you provide documentation for closing?",
                a: "Yes. We provide a treatment certificate, warranty documentation, and service history for every home. All documentation is formatted for closing packages and transferable to the homeowner."
              },
              {
                q: "What happens after the homeowner moves in?",
                a: "We transition the homeowner into our annual monitoring program. They become an EnviroCare customer — with the same level of service you expect. We contact them for annual service visits, provide written reports, and handle any concerns directly. Your reputation is protected."
              },
              {
                q: "Do you serve builders in all 3 of your markets?",
                a: "Yes. Our Birmingham/Alabaster office serves the Shelby County corridor (Chelsea, Pelham, Helena, Calera and surrounding areas). Our Huntsville office covers Madison, Limestone, and Morgan County. Our Alexander City office covers Lake Martin, Tallapoosa County, and the Auburn/Opelika area."
              },
              {
                q: "Is EnviroCare licensed for commercial/builder work?",
                a: "Yes. EnviroCare holds all required Alabama Pest Control licenses for both residential and commercial work, including new construction pre-treatment. Our Certified Sentricon Specialist certification is maintained through Corteva Agriscience's ongoing training program."
              },
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
      <section className="py-20 px-6 text-white text-center" style={{background:"linear-gradient(135deg, #0E8E40, #0f4d26)"}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Let's Talk Builder Partnership</h2>
          <p className="text-green-100 text-lg mb-8">
            Family-owned since 1958. Licensed across Alabama. Ready to protect your homes and your reputation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setContactOpen(true)}
              className="px-8 py-4 font-bold rounded-xl transition shadow-lg"
              style={{background:"#F5A800", color:"#1A1A1A"}}>
              Contact Builder Team
            </button>
            <a href="tel:2056495278"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl transition border"
              style={{background:"rgba(255,255,255,0.1)", borderColor:"rgba(255,255,255,0.3)"}}>
              <Phone className="w-5 h-5" /> (205) 649-5278
            </a>
          </div>
        </div>
      </section>

      {contactOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setContactOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[440px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="text-white p-5 flex justify-between items-start" style={{background:"#0E8E40"}}>
              <div><h3 className="font-bold text-xl">Builder Program Inquiry</h3><p className="text-green-200 text-sm mt-1">Talk to your local office directly</p></div>
              <button onClick={() => setContactOpen(false)} className="text-3xl leading-none text-green-300 hover:text-white mt-[-4px]">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: "Birmingham metro builders — Alabaster office", phone: "(205) 940-6360", tel: "2059406360" },
                { label: "Lake Martin / Alex City / Auburn builders", phone: "(256) 234-6162", tel: "2562346162" },
                { label: "Huntsville / Madison County builders", phone: "(256) 937-7676", tel: "2569377676" },
              ].map((o, i) => (
                <a key={i} href={`tel:${o.tel}`}
                  className="flex justify-between items-center w-full p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                  <div>
                    <div className="text-sm font-medium text-slate-700">{o.label}</div>
                    <div className="font-bold mt-0.5" style={{color:"#0E8E40"}}>{o.phone}</div>
                  </div>
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition" />
                </a>
              ))}
              <p className="text-xs text-slate-500 text-center pt-2">Or email us at <a href="mailto:service@envirocarellc.com" className="underline">service@envirocarellc.com</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
