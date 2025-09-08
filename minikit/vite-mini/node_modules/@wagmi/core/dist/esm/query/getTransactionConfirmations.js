import { getTransactionConfirmations, } from '../actions/getTransactionConfirmations.js';
import { filterQueryOptions } from './utils.js';
export function getTransactionConfirmationsQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { hash, transactionReceipt, scopeKey: _, ...parameters } = queryKey[1];
            if (!hash && !transactionReceipt)
                throw new Error('hash or transactionReceipt is required');
            const confirmations = await getTransactionConfirmations(config, {
                hash,
                transactionReceipt,
                ...parameters,
            });
            return confirmations ?? null;
        },
        queryKey: getTransactionConfirmationsQueryKey(options),
    };
}
export function getTransactionConfirmationsQueryKey(options = {}) {
    return ['transactionConfirmations', filterQueryOptions(options)];
}
//# sourceMappingURL=getTransactionConfirmations.js.map