# CoinSpark Demo

This is a demonstration frame built with [MiniKit](https://docs.base.org/builderkits/minikit/overview), [OnchainKit](https://docs.base.org/builderkits/onchainkit/getting-started), and Zora's Coins SDK to show how to mint your ideas on-chain as unique crypto assets.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   # or yarn install
   # or pnpm install
   # or bun install
   ```

2. Set up environment variables:

   Create a `.env.local` file in the project root (or use the provided `env.example`) and add the following:

   ```env
   # Required for Frame metadata
   NEXT_PUBLIC_URL=
   NEXT_PUBLIC_VERSION=
   NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=
   NEXT_PUBLIC_ICON_URL=
   NEXT_PUBLIC_IMAGE_URL=
   NEXT_PUBLIC_SPLASH_IMAGE_URL=
   NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=

   # Required for Frame account association
   FARCASTER_HEADER=
   FARCASTER_PAYLOAD=
   FARCASTER_SIGNATURE=

   # Required for webhooks and background notifications
   REDIS_URL=
   REDIS_TOKEN=
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Features

- AI-powered idea-to-coin generation via OpenAI
- On-chain minting with Zora's Coins SDK
- Frame integration for seamless account association and notifications
- View your minted coins in the “My Coins” tab
- Real-time transaction feedback with Etherscan links
- Dark/light theme support with customizable styling via Tailwind CSS

## Project Structure

- `app/page.tsx` — Main demo page with Create and My Coins tabs
- `app/components/` — Reusable UI components (inputs, cards, modals)
- `app/api/` — Backend routes for coin generation, metadata, and notifications
- `app/providers.tsx` — MiniKit and OnchainKit setup
- `app/theme.css` — Custom theming for Tailwind and OnchainKit
- `.well-known/farcaster.json` — Frame metadata endpoint

## Learn More

- MiniKit Documentation: https://docs.base.org/builderkits/minikit/overview
- OnchainKit Documentation: https://docs.base.org/builderkits/onchainkit/getting-started
- Zora Coins SDK: https://github.com/zoralabs/coins-sdk
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs
