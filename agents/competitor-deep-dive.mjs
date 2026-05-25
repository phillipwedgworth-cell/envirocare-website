// agents/competitor-deep-dive.mjs
// Round 1 agent — runs FIRST, before design/content advisors.
// PERSONA: Competitive Intelligence Director (ex-franchise insider)
// MODEL: claude-sonnet-4-20250514 | TEMPERATURE: 0.5

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { writeFinding, writeDiscussion } from "./lib/supabase.mjs";
import { knowledgeBlock } from "./lib/knowledge.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-sonnet-4-20250514";
const TEMPERATURE = 0.5;

const SYSTEM_PROMPT = `You are the Competitive Intelligence Director for EnviroCare Pest Control.

YOUR IDENTITY:
You're a former digital strategist at a national pest control franchise. You left because they cared about volume over quality. You know exactly how the big players cut corners — thin content, stock photos, no local story, template websites built for a thousand franchises at once. You've watched Orkin copy-paste the same "pest control in [CITY]" page 800 times and rank #1 anyway — purely on domain authority, not quality.

YOUR GOAL:
Find every weakness in Cook's Pest, Terminix, and Orkin's digital presence and turn each one into a specific, actionable EnviroCare advantage. Not theoretical advantages — real gaps you can see right now on their websites.

YOUR STANDARD:
You don't write generic comparisons. You look at their actual CTAs, their actual trust badges, their actual pricing pages (or lack thereof), their actual testimonials, and you find the exact places where a family business with a real story can cut through. You know that Cook's has "Schedule Online" as their main CTA — and you know EnviroCare can beat that with "Same Technician Every Visit — Call [local number]."`;

const COMPETITORS = [
  {
    key:  "cooks",
    name: "Cook's Pest Control",
    url:  "https://www.cookspest.com",
    threat: "Primary threat — also local, Alabama family-owned, strong in Huntsville. Their scale is their weakness.",
  },
  {
    key:  "terminix-huntsville",
    name: "Terminix (Huntsville)",
    url:  "https://www.terminix.com/branch-offices/alabama/huntsville/",
    threat: "National chain with opaque pricing and call center. We win on price transparency and local relationships.",
  },
  {
    key:  "orkin-huntsville",
    name: "Orkin (Huntsville)",
    url:  "https://www.orkin.com/local/al/huntsville/",
    threat: "Ranks #1 on domain authority alone. Copy-paste city pages. Weakness: zero Alabama story.",
  },
];

function extractSignals(html, url) {
  const h1s        = [...html.matchAll(/<h1[^>]*>([^<]{3,80})<\/h1>/gi)].map(m => m[1].trim()).slice(0, 3);
  const h2s        = [...html.matchAll(/<h2[^>]*>([^<]{3,80})<\/h2>/gi)].map(m => m[1].trim()).slice(0, 6);
  const ctaBtns    = [...html.matchAll(/<(?:button|a)[^>]*>([A-Za-z][^<]{2,40})<\/(?:button|a)>/gi)]
                      .map(m => m[1].trim())
                      .filter(t => /\b(free|inspect|schedul|get|call|quote|book|start|contact|now)\b/i.test(t))
                      .slice(0, 8);
  const phones     = [...new Set([...html.matchAll(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g)].map(m => m[0]))].slice(0, 4);
  const prices     = [...html.matchAll(/\$\s*(\d[\d,]*(?:\.\d{2})?)\s*(?:\/\s*mo|per month|\/mo)?/gi)].map(m => m[0].trim()).slice(0, 6);
  const reviewMention = html.match(/(\d[\d,]*)\s*(?:reviews?|ratings?)/i)?.[0] ?? null;
  const hasPricing    = prices.length > 0 || /pricing|monthly plan|per month|\$\d/i.test(html);
  const hasWarranty   = /warrant[yi]/i.test(html);
  const hasNoContract = /no.?contract|cancel.?anytime|no obligation/i.test(html);
  const hasSameTech   = /same.?tech|same.?specialist|your technician/i.test(html);
  const hasLocalStory = /family.?owned|local|since \d{4}|generation|founded/i.test(html);
  const hasSchemaLD   = html.includes("application/ld+json");
  const trustBadges   = [...html.matchAll(/(?:badge|certified|licensed|insured|accredited|award)[^<]{0,80}/gi)]
                          .map(m => m[0].trim().slice(0, 60)).slice(0, 4);
  const metaDesc    = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{10,})["']/i)?.[1] ?? null;
  const imgCount    = (html.match(/<img /gi) ?? []).length;
  const hasVideo    = html.includes("<video") || /youtube|vimeo/i.test(html);

  return {
    url, h1s, h2s, ctaBtns, phones, prices, reviewMention,
    hasPricing, hasWarranty, hasNoContract, hasSameTech, hasLocalStory,
    hasSchemaLD, trustBadges, metaDesc, imgCount, hasVideo,
  };
}

