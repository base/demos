'use client';
import { readContractsQueryOptions, structuralSharing, } from '@wagmi/core/query';
import { useMemo } from 'react';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useReadContracts */
export function useReadContracts(parameters = {}) {
    const { contracts = [], query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = readContractsQueryOptions(config, { ...parameters, chainId });
    const enabled = useMemo(() => {
        let isContractsValid = false;
        for (const contract of contracts) {
            const { abi, address, functionName } = contract;
            if (!abi || !address || !functionName) {
                isContractsValid = false;
                break;
            }
            isContractsValid = true;
        }
        return Boolean(isContractsValid && (query.enabled ?? true));
    }, [contracts, query.enabled]);
    return useQuery({
        ...options,
        ...query,
        enabled,
        structuralSharing: query.structuralSharing ?? structuralSharing,
    });
}
//# sourceMappingURL=useReadContracts.js.map