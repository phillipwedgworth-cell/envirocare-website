import { updateAdDraftStatus } from "@/lib/ads";
import { requireAdmin } from "@/lib/api-auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = requireAdmin(request); // changes draft status (patch 0021)
  if (denied) return denied;
  if (!params?.id) {
    return Response.json({ error: "Missing ad draft id" }, { status: 400 });
  }

  try {
    const updated = await updateAdDraftStatus(params.id, "approved");
    if (!updated) {
      return Response.json({ error: "Draft not found" }, { status: 404 });
    }
    return Response.json({ ok: true, draft: updated });
  } catch (error) {
    console.error("[ads] approve draft failed", error);
    return Response.json({ error: "Failed to update draft status" }, { status: 500 });
  }
}
