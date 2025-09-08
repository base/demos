# @gemini-wallet/core

Complete SDK for integrating with Gemini Wallet, providing wallet connection, transaction signing, and EVM provider functionality.

## Overview

`@gemini-wallet/core` is a comprehensive wallet SDK that provides everything needed to integrate Gemini Wallet into your application. It includes a complete EVM-compatible provider, wallet connection management, secure storage, and seamless popup-based user interactions.

## Features

- 🔗 **EVM Provider**: Complete Ethereum provider implementation (EIP-1193 compatible)
- 🔒 **Secure Communication**: PostMessage-based cross-origin communication
- 🪟 **Popup Management**: Automatic popup window lifecycle management
- 💾 **Storage Layer**: Persistent storage with localStorage fallback
- 🔄 **Event-Driven**: Promise-based request/response pattern with event emitters
- ⛓️ **Multi-Chain**: Support for Ethereum, Polygon, Base, Arbitrum, and testnets
- 🖊️ **Sign Operations**: Message signing and EIP-712 typed data signing
- 💸 **Transaction Support**: Send transactions with built-in error handling
- 🌐 **Cross-Platform**: Works in web browsers and React Native
- ⚡ **Lightweight**: Minimal dependencies for optimal bundle size

## Installation

```bash
bun add @gemini-wallet/core
# or
npm install @gemini-wallet/core
# or
yarn add @gemini-wallet/core
# or
pnpm add @gemini-wallet/core
```

## ⚠️ YOU MIGHT NOT NEED THIS

**For most applications, you should use Wagmi's built-in Gemini connector instead:**

```typescript
import { gemini } from 'wagmi/connectors';
import { createConfig } from 'wagmi';

const config = createConfig({
  connectors: [
    gemini({
      appMetadata: {
        name: 'My DApp',
        url: 'https://mydapp.com',
      }
    })
  ],
  // ... rest of wagmi config
});
```

