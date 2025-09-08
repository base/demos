import { type ReconnectErrorType, type ReconnectParameters, type ReconnectReturnType } from '../actions/reconnect.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
import type { Mutate, MutateAsync } from './types.js';
export declare function reconnectMutationOptions(config: Config): {
    readonly mutationFn: (variables: ReconnectVariables) => Promise<ReconnectReturnType>;
    readonly mutationKey: readonly ["reconnect"];
};
export type ReconnectData = Compute<ReconnectReturnType>;
export type ReconnectVariables = ReconnectParameters | undefined;
export type ReconnectMutate<context = unknown> = Mutate<ReconnectData, ReconnectErrorType, ReconnectVariables, context>;
export type ReconnectMutateAsync<context = unknown> = MutateAsync<ReconnectData, ReconnectErrorType, ReconnectVariables, context>;
//# sourceMappingURL=reconnect.d.ts.map