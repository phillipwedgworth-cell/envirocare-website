// Floating chat widget for EnviroCare ("Scout"). Add <ChatWidget /> to app/layout.tsx inside <body>.
// Functionality unchanged from prior version — this pass only restyles the open panel
// (the old header + user bubbles were flat near-black "INK"; now they're on-brand and colorful).

// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/ChatWidget.tsx
// Commit: feat: fire Meta Pixel Lead event on chat phone capture
// Push: main
// ─────────────────────────────────────
"use client";
import { useState, useRef, useEffect } from "react";

// Brand tokens — locked. Do not change without checking with Phillip.
const BRAND_GREEN = "#0E8E40";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const INK = "#0E1A0F";
const CREAM = "#FEFDF8";
const MINT = "#E8F5EE";

const FONT_STACK =
  '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  "Pest control pricing",
  "Free termite inspection",
  "Pay my bill",
  "Talk to a person",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Scout 🌻 — EnviroCare's assistant. We're a fourth-generation Alabama family business, here since 1958. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

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
          @keyframes ec-scout-pulse{0%{transform:scale(1);opacity:.5}70%{transform:scale(1.75);opacity:0}100%{transform:scale(1.75);opacity:0}}
          @media (prefers-reduced-motion: reduce){.ec-scout-ring{animation:none!important;display:none}}
        `}} />
      <button
        onClick={() => {
          setIsOpen(true);
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'chat_open', { event_category: 'engagement' });
          }
        }}
        aria-label="Chat with Scout, EnviroCare's assistant"
        title="Chat with Scout"
        style={{
          position: "fixed", bottom: 16, right: 16,
          width: 62, height: 62, borderRadius: "50%",
          background: `linear-gradient(145deg, ${BRAND_GREEN} 0%, ${FOREST} 70%)`,
          border: "none", cursor: "pointer",
          boxShadow: "0 6px 20px rgba(14,26,15,0.30)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = `0 6px 20px rgba(14,26,15,0.30), 0 0 0 3px ${GOLD}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(14,26,15,0.30)";
        }}
      >
        <span className="ec-scout-ring" aria-hidden="true" style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: BRAND_GREEN, zIndex: 0, pointerEvents: "none",
          animation: "ec-scout-pulse 2.2s ease-out infinite",
        }} />
        <img src="/icon-512.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", position: "relative", zIndex: 2 }} />
        <span style={{
          position: "absolute", top: 3, right: 3,
          width: 14, height: 14, borderRadius: "50%",
          background: GOLD, border: "2px solid white", zIndex: 3,
        }} />
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
              <img src="/icon-512.png" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
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
              {msg.content}
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
          {QUICK_ACTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              style={{
                padding: "7px 13px", borderRadius: 20,
                border: `1px solid ${BRAND_GREEN}`, background: CREAM,
                color: BRAND_GREEN, fontSize: 12.5, fontWeight: 600,
                cursor: "pointer", fontFamily: FONT_STACK, transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = BRAND_GREEN; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.color = BRAND_GREEN; }}
            >{q}</button>
          ))}
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
