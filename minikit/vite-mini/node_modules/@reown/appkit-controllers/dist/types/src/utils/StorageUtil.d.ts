import { type CaipNetworkId, type ChainNamespace } from '@reown/appkit-common';
import type { Connection } from '../controllers/ConnectionController.js';
import type { BlockchainApiBalanceResponse, BlockchainApiIdentityResponse, BlockchainApiLookupEnsName, ConnectionStatus, PreferredAccountTypes, SocialProvider, WcWallet } from './TypeUtil.js';
export declare const StorageUtil: {
    cacheExpiry: {
        portfolio: number;
        nativeBalance: number;
        ens: number;
        identity: number;
    };
    isCacheExpired(timestamp: number, cacheExpiry: number): boolean;
    getActiveNetworkProps(): {
        namespace: ChainNamespace | undefined;
        caipNetworkId: CaipNetworkId | undefined;
        chainId: string | number | undefined;
    };
    setWalletConnectDeepLink({ name, href }: {
        href: string;
        name: string;
    }): void;
    getWalletConnectDeepLink(): any;
    deleteWalletConnectDeepLink(): void;
    setActiveNamespace(namespace: ChainNamespace): void;
    setActiveCaipNetworkId(caipNetworkId: CaipNetworkId): void;
    getActiveCaipNetworkId(): `eip155:${string}` | `solana:${string}` | `polkadot:${string}` | `bip122:${string}` | `cosmos:${string}` | undefined;
    deleteActiveCaipNetworkId(): void;
    deleteConnectedConnectorId(namespace: ChainNamespace): void;
    setAppKitRecent(wallet: WcWallet): void;
    getRecentWallets(): WcWallet[];
    setConnectedConnectorId(namespace: ChainNamespace, connectorId: string): void;
    getActiveNamespace(): ChainNamespace | undefined;
    getConnectedConnectorId(namespace: ChainNamespace | undefined): string | undefined;
    setConnectedSocialProvider(socialProvider: SocialProvider): void;
    getConnectedSocialProvider(): string | undefined;
    deleteConnectedSocialProvider(): void;
    getConnectedSocialUsername(): string | undefined;
    getStoredActiveCaipNetworkId(): string | undefined;
    setConnectionStatus(status: ConnectionStatus): void;
    getConnectionStatus(): ConnectionStatus | undefined;
    getConnectedNamespaces(): ChainNamespace[];
    setConnectedNamespaces(namespaces: ChainNamespace[]): void;
    addConnectedNamespace(namespace: ChainNamespace): void;
    removeConnectedNamespace(namespace: ChainNamespace): void;
    getTelegramSocialProvider(): SocialProvider | null | undefined;
    setTelegramSocialProvider(socialProvider: SocialProvider): void;
    removeTelegramSocialProvider(): void;
    getBalanceCache(): Record<string, {
        timestamp: number;
        balance: BlockchainApiBalanceResponse;
    }>;
    removeAddressFromBalanceCache(caipAddress: string): void;
    getBalanceCacheForCaipAddress(caipAddress: string): BlockchainApiBalanceResponse | undefined;
    updateBalanceCache(params: {
        caipAddress: string;
        balance: BlockchainApiBalanceResponse;
        timestamp: number;
    }): void;
    getNativeBalanceCache(): Record<string, {
        caipAddress: string;
        balance: string;
        symbol: string;
        timestamp: number;
    }>;
    removeAddressFromNativeBalanceCache(caipAddress: string): void;
    getNativeBalanceCacheForCaipAddress(caipAddress: string): {
        caipAddress: string;
        balance: string;
        symbol: string;
        timestamp: number;
    } | undefined;
    updateNativeBalanceCache(params: {
        caipAddress: string;
        balance: string;
        symbol: string;
        timestamp: number;
    }): void;
    getEnsCache(): Record<string, {
        ens: BlockchainApiLookupEnsName[];
        timestamp: number;
    }>;
    getEnsFromCacheForAddress(address: string): BlockchainApiLookupEnsName[] | undefined;
    updateEnsCache(params: {
        address: string;
        timestamp: number;
        ens: BlockchainApiLookupEnsName[];
    }): void;
    removeEnsFromCache(address: string): void;
    getIdentityCache(): Record<string, {
        identity: BlockchainApiIdentityResponse;
        timestamp: number;
    }>;
    getIdentityFromCacheForAddress(address: string): BlockchainApiIdentityResponse | undefined;
    updateIdentityCache(params: {
        address: string;
        timestamp: number;
        identity: BlockchainApiIdentityResponse;
    }): void;
    removeIdentityFromCache(address: string): void;
    clearAddressCache(): void;
    setPreferredAccountTypes(accountTypes: PreferredAccountTypes): void;
    getPreferredAccountTypes(): PreferredAccountTypes;
    setConnections(connections: Connection[], chainNamespace: ChainNamespace): void;
    getConnections(): {};
};
