import { type HttpTransport, type Transport } from 'viem';
import { type AppKitNetwork, type CaipNetwork, type CaipNetworkId, type ChainNamespace, type CustomRpcUrl, type CustomRpcUrlMap } from '@reown/appkit-common';
export declare function getBlockchainApiRpcUrl(caipNetworkId: CaipNetworkId, projectId: string): string;
type ExtendCaipNetworkParams = {
    customNetworkImageUrls: Record<number | string, string> | undefined;
    projectId: string;
    customRpc?: boolean;
    customRpcUrls?: CustomRpcUrlMap;
};
export declare const CaipNetworksUtil: {
    extendRpcUrlWithProjectId(rpcUrl: string, projectId: string): string;
    isCaipNetwork(network: AppKitNetwork): network is CaipNetwork;
    getChainNamespace(network: AppKitNetwork): ChainNamespace<import("@reown/appkit-common").InternalChainNamespace>;
    getCaipNetworkId(network: AppKitNetwork): CaipNetworkId;
    getDefaultRpcUrl(caipNetwork: AppKitNetwork, caipNetworkId: CaipNetworkId, projectId: string): string;
    extendCaipNetwork(caipNetwork: AppKitNetwork | CaipNetwork, { customNetworkImageUrls, projectId, customRpcUrls }: ExtendCaipNetworkParams): CaipNetwork;
    extendCaipNetworks(caipNetworks: AppKitNetwork[], { customNetworkImageUrls, projectId, customRpcUrls }: ExtendCaipNetworkParams): [CaipNetwork, ...CaipNetwork[]];
    getViemTransport(caipNetwork: CaipNetwork, projectId: string, customRpcUrls?: CustomRpcUrl[]): import("viem").FallbackTransport<HttpTransport[]>;
    extendWagmiTransports(caipNetwork: CaipNetwork, projectId: string, transport: Transport): Transport | import("viem").FallbackTransport<readonly [Transport, HttpTransport<undefined, false>]>;
    getUnsupportedNetwork(caipNetworkId: CaipNetworkId): CaipNetwork;
    getCaipNetworkFromStorage(defaultCaipNetwork?: CaipNetwork): CaipNetwork | undefined;
};
export {};
