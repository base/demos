import type { Balance, CaipNetworkId, ChainNamespace } from '@reown/appkit-common';
type Hex = `0x${string}`;
interface Asset {
    address: `0x${string}` | 'native';
    balance: `0x${string}`;
    type: 'NATIVE' | 'ERC20';
    metadata: Record<string, unknown>;
}
export interface WalletGetAssetsRequest {
    account: Hex;
    assetFilter?: Record<Hex, (Hex | 'native')[]>;
    assetTypeFilter?: ('NATIVE' | 'ERC20')[];
    chainFilter?: Hex[];
}
export type WalletGetAssetsResponse = Record<Hex, Asset[]>;
export declare const ERC7811Utils: {
    /**
     * Creates a Balance object from an ERC7811 Asset object
     * @param asset - Asset object to convert
     * @param chainId - Chain ID in CAIP-2 format
     * @returns Balance object
     */
    createBalance(asset: Asset, chainId: string): Balance;
    /**
     * Converts a hex string to a Balance object
     * @param hex - Hex string to convert
     * @param decimals - Number of decimals to use
     * @returns Balance object
     */
    convertHexToBalance({ hex, decimals }: {
        hex: `0x${string}`;
        decimals: number;
    }): string;
    /**
     * Converts an address to a CAIP-10 address
     * @param address - Address to convert
     * @param chainId - Chain ID in CAIP-2 format
     * @returns CAIP-10 address
     */
    convertAddressToCAIP10Address(address: `0x${string}`, chainId: string): string;
    /**
     *  Creates a CAIP-2 Chain ID from a chain ID and namespace
     * @param chainId  - Chain ID in hex format
     * @param namespace  - Chain namespace
     * @returns
     */
    createCAIP2ChainId(chainId: `0x${string}`, namespace: ChainNamespace): string;
    /**
     * Gets the chain ID in hex format from a CAIP-2 Chain ID
     * @param caip2ChainId - CAIP-2 Chain ID
     * @returns Chain ID in hex format
     */
    getChainIdHexFromCAIP2ChainId(caip2ChainId: CaipNetworkId): `0x${string}`;
    /**
     * Checks if a response is a valid WalletGetAssetsResponse
     * @param response - The response to check
     * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
     */
    isWalletGetAssetsResponse(response: WalletGetAssetsResponse): response is WalletGetAssetsResponse;
    /**
     * Checks if an asset object is valid.
     * @param asset - The asset object to check.
     * @returns True if the asset is valid, false otherwise.
     */
    isValidAsset(asset: Asset): asset is Asset;
};
export {};
