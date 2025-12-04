# Tutorial 2: Create All Required Accounts

**Time needed**: 45 minutes  
**Difficulty**: Beginner  
**Cost**: Free (for now)

You'll need accounts on several platforms. This tutorial walks you through creating each one and explains what it's for.

---

## Account 1: GitHub (Code Storage)

**Purpose**: Store your code and connect to Vercel for deployment.

### Steps:

1. **Go to**: https://github.com
2. **Click** "Sign up" (top right)
3. **Enter**:
   - Email address
   - Password (make it strong!)
   - Username (choose something professional, like: your-name-dev)
4. **Verify** your email
5. **Choose** "Free" plan

✅ **Done!** Keep this tab open.

---

## Account 2: Vercel (Website Hosting)

**Purpose**: Host your Base Cartel website so people can use it.

### Steps:

1. **Go to**: https://vercel.com
2. **Click** "Sign Up"
3. **Choose** "Continue with GitHub"
4. **Authorize** Vercel to access your GitHub
5. **Skip** any project imports for now

✅ **Done!** Vercel is now connected to your GitHub.

---

## Account 3: Coinbase Developer Platform

**Purpose**: Get API keys for Base Pay (payment system) and Paymaster (free gas).

### Steps:

1. **Go to**: https://www.coinbase.com/developer-platform
2. **Click** "Get Started" or "Sign In"
3. **Create account** or **sign in** with existing Coinbase account
4. **Verify** your email and phone (required for API access)

### Get your API Keys:

1. **Create a new project**:
   - Click "Create Project"
   - Name: "Base Cartel"
   - Click "Create"

