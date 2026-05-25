// agents/lib/critic.mjs
// Universal critic/judge agent
// Receives worker output + rubric, returns revised output after up to MAX_LOOPS passes
// Hard rule: never change MAX_LOOPS above 3
// Critic uses Sonnet (sharper rubric judgment); workers use Haiku (cost efficient)

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MAX_LOOPS = 3;
const CRITIC_MODEL = "claude-sonnet-4-6"; // Sonnet for critic — stays on-rubric, no invented requirements

export async function criticLoop({ workerName, task, output, rubric, revise, onEscalate }) {
  let current = output;
  const history = [];

  for (let loop = 1; loop <= MAX_LOOPS; loop++) {
    console.log(`[critic] Loop ${loop}/${MAX_LOOPS} — reviewing ${workerName} output`);

    const review = await anthropic.messages.create({
      model: CRITIC_MODEL,
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `You are a quality control critic reviewing AI-generated content for EnviroCare Pest Control.

TASK THE WORKER WAS GIVEN:
${task}

WORKER OUTPUT TO REVIEW:
${current}

QUALITY RUBRIC (what "pass" requires):
${rubric}

Respond in this exact format:
VERDICT: PASS or FAIL
ISSUES: (if FAIL — bullet list of specific problems, be terse)
SUGGESTIONS: (if FAIL — specific fixes, not vague advice)

If PASS, just write VERDICT: PASS and nothing else.`,
        },
      ],
    });

    const reviewText = review.content.find(b => b.type === "text")?.text || "";
    const passed = reviewText.includes("VERDICT: PASS");

    console.log(`[critic] ${workerName} — loop ${loop}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) console.log(`[critic] ${workerName} review:\n${reviewText}\n`);
    history.push({ loop, verdict: passed ? "PASS" : "FAIL", review: reviewText });

    if (passed) return current;

    if (loop === MAX_LOOPS) {
      console.warn(`[critic] ${workerName} — max loops hit, escalating to human`);
      if (onEscalate) await onEscalate(current, history);
      return current;
    }

    const feedback = reviewText.replace("VERDICT: FAIL", "").trim();
    console.log(`[critic] Sending feedback to ${workerName} for revision`);
    current = await revise(feedback);
  }

  return current;
}
