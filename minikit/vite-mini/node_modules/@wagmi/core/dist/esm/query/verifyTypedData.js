import { verifyTypedData, } from '../actions/verifyTypedData.js';
import { filterQueryOptions } from './utils.js';
export function verifyTypedDataQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, message, primaryType, signature, types, scopeKey: _, ...parameters } = queryKey[1];
            if (!address)
                throw new Error('address is required');
            if (!message)
                throw new Error('message is required');
            if (!primaryType)
                throw new Error('primaryType is required');
            if (!signature)
                throw new Error('signature is required');
            if (!types)
                throw new Error('types is required');
            const verified = await verifyTypedData(config, {
                ...parameters,
                address,
                message,
                primaryType,
                signature,
                types,
            });
            return verified ?? null;
        },
        queryKey: verifyTypedDataQueryKey(options),
    };
}
export function verifyTypedDataQueryKey(options) {
    return ['verifyTypedData', filterQueryOptions(options)];
}
//# sourceMappingURL=verifyTypedData.js.map