// agents/content-advisor.mjs
// Reads agent_findings from site-auditor and competitor-watcher (last 12hrs)
// Also reads envirocare_seo for ranking context
// Calls Claude Haiku to identify content gaps and prioritized recommendations
// Writes recommendations to agent_findings with category='content'

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateSet } from "./lib/kv.mjs";
import { writeFinding, readFindings, supabase } from "./lib/supabase.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
  "/bed-bug-inspection-alabama — bed bug inspection cost Alabama (high-intent, we can offer inspection even if not treatment)",
  "/wildlife-removal-alabama — wildlife removal Alabama (referral revenue opportunity)",
  "/pest-calendar-alabama — seasonal pest calendar blog (evergreen, drives organic traffic)",
  "/termite-season-alabama — termite season Alabama blog (high search volume, seasonal spike)",
  "/sentricon-vs-liquid-termite-treatment — comparison blog (high-intent buyer keyword)",
  "/pest-control-cost-alabama — how much does pest control cost in Alabama (high-intent)",
  "/reviews — testimonials/reviews page with schema markup (trust + CTR improvement)",
  "/pest-control-faq — FAQ page targeting featured snippets (schema Q&A markup)",
  "/service-area-map — service area map page (local SEO geo coverage)",
  "/hoa-pest-control — HOA pest control page (recurring B2B revenue)",
  "/rental-property-pest-control — rental property pest control (property manager audience)",
  "/new-home-pest-control — new construction pre-treatment (builders program)",
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

async function generateAdvice(findings, seoData, feedback = null) {
  const findingsSummary = findings.length
    ? findings.map(f => `[${f.agent_name}/${f.category}/${f.severity}] ${f.finding}`).join("\n")
    : "No findings from other agents this run";

  const seoSummary = seoData.length
    ? seoData.map(r => `${r.location}: SoLV ${r.solv ?? "?"}%, ARP ${r.arp ?? "?"}`).join("\n")
    : "No recent SEO snapshot data";

  const prompt = `You are a content strategist for EnviroCare Pest Control (Alabama, family-owned since 1958, 3 locations).

FINDINGS FROM THIS WEEK'S AUDIT:
${findingsSummary}

CURRENT SEO PERFORMANCE:
${seoSummary}

KNOWN CONTENT OPPORTUNITIES (choose the highest-impact ones):
${CONTENT_OPPORTUNITIES.join("\n")}

EXISTING PAGES (${KNOWN_PAGES.length} total, already covered):
${KNOWN_PAGES.join(", ")}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK:\n${feedback}` : ""}

Produce exactly 8 content recommendations prioritized by SEO and conversion impact.

STRICT FORMAT — start IMMEDIATELY with "1." on the very first line. No title. No intro. No sign-off.
Each item: URL slug + keyword it targets + effort (Low/Medium/High). MAX 30 WORDS PER ITEM.
Stop writing after item 8. Do not add any text, header, or section after item 8 — not even one word.
Hard limit: 240 words total.`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 650,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? "";
}

export async function run() {
  console.log("[content-advisor] Starting");

  const findings = await readFindings(["site-auditor", "competitor-watcher"], 12);
  console.log(`[content-advisor] Read ${findings.length} findings from upstream agents`);

  const seoData = await getLatestSeoData();
  console.log(`[content-advisor] ${seoData.length} SEO records loaded`);

  const draft = await generateAdvice(findings, seoData);

  const final = await criticLoop({
    workerName: "content-advisor",
    task: "Produce 8 prioritized content recommendations for EnviroCare based on audit findings and SEO data",
    output: draft,
    rubric: `
- First line starts with "1." — no title, no header, no intro sentence
- Exactly 8 numbered recommendations (count them)
- Each names a specific page title or URL slug
- Each states the keyword or gap it targets
- Each includes effort rating (Low/Medium/High)
- No "Next steps", no closing paragraph, no sign-off after item 8
- Under 300 words`,
    revise: (feedback) => generateAdvice(findings, seoData, feedback),
    onEscalate: async () => console.warn("[content-advisor] Critic maxed out"),
  });

  const lines = final.split(/\n/).filter(l => /^\d+\./.test(l.trim()));
  for (const line of lines) {
    const num = parseInt(line.match(/^(\d+)\./)?.[1] ?? "0");
    const text = line.replace(/^\d+\.\s*/, "").trim();
    if (text) {
      const effort = text.match(/\b(Low|Medium|High)\b/i)?.[1]?.toLowerCase() ?? "medium";
      const sev = num <= 3 ? "warning" : "info";
      await writeFinding("content-advisor", "content", sev, null, text,
        { recommendation_number: num, effort });
    }
  }
  if (lines.length === 0 && final) {
    await writeFinding("content-advisor", "content", "info", null,
      "Content recommendations batch", { full_output: final });
  }

  await stateSet("content-advisor:last-run", { date: new Date().toISOString(), recommendationCount: lines.length });
  console.log("[content-advisor] Done");
  return final;
}
