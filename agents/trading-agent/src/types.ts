export type WalletType = "cdp-server-wallet" | "bankr" | "sponge";
export type LlmProvider = "claude" | "openai" | "gemini" | "venice";

export type ToolId =
  | "uniswap"
  | "aerodrome"
  | "avantis"
  | "virtuals"
  | "coingecko"
  | "coinmarketcap"
  | "alchemy-x402"
  | "agentcash-mcp"
  | "nansen-mcp"
  | "nansen-x402";

export const DATA_TOOLS: ToolId[] = ["coingecko", "coinmarketcap", "alchemy-x402", "agentcash-mcp", "nansen-mcp", "nansen-x402", "virtuals"];
export const X402_DATA_TOOLS: ToolId[] = ["coingecko", "coinmarketcap", "alchemy-x402", "nansen-x402"];
export const MCP_TOOLS: ToolId[] = ["agentcash-mcp", "nansen-mcp"];
export const UNIVERSAL_TOOLS: ToolId[] = ["virtuals", ...MCP_TOOLS];
export const DEX_TOOLS: ToolId[] = ["uniswap", "aerodrome", "avantis"];
export const ALL_TOOLS: ToolId[] = [...DEX_TOOLS, ...DATA_TOOLS];

export const MODELS: Record<LlmProvider, { value: string; label: string }[]> = {
  claude: [
    { value: "claude-sonnet-4-6", label: "claude-sonnet-4-6 (recommended)" },
    { value: "claude-opus-4-6", label: "claude-opus-4-6" },
    { value: "claude-haiku-4-5-20251001", label: "claude-haiku-4-5-20251001" },
  ],
  openai: [
    { value: "gpt-4o", label: "gpt-4o (recommended)" },
    { value: "gpt-4o-mini", label: "gpt-4o-mini" },
  ],
  gemini: [
    { value: "gemini-2.0-flash", label: "gemini-2.0-flash (recommended)" },
    { value: "gemini-1.5-pro", label: "gemini-1.5-pro" },
  ],
  venice: [
    { value: "venice-uncensored", label: "venice-uncensored (recommended)" },
    { value: "zai-org-glm-4.7", label: "zai-org-glm-4.7" },
    { value: "qwen3-next-80b", label: "qwen3-next-80b" },
  ],
};

export interface GuardrailConfig {
  slippagePct: number;
  stopLossPct: number;
  maxPositionPct: number;
}

export interface CustomToolDef {
  name: string;
  type: "protocol" | "x402" | "unknown";
  code: string;
}

export interface ScaffoldConfig {
  name: string;
  wallet: WalletType;
  tools: ToolId[];
  customTools: CustomToolDef[];
  llm: LlmProvider;
  model: string;
  llmApiKey: string;
  strategy: string;
  refinedStrategy: string;
  critique: string;
  guardrails: GuardrailConfig;
  testMode: boolean;
  selfUpdating: boolean;
  evaluationInterval: number;
  output: string;
  chainId: string;
  rpcUrl: string;
}
