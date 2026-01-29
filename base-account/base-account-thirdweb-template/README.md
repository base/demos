# Base Account Thirdweb Template

A Next.js template demonstrating authentication with Thirdweb using Email OTP and Base Account wallet integration.

## Features

- **Email Authentication**: Sign in with email using OTP verification
- **Base Account Integration**: Connect with Base Account wallet (org.base.account)
- **Thirdweb SDK**: Built with Thirdweb v5 for modern wallet connectivity
- **Next.js 15**: Uses the latest Next.js with App Router
- **Tailwind CSS v4**: Modern styling with Tailwind

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository and navigate to the template:

```bash
cd base-account/base-account-thirdweb-template
```

1. Install dependencies:

```bash
npm install
```

1. Set up environment variables:

```bash
cp .env.example .env.local
```

1. Add your Thirdweb Client ID to `.env.local`:

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-client-id
```

Get your client ID from [Thirdweb Dashboard](https://thirdweb.com/dashboard).

1. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Authentication Methods

### Email OTP

Uses Thirdweb's in-app wallet with email strategy:

1. User enters their email address
2. OTP is sent via `preAuthenticate`
3. User enters the verification code
4. Wallet is created/connected via `wallet.connect`

### Base Account

Connects to Base Account wallet using the wallet strategy:

- Wallet ID: `org.base.account`
- Chain: Base mainnet

## Project Structure

```text
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main page with auth UI
├── lib/
│   └── client.ts        # Thirdweb client configuration
└── providers/
    └── providers.tsx    # ThirdwebProvider wrapper
```

## Customization

- **Wallets and auth**: Update the wallet list and auth options in `src/app/page.tsx`.
- **Chain**: Replace `base` with another chain from `thirdweb/chains`.
- **Theme**: Adjust `customTheme` and button styles in `src/app/page.tsx`.

## Resources

- [Thirdweb Documentation](https://portal.thirdweb.com)
- [Base Account Documentation](https://docs.base.org)
- [Next.js Documentation](https://nextjs.org/docs)
