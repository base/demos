# create-trading-agent

A CLI that scaffolds a fully configured LangChain trading agent on Base from a plain-English strategy.

## Quick Start

You can use the scaffold in two ways without publishing it to npm.

### Option 1: Run the installer script directly

This is the shortest path for end users:

```bash
curl -fsSL https://raw.githubusercontent.com/base/demos/main/agents/trading-agent/install.sh | bash
```

Pass CLI arguments through with `bash -s --`:

```bash
curl -fsSL https://raw.githubusercontent.com/base/demos/main/agents/trading-agent/install.sh | \
  bash -s -- --no-interactive --config ./agent.json
```

The script:

- clones the repo into a temporary directory
- enters `agents/trading-agent`
- installs dependencies
- builds the CLI
- runs the scaffold with any arguments you passed in

### Option 2: Clone the repo and run only this package

If you want the files locally, clone the repo and use the package directly:

```bash
git clone https://github.com/base/demos.git
cd demos/agents/trading-agent
npm install
npm run build
node dist/index.js
```

If you want to fetch mostly just this folder, use sparse checkout:

```bash
git clone --filter=blob:none --no-checkout https://github.com/base/demos.git
cd demos
git sparse-checkout init --cone
git sparse-checkout set agents/trading-agent
git checkout main
cd agents/trading-agent
npm install
npm run build
node dist/index.js
```

## Interactive Usage

```bash
node dist/index.js
```

During development, you can also run:

```bash
npm run dev
```

## Headless Usage

### Flags

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

### JSON Config

```bash
node dist/index.js --config path/to/config.json
```

The config can be either a single object or an array to scaffold multiple agents at once.

## Config JSON Schema

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

## Wallet Options

| Wallet | Description | Tool restriction |
| -------- | ------------- | ----------------- |
| `cdp-server-wallet` | CDP Server Wallet for programmable wallet execution | All tools available |
| `bankr` | Chat-based DeFi execution | MCP tools only (`agentcash-mcp`, `nansen-mcp`) |
| `sponge` | Managed wallet with native swaps, bridging, Polymarket, Hyperliquid, and x402 | MCP tools only (`agentcash-mcp`, `nansen-mcp`) |

## Available Tools

| Tool | Type | Description |
| ------- | ------ | ------------- |
| `uniswap` | DEX | Uniswap V3/V4 swaps on Base |
| `aerodrome` | DEX | Aerodrome swaps on Base |
| `avantis` | Perps | Avantis perpetuals on Base, CDP Server Wallet only |
| `alchemy-x402` | Data | Alchemy blockchain data via x402 pay-per-request |
| `coingecko` | Data | CoinGecko price data via x402 pay-per-request |
| `coinmarketcap` | Data | CoinMarketCap market data via x402 pay-per-request |
| `agentcash-mcp` | Data | Generic paid API access via AgentCash MCP |
| `nansen-mcp` | Data | Nansen blockchain analytics via MCP server |
| `nansen-x402` | Data | Nansen blockchain analytics via x402 pay-per-request |

## Notes

- `install.sh` defaults to cloning `main` and falls back to `master` if needed.
- The generated project path is printed to stdout after scaffolding completes.
- For `cdp-server-wallet`, wallet creation or lookup happens on first agent run and the wallet address is printed for funding.
- For `bankr` and `sponge`, built-in tool selection is limited to MCP tools. Execution is handled natively by those wallets, and the built-in x402 tool modules currently rely on the CDP wallet scaffold.
- `nansen-mcp` requires `NANSEN_API_KEY`.
- `nansen-x402` uses pay-per-request x402 calls.
