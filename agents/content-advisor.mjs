// agents/content-advisor.mjs
// Round 2 agent — runs AFTER competitor-deep-dive and site-auditor.
// PERSONA: SEO Content Director for local service businesses
// MODEL: claude-sonnet-4-20250514 | TEMPERATURE: 0.6

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateSet } from "./lib/kv.mjs";
import { writeFinding, writeDiscussion, readFindings, readDiscussions, supabase } from "./lib/supabase.mjs";
import { knowledgeBlock } from "./lib/knowledge.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-sonnet-4-20250514";
const TEMPERATURE = 0.6;

const SYSTEM_PROMPT = `You are the SEO Content Director for EnviroCare Pest Control.

YOUR IDENTITY:
You built content strategies for 3 pest control companies from 0 to 500 organic leads/month. You know that "pest control near me" is won by the company with the deepest local content, not the biggest ad budget. You've watched national chains rank #1 on domain authority while a local company with a better story sits at #12 — and you know how to flip that.

YOUR GOAL:
Create content strategies that rank AND convert. Every piece should answer a real question Alabama homeowners are searching right now, written like a neighbor who happens to be an expert — not a corporate copywriter.

YOUR STANDARD:
You write for humans first, Google second. You push for topics competitors are too lazy to cover — the Lake Martin vacation home market, the Huntsville military family moving in from out of state, the Auburn student renter with a bed bug problem. You know that "pest control Birmingham AL" is a 2-year SEO battle, but "Lake Martin mosquito control" can be won in 90 days because no competitor has a dedicated office there.`;

const KNOWN_PAGES = [
  "/","/contact-us","/about-us","/pricing","/quote",
  "/alabaster","/huntsville","/alexander-city","/lake-martin",
  "/birmingham","/chelsea","/pelham","/hoover","/vestavia-hills","/mountain-brook",
  "/madison","/athens","/decatur","/hartselle","/auburn","/eclectic","/dadeville",
  "/services/pest-control","/services/sentricon","/services/mosquito-control",
  "/services/termite-control","/services/tick-control",
  "/bed-bugs","/rodents","/bee-wasp","/fire-ants","/wildlife",
  "/commercial","/builders","/realtor","/bundle-services",
  "/blog","/reviews","/why-envirocare","/special-offers","/pay",
  "/lake-martin/mosquito-control","/lake-martin/termite-control",
  "/alexander-city/mosquito-control","/alexander-city/termite-control",
  "/birmingham/mosquito-control","/birmingham/termite-control",
  "/huntsville/termite-control",
];

const CONTENT_OPPORTUNITIES = [
  "/pest-control-cost-alabama — 'how much does pest control cost Alabama' — competitors hide pricing, we show it — fastest trust win",
  "/sentricon-vs-liquid-termite-treatment — comparison page, high-intent buyer, we have $1M Sentricon warranty",
  "/lake-martin/termite-control — zero competitor coverage, own this in 60 days",
  "/lake-martin/mosquito-control — high-value seasonal lake home market, no competition",
  "/huntsville/pest-control — 'pest control Huntsville AL' — Cook's territory, need to challenge directly",
  "/birmingham/pest-control — long-term play, Orkin dominates on DA but not on local story",
  "/orkin-vs-envirocare-birmingham — 'orkin birmingham alternative' — capture mid-funnel buyer switching",
  "/cooks-pest-control-alternative — 'cooks pest control alternative' — capture Cook's dissatisfied customers",
  "/sentricon-alabama — we're Sentricon Certified, Terminix is NOT preferred partner",
  "/pest-control-faq — featured snippet target, Q&A schema markup, zero-cost long-tail coverage",
  "/termite-season-2026-alabama — seasonal spike content, Lake Martin + Birmingham angle",
  "/lake-martin-vacation-pest-control — vacation home niche, high income, recurring service",
];

async function getLatestSeoData() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("envirocare_seo")
    .select("*")
    .order("snapshot_date", { ascending: false })
    .limit(9);
  return data ?? [];
}

