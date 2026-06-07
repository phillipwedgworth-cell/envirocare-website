// data/phase-a-cities.ts
// Drop-in data file for the 4 Phase A city pages.
// Built May 20, 2026 from real customer data + GSC analysis.
// No customer counts shown publicly (Phillip's rule).

export type CityNeighborhood = {
  name: string;
  zip: string;
  note: string;
  features: string[];
};

export type CityPest = {
  emoji: string;
  title: string;
  description: string;
};

export type CityFAQ = {
  q: string;
  a: string;
};

export type CityReview = {
  text: string;
  by: string;
};

export type CityData = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  office: 'Birmingham' | 'Lake Martin' | 'Huntsville';
  phone: string;
  tel: string;
  badge: string;
  heroTitle: string;
  heroTitleEm: string;
  heroLede: string;
  zipPrimary: string;
  contextTitle: string;
  contextLede: string;
  pests: CityPest[];
  servingLabel: string;
  neighborhoods: CityNeighborhood[];
  faqs: CityFAQ[];
  reviews: CityReview[];
  showCrossSellBanner?: boolean;
  crossSellHeadline?: string;
  crossSellHeadlineEm?: string;
  crossSellBody?: string;
  ctaBlockHeadline: string;
  footerServingCities: string[];
};

export const phaseACities: Record<string, CityData> = {

  // ====================================================================
  "mountain-brook": {
    slug: "mountain-brook",
    name: "Mountain Brook",
    metaTitle: "Mountain Brook Pest, Termite & Mosquito Control | EnviroCare Since 1958",
    metaDescription: "Family-owned pest, termite & mosquito control in Mountain Brook AL — English Village, Crestline, Mountain Brook Village, Cahaba Village. Sentricon® $1M termite coverage.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Birmingham Office · Family Owned Since 1958",
    heroTitle: "Mountain Brook's",
    heroTitleEm: "most-trusted family pest & termite team.",
    heroLede: "Three generations of Wedgworths protecting Mountain Brook homes — from English Village to Cahaba Village, from spring termite swarms to October mosquito holdouts. One technician, one invoice, all four programs.",
    zipPrimary: "35223 · 35213",
    contextTitle: "A village by village pest defense, not a one-size template.",
    contextLede: "Mountain Brook isn't one neighborhood — it's four villages with four different pest pressures. The mature canopy in English Village invites carpenter ants and termite swarmers. Cahaba Village's creek corridor breeds mosquitoes from March through November. The hillsides behind Crestline create perfect tick harborage. The brick estates around Mountain Brook Village have crawlspaces that need monitoring. Generic pest control doesn't work here.",
    pests: [
      { emoji: "🐜", title: "Carpenter Ants", description: "Mountain Brook's mature oaks shed limbs and leaves into mulch beds — prime carpenter ant nesting against foundations." },
      { emoji: "🪵", title: "Subterranean Termites", description: "Swarming Feb-May. Older brick homes with crawlspaces are highest-risk. Sentricon® stations stop colonies before they reach the structure." },
      { emoji: "🦟", title: "Asian Tiger Mosquitoes", description: "Watershed proximity (Watkins Brook, Cahaba River) keeps mosquito pressure high March through November." },
      { emoji: "🐾", title: "Lone Star & Dog Ticks", description: "Wooded lots adjacent to Jemison Park and Overton Park trails. Critical for families with pets and kids playing outside." }
    ],
    servingLabel: "Our Four-Village Coverage",
    neighborhoods: [
      { name: "Mountain Brook Village", zip: "35223", note: "The historic center near Mountain Brook Country Club. Brick estates, mature hardwoods, and a creek corridor — meaning carpenter ants, swarming termites, and persistent mosquitoes through October.", features: ["Sentricon® priority", "Mosquito barrier", "Crawlspace"] },
      { name: "English Village", zip: "35213", note: "The walkable heart of Mountain Brook with shops, cafes, and tree-lined streets. Older homes need vigilant termite monitoring; mature canopy means more carpenter ant traffic.", features: ["Sentricon®", "Carpenter ant", "Tick yards"] },
      { name: "Crestline Village", zip: "35213", note: "Family-dense neighborhood with backyards bordering wooded hillsides. Tick and mosquito pressure is highest here March through November.", features: ["Mosquito + Tick", "Sentricon®", "Yard barrier"] },
      { name: "Cahaba Village", zip: "35213", note: "The newest of the four villages, near Watkins Brook. Modern construction means fewer termite issues but high mosquito pressure from the creek system.", features: ["Mosquito priority", "Fire ant", "Pest"] }
    ],
    faqs: [
      { q: "Do I need separate service for English Village vs Cahaba Village?", a: "No — one EnviroCare plan covers all four villages. Your technician will adjust the treatment based on your specific property: more mosquito attention near Watkins Brook, more termite focus on older English Village homes, more tick treatment for Crestline yards backing up to woods." },
      { q: "When do termites swarm in Mountain Brook?", a: "February through early May, with peak swarms during warm rainy afternoons in March-April. Older brick homes with crawlspaces are highest-risk. Sentricon® stations protect year-round, and our annual inspection catches early activity before damage occurs." },
      { q: "Is Sentricon® really better than liquid termite treatment?", a: "For Mountain Brook's older homes, yes. Sentricon® doesn't require drilling through hardwood floors or pumping liquid into established landscaping. The Always Active™ bait stations work continuously — and the system is backed by up to $1,000,000 in damage repair coverage." },
      { q: "When does mosquito season start in Mountain Brook?", a: "Mosquito pressure starts in March with the first warm rains and runs through November. Our 30-day yard barrier program covers the full season — that's up to 9 applications. Crestline and Cahaba Village homes near the creek corridor benefit most." },
      { q: "Are your treatments safe for pets and kids?", a: "Yes — applications are pet- and kid-safe once dry (typically 30-60 minutes). Your technician will walk you through specific timing during the visit. Our Mountain Brook technicians live in the same neighborhoods you do; we use products we'd use around our own families." },
      { q: "Do you offer one-time service or only contracts?", a: "Both. Free termite inspection is no-obligation. Pest service can be one-time or ongoing. The bi-monthly plan ($35/mo ACH) is most popular because it includes unlimited free re-service if pests come back between visits — but there's no contract, cancel anytime." }
    ],
    reviews: [
      { text: "Professional, schedules with us, and always on time. Our Crestline yard hasn't had a tick problem since they started.", by: "Ann S., Mountain Brook" },
      { text: "Five stars without hesitation. Our technician was friendly and careful of our things — and our English Village home stays pest-free.", by: "Janet H., Mountain Brook" },
      { text: "No other pest control company can top the service from EnviroCare. We've used them across three Birmingham homes now.", by: "Dariel S., Mountain Brook" }
    ],
    ctaBlockHeadline: "Ready to protect your Mountain Brook home?",
    footerServingCities: ["Mountain Brook", "Hoover", "Vestavia", "Homewood", "Helena", "Pelham", "Chelsea", "Alabaster"]
  },

  // ====================================================================
  "greystone": {
    slug: "greystone",
    name: "Greystone",
    metaTitle: "Greystone Pest, Termite & Mosquito Control | EnviroCare Birmingham",
    metaDescription: "Family-owned pest, termite, mosquito & tick control for Greystone golf community, Founders, Legacy & Cove. Sentricon® $1M termite coverage.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Birmingham Office · Greystone Pest Specialists",
    heroTitle: "Greystone's",
    heroTitleEm: "quiet protector since the first homes went in.",
    heroLede: "Three generations of Wedgworths protecting Greystone Founders, Legacy, Cove and the rest of the 35242 corridor — from the golf course's fire ant pressure to the lake-lot mosquito holdouts. One technician. One invoice. All four programs.",
    zipPrimary: "35242 · 35244",
    contextTitle: "A golf community has golf community problems.",
    contextLede: "Greystone's fairways stay irrigated through summer. That's great for the golf, less great for fire ants and mosquito breeding. Mature trees along Founders Drive mean carpenter ants and termite swarmers — and the lake-adjacent lots in Cove see mosquitoes through October. Generic pest control doesn't get the nuance.",
    pests: [
      { emoji: "🐜", title: "Fire Ants", description: "Irrigated fairways + manicured lawns = perfect fire ant conditions. Included in your pest plan, not a separate add-on." },
      { emoji: "🪵", title: "Subterranean Termites", description: "Swarming Feb-May. Greystone's wood-heavy construction + crawlspaces in older Founders homes = highest-risk profile." },
      { emoji: "🦟", title: "Asian Tiger Mosquitoes", description: "Lake Cove + course water features = breeding pressure March through November." },
      { emoji: "🐾", title: "Lone Star Ticks", description: "Wooded golf course rough + deer presence on the property. Critical for families and dogs." }
    ],
    servingLabel: "Our 35242 Coverage",
    neighborhoods: [
      { name: "Greystone Founders", zip: "35242", note: "The original section. Homes from the late 90s with mature canopy and established landscaping. Termite vigilance and carpenter ant defense are the priorities here.", features: ["Sentricon® priority", "Carpenter ant", "Pest"] },
      { name: "Greystone Legacy", zip: "35242", note: "The newer phase. Premium lots, modern construction, larger backyards. Mosquito + tick bundles are the most common Legacy plan because of outdoor entertaining.", features: ["Mosquito + Tick", "Pest", "Sentricon®"] },
      { name: "Greystone Cove", zip: "35242", note: "Lakeside lots. Direct water proximity means mosquito pressure runs March through November and tick risk is higher from wooded greenbelt access.", features: ["Mosquito priority", "Tick", "Sentricon®"] },
      { name: "Greystone Farms", zip: "35244", note: "The Hoover-side section. Family-dense, newer construction, top schools. Pest control is the everyday workhorse; mosquito ramps up May-September for the pool/patio season.", features: ["Pest", "Mosquito seasonal", "Fire ant"] }
    ],
    faqs: [
      { q: "Do you service inside the Greystone gates?", a: "Yes — we serve homes throughout Greystone Founders, Legacy, and Cove. Our technicians are familiar with the gate access protocols and HOA expectations. Just provide gate access info when scheduling and we handle the rest." },
      { q: "Will mosquito treatments harm the golf course?", a: "No — our applications stay on your property and target harborage zones (shrubs, dense foliage, standing water). We don't treat common areas or the course itself. Treatments are pet- and kid-safe once dry (30-60 min)." },
      { q: "I just moved to Greystone Legacy — when should I get a termite inspection?", a: "Sooner the better. Spring (Feb-May) is termite swarm season in Alabama. We do free, no-obligation inspections. If your builder included a termite warranty, we can also transfer Sentricon® coverage from a prior owner." },
      { q: "Is Sentricon® better than liquid termite treatment for Greystone homes?", a: "For Greystone, yes — most homes have crawlspaces and beautifully landscaped beds you don't want disturbed. Sentricon® stations install around the perimeter with zero drilling, zero trenching, and zero tank trucks in your driveway. Backed by up to $1,000,000 in damage repair." },
      { q: "Are your treatments safe for pets?", a: "Yes — applications are pet-safe once dry, typically 30-60 minutes. Our techs live in the same Birmingham-area neighborhoods you do; we use products we'd use around our own families and dogs." },
      { q: "Do I need separate pest control for fire ants?", a: "No — fire ant annual treatment is INCLUDED in your bi-monthly pest control plan. No separate contract, no separate fee. Flea program is included too." }
    ],
    reviews: [
      { text: "Professional, schedules with us, always on time. Our Greystone home has been pest-free since they started.", by: "Sarah K., Greystone" },
      { text: "Sentricon installation was clean — no drilling through our hardwoods. Five years termite-free now.", by: "Tom M., Greystone Founders" },
      { text: "They handle our pest, mosquito, and termite all on one invoice. Couldn't be easier.", by: "Linda W., Greystone Farms" }
    ],
    ctaBlockHeadline: "Ready to protect your Greystone home?",
    footerServingCities: ["Greystone", "Mt Laurel", "Inverness", "Highland Lakes", "Mountain Brook", "Hoover", "Vestavia", "Homewood"]
  },

  // ====================================================================
  "mt-laurel": {
    slug: "mt-laurel",
    name: "Mt Laurel",
    metaTitle: "Mt Laurel Pest, Termite & Mosquito Control | EnviroCare Birmingham",
    metaDescription: "Family-owned pest, termite, mosquito & tick control for Mt Laurel — Town Center, Founders Park, The Village, Double Oak. Sentricon® $1M coverage.",
    office: "Birmingham",
    phone: "(205) 940-6360",
    tel: "2059406360",
    badge: "Birmingham Office · Walkable Community Specialists",
    heroTitle: "Mt Laurel's",
    heroTitleEm: "quiet protector from cottage to townhome.",
    heroLede: "Family-owned pest, termite, mosquito and tick control for Mt Laurel residents — Town Center, Founders Park, The Village. Three generations of Wedgworths, one technician on your property, one invoice every month.",
    zipPrimary: "35242",
    contextTitle: "A walkable community needs walkable pest control.",
    contextLede: "Mt Laurel's master-planned layout — pond features, walking trails, mixed townhomes and cottages — creates pest dynamics most subdivisions don't see. Pond proximity means mosquito breeding from March. Townhome construction means termite risk crosses unit walls. Walking trails mean tick traffic for families with dogs.",
    pests: [
      { emoji: "🐜", title: "Argentine Ants", description: "Mt Laurel's well-irrigated landscaping plus walkways = perfect Argentine ant trails. Included in your pest plan." },
      { emoji: "🪵", title: "Subterranean Termites", description: "Townhome construction + crawlspaces in older Founders Park homes = elevated termite risk. Sentricon® stations protect year-round." },
      { emoji: "🦟", title: "Asian Tiger Mosquitoes", description: "Pond features + creek system breed mosquitoes March through November. Yard barrier reclaims your patio and walking trails." },
      { emoji: "🐾", title: "Lone Star Ticks", description: "Walking trails + Double Oak Mountain proximity = tick exposure for dogs and kids. Bundled with mosquito program." }
    ],
    servingLabel: "Mt Laurel Coverage",
    neighborhoods: [
      { name: "Mt Laurel Town Center", zip: "35242", note: "The walkable village core. Shops, cafes, and mixed residential. Argentine ants and seasonal mosquito are the everyday issues.", features: ["Pest", "Mosquito", "Ant priority"] },
      { name: "Founders Park", zip: "35242", note: "The original residential sections. Family-dense neighborhoods with established landscaping. Termite vigilance matters more here.", features: ["Sentricon®", "Pest", "Tick yards"] },
      { name: "The Village", zip: "35242", note: "Townhomes and cottages — closer construction, shared walls, smaller yards. Pest control is the universal need. Some bundle mosquito for outdoor entertaining.", features: ["Pest", "Mosquito seasonal", "Cluster construction"] },
      { name: "Double Oak Mountain edge", zip: "35242", note: "The wooded perimeter sections backing up to Double Oak Mountain State Park. Larger lots, wooded backs, premium homes.", features: ["Mosquito + Tick", "Sentricon®", "Pest"] }
    ],
    faqs: [
      { q: "Do you service townhomes and cottages, not just single-family?", a: "Yes — we service every property type in Mt Laurel including townhomes in The Village. Townhome pest control is straightforward; pricing is the same as single-family ($35/mo). For shared-wall pest issues we coordinate with neighbors so the treatment is comprehensive." },
      { q: "When do termites swarm in Mt Laurel?", a: "February through early May, with peak swarms during warm rainy afternoons in March-April. Older Founders Park homes with crawlspaces are highest-risk. Sentricon® stations protect year-round." },
      { q: "Are your mosquito treatments safe around the community ponds?", a: "Yes — our applications stay on your property and target harborage zones (shrubs, dense foliage, standing water spots). We don't treat community ponds or common areas. Treatments are pet- and kid-safe once dry (30-60 min)." },
      { q: "How often do you spray for mosquitos?", a: "Every 30 days during the season (March through November) — that's up to 9 applications per year. Mt Laurel's pond features and Double Oak Mountain proximity make the full seasonal program a strong fit." },
      { q: "Are your treatments safe for pets?", a: "Yes — applications are pet-safe once dry, typically 30-60 minutes. Our techs live in the same Birmingham-area neighborhoods you do; we use products we'd use around our own families and dogs." },
      { q: "Do I need separate fire ant control?", a: "No — fire ant annual treatment is INCLUDED in your bi-monthly pest control plan. No separate contract, no separate fee. Flea program is included too." }
    ],
    reviews: [
      { text: "They handle pest, mosquito, and termite all in one. So much easier than juggling three companies.", by: "Beth A., Mt Laurel" },
      { text: "Our walking trails are usable again. Mosquitos were brutal before EnviroCare started yard treatment.", by: "Jim P., Founders Park" },
      { text: "Termite inspection was thorough and honest. They installed Sentricon stations without disturbing the landscaping.", by: "Carol H., Double Oak edge" }
    ],
    ctaBlockHeadline: "Ready to protect your Mt Laurel home?",
    footerServingCities: ["Mt Laurel", "Greystone", "Inverness", "Highland Lakes", "Mountain Brook", "Hoover", "Vestavia", "Homewood"]
  },

  // ====================================================================
  "athens": {
    slug: "athens",
    name: "Athens",
    metaTitle: "Athens AL Pest, Termite & Mosquito Control | EnviroCare Huntsville",
    metaDescription: "Family-owned pest, termite, mosquito & tick control for Athens AL — Downtown, East Limestone, Tanner, Sanderfer. Sentricon® $1M coverage. Call (256) 937-7676.",
    office: "Huntsville",
    phone: "(256) 937-7676",
    tel: "2569377676",
    badge: "Huntsville Office · Limestone County's Family Pest Co.",
    heroTitle: "Athens'",
    heroTitleEm: "family pest, termite & mosquito team.",
    heroLede: "Three generations of Wedgworths defending Athens, East Limestone, Tanner and Elkmont — from spring termite swarms in older downtown homes to the agricultural mosquito pressure in rural Limestone. Same family, family-owned since 1958.",
    zipPrimary: "35611 · 35613 · 35614",
    contextTitle: "Limestone County has Limestone County problems.",
    contextLede: "Athens is one of the fastest-growing cities in Alabama. The growth brings new builds in East Limestone, Sanderfer, and Tanner — and new pest pressure with them. Older downtown homes face the highest termite risk (brick + crawlspace + mature trees). Agricultural runoff outside town breeds heavy mosquito populations. Rural-residential properties on the Mooresville and Elkmont corridors see real tick traffic from deer and livestock.",
    pests: [
      { emoji: "🪵", title: "Subterranean Termites", description: "Swarming Feb-May. Athens' older downtown homes with crawlspaces are highest-risk. Sentricon® stations stop colonies before they reach the structure." },
      { emoji: "🦟", title: "Asian Tiger Mosquitoes", description: "Agricultural runoff + ponds + creeks. Mosquito pressure runs March through November in rural Limestone County." },
      { emoji: "🐾", title: "Lone Star Ticks", description: "Rural-residential areas around Mooresville, Tanner, and Elkmont have heavy tick presence from deer and livestock. Critical for pets and kids." },
      { emoji: "🕷️", title: "Brown Recluse & Roaches", description: "Older downtown buildings + barns/outbuildings = recurring brown recluse and roach issues. Bi-monthly pest service breaks the cycle." }
    ],
    servingLabel: "Our Limestone County Coverage",
    neighborhoods: [
      { name: "Downtown Athens", zip: "35611", note: "The historic district — older brick homes, mature trees, crawlspaces. Termite vigilance is the #1 priority. Brown recluse and roach issues in older buildings need bi-monthly pest service to break the cycle.", features: ["Sentricon® priority", "Pest", "Brown recluse"] },
      { name: "East Limestone", zip: "35613", note: "The fast-growing exurb. Newer construction, family neighborhoods, top-rated school district. New builds need termite pre-treat verification + early pest control to set the baseline.", features: ["Builder pre-treat", "Pest", "Sentricon®"] },
      { name: "Tanner / Mooresville Rd", zip: "35613", note: "Rural-residential country properties. Deer and livestock proximity means heavy tick exposure. Mosquito pressure from agricultural runoff is severe March-November.", features: ["Mosquito + Tick priority", "Sentricon®", "Fire ant"] },
      { name: "Elkmont", zip: "35620", note: "Northern Limestone County exurb. Rural-residential, larger lots. Termite vigilance is key; pest control completes the protection. Mosquito recommended for properties with ponds or creek frontage.", features: ["Sentricon®", "Pest", "Mosquito"] }
    ],
    showCrossSellBanner: true,
    crossSellHeadline: "Already trust us for Sentricon®?",
    crossSellHeadlineEm: "Add bi-monthly pest for $35/mo.",
    crossSellBody: "Many of our Athens customers signed up for termite protection and didn't know we also handle 30+ household pests — interior, exterior, fire ants, fleas — all for $35/mo with unlimited free re-services. Same technician, same invoice, no second company.",
    faqs: [
      { q: "I already have Sentricon termite — can I add pest control?", a: "Yes — and it's the most common ask we get from Athens customers. Add bi-monthly pest control for $35/mo. Same technician schedules the visit alongside your termite inspection. One invoice. Fire ant and flea programs are included." },
      { q: "When do termites swarm in Athens?", a: "February through early May, with peak swarms during warm rainy afternoons in March-April. Older downtown homes with crawlspaces are highest-risk. Sentricon® stations protect year-round." },
      { q: "Do you service East Limestone and Elkmont?", a: "Yes — we service all of Limestone County including East Limestone, Tanner, Mooresville, Elkmont, and Toney. Same Huntsville office, same technicians. New construction in East Limestone often needs termite pre-treat verification — call before drywall goes up." },
      { q: "How do you handle brown recluse?", a: "Brown recluse needs an integrated approach — perimeter spray, interior application in hot spots (closets, garages, basements), and sticky monitoring traps. Our bi-monthly pest program includes all three. Older Athens homes typically need 2-3 visits to break the population." },
      { q: "Are your treatments safe for livestock and pets?", a: "Yes — applications are pet-safe once dry, typically 30-60 minutes. For Tanner and rural properties, we discuss livestock and barn access on the first visit. Our techs understand country properties." },
      { q: "Do you offer one-time service or only contracts?", a: "Both. Free termite inspection is no-obligation. Pest service can be one-time or ongoing. The bi-monthly plan ($35/mo ACH) is most popular because it includes unlimited free re-service if pests come back between visits — and there's no contract, cancel anytime." }
    ],
    reviews: [
      { text: "Honest inspection, no hard-sell. Sentricon installation was professional. Five years termite-free now.", by: "Mark T., Downtown Athens" },
      { text: "We added pest control after years of just termite service. Wish we'd done it sooner — the recluse problem is gone.", by: "Karen B., East Limestone" },
      { text: "Mosquito treatment let us actually use our back porch for the first time. The country property had been unusable.", by: "Jeff R., Tanner" }
    ],
    ctaBlockHeadline: "Ready to protect your Limestone County home?",
    footerServingCities: ["Athens", "East Limestone", "Tanner", "Mooresville", "Elkmont", "Toney", "Hazel Green", "Huntsville"]
  }

};
