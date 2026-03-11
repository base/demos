import * as p from "@clack/prompts";
import type { LlmProvider, CustomToolDef, WalletType } from "../types.js";
import { callLlmRaw } from "./critique.js";
import { BACK } from "./navigation.js";

const SYSTEM_PROMPT = `You are a TypeScript code generator for LangChain trading agent tools.

Given documentation for a service/protocol and a user description, generate a single TypeScript file that exports a \`get<Name>Tools()\` function returning an array of DynamicStructuredTool instances.

Rules:
- Import DynamicStructuredTool from "@langchain/core/tools"
- Import z from "zod"
- Each tool must have a descriptive name (snake_case), description, a zod schema, and an async func
- Return JSON.stringify results from func
- Handle errors gracefully with try/catch
- Do not add any markdown formatting, code fences, or explanation — return ONLY valid TypeScript source code
- The function name must be get<PascalCaseName>Tools where PascalCaseName matches the kebab-case tool name converted to PascalCase`;

const PROTOCOL_EXTRA = `
- You may use "viem" for contract interactions (import from "viem")
- Use standard fetch() for REST API calls`;

const X402_EXTRA = `
- Import { getX402Fetch } from "../x402/client.js"
- Use getX402Fetch() to get a fetch function that handles x402 payment
- Call this fetch function instead of standard fetch for the API endpoint`;

function buildUserMessage(description: string, sourceContent: string, sourceLabel: string, type: string): string {
  const typeNote =
    type === "protocol" ? PROTOCOL_EXTRA :
    type === "x402" ? X402_EXTRA :
    "\n- Use standard fetch() for REST API calls";

  return `Tool type: ${type}
${typeNote}

${sourceLabel} (may be truncated):
---
${sourceContent.slice(0, 12000)}
---

User description: ${description}

Generate the TypeScript file now.`;
}

function toKebabCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchDocs(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "create-trading-agent/0.1" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return `[Failed to fetch docs: ${res.status} ${res.statusText}]`;
    }
    const text = await res.text();
    // Strip HTML tags for a rough text extraction
    return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  } catch (e) {
    return `[Failed to fetch docs: ${(e as Error).message}]`;
  }
}

export async function promptCustomTools(
  llm: LlmProvider,
  model: string,
  wallet: WalletType
): Promise<CustomToolDef[]> {
  const customTools: CustomToolDef[] = [];

  while (true) {
    const addMore = await p.confirm({
      message: customTools.length === 0
        ? "Add a custom tool from docs/skill? (Experimental)"
        : "Add another custom tool?",
      initialValue: false,
    });

    if (p.isCancel(addMore) || !addMore) break;

    // Tool type
    const toolTypeOptions = [
      { value: "protocol", label: "Protocol", hint: "On-chain protocol (DEX, lending, etc.)" },
      { value: "unknown", label: "I don't know", hint: "General purpose tool" },
    ];
    if (wallet === "cdp-server-wallet") {
      toolTypeOptions.splice(1, 0, {
        value: "x402",
        label: "x402 service",
        hint: "Pay-per-request API via x402",
      });
    } else {
      console.log(
        "\nCustom x402 tools are only available with the CDP wallet scaffold because the shared x402 client is initialized there.\n"
      );
    }

    const toolType = await p.select({
      message: "What type of integration?",
      options: [...toolTypeOptions, { value: BACK, label: "← Go back" }],
    });

    if (p.isCancel(toolType) || toolType === BACK) break;

    const sourceType = await p.select({
      message: "Choose tool generation source (Experimental):",
      options: [
        { value: "docs", label: "Docs URL", hint: "Fetch and synthesize from API/protocol docs" },
        { value: "skill", label: "Skill text", hint: "Use a pasted skill/workflow description" },
        { value: BACK, label: "← Go back" },
      ],
    });

    if (p.isCancel(sourceType) || sourceType === BACK) break;

    let sourceContent = "";
    let sourceLabel = "Documentation";
    if (sourceType === "docs") {
      const docsUrl = await p.text({
        message: "URL to the tool's documentation:",
        placeholder: "https://docs.example.com/api",
        validate: (v) => {
          if (!v.trim()) return "URL is required.";
          try {
            new URL(v.trim());
          } catch {
            return "Enter a valid URL.";
          }
        },
      });

      if (p.isCancel(docsUrl)) break;

      const s = p.spinner();
      s.start("Fetching documentation...");
      sourceContent = await fetchDocs(docsUrl.trim());
      s.stop("Documentation fetched.");
      sourceLabel = "Documentation";
    } else {
      const skillText = await p.text({
        message: "Paste skill/workflow notes for this tool:",
        placeholder: "Describe capabilities, API patterns, constraints, and expected tool behavior",
        validate: (v) => {
          if (!v.trim()) return "Skill/workflow text is required.";
        },
      });
      if (p.isCancel(skillText)) break;
      sourceContent = skillText.trim();
      sourceLabel = "Skill context";
    }

    // Description
    const description = await p.text({
      message: "Brief description of what you want the tool to do:",
      placeholder: "e.g. Fetch token prices and execute swaps",
      validate: (v) => {
        if (!v.trim()) return "Description is required.";
      },
    });

    if (p.isCancel(description)) break;

    // Tool name
    const nameInput = await p.text({
      message: "Tool name (kebab-case):",
      placeholder: "e.g. my-protocol",
      validate: (v) => {
        if (!v.trim()) return "Name is required.";
        const kebab = toKebabCase(v);
        if (kebab.length < 2) return "Name too short.";
      },
    });

    if (p.isCancel(nameInput)) break;

    const name = toKebabCase(nameInput);

    // Generate code via LLM
    const s = p.spinner();
    s.start(`Generating tool code with ${model}...`);

    const userMessage = buildUserMessage(
      description,
      sourceContent,
      sourceLabel,
      toolType as string
    );

    try {
      const code = await callLlmRaw(llm, model, SYSTEM_PROMPT, userMessage);

      if (!code || code.length < 50) {
        s.stop("Code generation failed — skipping this tool.");
        console.log(
          "\nThe LLM returned an empty or invalid response. Try again with a different description or docs URL.\n"
        );
        continue;
      }

      // Strip any accidental markdown fences the LLM might add
      const cleanCode = code
        .replace(/^```(?:typescript|ts)?\n?/gm, "")
        .replace(/```$/gm, "")
        .trim();

      s.stop("Tool code generated.");

      // Show a preview
      const lines = cleanCode.split("\n");
      const preview = lines.length > 15
        ? lines.slice(0, 15).join("\n") + `\n... (${lines.length - 15} more lines)`
        : cleanCode;
      console.log(`\nGenerated: ${name}.ts\n${preview}\n`);

      const accept = await p.confirm({
        message: "Include this tool in your project?",
        initialValue: true,
      });

      if (p.isCancel(accept)) break;

      if (accept) {
        customTools.push({
          name,
          type: toolType as CustomToolDef["type"],
          code: cleanCode,
        });
        p.log.success(`Added custom tool: ${name}`);
      } else {
        p.log.info(`Skipped: ${name}`);
      }
    } catch (e) {
      s.stop("Code generation failed.");
      console.log(`\nLLM Error\nError: ${(e as Error).message}\n`);
    }
  }

  return customTools;
}
