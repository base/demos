

// USDC contract address on Base Mainnet
export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Contract addresses (update after deployment)
export const CARTEL_CORE_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CARTEL_POT_ADDRESS = '0x0000000000000000000000000000000000000000';
export const CARTEL_SHARES_ADDRESS = '0x0000000000000000000000000000000000000000';

// Fee constants (in USDC, 6 decimals)
export const JOIN_FEE = BigInt(0); // FREE for Phase 1 (invite-only)
export const RAID_FEE = BigInt(5000);  // 0.005 USDC

// Paymaster config
export const PAYMASTER_AND_DATA = {
    paymasterAddress: '0x0000000000000000000000000000000000000000', // Base Paymaster address
};

export function formatUSDC(amount: bigint): string {
    return (Number(amount) / 1e6).toFixed(2);
}

export function parseUSDC(amount: string): bigint {
    return BigInt(Math.floor(parseFloat(amount) * 1e6));
}
