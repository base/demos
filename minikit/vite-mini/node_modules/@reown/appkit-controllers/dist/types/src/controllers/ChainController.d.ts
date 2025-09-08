import { type CaipAddress, type CaipNetwork, type CaipNetworkId, type ChainNamespace } from '@reown/appkit-common';
import type { AdapterNetworkState, ChainAdapter, NetworkControllerClient } from '../utils/TypeUtil.js';
import { type AccountControllerState } from './AccountController.js';
import { type ConnectionControllerClient } from './ConnectionController.js';
export type ChainControllerClients = {
    networkControllerClient: NetworkControllerClient;
    connectionControllerClient: ConnectionControllerClient;
};
export interface ChainControllerState {
    activeChain: ChainNamespace | undefined;
    activeCaipAddress: CaipAddress | undefined;
    activeCaipNetwork?: CaipNetwork;
    chains: Map<ChainNamespace, ChainAdapter>;
    universalAdapter: Pick<ChainAdapter, 'networkControllerClient' | 'connectionControllerClient'>;
    noAdapters: boolean;
    isSwitchingNamespace: boolean;
}
type ChainControllerStateKey = keyof ChainControllerState;
export declare const ChainController: {
    state: ChainControllerState;
    subscribe(callback: (value: ChainControllerState) => void): () => void;
    subscribeKey<K extends ChainControllerStateKey>(key: K, callback: (value: ChainControllerState[K]) => void): () => void;
    subscribeChainProp<K extends keyof ChainAdapter>(property: K, callback: (value: ChainAdapter[K] | undefined) => void, chain?: ChainNamespace): () => void;
    initialize(adapters: ChainAdapter[], caipNetworks: CaipNetwork[] | undefined, clients: {
        connectionControllerClient: ConnectionControllerClient;
        networkControllerClient: NetworkControllerClient;
    }): void;
    removeAdapter(namespace: ChainNamespace): void;
    addAdapter(adapter: ChainAdapter, { networkControllerClient, connectionControllerClient }: ChainControllerClients, caipNetworks: [CaipNetwork, ...CaipNetwork[]]): void;
    addNetwork(network: CaipNetwork): void;
    removeNetwork(namespace: ChainNamespace, networkId: string | number): void;
    setAdapterNetworkState(chain: ChainNamespace, props: Partial<AdapterNetworkState>): void;
    setChainAccountData(chain: ChainNamespace | undefined, accountProps: Partial<AccountControllerState>, _unknown?: boolean): void;
    setChainNetworkData(chain: ChainNamespace | undefined, networkProps: Partial<AdapterNetworkState>): void;
    setAccountProp(prop: keyof AccountControllerState, value: AccountControllerState[keyof AccountControllerState], chain: ChainNamespace | undefined, replaceState?: boolean): void;
    setActiveNamespace(chain: ChainNamespace | undefined): void;
    setActiveCaipNetwork(caipNetwork: AdapterNetworkState["caipNetwork"]): void;
    addCaipNetwork(caipNetwork: AdapterNetworkState["caipNetwork"]): void;
    switchActiveNamespace(namespace: ChainNamespace | undefined): Promise<void>;
    switchActiveNetwork(network: CaipNetwork): Promise<void>;
    getNetworkControllerClient(chainNamespace?: ChainNamespace): NetworkControllerClient;
    getConnectionControllerClient(_chain?: ChainNamespace): ConnectionControllerClient;
    getAccountProp<K extends keyof AccountControllerState>(key: K, _chain?: ChainNamespace): AccountControllerState[K] | undefined;
    getNetworkProp<K extends keyof AdapterNetworkState>(key: K, namespace: ChainNamespace): AdapterNetworkState[K] | undefined;
    getRequestedCaipNetworks(chainToFilter: ChainNamespace): CaipNetwork[];
    getAllRequestedCaipNetworks(): CaipNetwork[];
    setRequestedCaipNetworks(caipNetworks: CaipNetwork[], chain: ChainNamespace): void;
    getAllApprovedCaipNetworkIds(): CaipNetworkId[];
    getActiveCaipNetwork(): CaipNetwork | undefined;
    getActiveCaipAddress(): `eip155:${string}:${string}` | `eip155:${number}:${string}` | `solana:${string}:${string}` | `solana:${number}:${string}` | `polkadot:${string}:${string}` | `polkadot:${number}:${string}` | `bip122:${string}:${string}` | `bip122:${number}:${string}` | `cosmos:${string}:${string}` | `cosmos:${number}:${string}` | undefined;
    getApprovedCaipNetworkIds(namespace: ChainNamespace): CaipNetworkId[];
    setApprovedCaipNetworksData(namespace: ChainNamespace): Promise<void>;
    checkIfSupportedNetwork(namespace: ChainNamespace, caipNetwork?: CaipNetwork): boolean;
    checkIfSupportedChainId(chainId: number | string): boolean;
    setSmartAccountEnabledNetworks(smartAccountEnabledNetworks: number[], chain: ChainNamespace): void;
    checkIfSmartAccountEnabled(): boolean;
    getActiveNetworkTokenAddress(): string;
    showUnsupportedChainUI(): void;
    checkIfNamesSupported(): boolean;
    resetNetwork(namespace: ChainNamespace): void;
    resetAccount(chain: ChainNamespace | undefined): void;
    setIsSwitchingNamespace(isSwitchingNamespace: boolean): void;
    getFirstCaipNetworkSupportsAuthConnector(): CaipNetwork | undefined;
    getAccountData(chainNamespace?: ChainNamespace): AccountControllerState | undefined;
    getNetworkData(chainNamespace?: ChainNamespace): AdapterNetworkState | undefined;
    getCaipNetworkByNamespace(chainNamespace: ChainNamespace | undefined, chainId?: string | number | undefined): CaipNetwork | undefined;
    /**
     * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
     * @param namespace - The namespace to get the requested CaipNetwork IDs for
     * @returns The requested CaipNetwork IDs
     */
    getRequestedCaipNetworkIds(): (`eip155:${string}` | `eip155:${number}` | `solana:${string}` | `solana:${number}` | `polkadot:${string}` | `polkadot:${number}` | `bip122:${string}` | `bip122:${number}` | `cosmos:${string}` | `cosmos:${number}`)[];
    getCaipNetworks(namespace?: ChainNamespace): CaipNetwork[];
};
export {};
