import { verifyMessage, } from '../actions/verifyMessage.js';
import { filterQueryOptions } from './utils.js';
export function verifyMessageQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, message, signature } = queryKey[1];
            if (!address || !message || !signature)
                throw new Error('address, message, and signature are required');
            const { scopeKey: _, ...parameters } = queryKey[1];
            const verified = await verifyMessage(config, parameters);
            return verified ?? null;
        },
        queryKey: verifyMessageQueryKey(options),
    };
}
export function verifyMessageQueryKey(options) {
    return ['verifyMessage', filterQueryOptions(options)];
}
//# sourceMappingURL=verifyMessage.js.map