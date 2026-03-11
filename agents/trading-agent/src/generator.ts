import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";
import type { ScaffoldConfig, ToolId, CustomToolDef } from "./types.js";
import { DATA_TOOLS, X402_DATA_TOOLS, MCP_TOOLS } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let helpersRegistered = false;

function resolveTemplatesDir(): string {
  // In dev (tsx): src/../templates
  // In built (dist): dist/../templates
  const candidates = [
    path.resolve(__dirname, "..", "templates"),
    path.resolve(__dirname, "templates"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  throw new Error("Could not locate templates directory.");
}

function renderTemplate(templatePath: string, data: Record<string, unknown>): string {
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(source, { noEscape: true });
  return template(data);
}

function writeFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

function registerHelpersOnce(): void {
  if (helpersRegistered) return;

  Handlebars.registerHelper("eq", (a, b) => a === b);
  Handlebars.registerHelper("or", (...args) => args.slice(0, -1).some(Boolean));
  Handlebars.registerHelper(
    "includes",
    (arr: string[], val: string) => Array.isArray(arr) && arr.includes(val)
  );

  helpersRegistered = true;
}

function toFunctionName(name: string): string {
  // kebab-case → PascalCase: "my-tool" → "MyTool"
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function buildCustomToolImports(customTools: CustomToolDef[]): string {
  if (customTools.length === 0) return "";
  const lines: string[] = [];
  for (const tool of customTools) {
    const pascal = toFunctionName(tool.name);
    const subfolder = tool.type === "protocol" ? "protocols/" : tool.type === "x402" ? "x402/" : "";
    lines.push(`import { get${pascal}Tools } from "./${subfolder}${tool.name}.js";`);
  }
  return lines.join("\n");
}

function buildCustomToolPushes(customTools: CustomToolDef[]): string {
  if (customTools.length === 0) return "";
  const lines: string[] = [];
  for (const tool of customTools) {
    const pascal = toFunctionName(tool.name);
    lines.push(`  tools.push(...get${pascal}Tools());`);
  }
  return lines.join("\n");
}

export function generate(config: ScaffoldConfig): string {
  registerHelpersOnce();
  const templatesDir = resolveTemplatesDir();
  const outDir = path.resolve(config.output);

  // Template data
  const data: Record<string, unknown> = {
    name: config.name,
    wallet: config.wallet,
    tools: config.tools,
    selectedToolNames: [...config.tools, ...config.customTools.map((tool) => tool.name)],
    llm: config.llm,
    model: config.model,
    llmApiKey: config.llmApiKey,
    strategy: config.strategy,
    refinedStrategy: config.refinedStrategy,
    critique: config.critique,
    guardrails: config.guardrails,
    testMode: config.testMode,
    chainId: config.chainId,
    rpcUrl: config.rpcUrl,
    // Booleans for template conditionals
    isCdpServerWallet: config.wallet === "cdp-server-wallet",
    isBankr: config.wallet === "bankr",
    isSponge: config.wallet === "sponge",
    isClaude: config.llm === "claude",
    isOpenai: config.llm === "openai",
    isGemini: config.llm === "gemini",
    isVenice: config.llm === "venice",
    hasUniswap: config.tools.includes("uniswap"),
    hasAerodrome: config.tools.includes("aerodrome"),
    hasAvantis: config.tools.includes("avantis"),
    hasVirtuals: config.tools.includes("virtuals"),
    hasCoingecko: config.tools.includes("coingecko"),
    hasCoinmarketcap: config.tools.includes("coinmarketcap"),
    hasAlchemyX402: config.tools.includes("alchemy-x402"),
    hasAgentcashMcp: config.tools.includes("agentcash-mcp"),
    hasNansenMcp: config.tools.includes("nansen-mcp"),
    hasNansenX402: config.tools.includes("nansen-x402"),
    hasAnyMcp:
      config.tools.some((s) => MCP_TOOLS.includes(s)),
    hasAnyTools: config.tools.length > 0 || config.customTools.length > 0,
    hasAnyX402:
      config.tools.some((s) => X402_DATA_TOOLS.includes(s)) ||
      config.customTools.some((t) => t.type === "x402"),
    selfUpdating: config.selfUpdating,
    evaluationInterval: config.evaluationInterval,
    isSelfUpdating: config.selfUpdating === true,
    defaultAgentIntervalSeconds: config.testMode ? 30 : 60,
    defaultSlippagePct: config.testMode
      ? Math.max(config.guardrails.slippagePct, 1)
      : config.guardrails.slippagePct,
    defaultStopLossPct: config.testMode
      ? Math.max(config.guardrails.stopLossPct, 12)
      : config.guardrails.stopLossPct,
    defaultMaxPositionPct: config.testMode
      ? Math.max(config.guardrails.maxPositionPct, 20)
      : config.guardrails.maxPositionPct,
    // Custom tool template data
    customToolImports: buildCustomToolImports(config.customTools),
    customToolPushes: buildCustomToolPushes(config.customTools),
  };

  // 1. Base files
  const baseFiles: [string, string][] = [
    ["base/agent.ts.hbs", "src/agent.ts"],
    ["base/guardrails.ts.hbs", "src/guardrails.ts"],
    ["base/tool-result.ts.hbs", "src/tool-result.ts"],
    ["base/package.json.hbs", "package.json"],
    ["base/tsconfig.json.hbs", "tsconfig.json"],
    ["base/README.md.hbs", "README.md"],
    ["base/prompts/strategy.md.hbs", "prompts/strategy.md"],
    ["base/scripts/patch-mcp-adapters.mjs.hbs", "scripts/patch-mcp-adapters.mjs"],
  ];

  for (const [tpl, out] of baseFiles) {
    const content = renderTemplate(path.join(templatesDir, tpl), data);
    writeFile(path.join(outDir, out), content);
  }

  // Render env files from the same template:
  // - .env.example always blank for secrets
  // - .env prefilled with the LLM key collected at scaffold time
  const envTemplatePath = path.join(templatesDir, "base/.env.example.hbs");
  const envExample = renderTemplate(envTemplatePath, { ...data, llmApiKey: "" });
  writeFile(path.join(outDir, ".env.example"), envExample);
  const envFile = renderTemplate(envTemplatePath, data);
  writeFile(path.join(outDir, ".env"), envFile);

  // 2. Wallet adapter (only the selected one)
  const walletTemplate = path.join(templatesDir, `wallet/${config.wallet}.ts.hbs`);
  const walletContent = renderTemplate(walletTemplate, data);
  writeFile(path.join(outDir, "src/wallet.ts"), walletContent);

  // 3. Tools (only the selected ones)
  const hasBuiltinTools = config.tools.length > 0;
  const hasCustomTools = config.customTools.length > 0;

  if (hasBuiltinTools || hasCustomTools) {
    const hasX402Tools =
      config.tools.some((s) => X402_DATA_TOOLS.includes(s)) ||
      config.customTools.some((tool) => tool.type === "x402");

    for (const tool of config.tools) {
      const isMcp = MCP_TOOLS.includes(tool);
      const isX402 = X402_DATA_TOOLS.includes(tool);
      const subfolder = isMcp ? "mcp" : isX402 ? "x402" : "protocols";
      const toolTemplate = path.join(templatesDir, `tools/${subfolder}/${tool}.ts.hbs`);
      const toolContent = renderTemplate(toolTemplate, data);
      writeFile(path.join(outDir, `src/tools/${subfolder}/${tool}.ts`), toolContent);
    }

    // x402 shared client (if any x402 tools selected)
    if (hasX402Tools) {
      const clientTemplate = path.join(templatesDir, "tools/x402/client.ts.hbs");
      const clientContent = renderTemplate(clientTemplate, data);
      writeFile(path.join(outDir, "src/tools/x402/client.ts"), clientContent);
    }

    // Custom tools
    for (const customTool of config.customTools) {
      const subfolder =
        customTool.type === "protocol" ? "protocols" :
        customTool.type === "x402" ? "x402" : "";
      const outPath = subfolder
        ? `src/tools/${subfolder}/${customTool.name}.ts`
        : `src/tools/${customTool.name}.ts`;
      writeFile(path.join(outDir, outPath), customTool.code);
    }

    // Tools index
    const toolsIndexTemplate = path.join(templatesDir, "tools/index.ts.hbs");
    const toolsIndexContent = renderTemplate(toolsIndexTemplate, data);
    writeFile(path.join(outDir, "src/tools/index.ts"), toolsIndexContent);
  }

  // 4. TOOLS.md for the generated project
  const toolsMdTemplate = path.join(templatesDir, "base/TOOLS.md.hbs");
  const toolsMdContent = renderTemplate(toolsMdTemplate, data);
  writeFile(path.join(outDir, "TOOLS.md"), toolsMdContent);

  // 5. Strategy history file (for self-updating agents)
  if (config.selfUpdating) {
    writeFile(path.join(outDir, "strategy-history.json"), "[]");
  }

  return outDir;
}
