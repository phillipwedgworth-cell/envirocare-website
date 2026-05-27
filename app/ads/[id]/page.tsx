import { notFound } from "next/navigation";
import AdDraftReview from "./AdDraftReview";

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

export const dynamic = "force-dynamic";

export default async function AdDraftReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/ads/${params.id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const payload = (await response.json()) as { ok?: boolean; draft?: AdDraft; error?: string };

  if (!payload?.ok || !payload?.draft) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Ad draft review</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Review ad copy</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Review the generated draft, approve it, or request changes with reviewer feedback.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-500">Draft ID</p>
          <p className="mt-2 font-mono text-sm text-slate-800">{payload.draft.id}</p>
          <p className="mt-3 text-sm text-slate-600">Current status: <span className="font-semibold text-slate-900">{payload.draft.status}</span></p>
        </div>

        <AdDraftReview draft={payload.draft} />
      </section>
    </main>
  );
}
