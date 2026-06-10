// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/shared/ChatWidget.tsx
// Commit: feat(chat): Scout branding + corrected main phone
// Push: main
// ─────────────────────────────────────
// components/shared/ChatWidget.tsx
// Floating chat widget for EnviroCare. Add <ChatWidget /> to app/layout.tsx inside <body>.

"use client";
import { useState, useRef, useEffect } from "react";

// Brand tokens — locked. Do not change without checking with Phillip.
const BRAND_GREEN = "#0E8E40";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const INK = "#0E1A0F";
const CREAM = "#FEFDF8";

const FONT_STACK =
  '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  "Pest control pricing",
  "Free termite inspection",
  "Mosquito season",
  "Talk to a person",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! 🌻 I'm the EnviroCare assistant — third-generation family business, helping Alabama homes since 1958. What pest problem can I help you with today?",
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
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // sendMessage accepts an optional override so quick-action buttons can call it directly
  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

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
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
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

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Chat with EnviroCare"
        title="Chat with EnviroCare"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: BRAND_GREEN,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 18px rgba(14,26,15,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = `0 4px 18px rgba(14,26,15,0.28), 0 0 0 2px ${GOLD}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(14,26,15,0.28)";
        }}
      >
        {/* Sunflower brand mark; the emoji renders everywhere — white chat
            bubble underneath acts as the fallback shape on a green circle */}
        <span style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">🌻</span>
        {/* Gold notification dot */}
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: GOLD,
            border: "2px solid white",
          }}
        />
      </button>
    );
  }

  // Chat window when open
  return (
    <div
      className="ec-chat-panel"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 380,
        maxWidth: "calc(100vw - 32px)",
        height: 540,
        maxHeight: "calc(100vh - 48px)",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        fontFamily: FONT_STACK,
        background: CREAM,
      }}
    >
      {/* Mobile: full-width sheet from the bottom */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (max-width: 640px) {
            .ec-chat-panel {
              width: 100vw !important;
              max-width: 100vw !important;
              right: 0 !important;
              bottom: 0 !important;
              height: 82vh !important;
              max-height: 88vh !important;
              border-radius: 16px 16px 0 0 !important;
            }
          }`,
        }}
      />
      {/* Header */}
      <div
        style={{
          background: INK,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/logo-white.png"
            alt=""
            style={{ height: 30, width: "auto", display: "block" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.01em",
              }}
            >
              EnviroCare
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 11,
                marginTop: 2,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: GOLD,
                  display: "inline-block",
                }}
              />
              Family-owned since 1958
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            cursor: "pointer",
            padding: "4px 8px",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          background: "#fff",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 15,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
                ...(msg.role === "user"
                  ? {
                      background: BRAND_GREEN,
                      color: "#fff",
                      borderBottomRightRadius: 4,
                    }
                  : {
                      background: CREAM,
                      border: "1px solid #E8E2D8",
                      color: INK,
                      borderBottomLeftRadius: 4,
                    }),
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: CREAM,
                border: "1px solid #E8E2D8",
                padding: "10px 18px",
                borderRadius: 12,
                borderBottomLeftRadius: 4,
                fontSize: 14,
                color: "#9ca3af",
              }}
            >
              typing…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action buttons (only on first message) */}
      {messages.length <= 1 && (
        <div
          style={{
            padding: "0 16px 8px",
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {QUICK_ACTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                border: `1px solid ${BRAND_GREEN}`,
                background: "transparent",
                color: BRAND_GREEN,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: FONT_STACK,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = BRAND_GREEN;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = BRAND_GREEN;
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(14,142,64,0.12)",
          display: "flex",
          gap: 8,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about pest, termite, or mosquito service…"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid rgba(14,142,64,0.18)",
            fontSize: 14,
            outline: "none",
            fontFamily: FONT_STACK,
            color: INK,
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: input.trim() ? BRAND_GREEN : "#d1d5db",
            border: "none",
            cursor: input.trim() ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "6px 16px 10px",
          textAlign: "center",
          fontSize: 10,
          color: "#9ca3af",
          background: "#fff",
          flexShrink: 0,
        }}
      >
        Powered by AI · Call{" "}
        <a
          href="tel:2059406360"
          style={{
            color: BRAND_GREEN,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          (205) 940-6360
        </a>{" "}
        to talk to a person
      </div>
    </div>
  );
}
