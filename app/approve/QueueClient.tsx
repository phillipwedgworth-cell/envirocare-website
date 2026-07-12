// app/approve/QueueClient.tsx
"use client";

import { useState } from "react";

export type Item = {
  id: string;
  created_at: string;
  title: string;
  category: "comms" | "web" | "ads" | "post" | "ops";
  preview: string | null;
  preview_url: string | null;
  risk: "green" | "yellow" | "red";
  compliance_clean: boolean;
  compliance_notes: string | null;
  status: "pending" | "failed";
  source: string | null;
};

const CATS = [
  { id: "all", label: "All" },
  { id: "comms", label: "Replies" },
  { id: "web", label: "Web" },
  { id: "ads", label: "Ads" },
  { id: "post", label: "Posts" },
  { id: "ops", label: "Ops" },
] as const;

const RISK: Record<Item["risk"], { stripe: string; dot: string; label: string }> = {
  green: { stripe: "#16a34a", dot: "bg-green-500", label: "Low" },
  yellow: { stripe: "#d97706", dot: "bg-amber-500", label: "Check" },
  red: { stripe: "#dc2626", dot: "bg-red-500", label: "Flag" },
};

export default function QueueClient({ items, apiKey }: { items: Item[]; apiKey: string }) {
  const [queue, setQueue] = useState<Item[]>(items);
  const [cat, setCat] = useState<string>("all");
  const [busy, setBusy] = useState<string | null>(null);
  const [fixFor, setFixFor] = useState<string | null>(null);
  const [fixNote, setFixNote] = useState("");

  const visible = queue.filter((i) => cat === "all" || i.category === cat);

  async function decide(id: string, decision: "approved" | "fix" | "skip", note?: string) {
    setBusy(id);
    const prev = queue;
    setQueue((q) => q.filter((i) => i.id !== id)); // optimistic: card leaves
    try {
      const res = await fetch("/api/approve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, decision, note, key: apiKey }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch {
      setQueue(prev); // put it back if the write failed — never silently lose a decision
      alert("That didn’t save. Nothing changed — try again.");
    } finally {
      setBusy(null);
      setFixFor(null);
      setFixNote("");
    }
  }

  return (
    <main className="min-h-dvh bg-[#f6f8f5] text-neutral-900">
      {/* Sticky header + filter */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-[#f6f8f5]/90 backdrop-blur">
        <div className="mx-auto max-w-xl px-4 pt-4 pb-3">
          <div className="flex items-baseline justify-between">
            <h1 className="text-xl font-bold tracking-tight text-[#14532d]">Approvals</h1>
            <span className="text-sm text-neutral-500">
              {queue.length} waiting
            </span>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {CATS.map((c) => {
              const n =
                c.id === "all"
                  ? queue.length
                  : queue.filter((i) => i.category === c.id).length;
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#14532d] text-white"
                      : "bg-white text-neutral-600 border border-neutral-200"
                  }`}
                >
                  {c.label}
                  {n > 0 && <span className={active ? "opacity-80" : "text-neutral-400"}> · {n}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-4 py-4 space-y-3">
        {visible.length === 0 && (
          <div className="mt-24 text-center">
            <p className="text-lg font-semibold text-[#14532d]">Queue clear.</p>
            <p className="mt-1 text-sm text-neutral-500">Nothing waiting on you.</p>
          </div>
        )}

        {visible.map((item) => {
          const r = RISK[item.risk];
          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100"
              style={{ borderLeft: `5px solid ${r.stripe}` }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs">
                  {item.status === "failed" && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 font-semibold text-red-700">
                      SHIP FAILED — retry
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-neutral-400">
                    <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
                    {r.label}
                  </span>
                  {item.source && <span className="text-neutral-300">· {item.source}</span>}
                </div>

                <h2 className="mt-1.5 text-base font-semibold leading-snug">{item.title}</h2>

                {item.preview && (
                  <p className="mt-1.5 whitespace-pre-wrap text-sm text-neutral-600">
                    {item.preview}
                  </p>
                )}

                {item.compliance_notes && (
                  <p className="mt-2 text-xs text-amber-700">⚑ {item.compliance_notes}</p>
                )}

                {item.preview_url && (
                  <a
                    href={item.preview_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-[#14532d] underline underline-offset-2"
                  >
                    Open preview ↗
                  </a>
                )}
              </div>

              {fixFor === item.id ? (
                <div className="border-t border-neutral-100 p-3">
                  <textarea
                    autoFocus
                    value={fixNote}
                    onChange={(e) => setFixNote(e.target.value)}
                    placeholder="What should change?"
                    className="w-full rounded-xl border border-neutral-200 p-3 text-sm outline-none focus:border-[#14532d]"
                    rows={3}
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setFixFor(null); setFixNote(""); }}
                      className="rounded-xl py-3 text-sm font-medium text-neutral-500"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={busy === item.id}
                      onClick={() => decide(item.id, "fix", fixNote)}
                      className="rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Send fix
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-px border-t border-neutral-100 bg-neutral-100 text-sm font-semibold">
                  <button
                    disabled={busy === item.id}
                    onClick={() => decide(item.id, "skip")}
                    className="bg-white py-4 text-neutral-500 active:bg-neutral-50 disabled:opacity-40"
                  >
                    Skip
                  </button>
                  <button
                    disabled={busy === item.id}
                    onClick={() => { setFixFor(item.id); setFixNote(""); }}
                    className="bg-white py-4 text-amber-700 active:bg-amber-50 disabled:opacity-40"
                  >
                    Fix it
                  </button>
                  <button
                    disabled={busy === item.id}
                    onClick={() => decide(item.id, "approved")}
                    className="bg-white py-4 text-[#14532d] active:bg-green-50 disabled:opacity-40"
                  >
                    Approve
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
