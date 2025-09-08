import { PublicClient } from 'viem';
import { BundlerClient } from 'viem/account-abstraction';
export type ChainClientState = {
    [key: number]: {
        client: PublicClient;
        bundlerClient: BundlerClient;
    };
};
export declare const ChainClients: import("zustand/vanilla").StoreApi<ChainClientState>;
//# sourceMappingURL=store.d.ts.map