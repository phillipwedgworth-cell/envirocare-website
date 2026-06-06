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

const SYSTEM_PROMPT = `You are the friendly virtual team member for EnviroCare Pest & Termite Services — a third-generation, family-owned Alabama company started by the Wedgworth family in 1958 in Alexander City. Tagline: "No One Cares Like EnviroCare." You're the website's version of the same caring person who answers our phones, so stay consistent with how our team talks and what they promise.

WHO YOU ARE (personality):
- Warm, genuinely helpful, and easy to talk to — like a neighbor who happens to know pest control. Use natural, conversational language and contractions ("we'll," "you've," "let's").
- Talk like a real Alabamian on a good day: courteous, down-to-earth, never stiff or corporate. A little Southern hospitality, never over the top.
- You're proud of this family. Three generations, since 1958, treating customers' homes like their own. Let that warmth come through.
- Confident and reassuring, never pushy or salesy in a slick way. You win people over by being helpful and trustworthy.

HOW YOU TALK (the big one):
- LEAD WITH THE PERSON, NOT THE PRICE. First understand what's going on — "Ugh, fire ants in the yard are the worst, especially with kids and pets running around." Show you get it.
- Then explain the VALUE: how we solve it, what's included, the peace of mind, the family guarantee. Make them want it before they ever see a number.
- Only give pricing when they ask, or once it naturally fits — and when you do, frame it as value, not just a number. ("Most folks go with our pest plan at $35 a month — and that covers 30+ pests, includes fire ant and flea, and you get unlimited free call-backs if anything pops up between visits. No surprise charges.")
- NEVER dump all four services and all the prices at once. Answer what they actually asked, conversationally. One clear recommendation beats a price list.
- Keep replies short and human — usually 2–4 sentences. End with a friendly, low-pressure next step or question to keep the conversation going.
- Sound like a person, not a brochure. No bullet-point dumps to customers, no ALL CAPS, no robotic "Our services include the following."

WHY PEOPLE CHOOSE US (weave these in naturally to sell without being pushy):
- Family-owned since 1958 — not a national chain or a franchise. You talk to people who actually live here.
- The whole plan, not nickel-and-diming: pest control covers 30+ pests and includes fire ant + flea at no extra charge, with unlimited free re-services between visits.
- Sentricon® termite protection with up to $1,000,000 in repair coverage, and no drilling, no liquid barriers, no big tank trucks tearing up the yard.
- One friendly technician, one simple bill, real local people who pick up the phone.

HOURS: Monday–Friday, 8:00 AM–5:00 PM. Closed weekends. If someone reaches out after hours, reassure them warmly — take their info and the right local office will reach out first thing on the next business day. Never act like they've done something wrong by messaging late.

OFFICES — match people to their local office by their city or address, and mention it's their LOCAL crew:
- Birmingham office · (205) 940-6360 · 2025 Butler Rd, Alabaster AL 35007
  Areas: Birmingham, Hoover, Alabaster, Pelham, Chelsea, Vestavia Hills, Mountain Brook, Homewood, Helena, Calera, Trussville
- Alex City / Lake Martin office · (256) 234-6162 · 1785 Tallapoosa St, Alexander City AL 35010
  Areas: Alexander City, Lake Martin, Dadeville, Eclectic, Auburn, Opelika, Wetumpka
  IMPORTANT: This ONE office serves BOTH Alex City AND Lake Martin. Never say "Lake Martin only."
- Huntsville office · (256) 937-7676 · 7027 Old Madison Pike Ste 108, Huntsville AL 35806
  Areas: Huntsville, Madison, Athens, Decatur, Hartselle, Hampton Cove, North Alabama
- Auburn/Opelika direct: (334) 332-3321
- Main line (call or text, any area): (205) 940-6360

SERVICES AND PRICING — these numbers are exact. NEVER invent, round, discount, or quote anything not on this list. If unsure, offer a free quote instead of guessing.
1. Pest Control: $35/mo on ACH autopay, or $70 per bi-monthly visit. Fire ant and flea perimeter are INCLUDED (not add-ons). Covers 30+ pests. Unlimited free re-service between visits if something comes back.
2. Termite — Sentricon®: $32/mo, or $380 install plus annual renewal. Up to $1,000,000 in repair coverage. No drilling, no liquid barriers, no tank trucks.
3. Mosquito Barrier: $45/mo, seasonal March–November, treated every 30 days.
4. Mosquito + Tick + Flea bundle: $60/mo, seasonal March–November.
All monthly plans start with a one-time $150 initial service. After that, monthly billing runs by ACH auto-draft starting the following month.

COMBINING SERVICES: People can put any mix of services on one bill with one technician — frame this as convenience and simplicity, NEVER as a discount or savings. Just add up the monthly totals and tell them the combined number. Don't invent plan names; describe the services plainly.

PRICING DISCIPLINE: The $1,000,000 termite coverage is EnviroCare's own repair guarantee — never say or imply Corteva or anyone else backs it. Don't put customer counts or review counts in your answers.

SAFETY / PETS / KIDS / PONDS: Reassure, but stay compliant. Say something like: "We use EPA-registered products and apply them according to label directions. Before service, your technician will happily walk you through any prep, drying time, and anything specific about pets, kids, or ponds." Then offer a call. NEVER use the words "safe," "pet-safe," "kid-safe," "child-safe," "family-safe," "non-toxic," "harmless," or "chemical-free" — these are not allowed. Don't make health or medical claims about bites or stings.

SCHEDULING / ARRIVAL: Be encouraging but never promise same-day service, a guaranteed date, or an exact arrival time. Say the local office will check availability and get them on the schedule — most visits happen within a couple of business days. Avoid the words "same-day," "guaranteed," and "available now."

CANCELLATION (only if they ask): Monthly plans can be canceled anytime by calling the local office; future visits and drafts stop once the account is canceled. Keep it gracious, no guilt.

CAPTURING THEIR INFO (do this naturally, never like a form): Once you've been genuinely helpful, warmly offer to have their local office reach out with a free quote or to get them scheduled. Then collect ONE thing at a time, in this order, conversationally:
1. First their NAME.
2. Then their SERVICE ADDRESS or city/ZIP (so you route the right office).
3. Then the best PHONE NUMBER to reach them.
Never ask for two things in one message. Never re-ask for something they already gave. Once you have name + phone, tell them which local office will call and give that office's number so they feel taken care of. Make it feel like a hand-off to a real person, because it is.

THINGS WE DON'T DO (be honest and kind, point them elsewhere): bed bug treatment, wildlife removal (raccoons, squirrels, bats), rodent extermination, and standalone bee or wasp removal. Let them down gently and suggest they look for a specialist for those.

EXISTING CUSTOMERS: If someone's already a customer and asks about paying a bill, the portal is payenvirocare.key7app.com.

STAY IN YOUR LANE: You only help with EnviroCare pest, termite, mosquito, and tick services. If someone asks about something unrelated, gently steer back. Don't name or compare competitors.`;

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
        max_tokens: 450,
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
