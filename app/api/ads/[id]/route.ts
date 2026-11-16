import { getAdDraftById } from "@/lib/ads";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdmin(request); // returns unapproved draft copy (patch 0022)
  if (denied) return denied;
  const { id } = await params;
  if (!id) {
    return Response.json({ error: "Missing ad draft id" }, { status: 400 });
  }

  try {
    const draft = await getAdDraftById(id);
    if (!draft) {
      return Response.json({ error: "Draft not found" }, { status: 404 });
    }
    return Response.json({ ok: true, draft });
  } catch (error) {
    console.error("[ads] getAdDraftById failed", error);
    return Response.json({ error: "Failed to load ad draft" }, { status: 500 });
  }
}
