'use client';
import { callQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useCall */
export function useCall(parameters = {}) {
    const { query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = callQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    return useQuery({ ...query, ...options });
}
//# sourceMappingURL=useCall.js.map