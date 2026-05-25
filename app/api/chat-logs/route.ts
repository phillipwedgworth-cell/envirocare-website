import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Read-only endpoint that returns logged chatbot conversations.
// Protected by LOGS_AUTH_KEY env var — must match the `x-logs-key` header.
// The weekly chatbot-review scheduled task hits this, pulls the conversations,
// then writes them to monitoring/chatbot-conversations.json before analyzing.

const LOG_KEY = "chatbot:conversations";
const MAX_RETURN = 500;

export async function GET(req: NextRequest) {
  const expected = process.env.LOGS_AUTH_KEY;
  if (!expected) {
    return NextResponse.json({ error: "Endpoint not configured" }, { status: 503 });
  }
  const provided = req.headers.get("x-logs-key");
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // lrange returns newest first since we lpush. Parse each JSON string entry.
    const raw = await kv.lrange<string>(LOG_KEY, 0, MAX_RETURN - 1);
    const conversations = raw
      .map(item => {
        // @vercel/kv may return already-parsed objects or strings depending on type — handle both
        if (typeof item === "string") {
          try { return JSON.parse(item); } catch { return null; }
        }
        return item;
      })
      .filter(Boolean);
    return NextResponse.json({ count: conversations.length, conversations });
  } catch (err) {
    return NextResponse.json(
      { error: "KV read failed", detail: String(err) },
      { status: 500 }
    );
  }
}

// DELETE: clears the log (called by the weekly review task after it pulls + saves)
export async function DELETE(req: NextRequest) {
  const expected = process.env.LOGS_AUTH_KEY;
  if (!expected) {
    return NextResponse.json({ error: "Endpoint not configured" }, { status: 503 });
  }
  const provided = req.headers.get("x-logs-key");
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await kv.del(LOG_KEY);
    return NextResponse.json({ cleared: true });
  } catch (err) {
    return NextResponse.json(
      { error: "KV delete failed", detail: String(err) },
      { status: 500 }
    );
  }
}
