import { getEnsResolver, } from '../actions/getEnsResolver.js';
import { filterQueryOptions } from './utils.js';
export function getEnsResolverQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { name, scopeKey: _, ...parameters } = queryKey[1];
            if (!name)
                throw new Error('name is required');
            return getEnsResolver(config, { ...parameters, name });
        },
        queryKey: getEnsResolverQueryKey(options),
    };
}
export function getEnsResolverQueryKey(options = {}) {
    return ['ensResolver', filterQueryOptions(options)];
}
//# sourceMappingURL=getEnsResolver.js.map