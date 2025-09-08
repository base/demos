'use client';
import { useQueryClient } from '@tanstack/react-query';
import { getBlockNumberQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useWatchBlockNumber, } from './useWatchBlockNumber.js';
/** https://wagmi.sh/react/api/hooks/useBlockNumber */
export function useBlockNumber(parameters = {}) {
    const { query = {}, watch } = parameters;
    const config = useConfig(parameters);
    const queryClient = useQueryClient();
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    const options = getBlockNumberQueryOptions(config, {
        ...parameters,
        chainId,
    });
    useWatchBlockNumber({
        ...{
            config: parameters.config,
            chainId: parameters.chainId,
            ...(typeof watch === 'object' ? watch : {}),
        },
        enabled: Boolean((query.enabled ?? true) &&
            (typeof watch === 'object' ? watch.enabled : watch)),
        onBlockNumber(blockNumber) {
            queryClient.setQueryData(options.queryKey, blockNumber);
        },
    });
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useBlockNumber.js.map