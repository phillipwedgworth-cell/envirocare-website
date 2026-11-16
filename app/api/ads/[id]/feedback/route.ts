import { appendAdDraftFeedback } from "@/lib/ads";
import { requireAdmin } from "@/lib/api-auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdmin(request); // changes draft status (patch 0021)
  if (denied) return denied;
  const { id } = await params;
  if (!id) {
    return Response.json({ error: "Missing ad draft id" }, { status: 400 });
  }

  let body: { feedback?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const feedback = typeof body.feedback === "string" ? body.feedback.trim() : "";
  if (!feedback) {
    return Response.json({ error: "Feedback text is required" }, { status: 422 });
  }

  try {
    const updated = await appendAdDraftFeedback(id, feedback);
    if (!updated) {
      return Response.json({ error: "Draft not found" }, { status: 404 });
    }
    return Response.json({ ok: true, draft: updated });
  } catch (error) {
    console.error("[ads] append feedback failed", error);
    return Response.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
