import * as p from "@clack/prompts";
import type { LlmProvider, GuardrailConfig } from "../types.js";
import { BACK, type Backable } from "./navigation.js";

const SYSTEM_PROMPT = `You are a senior DeFi risk officer reviewing a trading strategy for a Base blockchain agent.
Your job is to:
1. Identify missing exit conditions, position sizing, or entry clarity.
2. Return a JSON with fields:
   - critique: string (2-3 bullet points of issues)
   - refined: string (improved strategy, plain English, includes stop-loss and slippage awareness)
3. Never add a minimum-wallet-size gate. The strategy must remain executable on small balances by scaling size proportionally.

The refined strategy must be safe to pass to an autonomous agent with no further human review.
Keep it concise. Do not add markdown. The refined strategy will be the agent's system prompt.`;

interface CritiqueResult {
  critique: string;
  refined: string;
  guardrails: GuardrailConfig;
}

interface LlmRequestConfig {
  apiKey: string;
  url: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

const MAX_DISPLAY_WIDTH = 88;

function normalizeMultiline(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function indentBlock(text: string, prefix = "  "): string {
  const normalized = normalizeMultiline(text);
  if (!normalized) return `${prefix}(none)`;

  return normalized
    .split("\n")
    .map((line) => (line.trim() ? `${prefix}${line}` : ""))
    .join("\n");
}

function formatCritiqueList(text: string): string {
  const normalized = normalizeMultiline(text);
  if (!normalized) return "  • No issues found.";

  return normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `  • ${line.replace(/^[-*•]\s*/, "")}`)
    .join("\n");
}

function splitLongWord(word: string, maxWidth: number): string[] {
  if (word.length <= maxWidth) return [word];

  const chunks: string[] = [];
  for (let i = 0; i < word.length; i += maxWidth) {
    chunks.push(word.slice(i, i + maxWidth));
  }
  return chunks;
}

function wrapContent(text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [""];

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    for (const chunk of splitLongWord(word, maxWidth)) {
      if (!current) {
        current = chunk;
        continue;
      }

      if (current.length + 1 + chunk.length <= maxWidth) {
        current += ` ${chunk}`;
        continue;
      }

      lines.push(current);
      current = chunk;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function wrapLine(line: string, width: number): string[] {
  if (!line.trim()) return [""];

  const bulletMatch = line.match(/^(\s*[•-]\s+)(.*)$/);
  if (bulletMatch) {
    const firstPrefix = bulletMatch[1];
    const nextPrefix = " ".repeat(firstPrefix.length);
    const content = bulletMatch[2];
    const firstWidth = Math.max(12, width - firstPrefix.length);
    const nextWidth = Math.max(12, width - nextPrefix.length);
    const wrapped = wrapContent(content, firstWidth);

    return wrapped.map((part, index) =>
      `${index === 0 ? firstPrefix : nextPrefix}${part}`
    );
  }

  const whitespaceMatch = line.match(/^(\s*)(.*)$/);
  const prefix = whitespaceMatch?.[1] ?? "";
  const content = whitespaceMatch?.[2] ?? line;
  const contentWidth = Math.max(12, width - prefix.length);

  return wrapContent(content, contentWidth).map((part) => `${prefix}${part}`);
}

function wrapForDisplay(text: string): string {
  const columns = process.stdout.columns ?? MAX_DISPLAY_WIDTH;
  const width = Math.max(40, Math.min(MAX_DISPLAY_WIDTH, columns - 4));

  return normalizeMultiline(text)
    .split("\n")
    .flatMap((line) => wrapLine(line, width))
    .join("\n");
}

const DEFAULT_GUARDRAILS: GuardrailConfig = {
  slippagePct: 0.5,
  stopLossPct: 8,
  maxPositionPct: 10,
};

function normalizeGuardrails(input?: Partial<GuardrailConfig>): GuardrailConfig {
  const slippagePct = Number(input?.slippagePct ?? DEFAULT_GUARDRAILS.slippagePct);
  const stopLossPct = Number(input?.stopLossPct ?? DEFAULT_GUARDRAILS.stopLossPct);
  const maxPositionPct = Number(input?.maxPositionPct ?? DEFAULT_GUARDRAILS.maxPositionPct);

  const allValid = [slippagePct, stopLossPct, maxPositionPct].every(
    (n) => Number.isFinite(n) && n > 0 && n <= 100
  );

  if (!allValid) return DEFAULT_GUARDRAILS;

  return { slippagePct, stopLossPct, maxPositionPct };
}

function buildLlmRequest(
  provider: LlmProvider,
  model: string,
  systemPrompt: string,
  userMessage: string,
  options?: { jsonMode?: boolean; maxTokens?: number }
): LlmRequestConfig {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const maxTokens = options?.maxTokens;

  if (provider === "claude") {
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");
    headers["x-api-key"] = apiKey;
    headers["anthropic-version"] = "2023-06-01";
    return {
      apiKey,
      url: "https://api.anthropic.com/v1/messages",
      headers,
      body: {
        model,
        ...(maxTokens ? { max_tokens: maxTokens } : {}),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      },
    };
  }

  if (provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) throw new Error("OPENAI_API_KEY not set");
    headers["Authorization"] = `Bearer ${apiKey}`;
    return {
      apiKey,
      url: "https://api.openai.com/v1/chat/completions",
      headers,
      body: {
        model,
        ...(maxTokens ? { max_tokens: maxTokens } : {}),
        ...(options?.jsonMode ? { response_format: { type: "json_object" } } : {}),
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      },
    };
  }

  if (provider === "gemini") {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");
    return {
      apiKey,
      url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      headers,
      body: {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userMessage }] }],
      },
    };
  }

  if (provider === "venice") {
    const apiKey = process.env.VENICE_API_KEY?.trim();
    if (!apiKey) throw new Error("VENICE_API_KEY not set");
    headers["Authorization"] = `Bearer ${apiKey}`;
    return {
      apiKey,
      url: "https://api.venice.ai/api/v1/chat/completions",
      headers,
      body: {
        model,
        ...(maxTokens ? { max_tokens: maxTokens } : {}),
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      },
    };
  }

  throw new Error(`Unsupported LLM provider: ${provider}`);
}

