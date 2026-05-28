import { NextResponse } from "next/server";
import { run as runOrchestrator } from "@/agents/orchestrator.mjs";

export const maxDuration = 300;

async function execute() {
  try {
    const output = await runOrchestrator();
    return NextResponse.json({ ok: true, output });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function GET() {
  return execute();
}

export async function POST() {
  return execute();
}
