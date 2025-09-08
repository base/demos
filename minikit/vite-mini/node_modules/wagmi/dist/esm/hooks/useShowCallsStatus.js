'use client';
import { useMutation } from '@tanstack/react-query';
import { showCallsStatusMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useShowCallsStatus */
export function useShowCallsStatus(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = showCallsStatusMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        showCallsStatus: mutate,
        showCallsStatusAsync: mutateAsync,
    };
}
//# sourceMappingURL=useShowCallsStatus.js.map