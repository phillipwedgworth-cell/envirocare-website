// agents/design-advisor.mjs
// Fetches envirocarellc.com homepage, extracts design signals
// Calls Claude Haiku with EnviroCare brand context to produce 10 actionable design recommendations
// Writes recommendations to agent_findings table with category='design'

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateSet } from "./lib/kv.mjs";
import { writeFinding } from "./lib/supabase.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const BASE = "https://envirocarellc.com";

const BRAND_CONTEXT = `
COMPANY: EnviroCare Pest & Termite Services
- Family-owned since 1958, Alexander City Alabama, 3rd generation
- 3 offices: Birmingham/Alabaster, Alexander City/Lake Martin, Huntsville
- Tagline: "No One Cares Like EnviroCare"
- Logo: green circle with white sunflower

BRAND COLORS:
- Primary: Kelly green #1B7A3C (current) / #16A34A (target)
- Accent: Amber gold #F5A800 / #EAB308
- Background: warm cream/beige #FEFDF8
- Dark ink: #0E1A0F

COMPETITORS: Cook's Pest Control, Terminix, Orkin
GOAL: Look premium, local, and trustworthy — not generic or corporate
KNOWN ISSUE: Mobile PageSpeed score is 67/100 (bad — affects SEO and bounce rate)

TARGET CUSTOMER: Alabama homeowners, age 35-65, value local family business over big chains,
trust built through familiarity and professionalism.
`;

async function extractDesignSignals(html) {
  const h1s = [...html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim());
  const h2s = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].slice(0, 5).map(m => m[1].trim());
  const buttons = [...html.matchAll(/<button[^>]*>([^<]+)<\/button>/gi)].map(m => m[1].trim());
  const ctaLinks = [...html.matchAll(/href="[^"]*"[^>]*style="[^"]*background[^"]*"[^>]*>([^<]+)</gi)].map(m => m[1].trim());
  const metaDesc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null;
  const fonts = [...html.matchAll(/font-family[:\s]+['"]?([^'";,]+)/gi)].map(m => m[1].trim());
  const googleFonts = [...html.matchAll(/fonts\.googleapis\.com[^"']*family=([^&"']+)/gi)].map(m => decodeURIComponent(m[1]));
  const colors = [...new Set([
    ...[...html.matchAll(/color:\s*(#[0-9a-fA-F]{3,8})/g)].map(m => m[1]),
    ...[...html.matchAll(/background(?:-color)?:\s*(#[0-9a-fA-F]{3,8})/g)].map(m => m[1]),
  ])].slice(0, 20);
  const imgAlts = [...html.matchAll(/<img[^>]+alt=["']([^"']+)["']/gi)].map(m => m[1].trim()).slice(0, 10);
  const imgCount = (html.match(/<img /gi) ?? []).length;
  const imgNoAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) ?? []).length;
  const hasViewport = html.includes('name="viewport"');
  const navItems = [...html.matchAll(/<a[^>]+href="\/[^"]*"[^>]*>([^<]{3,40})<\/a>/gi)]
    .map(m => m[1].trim()).filter(t => !t.includes('<')).slice(0, 12);
  const phones = [...new Set([...html.matchAll(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g)].map(m => m[0]))];

  return { h1s, h2s, buttons, ctaLinks, metaDesc, fonts: [...new Set(fonts)].slice(0, 6),
           googleFonts, colors, imgAlts, imgCount, imgNoAlt, hasViewport, navItems, phones };
}

async function generateRecommendations(signals, feedback = null) {
  const signalText = `
H1 tags: ${signals.h1s.join(" | ") || "none found"}
H2 tags (first 5): ${signals.h2s.join(" | ") || "none found"}
Button text: ${signals.buttons.join(" | ") || "none found"}
Navigation items: ${signals.navItems.join(", ") || "none found"}
Phone numbers visible: ${signals.phones.join(", ") || "none"}
Meta description: ${signals.metaDesc || "missing"}
Google Fonts loaded: ${signals.googleFonts.join(", ") || "none"}
Font families used: ${signals.fonts.join(", ") || "none"}
Color palette (hex): ${signals.colors.join(", ") || "none detected"}
Images: ${signals.imgCount} total, ${signals.imgNoAlt} missing alt text
Mobile viewport meta: ${signals.hasViewport ? "present" : "MISSING"}
`;

  const prompt = `You are a conversion-focused web design consultant analyzing EnviroCare Pest Control's website.

${BRAND_CONTEXT}

CURRENT SITE SIGNALS:
${signalText}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK:\n${feedback}` : ""}

Produce exactly 10 specific, actionable design recommendations.

STRICT FORMAT — start IMMEDIATELY with "1." on the very first line. No title. No introduction. No header. No sign-off after item 10.
Each item: ONE clause problem + ONE clause fix. MAX 20 WORDS PER ITEM. Reference actual site signals.
Cover one each: hero, trust signals, CTAs, mobile, photography, fonts, colors, page speed, social proof, navigation.
Hard limit: 220 words total. Stop at item 10. Complete every sentence — never cut off mid-word.`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 700,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? "";
}

export async function run() {
  console.log("[design-advisor] Starting");

  let html = "";
  try {
    const res = await fetch(BASE, { signal: AbortSignal.timeout(12000) });
    html = await res.text();
    console.log("[design-advisor] Homepage fetched — " + html.length + " chars");
  } catch (err) {
    console.error("[design-advisor] Fetch failed:", err.message);
    html = "";
  }

  const signals = await extractDesignSignals(html);
  const draft = await generateRecommendations(signals);

  const final = await criticLoop({
    workerName: "design-advisor",
    task: "Produce 10 specific actionable design recommendations for EnviroCare's website",
    output: draft,
    rubric: `
- First line starts with "1." — no title, no header, no intro sentence before it
- Exactly 10 numbered recommendations (count them)
- Each covers a distinct design area
- Each has a specific fix referencing EnviroCare
- No preamble, title, or sign-off
- Under 350 words`,
    revise: (feedback) => generateRecommendations(signals, feedback),
    onEscalate: async () => console.warn("[design-advisor] Critic maxed out"),
  });

  const recLines = final.split(/\n/).filter(l => /^\d+\./.test(l.trim()));
  for (const line of recLines) {
    const num = line.match(/^(\d+)\./)?.[1];
    const text = line.replace(/^\d+\.\s*/, "").trim();
    if (text) {
      const sev = parseInt(num) <= 3 ? "warning" : "info";
      await writeFinding("design-advisor", "design", sev, BASE, text, { recommendation_number: parseInt(num) });
    }
  }
  if (recLines.length === 0 && final) {
    await writeFinding("design-advisor", "design", "info", BASE, "Design recommendations batch", { full_output: final });
  }

  await stateSet("design-advisor:last-run", { signals, date: new Date().toISOString() });
  console.log("[design-advisor] Done");
  return final;
}
