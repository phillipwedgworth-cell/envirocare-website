export type FinancialData = Record<string, any>;

export interface ModelResult {
  analysis: string;
  flags: string[];
}

export interface FinancialPanelResults {
  claude: ModelResult;
  gemini: ModelResult;
  gpt: ModelResult;
  synthesis: string;
  disagreements: string[];
}

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;
const openAiApiKey = process.env.OPENAI_API_KEY;

function formatFinancialData(financialData: FinancialData[]): string {
  if (!financialData.length) {
    return "No financial snapshot data available.";
  }

  return financialData
    .map((item, index) => {
      const values = Object.entries(item)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
      return `${index + 1}. ${values}`;
    })
    .join("\n");
}

function deriveFlags(analysis: string): string[] {
  const flags: string[] = [];
  const normalized = analysis.toLowerCase();

  if (/cash|runway|liquidity/.test(normalized)) {
    if (/low|tight|declin|burn|runway/.test(normalized)) {
      flags.push("cash pressure");
    }
  }

  if (/margin|gross margin|profit margin/.test(normalized)) {
    if (/below|under|weak|compress|contract/.test(normalized)) {
      flags.push("margin weakness");
    }
  }

  if (/revenue|sales|growth/.test(normalized)) {
    if (/declin|flat|stagnant|soft/.test(normalized)) {
      flags.push("revenue concern");
    } else if (/accelerat|strong|robust|uptrend/.test(normalized)) {
      flags.push("revenue momentum");
    }
  }

  if (/risk|risk profile|exposure|uncertainty/.test(normalized)) {
    flags.push("operating risk");
  }

  if (/expense|opex|costs|burn/.test(normalized)) {
    if (/rising|high|elevated|creep/.test(normalized)) {
      flags.push("cost pressure");
    }
  }

  return Array.from(new Set(flags));
}

function buildPrompt(roleDescription: string, financialData: FinancialData[]): string {
  const formattedData = formatFinancialData(financialData);

  return `${roleDescription}

Use the same financial data input below to write a concise executive analysis for EnviroCare.

Financial data:
${formattedData}

Instructions:
- Mention revenue, cash flow, margin, operating risk, and one recommendation.
- Keep the analysis concise and readable.
- Return only the analysis text.
`;
}

async function extractClaudeText(response: any): Promise<string> {
  if (!response) return "";
  if (typeof response.completion === "string") {
    return response.completion;
  }
  if (typeof response.output_text === "string") {
    return response.output_text;
  }
  if (Array.isArray(response.content)) {
    const textBlock = response.content
      .filter((item: any) => item.type === "text")
      .map((item: any) => item.text)
      .join("");
    if (textBlock) {
      return textBlock;
    }
  }
  return JSON.stringify(response, null, 2);
}

export async function callClaude(financialData: FinancialData[]): Promise<ModelResult> {
  if (!anthropicApiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY environment variable.");
  }

  const prompt = buildPrompt(
    "You are a conservative CFO analyst focused on risk, cash, and margins.",
    financialData
  );

  const response = await fetch("https://api.anthropic.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anthropicApiKey}`,
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens_to_sample: 420,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const json = await response.json();
  const analysis = await extractClaudeText(json);
  return {
    analysis,
    flags: deriveFlags(analysis),
  };
}

function parseGeminiResponseBody(body: any): string {
  if (!body) {
    return "";
  }

  if (typeof body.output === "string") {
    return body.output;
  }

  if (body.candidates && Array.isArray(body.candidates)) {
    const candidate = body.candidates[0];
    if (!candidate) {
      return "";
    }

    if (typeof candidate.output === "string") {
      return candidate.output;
    }

    if (candidate.content && Array.isArray(candidate.content)) {
      return candidate.content
        .map((item: any) => item.text || item.journey || "")
        .filter(Boolean)
        .join("\n");
    }
  }

  if (typeof body.text === "string") {
    return body.text;
  }

  return JSON.stringify(body, null, 2);
}

export async function callGemini(financialData: FinancialData[]): Promise<ModelResult> {
  if (!geminiApiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  const prompt = buildPrompt(
    "You are a growth-focused CFO analyst evaluating revenue patterns, seasonality, and expansion opportunities.",
    financialData
  );

  const url = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-pro:generate?key=${encodeURIComponent(
    geminiApiKey
  )}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: {
        text: prompt,
      },
      temperature: 0.7,
      maxOutputTokens: 420,
    }),
  });

  const json = await response.json();
  const analysis = parseGeminiResponseBody(json);
  return {
    analysis,
    flags: deriveFlags(analysis),
  };
}

export async function callGPT(financialData: FinancialData[]): Promise<ModelResult> {
  if (!openAiApiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  const prompt = buildPrompt(
    "You are a benchmark analyst focused on industry comparisons, ratios, and efficiency metrics.",
    financialData
  );

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 420,
    }),
  });

  const json = await response.json();
  const analysis =
    json?.choices?.[0]?.message?.content ||
    json?.choices?.[0]?.text ||
    JSON.stringify(json, null, 2);

  return {
    analysis,
    flags: deriveFlags(analysis),
  };
}

function buildDisagreements(results: FinancialPanelResults): string[] {
  const disagreements: string[] = [];
  const { claude, gemini, gpt } = results;

  if (claude.analysis && gemini.analysis && claude.analysis !== gemini.analysis) {
    disagreements.push(
      "Claude is more conservative while Gemini is more growth-oriented."
    );
  }

  if (gemini.analysis && gpt.analysis && gemini.analysis !== gpt.analysis) {
    disagreements.push(
      "Gemini emphasizes expansion, while GPT-4o emphasizes benchmark performance."
    );
  }

  if (claude.analysis && gpt.analysis && claude.analysis !== gpt.analysis) {
    disagreements.push(
      "Claude highlights risk and cash, while GPT-4o highlights industry comparisons."
    );
  }

  return disagreements;
}

function buildSynthesis(results: FinancialPanelResults): string {
  const summaryParts = [
    `Claude: ${results.claude.flags.join(", ") || "no major risk flags"}`,
    `Gemini: ${results.gemini.flags.join(", ") || "growth focus"}`,
    `GPT: ${results.gpt.flags.join(", ") || "benchmark perspective"}`,
  ];

  return `Panel synthesis: ${summaryParts.join("; ")}.`;
}

export const mockFinancialData: FinancialData[] = [
  {
    period: "2026-05-17",
    revenue: 125000,
    cash: 42000,
    gross_margin: 0.62,
    operating_expenses: 46000,
    notes: "Moderate revenue growth with compressed margins and stable cash."
  },
  {
    period: "2026-05-10",
    revenue: 118000,
    cash: 47000,
    gross_margin: 0.60,
    operating_expenses: 45000,
    notes: "Slight revenue slowdown but cash remains above threshold."
  }
];

export async function runFinancialPanel(
  financialData: FinancialData[]
): Promise<FinancialPanelResults> {
  const [claude, gemini, gpt] = await Promise.all([
    callClaude(financialData),
    callGemini(financialData),
    callGPT(financialData),
  ]);

  const results: FinancialPanelResults = {
    claude,
    gemini,
    gpt,
    synthesis: "",
    disagreements: [],
  };

  results.disagreements = buildDisagreements(results);
  results.synthesis = buildSynthesis(results);

  return results;
}
