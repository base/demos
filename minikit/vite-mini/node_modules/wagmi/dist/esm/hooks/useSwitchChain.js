'use client';
import { useMutation } from '@tanstack/react-query';
import { switchChainMutationOptions, } from '@wagmi/core/query';
import { useChains } from './useChains.js';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useSwitchChain */
export function useSwitchChain(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = switchChainMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        chains: useChains({ config }),
        switchChain: mutate,
        switchChainAsync: mutateAsync,
    };
}
//# sourceMappingURL=useSwitchChain.js.map