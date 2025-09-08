import { estimateGas, } from '../actions/estimateGas.js';
import { filterQueryOptions } from './utils.js';
export function estimateGasQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { connector } = options;
            const { account, scopeKey: _, ...parameters } = queryKey[1];
            if (!account && !connector)
                throw new Error('account or connector is required');
            return estimateGas(config, { account, connector, ...parameters });
        },
        queryKey: estimateGasQueryKey(options),
    };
}
export function estimateGasQueryKey(options = {}) {
    const { connector: _, ...rest } = options;
    return ['estimateGas', filterQueryOptions(rest)];
}
//# sourceMappingURL=estimateGas.js.map