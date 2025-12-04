# Tutorial 3: Deploy Smart Contracts to Base

**Time needed**: 30 minutes  
**Difficulty**: Intermediate  
**Cost**: ~$0.50 in gas fees (using testnet first - free!)

This tutorial will help you deploy the 3 smart contracts (CartelCore, CartelPot, CartelShares) to the Base blockchain.

---

## What Are Smart Contracts?

Think of smart contracts as **automatic agreements** that run on the blockchain:
- **CartelCore** = The main game rules (who can join, raid, etc.)
- **CartelPot** = The treasury that holds everyone's money
- **CartelShares** = The membership tokens that track who owns what

Once deployed, these run automatically and can't be changed!

---

## Prerequisites

Before starting, make sure you have:
- ✅ Completed Tutorial 1 (computer setup)
- ✅ Completed Tutorial 2 (accounts created)
- ✅ Base Sepolia ETH in your wallet (~0.5 ETH)

---

## Step 1: Create Your Deployment Wallet

You need to export your wallet's private key to deploy contracts.

### ⚠️ CRITICAL SECURITY WARNING

- Private keys are like passwords to your money
- NEVER share them with anyone
- NEVER post them online
- Create a NEW wallet just for deployment (recommended)

### Get Private Key from Coinbase Wallet:

1. **Open Coinbase Wallet app**
2. **Go to Settings** → **Security**
3. **Show Recovery Phrase**
4. Enter your password/PIN
5. **Write this down on paper** (12-24 words)
6. **Keep this VERY safe!**

### Convert to Private Key:

