import { readContract, } from '../actions/readContract.js';
import { filterQueryOptions } from './utils.js';
export function readContractQueryOptions(config, options = {}) {
    return {
        // TODO: Support `signal` once Viem actions allow passthrough
        // https://tkdodo.eu/blog/why-you-want-react-query#bonus-cancellation
        async queryFn({ queryKey }) {
            const abi = options.abi;
            if (!abi)
                throw new Error('abi is required');
            const { functionName, scopeKey: _, ...parameters } = queryKey[1];
            const addressOrCodeParams = (() => {
                const params = queryKey[1];
                if (params.address)
                    return { address: params.address };
                if (params.code)
                    return { code: params.code };
                throw new Error('address or code is required');
            })();
            if (!functionName)
                throw new Error('functionName is required');
            return readContract(config, {
                abi,
                functionName,
                args: parameters.args,
                ...addressOrCodeParams,
                ...parameters,
            });
        },
        queryKey: readContractQueryKey(options),
    };
}
export function readContractQueryKey(options = {}) {
    const { abi: _, ...rest } = options;
    return ['readContract', filterQueryOptions(rest)];
}
//# sourceMappingURL=readContract.js.map