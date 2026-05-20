(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return s},formatWithValidation:function(){return h},urlObjectKeys:function(){return l}};for(var o in a)Object.defineProperty(r,o,{enumerable:!0,get:a[o]});let i=e.r(90809)._(e.r(98183)),n=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,a=e.protocol||"",o=e.pathname||"",s=e.hash||"",l=e.query||"",h=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?h=t+e.host:r&&(h=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(h+=":"+e.port)),l&&"object"==typeof l&&(l=String(i.urlQueryToSearchParams(l)));let u=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||n.test(a))&&!1!==h?(h="//"+(h||""),o&&"/"!==o[0]&&(o="/"+o)):h||(h=""),s&&"#"!==s[0]&&(s="#"+s),u&&"?"!==u[0]&&(u="?"+u),o=o.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${a}${h}${o}${u}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function h(e){return s(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let a=e.r(71645);function o(e,t){let r=(0,a.useRef)(null),o=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,a)),t&&(o.current=i(t,a))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let a=e.r(18967),o=e.r(52817);function i(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return y},useLinkStatus:function(){return w}};for(var o in a)Object.defineProperty(r,o,{enumerable:!0,get:a[o]});let i=e.r(90809),n=e.r(43476),s=i._(e.r(71645)),l=e.r(95057),h=e.r(8372),u=e.r(18581),c=e.r(18967),d=e.r(5550);e.r(33525);let p=e.r(88540),m=e.r(91949),f=e.r(73668),g=e.r(9396);function y(t){var r,a;let o,i,y,[w,v]=(0,s.useOptimistic)(m.IDLE_LINK_STATUS),k=(0,s.useRef)(null),{href:x,as:T,children:A,prefetch:S=null,passHref:W,replace:j,shallow:C,scroll:M,onClick:E,onMouseEnter:q,onTouchStart:D,legacyBehavior:O=!1,onNavigate:F,transitionTypes:L,ref:P,unstable_dynamicOnHover:N,...I}=t;o=A,O&&("string"==typeof o||"number"==typeof o)&&(o=(0,n.jsx)("a",{children:o}));let B=s.default.useContext(h.AppRouterContext),_=!1!==S,R=!1!==S?null===(a=S)||"auto"===a?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,z="string"==typeof(r=T||x)?r:(0,l.formatUrl)(r);if(O){if(o?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=s.default.Children.only(o)}let H=O?i&&"object"==typeof i&&i.ref:P,$=s.default.useCallback(e=>(null!==B&&(k.current=(0,m.mountLinkInstance)(e,z,B,R,_,v)),()=>{k.current&&((0,m.unmountLinkForCurrentNavigation)(k.current),k.current=null),(0,m.unmountPrefetchableInstance)(e)}),[_,z,B,R,v]),U={ref:(0,u.useMergedRef)($,H),onClick(t){O||"function"!=typeof E||E(t),O&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!B||t.defaultPrevented||function(t,r,a,o,i,n,l){if("u">typeof window){let h,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((h=t.currentTarget.getAttribute("target"))&&"_self"!==h||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,f.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),n){let e=!1;if(n({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:c}=e.r(99781);s.default.startTransition(()=>{c(r,o?"replace":"push",!1===i?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,a.current,l)})}}(t,z,k,j,M,F,L)},onMouseEnter(e){O||"function"!=typeof q||q(e),O&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),B&&_&&(0,m.onNavigationIntent)(e.currentTarget,!0===N)},onTouchStart:function(e){O||"function"!=typeof D||D(e),O&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),B&&_&&(0,m.onNavigationIntent)(e.currentTarget,!0===N)}};return(0,c.isAbsoluteUrl)(z)?U.href=z:O&&!W&&("a"!==i.type||"href"in i.props)||(U.href=(0,d.addBasePath)(z)),y=O?s.default.cloneElement(i,U):(0,n.jsx)("a",{...I,...U,children:o}),(0,n.jsx)(b.Provider,{value:w,children:y})}e.r(84508);let b=(0,s.createContext)(m.IDLE_LINK_STATUS),w=()=>(0,s.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},25102,e=>{"use strict";let t=[{slug:"alabama-termite-swarm-season",title:"Why Alabama Termite Season Starts in March — And What to Watch For",excerpt:"Every March, subterranean termite swarmers emerge across Alabama. Here's how to spot them, why Birmingham's clay soil makes it worse, and what we recommend.",publishedAt:"2026-03-04",author:"Kevin Wedgworth",category:"Termites",readMinutes:6,heroEmoji:"🪵",metaTitle:"Alabama Termite Swarm Season Guide | EnviroCare Since 1958",metaDescription:"Alabama termite swarm season peaks March–May. Spot the signs, protect your home with Sentricon® $1M coverage. Free inspection. Call (205) 649-5278.",body:`
<p class="lede">If you live in Alabama and you've never seen a termite swarm, you will. They show up like clockwork — sometime between mid-March and late May, on the first warm humid afternoon after a soaking rain. Hundreds of winged insects boiling up out of a stump, a porch column, or worse, a baseboard inside your living room.</p>

<p>That's what we get the most calls about every spring. So here's what's actually happening, why Alabama gets hit harder than most states, and what we tell every customer when they call.</p>

<h2>Why March?</h2>

<p>Subterranean termites — the ones that cause 95% of the damage in our state — live in colonies hundreds of thousands strong, deep underground. They eat year-round, but they only <em>reproduce</em> when conditions are exactly right: soil temperature above 70\xb0F, recent rainfall, warm humid afternoon air.</p>

<p>In Birmingham, that combination usually shows up in the second or third week of March. Down in Auburn it can hit a week earlier. In Huntsville, sometimes a week later. But by April, every county we serve is in peak swarm.</p>

<h2>What you'll actually see</h2>

<p>A termite swarmer looks almost identical to a flying ant — about half an inch long, dark brown, with four wings. The easy tell: termite wings are all the same length, and they break off easily. If you find a pile of identical translucent wings on a windowsill or near a baseboard, you have termites. Not "you might." You do.</p>

<p>The swarmers themselves don't bite, don't sting, don't damage anything. They're just looking for a mate so they can start a new colony. The damage is being done by the workers underground — the ones you'll never see.</p>

<h2>Why Birmingham gets it worse</h2>

<p>Two reasons. First, our red clay soil holds moisture for weeks after rain. That's perfect for termites — they need constant moisture to survive. Second, our housing stock skews old. A lot of homes in Forest Park, Mountain Brook, Crestwood, and Vestavia were built before subterranean termite treatment was even routinely required. The wood-to-soil contact in those old foundations is exactly what termites are hunting for.</p>

<p>Newer construction in Trussville, Helena, and Greystone gets pre-treated at the slab pour, but pre-treat warranties typically expire after 5 years. After that, the home is on its own unless the owner signs up for ongoing protection.</p>

<h2>What we recommend</h2>

<p>We've been treating Alabama termites since 1958. For three generations, the company my grandfather started has tried every method the industry has thrown at homeowners — chlordane (banned), Dursban (banned), liquid soil barriers, foaming agents, baits. The one that consistently works in our clay soil is <strong>Sentricon\xae Always Active™</strong>.</p>

<p>It's a bait station system. We install monitoring stations every 10–15 feet around your foundation. When termites find the stations (they always do — they're constantly foraging), they take the bait back to the colony, and the entire colony collapses. No drilling into your slab. No tank trucks. No chemicals injected into the soil under your kids' play area.</p>

<p>Sentricon is backed by a $1,000,000 damage repair warranty from Corteva — the manufacturer. If termites cause damage to your home while we're protecting it, that's covered.</p>

<h2>If you find swarmers in your house</h2>

<p>Don't panic. Don't bug-bomb the room. Don't try to scrub them up before "they get worse." Take three steps:</p>

<ol>
<li><strong>Photograph</strong> what you found — both the swarmers and the location.</li>
<li><strong>Collect a few</strong> in a sandwich bag, just in case.</li>
<li><strong>Call us</strong> for a free inspection. We'll send a Sentricon-certified technician within 24 hours, usually same-day. The inspection is free and there's no obligation.</li>
</ol>

<p>Call our nearest office:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>

<p><em>Kevin Wedgworth is the third-generation owner of EnviroCare Pest &amp; Termite Services, founded by his grandfather Phillip M. Wedgworth in Alexander City, Alabama, in 1958.</em></p>
`},{slug:"sentricon-vs-liquid-termite-treatment",title:"Sentricon vs. Liquid Termite Treatment: What's Actually Different?",excerpt:"The pest control industry will sell you either a Sentricon bait system or a liquid soil barrier. Here's an honest comparison from a company that's done both.",publishedAt:"2026-02-18",author:"Kevin Wedgworth",category:"Termites",readMinutes:5,heroEmoji:"🛡️",metaTitle:"Sentricon vs Liquid Termite Treatment | Honest Comparison",metaDescription:"Alabama Sentricon vs liquid termite barrier — which is better for your home? Real pros and cons from a Sentricon® Certified Specialist since 1958.",body:`
<p class="lede">When a pest control company shows up to inspect your home for termites, you're going to be offered one of two paths: a Sentricon\xae bait system, or a liquid soil termiticide barrier (Termidor, Premise, Bifen). The salesperson is going to be very confident their option is best. So let me try to be straight with you.</p>

<h2>The short version</h2>

<p>For 98% of Alabama homes, Sentricon is the better choice. Here's why — and here's where liquid still has a place.</p>

<h2>How each one actually works</h2>

<p><strong>Liquid termiticide</strong> is exactly what it sounds like. The technician digs a 6-inch trench around your foundation, or drills through your concrete slab every 12 inches, and injects gallons of termiticide into the soil. The treated soil becomes a barrier — termites that try to cross it either die or are repelled. To do it right on a typical 2,000 sq ft home requires 100–300 gallons of finished solution.</p>

<p><strong>Sentricon\xae</strong> is a bait system. We install plastic monitoring stations every 10–15 feet around your foundation, just below the soil surface. Inside each station is a bait matrix that contains noviflumuron — an insect growth regulator that's about 10,000 times more toxic to termites than to mammals. Workers find the bait, take it back to the colony, and feed it to the queen and the rest. The colony dies within a few months.</p>

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

<p>Sentricon is also slightly more expensive in year one. Our pricing: $380 installation plus annual renewal, or $32/month spread across the year. Liquid is typically a single up-front $1,200–$2,000 charge for a five-year warranty. After year five, most homeowners renew Sentricon and walk away from liquid because the soil treatment has degraded.</p>

<h2>What we actually do</h2>

<p>EnviroCare has been a Sentricon\xae Certified Specialist since the system was approved for residential use. Three generations of my family have treated termites in this state — my grandfather started the company in 1958 with a single truck and a chlordane sprayer. We've used every method the industry has thrown at us, and Sentricon is what we recommend now.</p>

<p>Free inspection. Call the office nearest you:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`},{slug:"lake-martin-mosquito-guide",title:"The Lake Martin Mosquito Survival Guide",excerpt:"If you own a home on Lake Martin, you know August evenings on the dock are a war zone. Here's our 21-day yard-barrier system, and what NOT to spend money on.",publishedAt:"2026-04-22",author:"Kevin Wedgworth",category:"Mosquito Control",readMinutes:5,heroEmoji:"🦟",metaTitle:"Lake Martin Mosquito Control Guide | EnviroCare Since 1958",metaDescription:"Lake Martin mosquito control. 21-day yard barrier service April–October. Family-owned, pet-safe. Reclaim your dock. Call (256) 234-6162.",body:`
<p class="lede">Lake Martin is paradise from April through October — until the sun goes down. Then it's a no-fly zone unless you're a mosquito, in which case it's an all-you-can-eat buffet.</p>

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

<h2>What we do — 21-day yard barrier</h2>

<p>We treat the perimeter of your property and the harborage zones — the shaded undersides of decks, the boathouse rafters, the hedge lines, the tree canopy up to about 20 feet. The product binds to leaf surfaces and kills mosquitoes that land. After 21 days, UV breakdown degrades it and we come back.</p>

<p>April through October. Up to 12 treatments per season. $45/month, or bundle with tick and flea for $60/month.</p>

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

<p>If you're on the lake, you also have ticks. Every wooded lot in Tallapoosa County has Lone Star ticks and Dog ticks. Our standard recommendation for lake homes is the Outdoor Bundle: mosquito + tick + flea yard treatment, $60/month, April through October.</p>

<p>Call our Alex City / Lake Martin office: <strong>(256) 234-6162</strong>.</p>
`},{slug:"fire-ants-alabama-summer",title:"Fire Ants in Alabama: Why They Get Worse Every Summer, and How to Actually Kill Them",excerpt:"Spot treatment doesn't work. Mound drenching barely works. Here's what does — and why fire ants love Alabama more than almost anywhere in the U.S.",publishedAt:"2026-05-10",author:"Kevin Wedgworth",category:"Fire Ants",readMinutes:4,heroEmoji:"🌻",metaTitle:"Alabama Fire Ant Control | EnviroCare Yard Treatment",metaDescription:"Alabama fire ant control. Yard-wide elimination, not spot treatment. Critical for lake homes and barefoot families. Family-owned. Call (205) 649-5278.",body:`
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
<li>Be applied during the active foraging window — 70\xb0F to 90\xb0F, with no rain in the next 24 hours.</li>
</ul>

<p>We use a granular bait product applied across the whole yard, typically at 1 to 1.5 pounds per acre. Workers find it within 30 minutes, harvest it, take it underground, and the colony collapses over 4 to 8 weeks. Treated yards stay clear for 12 to 18 months.</p>

<h2>Why lake homes are worse</h2>

<p>Lake Martin, Smith Lake, Wheeler Lake, Logan Martin — every reservoir in Alabama has heavy fire ant pressure on the surrounding lots. Two reasons. First, fire ants thrive in disturbed soil — and lakefront construction disturbs a lot of soil. Second, mound flooding during high-water periods causes <em>rafting</em> — entire colonies clump into living balls and float to dry ground. Those rafts wash up on your lot, dry out, and become new mounds.</p>

<p>If you have a lake home and kids who go barefoot, fire ant control is not optional. A single sting won't kill anyone (unless they have a severe allergy), but 50 stings on a 4-year-old's foot is a trip to the emergency room.</p>

<h2>When to schedule treatment</h2>

<p>April to October. The two best windows are early May (before peak summer mound activity) and late August (catches the second-wave colonies). One treatment usually gets a yard, but heavily infested lots may need a follow-up at 60 days.</p>

<h2>Pricing</h2>

<p>Fire ant control is an add-on to our pest control program, or a one-time service if that's all you need. Bundles with our outdoor program (mosquito + tick + flea) for the most complete summer protection.</p>

<p>Same-day scheduling available. Call our nearest office:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>
`},{slug:"real-estate-wdo-letter-explained",title:"The WDO Letter Explained: What Alabama Lenders Actually Require at Closing",excerpt:'You\'re buying a house in Alabama. Your lender is asking for a "WDO letter" or "termite letter." Here\'s what it actually is, what gets you a clear letter, and what gets you a delay.',publishedAt:"2026-01-28",author:"Kevin Wedgworth",category:"Real Estate",readMinutes:5,heroEmoji:"🏠",metaTitle:"Alabama WDO Termite Letter Guide | EnviroCare Fast Turnaround",metaDescription:"Alabama WDO inspection letters for closings. Lender-ready format. 48-hour turnaround. Family-owned since 1958. Call (205) 649-5278.",body:`
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

<p>If you're buying a home that already has a Sentricon\xae bait system installed (look for the round green caps in the soil around the foundation), the existing warranty can transfer to you for a small fee — usually $50 to $100. That's almost always worth doing. A transferred Sentricon warranty preserves your $1,000,000 damage coverage with the home.</p>

<p>If the home has a liquid termite treatment instead, those warranties also transfer but check the remaining years carefully — most liquid warranties expire 5 years after the original treatment date.</p>

<h2>Schedule a WDO inspection</h2>

<p>Call the office nearest the property:</p>
<ul>
<li>Birmingham — (205) 940-6360</li>
<li>Lake Martin / Alex City — (256) 234-6162</li>
<li>Huntsville — (256) 937-7676</li>
</ul>

<p>Or our main line, <strong>(205) 649-5278</strong>. Standard turnaround is 48 hours. Rush inspections are available when needed.</p>
`}];e.s(["getAllPosts",0,function(){return[...t].sort((e,t)=>new Date(t.publishedAt).getTime()-new Date(e.publishedAt).getTime())},"getPostBySlug",0,function(e){return t.find(t=>t.slug===e)}])},18566,(e,t,r)=>{t.exports=e.r(76562)},52803,e=>{"use strict";var t=e.i(43476),r=e.i(25102),a=e.i(22016),o=e.i(18566);let i=`
.bpp-main {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #FEFDF8;
  color: #0E1A0F;
}
.bpp-hero {
  padding: 80px 24px 60px;
  background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%);
}
.bpp-hero-inner {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}
.bpp-back {
  display: inline-block;
  font-size: 14px;
  color: #0E8E40;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 32px;
}
.bpp-back:hover { text-decoration: underline; }
.bpp-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.bpp-cat {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #0E8E40;
  background: #E8F5EE;
  padding: 6px 14px;
  border-radius: 999px;
}
.bpp-time {
  font-size: 13px;
  color: #5A6660;
}
.bpp-emoji {
  font-size: 64px;
  margin-bottom: 20px;
}
.bpp-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 20px;
  color: #0E1A0F;
}
.bpp-excerpt {
  font-size: 19px;
  color: #5A6660;
  line-height: 1.55;
  margin: 0 0 28px;
  font-style: italic;
}
.bpp-byline {
  font-size: 14px;
  color: #5A6660;
}
.bpp-byline strong { color: #0E1A0F; }
.bpp-body-wrap {
  padding: 60px 24px;
}
.bpp-body {
  max-width: 720px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.7;
  color: #1A2620;
}
.bpp-body p { margin: 0 0 1.4em; }
.bpp-body p.lede {
  font-size: 22px;
  line-height: 1.5;
  color: #0E1A0F;
  border-left: 4px solid #F5A800;
  padding-left: 20px;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
}
.bpp-body h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 30px;
  font-weight: 700;
  margin: 2em 0 0.6em;
  color: #0E1A0F;
  line-height: 1.25;
}
.bpp-body h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  margin: 1.6em 0 0.5em;
  color: #0E1A0F;
}
.bpp-body ul, .bpp-body ol {
  margin: 0 0 1.4em;
  padding-left: 1.5em;
}
.bpp-body li {
  margin-bottom: 0.6em;
}
.bpp-body strong { color: #0E1A0F; }
.bpp-body em { font-style: italic; }
.bpp-body a {
  color: #0E8E40;
  font-weight: 600;
}
.bpp-cta-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
}
.bpp-cta-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.bpp-cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin: 0 0 12px;
}
.bpp-cta-sub {
  font-size: 17px;
  opacity: 0.92;
  margin: 0 0 32px;
}
.bpp-cta-phones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}
.bpp-cta-phone {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
}
.bpp-cta-phone strong {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.85;
}
.bpp-cta-phone:hover { background: rgba(255, 255, 255, 0.25); }
`;e.s(["default",0,function({slug:e}){let n=(0,r.getPostBySlug)(e);return n||(0,o.notFound)(),(0,t.jsxs)("main",{className:"bpp-main",children:[(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:i}}),(0,t.jsxs)("article",{children:[(0,t.jsx)("header",{className:"bpp-hero",children:(0,t.jsxs)("div",{className:"bpp-hero-inner",children:[(0,t.jsx)(a.default,{href:"/blog",className:"bpp-back",children:"← All Field Notes"}),(0,t.jsxs)("div",{className:"bpp-meta",children:[(0,t.jsx)("span",{className:"bpp-cat",children:n.category}),(0,t.jsxs)("span",{className:"bpp-time",children:[n.readMinutes," min read"]})]}),(0,t.jsx)("div",{className:"bpp-emoji",children:n.heroEmoji}),(0,t.jsx)("h1",{className:"bpp-title",children:n.title}),(0,t.jsx)("p",{className:"bpp-excerpt",children:n.excerpt}),(0,t.jsxs)("div",{className:"bpp-byline",children:["By ",(0,t.jsx)("strong",{children:n.author})," · ",new Date(n.publishedAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})]})]})}),(0,t.jsx)("div",{className:"bpp-body-wrap",children:(0,t.jsx)("div",{className:"bpp-body",dangerouslySetInnerHTML:{__html:n.body}})}),(0,t.jsx)("section",{className:"bpp-cta-section",children:(0,t.jsxs)("div",{className:"bpp-cta-inner",children:[(0,t.jsx)("h2",{className:"bpp-cta-title",children:"Ready to Schedule?"}),(0,t.jsx)("p",{className:"bpp-cta-sub",children:"Call the EnviroCare office nearest you."}),(0,t.jsxs)("div",{className:"bpp-cta-phones",children:[(0,t.jsxs)("a",{href:"tel:2059406360",className:"bpp-cta-phone",children:[(0,t.jsx)("strong",{children:"Birmingham"}),"(205) 940-6360"]}),(0,t.jsxs)("a",{href:"tel:2562346162",className:"bpp-cta-phone",children:[(0,t.jsx)("strong",{children:"Lake Martin / Alex City"}),"(256) 234-6162"]}),(0,t.jsxs)("a",{href:"tel:2569377676",className:"bpp-cta-phone",children:[(0,t.jsx)("strong",{children:"Huntsville"}),"(256) 937-7676"]})]})]})})]})]})}])}]);