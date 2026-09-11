# 200ms demo

The 200ms demo shows what becomes possible when Base produces canonical blocks
ten times faster.

Base's [Denim upgrade](https://docs.base.org/upgrades/denim/overview) reduces
the canonical block interval from two seconds to 200 milliseconds. Instead of
waiting for one canonical block every two seconds, applications can receive
five per second. Existing applications benefit from the shorter confirmation
cycle without changing their contracts.

This demo turns that protocol improvement into a new product behavior:
**continuous onchain money streaming**. The page sends faucet-backed USDV from
one account to another through real ERC-20 transfers at approximately block
cadence. At 200ms, the recipient balance changes quickly enough that many
individual payments read as one continuous flow.

The demo also uses Denim's EIP-8130 native account abstraction. The browser
creates an account from a local devnet key, funds it, and starts submitting
transactions without a wallet connection, extension, bundler, or repeated
signing prompts.

## What the demo proves

- **Faster blocks create new application primitives.** Five canonical blocks
  per second make continuous settlement, usage-based payments, and high-rate
  micropayments practical to demonstrate directly onchain.
- **The stream is not an animation or an offchain estimate.** Each ticker row
  is a real transaction, the recipient balance comes from `balanceOf`, and the
  headline never runs ahead of confirmed state.
- **Product state can react at block speed.** A rate change affects the next
  transfer without restarting the stream or requesting another approval.
- **Native account abstraction removes setup from the experience.** The page
  can create and operate an account without asking the user to connect a
  wallet.

The 200ms block implementation is currently available on Vibenet for
experimental testing. See the [Base upgrade overview](https://docs.base.org/upgrades/overview)
for the current Denim rollout schedule and network status.

## Run

```bash
npm install
npm run dev
```

Open the printed local Vite URL. A fresh browser profile takes roughly 12–20
seconds to receive both faucet drips because Vibenet enforces a shared ten-second
IP cooldown.

Once setup completes, choose a rate and press **Start stream**. The counter only
reveals confirmed value; accepted but unconfirmed value remains visually
separate until it lands.

## Verify the live transaction path

```bash
npm run spike
```

The spike creates a disposable high-rate account, funds it, deploys it, and
sends 50 real USDV transfers. See [PHASE1.md](./PHASE1.md) for the passing
September 10, 2026 measurements and the designs rejected during testing.

The five-minute funding/throughput soak is available as `npm run soak`.

## Architecture

- `src/chain/bootstrap.ts` — health, live contracts, persisted account,
  cooldown-aware funding, deployment proof, and one-time gas calibration.
- `src/chain/streamer.ts` — exact rational accumulator, 200ms scheduler,
  nonce-free signing, pending backpressure, receipt watcher, rebroadcast,
  funding daemon, and reset detection.
- `src/hooks/useStream.ts` — requestAnimationFrame sampling over the mutable
  streamer snapshot.
- `src/ui/` — counter, real balance cards, rate selector, and explorer-linked
  transaction ticker.

## Important limitations

- **Vibenet only.** Vibenet is an experimental test network and can reset. The
  app detects a reset, creates a new account epoch, and requests fresh faucet
  funds.
- **Devnet key storage.** The private signing key is stored in localStorage. Do
  not point this storage model at production assets.
- **USDV, not USDC.** USDV is Vibenet's faucet-backed six-decimal test USD token.
- The high-rate account implementation restricts outbound ETH execution. The
  app only calls the USDV token and uses ETH for transaction fees.
- There is no mock fallback. If Vibenet is down, the app says so.
- Browsers call Vibenet directly. Visitors behind the same NAT or corporate
  egress can still contend for the faucet's IP cooldown.
