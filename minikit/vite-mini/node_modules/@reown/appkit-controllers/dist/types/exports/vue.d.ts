import { type Ref } from 'vue';
import { type ChainNamespace } from '@reown/appkit-common';
import type { UseAppKitAccountReturn } from '../src/utils/TypeUtil.js';
export declare function useAppKitAccount(options?: {
    namespace?: ChainNamespace;
}): Ref<UseAppKitAccountReturn>;
export declare function useDisconnect(): {
    disconnect: (props?: {
        namespace?: ChainNamespace;
    }) => Promise<void>;
};
