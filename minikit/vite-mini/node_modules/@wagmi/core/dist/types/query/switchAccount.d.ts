import { type SwitchAccountErrorType, type SwitchAccountParameters, type SwitchAccountReturnType } from '../actions/switchAccount.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
import type { Mutate, MutateAsync } from './types.js';
export declare function switchAccountMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: {
        connector: import("../createConfig.js").Connector;
    }) => Promise<SwitchAccountReturnType<config>>;
    readonly mutationKey: readonly ["switchAccount"];
};
export type SwitchAccountData<config extends Config> = Compute<SwitchAccountReturnType<config>>;
export type SwitchAccountVariables = Compute<SwitchAccountParameters>;
export type SwitchAccountMutate<config extends Config, context = unknown> = Mutate<SwitchAccountData<config>, SwitchAccountErrorType, SwitchAccountVariables, context>;
export type SwitchAccountMutateAsync<config extends Config, context = unknown> = MutateAsync<SwitchAccountData<config>, SwitchAccountErrorType, SwitchAccountVariables, context>;
//# sourceMappingURL=switchAccount.d.ts.map