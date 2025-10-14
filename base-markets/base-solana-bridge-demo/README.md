# sol2base

<div align="center">
  <img src="assets/sol2base.png" alt="sol2base Bridge" width="800" />
</div>

<div align="center">
  <h3>Bridge SOL from Solana Devnet to Base Sepolia testnet</h3>
  <h4><i>Uses the official Base Bridge launched at Basecamp on 15 Sep 2025</i></h4>
</div>

<div align="center">
  
![sol2base Bridge](https://img.shields.io/badge/Solana-Base-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

</div>

## 🌉 features

- **Bridge**: SOL bridging from Solana Devnet to Base Sepolia
- **Faucet**: Get SOL from Coinbase Developer Platform
- **Address resolution**: Support for ENS names and Basenames
- **Balance**: Live SOL balance tracking for connected wallet
- **Txn status**: Complete bridge transaction history and status monitoring

## 🚀 quickstart

### pre-reqs

- Node.js 18+ 
- npm or yarn
- Solana wallet (Phantom, Solflare) to connect in the UI

### installation

1. clone the repo:
```bash
git clone https://github.com/Jnix2007/sol2base.git
cd sol2base
```

2. install dependencies:
```bash
npm install --legacy-peer-deps
```

3. copy env template:
```bash
cp env.template .env.local
```

4. *(optional)* Add CDP API credentials to `.env.local` for faucet functionality:
```env
CDP_API_KEY_ID=your_cdp_api_key_id
CDP_API_KEY_SECRET=your_cdp_api_key_secret
```

5. start your dev server:
```bash
npm run dev
```

6. open [http://localhost:3000](http://localhost:3000)

## 🔧 how it woooorks

### Bridge process

1. **connect wallet**: Connect Solana wallet (Phantom/Solflare)
2. **get SOL**: Use the integrated CDP Faucet to get SOL on Solana Devnet if needed
3. **enter details**: Specify amount and destination (Base Sepolia address, ENS, or Basename)
4. **Bridge!** Execute the bridge txn
5. **monitor**: Track txn status in real-time

### architecture

- **frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Solana integration**: Uses `@solana/wallet-adapter` and `@solana/web3.js`
- **Bridge contracts**: Real Base/Solana bridge smart contracts
- **address resolution**: ENS and Basename support via ethers.js
- **faucet**: CDP (Coinbase Developer Platform) Faucet integration

## 🎨 UI theme

I was going for a fun "hacker" aesthetic:
- **colors**: Bright green (#00ff00) on black background
- **font faces**: JetBrains Mono and Orbitron fonts
- **animations**: Matrix rain effects and glowing text
- **logo**: Pixelated suspension bridge with animated effects

## 📱 components

- **Faucet section**: Get SOL from CDP with rate limiting info, and backup link to SF faucet in case I've exceeded CDP Faucet limits
- **Bridge form**: Input validation & address resolution
- **Balance display**: SOL balance tracking  
- **Transaction history**: Status tracking
- **Wallet integration**: Wallet connection

## 🔗 networks

- **source**: Solana Devnet
- **destination**: Base Sepolia Testnet
- **Faucet**: CDP Solana Devnet SOL Faucet
- **Backup Faucet**: [faucet.solana.com](https://faucet.solana.com)

## 🛠️ development

### project structure

```
sol2base/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   ├── lib/                 # Utilities and services
│   └── styles/              # Global styles
├── bridge-contracts/        # Base bridge contracts
├── bridge-solana/          # Solana bridge programs
└── public/                 # Static assets
```

### key files

- `src/lib/bridge.ts` - Main bridge service
- `src/lib/realBridgeImplementation.ts` - Bridge txn logic
- `src/lib/cdpFaucet.ts` - CDP faucet integration
- `src/lib/addressResolver.ts` - ENS/Basename resolution
- `src/components/MainContent.tsx` - Main app interface

## 🔐 security

- **no private keys**: Uses wallet adapter for secure signing
- **address validation**: Validates all addresses before transactions
- **error handling**: Comprehensive error handling and user feedback
- **rate limiting**: Respects faucet rate limits

## 🤝 contributing

Feel free to fork & whatever, building in the open here

1. fork the repo
2. create a feature branch: `git checkout -b feature/amazing-feature`
3. commit your changes: `git commit -m 'Add amazing feature'`
4. push to the branch: `git push origin feature/amazing-feature`
5. open a PR

## 📄 license

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 acknowledgments

The Base team that put this together is cracked and it was dope to be at Basecamp in-person when this was announced.

- [Base](https://base.org) for the bridge infra
- [Coinbase Developer Platform](https://docs.cdp.coinbase.com) for faucet services & general badassery
- [Solana](https://solana.com) for the blockchain infra
- The open-source community for the amazing tools and libraries used along the way

## 🔗 links & useful onchain addresses

- **Live Demo**: https://sol2base.xyz/
- **Base Bridge docs**: [github.com/base/bridge](https://github.com/base/bridge)
- **Solana docs**: [docs.solana.com](https://docs.solana.com)
- **CDP docs**: [docs.cdp.coinbase.com](https://docs.cdp.coinbase.com)
- Bridge program on Solana Devnet: [HSvNvzehozUpYhRBuCKq3Fq8udpRocTmGMUYXmCSiCCc](https://explorer.solana.com/address/HSvNvzehozUpYhRBuCKq3Fq8udpRocTmGMUYXmCSiCCc?cluster=devnet)
- Base Relayer program on Solana Devnet: [ExS1gcALmaA983oiVpvFSVohi1zCtAUTgsLj5xiFPPgL](https://explorer.solana.com/address/ExS1gcALmaA983oiVpvFSVohi1zCtAUTgsLj5xiFPPgL?cluster=devnet)
- Bridge contract on Base Sepolia: [0x3154Cf16ccdb4C6d922629664174b904d80F2C35](https://sepolia.basescan.org/address/0x3154Cf16ccdb4C6d922629664174b904d80F2C35)
- Bridge Validator on Base Sepolia: [0xa80C07DF38fB1A5b3E6a4f4FAAB71E7a056a4EC7](https://sepolia.basescan.org/address/0xa80C07DF38fB1A5b3E6a4f4FAAB71E7a056a4EC7)
- Wrapped SOL token CA on Base Sepolia: [0xC5b9112382f3c87AFE8e1A28fa52452aF81085AD](https://sepolia.basescan.org/address/0xC5b9112382f3c87AFE8e1A28fa52452aF81085AD)
- Gas fee receiver address expected by Bridge program & Base Relayer program: [BEwzVVw44VLaspWByUML23hbQmo5ndM1NPQAJsvCxC6F](https://explorer.solana.com/address/BEwzVVw44VLaspWByUML23hbQmo5ndM1NPQAJsvCxC6F?cluster=devnet)

---

**"Base is a bridge, not an island."**  🌉 Play positive-sum games, win positive-sum prizes.
