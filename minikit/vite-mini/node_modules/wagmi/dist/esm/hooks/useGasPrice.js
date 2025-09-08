'use client';
import { getGasPriceQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useGasPrice */
export function useGasPrice(parameters = {}) {
    const { query = {} } = parameters;
    const config = useConfig(parameters);
    const configChainId = useChainId({ config });
    const chainId = parameters.chainId ?? configChainId;
    const options = getGasPriceQueryOptions(config, {
        ...parameters,
        chainId,
    });
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useGasPrice.js.map