import type { Config, ResolvedRegister, SendCallsErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type SendCallsData, type SendCallsMutate, type SendCallsMutateAsync, type SendCallsVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseSendCallsParameters<config extends Config = Config, context = unknown> = Compute<ConfigParameter<config> & {
    mutation?: UseMutationParameters<SendCallsData, SendCallsErrorType, SendCallsVariables<config, config['chains'][number]['id']>, context> | undefined;
}>;
export type UseSendCallsReturnType<config extends Config = Config, context = unknown> = Compute<UseMutationReturnType<SendCallsData, SendCallsErrorType, SendCallsVariables<config, config['chains'][number]['id']>, context> & {
    sendCalls: SendCallsMutate<config, context>;
    sendCallsAsync: SendCallsMutateAsync<config, context>;
}>;
/** https://wagmi.sh/react/api/hooks/useSendCalls */
export declare function useSendCalls<config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseSendCallsParameters<config, context>): UseSendCallsReturnType<config, context>;
//# sourceMappingURL=useSendCalls.d.ts.map