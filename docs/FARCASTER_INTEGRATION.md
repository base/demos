# Farcaster Integration

## ✅ 1. Sign-In with Farcaster

### Implementation
**Location**: `src/components/actions/signin.tsx`

**Flow**:
```typescript
import { useAuthenticate } from '@farcaster/miniapp-core';

const { signIn } = useAuthenticate();

// 1. Get nonce from backend
const nonce = await getNonce();

// 2. Trigger sign-in
const result = await signIn({ nonce });

// 3. Verify signature on backend
const verifyResult = await appClient.verifySignInMessage({
  message: result.message,
  signature: result.signature,
  domain: window.location.host,
  nonce: result.nonce,
});
```

**Tokens Exchanged**:
```json
{
  "message": "Sign in to Base Cartel\n\nNonce: abc123def456...",
  "signature": "0x1234567890abcdef...",
  "fid": 3621,
  "username": "kingpin",
  "bio": "Cartel boss",
  "pfp_url": "https://i.imgur.com/...",
  "custody_address": "0x1234...",
  "verified_addresses": {
    "eth_addresses": ["0x5678..."],
    "sol_addresses": []
  }
}
```

**Verification Response**:
```json
{
  "valid": true,
  "fid": 3621,
  "custody_address": "0x1234...",
  "timestamp": "2025-11-20T05:14:17.000Z"
}
```

## ✅ 2. Farcaster Frames

### Join Frame
**Metadata Endpoint**: `GET /api/frames/join`

**Frame JSON**:
```json
{
  "version": "vNext",
  "image": "https://yourapp.com/api/frames/join/image",
  "buttons": [
    {
      "label": "Join the Cartel",
      "action": "post",
      "target": "https://yourapp.com/api/frames/join/action"
    },
    {
      "label": "View Details",
      "action": "link",
      "target": "https://yourapp.com"
    }
  ],
  "postUrl": "https://yourapp.com/api/frames/join/action"
}
```

**Action Handler**: `POST /api/frames/join/action`

**Request** (from Farcaster):
```json
{
  "untrustedData": {
    "fid": 3621,
    "buttonIndex": 1,
    "castId": {
      "fid": 12345,
      "hash": "0xabc..."
    }
  },
  "trustedData": {
    "messageBytes": "..."
  }
}
```

**Response**:
```json
{
  "version": "vNext",
  "image": "https://yourapp.com/api/frames/join/success?fid=3621",
  "buttons": [
    {
      "label": "Open App",
      "action": "link",
      "target": "https://yourapp.com?ref=3621"
    }
  ]
}
```

**How Invoked**:
1. User shares Base Cartel app link in feed
2. Link automatically renders as Frame
3. User sees "Join the Cartel" button in their feed
4. Click triggers `/api/frames/join/action`
5. Success image displayed with "Open App" link

### Raid Frame
**Metadata Endpoint**: `GET /api/frames/raid`

**Frame JSON**:
```json
{
  "version": "vNext",
  "image": "https://yourapp.com/api/frames/raid/image",
  "buttons": [
    {
      "label": "Execute Raid ⚔️",
      "action": "post",
      "target": "https://yourapp.com/api/frames/raid/action"
    },
    {
      "label": "View Leaderboard",
      "action": "link",
      "target": "https://yourapp.com?view=leaderboard"
    }
  ],
  "postUrl": "https://yourapp.com/api/frames/raid/action",
  "input": {
    "text": "Target address (0x...)"
  }
}
```

**Action Handler**: `POST /api/frames/raid/action`

**Request**:
```json
{
  "untrustedData": {
    "fid": 3621,
    "buttonIndex": 1,
    "inputText": "0x9abc..."
  }
}
```

**Response**:
```json
{
  "version": "vNext",
  "image": "https://yourapp.com/api/frames/raid/result?fid=3621&target=0x9abc...",
  "buttons": [
    {
      "label": "Open App",
      "action": "link",
      "target": "https://yourapp.com?action=raid&fid=3621"
    },
    {
      "label": "Raid Again",
      "action": "post",
      "target": "https://yourapp.com/api/frames/raid"
    }
  ]
}
```

## ✅ 3. Auto-Posts with Neynar API

### Service Implementation
**Location**: `src/lib/neynar-service.ts`

**API Configuration**:
```env
NEYNAR_API_KEY=your_neynar_api_key
NEYNAR_SIGNER_UUID=your_signer_uuid
```

### Raid Event Auto-Post

**Cast Template (Success)**:
```
⚔️ RAID SUCCESSFUL!

kingpin.eth just raided shadowboss.base and stole 50 shares!

The cartel grows stronger. 💪

#FarcasterCartel
```

**API Call**:
```typescript
await neynarService.postRaidEvent(
  'kingpin.eth',
  'shadowboss.base',
  50,
  true
);
```

