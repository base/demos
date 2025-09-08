import { Address } from 'viem';
export type MorphoVaultApiResponse = {
    data: {
        vaultByAddress: {
            address: Address;
            symbol: string;
            name: string;
            creationBlockNumber: number;
            creationTimestamp: number;
            creatorAddress: string;
            whitelisted: boolean;
            asset: {
                id: string;
                address: Address;
                decimals: number;
                symbol: string;
            };
            chain: {
                id: number;
                network: string;
            };
            state: {
                id: string;
                apy: number;
                netApy: number;
                netApyWithoutRewards: number;
                totalAssets: number;
                totalAssetsUsd: number;
                fee: number;
                timelock: number;
                rewards: Array<{
                    amountPerSuppliedToken: string;
                    supplyApr: number;
                    yearlySupplyTokens: string;
                    asset: {
                        address: Address;
                        name: string;
                        decimals: number;
                    };
                }>;
            };
            liquidity: {
                underlying: string;
            };
        };
    };
    errors: Array<{
        message: string;
        status: string;
    }> | null;
};
export declare function fetchMorphoApy(vaultAddress: string): Promise<{
    address: Address;
    symbol: string;
    name: string;
    creationBlockNumber: number;
    creationTimestamp: number;
    creatorAddress: string;
    whitelisted: boolean;
    asset: {
        id: string;
        address: Address;
        decimals: number;
        symbol: string;
    };
    chain: {
        id: number;
        network: string;
    };
    state: {
        id: string;
        apy: number;
        netApy: number;
        netApyWithoutRewards: number;
        totalAssets: number;
        totalAssetsUsd: number;
        fee: number;
        timelock: number;
        rewards: Array<{
            amountPerSuppliedToken: string;
            supplyApr: number;
            yearlySupplyTokens: string;
            asset: {
                address: Address;
                name: string;
                decimals: number;
            };
        }>;
    };
    liquidity: {
        underlying: string;
    };
}>;
//# sourceMappingURL=fetchMorphoApy.d.ts.map