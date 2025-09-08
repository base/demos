import type { Config, ResolvedRegister } from '@wagmi/core';
import { type WriteContractsData, type WriteContractsErrorType, type WriteContractsMutate, type WriteContractsMutateAsync, type WriteContractsVariables } from '@wagmi/core/experimental';
import type { Compute } from '@wagmi/core/internal';
import type { ContractFunctionParameters } from 'viem';
import type { ConfigParameter } from '../../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../../utils/query.js';
export type UseWriteContractsParameters<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], config extends Config = Config, context = unknown> = Compute<ConfigParameter<config> & {
    mutation?: UseMutationParameters<WriteContractsData, WriteContractsErrorType, WriteContractsVariables<contracts, config, config['chains'][number]['id']>, context> | undefined;
}>;
export type UseWriteContractsReturnType<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], config extends Config = Config, context = unknown> = Compute<UseMutationReturnType<WriteContractsData, WriteContractsErrorType, WriteContractsVariables<contracts, config, config['chains'][number]['id']>, context> & {
    writeContracts: WriteContractsMutate<contracts, config, context>;
    writeContractsAsync: WriteContractsMutateAsync<contracts, config, context>;
}>;
/** https://wagmi.sh/react/api/hooks/useWriteContracts */
export declare function useWriteContracts<const contracts extends readonly unknown[] = readonly ContractFunctionParameters[], config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseWriteContractsParameters<contracts, config, context>): UseWriteContractsReturnType<contracts, config, context>;
//# sourceMappingURL=useWriteContracts.d.ts.map