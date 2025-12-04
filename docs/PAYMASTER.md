# Paymaster (Gasless Transactions)

## ✅ Paymaster Configuration

### WagmiProvider Setup
**Location**: `src/components/providers/WagmiProvider.tsx`

```typescript
import { baseAccount } from "wagmi/connectors";

export const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    farcasterMiniApp(), 
    baseAccount({
      appName: METADATA.name,
      appLogoUrl: METADATA.iconImageUrl,
      // Paymaster configuration for gasless transactions
      paymaster: {
        url: process.env.NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL || 'https://paymaster.base.org',
        context: {
          policyId: process.env.NEXT_PUBLIC_PAYMASTER_POLICY_ID,
        },
      },
    })
  ],
});
```

**Environment Variables Required**:
```env
NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL=https://paymaster.base.org
NEXT_PUBLIC_PAYMASTER_POLICY_ID=your_policy_id
```

## ✅ Gasless Transaction Flow

### Component: `GaslessTransaction.tsx`
**Location**: `src/components/GaslessTransaction.tsx`

**Features**:
- Automatically attempts gasless transaction via paymaster
- Falls back to regular transaction if paymaster fails
- User-friendly error messages
- Loading states for both modes

**Usage Example** (Join Cartel):
```typescript
<GaslessTransaction
  action="join"
  args={[referrerAddress || ethers.ZeroAddress]}
  onSuccess={() => {
    console.log('Join successful!');
    onJoin();
  }}
  onError={(error) => {
    console.error('Join failed:', error);
  }}
/>
```

## 📋 Transaction Logs (Example)

### Successful Gasless Transaction (join):
```
[Paymaster] Attempting gasless transaction
  Function: join(address referrer)
  Args: ['0x5678...']
  Paymaster: https://paymaster.base.org
  
[Paymaster] Sponsorship approved
  PolicyId: pol_abc123
  EstimatedGas: 120,000
  SponsoredAmount: 0.0024 ETH
  
[Transaction] Submitted
  TxHash: 0xabc123def456...
  From: 0x1234...
  To: 0xCartelCore...
  Gas: 0 (Sponsored)
  
[Transaction] Confirmed
  Block: 12345678
  Status: Success
  GasPaidBy: Paymaster (0xPaymaster...)
  UserGasCost: 0 ETH ✨
  
[Event] Join emitted
  Player: 0x1234...
  Referrer: 0x5678...
  Shares: 100
```

### Successful Gasless Transaction (raid):
```
[Paymaster] Attempting gasless transaction
  Function: raid(address target)
  Args: ['0x9abc...']
  Paymaster: https://paymaster.base.org
  
[Paymaster] Sponsorship approved
  PolicyId: pol_abc123
  EstimatedGas: 95,000
  SponsoredAmount: 0.0019 ETH
  
[Transaction] Submitted
  TxHash: 0xdef456ghi789...
  From: 0x1234...
  To: 0xCartelCore...
  Gas: 0 (Sponsored)
  
[Transaction] Confirmed
  Block: 12345679
  Status: Success
  GasPaidBy: Paymaster (0xPaymaster...)
  UserGasCost: 0 ETH ✨
  
[Event] Raid emitted
  Raider: 0x1234...
  Target: 0x9abc...
  AmountStolen: 50
  Success: true
```

## ⚠️ Paymaster Failure Fallback

### Scenario: Paymaster Unavailable

**Error Detection**:
```typescript
catch (paymasterError: any) {
  if (paymasterError?.message?.includes('paymaster') || 
      paymasterError?.message?.includes('sponsor')) {
    // Paymaster-specific error
    setErrorMessage('Gasless transaction unavailable. Fallback to regular transaction?');
    setUsePaymaster(false);
  }
}
```

**UI Behavior**:
```
┌─────────────────────────────────────────┐
│  ⚠️  Gasless transaction unavailable.   │
│      Fallback to regular transaction?   │
│                                         │
│  You will need to pay gas fees for     │
│  this transaction.                      │
└─────────────────────────────────────────┘

[ 💳 Join ]  ← Button text changes
```

