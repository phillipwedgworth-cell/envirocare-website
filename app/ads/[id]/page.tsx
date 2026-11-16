import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import AdDraftReview from "./AdDraftReview";
import { getAdDraftById } from "@/lib/ads";
import { ADS_COOKIE, adsSessionOk } from "@/lib/api-auth";

import type { Metadata } from "next";

// Internal ad-review surface. Never indexable: it renders unapproved draft copy,
// which is exactly the content the compliance rules exist to keep off the web.
// noindex + the robots.txt disallow only instruct crawlers; ACCESS is the session
// check below (patch 0022): no valid ad-review cookie -> the sign-in form, never
// the draft. The draft is read through lib/ads directly — this page used to fetch
// its own public /api/ads/[id] over HTTP, which was a second, unauthenticated path
// into the same data and could not carry the reviewer's cookie.
export const metadata: Metadata = { robots: { index: false, follow: false } };

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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const signedIn = adsSessionOk((await cookies()).get(ADS_COOKIE)?.value);

  if (!signedIn) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Ad draft review</h1>
          <p className="text-sm text-slate-600">Sign in with the command-center key to review this draft.</p>
          {error ? <p className="text-sm font-semibold text-red-700">That key did not match.</p> : null}
          <form method="post" action="/api/ads/review-login" className="space-y-3">
            <input type="hidden" name="returnTo" value={`/ads/${id}`} />
            <input
              type="password"
              name="key"
              required
              autoComplete="current-password"
              aria-label="Command-center key"
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
            <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  let draft: AdDraft | null = null;
  try {
    draft = (await getAdDraftById(id)) as AdDraft | null;
  } catch {
    draft = null;
  }
  if (!draft) notFound();

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
          <p className="mt-2 font-mono text-sm text-slate-800">{draft.id}</p>
          <p className="mt-3 text-sm text-slate-600">Current status: <span className="font-semibold text-slate-900">{draft.status}</span></p>
        </div>

        <AdDraftReview draft={draft} />
      </section>
    </main>
  );
}
