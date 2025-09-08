'use client';
import { estimateFeesPerGasQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useEstimateFeesPerGas */
export function useEstimateFeesPerGas(parameters = {}) {
    const { query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = estimateFeesPerGasQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useEstimateFeesPerGas.js.map