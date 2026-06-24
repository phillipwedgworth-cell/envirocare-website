// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: data/services.ts
// Commit: fix(compliance): remove banned terms from service copy — 'guarantee' on $1M coverage, 'Bundle' wording, 'same tech' promise, 'safe' in FAQs
// Push: main
// ───────────────────────────────────

// data/services.ts — EnviroCare service catalog
// May 16, 2026 — Stage 2 of v2 site-wide rebrand
// Jun 14, 2026 — added pestsFeatured/pestsMore to pest-control (rank-protection for 301'd pest-library keywords)
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
  intro?: string[];                                   // long-form SEO body copy (rendered after hero)
  pestsFeatured?: { name: string; desc: string }[];   // named + described pests (SEO topical relevance)
  pestsMore?: string[];                                // additional covered pests (chip list)
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
    metaTitle: 'Pest Control in Birmingham, AL | Bi-Monthly Service | EnviroCare',
    metaDescription: 'Bi-monthly pest control that re-treats before the barrier wears off. Ants, roaches, spiders & more across Birmingham & Alabama. From ~$35/mo. (205) 940-6360.',
    heroEyebrow: 'Year-Round Pest Defense',
    heroTagline: 'Bi-Monthly Pest Control',
    heroSubhead: 'Bi-monthly perimeter service against ants, roaches, spiders & 30+ pests. Unlimited free re-services, no contracts, family-owned since 1958.',
    features: [
      'Bi-monthly exterior treatment',
      '30+ common pests covered',
      'Re-service between visits',
      'Same-week scheduling',
      'EPA-registered, applied per label',
      'Sentricon® termite protection available',
    ],
    includes: [
      { title: 'Perimeter Treatment', desc: 'Targeted application around the foundation, door frames, and entry points where pests enter.' },
      { title: 'Eaves & Webbing', desc: 'Spider web knockdown and wasp/eave prevention at every visit.' },
      { title: 'Interior Service On Request', desc: 'Interior service available between visits — just call.' },
      { title: 'EPA-Registered', desc: 'EPA-registered products applied per label directions.' },
    ],
    wedgePoints: [
      { lead: 'No contracts', body: 'Cancel anytime. We earn your business every visit, not lock you in.' },
      { lead: 'Local technician', body: 'A local technician who gets to know your home — your dog\'s name, your gate code — visit after visit when scheduling allows.' },
      { lead: 'Same-week scheduling', body: 'Most calls scheduled inside 5 business days, with urgent issues prioritized.' },
    ],
    faqs: [
      { q: 'Why bi-monthly instead of quarterly?', a: 'Exterior barrier products typically wear down after about 60 days. A quarterly (90-day) plan leaves roughly a month each cycle with no active barrier — which is when pests return. Bi-monthly re-treats every 60 days, right as the previous application wears off, so there\'s no gap.' },
      { q: 'What pests does the regular service cover?', a: 'Ants, cockroaches, spiders, silverfish, crickets, earwigs, and exterior wasps. Fire ants, fleas, and ticks are handled as separate targeted treatments.' },
      { q: 'How much does pest control cost?', a: 'About $35/month on auto-draft, or $70 per bi-monthly service. There\'s a quarterly option around $108, and initial service is about $150 (often $99–100 with a promotion).' },
      { q: 'What if pests show up between visits?', a: 'Let us know and we\'ll come back out between scheduled services.' },
      { q: 'Do you treat inside the home?', a: 'Our standard service focuses on the exterior perimeter to stop pests before they get in, and we treat interior areas as needed. Fleas specifically require a dedicated interior service.' },
    ],
    intro: [
      'Most pest problems aren\'t a one-time event — they\'re constant pressure from outside trying to get in. The real question isn\'t whether your home gets treated, it\'s whether the protective barrier is still working when the bugs show up. That\'s where EnviroCare\'s bi-monthly service is built differently, across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'Here\'s something most homeowners are never told: the exterior barrier products that keep pests out typically break down after about 60 days — sooner in Alabama heat, sun, and rain. A standard quarterly plan treats every 90 days, which leaves roughly a month each cycle where the barrier has worn off and nothing new has been applied. That gap is when the ants and roaches come back. Our bi-monthly service treats every 60 days, re-applying the barrier right as the previous treatment wears off, so there\'s no open window for pests to exploit.',
      'Our regular service handles the common household pests that pressure Alabama homes — ants (excluding fire ants), cockroaches, spiders, silverfish, crickets, earwigs, and wasps around the exterior. We treat the exterior perimeter — entry points, foundation, eaves, and the zones where pests get in — so we\'re stopping them before they\'re inside. If something does show up between visits, we\'ll come back out. Some pests need their own targeted treatment and aren\'t part of the standard plan: fire ants, fleas (an interior service), and ticks (a seasonal yard treatment).',
      'Straightforward pricing: about $35/month on auto-draft (ACH), or $70 per bi-monthly service. A quarterly option runs about $108, and initial service is around $150 (promotional pricing often brings the start-up cost down to about $99–100). We serve Birmingham, Alabaster, Hoover, Mountain Brook, Vestavia Hills, Homewood, Trussville, and Chelsea; Huntsville, Madison, and Athens; and Alexander City, Lake Martin, and Auburn. A familiar local team handles your home whenever possible.',
    ],
    pestsFeatured: [
      { name: 'Millipede Control', desc: 'Slow, many-legged invaders that pour indoors by the dozen after heavy Alabama rain — along garages, baseboards, and foundation lines. Our perimeter barrier stops them at the door.' },
      { name: 'Centipede Control', desc: 'Fast, leggy hunters that turn up in bathrooms, basements, and crawlspaces chasing other insects. We treat the harborage points where they enter.' },
      { name: 'Cricket Control', desc: 'House and camel crickets that chirp through walls and chew paper and fabric — common in Birmingham garages and crawlspaces. Treated at every bi-monthly visit.' },
      { name: 'Earwig Control', desc: 'Pincer-tailed insects that gather under mulch, pots, and door thresholds, then slip inside during dry spells. We knock down the outdoor population before they get in.' },
      { name: 'Spider Control', desc: 'House spiders, wolf spiders, and their webs knocked down at eaves, corners, and entry points on every visit, plus the perimeter treated to cut off their food source.' },
      { name: 'Silverfish Control', desc: 'Moisture-loving insects that damage books, wallpaper, and stored paper in closets, attics, and bathrooms. Targeted where they hide and breed.' },
      { name: 'Scorpion Control', desc: 'Alabama\'s native Hentz striped and southern devil scorpions wander into garages, crawlspaces, and laundry rooms hunting other insects — most often after rain. We treat the foundation, harborage zones, and the insect prey that draws them in.' },
    ],
    pestsMore: [
      'Odorous house ants','Little black ants','Carpenter ants',
      'American roaches','German roaches','Smokybrown roaches','Oriental roaches',
      'Pillbugs (roly-polies)','Stink bugs','Boxelder bugs','Ground beetles',
      'Asian lady beetles','Pantry weevils',
      'House flies','Fruit flies','Gnats',
      'House mice','Roof rats','Norway rats',
    ],
  },
  {
    slug: 'termite-control',
    name: 'Termite Control',
    shortName: 'Termite',
    category: 'core',
    serviceArt: 'termite',
    price: 'Free inspection',
    priceSub: 'Sentricon® quote provided after free WDO inspection & approval',
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
      { title: '$1M Damage Repair Coverage', desc: 'Backed by EnviroCare directly. If termites damage your home while we maintain your Sentricon® protection, repairs are covered up to $1M.' },
      { title: 'Real Estate WDO Letter', desc: 'One free Wood-Destroying Organism inspection letter per year — essential for refinancing or selling.' },
    ],
    wedgePoints: [
      { lead: 'Sentricon® > liquid barriers', body: 'Liquid treatments require drilling concrete, retreating every 5–7 years, and have shrinking effectiveness as they break down. Sentricon® bait stations eliminate the entire colony, not just the perimeter.' },
      { lead: '$1M is real coverage', body: 'Real EnviroCare-backed coverage, not a vague promise. If termites damage your home while protected, you get fixed, not finger-pointed.' },
      { lead: 'No drilling means no damage', body: 'Liquid barrier installations drill every 12 inches through your slab, patio, driveway. Sentricon® stations go in the ground around the perimeter. No concrete touched.' },
    ],
    faqs: [
      { q: 'How is Sentricon® different from liquid termite treatments?', a: 'Liquid treatments create a chemical barrier in the soil around your foundation — they require drilling through concrete, work for 5–7 years before needing retreatment, and don\'t eliminate the colony. Sentricon® places bait stations in the ground that termites carry back to the colony, eliminating the whole population. No drilling required.' },
      { q: 'What does the $1M coverage actually cover?', a: 'If subterranean termites cause damage to your home while you\'re on the Sentricon® Always Active™ system and we\'ve been maintaining it, EnviroCare covers repair costs up to $1,000,000. That coverage is backed by EnviroCare directly.' },
      { q: 'Will Sentricon® mess up my landscaping?', a: 'No. Bait stations are small (about the size of a soda can) and installed flush with the ground around your home perimeter. No drilling, no concrete cuts, no torn-up flowerbeds.' },
      { q: 'How long does installation take?', a: 'Most homes are installed in 1–2 hours. We mark station locations with you first, then place them. You\'ll see them but they don\'t disrupt anything.' },
      { q: 'Do I need to be a current customer?', a: 'No. We install Sentricon® for any Alabama home in our service area. Many customers add bi-monthly pest control after experiencing our termite service.' },
      { q: 'What about during a real estate transaction?', a: 'We provide WDO (Wood-Destroying Organism) inspection letters for refinancing and home sales. One included per year on active accounts; otherwise $75 standalone fee.' },
      { q: 'What if I already have an active termite infestation?', a: 'Sentricon® handles an active infestation as well as prevention — the colony feeds on the bait and collapses from the inside. Unlike termite control services that only treat what you can see, colony elimination stops the damage at its source.' },
    ],
    intro: [
      'For termite control in Alabama, EnviroCare installs the Sentricon® Always Active™ bait system — a method that eliminates the entire subterranean termite colony rather than only treating the soil you can see. Most liquid termite control services create a chemical barrier that requires drilling through your slab, patio, and driveway, then loses strength and needs retreatment every five to seven years. Sentricon® stations sit in the ground around your home perimeter, so there is no drilling, no concrete cutting, and no tank trucks in the yard.',
      'Termites cause damage quietly, and an active infestation can go unnoticed until it reaches structural wood. With Sentricon®, foraging termites carry the bait back to the colony, collapsing it from the inside — which stops both an existing infestation and future ones. Every protected home includes annual monitoring and one Wood-Destroying Organism (WDO) inspection letter per year, the document lenders require for refinancing or selling.',
      'Behind it stands EnviroCare-backed coverage: up to $1,000,000 in damage repair coverage while we maintain your Sentricon® protection. That coverage is backed by EnviroCare directly. Installation takes most homes one to two hours, and you do not need to be an existing pest control customer to start.',
      'Alabama\'s humidity, mild winters, and clay-heavy soil make it one of the most active subterranean termite regions in the country. A single colony can number in the hundreds of thousands and forage silently through floor joists, sills, and framing for years before any sign shows. By the time you notice mud tubes, hollow-sounding wood, or discarded wings on a windowsill, the damage is often already done — which is why protection has to be continuous rather than a one-time treatment you hope holds.',
      'Watch for the early warning signs of termites: mud tubes running up your foundation, piers, or crawlspace walls; wood that sounds hollow when tapped or paint that looks rippled or bubbled; discarded wings near windows and doors after a spring swarm; doors or windows that suddenly stick from subtle warping; and frass or visible galleries in damaged wood. If you spot any of these, schedule a free WDO inspection — early action is the difference between a monitoring plan and a repair bill.',
    ],
  },
  {
    slug: 'mosquito-control',
    intro: [
      'From late spring through fall, mosquitoes are the reason a lot of Alabama families stop using their own backyard. Our warm, humid weather and frequent rain create exactly the standing water mosquitoes need to breed, so even a tidy yard can turn into a hatching ground. EnviroCare\'s seasonal mosquito program is built to push the population way down so you can get your evenings back — across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'Mosquitoes don\'t need much: a bottle cap of standing water is enough to breed, and our climate keeps the cycle going roughly March through November. They rest during the heat of the day in shaded, humid spots — under decks, in dense shrubs, along fence lines, and in tall grass — then come out for you at dusk. Our service targets both the adult mosquitoes resting in those harborage areas and the breeding sites where the next generation is developing.',
      'We treat your property on a recurring schedule through the season — about nine treatments from March through November — and each visit knocks the active population back down and disrupts the breeding cycle before it rebuilds. One honest note: no legitimate company can promise to eliminate every mosquito, because they fly in from neighboring yards and common areas. What our program reliably does is significantly reduce the mosquito pressure on your property so the yard is comfortable and usable again. Every treatment uses EPA-registered products applied strictly according to label directions.',
      'Pricing is simple and predictable: the mosquito program runs about $45 per treatment across roughly nine treatments, which we spread evenly to about $33.75/month. If your yard backs up to woods, a field, or tall grass, ask about Mosquito + Tick — the same program plus tick and chigger coverage — at about $65 per treatment, spread to about $48.75/month. The tick add-on does not cover fleas; fleas are a separate interior-access service.',
      'We provide seasonal mosquito control across our service area, including Birmingham, Huntsville, Madison, Decatur, Vestavia Hills, Pelham, Alabaster, and Chelsea. River-adjacent and wooded areas — like Decatur on the Tennessee River or the hillside lots in Vestavia Hills — tend to see the heaviest pressure and benefit most from starting early in the season.',
    ],
    name: 'Mosquito Control',
    shortName: 'Mosquito',
    category: 'core',
    serviceArt: 'mosquito',
    price: 'About $33.75/mo',
    priceSub: '~$45/treatment · ~9 treatments Mar–Nov',
    metaTitle: 'Mosquito Control in Birmingham & Huntsville, AL | EnviroCare',
    metaDescription: 'Seasonal mosquito control (Mar–Nov) that significantly reduces yard mosquitoes. ~$33.75/mo. Add tick & chigger coverage. Call (205) 940-6360.',
    heroEyebrow: 'Take Back Your Yard',
    heroTagline: 'Mosquito Barrier Treatment',
    heroSubhead: '30-day yard barrier treatments March through November. Make your patio livable, your evenings outdoor again, your kids safer from West Nile and EEE.',
    features: [
      '30-day refresh cycle',
      'March through November coverage',
      'Applied according to label directions once dry',
      '9 treatments per season',
      'Free re-treatment if needed',
    ],
    includes: [
      { title: 'Yard Barrier Application', desc: 'Targeted mist application to shrubs, eaves, fence lines, and harborage areas where mosquitoes rest.' },
      { title: 'Special Events Bonus', desc: 'Pre-event knockdown applications for backyard weddings, parties, or holidays at no extra charge.' },
      { title: 'Standing Water Inspection', desc: 'We identify breeding spots on your property and recommend fixes — gutters, planters, kiddie pools, etc.' },
      { title: 'EPA-Registered', desc: 'EPA-registered pyrethroids applied per label. Re-entry per label directions.' },
    ],
    wedgePoints: [
      { lead: 'Built for Alabama', body: 'Our mosquito season runs March through November, not the generic "warm months." We schedule accordingly.' },
      { lead: 'Pairs with tick control', body: 'The same visit can handle ticks — and chiggers — as Mosquito + Tick ($65/visit). One trip, one invoice.' },
      { lead: 'No surprise charges', body: 'Flat monthly rate covers all season applications. Free re-treatments if mosquitoes return between visits.' },
    ],
    faqs: [
      { q: 'When is mosquito season in Alabama?', a: 'Roughly March through November. Our program runs about nine treatments across that window so your property stays covered for the whole season.' },
      { q: 'Do you guarantee I won\'t have any mosquitoes?', a: 'No honest company can — mosquitoes fly in from neighboring yards and common areas. What our seasonal program does is significantly reduce the mosquito population on your property so the yard is comfortable and usable again.' },
      { q: 'How much does mosquito control cost?', a: 'The mosquito program is about $45 per treatment, which we spread to roughly $33.75/month across the season. The mosquito + tick option (which also covers chiggers) is about $65 per treatment, or roughly $48.75/month.' },
      { q: 'Does the tick add-on cover fleas?', a: 'No. The mosquito + tick option covers ticks and chiggers around the yard. Fleas are handled as a separate interior-access service.' },
      { q: 'What can I do to help reduce mosquitoes?', a: 'Empty standing water weekly — saucers under potted plants, birdbaths, kids\' toys, clogged gutters, and any container that collects rain. Removing those breeding sites makes every treatment more effective.' },
      { q: 'What about my pets and kids on treatment day?', a: 'We apply only EPA-registered products and follow the label directions for every treatment. Your technician will explain any simple, label-directed steps to follow on treatment day.' },
    ],
  },
  {
    slug: 'tick-control',
    intro: [
      'If your yard backs up to woods, a field, or tall grass, ticks are more than a nuisance — they\'re carried in by deer, rodents, and other wildlife, and they\'re known to transmit diseases that affect both people and pets. EnviroCare\'s tick service treats the yard where ticks live and wait, so your family and animals can be outside with a lot less worry, across Birmingham, Huntsville, and the Lake Martin area.',
      'Ticks don\'t set up in the open lawn. They wait in the shaded, humid edges of a property — wooded borders, leaf litter, tall grass, ground cover, and along fence lines — then latch on to whatever brushes past. Wildlife and neighborhood pets bring fresh ticks in constantly, which is why a single DIY spray rarely makes a lasting dent. Our treatment focuses on exactly those harborage zones: the wood line, leaf-litter areas, tall grass, and shaded borders where ticks actually congregate.',
      'Tick control is a seasonal yard treatment, most often run alongside our mosquito program as a combined mosquito + tick service through the season (roughly March through November). One honest note, same as with mosquitoes: we can\'t guarantee zero ticks, because wildlife reintroduces them constantly. What our program reliably does is significantly reduce tick pressure around your property so the yard is far safer to use. We use EPA-registered products applied strictly according to label directions.',
      'Pricing: tick control is most commonly delivered as the mosquito + tick yard program — about $65 per treatment, roughly nine treatments March through November, spread to about $48.75/month. That option also covers chiggers, but does not cover fleas (a separate interior-access service). Want tick coverage on its own or a one-time treatment? Call and we\'ll quote it for your property.',
    ],
    name: 'Tick Control',
    shortName: 'Tick',
    category: 'core',
    serviceArt: 'tick',
    price: 'About $48.75/mo',
    priceSub: '~$65/treatment Mosquito + Tick · chiggers covered',
    metaTitle: 'Tick Control in Birmingham, AL | Yard Treatment | EnviroCare',
    metaDescription: 'Seasonal tick control that significantly reduces yard ticks & chiggers. ~$48.75/mo with mosquito. Birmingham & across Alabama. Call (205) 940-6360.',
    heroEyebrow: 'Protect Family & Pets',
    heroTagline: 'Tick Yard Control',
    heroSubhead: 'Targeted yard applications to break the tick lifecycle. Critical for wooded lots, waterfront properties, and homes with kids or dogs that play outside.',
    features: [
      'Lone Star, Dog & Deer ticks',
      'Harborage-zone targeting',
      'Applied according to label directions once dry',
      'Runs with your mosquito visit',
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
      { lead: 'One visit, one invoice', body: 'No separate vendor for ticks — your mosquito technician handles it on the same visit.' },
      { lead: 'Built for AL tick pressure', body: 'Lone Star tick (most common in Alabama) is aggressive and bites humans. Our treatment is built for the AL species mix.' },
      { lead: 'Real disease prevention', body: 'Lyme is rare in AL but Rocky Mountain Spotted Fever, Ehrlichiosis, and Alpha-Gal Syndrome (red meat allergy from tick bite) are real risks here.' },
    ],
    faqs: [
      { q: 'When is tick season in Alabama?', a: 'Ticks are most active from spring through fall, overlapping mosquito season. Our combined program runs about nine treatments from March through November to cover that window.' },
      { q: 'How much does tick control cost?', a: 'It\'s most commonly run as the mosquito + tick program — about $65 per treatment, or roughly $48.75/month spread across the season. That option also covers chiggers.' },
      { q: 'Does the tick service cover fleas?', a: 'No. The mosquito + tick yard program covers ticks and chiggers. Fleas are handled separately as an interior-access service.' },
      { q: 'Can you guarantee I won\'t have any ticks?', a: 'No honest company can — wildlife and neighboring properties reintroduce ticks constantly. Our program significantly reduces tick pressure around your yard so it\'s much safer to use.' },
      { q: 'What can I do to reduce ticks myself?', a: 'Keep grass short, clear leaf litter and tall weeds at the yard edges, put a mulch or gravel barrier between the lawn and the woods, and keep pets on a vet-recommended tick preventive.' },
      { q: 'What about pets and kids with tick treatment?', a: 'We use only EPA-registered products applied according to label directions, and your technician will explain any simple steps to follow on treatment day.' },
    ],
  },

  // ── SPECIALTY
  {
    slug: 'fire-ant',
    name: 'Fire Ant Control',
    shortName: 'Fire Ant',
    category: 'specialty',
    serviceArt: 'fireant',
    metaTitle: 'Fire Ant Control in Alabama | Colony Elimination | EnviroCare',
    metaDescription: 'Fire ant treatment that reaches the queen, not just the mound. Starts at $150, priced per sq ft. Open to all. Birmingham & across Alabama. (205) 940-6360.',
    heroEyebrow: 'Critical For Lake Homes',
    heroTagline: 'Fire Ant Control',
    heroSubhead: 'Yard-wide elimination, not just spot mound treatment. Built for Alabama families who actually use their yards — kids, dogs, barefoot summer.',
    features: [
      'Yard-wide elimination',
      'Single application coverage',
      'Applied per label directions',
      'Pairs with pest control',
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
      { q: 'How do I get rid of fire ants for good?', a: 'You have to reach the queen and the colony, not just the visible mound. Surface treatments scatter the ants and the queen survives, so the colony rebuilds nearby. Our treatment is carried back into the colony to take out the source.' },
      { q: 'How much does fire ant control cost?', a: 'It starts at a $150 minimum and is then priced by the square footage of the area treated. Your technician measures the area and gives you the number up front.' },
      { q: 'Do I have to be on a pest plan to get fire ant control?', a: 'No. Fire ant control is a standalone service available to anyone — you don\'t need a recurring plan.' },
      { q: 'Why do my fire ant mounds keep coming back?', a: 'Because DIY methods rarely reach the queen. As long as she\'s alive, the colony just relocates and rebuilds, often only a few feet from the old mound.' },
      { q: 'What about pets and kids with fire ant treatment?', a: 'We use only EPA-registered products and follow the label directions for every application. Your technician will explain any simple, label-directed steps to follow on the day of service.' },
    ],
    intro: [
      'Imported fire ants are one of the most aggravating pests in the Alabama yard. They build dome-shaped mounds across lawns, and the moment a mound is disturbed they swarm out and sting — painful, often in clusters, and a real problem for kids, pets, and anyone working in the yard. EnviroCare provides targeted fire ant control that goes after the colony, not just the mound you can see, across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'Knocking the top off a mound, pouring boiling water, or dumping a hardware-store product usually does one thing: it scatters the colony and the queen survives. As long as the queen is alive, the colony simply relocates a few feet away and rebuilds. Real fire ant control has to reach the queen and the colony — our treatment is designed to be carried back into the mound and worked through the colony, so you\'re eliminating the source instead of chasing mounds around the yard all summer.',
      'Depending on the size of the area and how heavy the pressure is, we use targeted baiting the workers carry back to the colony, plus broadcast application across larger lawns for season-long suppression. Treatments use EPA-registered products applied strictly according to label directions. Fire ant control is a standalone service — you don\'t have to be on a recurring pest plan to get it, and it isn\'t included in the standard bi-monthly perimeter service.',
      'Pricing is straightforward: fire ant treatment starts at a $150 minimum, then is priced by the square footage of the area being treated, and it\'s open to everyone — current and new customers alike. Your technician will measure the treatment area and give you a firm number before any work begins.',
    ],
  },
  {
    slug: 'flea',
    intro: [
      'Fleas multiply fast, and by the time you\'re seeing them on a pet or getting bitten around the ankles, the real problem is already in your carpet, rugs, and pet bedding. Treating the pet alone almost never solves it — most of the flea population is in the environment, not on the animal. EnviroCare\'s flea service treats the home and breaks the life cycle so the infestation actually ends, across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'The fleas you see are a small fraction of the problem. The rest of the population is hiding as eggs, larvae, and pupae tucked deep in carpet fibers, along baseboards, and in pet bedding. A single surface spray kills the adults you can see but misses the next generation — which hatches a few days later and starts the cycle over. Effective flea control has to knock down the adult fleas and interrupt the life cycle so the eggs and larvae don\'t mature, and that takes an interior treatment, not just an exterior barrier.',
      'Because fleas live inside, our flea service is an interior treatment that requires access to the home. We treat the areas where fleas develop — carpet, along baseboards, and pet resting areas — using EPA-registered products applied strictly according to label directions, and your technician will give you simple prep and treatment-day instructions. For the best result, coordinate with your veterinarian on pet treatment at the same time; treating the home and the pet together is what finally breaks the cycle.',
      'Pricing: flea control is an interior add-on to our quarterly interior pest service — $98 per quarter for the interior service, plus $30 per quarter for flea treatment, for $128 per quarter total. Flea service is not part of the standard bi-monthly perimeter plan, because that plan treats the exterior and fleas have to be handled inside.',
    ],
    name: 'Flea Control',
    shortName: 'Flea',
    category: 'specialty',
    serviceArt: 'flea',
    metaTitle: 'Flea Control in Birmingham, AL | Interior Treatment | EnviroCare',
    metaDescription: 'Flea control that breaks the life cycle in carpet & bedding, not just on pets. Interior service, $128/qtr. Birmingham & across Alabama. (205) 940-6360.',
    heroEyebrow: 'Interior Life-Cycle Treatment',
    heroTagline: 'Interior Flea Control',
    heroSubhead: 'Fleas reproduce indoors — which is why flea treatment is a +$30/quarter add-on to our $98/quarter interior + exterior plan ($128/quarter total). Treating both sides of the door is what breaks the lifecycle.',
    features: [
      'Interior life-cycle treatment',
      'Breaks the egg-larva-pupa cycle',
      'Applied according to label directions once dry',
      'Add-on to interior pest plan ($128/qtr)',
      'Requires inside access',
      'Same-week scheduling',
    ],
    includes: [
      { title: 'Interior Treatment', desc: 'Targets the eggs, larvae, and pupae in carpet, along baseboards, and in pet bedding — where most of the flea population actually lives.' },
      { title: 'Life-Cycle Disruption', desc: 'Knocks down adult fleas and interrupts the cycle so the next generation doesn\'t mature and re-infest.' },
      { title: 'Built On The Interior Plan', desc: 'Flea treatment is a +$30/quarter add-on to our $98/quarter interior service ($128/quarter total) — because the inside stages are where infestations live. Best paired with your vet\'s pet treatment. See /services/interior-pest-control.' },
    ],
    wedgePoints: [
      { lead: 'Home, not just pet', body: 'Your vet treats the dog. We treat the home — carpet, baseboards, bedding — so the environment stops re-infesting the pet.' },
    ],
    faqs: [
      { q: 'Why do I still have fleas after treating my pet?', a: 'Because most of the flea population isn\'t on the pet — it\'s in your home as eggs and larvae in carpet and bedding. Treating only the pet leaves the environment full of developing fleas that keep hatching.' },
      { q: 'Do you have to come inside to treat for fleas?', a: 'Yes. Fleas develop indoors, so flea service requires access to the home — it isn\'t something an exterior-only treatment can solve.' },
      { q: 'How much does flea control cost?', a: 'Flea treatment is an interior add-on to our quarterly interior service: $98/quarter for the base service plus $30/quarter for fleas, for $128/quarter total.' },
      { q: 'What should I do before the flea treatment?', a: 'Vacuum thoroughly, wash pet bedding in hot water, clear clutter off the floors, and have your pets treated by your vet around the same time.' },
      { q: 'What about pets and kids with flea treatment?', a: 'We apply only EPA-registered products and follow label directions for every treatment. Your technician will give you clear instructions to follow before and after service.' },
    ],
  },
  {
    slug: 'builder',
    intro: [
      'The most effective time to protect a home from termites is before the slab is ever poured. EnviroCare partners with Alabama builders and contractors to provide pre-construction termite treatment that puts a protective barrier in place from day one — so the homes you build start their life already defended.',
      'Alabama\'s climate and soil make subterranean termites a constant threat, and they enter through the ground — often through the slab and foundation contact points that are impossible to reach once construction is finished. A pre-construction soil treatment establishes a continuous termiticide barrier in the soil beneath and around the structure before it\'s sealed in by concrete. Treating at the right stage is far more thorough than anything retrofitted later, and it gives your buyers protection built into the home itself.',
      'We coordinate with your build schedule and treat at the right phases — applying an EPA-registered termiticide strictly according to label directions to the soil and critical contact points before the slab is poured. Timing is everything on a job site, so we work directly with your crew to be there at the right moment without holding up the pour, and we provide documentation of the treatment for your records and your buyers.',
      'Once a home is finished, we can carry that protection forward for the new homeowner with ongoing termite coverage and our full residential pest services — a clean handoff that adds value for your buyers. We serve Birmingham, Huntsville, Lake Martin, Auburn, and across Alabama; pre-construction treatment is quoted to your project and build schedule.',
    ],
    name: 'Builder Pre-Treat',
    shortName: 'Builder',
    category: 'specialty',
    serviceArt: 'builder',
    metaTitle: 'Pre-Construction Termite Treatment for Alabama Builders | EnviroCare',
    metaDescription: 'Pre-construction termite soil treatment for Alabama builders — protection before the slab is poured. Coordinated to your build schedule. (205) 940-6360.',
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
      { q: 'What is pre-construction termite treatment?', a: 'It\'s a soil treatment applied during construction — before the slab is poured — that establishes a continuous termiticide barrier beneath and around the structure, protecting the home from subterranean termites from the start.' },
      { q: 'Why treat before the slab is poured?', a: 'Because the critical entry points are sealed in once concrete is down. Treating beforehand reaches areas that can\'t be properly treated afterward, making it far more thorough than a retrofit.' },
      { q: 'Will it slow down my build?', a: 'No. We coordinate around your construction phases and crew so the treatment happens at the right time without delaying your pour.' },
      { q: 'How much does pre-construction treatment cost?', a: 'It\'s quoted to the specific project and build schedule. Call us and we\'ll put together a number for your job.' },
      { q: 'Can the home stay protected after it\'s built?', a: 'Yes. We can carry protection forward for the new homeowner with ongoing termite coverage and our full residential pest services.' },
    ],
  },
  {
    slug: 'real-estate-wdo',
    intro: [
      'Closing on a home in Alabama usually means producing a WDO report — the official "termite letter." EnviroCare provides Wood Destroying Organism inspections and reports for buyers, sellers, and real estate agents across Birmingham, Huntsville, Lake Martin, and Auburn, with the kind of turnaround a closing timeline actually requires.',
      'A WDO (Wood Destroying Organism) inspection is a documented inspection of a property for active or past damage from wood-destroying pests and conditions. The resulting report — commonly called the termite letter or termite bond — is the official form lenders, closing attorneys, and buyers rely on during a real estate transaction. Our licensed inspector checks the accessible areas of the home and documents any evidence of subterranean and other termites, wood-destroying beetles, wood-decay fungi, carpenter ants and bees, and conditions conducive to wood-destroying organisms such as moisture problems or wood-to-ground contact.',
      'WDO letters are needed by home buyers who want to know what they\'re buying, sellers preparing to go under contract, agents keeping a transaction on schedule, and the lenders and closing attorneys who require the report to close. We deliver licensed, thorough inspections on a turnaround that fits your closing timeline.',
      'If the inspection does reveal termites or conducive conditions, you\'re already working with the team that can handle the treatment — including our Sentricon® termite protection — and keep the transaction moving. We schedule WDO inspections around your closing date.',
    ],
    name: 'Real Estate / WDO Letters',
    shortName: 'WDO',
    category: 'specialty',
    serviceArt: 'wdo',
    metaTitle: 'WDO Inspections & Termite Letters in Alabama | EnviroCare',
    metaDescription: 'Real estate WDO inspections & termite letters across Alabama. Turnaround that fits your closing. Buyers, sellers & agents. Call (205) 940-6360.',
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
      { q: 'What is a WDO letter?', a: 'It\'s the official report from a Wood Destroying Organism inspection — commonly called the termite letter — that documents any evidence of wood-destroying pests or conducive conditions at a property. Lenders and closing attorneys typically require it for a real estate transaction.' },
      { q: 'What does a WDO inspection check for?', a: 'Termites, wood-destroying beetles, wood-decay fungi, and carpenter ants and bees, along with conditions that are conducive to wood-destroying organisms, such as moisture problems and wood-to-ground contact.' },
      { q: 'How fast can I get the report?', a: 'We know WDO inspections are tied to closing dates, so we schedule around your timeline. Call us with your closing date and we\'ll work to it.' },
      { q: 'What happens if the inspection finds termites?', a: 'You\'re already working with a full-service termite company. We can treat and protect the home — including with our Sentricon® termite system — so a finding doesn\'t have to derail your closing.' },
      { q: 'How much does a WDO inspection cost?', a: 'Call us for current WDO inspection pricing and to get on the schedule for your closing date.' },
    ],
  },
  {
    slug: 'crawlspace',
    name: 'Crawlspace Service',
    shortName: 'Crawlspace',
    category: 'specialty',
    serviceArt: 'crawlspace',
    metaTitle: 'Crawlspace Moisture Control & Vapor Barriers in Alabama | EnviroCare',
    metaDescription: 'Alabama crawlspace moisture control, vapor barriers & encapsulation that stop humidity, termites, mold & musty odors. Free inspection. Family-owned since 1958. Call (205) 940-6360.',
    heroEyebrow: 'Foundation & Moisture Care',
    heroTagline: 'Crawlspace Moisture Control',
    heroSubhead: 'Moisture control, vapor barriers, crawl space encapsulation, and targeted treatments for the most vulnerable part of your home — where Alabama humidity, termites, mold, and rot problems start.',
    features: [
      'Free crawlspace moisture inspection',
      '6-mil vapor barrier installation',
      'Crawl space encapsulation',
      'Targeted pest treatment',
      'Termite vulnerability check',
      'Mold, rot & musty-odor evaluation',
    ],
    includes: [
      { title: 'Full Crawlspace Inspection', desc: 'A trained tech evaluates moisture levels, vapor barrier condition, standing water, pest entry points, and any structural pest evidence — then explains exactly what your home needs and what it doesn\'t.' },
      { title: 'Vapor Barrier Install / Repair', desc: '6-mil reinforced polyethylene barrier laid across the soil to block ground moisture from rising into your sub-floor, framing, and insulation — and to cut off the damp harborage pests love.' },
      { title: 'Crawl Space Encapsulation', desc: 'For homes that need more than a barrier, we seal the walls, vents, and floor and pair it with humidity control so mold, rot, and wood-destroying insects lose the damp conditions they depend on.' },
      { title: 'Targeted Pest Treatment', desc: 'Crawlspace-appropriate products that handle camel crickets, spiders, roaches, ants, and rodents at the source — without disturbing the living space above.' },
      { title: 'Termite & Moisture Report', desc: 'You get a plain-English summary of what we found, photos of problem areas, and honest recommendations ranked by priority — no scare tactics, no upsell on work you don\'t need.' },
    ],
    wedgePoints: [
      { lead: 'Most pest problems start here', body: 'A large share of Alabama pest entry happens through the crawlspace and foundation line. Treating the crawlspace stops pests before they ever reach your living space — instead of chasing them once they\'re inside.' },
      { lead: 'Catches termite issues early', body: 'A crawlspace inspection often catches subterranean termite mud tubes and moisture-softened wood before they reach framing — the difference between a monitoring plan and a five-figure repair bill.' },
      { lead: 'We tell you what you actually need', body: 'Some crawl spaces need full encapsulation; plenty do fine with a quality vapor barrier. As a four-generation family company we inspect first and recommend honestly — we\'re not a one-product sales pitch.' },
    ],
    faqs: [
      { q: 'How often should the crawlspace be checked?', a: 'At least annually, ideally as part of a termite inspection. Check more often if you\'ve had moisture, pest, or rot issues, or after major storms and flooding common to Alabama springs.' },
      { q: 'Do I need a vapor barrier?', a: 'Most Alabama crawlspaces benefit from one because of our high humidity and clay-heavy soil, but not every home needs the same thing. We inspect first and recommend based on your specific moisture readings and conditions.' },
      { q: 'What\'s the difference between a vapor barrier and full crawl space encapsulation?', a: 'A vapor barrier covers the ground to block rising moisture. Full crawl space encapsulation seals the entire space — walls, vents, and floor — and usually pairs with a dehumidifier to hold humidity below the level where mold, rot, and termites thrive. We inspect first and tell you honestly which your home needs; plenty of Alabama crawl spaces do fine with a quality barrier.' },
      { q: 'Will crawlspace work help my energy bills?', a: 'Often, yes. Damp crawl spaces ruin sub-floor insulation and push humid air up into the house, making your HVAC work harder. Controlling humidity protects the insulation you already have and keeps conditioned air where it belongs.' },
      { q: 'What are the signs of a crawlspace moisture problem?', a: 'Musty odors in the home, buckling or cupping hardwood floors, condensation or standing water under the house, sagging or torn insulation hanging from the joists, increased allergy or humidity complaints, and bug activity that keeps coming back. Any of these is worth a free inspection.' },
      { q: 'Can a damp crawlspace cause mold or wood rot?', a: 'Yes. Sustained moisture under a home is the leading cause of wood-decay fungus and mold growth on joists and sub-flooring. It also creates the exact conditions subterranean termites need, which is why moisture control and termite protection go hand in hand.' },
      { q: 'Do you offer free crawlspace inspections?', a: 'Yes. We inspect the crawlspace, take moisture readings, photograph any problem areas, and give you honest, prioritized recommendations at no charge. Call (205) 940-6360 to schedule.' },
    ],
    intro: [
      'Your crawlspace is the most overlooked — and most vulnerable — part of an Alabama home. It sits directly on damp ground, stays dark and poorly ventilated, and quietly drives problems you notice everywhere else: musty odors upstairs, cupping hardwood floors, higher power bills, recurring bugs, and the moisture that subterranean termites and wood-decay fungus need to thrive. EnviroCare provides crawlspace moisture control, vapor barriers, and encapsulation across Birmingham, Huntsville, Lake Martin, and Auburn, treating the source instead of chasing symptoms.',
      'Alabama\'s climate makes crawlspaces especially risky. High year-round humidity, frequent heavy rain, and clay-heavy soil that holds water mean ground moisture is constantly evaporating up into your sub-floor, framing, and insulation. Left unchecked, that moisture warps floors, ruins insulation, feeds mold and wood rot, and creates the perfect environment for termites — all before any obvious sign reaches your living space. Controlling crawlspace moisture is one of the highest-value, lowest-visibility things you can do to protect the structure of your home.',
      'Our service starts with a free inspection: a trained technician takes moisture readings, checks the condition of any existing vapor barrier, looks for standing water and drainage issues, and inspects for termite mud tubes, moisture-softened wood, and pest harborage. From there we recommend only what your home actually needs. For many homes that\'s a quality 6-mil reinforced vapor barrier laid across the soil. For homes with chronic moisture, it may mean full crawl space encapsulation — sealing the walls, vents, and floor and pairing it with humidity control so mold, rot, and wood-destroying insects lose the damp conditions they depend on.',
      'Because moisture and pests are so closely linked, a crawlspace visit frequently catches problems early. Inspecting under the home is often where we first spot subterranean termite activity — mud tubes climbing the piers or foundation wall — before it ever reaches the framing. Targeted, crawlspace-appropriate treatments handle the camel crickets, spiders, roaches, ants, and rodents that nest underneath, stopping them at the source rather than after they\'ve made it into your kitchen or living room.',
      'Watch for the warning signs of a crawlspace problem: a persistent musty or earthy smell in the house, hardwood floors that cup or buckle, condensation or standing water under the home, insulation that sags or hangs torn from the joists, worsening allergy and humidity complaints, and pest activity that keeps returning no matter how often you treat indoors. If you notice any of these, schedule a free crawlspace inspection — as a four-generation Alabama family company, we\'ll tell you honestly what your home needs and what it doesn\'t.',
    ],
  },
  {
    slug: 'commercial',
    intro: [
      'A pest problem at your business isn\'t just a nuisance — it\'s a threat to your reputation, your health-inspection score, and your bottom line. EnviroCare provides discreet, dependable commercial pest control for Alabama businesses, with the documentation and flexible scheduling that operators and property managers actually need, across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'We work with a wide range of commercial properties — restaurants and food service, retail and grocery, offices and professional buildings, warehouses and distribution, property management and multi-family, and medical and assisted-living facilities. Every facility is different, so every commercial program starts with a walkthrough of your property rather than a one-size-fits-all package.',
      'Service includes a program built around your facility, flexible scheduling that works around your hours so service never disrupts customers or operations, service documentation and pest logs to support health inspections and audits, discreet professional technicians, and EPA-registered products applied strictly according to label directions. A familiar local team handles your account whenever possible, so the people servicing your property actually know your facility.',
      'We\'re a four-generation Alabama family company, and commercial accounts get the same responsiveness our residential customers count on — direct local phone numbers, real technicians, and follow-through. For restaurants, food handling, healthcare, and multi-family properties, we keep clear service records and pest activity logs so you\'re ready for a health inspection or third-party audit at any time. Every commercial program is quoted after a walkthrough of your property.',
    ],
    name: 'Commercial Service',
    shortName: 'Commercial',
    category: 'specialty',
    serviceArt: 'commercial',
    metaTitle: 'Commercial Pest Control in Alabama — Restaurants, Retail & Offices | EnviroCare',
    metaDescription: 'Discreet, inspection-ready commercial pest control for Alabama restaurants, retail, offices, warehouses & multi-family. Flexible after-hours scheduling, IPM & HACCP support, audit-ready logs. Free walkthrough — call (205) 940-6360.',
    heroEyebrow: 'IPM & HACCP Programs',
    heroTagline: 'Commercial Pest Control',
    heroSubhead: 'Restaurants, offices, warehouses, and multi-unit properties across Alabama. Discreet after-hours scheduling, full compliance documentation, and IPM and HACCP support from a four-generation local team.',
    features: [
      'IPM (Integrated Pest Management) programs',
      'HACCP food service compliance',
      'Discreet scheduling (after-hours available)',
      'Audit-ready documentation & pest logs',
      'Multi-unit & multi-location coordination',
      'Custom contracts — quoted after a walkthrough',
    ],
    includes: [
      { title: 'On-Site Walkthrough & Quote', desc: 'Every program starts with a walkthrough of your facility — layout, entry points, and risk areas — so your plan and price reflect your actual building, not a one-size-fits-all package.' },
      { title: 'IPM Program Design', desc: 'A custom integrated pest management plan built around your facility type, traffic, and risk profile — prioritizing exclusion and sanitation, not just spraying.' },
      { title: 'HACCP & Audit Documentation', desc: 'Full service logs, treatment records, trend reporting, and an audit-ready binder for health inspections and third-party brand audits.' },
      { title: 'Discreet After-Hours Service', desc: 'Restaurants, retail, and medical facilities get service before opening or after closing — your customers and staff never see us work.' },
      { title: 'Multi-Location Coordination', desc: 'A single local point of contact for chains, franchises, and property portfolios across our Birmingham, Huntsville, Lake Martin, and Auburn footprint.' },
    ],
    wedgePoints: [
      { lead: 'Audit-ready, every visit', body: 'Health inspectors and brand auditors want documentation. We keep clear service records and pest-activity logs so you\'re ready for an inspection or audit at any time — not scrambling the night before.' },
      { lead: 'No franchise overhead', body: 'Family-owned since 1958 means you talk to the people doing the work and a local team that knows your building — not a call center or a regional manager three states away.' },
      { lead: 'Built around your hours', body: 'We schedule around your operations so service never interrupts customers, diners, residents, or staff. Discreet vehicles, discreet technicians, zero disruption.' },
    ],
    faqs: [
      { q: 'How much does commercial pest control cost?', a: 'It depends on the facility — the size, the type of business, and the pest pressure. We quote every commercial program after walking the property so the number reflects your actual needs, with no surprise fees.' },
      { q: 'Will service disrupt my customers or operations?', a: 'No. We schedule around your hours, including before opening and after closing, and our technicians work discreetly so service doesn\'t interfere with customers, residents, or staff.' },
      { q: 'Do you provide documentation for health inspections?', a: 'Yes. We keep detailed service records, treatment logs, and pest-activity trend reports to support health inspections, third-party audits, and brand compliance requirements.' },
      { q: 'What types of businesses do you service?', a: 'Restaurants and food service, retail and grocery, offices and professional buildings, warehouses and distribution, medical and assisted-living facilities, and property management / multi-family communities, among others.' },
      { q: 'What about your products around customers and staff?', a: 'We use only EPA-registered products applied according to label directions, and we schedule and apply them with your customers and employees in mind — leaning on exclusion, sanitation, and monitoring first.' },
      { q: 'Can you handle multiple locations on one account?', a: 'Yes. Chains, franchises, and property portfolios get a single local point of contact and coordinated scheduling and reporting across every site in our service area.' },
      { q: 'How quickly can you respond to a pest emergency?', a: 'We prioritize commercial accounts with active issues — a sudden roach, rodent, or fly problem before a busy weekend or an inspection. Call (205) 940-6360 and we\'ll get a technician scheduled fast.' },
      { q: 'Do I have to sign a long-term contract?', a: 'We offer custom contracts built around your needs, including flexible service frequencies. We\'ll walk your facility and recommend a schedule that fits — monthly, bi-weekly, or weekly for high-risk food service.' },
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
