// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/ChatWidget.tsx
// Commit: feat(chat): add floating Scout bubble + one-time nudge tooltip
// Push: main
// ──────────────────────────────────────

// Floating chat widget for EnviroCare ("Scout"). Add <ChatWidget /> to app/layout.tsx inside <body>.
// Functionality unchanged from prior version — this pass only restyles the open panel
// (the old header + user bubbles were flat near-black "INK"; now they're on-brand and colorful).

"use client";
import { useState, useRef, useEffect } from "react";

// Brand tokens — locked. Do not change without checking with Phillip.
const BRAND_GREEN = "#0A7935";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const INK = "#0E1A0F";
const CREAM = "#FEFDF8";
const MINT = "#E8F5EE";

const FONT_STACK =
  'var(--font-sans)';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS: { label: string; prompt?: string; href?: string }[] = [
  { label: "Pricing & plans", prompt: "What does pest control cost, and what plans do you offer?" },
  { label: "What pests do you cover?", prompt: "What pests do you cover?" },
  { label: "Request a quote", href: "/quote" },
  { label: "Pay my bill", prompt: "How do I pay my bill online?" },
];

// Linkify URLs, known site paths, and phone numbers in Scout's replies so a
// handoff (the quote form, contact page, or office phone) is one tap away.
function renderRich(text: string): (string | JSX.Element)[] {
  const re =
    /(https?:\/\/[^\s)]+|\/(?:contact-us|pricing|reviews|services|about-us|quote)\b|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const out: (string | JSX.Element)[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (/^\(?\d/.test(tok)) {
      const tel = tok.replace(/[^\d]/g, "");
      out.push(
        <a key={k++} href={`tel:${tel}`} style={{ color: BRAND_GREEN, fontWeight: 600 }}>{tok}</a>
      );
    } else {
      out.push(
        <a key={k++} href={tok} style={{ color: BRAND_GREEN, fontWeight: 600, textDecoration: "underline" }}>{tok}</a>
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Scout 🌻 — EnviroCare's assistant. I can answer questions about our services, pricing, coverage areas, or your bill. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Allow any "Get a Quote" button on the site to open Scout via a custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message?: string } | undefined;
      setIsOpen(true);
      if (detail?.message) setPending(detail.message);
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "chat_open", { event_category: "engagement", event_label: "quote_cta" });
      }
    };
    window.addEventListener("ec:open-scout", handler as EventListener);
    return () => window.removeEventListener("ec:open-scout", handler as EventListener);
  }, []);

  // One-time proactive nudge so visitors notice Scout exists (suppressed per session once seen).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { if (sessionStorage.getItem("ec-scout-nudged")) return; } catch {}
    const t = setTimeout(() => setNudge(true), 7000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { if (isOpen) setNudge(false); }, [isOpen]);
  const dismissNudge = () => {
    setNudge(false);
    try { sessionStorage.setItem("ec-scout-nudged", "1"); } catch {}
  };

  // Once opened with a pending prompt, send it automatically
  useEffect(() => {
    if (isOpen && pending && !isLoading) {
      const msg = pending;
      setPending(null);
      sendMessage(msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pending]);

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

    // Fire Meta Pixel Lead event when user shares a phone number
    const phonePattern = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/;
    if (phonePattern.test(text) && typeof window !== 'undefined') {
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', { content_name: 'Chat Callback Request' });
      }
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'chat',
          event_label: 'phone_shared',
          value: 1,
        });
      }
    }

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.message ||
            "I'm having trouble right now. Please call us at (205) 940-6360!",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please call us at (205) 940-6360 — a real person will answer!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Floating launcher (closed) ───────────────────────────────
  if (!isOpen) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes ec-scout-pop{0%{transform:scale(0.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
          @keyframes ec-scout-ring{0%{transform:scale(1);opacity:.45}70%{transform:scale(1.8);opacity:0}100%{opacity:0}}
          .ec-scout-fab{position:fixed;bottom:16px;right:16px;z-index:9999;width:58px;height:58px;border-radius:50%;
            border:none;cursor:pointer;background:#0A7935;color:#fff;box-shadow:0 10px 28px rgba(10,121,53,0.42);
            display:flex;align-items:center;justify-content:center;animation:ec-scout-pop .3s ease both;}
          .ec-scout-fab:hover{background:#086A2E;transform:translateY(-2px);transition:transform .12s,background .15s;}
          .ec-scout-fab::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #F5A800;animation:ec-scout-ring 2.6s ease-out infinite;}
          @media (prefers-reduced-motion: reduce){.ec-scout-fab::before{animation:none;display:none}.ec-scout-fab{animation:none}}
          .ec-scout-tip{position:fixed;bottom:22px;right:84px;z-index:9999;max-width:230px;
            background:#fff;color:#0E1A0F;border:1px solid #E6E0D2;border-left:4px solid #F5A800;border-radius:14px;
            padding:10px 12px 10px 14px;box-shadow:0 12px 34px rgba(14,26,15,0.20);
            font-family:var(--font-sans);font-size:13.5px;line-height:1.35;
            display:flex;align-items:flex-start;gap:8px;animation:ec-scout-pop .25s ease both;}
          .ec-scout-tip b{color:#0A7935;}
          .ec-scout-tip-x{flex-shrink:0;background:none;border:none;cursor:pointer;color:#8a978c;font-size:16px;line-height:1;padding:0 2px;}
          .ec-scout-tip-x:hover{color:#0E1A0F;}
          @media (max-width:600px){.ec-scout-tip{right:12px;bottom:86px;left:auto;max-width:72vw;}}
        `}} />
        {nudge && (
          <div className="ec-scout-tip" role="status">
            <span>Questions about pests or pricing? <b>Chat with Scout</b> — quick answers, no wait.</span>
            <button type="button" className="ec-scout-tip-x" aria-label="Dismiss" onClick={dismissNudge}>&times;</button>
          </div>
        )}
        <button
          type="button"
          className="ec-scout-fab"
          aria-label="Open chat with Scout, the EnviroCare assistant"
          onClick={() => { dismissNudge(); setIsOpen(true); }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </>
    );
  }

  // ── Open panel ───────────────────────────────────────────────
  return (
    <div
      className="ec-chat-panel"
      style={{
        position: "fixed", bottom: 16, right: 16,
        width: 380, maxWidth: "calc(100vw - 32px)",
        height: 560, maxHeight: "calc(100vh - 48px)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 16px 48px rgba(0,0,0,0.22)",
        display: "flex", flexDirection: "column",
        zIndex: 9999, fontFamily: FONT_STACK, background: CREAM,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (max-width: 640px){
            .ec-chat-panel{width:100vw!important;max-width:100vw!important;right:0!important;bottom:0!important;height:84vh!important;max-height:90vh!important;border-radius:16px 16px 0 0!important;}
          }
          @keyframes ec-pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
          .ec-msg{animation:ec-pop .18s ease both}`,
        }}
      />

      {/* Header — brand gradient + gold accent + Scout identity */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: 4, background: GOLD }} />
        <div
          style={{
            background: `linear-gradient(135deg, ${BRAND_GREEN} 0%, ${DEEP} 100%)`,
            padding: "13px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.16)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
                Scout
              </div>
              <div style={{
                color: "rgba(255,255,255,0.85)", fontSize: 11.5, marginTop: 2,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
                EnviroCare · family-owned since 1958
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            style={{
              background: "rgba(255,255,255,0.12)", border: "none", color: "#fff",
              fontSize: 20, cursor: "pointer", lineHeight: 1,
              width: 30, height: 30, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "16px 14px 8px",
        display: "flex", flexDirection: "column", gap: 12,
        background: `linear-gradient(180deg, ${MINT} 0%, #fff 120px)`,
      }}>
        {messages.map((msg, i) => (
          <div key={i} className="ec-msg" style={{
            display: "flex", gap: 8,
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-end",
          }}>
            {msg.role === "assistant" && (
              <div aria-hidden="true" style={{
                width: 26, height: 26, borderRadius: "50%", background: MINT,
                border: `1px solid ${BRAND_GREEN}33`, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}><img src="/icon-512.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /></div>
            )}
            <div style={{
              maxWidth: "78%", padding: "10px 14px", borderRadius: 14,
              fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap",
              ...(msg.role === "user"
                ? { background: `linear-gradient(135deg, ${BRAND_GREEN}, ${FOREST})`, color: "#fff", borderBottomRightRadius: 4 }
                : { background: "#fff", border: "1px solid #E8E2D8", color: INK, borderBottomLeftRadius: 4 }),
            }}>
              {msg.role === "assistant" ? renderRich(msg.content) : msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="ec-msg" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div aria-hidden="true" style={{
              width: 26, height: 26, borderRadius: "50%", background: MINT,
              border: `1px solid ${BRAND_GREEN}33`, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}><img src="/icon-512.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /></div>
            <div style={{
              background: "#fff", border: "1px solid #E8E2D8", padding: "11px 16px",
              borderRadius: 14, borderBottomLeftRadius: 4, fontSize: 14, color: "#9ca3af",
            }}>Scout is typing…</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions (first message only) */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 14px 8px", display: "flex", gap: 6, flexWrap: "wrap", background: "#fff" }}>
          {QUICK_ACTIONS.map((q) =>
            q.href ? (
              <a
                key={q.label}
                href={q.href}
                style={{
                  padding: "7px 13px", borderRadius: 20,
                  border: `1px solid ${BRAND_GREEN}`, background: CREAM,
                  color: BRAND_GREEN, fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", fontFamily: FONT_STACK, transition: "all 0.15s",
                  textDecoration: "none", display: "inline-block",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = BRAND_GREEN; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.color = BRAND_GREEN; }}
              >{q.label}</a>
            ) : (
              <button
                key={q.label}
                onClick={() => sendMessage(q.prompt)}
                style={{
                  padding: "7px 13px", borderRadius: 20,
                  border: `1px solid ${BRAND_GREEN}`, background: CREAM,
                  color: BRAND_GREEN, fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", fontFamily: FONT_STACK, transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = BRAND_GREEN; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.color = BRAND_GREEN; }}
              >{q.label}</button>
            )
          )}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: "12px 14px", borderTop: "1px solid #E8E2D8",
        display: "flex", gap: 8, background: CREAM, flexShrink: 0,
      }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Scout about service, pricing, or your bill…"
          style={{
            flex: 1, padding: "11px 14px", borderRadius: 10,
            border: "1px solid #E8E2D8", fontSize: 14, outline: "none",
            fontFamily: FONT_STACK, color: INK, background: "#fff",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = BRAND_GREEN; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#E8E2D8"; }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          style={{
            width: 44, height: 44, borderRadius: 10,
            background: input.trim() ? `linear-gradient(135deg, ${BRAND_GREEN}, ${FOREST})` : "#d1d5db",
            border: "none", cursor: input.trim() ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.15s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div style={{
        padding: "6px 16px 10px", textAlign: "center", fontSize: 10,
        color: "#9ca3af", background: CREAM, flexShrink: 0,
      }}>
        Scout is an AI assistant · Call{" "}
        <a href="tel:2059406360" style={{ color: BRAND_GREEN, textDecoration: "none", fontWeight: 600 }}>
          (205) 940-6360
        </a>{" "}
        for a real person
      </div>
    </div>
  );
}
