import { NextResponse } from "next/server";
import { run as runOrchestrator } from "@/agents/orchestrator.mjs";

// 800s = Vercel Pro ceiling. Even with parallel agents, the synthesis +
// critic loops at the end can take 90+ seconds. 300s left no headroom
// and the Saturday smoke run timed out twice. 800s gives generous buffer
// for the worst-case single agent + final synthesis without affecting
// happy-path performance.
export const maxDuration = 800;

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
