'use client';
import { useMutation } from '@tanstack/react-query';
import { connectMutationOptions, } from '@wagmi/core/query';
import { useEffect } from 'react';
import { useConfig } from './useConfig.js';
import { useConnectors } from './useConnectors.js';
/** https://wagmi.sh/react/api/hooks/useConnect */
export function useConnect(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = connectMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    // Reset mutation back to an idle state when the connector disconnects.
    useEffect(() => {
        return config.subscribe(({ status }) => status, (status, previousStatus) => {
            if (previousStatus === 'connected' && status === 'disconnected')
                result.reset();
        });
    }, [config, result.reset]);
    return {
        ...result,
        connect: mutate,
        connectAsync: mutateAsync,
        connectors: useConnectors({ config }),
    };
}
//# sourceMappingURL=useConnect.js.map