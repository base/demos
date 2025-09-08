import { getToken, } from '../actions/getToken.js';
import { filterQueryOptions } from './utils.js';
export function getTokenQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, scopeKey: _, ...parameters } = queryKey[1];
            if (!address)
                throw new Error('address is required');
            return getToken(config, { ...parameters, address });
        },
        queryKey: getTokenQueryKey(options),
    };
}
export function getTokenQueryKey(options = {}) {
    return ['token', filterQueryOptions(options)];
}
//# sourceMappingURL=getToken.js.map