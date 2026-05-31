// lib/llm-panel.ts
// Generic 3-model panel + Sonnet synthesizer.
//
// Independent of any agent's domain — used by site-reviewer and any future
// agent that benefits from three lenses on the same input. The existing
// lib/multi-model.ts (financial-specific) is intentionally left alone so the
// CFO agent on main keeps working unchanged.
//
// Calls:
//   - Claude via @anthropic-ai/sdk (installed in node_modules)
//   - Gemini via HTTP (no SDK installed)
//   - OpenAI via HTTP (no SDK installed)
//
// Synthesizer is Claude Sonnet 4.6 — one tier above the workers, well below
// Opus, returns structured JSON of consensus/disagreements/recommendations.

let anthropic: any = null;
async function getAnthropic() {
  if (anthropic) return anthropic;
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const mod: any = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    return anthropic;
  } catch (e: any) {
    console.error(`[llm-panel] failed to load @anthropic-ai/sdk: ${e.message}`);
    return null;
  }
}

export interface Attachment {
  mediaType: string;
  base64: string;
}

export interface PanelRole {
  system: string;
  model?: string;
}

export interface PanelInput {
  task: string;
  context: string;
  attachments?: Attachment[];
  claude: PanelRole;
  gemini: PanelRole;
  gpt: PanelRole;
}

export interface ModelOutput {
  provider: "claude" | "gemini" | "gpt";
  model: string;
  analysis: string;
  error?: string;
}

export interface PanelResult {
  claude: ModelOutput;
  gemini: ModelOutput;
  gpt: ModelOutput;
}

export interface Synthesis {
  consensus: string[];
  disagreements: string[];
  recommendations: string[];
  brief: string;
}

const DEFAULT_CLAUDE_MODEL = "claude-haiku-4-5-20251001";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const DEFAULT_GPT_MODEL = "gpt-4o";
const SYNTHESIZER_MODEL = "claude-sonnet-4-6";

async function callClaude(input: PanelInput): Promise<ModelOutput> {
  const model = input.claude.model ?? DEFAULT_CLAUDE_MODEL;
  const client = await getAnthropic();
  if (!client) {
    return { provider: "claude", model, analysis: "", error: "Anthropic SDK unavailable" };
  }

  const content: any[] = [{ type: "text", text: input.context }];
  for (const att of input.attachments ?? []) {
    content.push({
      type: "image",
      source: { type: "base64", media_type: att.mediaType, data: att.base64 },
    });
  }

  try {
    const resp = await client.messages.create({
      model,
      max_tokens: 900,
      system: input.claude.system,
      messages: [{ role: "user", content }],
    });
    const text = resp.content.find((b: any) => b.type === "text")?.text ?? "";
    return { provider: "claude", model, analysis: text };
  } catch (e: any) {
    return { provider: "claude", model, analysis: "", error: e.message };
  }
}

async function callGemini(input: PanelInput): Promise<ModelOutput> {
  const model = input.gemini.model ?? DEFAULT_GEMINI_MODEL;
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { provider: "gemini", model, analysis: "", error: "GEMINI_API_KEY not set" };

  const parts: any[] = [{ text: `${input.gemini.system}\n\n${input.context}` }];
  for (const att of input.attachments ?? []) {
    parts.push({ inline_data: { mime_type: att.mediaType, data: att.base64 } });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { maxOutputTokens: 900, temperature: 0.5 },
      }),
    });
    const json: any = await resp.json();
    if (json.error) return { provider: "gemini", model, analysis: "", error: json.error.message };
    const text =
      json.candidates?.[0]?.content?.parts?.map((p: any) => p.text).filter(Boolean).join("\n") ?? "";
    return { provider: "gemini", model, analysis: text };
  } catch (e: any) {
    return { provider: "gemini", model, analysis: "", error: e.message };
  }
}

async function callGPT(input: PanelInput): Promise<ModelOutput> {
  const model = input.gpt.model ?? DEFAULT_GPT_MODEL;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { provider: "gpt", model, analysis: "", error: "OPENAI_API_KEY not set" };

  const userContent: any[] = [{ type: "text", text: input.context }];
  for (const att of input.attachments ?? []) {
    userContent.push({
      type: "image_url",
      image_url: { url: `data:${att.mediaType};base64,${att.base64}` },
    });
  }

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        max_tokens: 900,
        messages: [
          { role: "system", content: input.gpt.system },
          { role: "user", content: userContent },
        ],
      }),
    });
    const json: any = await resp.json();
    if (json.error) return { provider: "gpt", model, analysis: "", error: json.error.message };
    const text = json.choices?.[0]?.message?.content ?? "";
    return { provider: "gpt", model, analysis: text };
  } catch (e: any) {
    return { provider: "gpt", model, analysis: "", error: e.message };
  }
}

export async function runPanel(input: PanelInput): Promise<PanelResult> {
  const [claude, gemini, gpt] = await Promise.all([
    callClaude(input),
    callGemini(input),
    callGPT(input),
  ]);
  return { claude, gemini, gpt };
}

const SYNTH_SYSTEM = `You are a synthesizer. Three independent analysts reviewed the same task. Your job is to identify where they agree, where they materially disagree, and produce a concise executive brief plus concrete recommendations.

Return ONLY valid JSON matching this exact schema — no preamble, no markdown fences:
{
  "consensus": ["..."],
  "disagreements": ["..."],
  "recommendations": ["..."],
  "brief": "5-7 sentence executive summary"
}`;

export async function synthesize(task: string, panel: PanelResult): Promise<Synthesis> {
  const client = await getAnthropic();
  const empty: Synthesis = { consensus: [], disagreements: [], recommendations: [], brief: "" };
  if (!client) return { ...empty, brief: "[synthesis unavailable — Anthropic SDK not loaded]" };

  const fmt = (m: ModelOutput) =>
    m.analysis || `[no output: ${m.error ?? "unknown"}]`;

  const prompt = `TASK
${task}

CLAUDE (${panel.claude.model}):
${fmt(panel.claude)}

GEMINI (${panel.gemini.model}):
${fmt(panel.gemini)}

GPT-4o (${panel.gpt.model}):
${fmt(panel.gpt)}`;

  try {
    const resp = await client.messages.create({
      model: SYNTHESIZER_MODEL,
      max_tokens: 1500,
      system: SYNTH_SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = resp.content.find((b: any) => b.type === "text")?.text ?? "{}";
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(cleaned);
    return {
      consensus: Array.isArray(parsed.consensus) ? parsed.consensus : [],
      disagreements: Array.isArray(parsed.disagreements) ? parsed.disagreements : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      brief: typeof parsed.brief === "string" ? parsed.brief : "",
    };
  } catch (e: any) {
    return { ...empty, brief: `[synthesis error: ${e.message}]` };
  }
}
