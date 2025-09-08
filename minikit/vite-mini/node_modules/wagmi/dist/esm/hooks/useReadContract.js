'use client';
import { readContractQueryOptions, structuralSharing, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useReadContract */
export function useReadContract(parameters = {}) {
    const { abi, address, functionName, query = {} } = parameters;
    // @ts-ignore
    const code = parameters.code;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = readContractQueryOptions(config, { ...parameters, chainId: parameters.chainId ?? chainId });
    const enabled = Boolean((address || code) && abi && functionName && (query.enabled ?? true));
    return useQuery({
        ...query,
        ...options,
        enabled,
        structuralSharing: query.structuralSharing ?? structuralSharing,
    });
}
//# sourceMappingURL=useReadContract.js.map