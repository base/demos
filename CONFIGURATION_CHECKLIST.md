## 🔴 CRITICAL - Must Change Before Deploy

### 1. Farcaster Manifest (`.well-known/farcaster.json`)
**File**: `src/app/.well-known/farcaster.json/route.ts`

**Lines 9-23** - Account Association:
```typescript
// CURRENT (Demo values):
accountAssociation: {
  header: "eyJmaWQiOjM2MjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhEOTBENkQ3NzU4OEYxNGJENzMxMkQzMjU3ZkJEOEQxMTM4NzhEODlBIn0",
  payload: "eyJkb21haW4iOiJtaW5pLWFwcC1mdWxsLWRlbW8udmVyY2VsLmFwcCJ9",
  signature: "MHg3YzU3Njk1MGFkNjBhOGQ0YWQ3ZTU5NjAyYWE1ZDU0YzUzMTA3MmRlMjQwNTM4YjdjODY0NThkOTEwZmMwZDkxNmQxYzI1YTdhMTcyNDM3YWIyNWU4MDE1MzY0ZDk1ZTU5YzhhZDJlMTBkOGU0YTBhZjczZjUyZWExM2ExZmEzNjFi"
}

// REPLACE WITH: Your Farcaster account's association
// Get from: https://docs.farcaster.xyz/developers/frames/spec
```

**Line 45** - Canonical Domain:
```typescript
// CURRENT:
canonicalDomain: "localhost:3000"

// REPLACE WITH:
canonicalDomain: "your-app.vercel.app"
```

### 2. Contract Addresses
**File**: `src/lib/basePay.ts`

**Lines 7-9** - All Contract Addresses:
```typescript
// CURRENT (All zeros - placeholder):
export const CARTEL_CORE_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CARTEL_POT_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CARTEL_SHARES_ADDRESS = '0x0000000000000000000000000000000000000000';

// REPLACE WITH: Your deployed contract addresses (after deploying to Base)
export const CARTEL_CORE_ADDRESS = '0xYourCartelCoreAddress...';
export const CARTEL_POT_ADDRESS = '0xYourCartelPotAddress...';
export const CARTEL_SHARES_ADDRESS = '0xYourCartelSharesAddress...';
```

**Line 17** - Paymaster Address:
```typescript
// CURRENT:
paymasterAddress: '0x0000000000000000000000000000000000000000'

// REPLACE WITH: Base Paymaster address from Coinbase
// Get from: https://docs.base.org/using-base/paymaster
```

### 3. Smart Contract Owner
**File**: `contracts/CartelCore.sol`, `contracts/CartelPot.sol`

**Constructor** - Owner Address:
```solidity
// These contracts use Ownable which sets msg.sender as owner on deploy
// Make sure you deploy from YOUR ADDRESS, not a demo address
// The deployer becomes the owner automatically
```

### 4. Environment Variables
**File**: `.env.local` (create from `.env.example`)

```bash
# MUST CHANGE - Your Values:
NEXT_PUBLIC_WC_PROJECT_ID="your_walletconnect_project_id"
NEXT_PUBLIC_CDP_API_KEY="your_coinbase_developer_platform_api_key"
NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL="https://paymaster.base.org/v1/..."
NEXT_PUBLIC_PAYMASTER_POLICY_ID="your_policy_id"

# Update after contract deployment:
NEXT_PUBLIC_CARTEL_CORE_ADDRESS="0xYourDeployedAddress"
NEXT_PUBLIC_CARTEL_POT_ADDRESS="0xYourDeployedAddress"
NEXT_PUBLIC_CARTEL_SHARES_ADDRESS="0xYourDeployedAddress"

# Database (use your DB):
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Neynar (Farcaster API):
NEYNAR_API_KEY="your_neynar_api_key"
NEYNAR_SIGNER_UUID="your_signer_uuid"

# For deployment scripts:
DEPLOYER_PRIVATE_KEY="0xYourPrivateKeyHere"
BASE_RPC_URL="https://mainnet.base.org"

# Base Pay webhook:
BASE_PAY_WEBHOOK_SECRET="your_webhook_secret"
```

