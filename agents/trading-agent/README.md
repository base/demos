# Building a Trading Agent

A CLI that scaffolds a fully configured LangChain trading agent on Base from a plain-English strategy.

## Quick Start

Clone the repo and run this package locally:

```bash
git clone https://github.com/base/demos.git
cd demos/agents/trading-agent
npm i
npm run dev
```

`npm run dev` is the main local workflow. It runs the CLI straight from `src`, so it is the fastest loop while developing or refining the generator.

If you want to run the built artifact exactly as it will be published, use:

```bash
npm run build
node dist/index.js
```

## How It Works

The CLI does more than collect flags.

1. You describe the trading behavior in plain English.
2. You choose the execution layer, data/tool surface, and LLM stack.
3. The CLI critiques the strategy with the selected model, injects explicit guardrails, and lets you edit the refined result before generation.
4. It generates a runnable TypeScript project with wallet wiring, selected tools, prompt files, env scaffolding, and runtime defaults for the choices you made.

The generated project is meant to be edited. The scaffold gets you to a working baseline quickly; the real handoff points are the generated `README.md`, `.env`, `prompts/strategy.md`, `src/guardrails.ts`, `src/wallet.ts`, and `src/tools/*`.

## Interactive Onboarding

Interactive mode is the best default when you want to reason through the setup once:

```bash
npm run dev
```

The onboarding steps are intentionally opinionated:

| Step | What it means | What devs usually optimize for |
| --- | --- | --- |
| `Project name` | Names the generated project directory. | Use a strategy-specific name if you will compare multiple variants. |
| `Wallet provider` | Chooses how the agent actually executes trades. | Pick `cdp-server-wallet` for maximum control, `bankr` or `sponge` when you want managed execution. |
| `Tools` | Adds execution, data, or delegation modules to the generated agent. | Keep this minimal; each tool expands the agent's action surface and review burden. |
| `LLM provider + model` | Used to critique/refine the strategy during scaffold time and powers the generated agent runtime. | Choose the model you actually want to run in production, not just the cheapest setup prompt. |
| `Test mode` | Uses small live funds on Base mainnet with faster cadence and looser defaults for validation. | Enable it first when you want to verify wallet wiring and execution before running a stricter live strategy. |
| `Self-updating strategy` | Lets the generated agent periodically re-evaluate strategy instructions. | Use it when the strategy should adapt over time; disable it when you want deterministic prompts. |
| `Strategy` | Your plain-English trading thesis. | Be explicit about entry, exit, sizing, and risk conditions. |
| `Critique + refinement` | The CLI runs an LLM review, proposes a cleaner strategy, and derives initial guardrails. | Treat this as a fast design review, then edit the refined strategy if the model overgeneralizes. |
| `Experimental custom tools` | Generates additional tool modules from docs or pasted workflow/skill text. | Use only when the built-in tool set is missing a required integration. |
| `Output directory` | Controls where the scaffold lands and whether you overwrite or merge. | Keep separate directories for strategy variants; merge only if you know what you want to preserve. |

## Choosing the Main Options

### Wallets

| Wallet | Choose it when | Current tool constraints |
| --- | --- | --- |
| `cdp-server-wallet` | You want programmable wallet execution and the full built-in tool surface. | All built-in tools are available. |
| `bankr` | You want Bankr to handle execution natively. | Only `virtuals`, `agentcash-mcp`, and `nansen-mcp` are supported in this scaffold path. Built-in x402 and direct execution tools are filtered out. |
| `sponge` | You want a managed wallet with native swaps, bridging, Polymarket, Hyperliquid, and x402 access. | Same current tool restriction as `bankr`: `virtuals`, `agentcash-mcp`, and `nansen-mcp`. |

### Tools

Think of tools as capabilities you are granting the generated agent:

