// agents/design-advisor.mjs
// Round 2 agent — runs AFTER competitor-deep-dive and site-auditor.
// PERSONA: Creative Director for a premium local service brand
// MODEL: claude-opus-4-20250514 | TEMPERATURE: 0.7 (creative)

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateSet } from "./lib/kv.mjs";
import { writeFinding, writeDiscussion, readFindings, readDiscussions } from "./lib/supabase.mjs";
import { knowledgeBlock } from "./lib/knowledge.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const BASE = "https://envirocarellc.com";
const MODEL = "claude-opus-4-20250514";
const TEMPERATURE = 0.7;

const SYSTEM_PROMPT = `You are the Creative Director for EnviroCare Pest Control.

YOUR IDENTITY:
You spent 15 years at top branding agencies designing for luxury hospitality and premium home services. You believe small businesses can look better than national chains if they lean into authenticity. You hate cookie-cutter templates. You push for bold moves that feel warm, not corporate.

YOUR GOAL:
Make EnviroCare look like the Apple of pest control — premium, trustworthy, bold. Every recommendation should make competitors look generic by comparison. When you see Cook's or Orkin's website, you immediately spot their lazy defaults: stock photos, impersonal CTAs, no local story. Then you design the opposite.

YOUR STANDARD:
Each recommendation must be so specific that a developer can implement it tomorrow. Not "improve trust signals" — "add a three-line testimonial from a Huntsville military family above the hero fold, using the customer's first name and neighborhood, in a warm cream card with a 4px left border in #16A34A." That's the level of specificity you demand.

You study competitors obsessively and find their blind spots. When you see Orkin using the same template for every city, you build something that screams "Alexander City, Alabama" instead of "generic pest control."`;

