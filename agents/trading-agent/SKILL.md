---
name: create-trading-agent
description: Scaffold Base trading agents from a plain-English strategy using the `agents/trading-agent` CLI. Use when asked to create a new trading agent project, choose wallet/tool/LLM combinations for a trading scaffold, or drive trading-agent creation headlessly from another agent.
---

# Create Trading Agent

## Use This Skill When

- A user wants a new trading agent scaffold on Base.
- A user has a trading strategy and wants it turned into a runnable TypeScript project.
- Another agent needs a repeatable, headless way to generate a trading agent.
- An OpenClaw or ACP-style workflow needs a trading agent that can delegate to helper agents via `virtuals`.

## Preferred Invocation

Use the normal local package workflow:

```bash
git clone https://github.com/base/demos.git
cd demos/agents/trading-agent
npm i
npm run dev
```

## What The CLI Does

1. Collects project name, wallet, tools, LLM, runtime posture, and strategy.
2. Critiques the strategy with the selected LLM.
3. Produces a refined strategy plus initial guardrails.
4. Generates a runnable project with wallet wiring, selected tools, `.env`, `prompts/strategy.md`, and runtime files.

Treat the generated project as editable output, not a final artifact.

## Decision Guide

### Wallet Choice

| Wallet | Pick it when | Constraints |
| --- | --- | --- |
| `cdp-server-wallet` | You need programmable execution and the full built-in tool surface. | Supports all built-in tools. |
| `bankr` | You want Bankr to own execution. | Only `virtuals`, `agentcash-mcp`, and `nansen-mcp` should be selected. |
| `sponge` | You want Sponge to own execution. | Same current tool constraint as `bankr`. |

### Tool Choice

| Tool | Use it for | Notes |
| --- | --- | --- |
| `uniswap` | Spot swaps on Base. | CDP only. |
| `aerodrome` | Spot swaps on Base. | CDP only. |
| `avantis` | Perps on Base. | CDP only. |
| `virtuals` | ACP-based helper-agent delegation. | Use for OpenClaw-style or marketplace-style helper agents. |
| `coingecko` | Lightweight market data. | x402 pay-per-request. |
| `coinmarketcap` | Market data. | x402 pay-per-request. |
| `alchemy-x402` | Chain and asset data. | x402 pay-per-request. |
| `agentcash-mcp` | Generic paid API access via MCP. | Works across wallet modes. |
| `nansen-mcp` | Rich analytics via MCP. | Requires `NANSEN_API_KEY`. |
| `nansen-x402` | Analytics via x402. | CDP path only. |

Default posture:

- Start narrow: one execution tool and one data tool is usually enough.
- Do not add `virtuals` unless helper-agent delegation is part of the strategy.
- For `bankr` or `sponge`, avoid CDP-only and built-in x402 tools entirely.

### Runtime Posture

- `test mode` is live on Base mainnet with smaller recommended balances and faster cadence. It is validation mode, not simulation.
- `self-updating` periodically re-evaluates strategy instructions. Use it only when adaptive behavior is desired.
- Guardrails start with slippage, stop-loss, and max position size; they can be changed later in `src/guardrails.ts`.
- With `self-updating`, model-proposed strategies are written to `prompts/strategy.proposed.md` for review. They become the system prompt only if the operator sets `AUTO_APPLY_STRATEGY_UPDATES=true`.
- `src/guardrails.ts` classifies every tool in code (default-deny): read-only tools, x402 paid-data tools (payments capped by `MAX_X402_PAYMENT_USD`, default 0.10), and Nansen MCP tools pass through; tools with a built-in policy are checked on every call; anything else (MCP/custom tools) is blocked unless listed in `GUARDRAIL_ALLOW_TOOLS`. Arbitrary-destination calls (raw transactions, contract writes, transfers, Sponge transfers/plan steps, Bankr prompts, Virtuals jobs) are blocked unless the destination is in `ALLOWED_ADDRESSES`, which is empty by default. Raw-call calldata must decode to a token transfer/approval whose effect passes the same checks (`ALLOW_ARBITRARY_CALLDATA=true` opts out and grants unrestricted execution on allowlisted targets). Unlimited approvals (>= 2^255) and approvals to unknown spenders are rejected on every approval path. Slippage inputs are clamped to `SLIPPAGE_PCT`. USD/stablecoin-denominated inputs are capped by `MAX_TRADE_USD` (default 100) and, when the wallet reports a USD total, by `MAX_POSITION_PCT`. `bankr_execute` needs `BANKR_ALLOW_EXECUTE=true`. `sponge_approve_plan` only approves plans this process submitted and the guardrails accepted. Blocked calls return a `[guardrail]` error to the model.
- Not enforced: caps on non-stablecoin trade sizes, automatic stop-loss exits, leverage, and tools the operator lists in `GUARDRAIL_ALLOW_TOOLS`. With `BANKR_ALLOW_EXECUTE=true`, Bankr checks are best-effort. The operator can loosen any guardrail through env vars or by editing `src/guardrails.ts`.

