import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface Message { role: "user" | "assistant"; content: string; }

interface LogEntry {
  ts: string;
  turnCount: number;
  lastUserMsg: string;
  botReply: string;
  escalated: boolean;
  capturedPhone: boolean;
  fullTranscript: Message[];
}

const PHONE_RE = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/;
const LOG_KEY = "chatbot:conversations";
const LOG_CAP = 500;

function hasPhone(messages: Message[]): boolean {
  return messages.some(m => m.role === "user" && PHONE_RE.test(m.content));
}

async function logConversation(entry: LogEntry): Promise<void> {
  // Fail silently — chat keeps working even if KV is unavailable
  try {
    // Push newest to head, trim to LOG_CAP
    await kv.lpush(LOG_KEY, JSON.stringify(entry));
    await kv.ltrim(LOG_KEY, 0, LOG_CAP - 1);
  } catch {
    // swallow — never break the chat over a logging failure
  }
}

async function sendFormspree(messages: Message[]): Promise<void> {
  const url = process.env.FORMSPREE_LEAD_URL;
  if (!url) return;
  try {
    // Extract phone from last user message that contains one
    const phoneMatch = messages.slice().reverse()
      .find(m => m.role === "user" && PHONE_RE.test(m.content))
      ?.content.match(PHONE_RE)?.[0] ?? "";

    // Infer service interest from conversation keywords
    const transcript = messages.map(m => `${m.role}: ${m.content}`).join("\n");
    const lower = transcript.toLowerCase();
    const service_interest =
      lower.includes("termite") ? "termite" :
      lower.includes("mosquito") ? "mosquito" :
      lower.includes("tick") ? "tick" :
      lower.includes("flea") ? "flea" :
      lower.includes("pest") ? "pest" : "";

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phoneMatch,
        service_interest,
        transcript,
        source: "website chat",
        submitted_at: new Date().toISOString(),
      }),
    });
  } catch {
    // fire-and-forget — never block the chat
  }
}

async function sendEscalationEmail(messages: Message[]): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const transcript = messages.map(m =>
    `<div style="margin-bottom:10px"><strong style="color:${m.role === "user" ? "#0E8E40" : "#374151"}">${m.role === "user" ? "Visitor" : "Assistant"}:</strong> <span style="margin-left:6px">${m.content.replace(/</g, "&lt;")}</span></div>`
  ).join("");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: "service@envirocarellc.com",
      subject: "Chatbot escalation — visitor needs help (3 turns, no contact info)",
      html: `<div style="font-family:sans-serif;max-width:600px;padding:24px">
        <h3 style="margin:0 0 8px;color:#0E1A0F">Chat Escalation</h3>
        <p style="color:#6b7280;margin:0 0 20px">Visitor had 3+ exchanges without leaving contact info. Review and follow up if possible.</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px">
          ${transcript}
        </div>
        <p style="font-size:12px;color:#9ca3af;margin-top:16px">${new Date().toISOString()}</p>
      </div>`,
    }),
  });
}