function extractOpenAiCompatibleText(data: any): string {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "text" in item) {
          return typeof item.text === "string" ? item.text : "";
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

function extractResponseText(provider: LlmProvider, data: any): string {
  if (provider === "claude") {
    return data.content?.[0]?.text ?? "";
  }
  if (provider === "openai" || provider === "venice") {
    return extractOpenAiCompatibleText(data);
  }
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

function parseCritiqueResponse(text: string): Partial<CritiqueResult> | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed);
  } catch {
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
}

async function callLlm(
  provider: LlmProvider,
  model: string,
  strategy: string,
  guardrails?: GuardrailConfig
): Promise<CritiqueResult> {
  const effectiveGuardrails = normalizeGuardrails(guardrails);

  const userMessage = `Strategy to review:\n${strategy}\n\nGuardrail parameters:\n- Slippage tolerance: ${effectiveGuardrails.slippagePct}%\n- Stop-loss threshold: ${effectiveGuardrails.stopLossPct}%\n- Max position size: ${effectiveGuardrails.maxPositionPct}% of wallet\n\nRespond with JSON only.`;

  try {
    const request = buildLlmRequest(provider, model, SYSTEM_PROMPT, userMessage, {
      jsonMode: true,
      maxTokens: 1024,
    });

    const res = await fetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(request.body),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error(`LLM API error (${res.status}): ${errBody.slice(0, 200)}`);
      return fallbackCritique(strategy, effectiveGuardrails, `API error ${res.status}`);
    }

    const data = await res.json();
    const text = extractResponseText(provider, data);
    const parsed = parseCritiqueResponse(text);
    if (parsed) {
      return {
        critique: parsed.critique ?? "No issues found.",
        refined: parsed.refined ?? strategy,
        guardrails: normalizeGuardrails(parsed.guardrails ?? effectiveGuardrails),
      };
    }

    return fallbackCritique(strategy, effectiveGuardrails, "provider response was not valid JSON");
  } catch (e) {
    console.error(`LLM critique error: ${(e as Error).message}`);
    return fallbackCritique(strategy, effectiveGuardrails, (e as Error).message);
  }
}