async function analyzeCompetitor(competitor, signals, knowledge, feedback = null) {
  const prompt = `${SYSTEM_PROMPT}

${knowledge}

COMPETITOR YOU'RE ANALYZING: ${competitor.name}
URL: ${competitor.url}
WHY THEY'RE A THREAT: ${competitor.threat}

WHAT YOU'VE EXTRACTED FROM THEIR SITE RIGHT NOW:
- H1 tags: ${signals.h1s.join(" | ") || "none found"}
- H2 tags: ${signals.h2s.join(" | ") || "none found"}
- CTA buttons: ${signals.ctaBtns.join(" | ") || "none detected"}
- Pricing visible: ${signals.hasPricing ? "YES → " + (signals.prices.join(", ") || "no amounts shown") : "NO — hidden pricing"}
- Reviews/ratings mention: ${signals.reviewMention ?? "none found"}
- Has warranty claim: ${signals.hasWarranty}
- Has no-contract claim: ${signals.hasNoContract}
- Has same-technician claim: ${signals.hasSameTech}
- Has local/family story: ${signals.hasLocalStory}
- Trust badges: ${signals.trustBadges.join(" | ") || "none found"}
- Phone numbers: ${signals.phones.join(", ") || "none visible"}
- Schema markup: ${signals.hasSchemaLD}
- Images: ${signals.imgCount}
- Video content: ${signals.hasVideo}
${feedback ? `\nFEEDBACK FROM CHIEF STRATEGY OFFICER:\n${feedback}\n` : ""}

As Competitive Intelligence Director, produce EXACTLY this structure (start immediately with "STEAL THIS:" — zero intro text):

STEAL THIS:
1. [Specific tactic or element from ${competitor.name} EnviroCare should copy — what exactly, where exactly]
2. [Second tactic — must be specific, not general]
3. [Third tactic — cite the actual signal you saw above]

BEAT THEM ON:
1. [Specific EnviroCare advantage that directly counters a ${competitor.name} weakness — cite their actual gap]
2. [Second advantage — must be measurable or demonstrable on the website]
3. [Third advantage — name the EnviroCare differentiator and where to feature it]

CRITICAL GAP:
One sentence only: the single most important thing ${competitor.name} does well that EnviroCare currently doesn't match — and the fastest way to close it.

FORMAT: Under 220 words. No intro. No sign-off. Start with "STEAL THIS:"`;

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 600,
    temperature: TEMPERATURE,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? "";
}

function parseSection(text, header) {
  const start = text.indexOf(`${header}:`);
  if (start === -1) return [];
  const nextSection = text.search(new RegExp(`\\n[A-Z ]+:`, "m"), start + 1);
  const block = nextSection === -1 ? text.slice(start) : text.slice(start, nextSection);
  return block.split(/\n/).filter(l => /^\d+\./.test(l.trim()))
    .map(l => l.replace(/^\d+\.\s*/, "").trim()).filter(Boolean);
}

