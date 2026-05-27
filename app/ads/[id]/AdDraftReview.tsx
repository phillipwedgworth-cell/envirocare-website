"use client";

import { useState } from "react";

interface AdDraft {
  id: string;
  agent_name: string;
  title: string;
  body: string;
  cta: string;
  landing_url: string;
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  draft: AdDraft;
}

export default function AdDraftReview({ draft }: Props) {
  const [status, setStatus] = useState(draft.status);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleApprove() {
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/ads/${draft.id}/approve`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setMessage(data?.error || "Unable to approve draft.");
        return;
      }

      setStatus(data.draft?.status ?? "approved");
      setMessage("Draft approved successfully.");
    } catch (error) {
      setMessage("Failed to approve the draft.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSendFeedback() {
    const trimmed = feedback.trim();
    if (!trimmed) {
      setMessage("Please enter feedback before submitting.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/ads/${draft.id}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: trimmed }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setMessage(data?.error || "Unable to save feedback.");
        return;
      }

      setStatus(data.draft?.status ?? "needs-changes");
      setFeedback("");
      setMessage("Feedback sent. The draft is now marked for changes.");
    } catch (error) {
      setMessage("Failed to send feedback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Draft details</p>
          <h2 className="text-2xl font-semibold text-slate-950">{draft.title}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Copy</p>
              <p className="mt-3 whitespace-pre-wrap text-slate-700">{draft.body}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">CTA</p>
                <p className="mt-2 text-slate-900">{draft.cta}</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Landing page</p>
                <a href={draft.landing_url} className="mt-2 block text-sm text-slate-900 underline" target="_blank" rel="noreferrer">
                  {draft.landing_url}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Current status</p>
            <p className="text-xl font-semibold text-slate-950">{status}</p>
            <button
              className="inline-flex w-full justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleApprove}
              disabled={submitting}
            >
              Approve Draft
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Request changes</p>
            <h2 className="text-2xl font-semibold text-slate-950">Send feedback to the agent</h2>
          </div>

          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Explain how this draft should be improved..."
            className="min-h-[160px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />

          <button
            className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSendFeedback}
            disabled={submitting}
          >
            Request Changes
          </button>

          {message ? <p className="text-sm leading-6 text-slate-700">{message}</p> : null}
        </div>
      </section>
    </div>
  );
}
