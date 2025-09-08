'use client';
import { getTransactionReceiptQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useTransactionReceipt */
export function useTransactionReceipt(parameters = {}) {
    const { hash, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = getTransactionReceiptQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(hash && (query.enabled ?? true));
    return useQuery({
        ...query,
        ...options,
        enabled,
    });
}
//# sourceMappingURL=useTransactionReceipt.js.map