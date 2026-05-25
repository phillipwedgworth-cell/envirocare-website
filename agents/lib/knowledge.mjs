// agents/lib/knowledge.mjs
// Loads all .md files from agents/knowledge/ and returns them as a single context string.
// Imported by every agent before it generates recommendations.

import { readFileSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = resolve(__dir, "../knowledge");

/**
 * Returns all knowledge files concatenated as a single string.
 * Each file is labelled with its filename so the LLM knows what it's reading.
 */
export function loadKnowledge() {
  try {
    const files = readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith(".md")).sort();
    const parts = files.map(f => {
      const content = readFileSync(join(KNOWLEDGE_DIR, f), "utf8");
      return `### KNOWLEDGE: ${f}\n${content}`;
    });
    return parts.join("\n\n---\n\n");
  } catch (err) {
    console.warn("[knowledge] Could not load knowledge files:", err.message);
    return "";
  }
}

/**
 * Returns the knowledge context as a single labelled block suitable for injection
 * into any LLM prompt.
 */
export function knowledgeBlock() {
  const raw = loadKnowledge();
  if (!raw) return "";
  return `\n=== ENVIROCARE KNOWLEDGE BASE ===\n${raw}\n=== END KNOWLEDGE BASE ===\n`;
}
