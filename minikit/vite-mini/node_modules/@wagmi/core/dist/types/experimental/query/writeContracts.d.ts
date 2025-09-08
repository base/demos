import type { MutateOptions } from '@tanstack/query-core';
import type { Config } from '../../createConfig.js';
import type { Compute } from '../../types/utils.js';
import { type WriteContractsErrorType, type WriteContractsParameters, type WriteContractsReturnType } from '../actions/writeContracts.js';
export declare function writeContractsMutationOptions<const contracts extends readonly unknown[], config extends Config>(config: config): {
    readonly mutationFn: (variables: WriteContractsVariables<contracts, config, config["chains"][number]["id"]>) => any;
    readonly mutationKey: readonly ["writeContracts"];
};
export type WriteContractsData = Compute<WriteContractsReturnType>;
export type WriteContractsVariables<contracts extends readonly unknown[], config extends Config, chainId extends config['chains'][number]['id']> = WriteContractsParameters<contracts, config, chainId>;
export type WriteContractsMutate<contracts extends readonly unknown[], config extends Config, context = unknown> = <chainId extends config['chains'][number]['id']>(variables: WriteContractsVariables<contracts, config, chainId>, options?: Compute<MutateOptions<WriteContractsData, WriteContractsErrorType, Compute<WriteContractsVariables<contracts, config, chainId>>, context>> | undefined) => void;
export type WriteContractsMutateAsync<contracts extends readonly unknown[], config extends Config, context = unknown> = <chainId extends config['chains'][number]['id']>(variables: WriteContractsVariables<contracts, config, chainId>, options?: Compute<MutateOptions<WriteContractsData, WriteContractsErrorType, Compute<WriteContractsVariables<contracts, config, chainId>>, context>> | undefined) => Promise<WriteContractsData>;
//# sourceMappingURL=writeContracts.d.ts.map