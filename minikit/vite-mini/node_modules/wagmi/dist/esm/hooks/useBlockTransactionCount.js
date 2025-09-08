'use client';
import { getBlockTransactionCountQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useBlockTransactionCount */
export function useBlockTransactionCount(parameters = {}) {
    const { query = {} } = parameters;
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    const options = getBlockTransactionCountQueryOptions(config, {
        ...parameters,
        chainId,
    });
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useBlockTransactionCount.js.map