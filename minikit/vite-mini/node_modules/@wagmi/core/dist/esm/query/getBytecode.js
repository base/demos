import { getBytecode, } from '../actions/getBytecode.js';
import { filterQueryOptions } from './utils.js';
export function getBytecodeQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { address, scopeKey: _, ...parameters } = queryKey[1];
            if (!address)
                throw new Error('address is required');
            const bytecode = await getBytecode(config, { ...parameters, address });
            return (bytecode ?? null);
        },
        queryKey: getBytecodeQueryKey(options),
    };
}
export function getBytecodeQueryKey(options) {
    return ['getBytecode', filterQueryOptions(options)];
}
//# sourceMappingURL=getBytecode.js.map