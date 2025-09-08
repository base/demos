import { estimateFeesPerGas, } from '../actions/estimateFeesPerGas.js';
import { filterQueryOptions } from './utils.js';
export function estimateFeesPerGasQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            return estimateFeesPerGas(config, parameters);
        },
        queryKey: estimateFeesPerGasQueryKey(options),
    };
}
export function estimateFeesPerGasQueryKey(options = {}) {
    return ['estimateFeesPerGas', filterQueryOptions(options)];
}
//# sourceMappingURL=estimateFeesPerGas.js.map