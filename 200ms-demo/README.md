# 200ms demo

A single-page React app that streams Vibenet USDV through real EIP-8130 native
account-abstraction transactions at approximately five transfers per second.
It uses a locally generated devnet key: no wallet connection, extension, or
signing prompt.

Live preview: <https://youssefea.github.io/demos/200ms/>

The workflow committed to `base/demos` validates this directory but does not
deploy to the Base organization GitHub Pages site.

## Run

```bash
npm install
npm run dev
```

Open the printed local Vite URL. A fresh browser profile takes roughly 12–20
seconds to receive both faucet drips because Vibenet enforces a shared ten-second
IP cooldown.

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

- **Devnet only.** The private signing key is stored in localStorage. Do not
  point this storage model at production assets.
- **USDV, not USDC.** USDV is Vibenet's faucet-backed six-decimal test USD token.
- The high-rate account implementation restricts outbound ETH execution. The
  app only calls the USDV token and uses ETH for transaction fees.
- There is no mock fallback. If Vibenet is down, the app says so.
- Browsers call Vibenet directly. Visitors behind the same NAT or corporate
  egress can still contend for the faucet's IP cooldown.
