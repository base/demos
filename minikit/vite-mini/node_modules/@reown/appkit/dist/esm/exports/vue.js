import { onUnmounted, ref } from 'vue';
import { ChainController, CoreHelperUtil } from '@reown/appkit-controllers';
import { AppKit } from '../src/client/appkit.js';
import { getAppKit } from '../src/library/vue/index.js';
import { _internalFetchBalance } from '../src/utils/BalanceUtil.js';
import { PACKAGE_VERSION } from './constants.js';
// -- Hooks ------------------------------------------------------------
export * from '../src/library/vue/index.js';
// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js';
export { CoreHelperUtil, AccountController } from '@reown/appkit-controllers';
let modal = undefined;
export function createAppKit(options) {
    if (!modal) {
        modal = new AppKit({
            ...options,
            sdkVersion: CoreHelperUtil.generateSdkVersion(options.adapters ?? [], 'html', PACKAGE_VERSION)
        });
        getAppKit(modal);
    }
    return modal;
}
export { AppKit };
// -- Hooks ------------------------------------------------------------
export function useAppKitNetwork() {
    const state = ref({
        caipNetwork: ChainController.state.activeCaipNetwork,
        chainId: ChainController.state.activeCaipNetwork?.id,
        caipNetworkId: ChainController.state.activeCaipNetwork?.caipNetworkId,
        switchNetwork: (network) => {
            modal?.switchNetwork(network);
        }
    });
    const unsubscribe = ChainController.subscribeKey('activeCaipNetwork', val => {
        state.value.caipNetwork = val;
        state.value.chainId = val?.id;
        state.value.caipNetworkId = val?.caipNetworkId;
    });
    onUnmounted(() => {
        unsubscribe();
    });
    return state;
}
export function useAppKitBalance() {
    async function fetchBalance() {
        return await _internalFetchBalance(modal);
    }
    return {
        fetchBalance
    };
}
export * from '../src/library/vue/index.js';
//# sourceMappingURL=vue.js.map