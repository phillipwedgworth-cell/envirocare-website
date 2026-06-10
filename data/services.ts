// data/services.ts — EnviroCare service catalog
// May 16, 2026 — Stage 2 of v2 site-wide rebrand
// Real services only — NO bed bug, NO wildlife, NO bee/wasp removal

export type ServiceArt = 'pest' | 'termite' | 'mosquito' | 'tick' | 'fireant' | 'flea' | 'builder' | 'wdo' | 'crawlspace' | 'commercial';

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: 'core' | 'specialty';
  serviceArt: ServiceArt;
  price?: string;       // e.g. "$35/mo ACH"
  priceSub?: string;    // e.g. "or $70 bi-monthly"
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTagline: string;
  heroSubhead: string;
  features: string[];
  includes: { title: string; desc: string }[];
  wedgePoints: { lead: string; body: string }[];   // differentiation vs competitors
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  // ── CORE 4
  {
    slug: 'pest-control',
    name: 'Pest Control',
    shortName: 'Pest',
    category: 'core',
    serviceArt: 'pest',
    price: '$35/mo ACH',
    priceSub: 'or $70 bi-monthly',
    metaTitle: 'Alabama Pest Control | EnviroCare Bi-Monthly Service Since 1958',
    metaDescription: 'Bi-monthly perimeter pest control across Birmingham, Lake Martin, Huntsville. 30+ pests covered, unlimited re-services. Family-owned. Call (205) 940-6360.',
    heroEyebrow: 'Year-Round Pest Defense',
    heroTagline: 'Bi-Monthly Pest Control',
    heroSubhead: 'Bi-monthly perimeter service against ants, roaches, spiders & 30+ pests. Unlimited free re-services, no contracts, family-owned since 1958.',
    features: [
      'Bi-monthly exterior treatment',
      '30+ common pests covered',
      'Unlimited free re-services',
      'Same-week scheduling',
      'Family- & EPA-registered applications',
      '$1M coverage when bundled with termite',
    ],
    includes: [
      { title: 'Perimeter Treatment', desc: 'Targeted application around the foundation, door frames, and entry points where pests enter.' },
      { title: 'Eaves & Webbing', desc: 'Spider web knockdown and wasp/eave prevention at every visit.' },
      { title: 'Interior Service On Request', desc: 'Free interior service anytime you need it between visits — just call.' },
      { title: 'EPA-Registered', desc: 'EPA-registered products applied per label directions.' },
    ],
    wedgePoints: [
      { lead: 'No contracts', body: 'Cancel anytime. We earn your business every visit, not lock you in.' },
      { lead: 'Local technician', body: 'Same tech every visit when possible. They know your home, your dog\'s name, your gate code.' },
      { lead: 'Same-week scheduling', body: 'Most calls scheduled inside 5 business days. Emergencies same- or next-day.' },
    ],
    faqs: [
      { q: 'What pests does this cover?', a: '30+ common Alabama pests including ants, roaches, spiders, silverfish, earwigs, pillbugs, stink bugs, centipedes, millipedes, crickets, and seasonal invaders. Termites are a separate program (Sentricon®). Mosquito and tick are seasonal add-ons.' },
      { q: 'How often do you come out?', a: 'Every 60 days (bi-monthly), six visits per year. If you see anything between visits, call us — re-services are free and unlimited.' },
      { q: 'What about kids and pets during treatment?', a: 'We use EPA-registered products applied per label directions, and recommend waiting until the application is dry (typically 30 minutes) before pets and kids return to treated areas.' },
      { q: 'Is there a contract?', a: 'No long-term contract. Pay monthly on ACH or bi-monthly per visit. Cancel anytime.' },
      { q: 'What if I have a special event coming up?', a: 'Call ahead — we\'ll prioritize an exterior knockdown application before your event at no extra charge for active customers.' },
      { q: 'How is EnviroCare different from other pest control companies?', a: 'Most pest control companies sell four visits a year and disappear between them. Our pest control service treats the perimeter every other month, checks rodent entry points, and handles an active infestation at no extra charge between visits. If you\'re comparing pest control in Birmingham, Huntsville, or Lake Martin, ask whether re-services are free — ours are.' },
    ],
  },
  {
    slug: 'termite-control',
    name: 'Termite Control',
    shortName: 'Termite',
    category: 'core',
    serviceArt: 'termite',
    price: '$32/mo',
    priceSub: 'or $380 install + annual renewal',
    metaTitle: 'Alabama Termite Control & Sentricon® | EnviroCare $1M Coverage',
    metaDescription: 'Sentricon® Always Active™ termite protection. $1M repair coverage. No drilling, no tank trucks. Family-owned since 1958. Call (205) 940-6360.',
    heroEyebrow: 'Sentricon® Certified Specialist',
    heroTagline: 'Termite Protection That Actually Works',
    heroSubhead: 'Sentricon® Always Active™ bait stations protect your home from subterranean termites — with up to $1,000,000 in damage repair coverage. No drilling, no tank trucks, no concrete cutting.',
    features: [
      'Sentricon® Always Active™ system',
      'Up to $1,000,000 repair coverage',
      'Annual termite inspection',
      'WDO inspection letter (1/yr)',
      'No drilling, no tank trucks',
      'No concrete cutting',
    ],
    includes: [
      { title: 'Initial Installation', desc: 'Sentricon® bait stations placed around your home perimeter. No drilling, no mess, no disruption to landscaping.' },
      { title: 'Ongoing Monitoring', desc: 'Stations checked annually. Bait is always active — termites encountering it carry the lethal dose back to the colony.' },
      { title: '$1M Damage Repair Coverage', desc: 'An EnviroCare guarantee. If termites damage your home while we maintain your Sentricon® protection, repairs are covered up to $1M.' },
      { title: 'Real Estate WDO Letter', desc: 'One free Wood-Destroying Organism inspection letter per year — essential for refinancing or selling.' },
    ],
    wedgePoints: [
      { lead: 'Sentricon® > liquid barriers', body: 'Liquid treatments require drilling concrete, retreating every 5–7 years, and have shrinking effectiveness as they break down. Sentricon® bait stations eliminate the entire colony, not just the perimeter.' },
      { lead: '$1M is real coverage', body: 'A real EnviroCare guarantee, not a vague promise. If termites damage your home while protected, you get fixed, not finger-pointed.' },
      { lead: 'No drilling means no damage', body: 'Liquid barrier installations drill every 12 inches through your slab, patio, driveway. Sentricon® stations go in the ground around the perimeter. No concrete touched.' },
    ],
    faqs: [
      { q: 'How is Sentricon® different from liquid termite treatments?', a: 'Liquid treatments create a chemical barrier in the soil around your foundation — they require drilling through concrete, work for 5–7 years before needing retreatment, and don\'t eliminate the colony. Sentricon® places bait stations in the ground that termites carry back to the colony, eliminating the whole population. No drilling required.' },
      { q: 'What does the $1M coverage actually cover?', a: 'If subterranean termites cause damage to your home while you\'re on the Sentricon® Always Active™ system and we\'ve been maintaining it, EnviroCare covers repair costs up to $1,000,000. That is our guarantee.' },
      { q: 'Will Sentricon® mess up my landscaping?', a: 'No. Bait stations are small (about the size of a soda can) and installed flush with the ground around your home perimeter. No drilling, no concrete cuts, no torn-up flowerbeds.' },
      { q: 'How long does installation take?', a: 'Most homes are installed in 1–2 hours. We mark station locations with you first, then place them. You\'ll see them but they don\'t disrupt anything.' },
      { q: 'Do I need to be a current customer?', a: 'No. We install Sentricon® for any Alabama home in our service area. Many customers add bi-monthly pest control after experiencing our termite service.' },
      { q: 'What about during a real estate transaction?', a: 'We provide WDO (Wood-Destroying Organism) inspection letters for refinancing and home sales. One included per year on active accounts; otherwise $75 standalone fee.' },
      { q: 'What if I already have an active termite infestation?', a: 'Sentricon® handles an active infestation as well as prevention — the colony feeds on the bait and collapses from the inside. Unlike termite control services that only treat what you can see, colony elimination stops the damage at its source.' },
    ],
  },
  {
    slug: 'mosquito-control',
    name: 'Mosquito Control',
    shortName: 'Mosquito',
    category: 'core',
    serviceArt: 'mosquito',
    price: '$45/mo',
    priceSub: 'March – November season',
    metaTitle: 'Alabama Mosquito Yard Treatment | EnviroCare 21-Day Service',
    metaDescription: 'Mosquito barrier yard service every 30 days, March–November. Family-owned, Applied per label directions. Call (205) 940-6360.',
    heroEyebrow: 'Take Back Your Yard',
    heroTagline: 'Mosquito Barrier Treatment',
    heroSubhead: '30-day yard barrier treatments March through November. Make your patio livable, your evenings outdoor again, your kids safer from West Nile and EEE.',
    features: [
      '30-day refresh cycle',
      'March through November coverage',
      'Applied according to label directions once dry',
      'Up to 12 applications per season',
      'Free re-treatment if needed',
      '50% off first application for new customers',
    ],
    includes: [
      { title: 'Yard Barrier Application', desc: 'Targeted mist application to shrubs, eaves, fence lines, and harborage areas where mosquitoes rest.' },
      { title: 'Special Events Bonus', desc: 'Pre-event knockdown applications for backyard weddings, parties, or holidays at no extra charge.' },
      { title: 'Standing Water Inspection', desc: 'We identify breeding spots on your property and recommend fixes — gutters, planters, kiddie pools, etc.' },
      { title: 'EPA-Registered', desc: 'EPA-registered pyrethroids applied per label. Re-entry per label directions.' },
    ],
    wedgePoints: [
      { lead: 'Built for Alabama', body: 'Our mosquito season runs March through November, not the generic "warm months." We schedule accordingly.' },
      { lead: 'Bundles with tick', body: 'Same application handles ticks if you bundle Mosquito + Tick + Flea ($60/mo). Fewer trips, same results.' },
      { lead: 'No surprise charges', body: 'Flat monthly rate covers all season applications. Free re-treatments if mosquitoes return between visits.' },
    ],
    faqs: [
      { q: 'How long does each application last?', a: '21 days, weather depending. Heavy rain can shorten effectiveness — we\'ll re-treat free if needed.' },
      { q: 'When does the season start and end?', a: 'March through November in Alabama. We may extend earlier or later in warm springs/falls. Mosquitoes are inactive below 50°F.' },
      { q: 'Is the spray safe for my dog?', a: 'Yes once dry — typically 30 minutes. We use EPA-registered pyrethroids applied per label. Same active ingredients in flea/tick prevention products.' },
      { q: 'Will it kill my pollinators?', a: 'We avoid direct application to flowering plants and bee/butterfly habitat. Bee-safe practices are standard — we won\'t spray actively flowering plants.' },
      { q: 'Can I add tick and flea?', a: 'Yes. Our Outdoor Bundle ($60/mo) covers Mosquito + Tick + Flea on the same visits. Same techs, same products, broader protection.' },
      { q: 'Can I bundle mosquito with my pest control service?', a: 'Yes — most customers run our mosquito control service alongside the bi-monthly pest program. Same technician, one invoice, and the perimeter of your home and the yard get covered on one coordinated schedule.' },
    ],
  },
  {
    slug: 'tick-control',
    name: 'Tick Control',
    shortName: 'Tick',
    category: 'core',
    serviceArt: 'tick',
    price: 'Included with Outdoor Bundle',
    priceSub: '$60/mo Mosquito + Tick + Flea',
    metaTitle: 'Alabama Tick Yard Treatment | EnviroCare Lone Star & Deer Ticks',
    metaDescription: 'Targeted tick yard treatment for Alabama properties. Bundles with mosquito service. Family-owned. Call (205) 940-6360.',
    heroEyebrow: 'Protect Family & Pets',
    heroTagline: 'Tick Yard Control',
    heroSubhead: 'Targeted yard applications to break the tick lifecycle. Critical for wooded lots, waterfront properties, and homes with kids or dogs that play outside.',
    features: [
      'Lone Star, Dog & Deer ticks',
      'Harborage-zone targeting',
      'Applied according to label directions once dry',
      'Bundles with mosquito service',
      'Free re-treatment if needed',
      'Lyme & RMSF risk reduction',
    ],
    includes: [
      { title: 'Targeted Harborage Treatment', desc: 'Tick-favored areas — leaf litter, woodpiles, fence lines, tall grass margins — get focused applications.' },
      { title: 'Lifecycle Disruption', desc: 'We time applications to break the egg-larva-nymph-adult cycle, reducing populations year-over-year.' },
      { title: 'Wooded Property Specialty', desc: 'Lake Martin and forested Birmingham/Huntsville homes need targeted edge treatment, not just yard spray.' },
      { title: 'EPA-Registered', desc: 'Same EPA-registered products applied per label directions.' },
    ],
    wedgePoints: [
      { lead: 'Bundles save complexity', body: 'No separate vendor for ticks — your mosquito tech handles it on the same visit.' },
      { lead: 'Built for AL tick pressure', body: 'Lone Star tick (most common in Alabama) is aggressive and bites humans. Our treatment is built for the AL species mix.' },
      { lead: 'Real disease prevention', body: 'Lyme is rare in AL but Rocky Mountain Spotted Fever, Ehrlichiosis, and Alpha-Gal Syndrome (red meat allergy from tick bite) are real risks here.' },
    ],
    faqs: [
      { q: 'Is tick control really needed in Alabama?', a: 'Yes. Lone Star ticks are aggressive and widespread. Rocky Mountain Spotted Fever and Alpha-Gal Syndrome (the red-meat allergy from tick bites) are real risks. Wooded and lake properties especially benefit.' },
      { q: 'Can I get tick service without mosquito?', a: 'Standalone tick service is available but most customers find the Outdoor Bundle (Mosquito + Tick + Flea at $60/mo) cheaper and simpler.' },
      { q: 'How quickly does it work?', a: 'You\'ll see fewer ticks within 24-48 hours after application. Full lifecycle disruption takes 30-60 days.' },
      { q: 'When can my dog go back out after treatment?', a: 'Once the application dries, typically 30 minutes. Many of the same active ingredients are in canine tick/flea collars and topical treatments at lower concentrations.' },
      { q: 'Do I need a separate exterminator for ticks?', a: 'No — our tick control service rides along with mosquito service or your existing pest control service. We focus on the wood lines, leaf litter, and shaded edges where ticks wait for a host. One EnviroCare technician covers tick control in Birmingham, Huntsville, and the Lake Martin area.' },
    ],
  },

  // ── SPECIALTY
  {
    slug: 'fire-ant',
    name: 'Fire Ant Control',
    shortName: 'Fire Ant',
    category: 'specialty',
    serviceArt: 'fireant',
    metaTitle: 'Alabama Fire Ant Control | EnviroCare Yard Treatment',
    metaDescription: 'Fire ant yard-wide elimination and mound treatment for Alabama homes. Critical for lake properties and barefoot families. Call (205) 940-6360.',
    heroEyebrow: 'Critical For Lake Homes',
    heroTagline: 'Fire Ant Control',
    heroSubhead: 'Yard-wide elimination, not just spot mound treatment. Built for Alabama families who actually use their yards — kids, dogs, barefoot summer.',
    features: [
      'Yard-wide elimination',
      'Single application coverage',
      'Applied per label directions',
      'Bundles with pest control',
      'Especially critical for lake homes',
      'Same-week scheduling',
    ],
    includes: [
      { title: 'Yard-Wide Granular Application', desc: 'Treats the whole yard, not just visible mounds. Eliminates the foragers and queens you don\'t see.' },
      { title: 'Mound Drench (Visible Mounds)', desc: 'Active mounds get a targeted drench to eliminate the colony immediately.' },
      { title: 'Lake & Waterfront Specialty', desc: 'Lake Martin properties especially benefit — fire ants love sandy soil and disturbed lawns.' },
    ],
    wedgePoints: [
      { lead: 'Not just mound bait', body: 'Big-box mound bait kills visible mounds but new ones pop up. Yard-wide treatment hits foragers and queens.' },
      { lead: 'Priority for emergencies', body: 'Fire ant emergencies (kid stung, dog stung) get priority scheduling.' },
    ],
    faqs: [
      { q: 'How is this different from store-bought mound bait?', a: 'Store bait kills visible mounds but doesn\'t handle queens or foragers. New mounds appear in days. Our yard-wide treatment eliminates the colony network.' },
      { q: 'When should I do this?', a: 'Spring (March-April) and fall (September-October) are best. Mounds reduce by 70-90% within 2 weeks.' },
      { q: 'Why do fire ant mounds keep coming back?', a: 'The red imported fire ant builds a nest that runs far deeper than the visible mound, and the worker ants you see are a fraction of the colony. Kill the mound without reaching the queen and the colony simply relocates a few feet away. Yard-wide treatment reaches queens and worker ants alike — which matters when a single sting can put a kid or a dog at real risk.' },
    ],
  },
  {
    slug: 'flea',
    name: 'Flea Control',
    shortName: 'Flea',
    category: 'specialty',
    serviceArt: 'flea',
    metaTitle: 'Alabama Flea Yard Treatment | EnviroCare Alabama',
    metaDescription: 'Yard flea barrier treatments. Bundles with mosquito & tick service. Applied per label directions. Call (205) 940-6360.',
    heroEyebrow: 'Bundles With Mosquito & Tick',
    heroTagline: 'Flea Yard Control',
    heroSubhead: 'Break the flea lifecycle in your yard. Bundled with mosquito and tick service ($60/mo) for one-tech, one-invoice simplicity.',
    features: [
      'Yard barrier treatment',
      'Lifecycle disruption',
      'Applied according to label directions once dry',
      'Bundles with mosquito + tick',
      'Indoor service on request',
      'Same-week scheduling',
    ],
    includes: [
      { title: 'Yard Barrier Application', desc: 'Targets adult fleas, larvae, and eggs in shaded outdoor harborage areas.' },
      { title: 'Indoor Treatment On Request', desc: 'If fleas made it inside, we coordinate with your vet on a combined indoor/outdoor protocol.' },
      { title: 'Bundles With Mosquito/Tick', desc: 'Outdoor Bundle ($60/mo) covers all three on the same visits — Mosquito + Tick + Flea.' },
    ],
    wedgePoints: [
      { lead: 'Yard, not just pet', body: 'Vet treats the dog. We treat the yard so the dog stays clean.' },
    ],
    faqs: [
      { q: 'My dog is already on flea medication — why do I need yard treatment?', a: 'Vet medication kills fleas that bite your pet but doesn\'t address yard reservoirs. Combined yard + pet approach breaks the lifecycle.' },
      { q: 'Will this work without indoor treatment?', a: 'For most outdoor-origin flea problems, yes. If fleas are reproducing indoors, we coordinate indoor + outdoor protocols.' },
      { q: 'Do you offer flea control in Birmingham, Huntsville, and Lake Martin?', a: 'Yes — all three offices run flea control services. If your flea pest problem traces back to wildlife or a rodent issue, your technician will flag it, since fleas ride in on hosts. Many customers fold flea service into an existing pest control service for one combined visit.' },
    ],
  },
  {
    slug: 'builder',
    name: 'Builder Pre-Treat',
    shortName: 'Builder',
    category: 'specialty',
    serviceArt: 'builder',
    metaTitle: 'Alabama Builder Pre-Treat Termite Service | EnviroCare',
    metaDescription: 'Pre-construction termite treatment for new Alabama homes. Sentricon® install at the right time. Call (205) 940-6360.',
    heroEyebrow: 'New Construction',
    heroTagline: 'Builder Pre-Treat',
    heroSubhead: 'Pre-construction termite treatment for new builds. The right time to install Sentricon® protection — before slab pour, before homeowner takes possession.',
    features: [
      'Pre-slab treatment',
      'Sentricon® install at handoff',
      'Builder partnership discounts',
      'WDO letter at closing',
      'Coordinated with GC scheduling',
      'Soil treatment per AL code',
    ],
    includes: [
      { title: 'Pre-Slab Soil Treatment', desc: 'Code-required termite barrier applied to soil before concrete pour. Documentation provided to inspector.' },
      { title: 'Sentricon® Bait Station Install', desc: 'Stations placed at landscape phase, ready to monitor from day one.' },
      { title: 'Closing-Ready WDO Letter', desc: 'Inspection letter at handoff so the buyer\'s lender doesn\'t hold things up.' },
    ],
    wedgePoints: [
      { lead: 'Coordinated with your schedule', body: 'We work to your construction timeline, not the other way around. Soil treatment before pour, Sentricon® before landscape final.' },
      { lead: 'One source for buyer', body: 'Buyer takes possession with active Sentricon® and you provide the WDO letter at closing. No vendor handoff for them to figure out.' },
    ],
    faqs: [
      { q: 'When does the soil treatment happen?', a: 'After the trenches are dug for footings and before concrete is poured. We coordinate directly with your GC.' },
      { q: 'How is this billed?', a: 'Builder pre-treat plus Sentricon® install bundled at a partnership rate. Contact us for builder pricing tiers.' },
    ],
  },
  {
    slug: 'real-estate-wdo',
    name: 'Real Estate / WDO Letters',
    shortName: 'WDO',
    category: 'specialty',
    serviceArt: 'wdo',
    metaTitle: 'Alabama WDO Inspection Letters | EnviroCare Fast Turnaround',
    metaDescription: 'Wood-destroying organism inspection letters for Alabama closings. Lender-ready format. Call (205) 940-6360.',
    heroEyebrow: 'Real Estate Closings',
    heroTagline: 'WDO Inspection Letters',
    heroSubhead: 'Wood-Destroying Organism inspection letters for refinancing and home sales. Fast turnaround, lender-ready format, accepted by every Alabama lender.',
    features: [
      'Fast turnaround (often 48 hours)',
      'Lender-ready format',
      'All Alabama lenders accepted',
      '1 free per year for active customers',
      '$75 standalone fee',
      'Includes recommendations if active issues',
    ],
    includes: [
      { title: 'Full WDO Inspection', desc: 'Trained inspector checks all accessible areas for subterranean termites, drywood termites, powderpost beetles, and wood-decay fungi.' },
      { title: 'Official Letter', desc: 'NPMA-33 standard form accepted by VA, FHA, and conventional lenders.' },
      { title: 'Photos & Recommendations', desc: 'If we find active infestation or conducive conditions, you get photos and a treatment quote so you can negotiate at closing.' },
    ],
    wedgePoints: [
      { lead: 'Fast', body: 'Most letters delivered within 48 hours of inspection. Critical when closings move fast.' },
      { lead: 'Trusted by AL lenders', body: 'Our NPMA-33 letters are accepted by every Alabama lender we\'ve dealt with — no surprises at closing.' },
    ],
    faqs: [
      { q: 'How long does the inspection take?', a: 'About 45-60 minutes for an average home. We need access to attic, crawlspace if applicable, garage, and all exterior.' },
      { q: 'How fast can I get the letter?', a: 'Fast inspection turnaround. Most letters are emailed within 48 hours.' },
      { q: 'What if you find termites?', a: 'You get a treatment quote with the letter. You can either treat before closing or negotiate the cost with the buyer/seller.' },
      { q: 'Does my lender accept your letter?', a: 'Yes — NPMA-33 is the federal standard form accepted by VA, FHA, USDA, and all conventional Alabama lenders.' },
    ],
  },
  {
    slug: 'crawlspace',
    name: 'Crawlspace Service',
    shortName: 'Crawlspace',
    category: 'specialty',
    serviceArt: 'crawlspace',
    metaTitle: 'Alabama Crawlspace Pest & Moisture Service | EnviroCare',
    metaDescription: 'Crawlspace moisture control, vapor barriers, and targeted pest treatment. Family-owned. Call (205) 940-6360.',
    heroEyebrow: 'Foundation Care',
    heroTagline: 'Crawlspace Service',
    heroSubhead: 'Moisture control, vapor barriers, crawl space encapsulation, and targeted treatments for the most vulnerable part of your home — where humidity, termites, and rot problems start.',
    features: [
      'Moisture inspection',
      'Vapor barrier installation',
      'Targeted pest treatment',
      'Termite vulnerability check',
      'Mold/rot identification',
      'Pier & beam protection',
    ],
    includes: [
      { title: 'Full Crawlspace Inspection', desc: 'Trained tech evaluates moisture levels, vapor barrier condition, pest entry points, and structural pest evidence.' },
      { title: 'Vapor Barrier Install/Repair', desc: '6-mil reinforced polyethylene barrier to control ground moisture and reduce pest harborage.' },
      { title: 'Targeted Pest Treatment', desc: 'Crawlspace-appropriate products that handle camel crickets, spiders, roaches, and rodents without disturbing the rest of your home.' },
    ],
    wedgePoints: [
      { lead: 'Most pest problems start here', body: '60% of Alabama pest entry happens through the crawlspace. Stop them before they get to your living space.' },
      { lead: 'Catches termite issues early', body: 'Crawlspace inspection often catches subterranean termite tubes before they reach framing — saving thousands in damage.' },
    ],
    faqs: [
      { q: 'How often should the crawlspace be checked?', a: 'Annually as part of a termite inspection. More often if you\'ve had moisture, pest, or rot issues.' },
      { q: 'Do I need a vapor barrier?', a: 'Most Alabama crawlspaces benefit from one. We inspect first and recommend based on your specific conditions.' },
      { q: 'What\'s the difference between a vapor barrier and full crawl space encapsulation?', a: 'A vapor barrier covers the ground to block rising moisture. Full crawl space encapsulation seals the entire space — walls, vents, and floor — and usually pairs with a dehumidifier to hold humidity below the level where mold, rot, and termites thrive. We inspect first and tell you honestly which your home needs; plenty of Alabama crawl spaces do fine with a quality barrier.' },
      { q: 'Will crawlspace work help my energy bills?', a: 'Often, yes. Damp crawl spaces ruin sub-floor insulation and push humid air up into the house, making your HVAC work harder. Controlling humidity protects the insulation you already have and keeps conditioned air where it belongs.' },
    ],
  },
  {
    slug: 'commercial',
    name: 'Commercial Service',
    shortName: 'Commercial',
    category: 'specialty',
    serviceArt: 'commercial',
    metaTitle: 'Alabama Commercial Pest Control | EnviroCare IPM & HACCP',
    metaDescription: 'Commercial pest control for restaurants, offices, warehouses. Discrete scheduling, full compliance documentation. Call (205) 940-6360.',
    heroEyebrow: 'IPM & HACCP Programs',
    heroTagline: 'Commercial Service',
    heroSubhead: 'Restaurants, offices, warehouses, and multi-unit properties across Alabama. Discrete scheduling, full compliance documentation, IPM and HACCP support.',
    features: [
      'IPM (Integrated Pest Management) programs',
      'HACCP food service compliance',
      'Discrete scheduling (after-hours available)',
      'Full audit-ready documentation',
      'Multi-unit & multi-location coordination',
      'Custom contracts',
    ],
    includes: [
      { title: 'IPM Program Design', desc: 'Custom integrated pest management plan based on facility type, layout, and risk profile.' },
      { title: 'HACCP Documentation', desc: 'Full service logs, treatment records, and audit-ready binder for food service inspections.' },
      { title: 'Discrete After-Hours Service', desc: 'Restaurants, retail, and medical facilities get service after closing — your customers never see us.' },
      { title: 'Multi-Location Coordination', desc: 'Single point of contact for chains and franchises across our Alabama footprint.' },
    ],
    wedgePoints: [
      { lead: 'Audit-ready', body: 'Health inspectors and brand auditors want documentation. Our binders satisfy every audit we\'ve seen.' },
      { lead: 'No franchise overhead', body: 'Family-owned means you talk to the people doing the work, not a regional manager three states away.' },
    ],
    faqs: [
      { q: 'Do you do food service?', a: 'Yes. We service restaurants, commercial kitchens, food production, and grocery across Alabama with full HACCP-compliant programs.' },
      { q: 'Can you handle multiple locations?', a: 'Yes. We service chains, franchises, and property management portfolios across our 3-office Alabama footprint.' },
      { q: 'What about after-hours service?', a: 'Most commercial accounts are after-hours by default. We have keys, alarm codes, and after-hours access protocols.' },
      { q: 'How do your commercial pest control services compare to the national pest control companies?', a: 'National pest control companies route commercial accounts through call centers and rotating technicians. Our commercial pest control service assigns one tech who learns your facility, documents every visit, and gets ahead of an infestation before it threatens an inspection. If you\'re comparing commercial pest control in Birmingham, Huntsville, or the Lake Martin area, ask us for the reference list.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug);
}

export function getCoreServices(): Service[] {
  return SERVICES.filter(s => s.category === 'core');
}

export function getSpecialtyServices(): Service[] {
  return SERVICES.filter(s => s.category === 'specialty');
}
