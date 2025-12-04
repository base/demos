# Auto-Agent System Specification

**Status**: Draft
**Target Phase**: Phase 2/3
**Owner**: Base Cartel Team

---

## 1. User Story
Player toggles **Auto-Agent** (or it auto-activates on leave); the x402 agent performs configured small actions (e.g., safe raids, market/treasury participation), pays necessary fees, logs performance, and posts a short Farcaster summary that tempts the player to return and check P&L.

---

## 2. Core Principles
1. **Explicit opt-in & consent** — never act without user approval.
2. **Limited scope & caps** — agent only does what user allowed (budget, action types).
3. **Transparent logs & proof** — every action has onchain tx + Farcaster post + UI log.
4. **Safety first** — rate limiting, max loss per day, idempotency, kill-switch.
5. **Revenue & alignment** — agent can take a small success fee or use pot revenue; user must know.
6. **Privacy & keys** — no storing user private keys in the service.

---

## 3. UX & User Controls
**Location**: Profile → Auto-Agent panel

### A. Agent Toggle
* `Auto-Agent: OFF / ON` (with short tooltip)

### B. Agent Strategy (pick one)
* **Conservative** — only safe passive actions (participate in pot, claim yield, very low-risk small raids up to X% steal cap).
* **Balanced** — limited raids (configured frequency), small aggression, tries to increase shares.
* **Aggressive** — more frequent raids, higher steal %, higher chance of loss.
* **Custom** — user picks allowed actions.

### C. Budget & Limits
* `Daily Budget (USDC)` — how much the agent may spend per day (Base Pay fees + optional small stake).
* `MaxSharesToRisk` — max % of user's shares agent may risk in actions (e.g., 5%).
* `MaxLossThreshold` — stop agent if net P&L drops more than X% within a day.
* `Cooldown per target` — don’t raid same address more than Y hours.
* `MaxActionsPerDay` — cap.

### D. Permissions
* Raid: ✓/✗
* Claim yield: ✓/✗
* Propose betrayals: ✓/✗ (recommend OFF by default)
* Auto-post to Farcaster: ✓/✗
* Use escrow funds: ✓/✗

### E. Notifications
* Push via Farcaster DM (cast), email, or webhook on every action or daily summary.

### F. Audit & History
* UI shows live audit: actions, tx hashes, fees, profit/loss per action, cumulative P&L.

---

## 4. Authorization & Architecture

**Smart Vault + Signed Delegation (Recommended)**

* Deploy a per-user `AgentVault` smart contract (or a single `AgentManager` that maps user → vault).
* User deposits a small **escrow** (USDC) and optionally approves vault to spend their shares (or vault holds a reference).
* User signs an **off-chain delegation** (EIP-712) with:
  * allowed actions, budget, expiry timestamp, nonce
* Agent uses this signed delegation to submit authorized meta-transactions to the **vault** or to the `CartelCore` with paymaster gas — the contract enforces the policy (budget, caps).

**Benefits**:
* No user private key storage
* Onchain enforceability (vault checks limits)
* Easy revoke by updating a revocation nonce or withdrawing escrow

---

## 5. Funds / Fees Management

* **Escrow deposits (USDC)**: user deposits a small budget; agent spends this on Base Pay action fees (join already paid) and on optional economic stakes.
* **Fee accounting**: every action logs fee paid, platform cut (e.g., 5% success fee), and net P&L credited back to user's ledger on withdrawal.
* **Paymaster usage**: For gasless UX, agent submits meta-txs and Paymaster pays gas. Quotas tracked.

---

## 6. Agent Behavior & Strategies

### Conservative (v1 recommended)
* Only **claim yield** automatically when cooldown allows.
* If `shares` < threshold and `pot` large enough, **do a small raid** on low-risk targets (targets preselected by leaderboard heuristics).
* No betrayals.

### Balanced
* Periodic small raids (e.g., once per day) within `MaxSharesToRisk`.
* If a player is raided, agent may **retaliate** once (if opted-in).

### Aggressive
* Frequent raids, higher steal %, seeks viral targets.

