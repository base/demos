import { base, baseSepolia } from 'viem/chains';

export const NETWORKS = {
  base: {
    chain: base,
    // USDC on Base mainnet
    usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const,
  },
  'base-sepolia': {
    chain: baseSepolia,
    // USDC on Base Sepolia
    usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as const,
  },
} as const;

export type NetworkKey = keyof typeof NETWORKS;

export const USDC_DECIMALS = 6;

/**
 * EIP-712 domain for USDC's EIP-3009 implementation.
 * Note: `name` must exactly match the token contract's name() — "USD Coin" for
 * USDC on Base. (Other tokens differ: e.g. EURC on Base uses name "EURC".)
 */
export function usdcDomain(chainId: number, usdcAddress: `0x${string}`) {
  return {
    name: 'USD Coin',
    version: '2',
    chainId,
    verifyingContract: usdcAddress,
  } as const;
}

export const TRANSFER_WITH_AUTHORIZATION_TYPES = {
  TransferWithAuthorization: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' },
  ],
} as const;

/** Minimal ABI for submitting the signed authorization. */
export const TRANSFER_WITH_AUTHORIZATION_ABI = [
  {
    type: 'function',
    name: 'transferWithAuthorization',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'validAfter', type: 'uint256' },
      { name: 'validBefore', type: 'uint256' },
      { name: 'nonce', type: 'bytes32' },
      { name: 'v', type: 'uint8' },
      { name: 'r', type: 'bytes32' },
      { name: 's', type: 'bytes32' },
    ],
    outputs: [],
  },
] as const;

/** Maximum authorization lifetime accepted by the relay endpoint (seconds). */
export const MAX_AUTHORIZATION_LIFETIME_SECONDS = 3600;
