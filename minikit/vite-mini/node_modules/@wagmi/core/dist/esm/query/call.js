import { call, } from '../actions/call.js';
import { filterQueryOptions } from './utils.js';
export function callQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { scopeKey: _, ...parameters } = queryKey[1];
            const data = await call(config, {
                ...parameters,
            });
            return data ?? null;
        },
        queryKey: callQueryKey(options),
    };
}
export function callQueryKey(options) {
    return ['call', filterQueryOptions(options)];
}
//# sourceMappingURL=call.js.map