// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: data/services.ts
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
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

export type ServiceArt = 'pest' | 'termite' | 'mosquito' | 'tick' | 'fireant' | 'flea' | 'builder' | 'wdo' | 'commercial';

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
  /**
   * Contextual in-body links to deeper reference pages. Rendered as real
   * anchors in the server HTML so they are crawlable without JS — added
   * 2026-08-08 because /faq/mosquito and /faq/termite-warranty existed in the
   * sitemap while being linked from nowhere in the codebase.
   */
  relatedLinks?: { href: string; label: string; note: string }[];
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
    heroSubhead: 'Bi-monthly perimeter service against ants, roaches, spiders & 30+ pests. Unlimited free re-services, two ways to pay, family-owned since 1958.',
    features: [
      'Bi-monthly exterior treatment',
      '30+ common pests covered',
      'Re-service between visits',
      'Familiar local team, prioritized scheduling',
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
      { lead: 'Pay per visit', body: 'Pay as you go, every other month — we earn your business every time. Monthly plans use a 12-month ACH billing agreement with equal, averaged payments.' },
      { lead: 'Local technician', body: 'A local technician who gets to know your home — your dog\'s name, your gate code — visit after visit when scheduling allows.' },
      { lead: 'Familiar local team', body: 'A local crew that knows your area, with urgent issues prioritized.' },
    ],
    faqs: [
      { q: 'Why bi-monthly instead of quarterly?', a: 'Exterior barrier products typically wear down after about 60 days. A quarterly (90-day) plan leaves roughly a month each cycle with no active barrier — which is when pests return. Bi-monthly re-treats every 60 days, right as the previous application wears off, so there\'s no gap.' },
      { q: 'What pests does the regular service cover?', a: 'Ants, cockroaches, spiders, silverfish, crickets, earwigs, and the common occasional invaders. Fire ants, fleas, and ticks are handled as separate targeted treatments, and stinging insects like wasps, hornets, and carpenter bees are available to pest customers as an add-on for an additional charge.' },
      { q: 'How much does pest control cost?', a: 'About $35/month on auto-draft, or $70 per bi-monthly service. There\'s a quarterly option around $98, and the one-time initial service fee is $75.' },
      { q: 'What if pests show up between visits?', a: 'Let us know and we\'ll come back out between scheduled services.' },
      { q: 'Do you treat inside the home?', a: 'Our standard service focuses on the exterior perimeter to stop pests before they get in, and we treat interior areas as needed. Fleas specifically require a dedicated interior service.' },
    ],
    intro: [
      'Most pest problems aren\'t a one-time event — they\'re constant pressure from outside trying to get in. The real question isn\'t whether your home gets treated, it\'s whether the protective barrier is still working when the bugs show up. That\'s where EnviroCare\'s bi-monthly service is built differently, across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'Here\'s something most homeowners are never told: the exterior barrier products that keep pests out typically break down after about 60 days — sooner in Alabama heat, sun, and rain. A standard quarterly plan treats every 90 days, which leaves roughly a month each cycle where the barrier has worn off and nothing new has been applied. That gap is when the ants and roaches come back. Our bi-monthly service treats every 60 days, re-applying the barrier right as the previous treatment wears off, so there\'s no open window for pests to exploit.',
      'Our regular service handles the common household pests that pressure Alabama homes — ants (excluding fire ants), cockroaches, spiders, silverfish, crickets, earwigs, and wasps around the exterior. We treat the exterior perimeter — entry points, foundation, eaves, and the zones where pests get in — so we\'re stopping them before they\'re inside. If something does show up between visits, we\'ll come back out. Some pests need their own targeted treatment and aren\'t part of the standard plan: fire ants, fleas (an interior service), and ticks (a seasonal yard treatment).',
      'Straightforward pricing: about $35/month on auto-draft (ACH), or $70 per bi-monthly service. A quarterly option runs about $98, and the one-time initial service fee is $75. We serve Birmingham, Alabaster, Hoover, Mountain Brook, Vestavia Hills, Homewood, Trussville, and Chelsea; Huntsville, Madison, and Athens; and Alexander City, Lake Martin, and Auburn. A familiar local team handles your home whenever possible.',
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
    relatedLinks: [{ href: '/faq/termite-warranty', label: 'what the $1,000,000 damage repair coverage actually covers, subject to the terms of the agreement', note: 'Before you compare our termite protection against another company’s, it is worth reading' }],
    name: 'Termite Control',
    shortName: 'Termite',
    category: 'core',
    serviceArt: 'termite',
    price: 'Free inspection',
    priceSub: 'Sentricon® quote provided after free WDO inspection & approval',
    metaTitle: 'Alabama Termite Control & Sentricon® | EnviroCare $1M Coverage',
    metaDescription: 'Sentricon® Always Active™ termite protection. $1M repair coverage. No drilling, no tank trucks. Family-owned since 1958. Call (205) 940-6360.',
    heroEyebrow: 'Sentricon® Certified Specialist',
    heroTagline: 'Sentricon® Termite Protection',
    heroSubhead: 'Sentricon® Always Active™ bait stations protect your home from subterranean termites — with up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval. No drilling, no tank trucks, no concrete cutting.',
    features: [
      'Sentricon® Always Active™ system',
      'Up to $1,000,000 EnviroCare repair coverage',
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
      { q: 'What about during a real estate transaction?', a: 'We provide WDO (Wood-Destroying Organism) inspection letters for refinancing and home sales. One included per year on active accounts; otherwise $125 standalone fee.' },
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
    slug: 'mosquito',
    relatedLinks: [{ href: '/faq/mosquito', label: 'the mosquito service FAQ', note: 'Wondering how the 30-day barrier actually works, or when the season starts? We answer the questions we get most in' }],
    intro: [
      'From late spring through fall, mosquitoes are the reason a lot of Alabama families stop using their own backyard. Our warm, humid weather and frequent rain create exactly the standing water mosquitoes need to breed, so even a tidy yard can turn into a hatching ground. EnviroCare\'s seasonal mosquito program is built to push the population way down so you can get your evenings back — across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'Mosquitoes don\'t need much: a bottle cap of standing water is enough to breed, and our climate keeps the cycle going roughly March through October. They rest during the heat of the day in shaded, humid spots — under decks, in dense shrubs, along fence lines, and in tall grass — then come out for you at dusk. Our service targets both the adult mosquitoes resting in those harborage areas and the breeding sites where the next generation is developing.',
      'We treat your property on a recurring schedule through the season — about eight treatments from March through October — and each visit knocks the active population back down and disrupts the breeding cycle before it rebuilds. One honest note: no legitimate company can promise to eliminate every mosquito, because they fly in from neighboring yards and common areas. What our program reliably does is significantly reduce the mosquito pressure on your property so the yard is comfortable and usable again. Every treatment uses EPA-registered products applied strictly according to label directions.',
      'Pricing is simple and predictable: the mosquito program is $45 a month for an average-size yard, covering eight treatments March through October, and ACH spreads it evenly across the year. Your firm price comes after a free inspection, because yard size drives it. If your yard backs up to woods, a field, or tall grass, ask about Mosquito + Tick — the same program plus tick and chigger coverage — at about $65 per month. The tick add-on does not cover fleas; fleas are a separate interior-access service.',
      'We provide seasonal mosquito control across our service area, including Birmingham, Huntsville, Madison, Decatur, Vestavia Hills, Pelham, Alabaster, and Chelsea. River-adjacent and wooded areas — like Decatur on the Tennessee River or the hillside lots in Vestavia Hills — tend to see the heaviest pressure and benefit most from starting early in the season.',
    ],
    name: 'Mosquito Control',
    shortName: 'Mosquito',
    category: 'core',
    serviceArt: 'mosquito',
    price: '$45/mo',
    priceSub: 'Average-size yard · 8 treatments Mar–Oct',
    metaTitle: 'Mosquito Control in Birmingham & Huntsville, AL | EnviroCare',
    metaDescription: 'Seasonal mosquito control (Mar–Oct) that significantly reduces yard mosquitoes. ACH spreads it across the year. Add tick & chigger coverage. Call (205) 940-6360.',
    heroEyebrow: 'Take Back Your Yard',
    heroTagline: 'Mosquito Barrier Treatment',
    heroSubhead: '30-day yard barrier treatments March through October. Make your patio livable and your evenings outdoor again.',
    features: [
      '30-day refresh cycle',
      'March through October coverage',
      'Applied according to label directions once dry',
      '8 treatments per season',
      'Free re-treatment if needed',
    ],
    includes: [
      { title: 'Yard Barrier Application', desc: 'Targeted mist application to shrubs, eaves, fence lines, and harborage areas where mosquitoes rest.' },
      { title: 'Special Events Bonus', desc: 'Pre-event knockdown applications for backyard weddings, parties, or holidays at no extra charge.' },
      { title: 'Standing Water Inspection', desc: 'We identify breeding spots on your property and recommend fixes — gutters, planters, kiddie pools, etc.' },
      { title: 'EPA-Registered', desc: 'EPA-registered pyrethroids applied per label. Re-entry per label directions.' },
    ],
    wedgePoints: [
      { lead: 'Built for Alabama', body: 'Our mosquito season runs March through October, not the generic "warm months." We schedule accordingly.' },
      { lead: 'Pairs with tick control', body: 'The same visit can handle ticks — and chiggers — as Mosquito + Tick ($65/month). One trip, one invoice.' },
      { lead: 'No surprise charges', body: 'Flat monthly rate covers all season applications. Free re-treatments if mosquitoes return between visits.' },
    ],
    faqs: [
      { q: 'When is mosquito season in Alabama?', a: 'Roughly March through October. Our program runs about eight treatments across that window so your property stays covered for the whole season.' },
      { q: 'Do you guarantee I won\'t have any mosquitoes?', a: 'No honest company can — mosquitoes fly in from neighboring yards and common areas. What our seasonal program does is significantly reduce the mosquito population on your property so the yard is comfortable and usable again.' },
      { q: 'How much does mosquito control cost?', a: '$45 a month for an average-size yard, covering eight treatments March through October, with ACH spreading it evenly across the year. The mosquito + tick option (which also covers chiggers) is $65 a month. Your firm price comes after a free inspection.' },
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
      'In central Alabama the mix is mostly lone star and American dog ticks, and lone star bites are the ones linked to alpha-gal syndrome, the red-meat allergy. Alabama ticks are also associated with Rocky Mountain spotted fever and ehrlichiosis; Lyme disease does occur in the Southeast, though spotted fever and ehrlichiosis are the better-documented risks in this region. Most tick bites transmit nothing, and none of this is meant to alarm — it is simply why cutting down tick encounters in your own yard, checking kids and pets after they\'ve been outside, and removing an attached tick promptly are all worth taking seriously.',
      'Tick control is a seasonal yard treatment, most often run alongside our mosquito program as a combined mosquito + tick service through the season (roughly March through October). One honest note, same as with mosquitoes: we can\'t guarantee zero ticks, because wildlife reintroduces them constantly. What our program reliably does is significantly reduce tick pressure around your property so the yard is far safer to use. We use EPA-registered products applied strictly according to label directions.',
      'Why this matters more than comfort: Alabama ticks are associated with Rocky Mountain spotted fever, ehrlichiosis, and alpha-gal syndrome — the red-meat allergy linked to lone star tick bites. Lyme disease gets the headlines nationally and does occur in the Southeast, though the better-documented risks in this region are spotted fever and ehrlichiosis. None of that is meant to alarm — most tick bites transmit nothing — but it is why reducing tick encounters in your own yard is worth taking seriously, and why prompt, careful tick removal and a tick check after time outdoors matter for your family and your pets.',
      'Pricing: tick control is most commonly delivered as the mosquito + tick yard program — about $65 per month, roughly eight treatments March through October. That option also covers chiggers, but does not cover fleas (a separate interior-access service). Want tick coverage on its own or a one-time treatment? Call and we\'ll quote it for your property.',
    ],
    name: 'Tick Control',
    shortName: 'Tick',
    category: 'core',
    serviceArt: 'tick',
    price: 'About $65/mo',
    priceSub: '~$65/month Mosquito + Tick · chiggers covered',
    metaTitle: 'Tick Control in Birmingham, AL | Yard Treatment | EnviroCare',
    metaDescription: 'Seasonal tick control that significantly reduces yard ticks & chiggers. Quoted with mosquito. Birmingham & across Alabama. Call (205) 940-6360.',
    heroEyebrow: 'Protect Family & Pets',
    heroTagline: 'Tick Yard Control',
    heroSubhead: 'Targeted yard applications to break the tick lifecycle. Critical for wooded lots, waterfront properties, and homes with kids or dogs that play outside.',
    features: [
      'Lone Star, Dog & Deer ticks',
      'Harborage-zone targeting',
      'Applied according to label directions once dry',
      'Runs with your mosquito visit',
      'Free re-treatment if needed',
      'Reduces tick pressure around the yard',
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
      { lead: 'Lower tick pressure where you live', body: 'Ticks are a real nuisance on wooded and waterfront Alabama lots. Our program targets the harborage zones where they concentrate so your yard is far more comfortable to use.' },
    ],
    faqs: [
      { q: 'Why should you never squish a tick?', a: 'Crushing an attached tick can force its stomach contents back into the bite, which is exactly the route tick-borne bacteria travel. Pull it straight out instead: fine-tipped tweezers as close to the skin as you can get, steady upward pressure, no twisting and no petroleum jelly or a hot match. Clean the bite, and keep the tick in a sealed bag if you want it identified later. In Jefferson County the species worth identifying are the lone star tick and the American dog tick.' },
      { q: 'Are ticks a bad problem in Birmingham and Jefferson County?', a: 'Yes — the metro sits in prime habitat. Jefferson and Shelby County yards back onto wooded ridges (Red Mountain, Shades Mountain, the Cahaba corridor), and deer, rodents and stray animals carry ticks across property lines all season. Over-the-mountain neighborhoods with mature tree lines see the heaviest pressure, and the transition zone where lawn meets woods is where most bites are picked up.' },
      { q: 'What tick species are common around Birmingham?', a: 'Three dominate central Alabama. The lone star tick is the most common and is the one linked to alpha-gal syndrome, the red-meat allergy. The American dog tick is the main carrier of Rocky Mountain spotted fever here. The blacklegged (deer) tick is present but less common in this part of the state. Ehrlichiosis is associated with the lone star tick as well.' },
      { q: 'Where do ticks hide in a yard?', a: 'Not in open, sunny turf — ticks dry out there. They sit in the shaded, humid edges: the leaf litter where lawn meets woods, tall grass along fence rows, ground cover and ivy, wood piles, and the shrub line against the house. That is where a yard treatment is targeted, because treating the middle of a mowed lawn accomplishes very little.' },
      { q: 'What should I do first if my yard is full of ticks?', a: 'Start with the habitat, because it works immediately and costs nothing: mow, clear leaf litter, cut back the brush line, and put a dry mulch or gravel border between the woods and the lawn. Then get the edges and transition zones treated on a schedule — a single application does not hold through an Alabama season. Your veterinarian handles prevention on the pets themselves; the yard and the animals have to be covered together or ticks shuttle between them.' },
      { q: 'When is tick season in Alabama?', a: 'Ticks are most active from spring through fall, overlapping mosquito season. Our combined program runs about eight treatments from March through October to cover that window.' },
      { q: 'How much does tick control cost?', a: 'It\'s most commonly run as the mosquito + tick program — about $65 per month. That option also covers chiggers.' },
      { q: 'Does the tick service cover fleas?', a: 'No. The mosquito + tick yard program covers ticks and chiggers. Fleas are handled separately as an interior-access service.' },
      { q: 'Can you guarantee I won\'t have any ticks?', a: 'No honest company can — wildlife and neighboring properties reintroduce ticks constantly. Our program significantly reduces tick pressure around your yard so it\'s much safer to use.' },
      { q: 'What diseases do ticks carry in Alabama?', a: 'Alabama ticks are associated with Rocky Mountain spotted fever, ehrlichiosis, and alpha-gal syndrome — the red-meat allergy linked to lone star tick bites. Lyme disease does occur in the Southeast, though spotted fever and ehrlichiosis are the better-documented risks in this region. Most tick bites transmit nothing, but prompt removal and a tick check after time outdoors are still the right habit.' },
      { q: 'When should tick treatments start?', a: 'March. Ticks are active well before summer feels like summer in Alabama, and starting early keeps the season\'s population from getting established.' },
      { q: 'What can I do to reduce ticks myself?', a: 'Keep grass short, clear leaf litter and tall weeds at the yard edges, put a dry mulch or gravel barrier between the lawn and the woods, and move woodpiles and brush away from play areas. Check kids and pets after they\'ve been in the yard, wear long sleeves on hikes and in genuinely wooded areas, and keep pets on a vet-recommended tick preventive — that covers both directions ticks travel.' },
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
    metaDescription: 'Fire ant treatment that reaches the queen, not just the mound. $150 for most yards, one-year warranty. Open to all. Birmingham & across Alabama. (205) 940-6360.',
    heroEyebrow: 'Critical For Lake Homes',
    heroTagline: 'Fire Ant Control',
    heroSubhead: 'Yard-wide elimination, not just spot mound treatment. Built for Alabama families who actually use their yards — kids, dogs, barefoot summer.',
    features: [
      'Yard-wide elimination',
      'Backed by a one-year warranty',
      'Applied per label directions',
      'Pairs with pest control',
      'Especially critical for lake homes',
      'Familiar local team, prioritized scheduling',
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
      { q: 'How much does fire ant control cost?', a: '$150 covers most yards. Larger properties are quoted by the square footage we treat, and your technician gives you the number up front before any work starts. Every fire ant treatment is backed by a one-year warranty.' },
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
      'You do not need a pet to get fleas, and plenty of Birmingham homes without a cat or dog end up with them. Squirrels, raccoons, opossums, stray cats, and rodents all carry fleas through yards, crawlspaces, and attics, and they leave eggs where they travel. Buy a house whose previous owner had animals and dormant pupae can hatch weeks after closing, into what looks like an empty home. If you are being bitten and have no pets, the source is almost always a previous animal or the wildlife moving through - and finding that source is the first step of the treatment, not an afterthought.',
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
      'Familiar local team, prioritized scheduling',
    ],
    includes: [
      { title: 'Interior Treatment', desc: 'Targets the eggs, larvae, and pupae in carpet, along baseboards, and in pet bedding — where most of the flea population actually lives.' },
      { title: 'Life-Cycle Disruption', desc: 'Knocks down adult fleas and interrupts the cycle so the next generation doesn\'t mature and re-infest.' },
      { title: 'Built On The Interior Plan', desc: 'Flea treatment is a +$30/quarter add-on to our $98/quarter interior service ($128/quarter total) — because the inside stages are where infestations live. Best paired with your vet\'s pet treatment.' },
    ],
    wedgePoints: [
      { lead: 'Home, not just pet', body: 'Your vet treats the dog. We treat the home — carpet, baseboards, bedding — so the environment stops re-infesting the pet.' },
    ],
    faqs: [
      { q: 'Is it worth hiring an exterminator for fleas?', a: 'If store foggers and sprays have already failed, yes — and the reason they failed is the reason professional treatment works. Adult fleas are only about five percent of an infestation; the eggs, larvae and pupae in your carpet and pet bedding are the other ninety-five, and a fogger does not reach them. A quarterly plan that interrupts the life cycle usually costs less than months of repeat store products that only kill the adults you can see.' },
      { q: 'How do I get rid of fleas in my home?', a: 'Three things at once, or it does not hold. Treat the interior of the home where the eggs and larvae actually develop — carpet, rugs, pet resting areas, upholstery edges, baseboards. Treat the pets the same week through your veterinarian. And vacuum daily, emptying the canister outside, because the vibration triggers protected pupae to hatch onto treated surfaces. Skip any one of the three and the fleas come back.' },
      { q: 'What is the process for professional flea treatment?', a: 'A licensed technician inspects first to confirm fleas and find the source — pets, wildlife under the house, or animals a previous owner kept. Treatment is interior and targeted at the developing stages, using EPA-registered products applied according to label directions. Seeing some fleas for a week or two afterward is normal: pupae are protected until they hatch, and they die on contact with the treated surface. The quarterly cadence keeps the cycle from rebuilding.' },
      { q: 'Do I need flea control if I have no pets?', a: 'Sometimes, yes. Squirrels, raccoons, opossums, stray cats and rodents carry fleas through yards, crawlspaces and attics and drop eggs where they travel. Buy a home whose previous owner had animals and dormant pupae can hatch weeks after closing into an empty house. If you are being bitten and own no pets, finding the source is the first step of treatment, not an afterthought.' },
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
      'Builder partnership pricing',
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
      '$125 standalone fee',
      'Includes recommendations if active issues',
    ],
    includes: [
      { title: 'Full WDO Inspection', desc: 'Trained inspector checks all accessible areas for subterranean termites, drywood termites, powderpost beetles, and wood-decay fungi.' },
      { title: 'Official Letter', desc: 'The Official Alabama Wood Infestation Inspection Report, accepted by VA, FHA, and conventional lenders.' },
      { title: 'Photos & Recommendations', desc: 'If we find active infestation or conducive conditions, you get photos and a treatment quote so you can negotiate at closing.' },
    ],
    wedgePoints: [
      { lead: 'Built around your closing', body: 'Tell us the closing date when you book and we will work to it.' },
      { lead: 'Trusted by AL lenders', body: 'Our WDO letters are accepted by every Alabama lender we\'ve dealt with — no surprises at closing.' },
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
    slug: 'commercial',
    intro: [
      'A pest problem at your business isn\'t just a nuisance — it\'s a threat to your reputation, your health-inspection score, and your bottom line. EnviroCare provides discreet, dependable commercial pest control for Alabama businesses, with the documentation and flexible scheduling that operators and property managers actually need, across Birmingham, Huntsville, Lake Martin, and Auburn.',
      'We work with a wide range of commercial properties — restaurants and food service, retail and grocery, offices and professional buildings, warehouses and distribution, property management and multi-family, and medical and assisted-living facilities. Every facility is different, so every commercial program starts with a walkthrough of your property rather than a one-size-fits-all package.',
      'Service includes a program built around your facility, flexible scheduling that works around your hours so service never disrupts customers or operations, service documentation and pest logs to support health inspections and audits, discreet professional technicians, and EPA-registered products applied strictly according to label directions. A familiar local team handles your account whenever possible, so the people servicing your property actually know your facility.',
      'We\'re a four-generation Alabama family company, and commercial accounts get the same responsiveness our residential customers count on — direct local phone numbers, real technicians, and follow-through. For restaurants, food handling, healthcare, and multi-family properties, we keep clear service records and pest activity logs so you\'re ready for a health inspection or third-party audit at any time. Every commercial program is quoted after a walkthrough of your property.',
      'What actually shows up in a commercial building: cockroaches follow food and moisture into kitchens, break rooms, and floor drains. Rodents — mice and rats both — come in through dock doors and utility penetrations as nights cool, and they chew what they find. Ants work dumpster pads and kitchens through mild Alabama winters. Wasps and yellow jackets build at entries and signage, right where they meet your customers. Mosquitoes hold patios and outdoor dining from March through October. And termites work commercial buildings the same way they work houses — quietly, from the soil up.',
      'Commercial termite protection is handled the same way it is on a home, and it is worth asking about separately: termites work every building in Jefferson County from the soil up, quietly, and a commercial slab gives no warning before the damage is structural. EnviroCare is a Sentricon Certified Specialist, and commercial buildings on Sentricon Always Active bait stations carry up to $1,000,000 in damage repair coverage, subject to the terms of the agreement. No drilling through finished floors and no tank trucks in the parking lot — the stations go into the soil around the building and are monitored on a schedule. Priced after the same free walkthrough.',
      'How an account gets set up: a licensed technician walks the building first — kitchens, storage, dock, roofline, dumpster pad, landscaping — and identifies the pressure points before anything is quoted. You get a written scope and schedule matched to your industry, your building, and your inspection requirements; monthly and bi-monthly are both common, and food service usually runs more frequent. Treatment is exterior-first at entry points, the foundation line, and the perimeter, with interior work where the situation calls for it. Re-service between scheduled visits is included, so if activity returns you call and we come back out. A 1,200-square-foot cafe and a 40,000-square-foot warehouse are not the same job, which is why nobody should quote either one sight unseen.',
    ],
    name: 'Commercial Service',
    shortName: 'Commercial',
    category: 'specialty',
    serviceArt: 'commercial',
    metaTitle: 'Commercial Pest Control in Birmingham, AL | EnviroCare',
    metaDescription: 'Discreet commercial pest control for Alabama restaurants, retail, offices & multi-family. Flexible scheduling & inspection-ready logs. (205) 940-6360.',
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
      { q: 'What commercial pest control services are available in Birmingham, AL?', a: 'EnviroCare covers the Birmingham metro from our Alabaster office at 2025 Butler Rd — call (205) 940-6360. Commercial work is a scheduled perimeter and interior program built around your facility: routine service on a set frequency, monitoring and documentation for inspections, Sentricon® Always Active™ termite protection, and rodent work built around exclusion rather than bait alone. The Wedgworth family has served Alabama businesses since 1958, now in the fourth generation.' },
      { q: 'What pests do commercial pest control services treat?', a: 'The full Alabama commercial range: German cockroaches in kitchens, break rooms and floor drains; ants; rodents entering through dock doors and utility penetrations; spiders; wasps and hornets on the exterior; stored-product pests in dry goods; and subterranean termites in the structure itself. German roach work is a two-step job — a clean-out followed by a mandatory return visit — because a single treatment does not clear an established population.' },
      { q: 'How do I schedule a commercial pest inspection or get an estimate?', a: 'Call the Birmingham office at (205) 940-6360 and a licensed technician walks the facility before anyone quotes a number. Commercial pricing depends on square footage, the type of operation and the service frequency, so there is no list price — the inspection is what produces a firm figure, and it is free. You get the number in writing before work starts.' },
      { q: 'What should I look for when choosing a commercial pest control company?', a: 'Four things. A licensed technician who inspects before quoting rather than pricing over the phone. Written service records and pest activity logs you can hand an inspector. A named local office you can reach, not a call-center queue. And an integrated approach that fixes conditions — sanitation, exclusion, moisture — instead of only spraying. Ask any company how they handle a failed treatment between visits before you sign.' },
      { q: 'How often does a commercial property need pest control?', a: 'Most Birmingham facilities run monthly. Food service, healthcare and anything under a health inspection regime almost always do, because the documentation trail matters as much as the treatment. Lower-risk offices, retail and warehouse space often run quarterly or bi-monthly. The inspection sets the frequency — the goal is service often enough that problems never establish between visits.' },
      { q: 'How much does commercial pest control cost?', a: 'It depends on the facility — the size, the type of business, and the pest pressure. We quote every commercial program after walking the property so the number reflects your actual needs.' },
      { q: 'Will service disrupt my customers or operations?', a: 'No. We schedule around your hours and our technicians work discreetly, so service doesn\'t interfere with customers or staff.' },
      { q: 'Do you provide documentation for health inspections?', a: 'Yes. We keep service records and pest activity logs to support health inspections, audits, and compliance requirements.' },
      { q: 'What types of businesses do you service?', a: 'Restaurants and food service, retail, offices, warehouses, medical and assisted-living facilities, and property management / multi-family communities, among others.' },
      { q: 'What about your products around customers and staff?', a: 'We use only EPA-registered products applied according to label directions, and we schedule and apply them with your customers and employees in mind.' },
      { q: 'Do you handle commercial termite protection?', a: 'Yes. Sentricon® Always Active™ bait stations, installed and monitored by a Sentricon® Certified Specialist, with up to $1,000,000 in EnviroCare-backed damage repair coverage, subject to the terms of the agreement. Priced after inspection.' },
      { q: 'What if pests come back between scheduled visits?', a: 'Call and we come back out. Re-service between scheduled visits is included on commercial accounts.' },
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
