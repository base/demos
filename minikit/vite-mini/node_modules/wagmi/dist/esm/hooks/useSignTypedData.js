'use client';
import { useMutation } from '@tanstack/react-query';
import { signTypedDataMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useSignTypedData */
export function useSignTypedData(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = signTypedDataMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        signTypedData: mutate,
        signTypedDataAsync: mutateAsync,
    };
}
//# sourceMappingURL=useSignTypedData.js.map