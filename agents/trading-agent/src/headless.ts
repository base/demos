import fs from "node:fs";
import path from "node:path";
import type {
  ScaffoldConfig,
  WalletType,
  LlmProvider,
  ToolId,
  GuardrailConfig,
} from "./types.js";
import { ALL_TOOLS, UNIVERSAL_TOOLS } from "./types.js";
import { generate } from "./generator.js";
import { callLlm, fallbackCritique } from "./prompts/critique.js";
import { ENV_KEY_MAP } from "./prompts/llm.js";

interface HeadlessFlags {
  name?: string;
  wallet?: string;
  tools?: string;
  llm?: string;
  model?: string;
  strategy?: string;
  output?: string;
  config?: string;
  slippagePct?: string;
  stopLossPct?: string;
  maxPositionPct?: string;
  testMode?: string;
  selfUpdating?: string;
  evaluationInterval?: string;
  overwrite?: boolean;
  merge?: boolean;
}

interface ConfigJson {
  name: string;
  wallet: WalletType;
  tools: ToolId[];
  llm: LlmProvider;
  model: string;
  strategy: string;
  output: string;
  guardrails?: Partial<GuardrailConfig>;
  testMode?: boolean;
  selfUpdating?: boolean;
  evaluationInterval?: number;
}

function parseArgs(args: string[]): HeadlessFlags {
  const flags: HeadlessFlags = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];
    switch (arg) {
      case "--name": flags.name = next; i++; break;
      case "--wallet": flags.wallet = next; i++; break;
      case "--tools": flags.tools = next; i++; break;
      case "--llm": flags.llm = next; i++; break;
      case "--model": flags.model = next; i++; break;
      case "--strategy": flags.strategy = next; i++; break;
      case "--output": flags.output = next; i++; break;
      case "--config": flags.config = next; i++; break;
      case "--slippage-pct": flags.slippagePct = next; i++; break;
      case "--stop-loss-pct": flags.stopLossPct = next; i++; break;
      case "--max-position-pct": flags.maxPositionPct = next; i++; break;
      case "--test-mode":
        if (next && !next.startsWith("--")) {
          flags.testMode = next;
          i++;
        } else {
          flags.testMode = "true";
        }
        break;
      case "--self-updating":
        if (next && !next.startsWith("--")) {
          flags.selfUpdating = next;
          i++;
        } else {
          flags.selfUpdating = "true";
        }
        break;
      case "--evaluation-interval": flags.evaluationInterval = next; i++; break;
      case "--overwrite": flags.overwrite = true; break;
      case "--merge": flags.merge = true; break;
    }
  }
  return flags;
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue;
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;
  throw new Error(`Invalid boolean value "${value}". Expected true/false.`);
}

function parsePositiveNumber(name: string, value: string | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${name}: "${value}". Expected a positive number.`);
  }
  return parsed;
}

function parsePositiveInt(name: string, value: string | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${name}: "${value}". Expected a positive integer.`);
  }
  return parsed;
}

function parseWallet(wallet: string | undefined): WalletType {
  const candidate = wallet ?? "cdp-server-wallet";
  if (
    candidate === "cdp-server-wallet" ||
    candidate === "bankr" ||
    candidate === "sponge"
  ) {
    return candidate;
  }
  throw new Error(`Invalid wallet "${candidate}". Allowed: cdp-server-wallet, bankr, sponge.`);
}

function parseLlm(llm: string | undefined): LlmProvider {
  const candidate = llm ?? "claude";
  if (
    candidate === "claude" ||
    candidate === "openai" ||
    candidate === "gemini" ||
    candidate === "venice"
  ) {
    return candidate;
  }
  throw new Error(`Invalid llm "${candidate}". Allowed: claude, openai, gemini, venice.`);
}

