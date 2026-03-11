import * as p from "@clack/prompts";
import type { ToolId, WalletType } from "../types.js";
import { UNIVERSAL_TOOLS } from "../types.js";
import { BACK, type Backable } from "./navigation.js";

interface ToolOption {
  value: ToolId | "__none__" | typeof BACK;
  label: string;
  hint?: string;
}

const ALL_TOOL_OPTIONS: ToolOption[] = [
  { value: "__none__", label: "None — skip tool selection", hint: "no tool modules" },
  { value: "uniswap", label: "Uniswap v3/v4", hint: "DEX · no API key" },
  { value: "aerodrome", label: "Aerodrome", hint: "DEX · no API key" },
  { value: "avantis", label: "Avantis", hint: "Perps · no API key · CDP only" },
  { value: "virtuals", label: "Virtuals ACP", hint: "Agent delegation via ACP CLI" },
  { value: "coingecko", label: "CoinGecko (x402)", hint: "Data · pays per request via x402" },
  { value: "coinmarketcap", label: "CoinMarketCap (x402)", hint: "Data · pays per request via x402" },
  {
    value: "alchemy-x402",
    label: "Alchemy (x402)",
    hint: "Data · blockchain data via Alchemy, pays per request via x402",
  },
  {
    value: "agentcash-mcp",
    label: "AgentCash MCP",
    hint: "Data · generic x402/SIWX paid API access via AgentCash MCP",
  },
  { value: "nansen-mcp", label: "Nansen MCP", hint: "Data · blockchain analytics via MCP · requires NANSEN_API_KEY" },
  { value: "nansen-x402", label: "Nansen (x402)", hint: "Data · blockchain analytics · pays per request via x402" },
  { value: BACK, label: "← Go back", hint: "return to previous step" },
];

const DATA_ONLY_OPTIONS: ToolOption[] = ALL_TOOL_OPTIONS.filter(
  (opt) =>
    opt.value === "__none__" ||
    opt.value === BACK ||
    (typeof opt.value === "string" && UNIVERSAL_TOOLS.includes(opt.value as ToolId))
);

export async function promptTools(wallet: WalletType): Promise<Backable<ToolId[]>> {
  const isDataOnly = wallet === "bankr" || wallet === "sponge";

  if (isDataOnly) {
    const walletName = wallet === "bankr" ? "Bankr" : "Sponge";
    console.log(
      `\n${walletName} handles execution natively. Only non-CDP external tools can be added here right now: Virtuals ACP, AgentCash MCP, and Nansen MCP.\n`
    );
  }

  const options = isDataOnly ? DATA_ONLY_OPTIONS : ALL_TOOL_OPTIONS;

  const tools = await p.multiselect({
    message: "Select tools to include (space to select, enter to confirm):",
    options,
    required: false,
  });

  if (p.isCancel(tools)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const selected = tools as Array<ToolId | "__none__" | typeof BACK>;
  if (selected.includes(BACK)) return BACK;
  if (selected.includes("__none__")) return [];
  return selected as ToolId[];
}
