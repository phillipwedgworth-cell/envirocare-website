import { NextResponse } from "next/server";
import { run as runCFOAgent } from "@/agents/cfo-agent.mjs";

async function execute() {
  try {
    const output = await runCFOAgent();
    return NextResponse.json({ ok: true, output });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return execute();
}

export async function POST() {
  return execute();
}
