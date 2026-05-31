import { NextResponse } from "next/server";

// Single place to see which agent runtime env vars are present on THIS
// deployment (Preview and Production are separate scopes in Vercel — a key
// can be set on one and missing on the other). Reports presence only, never
// values, mirroring app/api/cfo/verify/route.ts.

// Grouped by what each agent needs so the response is self-explanatory.
const ENV_GROUPS = {
  core: ["ANTHROPIC_API_KEY", "SUPABASE_URL", "SUPABASE_KEY"],
  panel: ["OPENAI_API_KEY", "GEMINI_API_KEY"],
  email: ["RESEND_API_KEY", "NOTIFY_EMAIL", "NOTIFY_FROM"],
  seo: ["BRIGHTLOCAL_API_KEY", "LOCAL_FALCON_API_KEY", "PAGESPEED_API_KEY"],
};

// Keys that are optional — their absence is fine and shouldn't mark the
// deployment unhealthy (panel degrades to fewer lenses; PageSpeed works
// keyless at low volume; NOTIFY_FROM falls back to a default).
const OPTIONAL = new Set([
  "OPENAI_API_KEY",
  "GEMINI_API_KEY",
  "PAGESPEED_API_KEY",
  "NOTIFY_FROM",
  "LOCAL_FALCON_API_KEY",
]);

export async function GET() {
  const groups: Record<string, Record<string, boolean>> = {};
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  for (const [group, names] of Object.entries(ENV_GROUPS)) {
    groups[group] = {};
    for (const name of names) {
      const present = Boolean(process.env[name]);
      groups[group][name] = present;
      if (!present) {
        (OPTIONAL.has(name) ? missingOptional : missingRequired).push(name);
      }
    }
  }

  return NextResponse.json({
    ok: missingRequired.length === 0,
    vercelEnv: process.env.VERCEL_ENV ?? "unknown",
    groups,
    missingRequired,
    missingOptional,
    message:
      missingRequired.length === 0
        ? "All required agent env vars present. Optional ones missing only reduce capability (e.g. fewer panel lenses)."
        : `Missing required env vars: ${missingRequired.join(", ")}. Add them (Preview + Production scope) and redeploy.`,
  });
}

export async function POST() {
  return GET();
}
