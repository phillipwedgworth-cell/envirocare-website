import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { envUrl } from "@/lib/env-url";

export const runtime = "nodejs";
export const maxDuration = 120;

const SITE_URL = "https://www.envirocarellc.com";

const PAGES_TO_CHECK = [
  { path: "/", label: "Homepage" },
  { path: "/services/termite-control", label: "Termite page" },
  { path: "/services/pest-control", label: "Pest page" },
  { path: "/services/mosquito", label: "Mosquito page" },
  { path: "/huntsville", label: "Huntsville city page" },
  { path: "/birmingham", label: "Birmingham city page" },
];

async function runGeminiStyleCheck(pageUrl: string, pageLabel: string): Promise<string> {
  const prompt = `You are a professional web design critic specializing in local service businesses.

Visit this page and evaluate it on visual design quality, brand consistency, mobile UX, and conversion optimization:
${pageUrl}

Focus on:
1. Visual hierarchy — does the most important content (phone, CTA, service) stand out?
2. Brand consistency — colors, fonts, logo treatment
3. Mobile experience — is it clean and tappable on a phone?
4. Trust signals — do reviews, credentials, family story land properly?
5. Speed indicators — any obviously heavy elements?

Return a JSON object exactly like this (no markdown, no explanation outside JSON):
{
  "page": "${pageLabel}",
  "url": "${pageUrl}",
  "score": 85,
  "grade": "B+",
  "top_issue": "Single most important problem to fix",
  "wins": ["thing working well 1", "thing working well 2"],
  "fixes": ["specific fix 1", "specific fix 2", "specific fix 3"],
  "mobile_score": 80,
  "conversion_score": 75
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
}

async function runGPTStyleCheck(pageUrl: string, pageLabel: string): Promise<string> {
  const prompt = `You are a senior UX and SEO consultant for local service businesses.

Analyze this page for conversion effectiveness and SEO quality:
${pageUrl}

Evaluate:
1. Above-the-fold clarity — can a visitor immediately understand the offer and location?
2. CTA placement and language
3. Local SEO signals — city name, service terms, schema
4. Content trust — does the copy feel authentic or generic?
5. One thing that would most increase leads if fixed

Return JSON only (no markdown):
{
  "page": "${pageLabel}",
  "url": "${pageUrl}",
  "lead_score": 78,
  "seo_score": 82,
  "top_win": "Best thing about this page",
  "top_fix": "Highest-impact fix for more leads",
  "copy_notes": "Brief note on copy quality",
  "cta_rating": "strong|ok|weak",
  "local_seo_rating": "strong|ok|weak"
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 600,
    }),
  });

  if (!res.ok) throw new Error(`GPT error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "{}";
}

function safeJson(raw: string): Record<string, unknown> {
  try {
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { raw_text: raw, parse_error: true };
  }
}

export async function GET() {
  const supabase = createClient(
    envUrl("SUPABASE_URL")!,
    process.env.SUPABASE_KEY!
  );

  const runId = `style-${Date.now()}`;
  const results: Record<string, unknown>[] = [];

  // Run Gemini + GPT checks on first 3 pages (fast path — stay under timeout)
  const pagesToRun = PAGES_TO_CHECK.slice(0, 3);

  for (const page of pagesToRun) {
    const url = `${SITE_URL}${page.path}`;
    try {
      const [geminiRaw, gptRaw] = await Promise.all([
        runGeminiStyleCheck(url, page.label),
        runGPTStyleCheck(url, page.label),
      ]);

      const gemini = safeJson(geminiRaw);
      const gpt = safeJson(gptRaw);

      const combined = {
        page: page.label,
        url,
        gemini_visual: gemini,
        gpt_conversion: gpt,
        checked_at: new Date().toISOString(),
      };

      results.push(combined);

      // Store each finding
      await supabase.from("agent_findings").insert({
        agent: "style-critic",
        run_id: runId,
        finding_type: "style_review",
        data: combined,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "error";
      results.push({ page: page.label, url, error: msg });
    }
  }

  // Log the run
  await supabase.from("agent_runs").insert({
    run_id: runId,
    agent: "style-critic",
    pages_checked: pagesToRun.length,
    status: "complete",
    created_at: new Date().toISOString(),
  });

  // Build a plain-English summary for the digest
  const summary = results
    .filter((r) => !r.error)
    .map((r) => {
      const g = r.gemini_visual as Record<string, unknown>;
      const gpt = r.gpt_conversion as Record<string, unknown>;
      return `• ${r.page}: Visual ${g.grade ?? "?"} (${g.score ?? "?"}pts) — ${g.top_issue ?? ""} | GPT lead score: ${gpt.lead_score ?? "?"}/100 — fix: ${gpt.top_fix ?? ""}`;
    })
    .join("\n");

  await supabase.from("agent_state").upsert({
    key: "style_critic_last_summary",
    value: summary,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    run_id: runId,
    pages_checked: pagesToRun.length,
    summary,
    results,
  });
}
