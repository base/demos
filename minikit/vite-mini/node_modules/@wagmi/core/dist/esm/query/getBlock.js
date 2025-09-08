import { getBlock, } from '../actions/getBlock.js';
import { filterQueryOptions } from './utils.js';
export function getBlockQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            const block = await getBlock(config, parameters);
            return (block ?? null);
        },
        queryKey: getBlockQueryKey(options),
    };
}
export function getBlockQueryKey(options = {}) {
    return ['block', filterQueryOptions(options)];
}
//# sourceMappingURL=getBlock.js.map