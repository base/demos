import { waitForTransactionReceipt, } from '../actions/waitForTransactionReceipt.js';
import { filterQueryOptions } from './utils.js';
export function waitForTransactionReceiptQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { hash, ...parameters } = queryKey[1];
            if (!hash)
                throw new Error('hash is required');
            return waitForTransactionReceipt(config, {
                ...parameters,
                onReplaced: options.onReplaced,
                hash,
            });
        },
        queryKey: waitForTransactionReceiptQueryKey(options),
    };
}
export function waitForTransactionReceiptQueryKey(options = {}) {
    const { onReplaced: _, ...rest } = options;
    return ['waitForTransactionReceipt', filterQueryOptions(rest)];
}
//# sourceMappingURL=waitForTransactionReceipt.js.map