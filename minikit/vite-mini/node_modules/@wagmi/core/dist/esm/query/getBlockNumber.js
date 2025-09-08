import { getBlockNumber, } from '../actions/getBlockNumber.js';
import { filterQueryOptions } from './utils.js';
export function getBlockNumberQueryOptions(config, options = {}) {
    return {
        gcTime: 0,
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            const blockNumber = await getBlockNumber(config, parameters);
            return blockNumber ?? null;
        },
        queryKey: getBlockNumberQueryKey(options),
    };
}
export function getBlockNumberQueryKey(options = {}) {
    return ['blockNumber', filterQueryOptions(options)];
}
//# sourceMappingURL=getBlockNumber.js.map