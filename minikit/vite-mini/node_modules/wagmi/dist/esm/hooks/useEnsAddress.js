'use client';
import { getEnsAddressQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useEnsAddress */
export function useEnsAddress(parameters = {}) {
    const { name, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = getEnsAddressQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(name && (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useEnsAddress.js.map