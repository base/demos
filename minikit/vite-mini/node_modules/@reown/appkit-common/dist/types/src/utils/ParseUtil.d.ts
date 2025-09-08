import type { CaipAddress, CaipNetworkId, ChainId, ChainNamespace } from './TypeUtil.js';
export type ParsedCaipAddress = {
    chainNamespace: ChainNamespace;
    chainId: ChainId;
    address: string;
};
type ParsedCaipNetworkId = {
    chainNamespace: ChainNamespace;
    chainId: ChainId;
};
export declare const ParseUtil: {
    validateCaipAddress(address: string): CaipAddress;
    parseCaipAddress(caipAddress: CaipAddress): ParsedCaipAddress;
    parseCaipNetworkId(caipNetworkId: CaipNetworkId): ParsedCaipNetworkId;
};
export {};
