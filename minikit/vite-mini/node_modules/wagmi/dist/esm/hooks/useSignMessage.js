'use client';
import { useMutation } from '@tanstack/react-query';
import { signMessageMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useSignMessage */
export function useSignMessage(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = signMessageMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        signMessage: mutate,
        signMessageAsync: mutateAsync,
    };
}
//# sourceMappingURL=useSignMessage.js.map