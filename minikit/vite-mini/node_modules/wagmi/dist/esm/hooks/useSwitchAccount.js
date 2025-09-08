'use client';
import { useMutation } from '@tanstack/react-query';
import { switchAccountMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
import { useConnections } from './useConnections.js';
/** https://wagmi.sh/react/api/hooks/useSwitchAccount */
export function useSwitchAccount(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = switchAccountMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        connectors: useConnections({ config }).map((connection) => connection.connector),
        switchAccount: mutate,
        switchAccountAsync: mutateAsync,
    };
}
//# sourceMappingURL=useSwitchAccount.js.map