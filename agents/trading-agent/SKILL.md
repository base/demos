---
name: create-trading-agent
description: Scaffold a complete LangChain trading agent on Base. Supports CDP Server Wallet, Bankr, and Sponge. Protocol tools: Uniswap, Aerodrome, and Avantis. Data tools: CoinGecko x402, CoinMarketCap x402, Alchemy x402, AgentCash MCP, Nansen MCP, and Nansen x402.
---

# create-trading-agent

## What this does

Generates a ready-to-run TypeScript LangChain agent project. The agent runs a continuous trading loop on Base using the strategy you provide.

## Using the scaffold without npm publish

You can use this scaffold in two supported ways without publishing it to npm.

### Option 1: Run the install script directly

```bash
curl -fsSL https://raw.githubusercontent.com/base/demos/master/agents/trading-agent/install.sh | bash
```

Pass CLI args through with `bash -s --`:

```bash
curl -fsSL https://raw.githubusercontent.com/base/demos/master/agents/trading-agent/install.sh | \
  bash -s -- --no-interactive --config path/to/config.json
```

### Option 2: Clone the repo and run this package locally

```bash
git clone https://github.com/base/demos.git
cd demos/agents/trading-agent
npm install
npm run build
node dist/index.js
```

If you want to fetch mostly just this folder:

```bash
git clone --filter=blob:none --no-checkout https://github.com/base/demos.git
cd demos
git sparse-checkout init --cone
git sparse-checkout set agents/trading-agent
git checkout master
cd agents/trading-agent
npm install
npm run build
node dist/index.js
```

## Interactive usage

```bash
node dist/index.js
```

Walks through a prompt-driven onboarding flow: project name, wallet, skills, LLM, test mode, optional self-updating strategy, strategy, critique (with LLM-generated guardrails), and optional experimental custom tool generation.

## Headless invocation

### Simple (flags)

```bash
node dist/index.js --no-interactive \
  --name <project-name> \
  --wallet <cdp-server-wallet|bankr|sponge> \
  --tools <comma-separated: uniswap,aerodrome,avantis,coingecko,coinmarketcap,alchemy-x402,agentcash-mcp,nansen-mcp,nansen-x402> \
  --llm <claude|openai|gemini|venice> \
  --model <model-name> \
  --strategy "<strategy in plain English>" \
  --output <path>
```

### Complex (JSON config)

```bash
node dist/index.js --config path/to/config.json
```

## Config JSON schema

```json
{
  "name": "string",
  "wallet": "cdp-server-wallet | bankr | sponge",
  "tools": ["avantis", "coingecko", "nansen-mcp"],
  "llm": "claude | openai | gemini | venice",
  "model": "string",
  "strategy": "string",
  "output": "string",
  "guardrails": {
    "slippagePct": 0.5,
    "stopLossPct": 8,
    "maxPositionPct": 10
  }
}
```

The config can be an array to scaffold multiple agents at once.

## Wallet options

| Wallet | Description | Tool restriction |
| -------- | ------------- | ----------------- |
| `cdp-server-wallet` | CDP Server Wallet (programmable wallet + arbitrary protocol transactions) | All tools available |
| `bankr` | Chat-based DeFi execution | MCP tools only (`agentcash-mcp`, `nansen-mcp`) |
| `sponge` | Managed wallet with native swaps, bridging, Polymarket, Hyperliquid, and x402 | MCP tools only (`agentcash-mcp`, `nansen-mcp`) |

## Available skills

| Skill | Type | Description |
| ------- | ------ | ------------- |
| `uniswap` | DEX | Uniswap V3/V4 swaps on Base |
| `aerodrome` | DEX | Aerodrome swaps on Base |
| `avantis` | Perps | Avantis perpetuals on Base, CDP Server Wallet only |
| `alchemy-x402` | Data | Alchemy blockchain data via x402 pay-per-request |
| `coingecko` | Data | CoinGecko price data (x402 pay-per-request) |
| `coinmarketcap` | Data | CoinMarketCap market data (x402 pay-per-request) |
| `agentcash-mcp` | Data | Generic paid API access via AgentCash MCP |
| `nansen-mcp` | Data | Nansen blockchain analytics via MCP server (24 auto-discovered tools, requires NANSEN_API_KEY) |
| `nansen-x402` | Data | Nansen blockchain analytics via x402 pay-per-request (5 tools) |

## Output

Prints the absolute path of the generated project directory to stdout. The generated project contains a SKILL.md describing what the spawned agent can do.

## Notes

- `install.sh` clones `master` by default and falls back to `main` if needed.
- For `cdp-server-wallet`, wallet creation/get happens on first agent run, then wallet address is persisted and printed so the user can fund it.
- First-run funding checks:
  - `cdp-server-wallet`: checks Base ETH and USDC.
  - `bankr`: checks Bankr balances on Base.
  - `sponge`: checks Sponge portfolio balance.
- For `bankr` and `sponge`, built-in tool selection is limited to MCP tools (`agentcash-mcp`, `nansen-mcp`). Execution tools are handled natively by those wallets, and the built-in x402 tool modules currently rely on the CDP wallet scaffold.
- `nansen-mcp` uses `@langchain/mcp-adapters` to auto-discover ~24 tools from Nansen's MCP server via SSE. It requires `NANSEN_API_KEY` (not x402).
- `nansen-x402` uses the x402 pay-per-request protocol — each call costs $0.01–$0.05 USDC.
- Custom tool generation from docs/skill context is marked as experimental.
