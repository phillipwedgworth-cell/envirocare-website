// agents/lib/critic.mjs
// Universal critic/judge agent — CHIEF STRATEGY OFFICER persona
// Receives worker output + rubric, returns revised output after up to MAX_LOOPS passes
// Hard rule: never change MAX_LOOPS above 3
// Critic uses Opus 4 — sharpest rubric judgment, kills generic advice

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } catch (e) {
    console.error(`[critic] failed to import @anthropic-ai/sdk: ${e.message}`);
    anthropic = null;
  }
}
const MAX_LOOPS = 3;
const CRITIC_MODEL = "claude-opus-4-8";
const CRITIC_TEMPERATURE = 0.4;

const CRITIC_SYSTEM = `You are the Chief Strategy Officer reviewing AI-generated recommendations for EnviroCare Pest Control.

YOUR IDENTITY:
You've seen hundreds of AI-generated recommendation lists that say nothing. Generic advice makes you angry. "Improve your CTAs" tells nobody anything. You demand specifics — which CTA, what copy, what color, where exactly on the page, and exactly why it beats what's there now.

YOUR GOAL:
Challenge every recommendation. Kill anything generic. Only approve ideas that are:
1. Specific to EnviroCare's actual situation (not pest control in general)
2. Actionable this week (not "eventually build a content strategy")
3. Would make a real measurable difference in rankings, calls, or conversions

YOUR STANDARD:
You rank everything by impact-to-effort ratio. A recommendation that takes 1 hour and moves the needle 8 points beats a recommendation that takes 3 weeks and moves it 5. You cut the bottom half without mercy.

WHAT AUTOMATICALLY FAILS:
- Any recommendation without a specific number, name, or location
- Advice that applies to any pest control company, not specifically EnviroCare
- Missing IMPACT or EFFORT scores
- Vague fixes like "improve trust signals" without specifying which signal, where, and how
- Recommendations that don't reference competitor intelligence or site audit findings
- ANY claim that the agent took an external action it has no tool for (e.g. "filed a support ticket," "emailed the team," "submitted to Google," "opened a Jira issue") — agents may ONLY claim actions that correspond to actual tool calls they made during this run. If you spot a fabricated action claim, FAIL the output and require the agent to either remove the claim or replace it with what it actually did/observed.`;

export async function criticLoop({ workerName, task, output, rubric, revise, onEscalate }) {
  let current = output;
  const history = [];

  if (!anthropic) {
    throw new Error('[critic] ANTHROPIC_API_KEY is not set — critic loop cannot run. Set ANTHROPIC_API_KEY to enable the critic.');
  }

  for (let loop = 1; loop <= MAX_LOOPS; loop++) {
    console.log(`[critic] Loop ${loop}/${MAX_LOOPS} — reviewing ${workerName} output`);

    const review = await anthropic.messages.create({
      model: CRITIC_MODEL,
      max_tokens: 500,
      system: CRITIC_SYSTEM,
      messages: [
        {
          role: "user",
          content: `TASK THE WORKER WAS GIVEN:
${task}

WORKER OUTPUT TO REVIEW:
${current}

QUALITY RUBRIC (what "pass" requires):
${rubric}

Respond in this exact format:
VERDICT: PASS or FAIL
ISSUES: (if FAIL — bullet list of specific problems, be terse and brutal)
SUGGESTIONS: (if FAIL — specific fixes only, no vague guidance)

If PASS, write VERDICT: PASS and nothing else.`,
        },
      ],
    });

    const reviewText = review.content.find(b => b.type === "text")?.text || "";
    const passed = reviewText.includes("VERDICT: PASS");

    console.log(`[critic] ${workerName} — loop ${loop}: ${passed ? "PASS ✓" : "FAIL ✗"}`);
    if (!passed) console.log(`[critic] ${workerName} review:\n${reviewText}\n`);
    history.push({ loop, verdict: passed ? "PASS" : "FAIL", review: reviewText });

    if (passed) return current;

    if (loop === MAX_LOOPS) {
      console.warn(`[critic] ${workerName} — max loops hit, escalating`);
      if (onEscalate) await onEscalate(current, history);
      return current;
    }

    const feedback = reviewText.replace("VERDICT: FAIL", "").trim();
    console.log(`[critic] Sending feedback to ${workerName} for revision`);
    current = await revise(feedback);
  }

  return current;
}
