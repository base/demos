import type { SessionTypes } from '@walletconnect/types';
import UniversalProvider from '@walletconnect/universal-provider';
import type { AppKitNetwork, AppKitSdkVersion, CaipNetwork, CaipNetworkId, ChainNamespace, SdkVersion } from '@reown/appkit-common';
import type { ConnectMethod, ConnectedWalletInfo, ConnectionControllerClient, ConnectorType, EventsControllerState, Features, ModalControllerState, NetworkControllerClient, OptionsControllerState, PublicStateControllerState, RemoteFeatures, RouterControllerState, SIWXConfig, SocialProvider, ThemeControllerState, UseAppKitAccountReturn, UseAppKitNetworkReturn, WalletFeature } from '@reown/appkit-controllers';
import { AccountController, AssetUtil, BlockchainApiController, ChainController, ConnectionController, ConnectorController, EnsController, OptionsController } from '@reown/appkit-controllers';
import type { ProviderStoreUtilState } from '@reown/appkit-utils';
import type { AdapterBlueprint } from '../adapters/index.js';
import type { AppKitOptions } from '../utils/index.js';
export type Adapters = Record<ChainNamespace, AdapterBlueprint>;
export interface AppKitOptionsWithSdk extends AppKitOptions {
    sdkVersion: SdkVersion | AppKitSdkVersion;
}
export type Views = 'Account' | 'Connect' | 'Networks' | 'ApproveTransaction' | 'OnRampProviders' | 'ConnectingWalletConnectBasic' | 'Swap' | 'WhatIsAWallet' | 'WhatIsANetwork' | 'AllWallets' | 'WalletSend';
type ViewArguments = {
    Swap: NonNullable<RouterControllerState['data']>['swap'];
};
export interface OpenOptions<View extends Views> {
    view?: View;
    uri?: string;
    namespace?: ChainNamespace;
    arguments?: View extends keyof ViewArguments ? ViewArguments[View] : never;
}
export declare abstract class AppKitBaseClient {
    protected universalProvider?: UniversalProvider;
    protected connectionControllerClient?: ConnectionControllerClient;
    protected networkControllerClient?: NetworkControllerClient;
    protected static instance?: AppKitBaseClient;
    protected universalProviderInitPromise?: Promise<void>;
    protected caipNetworks?: [CaipNetwork, ...CaipNetwork[]];
    protected defaultCaipNetwork?: CaipNetwork;
    chainAdapters?: Adapters;
    chainNamespaces: ChainNamespace[];
    options: AppKitOptions;
    remoteFeatures: RemoteFeatures;
    version: SdkVersion | AppKitSdkVersion;
    reportedAlertErrors: Record<string, boolean>;
    private readyPromise?;
    constructor(options: AppKitOptionsWithSdk);
    private getChainNamespacesSet;
    protected initialize(options: AppKitOptionsWithSdk): Promise<void>;
    private checkAllowedOrigins;
    private sendInitializeEvent;
    protected initControllers(options: AppKitOptionsWithSdk): void;
    protected initializeThemeController(options: AppKitOptions): void;
    protected initializeChainController(options: AppKitOptions): void;
    protected initializeConnectionController(options: AppKitOptions): void;
    protected initializeConnectorController(): void;
    protected initializeProjectSettings(options: AppKitOptionsWithSdk): void;
    protected initializeOptionsController(options: AppKitOptionsWithSdk): void;
    protected getDefaultMetaData(): {
        name: string;
        description: string;
        url: string;
        icons: string[];
    } | null;
    protected setUnsupportedNetwork(chainId: string | number): void;
    protected getDefaultNetwork(): CaipNetwork | undefined;
    protected extendCaipNetwork(network: AppKitNetwork, options: AppKitOptions): CaipNetwork;
    protected extendCaipNetworks(options: AppKitOptions): [CaipNetwork, ...CaipNetwork[]];
    protected extendDefaultCaipNetwork(options: AppKitOptions): CaipNetwork | undefined;
    private disconnectNamespace;
    protected createClients(): void;
    protected getApprovedCaipNetworksData(): {
        supportsAllNetworks: boolean;
        approvedCaipNetworkIds: CaipNetworkId[];
    };
    protected switchCaipNetwork(caipNetwork: CaipNetwork): Promise<void>;
    protected getChainsFromNamespaces(namespaces?: SessionTypes.Namespaces): CaipNetworkId[];
    protected createAdapters(blueprints?: AdapterBlueprint[]): Adapters;
    protected initChainAdapter(namespace: ChainNamespace): Promise<void>;
    protected initChainAdapters(): Promise<void>;
    protected onConnectors(chainNamespace: ChainNamespace): void;
    protected listenAdapter(chainNamespace: ChainNamespace): void;
    protected createUniversalProviderForAdapter(chainNamespace: ChainNamespace): Promise<void>;
    protected abstract injectModalUi(): Promise<void>;
    abstract syncIdentity(params: Pick<AdapterBlueprint.ConnectResult, 'address' | 'chainId'> & {
        chainNamespace: ChainNamespace;
    }): Promise<void>;
    protected syncExistingConnection(): Promise<void>;
    protected syncNamespaceConnection(namespace: ChainNamespace): Promise<void>;
    protected syncAdapterConnection(namespace: ChainNamespace): Promise<void>;
    protected syncWalletConnectAccount(): Promise<void>;
    protected syncWalletConnectAccounts(chainNamespace: ChainNamespace): void;
    protected syncProvider({ type, provider, id, chainNamespace }: Pick<AdapterBlueprint.ConnectResult, 'type' | 'provider' | 'id'> & {
        chainNamespace: ChainNamespace;
    }): void;
    protected syncAllAccounts(namespace: ChainNamespace): Promise<void>;
    protected syncAccount(params: Pick<AdapterBlueprint.ConnectResult, 'address' | 'chainId'> & {
        chainNamespace: ChainNamespace;
    }): Promise<void>;
    private syncAccountInfo;
    protected syncReownName(address: string, chainNamespace: ChainNamespace): Promise<void>;
    protected syncConnectedWalletInfo(chainNamespace: ChainNamespace): void;
    protected syncBalance(params: {
        address: string;
        chainId: string | number | undefined;
        chainNamespace: ChainNamespace;
    }): Promise<void>;
    ready(): Promise<void>;
    updateNativeBalance(address: string, chainId: string | number, namespace: ChainNamespace): Promise<AdapterBlueprint.GetBalanceResult | undefined>;
    protected initializeUniversalAdapter(): Promise<void>;
    protected listenWalletConnect(): void;
    protected createUniversalProvider(): Promise<void> | undefined;
    getUniversalProvider(): Promise<UniversalProvider | undefined>;
    protected handleAlertError(error: Error): void;
    protected getAdapter(namespace?: ChainNamespace): AdapterBlueprint<import("../adapters/ChainAdapterConnector.js").ChainAdapterConnector> | undefined;
    protected createAdapter(blueprint: AdapterBlueprint): void;
    getCaipNetwork: (chainNamespace?: ChainNamespace, id?: string | number) => CaipNetwork | undefined;
    getCaipNetworkId: <T extends number | string>() => T | undefined;
    getCaipNetworks: (namespace?: ChainNamespace) => CaipNetwork[];
    getActiveChainNamespace: () => ChainNamespace | undefined;
    setRequestedCaipNetworks: (typeof ChainController)['setRequestedCaipNetworks'];
    getApprovedCaipNetworkIds: (typeof ChainController)['getAllApprovedCaipNetworkIds'];
    getCaipAddress: (chainNamespace?: ChainNamespace) => `eip155:${string}:${string}` | `eip155:${number}:${string}` | `solana:${string}:${string}` | `solana:${number}:${string}` | `polkadot:${string}:${string}` | `polkadot:${number}:${string}` | `bip122:${string}:${string}` | `bip122:${number}:${string}` | `cosmos:${string}:${string}` | `cosmos:${number}:${string}` | undefined;
    setClientId: (typeof BlockchainApiController)['setClientId'];
    getProvider: <T>(namespace: ChainNamespace) => T | undefined;
    getProviderType: (namespace: ChainNamespace) => ConnectorType | undefined;
    getPreferredAccountType: (namespace: ChainNamespace) => "payment" | "eoa" | "smartAccount" | "ordinal" | "stx" | undefined;
    setCaipAddress: (typeof AccountController)['setCaipAddress'];
    setBalance: (typeof AccountController)['setBalance'];
    setProfileName: (typeof AccountController)['setProfileName'];
    setProfileImage: (typeof AccountController)['setProfileImage'];
    setUser: (typeof AccountController)['setUser'];
    resetAccount: (typeof AccountController)['resetAccount'];
    setCaipNetwork: (typeof ChainController)['setActiveCaipNetwork'];
    setCaipNetworkOfNamespace: (caipNetwork: CaipNetwork, chainNamespace: ChainNamespace) => void;
    setAllAccounts: (typeof AccountController)['setAllAccounts'];
    setStatus: (typeof AccountController)['setStatus'];
    getAddressByChainNamespace: (chainNamespace: ChainNamespace) => string | undefined;
    setConnectors: (typeof ConnectorController)['setConnectors'];
    setConnections: (typeof ConnectionController)['setConnections'];
    fetchIdentity: (typeof BlockchainApiController)['fetchIdentity'];
    getReownName: (typeof EnsController)['getNamesForAddress'];
    getConnectors: (typeof ConnectorController)['getConnectors'];
    getConnectorImage: (typeof AssetUtil)['getConnectorImage'];
    setConnectedWalletInfo: (typeof AccountController)['setConnectedWalletInfo'];
    open<View extends Views>(options?: OpenOptions<View>): Promise<void>;
    close(): Promise<void>;
    setLoading(loading: ModalControllerState['loading'], namespace?: ChainNamespace): void;
    disconnect(chainNamespace?: ChainNamespace): Promise<void>;
    getSIWX<SIWXConfigInterface = SIWXConfig>(): SIWXConfigInterface | undefined;
    getError(): string;
    getChainId(): string | number | undefined;
    switchNetwork(appKitNetwork: AppKitNetwork): Promise<void>;
    getWalletProvider(): unknown;
    getWalletProviderType(): ConnectorType | undefined;
    subscribeProviders(callback: (providers: ProviderStoreUtilState['providers']) => void): () => void;
    getThemeMode(): import("@reown/appkit-controllers").ThemeMode;
    getThemeVariables(): import("@reown/appkit-controllers").ThemeVariables;
    setThemeMode(themeMode: ThemeControllerState['themeMode']): void;
    setTermsConditionsUrl(termsConditionsUrl: string): void;
    setPrivacyPolicyUrl(privacyPolicyUrl: string): void;
    setThemeVariables(themeVariables: ThemeControllerState['themeVariables']): void;
    subscribeTheme(callback: (newState: ThemeControllerState) => void): () => void;
    getWalletInfo(): ConnectedWalletInfo | undefined;
    getAccount(namespace?: ChainNamespace): {
        allAccounts: import("@reown/appkit-controllers").AccountType[];
        caipAddress: `eip155:${string}:${string}` | `eip155:${number}:${string}` | `solana:${string}:${string}` | `solana:${number}:${string}` | `polkadot:${string}:${string}` | `polkadot:${number}:${string}` | `bip122:${string}:${string}` | `bip122:${number}:${string}` | `cosmos:${string}:${string}` | `cosmos:${number}:${string}` | undefined;
        address: string | undefined;
        isConnected: boolean;
        status: "reconnecting" | "connected" | "disconnected" | "connecting" | undefined;
        embeddedWalletInfo: {
            user: {
                username: string | undefined;
                email?: string | null | undefined;
            } | undefined;
            authProvider: "email" | SocialProvider | undefined;
            accountType: "payment" | "eoa" | "smartAccount" | "ordinal" | "stx" | undefined;
            isSmartAccountDeployed: boolean;
        } | undefined;
    } | undefined;
    subscribeAccount(callback: (newState: UseAppKitAccountReturn) => void, namespace?: ChainNamespace): void;
    subscribeNetwork(callback: (newState: Omit<UseAppKitNetworkReturn, 'switchNetwork'>) => void): () => void;
    subscribeWalletInfo(callback: (newState?: ConnectedWalletInfo) => void): () => void;
    subscribeShouldUpdateToAddress(callback: (newState?: string) => void): void;
    subscribeCaipNetworkChange(callback: (newState?: CaipNetwork) => void): void;
    getState(): PublicStateControllerState;
    subscribeState(callback: (newState: PublicStateControllerState) => void): () => void;
    showErrorMessage(message: string): void;
    showSuccessMessage(message: string): void;
    getEvent(): {
        timestamp: number;
        reportedErrors: Record<string, boolean>;
        data: import("@reown/appkit-controllers").Event;
    };
    subscribeEvents(callback: (newEvent: EventsControllerState) => void): () => void;
    replace(route: RouterControllerState['view']): void;
    redirect(route: RouterControllerState['view']): void;
    popTransactionStack(status: 'cancel' | 'error' | 'success'): void;
    isOpen(): boolean;
    isTransactionStackEmpty(): boolean;
    static getInstance(): AppKitBaseClient | undefined;
    getIsConnectedState: () => boolean;
    addAddressLabel: (typeof AccountController)['addAddressLabel'];
    removeAddressLabel: (typeof AccountController)['removeAddressLabel'];
    getAddress: (chainNamespace?: ChainNamespace) => string | undefined;
    setApprovedCaipNetworksData: (typeof ChainController)['setApprovedCaipNetworksData'];
    resetNetwork: (typeof ChainController)['resetNetwork'];
    addConnector: (typeof ConnectorController)['addConnector'];
    resetWcConnection: (typeof ConnectionController)['resetWcConnection'];
    setAddressExplorerUrl: (typeof AccountController)['setAddressExplorerUrl'];
    setSmartAccountDeployed: (typeof AccountController)['setSmartAccountDeployed'];
    setSmartAccountEnabledNetworks: (typeof ChainController)['setSmartAccountEnabledNetworks'];
    setPreferredAccountType: (typeof AccountController)['setPreferredAccountType'];
    setEIP6963Enabled: (typeof OptionsController)['setEIP6963Enabled'];
    handleUnsafeRPCRequest: () => void;
    updateFeatures(newFeatures: Partial<Features>): void;
    updateRemoteFeatures(newRemoteFeatures: Partial<RemoteFeatures>): void;
    updateOptions(newOptions: Partial<OptionsControllerState>): void;
    setConnectMethodsOrder(connectMethodsOrder: ConnectMethod[]): void;
    setWalletFeaturesOrder(walletFeaturesOrder: WalletFeature[]): void;
    setCollapseWallets(collapseWallets: boolean): void;
    setSocialsOrder(socialsOrder: SocialProvider[]): void;
    getConnectMethodsOrder(): ConnectMethod[];
    /**
     * Adds a network to an existing adapter in AppKit.
     * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
     * @param network - The network configuration to add
     * @throws Error if adapter for namespace doesn't exist
     */
    addNetwork(namespace: ChainNamespace, network: AppKitNetwork): void;
    /**
     * Removes a network from an existing adapter in AppKit.
     * @param namespace - The chain namespace the network belongs to
     * @param networkId - The network ID to remove
     * @throws Error if adapter for namespace doesn't exist or if removing last network
     */
    removeNetwork(namespace: ChainNamespace, networkId: string | number): void;
}
export {};
