import { getTransactionCount, } from '../actions/getTransactionCount.js';
import { filterQueryOptions } from './utils.js';
export function getTransactionCountQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, scopeKey: _, ...parameters } = queryKey[1];
            if (!address)
                throw new Error('address is required');
            const transactionCount = await getTransactionCount(config, {
                ...parameters,
                address,
            });
            return transactionCount ?? null;
        },
        queryKey: getTransactionCountQueryKey(options),
    };
}
export function getTransactionCountQueryKey(options = {}) {
    return ['transactionCount', filterQueryOptions(options)];
}
//# sourceMappingURL=getTransactionCount.js.map