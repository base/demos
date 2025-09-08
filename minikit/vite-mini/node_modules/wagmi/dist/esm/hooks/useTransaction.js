'use client';
import { getTransactionQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useTransaction */
export function useTransaction(parameters = {}) {
    const { blockHash, blockNumber, blockTag, hash, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = getTransactionQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(!(blockHash && blockNumber && blockTag && hash) && (query.enabled ?? true));
    return useQuery({
        ...query,
        ...options,
        enabled,
    });
}
//# sourceMappingURL=useTransaction.js.map