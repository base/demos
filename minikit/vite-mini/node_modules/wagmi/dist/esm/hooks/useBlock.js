'use client';
import { useQueryClient } from '@tanstack/react-query';
import { getBlockQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
import { useWatchBlocks, } from './useWatchBlocks.js';
/** https://wagmi.sh/react/hooks/useBlock */
export function useBlock(parameters = {}) {
    const { query = {}, watch } = parameters;
    const config = useConfig(parameters);
    const queryClient = useQueryClient();
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    const options = getBlockQueryOptions(config, {
        ...parameters,
        chainId,
    });
    const enabled = Boolean(query.enabled ?? true);
    useWatchBlocks({
        ...{
            config: parameters.config,
            chainId: parameters.chainId,
            ...(typeof watch === 'object' ? watch : {}),
        },
        enabled: Boolean(enabled && (typeof watch === 'object' ? watch.enabled : watch)),
        onBlock(block) {
            queryClient.setQueryData(options.queryKey, block);
        },
    });
    return useQuery({
        ...query,
        ...options,
        enabled,
    });
}
//# sourceMappingURL=useBlock.js.map