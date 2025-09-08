import { prepareTransactionRequest, } from '../actions/prepareTransactionRequest.js';
import { filterQueryOptions } from './utils.js';
export function prepareTransactionRequestQueryOptions(config, options = {}) {
    return {
        queryFn({ queryKey }) {
            const { scopeKey: _, to, ...parameters } = queryKey[1];
            if (!to)
                throw new Error('to is required');
            return prepareTransactionRequest(config, {
                to,
                ...parameters,
            });
        },
        queryKey: prepareTransactionRequestQueryKey(options),
    };
}
export function prepareTransactionRequestQueryKey(options) {
    return ['prepareTransactionRequest', filterQueryOptions(options)];
}
//# sourceMappingURL=prepareTransactionRequest.js.map