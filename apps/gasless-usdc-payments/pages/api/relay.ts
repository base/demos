import type { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, createPublicClient, http, isAddress, parseSignature } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {
  NETWORKS,
  NetworkKey,
  TRANSFER_WITH_AUTHORIZATION_ABI,
  MAX_AUTHORIZATION_LIFETIME_SECONDS,
} from '../../lib/eip3009';

/**
 * Relay endpoint: accepts a signed EIP-3009 authorization and submits it,
 * paying gas on behalf of the user.
 *
 * The signature locks every transfer parameter, so this endpoint cannot
 * redirect funds — but it CAN be griefed into wasting gas. In production add
 * rate limiting and (optionally) an allowlist of recipients.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const relayerKey = process.env.RELAYER_PRIVATE_KEY;
  if (!relayerKey) {
    return res.status(500).json({ error: 'RELAYER_PRIVATE_KEY is not configured' });
  }

  try {
    const { from, to, value, validAfter, validBefore, nonce, signature } = req.body ?? {};

    // --- Validate inputs explicitly; fail loudly, never silently coerce ---
    if (!isAddress(from) || !isAddress(to)) {
      return res.status(400).json({ error: 'Invalid from/to address' });
    }
    if (typeof signature !== 'string' || !signature.startsWith('0x')) {
      return res.status(400).json({ error: 'Missing or malformed signature' });
    }
    if (typeof nonce !== 'string' || !/^0x[0-9a-fA-F]{64}$/.test(nonce)) {
      return res.status(400).json({ error: 'nonce must be a 32-byte hex string' });
    }

    let valueBig: bigint, afterBig: bigint, beforeBig: bigint;
    try {
      valueBig = BigInt(value);
      afterBig = BigInt(validAfter);
      beforeBig = BigInt(validBefore);
    } catch {
      return res.status(400).json({ error: 'value/validAfter/validBefore must be integers' });
    }
    if (valueBig <= 0n) {
      return res.status(400).json({ error: 'value must be positive' });
    }

    // --- Cap authorization lifetime: long-lived authorizations are bearer instruments ---
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (beforeBig <= now) {
      return res.status(400).json({ error: 'Authorization already expired' });
    }
    if (beforeBig - now > BigInt(MAX_AUTHORIZATION_LIFETIME_SECONDS)) {
      return res.status(400).json({
        error: `validBefore too far in the future (max ${MAX_AUTHORIZATION_LIFETIME_SECONDS}s)`,
      });
    }

    const networkKey = (process.env.NETWORK ?? 'base-sepolia') as NetworkKey;
    const network = NETWORKS[networkKey];
    if (!network) {
      return res.status(500).json({ error: `Unsupported NETWORK: ${networkKey}` });
    }

    const account = privateKeyToAccount(relayerKey as `0x${string}`);
    const walletClient = createWalletClient({
      account,
      chain: network.chain,
      transport: http(),
    });
    const publicClient = createPublicClient({ chain: network.chain, transport: http() });

    // --- EOA check: EIP-3009 signatures cannot come from contract accounts ---
    const code = await publicClient.getCode({ address: from });
    if (code && code !== '0x') {
      return res.status(400).json({
        error:
          'from is a smart-contract account. EIP-3009 requires an EOA signature; use a batched-call + paymaster flow for smart wallets instead.',
      });
    }

    const { v, r, s } = parseSignature(signature as `0x${string}`);

    const hash = await walletClient.writeContract({
      address: network.usdc,
      abi: TRANSFER_WITH_AUTHORIZATION_ABI,
      functionName: 'transferWithAuthorization',
      args: [from, to, valueBig, afterBig, beforeBig, nonce as `0x${string}`, Number(v), r, s],
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return res.status(200).json({
      success: receipt.status === 'success',
      transactionHash: hash,
      blockNumber: receipt.blockNumber.toString(),
    });
  } catch (error) {
    console.error('relay error:', error);
    const message = error instanceof Error ? error.message : 'Internal error';
    // Surface revert reasons (e.g. "authorization is used") to the client for debuggability
    return res.status(500).json({ error: message.slice(0, 300) });
  }
}
