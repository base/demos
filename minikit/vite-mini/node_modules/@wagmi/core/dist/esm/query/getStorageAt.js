import { getStorageAt, } from '../actions/getStorageAt.js';
import { filterQueryOptions } from './utils.js';
export function getStorageAtQueryOptions(config, options = {}) {
    return {
        queryFn({ queryKey }) {
            const { address, slot, scopeKey: _, ...parameters } = queryKey[1];
            if (!address || !slot)
                throw new Error('address and slot are required');
            return getStorageAt(config, { ...parameters, address, slot });
        },
        queryKey: getStorageAtQueryKey(options),
    };
}
export function getStorageAtQueryKey(options) {
    return ['getStorageAt', filterQueryOptions(options)];
}
//# sourceMappingURL=getStorageAt.js.map