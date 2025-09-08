'use client';
import { infiniteReadContractsQueryOptions, structuralSharing, } from '@wagmi/core/query';
import { useInfiniteQuery, } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useInfiniteReadContracts */
export function useInfiniteReadContracts(parameters) {
    const { contracts = [], query } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = infiniteReadContractsQueryOptions(config, {
        ...parameters,
        chainId,
        contracts: contracts,
        query: query,
    });
    return useInfiniteQuery({
        ...query,
        ...options,
        initialPageParam: options.initialPageParam,
        structuralSharing: query.structuralSharing ?? structuralSharing,
    });
}
//# sourceMappingURL=useInfiniteReadContracts.js.map