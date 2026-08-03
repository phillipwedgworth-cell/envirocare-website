// data/priority-cities.ts
// ── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: data/priority-cities.ts  (merge into your existing CityData record —
//        if a slug already exists in phase-a-cities.ts, REPLACE its fields with these)
// Commit: content: priority city pages from GSC keyword map
// Push: open PR (do NOT merge until pricing/phone flags confirmed)
// ────────────────────────────────────
//
// Drop-in CityData objects for the 8 highest-opportunity city pages,
// written against real Google Search Console demand (16-mo impressions).
// Conforms to the CityData type in data/phase-a-cities.ts.
//
// COMPLIANCE BAKED IN: EPA-registered products applied to label directions
// (never "safe/pet-safe"); no same-day promises; no competitor names; no
// mosquito guarantee ("reduce/knock down"); fourth-generation, family-owned
// since 1958; no review counts; no customer counts; termite install quoted
// only after a free inspection (never flat-priced on public copy).
//
// reviews: [] is intentional — paste REAL Google reviews only. Never fabricate.

import type { CityData } from "@/data/phase-a-cities";

export const priorityCities: Record<string, CityData> = {

  // ===================================================================
  // HUNTSVILLE — Priority 1. 3,843 imp "pest control huntsville" (pos 60),
  // 2,470 "termite control huntsville", 2,111 "mosquito control huntsville".
  // 0 organic clicks today — paid bridge now, this page for post-flip.
  // ===================================================================
  "huntsville": {
    slug: "huntsville",
    name: "Huntsville",
    metaTitle: "Pest Control Huntsville AL | Termite & Mosquito | EnviroCare",
    metaDescription:
      "Family-owned pest control in Huntsville, AL since 1958. Bi-monthly service, Sentricon® termite protection, seasonal mosquito control. (256) 937-7676.",
    office: "Huntsville",
    phone: "(256) 937-7676",
    tel: "2569377676",
    badge: "Serving Huntsville & Madison County",
    heroTitle: "Pest Control in Huntsville,",
    heroTitleEm: "Done Right",
    heroLede:
      "Huntsville's mix of historic homes, riverfront humidity, and fast new construction gives pests plenty of ways in. EnviroCare protects your home with bi-monthly exterior pest service, Sentricon® termite monitoring, and seasonal mosquito control — backed by four generations of Alabama experience.",
    zipPrimary: "35806",
    contextTitle: "Why Huntsville homes need a steady pest plan",
    contextLede:
      "From the older brick homes around Twickenham and Five Points to the new subdivisions out toward Providence and Hampton Cove, Huntsville sits in a humid Tennessee Valley pocket that termites and mosquitoes love. The Flint and Tennessee Rivers, greenways, and Monte Sano's wooded slopes keep mosquito and ant pressure high from spring through fall. Our exterior barrier is built on a bi-monthly rhythm: most exterior treatments break down in roughly 60 days, so we come back to re-apply right as the previous barrier wears off — instead of leaving a gap pests can walk through.",
    pests: [
      { emoji: "🐜", title: "Ants & Roaches", description: "Argentine and odorous house ants, plus American and German roaches that push indoors as Valley humidity climbs." },
      { emoji: "🪲", title: "Termites", description: "Subterranean termites thrive in Huntsville's humidity and older crawlspace homes. We monitor and protect with Sentricon® Always Active." },
      { emoji: "🦟", title: "Mosquitoes", description: "River tributaries, greenways, and shaded yards drive heavy mosquito pressure March through November. Seasonal treatments knock populations down." },
      { emoji: "🕷️", title: "Spiders & Fall Invaders", description: "Wolf spiders, ladybugs, and stink bugs that move in as temperatures drop. Covered under your regular plan." },
    ],
    servingLabel: "Serving Huntsville & surrounding Madison County",
    neighborhoods: [
      { name: "Twickenham & Five Points", zip: "35801", note: "Historic districts — older homes mean termite vigilance is critical.", features: ["Older construction", "Termite priority", "Crawlspaces"] },
      { name: "Hampton Cove", zip: "35763", note: "Wooded, river-adjacent east-side living. High mosquito and tick pressure.", features: ["Wooded lots", "Mosquito priority", "Tick risk"] },
      { name: "Blossomwood & Monte Sano", zip: "35801", note: "Mature canopy and hillside yards — carpenter ants and mosquitoes.", features: ["Mature trees", "Carpenter ants", "Mosquito priority"] },
      { name: "Providence & Research Park", zip: "35806", note: "Newer construction near the office — Argentine ants and fall invaders.", features: ["New construction", "Ant control", "Fast service area"] },
    ],
    faqs: [
      { q: "How much does pest control cost in Huntsville?", a: "Bi-monthly pest service starts at $35/month on auto-pay (or $70 every other month), covering 30+ common Alabama pests with unlimited re-service on covered pests between visits. The one-time initial service fee is $79." },
      { q: "Do you treat for termites in Huntsville?", a: "Yes. We protect Huntsville homes with the Sentricon® Always Active system — no-drill, in-ground monitoring backed by EnviroCare's own guarantee of up to $1,000,000 in covered structural repair. Monitoring and install are quoted after a free termite inspection." },
      { q: "When should I start mosquito control in Huntsville?", a: "Our mosquito season runs March through November. Starting in early spring, before the first hatch, gives you the strongest season-long knockdown. Treatments reduce mosquito populations around your yard — we don't promise to eliminate them, because no honest company can." },
      { q: "Are your products safe around pets and kids?", a: "We use EPA-registered products applied strictly according to label directions by licensed Alabama technicians. Always follow your technician's re-entry guidance after a treatment." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Huntsville pest inspection",
    footerServingCities: ["Huntsville", "Madison", "Hampton Cove", "Owens Cross Roads", "Meridianville", "Harvest"],
  },

  // ===================================================================
  // MADISON — Priority 2. 32,606 page impressions, 0 clicks at pos 28.
  // Closest Huntsville-metro win. $131K median income, only 8 customers.
  // ===================================================================
  "madison": {
    slug: "madison",
    name: "Madison",
    metaTitle: "Pest Control Madison AL | Termite & Mosquito | EnviroCare",
    metaDescription:
      "Trusted pest control in Madison, AL — bi-monthly service, Sentricon® termite protection, seasonal mosquito control. Family-owned. (256) 937-7676.",
    office: "Huntsville",
    phone: "(256) 937-7676",
    tel: "2569377676",
    badge: "Serving Madison & the Huntsville Metro",
    heroTitle: "Pest Control in Madison,",
    heroTitleEm: "Built for Your Home",
    heroLede:
      "Madison's newer neighborhoods and Tennessee River tributaries make for a humid, fast-growing corner of the Valley where ants, spiders, and mosquitoes stay busy. EnviroCare keeps Madison homes protected year-round with bi-monthly pest service, Sentricon® termite monitoring, and seasonal mosquito treatments.",
    zipPrimary: "35758",
    contextTitle: "Pest pressure in Madison's growing neighborhoods",
    contextLede:
      "From Madison Crossings and Heritage Plantation to the lake-adjacent homes around Clift's Cove, Madison's mix of new construction and river-fed humidity keeps Argentine ants, spiders, and seasonal invaders active most of the year. New builds aren't immune to termites — disturbed soil and irrigation create the moisture subterranean colonies look for. Our bi-monthly schedule re-applies the exterior barrier about every 60 days, right as the prior treatment breaks down, so pests don't get a window to move back in.",
    pests: [
      { emoji: "🐜", title: "Ants", description: "Argentine and odorous house ants are the #1 call in Madison's subdivisions, especially after rain." },
      { emoji: "🪲", title: "Termites", description: "Even newer Madison homes face subterranean termite risk from irrigation and humidity. Sentricon® protects year-round." },
      { emoji: "🦟", title: "Mosquitoes", description: "Tennessee River tributaries and retention ponds drive heavy mosquito pressure March–November." },
      { emoji: "🕷️", title: "Spiders & Fall Invaders", description: "Spiders, stink bugs, and ladybugs that crowd in as the weather turns. Covered on your plan." },
    ],
    servingLabel: "Serving Madison & the greater Huntsville metro",
    neighborhoods: [
      { name: "Madison Crossings", zip: "35756", note: "Family subdivisions and newer construction — ants and spiders lead the calls.", features: ["New construction", "Ant control", "Family homes"] },
      { name: "Heritage Plantation", zip: "35758", note: "Established, affluent area with mature landscaping and termite considerations.", features: ["Mature landscaping", "Termite priority"] },
      { name: "Clift's Cove", zip: "35758", note: "Lake-adjacent living — mosquito control is the seasonal priority here.", features: ["Lake-adjacent", "Mosquito priority"] },
      { name: "Bridge Street area", zip: "35806", note: "Mixed-use corridor bordering Research Park — quick service from our Huntsville office.", features: ["Mixed-use", "Fast service area"] },
    ],
    faqs: [
      { q: "How much is pest control in Madison, AL?", a: "Bi-monthly service starts at $35/month on auto-pay (or $70 every other month) and covers 30+ common Alabama pests with unlimited re-service between visits. The one-time initial service fee is $79." },
      { q: "Do new homes in Madison really need termite protection?", a: "Yes — newer construction isn't termite-proof. Irrigation, settled soil, and Valley humidity all create the moisture subterranean termites need. Sentricon® Always Active monitors continuously, backed by EnviroCare's guarantee of up to $1,000,000 in covered repair." },
      { q: "What does mosquito control cost in Madison?", a: "Seasonal mosquito service runs March through November at $45 per treatment, which most customers spread across the year. Treatments reduce mosquito populations around your yard; we never promise to eliminate them." },
      { q: "How fast can you get to my Madison home?", a: "Madison is served directly by our Huntsville office. We'll schedule your free inspection promptly — though we never over-promise on timing, because doing the job right matters more than rushing it." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Madison pest quote",
    footerServingCities: ["Madison", "Huntsville", "Triana", "Harvest", "Madison County"],
  },

  // ===================================================================
  // DECATUR — Priority 4. 24,000+ page impressions, 1 click at pos 42.
  // "pest control decatur" 3,624 imp. Huntsville-metro expansion target.
  // ===================================================================
  "decatur": {
    slug: "decatur",
    name: "Decatur",
    metaTitle: "Pest Control Decatur AL | Termite & Mosquito | EnviroCare",
    metaDescription:
      "Family-owned pest control in Decatur, AL — bi-monthly service, Sentricon® termite, seasonal mosquito control along the Tennessee River. (256) 937-7676.",
    office: "Huntsville",
    phone: "(256) 937-7676",
    tel: "2569377676",
    badge: "Serving Decatur & Morgan County",
    heroTitle: "Pest Control in Decatur,",
    heroTitleEm: "River-Tested",
    heroLede:
      "Sitting right on the Tennessee River, Decatur deals with mosquito and termite pressure that most inland cities don't. EnviroCare protects Decatur homes with bi-monthly pest service, Sentricon® termite monitoring, and seasonal mosquito control from our nearby Huntsville office.",
    zipPrimary: "35601",
    contextTitle: "Living on the river means staying ahead of pests",
    contextLede:
      "Decatur's location on the Tennessee River and near Wheeler National Wildlife Refuge means standing water, humidity, and heavy mosquito pressure for much of the year. Older homes in Southwest Decatur and around Delano Park face real subterranean termite risk, while newer areas near Point Mallard see their share of ants and seasonal invaders. Our bi-monthly exterior service re-applies the barrier about every 60 days — timed to the natural breakdown of the previous treatment so there's no open window for pests.",
    pests: [
      { emoji: "🦟", title: "Mosquitoes", description: "River proximity and Wheeler Refuge wetlands make Decatur one of the highest mosquito-pressure areas we serve." },
      { emoji: "🪲", title: "Termites", description: "Older riverside homes face strong subterranean termite pressure. Sentricon® Always Active monitors and protects." },
      { emoji: "🐜", title: "Ants & Roaches", description: "Humidity pushes ants and roaches indoors. Covered under bi-monthly service with re-service between visits." },
      { emoji: "🐭", title: "Rodents & Fall Invaders", description: "Mice and seasonal invaders looking for warmth as the weather cools. Ask about rodent coverage." },
    ],
    servingLabel: "Serving Decatur & surrounding Morgan County",
    neighborhoods: [
      { name: "Southwest Decatur", zip: "35601", note: "Established homes near Delano Park — termite vigilance and ant control.", features: ["Older homes", "Termite priority", "Ant control"] },
      { name: "Point Mallard area", zip: "35603", note: "Family neighborhoods near the river and aquatic park — strong mosquito pressure.", features: ["River-adjacent", "Mosquito priority", "Family homes"] },
      { name: "Burningtree", zip: "35603", note: "Golf-community living with mature landscaping and mosquito considerations.", features: ["Mature landscaping", "Mosquito priority"] },
      { name: "Northwest Decatur", zip: "35601", note: "Mixed older and newer homes — full-plan coverage from our Huntsville office.", features: ["Mixed construction", "Full coverage"] },
    ],
    faqs: [
      { q: "Why is mosquito control such a big deal in Decatur?", a: "Decatur's position on the Tennessee River and next to Wheeler Refuge means abundant standing water and wetlands — prime mosquito breeding. Our seasonal program (March–November, $45 per treatment) targets resting and breeding areas to reduce the population around your home. We don't claim to eliminate mosquitoes." },
      { q: "How much does pest control cost in Decatur?", a: "Bi-monthly pest service starts at $35/month on auto-pay (or $70 every other month) for 30+ common Alabama pests, with unlimited re-service on covered pests. The one-time initial service fee is $79." },
      { q: "Do you offer termite protection in Decatur?", a: "Yes — Sentricon® Always Active, a no-drill in-ground system backed by EnviroCare's guarantee of up to $1,000,000 in covered structural repair. Monitoring and install are quoted after a free termite inspection." },
      { q: "Is Decatur within your service area?", a: "Yes. Decatur is served from our Huntsville office, which keeps response times short across Morgan County." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Decatur pest inspection",
    footerServingCities: ["Decatur", "Hartselle", "Priceville", "Trinity", "Morgan County"],
  },

  // ===================================================================
  // VESTAVIA HILLS — Priority 3. 27,000 page imp at pos 25; query "vestavia
  // hills mosquito control" already pos 12. Deepen to close page 1.
  // ===================================================================
  "vestavia-hills": {
    slug: "vestavia-hills",
    name: "Vestavia Hills",
    metaTitle: "Pest Control Vestavia Hills AL | Mosquito, Termite & Ant | EnviroCare",
    metaDescription:
      "Pest control in Vestavia Hills, AL — mosquito and tick control, Sentricon® termite protection, ant and pest service. Family-owned. (205) 940-6360.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Serving Vestavia Hills & Over the Mountain",
    heroTitle: "Pest Control in Vestavia Hills,",
    heroTitleEm: "Above & Beyond",
    heroLede:
      "Vestavia Hills' wooded ridgelines and mature, established yards are beautiful — and ideal habitat for mosquitoes, ticks, and carpenter ants. EnviroCare protects Over-the-Mountain homes with seasonal mosquito and tick control, Sentricon® termite monitoring, and year-round pest service.",
    zipPrimary: "35216",
    contextTitle: "Wooded hills mean mosquitoes, ticks, and ants",
    contextLede:
      "Vestavia Hills sits along Shades Mountain with heavy tree canopy, shaded lots, and proximity to the Cahaba River and Liberty Park's green corridors. That landscape drives strong mosquito and tick pressure spring through fall, while older brick homes and mature mulch beds invite carpenter ants and subterranean termites. Our exterior service runs on a bi-monthly rhythm — re-applying the barrier about every 60 days as the prior treatment naturally wears off, so there's no gap for pests to exploit.",
    pests: [
      { emoji: "🦟", title: "Mosquitoes & Ticks", description: "Wooded hillsides and shaded yards keep mosquito and tick pressure high March–November. Our seasonal program targets both." },
      { emoji: "🐜", title: "Carpenter & House Ants", description: "Mature canopy and mulch beds bring carpenter ants close to the home. Covered under regular service." },
      { emoji: "🪲", title: "Termites", description: "Older brick homes with mature landscaping face subterranean termite risk. Sentricon® Always Active protects and monitors." },
      { emoji: "🕷️", title: "Spiders", description: "Wolf and house spiders that follow other insects indoors. Covered on your bi-monthly plan." },
    ],
    servingLabel: "Serving Vestavia Hills & the Over-the-Mountain communities",
    neighborhoods: [
      { name: "Cahaba Heights", zip: "35243", note: "Walkable, wooded, near the river — mosquito and tick priority.", features: ["Wooded", "Mosquito priority", "Tick risk"] },
      { name: "Liberty Park", zip: "35242", note: "Green corridors and lakes throughout — strong seasonal mosquito pressure.", features: ["Green corridors", "Mosquito priority"] },
      { name: "Vestavia Hills proper", zip: "35216", note: "Established brick homes on shaded lots — termite and carpenter-ant vigilance.", features: ["Older homes", "Termite priority", "Carpenter ants"] },
      { name: "Rocky Ridge", zip: "35216", note: "Family neighborhoods with mature trees — full-plan pest coverage.", features: ["Mature trees", "Full coverage"] },
    ],
    faqs: [
      { q: "How much does mosquito control cost in Vestavia Hills?", a: "Seasonal mosquito service runs March through November at $45 per treatment, which most homeowners spread over the year. Add tick coverage for wooded lots. Treatments reduce mosquito and tick activity around your yard — we never promise to eliminate them." },
      { q: "Do you treat for ticks in Vestavia Hills?", a: "Yes. Tick control pairs naturally with mosquito service and is especially worthwhile on the wooded hillside lots common in Cahaba Heights and Liberty Park. Ask about adding it to your seasonal plan." },
      { q: "What about termites on older Vestavia homes?", a: "Established brick homes with mature landscaping are exactly where subterranean termites do quiet damage. Sentricon® Always Active monitors year-round with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in covered repair. Install is quoted after a free inspection." },
      { q: "How much is general pest control here?", a: "Bi-monthly pest service starts at $35/month on auto-pay (or $70 every other month), covering 30+ common Alabama pests with unlimited re-service. The one-time initial service fee is $79." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Vestavia Hills quote",
    footerServingCities: ["Vestavia Hills", "Cahaba Heights", "Liberty Park", "Hoover", "Homewood", "Mountain Brook"],
  },

  // ===================================================================
  // PELHAM — Priority 3. Query "pest control pelham al" already pos ~7,
  // page pos 17. One of the closest page-1 wins. Oak Mountain = tick/mosquito.
  // ===================================================================
  "pelham": {
    slug: "pelham",
    name: "Pelham",
    metaTitle: "Pest Control Pelham AL | Termite, Mosquito & Roach | EnviroCare",
    metaDescription:
      "Family-owned pest control in Pelham, AL — bi-monthly service, Sentricon® termite, mosquito and tick control near Oak Mountain. (205) 940-6360.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Serving Pelham & Oak Mountain",
    heroTitle: "Pest Control in Pelham,",
    heroTitleEm: "Oak Mountain Tough",
    heroLede:
      "Living next to Oak Mountain State Park is one of Pelham's best perks — and the reason ticks, mosquitoes, and roaches stay active here. EnviroCare protects Pelham homes with bi-monthly pest service, Sentricon® termite monitoring, and seasonal mosquito and tick control.",
    zipPrimary: "35124",
    contextTitle: "Next to Oak Mountain, pests come with the territory",
    contextLede:
      "Pelham backs right up to Oak Mountain State Park — nearly 10,000 wooded acres that send ticks, mosquitoes, and roaches toward nearby homes year-round. Neighborhoods like Ballantrae and the homes along the Cahaba see strong seasonal mosquito pressure, while crawlspace homes face subterranean termite risk. Our bi-monthly exterior barrier re-applies about every 60 days, timed to the breakdown of the prior treatment, so the protection stays continuous rather than wearing thin between quarterly visits.",
    pests: [
      { emoji: "🪳", title: "Roaches", description: "American and German roaches are a top Pelham call, pushing indoors from wooded edges and mulch. Covered with re-service between visits." },
      { emoji: "🦟", title: "Mosquitoes & Ticks", description: "Oak Mountain's woods and the Cahaba drive heavy mosquito and tick pressure March–November." },
      { emoji: "🪲", title: "Termites", description: "Crawlspace and slab homes alike face subterranean termites. Sentricon® Always Active monitors and protects." },
      { emoji: "🐜", title: "Ants & Spiders", description: "Ants and spiders following the tree line indoors. Covered under your regular plan." },
    ],
    servingLabel: "Serving Pelham & the Oak Mountain area",
    neighborhoods: [
      { name: "Ballantrae", zip: "35124", note: "Golf-community living with mature landscaping — mosquito and tick priority.", features: ["Golf community", "Mosquito priority", "Tick risk"] },
      { name: "Oak Mountain corridor", zip: "35124", note: "Homes bordering the state park — highest tick and roach pressure in the area.", features: ["Park-adjacent", "Tick risk", "Roach control"] },
      { name: "Chandalar", zip: "35124", note: "Established neighborhoods with crawlspace homes — termite vigilance.", features: ["Older homes", "Termite priority"] },
      { name: "Cahaba River area", zip: "35124", note: "River-adjacent lots with strong seasonal mosquito pressure.", features: ["River-adjacent", "Mosquito priority"] },
    ],
    faqs: [
      { q: "Why are roaches so common in Pelham?", a: "Pelham's wooded edges near Oak Mountain, mulch beds, and humidity give American and German roaches plenty of harborage. Our bi-monthly exterior barrier — re-applied as the prior treatment breaks down — keeps them outside, with free re-service if they show up between visits." },
      { q: "Do I need tick control living near Oak Mountain?", a: "If your lot borders woods or trails, it's well worth it. Tick control pairs with our seasonal mosquito program (March–November) to reduce activity around the yard. We reduce pressure — we don't promise to eliminate ticks or mosquitoes." },
      { q: "How much does pest control cost in Pelham?", a: "Bi-monthly service starts at $35/month on auto-pay (or $70 every other month) for 30+ common Alabama pests, with unlimited re-service on covered pests. The one-time initial service fee is $79." },
      { q: "Do you handle termites in Pelham?", a: "Yes — Sentricon® Always Active, a no-drill in-ground system backed by EnviroCare's guarantee of up to $1,000,000 in covered structural repair. Monitoring and install are quoted after a free termite inspection." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Pelham pest quote",
    footerServingCities: ["Pelham", "Helena", "Alabaster", "Indian Springs", "Oak Mountain"],
  },

  // ===================================================================
  // ALABASTER — Priority 3. "pest control alabaster" pos 10, nearly page 1.
  // Home of the office (2025 Butler Rd). Roach + residential demand.
  // ===================================================================
  "alabaster": {
    slug: "alabaster",
    name: "Alabaster",
    metaTitle: "Pest Control Alabaster AL | Termite & Mosquito | EnviroCare",
    metaDescription:
      "Local pest control in Alabaster, AL — our home base. Bi-monthly service, Sentricon® termite, seasonal mosquito control. Free inspection. (205) 940-6360.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Our Home Base — Alabaster, AL",
    heroTitle: "Pest Control in Alabaster,",
    heroTitleEm: "Right Down the Road",
    heroLede:
      "Alabaster is home for EnviroCare — our Shelby County office is right here. That means fast, familiar service for your neighbors: bi-monthly pest control, Sentricon® termite monitoring, and seasonal mosquito treatments from a team that knows these streets.",
    zipPrimary: "35007",
    contextTitle: "Local pest control from a local office",
    contextLede:
      "EnviroCare's office sits right in Alabaster, so this is a community we know block by block. Shelby County's humidity, wooded subdivisions, and mix of established and newer homes keep roaches, ants, and subterranean termites active most of the year. Our bi-monthly exterior service re-applies the barrier about every 60 days — right as the previous treatment breaks down — so your protection never thins out between visits the way a quarterly-only plan can.",
    pests: [
      { emoji: "🪳", title: "Roaches", description: "Cockroach control is one of the top Alabaster requests. Bi-monthly service keeps them out, with free re-service between visits." },
      { emoji: "🐜", title: "Ants", description: "Odorous house and Argentine ants common across Alabaster's subdivisions, especially after rain." },
      { emoji: "🪲", title: "Termites", description: "Shelby County humidity fuels subterranean termite pressure. Sentricon® Always Active monitors and protects." },
      { emoji: "🦟", title: "Mosquitoes", description: "Shaded yards and creek-fed lots see steady mosquito pressure March–November. Seasonal service reduces the population." },
    ],
    servingLabel: "Serving Alabaster & greater Shelby County",
    neighborhoods: [
      { name: "Old Town Alabaster", zip: "35007", note: "Established homes near the historic core — termite and roach vigilance.", features: ["Older homes", "Termite priority", "Roach control"] },
      { name: "Kentwood", zip: "35007", note: "Family subdivisions with mature yards — ants and seasonal mosquitoes.", features: ["Family homes", "Ant control", "Mosquito priority"] },
      { name: "Weatherly", zip: "35007", note: "Larger wooded lots with strong seasonal mosquito and tick pressure.", features: ["Wooded lots", "Mosquito priority", "Tick risk"] },
      { name: "Silverhill / Butler Rd corridor", zip: "35007", note: "Minutes from our office — fastest service in our network.", features: ["Near office", "Fast service area"] },
    ],
    faqs: [
      { q: "How much does pest control cost in Alabaster?", a: "Bi-monthly service starts at $35/month on auto-pay (or $70 every other month), covering 30+ common Alabama pests with unlimited re-service between visits. The one-time initial service fee is $79." },
      { q: "Do you handle cockroaches in Alabaster?", a: "Yes — roach control is one of our most common Alabaster calls. Our bi-monthly exterior barrier keeps roaches outside, and if they appear between scheduled visits, re-service on covered pests is included at no extra charge." },
      { q: "Is termite protection worth it in Shelby County?", a: "Absolutely — local humidity makes subterranean termites a real, ongoing risk. Sentricon® Always Active monitors year-round with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in covered structural repair. Install is quoted after a free inspection." },
      { q: "Are your products safe around pets and kids?", a: "We use EPA-registered products applied strictly according to label directions by licensed technicians. Follow your technician's re-entry guidance after each treatment." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Alabaster inspection",
    footerServingCities: ["Alabaster", "Pelham", "Helena", "Calera", "Maylene", "Shelby County"],
  },

  // ===================================================================
  // CHELSEA — Priority 4. "pest control chelsea al" pos 7.4 — already ranks.
  // Keep current strength; tick control chelsea is a live query.
  // ===================================================================
  "chelsea": {
    slug: "chelsea",
    name: "Chelsea",
    metaTitle: "Pest Control Chelsea AL | Termite & Mosquito | EnviroCare",
    metaDescription:
      "Family-owned pest control in Chelsea, AL. Bi-monthly service, Sentricon® termite protection, seasonal mosquito and tick control. (205) 940-6360.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Serving Chelsea & North Shelby",
    heroTitle: "Pest Control in Chelsea,",
    heroTitleEm: "Close to Home",
    heroLede:
      "Chelsea's wooded, fast-growing neighborhoods bring beautiful lots — and steady tick, mosquito, and ant pressure. EnviroCare protects Chelsea homes with bi-monthly pest service, Sentricon® termite monitoring, and seasonal mosquito and tick control.",
    zipPrimary: "35043",
    contextTitle: "Wooded, growing, and full of pest habitat",
    contextLede:
      "Chelsea has grown fast while keeping its wooded, semi-rural character — which means lots of tree lines, creeks, and brush that ticks and mosquitoes call home. Newer subdivisions like Chelsea Park sit beside older wooded acreage, so pest pressure ranges from seasonal mosquitoes and ticks to year-round ants and the occasional subterranean termite. Our bi-monthly barrier re-applies about every 60 days, timed to the prior treatment's breakdown, keeping coverage continuous.",
    pests: [
      { emoji: "🦟", title: "Mosquitoes & Ticks", description: "Wooded lots and creeks keep mosquito and tick pressure high March–November. Seasonal service targets both." },
      { emoji: "🐜", title: "Ants", description: "Odorous house and carpenter ants from the surrounding tree line. Covered under regular service." },
      { emoji: "🪲", title: "Termites", description: "Wooded acreage and crawlspace homes face subterranean termite risk. Sentricon® Always Active protects." },
      { emoji: "🕷️", title: "Spiders & Invaders", description: "Spiders and seasonal invaders following insects indoors. Covered on your bi-monthly plan." },
    ],
    servingLabel: "Serving Chelsea & North Shelby County",
    neighborhoods: [
      { name: "Chelsea Park", zip: "35043", note: "Large master-planned community — mosquito, tick, and ant priority.", features: ["Master-planned", "Mosquito priority", "Tick risk"] },
      { name: "Highland Lakes area", zip: "35242", note: "Gated, wooded, lake-dotted living — strong seasonal mosquito pressure.", features: ["Wooded", "Lakes", "Mosquito priority"] },
      { name: "Chelsea proper / Hwy 280", zip: "35043", note: "Mixed older and newer homes — full-plan coverage.", features: ["Mixed construction", "Full coverage"] },
      { name: "Dunnavant Valley", zip: "35147", note: "Semi-rural wooded acreage — highest tick pressure in the area.", features: ["Rural", "Tick risk", "Wooded"] },
    ],
    faqs: [
      { q: "Do I need tick control in Chelsea?", a: "On Chelsea's wooded and semi-rural lots, yes — it's one of the most worthwhile add-ons here. Tick control pairs with our seasonal mosquito program (March–November) to cut activity around the yard. We reduce pressure rather than promising to eliminate it." },
      { q: "How much is pest control in Chelsea?", a: "Bi-monthly service starts at $35/month on auto-pay (or $70 every other month) for 30+ common Alabama pests, with unlimited re-service. The one-time initial service fee is $79." },
      { q: "Do you protect against termites in Chelsea?", a: "Yes — Sentricon® Always Active, a no-drill in-ground monitoring system backed by EnviroCare's guarantee of up to $1,000,000 in covered structural repair. Monitoring and install are quoted after a free termite inspection." },
      { q: "How is bi-monthly better than quarterly?", a: "Most exterior treatments break down in roughly 60 days. A bi-monthly visit re-applies the barrier right as the old one wears off, so there's no multi-week gap — which is exactly when pests tend to slip back in on a quarterly schedule." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Chelsea pest quote",
    footerServingCities: ["Chelsea", "Westover", "Sterrett", "Highland Lakes", "North Shelby"],
  },

  // ===================================================================
  // BIRMINGHAM — Priority 3. Metro hub. "mosquito control birmingham" 2,036
  // imp pos 20; "termite control birmingham" 1,802 pos 19. Lift organic page.
  // ===================================================================
  "birmingham": {
    slug: "birmingham",
    name: "Birmingham",
    metaTitle: "Pest Control Birmingham AL | Termite & Mosquito | EnviroCare",
    metaDescription:
      "Family-owned pest control in Birmingham, AL since 1958. Bi-monthly service, Sentricon® termite, mosquito control across the metro. (205) 940-6360.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Serving the Birmingham Metro",
    heroTitle: "Pest Control in Birmingham,",
    heroTitleEm: "Four Generations Strong",
    heroLede:
      "From historic Southside bungalows to new builds across the metro, Birmingham's humidity and mature neighborhoods keep pests working year-round. EnviroCare has protected Alabama homes since 1958 — bi-monthly pest service, Sentricon® termite monitoring, and seasonal mosquito control, all from a family-owned company that's now in its fourth generation.",
    zipPrimary: "35209",
    contextTitle: "Metro-wide pest pressure, handled locally",
    contextLede:
      "The Birmingham metro covers everything from century-old homes near downtown to fast-growing suburbs over the mountain — and almost all of it sits in humid, wooded terrain that termites and mosquitoes thrive in. Older homes face subterranean termite risk; shaded, creek-fed yards drive mosquito pressure spring through fall; and ants and roaches stay busy year-round. Our bi-monthly exterior service re-applies the barrier about every 60 days, timed to the prior treatment's breakdown, so protection stays continuous across the seasons.",
    pests: [
      { emoji: "🪲", title: "Termites", description: "Birmingham's older housing stock and humidity make subterranean termites a constant risk. Sentricon® Always Active monitors and protects." },
      { emoji: "🦟", title: "Mosquitoes", description: "Creeks, shaded yards, and metro green space drive heavy mosquito pressure March–November. Seasonal service reduces the population." },
      { emoji: "🐜", title: "Ants & Roaches", description: "Argentine ants and American/German roaches year-round. Covered with unlimited re-service between visits." },
      { emoji: "🕷️", title: "Spiders & Fall Invaders", description: "Spiders, stink bugs, and ladybugs moving in as the weather turns. Covered on your plan." },
    ],
    servingLabel: "Serving Birmingham & the surrounding metro",
    neighborhoods: [
      { name: "Southside & Highland Park", zip: "35205", note: "Historic homes and bungalows — termite vigilance is essential.", features: ["Historic homes", "Termite priority"] },
      { name: "Crestwood & Forest Park", zip: "35213", note: "Mature canopy and older homes — carpenter ants and mosquitoes.", features: ["Mature trees", "Carpenter ants", "Mosquito priority"] },
      { name: "Over the Mountain (Homewood/Hoover)", zip: "35209", note: "Wooded, established suburbs — mosquito, tick, and termite coverage.", features: ["Wooded suburbs", "Full coverage"] },
      { name: "Trussville & the east metro", zip: "35173", note: "Growing family suburbs near the Cahaba — seasonal mosquito pressure.", features: ["Family suburbs", "Mosquito priority"] },
    ],
    faqs: [
      { q: "How much does pest control cost in Birmingham?", a: "Bi-monthly pest service starts at $35/month on auto-pay (or $70 every other month) for 30+ common Alabama pests, with unlimited re-service on covered pests. The one-time initial service fee is $79." },
      { q: "Do you offer termite control across Birmingham?", a: "Yes — Sentricon® Always Active, a no-drill in-ground monitoring system backed by EnviroCare's own guarantee of up to $1,000,000 in covered structural repair. Monitoring and install are quoted after a free termite inspection." },
      { q: "When should I start mosquito control in Birmingham?", a: "Early spring, before the first hatch. Our season runs March through November at $45 per treatment, which most homeowners spread across the year. Treatments reduce mosquito activity around your yard — we never promise to eliminate them." },
      { q: "How long has EnviroCare served Birmingham?", a: "EnviroCare is a family-owned Alabama company founded in 1958, now in its fourth generation. The family expanded into the Birmingham metro in 2002 and has served homes across the area ever since." },
    ],
    reviews: [],
    ctaBlockHeadline: "Get your free Birmingham pest inspection",
    footerServingCities: ["Birmingham", "Homewood", "Hoover", "Vestavia Hills", "Mountain Brook", "Trussville"],
  },

};