## Interactive Workflow

Use interactive mode when the user wants to think through the setup once:

```bash
npm run dev
```

The onboarding flow is:

1. `Project name`
2. `Wallet provider`
3. `Tools`
4. `LLM provider + model`
5. `Test mode`
6. `Self-updating strategy`
7. `Strategy`
8. `Critique + refined strategy approval/edit`
9. `Experimental custom tools`
10. `Output directory`

When guiding a user through this flow, explain that:

- wallet choice changes execution semantics
- tool choice changes the agent's action surface
- critique is a fast strategy review plus guardrail generation
- custom tool generation is experimental and should be used only when built-ins are insufficient

## Headless Workflow For Agents

Prefer headless mode for autonomous agents, CI, or reproducible scaffold generation.

Use flags for one-off runs:

```bash
npm run dev -- --no-interactive \
  --name market-maker \
  --wallet cdp-server-wallet \
  --tools uniswap,coingecko,virtuals \
  --llm claude \
  --model claude-sonnet-4-6 \
  --strategy "Trade ETH/USDC on momentum with explicit exits and capped position sizing" \
  --test-mode true \
  --self-updating false \
  --output ./market-maker
```

Use `--config` for reproducibility or batch generation:

```bash
npm run dev -- --config ./agent.json --overwrite
```

Headless config rules:

- The JSON may be a single object or an array.
- Use `guardrails.slippagePct`, `guardrails.stopLossPct`, and `guardrails.maxPositionPct` when defaults are not acceptable.
- Use `testMode`, `selfUpdating`, and `evaluationInterval` when automation must fully specify runtime posture.
- Use `--overwrite` or `--merge` if the target directory may already exist.
- Headless mode still runs the critique/refinement step, so the relevant LLM API key must be available in the environment.

## OpenClaw / ACP Guidance

For OpenClaw-style agents or any workflow that needs helper-agent delegation:

- Include `virtuals`.
- Ensure the ACP CLI is installed and accessible as `acp`, or set `VIRTUALS_ACP_BIN`.
- Treat `virtuals` as additive. It does not replace wallet execution; it adds delegation and marketplace/job capabilities.
- Only choose it when the user wants agent orchestration, helper-agent execution, or ACP marketplace interaction.

## What To Hand Off After Generation

Tell the user to review the generated:

- `.env` for provider and wallet secrets
- `prompts/strategy.md` for strategy wording
- `src/guardrails.ts` for runtime risk controls (code-enforced allowlist, approval, slippage, and size checks)
- `.env` guardrail settings: `ALLOWED_ADDRESSES`, `MAX_TRADE_USD`, `SLIPPAGE_PCT`, `MAX_POSITION_PCT`, `GUARDRAIL_ALLOW_TOOLS`, `ALLOW_ARBITRARY_CALLDATA`, `BANKR_ALLOW_EXECUTE`, `MAX_X402_PAYMENT_USD`, `ALLOWED_X402_HOSTS`, and `AUTO_APPLY_STRATEGY_UPDATES` for self-updating agents
- `prompts/strategy.proposed.md`, if present, before applying any agent-proposed strategy change
- `src/tools/*` for capability-specific changes

The scaffold prints the generated project path to stdout.
