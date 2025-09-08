# @farcaster/quick-auth

A client for interacting with a Farcaster Quick Auth server.

## Installation

```sh
npm install @auth-server/client
# or
yarn add @auth-server/client
# or
pnpm add @auth-server/client
```

## Usage

```typescript
import { createClient } from '@farcaster/quick-auth';

// Get a nonce
const domain = 'your-domain.com';
const client = createClient();
const nonce = await client.getNonce();

// Generate a SIWF message using nonce and domain (not shown)

// Verify a SIWF message and get a JWT token
const token = await client.verifySiwf({
  message,
  signature,
  domain
});

// Use the return JWT as an Bearer token and validate on your server
const token = await client.verifyToken({
  token,
  domain
});
```
