import { getTransactionReceipt, } from '../actions/getTransactionReceipt.js';
import { filterQueryOptions } from './utils.js';
export function getTransactionReceiptQueryOptions(config, options = {}) {
    return {
        queryFn({ queryKey }) {
            const { hash, scopeKey: _, ...parameters } = queryKey[1];
            if (!hash)
                throw new Error('hash is required');
            return getTransactionReceipt(config, { ...parameters, hash });
        },
        queryKey: getTransactionReceiptQueryKey(options),
    };
}
export function getTransactionReceiptQueryKey(options) {
    return ['getTransactionReceipt', filterQueryOptions(options)];
}
//# sourceMappingURL=getTransactionReceipt.js.map