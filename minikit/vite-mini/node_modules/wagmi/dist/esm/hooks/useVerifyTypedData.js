'use client';
import { verifyTypedDataQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useVerifyTypedData */
export function useVerifyTypedData(parameters = {}) {
    const { address, message, primaryType, signature, types, query = {}, } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = verifyTypedDataQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(address &&
        message &&
        primaryType &&
        signature &&
        types &&
        (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useVerifyTypedData.js.map