import type { ChainNamespace } from '@reown/appkit-common';
import { FetchUtil } from '../utils/FetchUtil.js';
import type { ApiGetWalletsRequest, WcWallet } from '../utils/TypeUtil.js';
export declare const api: FetchUtil;
export interface ApiControllerState {
    promises: Record<string, Promise<unknown>>;
    page: number;
    count: number;
    featured: WcWallet[];
    allFeatured: WcWallet[];
    recommended: WcWallet[];
    allRecommended: WcWallet[];
    wallets: WcWallet[];
    filteredWallets: WcWallet[];
    search: WcWallet[];
    isAnalyticsEnabled: boolean;
    excludedWallets: {
        rdns?: string | null;
        name: string;
    }[];
    isFetchingRecommendedWallets: boolean;
}
interface PrefetchParameters {
    fetchConnectorImages?: boolean;
    fetchFeaturedWallets?: boolean;
    fetchRecommendedWallets?: boolean;
    fetchNetworkImages?: boolean;
}
type StateKey = keyof ApiControllerState;
export declare const ApiController: {
    state: ApiControllerState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: ApiControllerState[K]) => void): () => void;
    _getSdkProperties(): {
        projectId: string;
        st: "appkit";
        sv: import("../utils/TypeUtil.js").SdkVersion;
    };
    _filterOutExtensions(wallets: WcWallet[]): WcWallet[];
    _fetchWalletImage(imageId: string): Promise<void>;
    _fetchNetworkImage(imageId: string): Promise<void>;
    _fetchConnectorImage(imageId: string): Promise<void>;
    _fetchCurrencyImage(countryCode: string): Promise<void>;
    _fetchTokenImage(symbol: string): Promise<void>;
    _filterWalletsByPlatform(wallets: WcWallet[]): WcWallet[];
    fetchProjectConfig(): Promise<import("../utils/TypeUtil.js").TypedFeatureConfig[]>;
    fetchAllowedOrigins(): Promise<string[]>;
    fetchNetworkImages(): Promise<void>;
    fetchConnectorImages(): Promise<void>;
    fetchCurrencyImages(currencies?: string[]): Promise<void>;
    fetchTokenImages(tokens?: string[]): Promise<void>;
    fetchWallets(params: Omit<ApiGetWalletsRequest, "chains"> & {
        chains?: string;
    }): Promise<{
        data: WcWallet[];
        count: number;
    }>;
    fetchFeaturedWallets(): Promise<void>;
    fetchRecommendedWallets(): Promise<void>;
    fetchWalletsByPage({ page }: Pick<ApiGetWalletsRequest, "page">): Promise<void>;
    initializeExcludedWallets({ ids }: {
        ids: string[];
    }): Promise<void>;
    searchWallet({ search, badge }: Pick<ApiGetWalletsRequest, "search" | "badge">): Promise<void>;
    initPromise(key: string, fetchFn: () => Promise<void>): Promise<unknown>;
    prefetch({ fetchConnectorImages, fetchFeaturedWallets, fetchRecommendedWallets, fetchNetworkImages }?: PrefetchParameters): Promise<PromiseSettledResult<unknown>[]>;
    prefetchAnalyticsConfig(): void;
    fetchAnalyticsConfig(): Promise<void>;
    filterByNamespaces(namespaces: ChainNamespace[] | undefined): void;
    clearFilterByNamespaces(): void;
    setFilterByNamespace(namespace: ChainNamespace | undefined): void;
};
export {};
