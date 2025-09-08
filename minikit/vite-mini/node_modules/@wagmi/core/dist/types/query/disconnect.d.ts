import { type DisconnectErrorType, type DisconnectParameters, type DisconnectReturnType } from '../actions/disconnect.js';
import type { Config } from '../createConfig.js';
import type { Mutate, MutateAsync } from './types.js';
export declare function disconnectMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: DisconnectVariables) => Promise<void>;
    readonly mutationKey: readonly ["disconnect"];
};
export type DisconnectData = DisconnectReturnType;
export type DisconnectVariables = DisconnectParameters | undefined;
export type DisconnectMutate<context = unknown> = Mutate<DisconnectData, DisconnectErrorType, DisconnectVariables, context>;
export type DisconnectMutateAsync<context = unknown> = MutateAsync<DisconnectData, DisconnectErrorType, DisconnectVariables, context>;
//# sourceMappingURL=disconnect.d.ts.map