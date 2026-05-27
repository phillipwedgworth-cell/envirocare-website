import { getAdDraftById } from "@/lib/ads";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params?.id) {
    return Response.json({ error: "Missing ad draft id" }, { status: 400 });
  }

  try {
    const draft = await getAdDraftById(params.id);
    if (!draft) {
      return Response.json({ error: "Draft not found" }, { status: 404 });
    }
    return Response.json({ ok: true, draft });
  } catch (error) {
    console.error("[ads] getAdDraftById failed", error);
    return Response.json({ error: "Failed to load ad draft" }, { status: 500 });
  }
}
