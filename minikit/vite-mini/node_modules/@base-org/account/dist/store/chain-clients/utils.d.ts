import { PublicClient } from 'viem';
import { BundlerClient } from 'viem/account-abstraction';
import { RPCResponseNativeCurrency } from '../../core/message/RPCResponse.js';
export type SDKChain = {
    id: number;
    rpcUrl?: string;
    nativeCurrency?: RPCResponseNativeCurrency;
};
export declare function createClients(chains: SDKChain[]): void;
export declare function getClient(chainId: number): PublicClient | undefined;
export declare function getBundlerClient(chainId: number): BundlerClient | undefined;
//# sourceMappingURL=utils.d.ts.map