**Execution Flow**:
1. Check budget and caps first
2. Sign and produce onchain tx (through vault/meta-tx)
3. Log tx and generate a Farcaster cast summary (short & clickthrough to UI)
4. Update player audit & P&L calculation

---

## 7. Profit & P&L Accounting

**Line Item**: `Action ID` | `Type` | `Timestamp` | `TxHash` | `Fee (USDC)` | `Shares gained/lost` | `Estimated value change (USDC)` | `Net P&L (USDC)`

**Calculation**:
* `ShareValue = pot_balance / total_shares`
* `ValueChange = (new_shares - old_shares) * ShareValue`
* `Net P&L = ValueChange - Fees`

Show **daily summary** and **cumulative P&L**.

---

## 8. Notifications & Engagement Hooks

1. **Immediate micro-cast (optional)** on big wins:
   `🔥 Base Cartel Bot: @you just gained 12 shares (+3.2 USDC). See tx: <link> — open app to claim your reward!`
2. **Daily summary cast / DM**:
   `Daily Update: Bot ran 3 actions: +X shares, Net +Y USDC. Tap to inspect.`
3. **Push & in-app banners** when thresholds are reached.
4. **Leaderboard chatter**: bot posts on official channel.
5. **“Did it profit?” CTA**: In the summary, present `Yes/No` and a clear button: `Check Details`.

---

## 9. Safety & Abuse Prevention
* **Opt-in per account** (no broad defaults).
* **Daily loss cap**: stop if cumulative loss exceeds threshold.
* **Cooldowns**: per-target and global action cooldowns.
* **Whitelist/Blacklist**: user can block bot from acting on specific addresses.
* **Kill switch**: immediate stop for a user and global emergency stop.
* **Audit logs**: immutable logs of actions stored onchain where feasible.
* **Rate limits**: per-user and per-bot.
* **Human escalation**: bot flags suspicious wins/losses for manual review.

---

## 10. Platform Revenue Model
* **Success fee**: take e.g., 5–10% of positive net P&L the agent generates.
* **Subscription**: optional subscription to enable advanced agent modes.
* **Bot action fee**: small platform fee per action (e.g., 0.001 USDC).

---

## 11. Implementation Plan

**Phase 0 — Design & Contracts**
1. Design `AgentVault` smart contract: escrow + policy enforcement + withdrawal + revocation.
2. Add `AgentAuth` type (EIP-712) for signed delegations.
3. Update `CartelCore` to accept meta-tx delegation or support vaults.

**Phase 1 — Minimal Safe Agent (v1)**
1. UI: Auto-Agent toggle + Conservative strategy + budget input + consent flow.
2. Backend: store signed delegations, agent schedule manager.
3. Bot: implement cron to `claimYield()` and optional conservative raids.
4. Notifications: Farcaster posts for each action + daily summary.
5. Accounting: P&L ledger and audit page.

**Phase 2 — Controlled Expansion**
1. Add retaliation rules and Balanced strategy.
2. Implement idempotency, throttling, and kill-switch.
3. Paymaster integration for gasless meta-tx.
4. Add fees & payout distribution.

**Phase 3 — Production & Governance**
1. Extensive testing on Sepolia + staged rollout.
2. Add multi-sig for bot funds.
3. Add opt-in community strategies.
4. Add analytics + Dune dashboards.

---

## 12. Developer Checklist
* [ ] User signs delegation (EIP-712) granting agent rights and deposit escrow.
* [ ] AgentVault contract deployed & unit-tested.
* [ ] Backend stores delegation and checks validity/expiry/nonce.
* [ ] Agent uses delegation to submit actions; contract verifies signature.
* [ ] Agent logs txHash + action metadata to DB.
* [ ] UI shows audit entries with links to txs + P&L.
* [ ] Notifications posted to Farcaster (Neynar) with the right template.
* [ ] Rate limits & loss caps enforced.
* [ ] Kill switch works (UI + API).
* [ ] Fees calculated & deducted transparently; withdrawal possible.

