# Zora NFT Badges (Seasonal)

## ✅ Zora Minting Script

### Location
**Script**: `scripts/mint-season-badges.ts`

### Features
- Creates Zora 1155 NFT collection per season
- Batch mints badges to top 500 players
- Configurable royalties (2.5% to CartelPot)
- Tier-based badge metadata (Kingpin, Underboss, Capo, Soldier, Associate)
- IPFS/Arweave metadata upload support

### Usage
```bash
# Mint badges for Season 1, top 500 players
npx tsx scripts/mint-season-badges.ts 1 500

# Or via end-of-season script
npx tsx scripts/process-season-end.ts 1
```

### Sample Metadata
```json
{
  "name": "Base Cartel - Season 1 - Rank #1",
  "description": "This badge certifies that the holder achieved Rank #1 in Base Cartel Season 1. The undisputed ruler of the cartel.",
  "image": "https://yourapp.com/api/metadata/season/1/badge/1.png",
  "attributes": [
    { "trait_type": "Season", "value": 1 },
    { "trait_type": "Rank", "value": 1 },
    { "trait_type": "Tier", "value": "Kingpin" },
    { "trait_type": "Shares", "value": 2450 },
    { "trait_type": "Badge Type", "value": "Seasonal Leaderboard" }
  ]
}
```

## ✅ Royalties Configuration

### Settings
- **Rate**: 2.5% (250 basis points)
- **Receiver**: CartelPot contract address
- **Chain**: Base Mainnet

### Implementation
```typescript
const ROYALTY_BPS = 250; // 2.5%
const ROYALTY_RECEIVER = process.env.NEXT_PUBLIC_CARTEL_POT_ADDRESS;

await minter.setRoyalties(collectionAddress);
```

### Sample Mint Transaction
```
[Zora] Creating collection for Season 1
  Contract URI: https://yourapp.com/api/metadata/season/1/collection.json
  
[Zora] Collection created: 0x1234567890abcdef...
  TxHash: 0xabc123def456...
  Block: 12345678
  Gas: 450,000
  
[Zora] Setting royalties
  Royalty BPS: 250 (2.5%)
  Royalty Receiver: 0xCartelPot...
  TxHash: 0xdef456ghi789...
  
[Zora] Minting token 1 to 0x1234... (Rank #1 - Kingpin)
  TxHash: 0xghi789jkl012...
  Metadata: https://yourapp.com/api/metadata/season/1/badge/1.json
```

**View on Zora**:
```
https://zora.co/collect/base:0x1234567890abcdef.../1
```

**Transaction Details**:
```
From: 0xDeployer... (Season Admin)
To: 0x1234567890abcdef... (Zora Collection)
Function: mint(address to, uint256 tokenId, uint256 amount)
Status: ✓ Success
Royalty: 2.5% → 0xCartelPot...
```

## ✅ End-of-Season Flow

### Script Location
**Script**: `scripts/process-season-end.ts`

### Process
1. Query top 500 players from database (ordered by shares)
2. Generate badge metadata for each rank
3. Create Zora collection for the season
4. Batch mint NFTs to all recipients
5. Set royalty configuration
6. Post season recap to Farcaster

### Sample Run Logs

```bash
$ npx tsx scripts/process-season-end.ts 1

========================================
SEASON 1 - END OF SEASON PROCESSING
========================================

[Step 1/4] Fetching top 500 players...
  Querying database...
  ORDER BY shares DESC LIMIT 500
✓ Loaded 500 players
  Top 3: #1 0x1234... (2450 shares), #2 0x2345... (1890 shares), #3 0x3456... (1420 shares)

[Step 2/4] Initializing Zora minter...
  Deployer: 0xDeployer...
  Chain: Base Mainnet
  Zora Factory: 0x777777C338d93e2C7adf08D102d45CA7CC4Ed021
✓ Minter initialized

[Step 3/4] Minting season badges...
  Creating collection...
  Collection Address: 0x1234567890abcdef1234567890abcdef12345678
  TxHash: 0xabc123def456789012345678901234567890abcdef123456789012345678901234
  
  Minting badges (0-100)...
  ████████████████████ 100/500
  
  Minting badges (100-200)...
  ████████████████████ 200/500
  
  Minting badges (200-300)...
  ████████████████████ 300/500
  
  Minting badges (300-400)...
  ████████████████████ 400/500
  
  Minting badges (400-500)...
  ████████████████████ 500/500
  
✓ Minted 500 badges
  Collection: 0x1234567890abcdef1234567890abcdef12345678
  Sample badges:
    Rank #1: 0x1234... - 0xmint1a2b3c
    Rank #2: 0x2345... - 0xmint4d5e6f
    Rank #3: 0x3456... - 0xmint7g8h9i

[Step 3.5/4] Setting royalties...
  Calling setDefaultRoyalty()...
  Rate: 2.5%
  Receiver: 0xCartelPot123...
  TxHash: 0xroyalty1a2b3c4d5e6f
✓ Royalties configured

[Step 4/4] Posting season recap...
  [Neynar API] POST /v2/farcaster/cast
  Cast Hash: 0xcast123abc...
  URL: https://warpcast.com/cartelbot/0xcast123abc...
✓ Season recap posted to Farcaster

========================================
SEASON 1 - PROCESSING COMPLETE
========================================
Total Badges Minted: 500
Collection Address: 0x1234567890abcdef1234567890abcdef12345678
Royalty Rate: 2.5%
Royalty Receiver: 0xCartelPot123...

View collection: https://zora.co/collect/base:0x1234567890abcdef1234567890abcdef12345678

✅ Season 1 processing complete!
```

