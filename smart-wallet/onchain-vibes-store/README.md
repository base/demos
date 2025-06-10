
# Vibes Store - Onchain E-commerce with Smart Wallet Profiles

## Project Overview

**URL**: https://lovable.dev/projects/8ef7b19f-93af-40b3-a5cf-c465fa8bae30

Vibes Store is a demonstration of Coinbase Smart Wallet's profile data collection feature, built as a retro-styled onchain e-commerce platform. This app showcases how to seamlessly collect user profile information (email, physical address) during onchain transactions using Coinbase's Smart Wallet capabilities.

## Features Demonstrated

### 🔐 Smart Wallet Profiles Integration
- **Sign In with Smart Wallet**: Users sign in using Coinbase Smart Wallet instead of traditional wallet connection
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

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Smart Wallet Profile Setup

This app demonstrates the profile data collection feature. To test:

1. **Get a Coinbase Smart Wallet**: Download the Coinbase Wallet app
2. **Get Test USDC**: Use a Base Sepolia faucet to get test USDC
3. **Configure Callback URL**: Update the callback URL in `CheckoutButton.tsx` to your deployed backend
4. **Test the Flow**: Sign in, select profile data to share, and complete a purchase

## Data Validation Examples

The app includes server-side validation examples:
- Rejects emails from `@example.com` domain
- Validates postal codes (minimum 5 characters)
- Blocks shipping to certain country codes
- Demonstrates how to implement custom business rules

## Deployment

Deploy easily with Lovable:
1. Open your [Lovable project](https://lovable.dev/projects/8ef7b19f-93af-40b3-a5cf-c465fa8bae30)
2. Click Share → Publish
3. Your app will be live instantly

For custom domains, navigate to Project > Settings > Domains in Lovable.

## Learn More

- [Coinbase Smart Wallet Profiles Documentation](https://docs.base.org/identity/smart-wallet/guides/profiles)
- [Base Blockchain Documentation](https://docs.base.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Lovable Documentation](https://docs.lovable.dev/)

## What's Next?

This demo showcases the foundation for building sophisticated onchain commerce experiences. Potential extensions:
- Multi-product inventory
- Order management system
- Advanced profile data usage
- Integration with real payment processing
- Mobile app version

---

Built with ❤️ using Lovable, demonstrating the future of onchain commerce with Smart Wallet profiles.
