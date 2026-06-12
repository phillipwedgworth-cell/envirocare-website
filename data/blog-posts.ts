/**
 * Blog posts — seeded with 5 high-value Alabama-specific SEO posts.
 * Real content, ranking-friendly, brand-aligned.
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO
  author: string;
  category: string;
  readMinutes: number;
  heroEmoji: string;
  metaTitle: string;
  metaDescription: string;
  body: string; // HTML
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'alabama-termite-swarm-season',
    title: 'Why Alabama Termite Season Starts in March — And What to Watch For',
    excerpt: 'Every March, subterranean termite swarmers emerge across Alabama. Here\'s how to spot them, why Birmingham\'s clay soil makes it worse, and what we recommend.',
    publishedAt: '2026-03-04',
    author: 'Kevin Wedgworth',
    category: 'Termites',
    readMinutes: 6,
    heroEmoji: '🪵',
    metaTitle: 'Alabama Termite Swarm Season Guide | EnviroCare Since 1958',
    metaDescription: 'Alabama termite swarm season peaks March–May. Spot the signs, protect your home with Sentricon® $1M coverage. Free inspection. Call (205) 940-6360.',
    body: `
<p class="lede">If you live in Alabama and you've never seen a termite swarm, you will. They show up like clockwork — sometime between mid-March and late May, on the first warm humid afternoon after a soaking rain. Hundreds of winged insects boiling up out of a stump, a porch column, or worse, a baseboard inside your living room.</p>

<p>That's what we get the most calls about every spring. So here's what's actually happening, why Alabama gets hit harder than most states, and what we tell every customer when they call.</p>

<h2>Why March?</h2>

<p>Subterranean termites — the ones that cause 95% of the damage in our state — live in colonies hundreds of thousands strong, deep underground. They eat year-round, but they only <em>reproduce</em> when conditions are exactly right: soil temperature above 70°F, recent rainfall, warm humid afternoon air.</p>

<p>In Birmingham, that combination usually shows up in the second or third week of March. Down in Auburn it can hit a week earlier. In Huntsville, sometimes a week later. But by April, every county we serve is in peak swarm.</p>

<h2>What you'll actually see</h2>

<p>A termite swarmer looks almost identical to a flying ant — about half an inch long, dark brown, with four wings. The easy tell: termite wings are all the same length, and they break off easily. If you find a pile of identical translucent wings on a windowsill or near a baseboard, you have termites. Not "you might." You do.</p>

<p>The swarmers themselves don't bite, don't sting, don't damage anything. They're just looking for a mate so they can start a new colony. The damage is being done by the workers underground — the ones you'll never see.</p>

<h2>Why Birmingham gets it worse</h2>

<p>Two reasons. First, our red clay soil holds moisture for weeks after rain. That's perfect for termites — they need constant moisture to survive. Second, our housing stock skews old. A lot of homes in Forest Park, Mountain Brook, Crestwood, and Vestavia were built before subterranean termite treatment was even routinely required. The wood-to-soil contact in those old foundations is exactly what termites are hunting for.</p>

<p>Newer construction in Trussville, Helena, and Greystone gets pre-treated at the slab pour, but pre-treat warranties typically expire after 5 years. After that, the home is on its own unless the owner signs up for ongoing protection.</p>

<h2>What we recommend</h2>

<p>We've been treating Alabama termites since 1958. For three generations, the company my grandfather started has tried every method the industry has thrown at homeowners — chlordane (banned), Dursban (banned), liquid soil barriers, foaming agents, baits. The one that consistently works in our clay soil is <strong>Sentricon® Always Active™</strong>.</p>

<p>It's a bait station system. We install monitoring stations every 10–15 feet around your foundation. When termites find the stations (they always do — they're constantly foraging), they take the bait back to the colony, and the entire colony collapses. No drilling into your slab. No tank trucks. No chemicals injected into the soil under your kids' play area.</p>

<p>Sentricon is backed by a $1,000,000 damage repair warranty from Corteva — the manufacturer. If termites cause damage to your home while we're protecting it, that's covered.</p>

<h2>If you find swarmers in your house</h2>

<p>Don't panic. Don't bug-bomb the room. Don't try to scrub them up before "they get worse." Take three steps:</p>

<ol>
<li><strong>Photograph</strong> what you found — both the swarmers and the location.</li>
<li><strong>Collect a few</strong> in a sandwich bag, just in case.</li>
<li><strong>Call us</strong> for a free inspection. We'll send a Sentricon-certified technician within 24 hours, usually fast scheduling. The inspection is free and there's no obligation.</li>
</ol>

<p>Call our nearest office:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>

<p><em>Kevin Wedgworth is the third-generation owner of EnviroCare Pest &amp; Termite Services, founded by his grandfather Phillip M. Wedgworth in Alexander City, Alabama, in 1958.</em></p>
`,
  },

  {
    slug: 'sentricon-vs-liquid-termite-treatment',
    title: 'Sentricon vs. Liquid Termite Treatment: What\'s Actually Different?',
    excerpt: 'The pest control industry will sell you either a Sentricon bait system or a liquid soil barrier. Here\'s an honest comparison from a company that\'s done both.',
    publishedAt: '2026-02-18',
    author: 'Kevin Wedgworth',
    category: 'Termites',
    readMinutes: 5,
    heroEmoji: '🛡️',
    metaTitle: 'Sentricon vs Liquid Termite Treatment | Honest Comparison',
    metaDescription: 'Alabama Sentricon vs liquid termite barrier — which is better for your home? Real pros and cons from a Sentricon® Certified Specialist since 1958.',
    body: `
<p class="lede">When a pest control company shows up to inspect your home for termites, you're going to be offered one of two paths: a Sentricon® bait system, or a liquid soil termiticide barrier (Termidor, Premise, Bifen). The salesperson is going to be very confident their option is best. So let me try to be straight with you.</p>

<h2>The short version</h2>

<p>For 98% of Alabama homes, Sentricon is the better choice. Here's why — and here's where liquid still has a place.</p>

<h2>How each one actually works</h2>

<p><strong>Liquid termiticide</strong> is exactly what it sounds like. The technician digs a 6-inch trench around your foundation, or drills through your concrete slab every 12 inches, and injects gallons of termiticide into the soil. The treated soil becomes a barrier — termites that try to cross it either die or are repelled. To do it right on a typical 2,000 sq ft home requires 100–300 gallons of finished solution.</p>

<p><strong>Sentricon®</strong> is a bait system. We install plastic monitoring stations every 10–15 feet around your foundation, just below the soil surface. Inside each station is a bait matrix that contains noviflumuron — an insect growth regulator that's about 10,000 times more toxic to termites than to mammals. Workers find the bait, take it back to the colony, and feed it to the queen and the rest. The colony dies within a few months.</p>

<h2>Where Sentricon wins</h2>

<ul>
<li><strong>No drilling.</strong> We don't punch holes through your stamped concrete patio, your finished basement floor, or your driveway.</li>
<li><strong>No tank trucks.</strong> No 300-gallon tank parked in your driveway pumping chemicals into the soil under your kids' swing set.</li>
<li><strong>Colony elimination, not just deterrence.</strong> Liquid creates a barrier — if the colony moves around it (and they do), you have a new infestation. Sentricon kills the source.</li>
<li><strong>$1,000,000 repair warranty.</strong> Corteva backs Sentricon with damage repair coverage that most liquid products simply don't offer.</li>
<li><strong>Slow learning curve for termites.</strong> Modern termiticides like Termidor are non-repellent — termites can't detect them. That sounds great. But it means termites will continue to forage through treated soil for weeks until they die, sometimes finding gaps in the barrier first.</li>
</ul>

<h2>Where liquid still wins</h2>

<ul>
<li><strong>Active infestations with structural damage.</strong> If you have visible swarmers inside the house and damaged wood, a liquid spot-treatment combined with Sentricon is often the fastest path to "no more termites in my living room tonight."</li>
<li><strong>Pre-construction.</strong> When a builder pre-treats a new home before the slab pour, liquid termiticide in the soil under the slab is still the standard.</li>
<li><strong>Pier-and-beam homes with low crawlspaces</strong> can sometimes benefit from a partial liquid treatment along sill plates where bait stations can't reach.</li>
</ul>

<h2>The honest downside of Sentricon</h2>

<p>Sentricon takes longer to work the first time. If you have active termites in the wall today, the stations will reduce that colony — but it can take 90 days for full elimination. During that time, the population in your wall is still feeding. We treat that gap with a targeted liquid spot-treatment to the active area while the bait stations do the long-term work.</p>

<p>Sentricon is also slightly more expensive in year one. Our pricing: $325 installation (includes year one) plus $380 annual renewal, or $32/month spread across the year. Liquid is typically a single up-front $1,200–$2,000 charge for a five-year warranty. After year five, most homeowners renew Sentricon and walk away from liquid because the soil treatment has degraded.</p>

<h2>What we actually do</h2>

<p>EnviroCare has been a Sentricon® Certified Specialist since the system was approved for residential use. Three generations of my family have treated termites in this state — my grandfather started the company in 1958 with a single truck and a chlordane sprayer. We've used every method the industry has thrown at us, and Sentricon is what we recommend now.</p>

<p>Free inspection. Call the office nearest you:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'lake-martin-mosquito-guide',
    title: 'The Lake Martin Mosquito Survival Guide',
    excerpt: 'If you own a home on Lake Martin, you know August evenings on the dock are a war zone. Here\'s our 30-day yard-barrier system, and what NOT to spend money on.',
    publishedAt: '2026-04-22',
    author: 'Kevin Wedgworth',
    category: 'Mosquito Control',
    readMinutes: 5,
    heroEmoji: '🦟',
    metaTitle: 'Lake Martin Mosquito Control Guide | EnviroCare Since 1958',
    metaDescription: 'Lake Martin mosquito control. 30-day yard barrier service March–November. Family-owned, EPA-registered. Reclaim your dock. Call (256) 234-6162.',
    body: `
<p class="lede">Lake Martin is paradise from March through November — until the sun goes down. Then it's a no-fly zone unless you're a mosquito, in which case it's an all-you-can-eat buffet.</p>

<p>Our Alex City office has been treating lake homes since 1958. Here's what actually works, what doesn't, and how to think about mosquito control if you live (or weekend) on the water.</p>

<h2>Why Lake Martin is worse</h2>

<p>Mosquitoes need standing water to breed. Lake Martin doesn't <em>have</em> standing water — it's a massive flowing reservoir. But the lake itself is irrelevant. What matters is:</p>

<ul>
<li><strong>Tree holes</strong> in mature hardwoods around your lot — they hold water for weeks.</li>
<li><strong>Boat covers and tarps</strong> that collect a half-inch of rainwater.</li>
<li><strong>Decorative containers, kayak hulls, dog bowls.</strong></li>
<li><strong>Clogged gutters.</strong> Probably the #1 source we find.</li>
<li><strong>Stagnant cove edges</strong> where the lake's main flow doesn't reach — algae mats become breeding grounds.</li>
</ul>

<p>A mosquito only needs a bottle cap of water and seven days to go from egg to biting adult. One stagnant boat cover can produce thousands of mosquitoes per week.</p>

<h2>What we do — 30-day yard barrier</h2>

<p>We treat the perimeter of your property and the harborage zones — the shaded undersides of decks, the boathouse rafters, the hedge lines, the tree canopy up to about 20 feet. The product binds to leaf surfaces and kills mosquitoes that land. After 21 days, UV breakdown degrades it and we come back.</p>

<p>March through November. 9 treatments per season. $45/month, or add tick (chiggers covered) in the Outdoor Pro plan at $49/month.</p>

<h2>What we DON'T recommend</h2>

<p><strong>Bug zappers.</strong> They're great at killing moths and harmless beetles. Studies have shown bug zappers kill mosquitoes at a rate of about 0.13% of their total catch. They are a moth-frying machine and that's it.</p>

<p><strong>Citronella candles.</strong> Effective in a 2-foot radius if there's no wind. On a dock with a lake breeze, useless.</p>

<p><strong>Ultrasonic repellents.</strong> Don't work. The FTC has actually taken multiple manufacturers to court over false claims. Mosquitoes do not navigate by sound.</p>

<p><strong>Bat houses.</strong> We love bats. Bats love bats. Mosquitoes are about 1% of a bat's diet. A single bat eats maybe 4–8 mosquitoes per night while eating thousands of moths and beetles. Worth installing for the ecosystem; don't expect a mosquito-free lakefront.</p>

<h2>What you can do yourself, between our visits</h2>

<ol>
<li>Walk the property every week and dump anything holding water. Pay attention to tarps, kid toys, kayaks turned upright.</li>
<li>Clean gutters in early April and again in late August.</li>
<li>Treat tree holes with a copper sulfate tablet or fill with expanding foam.</li>
<li>Run a box fan on the dock. Mosquitoes are weak fliers — a moderate breeze blows them away. Cheap and effective.</li>
<li>For body protection, picaridin lotion is as effective as DEET and doesn't melt your sunglasses.</li>
</ol>

<h2>Tick and flea bundle</h2>

<p>If you're on the lake, you also have ticks. Every wooded lot in Tallapoosa County has Lone Star ticks and Dog ticks. Our standard recommendation for lake homes is the Outdoor Bundle: mosquito + tick yard treatment with chigger coverage, $49/month, March through November.</p>

<p>Call our Alex City / Lake Martin office: <strong>(256) 234-6162</strong>.</p>
`,
  },

  {
    slug: 'fire-ants-alabama-summer',
    title: 'Fire Ants in Alabama: Why They Get Worse Every Summer, and How to Actually Kill Them',
    excerpt: 'Spot treatment doesn\'t work. Mound drenching barely works. Here\'s what does — and why fire ants love Alabama more than almost anywhere in the U.S.',
    publishedAt: '2026-05-10',
    author: 'Kevin Wedgworth',
    category: 'Fire Ants',
    readMinutes: 4,
    heroEmoji: '🌻',
    metaTitle: 'Alabama Fire Ant Control | EnviroCare Yard Treatment',
    metaDescription: 'Alabama fire ant control. Yard-wide elimination, not spot treatment. Critical for lake homes and barefoot families. Family-owned. Call (205) 940-6360.',
    body: `
<p class="lede">Fire ants did not exist in Alabama before 1940. They came up from South America through the Port of Mobile, and within 80 years they've colonized every county in the state. There are now more fire ants per acre in Alabama than there are people in the country.</p>

<p>Most people fight them wrong. Let me explain.</p>

<h2>Why spot treatment fails</h2>

<p>When you see a fire ant mound and pour boiling water on it, or hit it with grits, or dump granular insecticide on top — you're killing the surface workers. The queen is two feet below the surface. She doesn't die, and she doesn't even slow down egg production. Worse: if she senses a threat, she <em>relocates</em> the colony 8 to 30 feet away within 24 hours. You'll see a new mound next week.</p>

<p>This is why fire ant mounds seem to "follow you" around the yard.</p>

<h2>Why yard-wide bait treatment works</h2>

<p>The right approach is to treat the entire yard with a bait that the workers carry back to the queen voluntarily. The bait must:</p>

<ul>
<li>Be slow-acting (workers must survive long enough to share with the queen).</li>
<li>Be attractive to fire ants specifically — not a generic ant bait that gets ignored.</li>
<li>Be applied during the active foraging window — 70°F to 90°F, with no rain in the next 24 hours.</li>
</ul>

<p>We use a granular bait product applied across the whole yard, typically at 1 to 1.5 pounds per acre. Workers find it within 30 minutes, harvest it, take it underground, and the colony collapses over 4 to 8 weeks. Treated yards stay clear for 12 to 18 months.</p>

<h2>Why lake homes are worse</h2>

<p>Lake Martin, Smith Lake, Wheeler Lake, Logan Martin — every reservoir in Alabama has heavy fire ant pressure on the surrounding lots. Two reasons. First, fire ants thrive in disturbed soil — and lakefront construction disturbs a lot of soil. Second, mound flooding during high-water periods causes <em>rafting</em> — entire colonies clump into living balls and float to dry ground. Those rafts wash up on your lot, dry out, and become new mounds.</p>

<p>If you have a lake home and kids who go barefoot, fire ant control is not optional. A single sting won't kill anyone (unless they have a severe allergy), but 50 stings on a 4-year-old's foot is a trip to the emergency room.</p>

<h2>When to schedule treatment</h2>

<p>April to October. The two best windows are early May (before peak summer mound activity) and late August (catches the second-wave colonies). One treatment usually gets a yard, but heavily infested lots may need a follow-up at 60 days.</p>

<h2>Pricing</h2>

<p>Fire ant control is an add-on to our pest control program, or a one-time service if that's all you need. Bundles with our outdoor program (mosquito + tick + flea) for the most complete summer protection.</p>

<p>Fast scheduling available. Call our nearest office:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'real-estate-wdo-letter-explained',
    title: 'The WDO Letter Explained: What Alabama Lenders Actually Require at Closing',
    excerpt: 'You\'re buying a house in Alabama. Your lender is asking for a "WDO letter" or "termite letter." Here\'s what it actually is, what gets you a clear letter, and what gets you a delay.',
    publishedAt: '2026-01-28',
    author: 'Kevin Wedgworth',
    category: 'Real Estate',
    readMinutes: 5,
    heroEmoji: '🏠',
    metaTitle: 'Alabama WDO Termite Letter Guide | EnviroCare Fast Turnaround',
    metaDescription: 'Alabama WDO inspection letters for closings. Lender-ready format. 48-hour turnaround. Family-owned since 1958. Call (205) 940-6360.',
    body: `
<p class="lede">You're under contract on a home in Birmingham, Hoover, Madison, or anywhere in Alabama. Your lender's checklist includes a "WDO letter" or "termite letter" or "Form 99B." Your realtor says "no big deal, just get one." Here's what's actually involved.</p>

<h2>What WDO stands for</h2>

<p>Wood-Destroying Organism. In Alabama, that means primarily termites, but also includes wood-decay fungi, carpenter ants, carpenter bees, and powderpost beetles. The official form is the <strong>Alabama Department of Agriculture WDIIR-100</strong> (Wood-Destroying Insect Infestation Report), and it's the document your lender will require to fund the loan.</p>

<h2>What we do during the inspection</h2>

<p>A licensed inspector — required by the State of Alabama, and we are licensed — walks the property and inspects every accessible wood surface. That includes:</p>

<ul>
<li>The crawlspace (if any), with attention to sill plates, joists, and floor decking.</li>
<li>The garage, especially the door framing.</li>
<li>Visible interior trim, baseboards, and around plumbing.</li>
<li>The exterior siding, eaves, and trim.</li>
<li>Decks, porches, and any wood-to-soil contact.</li>
<li>The attic, if accessible.</li>
</ul>

<p>The inspection takes about 60 to 90 minutes for a typical 2,500 sq ft home. We document everything photographically.</p>

<h2>The three possible outcomes</h2>

<p><strong>Clear letter.</strong> No visible evidence of WDO activity, no conducive conditions, no damage. The lender accepts the letter and the closing proceeds. About 65% of our inspections come back this way.</p>

<p><strong>Conducive conditions noted.</strong> No active infestation, but we find things like wood-to-soil contact, debris in the crawlspace, moisture-stained joists, or missing insulation that could lead to future problems. The letter still allows closing, but it documents these items for the buyer's awareness.</p>

<p><strong>Active infestation or damage.</strong> We found termite tubes, wood damage from boring beetles, fungal rot, or carpenter ant galleries. The letter must report it. The buyer's lender will typically require either:</p>
<ul>
<li>Treatment of the active issue, with a re-inspection clear letter.</li>
<li>A repair estimate and credit to the buyer at closing.</li>
<li>In rare cases, the deal falls through.</li>
</ul>

<h2>What slows things down</h2>

<p>The #1 cause of WDO letter delays in Alabama isn't actual termites — it's <strong>crawlspace access</strong>. If the seller hasn't cleaned out the crawlspace, if there's standing water, if the access door is locked or the entry is blocked by HVAC equipment, we can't complete a code-compliant inspection. We have to mark the letter "limited inspection" and the lender will reject it.</p>

<p>If you're a seller: have the crawlspace dry, accessible, and free of stored items <em>before</em> the inspector arrives. If you're a buyer: confirm with your agent that crawlspace access is part of seller's closing prep.</p>

<h2>Our turnaround</h2>

<p>We schedule WDO inspections within 48 hours of request — usually next-day. The letter goes to your lender, your agent, and you within 24 hours of the inspection. We charge <strong>$75</strong> for a standalone WDO letter.</p>

<p>If you're already an active EnviroCare customer on our pest or termite program, your first WDO letter each year is <strong>free</strong>.</p>

<h2>About warranty transfers</h2>

<p>If you're buying a home that already has a Sentricon® bait system installed (look for the round green caps in the soil around the foundation), the existing warranty can transfer to you for a small fee — usually $50 to $100. That's almost always worth doing. A transferred Sentricon warranty preserves your $1,000,000 damage coverage with the home.</p>

<p>If the home has a liquid termite treatment instead, those warranties also transfer but check the remaining years carefully — most liquid warranties expire 5 years after the original treatment date.</p>

<h2>Schedule a WDO inspection</h2>

<p>Call the office nearest the property:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>

<p>Or our main line, <strong>(205) 940-6360</strong>. Standard turnaround is 48 hours. Rush inspections are available when needed.</p>
`,
  },

  {
    slug: 'pests-after-rain-alabama',
    title: 'Why Pests Get Worse After Rain in Alabama',
    excerpt: 'Fire ants, palmetto bugs, and millipedes all surge after Alabama rainstorms. Rain floods habitats and drives pests toward your home.',
    publishedAt: '2026-05-20',
    author: 'Kevin Wedgworth',
    category: 'Seasonal',
    readMinutes: 4,
    heroEmoji: '🌧️',
    metaTitle: 'Why Pests Get Worse After Rain in Alabama | EnviroCare',
    metaDescription: 'Fire ants, palmetto bugs, millipedes, and mosquitoes all surge after Alabama rainstorms. Learn why rain drives pests indoors and how proactive perimeter treatment stops them.',
    body: `
<p class="lede">Every pest company in Alabama gets the same call after a rainstorm: why are there suddenly bugs everywhere? Rain disrupts underground and outdoor habitats, forcing pests toward your home.</p>

<h2>Fire Ants</h2>
<p>Heavy rain floods their tunnels, and they build new mounds on higher ground — often your yard. You may see dozens of new mounds after a single storm.</p>

<h2>American Roaches (Palmetto Bugs)</h2>
<p>American roaches live in storm drains and mulch. When rain saturates these areas, they move toward your dry home foundation.</p>

<h2>Millipedes and Mosquitoes</h2>
<p>Millipedes migrate in mass after rain — sometimes hundreds crawling up foundations. Mosquitoes thrive because standing water is where they breed. A bottle cap of water produces hundreds of mosquitoes per week.</p>

<h2>The Best Defense</h2>
<p>Proactive perimeter treatment already in place before the storm is your best defense. Our bi-monthly service creates a treated zone that intercepts pests as they migrate. We offer free re-treatment between scheduled visits for exactly this situation.</p>

<p>Call your nearest EnviroCare office:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'best-time-pest-control-alabama',
    title: 'The Best Time to Start Pest Control in Alabama',
    excerpt: 'Early spring (Feb–April) is optimal — get ahead of ant, roach, and termite season. But Alabama pests are year-round, so there is never a bad time to start.',
    publishedAt: '2026-05-20',
    author: 'Kevin Wedgworth',
    category: 'Tips',
    readMinutes: 4,
    heroEmoji: '📅',
    metaTitle: 'The Best Time to Start Pest Control in Alabama | EnviroCare',
    metaDescription: 'Early spring is ideal but any time works. Alabama pests are year-round. Why starting treatment in February–April gets ahead of summer ant, roach, and termite pressure.',
    body: `
<p class="lede">The honest answer: now. The strategic answer: early spring, February through April. Here is why.</p>

<h2>Why Early Spring</h2>
<p>Spring is when pest populations begin their annual growth. Ant colonies send foragers. Termites swarm. Cockroach reproduction accelerates. Starting treatment in early spring gets ahead of these explosions before they establish indoors.</p>

<p>Think of it like lawn care. You apply pre-emergent before weeds establish. Pest control works the same way — a perimeter barrier in March prevents the summer invasion.</p>

<h2>Any Time Works</h2>
<p>That said, there is never a bad time. Alabama pests are active year-round. If you are reading this in July with roaches in your kitchen, call today. The treatment works whenever we start it.</p>

<h2>Termites: Start Immediately</h2>
<p>For termite protection, every month without coverage is a month of potential damage. Alabama is one of the highest-risk states in the country. New homeowners should start immediately — builder soil treatments only last 5–7 years.</p>

<p>EnviroCare offers $50 off initial service. No contracts. Free re-treatment between visits. Call any of our three offices:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'prepare-home-for-pest-control',
    title: 'How to Prepare Your Home for Pest Control Service',
    excerpt: 'Clear baseboards, secure pets, give access to crawlspaces. A few simple steps before service make treatment more effective and longer-lasting.',
    publishedAt: '2026-05-20',
    author: 'Kevin Wedgworth',
    category: 'Tips',
    readMinutes: 3,
    heroEmoji: '🏡',
    metaTitle: 'How to Prepare Your Home for Pest Control Service | EnviroCare Alabama',
    metaDescription: 'A few simple steps before your pest control visit make treatment more effective. Clear baseboards, secure pets, and give access to key areas. Tips from EnviroCare.',
    body: `
<p class="lede">Getting the most from your pest control service starts before the technician arrives. A few simple steps help us treat more effectively and make results last longer.</p>

<h2>Clear Access Areas</h2>
<p>Clear items away from baseboards in the kitchen and bathrooms. Pull appliances forward so we can treat behind them. These areas are prime harborage for roaches, ants, and silverfish — and if we can't reach them, neither can the treatment.</p>

<h2>Secure Pets and Sensitive Items</h2>
<p>Pick up pet food and water bowls before we arrive. Cover fish tanks and turn off air pumps during interior treatment. Products are EPA-registered once dry — about 30 minutes for interior work.</p>

<h2>Trim Exterior Vegetation</h2>
<p>Trim vegetation at least 12 inches from your home exterior. Overgrown landscaping touching your house creates bridges for pests to bypass our perimeter barrier.</p>

<h2>Give Access to Key Areas</h2>
<p>Make sure your technician can access the garage, crawlspace, and outdoor storage buildings. These areas often harbor the heaviest pest populations and are the source of many interior invasions.</p>

<h2>After Treatment</h2>
<p>Avoid mopping baseboards for 48 hours. The residual product continues working for weeks. If you see increased pest activity in the first 7–10 days, that is normal — the treatment flushes pests from hiding before eliminating them.</p>

<p>Questions before your service? Call your nearest EnviroCare office:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'huntsville-pest-control-guide',
    title: 'Huntsville Pest Control: What North Alabama Homeowners Face',
    excerpt: 'Limestone geology, Tennessee Valley climate, and rapid suburban growth create unique pest challenges. Local guide from EnviroCare\'s Huntsville office.',
    publishedAt: '2026-05-20',
    author: 'Kevin Wedgworth',
    category: 'Local',
    readMinutes: 5,
    heroEmoji: '🚀',
    metaTitle: 'Huntsville Pest Control: What North Alabama Homeowners Face | EnviroCare',
    metaDescription: 'Limestone geology, Tennessee Valley climate, and rapid growth create unique pest challenges in Huntsville. Local guide from EnviroCare\'s North Alabama office on Old Madison Pike.',
    body: `
<p class="lede">Huntsville and North Alabama present unique pest challenges. The Tennessee Valley climate, limestone geology, and rapid suburban development all influence what pests you deal with — and how to stop them.</p>

<h2>Limestone Geology</h2>
<p>Limestone geology creates natural voids that pests use as highways through your soil. Centipedes, millipedes, and cave crickets are more common in North Alabama homes on limestone than in clay-soil homes further south.</p>

<h2>New Construction Pressure</h2>
<p>Explosive growth means new construction constantly disturbs pest habitats. When a developer clears a field in Harvest or Madison, the fire ants and termites don't disappear — they relocate to nearby existing structures.</p>

<h2>Tennessee River and Mosquitoes</h2>
<p>The Tennessee River creates mosquito breeding habitat throughout the valley. Properties near the river and agricultural irrigation face above-average mosquito pressure throughout spring and summer.</p>

<h2>Brown Recluse</h2>
<p>Brown recluse are well-established in North Alabama. Older homes in downtown Huntsville with stone foundations and crawlspaces are particularly prone to infestations. If you're storing boxes in an attic or crawlspace, inspect carefully.</p>

<h2>EnviroCare Huntsville</h2>
<p>Our Huntsville office on Old Madison Pike serves all of Madison County with local technicians who know North Alabama specifically. Same services as Birmingham and Lake Martin: bi-monthly pest control from $35/month, Sentricon termite protection, monthly mosquito treatments, and tick control.</p>

<p><strong>7027 Old Madison Pike, Suite 108 · Huntsville, AL 35806</strong><br/>
Free inspections. No setup fee. Fast scheduling available.</p>

<p>Call: <strong>(256) 937-7676</strong></p>
`,
  },

  {
    slug: 'brown-recluse-spiders-alabama',
    title: 'Brown Recluse Spiders in Alabama: What Every Homeowner Should Know',
    excerpt: 'Far more common than most realize. How to identify them, what a bite looks like, where they hide in Alabama homes, and how to keep them out.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Spiders',
    readMinutes: 5,
    heroEmoji: '🕷️',
    metaTitle: 'Brown Recluse Spiders in Alabama: What Every Homeowner Should Know | EnviroCare',
    metaDescription: 'Brown recluse are far more common in Alabama homes than most realize. Identification, bite risks, prevention tips, and when to call for professional treatment.',
    body: `
<p class="lede">The brown recluse is one of two medically significant spiders in Alabama, and far more common in homes than most people realize. Unlike black widows that build obvious webs in visible corners, brown recluse are secretive — hiding in undisturbed boxes, behind furniture, and in attic storage for years without being noticed.</p>

<h2>Identification</h2>
<p>Brown recluse are tan to light brown with a distinctive violin-shaped marking on the top of the head. About the size of a quarter including legs. They hunt at night and retreat to dark, undisturbed hiding spots during the day. If you see one in daylight, it's usually been displaced.</p>

<h2>Why Alabama</h2>
<p>Alabama's climate is ideal for brown recluse. They thrive between 70–90°F and prefer dry, undisturbed areas. Homes with lots of storage, cardboard boxes, and undisturbed closets provide perfect habitat. The attic over a spare bedroom is a classic infestation site.</p>

<h2>Bites</h2>
<p>Bites are painless initially but develop into red, blistering wounds over 2–8 hours. Some cases progress to necrotic tissue death requiring weeks to heal and sometimes surgical intervention. Seek medical attention promptly if you suspect a brown recluse bite — don't wait to see if it gets better.</p>

<h2>Prevention</h2>
<ul>
<li>Store items in sealed plastic bins, not cardboard boxes</li>
<li>Keep closets and attic storage decluttered</li>
<li>Shake out shoes and clothing that have sat for more than a day</li>
<li>Move beds away from walls</li>
<li>Wear gloves when working in storage areas, garages, or crawlspaces</li>
</ul>

<p>Professional bi-monthly treatment reduces the insect population that attracts recluse — fewer roaches and silverfish means less food for spiders. If you're finding brown recluse, a single female produces 150 eggs per year. Call EnviroCare for a free inspection:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'cockroach-control-alabama',
    title: 'Cockroach Control in Alabama: German, American & Smokybrown Roaches',
    excerpt: 'Three species, three different treatment approaches. Alabama\'s humidity makes cockroach control harder than most states.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Roaches',
    readMinutes: 4,
    heroEmoji: '🪳',
    metaTitle: 'Cockroach Control in Alabama: German, American & Smokybrown | EnviroCare',
    metaDescription: 'Three cockroach species require three different treatment approaches in Alabama. German roaches inside, American and smokybrown outside. EnviroCare bi-monthly plan covers all.',
    body: `
<p class="lede">Alabama's heat and humidity make it cockroach paradise. German roaches infest kitchens, American roaches invade from outside, and smokybrown roaches fly in through attic vents. Each species requires a different treatment approach — and spraying the wrong place makes infestations worse.</p>

<h2>Warning Signs</h2>
<p>Droppings like coffee grounds in cabinets, musty odor, and egg cases in dark corners. A single German cockroach female produces 300+ offspring. One egg case hatches in about 28 days. Early professional treatment is critical — populations grow exponentially once established.</p>

<h2>Health Risks</h2>
<p>Cockroaches spread E. coli, Salmonella, and trigger asthma — especially in children. Alabama's year-round warmth allows roaches to remain active every month, unlike northern states where cold provides a break.</p>

<h2>How We Treat</h2>
<p>We use gel bait in kitchens and bathrooms for German roaches — spraying drives them deeper into walls. Exterior perimeter spray creates a barrier against American and smokybrown roaches coming in from outside. Attic dust treatment addresses smokybrown roaches entering through roof vents. Bi-monthly service with unlimited free re-treatments keeps pressure on all species year-round.</p>

<h2>Common Questions</h2>

<h3>Why do I have roaches if my house is clean?</h3>
<p>Cleanliness helps but doesn't prevent roaches. American and smokybrown roaches enter from outside regardless of indoor conditions. Professional perimeter treatment is the most reliable prevention.</p>

<h3>Are palmetto bugs and cockroaches the same thing?</h3>
<p>Yes. Palmetto bug is the common name for the American cockroach — large, reddish-brown, and capable of flying short distances. They're not a different species, just a regional nickname.</p>

<p>Cockroach control is included in our bi-monthly plan — 30+ pests, starting at $35/month. Call today:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'spider-control-alabama',
    title: 'Spider Control in Alabama: Black Widow, Brown Recluse & More',
    excerpt: 'Two medically significant species plus dozens of nuisance spiders. Effective control starts with reducing their food supply, not just spraying webs.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Spiders',
    readMinutes: 4,
    heroEmoji: '🕸️',
    metaTitle: 'Spider Control in Alabama: Black Widow, Brown Recluse & More | EnviroCare',
    metaDescription: 'Alabama has black widows and brown recluse. Effective spider control starts with reducing their food supply, not just spraying webs. EnviroCare bi-monthly plan covers 30+ pests.',
    body: `
<p class="lede">Alabama is home to black widows and brown recluse — both medically significant. They thrive in garages, crawlspaces, storage areas, and woodpiles. But spraying webs treats the symptom, not the cause. EnviroCare reduces spider populations by eliminating the insects they feed on.</p>

<h2>Dangerous Species</h2>
<p><strong>Black widows</strong> are shiny black with a red hourglass marking on the underside. Found in garages, under decks, and in woodpiles. Their venom causes painful muscle cramps and nausea — seek medical attention immediately after a bite.</p>

<p><strong>Brown recluse</strong> are tan with a violin-shaped marking on the back. Found in undisturbed areas: closets, attics, stored boxes. Bites cause tissue death in some cases. See a doctor immediately if you suspect a bite.</p>

<h2>Where They Hide</h2>
<p>Garages, crawlspaces, attics, woodpiles, outdoor storage buildings, and under decks. Multiple webs in corners, seeing spiders during the day, and finding egg sacs are warning signs of a significant population.</p>

<h2>How We Treat</h2>
<p>Spider control starts with reducing their food supply. Our perimeter barrier treatment knocks down the insects spiders eat. We also treat garages, crawlspaces, and attics with web removal to disrupt breeding. For brown recluse, we use sticky traps and targeted dust in wall voids where they travel.</p>

<h2>Common Questions</h2>

<h3>Will killing the spiders I see fix the problem?</h3>
<p>No. If the insect food supply remains, new spiders will move in. Our approach reduces the overall insect population so spiders have no reason to stay.</p>

<h3>Are brown recluse common in Alabama?</h3>
<p>Yes — more common than most people realize. Well established throughout the state, especially in undisturbed areas like attics, closets, and storage boxes.</p>

<p>Spider control is included in our bi-monthly plan — 30+ pests, starting at $35/month. Call today:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'ant-control-alabama',
    title: 'Ant Control in Alabama: Fire Ants, Carpenter Ants & House Ants',
    excerpt: 'Spraying active ant trails backfires — it scatters the colony. Learn why bait-based treatment is the only approach that reaches the queen and ends the infestation.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Ants',
    readMinutes: 4,
    heroEmoji: '🐜',
    metaTitle: 'Ant Control in Alabama: Fire Ants, Carpenter Ants & House Ants | EnviroCare',
    metaDescription: 'Spraying active ant trails backfires. Alabama has fire ants, carpenter ants, Argentine ants, and more. EnviroCare uses targeted bait to reach the queen and eliminate colonies.',
    body: `
<p class="lede">Alabama hosts dozens of ant species — fire ants in the yard, Argentine ants in the kitchen, carpenter ants damaging wood, and odorous house ants trailing across counters. The most common mistake homeowners make is spraying the trails they can see. That kills foragers and scatters the colony into multiple new entry points.</p>

<h2>Common Species</h2>
<p><strong>Fire ants</strong> build mounds in your yard and sting aggressively when disturbed. <strong>Argentine ants</strong> invade kitchens in large numbers following established trails. <strong>Carpenter ants</strong> excavate galleries in moist wood — they can cause structural damage over years. <strong>Odorous house ants</strong> emit a rotting-coconut smell when crushed.</p>

<h2>The Spraying Problem</h2>
<p>Spraying active ant trails kills the workers you see but signals the colony that the trail is compromised. Surviving workers release alarm pheromones, the colony scatters, and new trails emerge from different entry points within days. Over-the-counter sprays make infestations harder to treat by dispersing colonies.</p>

<h2>How We Treat</h2>
<p>Indoor ant control uses slow-acting bait that workers carry back to the colony and feed to the queen. The queen dies, the colony dies. Exterior perimeter barrier stops scouts before they establish new interior trails. For fire ants, broadcast bait covers the whole yard — not just visible mounds — so the entire property is treated.</p>

<h2>Common Questions</h2>

<h3>Why do ants keep coming back after I spray?</h3>
<p>Spraying kills foragers but not the colony. Surviving workers often scatter the colony and create new entry points. Bait-based treatment reaches the queen — that's the only way to end the infestation.</p>

<h3>Are carpenter ants as bad as termites?</h3>
<p>They don't eat wood like termites, but they excavate galleries in moist or decayed wood. A mature colony can cause significant structural damage over years. Look for sawdust-like frass near baseboards as an early warning sign.</p>

<p>Ant control is included in our bi-monthly plan — 30+ pests, starting at $35/month. Call today:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'silverfish-control-alabama',
    title: 'Silverfish Control in Alabama: Humidity Pests That Damage Your Home',
    excerpt: 'Silverfish thrive in Alabama\'s humidity and damage books, clothing, and documents. They hide in attics and bathroom walls. Here\'s how to eliminate them.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Pests',
    readMinutes: 4,
    heroEmoji: '🐟',
    metaTitle: 'Silverfish Control in Alabama | EnviroCare Pest & Termite Services',
    metaDescription: 'Silverfish thrive in Alabama humidity and damage books, clothing, wallpaper, and documents. They hide in attics and bathroom walls. Professional treatment from EnviroCare.',
    body: `
<p class="lede">Silverfish thrive in Alabama humidity and are one of the most common household pests we treat — and one of the most overlooked. These fast-moving silver insects damage books, wallpaper, clothing, and stored documents while hiding in walls and attics where they're rarely seen until populations are large.</p>

<h2>Identification</h2>
<p>Silver-gray, teardrop-shaped, half to three-quarter inch with three tail appendages. Very fast and nocturnal — if you see one during the day, there are many more you're not seeing. They can live for years without food.</p>

<h2>Why Alabama</h2>
<p>Silverfish require 75%+ humidity to thrive. Bathrooms, laundry rooms, kitchens, and damp crawlspaces are prime habitat. Alabama's climate provides ideal conditions year-round — unlike drier states where they're controlled naturally by low humidity.</p>

<h2>What They Damage</h2>
<p>They feed on starch — books, wallpaper paste, cotton and linen clothing, stored documents, photos, and natural-fiber upholstery. Attic boxes full of old photos or documents are a common target. By the time you find damage, the population is usually well-established.</p>

<h2>How We Treat</h2>
<p>Interior treatment targets bathrooms, kitchens, laundry rooms, and attics. Crack-and-crevice treatment addresses hiding spots behind baseboards. Exterior perimeter prevents new silverfish from entering. We also recommend moisture fixes — reducing indoor humidity with exhaust fans and dehumidifiers is the most effective long-term control.</p>

<h2>Common Questions</h2>

<h3>Why do I keep finding them in my bathroom?</h3>
<p>Bathrooms provide the moisture they need. Poor ventilation and dripping faucets create ideal habitat. Running your exhaust fan after every shower helps significantly.</p>

<h3>How do I prevent silverfish?</h3>
<p>Reduce indoor humidity, store items in sealed plastic bins rather than cardboard, fix plumbing leaks, and start professional bi-monthly treatment. Once established, they're very difficult to eliminate with over-the-counter products.</p>

<p>Silverfish control is included in our bi-monthly plan — 30+ pests, starting at $35/month. Call today:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'cricket-control-alabama',
    title: 'Cricket Control in Alabama: Stop Chirping in Walls & Basement Invasions',
    excerpt: 'House crickets chirp all night. Camel crickets invade basements in large numbers. Both surge in fall. Perimeter barriers and granular bait stop them before entry.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Pests',
    readMinutes: 4,
    heroEmoji: '🦗',
    metaTitle: 'Cricket Control in Alabama: Stop Chirping & Basement Invasions | EnviroCare',
    metaDescription: 'House crickets chirp all night in walls. Camel crickets invade basements in large numbers. Alabama fall cricket invasions stopped with perimeter barriers and granular bait.',
    body: `
<p class="lede">House crickets chirp all night from walls and garages. Camel crickets invade damp basements in large numbers. Both enter Alabama homes seeking shelter as temperatures drop in fall — and once inside, they breed and damage fabrics before you realize you have a problem.</p>

<h2>Two Types</h2>
<p><strong>House crickets</strong> are tan, about an inch long, and produce the familiar chirping sound. Males chirp to attract females — that chirp in the wall at 2am is a mating call. <strong>Camel crickets</strong> are brown and humpbacked, jump erratically when startled, and invade in large groups. They're silent, so you may not realize you have them until you find dozens in a storage area.</p>

<h2>Why They Come Inside</h2>
<p>Crickets are strongly attracted to light — bright porch lights draw them directly to entry points around your door. They're also seeking warmth as fall temperatures drop. Cracks in foundations and gaps around utility penetrations are common entry points.</p>

<h2>What They Damage</h2>
<p>Both species feed on cotton, wool, silk, and linen. Stored clothing, curtains, upholstered furniture, and natural-fiber rugs are at risk. In large numbers, camel crickets can damage stored fabrics in basements and closets.</p>

<h2>How We Treat</h2>
<p>Exterior perimeter barrier stops crickets before entry. Granular bait around the foundation eliminates crickets in landscape beds before they reach the house. Interior treatment targets garages, basements, and utility rooms. Switching porch lights to yellow or sodium vapor bulbs also helps — crickets are strongly attracted to bright white light.</p>

<h2>Common Questions</h2>

<h3>Why do I hear chirping in my walls?</h3>
<p>Male house crickets chirp to attract mates. They entered through foundation cracks or utility penetrations and are now breeding inside your walls. Professional treatment in the walls and at the perimeter is needed.</p>

<h3>Are camel crickets dangerous?</h3>
<p>They don't bite or chirp, but appear in large numbers and jump unpredictably when startled. They can damage stored fabrics. Their presence in large numbers also indicates excess moisture in the basement or crawlspace.</p>

<p>Cricket control is included in our bi-monthly plan — 30+ pests, starting at $35/month. Call today:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  {
    slug: 'termite-season-2026-alabama',
    title: "Termite Season 2026 in Alabama: What's Coming and How to Stay Ahead",
    excerpt: "Spring 2026 is shaping up as a heavy termite year. Heavy winter rainfall, warm soil temperatures, and record swarm reports across Central and North Alabama. Here's what you need to know now.",
    publishedAt: '2026-05-23',
    author: 'Kevin Wedgworth',
    category: 'Termites',
    readMinutes: 6,
    heroEmoji: '🪵',
    metaTitle: 'Termite Season 2026 Alabama: What Homeowners Need to Know | EnviroCare',
    metaDescription: 'Termite season 2026 is underway across Alabama. Heavy winter rain and warm soil mean elevated swarm activity. Sentricon® $1M coverage. Free inspection. Call (205) 940-6360.',
    body: `
<p class="lede">By late April 2026, our technicians had already logged more termite swarm calls than we typically see through the end of May in a normal year. If you've seen wings on your windowsill or swarmers boiling out of a mulch bed, you're not alone — and you're not too late to protect your home.</p>

<p>Here's what's driving the 2026 season, what's different about this year, and what we're recommending to Alabama homeowners right now.</p>

<h2>Why 2026 is hitting harder</h2>

<p>Three conditions have aligned this spring that we don't see every year:</p>

<ol>
<li><strong>Above-average winter rainfall.</strong> December 2025 through February 2026 was the wettest three-month stretch Alabama had seen in over a decade. That moisture saturated the clay soils throughout the Birmingham Basin and the Tennessee Valley, which is exactly the environment subterranean termite colonies expand into.</li>
<li><strong>Soil temperatures spiked early.</strong> After a warm March, soil temps in Central Alabama crossed the 70°F threshold — the trigger for swarm behavior — about two weeks ahead of the historical average.</li>
<li><strong>Carry-over from 2025.</strong> Last year's late start to the season (we had an unusually cold March 2025) meant colonies that didn't swarm successfully last year are attempting reproduction this spring instead. We're effectively seeing two swarm years compressed into one.</li>
</ol>

<h2>Where we're seeing it most</h2>

<p>Our Birmingham office has reported the heaviest concentration of new calls in older neighborhoods: Forest Park, Mountain Brook, Avondale, and Crestwood. These areas have mature hardwood trees, aging construction, and high wood-to-soil contact — exactly what Eastern Subterranean termites are hunting for.</p>

<p>The Huntsville office is tracking elevated activity in Madison, Harvest, and Hampton Cove — areas that had significant new construction between 2015 and 2022. Builder soil pre-treatment warranties in those communities are starting to expire. Homeowners who moved in 2018 or 2019 and relied on the builder's soil treatment are now unprotected.</p>

<p>Our Alex City / Lake Martin office is seeing the heaviest activity we've logged in years along the lake's eastern shore. High-water events this winter caused termite colonies to raft and relocate — lakefront lots on the eastern shore around Dadeville and Eclectic are at elevated risk this season.</p>

<h2>What you'll actually see during a swarm</h2>

<p>A swarm looks dramatic but it's not actually the termites causing your damage — it's the reproductive event, not the workers. Hundreds or thousands of winged termites emerge from a single point, fly for 30 to 60 minutes, then fall to the ground and shed their wings. What they leave behind is a pile of identical, translucent wings. That's your evidence.</p>

<p>If you find wings: on a windowsill, near a baseboard, on a door threshold, or around a light fixture — you have an active colony nearby. Not potentially nearby. Present.</p>

<p>The workers, meanwhile, are underground and have been feeding since last fall. The swarm doesn't start the infestation — it's the colony announcing itself after it's already been established for years.</p>

<h2>What changed about our Sentricon recommendations in 2026</h2>

<p>We've always recommended Sentricon® Always Active™ as our primary termite protection for Alabama homes. That hasn't changed. What has changed this year is our urgency about inspecting homes that have gone 5 or more years without a current Sentricon warranty.</p>

<p>Corteva — the manufacturer — updated their warranty terms in early 2026 to require re-inspection for any system that went more than 18 months between technician visits. If you have an existing Sentricon system on your home and your last service visit was more than 18 months ago, your $1,000,000 damage warranty may no longer be active. Call us — we'll inspect and reactivate the warranty at no charge for existing customers.</p>

<h2>For homeowners who don't have termite protection</h2>

<p>The 2026 season is a bad year to be unprotected. Here's the math: a subterranean termite colony in Alabama typically contains 250,000 to one million workers. Each worker consumes about 0.0025 ounces of wood per day. At peak population, a mature colony in your foundation can consume the equivalent of a 1-inch pine board every 23 days. By the time you see visible damage, the colony has usually been present for 3 to 5 years.</p>

<p>We offer free inspections at all three offices. Fast appointments are available most days. The inspection takes about 60 minutes for a typical home, there's no sales pressure, and if you have no evidence of activity we'll tell you that plainly.</p>

<h2>Steps to take right now</h2>

<ol>
<li><strong>Do a 10-minute perimeter walk.</strong> Check the base of your foundation, where mulch meets your siding, any wood posts in contact with the soil, and your crawlspace access door. Look for mud tubes — pencil-thick dirt tunnels running up the foundation face. That's the most reliable field sign of subterranean termite activity.</li>
<li><strong>Check for wings.</strong> Concentrated piles of small identical wings near windows or light fixtures, especially on south-facing walls, are the #1 indicator homeowners find on their own.</li>
<li><strong>Check your builder warranty expiration.</strong> Most new construction in Alabama gets a soil pre-treatment that carries a 5-year warranty. After that, the home has no coverage. Look for a pink or blue sheet in your closing documents — it should have an issue date and warranty expiration.</li>
<li><strong>Call us.</strong> Free inspection, no obligation. We'll tell you what we find and what we'd recommend. If there's no activity, we'll say that too.</li>
</ol>

<p>Office numbers:</p>
<ul>
<li>Birmingham / Alabaster — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>

<p>Or call our main line: <strong>(205) 940-6360</strong>. If you found swarmers this week, don't wait — inspections are typically available within 48 hours.</p>

<p><em>Kevin Wedgworth is the third-generation owner of EnviroCare Pest &amp; Termite Services, founded by his grandfather Phillip M. Wedgworth in Alexander City, Alabama, in 1958. EnviroCare is a Sentricon® Certified Specialist.</em></p>
`,
  },

  {
    slug: 'centipede-millipede-control-alabama',
    title: 'Centipede & Millipede Control in Alabama',
    excerpt: 'Millipedes migrate in hundreds after rain. Centipedes appear in bathrooms year-round. Both signal moisture problems near your foundation — and both are treatable.',
    publishedAt: '2026-05-21',
    author: 'Kevin Wedgworth',
    category: 'Pests',
    readMinutes: 4,
    heroEmoji: '🐛',
    metaTitle: 'Centipede & Millipede Control in Alabama | EnviroCare Pest Services',
    metaDescription: 'Millipedes migrate in hundreds after Alabama rain. Centipedes appear in bathrooms year-round. Both signal moisture problems near your foundation. EnviroCare bi-monthly plan.',
    body: `
<p class="lede">Centipedes and millipedes are moisture-loving pests that invade Alabama homes after heavy rain. House centipedes are fast predators found in bathrooms year-round. Millipedes invade in mass migrations during wet weather — sometimes hundreds in a single day. Both indicate excess moisture around your foundation that needs to be addressed.</p>

<h2>Centipede vs Millipede</h2>
<p><strong>Centipedes</strong> are flat, fast, and have one pair of legs per body segment. They're predators that eat roaches, silverfish, and other insects — so their presence inside usually means their prey is there too. House centipedes can deliver a painful bite but rarely do. <strong>Millipedes</strong> are round and slow, with two pairs of legs per segment. They eat decaying plant matter and migrate en masse when their soil habitat floods.</p>

<h2>Why They Come Inside</h2>
<p>Both species need moisture to survive. Finding them indoors signals excess moisture from poor drainage, leaky pipes, or inadequate ventilation around your foundation. Millipede mass migrations happen after heavy rain saturates soil — hundreds may appear against your foundation overnight, then work their way inside through any gap.</p>

<h2>North Alabama Note</h2>
<p>Limestone geology in North Alabama (Huntsville area) creates natural underground voids where centipedes and cave crickets thrive. Homes in Madison County see higher centipede pressure than homes on clay soils further south.</p>

<h2>How We Treat</h2>
<p>Perimeter barrier spray around your foundation and entry points stops both species. Granular treatment in mulch beds and leaf litter where millipedes breed. Interior treatment in bathrooms, basements, and utility areas. We also identify contributing moisture issues — drainage problems and clogged gutters are the most common causes of heavy centipede and millipede pressure.</p>

<h2>Common Questions</h2>

<h3>Why suddenly hundreds of millipedes after rain?</h3>
<p>Soil oversaturation forces them out of their underground habitat. They migrate to the nearest dry area — your foundation. A perimeter barrier already in place intercepts them before entry.</p>

<h3>Does mulch attract them?</h3>
<p>Yes. Keep mulch at least 6 inches from your foundation and no more than 2–3 inches deep. Deep mulch against the house creates ideal millipede habitat and bypasses your perimeter treatment.</p>

<p>Centipede and millipede control is included in our bi-monthly plan — 30+ pests, starting at $35/month. Call today:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`,
  },

  // ── Migrated from dead repo (envirocare-web) 2026-06-08 ──────────────────
  {
    slug: 'pest-control-cost-alabama',
    title: 'How Much Does Pest Control Cost in Alabama? (2026 Pricing Guide)',
    excerpt: 'Real 2026 numbers, no sales call required — what pest control actually costs in Alabama, what\'s included at each price point, and why the national chains hide their pricing.',
    publishedAt: '2026-05-26',
    author: 'Kevin Wedgworth',
    category: 'Pricing',
    readMinutes: 7,
    heroEmoji: '💵',
    metaTitle: 'How Much Does Pest Control Cost in Alabama? (2026 Pricing Guide) | EnviroCare',
    metaDescription: 'How much does pest control cost in Alabama? Real 2026 pricing: $35/mo Essential, $67/mo with termite monitoring, $116/mo Complete. No hidden fees, free termite inspections.',
    body: `
<p class="lede">Real numbers, no sales call required. Here's what pest control actually costs in Alabama in 2026 — what's included at each price point, why the national chains hide their pricing, and how to tell whether a monthly plan or a one-time treatment is the right call for your home.</p>

<h2>The short answer</h2>
<p>For a single-family home in Alabama, monthly pest control typically runs <strong>$35 to $116 per month</strong> in 2026. One-time treatments for a specific problem — a roach flare-up, a wasp nest, a fire ant mound — usually fall between $150 and $600 depending on the pest and the size of the home. Termite work is its own category: Sentricon® bait installations and liquid soil treatments for an average Alabama home run $1,200 to $2,500, while termite inspections are free at most reputable Alabama companies, including EnviroCare.</p>
<p>That's the headline. The real answer depends on which pests you actually need controlled, how often, and whether the company comes back free if the pests come back — which is where the monthly plans earn their value in Alabama's climate.</p>

<h2>EnviroCare's 2026 plan pricing</h2>
<p>EnviroCare publishes its pricing because the family that's run the company since 1958 believes Alabama homeowners shouldn't have to schedule a sales visit just to learn what service costs. Three plans cover the great majority of homes from Birmingham to Huntsville to Lake Martin:</p>
<ul>
<li><strong>Essential — $35/mo:</strong> bi-monthly exterior pest control, 30+ pests, unlimited free re-service.</li>
<li><strong>Foundation — $67/mo (most popular):</strong> Essential pest control plus Sentricon® termite monitoring with $1,000,000 damage coverage.</li>
<li><strong>Complete — $116/mo:</strong> all four services — pest, termite, mosquito, and tick.</li>
</ul>
<p>Standalone mosquito control starts at <strong>$45/month</strong> seasonal. Termite inspections are always free. <a href="/pricing">See full pricing →</a></p>

<h2>What actually changes the price</h2>
<p>The published prices cover most single-family homes up to roughly 3,500 square feet. Square footage and outbuildings, crawl space access and condition, and initial vs. ongoing service are the three factors that move the number — and a reputable Alabama company discloses them before service starts, not after.</p>

<h2>Why national chains hide their pricing</h2>
<p>In-person sales convert better than published rates, and national chain pricing varies widely by ZIP code. For a family-owned operation that's worked Alabama since 1958, charging $35 a month and publishing it on the website is the simpler, honest approach.</p>

<h2>Is pest control worth it in Alabama?</h2>
<p>Alabama keeps pest pressure on twelve months a year. The math on the $35 Essential plan is $420 a year for bi-monthly exterior treatment plus unlimited free re-service — usually less than one big roach job in July. Catching a termite colony early is the difference between a $1,500 treatment and a $15,000 sill-plate replacement.</p>
<p><strong>Want a real quote?</strong> <a href="/quote">Request a free quote</a> or call (205) 940-6360.</p>
`,
  },

  {
    slug: 'sugar-ants-in-house-alabama',
    title: 'Sugar Ants in Your Alabama Home: Stop the June Invasion Before It Starts',
    excerpt: 'Sugar ant invasions explode across Alabama every June. Here\'s how to identify the species in your kitchen, stop the trail the right way, and keep them out.',
    publishedAt: '2026-06-01',
    author: 'Kevin Wedgworth',
    category: 'Ants',
    readMinutes: 6,
    heroEmoji: '🐜',
    metaTitle: 'Sugar Ants in House (Alabama): Stop the June Invasion | EnviroCare',
    metaDescription: 'Sugar ant invasions explode in Alabama every June. Identify the species in your kitchen, stop the trail, and keep them out — from EnviroCare, family-owned in Alabama since 1958.',
    body: `
<p class="lede">Every June, the calls start. You walk into the kitchen before coffee and there's a line of tiny brown ants marching from behind the toaster to a single drop of jelly. By Tuesday they've found the dog bowl. By Friday they're in the pantry.</p>
<p>If you live in Alabama, this is sugar ant season — and we've been answering this call since 1958. Here's what they actually are, how to stop them, and when it's time to call a pro.</p>

<h2>"Sugar ants" are usually one of three species</h2>
<p>There isn't a single bug called the "sugar ant." It's a catch-all for small, dark ants that show up looking for anything sweet. In Alabama you're almost always dealing with <strong>odorous house ants</strong> (dark brown, smell like rotten coconut when crushed, nest inside wall voids), <strong>pavement ants</strong> (look for tiny dirt piles at driveway joints), or <strong>Argentine ants</strong> (light brown, fast-moving supercolonies — if they return the same day from a different door, this is what you have).</p>

<h2>Why June is when they explode</h2>
<p>Alabama humidity, warm overnights, and the first heavy summer rains push colonies to peak foraging in June. Spraying a visible trail kills the workers you see but scatters the colony. Two weeks later you've got three trails instead of one.</p>

<h2>How to stop sugar ants the right way</h2>
<ol>
<li>Wipe surfaces with soap and water, then equal parts white vinegar and water to erase the scent trail.</li>
<li>Place sweet liquid ant bait right on the active trail and leave it alone for 5–7 days. You'll see more ants in the first 48 hours — that's good, the workers are carrying it home to the colony.</li>
<li>Once the trail goes quiet, seal the entry point with caulk.</li>
<li>If they're back in under two weeks — call. That signals multiple colonies, an Argentine supercolony, or a nest inside a wall.</li>
</ol>

<h2>When to call EnviroCare</h2>
<p>Try the bait approach first — it works for about 60% of one-off invasions. Call when the trail keeps returning from a different entry point, you're finding ants in more than one room, or you've baited correctly for 14 days and they're still coming.</p>
<p>EnviroCare's bi-monthly pest control program puts a sustained perimeter barrier around the house with interior spot treatment on the first visit. <a href="/pricing">See pricing</a> or call (205) 940-6360.</p>
`,
  },

  {
    slug: 'mosquito-season-birmingham-al',
    title: 'Mosquito Season in Alabama: When to Start Treatment for Best Results',
    excerpt: 'Mosquito season in Alabama runs April through October. Starting in April — before the season builds — is the single biggest factor in having a usable yard all summer.',
    publishedAt: '2026-03-01',
    author: 'Kevin Wedgworth',
    category: 'Mosquitoes',
    readMinutes: 7,
    heroEmoji: '🦟',
    metaTitle: 'Mosquito Season in Alabama: When to Start Treatment | EnviroCare',
    metaDescription: 'Mosquito season in Alabama runs April through October. Starting treatment in April suppresses breeding populations before they explode. Learn when and how to protect your yard.',
    body: `
<p class="lede">Timing is everything in mosquito control. Starting in April — before the season builds — is the single biggest factor in having a usable yard all summer.</p>

<h2>When does mosquito season start in Alabama?</h2>
<p>Mosquito activity begins when daytime temperatures consistently reach 50°F — typically late March or early April around Birmingham and Huntsville. Peak season runs June through August. The season runs through October, with the first hard frost ending it in November. Lake Martin and central Alabama lakefront properties see some of the heaviest pressure in the state.</p>

<h2>Why starting in April matters</h2>
<p>The mosquito lifecycle runs about 21 days from egg to adult. Start in April and you knock back the early population before it produces two or three more generations. Start in June and you're fighting a population that's already several generations deep — chasing, not managing.</p>

<h2>Professional treatment vs. DIY</h2>
<p>Backyard foggers kill the adults in front of you right now, then offer no residual protection and don't touch harborage or breeding sites. Professional 30-day barrier treatments keep killing mosquitoes as they return to rest over the following weeks, and treating every 21 days hits the population right before the next generation reaches adulthood.</p>

<h2>EnviroCare's mosquito program</h2>
<p>Our program runs April through October, every 21 days. Treatments target vegetation, shrub beds, fence lines, wooded edges, and under-deck structures. Pets and kids can return to the yard once it's dry — typically 30 to 45 minutes. Pricing starts at $45/month. <a href="/quote">Request a free quote</a> or call (205) 940-6360.</p>
`,
  },

  {
    slug: 'how-to-identify-termites-alabama',
    title: 'How to Identify Termites in Your Alabama Home',
    excerpt: 'Knowing how to spot termites is the difference between a free inspection and a five-figure repair. Here are the signs every Alabama homeowner should recognize.',
    publishedAt: '2026-05-19',
    author: 'Kevin Wedgworth',
    category: 'Termites',
    readMinutes: 7,
    heroEmoji: '🔍',
    metaTitle: 'How to Identify Termites in Your Alabama Home | EnviroCare',
    metaDescription: 'How to identify termites in Alabama: mud tubes, hollow wood, discarded wings, and swarmers. How to tell termites from flying ants. Free inspection from EnviroCare.',
    body: `
<p class="lede">Knowing how to identify termites in your Alabama home is the difference between a free inspection and a five-figure repair. Here are the signs every homeowner should recognize — and what to do the moment you spot one.</p>

<h2>Why termite identification matters in Alabama</h2>
<p>Alabama sits in USDA Termite Infestation Probability Zone 2 — the second-highest pressure rating in the country. Eastern subterranean termites eat 24 hours a day, year-round, and a mature colony can consume roughly a pound of wood a week. Insurance won't help — standard Alabama homeowners policies explicitly exclude termite damage. Catching it early matters.</p>

<h2>The four signs of termites</h2>
<ul>
<li><strong>Mud tubes</strong> — pencil-width dirt tunnels running up foundation walls and crawl-space framing.</li>
<li><strong>Hollow or blistered wood</strong> — tap baseboards and door frames; termite-eaten wood sounds papery and hollow.</li>
<li><strong>Discarded wings</strong> — small piles of identical translucent wings on windowsills after a swarm.</li>
<li><strong>Swarmers</strong> — winged reproductives emerging on warm, humid spring afternoons, usually after rain (March–May across Alabama).</li>
</ul>

<h2>Termite swarmers vs. flying ants</h2>
<p><strong>Termite swarmers</strong> have straight antennae, a thick waist with no pinch, and two pairs of wings the same length that detach easily. <strong>Flying ants</strong> have bent (elbowed) antennae, a sharply pinched waist, and front wings clearly larger than back — and the wings don't detach in normal handling.</p>

<h2>What to do if you find signs</h2>
<p>Don't spray, don't knock down the mud tubes, and don't vacuum up swarmers before someone trained can confirm what you have — disturbing the colony makes it relocate. Take photos, bag a sample, and call a licensed Alabama company for a free inspection.</p>
<p>EnviroCare offers free termite inspections across central and north Alabama. If termites are present, we explain treatment options — Sentricon® bait stations and liquid soil treatments — with a written estimate. <a href="/quote">Request a free inspection</a> or call (205) 940-6360.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