const SYSTEM_PROMPT = `You are EnviroCare's website assistant. EnviroCare Pest & Termite Services — third-generation family business founded 1958 in Alexander City, Alabama. Tagline: "No One Cares Like EnviroCare."

IDENTITY: Warm, Southern-friendly, confident on pricing. Short answers (2–3 sentences max), plain language. Never pushy. Help first — collect contact info second.

HOURS: Monday–Friday 8:00 AM–5:00 PM. Closed Saturday and Sunday.

OFFICES — route to the correct office by the customer's city or address:
- Birmingham office · (205) 940-6360 · 2025 Butler Rd, Alabaster AL 35007
  Areas: Birmingham, Hoover, Alabaster, Pelham, Chelsea, Vestavia Hills, Mountain Brook, Homewood, Helena, Calera, Trussville
- Alex City / Lake Martin office · (256) 234-6162 · 1785 Tallapoosa St, Alexander City AL 35010
  Areas: Alexander City, Lake Martin, Dadeville, Eclectic, Auburn, Opelika, Wetumpka
  IMPORTANT: This ONE office serves BOTH Alex City AND Lake Martin. Never say "Lake Martin only."
- Huntsville office · (256) 937-7676 · 7027 Old Madison Pike Ste 108, Huntsville AL 35806
  Areas: Huntsville, Madison, Athens, Decatur, Hartselle, Hampton Cove, North Alabama
- Auburn/Opelika direct: (334) 332-3321
- Main line (call or text, any area): (205) 940-6360

SERVICES AND PRICING (exact numbers only — never invent or adjust):
1. Pest Control: $35/mo ACH autopay, or $70 per bi-monthly visit. Fire ant INCLUDED. Flea perimeter INCLUDED. 30+ pests. Unlimited free re-service between visits.
2. Termite — Sentricon: $32/mo or $380 install + annual renewal. Up to $1,000,000 repair coverage. No drilling, no liquid barriers, no tank trucks.
3. Mosquito Barrier: $45/mo, seasonal March–November, treated every 30 days.
4. Mosquito + Tick + Flea: $60/mo, seasonal March–November.
All monthly plans start with a one-time $150 initial service. Monthly billing by ACH auto-draft the following month.

COMBINING: Customers can put any services on one bill, one technician. No invented plan names — tell them the services and the monthly total.

SAFETY / PET / CHILD QUESTIONS: "We use EPA-registered products applied according to label directions. We can go over preparation, drying time, and any concerns about pets, children, ponds, or special situations before service. Want someone to call you?"

SCHEDULING / ARRIVAL: Never promise same-day service or exact arrival times. Say the office can check availability and schedule service. Most visits within 48 hours.

CANCELLATION (only if asked): Monthly plans can be canceled by calling your local office. Future visits and drafts stop when the account is canceled.

LEAD CAPTURE — one field at a time, in this exact order:
1. After 1–2 helpful answers, ask for the visitor's NAME only.
2. After receiving name, ask for their SERVICE ADDRESS only.
3. After receiving address, ask for their PHONE NUMBER only.
4. Once name + phone are confirmed, tell them which office will call and give that office's number.
Never ask for multiple fields in one message. Never re-ask for info already given.

DO NOT OFFER (say you don't offer it, suggest a specialist):
- Bed bug treatment
- Wildlife removal (raccoons, squirrels, bats)
- Rodent extermination
- Bee or wasp removal

CUSTOMER PORTAL (existing customers only): payenvirocare.key7app.com`;

export async function POST(req: NextRequest) {
  try {
    const { messages, turnCount = 0 }: { messages: Message[]; turnCount?: number } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 350,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10),
      }),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }
    const data = await response.json();
    let reply = data.content?.[0]?.text ?? "Please call us directly - we are happy to help!";

    const phoneCaptured = hasPhone(messages);

    // Fire Formspree once when phone is first captured in this message
    const phoneInLatest = [...messages].reverse().find(m => m.role === "user" && PHONE_RE.test(m.content));
    if (phoneInLatest && phoneCaptured) {
      sendFormspree(messages).catch(() => {});
    }

    // Escalation: turn 3+ with no phone captured → email + append handoff offer
    const unresolved = turnCount >= 3 && !phoneCaptured;
    if (unresolved) {
      if (turnCount === 3) {
        sendEscalationEmail(messages).catch(() => {});
      }
      if (!PHONE_RE.test(reply)) {
        reply += "\n\nWant to talk to someone directly? Call **(205) 940-6360** (main line, any office) — or leave your name and number here and we'll call you.";
      }
    }

    // Log conversation to Vercel KV for weekly review (fire-and-forget)
    const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content ?? "";
    logConversation({
      ts: new Date().toISOString(),
      turnCount,
      lastUserMsg: lastUserMsg.slice(0, 500),
      botReply: reply.slice(0, 500),
      escalated: unresolved,
      capturedPhone: phoneCaptured,
      fullTranscript: messages.slice(-10),
    }).catch(() => {});

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