async function generateAdvice(findings, discussions, seoData, knowledge, feedback = null) {
  const findingsSummary = findings.length
    ? findings.map(f => `[${f.agent_name}/${f.category}/${f.severity}] ${f.finding}`).join("\n")
    : "No upstream findings this run";

  const discussionsSummary = discussions.length
    ? discussions.map(d => `[${d.agent_name}] impact=${d.impact_score} effort=${d.effort_score}: ${d.message}`).join("\n")
    : "No agent discussions this run";

  const seoSummary = seoData.length
    ? seoData.map(r => `${r.location}: SoLV ${r.solv ?? "?"}%, ARP ${r.arp ?? "?"}`).join("\n")
    : "No SEO snapshot — per knowledge base: Birmingham 39%, Huntsville 0%, Alex City 50%";

  const prompt = `${SYSTEM_PROMPT}

${knowledge}

WHAT SITE AUDITOR AND COMPETITOR ANALYST FOUND:
${findingsSummary}

CROSS-AGENT DISCUSSIONS THIS RUN:
${discussionsSummary}

CURRENT SEO PERFORMANCE:
${seoSummary}

CONTENT GAPS TO PRIORITIZE:
${CONTENT_OPPORTUNITIES.join("\n")}

PAGES ALREADY BUILT (${KNOWN_PAGES.length} pages):
${KNOWN_PAGES.join(", ")}

${feedback ? `FEEDBACK FROM CHIEF STRATEGY OFFICER:\n${feedback}\n` : ""}

As SEO Content Director, produce exactly 8 content recommendations.
Prioritize by: fastest-to-rank × revenue impact × competitor gap.

Each recommendation MUST include:
- Specific URL slug
- Primary keyword (the exact phrase people search)
- Which competitor we beat and WHY (cite their specific weakness from the findings above)
- IMPACT: X/10 | EFFORT: X/10

STRICT FORMAT — start IMMEDIATELY with "1." — no title, no intro, no sign-off.
Format: [number]. /[slug] — "[keyword]" — beats [competitor] because [specific reason]. IMPACT: X/10 EFFORT: X/10
Hard limit: 320 words. Stop at item 8.`;

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 800,
    temperature: TEMPERATURE,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? "";
}

export async function run() {
  console.log("[content-advisor] Starting — SEO Content Director online");

  const knowledge = knowledgeBlock();

  const [findings, discussions, seoData] = await Promise.all([
    readFindings(["site-auditor", "competitor-deep-dive", "competitor-watcher"], 6),
    readDiscussions(["site-auditor", "competitor-deep-dive"], 6),
    getLatestSeoData(),
  ]);

  console.log(`[content-advisor] ${findings.length} findings, ${discussions.length} discussions, ${seoData.length} SEO records`);

  const draft = await generateAdvice(findings, discussions, seoData, knowledge);

  const final = await criticLoop({
    workerName: "content-advisor",
    task: "8 prioritized content recommendations for EnviroCare that rank AND convert — with competitor context, IMPACT and EFFORT scores",
    output: draft,
    rubric: `
- First line starts with "1." — no title, no header, no intro
- Exactly 8 numbered recommendations
- Each names a specific URL slug (/slug format)
- Each states the exact search keyword (in quotes)
- Each names a specific competitor and their specific weakness
- Each has IMPACT: X/10 and EFFORT: X/10
- Prioritizes Lake Martin and Huntsville gaps
- No generic advice without EnviroCare specifics
- Under 350 words`,
    revise: (feedback) => generateAdvice(findings, discussions, seoData, knowledge, feedback),
    onEscalate: async () => console.warn("[content-advisor] Critic maxed out"),
  });

  const lines = final.split(/\n/).filter(l => /^\d+\./.test(l.trim()));
  for (const line of lines) {
    const num = parseInt(line.match(/^(\d+)\./)?.[1] ?? "0");
    const text = line.replace(/^\d+\.\s*/, "").trim();
    if (!text) continue;

    const impact = parseInt(text.match(/IMPACT:\s*(\d+)/i)?.[1] ?? "5");
    const effort = parseInt(text.match(/EFFORT:\s*(\d+)/i)?.[1] ?? "5");
    const sev = impact >= 8 ? "critical" : impact >= 6 ? "warning" : "info";

    await writeFinding("content-advisor", "content", sev, null, text,
      { recommendation_number: num, impact_score: impact, effort_score: effort });

    await writeDiscussion({
      agentName: "content-advisor",
      referencesAgent: discussions.length > 0 ? (discussions[0]?.agent_name ?? null) : null,
      message: `[content-rec #${num}] ${text}`,
      impactScore: impact,
      effortScore: effort,
    });
  }

  if (lines.length === 0 && final) {
    await writeFinding("content-advisor", "content", "info", null,
      "Content recommendations batch", { full_output: final });
  }

  await stateSet("content-advisor:last-run", { date: new Date().toISOString(), count: lines.length });
  console.log("[content-advisor] Done");
  return final;
}
