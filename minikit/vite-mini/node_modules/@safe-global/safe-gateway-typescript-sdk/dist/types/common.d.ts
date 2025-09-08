export type AddressEx = {
    value: string;
    name?: string;
    displayName?: string;
    logoUri?: string;
};
export type FiatCurrencies = string[];
export type OwnedSafes = {
    safes: string[];
};
export type AllOwnedSafes = Record<string, string[]>;
export declare enum TokenType {
    ERC20 = "ERC20",
    ERC721 = "ERC721",
    NATIVE_TOKEN = "NATIVE_TOKEN",
    UNKNOWN = "UNKNOWN"
}
/**
 * @see https://github.com/safe-global/safe-client-gateway/blob/main/src/common/models/backend/balances.rs
 */
export type TokenInfo = {
    type: TokenType | 'ERC20' | 'ERC721' | 'NATIVE_TOKEN' | 'UNKNOWN';
    address: string;
    decimals?: number | null;
    symbol: string;
    name: string;
    logoUri: string;
};
export type SafeBalanceResponse = {
    fiatTotal: string;
    items: Array<{
        tokenInfo: TokenInfo;
        balance: string;
        fiatBalance: string;
        fiatConversion: string;
    }>;
};
export type Page<T> = {
    next?: string;
    previous?: string;
    results: Array<T>;
};
export type SafeCollectibleResponse = {
    address: string;
    tokenName: string;
    tokenSymbol: string;
    logoUri: string;
    id: string;
    uri: string;
    name: string;
    description: string;
    imageUri: string;
    metadata: {
        [key: string]: string;
    };
};
export type SafeCollectiblesPage = Page<SafeCollectibleResponse>;
export type EthereumAddress = `0x${string}`;
