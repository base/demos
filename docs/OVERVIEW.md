# Base Cartel - Project Overview

## 📖 Introduction
**Base Cartel** is a social strategy game built as a Farcaster Frame v2 Mini-App on the Base blockchain. Players join a cartel, pool funds, raid other communities, and navigate betrayal mechanics to earn yield and reputation.

## 🎮 Core Mechanics

### 1. Membership (Shares)
- **Entry Fee**: 0.01 USDC
- **Mechanism**: Players mint `CartelShares` (ERC-1155) to join.
- **Benefit**: Share ownership grants access to the dashboard and a claim on the treasury yield.

### 2. The Pot (Treasury)
- **Contract**: `CartelPot.sol`
- **Function**: Holds all entry fees and raid fees.
- **Yield**: Generates "yield" (simulated or real) that share owners can claim daily.

### 3. Raids
- **Cost**: 0.005 USDC
- **Action**: Players can "raid" external targets (simulated).
- **Reward**: Successful raids increase the pot size and the raider's reputation.
- **Social**: Raids can be shared as Casts on Farcaster.

### 4. Betrayal
- **Risk**: High-risk, high-reward mechanic.
- **Action**: Attempt to steal a portion of the pot.
- **Consequence**: Failure results in burning shares and expulsion (slashing).

### 5. Growth & Social
- **Leaderboard**: Tracks top players by shares and reputation.
- **Referrals**: Earn bonuses for inviting new members via Farcaster Casts.
- **Profile**: View Farcaster profiles directly from the leaderboard.

## 🏗 Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Farcaster Integration**: `@farcaster/frame-sdk` (v2)
- **Wallet**: `@coinbase/onchainkit` (Smart Wallet & Base Pay)

### Smart Contracts (Foundry)
- **CartelShares.sol**: ERC-1155 Token for membership.
- **CartelPot.sol**: Treasury management (Ownable).
- **CartelCore.sol**: Game logic controller (Raids, Claims, Betrayals).

## 🚀 Current Status
- **Phase**: MVP Complete (Phase 8)
- **Features**: All core mechanics implemented.
- **Integration**: Real Base Pay integration (ready for mainnet config), Haptic feedback, SIWE Auth.
- **Verification**: Build verified, components integrated.

## 📂 Directory Structure
- `/src/app`: Next.js pages and API routes.
- `/src/components`: React UI components (Dashboard, Leaderboard, Modals).
- `/contracts`: Solidity smart contracts.
- `/docs`: Project documentation.
- `/scripts`: Utility scripts.

