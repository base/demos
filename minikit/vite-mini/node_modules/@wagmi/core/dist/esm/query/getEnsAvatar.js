import { getEnsAvatar, } from '../actions/getEnsAvatar.js';
import { filterQueryOptions } from './utils.js';
export function getEnsAvatarQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { name, scopeKey: _, ...parameters } = queryKey[1];
            if (!name)
                throw new Error('name is required');
            return getEnsAvatar(config, { ...parameters, name });
        },
        queryKey: getEnsAvatarQueryKey(options),
    };
}
export function getEnsAvatarQueryKey(options = {}) {
    return ['ensAvatar', filterQueryOptions(options)];
}
//# sourceMappingURL=getEnsAvatar.js.map