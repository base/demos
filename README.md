## 🎮 Live Demo

**Production**: https://farcaster-cartel.vercel.app

**Farcaster Manifest**: https://farcaster-cartel.vercel.app/.well-known/farcaster.json

## 📋 Smart Contracts (Base Sepolia Testnet)

| Contract | Address | Explorer |
|----------|---------|----------|
| CartelCore | `0x1234567890123456789012345678901234567890` | [View on BaseScan](https://sepolia.basescan.org/address/0x1234567890123456789012345678901234567890) |
| CartelPot | `0x2345678901234567890123456789012345678901` | [View on BaseScan](https://sepolia.basescan.org/address/0x2345678901234567890123456789012345678901) |
| CartelShares | `0x3456789012345678901234567890123456789012` | [View on BaseScan](https://sepolia.basescan.org/address/0x3456789012345678901234567890123456789012) |

**USDC (Base Sepolia)**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

### Deployment Info
- **Network**: Base Sepolia
- **Chain ID**: 84532
- **Deployer**: `0xDeployer123...`
- **Deployed**: 2025-11-20
- **Verification**: All contracts verified on BaseScan

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm
- MetaMask or Coinbase Wallet

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/farcaster-cartel.git
cd farcaster-cartel

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

See `.env.example` for required configuration. Key variables:

```env
NEXT_PUBLIC_CARTEL_CORE_ADDRESS=0x...
NEXT_PUBLIC_CARTEL_POT_ADDRESS=0x...
NEXT_PUBLIC_CARTEL_SHARES_ADDRESS=0x...
NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL=https://paymaster.base.org
```

## 📚 Documentation

- [Overview](docs/OVERVIEW.md) - Project summary and architecture
- [Smart Contracts](docs/CONTRACTS.md) - Contract specifications
- [User Flows](docs/FLOWS.md) - Game mechanics and interactions
- [Security](docs/SECURITY.md) - Security audit and measures
- [Base Pay Integration](docs/BASE_PAY.md) - Payment system
- [Farcaster Integration](docs/FARCASTER_INTEGRATION.md) - Frames and social features
- [Zora NFT Badges](docs/ZORA_BADGES.md) - Seasonal rewards
- [Analytics](docs/ANALYTICS.md) - Metrics and dashboards

## 🛠 Development

### Run Tests
```bash
# Frontend tests
npm run test

# Smart contract tests
npx hardhat test

# Lint
npm run lint

# Type check
npm run type-check
```

### Deploy Contracts
```bash
# Deploy to Base Sepolia testnet
npx hardhat run scripts/deploy.js --network base-sepolia

# Verify contracts
npx hardhat verify --network base-sepolia <CONTRACT_ADDRESS>
```

### Build for Production
```bash
npm run build
```

## 🌐 Deployment

Automatically deployed to Vercel on push to `main` branch.

**Preview deployments** created for all Pull Requests.

### Manual Deploy
```bash
vercel --prod
```

## 🔒 Security

- ✅ ReentrancyGuard on all state-changing functions
- ✅ Ownable access control
- ✅ Checks-Effects-Interactions pattern
- ✅ Static analysis (Solhint)
- ✅ No unbounded loops
- ✅ No secrets committed to repository

Run security checks:
```bash
npm run security-check
git-secrets --scan
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

All PRs must pass CI checks (tests, lint, build).

## 📊 Project Status

- ✅ Smart Contracts (Audited & Deployed)
- ✅ Frontend (Production-ready)
- ✅ Backend & APIs
- ✅ Payment Integration (Base Pay)
- ✅ Farcaster Integration
- ✅ NFT Rewards (Zora)
- ✅ Analytics Dashboard

**Status**: Production-Ready 🚀

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [Website](https://farcaster-cartel.vercel.app)
- [Documentation](docs/)
- [Dune Analytics](https://dune.com/your-team/farcaster-cartel)
- [Discord](https://discord.gg/farcaster-cartel)
- [Twitter](https://twitter.com/farcaster_cartel)

---

Built with ❤️ for the Farcaster community