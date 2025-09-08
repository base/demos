'use client';
import { prepareTransactionRequestQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/usePrepareTransactionRequest */
export function usePrepareTransactionRequest(parameters = {}) {
    const { to, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = prepareTransactionRequestQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(to && (query.enabled ?? true));
    return useQuery({
        ...query,
        ...options,
        enabled,
    });
}
//# sourceMappingURL=usePrepareTransactionRequest.js.map