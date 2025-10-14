import { PublicKey } from '@solana/web3.js';

// Base Sepolia (testnet) configuration for devnet-prod bridge
export const SOLANA_CLUSTER: "devnet" = "devnet";
export const BASE_NETWORK = "base-sepolia";

// WSOL address for devnet-prod deployment (verified working)
// Use env var to override if needed for different environments
export const REMOTE_WSOL_ADDR_HEX = 
  (process.env.NEXT_PUBLIC_BASE_WSOL || "0xC5b9112382f3c87AFE8e1A28fa52452aF81085AD").toLowerCase();

console.log("🔧 Using Base WSOL address:", REMOTE_WSOL_ADDR_HEX);
if (!process.env.NEXT_PUBLIC_BASE_WSOL) {
  console.log("✅ Using verified working WSOL address for devnet-prod");
}

export const BASE_SEPOLIA_CONFIG = {
  chainId: 84532,
  name: 'Base Sepolia',
  rpcUrl: 'https://sepolia.base.org',
  blockExplorer: 'https://sepolia.basescan.org',
  
  // Contract addresses from devnet-prod bridge deployment
  bridge: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
  bridgeValidator: '0xa80C07DF38fB1A5b3E6a4f4FAAB71E7a056a4EC7',
  
  // Token addresses
  wrappedSOL: REMOTE_WSOL_ADDR_HEX,
};

// Solana Devnet configuration (devnet-prod deployment)
export const BRIDGE_PROGRAM_ID = "HSvNvzehozUpYhRBuCKq3Fq8udpRocTmGMUYXmCSiCCc";
export const RELAYER_PROGRAM_ID = "ExS1gcALmaA983oiVpvFSVohi1zCtAUTgsLj5xiFPPgL";
export const GAS_FEE_RECEIVER = "BEwzVVw44VLaspWByUML23hbQmo5ndM1NPQAJsvCxC6F";

// Standard gas limit for bridge operations
export const DEFAULT_GAS_LIMIT = BigInt(process.env.NEXT_PUBLIC_GAS_LIMIT ?? "200000");

export const SOLANA_DEVNET_CONFIG = {
  name: 'Solana Devnet',
  rpcUrl: 'https://api.devnet.solana.com',
  blockExplorer: 'https://explorer.solana.com',
  
  // Program addresses from devnet-prod bridge deployment  
  solanaBridge: new PublicKey(BRIDGE_PROGRAM_ID),
  baseRelayerProgram: new PublicKey(RELAYER_PROGRAM_ID),
  gasFeeReceiver: new PublicKey(GAS_FEE_RECEIVER),
  
  // Token addresses
  cdpUsdc: new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'), // CDP USDC on Solana Devnet
  bridgeUsdc: new PublicKey('8KkQRERXdASmXqeWw7sPFB56wLxyHMKc9NPDW64EEL31'), // Bridge USDC (expected by bridge contracts)
  spl: new PublicKey('8KkQRERXdASmXqeWw7sPFB56wLxyHMKc9NPDW64EEL31'), // Default to bridge USDC for bridge operations
  wEth: new PublicKey('DG4ncVRoiSkYBLVUXxCFbVg38RhByjFKTLZi6UFFmZuf'),
  wErc20: new PublicKey('44PhEvftJp57KRNSR7ypGLns1JUKXqAubewi3h5q1TEo'),
};

// Bridge configuration
export const BRIDGE_CONFIG = {
  // Minimum amounts for bridging (in lamports) - removed minimum for SOL
  minBridgeAmount: 0, // No minimum for SOL bridging
  
  // Gas estimates
  estimatedGasLimit: 200000,
  
  // Confirmation requirements
  requiredConfirmations: 12, // Base blocks
  
  // Timeout for bridge operations (in milliseconds)
  bridgeTimeout: 5 * 60 * 1000, // 5 minutes (reduced from 15 - need to verify actual time)
};

// UI Constants
export const UI_CONFIG = {
  maxDecimals: 9, // For SOL (9 decimals)
  defaultSlippage: 0.5, // 0.5%
  refreshInterval: 10000, // 10 seconds
};
