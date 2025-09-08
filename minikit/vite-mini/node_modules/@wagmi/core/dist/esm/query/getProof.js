import { getProof, } from '../actions/getProof.js';
import { filterQueryOptions } from './utils.js';
export function getProofQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, scopeKey: _, storageKeys, ...parameters } = queryKey[1];
            if (!address || !storageKeys)
                throw new Error('address and storageKeys are required');
            return getProof(config, { ...parameters, address, storageKeys });
        },
        queryKey: getProofQueryKey(options),
    };
}
export function getProofQueryKey(options) {
    return ['getProof', filterQueryOptions(options)];
}
//# sourceMappingURL=getProof.js.map