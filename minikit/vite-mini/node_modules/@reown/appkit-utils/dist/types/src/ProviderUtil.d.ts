import type UniversalProvider from '@walletconnect/universal-provider';
import type { ChainNamespace } from '@reown/appkit-common';
import type { ConnectorType } from '@reown/appkit-controllers';
type StateKey = keyof ProviderStoreUtilState;
export interface ProviderStoreUtilState {
    providers: Record<ChainNamespace, UniversalProvider | unknown | undefined>;
    providerIds: Record<ChainNamespace, ConnectorType | undefined>;
}
export type ProviderType = 'walletConnect' | 'injected' | 'coinbaseWallet' | 'eip6963' | 'ID_AUTH' | 'coinbaseWalletSDK';
export declare const ProviderUtil: {
    state: ProviderStoreUtilState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: ProviderStoreUtilState[K]) => void): () => void;
    subscribe(callback: (value: ProviderStoreUtilState) => void): () => void;
    subscribeProviders(callback: (providers: ProviderStoreUtilState["providers"]) => void): () => void;
    setProvider<T = UniversalProvider>(chainNamespace: ChainNamespace, provider: T): void;
    getProvider<T = UniversalProvider>(chainNamespace: ChainNamespace): T | undefined;
    setProviderId(chainNamespace: ChainNamespace, providerId: ConnectorType): void;
    getProviderId(chainNamespace: ChainNamespace | undefined): ConnectorType | undefined;
    reset(): void;
    resetChain(chainNamespace: ChainNamespace): void;
};
export {};