function parseCriticalGap(text) {
  const m = text.match(/CRITICAL GAP:\s*\n?(.+?)(?:\n\n|$)/s);
  return m?.[1]?.trim().replace(/\n/g, " ") ?? null;
}

export async function run() {
  console.log("[competitor-deep-dive] Starting — Competitive Intelligence Director online");
  const knowledge = knowledgeBlock();
  const allOutput = [];

  for (const comp of COMPETITORS) {
    console.log(`[competitor-deep-dive] Fetching ${comp.name}…`);

    let html = "";
    try {
      const res = await fetch(comp.url, {
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      });
      html = await res.text();
      console.log(`[competitor-deep-dive] ${comp.name} — ${html.length} chars`);
    } catch (err) {
      console.error(`[competitor-deep-dive] ${comp.name} fetch failed:`, err.message);
      await writeFinding("competitor-deep-dive", "competitor-intel", "warning", comp.url,
        `Could not fetch ${comp.name} — blocked or unreachable`, { competitor: comp.key });
      allOutput.push(`${comp.name}: fetch failed — ${err.message}`);
      continue;
    }

    const signals = extractSignals(html, comp.url);

    // Store raw signals
    await writeFinding("competitor-deep-dive", "competitor-intel", "info", comp.url,
      `${comp.name} signals: hasPricing=${signals.hasPricing}, hasNoContract=${signals.hasNoContract}, hasSameTech=${signals.hasSameTech}, reviewMention=${signals.reviewMention ?? "none"}`,
      { competitor: comp.key, signals });

    const draft = await analyzeCompetitor(comp, signals, knowledge);

    const final = await criticLoop({
      workerName: `competitor-deep-dive:${comp.key}`,
      task: `As Competitive Intelligence Director, analyze ${comp.name}'s site and produce steal-this/beat-them-on/critical-gap for EnviroCare`,
      output: draft,
      rubric: `
- Starts immediately with "STEAL THIS:" — zero intro text before it
- Exactly 3 numbered items under STEAL THIS, each citing actual signals from the competitor site
- Exactly 3 numbered items under BEAT THEM ON, each naming a specific EnviroCare differentiator
- CRITICAL GAP section present with exactly one sentence
- References EnviroCare specifics: 1958 founding, Sentricon, Lake Martin exclusivity, no contracts
- No generic advice (e.g., "improve your content" without specifics)
- Under 220 words`,
      revise: (fb) => analyzeCompetitor(comp, signals, knowledge, fb),
      onEscalate: async () => console.warn(`[competitor-deep-dive] ${comp.key} critic maxed out`),
    });

    allOutput.push(`\n=== ${comp.name.toUpperCase()} ===\n${final}`);

    // Write structured discussions
    const stealItems = parseSection(final, "STEAL THIS");
    const beatItems  = parseSection(final, "BEAT THEM ON");
    const gap        = parseCriticalGap(final);

    for (const item of stealItems) {
      await writeDiscussion({
        agentName: "competitor-deep-dive",
        referencesAgent: null,
        message: `[steal-from:${comp.key}] ${item}`,
        impactScore: 8,
        effortScore: 4,
      });
    }

    for (const item of beatItems) {
      await writeDiscussion({
        agentName: "competitor-deep-dive",
        referencesAgent: null,
        message: `[beat-${comp.key}] ${item}`,
        impactScore: 7,
        effortScore: 3,
      });
    }

    if (gap) {
      await writeDiscussion({
        agentName: "competitor-deep-dive",
        referencesAgent: null,
        message: `[critical-gap:${comp.key}] ${gap}`,
        impactScore: 9,
        effortScore: 5,
      });
      await writeFinding("competitor-deep-dive", "competitor-intel", "critical", comp.url,
        `Critical gap vs ${comp.name}: ${gap}`, { competitor: comp.key, type: "critical-gap" });
    }
  }

  const summary = allOutput.join("\n\n");
  console.log("[competitor-deep-dive] Done");
  return summary;
}
