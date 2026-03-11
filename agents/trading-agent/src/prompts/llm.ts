import * as p from "@clack/prompts";
import type { LlmProvider } from "../types.js";
import { MODELS } from "../types.js";
import { BACK, type Backable } from "./navigation.js";

export const ENV_KEY_MAP: Record<LlmProvider, string> = {
  claude: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY",
  venice: "VENICE_API_KEY",
};

export async function promptLlm(): Promise<Backable<{ provider: LlmProvider; model: string }>> {
  const provider = await p.select({
    message: "Select LLM provider:",
    options: [
      { value: "claude", label: "Claude (Anthropic)" },
      { value: "openai", label: "OpenAI" },
      { value: "gemini", label: "Gemini" },
      { value: "venice", label: "Venice (OpenAI-compatible endpoint)" },
      { value: BACK, label: "← Go back" },
    ],
  });

  if (p.isCancel(provider)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (provider === BACK) return BACK;

  const llmProvider = provider as LlmProvider;
  let model: string;

  if (llmProvider === "venice") {
    const defaultModel = "venice-uncensored";
    const modelChoice = await p.select({
      message: "Select model preset:",
      options: [
        { value: "default", label: `${defaultModel} (recommended)` },
        { value: "custom", label: "Enter custom model name" },
        { value: BACK, label: "← Go back" },
      ],
    });

    if (p.isCancel(modelChoice)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    if (modelChoice === BACK) return BACK;

    if (modelChoice === "custom") {
      const customModel = await p.text({
        message:
          "Enter Venice model name: (type 'back' to go to previous step)",
        initialValue: defaultModel,
        validate: (v) => {
          if (v.trim().toLowerCase() === "back") return;
          if (!v.trim()) return "Model name is required.";
        },
      });

      if (p.isCancel(customModel)) {
        p.cancel("Cancelled.");
        process.exit(0);
      }

      if (customModel.trim().toLowerCase() === "back") return BACK;
      model = customModel.trim();
    } else {
      model = defaultModel;
    }
  } else {
    const models = MODELS[llmProvider];
    const selected = await p.select({
      message: "Select model:",
      options: [
        ...models.map((m) => ({ value: m.value, label: m.label })),
        { value: BACK, label: "← Go back" },
      ],
    });

    if (p.isCancel(selected)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    if (selected === BACK) return BACK;
    model = selected as string;
  }

  // Ask for API key if not already in env
  const envVar = ENV_KEY_MAP[llmProvider];
  if (!process.env[envVar]) {
    const apiKey = await p.password({
      message: `Enter your ${envVar} (used to critique your strategy):`,
      validate: (v) => {
        if (!v.trim()) return `${envVar} is required.`;
      },
    });

    if (p.isCancel(apiKey)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    process.env[envVar] = apiKey.trim();
  }

  return { provider: llmProvider, model };
}