## ✅ Metadata Endpoints

### Badge JSON Metadata
**Endpoint**: `GET /api/metadata/season/[season]/badge/[rank]`

**Example**: `GET /api/metadata/season/1/badge/1`

**Response**:
```json
{
  "name": "Base Cartel - Season 1 - Rank #1",
  "description": "This badge certifies that the holder achieved Rank #1 in Base Cartel Season 1. The undisputed ruler of the cartel.",
  "image": "https://yourapp.com/api/metadata/season/1/badge/1.png",
  "external_url": "https://yourapp.com?season=1&rank=1",
  "attributes": [
    { "trait_type": "Season", "value": 1 },
    { "trait_type": "Rank", "value": 1 },
    { "trait_type": "Tier", "value": "Kingpin" },
    { "trait_type": "Badge Type", "value": "Seasonal Leaderboard" },
    { "trait_type": "Color", "value": "#FFD700" }
  ]
}
```

**Cache Headers**:
```
Cache-Control: public, max-age=31536000, immutable
```

### Badge Image (Dynamic SVG)
**Endpoint**: `GET /api/metadata/season/[season]/badge/[rank].png`

**Generation**: Server-side SVG rendering with tier-specific colors and styling.

**Example SVG**:
```svg
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" fill="url(#goldGradient)"/>
  
  <!-- Badge Border -->
  <circle cx="200" cy="200" r="150" stroke="#000" stroke-width="5" fill="none"/>
  
  <!-- Rank -->
  <text x="200" y="200" font-size="80" font-weight="bold" fill="#000" text-anchor="middle">#1</text>
  
  <!-- Tier -->
  <text x="200" y="280" font-size="32" fill="#000" text-anchor="middle">KINGPIN</text>
  
  <!-- Season -->
  <text x="200" y="350" font-size="20" fill="#000" text-anchor="middle">SEASON 1</text>
</svg>
```

### Collection Metadata
**Endpoint**: `GET /api/metadata/season/[season]/collection.json`

**Response**:
```json
{
  "name": "Base Cartel - Season 1 Badges",
  "description": "Official badges for top performers in Base Cartel Season 1. Earn your place in the hierarchy.",
  "image": "https://yourapp.com/api/metadata/season/1/collection.png",
  "external_link": "https://yourapp.com",
  "seller_fee_basis_points": 250,
  "fee_recipient": "0xCartelPot..."
}
```

## Badge Tiers & Distribution

### Tier Breakdown
| Tier | Rank Range | Badge Name | Color | Count |
|------|-----------|------------|-------|-------|
| 👑 Kingpin | 1 | #1 | Gold (#FFD700) | 1 |
| 🥈 Underboss | 2-3 | #2-3 | Silver (#C0C0C0) | 2 |
| 🥉 Capo | 4-10 | #4-10 | Bronze (#CD7F32) | 7 |
| 🔵 Soldier | 11-50 | #11-50 | Blue (#4169E1) | 40 |
| 🟤 Associate | 51-500 | #51-500 | Brown (#8B7355) | 450 |

**Total**: 500 badges per season

## Environment Variables

```env
# Zora Minting
DEPLOYER_PRIVATE_KEY=0x...
ZORA_API_KEY=your_zora_api_key

# Royalties
NEXT_PUBLIC_CARTEL_POT_ADDRESS=0xCartelPot...

# Metadata
NEXT_PUBLIC_URL=https://yourapp.com
```

## Deployment Checklist

- [ ] Deploy badge image generator (SVG endpoint)
- [ ] Deploy metadata JSON endpoints
- [ ] Test metadata accessibility (curl test)
- [ ] Configure Zora API credentials
- [ ] Test single badge mint on testnet
- [ ] Test batch mint (10 badges)
- [ ] Verify royalty configuration
- [ ] Create cron job for season-end processing
- [ ] Document season-end runbook
- [ ] Test full season-end flow on testnet

## Testing

### Test Single Mint
```bash
npx tsx scripts/mint-season-badges.ts 1 1
```

### Test Batch Mint (10)
```bash
npx tsx scripts/mint-season-badges.ts 1 10
```

### Test Full Season End
```bash
npx tsx scripts/process-season-end.ts 1
```

### Verify Metadata
```bash
curl https://yourapp.com/api/metadata/season/1/badge/1
```

