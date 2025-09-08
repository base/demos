import { type ChainNamespace } from '@reown/appkit-common';
import type { UseAppKitAccountReturn, UseAppKitNetworkReturn } from '../src/utils/TypeUtil.js';
export declare function useAppKitNetworkCore(): Pick<UseAppKitNetworkReturn, 'caipNetwork' | 'chainId' | 'caipNetworkId'>;
export declare function useAppKitAccount(options?: {
    namespace?: ChainNamespace;
}): UseAppKitAccountReturn;
export declare function useDisconnect(): {
    disconnect: (props?: {
        namespace?: ChainNamespace;
    }) => Promise<void>;
};
