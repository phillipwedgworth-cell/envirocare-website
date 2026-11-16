import { updateAdDraftStatus } from "@/lib/ads";
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

  try {
    const updated = await updateAdDraftStatus(id, "approved");
    if (!updated) {
      return Response.json({ error: "Draft not found" }, { status: 404 });
    }
    return Response.json({ ok: true, draft: updated });
  } catch (error) {
    console.error("[ads] approve draft failed", error);
    return Response.json({ error: "Failed to update draft status" }, { status: 500 });
  }
}
