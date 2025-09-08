import type { MutateOptions } from '@tanstack/query-core';
import { type SendTransactionErrorType, type SendTransactionParameters, type SendTransactionReturnType } from '../actions/sendTransaction.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
export declare function sendTransactionMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: SendTransactionVariables<config, config["chains"][number]["id"]>) => Promise<`0x${string}`>;
    readonly mutationKey: readonly ["sendTransaction"];
};
export type SendTransactionData = Compute<SendTransactionReturnType>;
export type SendTransactionVariables<config extends Config, chainId extends config['chains'][number]['id']> = SendTransactionParameters<config, chainId>;
export type SendTransactionMutate<config extends Config, context = unknown> = <chainId extends config['chains'][number]['id']>(variables: SendTransactionVariables<config, chainId>, options?: Compute<MutateOptions<SendTransactionData, SendTransactionErrorType, Compute<SendTransactionVariables<config, chainId>>, context>> | undefined) => void;
export type SendTransactionMutateAsync<config extends Config, context = unknown> = <chainId extends config['chains'][number]['id']>(variables: SendTransactionVariables<config, chainId>, options?: Compute<MutateOptions<SendTransactionData, SendTransactionErrorType, Compute<SendTransactionVariables<config, chainId>>, context>> | undefined) => Promise<SendTransactionData>;
//# sourceMappingURL=sendTransaction.d.ts.map