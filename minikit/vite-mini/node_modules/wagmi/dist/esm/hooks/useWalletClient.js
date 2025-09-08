'use client';
// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem
import { useQueryClient } from '@tanstack/react-query';
import { getWalletClientQueryOptions, } from '@wagmi/core/query';
import { useEffect, useRef } from 'react';
import { useQuery, } from '../utils/query.js';
import { useAccount } from './useAccount.js';
import { useChainId } from './useChainId.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWalletClient */
export function useWalletClient(parameters = {}) {
    const { query = {}, ...rest } = parameters;
    const config = useConfig(rest);
    const queryClient = useQueryClient();
    const { address, connector, status } = useAccount({ config });
    const chainId = useChainId({ config });
    const activeConnector = parameters.connector ?? connector;
    const { queryKey, ...options } = getWalletClientQueryOptions(config, {
        ...parameters,
        chainId: parameters.chainId ?? chainId,
        connector: parameters.connector ?? connector,
    });
    const enabled = Boolean((status === 'connected' ||
        (status === 'reconnecting' && activeConnector?.getProvider)) &&
        (query.enabled ?? true));
    const addressRef = useRef(address);
    // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
    useEffect(() => {
        const previousAddress = addressRef.current;
        if (!address && previousAddress) {
            // remove when account is disconnected
            queryClient.removeQueries({ queryKey });
            addressRef.current = undefined;
        }
        else if (address !== previousAddress) {
            // invalidate when address changes
            queryClient.invalidateQueries({ queryKey });
            addressRef.current = address;
        }
    }, [address, queryClient]);
    return useQuery({
        ...query,
        ...options,
        queryKey,
        enabled,
        staleTime: Number.POSITIVE_INFINITY,
    });
}
//# sourceMappingURL=useWalletClient.js.map