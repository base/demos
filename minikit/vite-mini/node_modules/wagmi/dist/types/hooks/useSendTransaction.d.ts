import type { Config, ResolvedRegister, SendTransactionErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type SendTransactionData, type SendTransactionMutate, type SendTransactionMutateAsync, type SendTransactionVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseSendTransactionParameters<config extends Config = Config, context = unknown> = Compute<ConfigParameter<config> & {
    mutation?: UseMutationParameters<SendTransactionData, SendTransactionErrorType, SendTransactionVariables<config, config['chains'][number]['id']>, context> | undefined;
}>;
export type UseSendTransactionReturnType<config extends Config = Config, context = unknown> = Compute<UseMutationReturnType<SendTransactionData, SendTransactionErrorType, SendTransactionVariables<config, config['chains'][number]['id']>, context> & {
    sendTransaction: SendTransactionMutate<config, context>;
    sendTransactionAsync: SendTransactionMutateAsync<config, context>;
}>;
/** https://wagmi.sh/react/api/hooks/useSendTransaction */
export declare function useSendTransaction<config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseSendTransactionParameters<config, context>): UseSendTransactionReturnType<config, context>;
//# sourceMappingURL=useSendTransaction.d.ts.map