**API Request**:
```json
POST https://api.neynar.com/v2/farcaster/cast
Headers:
  Content-Type: application/json
  api_key: your_neynar_api_key

Body:
{
  "signer_uuid": "abc123-def456-...",
  "text": "⚔️ RAID SUCCESSFUL!\n\nkingpin.eth just raided shadowboss.base and stole 50 shares!\n\nThe cartel grows stronger. 💪\n\n#FarcasterCartel",
  "embeds": [
    { "url": "https://yourapp.com?action=raid" }
  ],
  "channel_id": "farcaster-cartel"
}
```

**API Response**:
```json
{
  "cast": {
    "hash": "0xabc123def456...",
    "thread_hash": "0xabc123def456...",
    "parent_hash": null,
    "parent_url": null,
    "root_parent_url": null,
    "parent_author": {
      "fid": null
    },
    "author": {
      "fid": 12345,
      "username": "cartelbot",
      "display_name": "Base Cartel",
      "pfp_url": "https://...",
      "verified_addresses": {}
    },
    "text": "⚔️ RAID SUCCESSFUL!...",
    "timestamp": "2025-11-20T05:14:17.000Z",
    "embeds": [
      {
        "url": "https://yourapp.com?action=raid"
      }
    ]
  }
}
```

**Sample Posted Cast**:
```
[Posted by @cartelbot in /farcaster-cartel]

⚔️ RAID SUCCESSFUL!

kingpin.eth just raided shadowboss.base and stole 50 shares!

The cartel grows stronger. 💪

#FarcasterCartel

[Embedded: https://yourapp.com?action=raid]
```

### Betrayal Event Auto-Post

**Cast Template**:
```
🩸 BETRAYAL!

whale.eth has betrayed the cartel and walked away with 250 USDC!

Trust no one. 🗡️

#FarcasterCartel #Betrayal
```

**API Call**:
```typescript
await neynarService.postBetrayalEvent('whale.eth', 250);
```

**Sample Posted Cast**:
```
[Posted by @cartelbot in /farcaster-cartel]

🩸 BETRAYAL!

whale.eth has betrayed the cartel and walked away with 250 USDC!

Trust no one. 🗡️

#FarcasterCartel #Betrayal

[Embedded: https://yourapp.com]
```

### Season Event Auto-Post

**Cast Template (Season Start)**:
```
🎭 SEASON 2 HAS BEGUN!

A new era starts today. Join the cartel and climb the ranks.

Who will be the kingpin? 👑

#FarcasterCartel #Season2
```

**API Call**:
```typescript
await neynarService.postSeasonEvent(2, 'start');
```

**Sample Posted Cast**:
```
[Posted by @cartelbot in /farcaster-cartel]

🎭 SEASON 2 HAS BEGUN!

A new era starts today. Join the cartel and climb the ranks.

Who will be the kingpin? 👑

#FarcasterCartel #Season2

[Embedded: https://yourapp.com?view=leaderboard]
```

**Cast Template (Season End)**:
```
🏆 SEASON 1 HAS ENDED!

Congratulations to all survivors. Check the final leaderboard to see who dominated.

Season 2 begins soon. 🔥

#FarcasterCartel
```

## API Logs Example

### Complete Flow (Raid Event → Auto-Post)

```
[Event Listener] Raid event detected
  Raider: 0x1234... (kingpin.eth)
  Target: 0x5678... (shadowboss.base)
  Amount Stolen: 50
  Success: true

[Neynar Service] Preparing cast
  Template: Raid Success
  Raider: kingpin.eth
  Target: shadowboss.base
  Shares: 50

[Neynar API] POST /v2/farcaster/cast
  Request ID: req_abc123
  Timestamp: 2025-11-20T05:14:17.000Z

[Neynar API] Response 200 OK
  Cast Hash: 0xdef456ghi789...
  Channel: farcaster-cartel
  Author FID: 12345

[Neynar Service] Cast posted successfully
  URL: https://warpcast.com/cartelbot/0xdef456ghi789...

[Event Listener] Auto-post complete
```

## Environment Variables

**Required**:
```env
# Neynar API
NEYNAR_API_KEY=your_neynar_api_key
NEYNAR_SIGNER_UUID=your_signer_uuid

# App URLs (for Frame embeds)
NEXT_PUBLIC_URL=https://yourapp.com
```

## Testing Auto-Posts

1. **Get Neynar API Key**: https://neynar.com
2. **Create Signer**: Use Neynar dashboard
3. **Test Cast**:
   ```typescript
   await neynarService.postCast({
     text: "Test cast from Base Cartel!",
     embeds: [{ url: "https://yourapp.com" }]
   });
   ```
4. **Verify on Warpcast**: Check if cast appears in channel

## Integration with Event Listener

```typescript
// scripts/event-listener.ts
import { neynarService } from '../src/lib/neynar-service';

// Subscribe to Raid events
contract.on('Raid', async (raider, target, amountStolen, success) => {
  console.log('[Event] Raid detected');
  
  // Post to Farcaster
  try {
    await neynarService.postRaidEvent(
      raider,
      target,
      Number(amountStolen),
      success
    );
  } catch (error) {
    console.error('[Neynar] Failed to post:', error);
  }
});
```

