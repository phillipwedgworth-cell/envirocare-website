-- EnviroCare social drafts → Command Center "Needs Your Approval"
-- Inserts 9 compliant posts (Facebook + Google Business Profile) as status='draft'
-- into the social_posts table (schema: agents/social/schema-social-posts.sql).
-- Idempotent: ON CONFLICT (id) DO NOTHING. Run in the Supabase SQL editor OR via
-- a service-role client. After running, open /command-center?key=COMMAND_CENTER_KEY
-- and Approve the ones you want. Approved posts publish on the daily cron ONCE the
-- Meta/Google secrets are set (until then they wait, harmlessly).
--
-- platform: 'facebook' | 'google' (GBP)   location: 'birmingham' | 'huntsville' | 'lake_martin'

insert into social_posts (id, location, platform, post_type, headline, body, cta, graphic_url, scheduled_for, status) values
('2026-07-21-bhm-mosquito--facebook','birmingham','facebook','whats_new',
 'Mosquito season is in full swing',
 'Alabama summers bring the mosquitoes out in force. Our seasonal yard service (March–November) targets the shady, damp spots where mosquitoes breed and rest, knocking the population down around your home treatment after treatment. Family-owned across the Birmingham metro since 1958 — four generations of the Wedgworth family. Want a free quote? Call (205) 940-6360.',
 'Call (205) 940-6360', null, '2026-07-21T14:00:00Z','draft'),

('2026-07-22-bhm-pest--google','birmingham','google','offer',
 'Summer pest control, honest pricing',
 'Ants, roaches, and spiders finding their way in? Our exterior-first pest control covers 30+ Alabama pests with unlimited covered re-service and no contract — $35/mo on ACH, or $70 every other month. Serving the Birmingham metro from our Birmingham & Alabaster office since 1958. Call for a free quote.',
 'Call (205) 940-6360', null, '2026-07-22T14:00:00Z','draft'),

('2026-07-24-bhm-termite--facebook','birmingham','facebook','brand',
 'Termites don''t take the summer off',
 'Protect your home with Sentricon® Always Active™ — no drilling into your foundation, backed by EnviroCare''s own guarantee up to $1,000,000. Your price is confirmed after a free WDO inspection (Alabama requires one, and there''s no obligation). Fourth-generation, family-owned since 1958. Call (205) 940-6360.',
 'Book a free inspection — (205) 940-6360', null, '2026-07-24T14:00:00Z','draft'),

('2026-07-25-bhm-wasps--google','birmingham','google','whats_new',
 'Wasps and hornets around the eaves?',
 'Stinging insects showing up around the porch and eaves this time of year? EnviroCare handles wasp and hornet nests for our Birmingham-area pest customers, using EPA-registered products applied according to label directions — by the same local team that''s served Alabama since 1958. Call for a free quote.',
 'Call (205) 940-6360', null, '2026-07-25T14:00:00Z','draft'),

('2026-07-28-bhm-nocontract--facebook','birmingham','facebook','engagement',
 'Do I have to sign a long contract?',
 'It''s the question we hear most — and the answer is no. Our pest control is month-to-month: $35/mo on ACH, no long-term contract, with unlimited covered re-service between visits if anything shows up. Straight answers and steady service, the way we''ve done it since 1958. Call (205) 940-6360.',
 'Call (205) 940-6360', null, '2026-07-28T14:00:00Z','draft'),

('2026-07-29-hsv-pest--facebook','huntsville','facebook','offer',
 'New to EnviroCare in Huntsville & Madison?',
 'Get exterior-first pest control covering 30+ Alabama pests — unlimited covered re-service, no contract, $35/mo on ACH. We''re family-owned since 1958 and serve Huntsville and Madison from our local office. Call (256) 937-7676 for a free quote.',
 'Call (256) 937-7676', null, '2026-07-29T14:00:00Z','draft'),

('2026-07-31-hsv-mosquito--google','huntsville','google','whats_new',
 'North Alabama mosquito pressure is high',
 'Mosquitoes stay active across North Alabama through November. Our seasonal yard service targets the breeding and resting areas around your Huntsville home to reduce the population — we knock it down, treatment after treatment, rather than promising to eliminate them. Call for a free quote.',
 'Call (256) 937-7676', null, '2026-07-31T14:00:00Z','draft'),

('2026-08-01-lkm-heritage--facebook','lake_martin','facebook','brand',
 'Lakefront living, fewer pests',
 'Wooded and lakefront lots on Lake Martin bring extra pest pressure. EnviroCare has served this area since 1958 — four generations of the Wedgworth family — with exterior-first pest control and seasonal mosquito + tick yard service (March–November) to reduce the bugs around your place. Call (256) 234-6162.',
 'Call (256) 234-6162', null, '2026-08-01T14:00:00Z','draft'),

('2026-08-04-lkm-termite--google','lake_martin','google','offer',
 'Termite protection for your Lake Martin home',
 'Guard your home with Sentricon® Always Active™ — no drilling, backed by EnviroCare''s own guarantee up to $1,000,000. Your price is confirmed after a free WDO inspection. Serving Alexander City & Lake Martin since 1958. Call for a free inspection.',
 'Call (256) 234-6162', null, '2026-08-04T14:00:00Z','draft')

on conflict (id) do nothing;
