'use client';
import { useMutation } from '@tanstack/react-query';
import { sendCallsMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useSendCalls */
export function useSendCalls(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = sendCallsMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        sendCalls: mutate,
        sendCallsAsync: mutateAsync,
    };
}
//# sourceMappingURL=useSendCalls.js.map