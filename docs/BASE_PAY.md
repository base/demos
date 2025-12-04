# Base Pay Integration

## ✅ Payment API Endpoints

### 1. POST /api/pay/join
**Location**: `src/app/api/pay/join/route.ts`

**Request Body**:
```json
{
  "playerAddress": "0x1234...",
  "referrerAddress": "0x5678..." // optional
}
```

**Response (Initial)**:
```json
{
  "success": true,
  "metadata": {
    "action": "join",
    "playerAddress": "0x1234...",
    "referrerAddress": "0x5678...",
    "amount": "10000000",
    "currency": "USDC",
    "contractAddress": "0xCartelCore...",
    "timestamp": "2025-11-20T05:14:17.000Z"
  },
  "paymentUrl": "/api/pay/join/confirm"
}
```

**Response (After Payment)**:
```json
{
  "success": true,
  "message": "Payment verified. Join transaction can proceed.",
  "metadata": { ... },
  "contractAction": {
    "contract": "0xCartelCore...",
    "function": "join",
    "args": ["0x5678..."]
  }
}
```

### 2. POST /api/pay/raid
**Location**: `src/app/api/pay/raid/route.ts`

**Request Body**:
```json
{
  "raiderAddress": "0x1234...",
  "targetAddress": "0x9abc...",
  "txHash": "0xdef..." // optional, for verification
}
```

**Metadata Response**:
```json
{
  "action": "raid",
  "raiderAddress": "0x1234...",
  "targetAddress": "0x9abc...",
  "amount": "5000000",
  "currency": "USDC",
  "contractAddress": "0xCartelCore...",
  "timestamp": "2025-11-20T05:14:17.000Z"
}
```

### 3. POST /api/pay/betray
**Location**: `src/app/api/pay/betray/route.ts`

**Request Body**:
```json
{
  "traitorAddress": "0x1234...",
  "txHash": "0xdef..." // optional
}
```

**Metadata Response**:
```json
{
  "action": "betray",
  "traitorAddress": "0x1234...",
  "amount": "0",
  "currency": "USDC",
  "contractAddress": "0xCartelCore...",
  "timestamp": "2025-11-20T05:14:17.000Z",
  "warning": "This action is irreversible and will burn all your shares"
}
```

## ✅ Base Pay SDK Integration

### Component: `BasePay.tsx`
**Location**: `src/components/wallet/BasePay.tsx`

**SDK Usage**:
```typescript
import { BasePayButton } from '@base-org/account-ui/react';
import { pay, getPaymentStatus } from '@base-org/account';

// Initiate payment
const result = await pay({
  amount: '10.00',
  currency: 'USDC',
  recipient: CARTEL_POT_ADDRESS,
  metadata: {
    action: 'join',
    playerAddress: userAddress,
  }
});

// Check status
const status = await getPaymentStatus({ transactionId: result.id });
```

**Integration Flow**:
1. User clicks "Join Cartel" button
2. `BasePayButton` triggers payment UI
3. Payment SDK processes USDC transfer
4. Success callback triggers `/api/pay/join` with `txHash`
5. API verifies transaction on-chain
6. Frontend calls contract `join()` function
7. UI updates with new shares

## ✅ Environment Variables

**Required** (in `.env` or `.env.local`):
```env
# Base Pay
NEXT_PUBLIC_BASE_PAY_PAYMASTER_URL=https://paymaster.base.org
NEXT_PUBLIC_CDP_API_KEY=your_coinbase_developer_platform_api_key
BASE_PAY_WEBHOOK_SECRET=your_webhook_secret

# Contracts
NEXT_PUBLIC_CARTEL_CORE_ADDRESS=0x...
NEXT_PUBLIC_CARTEL_POT_ADDRESS=0x...
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# RPC
BASE_RPC_URL=https://mainnet.base.org
```

**Security**: `.env` files are in `.gitignore` to prevent committing secrets.

## ✅ Payment Success Callbacks

### Frontend Flow (`JoinCartel.tsx` example):
```typescript
const handleJoinClick = async () => {
  try {
    // 1. Initiate payment via Base Pay
    const paymentResult = await pay({
      amount: formatUSDC(JOIN_FEE),
      currency: 'USDC',
      recipient: CARTEL_POT_ADDRESS,
    });

    // 2. Wait for payment confirmation
    const status = await getPaymentStatus({ 
      transactionId: paymentResult.id 
    });

    if (status.status === 'completed') {
      // 3. Verify payment on backend
      const response = await fetch('/api/pay/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerAddress: address,
          referrerAddress,
          txHash: paymentResult.transactionId,
        }),
      });

      const { contractAction } = await response.json();

      // 4. Execute contract write
      const tx = await writeContract({
        address: contractAction.contract,
        abi: CartelCoreABI,
        functionName: contractAction.function,
        args: contractAction.args,
      });

      // 5. Update UI
      await haptics.success();
      onJoin();
    }
  } catch (error) {
    // Error handling (see below)
  }
};
```

## ✅ Error Handling

### API Level:
```typescript
try {
  // ... payment processing
} catch (error) {
  return NextResponse.json(
    { 
      error: 'Payment processing failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 'PAYMENT_ERROR'
    },
    { status: 500 }
  );
}
```

### Frontend Level (`BasePay.tsx`):
```typescript
const [paymentState, setPaymentState] = useState<PaymentState>({
  status: 'idle',
  message: '',
});

// On error
setPaymentState({
  status: 'failed',
  message: 'Payment failed. Please try again or contact support.',
  timestamp: new Date(),
});

// UI shows error card
{paymentState.status === 'failed' && (
  <div className="bg-red-50 border border-red-200 p-4 rounded">
    <p className="text-red-900">{paymentState.message}</p>
    <button onClick={onReset}>Try Again</button>
  </div>
)}
```

### User-Facing Error Messages:
- **Payment Timeout**: "Payment is taking longer than expected. Please check your transaction status."
- **Insufficient Funds**: "Insufficient USDC balance. Please add funds and try again."
- **Transaction Failed**: "Transaction failed. Please try again or contact support if the issue persists."
- **Network Error**: "Network error. Please check your connection and retry."

## Transaction Examples

### Join Transaction Log:
```
[Payment] Initiating join payment
  Amount: 10 USDC
  From: 0x1234...
  To: 0xCartelPot...
  
[Payment] Payment completed
  TxHash: 0xabc123...
  Status: Success
  
[API] Verifying payment
  Endpoint: /api/pay/join
  TxHash: 0xabc123...
  
[API] Payment verified
  Metadata: { action: 'join', player: '0x1234...' }
  
[Contract] Executing join()
  Contract: 0xCartelCore...
  Function: join(address referrer)
  Args: ['0x5678...']
  
[Contract] Join successful
  TxHash: 0xdef456...
  Shares minted: 100
  Event: Join(0x1234..., 0x5678..., 100, 10000000)
  
[UI] Updated
  hasJoined: true
  shares: 100
```

## Production Deployment

1. **Set Environment Variables** in Vercel/Railway dashboard
2. **Deploy Contracts** to Base Mainnet
3. **Update Contract Addresses** in `.env`
4. **Configure Paymaster** with Coinbase CDP
5. **Test Payment Flow** on testnet first
6. **Monitor Transactions** via Base Explorer
7. **Set up Alerts** for failed payments (Sentry)