> 🎯 **Wagmi Integration**: Gemini Wallet is available as a default connector in Wagmi v2.x+  
> 📚 **Wagmi Docs**: [wagmi.sh/connectors/gemini](https://wagmi.sh/connectors/gemini)  
> ⭐ **Status**: Currently in PR review - will be available soon!

## Usage

This core SDK provides multiple integration levels for advanced use cases:

### 🚀 Level 1: EVM Provider (Recommended for Custom Implementations)

Use when you need direct provider access or aren't using Wagmi:

```typescript
import { GeminiWalletProvider } from '@gemini-wallet/core';

const provider = new GeminiWalletProvider({
  appMetadata: {
    name: 'My DApp',
    url: 'https://mydapp.com'
  },
  chain: { id: 42161 }, // Arbitrum One
});

// Connect and get accounts
const accounts = await provider.request({ 
  method: 'eth_requestAccounts' 
});

// Send transaction
const txHash = await provider.request({
  method: 'eth_sendTransaction',
  params: [{
    from: accounts[0],
    to: '0x742E4C3B7dcD26e7Ca95C0Ad2F38C61f6F02C4c0',
    value: '0x38D7EA4C68000', // 0.001 ETH
  }]
});

// Listen for events
provider.on('accountsChanged', (accounts) => {
  console.log('Accounts changed:', accounts);
});
```

### ⚡ Level 2: Direct Wallet API

Use the wallet class for fine-grained control:

```typescript
import { GeminiWallet } from '@gemini-wallet/core';

const wallet = new GeminiWallet({
  appMetadata: {
    name: 'My DApp',
    url: 'https://mydapp.com'
  },
  chain: { id: 42161 }
});

// Connect
const accounts = await wallet.connect();

// Send transaction with error handling
const result = await wallet.sendTransaction({
  to: '0x742E4C3B7dcD26e7Ca95C0Ad2F38C61f6F02C4c0',
  value: '1000000000000000000', // 1 ETH in wei
});

if (result.error) {
  console.error('Transaction failed:', result.error);
} else {
  console.log('Transaction hash:', result.hash);
}
```

### ⚙️ Level 3: Low-Level Communication

For maximum control over the popup communication:

```typescript
import { Communicator, GeminiSdkEvent } from '@gemini-wallet/core';

const communicator = new Communicator({
  appMetadata: {
    name: 'My DApp',
    url: 'https://mydapp.com'
  }
});

// Send connect request
const response = await communicator.postRequestAndWaitForResponse({
  event: GeminiSdkEvent.SDK_CONNECT,
  requestId: crypto.randomUUID(),
  chainId: 42161,
  origin: window.location.origin
});

console.log('Connected address:', response.data.address);

// Listen for specific events
communicator.onMessage(
  (message) => message.event === GeminiSdkEvent.SDK_DISCONNECT
).then(() => {
  console.log('User disconnected');
});
```

## API Reference

### GeminiWalletProvider

EIP-1193 compatible Ethereum provider implementation.

```typescript
interface GeminiProviderConfig {
  appMetadata: AppMetadata;
  chain: Chain;
  onDisconnectCallback?: () => void;
  storage?: IStorage;
}
```

#### Methods

- `request<T>(args: RpcRequestArgs): Promise<T>` - Send RPC requests
- `disconnect(): Promise<void>` - Disconnect wallet
- `openSettings(): Promise<void>` - Open wallet settings

#### Events

- `accountsChanged` - Emitted when accounts change
- `chainChanged` - Emitted when chain changes  
- `connect` - Emitted on connection
- `disconnect` - Emitted on disconnection

### GeminiWallet

Direct wallet interface for advanced use cases.

```typescript
interface GeminiWalletConfig {
  appMetadata: AppMetadata;
  chain?: Chain;
  onDisconnectCallback?: () => void;
  storage?: IStorage;
}
```

#### Methods

- `connect(): Promise<Address[]>` - Connect to wallet
- `sendTransaction(tx: TransactionRequest): Promise<SendTransactionResponse>` - Send transaction
- `signData(params: SignMessageParameters): Promise<SignMessageResponse>` - Sign message
- `signTypedData(params: SignTypedDataParameters): Promise<SignTypedDataResponse>` - Sign typed data
- `switchChain(params: SwitchChainParameters): Promise<string | null>` - Switch chains
- `openSettings(): Promise<void>` - Open wallet settings

### GeminiStorage

Storage interface for persisting wallet state.

```typescript
interface IStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  storeObject<T>(key: string, item: T): Promise<void>;
  loadObject<T>(key: string, fallback: T): Promise<T>;
}
```

### Communicator

Low-level communication class.

```typescript
interface CommunicatorConfigParams {
  appMetadata: AppMetadata;
  onDisconnectCallback?: () => void;
}
```

#### Methods

- `postMessage(message: GeminiSdkMessage): Promise<void>` - Send message
- `postRequestAndWaitForResponse<M, R>(request: GeminiSdkMessage): Promise<R>` - Send request and wait
- `onMessage<M, R>(predicate: (message: Partial<M>) => boolean): Promise<R>` - Listen for messages
- `waitForPopupLoaded(): Promise<Window>` - Wait for popup to load

### Message Types

#### GeminiSdkEvent

Enumeration of all supported events:

- `POPUP_LOADED` - Popup window has loaded
- `POPUP_UNLOADED` - Popup window was closed
- `POPUP_APP_CONTEXT` - App metadata sent to popup
- `SDK_CONNECT` - Connect wallet request
- `SDK_DISCONNECT` - Disconnect wallet request
- `SDK_SEND_TRANSACTION` - Send transaction request
- `SDK_SIGN_MESSAGE` - Sign message request
- `SDK_SIGN_TYPED_DATA` - Sign typed data request
- `SDK_SWITCH_CHAIN` - Switch chain request
- `ACCOUNTS_CHANGED` - Accounts changed event
- `CHAIN_CHANGED` - Chain changed event
- `DISCONNECT` - Disconnect event

### Supported Chains

Gemini Wallet supports the following networks:

**Mainnets:**
- Ethereum (1)
- Arbitrum One (42161) - Default
- OP Mainnet (10)
- Base (8453)
- Polygon (137)

**Testnets:**
- Sepolia (11155111)
- Arbitrum Sepolia (421614)
- OP Sepolia (11155420)
- Base Sepolia (84532)
- Polygon Amoy (80002)

### Constants

- `SDK_BACKEND_URL`: `"https://keys.gemini.com"`
- `DEFAULT_CHAIN_ID`: `42161` (Arbitrum One)
- `SUPPORTED_CHAIN_IDS`: Array of supported chain IDs
- `POPUP_WIDTH`: `420`
- `POPUP_HEIGHT`: `650`

## Security Considerations

1. **Origin Validation**: All messages are validated against the expected origin
2. **Request ID Matching**: Responses are matched to requests using unique IDs
3. **User Consent**: All actions require explicit user approval in the popup
4. **No Private Keys**: The SDK never handles private keys directly

## Browser Support

- Chrome/Edge 80+
- Firefox 78+
- Safari 14+
- Opera 67+

## Try Gemini Wallet

Experience Gemini Wallet in action:

🔗 **[keys.gemini.com](https://keys.gemini.com)** - Try the wallet interface and see how the SDK integrations work

## Integration Examples

The core SDK enables various integration patterns:
- ✅ EIP-1193 compatible provider for any web3 library
- ✅ Custom storage implementations for mobile platforms  
- ✅ Event-driven architecture with TypeScript support
- ✅ Multi-chain support with automatic chain switching
- ✅ Error handling with user-friendly error messages

## Development

This project uses [Bun](https://bun.sh) as the package manager and build tool.

### Setup

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run tests in watch mode
bun test --watch

# Type checking
bun run typecheck

# Build the package
bun run build

# Development mode (watch mode)
bun run dev
```

### Available Scripts

- `bun run build` - Build the package for production
- `bun run dev` - Build in watch mode for development
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
- `bun run typecheck` - Run TypeScript type checking
- `bun run lint` - Run ESLint (requires configuration)
- `bun run lint:fix` - Fix ESLint issues automatically

### Build Output

The build process generates:
- `dist/index.js` - ESM bundle for Node.js
- `dist/index.d.ts` - TypeScript declarations
- `dist/*.d.ts.map` - Source maps for declarations

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.