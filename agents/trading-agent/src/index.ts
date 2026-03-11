import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import { promptProject } from "./prompts/project.js";
import { promptWallet } from "./prompts/wallet.js";
import { promptTools } from "./prompts/tools.js";
import { ENV_KEY_MAP, promptLlm } from "./prompts/llm.js";
import { promptStrategy } from "./prompts/strategy.js";
import { promptCritique } from "./prompts/critique.js";
import { promptSelfUpdate } from "./prompts/self-update.js";
import { promptCustomTools } from "./prompts/custom-tool.js";
import { promptTestMode } from "./prompts/test-mode.js";
import { BACK, isBack } from "./prompts/navigation.js";
import { generate } from "./generator.js";
import { runHeadless } from "./headless.js";
import type { ScaffoldConfig, CustomToolDef, GuardrailConfig, LlmProvider, ToolId, WalletType } from "./types.js";

const BANNER = String.raw`
  ╔═══════════════════════════════════════════════════════════════════╗
  ║                                                                   ║
  ║     ___                    __          ______               __    ║
  ║    /   | ____ ____  ____  / /______   /_  __/________ _____/ /__  ║
  ║   / /| |/ __ \`/ _ \/ __ \/ __/ ___/   / / / ___/ __ \`/ __  / _ \║
  ║  / ___ / /_/ /  __/ / / / /_(__  )    / / / /  / /_/ / /_/ /  __/ ║
  ║ /_/  |_\__, /\___/_/ /_/\__/____/    /_/ /_/   \__,_/\__,_/\___/  ║
  ║                                                                   ║
  ║        ────────────────────────────────────────────               ║
  ║                           on Base                                 ║
  ║        ────────────────────────────────────────────               ║
  ║                                                                   ║
  ╚═══════════════════════════════════════════════════════════════════╝
`;

function isHeadless(argv: string[]): boolean {
  return argv.includes("--no-interactive") || argv.includes("--config");
}

const BASE_MAINNET = { chainId: "8453", rpcUrl: "https://mainnet.base.org" };

