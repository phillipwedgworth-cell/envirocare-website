#!/usr/bin/env node
/*
  Simple 3-agent sequential crew (JS)
  - Researcher: OpenAI GPT-4o (openai package)
  - Strategist: Google Gemini 2.5 Pro (@google/generative-ai)
  - Critic: Anthropic Opus 4 (@anthropic-ai/sdk)
  Stores outputs to Supabase table `agent_runs` (columns: run_at, researcher, strategist, critic, metadata)

  Usage:
    Ensure env vars: OPENAI_API_KEY, GOOGLE_API_KEY, ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_KEY
    node crew-js/agent-crew.js
*/

const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Anthropic, HUMAN_PROMPT, AI_PROMPT } = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

const openaiKey = process.env.OPENAI_API_KEY;
const googleKey = process.env.GOOGLE_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!openaiKey || !googleKey || !anthropicKey) {
  console.error('Missing one of OPENAI_API_KEY, GOOGLE_API_KEY, ANTHROPIC_API_KEY in env');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: openaiKey });
const genai = new GoogleGenerativeAI(googleKey);
const anthropic = new Anthropic({ apiKey: anthropicKey });

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('SUPABASE_URL or SUPABASE_KEY not set — results will not be persisted.');
}

function extractOpenAIText(res) {
  // responses API may put text in output_text or output[0].content
  if (!res) return '';
  if (typeof res.output_text === 'string') return res.output_text;
  // Try legacy shapes
  if (Array.isArray(res.output) && res.output.length) {
    const parts = [];
    for (const seg of res.output) {
      if (seg.content) {
        if (typeof seg.content === 'string') parts.push(seg.content);
        else if (Array.isArray(seg.content)) {
          for (const c of seg.content) {
            if (typeof c === 'string') parts.push(c);
            else if (c.type === 'output_text' && c.text) parts.push(c.text);
          }
        }
      }
    }
    if (parts.length) return parts.join('\n');
  }
  // fallback
  try { return JSON.stringify(res); } catch (e) { return String(res); }
}

function extractGenAIText(res) {
  if (!res) return '';
  // Try common shapes from GenAI client
  if (res?.results && Array.isArray(res.results) && res.results[0]) {
    const r = res.results[0];
    if (r.candidates && r.candidates[0]) {
      const cand = r.candidates[0];
      if (typeof cand.output === 'string') return cand.output;
      if (cand.content) {
        // content may be array of blocks
        if (Array.isArray(cand.content)) {
          return cand.content.map(c => c.text || c).filter(Boolean).join('\n');
        }
      }
    }
  }
  if (res?.generated_text) return res.generated_text;
  try { return JSON.stringify(res); } catch (e) { return String(res); }
}

function extractAnthropicText(res) {
  if (!res) return '';
  if (typeof res === 'string') return res;
  if (res.completion) return res.completion;
  if (res?.response) return res.response;
  try { return JSON.stringify(res); } catch (e) { return String(res); }
}

async function callResearcher(prompt) {
  console.log('\n=== Researcher (OpenAI GPT-4o) ===');
  try {
    const resp = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1200,
    });
    // fallback to responses API
    const text = extractOpenAIText(resp) || (resp?.choices?.map(c=>c.message?.content).join('\n') ?? '');
    console.log(text.slice(0,1000));
    return text;
  } catch (err) {
    console.error('OpenAI error:', err?.message || err);
    // try responses API
    try {
      const resp2 = await openai.responses.create({ model: 'gpt-4o', input: prompt });
      const t = extractOpenAIText(resp2);
      console.log(t.slice(0,1000));
      return t;
    } catch (e) {
      console.error('OpenAI fallback error:', e?.message || e);
      return '';
    }
  }
}

async function callStrategist(prompt) {
  console.log('\n=== Strategist (Google Gemini 2.5 Pro) ===');
  try {
    const model = genai.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const res = await model.generateContent({ input: { text: prompt } });
    const text = extractGenAIText(res);
    console.log(text.slice(0,1000));
    return text;
  } catch (err) {
    console.error('Gemini error:', err?.message || err);
    return '';
  }
}

async function callCritic(prompt) {
  console.log('\n=== Critic (Anthropic Opus 4) ===');
  try {
    const anthropicPrompt = `${HUMAN_PROMPT}\n${prompt}\n${AI_PROMPT}`;
    const res = await anthropic.complete({
      model: 'claude-opus-4-20250514',
      prompt: anthropicPrompt,
      max_tokens_to_sample: 1200,
    });
    const text = extractAnthropicText(res);
    console.log(text.slice(0,1000));
    return text;
  } catch (err) {
    console.error('Anthropic error:', err?.message || err);
    return '';
  }
}

async function persist(run) {
  if (!supabase) return;
  try {
    const { data, error } = await supabase.from('agent_runs').insert([run]).select();
    if (error) console.error('Supabase error:', error.message || error);
    else console.log('Persisted run id:', data?.[0]?.id ?? '[unknown]');
  } catch (err) {
    console.error('Supabase exception:', err?.message || err);
  }
}

async function main() {
  const researcherTask = `Visit cookspest.com and envirocare-web.vercel.app. Compare the two homepages. List 5 things Cook's does better and 5 things EnviroCare does better. Be specific: exact elements, exact sections, and short evidence lines.`;

  const researcherOut = await callResearcher(researcherTask);

  const strategistTask = `Read the researcher's findings below and propose 3 bold changes to EnviroCare's homepage that would make it clearly better than Cook's. For each proposal provide: exact H1/H2 copy, exact CTA copy, exact CSS color hex codes, and exact placement on the homepage (section). Researcher findings:\n\n${researcherOut}`;

  const strategistOut = await callStrategist(strategistTask);

  const criticTask = `Review both outputs (researcher and strategist). Kill anything vague. Rank the 3 proposals by impact and pick the #1 change to make today. Explain precisely why it wins and how to measure success. Researcher:\n\n${researcherOut}\n\nStrategist:\n\n${strategistOut}`;

  const criticOut = await callCritic(criticTask);

  const run = {
    run_at: new Date().toISOString(),
    researcher: researcherOut,
    strategist: strategistOut,
    critic: criticOut,
    metadata: { repo: 'phillipwedgworth-cell/envirocare-website' },
  };

  console.log('\n=== FINAL RUN ===');
  console.log('Researcher length:', (researcherOut||'').length);
  console.log('Strategist length:', (strategistOut||'').length);
  console.log('Critic length:', (criticOut||'').length);

  await persist(run);
}

main().catch((err)=>{ console.error(err); process.exit(1); });
