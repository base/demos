import type { CaipNetwork, CaipNetworkId, ChainNamespace } from './TypeUtil.js';
export declare const NetworkUtil: {
    caipNetworkIdToNumber(caipnetworkId?: CaipNetworkId): number | undefined;
    parseEvmChainId(chainId: string | number): number | undefined;
    getNetworksByNamespace(networks: CaipNetwork[] | undefined, namespace: ChainNamespace): CaipNetwork[];
    getFirstNetworkByNamespace(networks: CaipNetwork[] | undefined, namespace: ChainNamespace): CaipNetwork | undefined;
    getNetworkNameByCaipNetworkId(caipNetworks: CaipNetwork[], caipNetworkId: CaipNetworkId): string | undefined;
};
