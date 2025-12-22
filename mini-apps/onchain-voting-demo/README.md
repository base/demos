# Onchain Voting Demo

A Base Mini App demonstrating onchain governance and voting functionality. Users can participate in decentralized decision-making with proposals, voting, and result tracking.

## Features

- **📊 Proposal Creation**: Submit governance proposals with titles and descriptions
- **🗳️ Democratic Voting**: Cast votes on active proposals (Yes/No/Abstain)
- **📈 Real-time Results**: Live vote counting and result visualization
- **⏰ Proposal Lifecycle**: Active → Voting Period → Executed/Failed states
- **🔐 Wallet Integration**: Secure voting using connected wallets
- **📱 Mobile-First**: Optimized for Base Mini App experience

## Voting Mechanism

### Proposal States
- **Active**: Proposal submitted, open for voting
- **Passed**: Majority voted yes, ready for execution
- **Failed**: Majority voted no or voting period expired
- **Executed**: Proposal successfully implemented

### Voting Rules
- One vote per wallet address
- Vote changes allowed during voting period
- Quorum requirement: 3 minimum votes
- Simple majority wins (50% + 1)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet**: MiniKit SDK integration
- **Styling**: Tailwind CSS
- **State Management**: React hooks + local storage
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Base-compatible wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/base/demos.git
cd demos/mini-apps/onchain-voting-demo

# Install dependencies
npm install

# Copy environment file
cp .example.env .env.local

# Add your MiniKit app ID
echo "NEXT_PUBLIC_MINIKIT_APP_ID=your_app_id" >> .env.local
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
onchain-voting-demo/
├── app/
│   ├── api/proposals/     # API routes for proposals
│   ├── components/        # React components
│   │   ├── ProposalCard.tsx
│   │   ├── VotingInterface.tsx
│   │   └── ResultsChart.tsx
│   ├── lib/
│   │   ├── proposals.ts   # Proposal management
│   │   └── voting.ts      # Voting logic
│   └── page.tsx          # Main voting interface
├── minikit.config.ts     # MiniKit configuration
└── package.json
```

## Usage

### Creating Proposals
1. Connect wallet using MiniKit
2. Click "Create Proposal"
3. Enter title and description
4. Submit to blockchain

### Voting on Proposals
1. Browse active proposals
2. Click "Vote" on desired proposal
3. Select Yes/No/Abstain
4. Confirm transaction

### Viewing Results
- Real-time vote counts
- Proposal status updates
- Historical voting data

## API Endpoints

- `GET /api/proposals` - Fetch all proposals
- `POST /api/proposals` - Create new proposal
- `GET /api/proposals/[id]` - Get specific proposal
- `POST /api/proposals/[id]/vote` - Cast vote on proposal

## Smart Contract Integration

While this demo uses local state for simplicity, it demonstrates the patterns for integrating with governance contracts:

```typescript
// Example contract interaction
const vote = async (proposalId: string, option: VoteOption) => {
  const hash = await walletClient.writeContract({
    address: GOVERNANCE_CONTRACT,
    abi: GOVERNANCE_ABI,
    functionName: 'castVote',
    args: [proposalId, option]
  });
  return hash;
};
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## Demo Flow

1. **Landing**: Welcome screen with voting overview
2. **Proposal List**: Browse active proposals with status indicators
3. **Create Proposal**: Form to submit new governance proposals
4. **Voting Interface**: Interactive voting with confirmation
5. **Results Dashboard**: Real-time results and analytics

## Security Considerations

- Input validation for all user inputs
- Rate limiting for proposal creation
- Wallet signature verification
- Timestamp-based voting periods
- Duplicate vote prevention

## Future Enhancements

- [ ] Integration with actual governance contracts
- [ ] Quadratic voting mechanisms
- [ ] Proposal categories and tagging
- [ ] Delegate voting system
- [ ] Proposal execution automation
- [ ] Multi-chain voting support

---

Built for the Base ecosystem • Powered by MiniKit
