import { type Ref } from 'vue';
import { type UseAppKitNetworkReturn } from '@reown/appkit-controllers';
import { AppKit } from '../src/client/appkit.js';
import type { AppKitOptions } from '../src/utils/TypesUtil.js';
export * from '../src/library/vue/index.js';
export * from '../src/utils/index.js';
export type * from '@reown/appkit-controllers';
export type { CaipNetwork, CaipAddress, CaipNetworkId } from '@reown/appkit-common';
export { CoreHelperUtil, AccountController } from '@reown/appkit-controllers';
export type CreateAppKit = Omit<AppKitOptions, 'sdkType' | 'sdkVersion' | 'basic'>;
export declare function createAppKit(options: CreateAppKit): AppKit;
export { AppKit };
export type { AppKitOptions };
export declare function useAppKitNetwork(): Ref<UseAppKitNetworkReturn>;
export declare function useAppKitBalance(): {
    fetchBalance: () => Promise<{
        data: import("./adapters.js").AdapterBlueprint.GetBalanceResult | undefined;
        error: string | null;
        isSuccess: boolean;
        isError: boolean;
    }>;
};
export * from '../src/library/vue/index.js';
