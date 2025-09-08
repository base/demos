'use client';
import { getTokenQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/**
 * @deprecated
 *
 * https://wagmi.sh/react/api/hooks/useToken
 */
export function useToken(parameters = {}) {
    const { address, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = getTokenQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(address && (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useToken.js.map