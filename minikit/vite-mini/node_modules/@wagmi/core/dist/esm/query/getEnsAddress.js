import { getEnsAddress, } from '../actions/getEnsAddress.js';
import { filterQueryOptions } from './utils.js';
export function getEnsAddressQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { name, scopeKey: _, ...parameters } = queryKey[1];
            if (!name)
                throw new Error('name is required');
            return getEnsAddress(config, { ...parameters, name });
        },
        queryKey: getEnsAddressQueryKey(options),
    };
}
export function getEnsAddressQueryKey(options = {}) {
    return ['ensAddress', filterQueryOptions(options)];
}
//# sourceMappingURL=getEnsAddress.js.map