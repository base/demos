import { getEnsText, } from '../actions/getEnsText.js';
import { filterQueryOptions } from './utils.js';
export function getEnsTextQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { key, name, scopeKey: _, ...parameters } = queryKey[1];
            if (!key || !name)
                throw new Error('key and name are required');
            return getEnsText(config, { ...parameters, key, name });
        },
        queryKey: getEnsTextQueryKey(options),
    };
}
export function getEnsTextQueryKey(options = {}) {
    return ['ensText', filterQueryOptions(options)];
}
//# sourceMappingURL=getEnsText.js.map