---

## ⚠️ IMPORTANT - Update Before Production

### 5. Demo Recipient Address
**File**: `src/components/BasePayComponent.tsx`

**Line 156**:
```typescript
// CURRENT (dylsteck's address - demo):
const recipient = "0x8342A48694A74044116F330db5050a267b28dD85";

// REPLACE WITH: Your treasury/pot contract address
const recipient = CARTEL_POT_ADDRESS;
```

### 6. WagmiProvider Configuration
**File**: `src/components/providers/WagmiProvider.tsx`

Check that contract addresses are imported from `basePay.ts`:
```typescript
import { CARTEL_CORE_ADDRESS, CARTEL_POT_ADDRESS, CARTEL_SHARES_ADDRESS } from '@/lib/basePay';
```

### 7. Package.json
**File**: `package.json`

**Line 2** - Already updated to "farcaster-cartel" ✅

---

## 📝 OPTIONAL - Customize

### 8. App Metadata
**File**: `src/lib/utils.ts`

**Lines 4-11** - Already updated with Base Cartel branding ✅

### 9. Mock Data (Remove in Production)
**Files with mock data**:
- `src/components/Leaderboard.tsx` - Line 15: `MOCK_LEADERBOARD`
- `src/app/api/leaderboard/route.ts` - Replace mock data with real DB queries
- `src/app/api/analytics/route.ts` - Replace mock data with real analytics

### 10. Test/Demo Components (Optional - Can Delete)
**Files you can remove** (not used in main app):
- `src/components/BasePayComponent.tsx` - Demo component
- `src/components/actions/*` - Demo action components
- `src/components/wallet/WalletActions.tsx` - If not needed

---

## 🔍 How to Find Your Values

### Farcaster Account Association
1. Go to: https://warpcast.com/~/developers/frames
2. Create a new frame for your domain
3. Get the signed account association JSON
4. Extract `header`, `payload`, and `signature` values

### Contract Addresses
1. Deploy contracts to Base Sepolia (testnet) first:
   ```bash
   npx hardhat run scripts/deploy.js --network base-sepolia
   ```
2. Note all 3 contract addresses from deployment output
3. Verify on BaseScan
4. Update in `src/lib/basePay.ts`
5. For mainnet: Repeat with `--network base-mainnet`

### Paymaster
1. Sign up at: https://www.coinbase.com/developer-platform
2. Create a Base Paymaster policy
3. Get the paymaster URL and policy ID
4. Add to `.env.local`

### Neynar API
1. Sign up at: https://neynar.com
2. Create API key and Signer
3. Add to `.env.local`

### WalletConnect Project ID
1. Go to: https://cloud.walletconnect.com
2. Create new project
3. Copy Project ID

---

## ✅ Verification Checklist

Before deploying to production:

- [ ] Updated Farcaster account association with YOUR FID
- [ ] Updated canonical domain to YOUR domain
- [ ] Deployed all 3 smart contracts to Base Sepolia
- [ ] Updated all contract addresses in `basePay.ts`
- [ ] Created `.env.local` with all YOUR API keys
- [ ] Updated paymaster address and policy
- [ ] Replaced recipient address from demo
- [ ] Set up Neynar API for social features
- [ ] Set up database with correct schema
- [ ] Replaced mock leaderboard data with DB queries
- [ ] Tested all flows on Sepolia testnet
- [ ] Verified manifest accessible at `/.well-known/farcaster.json`
- [ ] No private keys in committed code
- [ ] Ready to deploy to Base Mainnet

---

## 🚨 Security Reminders

**NEVER commit**:
- Private keys
- API keys
- Database credentials
- Webhook secrets

**Always use**:
- `.env.local` for local development
- Vercel Environment Variables for production
- `.gitignore` to exclude `.env*` files

---

**After updating all values, test thoroughly on testnet before mainnet deploy!**

