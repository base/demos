'use client';
import { useMutation } from '@tanstack/react-query';
import { watchAssetMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWatchAsset */
export function useWatchAsset(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = watchAssetMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        watchAsset: mutate,
        watchAssetAsync: mutateAsync,
    };
}
//# sourceMappingURL=useWatchAsset.js.map