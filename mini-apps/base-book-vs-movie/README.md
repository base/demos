# BaseBookvsMovie Mini App

A Farcaster Mini App built on Base where users vote for their favorite book or film adaptation and earn CSM tokens as rewards.

## Live Demo

**App:** https://base-bookvs-movie.vercel.app

## Features

- 20 classic book vs film adaptations to vote on
- Earn **100 CSM tokens** per vote
- 1 vote per title per 24 hours
- Real-time vote statistics and percentages
- Works in Base App, Warpcast, and regular browsers
- Mobile-first responsive design

## Smart Contracts (Base Mainnet)

| Contract | Address |
|----------|---------|
| BookVoteApp (Token + Voting) | `0x407EacD1aAF2F46cC4079BFC4bef0c197A1FD6A8` |
| CSM Token | `0x9ECF496059E601ca541712319d34fa053602289D` |

## Tech Stack

- Vanilla JavaScript (no framework)
- ethers.js v6 for contract interaction
- Farcaster Mini App SDK
- Base Mainnet (Chain ID: 8453)
- Vercel deployment

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## How It Works

1. Connect your wallet (MetaMask or Base App embedded wallet)
2. Browse 20 classic book vs film adaptations
3. Vote for your favorite — Book 📚 or Film 🎬
4. Earn 100 CSM tokens instantly on Base
5. Come back tomorrow for more votes!

## Contract Architecture

The `BookVoteApp` contract combines ERC-20 token functionality with voting logic:

- Fixed supply of 100 billion CSM tokens
- Daily vote limit: 1 vote per title per wallet per 24 hours
- Automatic token reward distribution on each vote
- On-chain vote tracking with real-time statistics

## Author

Built by [@consumeobeydie](https://github.com/consumeobeydie) for the Base ecosystem.