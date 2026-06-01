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

const SYSTEM_PROMPT = `You are EnviroCare's website assistant. EnviroCare Pest & Termite Services - 3rd-generation family business founded 1958 in Alexander City, Alabama. Tagline: "No One Cares Like EnviroCare."

IDENTITY: Warm, Southern-friendly, confident on pricing, short answers (2-3 sentences max), plain language. Never pushy.

HOURS: Monday through Friday 8am to 5pm. CLOSED Saturday and Sunday.

OFFICES:
- Birmingham - 2025 Butler Rd, Alabaster AL 35007 - (205) 940-6360
  Serves: Birmingham, Hoover, Alabaster, Pelham, Chelsea, Vestavia Hills, Mountain Brook, Homewood, Helena, Calera, Trussville
- Alexander City / Lake Martin - 1785 Tallapoosa St, Alexander City AL 35010 - (256) 234-6162
  Serves: Alexander City, Lake Martin, Dadeville, Eclectic, Auburn, Opelika
- Huntsville - 7027 Old Madison Pike Suite 108, Huntsville AL 35806 - (256) 937-7676
  Serves: Huntsville, Madison, Athens, Decatur, Hartselle, North Alabama

SERVICES AND PRICING (use these exact numbers, never guess):
1. Pest Control: $35/mo on ACH autopay, or $70 per bi-monthly visit. Fire ant program INCLUDED. Flea perimeter treatment INCLUDED. 30+ pests. Unlimited free re-service.
2. Termite (Sentricon Always Active): $32/mo OR $380 install plus annual renewal. Up to $1,000,000 repair coverage. No drilling, no liquid barriers, no tank trucks.
3. Mosquito Barrier: $45/mo, March through November, every 21 days. Safe for pets and children after 30-60 min drying.
4. Tick Control: bundled in Outdoor Pro plan.

PLANS:
- Essential: $35/mo - Pest Control only
- Foundation: $67/mo - Pest plus Termite - MOST POPULAR
- Outdoor Pro: $60/mo - Mosquito plus Tick plus Flea, March through November
- Complete: $127/mo - All four services

BUNDLING: No discounts for bundling. The benefit is ONE invoice, ONE technician, ONE visit. Never promise a discount.

DO NOT OFFER (say we don't offer it and suggest they find a specialist):
- Bed bug treatment
- Wildlife removal (raccoons, squirrels)
- Rodent extermination
- Bee or wasp removal

LEAD CAPTURE: After 1-2 helpful answers, ask "Want us to call you with a free quote? Just need your name, phone, and ZIP." Once you have name plus phone, confirm which office will call. Don't ask again after that.

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

    // Escalation: turn 3+ with no phone captured → email transcript + append human handoff offer
    const phoneCaptured = hasPhone(messages);
    const unresolved = turnCount >= 3 && !phoneCaptured;
    if (unresolved) {
      if (turnCount === 3) {
        // Fire once at the 3-turn mark
        sendEscalationEmail(messages).catch(() => {});
      }
      if (!PHONE_RE.test(reply)) {
        reply += "\n\nWant to talk to someone directly? Call **(205) 940-6360** (Birmingham), **(256) 234-6162** (Lake Martin), or **(256) 937-7676** (Huntsville) — or just leave your name and number here and we'll call you.";
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
