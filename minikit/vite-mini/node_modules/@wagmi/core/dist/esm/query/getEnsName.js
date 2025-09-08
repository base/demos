import { getEnsName, } from '../actions/getEnsName.js';
import { filterQueryOptions } from './utils.js';
export function getEnsNameQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, scopeKey: _, ...parameters } = queryKey[1];
            if (!address)
                throw new Error('address is required');
            return getEnsName(config, { ...parameters, address });
        },
        queryKey: getEnsNameQueryKey(options),
    };
}
export function getEnsNameQueryKey(options = {}) {
    return ['ensName', filterQueryOptions(options)];
}
//# sourceMappingURL=getEnsName.js.map