async function extractDesignSignals(html) {
  const h1s     = [...html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim());
  const h2s     = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].slice(0, 5).map(m => m[1].trim());
  const buttons = [...html.matchAll(/<button[^>]*>([^<]+)<\/button>/gi)].map(m => m[1].trim());
  const ctaLinks= [...html.matchAll(/href="[^"]*"[^>]*style="[^"]*background[^"]*"[^>]*>([^<]+)</gi)].map(m => m[1].trim());
  const metaDesc= html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null;
  const fonts   = [...html.matchAll(/font-family[:\s]+['"]?([^'";,]+)/gi)].map(m => m[1].trim());
  const googleFonts = [...html.matchAll(/fonts\.googleapis\.com[^"']*family=([^&"']+)/gi)].map(m => decodeURIComponent(m[1]));
  const colors  = [...new Set([
    ...[...html.matchAll(/color:\s*(#[0-9a-fA-F]{3,8})/g)].map(m => m[1]),
    ...[...html.matchAll(/background(?:-color)?:\s*(#[0-9a-fA-F]{3,8})/g)].map(m => m[1]),
  ])].slice(0, 20);
  const imgCount  = (html.match(/<img /gi) ?? []).length;
  const imgNoAlt  = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) ?? []).length;
  const hasViewport = html.includes('name="viewport"');
  const navItems  = [...html.matchAll(/<a[^>]+href="\/[^"]*"[^>]*>([^<]{3,40})<\/a>/gi)]
    .map(m => m[1].trim()).filter(t => !t.includes('<')).slice(0, 12);
  const phones  = [...new Set([...html.matchAll(/\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/g)].map(m => m[0]))];
  const prices  = [...html.matchAll(/\$\s*(\d[\d,]*(?:\.\d{2})?)\s*(?:\/\s*mo|per month)?/gi)].map(m => m[0].trim()).slice(0, 6);
  const testimonials = html.match(/review|testimonial/gi)?.length ?? 0;
  const hasTrustBadge = /sentricon|licensed|insured|certif|award/i.test(html);

  return { h1s, h2s, buttons, ctaLinks, metaDesc, fonts: [...new Set(fonts)].slice(0, 6),
           googleFonts, colors, imgCount, imgNoAlt, hasViewport, navItems, phones, prices,
           testimonials, hasTrustBadge };
}

async function generateRecommendations(signals, knowledge, competitorContext, auditContext, feedback = null) {
  const signalText = `
H1 tags found: ${signals.h1s.join(" | ") || "NONE — critical SEO gap"}
H2 tags (first 5): ${signals.h2s.join(" | ") || "none found"}
CTA buttons: ${signals.buttons.join(" | ") || "none detected"}
Navigation: ${signals.navItems.join(", ") || "none found"}
Phone numbers: ${signals.phones.join(", ") || "none visible"}
Prices shown: ${signals.prices.join(", ") || "no pricing visible"}
Google Fonts: ${signals.googleFonts.join(", ") || "none"}
Color palette: ${signals.colors.join(", ") || "none detected"}
Images: ${signals.imgCount} total, ${signals.imgNoAlt} missing alt text
Testimonials/reviews on page: ${signals.testimonials}
Trust badges present: ${signals.hasTrustBadge}
Mobile viewport: ${signals.hasViewport ? "present" : "MISSING"}`;

  const prompt = `${SYSTEM_PROMPT}

${knowledge}

WHAT YOU'RE LOOKING AT — EnviroCare's current website signals:
${signalText}

WHAT THE COMPETITOR ANALYST FOUND (read this before making your recommendations):
${competitorContext || "Competitor analysis not available this run — proceed based on knowledge base"}

WHAT THE SITE AUDITOR FOUND (read this before making your recommendations):
${auditContext || "Site audit not available this run — proceed based on knowledge base"}

${feedback ? `FEEDBACK FROM CHIEF STRATEGY OFFICER:\n${feedback}\n` : ""}

As Creative Director, produce exactly 10 design recommendations that would make EnviroCare look like the premium local option and make every national chain look generic.

REQUIREMENTS for each recommendation:
- Be SPECIFIC: name the exact element, exact copy suggestion, exact color or layout change
- Reference what a competitor does wrong (from competitor intel above)
- Include IMPACT: X/10 and EFFORT: X/10
- Format: [Item]. IMPACT: X/10 EFFORT: X/10

STRICT FORMAT — start IMMEDIATELY with "1." — no title, no intro, no sign-off.
Areas to cover: hero authenticity, trust credibility (Sentricon/1958), CTA specificity, mobile-first experience, local photography, pricing transparency, social proof placement, typography warmth, above-fold conversion, navigation clarity.
Hard limit: 400 words. Stop at item 10.`;

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 900,
    temperature: TEMPERATURE,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? "";
}

export async function run() {
  console.log("[design-advisor] Starting — Creative Director online");

  const knowledge = knowledgeBlock();

  const [competitorFindings, auditFindings, competitorDiscussions] = await Promise.all([
    readFindings(["competitor-deep-dive"], 6),
    readFindings(["site-auditor"], 6),
    readDiscussions(["competitor-deep-dive", "site-auditor"], 6),
  ]);

  const competitorContext = [
    ...competitorFindings.map(f => `[${f.category}/${f.severity}] ${f.finding}`),
    ...competitorDiscussions.map(d => `[${d.agent_name}] ${d.message}`),
  ].join("\n");

  const auditContext = auditFindings
    .map(f => `[${f.category}/${f.severity}] ${f.finding}`)
    .join("\n");

  console.log(`[design-advisor] Loaded ${competitorFindings.length} competitor findings, ${auditFindings.length} audit findings, ${competitorDiscussions.length} discussions`);

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
  const draft = await generateRecommendations(signals, knowledge, competitorContext, auditContext);

  const final = await criticLoop({
    workerName: "design-advisor",
    task: "Produce 10 specific premium design recommendations for EnviroCare that make national competitors look generic — with IMPACT and EFFORT scores",
    output: draft,
    rubric: `
- First line starts with "1." — no title, no header, no intro
- Exactly 10 numbered recommendations
- Each has IMPACT: X/10 and EFFORT: X/10
- Each is specific enough to implement tomorrow (names elements, copy, colors, or layout)
- Each references either a competitor weakness OR an audit finding
- References EnviroCare differentiators (1958, Sentricon, Lake Martin, family-owned)
- No generic advice ("improve CTAs") without specific details
- Under 450 words`,
    revise: (feedback) => generateRecommendations(signals, knowledge, competitorContext, auditContext, feedback),
    onEscalate: async () => console.warn("[design-advisor] Critic maxed out"),
  });

  const recLines = final.split(/\n/).filter(l => /^\d+\./.test(l.trim()));
  for (const line of recLines) {
    const num = parseInt(line.match(/^(\d+)\./)?.[1] ?? "0");
    const text = line.replace(/^\d+\.\s*/, "").trim();
    if (!text) continue;

    const impact = parseInt(text.match(/IMPACT:\s*(\d+)/i)?.[1] ?? "5");
    const effort = parseInt(text.match(/EFFORT:\s*(\d+)/i)?.[1] ?? "5");
    const sev = impact >= 8 ? "critical" : impact >= 6 ? "warning" : "info";

    await writeFinding("design-advisor", "design", sev, BASE, text, {
      recommendation_number: num, impact_score: impact, effort_score: effort,
    });

    await writeDiscussion({
      agentName: "design-advisor",
      referencesAgent: competitorFindings.length > 0 ? "competitor-deep-dive" : auditFindings.length > 0 ? "site-auditor" : null,
      message: `[design-rec #${num}] ${text}`,
      impactScore: impact,
      effortScore: effort,
    });
  }

  if (recLines.length === 0 && final) {
    await writeFinding("design-advisor", "design", "info", BASE, "Design recommendations batch", { full_output: final });
  }

  await stateSet("design-advisor:last-run", { signals, date: new Date().toISOString() });
  console.log("[design-advisor] Done");
  return final;
}
