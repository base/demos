# MiniKit + Vite Mini App Template

A minimal [MiniKit](https://docs.base.org/builderkits/minikit/overview) mini app
built with Vite, React, and TypeScript. Use it as a starting point for a Base
mini app served as a static single-page app.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the example and add your OnchainKit API key:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-api-key
   ```

   Get a key from the [Coinbase Developer Platform](https://portal.cdp.coinbase.com).
   The variable must be prefixed with `VITE_` so Vite exposes it to the client.

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
