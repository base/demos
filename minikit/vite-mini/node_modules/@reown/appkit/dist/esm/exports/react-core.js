import {} from '@reown/appkit-controllers';
import { useAppKitNetworkCore } from '@reown/appkit-controllers/react';
import { AppKit } from '../src/client/appkit-core.js';
import { getAppKit } from '../src/library/react/index.js';
import { PACKAGE_VERSION } from './constants.js';
// -- Hooks ------------------------------------------------------------
export * from '../src/library/react/index.js';
// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js';
export { CoreHelperUtil, AccountController } from '@reown/appkit-controllers';
export let modal = undefined;
export function createAppKit(options) {
    if (!modal) {
        modal = new AppKit({
            ...options,
            sdkVersion: `react-core-${PACKAGE_VERSION}`,
            basic: true
        });
        getAppKit(modal);
    }
    return modal;
}
export { AppKit };
// -- Hooks ------------------------------------------------------------
export * from '../src/library/react/index.js';
export function useAppKitNetwork() {
    const { caipNetwork, caipNetworkId, chainId } = useAppKitNetworkCore();
    function switchNetwork(network) {
        modal?.switchNetwork(network);
    }
    return {
        caipNetwork,
        caipNetworkId,
        chainId,
        switchNetwork
    };
}
export { useAppKitAccount } from '@reown/appkit-controllers/react';
//# sourceMappingURL=react-core.js.map