| Tool | Use it for | Notes |
| --- | --- | --- |
| `uniswap` | Spot swaps on Base via Uniswap v3/v4. | CDP only. |
| `aerodrome` | Spot swaps on Base via Aerodrome. | CDP only. |
| `avantis` | Perps on Base. | CDP only. |
| `virtuals` | ACP-based helper-agent delegation. | Useful when you want the trading agent to hire or coordinate other agents. |
| `coingecko` | Lightweight price/market data over x402. | Pay-per-request. |
| `coinmarketcap` | Market data over x402. | Pay-per-request. |
| `alchemy-x402` | Chain and asset data over x402. | Pay-per-request. |
| `agentcash-mcp` | Generic paid API access via MCP. | Works across wallet modes. |
| `nansen-mcp` | Rich analytics via Nansen's MCP server. | Requires `NANSEN_API_KEY`. |
| `nansen-x402` | Nansen analytics over x402. | Pay-per-request, CDP path only. |

Practical defaults:

- Start with one execution tool and one data tool unless you know you need more.
- Use `virtuals` only when delegation is part of the strategy, not as a generic default.
- Prefer `nansen-mcp` over `nansen-x402` when you already have a Nansen key and want richer analytics without per-call payment flow.

### Test Mode, Self-Updating, and Guardrails

These three choices control behavior more than most people expect:

- `test mode` is still live on Base mainnet. It is for low-stakes validation, not simulation.
- `self-updating` adds periodic strategy re-evaluation. That is useful for adaptive agents, but it makes behavior less static and harder to diff over time.
- `guardrails` are created during critique and can be edited later in `src/guardrails.ts`. The initial defaults are slippage, stop-loss, and max position size.
- `self-updating` does not rewrite the system prompt on its own by default: proposals go to `prompts/strategy.proposed.md` for review unless the operator sets `AUTO_APPLY_STRATEGY_UPDATES=true`.

#### What the generated guardrails enforce

`src/guardrails.ts` classifies every tool (default-deny). Built-in read-only tools, x402 paid-data tools (payments capped at the shared x402 client), and Nansen MCP analytics tools pass through unwrapped. Tools with a built-in policy are checked on every call. Every other tool, including MCP and custom tools, is blocked unless listed in `GUARDRAIL_ALLOW_TOOLS`. A blocked call returns a JSON error to the model and logs `[guardrail] Blocked ...`. The agent loop keeps running.

- Arbitrary-destination tools (`cdp_send_transaction`, `cdp_contract_write`, `cdp_transfer`, `sponge_transfer_evm`, `virtuals_create_job`, Sponge plan transfer steps, outbound `bankr_execute` prompts) are blocked unless the destination is in `ALLOWED_ADDRESSES` (comma-separated, case-insensitive, empty by default).
- Raw calls (`cdp_send_transaction`, `cdp_contract_write`) must carry calldata that decodes to an ERC-20 transfer/approval or ERC-721/1155 transfer/`setApprovalForAll`; the decoded recipient, spender, operator, and amount are checked like the dedicated tools. Unrecognized calldata, multicall/nested calls, and permit/Permit2 are rejected unless `ALLOW_ARBITRARY_CALLDATA=true`, which grants unrestricted execution on allowlisted targets.
- Every approval path (`cdp_erc20_approve`, protocol approval helpers, Uniswap API approvals, decoded calldata) checks the final amount: unlimited (>= 2^255) is rejected, stablecoin approvals are capped by `MAX_TRADE_USD`, and the spender must be a router hardcoded by the protocol tools or allowlisted. Unlimited approvals returned by the Uniswap API are re-encoded as exact-amount approvals.
- Fixed-router protocol tools (Uniswap, Aerodrome, Avantis, `cdp_swap`) keep working without an allowlist. Their slippage inputs are clamped to `SLIPPAGE_PCT`.
- `MAX_TRADE_USD` (default 100, `unlimited` disables) caps USD/stablecoin-denominated inputs: stablecoin swap, transfer and approval amounts (by symbol or address, using the same token decimals as the protocol tools), Avantis collateral, Sponge Hyperliquid size and Polymarket amount, and `$`/USDC amounts in Bankr prompts. `MAX_POSITION_PCT` also applies to those inputs when the wallet reports a USD total (Bankr, Sponge).
- `sponge_submit_plan` accepts only `swap`/`transfer` steps with known params, checked like the direct tools; `sponge_approve_plan` only approves plan IDs this process submitted and accepted. `sponge_x402_fetch` only pays hosts in `ALLOWED_X402_HOSTS`.
- `bankr_execute` is blocked unless `BANKR_ALLOW_EXECUTE=true` (then unrestricted apart from best-effort prompt checks).
- x402 payments from the shared client are limited to the built-in data hosts (plus `ALLOWED_X402_HOSTS`), USDC on Base, and `MAX_X402_PAYMENT_USD` (default 0.10) per request.
- Not enforced: USD caps on non-stablecoin inputs (the scaffold does not price tokens), automatic stop-loss exits, leverage caps, and anything a `GUARDRAIL_ALLOW_TOOLS` tool does.

