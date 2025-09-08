import { getBalance, } from '../actions/getBalance.js';
import { filterQueryOptions } from './utils.js';
export function getBalanceQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, scopeKey: _, ...parameters } = queryKey[1];
            if (!address)
                throw new Error('address is required');
            const balance = await getBalance(config, {
                ...parameters,
                address,
            });
            return balance ?? null;
        },
        queryKey: getBalanceQueryKey(options),
    };
}
export function getBalanceQueryKey(options = {}) {
    return ['balance', filterQueryOptions(options)];
}
//# sourceMappingURL=getBalance.js.map