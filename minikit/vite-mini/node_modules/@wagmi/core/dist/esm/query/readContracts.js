import { readContracts, } from '../actions/readContracts.js';
import { filterQueryOptions } from './utils.js';
export function readContractsQueryOptions(config, options = {}) {
    return {
        async queryFn({ queryKey }) {
            const contracts = [];
            const length = queryKey[1].contracts.length;
            for (let i = 0; i < length; i++) {
                const contract = queryKey[1].contracts[i];
                const abi = (options.contracts?.[i]).abi;
                contracts.push({ ...contract, abi });
            }
            const { scopeKey: _, ...parameters } = queryKey[1];
            return readContracts(config, {
                ...parameters,
                contracts,
            });
        },
        queryKey: readContractsQueryKey(options),
    };
}
export function readContractsQueryKey(options = {}) {
    const contracts = [];
    for (const contract of (options.contracts ??
        [])) {
        const { abi: _, ...rest } = contract;
        contracts.push({ ...rest, chainId: rest.chainId ?? options.chainId });
    }
    return [
        'readContracts',
        filterQueryOptions({ ...options, contracts }),
    ];
}
//# sourceMappingURL=readContracts.js.map