**Transaction Log (Fallback Mode)**:
```
[Paymaster] Failed
  Error: Paymaster policy limit reached
  
[Fallback] Using regular transaction
  EstimatedGas: 120,000
  GasPrice: 0.1 gwei
  UserGasCost: ~0.0024 ETH
  
[Transaction] Submitted
  TxHash: 0xghi789jkl012...
  From: 0x1234...
  To: 0xCartelCore...
  Gas: 120,000
  GasPrice: 0.1 gwei
  
[Transaction] Confirmed
  Block: 12345680
  Status: Success
  GasPaidBy: User (0x1234...)
  UserGasCost: 0.0024 ETH
```

## 🎨 UI States

### 1. Gasless Mode (Default)
```
┌─────────────────────────────────────────┐
│  [ ⚡ Gasless Join ]                    │
│  ✨ Gas fees sponsored by Paymaster     │
└─────────────────────────────────────────┘
```

### 2. Preparing Transaction
```
┌─────────────────────────────────────────┐
│  [ Preparing... ]                       │
└─────────────────────────────────────────┘
```

### 3. Confirming Transaction
```
┌─────────────────────────────────────────┐
│  [ Confirming... ]                      │
└─────────────────────────────────────────┘
```

### 4. Paymaster Failed (Fallback Prompt)
```
┌─────────────────────────────────────────┐
│  ⚠️  Gasless transaction unavailable.   │
│      Fallback to regular transaction?   │
│                                         │
│  You will need to pay gas fees for     │
│  this transaction.                      │
├─────────────────────────────────────────┤
│  [ 💳 Join ]                            │
└─────────────────────────────────────────┘
```

### 5. Transaction Failed
```
┌─────────────────────────────────────────┐
│  Transaction failed. Please try again.  │
│  Error: Insufficient funds              │
└─────────────────────────────────────────┘
```

## 🔧 Configuration & Testing

### Setup Checklist
1. ✅ Create Coinbase Developer Platform account
2. ✅ Configure paymaster policy
3. ✅ Get policy ID and add to `.env`
4. ✅ Test gasless transactions on Base testnet
5. ✅ Monitor paymaster usage/limits
6. ✅ Set up fallback flow
7. ✅ Deploy to production

### Testing Gasless Flows

**Test Join**:
```bash
# 1. User clicks "Join Cartel"
# 2. Paymaster sponsors gas
# 3. Transaction submitted with 0 gas cost
# 4. Verify transaction on Base Explorer:
#    - Gas paid by: Paymaster address
#    - User gas cost: 0
```

**Test Raid**:
```bash
# 1. User selects target and clicks "Raid"
# 2. Paymaster sponsors gas
# 3. Transaction submitted with 0 gas cost
# 4. Verify transaction on Base Explorer:
#    - Gas paid by: Paymaster address
#    - User gas cost: 0
```

**Test Fallback**:
```bash
# 1. Simulate paymaster failure (disable in config)
# 2. User clicks "Join Cartel"
# 3. Error message appears
# 4. Button changes to regular transaction mode
# 5. User confirms and pays gas normally
```

### Base Explorer Verification

**Gasless Transaction**:
```
Transaction Details
─────────────────────
Hash: 0xabc123...
Status: ✓ Success
From: 0x1234... (User)
To: 0xCartelCore...
Value: 0 ETH
Gas Used: 120,000
Gas Price: 0.1 gwei
Transaction Fee: 0 ETH ✨ (Paid by Paymaster)
Paymaster: 0xPaymaster...
```

**Regular Transaction (Fallback)**:
```
Transaction Details
─────────────────────
Hash: 0xdef456...
Status: ✓ Success
From: 0x1234... (User)
To: 0xCartelCore...
Value: 0 ETH
Gas Used: 120,000
Gas Price: 0.1 gwei
Transaction Fee: 0.0024 ETH (Paid by User)
```

## 📊 Paymaster Monitoring

### Metrics to Track
- Total sponsored transactions
- Gas savings for users
- Paymaster balance/credits
- Failure rate
- Fallback usage percentage

### Alerts
- Low paymaster balance
- High failure rate (>5%)
- Daily spend exceeds budget
- Policy limit approaching

## Production Considerations

1. **Budget Management**: Set daily/monthly spending limits
2. **User Limits**: Consider per-user transaction caps
3. **Abuse Prevention**: Monitor for suspicious patterns
4. **Fallback Always Ready**: Ensure regular transactions work
5. **User Communication**: Clear messaging about sponsored gas
6. **Monitoring**: Track usage and costs via CDP dashboard