function fallbackCritique(
  strategy: string,
  guardrails?: GuardrailConfig,
  reason?: string
): CritiqueResult {
  const effectiveGuardrails = normalizeGuardrails(guardrails);
  const normalizedReason = reason?.trim()
    ? ` (${reason.trim().replace(/\.$/, "")})`
    : "";

  return {
    critique:
      `- LLM critique unavailable${normalizedReason}; using default guardrail injection.\n` +
      "- Consider adding explicit entry/exit conditions.\n" +
      "- Ensure position sizing is defined.",
    refined:
      `${strategy}\n\n` +
      `Guardrails:\n` +
      `- Maximum slippage tolerance: ${effectiveGuardrails.slippagePct}%\n` +
      `- Stop-loss threshold: ${effectiveGuardrails.stopLossPct}% drawdown triggers position exit\n` +
      `- Maximum position size: ${effectiveGuardrails.maxPositionPct}% of total wallet value\n` +
      `- Do not enforce any minimum wallet size; on small balances, trade proportionally smaller sizes\n` +
      `- Always verify token contracts before trading\n` +
      `- Never exceed position limits under any circumstances`,
    guardrails: effectiveGuardrails,
  };
}

export async function promptCritique(
  strategy: string,
  provider: LlmProvider,
  model: string,
  guardrails?: GuardrailConfig
): Promise<Backable<{ critique: string; refined: string; guardrails: GuardrailConfig }>> {
  const s = p.spinner();
  s.start(`Critiquing strategy with ${model}...`);

  const result = await callLlm(provider, model, strategy, guardrails);

  s.stop("Strategy critique complete.");

  const reviewText = wrapForDisplay(
    `Original strategy\n` +
      `${indentBlock(strategy)}\n\n` +
      `Critique\n` +
      `${formatCritiqueList(result.critique)}\n\n` +
      `Refined strategy\n` +
      `${indentBlock(result.refined)}\n\n` +
      `Guardrails\n` +
      `  • Slippage: ${result.guardrails.slippagePct}%\n` +
      `  • Stop-loss: ${result.guardrails.stopLossPct}%\n` +
      `  • Max position: ${result.guardrails.maxPositionPct}%`
  );

  console.log(`\nStrategy Review\n${reviewText}\n`);

  const action = await p.select({
    message: "What would you like to do?",
    options: [
      { value: "approve", label: "Approve refined strategy" },
      { value: "edit", label: "Edit the refined strategy" },
      { value: BACK, label: "← Go back" },
    ],
  });

  if (p.isCancel(action)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (action === BACK) return BACK;

  if (action === "edit") {
    const edited = await p.text({
      message: "Your edits: (type 'back' to go to previous step)",
      initialValue: result.refined,
    });

    if (p.isCancel(edited)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    if (edited.trim().toLowerCase() === "back") return BACK;
    return { critique: result.critique, refined: edited, guardrails: result.guardrails };
  }

  return result;
}

async function callLlmRaw(
  provider: LlmProvider,
  model: string,
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const request = buildLlmRequest(provider, model, systemPrompt, userMessage, {
    maxTokens: 4096,
  });

  const res = await fetch(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify(request.body),
  });

  if (!res.ok) {
    throw new Error(`LLM API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return extractResponseText(provider, data);
}

export { callLlm, callLlmRaw, fallbackCritique, SYSTEM_PROMPT };
