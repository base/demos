'use client';
import { useMutation } from '@tanstack/react-query';
import { writeContractsMutationOptions, } from '@wagmi/core/experimental';
import { useConfig } from '../../hooks/useConfig.js';
/** https://wagmi.sh/react/api/hooks/useWriteContracts */
export function useWriteContracts(parameters = {}) {
    const { mutation } = parameters;
    const config = useConfig(parameters);
    const mutationOptions = writeContractsMutationOptions(config);
    const { mutate, mutateAsync, ...result } = useMutation({
        ...mutation,
        ...mutationOptions,
    });
    return {
        ...result,
        writeContracts: mutate,
        writeContractsAsync: mutateAsync,
    };
}
//# sourceMappingURL=useWriteContracts.js.map