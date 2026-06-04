'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content: "Hi! I'm EnviroCare's assistant — family-owned in Alabama since 1958. I can help with pest, termite, mosquito, or tick service. What's going on at your place?",
};

const QUICK_REPLIES = [
  'Get a free quote',
  'Free termite inspection',
  'What does it cost?',
  'Mosquito & tick service',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || streaming) return;

      const userMsg: Message = { role: 'user', content: text };
      const history = [...messages, userMsg];
      setMessages([...history, { role: 'assistant', content: '' }]);
      setInput('');
      setStreaming(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok || !res.body) throw new Error('Request failed');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages([...history, { role: 'assistant', content: accumulated }]);
        }
      } catch {
        setMessages([
          ...history,
          {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please call us at (205) 940-6360.',
          },
        ]);
      } finally {
        setStreaming(false);
      }
    },
    [input, messages, streaming]
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CHAT_CSS }} />

      {open && (
        <div className="cw-panel" role="dialog" aria-label="EnviroCare chat assistant">
          <div className="cw-header">
            <div className="cw-header-info">
              <div className="cw-avatar">EC</div>
              <div>
                <div className="cw-name">EnviroCare Assistant</div>
                <div className="cw-status">● Online · Mon–Fri 8am–5pm</div>
              </div>
            </div>
            <button className="cw-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="cw-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cw-msg cw-msg--${msg.role}`}>
                {msg.content || (streaming && i === messages.length - 1 ? (
                  <span className="cw-typing">
                    <span /><span /><span />
                  </span>
                ) : null)}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && !streaming && (
            <div className="cw-chips">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  className="cw-chip"
                  type="button"
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => {
                      const form = document.querySelector('.cw-form') as HTMLFormElement;
                      form?.requestSubmit();
                    }, 0);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form className="cw-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              className="cw-input"
              type="text"
              placeholder="Ask about pricing, scheduling, pests…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={streaming}
              maxLength={500}
              aria-label="Chat message"
            />
            <button
              className="cw-send"
              type="submit"
              disabled={!input.trim() || streaming}
              aria-label="Send message"
            >
              ↑
            </button>
          </form>
        </div>
      )}

      <button
        className="cw-bubble"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat with EnviroCare assistant'}
        aria-expanded={open}
      >
        {open ? (
          <span style={{ fontSize: 22 }}>✕</span>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path
              d="M4 6C4 4.895 4.895 4 6 4H22C23.105 4 24 4.895 24 6V18C24 19.105 23.105 20 22 20H15L9 24V20H6C4.895 20 4 19.105 4 18V6Z"
              fill="white"
            />
          </svg>
        )}
      </button>
    </>
  );
}

const CHAT_CSS = `
.cw-bubble {
  position: fixed;
  bottom: 90px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0E8E40;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(14,142,64,0.45), 0 2px 6px rgba(0,0,0,0.15);
  z-index: 9998;
  transition: transform 0.15s ease, background 0.15s ease;
  color: #fff;
}
.cw-bubble:hover { background: #0A7935; transform: scale(1.06); }
.cw-bubble:active { transform: scale(0.96); }

.cw-panel {
  position: fixed;
  bottom: 158px;
  right: 16px;
  width: min(360px, calc(100vw - 32px));
  height: min(480px, calc(100vh - 200px));
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(14,26,15,0.18), 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  z-index: 9997;
  overflow: hidden;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.cw-header {
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.cw-header-info { display: flex; align-items: center; gap: 10px; }
.cw-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}
.cw-name { font-weight: 700; font-size: 14px; line-height: 1.2; }
.cw-status { font-size: 11px; opacity: 0.85; margin-top: 1px; }
.cw-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  opacity: 0.8;
  line-height: 1;
}
.cw-close:hover { opacity: 1; }

.cw-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #FAFAFA;
}
.cw-msg {
  max-width: 82%;
  padding: 10px 13px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
}
.cw-msg--user {
  background: #0E8E40;
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.cw-msg--assistant {
  background: #fff;
  color: #1A1A1A;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.cw-typing {
  display: inline-flex;
  gap: 4px;
  padding: 2px 0;
}
.cw-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0E8E40;
  animation: cw-bounce 1.2s infinite;
}
.cw-typing span:nth-child(2) { animation-delay: 0.2s; }
.cw-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes cw-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
}

.cw-form {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #E8E2D8;
  background: #fff;
  flex-shrink: 0;
}
.cw-input {
  flex: 1;
  padding: 10px 13px;
  font-size: 14px;
  border: 1.5px solid #E8E2D8;
  border-radius: 24px;
  background: #FEFDF8;
  outline: none;
  font-family: inherit;
  min-width: 0;
}
.cw-input:focus { border-color: #0E8E40; }
.cw-input:disabled { opacity: 0.6; }
.cw-send {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #0E8E40;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
  align-self: flex-end;
}
.cw-send:hover:not(:disabled) { background: #0A7935; }
.cw-send:disabled { background: #C4C4C4; cursor: not-allowed; }

@media (min-width: 900px) {
  .cw-bubble { bottom: 24px; right: 24px; }
  .cw-panel { bottom: 92px; right: 24px; }
}

.cw-chips {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 8px 12px 4px; flex-shrink: 0;
}
.cw-chip {
  background: #E8F5EE; border: 1px solid #0E8E40;
  color: #0E8E40; border-radius: 999px;
  padding: 6px 12px; font-size: 12px; font-weight: 600;
  cursor: pointer; font-family: inherit;
  transition: background 0.15s;
  white-space: nowrap;
}
.cw-chip:hover { background: #0E8E40; color: #fff; }
`;
