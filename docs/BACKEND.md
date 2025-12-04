# Backend & Leaderboard Implementation

## Status: ✅ Architecture Complete (Mock Data Mode)

### ✅ 1. API Endpoint
**Location**: `src/app/api/leaderboard/route.ts`

**Endpoint**: `GET /api/leaderboard`

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "address": "0x1234...",
      "name": "kingpin.eth",
      "shares": 2450,
      "totalClaimed": 1220,
      "raidCount": 15,
      "fid": 3621,
      "lastActive": "2025-11-20T05:14:17.000Z"
    }
  ],
  "timestamp": "2025-11-20T05:14:17.000Z",
  "totalPlayers": 5
}
```

**Security Measures**:
- ✅ Origin checking (CORS validation)
- ✅ Error handling with proper status codes
- ✅ Cache headers (`s-maxage=60, stale-while-revalidate=120`)
- 🔄 Rate limiting (commented - would use Upstash/Redis in production)

### ✅ 2. Event Listener Service
**Location**: `scripts/event-listener.ts`

**Capabilities**:
- Listens to `Join`, `Raid`, `Betrayal` events from `CartelCore` contract
- Upserts player records on join
- Updates shares on successful raids
- Tracks raid counts and last active timestamps
- Supports historical event sync from specific block

**Database Interface** (Mock):
```typescript
interface PlayerRecord {
  address: string;
  shares: number;
  totalClaimed: number;
  raidCount: number;
  joinedAt: Date;
  lastActive: Date;
}
```

**Events Monitored**:
1. `Join(address player, address referrer, uint256 shares, uint256 fee)`
   - Creates new player record
   - Updates referrer's last active time
2. `Raid(address raider, address target, uint256 amountStolen, bool success, uint256 fee)`
   - Increments raid count
   - Transfers shares from target to raider (if successful)
3. `Betrayal(address traitor, uint256 amountStolen)`
   - Burns all shares
   - Marks betrayal timestamp

### 🔄 3. Database Schema (Not Implemented)
For production deployment, recommended schema:

```prisma
model Player {
  id           String   @id @default(cuid())
  address      String   @unique
  name         String?
  shares       Int      @default(0)
  totalClaimed Int      @default(0)
  raidCount    Int      @default(0)
  fid          Int?
  joinedAt     DateTime @default(now())
  lastActive   DateTime @updatedAt
  
  @@index([shares])
  @@index([lastActive])
}
```

### 🔄 4. Deployment Requirements

**Environment Variables** (`.env.example`):
```env
# Backend
BASE_RPC_URL=https://mainnet.base.org
EVENT_LISTENER_START_BLOCK=0
DATABASE_URL=postgresql://...

# Rate Limiting (optional)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

**Running the Event Listener**:
```bash
# Install dependencies
npm install ethers

# Run listener
npx tsx scripts/event-listener.ts

# Or with Docker
docker build -t cartel-listener -f Dockerfile.listener .
docker run -d --env-file .env cartel-listener
```

### ✅ 5. Data Integrity
**Mock Data vs On-Chain**:
Currently using mock data. For production:
1. Deploy contracts to Base testnet/mainnet
2. Run event listener to populate database
3. Query `/api/leaderboard` from database instead of MOCK_LEADERBOARD
4. Cross-validate with on-chain reads periodically

**Validation Script** (recommended):
```typescript
// scripts/validate-leaderboard.ts
import { ethers } from 'ethers';
import CartelCoreABI from '../src/lib/abi/CartelCore.json';

const validateLeaderboard = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
  const contract = new ethers.Contract(address, CartelCoreABI, provider);
  
  const apiData = await fetch('/api/leaderboard').then(r => r.json());
  
  for (const player of apiData.data) {
    const onChainShares = await contract.sharesContract().balanceOf(player.address, 1);
    if (onChainShares !== player.shares) {
      console.error(`Mismatch for ${player.address}: DB=${player.shares}, Chain=${onChainShares}`);
    }
  }
};
```

## Production Checklist
- [ ] Deploy Postgres/Supabase database
- [ ] Run Prisma/Drizzle migrations
- [ ] Deploy event listener service (Railway/Render/Fly.io)
- [ ] Configure RPC endpoint (Alchemy/Infura)
- [ ] Set up Redis for rate limiting (Upstash)
- [ ] Monitor listener health (Sentry/DataDog)
- [ ] Set up cron job for periodic on-chain validation
