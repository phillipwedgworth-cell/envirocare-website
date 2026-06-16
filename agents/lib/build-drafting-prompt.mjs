/**
 * agents/lib/build-drafting-prompt.mjs — assembles the Claude drafting prompt
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   agents/lib/build-drafting-prompt.mjs
 * Commit: feat(agents): drafting-agent prompt builder (source-of-truth wired)
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * Improves on the generic XML template: the anti-fluff rules stay, but the
 * COMPLIANCE guardrails are DERIVED from data/compliance.ts (single source), and
 * the output leans on substantive prose (the actual NeuronWriter score lever) —
 * not bullet-and-bold filler, which is thin.
 *
 * Depends on data/compliance.ts (ships in the source-of-truth package). Falls
 * back to a minimal embedded guardrail list if that file isn't present yet.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function loadComplianceGuardrails(root = process.cwd()) {
  try {
    const txt = readFileSync(join(root, 'data/compliance.ts'), 'utf8');
    const lines = [];

    // Hard banned patterns -> "Never write X. Instead: Y."
    const re = /pattern:\s*'((?:\\.|[^'\\])*)'\s*,\s*reason:\s*'([^']*)'\s*,\s*approvedInstead:\s*'([^']*)'/g;
    let m;
    while ((m = re.exec(txt))) {
      const human = m[1]
        .replace(/\\\\/g, '\\')          // un-double TS escaping
        .replace(/\[\\?s-\]\??/g, '-')   // [\s-]? -> -
        .replace(/\\s\*?/g, ' ')          // \s / \s* -> space
        .replace(/[?*()]/g, '')           // strip quantifiers/groups
        .replace(/\s+/g, ' ')
        .trim();
      lines.push(`- Never write "${human}" (${m[2]}). Instead: ${m[3]}.`);
    }

    // Soft rules (judgment calls) -> include verbatim.
    const soft = txt.match(/SOFT_RULES[^[]*\[([\s\S]*?)\];/);
    if (soft) {
      for (const sm of soft[1].matchAll(/'((?:\\.|[^'\\])*)'/g)) {
        lines.push(`- ${sm[1].replace(/\\'/g, "'")}`);
      }
    }
    return lines.join('\n');
  } catch {
    return [
      '- Never write "pet-safe / kid-safe / non-toxic / eco-safe". Instead: EPA-registered, applied per label directions.',
      '- Never write "same-day / there today / available now". Instead: prompt scheduling.',
      '- Never write "same technician". Instead: a familiar local team whenever possible.',
      '- Never write "Bundle & Save". Bundling is convenience (one invoice, one tech), never a discount.',
      '- Mosquito: never guarantee or imply elimination ("mosquito-free", "eliminate mosquitoes").',
      '- Never name a competitor. Never publish review counts or customer counts.',
    ].join('\n');
  }
}

/**
 * @param {object} d
 * @param {string} d.location        e.g. "Vestavia Hills, AL"
 * @param {string} d.service         e.g. "Mosquito Control"
 * @param {string} d.serviceSpecs    locked specs/pricing prose (from services.ts / pricing.ts)
 * @param {string} d.geo             neighborhoods/landmarks (from service-areas.ts / Supabase)
 * @param {string} d.climate         local climate/pest-pressure facts (firsthand, not generic)
 * @param {string} d.office          serving office + phone (from offices.ts)
 * @param {string[]} d.neuronBasic   NeuronWriter basic terms
 * @param {string[]} d.neuronExtended NeuronWriter extended/LSI terms
 */
export function buildDraftingPrompt(d, root = process.cwd()) {
  const guardrails = loadComplianceGuardrails(root);
  return `You are an expert Alabama local-SEO copywriter and pest/termite specialist writing for EnviroCare (family-owned, since 1958). Write one highly localized, technically accurate page.

<anti_ai_spam_rules>
1. NO FLUFF. Never use: "In the bustling city of", "Whether you're a homeowner or business", "Look no further", "Nestled in", "When it comes to", "In today's world".
2. OPEN WITH THE PROBLEM AND THE SOLUTION. No generic intro about why the service matters.
3. LOCAL AUTHENTICITY. Weave in the real geography/climate below as someone who works there would. Do NOT just swap a city name into a template.
4. SUBSTANCE OVER FORMATTING. The goal is topical depth — write real, specific PROSE paragraphs (the thing that lifts content scores). Use a short bulleted list only where it genuinely aids scanning; do not pad with bullets and bold in place of substance.
5. TONE: authoritative, concise, active voice. Short paragraphs (max ~3 sentences).
</anti_ai_spam_rules>

<compliance_guardrails_NON_NEGOTIABLE>
These are hard brand/legal rules. A draft that breaks any of these is rejected by the auditor before it ships.
${guardrails}
- Use only facts provided below. Do NOT invent statistics, neighborhoods, prices, guarantees, arrival times, or treatment claims.
</compliance_guardrails_NON_NEGOTIABLE>

<seo_terms>
Integrate these NeuronWriter terms naturally, in context — never stuff them.
Basic: ${(d.neuronBasic || []).join(', ') || '[none provided]'}
Extended/LSI: ${(d.neuronExtended || []).join(', ') || '[none provided]'}
</seo_terms>

<local_data_context>
Target location: ${d.location}
Service: ${d.service}
Service specs (locked — do not alter prices/claims): ${d.serviceSpecs || '[none]'}
Serving office & phone: ${d.office || '[none]'}
Local neighborhoods / landmarks: ${d.geo || '[none — omit local-specific claims rather than invent]'}
Local climate / pest-pressure facts: ${d.climate || '[none — omit rather than invent]'}
</local_data_context>

<output_requirements>
Clean Markdown. Sections:
1. An H1 with the service and location.
2. A punchy lead (2–3 sentences) naming the specific local pest pressure or environmental challenge — not a generic intro.
3. An H2 on the specific service approach (prose, with the real method).
4. An H2 on local coverage / neighborhood-specific conditions using the provided geography.
5. A short FAQ (3–4 real questions a local would ask) — these double as FAQ schema.
6. A clear CTA using the serving office phone above. No urgency/availability claims.
Write the page now.
</output_requirements>`;
}
