# Vibes Store - Onchain E-commerce with Smart Wallet Profiles

## Project Overview

Vibes Store is a demonstration of Coinbase Smart Wallet's profiles data collection feature, built as a retro-styled onchain e-commerce platform. This app showcases how to seamlessly collect user profile information (email, physical address) during onchain transactions using Smart Wallet capabilities.

## Features Demonstrated

### 🔐 Smart Wallet Profiles Integration
- **Sign In with Smart Wallet**: Users sign in using Smart Wallet
- **Profile Data Collection**: Securely collect email addresses and physical addresses during checkout
- **Data Validation**: Server-side validation of collected profile data with custom business rules
- **Seamless UX**: One-click checkout with profile sharing - no forms to fill out

### 🎨 Retro Gaming Aesthetic
- Pixelated fonts and retro styling
- Neon border effects and glitch animations
- Cyberpunk color scheme with animated backgrounds
- Gaming-inspired UI components

### ⛓️ Onchain Commerce
- Built on Base Sepolia testnet
- USDC payments for "Onchain Vibes" products
- Real blockchain transactions with profile data callbacks
- Demonstrates the future of onchain commerce

## Technical Implementation

### Smart Wallet Profile Flow
1. User signs in with Coinbase Smart Wallet
2. User selects what profile data to share (email/address)
3. Transaction is initiated with `dataCallback` capability
4. Profile data is collected and validated server-side
5. Transaction proceeds if validation passes

### Key Technologies
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Blockchain**: Wagmi + Viem for Web3 integration
- **Smart Wallet**: Coinbase Wallet SDK with profile features
- **Network**: Base Sepolia testnet

## How to Run Locally

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Create a .env file in the project root with the following content:
VITE_NGROK_URL=https://your-ngrok-url.ngrok-free.app
VITE_PROD_DOMAIN=https://your-production-domain.com
# (Replace with your actual ngrok and production URLs)

# Step 4: Install dependencies
npm i

# Step 5: Start the development server
npm run dev
```

## Smart Wallet Profile Setup

This app demonstrates the profile data collection feature. To test:

1. **Sign up to Smart Wallet**: Sign to a passkey-powered Smart Wallet
2. **Get Test USDC**: Use a Base Sepolia faucet to get test USDC
3. **Configure Callback URL**: Set your callback URLs in the `.env` file using `VITE_NGROK_URL` and `VITE_PROD_DOMAIN`.
4. **Test the Flow**: Sign in, select profile data to share, and complete a purchase

## Data Validation Examples

The app includes server-side validation examples:
- Rejects emails from `@example.com` domain
- Validates postal codes (minimum 5 characters)
- Blocks shipping to certain country codes
- Demonstrates how to implement custom business rules


## Learn More

- [Coinbase Smart Wallet Profiles Documentation](https://docs.base.org/identity/smart-wallet/guides/profiles)
- [Base Documentation](https://docs.base.org/)
- [Wagmi Documentation](https://wagmi.sh/)

## What's Next?

This demo showcases the foundation for building sophisticated onchain commerce experiences. Potential extensions:
- Multi-product inventory
- Order management system
- Advanced profile data usage
- Integration with real payment processing
- Mobile app version
