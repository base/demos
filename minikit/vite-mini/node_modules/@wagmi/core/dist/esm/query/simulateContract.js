import { simulateContract, } from '../actions/simulateContract.js';
import { filterQueryOptions } from './utils.js';
export function simulateContractQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const { abi, connector } = options;
            if (!abi)
                throw new Error('abi is required');
            const { scopeKey: _, ...parameters } = queryKey[1];
            const { address, functionName } = parameters;
            if (!address)
                throw new Error('address is required');
            if (!functionName)
                throw new Error('functionName is required');
            return simulateContract(config, {
                abi,
                connector,
                ...parameters,
            });
        },
        queryKey: simulateContractQueryKey(options),
    };
}
export function simulateContractQueryKey(options = {}) {
    const { abi: _, connector: _c, ...rest } = options;
    return ['simulateContract', filterQueryOptions(rest)];
}
//# sourceMappingURL=simulateContract.js.map