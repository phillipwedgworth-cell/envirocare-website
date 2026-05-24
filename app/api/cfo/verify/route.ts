import { NextResponse } from "next/server";

const requiredVars = [
  "OPENAI_API_KEY",
  "GEMINI_API_KEY",
  "GOOGLE_DRIVE_FOLDER_ID",
  "SUPABASE_URL",
  "SUPABASE_KEY",
  "QUICKBOOKS_REALM_ID",
  "QUICKBOOKS_ACCESS_TOKEN",
];

function getEnvStatus() {
  const status: Record<string, boolean> = {};
  for (const name of requiredVars) {
    status[name] = Boolean(process.env[name]);
  }
  return status;
}

export async function GET() {
  const envStatus = getEnvStatus();
  const missing = Object.entries(envStatus)
    .filter(([, present]) => !present)
    .map(([name]) => name);

  return NextResponse.json({
    ok: missing.length === 0,
    envStatus,
    missing,
    message:
      missing.length === 0
        ? "All CFO runtime environment variables are present. Use /api/cfo/run to execute the CFO agent."
        : "One or more required CFO environment variables are missing. Add them and retry.",
  });
}

export async function POST() {
  return GET();
}