The operator can loosen any of these via env vars or by editing `src/guardrails.ts`. Each change widens what an agent acting on untrusted tool output can do with the wallet.

If you want the first run to be predictable, disable `self-updating`, keep tool selection narrow, and tighten the strategy before generation instead of after.

## What You Change After Generation

The scaffold is meant to be a starting point, not a sealed artifact.

- Edit `prompts/strategy.md` when the thesis changes but the tool/wallet wiring stays the same.
- Edit `src/guardrails.ts` when your risk controls need to diverge from the generated defaults.
- Edit `.env` when you add runtime credentials or switch providers.
- Edit `src/tools/*` when a built-in or custom integration needs deeper logic changes.
- If `self-updating` is enabled, the generated project also includes `strategy-history.json` to persist applied strategy revisions over time, and writes unapplied proposals to `prompts/strategy.proposed.md`.

After scaffolding, the CLI prints the generated project path to stdout.

## Headless Usage For Agents

Put headless usage at the end of your own automation flow, not at the start of human onboarding. It is the right interface for other agents, CI jobs, or repeatable scaffold generation.

If you are invoking the package locally, use `npm run dev --`:

```bash
npm run dev -- --no-interactive \
  --name market-maker \
  --wallet cdp-server-wallet \
  --tools uniswap,coingecko,virtuals \
  --llm claude \
  --model claude-sonnet-4-6 \
  --strategy "Trade ETH/USDC on momentum with explicit stop-losses and capped position sizing" \
  --test-mode true \
  --self-updating false \
  --output ./market-maker
```

You can also pass guardrail and output-management flags:

```bash
npm run dev -- --no-interactive \
  --config ./agent.json \
  --overwrite
```

Headless config is for reproducibility:

- Use a single JSON object for one agent.
- Use a JSON array when you want to scaffold multiple agents in one run.
- Include `guardrails.slippagePct`, `guardrails.stopLossPct`, and `guardrails.maxPositionPct` when you do not want the defaults.
- Include `testMode`, `selfUpdating`, and `evaluationInterval` when automation should fully specify runtime posture.
- Use `--overwrite` or `--merge` if the output directory may already exist.

Example config:

```json
{
  "name": "market-maker",
  "wallet": "cdp-server-wallet",
  "tools": ["uniswap", "coingecko", "virtuals"],
  "llm": "claude",
  "model": "claude-sonnet-4-6",
  "strategy": "Trade ETH/USDC on momentum with explicit stop-losses and capped position sizing",
  "output": "./market-maker",
  "guardrails": {
    "slippagePct": 0.5,
    "stopLossPct": 8,
    "maxPositionPct": 10
  },
  "testMode": true,
  "selfUpdating": false,
  "evaluationInterval": 15
}
```

If you are another agent generating this scaffold for a user, start with `SKILL.md`. It captures the agent-facing workflow, choice heuristics, and the recommended headless path for autonomous creation, including OpenClaw-style delegation via `virtuals`.
