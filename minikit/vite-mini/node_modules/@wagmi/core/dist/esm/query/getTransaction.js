import { getTransaction, } from '../actions/getTransaction.js';
import { filterQueryOptions } from './utils.js';
export function getTransactionQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { blockHash, blockNumber, blockTag, hash, index } = queryKey[1];
            if (!blockHash && !blockNumber && !blockTag && !hash)
                throw new Error('blockHash, blockNumber, blockTag, or hash is required');
            if (!hash && !index)
                throw new Error('index is required for blockHash, blockNumber, or blockTag');
            const { scopeKey: _, ...rest } = queryKey[1];
            return getTransaction(config, rest);
        },
        queryKey: getTransactionQueryKey(options),
    };
}
export function getTransactionQueryKey(options = {}) {
    return ['transaction', filterQueryOptions(options)];
}
//# sourceMappingURL=getTransaction.js.map