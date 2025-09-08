import { readContracts, } from '../actions/readContracts.js';
import { filterQueryOptions } from './utils.js';
export function infiniteReadContractsQueryOptions(config, options) {
    return {
        ...options.query,
        async queryFn({ pageParam, queryKey }) {
            const { contracts } = options;
            const { cacheKey: _, scopeKey: _s, ...parameters } = queryKey[1];
            return (await readContracts(config, {
                ...parameters,
                contracts: contracts(pageParam),
            }));
        },
        queryKey: infiniteReadContractsQueryKey(options),
    };
}
export function infiniteReadContractsQueryKey(options) {
    const { contracts: _, query: _q, ...parameters } = options;
    return ['infiniteReadContracts', filterQueryOptions(parameters)];
}
//# sourceMappingURL=infiniteReadContracts.js.map