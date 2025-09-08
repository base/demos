import { estimateMaxPriorityFeePerGas, } from '../actions/estimateMaxPriorityFeePerGas.js';
import { filterQueryOptions } from './utils.js';
export function estimateMaxPriorityFeePerGasQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            return estimateMaxPriorityFeePerGas(config, parameters);
        },
        queryKey: estimateMaxPriorityFeePerGasQueryKey(options),
    };
}
export function estimateMaxPriorityFeePerGasQueryKey(options = {}) {
    return ['estimateMaxPriorityFeePerGas', filterQueryOptions(options)];
}
//# sourceMappingURL=estimateMaxPriorityFeePerGas.js.map