async function runInteractive(): Promise<void> {
  p.intro(
    `${BANNER}\nA CLI that generates a fully configured trading agent from a plain-English strategy`
  );

  const state: Partial<ScaffoldConfig> & {
    name?: string;
    wallet?: WalletType;
    tools?: ToolId[];
    llm?: LlmProvider;
    model?: string;
    llmApiKey?: string;
    strategy?: string;
    refinedStrategy?: string;
    critique?: string;
    guardrails?: GuardrailConfig;
    testMode?: boolean;
    configureAdvanced?: boolean;
    selfUpdating?: boolean;
    evaluationInterval?: number;
    customTools?: CustomToolDef[];
    output?: string;
  } = {
    tools: [],
    customTools: [],
    selfUpdating: false,
    evaluationInterval: 30,
    testMode: false,
  };

  const steps = [
    "project",
    "wallet",
    "tools",
    "llm",
    "testMode",
    "selfUpdate",
    "strategy",
    "critique",
    "advanced",
    "customTools",
    "output",
  ] as const;

  let stepIndex = 0;
  while (stepIndex < steps.length) {
    const step = steps[stepIndex];

    if (step === "project") {
      const result = await promptProject();
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.name = result;
      stepIndex++;
      continue;
    }

    if (step === "wallet") {
      const result = await promptWallet();
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.wallet = result;
      stepIndex++;
      continue;
    }

    if (step === "tools") {
      const result = await promptTools(state.wallet!);
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.tools = result;
      stepIndex++;
      continue;
    }

    if (step === "llm") {
      const result = await promptLlm();
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.llm = result.provider;
      state.model = result.model;
      state.llmApiKey = process.env[ENV_KEY_MAP[result.provider]]?.trim() ?? "";
      stepIndex++;
      continue;
    }

    if (step === "testMode") {
      const result = await promptTestMode();
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.testMode = result;
      state.evaluationInterval = result ? 15 : 30;
      stepIndex++;
      continue;
    }

    if (step === "selfUpdate") {
      const result = await promptSelfUpdate();
      if (result === BACK) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.selfUpdating = result.enabled;
      state.evaluationInterval = result.evaluationInterval;
      stepIndex++;
      continue;
    }

    if (step === "strategy") {
      const result = await promptStrategy();
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.strategy = result;
      stepIndex++;
      continue;
    }

    if (step === "critique") {
      const result = await promptCritique(state.strategy!, state.llm!, state.model!);
      if (isBack(result)) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }
      state.critique = result.critique;
      state.refinedStrategy = result.refined;
      state.guardrails = result.guardrails;
      stepIndex++;
      continue;
    }

    if (step === "advanced") {
      const configureAdvanced = await p.select({
        message: "Configure experimental custom tools?",
        options: [
          {
            value: "false",
            label: "No",
            hint: "continue without generated custom tools",
          },
          {
            value: "true",
            label: "Yes",
            hint: "LLM-generated tool modules from docs/skill context",
          },
          { value: BACK, label: "← Go back" },
        ],
      });

      if (p.isCancel(configureAdvanced)) {
        p.cancel("Cancelled.");
        process.exit(0);
      }

      if (configureAdvanced === BACK) {
        stepIndex = Math.max(0, stepIndex - 1);
        continue;
      }

      if (configureAdvanced !== "true") {
        state.configureAdvanced = false;
        state.customTools = [];
        stepIndex = steps.indexOf("output");
        continue;
      }

      state.configureAdvanced = true;
      stepIndex++;
      continue;
    }

    if (step === "customTools") {
      if (!state.configureAdvanced) {
        stepIndex++;
        continue;
      }
      state.customTools = await promptCustomTools(state.llm!, state.model!, state.wallet!);
      stepIndex++;
      continue;
    }

    if (step === "output") {
      const output = await p.text({
        message: "Output directory: (type 'back' to go to previous step)",
        placeholder: `./${state.name}`,
        initialValue: `./${state.name}`,
        validate: (value) => {
          if (value.trim().toLowerCase() === "back") return;
          if (!value.trim()) return "Output directory is required.";
        },
      });

      if (p.isCancel(output)) {
        p.cancel("Cancelled.");
        process.exit(0);
      }

      if (output.trim().toLowerCase() === "back") {
        stepIndex = state.configureAdvanced
          ? Math.max(0, stepIndex - 1)
          : steps.indexOf("advanced");
        continue;
      }

      state.output = path.resolve(output.trim());
      stepIndex++;
    }
  }

  const resolvedOutput = state.output!;

  if (fs.existsSync(resolvedOutput)) {
    const action = await p.select({
      message: `Directory ${resolvedOutput} already exists.`,
      options: [
        { value: "cancel", label: "Cancel" },
        { value: "overwrite", label: "Overwrite" },
        { value: "merge", label: "Merge (keep existing files)" },
      ],
    });

    if (p.isCancel(action) || action === "cancel") {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    if (action === "overwrite") {
      fs.rmSync(resolvedOutput, { recursive: true, force: true });
    }
    // merge: generator will just write over / add files
  }

  const config: ScaffoldConfig = {
    name: state.name!,
    wallet: state.wallet!,
    tools: state.tools ?? [],
    customTools: state.customTools ?? [],
    llm: state.llm!,
    model: state.model!,
    llmApiKey: state.llmApiKey ?? "",
    strategy: state.strategy!,
    refinedStrategy: state.refinedStrategy!,
    critique: state.critique!,
    guardrails: state.guardrails!,
    testMode: state.testMode ?? false,
    selfUpdating: state.selfUpdating ?? false,
    evaluationInterval: state.evaluationInterval ?? (state.testMode ? 15 : 30),
    output: resolvedOutput,
    chainId: BASE_MAINNET.chainId,
    rpcUrl: BASE_MAINNET.rpcUrl,
  };

  const s = p.spinner();
  s.start("Generating project...");
  const outDir = generate(config);
  s.stop("Project generated.");
  const displayDir = path.relative(process.cwd(), outDir) || ".";

  console.log(
    `\nNext steps\ncd ${displayDir}\nnpm install\n# Review .env (LLM key is prefilled, add wallet keys)\nnpm start\n`
  );

  if (config.wallet === "cdp-server-wallet") {
    console.log(
      "\nFunding reminder\nOn first run, the agent will create or fetch your CDP server wallet, print its address, and warn if Base ETH or USDC funding is missing.\n"
    );
  } else if (config.wallet === "bankr") {
    console.log(
      "\nFunding reminder\nOn first run, the agent will query Bankr balances and warn if no funded balance is detected.\n"
    );
  } else if (config.wallet === "sponge") {
    console.log(
      "\nFunding reminder\nOn first run, the agent will check Sponge balances and warn if no funded balance is detected. Make sure SPONGE_API_KEY is set in your .env file.\n"
    );
  }

  p.outro(`Agent scaffolded at ${outDir}`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);

  if (isHeadless(argv)) {
    await runHeadless(argv);
  } else {
    await runInteractive();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
