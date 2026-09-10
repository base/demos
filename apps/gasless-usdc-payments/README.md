# Gasless USDC Payments (EIP-3009)

A minimal demo of **gasless USDC transfers on Base** using EIP-3009 `transferWithAuthorization`: the user signs a typed-data authorization (no ETH needed), and a relayer submits the transaction and pays gas.

This is the pattern behind "pay with USDC without holding ETH" flows — onboarding users who have stablecoins but no gas token.

## How it works

```
User wallet (no ETH)                    Relayer (holds ETH)              Base
─────────────────────                   ───────────────────              ────
1. Sign EIP-712 typed data
   TransferWithAuthorization
   (from, to, value, validAfter,
    validBefore, nonce)
                     ──────────────▶    2. Validate the authorization
                                           (recipient, value cap,
                                            expiry window)
                                        3. Submit transferWithAuthorization
                                           to the USDC contract, paying gas
                                                              ──────────▶  4. USDC contract verifies the
                                                                             signature ONCHAIN and moves
                                                                             funds from user → recipient
```

Key property: the relayer **cannot alter the transfer**. All six parameters are locked by the user's signature, which the USDC contract verifies onchain. A malicious relayer can only decline to submit — it can never redirect funds or change the amount.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in RELAYER_PRIVATE_KEY
npm run dev
```

- **Network:** defaults to Base Sepolia (`NETWORK=base-sepolia`). Set `NETWORK=base` for mainnet.
- **Relayer key:** needs a small amount of ETH on the selected network for gas.
- **Test USDC:** get Base Sepolia USDC from the [Circle faucet](https://faucet.circle.com/).

Open http://localhost:3000, connect a wallet holding USDC (but no ETH needed), enter a recipient and amount, sign — the relayer submits and pays gas.

## Security notes (read before productionizing)

- **Cap `validBefore`.** The API rejects authorizations valid for more than 1 hour. Long-lived signed authorizations are bearer instruments — anyone holding one can submit it at any time before expiry.
- **The relayer is a gas sponsor, not a custodian.** It never holds user funds; the signature authorizes exactly one transfer to one recipient.
- **Nonce reuse is prevented onchain** by the USDC contract (random 32-byte nonces, each usable once per `from` address).
- **EOA wallets only.** EIP-3009 requires an ECDSA signature recoverable to `from`. Smart-contract wallets (Base Account, Safe, etc.) cannot produce one — detect contract accounts (`getCode`) and route them to a different flow (e.g. batched calls with a paymaster) instead of letting the signature fail at submission.
- **Rate-limit the relay endpoint** in production; each submission costs you gas.

## Files

| File | Purpose |
|------|---------|
| `lib/eip3009.ts` | EIP-712 domain/types for USDC on Base + Base Sepolia |
| `pages/index.tsx` | Wallet connect, typed-data signing, relay request |
| `pages/api/relay.ts` | Validates the authorization and submits it, paying gas |
