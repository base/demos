import { watchBlocks as viem_watchBlocks, } from 'viem/actions';
import { getAction } from '../utils/getAction.js';
// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/watchBlocks */
export function watchBlocks(config, parameters) {
    const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } = parameters;
    let unwatch;
    const listener = (chainId) => {
        if (unwatch)
            unwatch();
        const client = config.getClient({ chainId });
        const action = getAction(client, viem_watchBlocks, 'watchBlocks');
        unwatch = action(rest);
        return unwatch;
    };
    // set up listener for block number changes
    const unlisten = listener(parameters.chainId);
    // set up subscriber for connected chain changes
    let unsubscribe;
    if (syncConnectedChain && !parameters.chainId)
        unsubscribe = config.subscribe(({ chainId }) => chainId, async (chainId) => listener(chainId));
    return () => {
        unlisten?.();
        unsubscribe?.();
    };
}
//# sourceMappingURL=watchBlocks.js.map