2. **Get CDP API Key**:
   - Go to "API Keys" tab
   - Click "Create API Key"
   - Name: "Base Cartel Production"
   - **SAVE THIS KEY** - Copy it to a notepad (you can't see it again!)

3. **Set up Paymaster** (for gasless transactions):
   - Click "Paymaster" in the left menu
   - Go to the "Configuration" tab
   - **Enable** the Paymaster (toggle switch)
   - **Copy the "Paymaster Service URL"** (or RPC URL) -> This goes in `PAYMASTER_URL`
   - Look for a **"Policy ID"** (usually under the URL or in settings). 
     - *Note: If you can't find a specific "Policy ID", it might be part of the URL (e.g., the last part). For now, just copy the URL.*
   - **Allowlist Contracts** (Optional for now, but good to know):
     - You can add your contract addresses here later to only allow gasless txs for YOUR app.

✅ **Done!** Save these in a secure place:
```
CDP_API_KEY: ck_live_XXXXXXXXXXXXX
PAYMASTER_POLICY_ID: policy_XXXXXXXXXXXXX
PAYMASTER_URL: https://paymaster.base.org/v1/...
```

---

## Account 4: WalletConnect

**Purpose**: Allow users to connect their crypto wallets to your app.

### Steps:

1. **Go to**: https://cloud.walletconnect.com
2. **Click** "Get Started"
3. **Sign up** with email or GitHub
4. **Create a new project**:
   - Click "Create Project"
   - Name: "Base Cartel"
   - Type: "App"
   - Platform: "Web"

5. **Get your Project ID**:
   - It's shown on your project dashboard
   - Looks like: `a1b2c3d4e5f6g7h8i9j0`
   - **Copy this to your notepad**

✅ **Done!** Save:
```
WC_PROJECT_ID: a1b2c3d4e5f6g7h8i9j0
```

---

## Account 5: Neynar (Farcaster API)

**Purpose**: Post automated messages to Farcaster when players raid/betray.

### Steps:

1. **Go to**: https://neynar.com
2. **Click** "Sign up"
3. **Sign in** with your Farcaster account (Warpcast)
4. **Create API Key**:
   - Go to Dashboard
   - Click "API Keys"
   - Click "Create New Key"
   - Name: "Base Cartel"
   - **Copy the API Key** to notepad

5. **Create Signer (The easy way)**:
   - We made a script to help you because the website is tricky.
   - Open your terminal in VS Code.
   - Run: `node scripts/create-neynar-signer.js`
   - Paste your **Neynar API Key** when asked.
   - It will give you a **Signer UUID** and a **Link**.
   - **Open the link** on your phone to approve the signer in Warpcast.
   - **Copy the Signer UUID** to your notepad.

✅ **Done!** Save:
```
NEYNAR_API_KEY: neynar_XXXXXXXXXXXXX
NEYNAR_SIGNER_UUID: uuid-XXXX-XXXX-XXXX-XXXX
```

---

## Account 6: Get Base Sepolia ETH (for testing)

**Purpose**: Deploy smart contracts to Base testnet (practice network).

### Steps:

1. **Install Coinbase Wallet** (if you don't have one):
   - Go to: https://www.coinbase.com/wallet
   - Download for your device
   - Create a new wallet
   - **CRITICAL**: Write down your recovery phrase on paper and keep it VERY safe!

2. **Get your wallet address**:
   - Open Coinbase Wallet
   - Click "Receive"
   - Copy your Ethereum address (starts with 0x...)
   - **Save this** - you'll need it later

3. **Get free Sepolia ETH**:
   - Go to: https://sepoliafaucet.com
   - Enter your wallet address
   - Complete captcha
   - Click "Send Me ETH"

4. **Bridge to Base Sepolia**:
   - Go to: https://bridge.base.org
   - Connect your wallet
   - Switch to "Testnet"
   - Bridge your Sepolia ETH to Base Sepolia

✅ **Done!** You should now have ~0.5 Base Sepolia ETH (test money, no real value).

---

## Summary: All Your Accounts

Keep this information in a **secure** place (like a password manager):

```
ACCOUNTS CREATED:
=================

GitHub:
- Username: your-username
- Email: your-email@example.com

Vercel:
- Connected to GitHub ✓

Coinbase Developer Platform:
- CDP_API_KEY: ck_live_XXXXXXXXXXXXX
- PAYMASTER_POLICY_ID: policy_XXXXXXXXXXXXX
- PAYMASTER_URL: https://paymaster.base.org/v1/...

WalletConnect:
- WC_PROJECT_ID: a1b2c3d4e5f6g7h8i9j0

Neynar:
- NEYNAR_API_KEY: neynar_XXXXXXXXXXXXX
- NEYNAR_SIGNER_UUID: uuid-XXXX-XXXX-XXXX-XXXX

Wallet:
- Address: 0xYourWalletAddressHere
- Has Base Sepolia ETH: ✓
```

---

## ⚠️ SECURITY WARNINGS

**NEVER share**:
- Your wallet recovery phrase (12-24 words)
- Your private keys
- Your API keys
- Your Coinbase Developer Platform credentials

**If someone asks for these - it's a SCAM!**

**Safe to share**:
- Your wallet address (0x...)
- Your GitHub username
- Your app's URL after deployment

---

## Next Steps

Once all accounts are created:

✅ **Move to Tutorial 3**: Deploy Smart Contracts

---

## Troubleshooting

**Can't create Coinbase Developer account?**
- Make sure you verify your email
- Some regions need phone verification
- Contact Coinbase support if stuck

**WalletConnect project ID not showing?**
- Wait a few minutes after creating project
- Refresh the page
- Check the "Settings" tab

**Didn't receive Sepolia ETH?**
- Try a different faucet: https://www.base.org/faucet
- Wait 5-10 minutes
- Check your wallet on Base Sepolia network

---

**✅ Checkpoint**: Before moving to Tutorial 3, confirm you have:
- [ ] GitHub account created
- [ ] Vercel connected to GitHub
- [ ] Coinbase Developer Platform API key saved
- [ ] WalletConnect Project ID saved
- [ ] Neynar API key and Signer UUID saved
- [ ] Wallet with Base Sepolia ETH
- [ ] All keys saved in a secure place

