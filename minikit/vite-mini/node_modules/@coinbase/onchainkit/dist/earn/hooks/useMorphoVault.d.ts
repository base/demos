import { Address } from 'viem';
export type UseMorphoVaultParams = {
    vaultAddress: Address;
    recipientAddress?: Address;
};
export type UseMorphoVaultReturnType = {
    vaultName: string | undefined;
    status: 'pending' | 'success' | 'error';
    /** Warns users if vault address is invalid */
    error: Error | null;
    /** Underlying asset of the vault */
    asset: {
        address: Address;
        symbol: string | undefined;
        decimals: number | undefined;
    };
    /** User's deposits in the vault, adjusted for decimals */
    balance: string | undefined;
    balanceStatus: 'pending' | 'success' | 'error';
    refetchBalance: () => void;
    /** Total net APY of the vault after all rewards and fees */
    totalApy: number | undefined;
    /** Native rewards of the vault (e.g. USDC if the asset is USDC) */
    nativeApy: number | undefined;
    /** Additional rewards (e.g. MORPHO) */
    rewards: Array<{
        asset: Address;
        assetName: string;
        apy: number;
    }> | undefined;
    /** Vault fee, in percent (e.g. 0.03 for 3%) */
    vaultFee: number | undefined;
    /** Number of decimals of the vault's share tokens (not underlying asset) */
    vaultDecimals: number | undefined;
    /** Total deposits in the vault */
    deposits: string | undefined;
    /** Total liquidity available to borrow in the vault */
    liquidity: string | undefined;
};
export declare function useMorphoVault({ vaultAddress, recipientAddress, }: UseMorphoVaultParams): UseMorphoVaultReturnType;
//# sourceMappingURL=useMorphoVault.d.ts.map