function parseTools(toolsValue: string | undefined): ToolId[] {
  const raw = (toolsValue ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const unique = [...new Set(raw)];
  const invalid = unique.filter((s) => !ALL_TOOLS.includes(s as ToolId));
  if (invalid.length > 0) {
    throw new Error(
      `Invalid tools: ${invalid.join(", ")}. Allowed: ${ALL_TOOLS.join(", ")}.`
    );
  }
  return unique as ToolId[];
}

function filterTools(tools: ToolId[], wallet: WalletType): ToolId[] {
  if (wallet === "bankr" || wallet === "sponge") {
    const walletName = wallet === "bankr" ? "Bankr" : "Sponge";
    const unsupportedTools = tools.filter((t) => !UNIVERSAL_TOOLS.includes(t));
    if (unsupportedTools.length > 0) {
      console.warn(
        `Warning: Only non-CDP external tools [${UNIVERSAL_TOOLS.join(", ")}] are supported with ${walletName}. Execution tools and built-in x402 tools require the CDP wallet scaffold and will be ignored: [${unsupportedTools.join(", ")}].`
      );
    }
    return tools.filter((t) => UNIVERSAL_TOOLS.includes(t));
  }
  return tools;
}

async function buildConfigFromFlags(flags: HeadlessFlags): Promise<ScaffoldConfig> {
  const name = flags.name ?? "my-trading-agent";
  const chainId = "8453";
  const rpcUrl = "https://mainnet.base.org";
  const wallet = parseWallet(flags.wallet);
  const rawTools = parseTools(flags.tools);
  const tools = filterTools(rawTools, wallet);
  const llm = parseLlm(flags.llm);
  const model = flags.model ?? "claude-sonnet-4-6";
  const llmApiKey = process.env[ENV_KEY_MAP[llm]]?.trim() ?? "";
  const strategy = flags.strategy ?? "Default momentum strategy";
  const output = path.resolve(flags.output ?? `./${name}`);
  const testMode = parseBoolean(flags.testMode ?? process.env.TEST_MODE, false);
  const selfUpdating = parseBoolean(flags.selfUpdating, false);
  const evaluationInterval = parsePositiveNumber(
    "evaluation interval minutes",
    flags.evaluationInterval,
    testMode ? 15 : 30
  );

  const guardrails: GuardrailConfig = {
    slippagePct: parsePositiveNumber("slippage pct", flags.slippagePct, 0.5),
    stopLossPct: parsePositiveNumber("stop loss pct", flags.stopLossPct, 8),
    maxPositionPct: parsePositiveNumber("max position pct", flags.maxPositionPct, 10),
  };

  // Headless critique — uses API key from env vars
  let critiqueResult: { critique: string; refined: string };
  try {
    critiqueResult = await callLlm(llm, model, strategy, guardrails);
  } catch {
    critiqueResult = fallbackCritique(strategy, guardrails);
  }

  return {
    name,
    wallet,
    tools,
    customTools: [],
    llm,
    model,
    llmApiKey,
    strategy,
    refinedStrategy: critiqueResult.refined,
    critique: critiqueResult.critique,
    guardrails,
    testMode,
    selfUpdating,
    evaluationInterval,
    output,
    chainId,
    rpcUrl,
  };
}

function buildConfigFromJson(json: ConfigJson): Promise<ScaffoldConfig> {
  const flags: HeadlessFlags = {
    name: json.name,
    wallet: json.wallet,
    tools: json.tools.join(","),
    llm: json.llm,
    model: json.model,
    strategy: json.strategy,
    output: json.output,
    slippagePct: json.guardrails?.slippagePct?.toString(),
    stopLossPct: json.guardrails?.stopLossPct?.toString(),
    maxPositionPct: json.guardrails?.maxPositionPct?.toString(),
    testMode: json.testMode?.toString(),
    selfUpdating: json.selfUpdating?.toString(),
    evaluationInterval: json.evaluationInterval?.toString(),
  };
  return buildConfigFromFlags(flags);
}

function prepareOutputDirectory(output: string, flags: HeadlessFlags): void {
  if (flags.overwrite && flags.merge) {
    throw new Error("Use either --overwrite or --merge, not both.");
  }
  if (!fs.existsSync(output)) return;
  if (flags.overwrite) {
    fs.rmSync(output, { recursive: true, force: true });
    return;
  }
  if (flags.merge) return;
  throw new Error(
    `Output directory already exists: ${output}. Pass --overwrite to replace it or --merge to keep existing files.`
  );
}

export async function runHeadless(argv: string[]): Promise<void> {
  const flags = parseArgs(argv);

  if (flags.config) {
    // JSON config mode — can be an array for multi-agent
    const raw = fs.readFileSync(path.resolve(flags.config), "utf-8");
    const parsed = JSON.parse(raw);
    const configs: ConfigJson[] = Array.isArray(parsed) ? parsed : [parsed];

    for (const jsonConfig of configs) {
      const config = await buildConfigFromJson(jsonConfig);
      prepareOutputDirectory(config.output, flags);
      const outDir = generate(config);
      console.log(outDir);
    }
  } else {
    // Flags mode
    const config = await buildConfigFromFlags(flags);
    prepareOutputDirectory(config.output, flags);
    const outDir = generate(config);
    console.log(outDir);
  }
}
