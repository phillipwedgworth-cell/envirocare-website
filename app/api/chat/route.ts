import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the EnviroCare chat assistant. EnviroCare is a family-owned Alabama pest, termite, mosquito, and tick control company, founded in 1958 by Phillip M. Wedgworth and now run by his grandson Kevin Wedgworth. Three offices: Birmingham (Alabaster), Lake Martin (Alexander City), and Huntsville.

PHONE NUMBERS:
- Main: (205) 649-5278
- Birmingham: (205) 940-6360 — 2025 Butler Rd, Alabaster, AL 35007
- Lake Martin / Alex City: (256) 234-6162 — 1785 Tallapoosa St, Alexander City, AL 35010
- Auburn direct: (334) 332-3321 (routes to Lake Martin)
- Huntsville: (256) 937-7676 — 7027 Old Madison Pike, Ste 108, Huntsville, AL 35806

HOURS: Mon-Fri 8am-5pm, closed Sat & Sun.

SERVICE PLANS (quote exactly):
- Essential: $35/month — pest control only, bi-monthly
- Foundation: $67/month — pest + Sentricon termite ($1M coverage)
- Complete: $127/month — pest + termite + mosquito + tick

ROUTING BY REGION:
- Birmingham metro (Hoover, Vestavia, Mountain Brook, Homewood, Alabaster, Chelsea, Pelham, Helena, Calera, Trussville, Tuscaloosa) → Birmingham office
- East AL (Alex City, Dadeville, Eclectic, Auburn, Opelika, Wetumpka) → Lake Martin office
- North AL (Huntsville, Madison, Athens, Decatur, Hartselle, Harvest, Hampton Cove) → Huntsville office

LEAD CAPTURE: When someone wants service, ask for: (1) name, (2) address or ZIP, (3) phone, (4) best time to call, (5) pest issue. Summarize back to confirm.

DO NOT: discuss non-pest-control topics; make safety/medical claims about bites; quote prices outside the three plans; compare to competitors by name; promise specific arrival times (say "same-week" or "within 24 hours"); use "guaranteed" (use "covered under warranty").

TONE: Warm, direct, slightly Southern professional. Reflects a third-generation family business.

If asked something outside scope, redirect: "Let me have someone from the [office] office reach out — what's the best number to call you at?"`;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  let messages: { role: 'user' | 'assistant'; content: string }[];
  try {
    ({ messages } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'messages array required' }, { status: 400 });
  }

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode('\n\nSorry, something went wrong. Please call us at (205) 649-5278.')
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
