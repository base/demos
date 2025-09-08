'use client';
import { useMutation } from '@tanstack/react-query';
import { deployContractMutationOptions, } from '@wagmi/core/query';
import { useConfig } from './useConfig.js';
/** https://wagmi.sh/react/api/hooks/useDeployContract */
export function useDeployContract(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = deployContractMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        deployContract: mutate,
        deployContractAsync: mutateAsync,
    };
}
//# sourceMappingURL=useDeployContract.js.map