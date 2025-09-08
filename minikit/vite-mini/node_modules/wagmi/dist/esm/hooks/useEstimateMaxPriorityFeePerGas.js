'use client';
import { estimateMaxPriorityFeePerGasQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useEstimateMaxPriorityFeePerGas */
export function useEstimateMaxPriorityFeePerGas(parameters = {}) {
    const { query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = estimateMaxPriorityFeePerGasQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useEstimateMaxPriorityFeePerGas.js.map