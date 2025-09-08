'use client';
import { useMutation } from '@tanstack/react-query';
import { disconnectMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
import { useConnections } from './useConnections.js';
/** https://wagmi.sh/react/api/hooks/useDisconnect */
export function useDisconnect(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = disconnectMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        connectors: useConnections({ config }).map((connection) => connection.connector),
        disconnect: mutate,
        disconnectAsync: mutateAsync,
    };
}
//# sourceMappingURL=useDisconnect.js.map