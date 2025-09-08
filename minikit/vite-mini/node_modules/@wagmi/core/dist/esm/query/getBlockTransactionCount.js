import { getBlockTransactionCount, } from '../actions/getBlockTransactionCount.js';
import { filterQueryOptions } from './utils.js';
export function getBlockTransactionCountQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            const blockTransactionCount = await getBlockTransactionCount(config, parameters);
            return blockTransactionCount ?? null;
        },
        queryKey: getBlockTransactionCountQueryKey(options),
    };
}
export function getBlockTransactionCountQueryKey(options = {}) {
    return ['blockTransactionCount', filterQueryOptions(options)];
}
//# sourceMappingURL=getBlockTransactionCount.js.map