1. **Go to**: https://iancoleman.io/bip39/
2. **Paste your recovery phrase** in "BIP39 Mnemonic"
3. **Scroll down** to "Derived Addresses"
4. **Copy the "Private Key"** (starts with 0x...)
5. **Close the page** (don't save it anywhere online!)

✅ **Save this** in a password manager or secure note.

---

## Step 2: Set Up Environment Variables

1. **Create a new file** in your project folder:
   - File name: `.env.local`
   - Location: `d:\demos\farcaster-cartel\.env.local`

2. **Open in VS Code**

3. **Add this content** (replace with YOUR values):

```env
# Deployment
DEPLOYER_PRIVATE_KEY=0xYourPrivateKeyFromStep1
BASE_RPC_URL=https://sepolia.base.org

# Will add contract addresses here after deployment
NEXT_PUBLIC_CARTEL_CORE_ADDRESS=
NEXT_PUBLIC_CARTEL_POT_ADDRESS=
NEXT_PUBLIC_CARTEL_SHARES_ADDRESS=

# From Tutorial 2
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_id
NEXT_PUBLIC_CDP_API_KEY=your_coinbase_api_key
NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL=https://paymaster.base.org/v1/...
NEXT_PUBLIC_PAYMASTER_POLICY_ID=your_policy_id
NEYNAR_API_KEY=your_neynar_key
NEYNAR_SIGNER_UUID=your_signer_uuid

# USDC on Base (this is correct, don't change)
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

4. **Save the file** (Ctrl + S)

✅ **Important**: `.env.local` is in `.gitignore` so it won't be uploaded to GitHub (good for security!)

---

## Step 3: Check Hardhat Configuration

1. **Open**: `hardhat.config.ts` in VS Code

2. **Verify it has Base Sepolia network**:
   ```typescript
   networks: {
     "base-sepolia": {
       url: process.env.BASE_RPC_URL || "https://sepolia.base.org",
       accounts: [process.env.DEPLOYER_PRIVATE_KEY],
     }
   }
   ```

3. **If not, add it** to the `networks` section

---

## Step 4: Create Deployment Script

1. **Create new file**: `scripts/deploy.ts`

2. **Add this code**:

```typescript
import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment to Base Sepolia...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy CartelShares (ERC-1155)
  console.log("📦 Deploying CartelShares...");
  const CartelShares = await ethers.getContractFactory("CartelShares");
  const shares = await CartelShares.deploy();
  await shares.waitForDeployment();
  const sharesAddress = await shares.getAddress();
  console.log("✅ CartelShares deployed to:", sharesAddress, "\n");

  // Deploy CartelPot (Treasury)
  console.log("📦 Deploying CartelPot...");
  const CartelPot = await ethers.getContractFactory("CartelPot");
  const usdcAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Base Sepolia USDC
  const pot = await CartelPot.deploy(usdcAddress);
  await pot.waitForDeployment();
  const potAddress = await pot.getAddress();
  console.log("✅ CartelPot deployed to:", potAddress, "\n");

  // Deploy CartelCore (Main game logic)
  console.log("📦 Deploying CartelCore...");
  const CartelCore = await ethers.getContractFactory("CartelCore");
  const core = await CartelCore.deploy(sharesAddress, potAddress, usdcAddress);
  await core.waitForDeployment();
  const coreAddress = await core.getAddress();
  console.log("✅ CartelCore deployed to:", coreAddress, "\n");

  // Grant permissions
  console.log("🔐 Setting up permissions...");
  await shares.grantMinterRole(coreAddress);
  console.log("✅ CartelCore can now mint shares\n");

  // Summary
  console.log("=" .repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=" .repeat(60));
  console.log("\n📋 CONTRACT ADDRESSES:\n");
  console.log("CartelCore:", coreAddress);  
  console.log("CartelPot:", potAddress);
  console.log("CartelShares:", sharesAddress);
  console.log("\n📝 NEXT STEPS:");
  console.log("1. Save these addresses to your .env.local file");
  console.log("2. Verify contracts on BaseScan");
  console.log("3. Update src/lib/basePay.ts with contract addresses");
  console.log("\n🔍 View on BaseScan:");
  console.log(`https://sepolia.basescan.org/address/${coreAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

3. **Save the file**

---

## Step 5: Deploy to Base Sepolia (Testnet)

Now the exciting part - deploy!

1. **Open Command Prompt** in your project folder:
   ```
   cd d:\demos\farcaster-cartel
   ```

2. **Run the deployment**:
   ```
   npx hardhat run scripts/deploy.ts --network base-sepolia
   ```

3. **Wait** (1-2 minutes)

4. **You should see**:
   ```
   🚀 Starting deployment to Base Sepolia...
   📝 Deploying contracts with account: 0x...
   💰 Account balance: 0.5 ETH

   📦 Deploying CartelShares...
   ✅ CartelShares deployed to: 0xABC123...

   📦 Deploying CartelPot...
   ✅ CartelPot deployed to: 0xDEF456...

   📦 Deploying CartelCore...
   ✅ CartelCore deployed to: 0xGHI789...

   🎉 DEPLOYMENT SUCCESSFUL!
   ```

5. **SAVE THESE ADDRESSES!** Copy them to your notepad.

---

## Step 6: Verify Contracts on BaseScan

This makes your contracts readable on the blockchain explorer.

1. **Run verification** for each contract:

```bash
# Verify CartelShares
npx hardhat verify --network base-sepolia 0xYourCartelSharesAddress

# Verify CartelPot
npx hardhat verify --network base-sepolia 0xYourCartelPotAddress "0x036CbD53842c5426634e7929541eC2318f3dCF7e"

# Verify CartelCore
npx hardhat verify --network base-sepolia 0xYourCartelCoreAddress "0xYourShares Address" "0xYourPotAddress" "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
```

2. **Wait for confirmation** ("Successfully verified!")

3. **Check on BaseScan**:
   - Go to: https://sepolia.basescan.org/address/0xYourCoreAddress
   - You should see a green checkmark ✅ next to "Contract"

---

## Step 7: Update Configuration Files

Now update your code with the deployed addresses:

### Update `.env.local`:
```env
NEXT_PUBLIC_CARTEL_CORE_ADDRESS=0xYourCartelCoreAddress
NEXT_PUBLIC_CARTEL_POT_ADDRESS=0xYourCartelPotAddress
NEXT_PUBLIC_CARTEL_SHARES_ADDRESS=0xYourCartelSharesAddress
```

### Update `src/lib/basePay.ts`:

Open the file and change:
```typescript
// OLD (all zeros):
export const CARTEL_CORE_ADDRESS = '0x0000000000000000000000000000000000000000';

// NEW (your deployed address):
export const CARTEL_CORE_ADDRESS = '0xYourCartelCoreAddress';
```

Do the same for POT and SHARES addresses.

---

## Step 8: Test Your Contracts

Let's make sure they work!

1. **Go to BaseScan**: https://sepolia.basescan.org/address/0xYourCoreAddress

2. **Click "Contract" tab** → **"Write Contract"**

3. **Click "Connect to Web3"** → Connect your wallet

4. **Try calling a function**:
   - Find `JOIN_FEE()`
   - Click "Query"
   - Should return `10000` (0.01 USDC in 6 decimals)

✅ **Success!** Your contracts are deployed and working!

---

## Common Issues & Fixes

### Error: "insufficient funds"
**Fix**: Need more Base Sepolia ETH. Get more from faucet.

### Error: "nonce too high"
**Fix**: Reset your wallet:
- Coinbase Wallet → Settings → Advanced → Reset Account

### Error: "contract creation code storage out of gas"
**Fix**: Contracts are too large. This shouldn't happen with our contracts, but if it does, we need to optimize them.

### Verification fails
**Fix**: 
- Make sure you're using the exact same arguments as deployment
- Wait 1 minute after deployment before verifying
- Check BaseScan for the exact error message

---

## Next Steps

Contracts deployed successfully?

✅ **Move to Tutorial 4**: Configure Frontend & Deploy Website

---

## What You've Accomplished

🎉 **Congratulations!** You've:
- Deployed 3 smart contracts to Base blockchain
- Verified them so anyone can read the code
- Configured your app to use them
- Learned about blockchain deployment

Your contracts are now live and permanent on Base Sepolia!

---

**✅ Checkpoint**: Before moving to Tutorial 4:
- [ ] All 3 contracts deployed
- [ ] All 3 contracts verified on BaseScan
- [ ] Contract addresses saved in `.env.local`
- [ ] Contract addresses updated in `basePay.ts`
- [ ] Test function call worked on BaseScan
