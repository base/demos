'use client';
import { waitForTransactionReceiptQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt(parameters = {}) {
    const { hash, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = waitForTransactionReceiptQueryOptions(config, {
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
//# sourceMappingURL=useWaitForTransactionReceipt.js.map