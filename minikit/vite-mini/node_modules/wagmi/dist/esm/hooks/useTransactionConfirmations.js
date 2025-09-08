'use client';
import { getTransactionConfirmationsQueryOptions, } from '@wagmi/core/query';
import { useQuery } from '../utils/query.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useTransactionConfirmations */
export function useTransactionConfirmations(parameters = {}) {
    const { hash, transactionReceipt, query = {} } = parameters;
    const config = useConfig(parameters);
    const chainId = useChainId({ config });
    const options = getTransactionConfirmationsQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
    });
    const enabled = Boolean(!(hash && transactionReceipt) &&
        (hash || transactionReceipt) &&
        (query.enabled ?? true));
    return useQuery({ ...query, ...options, enabled });
}
//# sourceMappingURL=useTransactionConfirmations.js.map