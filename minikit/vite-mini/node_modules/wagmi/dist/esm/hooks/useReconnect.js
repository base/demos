'use client';
import { useMutation } from '@tanstack/react-query';
import { reconnectMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useReconnect */
export function useReconnect(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = reconnectMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        connectors: config.connectors,
        reconnect: mutate,
        reconnectAsync: mutateAsync,
    };
}
//# sourceMappingURL=useReconnect.js.map